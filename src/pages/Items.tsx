import React from "react";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import ProductsSection from "@/components/ProductsSection";
import UniformBanner from "@/components/UniformBanner";
import ManufacturingProcess from "@/components/ManufacturingProcess";

export default function Items() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-bg font-sans text-white">
      {/* Hero Header Section */}
      <Hero />

      {/* Feature Strip */}
      <FeatureStrip />

      {/* Products Slider Sections */}
      <ProductsSection />

      {/* School Uniform Showcase Banner */}
      <UniformBanner />

      {/* Manufacturing Process */}
      <ManufacturingProcess />

      {/* Simple 3-line Footer */}
      <footer className="w-full flex flex-col items-center justify-center text-center py-12 bg-[#051327] border-t border-white/5 z-20 pointer-events-auto">
        <span className="font-bold tracking-widest text-white mb-1" style={{ fontFamily: 'var(--font-iceberg), sans-serif', fontSize: '16px' }}>
          SHAGUN FASHION - MADE WITH LOVE ❤️
        </span>
        <p className="text-white/60 text-[11px] max-w-[350px] mb-1">
          Crafting premium quality garments, custom lowers, tracksuits, and school uniforms with precision.
        </p>
        <p className="text-white/50 text-[10px]">
          &copy; {new Date().getFullYear()} Shagun Fashion. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
