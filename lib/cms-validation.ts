import { z } from "zod";

const slug = z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens.");
const csvArray = z.array(z.string().trim().min(1)).default([]);
const imageArray = z.array(z.string().url().or(z.string().startsWith("/images/"))).default([]);

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

export const projectSchema = z.object({
  slug,
  title: z.string().trim().min(2),
  location: z.string().trim().default(""),
  type: z.string().trim().min(2),
  products: csvArray,
  image: z.string().url().or(z.string().startsWith("/images/")),
  challenge: z.string().trim().default(""),
  approach: z.string().trim().default(""),
  result: z.string().trim().default(""),
  featured: z.boolean().default(true),
  order: z.coerce.number().default(0),
});

export const testimonialSchema = z.object({
  quote: z.string().trim().min(10),
  name: z.string().trim().min(2),
  role: z.string().trim().default(""),
  rating: z.coerce.number().min(1).max(5).default(5),
  image: z.string().url().or(z.literal("")).default(""),
  featured: z.boolean().default(true),
  order: z.coerce.number().default(0),
});

export const schemas = {
  products: productSchema,
  collections: collectionSchema,
  projects: projectSchema,
  testimonials: testimonialSchema,
};

export type ResourceName = keyof typeof schemas;

export function isResourceName(value: string): value is ResourceName {
  return value === "products" || value === "collections" || value === "projects" || value === "testimonials";
}
