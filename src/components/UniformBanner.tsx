"use client";

import React from "react";
import { ShieldCheck, Truck, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function UniformBanner() {
  const features = [
    { icon: <ShieldCheck className="w-5 h-5 text-gold" />, text: "COMPETITIVE" },
    { icon: <Award className="w-5 h-5 text-gold" />, text: "BEST MATERIAL" },
    { icon: <Truck className="w-5 h-5 text-gold" />, text: "ON-TIME DELIVERY" },
    { icon: <Users className="w-5 h-5 text-gold" />, text: "MASS PRODUCTION" },
  ];

  return (
    <section className="relative w-full py-16 bg-[#102B55] overflow-hidden border-y border-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Blazer Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-3 flex justify-center"
        >
          <div className="relative w-full max-w-[280px] h-[340px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img
              src="/images/uniform_blazer.png"
              alt="School Blazer Uniform"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 flex flex-col items-center text-center px-4"
        >
          <div className="flex items-center space-x-2 mb-4">
            <span className="h-[1px] w-8 bg-gold/50" />
            <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
              PREMIUM QUALITY UNIFORMS
            </span>
            <span className="h-[1px] w-8 bg-gold/50" />
          </div>

          <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-wide mb-8 leading-tight">
            Uniforms that Represent<br />Excellence & Identity
          </h2>

          {/* Features Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-10">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/5 shadow-md hover:border-gold/30 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#081C3A] border border-gold/30 shadow-[0_0_10px_rgba(215,164,73,0.1)] group-hover:shadow-[0_0_15px_rgba(215,164,73,0.3)] transition-all duration-300 mb-3">
                  {feature.icon}
                </div>
                <span className="text-white text-[9px] font-bold tracking-widest text-center">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Gold Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-gold text-[#081C3A] font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300 shadow-[0_5px_15px_rgba(215,164,73,0.3)]"
          >
            ASK FOR
          </motion.a>
        </motion.div>

        {/* Right Polo Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-3 flex justify-center"
        >
          <div className="relative w-full max-w-[280px] h-[340px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img
              src="/images/uniform_polo.png"
              alt="School Polo Uniform"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
