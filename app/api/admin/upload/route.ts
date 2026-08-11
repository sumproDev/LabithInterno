import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { configureCloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const form = await request.formData();
    const rawFiles = [...form.getAll("files"), ...form.getAll("file")];
    const files = rawFiles.filter((f): f is File => f instanceof File && f.size > 0);

    if (files.length === 0) {
      return NextResponse.json({ error: "At least one image file is required." }, { status: 400 });
    }

    let cloudinary: any;
    try {
      cloudinary = configureCloudinary();
    } catch (configError) {
      return NextResponse.json(
        { error: configError instanceof Error ? configError.message : "Cloudinary configuration missing or invalid." },
        { status: 500 }
      );
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const bytes = Buffer.from(await file.arrayBuffer());
      const dataUri = `data:${file.type || "image/jpeg"};base64,${bytes.toString("base64")}`;

      try {
        const uploaded = await cloudinary.uploader.upload(dataUri, {
          folder: "labith-interno",
          resource_type: "image",
          overwrite: false,
        });

        if (!uploaded || !uploaded.secure_url) {
          throw new Error("Cloudinary did not return a secure URL.");
        }

        uploadedUrls.push(uploaded.secure_url);
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError);
        const message = uploadError instanceof Error ? uploadError.message : "Cloudinary upload failed.";
        return NextResponse.json({ error: `Upload failed: ${message}` }, { status: 500 });
      }
    }

    return NextResponse.json({
      url: uploadedUrls[0],
      urls: uploadedUrls,
      count: uploadedUrls.length,
      success: true,
    });
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed." }, { status: 500 });
  }
}


