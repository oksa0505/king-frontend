"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: "💰",
    title: "Buy",
    description: "Purchase $KING tokens on Clanker",
  },
  {
    icon: "👑",
    title: "Hold the Most",
    description: "Become the largest holder to claim the throne",
  },
  {
    icon: "🏆",
    title: "Earn Fees",
    description: "The King receives 80% of all trading fees",
  },
];

export function HowToPlay() {
  return (
    <section className="py-8 md:py-12">
      <motion.h2
        className="text-xl md:text-2xl font-bold text-center mb-8 text-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        How to Play
      </motion.h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-3xl mx-auto mb-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <Card className="w-full md:w-48 bg-card/80 backdrop-blur-sm border-border p-5 flex flex-col items-center text-center">
              <span className="text-4xl mb-3">{step.icon}</span>
              <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </Card>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute translate-x-24">
                <svg
                  className="w-8 h-8 text-muted-foreground/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <Button
          size="lg"
          className="bg-gold text-primary-foreground hover:bg-gold/90 font-bold text-lg px-8 py-6 shadow-lg shadow-gold/25"
          asChild
        >
          <a
            href="https://www.clanker.world/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy on Clanker
          </a>
        </Button>
      </motion.div>
    </section>
  );
}
