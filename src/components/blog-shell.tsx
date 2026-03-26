import Link from "next/link";
import type { ReactNode } from "react";

type BlogShellProps = {
  children: ReactNode;
};

export function BlogShell({ children }: BlogShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[12%] top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-[10%] h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,226,218,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(232,226,218,0.55)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle,black,transparent_80%)] opacity-35" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-background/88 backdrop-blur-xl">
        <div className="container-shell flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-base font-black text-white shadow-[0_12px_28px_rgba(140,120,100,0.16)]">
              V
            </div>
            <span>Velox Studio</span>
          </Link>

          <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground sm:gap-6">
            <Link href="/" className="hover:text-foreground">홈</Link>
            <Link href="/blog" className="text-foreground">블로그</Link>
            <Link href="/#contact" className="hover:text-foreground">문의</Link>
          </nav>
        </div>
      </header>

      <main className="relative">{children}</main>
    </div>
  );
}
