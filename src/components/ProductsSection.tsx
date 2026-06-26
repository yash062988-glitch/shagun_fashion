"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { workedProducts, regularProducts } from "@/data/products";

interface InteractiveMarqueeProps {
  items: Array<{ id: number; title: string; imageSrc: string }>;
  direction: "left" | "right";
  isSearchActive: boolean;
  marqueeId: string;
}

function InteractiveMarquee({ items, direction, isSearchActive, marqueeId }: InteractiveMarqueeProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isPaused, setIsPaused] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const singleSetRef = useRef<HTMLDivElement>(null);
  
  const xRef = useRef(0);
  const repeatingLength = useRef(0);
  const isPressed = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragXOffset = useRef(0);
  const isHovered = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
      setWindowWidth(window.innerWidth);
    }, 0);
  }, []);

  // Track viewport size to dynamically calculate card width
  useEffect(() => {
    if (!viewportRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setViewportWidth(entry.contentRect.width);
      }
    });
    observer.observe(viewportRef.current);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Measure the width of one full set of items
  const measureWidth = useCallback(() => {
    if (singleSetRef.current) {
      const width = singleSetRef.current.getBoundingClientRect().width;
      const gap = 30; // Matches gap-[30px]
      repeatingLength.current = width + gap;
      
      // If not searching, and x is 0, initialize x to the starting loop position
      if (!isSearchActive && xRef.current === 0 && width > 0) {
        xRef.current = -(width + gap);
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${xRef.current}px, 0px, 0px)`;
        }
      }
    }
  }, [isSearchActive]);

  useEffect(() => {
    measureWidth();
    
    // Multiple measure triggers to handle delayed layout adjustments and dynamic assets
    const t1 = setTimeout(measureWidth, 500);
    const t2 = setTimeout(measureWidth, 1200);
    
    const images = trackRef.current?.querySelectorAll("img");
    if (images) {
      images.forEach((img) => {
        if (img.complete) {
          measureWidth();
        } else {
          img.addEventListener("load", measureWidth);
        }
      });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (images) {
        images.forEach((img) => {
          img.removeEventListener("load", measureWidth);
        });
      }
    };
  }, [viewportWidth, windowWidth, items, isSearchActive, measureWidth]);

  // Handle transitions between search state and active loop
  useEffect(() => {
    if (isSearchActive) {
      xRef.current = 0;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(0px, 0px, 0px)`;
      }
    } else {
      const L = repeatingLength.current;
      if (L > 0) {
        xRef.current = -L;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${xRef.current}px, 0px, 0px)`;
        }
      }
    }
  }, [isSearchActive]);

  // Wrap function to keep x within [-2 * L, -L]
  const wrap = (val: number, L: number) => {
    if (L <= 0) return val;
    const min = -2 * L;
    const max = -L;
    const range = L;
    let wrapped = val;
    while (wrapped < min) {
      wrapped += range;
    }
    while (wrapped >= max) {
      wrapped -= range;
    }
    return wrapped;
  };

  // Animation loop running at 60 FPS (GPU accelerated)
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const update = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isPressed.current && !isHovered.current && !isSearchActive && !isPaused) {
        const L = repeatingLength.current;
        if (L > 0) {
          // Slow premium speed: one full cycle (L) in 30 seconds
          const speed = L / 30;

          if (direction === "left") {
            // moves right-to-left: decrease x
            xRef.current -= speed * delta;
          } else {
            // moves left-to-right: increase x
            xRef.current += speed * delta;
          }

          xRef.current = wrap(xRef.current, L);

          if (trackRef.current) {
            trackRef.current.style.transform = `translate3d(${xRef.current}px, 0px, 0px)`;
          }
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [direction, isSearchActive, isPaused]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isPressed.current = true;
    isDragging.current = false;
    startX.current = e.clientX;
    dragXOffset.current = xRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPressed.current) return;
    const dx = e.clientX - startX.current;
    
    if (Math.abs(dx) > 5) {
      isDragging.current = true;
    }
    
    let newX = dragXOffset.current + dx;
    
    if (isSearchActive) {
      // Constrain manual dragging to match bounds when search is active (no infinite wrap)
      const viewportW = viewportWidth;
      const trackW = trackRef.current ? trackRef.current.getBoundingClientRect().width : 0;
      const minX = Math.min(0, viewportW - trackW);
      const maxX = 0;
      newX = Math.max(minX, Math.min(maxX, newX));
    } else {
      const L = repeatingLength.current;
      if (L > 0) {
        newX = wrap(newX, L);
      }
    }
    
    xRef.current = newX;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${newX}px, 0px, 0px)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isPressed.current) {
      isPressed.current = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    // Intercept clicks on product cards if user was dragging
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Card width calculation matching original breakpoints exactly
  const cardWidth = isMounted && viewportWidth > 0
    ? (windowWidth >= 1024
        ? (viewportWidth - 60) / 3
        : windowWidth >= 640
        ? (viewportWidth - 30) / 2
        : viewportWidth)
    : 350;

  // Listen for the custom select-product event to pause, center, and highlight a product card
  useEffect(() => {
    const handleSelectProduct = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { title, category } = customEvent.detail;
      
      const isMyCategory = 
        (marqueeId === "worked-marquee" && category === "Worked Product") ||
        (marqueeId === "regular-marquee" && category === "In-Stock");
        
      if (!isMyCategory) return;

      const index = items.findIndex(item => item.title === title);
      if (index === -1) return;

      // 1. Pause marquee
      setIsPaused(true);

      // 2. Bring product card into view if it's currently outside the visible viewport
      const L = repeatingLength.current;
      const cardStep = cardWidth + 30;
      const cardOffset = index * cardStep;

      let isAlreadyVisible = false;
      for (let set = 0; set < 4; set++) {
        const cardLeft = xRef.current + cardOffset + set * L;
        const cardRight = cardLeft + cardWidth;
        if (cardLeft >= -5 && cardRight <= viewportWidth + 5) {
          isAlreadyVisible = true;
          break;
        }
      }

      if (!isAlreadyVisible) {
        let bestX = xRef.current;
        let minDistance = Infinity;

        for (let set = 0; set < 4; set++) {
          const cardLeft = xRef.current + cardOffset + set * L;
          const cardCenter = cardLeft + cardWidth / 2;
          const distance = Math.abs(cardCenter - viewportWidth / 2);
          
          if (distance < minDistance) {
            minDistance = distance;
            bestX = (viewportWidth - cardWidth) / 2 - cardOffset - set * L;
          }
        }

        if (trackRef.current) {
          trackRef.current.style.transition = "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
          trackRef.current.style.transform = `translate3d(${bestX}px, 0px, 0px)`;
          xRef.current = bestX;
        }
      }

      // 3. Highlight card and resume after 2.5 seconds
      if (trackRef.current) {
        const titleEscaped = title.replace(/"/g, '\\"');
        const elements = trackRef.current.querySelectorAll(`[data-product-title="${titleEscaped}"]`);
        
        elements.forEach((el) => {
          el.classList.add("highlight-glow");
        });

        setTimeout(() => {
          elements.forEach((el) => {
            el.classList.remove("highlight-glow");
          });
          if (trackRef.current) {
            trackRef.current.style.transition = "none";
          }
          setIsPaused(false);
        }, 2500);
      }
    };

    window.addEventListener("select-product", handleSelectProduct);
    return () => {
      window.removeEventListener("select-product", handleSelectProduct);
    };
  }, [marqueeId, items, cardWidth, viewportWidth]);

  const showDuplicated = !isSearchActive && items.length > 0;

  return (
    <div
      ref={viewportRef}
      className="w-full overflow-hidden py-6 -my-6 select-none cursor-grab active:cursor-grabbing touch-pan-y"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
      onClickCapture={handleClickCapture}
    >
      <div
        ref={trackRef}
        className="flex gap-[30px] w-max will-change-transform py-2"
      >
        {/* Set 0 (always rendered, used for layout and measurement) */}
        <div ref={singleSetRef} className="flex gap-[30px] shrink-0">
          {items.map((product) => (
            <div key={`set0-${product.id}`} style={{ width: cardWidth }} className="shrink-0">
              <ProductCard imageSrc={product.imageSrc} title={product.title} />
            </div>
          ))}
        </div>

        {/* Set 1, 2, and 3 are only rendered when NOT searching to form the infinite marquee track */}
        {showDuplicated && (
          <>
            <div className="flex gap-[30px] shrink-0">
              {items.map((product, idx) => (
                <div key={`set1-${product.id}-${idx}`} style={{ width: cardWidth }} className="shrink-0">
                  <ProductCard imageSrc={product.imageSrc} title={product.title} />
                </div>
              ))}
            </div>

            <div className="flex gap-[30px] shrink-0">
              {items.map((product, idx) => (
                <div key={`set2-${product.id}-${idx}`} style={{ width: cardWidth }} className="shrink-0">
                  <ProductCard imageSrc={product.imageSrc} title={product.title} />
                </div>
              ))}
            </div>

            <div className="flex gap-[30px] shrink-0">
              {items.map((product, idx) => (
                <div key={`set3-${product.id}-${idx}`} style={{ width: cardWidth }} className="shrink-0">
                  <ProductCard imageSrc={product.imageSrc} title={product.title} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProductsSection() {
  // Keep marquee always active
  const isSearchActive = false;

  return (
    <section id="products" className="py-24 bg-primary-bg px-6 md:px-16 max-w-7xl mx-auto w-full">
      
      {/* 1. Products We Have Worked With */}
      <div className="mb-24">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-white text-sm tracking-[0.25em] uppercase font-medium mb-3">
            Our Products
          </p>
          <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-wider uppercase">
            PRODUCTS WE HAVE WORKED WITH
          </h2>
        </div>


        {/* Carousel Container */}
        <div className="relative flex items-center min-h-[466px] justify-center">
          <InteractiveMarquee
            items={workedProducts}
            direction="right"
            isSearchActive={isSearchActive}
            marqueeId="worked-marquee"
          />
        </div>
      </div>

      {/* 2. Regular Products / In-Stock */}
      <div>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-wider uppercase">
            REGULAR PRODUCTS / IN - STOCK
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center min-h-[466px] justify-center">
          <InteractiveMarquee
            items={regularProducts}
            direction="left"
            isSearchActive={isSearchActive}
            marqueeId="regular-marquee"
          />
        </div>
      </div>

    </section>
  );
}
