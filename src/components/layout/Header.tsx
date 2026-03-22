"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="group p-1">
              <span className="font-display text-base sm:text-lg md:text-2xl font-semibold tracking-[0.06em] sm:tracking-[0.1em] text-salon-charcoal group-hover:text-salon-gold transition-colors duration-300">
                Maison de INOUE
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-display text-sm tracking-[0.2em] text-salon-charcoal hover:text-salon-gold transition-colors duration-300 bg-transparent border-none cursor-pointer min-h-[44px] flex items-center"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#reservation")}
                className="ml-4 px-6 py-2 min-h-[44px] text-xs tracking-[0.15em] border border-salon-gold text-salon-gold hover:bg-salon-gold hover:text-white transition-all duration-300"
              >
                RESERVATION
              </button>
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-salon-charcoal"
              aria-label={isMobileOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6 sm:gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleNavClick(link.href)}
                  className="font-display text-xl sm:text-2xl tracking-[0.2em] sm:tracking-[0.3em] text-salon-charcoal hover:text-salon-gold transition-colors bg-transparent border-none min-h-[44px] flex items-center"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08 }}
                onClick={() => handleNavClick("#reservation")}
                className="mt-2 px-8 py-3 min-h-[44px] text-sm tracking-[0.15em] border border-salon-gold text-salon-gold hover:bg-salon-gold hover:text-white transition-all duration-300"
              >
                RESERVATION
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
