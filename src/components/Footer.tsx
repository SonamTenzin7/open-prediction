"use client";

import React from "react";
import Link from "next/link";
import { useMarkets } from "@/lib/store";

const Footer = () => {
  const { theme } = useMarkets();
  const isLight = theme === "light";

  return (
    <footer
      className={`relative border-t backdrop-blur-3xl pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-10 md:pb-12 overflow-hidden ${isLight ? "border-black/8 bg-white" : "border-white/5 bg-[#121212]"}`}
    >
      {/* Background Decorative Elements */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent to-transparent shadow-[0_0_20px_rgba(30,144,255,0.2)] ${isLight ? "via-primary/20" : "via-primary/30"}`}
      />
      <div
        className={`absolute top-0 left-0 w-full h-full ${isLight ? "bg-[radial-gradient(circle_at_50%_-120%,rgba(30,144,255,0.05),transparent_50%)]" : "bg-[radial-gradient(circle_at_50%_-120%,rgba(30,144,255,0.1),transparent_50%)]"}`}
      />

      <div className="mx-auto max-w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-12 sm:mb-16 md:mb-20">
          {/* Brand/Identity Section */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-[20px] bg-gradient-to-br from-primary to-indigo-800 flex items-center justify-center shadow-[0_10px_30px_rgba(30,144,255,0.4)] transition-transform group-hover:rotate-12 duration-500">
                <span className="text-white font-black text-xl sm:text-2xl">
                  Ω
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-lg sm:text-xl font-black tracking-widest uppercase italic leading-none ${isLight ? "text-gray-900" : "text-white"}`}
                >
                  Open Prediction
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] mt-1 ${isLight ? "text-black/20" : "text-white/20"}`}
                >
                  Universal Oracle
                </span>
              </div>
            </Link>
            <p
              className={`text-[9px] sm:text-[10px] font-black uppercase leading-relaxed max-w-sm tracking-[0.1em] ${isLight ? "text-black/30" : "text-white/30"}`}
            >
              The premier liquidity layer for forecasting future events.
              Decentralized, censorship-resistant, and powered by
              institutional-grade AMMs.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              {[
                {
                  icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z",
                  label: "X",
                },
                {
                  icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.13-1.09-1.43-1.09-1.43-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2.02 1.03-2.73-.1-.26-.45-1.29.1-2.69 0 0 .85-.27 2.75 1.02.8-.22 1.66-.33 2.51-.33.85 0 1.71.11 2.51.33 1.9-1.29 2.75-1.02 2.75-1.02.55 1.4.2 2.43.1 2.69.65.71 1.03 1.62 1.03 2.73 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z",
                  label: "Github",
                },
                {
                  icon: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.077-.01 13.525 13.525 0 0012.274 0 .074.074 0 01.078.01c.12.098.246.196.373.291a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993.023.03.07.039.084.028a19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
                  label: "Discord",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-9 h-9 sm:w-10 sm:h-10 border rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group/social ${isLight ? "bg-black/5 border-black/10" : "bg-white/5 border-white/5"}`}
                >
                  <svg
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/social:text-primary transition-colors ${isLight ? "text-black/40" : "text-white/40"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "Discover",
              links: [
                "Active Markets",
                "Activity Feed",
                "Leaderboard",
                "New Listings",
              ],
            },
            {
              title: "Resources",
              links: [
                "Documentation",
                "API Docs",
                "Protocol Stats",
                "Whitepaper",
              ],
            },
            {
              title: "Governance",
              links: [
                "Proposal List",
                "Snapshot",
                "Community DAO",
                "Audit Reports",
              ],
            },
          ].map((col, i) => (
            <div key={i}>
              <h4
                className={`text-[10px] font-black uppercase tracking-[0.4em] mb-8 ${isLight ? "text-black/40" : "text-white/40"}`}
              >
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href="/"
                      className={`text-[11px] font-black uppercase hover:text-primary transition-all tracking-[0.1em] hover:translate-x-1 inline-block ${isLight ? "text-black/30" : "text-white/30"}`}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Ecosystem Pulse */}
          <div className="lg:col-span-1">
            <h4
              className={`text-[10px] font-black uppercase tracking-[0.4em] mb-8 ${isLight ? "text-black/40" : "text-white/40"}`}
            >
              Ecosystem Pulse
            </h4>
            <div
              className={`border rounded-2xl p-6 space-y-4 shadow-inner ${isLight ? "bg-black/[0.02] border-black/8" : "bg-white/[0.02] border-white/5"}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[9px] font-black uppercase ${isLight ? "text-black/20" : "text-white/20"}`}
                >
                  Network Status
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[9px] font-black text-success uppercase">
                    Operational
                  </span>
                </span>
              </div>
              <div className="space-y-1">
                <p
                  className={`text-[8px] font-black uppercase tracking-widest ${isLight ? "text-black/20" : "text-white/20"}`}
                >
                  Global Volume (24h)
                </p>
                <p
                  className={`text-sm font-black tabular-nums ${isLight ? "text-gray-900" : "text-white"}`}
                >
                  $142,501,230
                </p>
              </div>
              <button className="w-full py-2 bg-primary/10 border border-primary/20 rounded-xl text-[9px] font-black uppercase text-primary hover:bg-primary transition-all hover:text-white">
                View Protocol Stats
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Bottom Section */}
        <div
          className={`pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-8 ${isLight ? "border-black/8" : "border-white/5"}`}
        >
          <div className="flex flex-col gap-2">
            <p
              className={`text-[9px] font-black uppercase tracking-[0.3em] ${isLight ? "text-black/10" : "text-white/10"}`}
            >
              © 2026 Open Prediction Protocol. A Decentralized Oracle Network.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className={`text-[8px] font-black uppercase transition-colors ${isLight ? "text-black/10 hover:text-gray-900" : "text-white/10 hover:text-white"}`}
              >
                Forecasting Disclaimer
              </Link>
              <Link
                href="#"
                className={`text-[8px] font-black uppercase transition-colors ${isLight ? "text-black/10 hover:text-gray-900" : "text-white/10 hover:text-white"}`}
              >
                Security Bounty
              </Link>
            </div>
          </div>
          <div className="flex gap-8">
            <Link
              href="/"
              className={`text-[9px] font-black uppercase hover:text-primary transition-all tracking-[0.2em] ${isLight ? "text-black/40" : "text-white/40"}`}
            >
              Privacy Matrix
            </Link>
            <Link
              href="/"
              className={`text-[9px] font-black uppercase hover:text-primary transition-all tracking-[0.2em] ${isLight ? "text-black/40" : "text-white/40"}`}
            >
              User Agreement
            </Link>
            <div
              className={`px-3 py-1 border rounded-lg ${isLight ? "bg-black/5 border-black/10" : "bg-white/5 border-white/5"}`}
            >
              <span
                className={`text-[8px] font-black tracking-widest uppercase ${isLight ? "text-black/20" : "text-white/20"}`}
              >
                v2.41.0-stable
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Finishing gradient fade */}
      <div
        className={`absolute bottom-0 left-0 w-full h-1 shadow-[0_-5px_30px_rgba(30,144,255,0.4)] ${isLight ? "bg-primary/30" : "bg-primary"}`}
      />
    </footer>
  );
};

export default Footer;
