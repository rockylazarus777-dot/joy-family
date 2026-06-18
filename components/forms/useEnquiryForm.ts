"use client";

import { useState } from "react";
import { z } from "zod";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function useEnquiryForm<T extends z.ZodTypeAny>(schema: T, formType: string) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>("");

  async function submit(values: unknown) {
    setStatus("submitting");
    setErrors({});
    setServerError("");

    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      return false;
    }

    try {
      const res = await fetch("/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, data: result.data }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      return true;
    } catch (err) {
      setServerError("Something went wrong while sending your request. Please try again or contact us via WhatsApp.");
      setStatus("error");
      return false;
    }
  }

  return { status, errors, serverError, submit, setStatus };
}
