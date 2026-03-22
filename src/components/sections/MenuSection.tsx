"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MENU_CATEGORIES } from "@/lib/constants";

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES[0].id);
  const activeCategory = MENU_CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <section id="menu" className="py-20 md:py-32 bg-salon-light overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading titleEn="Menu" titleJa="メニュー・料金" />

        {/* Tabs */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-4 mb-10 md:mb-12">
            {MENU_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                aria-selected={activeTab === cat.id}
                role="tab"
                className={`relative px-3 sm:px-5 py-2.5 min-h-[44px] text-xs sm:text-sm tracking-[0.1em] transition-all duration-300 border ${
                  activeTab === cat.id
                    ? "bg-salon-charcoal text-white border-salon-charcoal"
                    : "bg-transparent text-salon-charcoal border-salon-charcoal/20 hover:border-salon-charcoal"
                }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
            className="space-y-1"
            role="tabpanel"
          >
            <div className="text-center mb-6 md:mb-8">
              <motion.span
                className="font-display text-lg md:text-xl tracking-[0.2em] text-salon-gray"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {activeCategory.nameEn}
              </motion.span>
            </div>

            {activeCategory.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-baseline justify-between py-4 md:py-5 border-b border-salon-charcoal/10 group"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base font-light tracking-wider group-hover:text-salon-gold transition-colors duration-300">
                    {item.name}
                  </h4>
                  {item.description && (
                    <p className="text-[11px] md:text-xs text-salon-gray mt-1">{item.description}</p>
                  )}
                </div>
                <div className="flex-shrink-0 ml-3 md:ml-4">
                  <span className="font-display text-base md:text-xl tracking-wider text-salon-gold">
                    {item.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-10 md:mt-12 text-center space-y-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[11px] md:text-xs text-salon-gray">※ 価格はすべて税込です</p>
          <p className="text-[11px] md:text-xs text-salon-gray">
            ※ 髪の長さ・状態により料金が変動する場合がございます
          </p>
        </motion.div>
      </div>
    </section>
  );
}
