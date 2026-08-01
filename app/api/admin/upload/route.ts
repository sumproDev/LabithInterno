import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { configureCloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Image file is required." }, { status: 400 });

    const bytes = Buffer.from(await file.arrayBuffer());
    const dataUri = `data:${file.type};base64,${bytes.toString("base64")}`;
    const cloudinary = configureCloudinary();
    const uploaded = await cloudinary.uploader.upload(dataUri, {
      folder: "labith-interno",
      resource_type: "image",
      overwrite: false,
    });

    return NextResponse.json({ url: uploaded.secure_url, publicId: uploaded.public_id });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed." }, { status: 500 });
  }
}
