import mongoose, { Schema, model, models } from "mongoose"

export interface IUser {
  _id: mongoose.Types.ObjectId
  name?: string | null
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
)

export const User = models.User || model<IUser>("User", userSchema)
