import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { ProductFilter } from "@/components/products/product-filter";
import { CTASection } from "@/components/shared/cta-section";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Premium Interior Products", "Explore marble sheets, PVC panels, WPC louvers, fluted panels, charcoal panels and PU stone.", "/products");
export default function ProductsPage() { return <><PageHero eyebrow="MATERIAL COLLECTIONS" title="Surfaces Made to Shape the Atmosphere" description="Explore architectural finishes created for character, clarity and everyday interior performance." image="/images/marble.jpg" /><section className="section-pad catalog-section"><Container><ProductFilter /></Container></section><CTASection /></>; }
