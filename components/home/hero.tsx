"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Boxes, Columns3, Gem, Layers3, PanelsTopLeft, Waves } from "lucide-react";
import { productCategories } from "@/data/products";

const icons = [Gem, PanelsTopLeft, Columns3, Waves, Layers3, Boxes];

export function Hero() {
  const reduced = useReducedMotion();
  const enter = (delay: number) => reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: .75, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
  return (
    <section className="home-hero">
      <motion.div className="hero-media" initial={reduced ? false : { scale: 1.035 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: "easeOut" }}><Image src="/images/hero-living-room.png" alt="Luxury living room with dark marble and walnut wall finishes" fill priority sizes="100vw" /></motion.div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <motion.p className="eyebrow" {...enter(.1)}>PREMIUM INTERIOR SOLUTIONS</motion.p>
        <motion.h1 {...enter(.18)}>World Beyond<br /><span>Imagination.</span></motion.h1>
        <motion.p className="hero-lead" {...enter(.3)}>Premium interior products that inspire, define and transform spaces.</motion.p>
        <motion.div className="button-row" {...enter(.4)}><Link href="/products" className="button button-primary">Explore Products <ArrowUpRight /></Link><Link href="/franchise" className="button button-secondary">Join Franchise <ArrowUpRight /></Link></motion.div>
      </div>
      <nav className="category-strip" aria-label="Product categories">
        {productCategories.map((item, index) => { const Icon = icons[index]; return <Link href={`/products/${item.slug}`} key={item.slug}><Icon aria-hidden="true" /><span>{item.title}</span></Link>; })}
      </nav>
      <p className="hero-index"><span>01</span> / 06</p>
    </section>
  );
}
