"use client";

import { KingDisplay } from "@/components/king-display";
import { FeesTracker } from "@/components/fees-tracker";
import { Leaderboard } from "@/components/leaderboard";
import { HowToPlay } from "@/components/how-to-play";
import { RecentBuysTicker } from "@/components/recent-buys-ticker";
import { useEffect, useState } from "react";

function formatEthers(weiStr: string, decimals = 18): number {
  if (!weiStr) return 0;
  return Number(BigInt(weiStr)) / Math.pow(10, decimals);
}

const mockRecentBuys = [
  {
    address: "0xf1234567890abcdef1234567890abcdef123456",
    amount: 250000,
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    address: "0xa9876543210fedcba9876543210fedcba987654",
    amount: 150000,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    address: "0xb2468013579bdf2468013579bdf2468013579b",
    amount: 500000,
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
  },
  {
    address: "0xc1357924680ace1357924680ace1357924680a",
    amount: 75000,
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
  },
  {
    address: "0xd8642097531fdb8642097531fdb8642097531f",
    amount: 320000,
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    address: "0xe9753186420eca9753186420eca9753186420e",
    amount: 180000,
    timestamp: new Date(Date.now() - 1000 * 60 * 32),
  },
];

export default function KingOfTheHillPage() {
  // ==========================================
  // CONFIGURATION (TO UPDATE FOR THE NEW TOKEN)
  // ==========================================
  const TOKEN_ADDRESS = "0xE2aC5e46c52707Bd8dF75de30172c588aBB24b07";
  const POOL_ADDRESS = "0x498581fF718922c3f8e6A244956aF099B2652b2b";
  const KING_CONTRACT_ADDRESS = "0x8784e630ED38ed96a723894c6c588fE6eC0AE6E6"; // REMIX CONTRACT
  const TWITTER_LINK = "https://twitter.com/your_twitter"; // UPDATE THIS
  // ==========================================

  const [king, setKing] = useState<any>({
    address: "Loading...",
    tokenAmount: 0,
    usdValue: 0,
    reignStarted: new Date()
  });
  
  const [fees, setFees] = useState<any>({
    totalFeesEth: 0,
    totalFeesUsd: 0,
    kingRewardEth: 0,
    kingRewardUsd: 0,
    buybackEth: 0,
    buybackUsd: 0,
    totalBurned: 0,
  });

  const [holders, setHolders] = useState<any[]>([]);
  const [tokensNeededForKing, setTokensNeededForKing] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const t = Date.now();
        const [kingRes, feesRes, leaderboardRes, dexRes, historyRes] = await Promise.all([
          fetch(`https://king-backend-1d6o.onrender.com/king?t=${t}`).then(r => r.json()),
          fetch(`https://king-backend-1d6o.onrender.com/fees?t=${t}`).then(r => r.json()),
          fetch(`https://king-backend-1d6o.onrender.com/leaderboard?t=${t}`).then(r => r.json()),
          fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`).then(r => r.json()).catch(() => null),
          fetch(`https://king-backend-1d6o.onrender.com/history?t=${t}`).then(r => r.json())
        ]);

        let tokenPriceUsd = 0.0000001; // fallback
        if (dexRes && dexRes.pairs && dexRes.pairs.length > 0) {
          tokenPriceUsd = parseFloat(dexRes.pairs[0].priceUsd);
        }

        // Get actual start time from history (first item since it's reversed)
        let reignStartDate = new Date();
        if (historyRes && historyRes.length > 0 && historyRes[0].start_time) {
            reignStartDate = new Date(historyRes[0].start_time * 1000);
        }

        const formattedKingBalance = formatEthers(kingRes.balance);
        setKing({
          address: kingRes.currentKing || "No King Yet",
          tokenAmount: formattedKingBalance,
          usdValue: formattedKingBalance * tokenPriceUsd,
          reignStarted: reignStartDate
        });

        const totalFees = formatEthers(feesRes.totalFees);
        const kingShare = formatEthers(feesRes.kingShare);
        const burnShare = formatEthers(feesRes.burnShare);
        
        setFees({
          totalFeesEth: totalFees,
          totalFeesUsd: totalFees * 3000, // Mock ETH price
          kingRewardEth: kingShare,
          kingRewardUsd: kingShare * 3000,
          buybackEth: burnShare,
          buybackUsd: burnShare * 3000,
          totalBurned: formatEthers(feesRes.totalBurned)
        });

        const totalSupply = 100_000_000_000; // Updated to 100 Billion
        
        // Filter out the Uniswap Pool address from the leaderboard to only show real players
        const realHolders = leaderboardRes.filter((h: any) => h.address.toLowerCase() !== POOL_ADDRESS.toLowerCase());

        const formattedHolders = realHolders.map((h: any, i: number) => {
          const amount = formatEthers(h.balance);
          return {
            rank: i + 1,
            address: h.address,
            amount: amount,
            percentSupply: (amount / totalSupply) * 100,
            isKing: h.address === kingRes.currentKing
          };
        });
        setHolders(formattedHolders);

        if (formattedHolders.length > 0) {
          setTokensNeededForKing(formattedHolders[0].amount + 1);
        } else {
          setTokensNeededForKing(0);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <header className="py-4 border-b border-border/50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👑</span>
            <span className="font-bold text-lg text-gold">KING</span>
          </div>
          <nav className="flex items-center gap-4">
            <a
              href={`https://basescan.org/address/${KING_CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contract
            </a>
            <a
              href={TWITTER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://clanker.world/clanker/${TOKEN_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold rounded-full hover:scale-105 transition-transform"
            >
              BUY TOKEN
            </a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4">
        {/* King Display */}
        <KingDisplay king={king} />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-4" />

        {/* Fees Tracker */}
        <FeesTracker fees={fees} />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-4" />

        {/* Leaderboard */}
        <Leaderboard
          holders={holders}
          tokensNeededForKing={tokensNeededForKing}
        />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-4" />

        {/* How to Play */}
        <HowToPlay />
      </div>
    </main>
  );
}
