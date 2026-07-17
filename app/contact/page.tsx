import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Contact Labith Interno", "Contact Labith Interno for product enquiries, samples, quotations, projects and franchise opportunities.", "/contact");
const details = [[Phone,"Call us","+91 00000 00000","Replace with official phone"],[Mail,"Email us","hello@example.com","Replace with official email"],[MapPin,"Visit us","Registered office address to be updated","Replace with official address"],[Clock3,"Business hours","Monday–Saturday · 10:00–18:00","Confirm official hours"]] as const;
export default function ContactPage(){const num=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||"910000000000";return <><PageHero eyebrow="CONTACT LABITH INTERNO" title="Let’s Bring Your Material Vision to Life" description="Share your product, project or partnership requirement and our team will help with the next step." image="/images/hero-living-room.png"/><section className="contact-main section-pad"><Container><div className="contact-sidebar"><p className="eyebrow">GET IN TOUCH</p><h2>One conversation can clarify the whole material direction.</h2><p>Contact details below are clearly marked placeholders and should be replaced before public launch.</p><div className="contact-details">{details.map(([Icon,title,value,note])=><article key={title}><Icon/><div><h3>{title}</h3><p>{value}</p><small>{note}</small></div></article>)}</div><Link className="whatsapp-wide" href={`https://wa.me/${num}`} target="_blank"><MessageCircle/>Continue on WhatsApp</Link></div><ContactForm/></Container></section><section className="map-section"><div><MapPin/><h2>Google Maps location placeholder</h2><p>Add the verified office or showroom address and embed after launch details are confirmed.</p></div></section></>}
