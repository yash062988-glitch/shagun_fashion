import { FunctionComponent, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import FrameComponent2 from "../components/FrameComponent2";
import Component1 from "../components/Component1";
import { LuxuryFeatures } from "../components/LuxuryFeatures";
import Footer from "../components/Footer";
import TrustedSchoolsDivider from "../components/TrustedSchoolsDivider";
import styles from "./Desktop1.module.css";

export type Desktop1Type = {};

const Desktop1: FunctionComponent<Desktop1Type> = ({ }) => {
  const paragraph = "Shagun Fashion is a trusted school uniform manufacturer specializing in premium-quality uniforms, sportswear, tracksuits, and custom school apparel. We combine comfort, durability, and professional craftsmanship to deliver uniforms that reflect identity, confidence, and excellence for schools across India.";
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showSystemPopup, setShowSystemPopup] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    
    // Typewriter effect logic
    const typeNextChar = () => {
      if (currentIndex < paragraph.length) {
        setDisplayedText(paragraph.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(typeNextChar, 15);
      } else {
        setIsTyping(false);
      }
    };

    timeout = setTimeout(typeNextChar, 100);
    return () => clearTimeout(timeout);
  }, [paragraph]);

  // Mouse position tracking for background shine
  const [bgMouseX, setBgMouseX] = useState(50);
  const [bgHoverActive, setBgHoverActive] = useState(false);

  const handleBgMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBgMouseX(Math.max(0, Math.min(100, x)));
    setBgHoverActive(true);
  };

  const handleBgMouseLeave = () => {
    setBgHoverActive(false);
  };

  return (
    <div className={styles.desktop1}>
      {/* System Under Control Popup */}
      <AnimatePresence>
        {showSystemPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-8 right-8 z-[100] bg-black/80 backdrop-blur-md border border-white/10 px-5 py-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-3 pointer-events-auto"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
            <span className="text-white font-mono text-[11px] tracking-widest uppercase mt-[1px]">
              System is under control
            </span>
            <button
              onClick={() => setShowSystemPopup(false)}
              className="ml-4 text-white/40 hover:text-white transition-colors cursor-pointer outline-none pb-0.5"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.tailoringBackgroundWrapper}>
        <img
          src="/new.png"
          className={styles.tailoringBackgroundImage}
          alt="Premium Tailoring Workshop"
        />
        <div className={styles.tailoringBackgroundOverlay} />
      </div>

      <FrameComponent2 property1="Default" />
      <section className={styles.desktop1Child} />
      <div className={styles.desktop1Item} />

      <div className={styles.heroGlow} />

      <div className={styles.particles}>
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
      </div>

      <div className={styles.heroLeft}>
        <section className={styles.frameSection}>
          <div className={styles.uniformsThatBuildParent}>
            <h2 className={styles.uniformsThatBuild}>
              UNIFORMS THAT BUILD
              <br />
            </h2>
            <h2 className={styles.confidenceExcellence}>
              {`CONFIDENCE`}
              <br />
              {`            &`}
              <br />
              {`EXCELLENCE`}
            </h2>
          </div>
        </section>

        <div className={styles.shagunFashionIs}>
          <div className={styles.typewriterContainer}>
            <div className={styles.invisibleText}>{paragraph}</div>
            <div className={styles.visibleText}>
              {displayedText}
              <span className={`${styles.cursor} ${isTyping ? styles.typing : ''}`}>|</span>
            </div>
          </div>
        </div>

        <div className={styles.desktop1Inner2}>
          <div className={styles.frameGroup}>
            <button className={styles.placeYourOrderWrapper}>
              <Link to="/items" style={{ textDecoration: 'none', color: 'inherit', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className={styles.placeYourOrder}>Place Your Order</div>
              </Link>
            </button>
            <button className={styles.knowMoreWrapper}>
              <div className={styles.knowMore}>
                <a href="/contact/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span className={styles.knowMore2}>Know More</span>
                </a>
              </div>
            </button>
          </div>
        </div>

        <TrustedSchoolsDivider />

        <LuxuryFeatures />

        {/* Marquee Background Banner: Fully Visible Between Featured Cards and Footer Card */}
        <div
          className={styles.shagunFashionWrapper}
          onMouseMove={handleBgMouseMove}
          onMouseLeave={handleBgMouseLeave}
          style={{
            '--mouse-x': `${bgMouseX}%`,
          } as React.CSSProperties}
          data-hover={bgHoverActive ? "true" : "false"}
        >
          <div className={styles.marqueeContent}>
            <h2 className={styles.shagunFashion}>SHAGUN FASHION</h2>
            <h2 className={styles.shagunFashion}>SHAGUN FASHION</h2>
            <h2 className={styles.shagunFashion}>SHAGUN FASHION</h2>
            <h2 className={styles.shagunFashion}>SHAGUN FASHION</h2>
          </div>
        </div>
      </div>

      <Component1
        property1="Frame 1208"
        frame1172Frame1206="/Frame-1206@2x.png"
        frame1181Frame1206="/Frame-1206@2x.png"
        frame1181DivHeight="unset"
      />

      {/* Luxury Branded Footer */}
      <Footer />
    </div>
  );
};

export default Desktop1;
