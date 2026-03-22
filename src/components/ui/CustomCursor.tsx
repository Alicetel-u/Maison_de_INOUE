"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsTouch(false);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    window.addEventListener("mousemove", move, { passive: true });

    // Use event delegation instead of per-element listeners
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setHovered(true);
      }
    };
    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setHovered(false);
      }
    };

    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [x, y, visible, handleMouseEnter, handleMouseLeave]);

  if (isTouch || !visible) return null;

  return (
    <div aria-hidden="true">
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99] mix-blend-difference"
        style={{ x, y }}
      >
        <motion.div
          className="rounded-full border border-white -translate-x-1/2 -translate-y-1/2 will-change-transform"
          animate={{
            width: hovered ? 50 : 32,
            height: hovered ? 50 : 32,
            opacity: hovered ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99]"
        style={{ x, y }}
      >
        <motion.div
          className="rounded-full bg-salon-gold -translate-x-1/2 -translate-y-1/2 will-change-transform"
          animate={{
            width: hovered ? 8 : 4,
            height: hovered ? 8 : 4,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
}
