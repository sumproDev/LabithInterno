import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { connectDB } from "@/lib/db";
import { getModelForResource } from "@/lib/cms";
import { isResourceName, schemas } from "@/lib/cms-validation";

export async function GET(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { resource } = await params;
  if (!isResourceName(resource)) return NextResponse.json({ error: "Unknown CMS resource." }, { status: 404 });

  try {
    await connectDB();
    const items = await getModelForResource(resource).find({}).sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load records." }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { resource } = await params;
  if (!isResourceName(resource)) return NextResponse.json({ error: "Unknown CMS resource." }, { status: 404 });

  try {
    await connectDB();
    const payload = schemas[resource].parse(await request.json());
    const item = await getModelForResource(resource).create(payload);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json({ error: error.issues[0]?.message || "Invalid form data." }, { status: 400 });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create record." }, { status: 500 });
  }
}
