"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, Scissors, ShieldCheck, Box, Milestone } from "lucide-react";

// Custom SVGs for Fabric and Sewing Machine to look premium and match perfectly
const FabricIcon = () => (
  <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const SewingMachineIcon = () => (
  <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 18h16M7 18V8a2 2 0 012-2h6a2 2 0 012 2v10M17 10h2M9 10h4M11 14h2" />
  </svg>
);

export default function ManufacturingProcess() {
  const steps = [
    {
      icon: <FabricIcon />,
      title: "Fabric Selection",
      desc: "We source premium quality fabric for comfort and durability",
    },
    {
      icon: <Scissors className="w-7 h-7 text-gold" />,
      title: "Precission Cutting",
      desc: "Advanced cutting techniques for perfect fit and finish",
    },
    {
      icon: <SewingMachineIcon />,
      title: "Expert Stitching",
      desc: "Skilled craftsmanship ensures strength in every stitch",
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-gold" />,
      title: "Quality Inspection",
      desc: "Every piece goes through quality check before packing",
    },
    {
      icon: <Box className="w-7 h-7 text-gold" />,
      title: "Packaging & Delivery",
      desc: "Neatly packed and delivered on time Every Time.",
    },
  ];

  return (
    <section className="py-24 bg-primary-bg px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Crown Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <Crown className="w-8 h-8 text-gold fill-gold/10" />
        </motion.div>

        {/* Heading */}
        <div className="flex items-center space-x-4 mb-3">
          <span className="h-[1px] w-12 bg-gold/40" />
          <h2 className="text-white text-xs font-bold tracking-[0.25em] uppercase text-center">
            OUR MANUFACTURING PROCESS
          </h2>
          <span className="h-[1px] w-12 bg-gold/40" />
        </div>

        <h3 className="text-white text-lg md:text-xl font-bold tracking-wide text-center mb-16">
          Crafted with Precision. Delivered with <span className="text-gold">Pride</span>
        </h3>

        {/* Steps Grid */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-8 lg:gap-2">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Step Card */}
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center text-center max-w-[200px] group cursor-pointer"
              >
                {/* Circle Icon Wrapper */}
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#102B55] border-2 border-gold/40 shadow-[0_5px_15px_rgba(215,164,73,0.15)] group-hover:border-gold group-hover:shadow-[0_0_25px_rgba(215,164,73,0.5)] transition-all duration-300 mb-6">
                  {step.icon}
                </div>

                {/* Text content */}
                <h4 className="text-white font-bold text-sm tracking-wide mb-3 group-hover:text-gold transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-muted-text text-[11px] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>

              {/* Connecting Arrow (show on desktop, hide on mobile) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center h-20 text-gold/40">
                  <svg
                    className="w-6 h-6 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
