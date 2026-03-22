"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });

  useEffect(() => {
    if (prefersReducedMotion) {
      if (ref.current) ref.current.textContent = `${value.toLocaleString()}${suffix}`;
      return;
    }

    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, prefersReducedMotion, suffix, value]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest).toLocaleString()}${suffix}`;
      }
    });

    return unsubscribe;
  }, [prefersReducedMotion, springValue, suffix]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}
