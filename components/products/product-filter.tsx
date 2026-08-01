"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "./product-card";

export function ProductFilter({ products }: { products: Product[] }) {
  const [query, setQuery] = useState(""); const [finish, setFinish] = useState("All");
  const finishes = ["All", ...Array.from(new Set(products.flatMap(p => p.finishes)))];
  const filtered = useMemo(() => products.filter(p => (!query || `${p.title} ${p.category} ${p.shortDescription}`.toLowerCase().includes(query.toLowerCase())) && (finish === "All" || p.finishes.includes(finish))), [products, query, finish]);
  return <><div className="filter-bar"><label className="search-field"><Search /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products" aria-label="Search products" /></label><label><SlidersHorizontal /><span className="sr-only">Finish</span><select value={finish} onChange={e => setFinish(e.target.value)}>{finishes.map(f => <option key={f}>{f}</option>)}</select></label></div>{filtered.length ? <div className="catalog-grid">{filtered.map(product => <ProductCard key={product.slug} product={product} />)}</div> : <div className="empty-state"><h2>No products match those filters.</h2><p>Try a different product name or finish.</p><button onClick={() => { setQuery(""); setFinish("All"); }}>Clear filters</button></div>}</>;
}
