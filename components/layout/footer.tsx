import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { navigation } from "@/data/navigation";
import { products } from "@/data/products";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand"><Logo /><p>Premium interior surface materials for spaces designed with imagination.</p><div className="socials"><Link href="https://www.instagram.com/" aria-label="Instagram"><Instagram /></Link><Link href="https://www.linkedin.com/" aria-label="LinkedIn"><Linkedin /></Link></div></div>
        <div><h3>Products</h3>{products.map(p => <Link key={p.slug} href={`/products/${p.slug}`}>{p.title}</Link>)}</div>
        <div><h3>Quick links</h3>{navigation.slice(1).map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        <div className="footer-contact"><h3>Contact</h3><p><Phone /> +91 00000 00000 <em>Replace with official number</em></p><p><Mail /> hello@example.com <em>Replace with official email</em></p><p><MapPin /> Registered office address to be updated</p></div>
        <form className="newsletter" action="/contact"><label htmlFor="newsletter">Design notes, material launches and updates.</label><div><input id="newsletter" name="email" type="email" placeholder="Your email address" required /><button aria-label="Join newsletter"><ArrowUpRight /></button></div></form>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Labith Interno LLP. All rights reserved.</span><div><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms-and-conditions">Terms & conditions</Link></div></div>
    </footer>
  );
}
