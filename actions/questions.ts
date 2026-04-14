"use server"

import { dbConnect } from "@/lib/db"
import { Category } from "@/lib/models/Category"
import { Question } from "@/lib/models/Question"
import type { IPopulatedQuestion } from "@/lib/models/Question"
import type { QuestionWithCategory } from "@/types"

export async function getApprovedQuestions(): Promise<QuestionWithCategory[]> {
  await dbConnect()

  const questions = (await Question.find({ status: "APPROVED" })
    .populate("categoryId")
    .sort({ createdAt: 1 })
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

export async function getCategories() {
  await dbConnect()

  const categories = await Category.find({}).sort({ name: 1 }).lean()

  return categories.map((category) => ({
    id: category._id.toString(),
    slug: category.slug,
    name: category.name,
    description: category.description ?? null,
  }))
}
