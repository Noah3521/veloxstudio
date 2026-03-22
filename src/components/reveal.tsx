"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const shouldAnimate = isHydrated && !prefersReducedMotion;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={
        shouldAnimate
          ? isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y }
          : { opacity: 1, y: 0 }
      }
      transition={
        shouldAnimate
          ? { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
          : { duration: 0 }
      }
    >
      {children}
    </motion.div>
  );
}
