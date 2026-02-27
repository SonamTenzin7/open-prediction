"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useMarkets } from "@/lib/store";
import BettingConsole from "@/components/BettingConsole";
import { getCategoryColor } from "@/lib/constants";
import { calculateProbability } from "@/lib/amm";
import CommentsSystem from "@/components/CommentsSystem";

export default function MarketPage() {
  const { id } = useParams();
  const { markets, isLoading, user, theme } = useMarkets();
  const isLight = theme === "light";
  const router = useRouter();

  const market = markets.find((m) => m.id === id);
  const prob = calculateProbability(
    market?.yesShares || 0,
    market?.noShares || 0,
    market?.liquidity || 0,
  );
  const percentage = Math.round(prob * 100);
  const userPosition = market
    ? user.positions[market.id] || { yes: 0, no: 0 }
    : { yes: 0, no: 0 };

  if (isLoading) return null;
  if (!market) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Market not found</h1>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-primary font-bold hover:underline"
        >
          Return home
        </button>
      </div>
    );
  }

  // Generating a more complex chart path for the hero
  const chartPoints = [20, 25, 22, 35, 30, 45, 40, 60, 55, 75, 70, percentage];
  const chartPath =
    "M " +
    chartPoints
      .map((val, i) => `${(i / (chartPoints.length - 1)) * 100} ${100 - val}`)
      .join(" L ");
  const areaPath = chartPath + ` L 100 100 L 0 100 Z`;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-6 lg:pt-10 pb-6 sm:pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
        {/* Left Column: Market Info & Chart */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8 lg:space-y-10">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] border backdrop-blur-md ${getCategoryColor(market.category)}`}
              >
                {market.category}
              </span>
              <div className="h-3 sm:h-4 w-[1px] bg-white/10" />
              <span
                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] border ${
                  isLight
                    ? "text-black/40 bg-black/[0.04] border-black/8"
                    : "text-white/40 bg-white/[0.02] border-white/5"
                }`}
              >
                <svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="hidden sm:inline">Ends </span>
                {new Date(market.expiryDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: window.innerWidth >= 640 ? "numeric" : undefined,
                })}
              </span>
            </div>

            <h1
              className={`text-[14px] font-black uppercase tracking-[0.2em] ${isLight ? "text-gray-900" : "text-white"}`}
            >
              {market.title}
            </h1>

            <p className="text-xs sm:text-sm font-medium leading-relaxed max-w-3xl opacity-60">
              {market.description}
            </p>
          </div>

          {/* Glowing Line Chart */}
          <div
            className={`relative aspect-[21/9] w-full border rounded-[40px] overflow-hidden p-8 group shadow-2xl ${
              isLight
                ? "bg-white border-black/8"
                : "bg-white/[0.02] border-white/5"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Chart Container */}
            <div className="relative w-full h-full">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
              >
                {/* Gradient Fill */}
                <path
                  d={areaPath}
                  fill="url(#chartGradient)"
                  className="opacity-20 translate-y-2"
                />
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#1E90FF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#1E90FF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[...Array(5)].map((_, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 25}
                    x2="100"
                    y2={i * 25}
                    stroke={isLight ? "black" : "white"}
                    strokeWidth="0.1"
                    strokeOpacity={isLight ? "0.04" : "0.05"}
                  />
                ))}

                {/* The Line */}
                <path
                  d={chartPath}
                  fill="none"
                  stroke="#1E90FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_0_8px_rgba(30,144,255,0.8)]"
                />

                {/* Latest Point */}
                <circle
                  cx="100"
                  cy={100 - chartPoints[chartPoints.length - 1]}
                  r="1.5"
                  fill="#1E90FF"
                  className="animate-pulse shadow-[0_0_15px_rgba(30,144,255,1)]"
                />
              </svg>
            </div>

            {/* Stats Overlay */}
            <div className="absolute top-8 left-8 flex gap-8">
              <div className="flex flex-col">
                <span
                  className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isLight ? "text-black/40" : "text-white/40"}`}
                >
                  Current Probability
                </span>
                <span
                  className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-black ${isLight ? "text-gray-900" : "text-white"}`}
                >
                  {percentage}%
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isLight ? "text-black/40" : "text-white/40"}`}
                >
                  Total Volume
                </span>
                <span
                  className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-black ${isLight ? "text-gray-900" : "text-white"}`}
                >
                  $420,690
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-8 rounded-[32px] border backdrop-blur-xl group transition-all ${isLight ? "border-black/8 bg-white hover:border-primary/20" : "border-white/5 bg-white/[0.02] hover:border-white/10"}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(30,144,255,1)]" />
                <span
                  className={`text-[10px] font-black uppercase tracking-[0.2em] ${isLight ? "text-black/40" : "text-white/40"}`}
                >
                  Live Sentiment
                </span>
              </div>
              <div
                className={`text-lg sm:text-xl md:text-2xl font-black group-hover:scale-110 origin-left transition-transform duration-500 ${isLight ? "text-gray-900" : "text-white"}`}
              >
                {percentage}%{" "}
                <span
                  className={`text-xs sm:text-sm md:text-base italic ${isLight ? "text-black/20" : "text-white/20"}`}
                >
                  YES
                </span>
              </div>
            </div>
            <div
              className={`p-8 rounded-[32px] border backdrop-blur-xl group transition-all ${isLight ? "border-black/8 bg-white hover:border-primary/20" : "border-white/5 bg-white/[0.02] hover:border-white/10"}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-black/20" : "bg-white/20"}`}
                />
                <span
                  className={`text-[10px] font-black uppercase tracking-[0.2em] ${isLight ? "text-black/40" : "text-white/40"}`}
                >
                  Your Active Position
                </span>
              </div>
              <div
                className={`text-sm sm:text-base md:text-lg font-black ${isLight ? "text-gray-900" : "text-white"}`}
              >
                {userPosition.yes > 0 || userPosition.no > 0 ? (
                  <div className="flex items-center gap-4">
                    {userPosition.yes > 0 && (
                      <div className="flex flex-col">
                        <span className="text-primary">
                          {userPosition.yes.toFixed(1)}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase ${isLight ? "text-black/30" : "text-white/20"}`}
                        >
                          Shares (Yes)
                        </span>
                      </div>
                    )}
                    {userPosition.no > 0 && (
                      <div className="flex flex-col">
                        <span className="text-secondary">
                          {userPosition.no.toFixed(1)}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase ${isLight ? "text-black/30" : "text-white/20"}`}
                        >
                          Shares (No)
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <span
                    className={`text-xs italic ${isLight ? "text-black/20" : "text-white/20"}`}
                  >
                    No active trades
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div
            className={`pt-4 border-t ${isLight ? "border-black/8" : "border-white/5"}`}
          >
            <CommentsSystem marketId={id as string} />
          </div>
        </div>

        {/* Right Column: Betting Console */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <div className="relative">
            {/* Glow behind console */}
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full" />
            <BettingConsole market={market} />
          </div>
        </div>
      </div>
    </div>
  );
}
