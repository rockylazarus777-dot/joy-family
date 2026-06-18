"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides } from "@/lib/data/mockData";
import Button from "@/components/ui/Button";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[index];

  return (
    <section className="relative flex h-[70vh] items-center overflow-hidden bg-sectionBg pt-16 md:h-[90vh]">
      <div className="absolute inset-0 -z-0">
        <ImagePlaceholder label={`HERO IMAGE ${index + 1}`} ratio="16:9" className="h-full w-full rounded-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-container px-4 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h1 className="font-heading text-[34px] font-bold leading-tight text-white drop-shadow-md md:text-[44px] lg:text-[56px]">
              {slide.title}
            </h1>
            <p className="mt-4 font-body text-base text-white/90 drop-shadow md:text-lg">
              {slide.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={slide.primaryCta.href} variant="accent" size="lg">
                {slide.primaryCta.label}
              </Button>
              <Button href={slide.secondaryCta.href} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                {slide.secondaryCta.label}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${i === index ? "w-6 bg-accent" : "bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  );
}
