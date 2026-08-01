import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "labith_admin_session";
const USERNAME = process.env.ADMIN_USERNAME || "aravaliadmin";
const PASSWORD = process.env.ADMIN_PASSWORD || "aravaliadmin123";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || `${PASSWORD}:labith-interno-session`;
const SESSION_AGE_SECONDS = 60 * 60 * 8;

function sign(value: string) {
  return createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function validateAdminCredentials(username: string, password: string) {
  return safeEqual(username, USERNAME) && safeEqual(password, PASSWORD);
}

export function createAdminToken() {
  const expires = Date.now() + SESSION_AGE_SECONDS * 1000;
  const payload = Buffer.from(JSON.stringify({ username: USERNAME, expires })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token?: string) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { username?: string; expires?: number };
    return session.username === USERNAME && typeof session.expires === "number" && session.expires > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminFromCookies() {
  const store = await cookies();
  return verifyAdminToken(store.get(COOKIE_NAME)?.value);
}

export function isAdminRequest(request: NextRequest) {
  return verifyAdminToken(request.cookies.get(COOKIE_NAME)?.value);
}

export { COOKIE_NAME, SESSION_AGE_SECONDS };
