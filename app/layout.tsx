import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.labithinterno.com"), title: { default: "Labith Interno LLP", template: "%s | Labith Interno" }, description: "Premium interior panels, marble sheets and architectural surface solutions.", applicationName: "Labith Interno", icons: { icon: "/favicon.svg" } };
export const viewport: Viewport = { themeColor: "#080808", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${manrope.variable} ${inter.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /><WhatsAppButton /></body></html>;
}
