"use server"

import { auth } from "@/lib/auth"
import { dbConnect } from "@/lib/db"
import { Collection, CollectionItem } from "@/lib/models/Collection"
import { Question } from "@/lib/models/Question"
import type { IPopulatedQuestion } from "@/lib/models/Question"
import type { CollectionWithCount, QuestionWithCategory } from "@/types"

export async function getUserCollections(): Promise<CollectionWithCount[]> {
  const session = await auth()
  if (!session) return []

  await dbConnect()

  const collections = await Collection.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean()

  const collectionsWithCounts = await Promise.all(
    collections.map(async (collection) => {
      const itemCount = await CollectionItem.countDocuments({ collectionId: collection._id })
      return {
        id: collection._id.toString(),
        name: collection.name,
        userId: collection.userId.toString(),
        createdAt: collection.createdAt,
        updatedAt: collection.updatedAt,
        itemCount,
      }
    })
  )

  return collectionsWithCounts
}

export async function createCollection(
  name: string
): Promise<{ id?: string; error?: string }> {
  const session = await auth()
  if (!session) return { error: "Not authenticated" }

  const trimmedName = name.trim()
  if (!trimmedName) return { error: "Collection name is required" }
  if (trimmedName.length > 50) return { error: "Collection name must be at most 50 characters" }

  await dbConnect()

  const collection = await Collection.create({
    name: trimmedName,
    userId: session.user.id,
  })

  return { id: collection._id.toString() }
}

export async function addToCollection(
  collectionId: string,
  questionId: string
): Promise<{ error?: string }> {
  const session = await auth()
  if (!session) return { error: "Not authenticated" }

  await dbConnect()

  const collection = await Collection.findOne({
    _id: collectionId,
    userId: session.user.id,
  }).lean()
  if (!collection) return { error: "Collection not found" }

  try {
    await CollectionItem.create({ collectionId, questionId })
    return {}
  } catch (error: unknown) {
    if ((error as { code?: number }).code === 11000) {
      return { error: "Question is already in this collection" }
    }
    return { error: "Failed to add to collection" }
  }
}

export async function getCollectionWithQuestions(collectionId: string): Promise<{
  collection: { id: string; name: string }
  questions: QuestionWithCategory[]
} | null> {
  const session = await auth()
  if (!session) return null

  await dbConnect()

  const collection = await Collection.findOne({
    _id: collectionId,
    userId: session.user.id,
  }).lean()
  if (!collection) return null

  const items = await CollectionItem.find({ collectionId }).sort({ createdAt: 1 }).lean()
  const questionIds = items.map((item) => item.questionId)

  if (questionIds.length === 0) {
    return {
      collection: { id: collection._id.toString(), name: collection.name },
      questions: [],
    }
  }

  const questions = (await Question.find({
    _id: { $in: questionIds },
    status: "APPROVED",
  })
    .populate("categoryId")
    .lean()) as unknown as IPopulatedQuestion[]

  const idOrder = questionIds.map((id) => id.toString())
  const sortedQuestions = [...questions].sort(
    (a, b) => idOrder.indexOf(a._id.toString()) - idOrder.indexOf(b._id.toString())
  )

  return {
    collection: {
      id: collection._id.toString(),
      name: collection.name,
    },
    questions: sortedQuestions.map((question) => ({
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
    })),
  }
}
