import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";

export function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <article className={`product-card ${className}`}>
      <Image src={product.images[0]} alt={`${product.title} premium interior finish`} fill sizes="(max-width: 760px) 100vw, 50vw" />
      <div className="card-shade" />
      <div className="product-card-copy"><span>{product.category}</span><h3>{product.title}</h3><p>{product.shortDescription}</p><Link href={`/products/${product.slug}`}>Explore collection <ArrowUpRight /></Link></div>
    </article>
  );
}
