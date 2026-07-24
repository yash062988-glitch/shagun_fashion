import React from "react";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import ProductsSection from "@/components/ProductsSection";
import UniformBanner from "@/components/UniformBanner";
import ManufacturingProcess from "@/components/ManufacturingProcess";
import Footer from "@/components/Footer";

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

      {/* Luxury Branded Footer */}
      <Footer />
    </div>
  );
}
