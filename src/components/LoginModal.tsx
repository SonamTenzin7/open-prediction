"use client";

import React, { useState } from "react";
import { useMarkets } from "@/lib/store";
import BinaryHoverText from "./BinaryHoverText";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login, theme } = useMarkets();
  const isLight = theme === "light";
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleLogin = (method: string) => {
    login(method);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[20px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto border rounded-3xl sm:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-500 backdrop-blur-3xl ${
          isLight ? "bg-white border-black/8" : "bg-white/[0.02] border-white/5"
        }`}
      >
        {/* Decorative Glow */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="p-6 sm:p-8 space-y-6 sm:space-y-8 relative z-10">
          <div className="space-y-2 sm:space-y-3 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-[20px] bg-primary mx-auto flex items-center justify-center shadow-[0_10px_25px_rgba(30,144,255,0.4)] mb-3 sm:mb-4 transition-transform hover:rotate-12 duration-500">
              <span className="text-white font-black text-xl sm:text-2xl">
                Ω
              </span>
            </div>
            <h2
              className={`text-xl sm:text-2xl font-black uppercase tracking-tighter leading-none ${isLight ? "text-gray-900" : "text-white"}`}
            >
              Welcome to <br />
              <span className="text-primary not-italic">the platform</span>
            </h2>
            <p
              className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] ${isLight ? "text-black/40" : "text-white/40"}`}
            >
              The Future of Social Forecasting
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleLogin("Google")}
              className="w-full h-14 flex items-center justify-center gap-3 bg-white text-black rounded-2xl font-black uppercase text-[9px] tracking-[0.2em] hover:bg-neutral-200 transition-all active:scale-[0.98] shadow-xl"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-4 h-4"
              />
              <BinaryHoverText>Continue with Google</BinaryHoverText>
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div
                  className={`w-full border-t ${isLight ? "border-black/8" : "border-white/5"}`}
                ></div>
              </div>
              <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.4em]">
                <span
                  className={`px-4 ${isLight ? "bg-white text-black/20" : "bg-[#121212] text-white/20"}`}
                >
                  identity gateway
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="secure@identity.xyz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full h-14 border rounded-2xl px-6 focus:outline-none focus:border-primary/50 transition-all font-bold text-sm ${
                    isLight
                      ? "bg-black/[0.03] border-black/8 text-gray-900 placeholder:text-black/20 focus:bg-black/[0.05]"
                      : "bg-white/[0.03] border-white/5 text-white placeholder:text-white/10 focus:bg-white/[0.06]"
                  }`}
                />
              </div>
              <button
                onClick={() => handleLogin("Email")}
                disabled={!email}
                className="w-full h-14 bg-primary text-white rounded-2xl font-black uppercase text-[9px] tracking-[0.3em] hover:opacity-90 transition-all shadow-[0_20px_40px_rgba(30,144,255,0.2)] active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <BinaryHoverText>Launch Session</BinaryHoverText>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div className="pt-2 space-y-4">
            <button
              onClick={() => handleLogin("Wallet")}
              className={`w-full h-14 flex items-center justify-center gap-3 border rounded-2xl font-black uppercase text-[9px] tracking-[0.2em] transition-all active:scale-[0.98] ${
                isLight
                  ? "bg-black/[0.02] border-black/8 text-gray-700 hover:bg-black/[0.05] hover:border-black/15"
                  : "bg-white/[0.03] border-white/5 text-white hover:bg-white/[0.08] hover:border-white/10"
              }`}
            >
              <span>
                <BinaryHoverText>Connect Digital Wallet</BinaryHoverText>
              </span>
            </button>
            <p
              className={`text-[8px] text-center font-black uppercase tracking-[0.1em] px-8 leading-relaxed ${isLight ? "text-black/25" : "text-white/20"}`}
            >
              By initializing a session, you agree to our{" "}
              <span
                className={`cursor-pointer transition-colors ${isLight ? "text-black/50 hover:text-black" : "text-white/40 hover:text-white"}`}
              >
                Forecasting Protocol
              </span>{" "}
              &{" "}
              <span
                className={`cursor-pointer transition-colors ${isLight ? "text-black/50 hover:text-black" : "text-white/40 hover:text-white"}`}
              >
                Privacy Matrix
              </span>
              .
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={`absolute top-4 right-4 p-2 transition-all transform hover:rotate-90 duration-300 z-50 ${isLight ? "text-black/20 hover:text-black" : "text-white/20 hover:text-white"}`}
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
      </div>
    </div>
  );
};

export default LoginModal;
