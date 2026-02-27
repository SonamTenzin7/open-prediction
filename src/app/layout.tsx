import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { MarketProvider } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FuturisticBackground from "@/components/FuturisticBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Open Prediction | Decentralized Forecasting",
  description: "A functional prototype of a prediction market platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Prevent flash of wrong theme by reading localStorage before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('open_prediction_theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} font-orbitron bg-[var(--background)] text-[var(--text-main)] antialiased selection:bg-indigo-500/30 transition-colors duration-300 overflow-x-hidden`}
      >
        <MarketProvider>
          <div className="relative min-h-screen flex flex-col">
            <div className="fixed inset-0 z-[-1]">
              <FuturisticBackground />
            </div>

            {/* Background overlay that extends beyond viewport */}
            <div className="fixed inset-0 bg-[var(--background)] z-[-2]" />

            {/* Ambient accent — subtle, low-cost */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-primary/8 blur-[100px] rounded-full pointer-events-none z-0" />

            <Navbar />
            <main className="pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto relative z-10 flex-1 w-full">
              {children}
            </main>
            <Footer />
          </div>
        </MarketProvider>
      </body>
    </html>
  );
}
