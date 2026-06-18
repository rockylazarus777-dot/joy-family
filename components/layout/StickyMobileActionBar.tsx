"use client";

import { usePathname } from "next/navigation";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { clinicInfo } from "@/lib/data/mockData";

export default function StickyMobileActionBar() {
  const pathname = usePathname();
  if (pathname === "/book-appointment") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 border-t border-border bg-bg shadow-[0_-2px_8px_rgba(0,0,0,0.06)] md:hidden">
      <a
        href={`tel:${clinicInfo.phones[0]}`}
        className="flex flex-col items-center justify-center gap-0.5 py-2 text-primary"
      >
        <Phone size={20} />
        <span className="text-xs font-medium">Call</span>
      </a>
      <a
        href={`https://wa.me/${clinicInfo.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-0.5 bg-accent py-2 text-white"
      >
        <MessageCircle size={20} />
        <span className="text-xs font-medium">WhatsApp</span>
      </a>
      <a
        href="/book-appointment"
        className="flex flex-col items-center justify-center gap-0.5 bg-primary py-2 text-white"
      >
        <CalendarCheck size={20} />
        <span className="text-xs font-medium">Book</span>
      </a>
    </div>
  );
}
