"use client";

import { useSearchParams } from "next/navigation";
import AppointmentForm from "@/components/forms/AppointmentForm";

export default function BookAppointmentClient() {
  const params = useSearchParams();
  const doctor = params.get("doctor") ?? "";
  const service = params.get("service") ?? "";
  const pkg = params.get("package") ?? "";

  return <AppointmentForm defaultDoctor={doctor} defaultService={service} defaultPackage={pkg} />;
}
