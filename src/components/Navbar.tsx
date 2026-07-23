"use client";

import React from "react";
import { useLocation } from "react-router-dom";
import PillNav from "./PillNav";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const location = useLocation();
  const currentPath = typeof window !== "undefined" ? window.location.pathname : location.pathname;

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about/" },
    { label: "ITEMS", href: "/items" },
    { label: "CONTACT US", href: "/contact/" },
  ];

  return (
    <div className="relative w-full z-50">
      <PillNav
        logo="/logo website.png"
        logoAlt="Shagun Fashion Logo"
        items={navItems}
        activeHref={currentPath}
        baseColor="#030c22"
        pillColor="#081c3a"
        hoverCircleColor="#ffffff"
        hoveredPillTextColor="#030c22"
        pillTextColor="#ffffff"
      />
      <div className="fixed top-5 right-6 z-50 hidden sm:block">
        <SearchBar />
      </div>
    </div>
  );
}
