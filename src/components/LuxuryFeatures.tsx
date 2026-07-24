import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Ruler, 
  Scissors, 
  Layers, 
  HeartHandshake, 
  Clock 
} from "lucide-react";
import "./LuxuryFeatures.css";

interface CardData {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  startIndex: number;
}

const CARDS: CardData[] = [
  {
    id: 1,
    title: "Premium Uniforms",
    description: "Bespoke tailoring crafted to inspire prestige and pride.",
    icon: Award,
    startIndex: 0
  },
  {
    id: 2,
    title: "Superior Quality",
    description: "Uncompromised durability built for daily excellence.",
    icon: ShieldCheck,
    startIndex: 1
  },
  {
    id: 3,
    title: "Custom Designs",
    description: "Tailored to align perfectly with your school's identity.",
    icon: Sparkles,
    startIndex: 2
  },
  {
    id: 4,
    title: "Perfect Fit",
    description: "Designed using precise ergonomic cuts for absolute comfort.",
    icon: Ruler,
    startIndex: 3
  },
  {
    id: 5,
    title: "Expert Craftsmanship",
    description: "Every seam stitched with artistic precision and care.",
    icon: Scissors,
    startIndex: 4
  },
  {
    id: 6,
    title: "Premium Fabrics",
    description: "Breathable, lightweight, and luxury-feel textiles.",
    icon: Layers,
    startIndex: 5
  },
  {
    id: 7,
    title: "Dedicated Support",
    description: "Bespoke client servicing to assist you at every step.",
    icon: HeartHandshake,
    startIndex: 6
  },
  {
    id: 8,
    title: "On-Time Delivery",
    description: "Reliable production schedules with punctual fulfillment.",
    icon: Clock,
    startIndex: 7
  }
];

const ALL_IMAGES = [
  "/images/luxury_blazer.jpg",
  "/images/premium_fabric.jpg",
  "/images/pattern_sketch.jpg",
  "/images/tailoring_tools.jpg",
  "/images/sewing_machine.jpg",
  "/images/luxury_embroidery.jpg",
  "/images/premium_label.jpg",
  "/images/luxury_packaging.jpg",
  "/images/gold_buttons.jpg",
  "/images/tailor_chalk.jpg",
  "/images/measuring_collar.jpg",
  "/images/thread_spools.jpg",
  "/images/mannequin_silhouette.jpg"
];

// Mathematically distinct offsets to ensure adjacent cards never show the same image at any step
const ADJACENT_IMAGE_OFFSETS = [0, 2, 4, 6, 1, 3, 5, 7];

// Preloaded smooth fading image switcher for the "video playback" feel
const ImageSwitcher: React.FC<{ images: string[]; activeIndex: number }> = ({ images, activeIndex }) => {
  return (
    <div className="image-switcher-container">
      {images.map((img, i) => (
        <img
          key={img}
          src={img}
          alt="Luxury showcase reel"
          className={`card-image ${i === activeIndex ? "active" : ""}`}
          loading="lazy"
        />
      ))}
    </div>
  );
};

export const LuxuryFeatures: React.FC = () => {
  // Triple the cards list to create a seamless infinite marquee scroll track
  const loopCards = [...CARDS, ...CARDS, ...CARDS];

  // Single global synchronized step for all card slideshows (massive performance optimization)
  const [globalStep, setGlobalStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalStep((prev) => (prev + 1) % ALL_IMAGES.length);
    }, 1500); // Switch images every 1.5s globally
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="luxury-section-wrapper">
      {/* Background Vignette and Glow overlays */}
      <div className="luxury-vignette" />
      <div className="luxury-glow" />
      
      {/* Golden particles */}
      <div className="particles-overlay">
        <div className="gold-particle p1" />
        <div className="gold-particle p2" />
        <div className="gold-particle p3" />
        <div className="gold-particle p4" />
        <div className="gold-particle p5" />
        <div className="gold-particle p6" />
        <div className="gold-particle p7" />
        <div className="gold-particle p8" />
      </div>

      <div className="carousel-viewport">
        <div className="carousel-track-loop">
          {loopCards.map((card, index) => {
            const isEven = index % 2 === 0;
            const cardOffsetIndex = index % CARDS.length;
            const imageOffset = ADJACENT_IMAGE_OFFSETS[cardOffsetIndex];
            const activeIndex = (globalStep + imageOffset) % ALL_IMAGES.length;
            
            return (
              <div
                key={`${card.id}-${index}`}
                className={`card-container ${isEven ? "even" : "odd"}`}
              >
                <motion.div 
                  className="luxury-card"
                  whileHover={{ 
                    y: -10,
                    scale: 1.04,
                    zIndex: 20,
                    transition: { type: "spring", stiffness: 350, damping: 22 }
                  }}
                >
                  {/* Subtle shine sweep overlay */}
                  <div className="card-shine" />

                  <div className="card-image-wrapper">
                    <ImageSwitcher images={ALL_IMAGES} activeIndex={activeIndex} />
                    <div className="card-image-overlay" />
                  </div>

                  <div className="card-body">
                    <div className="card-title-group">
                      <h3 className="card-title">{card.title}</h3>
                    </div>
                    <div className="card-footer">
                      <p className="card-desc">{card.description}</p>
                      <div className="card-icon-wrapper">
                        <card.icon size={22} strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
