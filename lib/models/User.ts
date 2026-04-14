import mongoose, { Schema, model, models } from "mongoose"

export interface IUser {
  _id: mongoose.Types.ObjectId
  username: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
)

export const User = models.User || model<IUser>("User", userSchema)
