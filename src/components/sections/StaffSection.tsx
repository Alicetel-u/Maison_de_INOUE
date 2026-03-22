"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { STAFF_MEMBERS } from "@/lib/constants";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function StaffSection() {
  return (
    <section id="staff" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading titleEn="Staff" titleJa="スタイリスト" />

        <ScrollReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
          >
            {STAFF_MEMBERS.map((staff) => (
              <motion.div
                key={staff.nameEn}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group"
              >
                {/* Photo */}
                <div className="relative aspect-square overflow-hidden mb-5 md:mb-6">
                  <motion.img
                    src={staff.image}
                    alt={staff.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-salon-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4 md:p-6">
                    <p className="text-white text-xs leading-6 font-light translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                      {staff.message}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <p className="font-display text-xs tracking-[0.2em] text-salon-gold mb-1.5 md:mb-2">
                    {staff.role}
                  </p>
                  <h3 className="text-base md:text-lg tracking-wider mb-1">{staff.name}</h3>
                  <p className="font-display text-sm text-salon-gray tracking-wider mb-2 md:mb-3">
                    {staff.nameEn}
                  </p>
                  <p className="text-xs text-salon-gray mb-2 md:mb-3">{staff.experience}</p>
                  <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                    {staff.specialties.map((s, j) => (
                      <motion.span
                        key={s}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + j * 0.1 }}
                        className="px-2.5 md:px-3 py-1.5 text-[10px] md:text-[11px] tracking-wider border border-salon-charcoal/15 text-salon-gray"
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
