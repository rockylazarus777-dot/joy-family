"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides } from "@/lib/data/mockData";
import Button from "@/components/ui/Button";

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
    <section className="relative h-[80vh] min-h-[650px] overflow-hidden bg-primary pt-16 md:h-[80vh] md:min-h-[520px]">

      {/* Full-bleed background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`img-${slide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {slide.image ? (
            <>
              {/* Mobile image — shown below md breakpoint */}
              <Image
                src={slide.mobileImage}
                alt={slide.title}
                fill
                priority={index === 0}
                quality={90}
                className="object-cover object-center md:hidden"
                sizes="(max-width: 767px) 100vw, 0vw"
              />
              {/* Desktop image — shown at md and above */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                quality={90}
                className="hidden object-cover object-center md:block"
                sizes="(min-width: 768px) 100vw, 0vw"
              />
            </>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary via-primary/90 to-secondary/50" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Minimal scrim */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />

      {/* Content + dots stacked in a flex column */}
      <div className="relative z-[2] mx-auto flex h-full w-full max-w-container flex-col justify-center gap-8 px-6 pb-10 md:px-10 lg:px-16">

        {/* Animated slide content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${slide.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="max-w-lg md:max-w-xl"
          >
            <div className="mb-4 inline-flex items-center rounded-full bg-accent px-4 py-1.5">
              <span className="font-subheading text-[11px] font-semibold uppercase tracking-widest text-white">
                {slide.tag}
              </span>
            </div>

            <h1 className="font-heading text-[30px] font-bold leading-tight text-white drop-shadow-md sm:text-[38px] md:text-[42px] lg:text-[50px]">
              {slide.title}
            </h1>

            <p className="mt-4 font-body text-base leading-relaxed text-white/90 sm:text-lg">
              {slide.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={slide.primaryCta.href} variant="accent" size="lg">
                {slide.primaryCta.label}
              </Button>
              <Button
                href={slide.secondaryCta.href}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                {slide.secondaryCta.label}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots — sits directly below CTAs via flex gap */}
        <div className="flex gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-accent" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
