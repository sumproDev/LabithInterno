import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Boxes, DraftingCompass, Headphones, Layers3, Leaf, MapPinned, ShieldCheck, SwatchBook, Truck, WandSparkles } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/buttons";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/products/product-card";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/shared/reveal";
import { FranchiseForm } from "@/components/forms/franchise-form";
import { TestimonialSlider } from "@/components/home/testimonial-slider";
import { CTASection } from "@/components/shared/cta-section";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = pageMetadata("Labith Interno LLP | Premium Interior Panels, Marble Sheets and Surface Solutions", "Explore premium marble sheets, PVC panels, WPC louvers, fluted panels, charcoal panels and PU stone solutions from Labith Interno LLP.", "/");

const benefits = [[BadgeCheck, "Premium Material Quality"], [SwatchBook, "Modern Surface Designs"], [Leaf, "Durable & Considered"], [Headphones, "Professional Support"], [Truck, "Pan-India Supply"], [MapPinned, "Franchise Growth"]] as const;
const values = [[ShieldCheck, "Premium Quality", "Carefully selected materials and finishes for considered interior applications."], [WandSparkles, "Innovative Designs", "Contemporary surfaces shaped around evolving architectural expression."], [Boxes, "Wide Product Range", "A coordinated selection for walls, ceilings and statement spaces."], [Layers3, "Long-Lasting Materials", "Practical specifications designed for everyday interior performance."], [DraftingCompass, "Professional Guidance", "Clear support from material selection through application planning."], [MapPinned, "Pan-India Support", "Product and partnership conversations across growing markets."]] as const;
const applications = [
  ["Residential Interiors", "/images/intro.jpg", "Marble sheets · WPC louvers"], ["Commercial Spaces", "/images/office.jpg", "PVC · Fluted panels"], ["Hotels & Hospitality", "/images/hotel.jpg", "PU stone · Marble sheets"], ["Retail Stores", "/images/retail.jpg", "Charcoal · Fluted panels"], ["Corporate Offices", "/images/office.jpg", "Louvers · PVC panels"], ["Modular Spaces", "/images/bedroom.jpg", "Coordinated panel systems"],
] as const;

export default function HomePage() {
  const organizationSchema = { "@context": "https://schema.org", "@type": "Organization", name: "Labith Interno LLP", url: absoluteUrl("/"), logo: absoluteUrl("/images/hero-living-room.png"), description: "Premium interior products and surface materials.", sameAs: [] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    <Hero />

    <section className="intro-section section-pad"><Container className="split-layout">
      <Reveal className="intro-collage"><div className="collage-main"><Image src="/images/intro.jpg" alt="Warm modern living room with layered interior finishes" fill sizes="(max-width: 800px) 100vw, 48vw" /></div><div className="collage-detail"><Image src="/images/marble.jpg" alt="Detailed marble inspired interior surface" fill sizes="260px" /></div><span className="vertical-label">MATERIAL · LIGHT · SPACE</span></Reveal>
      <Reveal className="intro-copy" delay={.1}><p className="eyebrow">ABOUT LABITH INTERNO</p><h2>Creating Exceptional Spaces Through <span>Exceptional Materials</span></h2><p>Welcome to Labith Interno LLP, your trusted partner for premium interior solutions and products. We provide carefully selected materials that enhance the beauty, durability and functionality of modern spaces.</p><div className="benefit-list">{benefits.map(([Icon, text]) => <div key={text}><Icon /><span>{text}</span></div>)}</div><ButtonLink href="/about">Discover Our Story</ButtonLink></Reveal>
    </Container></section>

    <section className="products-section section-pad"><Container><Reveal><div className="section-top"><SectionHeading eyebrow="THE COLLECTION" title="Materials Crafted for Modern Interiors" description="Explore premium finishes designed for residential, commercial and architectural applications." /><ButtonLink href="/products" variant="secondary">View All Products</ButtonLink></div></Reveal><div className="featured-grid">{products.map((product, i) => <Reveal key={product.slug} className={i === 0 ? "featured-large" : ""} delay={(i % 3) * .06}><ProductCard product={product} /></Reveal>)}</div></Container></section>

    <section className="why-section section-pad"><Image src="/images/louvers.jpg" alt="" fill sizes="100vw" className="cover" /><div className="why-overlay" /><Container><Reveal><SectionHeading eyebrow="THE LABITH STANDARD" title="Why Choose Labith Interno" description="A material partner for designers, businesses and homeowners who care about the details." /></Reveal><div className="value-grid">{values.map(([Icon, title, description], i) => <Reveal key={title} delay={i * .05}><article className="value-card"><span className="value-number">0{i + 1}</span><Icon /><h3>{title}</h3><p>{description}</p></article></Reveal>)}</div></Container></section>

    <section className="applications-section section-pad"><Container><Reveal><div className="section-top"><SectionHeading eyebrow="APPLICATIONS" title="Designed for Every Kind of Space" description="One considered material language, adapted across diverse environments." /><ButtonLink href="/applications" variant="secondary">Explore Applications</ButtonLink></div></Reveal><div className="application-grid">{applications.map(([name, image, note], i) => <Reveal key={name} className={i === 0 ? "application-large" : ""} delay={(i % 3) * .05}><Link href="/applications" className="application-card"><Image src={image} alt={`${name} interior application`} fill sizes="(max-width: 760px) 100vw, 50vw" /><div className="card-shade" /><span className="application-index">0{i + 1}</span><div><h3>{name}</h3><p>{note}</p><ArrowRight /></div></Link></Reveal>)}</div></Container></section>

    <section className="projects-section section-pad"><Container><Reveal><div className="section-top"><SectionHeading eyebrow="SELECTED SPACES" title="Spaces Transformed by Labith Interno" description="Concept project stories structured for easy replacement with completed portfolio photography." /><ButtonLink href="/projects" variant="secondary">View All Projects</ButtonLink></div></Reveal><div className="project-scroll">{projects.slice(0, 4).map(p => <ProjectCard project={p} key={p.slug} />)}</div></Container></section>

    <section className="franchise-home section-pad"><Container className="franchise-layout"><Reveal className="franchise-copy"><p className="eyebrow red-eyebrow">PARTNER WITH THE BRAND</p><h2>Build Your Future with <span>Labith Interno</span></h2><p>Become part of a growing premium interior-products network backed by quality materials, brand support and an expanding market.</p><ul><li>Recognized premium positioning</li><li>High-demand product categories</li><li>Marketing and sales assistance</li><li>Product and operational guidance</li><li>Territory-based opportunities</li><li>Ongoing business support</li></ul><div className="button-row"><ButtonLink href="/franchise" variant="red">Become a Franchise Partner</ButtonLink><ButtonLink href="/contact?type=franchise-brochure" variant="secondary">Franchise Details</ButtonLink></div><small>Investment details available on request. Territory availability subject to approval.</small></Reveal><Reveal className="franchise-form-card" delay={.1}><FranchiseForm compact /></Reveal></Container></section>

    <section className="testimonials-section section-pad"><Container className="testimonial-layout"><Reveal><SectionHeading eyebrow="CLIENT PERSPECTIVES" title="Material Stories, Thoughtfully Told" description="Sample testimonial content is isolated in a data file for replacement with verified client feedback." /></Reveal><Reveal delay={.1}><TestimonialSlider /></Reveal></Container></section>
    <CTASection />
  </>;
}
