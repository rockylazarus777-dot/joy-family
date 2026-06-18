type Row = [label: string, value: string | undefined | null];

function renderRows(rows: Row[]) {
  return rows
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([label, value]) => `<tr><td style="padding:4px 12px;font-weight:600;color:#1D2939;">${label}</td><td style="padding:4px 12px;color:#64748B;">${value}</td></tr>`)
    .join("");
}

function wrap(title: string, rows: Row[]) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <div style="background:#224C7A;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;font-size:18px;margin:0;">Joy Family Multispeciality Clinic</h1>
      </div>
      <div style="border:1px solid #E2E8F0;border-top:none;border-radius:0 0 8px 8px;padding:24px;">
        <h2 style="color:#1D2939;font-size:16px;margin-top:0;">${title}</h2>
        <table style="width:100%;border-collapse:collapse;">${renderRows(rows)}</table>
      </div>
    </div>
  `;
}

export function appointmentEmail(data: Record<string, unknown>) {
  return wrap("New Appointment Request", [
    ["Name", String(data.fullName ?? "")],
    ["Phone", String(data.phone ?? "")],
    ["Email", String(data.email ?? "")],
    ["Doctor", String(data.doctorSlug ?? "No preference")],
    ["Service", String(data.serviceSlug ?? "No preference")],
    ["Package", String(data.packageSlug ?? "No preference")],
    ["Preferred Date", String(data.preferredDate ?? "")],
    ["Preferred Time", String(data.preferredTime ?? "")],
    ["Message", String(data.message ?? "")],
  ]);
}

export function contactEmail(data: Record<string, unknown>) {
  return wrap("New Contact Enquiry", [
    ["Name", String(data.fullName ?? "")],
    ["Phone", String(data.phone ?? "")],
    ["Email", String(data.email ?? "")],
    ["Subject", String(data.subject ?? "")],
    ["Message", String(data.message ?? "")],
  ]);
}

export function labBookingEmail(data: Record<string, unknown>) {
  return wrap("New Lab Booking Request", [
    ["Name", String(data.fullName ?? "")],
    ["Phone", String(data.phone ?? "")],
    ["Email", String(data.email ?? "")],
    ["Tests Requested", String(data.testsRequested ?? "")],
    ["Home Collection", data.homeCollection ? "Yes" : "No"],
    ["Preferred Date", String(data.preferredDate ?? "")],
    ["Address", String(data.address ?? "")],
  ]);
}

export function packageEnquiryEmail(data: Record<string, unknown>) {
  return wrap("New Health Package Enquiry", [
    ["Name", String(data.fullName ?? "")],
    ["Phone", String(data.phone ?? "")],
    ["Email", String(data.email ?? "")],
    ["Package", String(data.packageSlug ?? "")],
    ["Preferred Date", String(data.preferredDate ?? "")],
  ]);
}

export function dgShippingEmail(data: Record<string, unknown>) {
  return wrap("New DG Shipping Medical Examination Booking", [
    ["Name", String(data.fullName ?? "")],
    ["Phone", String(data.phone ?? "")],
    ["Email", String(data.email ?? "")],
    ["CDC / INDOS Number", String(data.cdcNumber ?? "")],
    ["Examination Type", String(data.examType ?? "")],
    ["Preferred Date", String(data.preferredDate ?? "")],
  ]);
}
