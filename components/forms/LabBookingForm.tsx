"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { labBookingSchema } from "@/lib/validation/schemas";
import { useEnquiryForm } from "@/components/forms/useEnquiryForm";

export default function LabBookingForm() {
  const { status, errors, serverError, submit } = useEnquiryForm(labBookingSchema, "lab-booking");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    testsRequested: "",
    homeCollection: false,
    preferredDate: "",
    address: "",
  });

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
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
        <h3 className="mt-4 font-heading text-xl font-bold text-textPrimary">Lab Booking Requested</h3>
        <p className="mt-2 text-textSecondary">Thank you, {form.fullName}. Our lab team will confirm your booking shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-cardBg p-6 shadow-sm md:p-8">
      <h3 className="font-heading text-xl font-bold text-textPrimary">Book a Lab Test</h3>
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
        <Field label="Preferred Date" error={errors.preferredDate}>
          <input type="date" className="form-input" value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Tests Requested" error={errors.testsRequested}>
          <input className="form-input" value={form.testsRequested} onChange={(e) => update("testsRequested", e.target.value)} placeholder="e.g. CBC, Lipid Profile" />
        </Field>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-textPrimary">
        <input type="checkbox" checked={form.homeCollection} onChange={(e) => update("homeCollection", e.target.checked)} />
        I'd like home sample collection
      </label>

      {form.homeCollection && (
        <div className="mt-4">
          <Field label="Address" error={errors.address}>
            <textarea className="form-input min-h-[80px]" value={form.address} onChange={(e) => update("address", e.target.value)} />
          </Field>
        </div>
      )}

      <Button type="submit" variant="primary" fullWidth className="mt-6">
        {status === "submitting" ? "Sending..." : "Book Lab Test"}
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
