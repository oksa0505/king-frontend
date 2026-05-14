"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedNumber({
  value,
  decimals = 2,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedNumberProps) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) =>
    `${prefix}${current.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`
  );
  const [displayValue, setDisplayValue] = useState(
    `${prefix}${value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    return display.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [display]);

  return (
    <motion.span className={className}>
      {displayValue}
    </motion.span>
  );
}
