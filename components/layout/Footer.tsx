import Link from "next/link";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { navLinks, clinicInfo } from "@/lib/data/mockData";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-container grid-cols-1 items-start gap-12 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <h3 className="mb-6 font-heading text-xl font-bold">Joy Family Clinic</h3>
          <p className="text-sm text-white/80">
            Premium multispeciality healthcare for families, trusted for {clinicInfo.yearsExperience} years.
          </p>
        </div>

        <div>
          <h4 className="mb-6 font-heading text-xl font-bold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {navLinks.slice(0, 6).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-heading text-xl font-bold">Contact</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" /> {clinicInfo.address}
            </li>
            {clinicInfo.phones.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" /> {p}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" /> info@joyfmsclinic.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-heading text-xl font-bold">Working Hours</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {clinicInfo.hours.map((h) => (
              <li key={h.day} className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0" />
                <span>
                  <strong className="font-medium text-white">{h.day}:</strong> {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 px-4 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Joy Family Multispeciality Clinic. All rights reserved.
      </div>
    </footer>
  );
}
