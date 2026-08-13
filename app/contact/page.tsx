import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Contact Labith Interno", "Contact Labith Interno for customer product and dealership enquiries.", "/contact");
const details = [[MapPin,"Visit us","Vasant Vihar, Kosi Colony, PWD Colony, Purnia, Bihar 854301","Head Office / Experience Centre"],[Phone,"Call us","+91 95708 00440","Direct phone line"],[Mail,"Email us","labithinternollp@gmail.com","Official email address"],[Clock3,"Business hours","Monday-Saturday · 10:00-18:00","Customer support hours"]] as const;

export default function ContactPage(){
  const num=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||"919570800440";
  return <><PageHero eyebrow="CONTACT LABITH INTERNO" title="Connect with Our Product Team" description="Send a customer or dealership enquiry and our team will help with the next step." image="/images/hero-living-room.png"/><section className="contact-main section-pad"><Container><div className="contact-sidebar"><p className="eyebrow">GET IN TOUCH</p><h2>Product questions start with one simple conversation.</h2><p>Use the enquiry form for product information or dealership interest.</p><div className="contact-details">{details.map(([Icon,title,value,note])=><article key={title}><Icon/><div><h3>{title}</h3><p>{value}</p><small>{note}</small></div></article>)}</div><Link className="whatsapp-wide" href={`https://wa.me/${num}`} target="_blank"><MessageCircle/>Continue on WhatsApp</Link></div><ContactForm/></Container></section></>;
}
