import { Instagram } from "lucide-react";
import { SALON_INFO, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-salon-charcoal text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-[0.1em] mb-4">
              Maison de INOUE
            </h3>
            <p className="text-white/50 text-xs tracking-[0.15em] mb-6">
              PRIVATE HAIR SALON
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-11 h-11 border border-white/20 flex items-center justify-center hover:border-salon-gold hover:text-salon-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-11 h-11 border border-white/20 flex items-center justify-center hover:border-salon-gold hover:text-salon-gold transition-all duration-300 text-xs font-bold"
                aria-label="LINE"
              >
                LINE
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] text-white/50 mb-6">
              NAVIGATION
            </h4>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-display text-sm tracking-[0.15em] text-white/70 hover:text-salon-gold transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-[0.2em] text-white/50 mb-6">
              INFORMATION
            </h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>{SALON_INFO.zip}</p>
              <p>{SALON_INFO.address}</p>
              <p className="mt-3">TEL: {SALON_INFO.tel}</p>
              {SALON_INFO.hours.map((h) => (
                <p key={h.label}>
                  {h.label}: {h.time}
                </p>
              ))}
              <p>定休日: {SALON_INFO.closedDays}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/30 tracking-wider">
            &copy; 2025 {SALON_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
