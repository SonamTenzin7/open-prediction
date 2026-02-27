"use client";

import React, { useState } from "react";
import { useMarkets } from "@/lib/store";
import LoginModal from "./LoginModal";
import CreateMarketModal from "./CreateMarketModal";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import BinaryHoverText from "./BinaryHoverText";

const Navbar = () => {
  const {
    user,
    isLoading,
    isAuthenticated,
    selectedCategory,
    setSelectedCategory,
    theme,
    toggleTheme,
    logout,
    markets,
  } = useMarkets();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showTrending, setShowTrending] = useState(false);
  const [showMyActivity, setShowMyActivity] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {/* Main Navbar */}
        <div
          className={`border-b backdrop-blur-3xl overflow-hidden relative transition-colors duration-300 ${
            theme === "light"
              ? "border-black/8 bg-white/70"
              : "border-white/5 bg-black/40"
          }`}
        >
          {/* Animated accent line */}
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

          <div className="mx-auto max-w-full px-4 sm:px-8 lg:px-12">
            <div className="flex h-20 items-center justify-between gap-2 sm:gap-4 md:gap-8">
              {/* Logo Section */}
              <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-shrink-0 relative group">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all transform hover:rotate-90 duration-500 ${
                    theme === "light"
                      ? "bg-black/5 hover:bg-black/10 text-black/40 hover:text-black"
                      : "bg-white/5 hover:bg-white/10 text-white/40 hover:text-white"
                  }`}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <Link
                  href="/"
                  className="flex items-center gap-2 sm:gap-3 group/logo"
                  onClick={() => setSelectedCategory(null)}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-indigo-800 flex items-center justify-center shadow-[0_10px_30px_rgba(30,144,255,0.4)] transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-[360deg]">
                    <span className="text-white font-black text-lg sm:text-xl">
                      Ω
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-sm sm:text-base md:text-lg font-black tracking-widest leading-none ${theme === "light" ? "text-gray-900" : "text-white"}`}
                    >
                      <BinaryHoverText>Open Prediction</BinaryHoverText>
                    </span>
                    <span
                      className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] leading-none mt-1 group-hover/logo:text-primary transition-colors ${theme === "light" ? "text-black/30" : "text-white/20"}`}
                    >
                      Forecasting
                    </span>
                  </div>
                </Link>
              </div>

              {/* Search Bar - High Density Layout */}
              <div className="flex-1 max-w-2xl hidden md:block group/search">
                <div className="relative">
                  <div
                    className={`absolute inset-y-0 left-5 flex items-center pointer-events-none group-focus-within/search:text-primary transition-colors ${theme === "light" ? "text-black/20" : "text-white/10"}`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search events, tokens, or protocol metrics..."
                    className={`w-full border rounded-2xl py-4 pl-14 pr-6 text-sm font-bold placeholder:font-medium focus:outline-none transition-all duration-500 ${
                      theme === "light"
                        ? "bg-black/[0.04] border-black/8 text-gray-900 placeholder:text-black/25 focus:border-primary/50 focus:bg-black/[0.07] hover:bg-black/[0.06]"
                        : "bg-white/[0.02] border-white/5 text-white placeholder:text-white/10 focus:border-primary/50 focus:bg-white/[0.04] group-hover/search:bg-white/[0.04]"
                    }`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black px-2 py-1 rounded-md border ${theme === "light" ? "text-black/20 bg-black/5 border-black/8" : "text-white/5 bg-white/5 border-white/5"}`}
                    >
                      ⌘K
                    </span>
                  </div>
                </div>
              </div>

              {/* Auth section */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  title={
                    theme === "dark"
                      ? "Switch to Light Mode"
                      : "Switch to Dark Mode"
                  }
                  className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all duration-300 group flex items-center justify-center ${
                    theme === "light"
                      ? "bg-black/5 hover:bg-black/10 border-black/8 hover:border-black/15 text-black/40 hover:text-black"
                      : "bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10 text-white/40 hover:text-white"
                  }`}
                >
                  {theme === "dark" ? (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:text-warning transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:text-primary transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </button>
                {!isLoading && isAuthenticated ? (
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div
                      className={`hidden sm:flex items-center gap-3 md:gap-5 px-3 md:px-5 py-2 md:py-3 border rounded-xl md:rounded-2xl backdrop-blur-xl group transition-all hover:border-primary/20 ${
                        theme === "light"
                          ? "bg-black/[0.04] border-black/8"
                          : "bg-white/[0.02] border-white/5"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span
                          className={`text-[8px] font-black uppercase tracking-[0.2em] ${theme === "light" ? "text-black/30" : "text-white/20"}`}
                        >
                          Balance
                        </span>
                        <span
                          className={`text-xs md:text-sm font-black tracking-tight ${theme === "light" ? "text-gray-900" : "text-white"}`}
                        >
                          $
                          {user.balance.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_12px_rgba(34,197,94,0.8)] animate-pulse" />
                    </div>
                    <button
                      onClick={() => setIsCreateOpen(true)}
                      className="px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-xl md:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] shadow-[0_15px_35px_rgba(30,144,255,0.2)] hover:shadow-[0_20px_40px_rgba(30,144,255,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-95"
                    >
                      <BinaryHoverText>Create</BinaryHoverText>
                    </button>
                    <button
                      onClick={logout}
                      className={`hidden md:block px-4 md:px-5 py-2 md:py-3 border border-transparent rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 ${
                        theme === "light"
                          ? "hover:bg-black/5 hover:border-black/8 text-black/30 hover:text-black"
                          : "hover:bg-white/5 hover:border-white/5 text-white/20 hover:text-white"
                      }`}
                    >
                      <BinaryHoverText>Disconnect</BinaryHoverText>
                    </button>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className={`px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all outline-none ${
                        theme === "light"
                          ? "text-black/40 hover:text-black"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      <BinaryHoverText>Access</BinaryHoverText>
                    </button>
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="bg-primary text-white px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-[0_15px_35px_rgba(30,144,255,0.2)] active:scale-95 whitespace-nowrap"
                    >
                      <BinaryHoverText>Initialize Session</BinaryHoverText>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Categories Navbar - Centered and High Density */}
        <div
          className={`border-b backdrop-blur-2xl overflow-x-auto no-scrollbar transition-colors duration-300 ${
            theme === "light"
              ? "bg-white/60 border-black/8"
              : "bg-white/[0.01] border-white/5"
          }`}
        >
          <div className="mx-auto max-w-full px-4 sm:px-8 lg:px-12">
            <div className="flex h-12 items-center justify-start lg:justify-center gap-4 sm:gap-6 md:gap-10">
              {/* Trending Button */}
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all border-b-2 py-3.5 flex-shrink-0 flex items-center gap-1.5 ${
                  !selectedCategory
                    ? "text-primary border-primary drop-shadow-[0_0_8px_rgba(30,144,255,0.5)]"
                    : theme === "light"
                      ? "text-black/30 border-transparent hover:text-black/60"
                      : "text-white/20 border-transparent hover:text-white/60"
                }`}
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <BinaryHoverText>Trending</BinaryHoverText>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all border-b-2 py-3.5 flex-shrink-0 ${
                    selectedCategory === cat
                      ? "text-primary border-primary drop-shadow-[0_0_8px_rgba(30,144,255,0.5)]"
                      : theme === "light"
                        ? "text-black/30 border-transparent hover:text-black/60"
                        : "text-white/20 border-transparent hover:text-white/60"
                  }`}
                >
                  <BinaryHoverText>{cat}</BinaryHoverText>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-[70] w-72 border-r shadow-2xl transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} ${
          theme === "light"
            ? "bg-white border-black/8"
            : "bg-black border-white/5"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">Ω</span>
              </div>
              <span
                className={`text-lg font-black tracking-tighter uppercase ${theme === "light" ? "text-gray-900" : "text-white"}`}
              >
                Menu
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className={`p-2 rounded-lg transition-colors ${
                theme === "light"
                  ? "hover:bg-black/5 text-black/40 hover:text-black"
                  : "hover:bg-white/5 text-white/40 hover:text-white"
              }`}
            >
              <svg
                className="w-5 h-5"
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
          </div>

          <div className="space-y-1">
            {!isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsSidebarOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold bg-primary text-white hover:opacity-90 transition-all flex items-center gap-3 group"
                >
                  <svg
                    className="w-5 h-5 text-white/80 group-hover:text-white transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <BinaryHoverText>Initialize Session</BinaryHoverText>
                </button>
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 group border ${
                    theme === "light"
                      ? "text-black/60 hover:text-black hover:bg-black/5 border-black/10"
                      : "text-white/60 hover:text-white hover:bg-white/5 border-white/10"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 group-hover:text-primary transition-colors ${theme === "light" ? "text-black/20" : "text-white/20"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  <BinaryHoverText>Access</BinaryHoverText>
                </button>
                <div
                  className={`border-b my-4 ${theme === "light" ? "border-black/8" : "border-white/5"}`}
                />
              </>
            )}
            <button
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 group ${
                theme === "light"
                  ? "text-black/60 hover:text-black hover:bg-black/5"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg
                className={`w-5 h-5 group-hover:text-primary transition-colors ${theme === "light" ? "text-black/20" : "text-white/20"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Profile
            </button>
            <button
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 group ${
                theme === "light"
                  ? "text-black/60 hover:text-black hover:bg-black/5"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg
                className={`w-5 h-5 group-hover:text-primary transition-colors ${theme === "light" ? "text-black/20" : "text-white/20"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Wallet
            </button>
            {isAuthenticated && (
              <button
                onClick={() => {
                  setShowMyActivity(!showMyActivity);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 group ${
                  theme === "light"
                    ? "text-black/60 hover:text-black hover:bg-black/5"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <svg
                  className={`w-5 h-5 group-hover:text-primary transition-colors ${theme === "light" ? "text-black/20" : "text-white/20"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <BinaryHoverText>My Activity</BinaryHoverText>
              </button>
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsCreateOpen(true);
                  setIsSidebarOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-primary hover:text-primary hover:bg-primary/10 transition-all flex items-center gap-3 group"
              >
                <svg
                  className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <BinaryHoverText>Create Market</BinaryHoverText>
              </button>
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 group border-t mt-4 pt-4 ${
                  theme === "light"
                    ? "text-secondary hover:text-secondary hover:bg-secondary/5 border-black/8"
                    : "text-secondary hover:text-secondary hover:bg-secondary/10 border-white/5"
                }`}
              >
                <svg
                  className="w-5 h-5 text-secondary/60 group-hover:text-secondary transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <BinaryHoverText>Disconnect</BinaryHoverText>
              </button>
            )}
            <button
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 group border-t mt-4 pt-4 ${
                theme === "light"
                  ? "text-black/60 hover:text-black hover:bg-black/5 border-black/8"
                  : "text-white/60 hover:text-white hover:bg-white/5 border-white/5"
              }`}
            >
              <svg
                className={`w-5 h-5 group-hover:text-primary transition-colors ${theme === "light" ? "text-black/20" : "text-white/20"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </button>
          </div>

          <div
            className={`mt-auto pt-6 border-t ${theme === "light" ? "border-black/8" : "border-white/5"}`}
          >
            <div
              className={`flex items-center justify-between px-4 py-3 rounded-2xl ${theme === "light" ? "bg-black/5" : "bg-white/5"}`}
            >
              <span
                className={`text-xs font-black uppercase ${theme === "light" ? "text-black/50" : "text-white/60"}`}
              >
                Theme
              </span>
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all group ${
                  theme === "light"
                    ? "bg-black/5 hover:bg-black/10"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {theme === "dark" ? (
                  <>
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
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                    <span className="text-[10px] font-black uppercase text-white tracking-widest">
                      Dark
                    </span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 text-warning"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="text-[10px] font-black uppercase text-black/70 tracking-widest">
                      Light
                    </span>
                  </>
                )}
              </button>
            </div>

            <button className="w-full mt-4 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-secondary hover:bg-secondary/10 transition-all text-center border border-secondary/20">
              Support
            </button>
          </div>
        </div>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <CreateMarketModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {/* Trending Dropdown Panel */}
      {showTrending && (
        <>
          <div
            className="fixed inset-0 z-[45] bg-black/20 backdrop-blur-sm"
            onClick={() => setShowTrending(false)}
          />
          <div
            className={`fixed top-20 right-4 z-[46] w-[400px] max-h-[600px] border rounded-2xl shadow-2xl overflow-hidden ${
              theme === "light"
                ? "bg-white border-black/8"
                : "bg-black/95 border-white/10"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <h3
                    className={`text-lg font-black uppercase tracking-wider ${theme === "light" ? "text-gray-900" : "text-white"}`}
                  >
                    Trending
                  </h3>
                </div>
                <button
                  onClick={() => setShowTrending(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "light"
                      ? "hover:bg-black/5 text-black/40"
                      : "hover:bg-white/5 text-white/40"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
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
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[500px]">
                {/* Community Feed Component will be used here */}
                <div
                  className={`text-center py-8 ${theme === "light" ? "text-black/40" : "text-white/40"}`}
                >
                  <p className="text-sm font-medium">
                    Global activity feed will appear here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* My Activity Dropdown Panel */}
      {showMyActivity && isAuthenticated && (
        <>
          <div
            className="fixed inset-0 z-[45] bg-black/20 backdrop-blur-sm"
            onClick={() => setShowMyActivity(false)}
          />
          <div
            className={`fixed top-20 right-4 z-[46] w-[400px] max-h-[600px] border rounded-2xl shadow-2xl overflow-hidden ${
              theme === "light"
                ? "bg-white border-black/8"
                : "bg-black/95 border-white/10"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <h3
                    className={`text-lg font-black uppercase tracking-wider ${theme === "light" ? "text-gray-900" : "text-white"}`}
                  >
                    My Activity
                  </h3>
                </div>
                <button
                  onClick={() => setShowMyActivity(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "light"
                      ? "hover:bg-black/5 text-black/40"
                      : "hover:bg-white/5 text-white/40"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
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
              </div>

              <div className="space-y-4 overflow-y-auto max-h-[500px]">
                {/* User's Transaction History */}
                <div className="space-y-3">
                  <div
                    className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${theme === "light" ? "text-black/40" : "text-white/40"}`}
                  >
                    Recent Transactions
                  </div>

                  {Object.keys(user.positions).length > 0 ? (
                    Object.entries(user.positions).map(
                      ([marketId, position]) => {
                        const market = markets.find((m) => m.id === marketId);
                        if (!market) return null;

                        return (
                          <Link
                            key={marketId}
                            href={`/market/${marketId}`}
                            onClick={() => setShowMyActivity(false)}
                            className={`block p-4 rounded-xl border transition-all hover:border-primary/40 ${
                              theme === "light"
                                ? "bg-black/[0.02] border-black/8 hover:bg-black/5"
                                : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h4
                                  className={`text-sm font-black mb-2 line-clamp-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}
                                >
                                  {market.title}
                                </h4>
                                <div className="flex items-center gap-3">
                                  {position.yes > 0 && (
                                    <div className="flex items-center gap-1">
                                      <span className="text-xs font-black text-primary">
                                        {position.yes.toFixed(1)}
                                      </span>
                                      <span
                                        className={`text-[9px] font-black uppercase ${theme === "light" ? "text-black/30" : "text-white/20"}`}
                                      >
                                        Yes
                                      </span>
                                    </div>
                                  )}
                                  {position.no > 0 && (
                                    <div className="flex items-center gap-1">
                                      <span className="text-xs font-black text-secondary">
                                        {position.no.toFixed(1)}
                                      </span>
                                      <span
                                        className={`text-[9px] font-black uppercase ${theme === "light" ? "text-black/30" : "text-white/20"}`}
                                      >
                                        No
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <svg
                                className={`w-4 h-4 flex-shrink-0 ${theme === "light" ? "text-black/20" : "text-white/20"}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </Link>
                        );
                      },
                    )
                  ) : (
                    <div
                      className={`text-center py-8 ${theme === "light" ? "text-black/40" : "text-white/40"}`}
                    >
                      <p className="text-sm font-medium">
                        No active positions yet
                      </p>
                      <p className="text-xs mt-1">
                        Start trading to see your activity here
                      </p>
                    </div>
                  )}
                </div>

                {/* Account Summary */}
                <div
                  className={`p-4 rounded-xl border mt-4 ${
                    theme === "light"
                      ? "bg-primary/5 border-primary/20"
                      : "bg-primary/10 border-primary/20"
                  }`}
                >
                  <div
                    className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${theme === "light" ? "text-black/40" : "text-white/40"}`}
                  >
                    Account Balance
                  </div>
                  <div
                    className={`text-2xl font-black ${theme === "light" ? "text-gray-900" : "text-white"}`}
                  >
                    $
                    {user.balance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
