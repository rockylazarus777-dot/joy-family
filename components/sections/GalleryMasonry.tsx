"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { galleryItems, GalleryItem } from "@/lib/data/mockData";

const categories: Array<GalleryItem["category"] | "All"> = ["All", "Clinic", "Doctors", "Laboratory", "Facilities", "Events"];

const ratios: Array<"1:1" | "4:5" | "4:3"> = ["1:1", "4:5", "4:3"];

const ratioClasses: Record<string, string> = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "4:3": "aspect-[4/3]",
};

export default function GalleryMasonry() {
  const [active, setActive] = useState<GalleryItem["category"] | "All">("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = active === "All" ? galleryItems : galleryItems.filter((g) => g.category === active);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-container">
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm font-subheading font-medium transition-colors ${
                active === cat ? "bg-primary text-white" : "bg-sectionBg text-textSecondary hover:bg-secondary/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, i) => {
            const ratio = ratios[i % ratios.length];
            return item.image ? (
              <button
                key={item.id}
                onClick={() => setLightbox(item)}
                className={`group relative overflow-hidden rounded-xl ${ratioClasses[ratio]} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="p-3 text-xs font-semibold text-white">{item.label}</span>
                </div>
              </button>
            ) : (
              <ImagePlaceholder key={item.id} label={item.label} ratio={ratio} />
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-textSecondary">No images found in this category.</p>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.label}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close lightbox"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25"
          >
            <X size={22} />
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.image && (
              <Image
                src={lightbox.image}
                alt={lightbox.label}
                width={1200}
                height={800}
                className="h-auto max-h-[90vh] w-full object-contain"
                priority
              />
            )}
            <p className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2 text-center text-sm font-medium text-white">
              {lightbox.label}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
