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
  appointment: { schema: appointmentSchema, table: "appointments" as const, render: appointmentEmail, subject: "New Appointment Request" },
  contact: { schema: contactSchema, table: "contact_enquiries" as const, render: contactEmail, subject: "New Contact Enquiry" },
  "lab-booking": { schema: labBookingSchema, table: "lab_bookings" as const, render: labBookingEmail, subject: "New Lab Booking Request" },
  "package-enquiry": { schema: packageEnquirySchema, table: "package_enquiries" as const, render: packageEnquiryEmail, subject: "New Health Package Enquiry" },
  "dg-shipping": { schema: dgShippingSchema, table: "dg_shipping_bookings" as const, render: dgShippingEmail, subject: "New DG Shipping Examination Booking" },
};

function toSnakeCase(data: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    const snake = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    out[snake] = value;
  }
  return out;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formType, data } = body as { formType: keyof typeof formMap; data: unknown };

    const config = formMap[formType];
    if (!config) {
      return NextResponse.json({ error: "Unknown form type" }, { status: 400 });
    }

    const parsed = config.schema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 422 });
    }

    // Best-effort persistence to Supabase. If env vars aren't configured yet
    // (e.g. local prototype / before Supabase project is provisioned), this
    // is skipped gracefully rather than failing the whole request.
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        // `config.table` is a union of literal table names resolved dynamically at
        // runtime, so the generated Database types can't narrow the insert payload
        // shape here — this is an intentionally generic write path.
        await (supabase.from(config.table) as ReturnType<typeof supabase.from>).insert(
          toSnakeCase(parsed.data as Record<string, unknown>) as never
        );
      } catch (dbError) {
        console.error("[notifications] Supabase insert failed:", dbError);
      }
    }

    await sendNotificationEmail(config.subject, config.render(parsed.data as Record<string, unknown>));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[notifications] Failed to process request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
