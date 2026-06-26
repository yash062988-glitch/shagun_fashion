import React from "react";
import { motion } from "framer-motion";
import styles from "../pages/Desktop1.module.css";

export const InstagramCard: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 20, stiffness: 100 } },
  };
  const cardHover = {
    y: -8,
    scale: 1.03,
    borderColor: "rgba(255, 255, 255, 0.4)",
    boxShadow: "0px 12px 30px rgba(0, 43, 185, 0.3)",
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  };
  const btnTap = { scale: 0.95 };
  return (
    <motion.div variants={cardVariants} whileHover={cardHover} className={styles.mergedAsset2Parent}>
      <div className={styles.mergedAsset2}>
        <div className={styles.premiumIconCircle}>
          {/* Instagram SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37a4 4 0 1 1-7.95 1.18" />
            <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
          </svg>
        </div>
      </div>
      <div className={styles.whatsapp}>Instagram</div>
      <div className={styles.contactWithUsOnWhatsapp}>
        <div className={styles.contactWithUs}>Follow us on Instagram</div>
      </div>
      <motion.button
        whileTap={btnTap}
        onClick={() => window.open("https://www.instagram.com/shagunfashionuniforms?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", "_blank")}
        className={styles.openLocationParent}
      >
        <div className={styles.openLocation}>Open Instagram</div>
        <img
          className={styles.vectorIcon}
          alt=""
          src="/contact/Vector.svg"
        />
      </motion.button>
    </motion.div>
  );
};

export default InstagramCard;
