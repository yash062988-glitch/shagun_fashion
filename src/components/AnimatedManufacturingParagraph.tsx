"use client";

import { useEffect, useState } from "react";

const lines = [
  "We manufacture premium-quality uniforms",
  "and custom apparel using carefully",
  "selected fabrics, precision tailoring,",
  "and modern production techniques.",
  "Every garment reflects professionalism and excellence.",
];

interface AnimatedManufacturingParagraphProps {
  trigger: number;
}

export default function AnimatedManufacturingParagraph({ trigger }: AnimatedManufacturingParagraphProps) {
  const [visibleCount, setVisibleCount] = useState<number>(0);

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    setVisibleCount(0);

    lines.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleCount(index + 1);
      }, index * 500);

      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [trigger]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        color: "inherit",
        fontFamily: "inherit",
        fontSize: "inherit",
        lineHeight: "inherit",
        textAlign: "inherit",
        width: "100%",
      }}
    >
      {lines.map((line, index) => {
        const isVisible = index < visibleCount;
        return (
          <div
            key={index}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              willChange: "opacity, transform",
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
}
