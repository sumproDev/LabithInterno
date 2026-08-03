"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "./product-card";

export function ProductFilter({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [finish, setFinish] = useState("All");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const finishes = ["All", ...Array.from(new Set(products.flatMap(p => p.finishes)))];

  const suggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return products
      .filter(p => p.title.toLowerCase().includes(trimmed) || (p.category && p.category.toLowerCase().includes(trimmed)))
      .slice(0, 5);
  }, [products, query]);

  const filtered = useMemo(() => products.filter(p => (!query || `${p.title} ${p.category} ${p.shortDescription}`.toLowerCase().includes(query.toLowerCase())) && (finish === "All" || p.finishes.includes(finish))), [products, query, finish]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="filter-bar">
        <div className="search-field-container" ref={containerRef}>
          <label className="search-field">
            <Search />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search products (e.g. PVC, UV Marble, Fluted)..."
              aria-label="Search products"
            />
          </label>

          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions-dropdown" role="listbox">
              <div className="suggestions-header">
                <Sparkles /> Matching Products & Categories
              </div>
              {suggestions.map(item => (
                <button
                  type="button"
                  key={item.slug}
                  className="suggestion-item"
                  onClick={() => {
                    setQuery(item.title);
                    setShowSuggestions(false);
                  }}
                >
                  <span className="suggestion-title">{item.title}</span>
                  <span className="suggestion-category">{item.category || "Interior Product"}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <label className="finish-select-label">
          <SlidersHorizontal />
          <span className="sr-only">Finish</span>
          <select value={finish} onChange={e => setFinish(e.target.value)}>
            {finishes.map(f => <option key={f}>{f}</option>)}
          </select>
        </label>
      </div>

      {filtered.length ? (
        <div className="catalog-grid">
          {filtered.map(product => <ProductCard key={product.slug} product={product} />)}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No products match those filters.</h2>
          <p>Try a different product name or finish.</p>
          <button onClick={() => { setQuery(""); setFinish("All"); }}>Clear filters</button>
        </div>
      )}
    </>
  );
}

