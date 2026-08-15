import { z } from "zod";

const slug = z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens.");
const csvArray = z.array(z.string().trim().min(1)).default([]);
const imageString = z.string().trim().refine(
  (val) => val === "" || val.startsWith("/") || val.startsWith("http://") || val.startsWith("https://") || val.startsWith("data:"),
  { message: "Image path must be a valid URL (e.g. Cloudinary https://res.cloudinary.com/... or relative path)" }
);
const imageArray = z.array(imageString).default([]);

export const productSchema = z.object({
  id: z.string().trim().min(2),
  slug,
  title: z.string().trim().min(2),
  category: z.string().trim().min(2),
  shortDescription: z.string().trim().min(10),
  fullDescription: z.string().trim().min(10),
  images: imageArray,
  finishes: csvArray,
  applications: csvArray,
  features: csvArray,
  dimensions: z.string().trim().default(""),
  installation: z.string().trim().default(""),
  maintenance: z.string().trim().default(""),
  featured: z.boolean().default(true),
  order: z.coerce.number().default(0),
});

export const collectionSchema = z.object({
  slug,
  title: z.string().trim().min(2),
  description: z.string().trim().default(""),
  images: imageArray,
  productSlugs: csvArray,
  featured: z.boolean().default(true),
  order: z.coerce.number().default(0),
});

export const testimonialSchema = z.object({
  quote: z.string().trim().min(10),
  name: z.string().trim().min(2),
  role: z.string().trim().default(""),
  rating: z.coerce.number().min(1).max(5).default(5),
  image: imageString.default(""),
  featured: z.boolean().default(true),
  order: z.coerce.number().default(0),
});

export const schemas = {
  products: productSchema,
  collections: collectionSchema,
  testimonials: testimonialSchema,
};

export type ResourceName = keyof typeof schemas;

export function isResourceName(value: string): value is ResourceName {
  return value === "products" || value === "collections" || value === "testimonials";
}
