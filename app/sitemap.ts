import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap():MetadataRoute.Sitemap{const routes=["","/about","/products","/franchise","/contact","/privacy-policy","/terms-and-conditions"];return [...routes.map(route=>({url:absoluteUrl(route),lastModified:new Date(),changeFrequency:route===""?"weekly" as const:"monthly" as const,priority:route===""?1:.7})),...products.map(p=>({url:absoluteUrl(`/products/${p.slug}`),lastModified:new Date(),changeFrequency:"monthly" as const,priority:.8}))]}
