import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { CTASection } from "@/components/shared/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Interior Applications", "Discover suitable Labith Interno materials for residential, commercial, hospitality, retail and office spaces.", "/applications");
const spaces = [
  ["Residential", "/images/intro.jpg", "Create expressive living rooms, bedrooms and transition spaces with warm texture and refined focal surfaces.", ["Marble Sheets", "WPC Louvers", "Fluted Panels"]],
  ["Commercial", "/images/office.jpg", "Bring a clear, professional material language to workplaces, receptions and client-facing environments.", ["PVC Panels", "WPC Louvers", "Marble Sheets"]],
  ["Hospitality", "/images/hotel.jpg", "Shape memorable arrival zones, guest spaces and feature moments through layered surfaces and warm light.", ["PU Stone", "Charcoal Panels", "Marble Sheets"]],
  ["Retail", "/images/retail.jpg", "Use texture and contrast to guide attention, frame displays and create a recognizable store atmosphere.", ["Charcoal Panels", "Fluted Panels", "PVC Panels"]],
  ["Offices", "/images/office.jpg", "Balance practical performance with visual calm across meeting rooms, desks and collaboration zones.", ["WPC Louvers", "PVC Panels", "Fluted Panels"]],
  ["Modular & Architectural", "/images/louvers.jpg", "Coordinate repeatable panel systems for modular spaces, layered elevations and design-led architectural details.", ["WPC Louvers", "PU Stone", "PVC Panels"]],
] as const;
export default function ApplicationsPage() { return <><PageHero eyebrow="SPACES & POSSIBILITIES" title="Designed for Every Kind of Space" description="Material solutions that adapt to the mood, movement and practical demands of diverse environments." image="/images/hotel.jpg" /><section className="applications-list section-pad"><Container>{spaces.map(([title, image, body, products], i) => <Reveal key={title}><article className={i % 2 ? "reverse" : ""}><div className="application-feature-image"><Image src={image} alt={`${title} interior finished with premium surfaces`} fill sizes="(max-width: 860px) 100vw, 50vw" /></div><div className="application-feature-copy"><span>0{i + 1}</span><p className="eyebrow">APPLICATION</p><h2>{title}</h2><p>{body}</p><h3>Suitable materials</h3><ul>{products.map(p => <li key={p}><Check />{p}</li>)}</ul><div><Link href="/products">Explore materials <ArrowRight /></Link><Link href="/projects">Related projects <ArrowRight /></Link></div></div></article></Reveal>)}</Container></section><CTASection /></>; }
