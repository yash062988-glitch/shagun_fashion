import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "@/context/SearchContext";
import "./global.css";

const container = document.getElementById("root");

const root = createRoot(container as Element);
root.render(
  <BrowserRouter basename="/contact">
    <SearchProvider>
      <App />
    </SearchProvider>
  </BrowserRouter>
);

reportWebVitals();
