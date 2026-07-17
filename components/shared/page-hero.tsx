import Image from "next/image";
import { Container } from "@/components/ui/container";

export function PageHero({ eyebrow, title, description, image = "/images/hero-living-room.png" }: { eyebrow: string; title: string; description: string; image?: string }) {
  return (
    <section className="page-hero">
      <Image src={image} alt="" fill priority sizes="100vw" className="cover" />
      <div className="page-hero-shade" />
      <Container className="page-hero-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></Container>
    </section>
  );
}
