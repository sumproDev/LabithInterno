"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations";

const products = ["Marble Sheets", "PVC Panels", "WPC Louvers", "Fluted Panels", "Charcoal Panels", "PU Stone"];

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [serverError, setServerError] = useState("");
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: { enquiryType: "Product enquiry", consent: false, website: "" } });

  async function onSubmit(data: ContactInput) {
    setServerError("");
    const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, formType: "contact" }) });
    if (!response.ok) { setServerError("We could not send your enquiry. Please try again."); return; }
    setSent(true); reset();
  }

  if (sent) return <div className="form-success" role="status"><CheckCircle2 /><h3>Thank you. Your enquiry is received.</h3><p>Our team will follow up using the details you provided.</p><button onClick={() => setSent(false)}>Send another enquiry</button></div>;

  return (
    <form className="premium-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {!compact && <div className="form-heading"><p className="eyebrow">TELL US ABOUT YOUR PROJECT</p><h2>Let’s shape the right material palette.</h2></div>}
      <div className="form-grid">
        <Field label="Full name" error={errors.name?.message}><input {...register("name")} autoComplete="name" placeholder="Your name" /></Field>
        <Field label="Phone number" error={errors.phone?.message}><input {...register("phone")} inputMode="tel" autoComplete="tel" placeholder="+91" /></Field>
        <Field label="Email address" error={errors.email?.message}><input {...register("email")} type="email" autoComplete="email" placeholder="you@company.com" /></Field>
        <Field label="City" error={errors.city?.message}><input {...register("city")} autoComplete="address-level2" placeholder="Your city" /></Field>
        <Field label="Enquiry type" error={errors.enquiryType?.message}><select {...register("enquiryType")}><option>Product enquiry</option><option>Request a quote</option><option>Request a sample</option><option>Franchise enquiry</option><option>Project consultation</option></select></Field>
        <Field label="Product interest" error={errors.productInterest?.message}><select {...register("productInterest")}><option value="">Select product (optional)</option>{products.map(p => <option key={p}>{p}</option>)}</select></Field>
        <Field label="Message" error={errors.message?.message} wide><textarea {...register("message")} rows={compact ? 3 : 5} placeholder="Tell us about your space, application or requirement" /></Field>
      </div>
      <input className="honeypot" tabIndex={-1} autoComplete="off" {...register("website")} aria-hidden="true" />
      <label className="consent"><input type="checkbox" {...register("consent")} /><span>I consent to being contacted about this enquiry and accept the privacy policy.</span></label>
      {errors.consent && <p className="field-error">{errors.consent.message}</p>}
      {serverError && <p className="form-error" role="alert">{serverError}</p>}
      <button className="submit-button" disabled={isSubmitting}>{isSubmitting ? <LoaderCircle className="spin" /> : <>Send enquiry <ArrowRight /></>}</button>
    </form>
  );
}

function Field({ label, error, wide, children }: { label: string; error?: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={wide ? "field field-wide" : "field"}><span>{label}</span>{children}{error && <small className="field-error">{error}</small>}</label>;
}
