import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Download, Home } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/product-card";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/buttons";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const product = products.find(p => p.slug === slug); return product ? pageMetadata(product.title, product.shortDescription, `/products/${slug}`) : {}; }

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const product = products.find(p => p.slug === slug); if (!product) notFound(); const related = products.filter(p => p.slug !== slug).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "Product", name: product.title, description: product.fullDescription, image: product.images.map(absoluteUrl), brand: { "@type": "Brand", name: "Labith Interno" }, category: product.category };
  const crumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Products", item: absoluteUrl("/products") }, { "@type": "ListItem", position: 3, name: product.title, item: absoluteUrl(`/products/${slug}`) }] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
    <section className="product-detail-hero"><Container><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/"><Home/>Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><span>{product.title}</span></nav><div className="product-detail-grid"><div className="gallery"><div className="gallery-main"><Image src={product.images[0]} alt={`${product.title} surface detail`} fill priority sizes="(max-width: 900px) 100vw, 58vw" /></div><div className="gallery-small"><Image src={product.images[1]} alt={`${product.title} interior application`} fill sizes="(max-width: 900px) 100vw, 28vw" /></div></div><div className="product-summary"><p className="eyebrow">{product.category}</p><h1>{product.title}</h1><p className="product-intro">{product.fullDescription}</p><ul>{product.features.map(f => <li key={f}><Check />{f}</li>)}</ul><div className="button-row"><ButtonLink href={`/contact?type=sample&product=${slug}`}>Request a Sample</ButtonLink><ButtonLink href={product.brochure} variant="secondary">Brochure <Download /></ButtonLink></div></div></div></Container></section>
    <section className="spec-section section-pad"><Container><div className="spec-grid"><article><h2>Available finishes</h2><div className="finish-list">{product.finishes.map(f => <span key={f}>{f}</span>)}</div></article><article><h2>Applications</h2><div className="finish-list">{product.applications.map(a => <span key={a}>{a}</span>)}</div></article><article><h2>Technical information</h2><dl><dt>Dimensions</dt><dd>{product.dimensions}</dd><dt>Installation</dt><dd>{product.installation}</dd><dt>Maintenance</dt><dd>{product.maintenance}</dd></dl></article></div></Container></section>
    <section className="product-enquiry section-pad"><Container className="form-split"><div><p className="eyebrow">PROJECT SUPPORT</p><h2>Specify {product.title} for Your Space</h2><p>Tell us about the application and our team can help with selection, current options and next steps.</p><Link href="/contact">Prefer a general conversation? Contact our team <ArrowRight /></Link></div><ContactForm compact /></Container></section>
    <section className="related-section section-pad"><Container><div className="section-top"><div><p className="eyebrow">CONTINUE EXPLORING</p><h2>Related Materials</h2></div><ButtonLink href="/products" variant="secondary">View all products</ButtonLink></div><div className="related-grid">{related.map(p => <ProductCard product={p} key={p.slug} />)}</div></Container></section>
  </>;
}
