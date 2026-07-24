import React, { useEffect, useRef, useState } from 'react';
import './TrustedSchoolsDivider.css';

export const TrustedSchoolsDivider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className={`trusted-divider-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Trusted By Leading Schools"
    >
      {/* Background Lighting & Radial Glow */}
      <div className="trusted-radial-glow" aria-hidden="true" />
      <div className="trusted-vignette" aria-hidden="true" />

      <div className="trusted-container">
        {/* Top Header Row: Left Line - Crest - Right Line */}
        <div className="trusted-crest-row">
          {/* Left Divider Line */}
          <div className="trusted-divider-line left-line">
            <div className="line-core" />
            <div className="line-shimmer" />
            <div className="line-dot dot-1" />
            <div className="line-dot dot-2" />
            
            {/* Diamond Ornament Near Crest */}
            <div className="diamond-wrapper">
              <svg className="diamond-svg" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                <rect x="3.5" y="3.5" width="13" height="13" transform="rotate(45 10 10)" fill="none" stroke="url(#goldStrokeGrad)" strokeWidth="1.2" />
                <rect x="6.5" y="6.5" width="7" height="7" transform="rotate(45 10 10)" fill="url(#goldSolidGrad)" opacity="0.8" />
                <circle cx="10" cy="10" r="1.5" fill="#FFF4C2" />
              </svg>
            </div>
          </div>

          {/* Central Crest Component with Watchmaker Rings */}
          <div className="trusted-crest-wrapper">
            {/* Concentric Watchmaker Guide Rings (10-15% opacity) */}
            <svg className="watchmaker-rings-svg" viewBox="0 0 320 320" aria-hidden="true">
              <circle cx="160" cy="160" r="150" fill="none" stroke="#C8A14A" strokeWidth="0.75" strokeOpacity="0.12" strokeDasharray="3 6" />
              <circle cx="160" cy="160" r="126" fill="none" stroke="#E9C46A" strokeWidth="1" strokeOpacity="0.15" />
              <circle cx="160" cy="160" r="102" fill="none" stroke="#C8A14A" strokeWidth="0.75" strokeOpacity="0.12" strokeDasharray="6 6" />
              <circle cx="160" cy="160" r="78" fill="none" stroke="#E9C46A" strokeWidth="0.5" strokeOpacity="0.1" />
              
              {/* Radial Ticks / Compass Marks */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                <line
                  key={angle}
                  x1="160"
                  y1="10"
                  x2="160"
                  y2="18"
                  stroke="#E9C46A"
                  strokeWidth="1"
                  strokeOpacity="0.15"
                  transform={`rotate(${angle} 160 160)`}
                />
              ))}
            </svg>

            {/* Premium Gold Vector Crest */}
            <svg className="luxury-crest-svg" viewBox="0 0 120 120" width="108" height="108" aria-hidden="true">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF8DC" />
                  <stop offset="25%" stopColor="#F5D77F" />
                  <stop offset="60%" stopColor="#C8A14A" />
                  <stop offset="100%" stopColor="#8A6820" />
                </linearGradient>

                <linearGradient id="goldHighlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#E9C46A" />
                  <stop offset="100%" stopColor="#A37E30" />
                </linearGradient>

                <linearGradient id="goldStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDF0A6" />
                  <stop offset="50%" stopColor="#C8A14A" />
                  <stop offset="100%" stopColor="#7A5A18" />
                </linearGradient>

                <linearGradient id="goldSolidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E9C46A" />
                  <stop offset="100%" stopColor="#C8A14A" />
                </linearGradient>

                <radialGradient id="shieldBgGrad" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#121B2A" />
                  <stop offset="70%" stopColor="#080D15" />
                  <stop offset="100%" stopColor="#04060A" />
                </radialGradient>

                <filter id="crestGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 5-Point Crown Above Shield */}
              <g className="crest-crown" filter="url(#crestGlow)">
                {/* Crown Base Band */}
                <path d="M 44,25 L 76,25 L 74,28 L 46,28 Z" fill="url(#goldGradient)" />
                <line x1="45" y1="26.5" x2="75" y2="26.5" stroke="#FFF8DC" strokeWidth="0.5" opacity="0.9" />
                
                {/* Crown Peaks */}
                <path d="M 44,25 L 42,14 L 51,20 L 60,11 L 69,20 L 78,14 L 76,25 Z" fill="url(#goldGradient)" stroke="url(#goldHighlightGrad)" strokeWidth="0.6" />
                
                {/* 5 Crown Tip Jewels */}
                <circle cx="42" cy="13.5" r="1.6" fill="#FFF8DC" stroke="#8A6820" strokeWidth="0.4" />
                <circle cx="51" cy="19.5" r="1.3" fill="#FFF8DC" stroke="#8A6820" strokeWidth="0.4" />
                <circle cx="60" cy="10.5" r="1.8" fill="#FFFFFF" stroke="#C8A14A" strokeWidth="0.5" />
                <circle cx="69" cy="19.5" r="1.3" fill="#FFF8DC" stroke="#8A6820" strokeWidth="0.4" />
                <circle cx="78" cy="13.5" r="1.6" fill="#FFF8DC" stroke="#8A6820" strokeWidth="0.4" />
              </g>

              {/* Laurel Wreath Framing Shield */}
              <g className="crest-wreath">
                {/* Left Leaves */}
                <path d="M 32,50 C 26,45 22,38 27,33 C 30,37 32,43 32,50 Z" fill="url(#goldGradient)" />
                <path d="M 28,62 C 20,57 18,48 23,43 C 27,47 28,54 28,62 Z" fill="url(#goldGradient)" />
                <path d="M 27,75 C 18,70 16,60 22,55 C 26,60 27,67 27,75 Z" fill="url(#goldGradient)" />
                <path d="M 30,88 C 22,85 19,75 26,69 C 29,74 30,81 30,88 Z" fill="url(#goldGradient)" />
                <path d="M 37,99 C 30,98 25,89 33,82 C 35,87 37,93 37,99 Z" fill="url(#goldGradient)" />
                
                {/* Right Leaves */}
                <path d="M 88,50 C 94,45 98,38 93,33 C 90,37 88,43 88,50 Z" fill="url(#goldGradient)" />
                <path d="M 92,62 C 100,57 102,48 97,43 C 93,47 92,54 92,62 Z" fill="url(#goldGradient)" />
                <path d="M 93,75 C 102,70 104,60 98,55 C 94,60 93,67 93,75 Z" fill="url(#goldGradient)" />
                <path d="M 90,88 C 98,85 101,75 94,69 C 91,74 90,81 90,88 Z" fill="url(#goldGradient)" />
                <path d="M 83,99 C 90,98 95,89 87,82 C 85,87 83,93 83,99 Z" fill="url(#goldGradient)" />

                {/* Bottom Wreath Ribbon Tie */}
                <path d="M 53,103 C 58,105 62,105 67,103 C 65,100 55,100 53,103 Z" fill="url(#goldHighlightGrad)" />
              </g>

              {/* Outer Metallic Shield Frame */}
              <path
                d="M 60,32 C 78,32 90,36 90,52 C 90,78 72,94 60,102 C 48,94 30,78 30,52 C 30,36 42,32 60,32 Z"
                fill="url(#shieldBgGrad)"
                stroke="url(#goldStrokeGrad)"
                strokeWidth="2.2"
                filter="url(#crestGlow)"
              />

              {/* Inner Shield Bevel Stroke */}
              <path
                d="M 60,35.5 C 75.5,35.5 86,39 86,53 C 86,75.5 70,90 60,97.5 C 50,90 34,75.5 34,53 C 34,39 44.5,35.5 60,35.5 Z"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="0.8"
                opacity="0.85"
              />

              {/* Inner Fine Accent Ring */}
              <path
                d="M 60,38 C 73,38 82,41 82,53.5 C 82,73 68,86 60,93 C 52,86 38,73 38,53.5 C 38,41 47,38 60,38 Z"
                fill="none"
                stroke="#FFF4C2"
                strokeWidth="0.4"
                opacity="0.4"
              />

              {/* Serif Letter 'S' Insignia */}
              <g className="shield-letter-s">
                <text
                  x="60"
                  y="73"
                  textAnchor="middle"
                  fontFamily="'Cinzel', 'Playfair Display', serif"
                  fontWeight="700"
                  fontSize="34"
                  fill="url(#goldGradient)"
                  stroke="url(#goldHighlightGrad)"
                  strokeWidth="0.4"
                  style={{ letterSpacing: '0px' }}
                >
                  S
                </text>
              </g>
            </svg>
          </div>

          {/* Right Divider Line */}
          <div className="trusted-divider-line right-line">
            {/* Diamond Ornament Near Crest */}
            <div className="diamond-wrapper">
              <svg className="diamond-svg" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                <rect x="3.5" y="3.5" width="13" height="13" transform="rotate(45 10 10)" fill="none" stroke="url(#goldStrokeGrad)" strokeWidth="1.2" />
                <rect x="6.5" y="6.5" width="7" height="7" transform="rotate(45 10 10)" fill="url(#goldSolidGrad)" opacity="0.8" />
                <circle cx="10" cy="10" r="1.5" fill="#FFF4C2" />
              </svg>
            </div>

            <div className="line-core" />
            <div className="line-shimmer" />
            <div className="line-dot dot-1" />
            <div className="line-dot dot-2" />
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="trusted-luxury-heading">
          TRUSTED BY LEADING SCHOOLS
        </h2>

        {/* Delicate Filigree Ornament Below Heading */}
        <div className="trusted-ornament-wrapper">
          <svg className="trusted-ornament-svg" viewBox="0 0 240 20" width="180" height="16" aria-hidden="true">
            {/* Left Tapered Line */}
            <line x1="0" y1="10" x2="85" y2="10" stroke="url(#goldStrokeGrad)" strokeWidth="1" opacity="0.75" />
            <circle cx="85" cy="10" r="1.5" fill="#E9C46A" />

            {/* Central Flourish / Scrollwork Emblem */}
            <path d="M 95,10 C 102,4 108,4 114,10 C 108,16 102,16 95,10 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="1" />
            <path d="M 145,10 C 138,4 132,4 126,10 C 132,16 138,16 145,10 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="1" />
            <rect x="117" y="7" width="6" height="6" transform="rotate(45 120 10)" fill="url(#goldGradient)" />
            <circle cx="120" cy="10" r="1.2" fill="#FFFFFF" />

            {/* Right Tapered Line */}
            <circle cx="155" cy="10" r="1.5" fill="#E9C46A" />
            <line x1="155" y1="10" x2="240" y2="10" stroke="url(#goldStrokeGrad)" strokeWidth="1" opacity="0.75" />
          </svg>
        </div>

        {/* Subtitle */}
        <p className="trusted-luxury-subtitle">
          Trusted by institutions across India for quality, durability and craftsmanship.
        </p>
      </div>
    </section>
  );
};

export default TrustedSchoolsDivider;
