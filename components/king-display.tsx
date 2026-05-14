"use client";

import { motion } from "framer-motion";
import { Crown } from "./crown";
import { AnimatedNumber } from "./animated-number";
import { Card } from "@/components/ui/card";

interface KingData {
  address: string;
  tokenAmount: number;
  usdValue: number;
  reignStarted: Date;
}

export function KingDisplay({ king }: { king: KingData }) {
  const shortenAddress = (addr: string) => {
    if (addr === "No King Yet" || addr.length < 12) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getTimeSinceReign = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    return `${hours}h ${minutes}m`;
  };

  return (
    <section className="relative py-12 md:py-20">
      {/* Animated background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gold/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Crown */}
        <Crown className="w-32 h-24 md:w-48 md:h-36" />

        {/* Title */}
        <motion.h1
          className="text-2xl md:text-4xl font-bold text-gold tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          👑 CURRENT KING
        </motion.h1>

        {/* King Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card/80 backdrop-blur-sm border-gold/30 p-6 md:p-8 min-w-[300px] md:min-w-[400px]">
            <div className="flex flex-col items-center gap-4">
              {/* Wallet Address */}
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-sm md:text-base text-foreground">
                  {shortenAddress(king.address)}
                </span>
              </div>

              {/* Position Size */}
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Position Size</p>
                <p className="text-3xl md:text-5xl font-bold text-gold">
                  <AnimatedNumber
                    value={king.tokenAmount}
                    decimals={0}
                    suffix=" KING"
                  />
                </p>
                <p className="text-lg md:text-xl text-muted-foreground mt-1">
                  <AnimatedNumber
                    value={king.usdValue}
                    decimals={2}
                    prefix="$"
                  />
                </p>
              </div>

              {/* Reign Duration */}
              <div className="flex items-center gap-2 text-purple">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm md:text-base">
                  Reign since: {getTimeSinceReign(king.reignStarted)}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
