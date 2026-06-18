"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/mockData";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="bg-sectionBg px-4 py-16 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Quote className="mx-auto text-accent" size={32} />
        <p className="mt-4 font-body text-lg text-textPrimary md:text-xl">&ldquo;{t.quote}&rdquo;</p>
        <p className="mt-4 font-subheading font-semibold text-textPrimary">{t.patientName}</p>
        <p className="text-sm text-textSecondary">{t.occupation}</p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button aria-label="Previous testimonial" onClick={prev} className="rounded-full border border-border p-2 hover:bg-cardBg">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <span key={i} className={`h-2 w-2 rounded-full ${i === index ? "bg-accent" : "bg-border"}`} />
            ))}
          </div>
          <button aria-label="Next testimonial" onClick={next} className="rounded-full border border-border p-2 hover:bg-cardBg">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
