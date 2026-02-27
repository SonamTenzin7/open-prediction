"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMarkets, Category } from "@/lib/store";
import { CATEGORIES } from "@/lib/constants";
import BinaryHoverText from "./BinaryHoverText";

interface CreateMarketFormProps {
  onSuccess?: () => void;
}

const CreateMarketForm = ({ onSuccess }: CreateMarketFormProps) => {
  const { addMarket, theme } = useMarkets();
  const isLight = theme === "light";
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Crypto" as Category,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    initialProbability: 50,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMarket({
      ...formData,
      liquidity: 100, // Default liquidity parameter B
    });
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <div className="space-y-2">
          <label
            className={`text-[10px] font-black uppercase tracking-[0.2em] pl-1 ${isLight ? "text-black/40" : "text-white/40"}`}
          >
            Market Question
          </label>
          <input
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g. Will ETH break $5,000 this year?"
            className={`w-full border rounded-2xl py-4 px-6 text-lg font-bold focus:outline-none focus:border-primary/50 transition-all duration-500 shadow-2xl ${
              isLight
                ? "bg-black/[0.03] border-black/8 text-gray-900 placeholder:text-black/20 focus:bg-black/[0.05]"
                : "bg-white/[0.02] border-white/5 text-white placeholder:text-white/10 focus:bg-white/[0.04]"
            }`}
          />
        </div>

        <div className="space-y-2">
          <label
            className={`text-[10px] font-black uppercase tracking-[0.2em] pl-1 ${isLight ? "text-black/40" : "text-white/40"}`}
          >
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Provide context and resolution criteria..."
            rows={2}
            className={`w-full border rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all resize-none duration-500 shadow-2xl ${
              isLight
                ? "bg-black/[0.03] border-black/8 text-gray-900 placeholder:text-black/20 focus:bg-black/[0.05]"
                : "bg-white/[0.02] border-white/5 text-white placeholder:text-white/10 focus:bg-white/[0.04]"
            }`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label
              className={`text-[10px] font-black uppercase tracking-[0.2em] pl-1 ${isLight ? "text-black/40" : "text-white/40"}`}
            >
              Category
            </label>
            <div className="relative group/select">
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Category,
                  })
                }
                className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer ${
                  isLight
                    ? "bg-black/[0.03] border-black/8 text-gray-900 group-hover/select:bg-black/[0.05]"
                    : "bg-white/[0.02] border-white/5 text-white group-hover/select:bg-white/[0.04]"
                }`}
              >
                {CATEGORIES.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className={
                      isLight ? "bg-white text-gray-900" : "bg-black text-white"
                    }
                  >
                    {cat}
                  </option>
                ))}
              </select>
              <div
                className={`absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none ${isLight ? "text-black/20" : "text-white/20"}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              className={`text-[10px] font-black uppercase tracking-[0.2em] pl-1 ${isLight ? "text-black/40" : "text-white/40"}`}
            >
              Expiry Date
            </label>
            <input
              type="date"
              required
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData({ ...formData, expiryDate: e.target.value })
              }
              className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold focus:outline-none focus:border-primary/50 transition-all cursor-pointer ${
                isLight
                  ? "bg-black/[0.03] border-black/8 text-gray-900 hover:bg-black/[0.05]"
                  : "bg-white/[0.02] border-white/5 text-white hover:bg-white/[0.04]"
              }`}
            />
          </div>
        </div>

        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between pl-1">
            <label
              className={`text-[10px] font-black uppercase tracking-[0.2em] ${isLight ? "text-black/40" : "text-white/40"}`}
            >
              Initial Probability
            </label>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">
                Live Calibration
              </span>
              <span
                className={`text-lg font-black tracking-tighter ${isLight ? "text-gray-900" : "text-white"}`}
              >
                {formData.initialProbability}%{" "}
                <span className="text-primary italic">YES</span>
              </span>
            </div>
          </div>
          <div className="relative px-1">
            <input
              type="range"
              min="1"
              max="99"
              value={formData.initialProbability}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  initialProbability: parseInt(e.target.value),
                })
              }
              className={`w-full h-1 rounded-full appearance-none cursor-pointer accent-primary transition-all ${isLight ? "bg-black/[0.08]" : "bg-white/5"}`}
            />
          </div>
          <div
            className={`flex justify-between text-[8px] font-black uppercase tracking-[0.3em] px-1 ${isLight ? "text-black/15" : "text-white/10"}`}
          >
            <span>Low Signal</span>
            <span>High Signal</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-5 bg-primary text-white rounded-[20px] text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-90 transition-all shadow-[0_20px_40px_rgba(30,144,255,0.2)] hover:shadow-[0_25px_50px_rgba(30,144,255,0.4)] active:scale-[0.98] border border-white/10"
      >
        <BinaryHoverText>Initialize Forecasting Node</BinaryHoverText>
      </button>
    </form>
  );
};

export default CreateMarketForm;
