import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import heroVideo from "../../hero video.mp4";

interface WebsiteIntroProps {
  onClose: () => void;
}

export default function WebsiteIntro({ onClose }: WebsiteIntroProps) {
  const [isVideoFadedIn, setIsVideoFadedIn] = useState(false);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [cursorPosition, setCursorPosition] = useState<"line1" | "line2" | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDismissedRef = useRef(false);

  const text1 = "WELCOME";
  const text2 = "TO SHAGUN FASHION OFFICIAL WEBSITE";

  // Force restart playback on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch((err) => {
        console.warn("Autoplay was blocked or video play failed:", err);
      });
    }
  }, []);

  // Sequential typewriter logic
  useEffect(() => {
    if (!isVideoFadedIn) return;

    setCursorPosition("line1");
    let timer: NodeJS.Timeout;
    let idx = 0;

    const type1 = () => {
      if (idx < text1.length) {
        idx++;
        setLine1(text1.slice(0, idx));
        timer = setTimeout(type1, 55);
      } else {
        // Line 1 finished, wait 500ms then start Line 2
        timer = setTimeout(() => {
          setCursorPosition("line2");
          let idx2 = 0;
          const type2 = () => {
            if (idx2 < text2.length) {
              idx2++;
              setLine2(text2.slice(0, idx2));
              timer = setTimeout(type2, 55);
            } else {
              // Line 2 finished, hide cursor
              setCursorPosition(null);
            }
          };
          type2();
        }, 500);
      }
    };

    // Small delay after video starts fading in before text starts typing
    timer = setTimeout(type1, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [isVideoFadedIn]);

  // Handle dismissal event listeners
  useEffect(() => {
    const handleDismiss = (e: Event) => {
      // Avoid multiple dismiss calls
      if (isDismissedRef.current) return;

      // Filter keydown events to only Enter, Space, and Escape
      if (e.type === "keydown") {
        const keyEvent = e as KeyboardEvent;
        if (
          keyEvent.key !== "Enter" &&
          keyEvent.key !== " " &&
          keyEvent.key !== "Escape"
        ) {
          return;
        }
      }

      isDismissedRef.current = true;
      onClose();
    };

    // Add event listeners on window/document
    window.addEventListener("click", handleDismiss, { capture: true });
    window.addEventListener("touchstart", handleDismiss, { capture: true, passive: true });
    window.addEventListener("pointerdown", handleDismiss, { capture: true, passive: true });
    window.addEventListener("keydown", handleDismiss, { capture: true });
    window.addEventListener("wheel", handleDismiss, { capture: true, passive: true });
    window.addEventListener("scroll", handleDismiss, { capture: true, passive: true });

    return () => {
      // Remove event listeners on unmount
      window.removeEventListener("click", handleDismiss, { capture: true });
      window.removeEventListener("touchstart", handleDismiss, { capture: true });
      window.removeEventListener("pointerdown", handleDismiss, { capture: true });
      window.removeEventListener("keydown", handleDismiss, { capture: true });
      window.removeEventListener("wheel", handleDismiss, { capture: true });
      window.removeEventListener("scroll", handleDismiss, { capture: true });
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 w-full h-full z-[99999] bg-black overflow-hidden flex flex-col items-center justify-center select-none"
      style={{ willChange: "opacity" }}
    >
      {/* CSS style block for custom cursor blink */}
      <style>{`
        @keyframes intro-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .intro-cursor-gold {
          color: #D4AF37;
          display: inline-block;
          margin-left: 4px;
          animation: intro-cursor-blink 1s step-end infinite;
          font-weight: normal;
        }
        .intro-cursor-white {
          color: #FAF6E9;
          display: inline-block;
          margin-left: 4px;
          animation: intro-cursor-blink 1s step-end infinite;
          font-weight: normal;
        }
      `}</style>

      {/* Video Container with Fade-in animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        onAnimationComplete={() => setIsVideoFadedIn(true)}
        className="absolute inset-0 w-full h-full z-0"
        style={{ willChange: "opacity" }}
      >
        <video
          ref={videoRef}
          src={heroVideo}
          preload="auto"
          muted
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </motion.div>

      {/* Subtle Black Overlay (40%) */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.65)_100%)] z-20 pointer-events-none" />

      {/* Text Backdrop Blur and Typography Container */}
      <div className="relative z-30 max-w-5xl px-6 flex flex-col items-center justify-center text-center pointer-events-none">
        {/* Backdrop Blur effect centered behind the text */}
        <div className="absolute inset-0 -m-10 backdrop-blur-[2px] bg-black/5 rounded-2xl -z-10 pointer-events-none" />

        {/* Line 1: WELCOME */}
        <h1
          className="font-heading text-[52px] sm:text-[72px] md:text-[96px] lg:text-[120px] font-normal tracking-[0.2em] mb-4 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #F6E27A 0%, #D4AF37 50%, #B8860B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 15px rgba(246, 226, 122, 0.45))",
          }}
        >
          {line1}
          {cursorPosition === "line1" && (
            <span className="intro-cursor-gold">|</span>
          )}
        </h1>

        {/* Line 2: TO SHAGUN FASHION OFFICIAL WEBSITE */}
        <p
          className="font-heading text-[18px] sm:text-[24px] md:text-[36px] lg:text-[48px] font-normal tracking-[0.15em] text-[#FAF6E9] leading-tight flex items-center justify-center"
          style={{
            textShadow: "0 0 10px rgba(250, 246, 233, 0.2)",
          }}
        >
          {line2}
          {cursorPosition === "line2" && (
            <span className="intro-cursor-white">|</span>
          )}
        </p>
      </div>
    </motion.div>
  );
}
