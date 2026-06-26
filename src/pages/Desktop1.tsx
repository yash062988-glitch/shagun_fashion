import { FunctionComponent, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FrameComponent2 from "../components/FrameComponent2";
import Component1 from "../components/Component1";
import HamburgerMenu from "../components/HamburgerMenu";
import styles from "./Desktop1.module.css";

export type Desktop1Type = {};

const Desktop1: FunctionComponent<Desktop1Type> = ({}) => {
  const paragraph = "Shagun Fashion is a trusted school uniform manufacturer specializing in premium-quality uniforms, sportswear, tracksuits, and custom school apparel. We combine comfort, durability, and professional craftsmanship to deliver uniforms that reflect identity, confidence, and excellence for schools across India.";
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showSystemPopup, setShowSystemPopup] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const typeChar = () => {
      if (currentIndex < paragraph.length) {
        setDisplayedText(paragraph.slice(0, currentIndex + 1));
        
        let delay = 30;
        const char = paragraph[currentIndex];
        if (char === ',' || char === '.') delay = 300;
        
        currentIndex++;
        timeout = setTimeout(typeChar, delay);
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => {
          setDisplayedText("");
          currentIndex = 0;
          setIsTyping(true);
          typeChar();
        }, 2000);
      }
    };

    timeout = setTimeout(typeChar, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const popupTimer = setTimeout(() => setShowSystemPopup(true), 2500);
    return () => clearTimeout(popupTimer);
  }, []);

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

      <div className={styles.shagunFashionWrapper}>
        <div className={styles.marqueeContent}>
          <h2 className={styles.shagunFashion}>SHAGUN FASHION</h2>
          <h2 className={styles.shagunFashion}>SHAGUN FASHION</h2>
          <h2 className={styles.shagunFashion}>SHAGUN FASHION</h2>
          <h2 className={styles.shagunFashion}>SHAGUN FASHION</h2>
        </div>
      </div>
      <nav className={styles.homeParent}>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className={styles.home}>HOME</h3>
        </a>
        <a href="/about/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className={styles.about}>ABOUT</h3>
        </a>
        <a href="/items" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className={styles.items}>ITEMS</h3>
        </a>
        <a href="/contact/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className={styles.contact}>CONTACT US</h3>
        </a>
      </nav>
      <HamburgerMenu />
      <div className={styles.brandContainer}>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img className={styles.logoImage} loading="lazy" alt="Logo" src="/image-269@2x.png" />
        </a> 
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className={styles.brandName}>SHAGUN FASHION</h1>
        </a>
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
              <a href="/items/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.placeYourOrder}>Place Your Order</div>
              </a>
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

        <div className={styles.trustedSectionWrapper}>
          <div className={styles.trustedSection}>
            <img className={styles.shieldIcon} alt="Shield" src="/Vector.svg" />
            <h3 className={styles.trustedByLeading}>
              Trusted By Leading Schools
            </h3>
            <div className={styles.yellowLine} />
          </div>
        </div>

        <section className={styles.featuresContainer}>
          <div className={styles.featureItem}>
            <img className={styles.featureIcon} loading="lazy" alt="" src="/Vector1.svg" />
            <div className={styles.featureText}>On-Time<br />Delivery</div>
          </div>
          <div className={styles.featureItem}>
            <img className={styles.featureIcon} loading="lazy" alt="" src="/merged-asset-1@2x.png" />
            <div className={styles.featureText}>Premium<br />Quality</div>
          </div>
          <div className={styles.featureItem}>
            <img className={styles.featureIcon} loading="lazy" alt="" src="/Vector2.svg" />
            <div className={styles.featureText}>Perfect Fit<br />Guaranteed</div>
          </div>
          <div className={styles.featureItem}>
            <img className={styles.featureIcon} loading="lazy" alt="" src="/Vector3.svg" />
            <div className={styles.featureText}>Dedicated<br />Support</div>
          </div>
        </section>
      </div>

      <Component1
        property1="Frame 1208"
        frame1172Frame1206="/Frame-1206@2x.png"
        frame1181Frame1206="/Frame-1206@2x.png"
        frame1181DivHeight="unset"
      />

      {/* Simple 3-line Footer */}
      <footer className="absolute bottom-4 left-0 w-full flex flex-col items-center justify-center text-center z-20 pointer-events-auto">
        <span className="font-bold tracking-widest text-white mb-1" style={{ fontFamily: 'var(--font-iceberg), sans-serif', fontSize: '16px' }}>
          SHAGUN FASHION - MADE WITH LOVE ❤️
        </span>
        <p className="text-white/60 text-[11px] max-w-[350px] mb-1">
          Crafting premium quality garments, custom lowers, tracksuits, and school uniforms with precision.
        </p>
        <p className="text-white/50 text-[10px]">
          &copy; {new Date().getFullYear()} Shagun Fashion. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Desktop1;
