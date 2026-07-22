import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { ProductFilter } from "@/components/products/product-filter";
import { CTASection } from "@/components/shared/cta-section";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Premium Interior Products", "Explore UV marble sheets, soffit panels, WPC doors and frames, WPC sheets, French moldings and decorative panels.", "/products");
export default function ProductsPage() { return <><PageHero eyebrow="PRODUCT COLLECTIONS" title="Interior Products Built for Better Spaces" description="Explore Labith Interno's complete product range, finishes and visual collections." image="/images/marble.jpg" /><section className="section-pad catalog-section"><Container><ProductFilter /></Container></section><CTASection /></>; }
