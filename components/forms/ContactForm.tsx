"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { contactSchema } from "@/lib/validation/schemas";
import { useEnquiryForm } from "@/components/forms/useEnquiryForm";

export default function ContactForm() {
  const { status, errors, serverError, submit } = useEnquiryForm(contactSchema, "contact");

  const [form, setForm] = useState({ fullName: "", phone: "", email: "", subject: "", message: "" });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit(form);
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-cardBg p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto text-accent" size={40} />
        <h3 className="mt-4 font-heading text-xl font-bold text-textPrimary">Message Sent</h3>
        <p className="mt-2 text-textSecondary">Thank you, {form.fullName}. We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-cardBg p-6 shadow-sm md:p-8">
      <h3 className="font-heading text-xl font-bold text-textPrimary">Send Us a Message</h3>
      {serverError && <p className="mt-3 text-sm text-red-600">{serverError}</p>}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.fullName}>
          <input className="form-input" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Your name" />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <input className="form-input" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" />
        </Field>
        <Field label="Email (optional)" error={errors.email}>
          <input className="form-input" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
        </Field>
        <Field label="Subject" error={errors.subject}>
          <input className="form-input" value={form.subject} onChange={(e) => update("subject", e.target.value)} placeholder="How can we help?" />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Message" error={errors.message}>
          <textarea className="form-input min-h-[120px]" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Write your message here" />
        </Field>
      </div>

      <Button type="submit" variant="primary" fullWidth className="mt-6">
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-textPrimary">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
