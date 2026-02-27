"use client";

import React, { useState, useEffect } from "react";
import { Market, useMarkets } from "@/lib/store";
import { calculateProbability, estimateSharesForAmount } from "@/lib/amm";
import BinaryHoverText from "./BinaryHoverText";

interface BettingConsoleProps {
  market: Market;
}

const BettingConsole = ({ market }: BettingConsoleProps) => {
  const { placeBet, user, theme } = useMarkets();
  const isLight = theme === "light";
  const [isYes, setIsYes] = useState(true);
  const [amount, setAmount] = useState<string>("10");
  const [shares, setShares] = useState(0);
  const [impact, setImpact] = useState(0);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const numAmount = parseFloat(amount) || 0;
  const currentProb = calculateProbability(
    market.yesShares,
    market.noShares,
    market.liquidity,
  );

  useEffect(() => {
    if (numAmount > 0) {
      const estimatedShares = estimateSharesForAmount(
        market.yesShares,
        market.noShares,
        numAmount,
        isYes,
        market.liquidity,
      );
      setShares(estimatedShares);

      const newYes = isYes
        ? market.yesShares + estimatedShares
        : market.yesShares;
      const newNo = isYes ? market.noShares : market.noShares + estimatedShares;
      const newProb = calculateProbability(newYes, newNo, market.liquidity);
      setImpact(Math.abs(newProb - currentProb) * 100);
    } else {
      setShares(0);
      setImpact(0);
    }
  }, [numAmount, isYes, market]);

  const handleBet = () => {
    if (numAmount > 0 && shares > 0 && numAmount <= user.balance) {
      placeBet(market.id, numAmount, isYes, shares);
    }
  };

  const percentage = Math.round(currentProb * 100);

  return (
    <>
      {/* Desktop/Tablet View - Original Design */}
      <div
        className={`hidden lg:block rounded-3xl sm:rounded-[40px] border backdrop-blur-3xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden relative group transition-colors duration-300 ${
          isLight ? "border-black/8 bg-white" : "border-white/5 bg-white/[0.02]"
        }`}
      >
        {/* Animated Grid Lines with Particles */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {/* Horizontal lines */}
          <div
            className={`absolute top-[30%] left-0 w-full h-[1px] ${isLight ? "bg-gradient-to-r from-transparent via-black to-transparent" : "bg-gradient-to-r from-transparent via-primary to-transparent"}`}
          >
            <div
              className={`absolute top-0 left-0 w-2 h-2 rounded-full animate-[slideHorizontal_3s_ease-in-out_infinite] ${isLight ? "bg-black shadow-[0_0_10px_rgba(0,0,0,0.4)]" : "bg-primary shadow-[0_0_10px_rgba(30,144,255,0.8)]"}`}
            />
          </div>
          <div
            className={`absolute top-[70%] left-0 w-full h-[1px] ${isLight ? "bg-gradient-to-r from-transparent via-black to-transparent" : "bg-gradient-to-r from-transparent via-primary to-transparent"}`}
          >
            <div
              className={`absolute top-0 left-0 w-2 h-2 rounded-full animate-[slideHorizontal_4s_ease-in-out_infinite_0.5s] ${isLight ? "bg-black shadow-[0_0_10px_rgba(0,0,0,0.4)]" : "bg-primary shadow-[0_0_10px_rgba(30,144,255,0.8)]"}`}
            />
          </div>

          {/* Vertical lines */}
          <div
            className={`absolute top-0 left-[30%] w-[1px] h-full ${isLight ? "bg-gradient-to-b from-transparent via-black to-transparent" : "bg-gradient-to-b from-transparent via-primary to-transparent"}`}
          >
            <div
              className={`absolute top-0 left-0 w-2 h-2 rounded-full animate-[slideVertical_4s_ease-in-out_infinite] ${isLight ? "bg-black shadow-[0_0_10px_rgba(0,0,0,0.4)]" : "bg-primary shadow-[0_0_10px_rgba(30,144,255,0.8)]"}`}
            />
          </div>
          <div
            className={`absolute top-0 left-[70%] w-[1px] h-full ${isLight ? "bg-gradient-to-b from-transparent via-black to-transparent" : "bg-gradient-to-b from-transparent via-primary to-transparent"}`}
          >
            <div
              className={`absolute top-0 left-0 w-2 h-2 rounded-full animate-[slideVertical_3.5s_ease-in-out_infinite_0.7s] ${isLight ? "bg-black shadow-[0_0_10px_rgba(0,0,0,0.4)]" : "bg-primary shadow-[0_0_10px_rgba(30,144,255,0.8)]"}`}
            />
          </div>
        </div>

        {/* Dynamic Glow */}
        <div
          className={`absolute -top-24 -right-24 w-48 h-48 blur-[100px] transition-colors duration-1000 ${isLight ? (isYes ? "bg-black/10" : "bg-black/10") : isYes ? "bg-primary/20" : "bg-secondary/20"}`}
        />

        <div className="flex flex-col gap-6 sm:gap-8 relative z-10">
          <div
            className={`flex rounded-xl sm:rounded-2xl p-1 sm:p-1.5 border ${isLight ? "bg-black/[0.04] border-black/8" : "bg-white/[0.03] border-white/5"}`}
          >
            <button
              onClick={() => setIsYes(true)}
              className={`flex-1 py-3 sm:py-4 px-2 sm:px-4 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-500 ${
                isYes
                  ? "bg-primary text-white shadow-[0_0_25px_rgba(30,144,255,0.4)] scale-[1.02]"
                  : isLight
                    ? "text-black/40 hover:text-black"
                    : "text-white/40 hover:text-white"
              }`}
            >
              <BinaryHoverText>
                <span className="hidden sm:inline">Buy </span>Yes {percentage}%
              </BinaryHoverText>
            </button>
            <button
              onClick={() => setIsYes(false)}
              className={`flex-1 py-3 sm:py-4 px-2 sm:px-4 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-500 ${
                !isYes
                  ? "bg-secondary text-white shadow-[0_0_25px_rgba(255,76,76,0.4)] scale-[1.02]"
                  : isLight
                    ? "text-black/40 hover:text-black"
                    : "text-white/40 hover:text-white"
              }`}
            >
              <BinaryHoverText>
                <span className="hidden sm:inline">Buy </span>No{" "}
                {100 - percentage}%
              </BinaryHoverText>
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <span
                  className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] ${isLight ? "text-black/40" : "text-white/40"}`}
                >
                  Investment Amount
                </span>
                <span className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-[0.1em]">
                  Min $1.00
                </span>
              </div>
              <div className="relative group/input">
                <span
                  className={`absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-lg sm:text-xl font-black group-focus-within/input:text-primary transition-colors ${isLight ? "text-black/20" : "text-white/20"}`}
                >
                  $
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className={`w-full border rounded-2xl sm:rounded-3xl py-4 sm:py-6 pl-9 sm:pl-12 pr-16 sm:pr-20 text-2xl sm:text-3xl font-black focus:outline-none focus:border-primary/50 transition-all ${
                    isLight
                      ? "bg-black/[0.03] border-black/8 text-gray-900 placeholder:text-black/10 focus:bg-black/[0.05]"
                      : "bg-white/[0.03] border-white/5 text-white placeholder:text-white/5 focus:bg-white/[0.06]"
                  }`}
                />
                <button
                  onClick={() => setAmount(user.balance.toString())}
                  className={`absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 px-2.5 sm:px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black hover:text-primary hover:bg-primary/10 uppercase tracking-widest transition-all ${
                    isLight
                      ? "bg-black/5 text-black/40"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  Max
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {["10", "50", "100", "500"].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`border rounded-lg sm:rounded-xl py-2.5 sm:py-3 text-[9px] sm:text-[10px] font-black hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all uppercase tracking-wider sm:tracking-widest ${
                    isLight
                      ? "bg-black/[0.02] border-black/8 text-black/40"
                      : "bg-white/[0.02] border-white/5 text-white/40"
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border space-y-3 sm:space-y-4 ${isLight ? "bg-black/[0.03] border-black/8" : "bg-white/[0.02] border-white/5"}`}
          >
            <div className="flex justify-between items-center">
              <span
                className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] ${isLight ? "text-black/30" : "text-white/20"}`}
              >
                Expected Shares
              </span>
              <span
                className={`text-xs sm:text-sm font-black flex items-center gap-1 sm:gap-1.5 ${isLight ? "text-gray-900" : "text-white"}`}
              >
                {shares.toFixed(2)}
                <span
                  className={`text-[9px] sm:text-[10px] ${isLight ? "text-black/30" : "text-white/20"}`}
                >
                  Shares
                </span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] ${isLight ? "text-black/30" : "text-white/20"}`}
              >
                Potential Return
              </span>
              <span className="text-xs sm:text-sm font-black text-success flex items-center gap-1 sm:gap-1.5">
                ${(shares * 1).toFixed(2)}
                <span className="text-[9px] sm:text-[10px] text-success/40">
                  ({(((shares - numAmount) / numAmount) * 100).toFixed(1)}%)
                </span>
              </span>
            </div>
            <div
              className={`h-[1px] w-full ${isLight ? "bg-black/8" : "bg-white/5"}`}
            />
            <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">
              <span className={isLight ? "text-black/30" : "text-white/20"}>
                Price Impact
              </span>
              <span
                className={
                  impact > 5
                    ? "text-warning"
                    : isLight
                      ? "text-black/40"
                      : "text-white/40"
                }
              >
                {impact.toFixed(2)}%
              </span>
            </div>
          </div>

          <button
            onClick={handleBet}
            disabled={numAmount <= 0 || numAmount > user.balance}
            className={`w-full py-4 sm:py-5 rounded-2xl sm:rounded-3xl text-[11px] sm:text-xs font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] overflow-hidden relative group/btn transition-all duration-500 ${
              numAmount > user.balance
                ? "bg-white/5 text-white/10 cursor-not-allowed"
                : isYes
                  ? "bg-primary text-white shadow-[0_20px_40px_rgba(30,144,255,0.2)] hover:shadow-[0_25px_50px_rgba(30,144,255,0.4)] hover:-translate-y-1"
                  : "bg-secondary text-white shadow-[0_20px_40px_rgba(255,76,76,0.2)] hover:shadow-[0_25px_50px_rgba(255,76,76,0.4)] hover:-translate-y-1"
            }`}
          >
            <span className="relative z-10 transition-transform duration-500 group-hover/btn:scale-105 block">
              <BinaryHoverText>
                {numAmount > user.balance
                  ? "Insufficient Funds"
                  : `Confirm ${isYes ? "Yes" : "No"} Transaction`}
              </BinaryHoverText>
            </span>
            {/* Shine effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
          </button>

          <div
            className={`flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] italic ${isLight ? "text-black/20" : "text-white/10"}`}
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Secured by Prediction Engine v2.0
          </div>
        </div>
      </div>

      {/* Mobile View - Polymarket Style with Fixed Bottom Buttons */}
      <div className="lg:hidden">
        {/* Modal Overlay */}
        {showMobileModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            onClick={() => setShowMobileModal(false)}
          />
        )}

        {/* Fixed Bottom Buttons - Polymarket Style */}
        <div
          className={`fixed bottom-0 left-0 right-0 border-t backdrop-blur-2xl z-50 ${
            isLight
              ? "bg-white/95 border-black/8"
              : "bg-[#0A0A0A]/95 border-white/10"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 py-2">
            <div className="grid grid-cols-2 gap-2">
              {/* Buy Yes Button */}
              <button
                onClick={() => {
                  setIsYes(true);
                  setShowMobileModal(true);
                }}
                className="bg-primary text-white py-3 rounded-xl text-sm font-black uppercase tracking-[0.1em] transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <BinaryHoverText>
                    <span className="block">
                      Buy Yes
                      <span className="block text-xs font-black opacity-80 mt-0.5">
                        {percentage}%
                      </span>
                    </span>
                  </BinaryHoverText>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              </button>

              {/* Buy No Button */}
              <button
                onClick={() => {
                  setIsYes(false);
                  setShowMobileModal(true);
                }}
                className="bg-secondary text-white py-3 rounded-xl text-sm font-black uppercase tracking-[0.1em] transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <BinaryHoverText>
                    <span className="block">
                      Buy No
                      <span className="block text-xs font-black opacity-80 mt-0.5">
                        {100 - percentage}%
                      </span>
                    </span>
                  </BinaryHoverText>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide-up Modal for Probability and Confirmation */}
        {showMobileModal && (
          <div
            className={`fixed bottom-0 left-0 right-0 border-t backdrop-blur-2xl z-50 transform transition-transform duration-300 ${
              isLight
                ? "bg-white border-black/8"
                : "bg-[#0A0A0A]/98 border-white/10"
            }`}
            style={{
              animation: "slideUp 0.3s ease-out",
            }}
          >
            <div className="max-w-[1400px] mx-auto px-4 py-6 max-h-[80vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setShowMobileModal(false)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isLight ? "hover:bg-black/5" : "hover:bg-white/5"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Current Probability Display */}
              <div className="mb-6">
                <div
                  className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${isLight ? "text-black/40" : "text-white/40"}`}
                >
                  Current Probability
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-success text-lg font-black">
                      {percentage}%
                    </span>
                    <span
                      className={`text-xs font-black ${isLight ? "text-gray-600" : "text-white/60"}`}
                    >
                      Yes
                    </span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/10" />
                  <div className="flex items-center gap-2">
                    <span className="text-secondary text-lg font-black">
                      {100 - percentage}%
                    </span>
                    <span
                      className={`text-xs font-black ${isLight ? "text-gray-600" : "text-white/60"}`}
                    >
                      No
                    </span>
                  </div>
                </div>
              </div>

              {/* Selected Side Indicator */}
              <div
                className={`mb-4 p-3 rounded-xl ${
                  isYes
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-secondary/10 border border-secondary/20"
                }`}
              >
                <div className="text-[9px] font-black uppercase tracking-wider opacity-60 mb-1">
                  You&apos;re buying
                </div>
                <div
                  className={`text-base font-black uppercase ${
                    isYes ? "text-primary" : "text-secondary"
                  }`}
                >
                  {isYes ? "Yes" : "No"} @{" "}
                  {isYes ? percentage : 100 - percentage}%
                </div>
              </div>

              {/* Investment Amount Input */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center px-1">
                  <span
                    className={`text-[9px] font-black uppercase tracking-[0.15em] ${isLight ? "text-black/40" : "text-white/40"}`}
                  >
                    Investment Amount
                  </span>
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.1em]">
                    Min $1.00
                  </span>
                </div>
                <div className="relative group/input">
                  <span
                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black group-focus-within/input:text-primary transition-colors ${isLight ? "text-black/20" : "text-white/20"}`}
                  >
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className={`w-full border rounded-2xl py-4 pl-9 pr-16 text-xl font-black focus:outline-none focus:border-primary/50 transition-all ${
                      isLight
                        ? "bg-black/[0.03] border-black/8 text-gray-900 placeholder:text-black/10 focus:bg-black/[0.05]"
                        : "bg-white/[0.03] border-white/5 text-white placeholder:text-white/5 focus:bg-white/[0.06]"
                    }`}
                  />
                  <button
                    onClick={() => setAmount(user.balance.toString())}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-[9px] font-black hover:text-primary hover:bg-primary/10 uppercase tracking-widest transition-all ${
                      isLight
                        ? "bg-black/5 text-black/40"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    Max
                  </button>
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-1.5 mb-4">
                {["10", "50", "100", "500"].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`border rounded-lg py-2.5 text-[9px] font-black hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all uppercase tracking-wider ${
                      isLight
                        ? "bg-black/[0.02] border-black/8 text-black/40"
                        : "bg-white/[0.02] border-white/5 text-white/40"
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>

              {/* Summary */}
              <div
                className={`p-4 rounded-2xl border space-y-3 mb-4 ${isLight ? "bg-black/[0.03] border-black/8" : "bg-white/[0.02] border-white/5"}`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.15em] ${isLight ? "text-black/30" : "text-white/20"}`}
                  >
                    Expected Shares
                  </span>
                  <span
                    className={`text-sm font-black ${isLight ? "text-gray-900" : "text-white"}`}
                  >
                    {shares.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.15em] ${isLight ? "text-black/30" : "text-white/20"}`}
                  >
                    Potential Return
                  </span>
                  <span className="text-sm font-black text-success">
                    ${(shares * 1).toFixed(2)}
                    <span className="text-[10px] text-success/40 ml-1">
                      ({(((shares - numAmount) / numAmount) * 100).toFixed(1)}%)
                    </span>
                  </span>
                </div>
                <div
                  className={`h-[1px] w-full ${isLight ? "bg-black/8" : "bg-white/5"}`}
                />
                <div className="flex justify-between items-center">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.15em] ${isLight ? "text-black/30" : "text-white/20"}`}
                  >
                    Price Impact
                  </span>
                  <span
                    className={`text-sm font-black ${
                      impact > 5
                        ? "text-warning"
                        : isLight
                          ? "text-black/40"
                          : "text-white/40"
                    }`}
                  >
                    {impact.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={() => {
                  handleBet();
                  setShowMobileModal(false);
                }}
                disabled={numAmount <= 0 || numAmount > user.balance}
                className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-[0.1em] transition-all duration-300 relative overflow-hidden ${
                  numAmount > user.balance
                    ? "bg-white/5 text-white/10 cursor-not-allowed"
                    : isYes
                      ? "bg-primary text-white shadow-lg hover:shadow-xl"
                      : "bg-secondary text-white shadow-lg hover:shadow-xl"
                }`}
              >
                <span className="relative z-10">
                  <BinaryHoverText>
                    {numAmount > user.balance
                      ? "Insufficient Funds"
                      : `Confirm ${isYes ? "Yes" : "No"} Transaction`}
                  </BinaryHoverText>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BettingConsole;
