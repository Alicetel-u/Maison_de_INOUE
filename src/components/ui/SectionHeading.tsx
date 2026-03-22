"use client";

import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  titleEn: string;
  titleJa: string;
  className?: string;
}

export default function SectionHeading({ titleEn, titleJa, className = "" }: SectionHeadingProps) {
  return (
    <ScrollReveal className={`text-center mb-16 ${className}`}>
      <h2 className="font-display text-4xl md:text-5xl font-light tracking-[0.2em] text-salon-charcoal mb-3">
        {titleEn}
      </h2>
      <div className="w-12 h-[1px] bg-salon-gold mx-auto mb-3" />
      <p className="text-sm tracking-[0.15em] text-salon-gray">{titleJa}</p>
    </ScrollReveal>
  );
}
