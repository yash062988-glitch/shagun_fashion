"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shirt, Scissors, Activity, Sparkles, Layers } from "lucide-react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

export default function FeatureStrip() {
  const features: FeatureItem[] = [
    {
      icon: <Shirt className="w-6 h-6 text-[#081C3A]" />,
      title: "PLAIN T-SHIRTS",
      subtitle: "ALWAYS IN STOCK",
      description: "Premium quality plain t-shirts in multiple colors.",
    },
    {
      icon: <Scissors className="w-6 h-6 text-[#081C3A]" />,
      title: "DESIGNER & PLAIN",
      subtitle: "LOWER",
      description: "Comfy lowers and track pants crafted for daily wear.",
    },
    {
      icon: <Activity className="w-6 h-6 text-[#081C3A]" />,
      title: "TRACK SUITS",
      subtitle: "PREMIUM QUALITY",
      description: "High performance sportswear tailored to perfection.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#081C3A]" />,
      title: "DESIGNER T-SHIRTS &",
      subtitle: "HOSIERY ITEMS",
      description: "Trendy custom printed t-shirts and hosiery items.",
    },
    {
      icon: <Layers className="w-6 h-6 text-[#081C3A]" />,
      title: "PREMIUM FABRICS",
      subtitle: "WIDE RANGE",
      description: "A wide selection of fabrics of unmatched durability.",
    },
  ];

  return (
    <section className="relative z-30 px-6 md:px-16 -mt-16 max-w-7xl mx-auto w-full">
      <div className="bg-[#102B55]/95 backdrop-blur-md rounded-2xl border border-gold/40 p-8 md:p-10 shadow-[0_15px_35px_rgba(8,28,58,0.5)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center text-center px-4 pt-6 lg:pt-0 first:pt-0 cursor-pointer group"
            >
              {/* Gold metallic coin icon */}
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-[#F3E0B5] via-[#D7A449] to-[#8F661E] shadow-[0_4px_15px_rgba(215,164,73,0.3)] group-hover:shadow-[0_0_20px_rgba(215,164,73,0.6)] transition-all duration-300 mb-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="text-gold font-bold text-xs tracking-wider mb-1">
                {feature.title}
              </h3>
              <h4 className="text-white font-bold text-xs tracking-widest mb-3">
                {feature.subtitle}
              </h4>
              <p className="text-muted-text text-[10px] leading-relaxed max-w-[180px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
