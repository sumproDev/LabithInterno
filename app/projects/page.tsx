import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { CTASection } from "@/components/shared/cta-section";
import { Container } from "@/components/ui/container";
import { ProjectFilter } from "@/components/projects/project-filter";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Interior Projects", "Explore residential, commercial, hospitality and retail interior material case studies.", "/projects");
export default function ProjectsPage() { return <><PageHero eyebrow="PROJECT JOURNAL" title="Spaces Transformed by Material" description="An editorial portfolio framework ready for verified completed-project photography, locations and specifications." image="/images/office.jpg" /><section className="featured-case section-pad"><Container><div className="featured-case-image"><Image src="/images/intro.jpg" alt="Featured luxury living room concept" fill sizes="(max-width: 900px) 100vw, 60vw" /></div><div className="featured-case-copy"><p className="eyebrow">FEATURED CASE STUDY</p><h2>Luxury Living Room Transformation</h2><p>A warm, architectural focal wall built through the contrast of marble movement and precise vertical profiles.</p><dl><div><dt>Type</dt><dd>Residential</dd></div><div><dt>Materials</dt><dd>Marble Sheets · WPC Louvers</dd></div><div><dt>Location</dt><dd>Available on request</dd></div></dl><Link href="/projects/luxury-living-room">View the case study <ArrowUpRight /></Link></div></Container></section><section className="project-catalog section-pad"><Container><ProjectFilter /></Container></section><section className="before-after section-pad"><Container><div><p className="eyebrow">BEFORE / AFTER</p><h2>From Blank Plane to Material Moment</h2><p>This comparison placeholder is intentionally labeled and can be replaced with verified before-and-after project photography.</p></div><div className="comparison"><div><Image src="/images/office.jpg" alt="Before state placeholder" fill sizes="50vw" /><span>Before · Placeholder</span></div><div><Image src="/images/louvers.jpg" alt="After state placeholder" fill sizes="50vw" /><span>After · Placeholder</span></div></div></Container></section><CTASection /></>; }
