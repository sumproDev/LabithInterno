import { NextResponse } from "next/server";
import { contactSchema, franchiseSchema } from "@/lib/validations";
import { sendEnquiryEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true });
    const schema = body.formType === "franchise" || body.formType === "dealership" ? franchiseSchema : contactSchema;
    const result = schema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Invalid submission", fields: result.error.flatten().fieldErrors }, { status: 400 });

    try {
      await sendEnquiryEmail({
        ...result.data,
        formType: body.formType,
      });
    } catch (emailErr) {
      console.error("[Nodemailer Error] Failed to send enquiry email:", emailErr);
    }

    return NextResponse.json({ ok: true, message: "Enquiry received" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to process request" }, { status: 500 });
  }
}
