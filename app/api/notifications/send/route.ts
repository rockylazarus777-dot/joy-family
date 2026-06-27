import { NextRequest, NextResponse } from "next/server";
import {
  appointmentSchema,
  contactSchema,
  labBookingSchema,
  packageEnquirySchema,
  dgShippingSchema,
} from "@/lib/validation/schemas";
import { sendNotificationEmail } from "@/lib/email/send";
import {
  appointmentEmail,
  contactEmail,
  labBookingEmail,
  packageEnquiryEmail,
  dgShippingEmail,
} from "@/lib/email/templates";
import { createAdminClient } from "@/lib/supabase/admin";

const formMap = {
  appointment:       { schema: appointmentSchema,     table: "appointments"       as const, render: appointmentEmail,     subject: "New Appointment Request" },
  contact:           { schema: contactSchema,          table: "contact_enquiries"  as const, render: contactEmail,         subject: "New Contact Enquiry" },
  "lab-booking":     { schema: labBookingSchema,       table: "lab_bookings"       as const, render: labBookingEmail,      subject: "New Lab Booking Request" },
  "package-enquiry": { schema: packageEnquirySchema,   table: "package_enquiries"  as const, render: packageEnquiryEmail, subject: "New Health Package Enquiry" },
  "dg-shipping":     { schema: dgShippingSchema,       table: "dg_shipping_bookings" as const, render: dgShippingEmail,   subject: "New DG Shipping Examination Booking" },
};

function toSnakeCase(data: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    const snake = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    // Coerce empty strings to null for optional fields so DB constraints are happy
    out[snake] = value === "" ? null : value;
  }
  return out;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formType, data } = body as { formType: keyof typeof formMap; data: unknown };

    console.log(`[notifications] Received formType="${formType}"`, JSON.stringify(data));

    const config = formMap[formType];
    if (!config) {
      return NextResponse.json({ error: "Unknown form type" }, { status: 400 });
    }

    // ── Validate ──────────────────────────────────────────────────────────────
    const parsed = config.schema.safeParse(data);
    if (!parsed.success) {
      console.error("[notifications] Validation failed:", parsed.error.issues);
      return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 422 });
    }

    const payload = toSnakeCase(parsed.data as Record<string, unknown>);
    console.log(`[notifications] Insert payload for table="${config.table}":`, JSON.stringify(payload));

    // ── Persist to Supabase ───────────────────────────────────────────────────
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createAdminClient();

      const { data: inserted, error: dbError } = await (
        supabase.from(config.table) as ReturnType<typeof supabase.from>
      ).insert(payload as never).select();

      if (dbError) {
        console.error(
          `[notifications] Supabase insert FAILED for table="${config.table}":`,
          dbError.code,
          dbError.message,
          dbError.details,
          dbError.hint
        );
        // Return 500 so the client knows the submission was NOT saved
        return NextResponse.json(
          { error: "Failed to save your request. Please try again or contact us via WhatsApp.", detail: dbError.message },
          { status: 500 }
        );
      }

      console.log(`[notifications] Supabase insert OK for table="${config.table}":`, JSON.stringify(inserted));
    } else {
      console.warn("[notifications] Supabase env vars not set — skipping DB insert.");
    }

    // ── Send email notification ───────────────────────────────────────────────
    try {
      await sendNotificationEmail(config.subject, config.render(parsed.data as Record<string, unknown>));
    } catch (emailError) {
      // Email failure must NOT roll back a successful DB insert.
      // Log and continue — the record is already saved.
      console.error("[notifications] Email send failed (record already saved):", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[notifications] Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
