"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { GALLERY_ITEMS } from "@/lib/constants";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 md:py-32 bg-salon-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading titleEn="Gallery" titleJa="スタイルギャラリー" />

        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-5">
            {GALLERY_ITEMS.map((item, i) => (
              <motion.div
                key={item.styleName}
                initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ y: -6, zIndex: 10 }}
                className="group relative aspect-square overflow-hidden cursor-pointer"
              >
                <motion.img
                  src={item.image}
                  alt={item.styleName}
                  loading="lazy"
                  className="w-full h-full object-cover will-change-transform"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-salon-charcoal/70 via-salon-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-4 md:pb-6">
                  <p className="font-display text-sm sm:text-base md:text-xl tracking-wider text-white mb-0.5 md:mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.styleName}
                  </p>
                  <p className="text-[10px] md:text-xs text-white/70 tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    by {item.stylist}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
