"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "./animated-number";
import { Card } from "@/components/ui/card";

interface Holder {
  rank: number;
  address: string;
  amount: number;
  percentSupply: number;
  isKing: boolean;
}

interface LeaderboardProps {
  holders: Holder[];
  tokensNeededForKing: number;
}

export function Leaderboard({ holders, tokensNeededForKing }: LeaderboardProps) {
  const shortenAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <section className="py-8 md:py-12">
      <motion.h2
        className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Top Holders
      </motion.h2>

      <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-secondary/30 text-xs md:text-sm text-muted-foreground font-medium">
          <div className="col-span-2">Rank</div>
          <div className="col-span-4">Wallet</div>
          <div className="col-span-3 text-right">Holdings</div>
          <div className="col-span-3 text-right">% Supply</div>
        </div>

        {/* Rows */}
        {holders.map((holder, index) => (
          <motion.div
            key={holder.address}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`grid grid-cols-12 gap-2 px-4 py-3 border-t border-border/50 items-center ${
              holder.isKing
                ? "bg-gold/10 border-l-2 border-l-gold"
                : ""
            }`}
          >
            {/* Rank */}
            <div className="col-span-2 flex items-center gap-1">
              {holder.isKing ? (
                <span className="text-lg">👑</span>
              ) : (
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    holder.rank === 2
                      ? "bg-gray-300 text-gray-800"
                      : holder.rank === 3
                      ? "bg-amber-700 text-white"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {holder.rank}
                </span>
              )}
            </div>

            {/* Wallet */}
            <div className="col-span-4">
              <span
                className={`font-mono text-xs md:text-sm ${
                  holder.isKing ? "text-gold" : "text-foreground"
                }`}
              >
                {shortenAddress(holder.address)}
              </span>
            </div>

            {/* Holdings */}
            <div className="col-span-3 text-right">
              <span
                className={`text-xs md:text-sm font-semibold ${
                  holder.isKing ? "text-gold" : "text-foreground"
                }`}
              >
                <AnimatedNumber value={holder.amount} decimals={0} />
              </span>
            </div>

            {/* % Supply */}
            <div className="col-span-3 text-right">
              <span
                className={`text-xs md:text-sm ${
                  holder.isKing ? "text-gold" : "text-muted-foreground"
                }`}
              >
                {holder.percentSupply.toFixed(2)}%
              </span>
            </div>
          </motion.div>
        ))}
      </Card>

      {/* Call to Action for #2 */}
      {tokensNeededForKing > 0 && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Card className="inline-block bg-purple/10 border-purple/30 px-4 py-2">
            <p className="text-sm text-purple">
              You need{" "}
              <span className="font-bold text-gold">
                <AnimatedNumber value={tokensNeededForKing} decimals={0} />
              </span>{" "}
              more tokens to become King!
            </p>
          </Card>
        </motion.div>
      )}
    </section>
  );
}
