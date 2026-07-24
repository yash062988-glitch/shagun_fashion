import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative w-auto max-w-[880px] ml-6 sm:ml-16 md:ml-28 mr-auto my-4 px-5 py-4 md:px-7 md:py-5 bg-transparent backdrop-blur-md border border-[#C8A14A]/30 rounded-[16px] md:rounded-[18px] shadow-[0_-4px_20px_rgba(200,161,74,0.12)] transition-all duration-500 hover:border-[#C8A14A]/60 hover:shadow-[0_-4px_30px_rgba(200,161,74,0.22)] overflow-hidden pointer-events-auto z-20"
    >
      {/* Top Border Gold Glow & Subtle Shimmer Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A14A]/70 to-transparent transition-opacity duration-500 group-hover:via-[#C8A14A]" />
      
      <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden pointer-events-none">
        <div 
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#FFF0C3] to-transparent opacity-90 animate-gold-shimmer"
        />
      </div>

      {/* Main Layout Grid / Flex Container */}
      <div className="flex flex-col md:flex-row items-center justify-start gap-4 md:gap-6 min-h-[60px] text-left">
        
        {/* Left Side: Logo, Title & Tagline */}
        <div className="flex items-center gap-3.5">
          {/* Floating Crest/Logo */}
          <motion.div
            animate={{ y: [0, -2.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex-shrink-0"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full p-[1.5px] bg-gradient-to-br from-[#C8A14A] via-[#F5F3EB]/50 to-[#C8A14A]/40 shadow-md flex items-center justify-center">
              <img
                src="/logo website.png"
                alt="Shagun Fashion Logo"
                className="w-full h-full object-cover rounded-full bg-[#051327]"
              />
            </div>
          </motion.div>

          <div className="flex flex-col text-left">
            <h2
              className="text-[#F5F3EB] text-sm md:text-base font-bold tracking-[0.2em] transition-colors duration-300 group-hover:text-white"
              style={{ fontFamily: "var(--font-iceberg), serif" }}
            >
              SHAGUN FASHION
            </h2>
            <p className="text-[#C8A14A] text-[9px] md:text-[10px] font-semibold tracking-[0.14em] uppercase mt-0.5 transition-colors duration-300 group-hover:text-[#D4AF37]">
              CRAFTED FOR COMFORT. DESIGNED FOR IDENTITY.
            </p>
          </div>
        </div>

        {/* Center: Thin Vertical Gold Divider (Desktop) */}
        <div className="hidden md:block h-8 w-[1px] bg-gradient-to-b from-transparent via-[#C8A14A]/50 to-transparent transition-colors duration-300 group-hover:via-[#C8A14A]/80 flex-shrink-0 mx-2" />

        {/* Right Side: Premium Icon, Heading & Small Text */}
        <div className="flex items-center gap-3 text-left">
          {/* Premium Tailor Crest / Shield Icon */}
          <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#C8A14A]/10 border border-[#C8A14A]/30 text-[#C8A14A] transition-all duration-300 group-hover:border-[#C8A14A]/60 group-hover:bg-[#C8A14A]/20">
            <svg
              className="w-4 h-4 text-[#C8A14A] transition-transform duration-300 group-hover:scale-105"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.5 4.6-1.35 8-6.25 8-11.5V6l-8-4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7v7M9.5 11.5h5"
              />
            </svg>
          </div>

          <div className="flex flex-col text-left">
            <h3
              className="text-[#F5F3EB] text-[11px] md:text-xs font-semibold tracking-[0.16em] uppercase transition-colors duration-300 group-hover:text-white"
              style={{ fontFamily: "var(--font-iceberg), sans-serif" }}
            >
              ESTABLISHED WITH EXCELLENCE
            </h3>
            <p className="text-[#F5F3EB]/70 text-[10px] md:text-[11px] tracking-wide mt-0.5 transition-colors duration-300 group-hover:text-[#F5F3EB]/90">
              Premium School Uniform Manufacturers
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Line: Copyright & Made with Love */}
      <div className="mt-3.5 pt-2.5 border-t border-[#C8A14A]/15 flex flex-wrap items-center justify-between gap-2 text-left">
        <p className="text-[#F5F3EB]/60 text-[9px] md:text-[10px] tracking-[0.14em] uppercase transition-colors duration-300 group-hover:text-[#F5F3EB]/80">
          &copy; 2026 Shagun Fashion. All Rights Reserved.
        </p>
        <p className="text-[#C8A14A]/90 text-[9px] md:text-[10px] tracking-[0.14em] uppercase font-semibold flex items-center gap-1 transition-colors duration-300 group-hover:text-[#D4AF37]">
          MADE WITH LOVE ❤️
        </p>
      </div>
    </motion.footer>
  );
}
