import { z } from "zod";

const phone = z.string().trim().regex(/^[+\d][\d\s()-]{7,17}$/, "Enter a valid phone number");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone,
  email: z.email("Enter a valid email address"),
  city: z.string().trim().min(2, "Enter your city").max(80),
  enquiryType: z.string().min(1, "Select an enquiry type"),
  productInterest: z.string().optional(),
  message: z.string().trim().min(10, "Please add a little more detail").max(1200),
  consent: z.boolean().refine(value => value, "Consent is required"),
  website: z.string().max(0).optional(),
});

export const franchiseSchema = contactSchema.extend({
  state: z.string().trim().min(2, "Enter your state").max(80),
  investmentRange: z.string().min(1, "Select a range"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type FranchiseInput = z.infer<typeof franchiseSchema>;
