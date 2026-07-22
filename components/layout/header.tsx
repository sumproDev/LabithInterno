"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [open]);

  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={cn("site-header", (scrolled || open) && "site-header-solid") }>
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(item => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined} className={active(item.href) ? "active" : ""}>{item.label}</Link>)}
        </nav>
        <Link href="/contact" className="header-cta">Customer Enquiry</Link>
        <button className="menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      <div className={cn("mobile-panel", open && "mobile-panel-open")} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={active(item.href) ? "active" : ""}><span>0{index + 1}</span>{item.label}</Link>)}
        </nav>
        <Link href="/contact" onClick={() => setOpen(false)} className="button button-primary">Customer Enquiry</Link>
      </div>
    </header>
  );
}
