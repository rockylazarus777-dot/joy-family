"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { dgShippingSchema } from "@/lib/validation/schemas";
import { useEnquiryForm } from "@/components/forms/useEnquiryForm";

export default function DgShippingForm() {
  const { status, errors, serverError, submit } = useEnquiryForm(dgShippingSchema, "dg-shipping");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    cdcNumber: "",
    examType: "" as "" | "pre-sea" | "post-sea-renewal" | "trainee",
    preferredDate: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value } as typeof form));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit(form);
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-cardBg p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto text-accent" size={40} />
        <h3 className="mt-4 font-heading text-xl font-bold text-textPrimary">Examination Booking Requested</h3>
        <p className="mt-2 text-textSecondary">Thank you, {form.fullName}. Our team will confirm your slot shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-cardBg p-6 shadow-sm md:p-8">
      <h3 className="font-heading text-xl font-bold text-textPrimary">Book Seafarer Medical Examination</h3>
      {serverError && <p className="mt-3 text-sm text-red-600">{serverError}</p>}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.fullName}>
          <input className="form-input" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <input className="form-input" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </Field>
        <Field label="Email (optional)" error={errors.email}>
          <input className="form-input" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </Field>
        <Field label="CDC / INDOS Number (optional)" error={errors.cdcNumber}>
          <input className="form-input" value={form.cdcNumber} onChange={(e) => update("cdcNumber", e.target.value)} />
        </Field>
        <Field label="Examination Type" error={errors.examType}>
          <select className="form-input" value={form.examType} onChange={(e) => update("examType", e.target.value)}>
            <option value="">Select type</option>
            <option value="pre-sea">Pre-Sea</option>
            <option value="post-sea-renewal">Post-Sea Renewal</option>
            <option value="trainee">Trainee</option>
          </select>
        </Field>
        <Field label="Preferred Date" error={errors.preferredDate}>
          <input type="date" className="form-input" value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} />
        </Field>
      </div>

      <Button type="submit" variant="primary" fullWidth className="mt-6">
        {status === "submitting" ? "Sending..." : "Book Examination"}
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
