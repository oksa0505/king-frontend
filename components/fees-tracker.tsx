"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "./animated-number";
import { Card } from "@/components/ui/card";

interface FeesData {
  totalFeesEth: number;
  totalFeesUsd: number;
  kingRewardEth: number;
  kingRewardUsd: number;
  buybackEth: number;
  buybackUsd: number;
  totalBurned: number;
}

export function FeesTracker({ fees }: { fees: FeesData }) {
  return (
    <section className="py-8 md:py-12">
      <motion.h2
        className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Live Fee Distribution
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {/* Total Fees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card/80 backdrop-blur-sm border-border p-5">
            <div className="flex flex-col items-center gap-2">
              <p className="text-muted-foreground text-sm">Total Fees Collected</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                <AnimatedNumber value={fees.totalFeesEth} decimals={4} suffix=" ETH" />
              </p>
              <p className="text-sm text-muted-foreground">
                <AnimatedNumber value={fees.totalFeesUsd} decimals={2} prefix="$" />
              </p>
            </div>
          </Card>
        </motion.div>

        {/* King Reward (80%) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card/80 backdrop-blur-sm border-gold/40 p-5 relative overflow-hidden">
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-gold/20 rounded text-xs text-gold font-semibold">
              80%
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-gold text-sm font-medium">👑 King Reward</p>
              <p className="text-2xl md:text-3xl font-bold text-gold">
                <AnimatedNumber value={fees.kingRewardEth} decimals={4} suffix=" ETH" />
              </p>
              <p className="text-sm text-gold-dim">
                <AnimatedNumber value={fees.kingRewardUsd} decimals={2} prefix="$" />
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Buyback & Burn (20%) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card/80 backdrop-blur-sm border-burn/40 p-5 relative overflow-hidden">
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-burn/20 rounded text-xs text-burn font-semibold">
              20%
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-burn text-sm font-medium">🔥 Manual Buyback & Burn</p>
              <p className="text-2xl md:text-3xl font-bold text-burn">
                <AnimatedNumber value={fees.buybackEth} decimals={4} suffix=" ETH" />
              </p>
              <p className="text-sm text-burn/70">
                <AnimatedNumber value={fees.buybackUsd} decimals={2} prefix="$" />
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
