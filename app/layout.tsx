import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Chatbot } from "@/components/chat/chatbot";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.labithinterno.com"),
  title: { default: "Labith Interno LLP", template: "%s | Labith Interno" },
  description: "Premium interior products including UV marble sheets, soffit panels, WPC products and decorative profiles.",
  applicationName: "Labith Interno",
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { themeColor: "#080808", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1081144967600751');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1081144967600751&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Chatbot />
      </body>
    </html>
  );
}

