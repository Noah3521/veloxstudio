"use client";

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
