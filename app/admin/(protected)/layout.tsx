import Link from "next/link";
import { LayoutDashboard, CalendarCheck, Inbox, LogOut } from "lucide-react";
import { ReactNode } from "react";
import LogoutButton from "@/app/admin/(protected)/LogoutButton";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-sectionBg">
      <aside className="hidden w-64 flex-shrink-0 border-r border-border bg-cardBg p-6 md:block">
        <h2 className="font-heading text-lg font-bold text-textPrimary">Joy Family Clinic</h2>
        <p className="text-xs text-textSecondary">Admin Dashboard</p>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-textSecondary hover:bg-sectionBg hover:text-primary"
            >
              <item.icon size={18} /> {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 border-t border-border pt-4">
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
