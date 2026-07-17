import { NextResponse } from "next/server";
import { contactSchema, franchiseSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true });
    const schema = body.formType === "franchise" ? franchiseSchema : contactSchema;
    const result = schema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Invalid submission", fields: result.error.flatten().fieldErrors }, { status: 400 });
    // Integration point: persist to a CRM/database and send notifications here.
    return NextResponse.json({ ok: true, message: "Enquiry received" }, { status: 201 });
  } catch { return NextResponse.json({ error: "Unable to process request" }, { status: 500 }); }
}
