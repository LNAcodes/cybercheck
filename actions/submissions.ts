"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { auth } from "@/lib/auth"
import { dbConnect } from "@/lib/db"
import { UserQuestionSubmission } from "@/lib/models/UserQuestionSubmission"
import { Bookmark } from "@/lib/models/Bookmark"
import { Collection } from "@/lib/models/Collection"
import { Question } from "@/lib/models/Question"
import "@/lib/models/Category"
import type { IPopulatedQuestion } from "@/lib/models/Question"
import type {
  UserQuestionSubmission as UserQuestionSubmissionType,
  UserStats,
  Category,
} from "@/types"

const submitQuestionSchema = z.object({
  questionText: z.string().min(10, "Question must be at least 10 characters"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  correctOption: z.enum(["A", "B", "C"]),
  explanation: z.string().optional(),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  categoryId: z.string().min(1, "Category is required"),
})

export async function submitQuestion(
  data: unknown
): Promise<{ success?: true; error?: string; fieldErrors?: Record<string, string> }> {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated" }

  const parsed = submitQuestionSchema.safeParse(data)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] as string
      if (field) fieldErrors[field] = issue.message
    })
    return { fieldErrors }
  }

  const {
    questionText,
    optionA,
    optionB,
    optionC,
    correctOption,
    explanation,
    difficulty,
    categoryId,
  } = parsed.data

  await dbConnect()

  await UserQuestionSubmission.create({
    questionText,
    optionA,
    optionB,
    optionC,
    correctOption,
    explanation: explanation || null,
    difficulty,
    categoryId,
    userId: session.user.id,
    status: "PENDING",
  })

  revalidatePath("/profile")
  return { success: true }
}

export async function getUserSubmissions(): Promise<UserQuestionSubmissionType[]> {
  const session = await auth()
  if (!session?.user?.id) return []

  await dbConnect()

  const submissions = await UserQuestionSubmission.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean()

  return submissions.map((submission) => ({
    id: submission._id.toString(),
    questionText: submission.questionText,
    optionA: submission.optionA,
    optionB: submission.optionB,
    optionC: submission.optionC,
    correctOption: submission.correctOption,
    explanation: submission.explanation ?? null,
    difficulty: submission.difficulty,
    categoryId: submission.categoryId.toString(),
    userId: submission.userId.toString(),
    status: submission.status,
    createdAt: submission.createdAt,
    updatedAt: submission.updatedAt,
  }))
}

export async function getUserStats(): Promise<UserStats> {
  const session = await auth()
  if (!session?.user?.id) {
    return { bookmarkCount: 0, collectionCount: 0, approvedSubmissions: 0, pendingSubmissions: 0 }
  }

  await dbConnect()

  const [bookmarkCount, collectionCount, approvedSubmissions, pendingSubmissions] =
    await Promise.all([
      Bookmark.countDocuments({ userId: session.user.id }),
      Collection.countDocuments({ userId: session.user.id }),
      UserQuestionSubmission.countDocuments({ userId: session.user.id, status: "APPROVED" }),
      UserQuestionSubmission.countDocuments({ userId: session.user.id, status: "PENDING" }),
    ])

  return { bookmarkCount, collectionCount, approvedSubmissions, pendingSubmissions }
}

export async function getFavoriteTopics(): Promise<
  Array<{ category: Category; count: number }>
> {
  const session = await auth()
  if (!session?.user?.id) return []

  await dbConnect()

  const bookmarks = await Bookmark.find({ userId: session.user.id })
    .select("questionId")
    .lean()

  if (bookmarks.length === 0) return []

  const questionIds = bookmarks.map((bookmark) => bookmark.questionId)

  const questions = (await Question.find({ _id: { $in: questionIds } })
    .populate("categoryId")
    .select("categoryId")
    .lean()) as unknown as Pick<IPopulatedQuestion, "_id" | "categoryId">[]

  const categoryCount = new Map<string, { category: Category; count: number }>()

  for (const question of questions) {
    const cat = question.categoryId
    const catId = cat._id.toString()
    if (!categoryCount.has(catId)) {
      categoryCount.set(catId, {
        category: {
          id: catId,
          slug: cat.slug,
          name: cat.name,
          description: cat.description ?? null,
        },
        count: 0,
      })
    }
    categoryCount.get(catId)!.count++
  }

  return Array.from(categoryCount.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
}
