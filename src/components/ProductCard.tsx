"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  imageSrc: string;
  title: string;
}

export default function ProductCard({ imageSrc, title }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      data-product-title={title}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="relative flex flex-col justify-between w-full h-[450px] bg-[#F5F2EB] rounded-2xl p-6 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-shadow duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top Wishlist Heart */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/40 backdrop-blur-sm border border-black/5 hover:bg-white/80 transition-colors duration-300 focus:outline-none"
      >
        <Heart
          className={`w-4.5 h-4.5 transition-colors duration-300 ${
            isLiked ? "fill-[#D7A449] text-[#D7A449]" : "text-black"
          }`}
        />
      </button>

      {/* Image Container with Zoom */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden rounded-xl bg-transparent">
        <motion.img
          src={imageSrc}
          alt={title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-h-[260px] w-auto object-contain transition-transform duration-500"
        />
      </div>

      {/* Info Section */}
      <div className="flex flex-col items-center mt-4">
        {/* Title */}
        <h3 className="text-black font-semibold text-xs tracking-[0.2em] uppercase text-center mb-5">
          {title}
        </h3>

        {/* Contact Us Button */}
        <a
          href="/contact/"
          className="flex items-center justify-center space-x-2 px-6 py-2 border border-black text-black hover:bg-black hover:text-white font-bold text-[10px] tracking-widest uppercase rounded-md transition-all duration-300 bg-transparent"
        >
          <span>CONTACT US</span>
          <Heart className="w-3 h-3 fill-current" />
        </a>
      </div>
    </motion.div>
  );
}
