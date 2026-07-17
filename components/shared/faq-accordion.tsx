"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{items.map((item, index) => <div className="faq-item" key={item.q}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{item.q}</span>{open === index ? <Minus /> : <Plus />}</button>{open === index && <div className="faq-answer"><p>{item.a}</p></div>}</div>)}</div>;
}
