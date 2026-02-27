"use client";

import React, { useState, useRef, useEffect } from "react";

interface BinaryHoverTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Speed of binary digit change (ms)
}

export default function BinaryHoverText({
  children,
  className = "",
  speed = 50,
}: BinaryHoverTextProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [binaryText, setBinaryText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Generate random binary string matching the text length
  const generateBinary = (length: number) => {
    return Array.from({ length }, () => (Math.random() > 0.5 ? "1" : "0")).join(
      "",
    );
  };

  useEffect(() => {
    if (isHovering && textRef.current) {
      const text = textRef.current.innerText;
      const length = text.length;

      // Initial binary
      setBinaryText(generateBinary(length));

      // Update binary digits continuously
      intervalRef.current = setInterval(() => {
        setBinaryText(generateBinary(length));
      }, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setBinaryText("");
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, speed]);

  return (
    <span
      className={`binary-hover-wrapper ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ position: "relative", display: "inline-block" }}
    >
      <span
        ref={textRef}
        className="binary-hover-original"
        style={{
          opacity: isHovering ? 0 : 1,
          transition: "opacity 0.15s ease",
        }}
      >
        {children}
      </span>
      {isHovering && (
        <span
          className="binary-hover-binary"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            fontFamily: "monospace",
            letterSpacing: "0.05em",
            opacity: 1,
            animation: "binaryFlicker 0.1s infinite",
            color: "inherit",
            whiteSpace: "nowrap",
          }}
          aria-hidden="true"
        >
          {binaryText}
        </span>
      )}
    </span>
  );
}
