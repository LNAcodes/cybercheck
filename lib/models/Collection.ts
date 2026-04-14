import mongoose, { Schema, model, models } from "mongoose"

export interface ICollection {
  _id: mongoose.Types.ObjectId
  name: string
  userId: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface ICollectionItem {
  _id: mongoose.Types.ObjectId
  collectionId: mongoose.Types.ObjectId
  questionId: mongoose.Types.ObjectId
  createdAt: Date
}

const collectionSchema = new Schema<ICollection>(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
)

const collectionItemSchema = new Schema<ICollectionItem>(
  {
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

collectionItemSchema.index(
  { collectionId: 1, questionId: 1 },
  { unique: true }
)

export const Collection =
  models.Collection || model<ICollection>("Collection", collectionSchema)

export const CollectionItem =
  models.CollectionItem ||
  model<ICollectionItem>("CollectionItem", collectionItemSchema)
