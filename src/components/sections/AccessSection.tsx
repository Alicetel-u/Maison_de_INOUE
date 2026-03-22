"use client";

import { MapPin, Clock, Phone as PhoneIcon, Train } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import { SALON_INFO } from "@/lib/constants";

export default function AccessSection() {
  return (
    <section id="access" className="py-20 md:py-32 bg-salon-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading titleEn="Access" titleJa="アクセス" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Map */}
          <ScrollReveal variants={fadeInLeft}>
            <div className="aspect-[4/3] md:aspect-[4/3] bg-salon-gray/20 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.169023401053!2d139.7071513!3d35.6654861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ca40c2e58c7%3A0xc7e39d8e0fcabc23!2z6KGo5Y-C6YGT!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Maison de INOUE アクセスマップ"
              />
            </div>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal variants={fadeInRight}>
            <div className="flex flex-col justify-center space-y-6 md:space-y-8">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-light tracking-[0.15em] md:tracking-[0.2em]">
                  {SALON_INFO.name}
                </h3>
                <p className="text-xs tracking-wider text-salon-gray mt-1">
                  {SALON_INFO.nameJa} — PRIVATE HAIR SALON
                </p>
              </div>

              <div className="space-y-5 md:space-y-6">
                <div className="flex gap-3 md:gap-4">
                  <MapPin size={18} className="text-salon-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-light">{SALON_INFO.zip}</p>
                    <p className="text-sm font-light">{SALON_INFO.address}</p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4">
                  <Clock size={18} className="text-salon-gold flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {SALON_INFO.hours.map((h) => (
                      <p key={h.label} className="text-sm font-light">
                        {h.label}: {h.time}
                      </p>
                    ))}
                    <p className="text-sm font-light text-salon-gray">
                      定休日: {SALON_INFO.closedDays}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${SALON_INFO.tel.replace(/-/g, "")}`}
                  className="flex gap-3 md:gap-4 items-center min-h-[44px] hover:text-salon-gold transition-colors"
                  aria-label={`電話: ${SALON_INFO.tel}`}
                >
                  <PhoneIcon size={18} className="text-salon-gold flex-shrink-0" />
                  <span className="text-sm font-light">{SALON_INFO.tel}</span>
                </a>

                <div className="flex gap-3 md:gap-4">
                  <Train size={18} className="text-salon-gold flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-light">{SALON_INFO.access}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
