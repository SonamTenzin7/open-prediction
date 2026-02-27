"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getInitialShares } from "./amm";

export type Category = 
  | "Social Media"
  | "Elections"
  | "Sports"
  | "Crypto"
  | "Culture"
  | "Economics"
  | "Company"
  | "Academic";

export interface Market {
  id: string;
  title: string;
  description: string;
  category: Category;
  expiryDate: string;
  yesShares: number;
  noShares: number;
  liquidity: number; // b parameter
  status: "Active" | "Expired" | "Resolved";
  initialProbability: number;
  createdAt: number;
}

export interface Activity {
  id: string;
  userName: string;
  userAvatar?: string;
  action: "bet_yes" | "bet_no" | "create_market" | "resolve_market" | "comment";
  marketId: string;
  marketTitle: string;
  amount?: number;
  userPosition?: string; // e.g. "Holding 5.2k Yes"
  likes: number;
  replies: number;
  timestamp: number;
}

export interface Comment {
  id: string;
  marketId: string;
  userName: string;
  content: string;
  userPosition?: string;
  likes: number;
  timestamp: number;
  replies: Comment[];
}

export interface UserState {
  balance: number;
  positions: {
    [marketId: string]: {
      yes: number;
      no: number;
    };
  };
}

interface MarketContextType {
  markets: Market[];
  activities: Activity[];
  comments: { [marketId: string]: Comment[] };
  user: UserState;
  isAuthenticated: boolean;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  login: (method: string) => void;
  logout: () => void;
  addMarket: (market: Omit<Market, "id" | "yesShares" | "noShares" | "status" | "createdAt">) => void;
  placeBet: (marketId: string, amount: number, isYes: boolean, shares: number) => void;
  addComment: (marketId: string, content: string) => void;
  likeActivity: (activityId: string) => void;
  isLoading: boolean;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

const INITIAL_BALANCE = 1000;
const DEFAULT_LIQUIDITY = 100; // Default B parameter

export function MarketProvider({ children }: { children: ReactNode }) {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [comments, setComments] = useState<{ [marketId: string]: Comment[] }>({});
  const [user, setUser] = useState<UserState>({ balance: INITIAL_BALANCE, positions: {} });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const savedMarkets = localStorage.getItem("open_prediction_markets");
    const savedUser = localStorage.getItem("open_prediction_user");
    const savedAuth = localStorage.getItem("open_prediction_auth");
    const savedActivities = localStorage.getItem("open_prediction_activities");
    const savedComments = localStorage.getItem("open_prediction_comments");

    if (savedMarkets) {
      setMarkets(JSON.parse(savedMarkets));
    } else {
        // Sample Markets
        const marketsToCreate: Omit<Market, "id" | "yesShares" | "noShares" | "status" | "createdAt">[] = [
          {
            title: "Will BTC exceed $80,000 by Dec 31, 2026?",
            description: "Bitcoin price prediction based on year-end 2026 market data.",
            category: "Crypto",
            expiryDate: "2026-12-31",
            initialProbability: 45,
            liquidity: DEFAULT_LIQUIDITY
          },
          {
            title: "Will OpenAI release GPT-5 by December 2025?",
            description: "Anticipated release of the next major iteration of OpenAI's LLM.",
            category: "Company",
            expiryDate: "2025-12-15",
            initialProbability: 65,
            liquidity: DEFAULT_LIQUIDITY
          },
          {
            title: "Will ETH reach $10,000 before July 2026?",
            description: "Ethereum price action following the 2.0 roadmap milestones.",
            category: "Crypto",
            expiryDate: "2026-07-01",
            initialProbability: 30,
            liquidity: DEFAULT_LIQUIDITY
          },
          {
            title: "Will Elon Musk step down as CEO of X (formerly Twitter) by 2026?",
            description: "Corporate leadership prediction for the social media giant.",
            category: "Social Media",
            expiryDate: "2026-01-01",
            initialProbability: 20,
            liquidity: DEFAULT_LIQUIDITY
          },
          {
            title: "Will a commercial fusion plant be operational by 2030?",
            description: "Technological breakthrough in clean energy production.",
            category: "Academic",
            expiryDate: "2030-12-31",
            initialProbability: 15,
            liquidity: DEFAULT_LIQUIDITY
          },
          {
            title: "Will AI-generated content exceed 50% of internet traffic by 2027?",
            description: "The scaling of generative models and their impact on digital media.",
            category: "Culture",
            expiryDate: "2027-12-31",
            initialProbability: 75,
            liquidity: DEFAULT_LIQUIDITY
          },
          {
            title: "Will US Inflation drop below 2% and stay for 6 months in 2026?",
            description: "Macroeconomic outlook based on Fed policy and global trends.",
            category: "Economics",
            expiryDate: "2026-12-01",
            initialProbability: 40,
            liquidity: DEFAULT_LIQUIDITY
          },
          {
            title: "Will Lionel Messi win another Ballon d'Or before retirement?",
            description: "Late-career accolades for the football legend.",
            category: "Sports",
            expiryDate: "2026-12-31",
            initialProbability: 25,
            liquidity: DEFAULT_LIQUIDITY
          },
          {
            title: "Will GTA VI be released before April 2025?",
            description: "Rockstar Games' next highly anticipated blockbuster release.",
            category: "Culture",
            expiryDate: "2025-04-01",
            initialProbability: 55,
            liquidity: DEFAULT_LIQUIDITY
          }
        ];

        const initialMarkets: Market[] = marketsToCreate.map((m, idx) => {
          const shares = getInitialShares(m.initialProbability / 100, m.liquidity);
          return {
            ...m,
            id: (idx + 1).toString(),
            yesShares: shares.yes,
            noShares: shares.no,
            status: "Active",
            createdAt: Date.now()
          };
        });

        setMarkets(initialMarkets);

        // Initial Activities
        const initialActivities: Activity[] = initialMarkets.map(m => ({
          id: Math.random().toString(36).substr(2, 9),
          userName: "System",
          action: "create_market",
          marketId: m.id,
          marketTitle: m.title,
          likes: 0,
          replies: 0,
          timestamp: m.createdAt,
        }));
        setActivities(initialActivities);

        // Initial Comments
        setComments({
          "1": [
            {
              id: "c1",
              marketId: "1",
              userName: "QuantWhale",
              content: "Bullish on BTC. The institutional inflows are too strong to ignore. Dec 2026 is plenty of time for 80k.",
              userPosition: "Holding 12k Yes",
              likes: 12,
              timestamp: Date.now() - 1000 * 60 * 60,
              replies: []
            },
            {
              id: "c2",
              marketId: "1",
              userName: "MacroBear",
              content: "Don't underestimate the regulatory headwinds. 80k is possible but not certain.",
              userPosition: "Holding 2k No",
              likes: 4,
              timestamp: Date.now() - 1000 * 60 * 30,
              replies: []
            }
          ]
        });
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }

    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }

    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }

    const savedTheme = localStorage.getItem("open_prediction_theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }

    setIsLoading(false);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("open_prediction_markets", JSON.stringify(markets));
      localStorage.setItem("open_prediction_user", JSON.stringify(user));
      localStorage.setItem("open_prediction_auth", isAuthenticated.toString());
      localStorage.setItem("open_prediction_activities", JSON.stringify(activities));
      localStorage.setItem("open_prediction_comments", JSON.stringify(comments));
    }
  }, [markets, user, isAuthenticated, activities, comments, isLoading]);

  const login = (method: string) => {
    // Mock login logic
    console.log(`Logged in using ${method}`);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("open_prediction_theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const addMarket = (newMarketData: Omit<Market, "id" | "yesShares" | "noShares" | "status" | "createdAt">) => {
    const initialShares = getInitialShares(newMarketData.initialProbability / 100, newMarketData.liquidity || DEFAULT_LIQUIDITY);
    const newMarket: Market = {
      ...newMarketData,
      id: Math.random().toString(36).substr(2, 9),
      yesShares: initialShares.yes,
      noShares: initialShares.no,
      status: "Active",
      createdAt: Date.now(),
    };
    setMarkets((prev) => [newMarket, ...prev]);

    // Log activity
    const activity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      userName: "You",
      action: "create_market",
      marketId: newMarket.id,
      marketTitle: newMarketData.title,
      likes: 0,
      replies: 0,
      timestamp: Date.now(),
    };
    setActivities((prev) => [activity, ...prev]);
  };

  const placeBet = (marketId: string, amount: number, isYes: boolean, shares: number) => {
    if (!isAuthenticated || user.balance < amount) return;

    setMarkets((prev) =>
      prev.map((m) => {
        if (m.id === marketId) {
          return {
            ...m,
            yesShares: isYes ? m.yesShares + shares : m.yesShares,
            noShares: isYes ? m.noShares : m.noShares + shares,
          };
        }
        return m;
      })
    );

    setUser((prev) => {
      const currentPos = prev.positions[marketId] || { yes: 0, no: 0 };
      return {
        ...prev,
        balance: prev.balance - amount,
        positions: {
          ...prev.positions,
          [marketId]: {
            ...currentPos,
            yes: isYes ? currentPos.yes + shares : currentPos.yes,
            no: isYes ? currentPos.no : currentPos.no + shares,
          },
        },
      };
    });

    // Log activity
    const market = markets.find(m => m.id === marketId);
    const sharesNum = Math.floor(shares);
    const activity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      userName: "You",
      action: isYes ? "bet_yes" : "bet_no",
      marketId,
      marketTitle: market?.title || "Unknown Market",
      amount: amount,
      userPosition: `Holding ${sharesNum.toLocaleString()} ${isYes ? 'Yes' : 'No'}`,
      likes: 0,
      replies: 0,
      timestamp: Date.now(),
    };
    setActivities((prev) => [activity, ...prev].slice(0, 50)); 
  };

  const addComment = (marketId: string, content: string) => {
    if (!isAuthenticated) return;

    const market = markets.find(m => m.id === marketId);
    const userPos = user.positions[marketId];
    let positionText = undefined;
    if (userPos) {
      const posShares = userPos.yes > userPos.no ? userPos.yes : userPos.no;
      const type = userPos.yes > userPos.no ? "Yes" : "No";
      if (posShares > 0) positionText = `Holding ${Math.floor(posShares).toLocaleString()} ${type}`;
    }

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      marketId,
      userName: "You",
      content,
      userPosition: positionText,
      likes: 0,
      timestamp: Date.now(),
      replies: []
    };

    setComments(prev => ({
      ...prev,
      [marketId]: [newComment, ...(prev[marketId] || [])]
    }));

    // Log activity
    const activity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      userName: "You",
      action: "comment",
      marketId,
      marketTitle: market?.title || "Unknown Market",
      userPosition: positionText,
      likes: 0,
      replies: 0,
      timestamp: Date.now(),
    };
    setActivities((prev) => [activity, ...prev].slice(0, 50));
  };

  const likeActivity = (activityId: string) => {
    setActivities(prev => prev.map(a => 
      a.id === activityId ? { ...a, likes: a.likes + 1 } : a
    ));
  };

  return (
    <MarketContext.Provider value={{ 
      markets, 
      activities, 
      comments,
      user, 
      isAuthenticated, 
      selectedCategory, 
      setSelectedCategory, 
      theme, 
      toggleTheme, 
      login, 
      logout, 
      addMarket, 
      placeBet, 
      addComment,
      likeActivity,
      isLoading 
    }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarkets() {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error("useMarkets must be used within a MarketProvider");
  }
  return context;
}
