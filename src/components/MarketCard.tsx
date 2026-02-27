"use client";

import React from "react";
import Link from "next/link";
import { Market, useMarkets } from "@/lib/store";
import { calculateProbability } from "@/lib/amm";
import { getCategoryColor } from "@/lib/constants";
import BinaryHoverText from "./BinaryHoverText";

interface MarketCardProps {
  market: Market;
}

const MarketCard = ({ market }: MarketCardProps) => {
  const { isAuthenticated, theme } = useMarkets();
  const isLight = theme === "light";
  const prob = calculateProbability(
    market.yesShares,
    market.noShares,
    market.liquidity,
  );
  const percentage = Math.round(prob * 100);

  // Generating a mock sparkline path
  const sparklineData = [
    40,
    45,
    42,
    48,
    46,
    52,
    50,
    55,
    53,
    60,
    58,
    percentage,
  ];
  const points = sparklineData
    .map((val, i) => `${(i / (sparklineData.length - 1)) * 100},${100 - val}`)
    .join(" ");

  return (
    <Link
      href={`/market/${market.id}`}
      className={`group relative block rounded-2xl border backdrop-blur-md p-4 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 overflow-hidden ${
        isLight
          ? "border-black/8 bg-white hover:bg-white hover:border-primary/20"
          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
      }`}
    >
      {/* Animated Grid Lines with Particles */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className={`absolute top-[50%] left-0 w-full h-[1px] ${isLight ? "bg-gradient-to-r from-transparent via-black to-transparent" : "bg-gradient-to-r from-transparent via-primary to-transparent"}`}
        >
          <div
            className={`absolute top-0 left-0 w-1.5 h-1.5 rounded-full animate-[slideHorizontal_3s_ease-in-out_infinite] ${isLight ? "bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)]" : "bg-primary shadow-[0_0_8px_rgba(30,144,255,0.8)]"}`}
          />
        </div>
        <div
          className={`absolute top-0 left-[50%] w-[1px] h-full ${isLight ? "bg-gradient-to-b from-transparent via-black to-transparent" : "bg-gradient-to-b from-transparent via-primary to-transparent"}`}
        >
          <div
            className={`absolute top-0 left-0 w-1.5 h-1.5 rounded-full animate-[slideVertical_3.5s_ease-in-out_infinite] ${isLight ? "bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)]" : "bg-primary shadow-[0_0_8px_rgba(30,144,255,0.8)]"}`}
          />
        </div>
      </div>

      {/* Background Glow */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 blur-[60px] -mr-8 -mt-8 group-hover:bg-primary/20 transition-all duration-500 ${isLight ? "bg-black/5 group-hover:bg-black/10" : "bg-primary/10"}`}
      />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between">
          <span
            className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border backdrop-blur-md ${getCategoryColor(market.category)}`}
          >
            {market.category}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-success animate-pulse" />
            <span
              className={`text-[9px] font-bold uppercase tracking-widest ${isLight ? "text-black/30" : "text-white/30"}`}
            >
              {new Date(market.expiryDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-start gap-3">
          <h3
            className={`text-sm sm:text-[12px] font-bold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[2.5rem] ${isLight ? "text-gray-900" : "text-white"}`}
          >
            {market.title}
          </h3>

          {/* Mini Sparkline */}
          <div className="w-12 h-6 flex-shrink-0">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                points={points}
              />
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          {/* Yes Option */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-text-secondary">Yes</span>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${isLight ? "text-gray-900" : "text-white"}`}
              >
                {isAuthenticated ? `${percentage}%` : "--%"}
              </span>
            </div>
            <div
              className={`h-1 w-full rounded-full overflow-hidden ${isLight ? "bg-black/[0.06]" : "bg-white/[0.03]"}`}
            >
              <div
                className={`h-full bg-primary transition-all duration-1000 ease-out ${!isAuthenticated ? "blur-[2px] opacity-20" : ""}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* No Option */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-text-secondary">No</span>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${isLight ? "text-gray-900" : "text-white"}`}
              >
                {isAuthenticated ? `${100 - percentage}%` : "--%"}
              </span>
            </div>
            <div
              className={`h-1 w-full rounded-full overflow-hidden ${isLight ? "bg-black/[0.06]" : "bg-white/[0.03]"}`}
            >
              <div
                className={`h-full bg-secondary transition-all duration-1000 ease-out ${!isAuthenticated ? "blur-[2px] opacity-20" : ""}`}
                style={{ width: `${100 - percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div
          className={`mt-1 flex items-center justify-between border-t pt-4 ${isLight ? "border-black/8" : "border-white/5"}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center overflow-hidden ${isLight ? "border-gray-100 bg-primary/10" : "border-[#121212] bg-primary/20"}`}
                >
                  <div className="w-full h-full bg-primary/10" />
                </div>
              ))}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center text-[7px] font-bold ${isLight ? "border-gray-100 bg-black/5 text-black/40" : "border-[#121212] bg-white/5 text-white/40"}`}
              >
                +1k
              </div>
            </div>
            <span
              className={`text-[9px] font-black uppercase tracking-widest ${isLight ? "text-black/30" : "text-white/20"}`}
            >
              Vol $420k
            </span>
          </div>

          <button
            className={`h-8 px-4 rounded-lg border text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 ${
              isLight
                ? "bg-black/5 border-black/10 text-black/60"
                : "bg-white/5 border-white/10 text-white"
            }`}
          >
            <BinaryHoverText>Trade</BinaryHoverText>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MarketCard;
