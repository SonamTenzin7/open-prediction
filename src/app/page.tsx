"use client";

import React, { useState } from "react";
import { useMarkets } from "@/lib/store";
import MarketCard from "@/components/MarketCard";
import BinaryHoverText from "@/components/BinaryHoverText";
import { calculateProbability } from "@/lib/amm";

export default function Home() {
  const { markets, isLoading, selectedCategory, theme } = useMarkets();
  const isLight = theme === "light";
  const [activeTab, setActiveTab] = useState<"active" | "all" | "new">(
    "active",
  );

  const filteredMarkets = selectedCategory
    ? markets.filter((m) => m.category === selectedCategory)
    : markets;

  // Get trending market (highest volume/activity)
  const trendingMarket = filteredMarkets.length > 0 ? filteredMarkets[0] : null;
  const trendingProb = trendingMarket
    ? calculateProbability(
        trendingMarket.yesShares,
        trendingMarket.noShares,
        trendingMarket.liquidity,
      )
    : 0;
  const trendingPercentage = Math.round(trendingProb * 100);

  // Generate Polymarket-style YES probability chart
  // Single line showing YES probability (0-100%) over time with realistic volatility
  const yesProb = trendingPercentage; // current YES %

  // Hand-crafted realistic price action: starts lower, volatile journey to current value
  // Each value is a % between 0-100 representing YES probability at that point in time
  const rawPoints = [
    yesProb - 18,
    yesProb - 22,
    yesProb - 15,
    yesProb - 25,
    yesProb - 12,
    yesProb - 20,
    yesProb - 8,
    yesProb - 18,
    yesProb - 5,
    yesProb - 14,
    yesProb - 10,
    yesProb - 20,
    yesProb - 3,
    yesProb - 15,
    yesProb - 7,
    yesProb - 18,
    yesProb - 2,
    yesProb - 10,
    yesProb - 14,
    yesProb - 6,
    yesProb - 9,
    yesProb - 1,
    yesProb - 5,
    yesProb - 12,
    yesProb - 3,
    yesProb - 7,
    yesProb,
    yesProb - 4,
    yesProb - 2,
    yesProb,
  ].map((v) => Math.max(5, Math.min(95, v)));

  // Normalize to fill chart properly (5% padding top/bottom)
  const pLo = Math.min(...rawPoints);
  const pHi = Math.max(...rawPoints);
  const pSpan = pHi - pLo || 1;

  const toPath = (pts: number[]) =>
    "M " +
    pts
      .map((v, i) => {
        const x = (i / (pts.length - 1)) * 100;
        const y = 95 - ((v - pLo) / pSpan) * 85; // 85% height, 5% top pad, 10% bottom pad
        return `${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" L ");

  const yesPath = toPath(rawPoints);
  const yesEndY = 95 - ((rawPoints[rawPoints.length - 1] - pLo) / pSpan) * 85;

  // Gradient fill area under the YES line
  const fillPath = yesPath + ` L 100 100 L 0 100 Z`;
  if (isLoading) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-5 pb-12 sm:pb-20">
      {/* Trending Section - Hero - Only show when no category is selected */}
      {!selectedCategory && (
        <div className="mb-8 lg:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Trending Market Card with Chart */}
            {trendingMarket && (
              <div
                className={`lg:col-span-8 border rounded-3xl overflow-hidden relative group transition-all ${
                  isLight
                    ? "bg-white border-black/8 hover:border-primary/20"
                    : "bg-white/[0.02] border-white/5 hover:border-white/10"
                }`}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <h3
                        className={`text-lg sm:text-xl font-black uppercase tracking-tight mb-3 ${isLight ? "text-gray-900" : "text-white"}`}
                      >
                        {trendingMarket.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm font-medium opacity-60 line-clamp-2 ${isLight ? "text-gray-700" : "text-white"}`}
                      >
                        {trendingMarket.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`text-3xl sm:text-4xl font-black ${isLight ? "text-gray-900" : "text-white"}`}
                      >
                        {trendingPercentage}%
                      </div>
                      <span
                        className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-black/40" : "text-white/40"}`}
                      >
                        Yes
                      </span>
                    </div>
                  </div>

                  {/* Mini Chart – Polymarket style YES probability */}
                  <div className="relative h-48 sm:h-56 mt-4">
                    {/* Y-axis labels */}
                    <div className="absolute inset-y-0 right-0 flex flex-col justify-between pr-1 pointer-events-none z-10">
                      <span
                        className={`text-[9px] font-black tabular-nums ${isLight ? "text-black/30" : "text-white/25"}`}
                      >
                        100%
                      </span>
                      <span
                        className={`text-[9px] font-black tabular-nums ${isLight ? "text-black/30" : "text-white/25"}`}
                      >
                        50%
                      </span>
                      <span
                        className={`text-[9px] font-black tabular-nums ${isLight ? "text-black/30" : "text-white/25"}`}
                      >
                        0%
                      </span>
                    </div>

                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="w-full h-full"
                    >
                      <defs>
                        <linearGradient
                          id="yesGradient"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3B82F6"
                            stopOpacity="0.18"
                          />
                          <stop
                            offset="100%"
                            stopColor="#3B82F6"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      {/* Horizontal grid lines at 25%, 50%, 75% */}
                      {[25, 50, 75].map((y) => (
                        <line
                          key={y}
                          x1="0"
                          y1={y}
                          x2="100"
                          y2={y}
                          stroke={
                            isLight
                              ? "rgba(0,0,0,0.07)"
                              : "rgba(255,255,255,0.05)"
                          }
                          strokeWidth="0.4"
                          strokeDasharray="3 4"
                        />
                      ))}

                      {/* Gradient fill under YES line */}
                      <path d={fillPath} fill="url(#yesGradient)" />

                      {/* YES probability line – thin, sharp, angular */}
                      <path
                        d={yesPath}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                      />

                      {/* Live endpoint dot */}
                      <circle cx="100" cy={yesEndY} r="2" fill="#3B82F6" />
                      {/* Outer ring for live feel */}
                      <circle
                        cx="100"
                        cy={yesEndY}
                        r="4"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="0.8"
                        strokeOpacity="0.4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Hot Topics Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* News Section */}
              <div
                className={`border rounded-3xl p-6 transition-all ${
                  isLight
                    ? "bg-white border-black/8"
                    : "bg-white/[0.02] border-white/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-6">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <h3
                    className={`text-sm font-black uppercase tracking-wider ${isLight ? "text-gray-900" : "text-white"}`}
                  >
                    News
                  </h3>
                </div>

                <div className="space-y-3">
                  <div
                    className={`p-3 rounded-xl border transition-all hover:border-primary/40 cursor-pointer ${
                      isLight
                        ? "bg-black/[0.02] border-black/8 hover:bg-black/5"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {/* <span
                        className={`text-xs font-black ${isLight ? "text-gray-900" : "text-white"}`}
                      >
                        🗞️
                      </span> */}
                      <p
                        className={`text-[12px] font-black line-clamp-2 ${isLight ? "text-gray-900" : "text-white"}`}
                      >
                        Will BTC exceed $80,000 by Dec 31, 2026?
                      </p>
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase ${isLight ? "text-black/40" : "text-white/40"}`}
                    >
                      2h ago
                    </span>
                  </div>
                </div>
              </div>

              {/* Hot Topics Section */}
              <div
                className={`border rounded-3xl p-6 transition-all ${
                  isLight
                    ? "bg-white border-black/8"
                    : "bg-white/[0.02] border-white/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-6">
                  <svg
                    className="w-4 h-4 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3
                    className={`text-sm font-black uppercase tracking-wider ${isLight ? "text-gray-900" : "text-white"}`}
                  >
                    Hot Topics
                  </h3>
                </div>

                <div className="space-y-3">
                  {filteredMarkets.slice(0, 5).map((market, idx) => (
                    <div
                      key={market.id}
                      className={`p-3 rounded-xl border transition-all hover:border-primary/40 cursor-pointer ${
                        isLight
                          ? "bg-black/[0.02] border-black/8 hover:bg-black/5"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-primary text-xs font-black">
                          #{idx + 1}
                        </span>
                        <span
                          className={`text-xs font-black line-clamp-1 ${isLight ? "text-gray-900" : "text-white"}`}
                        >
                          {market.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-black uppercase ${isLight ? "text-black/40" : "text-white/40"}`}
                        >
                          {market.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Explore All Button */}
                <button
                  className={`w-full mt-4 py-3 border rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    isLight
                      ? "border-black/10 text-black/60 hover:text-black hover:border-black/25 hover:bg-black/5"
                      : "border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <BinaryHoverText>Explore All</BinaryHoverText>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Market Tabs - Polymarket Style */}
      <div className="mb-6">
        <div
          className={`flex items-center gap-2 sm:gap-4 border-b ${isLight ? "border-black/8" : "border-white/5"}`}
        >
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all border-b-2 ${
              activeTab === "active"
                ? "text-primary border-primary drop-shadow-[0_0_8px_rgba(30,144,255,0.5)]"
                : isLight
                  ? "text-black/30 border-transparent hover:text-black/60"
                  : "text-white/20 border-transparent hover:text-white/60"
            }`}
          >
            <BinaryHoverText>Active</BinaryHoverText>
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all border-b-2 ${
              activeTab === "all"
                ? "text-primary border-primary drop-shadow-[0_0_8px_rgba(30,144,255,0.5)]"
                : isLight
                  ? "text-black/30 border-transparent hover:text-black/60"
                  : "text-white/20 border-transparent hover:text-white/60"
            }`}
          >
            <BinaryHoverText>All Markets</BinaryHoverText>
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all border-b-2 ${
              activeTab === "new"
                ? "text-primary border-primary drop-shadow-[0_0_8px_rgba(30,144,255,0.5)]"
                : isLight
                  ? "text-black/30 border-transparent hover:text-black/60"
                  : "text-white/20 border-transparent hover:text-white/60"
            }`}
          >
            <BinaryHoverText>New</BinaryHoverText>
          </button>

          {/* Sort dropdown on the right */}
          <div className="ml-auto flex items-center gap-3">
            <span
              className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] ${isLight ? "text-black/30" : "text-white/20"}`}
            >
              Sort:
            </span>
            <select
              className={`bg-transparent text-[9px] sm:text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer ${isLight ? "text-gray-700" : "text-white"}`}
            >
              <option>Volume</option>
              <option>Ending Soon</option>
              <option>Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {filteredMarkets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
        {filteredMarkets.length === 0 && (
          <div
            className={`col-span-full py-20 text-center border-2 border-dashed rounded-3xl ${isLight ? "border-black/10" : "border-white/5"}`}
          >
            <p
              className={`font-medium ${isLight ? "text-black/30" : "text-white/20"}`}
            >
              No markets found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
