import { Category } from "@/lib/store";

export const CATEGORIES: Category[] = [
  "Social Media",
  "Elections",
  "Sports",
  "Crypto",
  "Culture",
  "Economics",
  "Company",
  "Academic",
];

export function getCategoryColor(category: Category) {
  switch (category) {
    case "Crypto": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "Elections": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "Sports": return "bg-green-500/10 text-green-500 border-green-500/20";
    case "Social Media": return "bg-pink-500/10 text-pink-500 border-pink-500/20";
    case "Economics": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    case "Culture": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    case "Company": return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
    case "Academic": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  }
}
