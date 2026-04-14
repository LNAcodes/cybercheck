"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { dbConnect } from "@/lib/db"
import { Bookmark } from "@/lib/models/Bookmark"
import { Question } from "@/lib/models/Question"
import type { IPopulatedQuestion } from "@/lib/models/Question"
import type { QuestionWithCategory } from "@/types"

export async function toggleBookmark(
  questionId: string
): Promise<{ bookmarked: boolean; error?: string }> {
  const session = await auth()
  if (!session?.user?.id) {
    return { bookmarked: false, error: "Unauthorized" }
  }

  await dbConnect()

  const existing = await Bookmark.findOne({
    userId: session.user.id,
    questionId,
  })

  if (existing) {
    await Bookmark.deleteOne({ _id: existing._id })
    revalidatePath("/bookmarks")
    return { bookmarked: false }
  }

  await Bookmark.create({ userId: session.user.id, questionId })
  revalidatePath("/bookmarks")
  return { bookmarked: true }
}

export async function getBookmarkedQuestionIds(): Promise<Set<string>> {
  const session = await auth()
  if (!session?.user?.id) return new Set()

  await dbConnect()

  const bookmarks = await Bookmark.find({ userId: session.user.id })
    .select("questionId")
    .lean()

  return new Set(bookmarks.map((bookmark) => bookmark.questionId.toString()))
}

export async function getBookmarkedQuestions(): Promise<QuestionWithCategory[]> {
  const session = await auth()
  if (!session?.user?.id) return []

  await dbConnect()

  const bookmarks = await Bookmark.find({ userId: session.user.id })
    .select("questionId")
    .sort({ createdAt: -1 })
    .lean()

  const questionIds = bookmarks.map((bookmark) => bookmark.questionId)

  const questions = (await Question.find({
    _id: { $in: questionIds },
    status: "APPROVED",
  })
    .populate("categoryId")
    .lean()) as unknown as IPopulatedQuestion[]

  return questions.map((question) => ({
    id: question._id.toString(),
    questionText: question.questionText,
    optionA: question.optionA,
    optionB: question.optionB,
    optionC: question.optionC,
    correctOption: question.correctOption,
    explanation: question.explanation ?? null,
    difficulty: question.difficulty,
    status: question.status,
    categoryId: question.categoryId._id.toString(),
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
    category: {
      id: question.categoryId._id.toString(),
      slug: question.categoryId.slug,
      name: question.categoryId.name,
      description: question.categoryId.description ?? null,
    },
  }))
}
