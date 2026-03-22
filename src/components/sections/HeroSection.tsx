"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FloatingParticles from "@/components/ui/FloatingParticles";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100dvh] w-full overflow-hidden">
      {/* Background with Parallax */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY, scale: bgScale }}
      >
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/hero/hero-main.png" />
          <img
            src="/images/hero/hero-mobile.png"
            alt="Maison de INOUE サロン内観"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-black/35" />
      </motion.div>

      <FloatingParticles color="rgba(255,255,255,0.15)" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6 md:mb-8"
        >
          <motion.h1
            className="font-display text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-semibold tracking-[0.08em] md:tracking-[0.12em] leading-tight"
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.08em" }}
            transition={{ delay: 2.4, duration: 1.5, ease: "easeOut" }}
          >
            Maison de INOUE
          </motion.h1>

          <div className="flex items-center justify-center gap-3 md:gap-4 mt-3 mb-4 md:mt-4 md:mb-6">
            <motion.span
              className="h-[1px] bg-salon-gold/60"
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 3.0, duration: 0.8 }}
            />
            <motion.span
              className="w-1.5 h-1.5 bg-salon-gold rotate-45"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 45 }}
              transition={{ delay: 3.2, duration: 0.5 }}
            />
            <motion.span
              className="h-[1px] bg-salon-gold/60"
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 3.0, duration: 0.8 }}
            />
          </div>

          <motion.p
            className="font-display text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.4em] font-light text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4, duration: 0.8 }}
          >
            PRIVATE HAIR SALON
          </motion.p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.8 }}
          className="font-serif text-lg sm:text-xl md:text-3xl lg:text-4xl font-light tracking-[0.08em] md:tracking-[0.15em] leading-relaxed mb-3 md:mb-4"
        >
          あなただけの、美しい光を。
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.9, duration: 0.8 }}
          className="text-xs sm:text-sm md:text-base font-light tracking-[0.05em] md:tracking-[0.1em] text-white/80 max-w-md md:max-w-lg px-2"
        >
          一人ひとりの個性を引き出す、完全予約制プライベートサロン
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 0.8 }}
          className="absolute bottom-8 md:bottom-10"
        >
          <a
            href="#concept"
            className="inline-flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors p-4"
            aria-label="コンセプトセクションへスクロール"
          >
            <motion.span
              className="text-[10px] tracking-[0.3em]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              SCROLL
            </motion.span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
