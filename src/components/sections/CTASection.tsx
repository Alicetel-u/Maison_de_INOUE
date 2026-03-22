"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import FloatingParticles from "@/components/ui/FloatingParticles";
import { SALON_INFO, img } from "@/lib/constants";

export default function CTASection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      id="reservation"
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <img
          src={img("/images/concept/interior.png")}
          alt=""
          loading="lazy"
          className="w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-salon-charcoal/70" />
      </motion.div>

      <FloatingParticles />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
        <ScrollReveal>
          <motion.h2
            className="font-display text-2xl sm:text-3xl md:text-5xl font-light tracking-[0.15em] md:tracking-[0.2em] mb-3 md:mb-4"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.15em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            Reservation
          </motion.h2>
          <motion.div
            className="h-[1px] bg-salon-gold mx-auto mb-3 md:mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-xs sm:text-sm tracking-[0.15em] text-white/60 mb-8 md:mb-10">
            ご予約・お問い合わせ
          </p>

          <p className="text-xs sm:text-sm md:text-base font-light leading-7 md:leading-8 text-white/80 mb-8 md:mb-10">
            完全予約制のプライベートサロンです。
            <br />
            お気軽にご連絡ください。
          </p>

          {/* Phone */}
          <motion.a
            href={`tel:${SALON_INFO.tel.replace(/-/g, "")}`}
            className="inline-flex items-center justify-center gap-2 md:gap-3 mb-8 md:mb-10 p-3 min-h-[44px]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            aria-label={`電話: ${SALON_INFO.tel}`}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            >
              <Phone size={16} className="text-salon-gold" />
            </motion.div>
            <span className="font-display text-xl sm:text-2xl md:text-3xl tracking-[0.1em] md:tracking-[0.15em] text-white hover:text-salon-gold transition-colors">
              {SALON_INFO.tel}
            </span>
          </motion.a>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button variant="gold" href="#" className="w-full sm:w-auto sm:min-w-[200px]">
                WEB予約はこちら
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                href="#"
                className="w-full sm:w-auto sm:min-w-[200px] border-white text-white hover:bg-white hover:text-salon-charcoal"
              >
                LINEで予約
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
