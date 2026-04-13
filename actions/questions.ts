"use server"

import { prisma } from "@/lib/prisma"
import type { QuestionWithCategory } from "@/types"

export async function getApprovedQuestions(): Promise<QuestionWithCategory[]> {
  const questions = await prisma.question.findMany({
    where: { status: "APPROVED" },
    include: { category: true },
    orderBy: { createdAt: "asc" },
  })

  return questions as QuestionWithCategory[]
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  })
}
