import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { SearchProvider } from "@/context/SearchContext";
import "@/global.css";

const container = document.getElementById("navbar-root");

if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <SearchProvider>
        <SmoothCursor />
        <Navbar />
      </SearchProvider>
    </BrowserRouter>
  );
}

