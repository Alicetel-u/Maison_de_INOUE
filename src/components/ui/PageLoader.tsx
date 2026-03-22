"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const timer = setTimeout(() => setIsLoading(false), window.innerWidth < 768 ? 800 : 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-salon-charcoal flex flex-col items-center justify-center px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: isMobile ? 0.3 : 0.6, ease: "easeInOut" }}
        >
          <div className="text-center">
            <h1 className="font-display text-2xl md:text-4xl font-semibold tracking-[0.1em] text-white">
              Maison de INOUE
            </h1>
            {!isMobile && (
              <>
                <motion.div
                  className="h-[1px] bg-salon-gold mx-auto mt-4"
                  initial={{ width: 0 }}
                  animate={{ width: 100 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                />
                <motion.p
                  className="font-display text-xs tracking-[0.4em] text-white/50 mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                >
                  PRIVATE HAIR SALON
                </motion.p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
