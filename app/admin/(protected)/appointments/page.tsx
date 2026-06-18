import { createClient } from "@/lib/supabase/server";

async function getAppointments() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function AdminAppointmentsPage() {
  const appointments = await getAppointments();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-textPrimary">Appointments</h1>
      <p className="mt-1 text-textSecondary">Recent appointment requests submitted via the website.</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-cardBg">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-sectionBg">
            <tr>
              <th className="px-4 py-3 font-subheading text-textPrimary">Name</th>
              <th className="px-4 py-3 font-subheading text-textPrimary">Phone</th>
              <th className="px-4 py-3 font-subheading text-textPrimary">Doctor</th>
              <th className="px-4 py-3 font-subheading text-textPrimary">Date</th>
              <th className="px-4 py-3 font-subheading text-textPrimary">Time</th>
              <th className="px-4 py-3 font-subheading text-textPrimary">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {appointments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-textSecondary">
                  No appointments yet. Once Supabase is connected, submissions from the Book Appointment page will appear here.
                </td>
              </tr>
            )}
            {appointments.map((a: any) => (
              <tr key={a.id}>
                <td className="px-4 py-3 text-textPrimary">{a.full_name}</td>
                <td className="px-4 py-3 text-textSecondary">{a.phone}</td>
                <td className="px-4 py-3 text-textSecondary">{a.doctor_slug ?? "—"}</td>
                <td className="px-4 py-3 text-textSecondary">{a.preferred_date}</td>
                <td className="px-4 py-3 text-textSecondary">{a.preferred_time}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-semibold text-accent">{a.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
