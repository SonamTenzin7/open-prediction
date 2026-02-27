"use client";

import React, { useState, useEffect } from "react";
import { useMarkets } from "@/lib/store";

interface CommentsSystemProps {
  marketId: string;
}

const CommentsSystem = ({ marketId }: CommentsSystemProps) => {
  const { comments, addComment, isAuthenticated, theme } = useMarkets();
  const isLight = theme === "light";
  const [newComment, setNewComment] = useState("");
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const marketComments = comments[marketId] || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    addComment(marketId, newComment);
    setNewComment("");
  };

  const formatTimestamp = (timestamp: number) => {
    const diff = (currentTime - timestamp) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div
      className={`space-y-6 sm:space-y-8 border rounded-3xl sm:rounded-[32px] p-4 sm:p-6 md:p-8 backdrop-blur-3xl relative overflow-hidden group transition-colors duration-300 ${
        isLight
          ? "bg-white border-black/8 shadow-lg shadow-black/5"
          : "bg-white/[0.02] border-white/5"
      }`}
    >
      {/* Animated Grid Lines with Particles */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {/* Horizontal lines */}
        <div
          className={`absolute top-[20%] left-0 w-full h-[1px] ${isLight ? "bg-gradient-to-r from-transparent via-black to-transparent" : "bg-gradient-to-r from-transparent via-primary to-transparent"}`}
        >
          <div
            className={`absolute top-0 left-0 w-2 h-2 rounded-full animate-[slideHorizontal_3s_ease-in-out_infinite] ${isLight ? "bg-black shadow-[0_0_10px_rgba(0,0,0,0.4)]" : "bg-primary shadow-[0_0_10px_rgba(30,144,255,0.8)]"}`}
          />
        </div>
        <div
          className={`absolute top-[50%] left-0 w-full h-[1px] ${isLight ? "bg-gradient-to-r from-transparent via-black to-transparent" : "bg-gradient-to-r from-transparent via-primary to-transparent"}`}
        >
          <div
            className={`absolute top-0 left-0 w-2 h-2 rounded-full animate-[slideHorizontal_4s_ease-in-out_infinite_0.5s] ${isLight ? "bg-black shadow-[0_0_10px_rgba(0,0,0,0.4)]" : "bg-primary shadow-[0_0_10px_rgba(30,144,255,0.8)]"}`}
          />
        </div>
        <div
          className={`absolute top-[80%] left-0 w-full h-[1px] ${isLight ? "bg-gradient-to-r from-transparent via-black to-transparent" : "bg-gradient-to-r from-transparent via-primary to-transparent"}`}
        >
          <div
            className={`absolute top-0 left-0 w-2 h-2 rounded-full animate-[slideHorizontal_3.5s_ease-in-out_infinite_1s] ${isLight ? "bg-black shadow-[0_0_10px_rgba(0,0,0,0.4)]" : "bg-primary shadow-[0_0_10px_rgba(30,144,255,0.8)]"}`}
          />
        </div>

        {/* Vertical lines */}
        <div
          className={`absolute top-0 left-[25%] w-[1px] h-full ${isLight ? "bg-gradient-to-b from-transparent via-black to-transparent" : "bg-gradient-to-b from-transparent via-primary to-transparent"}`}
        >
          <div
            className={`absolute top-0 left-0 w-2 h-2 rounded-full animate-[slideVertical_4s_ease-in-out_infinite] ${isLight ? "bg-black shadow-[0_0_10px_rgba(0,0,0,0.4)]" : "bg-primary shadow-[0_0_10px_rgba(30,144,255,0.8)]"}`}
          />
        </div>
        <div
          className={`absolute top-0 left-[75%] w-[1px] h-full ${isLight ? "bg-gradient-to-b from-transparent via-black to-transparent" : "bg-gradient-to-b from-transparent via-primary to-transparent"}`}
        >
          <div
            className={`absolute top-0 left-0 w-2 h-2 rounded-full animate-[slideVertical_3.5s_ease-in-out_infinite_0.7s] ${isLight ? "bg-black shadow-[0_0_10px_rgba(0,0,0,0.4)]" : "bg-primary shadow-[0_0_10px_rgba(30,144,255,0.8)]"}`}
          />
        </div>
      </div>

      {/* Background Glow */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 blur-[100px] -mr-32 -mt-32 group-hover:bg-primary/10 transition-all duration-1000 ${isLight ? "bg-black/5 group-hover:bg-black/10" : "bg-primary/5"}`}
      />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl border flex items-center justify-center shadow-inner ${isLight ? "bg-black/5 border-black/10" : "bg-white/5 border-white/10"}`}
          >
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 ${isLight ? "text-black/40" : "text-white/40"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
          <div>
            <h3
              className={`text-base sm:text-lg font-black uppercase italic tracking-tighter ${isLight ? "text-gray-900" : "text-white"}`}
            >
              Community Hub
            </h3>
            <p
              className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-0.5 sm:mt-1 ${isLight ? "text-black/30" : "text-white/20"}`}
            >
              Verifiable Discussion Matrix
            </p>
          </div>
        </div>
        <div className="px-2 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg sm:rounded-xl border border-white/5">
          <span className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-widest">
            {marketComments.length}{" "}
            <span className="hidden sm:inline">Discussions</span>
          </span>
        </div>
      </div>

      {/* Input Area */}
      <div className="relative group relative z-10">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={
            isAuthenticated
              ? "Share your forecast analysis..."
              : "Finalize session to join the discussion"
          }
          disabled={!isAuthenticated}
          className={`w-full border rounded-xl sm:rounded-2xl p-4 sm:p-6 text-xs sm:text-sm focus:outline-none focus:border-primary/50 transition-all min-h-[100px] sm:min-h-[120px] resize-none font-orbitron font-medium leading-relaxed ${
            isLight
              ? "bg-black/[0.03] border-black/8 text-gray-900 placeholder:text-black/20 focus:bg-black/[0.05]"
              : "bg-black/40 border-white/5 text-white placeholder:text-white/10 focus:bg-white/[0.04]"
          }`}
        />
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex items-center gap-2 sm:gap-4">
          <p
            className={`hidden sm:block text-[8px] font-black uppercase tracking-widest ${isLight ? "text-black/20" : "text-white/10"}`}
          >
            Supports Markdown
          </p>
          <button
            onClick={handlePostComment}
            disabled={!isAuthenticated || !newComment.trim()}
            className="px-3 sm:px-6 py-2 sm:py-2.5 bg-primary text-white rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:opacity-90 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-[0_10px_30px_rgba(30,144,255,0.3)]"
          >
            <span className="hidden sm:inline">Post Forecast</span>
            <span className="sm:hidden">Post</span>
          </button>
        </div>
      </div>

      {/* Feed Area */}
      <div className="space-y-6 relative z-10">
        {marketComments.map((comment) => (
          <div
            key={comment.id}
            className="group/item flex gap-5 animate-in slide-in-from-bottom duration-500"
          >
            <div className="flex-shrink-0">
              <div
                className={`w-12 h-12 rounded-[20px] border flex items-center justify-center text-lg font-black transition-all duration-300 group-hover/item:border-primary/30 ${
                  isLight
                    ? "bg-black/[0.04] border-black/8 text-black/30"
                    : "bg-gradient-to-br from-white/[0.05] to-white/[0.02] border-white/5 text-white/20"
                }`}
              >
                {comment.userName.charAt(0)}
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] font-black uppercase italic tracking-tighter group-hover/item:text-primary transition-all underline decoration-primary/0 group-hover/item:decoration-primary/40 underline-offset-4 ${isLight ? "text-gray-900" : "text-white"}`}
                  >
                    {comment.userName}
                  </span>
                  {comment.userPosition && (
                    <div className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-lg">
                      <span className="text-[8px] font-black text-primary uppercase tracking-tighter whitespace-nowrap">
                        {comment.userPosition}
                      </span>
                    </div>
                  )}
                  <div
                    className={`w-1 h-1 rounded-full ${isLight ? "bg-black/10" : "bg-white/10"}`}
                  />
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider ${isLight ? "text-black/30" : "text-white/20"}`}
                  >
                    {formatTimestamp(comment.timestamp)}
                  </span>
                </div>
                <button
                  className={`p-2 transition-colors ${isLight ? "text-black/15 hover:text-black" : "text-white/10 hover:text-white"}`}
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
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>

              <p
                className={`text-[13px] font-orbitron font-medium leading-relaxed transition-colors ${isLight ? "text-black/60 group-hover/item:text-black/80" : "text-white/60 group-hover/item:text-white/80"}`}
              >
                {comment.content}
              </p>

              <div className="flex items-center gap-6 pt-2">
                <button
                  className={`flex items-center gap-2 text-[10px] font-black px-3 py-1.5 rounded-xl border transition-all hover:text-danger hover:border-danger/20 ${isLight ? "text-black/30 bg-black/5 border-black/8" : "text-white/20 bg-white/5 border-white/5"}`}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
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
                  {comment.likes || 1}
                </button>
                <button
                  className={`flex items-center gap-2 text-[10px] font-black transition-all hover:text-primary ${isLight ? "text-black/30" : "text-white/20"}`}
                >
                  <svg
                    className="w-3.5 h-3.5"
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
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSystem;
