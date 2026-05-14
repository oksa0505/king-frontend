"use client";

import { motion } from "framer-motion";

export function Crown({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        filter: [
          "drop-shadow(0 0 20px rgb(212 175 55 / 0.6))",
          "drop-shadow(0 0 40px rgb(212 175 55 / 0.8))",
          "drop-shadow(0 0 20px rgb(212 175 55 / 0.6))",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="crownGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id="gemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        {/* Crown base */}
        <path
          d="M10 70 L15 30 L30 45 L50 15 L70 45 L85 30 L90 70 Z"
          fill="url(#crownGradient)"
          stroke="#FFD700"
          strokeWidth="2"
        />
        {/* Crown band */}
        <rect x="10" y="65" width="80" height="10" rx="2" fill="url(#crownGradient)" />
        {/* Center gem */}
        <circle cx="50" cy="50" r="8" fill="url(#gemGradient)" />
        <circle cx="50" cy="50" r="5" fill="#A855F7" opacity="0.6" />
        {/* Side gems */}
        <circle cx="30" cy="55" r="5" fill="url(#gemGradient)" />
        <circle cx="70" cy="55" r="5" fill="url(#gemGradient)" />
        {/* Crown points decorations */}
        <circle cx="50" cy="20" r="4" fill="#FFD700" />
        <circle cx="15" cy="35" r="3" fill="#FFD700" />
        <circle cx="85" cy="35" r="3" fill="#FFD700" />
      </svg>
    </motion.div>
  );
}
