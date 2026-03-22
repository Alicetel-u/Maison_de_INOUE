"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ParallaxImage from "@/components/ui/ParallaxImage";
import TextReveal from "@/components/ui/TextReveal";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import { img } from "@/lib/constants";

export default function ConceptSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], [0, 200]);

  return (
    <section id="concept" ref={sectionRef} className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading titleEn="Concept" titleJa="コンセプト" />

        <motion.div
          className="h-[1px] bg-salon-gold/30 mx-auto mb-14 md:mb-20"
          style={{ width: lineWidth }}
        />

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center mb-16 md:mb-32">
          <ScrollReveal variants={fadeInLeft}>
            <ParallaxImage
              src={img("/images/concept/concept-1.png")}
              alt="シャンプーブース"
              className="aspect-square"
              speed={0.2}
            />
          </ScrollReveal>
          <ScrollReveal variants={fadeInRight}>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-light tracking-[0.1em] md:tracking-[0.15em] mb-4 md:mb-6">
              <TextReveal text="Light of Beauty" charDelay={0.05} />
            </h3>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[1px] bg-salon-gold mb-4 md:mb-6"
            />
            <p className="text-xs sm:text-sm leading-7 md:leading-8 text-salon-charcoal/80 font-light">
              &quot;光&quot;をテーマに、お客様一人ひとりの内面の美しさを引き出します。
              <br /><br />
              天然由来の厳選されたプロダクトと、確かな技術で、
              あなただけの輝きを見つけるお手伝いをいたします。
              <br /><br />
              完全予約制のプライベート空間で、日常から離れた
              特別なひとときをお過ごしください。
            </p>
          </ScrollReveal>
        </div>

        {/* Row 2 (reversed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          <ScrollReveal variants={fadeInLeft} className="md:order-2">
            <ParallaxImage
              src={img("/images/concept/concept-2.png")}
              alt="待合スペース"
              className="aspect-square"
              speed={0.2}
            />
          </ScrollReveal>
          <ScrollReveal variants={fadeInRight} className="md:order-1">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-light tracking-[0.1em] md:tracking-[0.15em] mb-4 md:mb-6">
              <TextReveal text="Your Private Space" charDelay={0.05} />
            </h3>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[1px] bg-salon-gold mb-4 md:mb-6"
            />
            <p className="text-xs sm:text-sm leading-7 md:leading-8 text-salon-charcoal/80 font-light">
              落ち着いた空間でお客様としっかり向き合い、
              ライフスタイルや髪のお悩みをじっくりカウンセリング。
              <br /><br />
              一回一回の施術を大切に、再現性の高いスタイルと
              ホームケアのアドバイスまでトータルにサポートいたします。
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
