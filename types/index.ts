export type OptionLetter = "A" | "B" | "C"
export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
export type QuestionStatus = "APPROVED" | "PENDING" | "REJECTED"
export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED"

export interface Category {
  id: string
  slug: string
  name: string
  description?: string | null
}

export interface Question {
  id: string
  questionText: string
  optionA: string
  optionB: string
  optionC: string
  correctOption: OptionLetter
  explanation?: string | null
  difficulty: Difficulty
  status: QuestionStatus
  categoryId: string
  createdAt: Date
  updatedAt: Date
}

export interface QuestionWithCategory extends Question {
  category: Category
}

export interface Collection {
  id: string
  name: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface CollectionWithCount extends Collection {
  itemCount: number
}

export interface UserStats {
  bookmarkCount: number
  collectionCount: number
  approvedSubmissions: number
  pendingSubmissions: number
}
