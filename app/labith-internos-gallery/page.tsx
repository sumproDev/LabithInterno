import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/shared/page-hero";
import { CTASection } from "@/components/shared/cta-section";
import { getCollections, getProducts, getProjects } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

type GalleryItem = {
  src: string;
  title: string;
  label: string;
  href: string;
  type: "Product" | "Project" | "Gallery";
};

export const metadata: Metadata = pageMetadata(
  "Labith Interno Gallery",
  "Browse a masonry gallery of Labith Interno product visuals, projects and available interior material images.",
  "/labith-internos-gallery",
);
export const dynamic = "force-dynamic";

function titleFromFile(file: string) {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function getGalleryItems(): Promise<GalleryItem[]> {
  const [products, projects, collections] = await Promise.all([getProducts(), getProjects(), getCollections()]);
  const productItems = products.flatMap((product) =>
    product.images.map((src) => ({
      src,
      title: product.title,
      label: product.category,
      href: `/products/${product.slug}`,
      type: "Product" as const,
    })),
  );

  const projectItems = projects.map((project) => ({
    src: project.image,
    title: project.title,
    label: project.products.join(" + "),
    href: `/projects/${project.slug}`,
    type: "Project" as const,
  }));

  const collectionItems = collections.flatMap((collection) =>
    collection.images.map((src) => ({
      src,
      title: collection.title,
      label: "Collection",
      href: "/products",
      type: "Gallery" as const,
    })),
  );

  const used = new Set([...productItems, ...projectItems, ...collectionItems].map((item) => item.src));
  const imageDirectory = path.join(process.cwd(), "public", "images");
  const availableItems = fs
    .readdirSync(imageDirectory)
    .filter((file) => /\.(jpe?g|png|webp|jfif)$/i.test(file))
    .map((file) => `/images/${file}`)
    .filter((src) => !used.has(src) && !src.includes("logo"))
    .map((src) => ({
      src,
      title: titleFromFile(path.basename(src)),
      label: "Available image",
      href: "/products",
      type: "Gallery" as const,
    }));

  const unique = new Map<string, GalleryItem>();
  [...productItems, ...projectItems, ...collectionItems, ...availableItems].forEach((item) => unique.set(item.src, item));
  return Array.from(unique.values());
}

export default async function LabithInternosGalleryPage() {
  const [items, products, projects] = await Promise.all([getGalleryItems(), getProducts(), getProjects()]);

  return (
    <>
      <PageHero
        eyebrow="LABITH INTERNOS GALLERY"
        title="A Material Gallery for Beautiful Interior Ideas"
        description="Explore product finishes, installed looks, statement walls, ceiling details and stone-inspired textures from the Labith Interno image collection."
        image="/images/hero-living-room.png"
      />
      <section className="gallery-intro section-pad">
        <Container>
          <div className="gallery-intro-grid">
            <div>
              <p className="eyebrow">VISUAL COLLECTION</p>
              <h2>Every product image in one flowing masonry view.</h2>
            </div>
            <p>
              Browse the full image collection across UV marble sheets, soffit panels, WPC products, French moldings, louvers, fluted panels, charcoal panels, PU Stone and project visuals.
            </p>
          </div>
          <div className="gallery-stats">
            <span><Images /> {items.length} visuals</span>
            <span>{products.length} product collections</span>
            <span>{projects.length} project stories</span>
          </div>
        </Container>
      </section>
      <section className="masonry-section">
        <Container>
          <div className="masonry-grid">
            {items.map((item, index) => (
              <Link className={`masonry-card masonry-card-${(index % 5) + 1}`} href={item.href} key={item.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={`${item.title} by Labith Interno`} loading={index < 8 ? "eager" : "lazy"} />
                <span className="masonry-type">{item.type}</span>
                <div>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>View details <ArrowUpRight /></p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
