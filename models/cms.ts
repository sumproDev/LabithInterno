import mongoose, { Schema } from "mongoose";

const stringArray = { type: [String], default: [] };

const productSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    fullDescription: { type: String, required: true, trim: true },
    images: stringArray,
    finishes: stringArray,
    applications: stringArray,
    features: stringArray,
    dimensions: { type: String, default: "" },
    installation: { type: String, default: "" },
    maintenance: { type: String, default: "" },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const collectionSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    images: stringArray,
    productSlugs: stringArray,
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    location: { type: String, default: "" },
    type: { type: String, required: true, trim: true },
    products: stringArray,
    image: { type: String, required: true },
    challenge: { type: String, default: "" },
    approach: { type: String, default: "" },
    result: { type: String, default: "" },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const testimonialSchema = new Schema(
  {
    quote: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    image: { type: String, default: "" },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema);
export const CollectionModel = mongoose.models.Collection || mongoose.model("Collection", collectionSchema);
export const ProjectModel = mongoose.models.Project || mongoose.model("Project", projectSchema);
export const TestimonialModel = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
