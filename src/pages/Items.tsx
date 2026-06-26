import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import ProductsSection from "@/components/ProductsSection";
import UniformBanner from "@/components/UniformBanner";
import ManufacturingProcess from "@/components/ManufacturingProcess";
import { SearchProvider } from "@/context/SearchContext";

export default function Items() {
  return (
    <SearchProvider>
      <div className="flex flex-col min-h-screen bg-primary-bg font-sans text-white">
      {/* Navigation */}
      <Navbar />

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

      {/* Elegant Footer */}
      <footer className="bg-[#051327] py-12 border-t border-white/5 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center mb-6">
          <span className="text-lg font-bold tracking-wider text-white mb-2 font-heading">
            SHAGUN FASHION
          </span>
          <p className="text-muted-text text-[11px] max-w-[300px]">
            Crafting premium quality garments, custom lowers, tracksuits, and school uniforms with precision.
          </p>
        </div>
        
        <p className="text-muted-text text-[10px] mt-2">
          &copy; {new Date().getFullYear()} Shagun Fashion. All rights reserved.
        </p>
      </footer>
    </div>
    </SearchProvider>
  );
}
