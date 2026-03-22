"use client";

import { motion } from "framer-motion";
import { Instagram, Heart } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { INSTAGRAM_POSTS } from "@/lib/constants";

export default function InstagramSection() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <ScrollReveal className="text-center mb-10 md:mb-12">
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 md:gap-3 group p-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            aria-label="Instagramアカウント @maison_de_inoue"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Instagram
                size={22}
                className="text-salon-charcoal group-hover:text-salon-gold transition-colors"
              />
            </motion.div>
            <span className="font-display text-base md:text-xl tracking-[0.15em] md:tracking-[0.2em] text-salon-charcoal group-hover:text-salon-gold transition-colors">
              @maison_de_inoue
            </span>
          </motion.a>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-2 md:gap-3">
            {INSTAGRAM_POSTS.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="group relative aspect-square overflow-hidden cursor-pointer"
              >
                <motion.img
                  src={post.image}
                  alt={`Instagram投稿 ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover will-change-transform"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="flex items-center gap-1 text-white">
                    <Heart size={14} fill="white" />
                    <span className="text-xs font-light">{post.likes}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
