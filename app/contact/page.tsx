import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Mail, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Contact Labith Interno", "Contact Labith Interno for customer product and franchise enquiries.", "/contact");
const details = [[Phone,"Call us","+91 00000 00000","Replace with official phone"],[Mail,"Email us","hello@example.com","Replace with official email"],[Clock3,"Business hours","Monday-Saturday · 10:00-18:00","Confirm official hours"]] as const;

export default function ContactPage(){
  const num=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||"910000000000";
  return <><PageHero eyebrow="CONTACT LABITH INTERNO" title="Connect with Our Product Team" description="Send a customer or franchise enquiry and our team will help with the next step." image="/images/fluted-panel-bedroom.jpeg"/><section className="contact-main section-pad"><Container><div className="contact-sidebar"><p className="eyebrow">GET IN TOUCH</p><h2>Product questions start with one simple conversation.</h2><p>Use the enquiry form for product information or franchise interest.</p><div className="contact-details">{details.map(([Icon,title,value,note])=><article key={title}><Icon/><div><h3>{title}</h3><p>{value}</p><small>{note}</small></div></article>)}</div><Link className="whatsapp-wide" href={`https://wa.me/${num}`} target="_blank"><MessageCircle/>Continue on WhatsApp</Link></div><ContactForm/></Container></section></>;
}
