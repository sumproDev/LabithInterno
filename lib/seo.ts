import type { Metadata } from "next";
import { absoluteUrl } from "./utils";

export const siteName = "Labith Interno LLP";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = absoluteUrl(path);
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName, type: "website", images: [{ url: absoluteUrl("/images/hero-living-room.png"), width: 1672, height: 938, alt: "Luxury interior by Labith Interno" }] },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/images/hero-living-room.png")] },
  };
}
