"use client";

import React from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-transparent transition-all duration-300 md:px-16"
    >
      {/* Left Logo */}
      <div className="flex items-center">
        <a href="/" className="flex items-center text-xl font-bold tracking-wider text-white hover:text-gold transition-colors duration-300 font-heading">
          <img
            src="/logo website.png"
            alt="Shagun Fashion Logo"
            className="h-[46px] w-auto object-contain -mr-[2px]"
          />
          SHAGUN FASHION
        </a>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 md:space-x-4">
        <SearchBar />
        <a
          href="/"
          className="flex items-center justify-center px-4 py-1.5 rounded-full border border-white/30 bg-transparent transition-all duration-300 hover:border-gold hover:bg-[#081C3A]/80 text-white font-semibold text-xs tracking-[0.2em] uppercase"
        >
          HOME
        </a>
      </div>
    </motion.nav>
  );
}
