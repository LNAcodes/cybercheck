import mongoose, { Schema, model, models } from "mongoose"
import type { SubmissionStatus, OptionLetter, Difficulty } from "@/types"

export interface IUserQuestionSubmission {
  _id: mongoose.Types.ObjectId
  questionText: string
  optionA: string
  optionB: string
  optionC: string
  correctOption: OptionLetter
  explanation?: string | null
  difficulty: Difficulty
  categoryId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  status: SubmissionStatus
  createdAt: Date
  updatedAt: Date
}

const userQuestionSubmissionSchema = new Schema<IUserQuestionSubmission>(
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
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
)

export const UserQuestionSubmission =
  models.UserQuestionSubmission ||
  model<IUserQuestionSubmission>("UserQuestionSubmission", userQuestionSubmissionSchema)
