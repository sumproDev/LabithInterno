"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { franchiseSchema, type FranchiseInput } from "@/lib/validations";

export function FranchiseForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false); const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FranchiseInput>({ resolver: zodResolver(franchiseSchema), defaultValues: { enquiryType: "Franchise enquiry", consent: false, website: "" } });
  async function submit(data: FranchiseInput) { setServerError(""); const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, formType: "franchise" }) }); if (!res.ok) return setServerError("We could not submit the enquiry. Please try again."); setSent(true); reset(); }
  if (sent) return <div className="form-success" role="status"><CheckCircle2 /><h3>Partnership enquiry received.</h3><p>Our team will review the details and contact you.</p><button onClick={() => setSent(false)}>Submit another enquiry</button></div>;
  return <form className={`premium-form ${compact ? "compact-form" : ""}`} onSubmit={handleSubmit(submit)} noValidate>
    {!compact && <div className="form-heading"><p className="eyebrow">PARTNERSHIP ENQUIRY</p><h2>Start the conversation.</h2></div>}
    <div className="form-grid">
      <F label="Full name" e={errors.name?.message}><input {...register("name")} placeholder="Your name" /></F><F label="Phone number" e={errors.phone?.message}><input {...register("phone")} placeholder="+91" /></F>
      <F label="Email address" e={errors.email?.message}><input {...register("email")} type="email" placeholder="you@company.com" /></F><F label="City" e={errors.city?.message}><input {...register("city")} placeholder="Your city" /></F>
      <F label="State" e={errors.state?.message}><input {...register("state")} placeholder="Your state" /></F><F label="Investment range" e={errors.investmentRange?.message}><select {...register("investmentRange")}><option value="">Select a range</option><option>Details available on request</option><option>Would like guidance</option><option>Existing business expansion</option></select></F>
      <F label="Message" e={errors.message?.message} wide><textarea {...register("message")} rows={compact ? 3 : 5} placeholder="Tell us about your background, market and preferred territory" /></F>
    </div>
    <input type="hidden" {...register("enquiryType")} /><input className="honeypot" tabIndex={-1} {...register("website")} aria-hidden="true" />
    <label className="consent"><input type="checkbox" {...register("consent")} /><span>I consent to being contacted about this franchise enquiry and accept the privacy policy.</span></label>{errors.consent && <p className="field-error">{errors.consent.message}</p>}
    {serverError && <p className="form-error" role="alert">{serverError}</p>}<button className="submit-button" disabled={isSubmitting}>{isSubmitting ? <LoaderCircle className="spin" /> : <>Submit enquiry <ArrowRight /></>}</button>
  </form>;
}
function F({ label, e, wide, children }: { label: string; e?: string; wide?: boolean; children: React.ReactNode }) { return <label className={`field ${wide ? "field-wide" : ""}`}><span>{label}</span>{children}{e && <small className="field-error">{e}</small>}</label>; }
