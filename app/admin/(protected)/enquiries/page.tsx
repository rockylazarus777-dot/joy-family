import { createClient } from "@/lib/supabase/server";

async function getEnquiries() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { contacts: [], labBookings: [], packageEnquiries: [], dgShipping: [] };
  }

  try {
    const supabase = await createClient();
    const [contacts, labBookings, packageEnquiries, dgShipping] = await Promise.all([
      supabase.from("contact_enquiries").select("*").order("created_at", { ascending: false }).limit(20),
      supabase.from("lab_bookings").select("*").order("created_at", { ascending: false }).limit(20),
      supabase.from("package_enquiries").select("*").order("created_at", { ascending: false }).limit(20),
      supabase.from("dg_shipping_bookings").select("*").order("created_at", { ascending: false }).limit(20),
    ]);

    return {
      contacts: contacts.data ?? [],
      labBookings: labBookings.data ?? [],
      packageEnquiries: packageEnquiries.data ?? [],
      dgShipping: dgShipping.data ?? [],
    };
  } catch {
    return { contacts: [], labBookings: [], packageEnquiries: [], dgShipping: [] };
  }
}

export default async function AdminEnquiriesPage() {
  const { contacts, labBookings, packageEnquiries, dgShipping } = await getEnquiries();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-textPrimary">Enquiries</h1>
      <p className="mt-1 text-textSecondary">Contact, lab booking, package, and DG Shipping enquiries from the website.</p>

      <EnquirySection title="Contact Enquiries" rows={contacts} columns={["full_name", "phone", "subject", "created_at"]} />
      <EnquirySection title="Lab Bookings" rows={labBookings} columns={["full_name", "phone", "tests_requested", "preferred_date"]} />
      <EnquirySection title="Health Package Enquiries" rows={packageEnquiries} columns={["full_name", "phone", "package_slug", "preferred_date"]} />
      <EnquirySection title="DG Shipping Bookings" rows={dgShipping} columns={["full_name", "phone", "exam_type", "preferred_date"]} />
    </div>
  );
}

function EnquirySection({ title, rows, columns }: { title: string; rows: any[]; columns: string[] }) {
  return (
    <div className="mt-8">
      <h2 className="font-subheading text-lg font-semibold text-textPrimary">{title}</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-cardBg">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-sectionBg">
            <tr>
              {columns.map((c) => (
                <th key={c} className="px-4 py-3 font-subheading capitalize text-textPrimary">{c.replace(/_/g, " ")}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-textSecondary">
                  No records yet.
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr key={row.id ?? i}>
                {columns.map((c) => (
                  <td key={c} className="px-4 py-3 text-textSecondary">{String(row[c] ?? "—")}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
