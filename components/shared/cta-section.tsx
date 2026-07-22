import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/buttons";

export function CTASection() {
  return (
    <section className="cta-section"><Image src="/images/hero-living-room.png" alt="" fill sizes="100vw" className="cover" /><div className="cta-shade" /><Container><p className="eyebrow">DISCOVER THE RANGE</p><h2>Find the Right Interior Product</h2><p>Explore the complete Labith Interno collection or send a customer enquiry.</p><div className="button-row"><ButtonLink href="/contact">Customer Enquiry</ButtonLink><ButtonLink href="/products" variant="secondary">View Products</ButtonLink></div></Container></section>
  );
}
