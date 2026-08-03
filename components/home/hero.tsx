"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Boxes, Columns3, Gem, Layers3, PanelsTopLeft, Waves, ChevronLeft, ChevronRight } from "lucide-react";

const icons = [Gem, PanelsTopLeft, Columns3, Waves, Layers3, Boxes];

export function Hero({ productCategories }: { productCategories: { title: string; slug: string }[] }) {
  const reduced = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const checkScroll = useCallback(() => {
    if (!stripRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = stripRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll, productCategories]);

  const handleScroll = (direction: "left" | "right") => {
    if (!stripRef.current) return;
    const scrollAmount = direction === "left" ? -280 : 280;
    stripRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!stripRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - stripRef.current.offsetLeft;
    scrollLeftPos.current = stripRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !stripRef.current) return;
    e.preventDefault();
    const x = e.pageX - stripRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    stripRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const enter = (delay: number) => reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: .75, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };

  return (
    <section className="home-hero">
      <motion.div className="hero-media" initial={reduced ? false : { scale: 1.035 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: "easeOut" }}><Image src="/images/hero-living-room.png" alt="Luxury living room with dark marble and walnut wall finishes" fill priority sizes="100vw" /></motion.div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <motion.p className="eyebrow" {...enter(.1)}>PREMIUM INTERIOR PRODUCTS</motion.p>
        <motion.h1 {...enter(.18)}>World Beyond<br /><span>Imagination.</span></motion.h1>
        <motion.p className="hero-lead" {...enter(.3)}>Premium interior products that inspire, define and transform spaces.</motion.p>
        <motion.div className="button-row" {...enter(.4)}><Link href="/products" className="button button-primary">Explore Products <ArrowUpRight /></Link><Link href="/dealership" className="button button-secondary">Join Dealership <ArrowUpRight /></Link></motion.div>
      </div>

      <div className="category-strip-wrapper">
        {canScrollLeft && (
          <button onClick={() => handleScroll("left")} className="category-scroll-btn left" aria-label="Scroll left categories">
            <ChevronLeft />
          </button>
        )}
        <nav
          className="category-strip"
          ref={stripRef}
          onScroll={checkScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          aria-label="Product categories"
        >
          {productCategories.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Link href={`/products/${item.slug}`} key={item.slug} draggable={false}>
                <Icon aria-hidden="true" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
        {canScrollRight && (
          <button onClick={() => handleScroll("right")} className="category-scroll-btn right" aria-label="Scroll right categories">
            <ChevronRight />
          </button>
        )}
      </div>

      <p className="hero-index"><span>01</span> / {productCategories.length}</p>
    </section>
  );
}

