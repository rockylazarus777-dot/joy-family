import { CalendarCheck, Inbox, FlaskConical, Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { appointments: 0, contacts: 0, labBookings: 0, packageEnquiries: 0, connected: false };
  }

  try {
    const supabase = await createClient();
    const [appointments, contacts, labBookings, packageEnquiries] = await Promise.all([
      supabase.from("appointments").select("id", { count: "exact", head: true }),
      supabase.from("contact_enquiries").select("id", { count: "exact", head: true }),
      supabase.from("lab_bookings").select("id", { count: "exact", head: true }),
      supabase.from("package_enquiries").select("id", { count: "exact", head: true }),
    ]);

    return {
      appointments: appointments.count ?? 0,
      contacts: contacts.count ?? 0,
      labBookings: labBookings.count ?? 0,
      packageEnquiries: packageEnquiries.count ?? 0,
      connected: true,
    };
  } catch {
    return { appointments: 0, contacts: 0, labBookings: 0, packageEnquiries: 0, connected: false };
  }
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const stats = [
    { label: "Appointments", value: counts.appointments, icon: CalendarCheck },
    { label: "Contact Enquiries", value: counts.contacts, icon: Inbox },
    { label: "Lab Bookings", value: counts.labBookings, icon: FlaskConical },
    { label: "Package Enquiries", value: counts.packageEnquiries, icon: Package },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-textPrimary">Dashboard</h1>
      <p className="mt-1 text-textSecondary">Overview of recent activity across the clinic website.</p>

      {!counts.connected && (
        <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase is not yet connected. Add your project credentials to <code>.env.local</code> to see live data here.
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-cardBg p-6 shadow-sm">
            <s.icon className="text-primary" size={28} />
            <p className="mt-4 font-heading text-3xl font-bold text-textPrimary">{s.value}</p>
            <p className="mt-1 text-sm text-textSecondary">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
