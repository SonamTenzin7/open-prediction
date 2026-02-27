"use client";

import React from "react";
import CreateMarketForm from "./CreateMarketForm";
import { useMarkets } from "@/lib/store";

interface CreateMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateMarketModal = ({ isOpen, onClose }: CreateMarketModalProps) => {
  const { theme } = useMarkets();
  const isLight = theme === "light";
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto border rounded-3xl sm:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-500 backdrop-blur-3xl ${
          isLight ? "bg-white border-black/8" : "bg-white/[0.02] border-white/5"
        }`}
      >
        {/* Decorative Glow */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="p-4 sm:p-6 md:p-8 relative z-10">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="space-y-1">
              <h2
                className={`text-xl sm:text-2xl font-black uppercase italic tracking-tighter ${isLight ? "text-gray-900" : "text-white"}`}
              >
                Create{" "}
                <span className="text-primary not-italic">New Market</span>
              </h2>
              <p
                className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] ${isLight ? "text-black/40" : "text-white/40"}`}
              >
                Deploy a new forecasting node
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className={`p-3 rounded-2xl transition-all transform hover:rotate-90 duration-500 relative z-50 ${
                isLight
                  ? "bg-black/5 text-black/40 hover:bg-black/10 hover:text-black"
                  : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
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
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <CreateMarketForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};

export default CreateMarketModal;
