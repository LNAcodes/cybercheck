import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set")
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

const globalForMongoose = globalThis as unknown as {
  mongoose: MongooseCache | undefined
}

const cached: MongooseCache = globalForMongoose.mongoose ?? {
  conn: null,
  promise: null,
}

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = cached
}

export async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
