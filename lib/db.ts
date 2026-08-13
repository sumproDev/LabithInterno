import mongoose from "mongoose";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // Ignore in environments where setting DNS servers is not allowed
}

function formatMongoUri(uri: string): string {
  const regex = /^(mongodb\+srv:\/\/|mongodb:\/\/)([^:]+):([^@]+)@(.+)$/;
  const match = uri.match(regex);
  if (match) {
    const [, scheme, user, pass, rest] = match;
    return `${scheme}${user}:${encodeURIComponent(pass)}@${rest}`;
  }
  return uri;
}

const rawUri = process.env.MONGODB_URI;
const MONGODB_URI = rawUri ? formatMongoUri(rawUri) : undefined;

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
