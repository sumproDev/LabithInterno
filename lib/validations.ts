import { z } from "zod";

const alphaRegex = /^[a-zA-Z\s.'-]+$/;

const phone = z.string().trim()
  .min(7, "Enter a valid phone number")
  .max(18, "Enter a valid phone number")
  .refine((val) => !/[a-zA-Z]/.test(val), "Phone number must contain digits only (no letters)")
  .regex(/^[+\d][\d\s()-]{6,17}$/, "Enter a valid phone number format")
  .refine((val) => {
    const digits = val.replace(/\D/g, "");
    return digits.length >= 7 && !/^(.)\1+$/.test(digits);
  }, "Enter a valid phone number (avoid repeating dummy digits)");

export const contactSchema = z.object({
  name: z.string().trim()
    .min(2, "Enter your full name")
    .max(80)
    .refine((val) => !/\d/.test(val), "Full name cannot contain numbers")
    .regex(alphaRegex, "Full name must contain letters only"),
  phone,
  email: z.string().trim().email("Enter a valid email address"),
  city: z.string().trim()
    .min(2, "Enter your city name")
    .max(80)
    .refine((val) => !/\d/.test(val), "City name cannot contain numbers")
    .regex(alphaRegex, "City name must contain letters only"),
  enquiryType: z.string().min(1, "Select an enquiry type"),
  productInterest: z.string().optional(),
  message: z.string().trim().min(10, "Please add a little more detail").max(1200),
  consent: z.boolean().refine(value => value, "Consent is required"),
  website: z.string().max(0).optional(),
});

export const franchiseSchema = contactSchema.extend({
  state: z.string().trim()
    .min(2, "Enter your state name")
    .max(80)
    .refine((val) => !/\d/.test(val), "State name cannot contain numbers")
    .regex(alphaRegex, "State name must contain letters only"),
  investmentRange: z.string().trim().min(1, "Please select an investment range"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type FranchiseInput = z.infer<typeof franchiseSchema>;


