import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { getModelForResource } from "@/lib/cms";
import { connectDB } from "@/lib/db";
import { isResourceName, schemas } from "@/lib/cms-validation";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ resource: string; id: string }> }) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { resource, id } = await params;
  if (!isResourceName(resource)) return NextResponse.json({ error: "Unknown CMS resource." }, { status: 404 });

  try {
    await connectDB();
    const payload = schemas[resource].parse(await request.json());
    const item = await getModelForResource(resource).findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!item) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    return NextResponse.json({ item });
  } catch (error: any) {
    if (error instanceof ZodError) return NextResponse.json({ error: error.issues[0]?.message || "Invalid form data." }, { status: 400 });
    if (error && (error.code === 11000 || error.name === "MongoServerError")) {
      const field = error.keyValue ? Object.keys(error.keyValue)[0] : "field";
      const val = error.keyValue ? error.keyValue[field] : "";
      return NextResponse.json({ error: `A record with this ${field} ("${val}") already exists.` }, { status: 400 });
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update record." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ resource: string; id: string }> }) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { resource, id } = await params;
  if (!isResourceName(resource)) return NextResponse.json({ error: "Unknown CMS resource." }, { status: 404 });

  try {
    await connectDB();
    const item = await getModelForResource(resource).findByIdAndDelete(id);
    if (!item) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete record." }, { status: 500 });
  }
}
