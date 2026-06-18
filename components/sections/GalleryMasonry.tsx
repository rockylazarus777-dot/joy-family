"use client";

import { useState } from "react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { galleryItems, GalleryItem } from "@/lib/data/mockData";

const categories: Array<GalleryItem["category"] | "All"> = ["All", "Clinic", "Doctors", "Laboratory", "Facilities", "Events"];

const ratios: Array<"1:1" | "4:5" | "4:3"> = ["1:1", "4:5", "4:3"];

export default function GalleryMasonry() {
  const [active, setActive] = useState<GalleryItem["category"] | "All">("All");

  const filtered = active === "All" ? galleryItems : galleryItems.filter((g) => g.category === active);

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-container">
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

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <ImagePlaceholder key={item.id} label={item.label} ratio={ratios[i % ratios.length]} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-textSecondary">No images found in this category.</p>
        )}
      </div>
    </section>
  );
}
