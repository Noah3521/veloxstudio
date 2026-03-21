import { Button } from "@/components/ui/button";

const KAKAO_LINK = "#contact";

function VeloxLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Velox Studio"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        fill="url(#logo-gradient)"
      />
      <path
        d="M8 10L16 22L24 10"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#00D4FF" />
          <stop offset="1" stopColor="#00E59B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="transition-transform group-hover:translate-x-1"
    >
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Nav ─── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-navy/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
          <VeloxLogo />
          <span>
            Velox<span className="text-electric">.</span>
          </span>
        </a>
        <a
          href={KAKAO_LINK}
          className="rounded-lg bg-electric/10 px-4 py-2 text-sm font-semibold text-electric transition-colors hover:bg-electric/20"
        >
          무료 상담
        </a>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-grid px-6 pt-16">
      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-electric/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-emerald/[0.05] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="animate-fade-up mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-sm text-electric opacity-0">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
          지금 상담 가능
        </div>

        <h1 className="animate-fade-up opacity-0 animate-delay-1 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl">
          <span className="block">3일 만에 완성하는</span>
          <span className="block mt-2 bg-gradient-to-r from-electric to-emerald bg-clip-text text-transparent">
            프리미엄 웹사이트
          </span>
        </h1>

        <p className="animate-fade-up opacity-0 animate-delay-2 mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
          제로 호스팅비 · SEO 최적화 · 글로벌 CDN
        </p>

        <div className="animate-fade-up opacity-0 animate-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={KAKAO_LINK}
            className="group relative inline-flex h-14 items-center gap-2 rounded-xl bg-gradient-to-r from-electric to-emerald px-8 text-base font-bold text-navy transition-shadow hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] pulse-ring"
          >
            무료 상담 신청하기
            <ArrowIcon />
          </a>
          <a
            href="#pricing"
            className="inline-flex h-14 items-center gap-2 rounded-xl border border-white/10 px-8 text-base font-medium text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
          >
            패키지 보기
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up opacity-0 animate-delay-4 mt-20 grid grid-cols-3 gap-8 border-t border-white/5 pt-10">
          {[
            ["99,000원~", "시작 가격"],
            ["3일", "최소 제작기간"],
            ["₩0", "월 호스팅비"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="text-2xl font-bold text-foreground sm:text-3xl">{value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */
const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "제로 호스팅비",
    desc: "Cloudflare Pages로 영구 무료 호스팅. 매달 나가는 서버 비용 걱정 없이 운영하세요.",
    accent: "text-electric",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "3초 로딩",
    desc: "글로벌 CDN과 정적 사이트 최적화로 어디서든 번개처럼 빠른 로딩 속도를 제공합니다.",
    accent: "text-emerald",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "SEO 최적화",
    desc: "구조화 데이터, Core Web Vitals 만점. 검색 엔진 상위 노출을 위한 기술 SEO를 기본 적용합니다.",
    accent: "text-electric",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "프리미엄 디자인",
    desc: "AI 슬롭 없는 맞춤 디자인. 브랜드 아이덴티티에 맞는 세련되고 독창적인 웹사이트를 제작합니다.",
    accent: "text-emerald",
  },
];

function Features() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-electric">
            Why Velox
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
            왜 Velox Studio인가
          </h2>
          <div className="mx-auto mt-4 h-px w-20 gradient-line" />
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card-glow group rounded-2xl border border-white/5 bg-card p-8 transition-all hover:border-white/10"
            >
              <div className={`inline-flex rounded-xl bg-white/5 p-3 ${f.accent}`}>
                {f.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
const packages = [
  {
    name: "STANDARD",
    price: "99,000",
    unit: "원",
    features: ["1페이지 랜딩", "3일 제작", "2회 수정", "반응형 디자인", "기본 SEO"],
    popular: false,
  },
  {
    name: "DELUXE",
    price: "890,000",
    unit: "원",
    features: [
      "4-5페이지",
      "7일 제작",
      "5회 수정",
      "반응형 디자인",
      "SEO 최적화",
      "맞춤 디자인",
      "콘텐츠 작성 지원",
    ],
    popular: true,
  },
  {
    name: "PREMIUM",
    price: "2,490,000",
    unit: "원",
    features: [
      "6+페이지",
      "14-30일 제작",
      "무제한 수정",
      "반응형 디자인",
      "고급 SEO 최적화",
      "맞춤 프리미엄 디자인",
      "콘텐츠 전략 컨설팅",
      "유지보수 1개월 포함",
    ],
    popular: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-electric/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-electric">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
            합리적인 패키지
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            모든 패키지에 제로 호스팅비와 글로벌 CDN이 포함됩니다
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
                pkg.popular
                  ? "border-electric/30 bg-gradient-to-b from-electric/[0.08] to-card glow-electric"
                  : "border-white/5 bg-card hover:border-white/10"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-electric to-emerald px-4 py-1 text-xs font-bold text-navy">
                  BEST
                </div>
              )}

              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {pkg.name}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight">
                  {pkg.price}
                </span>
                <span className="text-lg text-muted-foreground">{pkg.unit}</span>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        pkg.popular ? "text-electric" : "text-emerald"
                      }`}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8.5L6.5 12L13 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={KAKAO_LINK}
                className={`mt-8 flex h-12 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                  pkg.popular
                    ? "bg-gradient-to-r from-electric to-emerald text-navy hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                    : "border border-white/10 text-foreground hover:border-white/20 hover:bg-white/5"
                }`}
              >
                상담 신청하기
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Process ─── */
const steps = [
  { num: "01", title: "상담", desc: "요구사항과 목표를 파악합니다" },
  { num: "02", title: "기획", desc: "사이트 구조와 콘텐츠를 설계합니다" },
  { num: "03", title: "디자인", desc: "브랜드에 맞는 UI를 제작합니다" },
  { num: "04", title: "개발", desc: "최적화된 코드로 구현합니다" },
  { num: "05", title: "배포", desc: "글로벌 CDN에 배포합니다" },
];

function Process() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-electric">
            Process
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
            제작 과정
          </h2>
        </div>

        <div className="relative mt-20">
          {/* Connection line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-electric/50 via-emerald/50 to-transparent sm:left-1/2 sm:-translate-x-px" />

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`relative flex items-start gap-6 sm:gap-12 ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Dot on line */}
                <div className="absolute left-8 top-1 -translate-x-1/2 sm:left-1/2">
                  <div className="h-3 w-3 rounded-full border-2 border-electric bg-navy" />
                </div>

                {/* Content */}
                <div className={`ml-16 sm:ml-0 sm:w-1/2 ${i % 2 === 1 ? "sm:text-right sm:pr-16" : "sm:pl-16 sm:ml-auto"}`}>
                  <span className="font-mono text-sm text-electric">{step.num}</span>
                  <h3 className="mt-1 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-electric/[0.04] to-transparent" />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          지금 시작하세요
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
          프리미엄 웹사이트, 합리적인 가격으로 빠르게 완성해 드립니다.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={KAKAO_LINK}
            className="group relative inline-flex h-14 items-center gap-2 rounded-xl bg-gradient-to-r from-electric to-emerald px-8 text-base font-bold text-navy transition-shadow hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
          >
            무료 상담 신청하기
            <ArrowIcon />
          </a>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          상담은 무료이며, 부담 없이 문의해 주세요.
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 font-bold">
          <VeloxLogo />
          <span>
            Velox<span className="text-electric">.</span>
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground sm:items-end">
          <span>veloxstudio.co</span>
          <a
            href="mailto:hello@veloxstudio.co"
            className="transition-colors hover:text-electric"
          >
            hello@veloxstudio.co
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-white/5 pt-8 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Velox Studio. All rights reserved.
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <Pricing />
      <Process />
      <CTA />
      <Footer />
    </>
  );
}
