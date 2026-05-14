"use client";

import { motion } from "framer-motion";

interface Buy {
  address: string;
  amount: number;
  timestamp: Date;
}

export function RecentBuysTicker({ buys }: { buys: Buy[] }) {
  const shortenAddress = (addr: string) =>
    `${addr.slice(0, 4)}...${addr.slice(-4)}`;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  // Duplicate the buys array for seamless looping
  const duplicatedBuys = [...buys, ...buys];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border py-2 overflow-hidden z-50">
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicatedBuys.map((buy, index) => (
          <div
            key={`${buy.address}-${index}`}
            className="flex items-center gap-2 text-sm"
          >
            <span className="text-green-500">●</span>
            <span className="font-mono text-muted-foreground">
              {shortenAddress(buy.address)}
            </span>
            <span className="text-foreground font-semibold">
              bought {buy.amount.toLocaleString()} KING
            </span>
            <span className="text-muted-foreground text-xs">
              {formatTime(buy.timestamp)}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
