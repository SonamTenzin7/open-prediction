"use client";

import React from "react";
import { useMarkets, Activity } from "@/lib/store";

const EnhancedCommunityFeed = () => {
  const { activities, likeActivity, theme } = useMarkets();
  const isLight = theme === "light";

  const getActionStyles = (action: string) => {
    switch (action) {
      case "bet_yes":
        return {
          emoji: "📈",
          color: "text-success",
          bg: "bg-success/10",
          border: "border-success/20",
          label: "Bought Yes",
        };
      case "bet_no":
        return {
          emoji: "📉",
          color: "text-secondary",
          bg: "bg-secondary/10",
          border: "border-secondary/20",
          label: "Bought No",
        };
      case "create_market":
        return {
          emoji: "🏗️",
          color: "text-primary",
          bg: "bg-primary/10",
          border: "border-primary/20",
          label: "Deployed",
        };
      case "comment":
        return {
          emoji: "💬",
          color: "text-white/60",
          bg: isLight ? "bg-black/5" : "bg-white/5",
          border: isLight ? "border-black/10" : "border-white/10",
          label: "Commented",
        };
      default:
        return {
          emoji: "⚡",
          color: isLight ? "text-black/60" : "text-white",
          bg: isLight ? "bg-black/10" : "bg-white/10",
          border: isLight ? "border-black/20" : "border-white/20",
          label: "Activity",
        };
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <h3
            className={`text-[10px] font-black uppercase tracking-[0.3em] ${isLight ? "text-gray-900" : "text-white"}`}
          >
            Trending
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            className={`text-[8px] font-black uppercase tracking-widest transition-colors ${isLight ? "text-black/30 hover:text-black" : "text-white/20 hover:text-white"}`}
          >
            All
          </button>
          <button
            className={`text-[8px] font-black uppercase tracking-widest transition-colors ${isLight ? "text-black/30 hover:text-black" : "text-white/20 hover:text-white"}`}
          >
            Whales
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((activity, idx) => {
          const styles = getActionStyles(activity.action);
          return (
            <div
              key={activity.id}
              className={`group relative border rounded-2xl p-4 transition-all duration-300 hover:translate-x-1 ${
                isLight
                  ? "bg-white border-black/8 hover:border-black/15 shadow-sm"
                  : "bg-[#0A0A0A]/60 border-white/5 hover:border-white/10"
              }`}
            >
              {/* Activity Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl ${styles.bg} border ${styles.border} flex items-center justify-center text-sm shadow-inner`}
                  >
                    {styles.emoji}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black ${isLight ? "text-gray-900" : "text-white"}`}
                      >
                        {activity.userName}
                      </span>
                      {activity.userPosition && (
                        <span
                          className={`text-[7px] font-black px-1.5 py-0.5 rounded border uppercase tracking-tighter ${isLight ? "bg-black/5 text-black/40 border-black/8" : "bg-white/5 text-white/40 border-white/5"}`}
                        >
                          {activity.userPosition}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[8px] font-bold uppercase tracking-widest ${styles.color}`}
                    >
                      {styles.label}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-[8px] font-bold whitespace-nowrap ${isLight ? "text-black/30" : "text-white/20"}`}
                >
                  {formatTimestamp(activity.timestamp)}
                </span>
              </div>

              {/* Activity Content */}
              <div className="space-y-3">
                <p
                  className={`text-[10px] font-medium leading-relaxed transition-colors ${isLight ? "text-black/50 group-hover:text-black/80" : "text-white/60 group-hover:text-white"}`}
                >
                  {activity.marketTitle}
                </p>

                {/* Micro Sparkline Placeholder (Better than Polymarket vibe) */}
                <div className="h-6 flex items-end gap-0.5 opacity-20 group-hover:opacity-40 transition-opacity">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${i % 3 === 0 ? "bg-primary" : "bg-white/20"}`}
                      style={{ height: `${20 + Math.random() * 80}%` }}
                    />
                  ))}
                </div>

                {/* Quick Actions */}
                <div
                  className={`flex items-center gap-4 pt-1 border-t ${isLight ? "border-black/[0.04]" : "border-white/[0.02]"}`}
                >
                  <button
                    onClick={() => likeActivity(activity.id)}
                    className={`flex items-center gap-1.5 text-[8px] font-black px-2 py-1 rounded-lg transition-all hover:text-danger hover:bg-danger/10 ${isLight ? "text-black/30" : "text-white/20"}`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill={activity.likes > 0 ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {activity.likes || 0}
                  </button>
                  <button
                    className={`flex items-center gap-1.5 text-[8px] font-black px-2 py-1 rounded-lg transition-all hover:text-primary hover:bg-primary/10 ${isLight ? "text-black/30" : "text-white/20"}`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {activity.replies || 0}
                  </button>
                  <div className="ml-auto">
                    <svg
                      className="w-3 h-3 text-white/10 hover:text-white/40 cursor-pointer transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className={`w-full py-4 mt-2 border border-dashed rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] transition-all ${
          isLight
            ? "border-black/10 text-black/30 hover:text-black hover:border-black/25 hover:bg-black/[0.03]"
            : "border-white/5 text-white/20 hover:text-white hover:border-white/20 hover:bg-white/[0.02]"
        }`}
      >
        View Transaction History
      </button>
    </div>
  );
};

export default EnhancedCommunityFeed;
