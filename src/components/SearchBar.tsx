"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/context/SearchContext";
import { workedProducts, regularProducts } from "@/data/products";

export default function SearchBar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { searchQuery, setSearchQuery } = useSearch();

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Combine products and tag them by category
  const allProducts = [
    ...workedProducts.map((p) => ({ ...p, category: "Worked Product" })),
    ...regularProducts.map((p) => ({ ...p, category: "In-Stock" })),
  ];

  // Search filter matching logic:
  // - Ignore uppercase/lowercase
  // - Support partial matches
  // - Ignore extra spaces
  const queryCleaned = searchQuery.trim().toLowerCase().replace(/\s+/g, " ");

  const filteredProducts = allProducts.filter((product) => {
    if (!queryCleaned) return false;
    const titleCleaned = product.title.trim().toLowerCase().replace(/\s+/g, " ");
    return titleCleaned.includes(queryCleaned);
  });

  // Limit to first 8 matching results
  const resultsToDisplay = filteredProducts.slice(0, 8);

  const shouldShowDropdown = dropdownOpen && searchQuery.trim() !== "";

  // Click / Touch outside handler to dismiss dropdown
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setSearchFocused(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  // Auto-scroll list container to keep keyboard-active item in view
  useEffect(() => {
    if (activeIndex >= 0 && dropdownRef.current) {
      const activeElement = dropdownRef.current.querySelector(`[data-index="${activeIndex}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  const handleResultClick = (product: typeof allProducts[0]) => {
    // 1. Dispatch custom event to let the correct marquee pause and center
    const event = new CustomEvent("select-product", {
      detail: {
        title: product.title,
        category: product.category,
      },
    });
    window.dispatchEvent(event);

    // 2. Smoothly scroll the page so the selected card is centered vertically
    const titleEscaped = product.title.replace(/"/g, '\\"');
    const elements = document.querySelectorAll(`[data-product-title="${titleEscaped}"]`);
    if (elements && elements.length > 0) {
      elements[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // 3. Close the dropdown and blur focus from active element
    setDropdownOpen(false);
    setSearchFocused(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!shouldShowDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        if (resultsToDisplay.length === 0) return -1;
        return prev < resultsToDisplay.length - 1 ? prev + 1 : 0;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => {
        if (resultsToDisplay.length === 0) return -1;
        return prev > 0 ? prev - 1 : resultsToDisplay.length - 1;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      const indexToSelect = activeIndex === -1 ? 0 : activeIndex;
      if (resultsToDisplay[indexToSelect]) {
        handleResultClick(resultsToDisplay[indexToSelect]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setDropdownOpen(false);
      setSearchFocused(false);
      e.currentTarget.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      <div
        className={`flex items-center px-4 py-1.5 rounded-full border transition-all duration-300 ${
          searchFocused
            ? "border-gold bg-[#081C3A]/80 w-48 md:w-56"
            : "border-white/30 bg-transparent w-36 md:w-40"
        }`}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setDropdownOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => {
            setSearchFocused(true);
            setDropdownOpen(true);
          }}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={shouldShowDropdown}
          aria-autocomplete="list"
          aria-controls="search-results-listbox"
          aria-haspopup="listbox"
          aria-activedescendant={activeIndex >= 0 ? `result-item-${activeIndex}` : undefined}
          className="w-full bg-transparent text-xs text-white placeholder-white/50 focus:outline-none pr-2"
        />
        <Search className="w-3.5 h-3.5 text-white/70 cursor-pointer hover:text-gold transition-colors duration-300" />
      </div>

      {/* Dropdown with Framer Motion animations */}
      <AnimatePresence>
        {shouldShowDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            id="search-results-listbox"
            role="listbox"
            aria-label="Search results"
            className="absolute top-full right-0 mt-2 w-64 md:w-72 bg-[#081C3A] border border-gold rounded-2xl shadow-2xl overflow-y-auto max-h-[350px] z-50 py-1"
          >
            {resultsToDisplay.length > 0 ? (
              resultsToDisplay.map((product, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={`${product.category}-${product.id}-${idx}`}
                    id={`result-item-${idx}`}
                    role="option"
                    aria-selected={isActive}
                    data-index={idx}
                    onClick={() => handleResultClick(product)}
                    className={`flex items-center gap-3 py-3 pr-4 cursor-pointer transition-colors duration-200 group border-b border-white/5 last:border-b-0 ${
                      isActive
                        ? "bg-[#102B55] pl-[13px] border-l-[3px] border-gold text-gold"
                        : "pl-4 hover:bg-[#102B55] hover:text-gold text-white"
                    }`}
                  >
                    <img
                      src={product.imageSrc}
                      alt={product.title}
                      className="w-10 h-10 object-contain rounded-md bg-[#F5F2EB]/10 p-1 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold text-xs tracking-wider uppercase truncate transition-colors duration-200 ${
                        isActive ? "text-gold" : "text-white group-hover:text-gold"
                      }`}>
                        {product.title}
                      </h4>
                      <span className="text-[10px] text-muted-text font-medium tracking-widest uppercase">
                        {product.category}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-all duration-200 ${
                      isActive ? "text-gold translate-x-1" : "text-white/40 group-hover:text-gold group-hover:translate-x-1"
                    }`} />
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-6 text-center text-xs text-muted-text uppercase tracking-widest">
                No products found.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
