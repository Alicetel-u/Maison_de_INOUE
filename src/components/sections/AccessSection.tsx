"use client";

import { MapPin, Clock, Phone as PhoneIcon, Train } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import { SALON_INFO } from "@/lib/constants";
import type { SalonInfo } from "@/types";

export default function AccessSection({ salon }: { salon?: SalonInfo }) {
  const info = salon || SALON_INFO;
  return (
    <section id="access" className="py-20 md:py-32 bg-salon-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading titleEn="Access" titleJa="アクセス" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Map */}
          <ScrollReveal variants={fadeInLeft}>
            <div className="aspect-[4/3] md:aspect-[4/3] bg-salon-gray/20 overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=35.85278,139.65944+(Maison+de+INOUE)&z=17&output=embed&hl=ja"
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
                  {info.name}
                </h3>
                <p className="text-xs tracking-wider text-salon-gray mt-1">
                  {info.nameJa} — PRIVATE HAIR SALON
                </p>
              </div>

              <div className="space-y-5 md:space-y-6">
                <div className="flex gap-3 md:gap-4">
                  <MapPin size={18} className="text-salon-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-light">{info.zip}</p>
                    <p className="text-sm font-light">{info.address}</p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4">
                  <Clock size={18} className="text-salon-gold flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {info.hours.map((h) => (
                      <p key={h.label} className="text-sm font-light">
                        {h.label}: {h.time}
                      </p>
                    ))}
                    <p className="text-sm font-light text-salon-gray">
                      定休日: {info.closedDays}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${info.tel.replace(/-/g, "")}`}
                  className="flex gap-3 md:gap-4 items-center min-h-[44px] hover:text-salon-gold transition-colors"
                  aria-label={`電話: ${info.tel}`}
                >
                  <PhoneIcon size={18} className="text-salon-gold flex-shrink-0" />
                  <span className="text-sm font-light">{info.tel}</span>
                </a>

                <div className="flex gap-3 md:gap-4">
                  <Train size={18} className="text-salon-gold flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-light">{info.access}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
