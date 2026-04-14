import mongoose, { Schema, model, models } from "mongoose"
import type { ICategory } from "./Category"
import type { Difficulty, OptionLetter, QuestionStatus } from "@/types"

export interface IQuestion {
  _id: mongoose.Types.ObjectId
  questionText: string
  optionA: string
  optionB: string
  optionC: string
  correctOption: OptionLetter
  explanation?: string | null
  difficulty: Difficulty
  status: QuestionStatus
  categoryId: mongoose.Types.ObjectId
  submittedById?: mongoose.Types.ObjectId | null
  createdAt: Date
  updatedAt: Date
}

export type IPopulatedQuestion = Omit<IQuestion, "categoryId"> & {
  categoryId: ICategory
}

const questionSchema = new Schema<IQuestion>(
  {
    questionText: { type: String, required: true },
    optionA: { type: String, required: true },
    optionB: { type: String, required: true },
    optionC: { type: String, required: true },
    correctOption: { type: String, enum: ["A", "B", "C"], required: true },
    explanation: { type: String, default: null },
    difficulty: {
      type: String,
      enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
      default: "BEGINNER",
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    submittedById: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
)

export const Question =
  models.Question || model<IQuestion>("Question", questionSchema)
