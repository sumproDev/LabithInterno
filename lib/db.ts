import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type CachedConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseConnection: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongooseConnection || { conn: null, promise: null };
global.mongooseConnection = cached;

export async function connectDB() {
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not configured.");
  if (cached.conn) return cached.conn;

  cached.promise ||= mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });
  cached.conn = await cached.promise;
  return cached.conn;
}

export function isMongoConfigured() {
  return Boolean(MONGODB_URI);
}
