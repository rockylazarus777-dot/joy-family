"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
        className={`fixed left-0 right-0 top-0 z-50 border-b border-border transition-all duration-300 ${
          scrolled ? "bg-bg shadow-sm" : "bg-bg"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-container items-center justify-between gap-6 px-4 md:px-8">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/logo/joy-logo.png"
                alt="Joy Family Multispeciality Clinic"
                width={820}
                height={100}
                priority
                className="h-auto w-auto max-h-16 max-w-[820px] object-contain"
              />
            </Link>
          </div>

          {/* Desktop navigation — visible from lg (1024px) */}
          <nav className="hidden flex w-[420px] items-center justify-center gap-5 lg:flex xl:gap-7">
            {navLinks
              .filter((link) =>
                ["Home", "About", "Doctors", "Services", "DG Shipping", "Gallery"].includes(link.label)
              )
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-sm font-medium text-textPrimary transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          {/* Phone + CTA — phone visible only from xl (1280px) to avoid crowding */}
          <div className="hidden flex-shrink-0 items-center gap-4 lg:flex">
            <a
              href={`tel:${clinicInfo.phones[0]}`}
              className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-medium text-textSecondary transition-colors hover:text-primary xl:flex"
            >
              <Phone size={15} />
              {clinicInfo.phones[0]}
            </a>
            <Link
              href="/book-appointment"
              className="whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(true)}
            className="flex-shrink-0 text-primary lg:hidden"
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
        <div className="flex h-20 items-center justify-between border-b border-border px-4">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/logo/joy-logo.png"
              alt="Joy Family Multispeciality Clinic"
              width={220}
              height={55}
              priority
              className="h-20 w-auto object-contain"
            />
          </Link>
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
              className="flex min-h-[52px] items-center border-b border-border text-base font-medium text-textPrimary"
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
