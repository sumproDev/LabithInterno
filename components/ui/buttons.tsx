import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ButtonLink({ href, children, variant = "primary", className }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "red"; className?: string }) {
  return <Link className={cn("button", `button-${variant}`, className)} href={href}>{children}<ArrowUpRight size={16} aria-hidden="true" /></Link>;
}
