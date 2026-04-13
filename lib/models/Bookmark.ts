import mongoose, { Schema, model, models } from "mongoose"

export interface IBookmark {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  questionId: mongoose.Types.ObjectId
  createdAt: Date
}

const bookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

bookmarkSchema.index({ userId: 1, questionId: 1 }, { unique: true })

export const Bookmark =
  models.Bookmark || model<IBookmark>("Bookmark", bookmarkSchema)
