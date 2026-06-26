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
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    setVisibleLines([]);

    lines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, index * 500);

      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [trigger]);

  return (
    <>
      <style>{`
        @keyframes revealLine {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

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
          height: "165px",
        }}
      >
        {visibleLines.map((line, index) => (
          <div
            key={index}
            style={{
              animation: "revealLine .6s ease forwards",
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </>
  );
}
