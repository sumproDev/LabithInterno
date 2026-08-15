import { collections as fallbackCollections } from "@/data/collections";
import { products as fallbackProducts, type Product } from "@/data/products";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";
import { connectDB, isMongoConfigured } from "@/lib/db";
import { CollectionModel, ProductModel, TestimonialModel } from "@/models/cms";
import type { ResourceName } from "@/lib/cms-validation";

export type Collection = {
  slug: string;
  title: string;
  description: string;
  images: string[];
  productSlugs: string[];
  featured: boolean;
  order: number;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
  image?: string;
  featured?: boolean;
  order?: number;
};

function clean<T>(item: T): T {
  return JSON.parse(JSON.stringify(item));
}

type ListableModel = {
  find: (filter: object) => {
    sort: (sort: object) => {
      lean: () => Promise<unknown[]>;
    };
  };
};

async function listFromMongo<T>(model: ListableModel, fallback: T[]) {
  if (!isMongoConfigured()) return fallback;
  try {
    await connectDB();
    const items = await model.find({}).sort({ order: 1, createdAt: 1 }).lean();
    return items.length ? clean(items) as T[] : fallback;
  } catch (err) {
    console.error("MongoDB query error in listFromMongo, using fallback:", err);
    return fallback;
  }
}

export async function getProducts(): Promise<Product[]> {
  return listFromMongo<Product>(ProductModel as ListableModel, fallbackProducts);
}

export async function getCollections(): Promise<Collection[]> {
  return listFromMongo<Collection>(CollectionModel as ListableModel, fallbackCollections);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return listFromMongo<Testimonial>(TestimonialModel as ListableModel, fallbackTestimonials);
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export function getModelForResource(resource: ResourceName) {
  return {
    products: ProductModel,
    collections: CollectionModel,
    testimonials: TestimonialModel,
  }[resource];
}

export async function seedDefaults() {
  await connectDB();
  await Promise.all([
    ProductModel.bulkWrite(fallbackProducts.map((product, order) => ({ updateOne: { filter: { slug: product.slug }, update: { $setOnInsert: { ...product, order } }, upsert: true } }))),
    CollectionModel.bulkWrite(fallbackCollections.map((collection, order) => ({ updateOne: { filter: { slug: collection.slug }, update: { $setOnInsert: { ...collection, order } }, upsert: true } }))),
    TestimonialModel.bulkWrite(fallbackTestimonials.map((testimonial, order) => ({ updateOne: { filter: { name: testimonial.name, quote: testimonial.quote }, update: { $setOnInsert: { ...testimonial, featured: true, order } }, upsert: true } }))),
  ]);
}
