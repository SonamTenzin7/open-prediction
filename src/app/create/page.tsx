"use client";

import React from "react";
import CreateMarketForm from "@/components/CreateMarketForm";
import Link from "next/link";

export default function CreatePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10">
      <div className="space-y-4 text-center">
         <Link href="/" className="text-xs font-bold text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em] mb-4 inline-block">
           ← Go Back
         </Link>
         <h1 className="text-5xl font-bold tracking-tight text-white italic">Create a Market.</h1>
         <p className="text-lg text-white/40">Launch your own prediction market and harness collective intelligence.</p>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden backdrop-blur-3xl">
         {/* Subtle decoration */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full -mr-20 -mt-20" />
         
         <CreateMarketForm />
      </div>
    </div>
  );
}
