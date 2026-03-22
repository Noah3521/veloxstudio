"use client";

import { animate, useInView, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CountUp({ value, suffix = "", duration = 1.6 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [duration, isInView, motionValue, value]);

  return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>;
}
