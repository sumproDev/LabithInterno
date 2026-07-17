"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function TestimonialSlider() { const [index, setIndex] = useState(0); const item = testimonials[index]; return <div className="testimonial"><div className="quote-mark"><Quote /></div><div className="stars" aria-label={`${item.rating} out of 5 stars`}>{Array.from({ length: item.rating }).map((_, i) => <Star key={i} fill="currentColor" />)}</div><blockquote>“{item.quote}”</blockquote><p><strong>{item.name}</strong><span>{item.role} · Placeholder testimonial for replacement</span></p><div className="slider-controls"><button onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial"><ArrowLeft /></button><span>0{index + 1} / 0{testimonials.length}</span><button onClick={() => setIndex((index + 1) % testimonials.length)} aria-label="Next testimonial"><ArrowRight /></button></div></div>; }
