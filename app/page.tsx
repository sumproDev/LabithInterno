import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Boxes, Layers3, Leaf, MapPinned, ShieldCheck, SwatchBook, Truck, WandSparkles } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/buttons";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/products/product-card";
import { Reveal } from "@/components/shared/reveal";
import { FranchiseForm } from "@/components/forms/franchise-form";
import { CTASection } from "@/components/shared/cta-section";
import { products } from "@/data/products";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = pageMetadata("Labith Interno LLP | Premium Interior Products", "Explore UV marble sheets, soffit panels, WPC doors and frames, WPC sheets, French moldings and premium decorative panels from Labith Interno LLP.", "/");

const benefits = [[BadgeCheck, "Premium Product Quality"], [SwatchBook, "Modern Designs"], [Leaf, "Durable Materials"], [Boxes, "Wide Product Range"], [Truck, "Pan-India Supply"], [MapPinned, "Franchise Network"]] as const;
const values = [[ShieldCheck, "Selected Quality", "Interior products selected for appearance, finish and practical everyday performance."], [WandSparkles, "Design Variety", "A broad visual range spanning marble, wood, stone, linear and decorative finishes."], [Boxes, "Complete Range", "Coordinated products for walls, ceilings, doors, frames and decorative detailing."], [Layers3, "Product Information", "Clear finish, size, fitting and care information for confident product selection."]] as const;

export default function HomePage() {
  const organizationSchema = { "@context": "https://schema.org", "@type": "Organization", name: "Labith Interno LLP", url: absoluteUrl("/"), logo: absoluteUrl("/images/logo.webp"), description: "Premium interior products and decorative surface materials.", sameAs: [] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    <Hero />

    <section className="intro-section section-pad"><Container className="split-layout">
      <Reveal className="intro-collage"><div className="collage-main"><Image src="/images/tile1.jpeg" alt="Labith Interno fluted panel product" fill sizes="(max-width: 800px) 100vw, 48vw" /></div><div className="collage-detail"><Image src="/images/fluted-panel-living-room.jpeg" alt="UV marble sheet design" fill sizes="260px" /></div><span className="vertical-label">PRODUCT · FINISH · DETAIL</span></Reveal>
      <Reveal className="intro-copy" delay={.1}><p className="eyebrow">ABOUT LABITH INTERNO</p><h2>A Brand Built Around <span>Interior Products</span></h2><p>Labith Interno LLP offers a focused collection of premium interior products for modern residential and commercial spaces, supported by a growing franchise-led market presence.</p><div className="benefit-list">{benefits.map(([Icon, text]) => <div key={text}><Icon /><span>{text}</span></div>)}</div><ButtonLink href="/about">Discover the Brand</ButtonLink></Reveal>
    </Container></section>

    <section className="products-section section-pad"><Container><Reveal><div className="section-top"><SectionHeading eyebrow="THE PRODUCT RANGE" title="Everything Starts with the Right Product" description="Explore UV marble sheets, soffit panels, WPC products, French moldings and decorative interior finishes." /><ButtonLink href="/products" variant="secondary">View All Products</ButtonLink></div></Reveal><div className="featured-grid">{products.map((product, i) => <Reveal key={product.slug} className={i === 0 ? "featured-large" : ""} delay={(i % 3) * .04}><ProductCard product={product} /></Reveal>)}</div></Container></section>

    <section className="why-section section-pad"><Image src="/images/fluted-wall-with-lights.jpeg" alt="Labith Interno decorative wall product" fill sizes="100vw" className="cover" /><div className="why-overlay" /><Container><Reveal><SectionHeading eyebrow="THE LABITH STANDARD" title="Why Choose Labith Interno Products" description="A design-led product portfolio for dealers, franchise partners and customers." /></Reveal><div className="value-grid">{values.map(([Icon, title, description], i) => <Reveal key={title} delay={i * .05}><article className="value-card"><span className="value-number">0{i + 1}</span><Icon /><h3>{title}</h3><p>{description}</p></article></Reveal>)}</div></Container></section>

    <section className="franchise-home section-pad"><Container className="franchise-layout"><Reveal className="franchise-copy"><p className="eyebrow red-eyebrow">PARTNER WITH THE BRAND</p><h2>Grow with <span>Labith Interno</span></h2><p>Join a franchise model built around premium interior products, strong visual branding and expanding customer demand.</p><ul><li>Premium brand positioning</li><li>High-demand product categories</li><li>Marketing and sales assistance</li><li>Product knowledge support</li><li>Territory-based opportunities</li><li>Ongoing business coordination</li></ul><div className="button-row"><ButtonLink href="/franchise" variant="red">Franchise Opportunity</ButtonLink></div><small>Territory availability and commercial terms are subject to evaluation and formal agreement.</small></Reveal><Reveal className="franchise-form-card" delay={.1}><FranchiseForm compact /></Reveal></Container></section>

    <CTASection />
  </>;
}
