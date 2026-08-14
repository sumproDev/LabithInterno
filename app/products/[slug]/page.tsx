import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Home, LayoutGrid, Ruler, Sparkles, SwatchBook, Wrench } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/buttons";
import { getProductBySlug, getProducts } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

const fallbackImages = [
  "https://res.cloudinary.com/l5uf8nit/image/upload/v1786531828/labith-interno/xpwipasnqttrlefy6red.jpg",
  "https://res.cloudinary.com/l5uf8nit/image/upload/v1786533193/labith-interno/otylsnpmn1r5xdqos7y1.jpg",
  "https://res.cloudinary.com/l5uf8nit/image/upload/v1786532859/labith-interno/vvfesf1m4kjmnxl8nojj.jpg"
];

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return product ? pageMetadata(product.title, product.shortDescription || product.fullDescription, `/products/${slug}`) : {};
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find(p => p.slug === slug);
  if (!product) notFound();

  const images = (product.images || []).map(img => img.trim()).filter(Boolean);
  const displayImages = images.length > 0 ? images : fallbackImages;

  const features = (product.features || []).map(f => f.trim()).filter(Boolean);
  const finishes = (product.finishes || []).map(f => f.trim()).filter(Boolean);
  const applications = (product.applications || []).map(a => a.trim()).filter(Boolean);

  const intro = (product.shortDescription || product.fullDescription || "").trim();
  const fullDesc = (product.fullDescription || "").trim();
  const dimensions = (product.dimensions || "").trim();
  const installation = (product.installation || "").trim();
  const maintenance = (product.maintenance || "").trim();

  const related = products.filter(p => p.slug !== slug).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "Product", name: product.title, description: intro || fullDesc, image: displayImages.map(absoluteUrl), brand: { "@type": "Brand", name: "Labith Interno" }, category: product.category };
  const crumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Products", item: absoluteUrl("/products") }, { "@type": "ListItem", position: 3, name: product.title, item: absoluteUrl(`/products/${slug}`) }] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
    <section className="product-detail-hero">
      <Container>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/"><Home />Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <span>{product.title}</span>
        </nav>
        <div className="product-detail-grid">
          <div className="gallery">
            <div className="gallery-main">
              <Image src={displayImages[0]} alt={`${product.title} product detail`} fill priority sizes="(max-width: 900px) 100vw, 36vw" />
            </div>
            {displayImages.length > 1 && (
              <div className="gallery-side">
                <div className="gallery-small">
                  <Image src={displayImages[1] || displayImages[0]} alt={`${product.title} finish 1`} fill sizes="(max-width: 900px) 100vw, 24vw" />
                </div>
                {displayImages.length > 2 && (
                  <div className="gallery-small">
                    <Image src={displayImages[2] || displayImages[1] || displayImages[0]} alt={`${product.title} finish 2`} fill sizes="(max-width: 900px) 100vw, 24vw" />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="product-summary">
            <p className="eyebrow">{product.category || "Premium Product"}</p>
            <h1>{product.title}</h1>
            {intro && <p className="product-intro">{intro}</p>}
            {features.length > 0 && (
              <ul>
                {features.map(f => <li key={f}><Check />{f}</li>)}
              </ul>
            )}
            <ButtonLink href={`/contact?product=${slug}`}>Customer Enquiry <ArrowRight /></ButtonLink>
          </div>
        </div>
      </Container>
    </section>

    <section className="spec-section section-pad">
      <Container>
        <div className="spec-heading">
          <div>
            <p className="eyebrow">PRODUCT DETAILS</p>
            <h2>Material selection, made simpler.</h2>
          </div>
          {fullDesc ? (
            <p>{fullDesc}</p>
          ) : (
            <p>Compare finishes, understand ideal applications and review practical details before choosing {product.title} for your space.</p>
          )}
        </div>
        <div className="product-spec-layout">
          {finishes.length > 0 && (
            <article className="finish-panel">
              <span className="spec-number">01</span>
              <SwatchBook />
              <p className="spec-kicker">FINISH PALETTE</p>
              <h3>Find the right expression.</h3>
              <p>Choose a tone and surface character that works with the light, furniture and material palette of your interior.</p>
              <div className="finish-list">
                {finishes.map(f => <span key={f}>{f}</span>)}
              </div>
            </article>
          )}
          <div className="spec-info-grid">
            {applications.length > 0 && (
              <article className="spec-card">
                <LayoutGrid />
                <div>
                  <p className="spec-kicker">BEST SUITED FOR</p>
                  <h3>Where it works</h3>
                  <div className="product-application-list">
                    {applications.map(a => <span key={a}>{a}</span>)}
                  </div>
                </div>
              </article>
            )}
            {dimensions && (
              <article className="spec-card">
                <Ruler />
                <div>
                  <p className="spec-kicker">PLANNING</p>
                  <h3>Dimensions</h3>
                  <p>{dimensions}</p>
                </div>
              </article>
            )}
            {installation && (
              <article className="spec-card">
                <Wrench />
                <div>
                  <p className="spec-kicker">INSTALLATION</p>
                  <h3>Fitting guidance</h3>
                  <p>{installation}</p>
                </div>
              </article>
            )}
            {maintenance && (
              <article className="spec-card">
                <Sparkles />
                <div>
                  <p className="spec-kicker">AFTERCARE</p>
                  <h3>Simple upkeep</h3>
                  <p>{maintenance}</p>
                </div>
              </article>
            )}
          </div>
        </div>
      </Container>
    </section>

    {displayImages.length > 2 && (
      <section className="product-visuals section-pad">
        <Container>
          <div className="section-top">
            <div>
              <p className="eyebrow">PRODUCT VISUALS</p>
              <h2>Explore the Collection</h2>
            </div>
          </div>
          <div className="product-visual-grid">
            {displayImages.slice(2).map((image, index) => (
              <div key={`${image}-${index}`}>
                <Image src={image} alt={`${product.title} design ${index + 1}`} fill sizes="(max-width: 680px) 50vw, (max-width: 1024px) 33vw, 25vw" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    )}

    <section className="product-enquiry section-pad">
      <Container className="form-split">
        <div>
          <p className="eyebrow">CUSTOMER ENQUIRY</p>
          <h2>Ask About {product.title}</h2>
          <p>Share your city and product requirement for current options and details.</p>
          <Link href="/contact">Open the customer enquiry page <ArrowRight /></Link>
        </div>
        <ContactForm compact />
      </Container>
    </section>

    {related.length > 0 && (
      <section className="related-section section-pad">
        <Container>
          <div className="section-top">
            <div>
              <p className="eyebrow">CONTINUE EXPLORING</p>
              <h2>Related Products</h2>
            </div>
            <ButtonLink href="/products" variant="secondary">View all products</ButtonLink>
          </div>
          <div className="related-grid">
            {related.map(p => <ProductCard product={p} key={p.slug} />)}
          </div>
        </Container>
      </section>
    )}
  </>;
}
