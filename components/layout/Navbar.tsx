"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, clinicInfo } from "@/lib/data/mockData";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-bg shadow-sm" : "bg-bg/95"
        }`}
      >
        <div className="mx-auto flex max-w-container items-center justify-between px-4 py-3 md:px-8">
          <Link href="/" className="font-heading text-lg font-bold text-primary md:text-xl">
            Joy Family <span className="text-accent">Clinic</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.slice(0, 8).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-subheading text-sm font-medium text-textPrimary transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${clinicInfo.phones[0]}`}
              className="flex items-center gap-1 text-sm font-medium text-textSecondary hover:text-primary"
            >
              <Phone size={16} /> {clinicInfo.phones[0]}
            </a>
            <Button href="/book-appointment" variant="accent" size="sm">
              Book Appointment
            </Button>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(true)}
            className="text-primary lg:hidden"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[60] bg-bg transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-heading text-lg font-bold text-primary">Menu</span>
          <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="text-primary">
            <X size={28} />
          </button>
        </div>
        <nav className="flex flex-col px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[48px] items-center border-b border-border font-subheading text-base font-medium text-textPrimary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 flex gap-3 border-t border-border bg-bg p-4">
          <Button href={`https://wa.me/${clinicInfo.whatsapp}`} variant="accent" fullWidth>
            WhatsApp
          </Button>
          <Button href="/book-appointment" variant="primary" fullWidth>
            Book Now
          </Button>
        </div>
      </div>
    </>
  );
}
