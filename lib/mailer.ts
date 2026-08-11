import nodemailer from "nodemailer";

export function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass || pass === "your-16-digit-app-password") {
    console.warn("[Nodemailer] Warning: GMAIL_USER or GMAIL_APP_PASSWORD is not set or using placeholder values in .env");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: user,
      pass: pass,
    },
  });
}

export interface EmailEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  city: string;
  state?: string;
  enquiryType?: string;
  productInterest?: string;
  investmentRange?: string;
  message: string;
  formType?: string;
}

export async function sendEnquiryEmail(data: EmailEnquiryPayload) {
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || process.env.GMAIL_USER || "labithinternollp@gmail.com";
  const isDealership = data.formType === "dealership" || data.enquiryType === "Dealership enquiry";
  const subjectTitle = isDealership ? "New Dealership / Franchise Enquiry" : "New Customer Enquiry";

  const transporter = getTransporter();

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
      <div style="background-color: #111827; color: #ffffff; padding: 24px; text-align: center;">
        <h2 style="margin: 0; font-size: 22px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Labith Interno</h2>
        <p style="margin: 6px 0 0 0; font-size: 14px; color: #d1d5db;">${subjectTitle}</p>
      </div>
      
      <div style="padding: 24px;">
        <p style="font-size: 15px; color: #374151; margin-top: 0;">You have received a new enquiry from the website contact form. Here are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563; width: 35%;">Full Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;">${data.name || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563;">Email Address</td>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email || "N/A"}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563;">Phone Number</td>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;"><a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">${data.phone || "N/A"}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563;">City</td>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;">${data.city || "N/A"}</td>
          </tr>
          ${data.state ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563;">State</td>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;">${data.state}</td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563;">Enquiry Type</td>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;">${data.enquiryType || "Customer enquiry"}</td>
          </tr>
          ${data.productInterest ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563;">Product Interest</td>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;">${data.productInterest}</td>
          </tr>
          ` : ""}
          ${data.investmentRange ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563;">Investment Range</td>
            <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;">${data.investmentRange}</td>
          </tr>
          ` : ""}
        </table>

        <div style="margin-top: 20px; padding: 16px; background-color: #f9fafb; border-radius: 6px; border-left: 4px solid #111827;">
          <p style="margin: 0 0 6px 0; font-weight: 600; color: #374151; font-size: 14px;">Message Details:</p>
          <p style="margin: 0; color: #4b5563; font-size: 14px; white-space: pre-wrap;">${data.message || "No message provided."}</p>
        </div>
      </div>

      <div style="background-color: #f3f4f6; padding: 12px 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
        This email was sent automatically from the Labith Interno website contact form.
      </div>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `"Labith Interno Website" <${process.env.GMAIL_USER || "no-reply@labithinterno.com"}>`,
    to: recipient,
    replyTo: data.email,
    subject: `[Website ${subjectTitle}] ${data.name} - ${data.city}`,
    text: `New Enquiry from ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCity: ${data.city}\n${data.state ? `State: ${data.state}\n` : ""}Enquiry Type: ${data.enquiryType}\n${data.productInterest ? `Product Interest: ${data.productInterest}\n` : ""}${data.investmentRange ? `Investment Range: ${data.investmentRange}\n` : ""}Message:\n${data.message}`,
    html: htmlContent,
  });

  return info;
}
