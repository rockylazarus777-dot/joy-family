"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs as allFaqs } from "@/lib/data/mockData";

export default function FaqAccordion({ limit }: { limit?: number }) {
  const list = limit ? allFaqs.slice(0, limit) : allFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-heading text-2xl font-bold text-textPrimary md:text-3xl">Frequently Asked Questions</h2>
        <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-cardBg">
          {list.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-subheading font-medium text-textPrimary">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-textSecondary transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && <p className="px-5 pb-4 text-sm text-textSecondary">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
