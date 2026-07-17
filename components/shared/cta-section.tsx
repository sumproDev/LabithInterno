import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/buttons";

export function CTASection() {
  return (
    <section className="cta-section"><Image src="/images/hero-living-room.png" alt="" fill sizes="100vw" className="cover" /><div className="cta-shade" /><Container><p className="eyebrow">START A CONVERSATION</p><h2>Ready to Transform Your Space?</h2><p>Connect with our team to explore premium materials for your next interior project.</p><div className="button-row"><ButtonLink href="/contact?type=quote">Request a Quote</ButtonLink><ButtonLink href="/products" variant="secondary">View Products</ButtonLink></div></Container></section>
  );
}
