"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));
}

export default function FloatingParticles({ color = "rgba(196, 163, 110, 0.3)" }: { color?: string }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Reduce particles on mobile, respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const isMobile = window.innerWidth < 768;
    setParticles(makeParticles(isMobile ? 8 : 16));
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: color,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
