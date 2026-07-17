"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "./product-card";

export function ProductFilter() {
  const [query, setQuery] = useState(""); const [application, setApplication] = useState("All"); const [finish, setFinish] = useState("All");
  const applications = ["All", ...Array.from(new Set(products.flatMap(p => p.applications)))];
  const finishes = ["All", ...Array.from(new Set(products.flatMap(p => p.finishes)))];
  const filtered = useMemo(() => products.filter(p => (!query || `${p.title} ${p.category} ${p.shortDescription}`.toLowerCase().includes(query.toLowerCase())) && (application === "All" || p.applications.includes(application)) && (finish === "All" || p.finishes.includes(finish))), [query, application, finish]);
  return <><div className="filter-bar"><label className="search-field"><Search /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search materials" aria-label="Search products" /></label><label><SlidersHorizontal /><span className="sr-only">Application</span><select value={application} onChange={e => setApplication(e.target.value)}>{applications.map(a => <option key={a}>{a}</option>)}</select></label><label><span className="sr-only">Finish</span><select value={finish} onChange={e => setFinish(e.target.value)}>{finishes.map(f => <option key={f}>{f}</option>)}</select></label></div>{filtered.length ? <div className="catalog-grid">{filtered.map(product => <ProductCard key={product.slug} product={product} />)}</div> : <div className="empty-state"><h2>No materials match those filters.</h2><p>Try a different search, application or finish.</p><button onClick={() => { setQuery(""); setApplication("All"); setFinish("All"); }}>Clear filters</button></div>}</>;
}
