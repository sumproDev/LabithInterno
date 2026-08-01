import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { ProductFilter } from "@/components/products/product-filter";
import { CTASection } from "@/components/shared/cta-section";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/seo";
import { getProducts } from "@/lib/cms";

export const metadata: Metadata = pageMetadata("Premium Interior Products", "Explore UV marble sheets, soffit panels, WPC doors and frames, WPC sheets, French moldings and decorative panels.", "/products");
export const dynamic = "force-dynamic";
export default async function ProductsPage() { const products = await getProducts(); return <><PageHero eyebrow="PRODUCT COLLECTIONS" title="Interior Products Built for Better Spaces" description="Explore Labith Interno's complete product range, finishes and visual collections." image="/images/marble.jpg" /><section className="section-pad catalog-section"><Container><ProductFilter products={products} /></Container></section><CTASection /></>; }
