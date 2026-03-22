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
                src="https://maps.google.com/maps?saddr=%E5%8D%97%E6%B5%A6%E5%92%8C%E9%A7%85&daddr=%E5%9F%BC%E7%8E%89%E7%9C%8C%E3%81%95%E3%81%84%E3%81%9F%E3%81%BE%E5%B8%82%E5%8D%97%E5%8C%BA%E6%96%87%E8%94%B52-1-4+%E3%82%B5%E3%82%AF%E3%83%A9%E3%83%93%E3%83%AB&dirflg=w&output=embed&hl=ja"
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
