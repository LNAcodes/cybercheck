import mongoose, { Schema, model, models } from "mongoose"

export interface ICategory {
  _id: mongoose.Types.ObjectId
  slug: string
  name: string
  description?: string | null
  createdAt: Date
  updatedAt: Date
}

const categorySchema = new Schema<ICategory>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: null },
  },
  { timestamps: true }
)

export const Category =
  models.Category || model<ICategory>("Category", categorySchema)
