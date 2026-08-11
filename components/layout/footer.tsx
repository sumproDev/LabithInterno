import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone, MapIcon } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { navigation } from "@/data/navigation";
import { getProducts } from "@/lib/cms";

export async function Footer() {
  const products = await getProducts();
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand"><Logo /><p>Premium interior products designed for modern homes and commercial spaces.</p><div className="socials"><Link href="https://www.instagram.com/" aria-label="Instagram"><Instagram /></Link><Link href="https://www.linkedin.com/" aria-label="LinkedIn"><Linkedin /></Link></div></div>
        <div><h3>Products</h3>{products.map(p => <Link key={p.slug} href={`/products/${p.slug}`}>{p.title}</Link>)}</div>
        <div><h3>Quick links</h3>{navigation.slice(1).map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        <div className="footer-contact">
          <h3>Contact</h3>
          <p><Phone /> <a href="tel:+919570800440">+91 95708 00440</a></p>
          <p><Mail /> <a href="mailto:labithinternollp@gmail.com">labithinternollp@gmail.com</a></p>
          <p><MapIcon /> <a href="https://maps.app.goo.gl/CTvmLaqHTsEEn1xY7" target="_blank" rel="noopener noreferrer">Vasant Vihar, Kosi Colony, PWD Colony, Purnia, Bihar 854301</a></p>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Labith Interno LLP. All rights reserved.</span><div><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms-and-conditions">Terms & conditions</Link></div></div>
    </footer>
  );
}
