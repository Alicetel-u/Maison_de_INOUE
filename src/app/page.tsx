"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/ui/PageLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import HeroSection from "@/components/sections/HeroSection";
import ConceptSection from "@/components/sections/ConceptSection";
import MenuSection from "@/components/sections/MenuSection";
import StaffSection from "@/components/sections/StaffSection";
import GallerySection from "@/components/sections/GallerySection";
import InstagramSection from "@/components/sections/InstagramSection";
import CTASection from "@/components/sections/CTASection";
import AccessSection from "@/components/sections/AccessSection";

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <Header />
      <main>
        <HeroSection />
        <ConceptSection />
        <MenuSection />
        <StaffSection />
        <GallerySection />
        <InstagramSection />
        <CTASection />
        <AccessSection />
      </main>
      <Footer />
    </>
  );
}
