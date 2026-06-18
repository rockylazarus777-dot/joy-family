"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { appointmentSchema } from "@/lib/validation/schemas";
import { useEnquiryForm } from "@/components/forms/useEnquiryForm";
import { doctors, services, healthPackages } from "@/lib/data/mockData";

type Props = {
  defaultDoctor?: string;
  defaultService?: string;
  defaultPackage?: string;
};

export default function AppointmentForm({ defaultDoctor = "", defaultService = "", defaultPackage = "" }: Props) {
  const { status, errors, serverError, submit } = useEnquiryForm(appointmentSchema, "appointment");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    doctorSlug: defaultDoctor,
    serviceSlug: defaultService,
    packageSlug: defaultPackage,
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

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
        <h3 className="mt-4 font-heading text-xl font-bold text-textPrimary">Appointment Request Received</h3>
        <p className="mt-2 text-textSecondary">
          Thank you, {form.fullName}. Our team will confirm your appointment shortly via phone or WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-cardBg p-6 shadow-sm md:p-8">
      <h3 className="font-heading text-xl font-bold text-textPrimary">Book an Appointment</h3>
      {serverError && <p className="mt-3 text-sm text-red-600">{serverError}</p>}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.fullName}>
          <input
            className="form-input"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="Your name"
          />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <input
            className="form-input"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+91 98765 43210"
          />
        </Field>
        <Field label="Email (optional)" error={errors.email}>
          <input
            className="form-input"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Preferred Doctor (optional)">
          <select className="form-input" value={form.doctorSlug} onChange={(e) => update("doctorSlug", e.target.value)}>
            <option value="">No preference</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.slug}>{d.fullName}</option>
            ))}
          </select>
        </Field>
        <Field label="Service (optional)">
          <select className="form-input" value={form.serviceSlug} onChange={(e) => update("serviceSlug", e.target.value)}>
            <option value="">No preference</option>
            {services.map((s) => (
              <option key={s.id} value={s.slug}>{s.title}</option>
            ))}
          </select>
        </Field>
        <Field label="Health Package (optional)">
          <select className="form-input" value={form.packageSlug} onChange={(e) => update("packageSlug", e.target.value)}>
            <option value="">No preference</option>
            {healthPackages.map((p) => (
              <option key={p.id} value={p.slug}>{p.title}</option>
            ))}
          </select>
        </Field>
        <Field label="Preferred Date" error={errors.preferredDate}>
          <input
            type="date"
            className="form-input"
            value={form.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
          />
        </Field>
        <Field label="Preferred Time" error={errors.preferredTime}>
          <input
            type="time"
            className="form-input"
            value={form.preferredTime}
            onChange={(e) => update("preferredTime", e.target.value)}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Message (optional)">
          <textarea
            className="form-input min-h-[90px]"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Anything else you'd like us to know"
          />
        </Field>
      </div>

      <Button type="submit" variant="primary" fullWidth className="mt-6">
        {status === "submitting" ? "Sending..." : "Request Appointment"}
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
