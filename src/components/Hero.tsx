"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedManufacturingParagraph from "@/components/AnimatedManufacturingParagraph";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [welcomeText, setWelcomeText] = useState("");
  const [headingText, setHeadingText] = useState("");
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);
  const [isHeadingComplete, setIsHeadingComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  const fullWelcome = "Welcome!";
  const fullHeading = "We make the best quality products in the city";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // 20px max movement
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Check user preferences for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      setTimeout(() => {
        setPrefersReducedMotion(true);
        setWelcomeText(fullWelcome);
        setHeadingText(fullHeading);
        setIsWelcomeComplete(true);
        setIsHeadingComplete(true);
      }, 0);
      return;
    }

    let welcomeIntervalId: NodeJS.Timeout;
    let headingIntervalId: NodeJS.Timeout;
    let loopTimeoutId: NodeJS.Timeout;

    function runCycle() {
      // Clear previous states
      setWelcomeText("");
      setHeadingText("");
      setIsWelcomeComplete(false);
      setIsHeadingComplete(false);
      setAnimationTrigger(prev => prev + 1);

      // Start Welcome typing immediately
      let welcomeLen = 0;
      welcomeIntervalId = setInterval(() => {
        welcomeLen++;
        setWelcomeText(fullWelcome.slice(0, welcomeLen));

        if (welcomeLen === fullWelcome.length) {
          clearInterval(welcomeIntervalId);
          setIsWelcomeComplete(true);
        }
      }, 50);

      // Start Heading typing immediately
      let headingLen = 0;
      headingIntervalId = setInterval(() => {
        headingLen++;
        setHeadingText(fullHeading.slice(0, headingLen));

        if (headingLen === fullHeading.length) {
          clearInterval(headingIntervalId);
          setIsHeadingComplete(true);
        }
      }, 50);

      // Restart after 5000ms (2500ms typing/reveal + 2500ms delay)
      loopTimeoutId = setTimeout(runCycle, 5000);
    }

    runCycle();

    return () => {
      if (welcomeIntervalId) clearInterval(welcomeIntervalId);
      if (headingIntervalId) clearInterval(headingIntervalId);
      clearTimeout(loopTimeoutId);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden flex items-center justify-start px-8 md:px-24"
    >
      {/* Background Image Container with Parallax and Zoom */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero_sewing.png')",
        }}
        animate={{
          scale: [1.1, 1.15, 1.1],
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{
          scale: {
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          },
          x: { type: "tween", ease: "easeOut", duration: 0.5 },
          y: { type: "tween", ease: "easeOut", duration: 0.5 },
        }}
      />

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#081C3A]/90 via-[#081C3A]/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-[#081C3A]/30 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-2xl text-left mt-4 md:mt-8">
        <p
          aria-label={fullWelcome}
          className="text-gold text-2xl md:text-3xl font-medium tracking-wide mb-3 font-heading"
        >
          <span aria-hidden="true">
            <span className="text-gold">{welcomeText}</span>
            <span className="relative">
              {!isWelcomeComplete && !prefersReducedMotion && (
                <span className="absolute left-0.5 text-gold animate-blink select-none">|</span>
              )}
            </span>
            <span className="text-transparent select-none pointer-events-none">
              {fullWelcome.slice(welcomeText.length)}
            </span>
          </span>
        </p>

        <h1
          aria-label={fullHeading}
          className="text-white text-4xl md:text-6xl font-bold leading-tight mb-5"
        >
          <span aria-hidden="true">
            <span className="text-white">{headingText}</span>
            <span className="relative">
              {isWelcomeComplete && !isHeadingComplete && !prefersReducedMotion && (
                <span className="absolute left-0.5 text-gold animate-blink select-none">|</span>
              )}
            </span>
            <span className="text-transparent select-none pointer-events-none">
              {fullHeading.slice(headingText.length)}
            </span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-muted-text text-sm md:text-base leading-relaxed mb-6 max-w-lg"
        >
          <AnimatedManufacturingParagraph trigger={animationTrigger} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full flex justify-left mt-4"
        >
          <a
            href="#products"
            className="inline-block px-8 py-3.5 rounded-full border border-gold text-white font-semibold text-sm tracking-wider uppercase bg-white/5 hover:bg-gold hover:text-primary-bg transition-all duration-300 shadow-[0_0_15px_rgba(215,164,73,0.15)] hover:shadow-[0_0_25px_rgba(215_164,73,0.45)] transform hover:-translate-y-0.5"
          >
            Order now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
