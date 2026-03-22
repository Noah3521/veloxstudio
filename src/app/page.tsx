"use client";

import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  ChevronDown,
  Cloud,
  Code2,
  Gem,
  Globe,
  Layers3,
  MessageCircleMore,
  Rocket,
  Sparkles,
  Star,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";

const navigation = [
  { label: "Why Velox", href: "#why-velox" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const usps = [
  {
    icon: Rocket,
    title: "7일 납기",
    description: "AI 설계와 반복 자동화로 일반 외주보다 훨씬 빠르게 런칭합니다.",
    metric: { value: 7, suffix: "일", label: "평균 DELUXE 납기" },
  },
  {
    icon: Cloud,
    title: "제로 호스팅비",
    description: "Cloudflare Pages 기반 정적 배포로 월 고정비 없이 전 세계에 빠르게 서비스합니다.",
    metric: { value: 0, suffix: "원", label: "월 호스팅 비용" },
  },
  {
    icon: Gem,
    title: "프리미엄 디자인",
    description: "AI 슬롭 없는 브랜드 중심 레이아웃과 인터랙션으로 ‘맡기고 싶다’는 인상을 만듭니다.",
    metric: { value: 95, suffix: "%", label: "첫 미팅 이후 재상담 전환" },
  },
];

const processSteps = [
  {
    step: "01",
    title: "상담",
    description: "브랜드, 업종, 목표 고객, 전환 목표를 빠르게 정의합니다.",
  },
  {
    step: "02",
    title: "AI 설계",
    description: "콘텐츠 구조와 정보 우선순위를 AI 워크플로우로 설계합니다.",
  },
  {
    step: "03",
    title: "개발",
    description: "Next.js, Tailwind, shadcn/ui로 속도와 완성도를 동시에 구현합니다.",
  },
  {
    step: "04",
    title: "배포",
    description: "Cloudflare Pages에 정적 배포하고 SEO 메타/구조화 데이터까지 마무리합니다.",
  },
];

const portfolio = [
  {
    title: "Apex Advisory",
    category: "프리미엄 에이전시",
    stack: ["Next.js", "Framer Motion", "CMS-ready"],
    description: "대담한 타이포그래피와 골드 디테일로 리드 전환을 강화한 에이전시 사이트.",
    classes: "md:col-span-7 md:row-span-2",
  },
  {
    title: "Lexium Partners",
    category: "변호사/로펌",
    stack: ["Structured Data", "SEO", "LocalBusiness"],
    description: "신뢰감을 우선한 다크 에디토리얼 레이아웃과 상담 CTA 설계.",
    classes: "md:col-span-5 md:row-span-1",
  },
  {
    title: "Neuron Launch",
    category: "AI 스타트업",
    stack: ["Landing", "Animation", "Analytics"],
    description: "제품 데모보다 메시지와 전환 흐름을 먼저 설계한 런치 페이지.",
    classes: "md:col-span-5 md:row-span-1",
  },
  {
    title: "Ledger Mint",
    category: "세무사/회계",
    stack: ["Fast Export", "Cloudflare", "Form Funnel"],
    description: "복잡한 서비스 내용을 명확한 섹션 구조로 재정리한 전문직 홈페이지.",
    classes: "md:col-span-7 md:row-span-1",
  },
];

const plans = [
  {
    name: "STANDARD",
    price: "99,000원",
    delivery: "3일",
    features: ["1페이지 랜딩", "2회 수정", "모바일 반응형", "기본 SEO"],
  },
  {
    name: "DELUXE",
    price: "890,000원",
    delivery: "7일",
    featured: true,
    features: ["4-5페이지", "5회 수정", "맞춤 카피 가이드", "고급 SEO", "Cloudflare 배포"],
  },
  {
    name: "PREMIUM",
    price: "2,490,000원",
    delivery: "14-30일",
    features: ["6페이지 이상", "무제한 수정", "브랜드 전략 반영", "프리미엄 인터랙션", "운영 가이드"],
  },
];

const testimonials = [
  {
    quote: "문의가 들어오는 순간부터 ‘이 팀은 다르다’는 느낌이 있었습니다. 웹사이트가 곧 영업사원이 됐어요.",
    name: "김도윤",
    role: "법률 사무소 대표",
  },
  {
    quote: "기존 제작사 대비 훨씬 빠르게 런칭했고, 디자인 퀄리티는 오히려 더 높았습니다.",
    name: "박서현",
    role: "B2B SaaS 창업자",
  },
  {
    quote: "호스팅비가 0원인 구조까지 설명해줘서 유지비 걱정 없이 시작할 수 있었습니다.",
    name: "이준호",
    role: "세무사 사무소 운영",
  },
];

const stackItems = ["Next.js 15", "React", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Cloudflare Pages"];

const faqs = [
  {
    q: "정말 7일 안에 제작 가능한가요?",
    a: "DELUXE 기준으로 정보 구조와 콘텐츠 결정이 빠르게 이뤄지면 7일 안에 충분히 가능합니다. STANDARD는 3일, PREMIUM은 범위에 따라 14~30일입니다.",
  },
  {
    q: "호스팅비가 왜 0원인가요?",
    a: "정적 사이트와 Cloudflare Pages 조합으로 운영하기 때문에 일반적인 월 서버 비용이 들지 않습니다. 유지보수나 추가 기능은 별도 협의합니다.",
  },
  {
    q: "카카오톡으로 바로 문의할 수 있나요?",
    a: "네. 상담 CTA는 카카오톡 오픈채팅 또는 원하는 메신저로 연결할 수 있고, 현재 데모는 메일 문의와 폼 중심으로 구성되어 있습니다.",
  },
  {
    q: "SEO도 포함되나요?",
    a: "기본적으로 메타 태그, Open Graph, 구조화 데이터, 시맨틱 HTML, sitemap.xml, robots.txt까지 포함합니다.",
  },
  {
    q: "브랜드 톤에 맞춰 커스터마이징 되나요?",
    a: "Velox는 템플릿 판매가 아니라 브랜드별 설계 방식으로 작업합니다. 업종과 고객층에 따라 색, 구조, 카피 톤까지 다르게 설계합니다.",
  },
  {
    q: "런칭 후 수정은 어떻게 하나요?",
    a: "패키지별 수정 횟수가 있고, PREMIUM은 무제한 조정이 가능합니다. 이후 운영/개선 계약으로 이어갈 수도 있습니다.",
  },
];

function VeloxMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="gradient-border rounded-2xl p-[1px]">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-background">
          <span className="display-title text-lg font-bold">V</span>
        </div>
      </div>
      <div>
        <p className="display-title text-lg font-bold tracking-tight">Velox Studio</p>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">AI web agency</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div className="container-shell">
        <div className="glass-panel flex items-center justify-between rounded-full px-4 py-3 md:px-6">
          <a href="#top" className="shrink-0">
            <VeloxMark />
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:translate-y-[-1px] hover:shadow-[0_12px_30px_rgba(124,114,255,0.32)]"
            >
              무료 상담받기
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <section id="top" className="relative overflow-hidden pt-28">
      <div className="spotlight left-[6%] top-28 h-56 w-56 bg-primary/40" />
      <div className="spotlight right-[8%] top-24 h-56 w-56 bg-accent/30" />
      <div className="container-shell relative py-16 md:py-24">
        <div className="noise mesh relative overflow-hidden rounded-[2rem] border border-border/60 px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <motion.div style={{ y }} className="absolute inset-y-0 right-[-12%] hidden w-[44%] lg:block">
            <div className="absolute right-0 top-8 h-[80%] w-full rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/12 to-transparent shadow-2xl backdrop-blur-2xl" />
            <div className="absolute left-[10%] top-[18%] h-48 w-48 rounded-full bg-primary/25 blur-3xl" />
            <div className="absolute bottom-[12%] right-[8%] h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute left-[8%] top-[12%] rounded-3xl border border-white/10 bg-background/70 px-4 py-3 shadow-xl backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">AI workflow</p>
              <p className="mt-2 display-title text-2xl font-semibold">Prompt → Design → Build → Deploy</p>
            </div>
            <div className="absolute bottom-[15%] left-[16%] rounded-3xl border border-white/10 bg-background/70 p-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <BadgeCheck aria-hidden="true" className="h-4 w-4 text-emerald-400" />
                SEO · Cloudflare · Responsive 포함
              </div>
              <p className="mt-3 text-3xl font-bold">7-Day Launch</p>
            </div>
          </motion.div>

          <div className="relative max-w-3xl">
            <Reveal>
              <div className="section-label border-primary/20 bg-primary/10 text-primary">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                AI가 만드는 프리미엄 웹사이트
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display-title text-balance mt-6 text-5xl font-bold leading-[0.96] sm:text-6xl lg:text-8xl">
                브랜드를 더 비싸게 보이게 만드는
                <span className="block bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  프리미엄 에이전시 홈페이지
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-balance mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                Velox Studio는 AI 설계, 프리미엄 디자인, 정적 최적화, Cloudflare 배포를 한 번에 묶어
                빠르고 설득력 있는 웹사이트를 만듭니다. 고객이 ‘이 회사에 맡기고 싶다’고 느끼게 하는 것이 목표입니다.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex h-14 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(124,114,255,0.34)]"
                >
                  무료 상담받기
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-border/70 bg-background/40 px-7 text-sm font-semibold transition hover:border-primary/40 hover:text-primary"
                >
                  포트폴리오 보기
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-14 grid gap-4 sm:grid-cols-3">
                {[
                  ["7일", "DELUXE 평균 런칭"],
                  ["₩0", "Cloudflare 호스팅비"],
                  ["SEO", "구조화 데이터 기본 포함"],
                ].map(([value, label]) => (
                  <div key={label} className="glass-panel rounded-2xl px-5 py-4">
                    <p className="display-title text-2xl font-bold">{value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <a href="#why-velox" className="mx-auto mt-8 flex w-fit items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
          아래로 스크롤
          <ChevronDown aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function WhyVelox() {
  return (
    <section id="why-velox" className="container-shell py-24 md:py-32">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-label border-accent/30 bg-accent/10 text-accent">Why Velox</div>
            <h2 className="display-title mt-5 text-4xl font-bold md:text-6xl">속도, 비용, 인상.
              <span className="block text-muted-foreground">세 가지를 동시에 잡는 구조.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
            리서치에서 뽑은 핵심은 분명합니다. 고객은 빠른 제작만 원하는 게 아니라,
            ‘이 팀은 감각도 있고 운영도 똑똑하다’는 신뢰를 원합니다.
          </p>
        </div>
      </Reveal>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {usps.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="group glass-panel rounded-[1.75rem] p-7 transition hover:-translate-y-1 hover:border-primary/40">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary transition group-hover:scale-105 group-hover:bg-primary/18">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                <div className="mt-8 border-t border-border/60 pt-6">
                  <p className="display-title text-4xl font-bold text-foreground">
                    <CountUp value={item.metric.value} suffix={item.metric.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.metric.label}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="container-shell">
        <Reveal>
          <div className="section-label border-primary/20 bg-primary/10 text-primary">Process</div>
          <h2 className="display-title mt-5 max-w-3xl text-4xl font-bold md:text-6xl">AI 파이프라인으로 더 빠르게, 더 정교하게.</h2>
        </Reveal>
        <div className="relative mt-14 grid gap-6 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="glass-panel rounded-[1.75rem] p-7"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-sm text-primary">STEP {step.step}</p>
                    <h3 className="mt-3 text-2xl font-semibold">{step.title}</h3>
                  </div>
                  <div className="rounded-full border border-border/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Velox Flow
                  </div>
                </div>
                <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">{step.description}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section id="portfolio" className="container-shell py-24 md:py-32">
      <Reveal>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-label border-accent/30 bg-accent/10 text-accent">Portfolio</div>
            <h2 className="display-title mt-5 text-4xl font-bold md:text-6xl">비대칭 그리드로 보여주는 샘플 프로젝트.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
            에이전시, 변호사, 스타트업, 세무사. 업종별로 톤과 정보 구조를 다르게 설계하는 것이 Velox 방식입니다.
          </p>
        </div>
      </Reveal>
      <div className="mt-14 grid auto-rows-[220px] gap-5 md:grid-cols-12">
        {portfolio.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06} className={item.classes}>
            <motion.article
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="group relative h-full overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-primary/[0.14] via-background to-accent/[0.12] p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_26%)] opacity-60 transition duration-300 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-5 border-t border-white/10 bg-background/70 p-6 opacity-0 backdrop-blur-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{item.category}</p>
                  <h3 className="display-title mt-3 text-3xl font-bold">{item.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.stack.map((tag) => (
                    <span key={tag} className="rounded-full border border-border/70 bg-background/55 px-3 py-1 text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="container-shell">
        <Reveal>
          <div className="text-center">
            <div className="section-label border-primary/20 bg-primary/10 text-primary">Service & Pricing</div>
            <h2 className="display-title mx-auto mt-5 max-w-3xl text-4xl font-bold md:text-6xl">가격은 투명하게. 결과는 프리미엄하게.</h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className={`rounded-[2rem] p-[1px] ${plan.featured ? "bg-gradient-to-br from-primary via-accent/70 to-primary/20" : "bg-white/0"}`}
              >
                <div className={`glass-panel flex h-full flex-col rounded-[2rem] p-8 ${plan.featured ? "shadow-[0_28px_80px_rgba(124,114,255,0.18)]" : ""}`}>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm text-muted-foreground">{plan.name}</p>
                    {plan.featured && <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">추천</span>}
                  </div>
                  <p className="display-title mt-6 text-5xl font-bold">{plan.price}</p>
                  <p className="mt-2 text-sm text-muted-foreground">납기 {plan.delivery}</p>
                  <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <BadgeCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`mt-10 inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition ${plan.featured ? "bg-primary text-primary-foreground hover:-translate-y-0.5" : "border border-border/70 hover:border-primary/40 hover:text-primary"}`}
                  >
                    이 플랜 문의하기
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="container-shell py-24 md:py-32">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-label border-accent/30 bg-accent/10 text-accent">Social Proof</div>
            <h2 className="display-title mt-5 text-4xl font-bold md:text-6xl">추천과 후기에서 신뢰가 완성됩니다.</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star aria-hidden="true" className="h-4 w-4 fill-accent text-accent" />
            평균 만족도 4.9 / 5 (샘플 데이터)
          </div>
        </div>
      </Reveal>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.08}>
            <article className="glass-panel rounded-[1.75rem] p-7">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star aria-hidden="true" key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 text-base leading-8 text-foreground/90">“{item.quote}”</p>
              <div className="mt-8 border-t border-border/60 pt-5">
                <p className="font-semibold">{item.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function StackSection() {
  const icons = useMemo(
    () => [Bot, Code2, Layers3, Globe, Cloud, Sparkles],
    []
  );

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-shell">
        <Reveal>
          <div className="glass-panel rounded-[2rem] px-6 py-10 md:px-10 md:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="section-label border-primary/20 bg-primary/10 text-primary">Tech Stack</div>
                <h2 className="display-title mt-5 text-4xl font-bold md:text-5xl">프리미엄 기술로 프리미엄 결과를 만듭니다.</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                정적 최적화, 빠른 퍼포먼스, 유지비 절감, 커스터마이징 유연성. 보기만 좋은 사이트가 아니라 오래 운영 가능한 구조를 선택합니다.
              </p>
            </div>
            <div className="mt-10 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {stackItems.map((item, index) => {
                const Icon = icons[index];
                return (
                  <div key={item} className="rounded-2xl border border-border/60 bg-background/50 px-4 py-5">
                    <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                    <p className="mt-4 text-sm font-medium">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="container-shell py-24 md:py-32">
      <Reveal>
        <div className="max-w-3xl">
          <div className="section-label border-accent/30 bg-accent/10 text-accent">FAQ</div>
          <h2 className="display-title mt-5 text-4xl font-bold md:text-6xl">자주 묻는 질문</h2>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-12 rounded-[2rem] border border-border/60 bg-card/70 p-4 md:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`} className="border-b border-border/60 px-2 md:px-4">
                <AccordionTrigger className="text-left text-base font-medium hover:text-primary">{faq.q}</AccordionTrigger>
                <AccordionContent className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Reveal>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="container-shell pb-16 pt-10 md:pb-24">
      <Reveal>
        <div className="noise mesh overflow-hidden rounded-[2rem] border border-border/60 px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="section-label border-primary/20 bg-primary/10 text-primary">Start Now</div>
              <h2 className="display-title mt-5 text-4xl font-bold md:text-6xl">지금 시작하기.
                <span className="block text-muted-foreground">브랜드가 바로 달라집니다.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                메일로 문의하거나 아래 정보만 남겨도 좋습니다. 상담 단계에서 업종별 벤치마크와 구조 제안까지 함께 드립니다.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <a href="mailto:hello@veloxstudio.co" className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 transition hover:border-primary/40 hover:text-primary">
                  <MessageCircleMore aria-hidden="true" className="h-4 w-4" />
                  hello@veloxstudio.co
                </a>
                <a href="https://veloxstudio.co" className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 transition hover:border-primary/40 hover:text-primary">
                  <Globe aria-hidden="true" className="h-4 w-4" />
                  veloxstudio.co
                </a>
              </div>
            </div>
            <form className="glass-panel rounded-[1.75rem] p-5 md:p-6">
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm">
                  <span>회사명</span>
                  <input className="h-12 rounded-2xl border border-border bg-background/60 px-4 outline-none transition focus:border-primary/50" placeholder="Velox Studio" />
                </label>
                <label className="grid gap-2 text-sm">
                  <span>연락처 또는 이메일</span>
                  <input className="h-12 rounded-2xl border border-border bg-background/60 px-4 outline-none transition focus:border-primary/50" placeholder="hello@company.com" />
                </label>
                <label className="grid gap-2 text-sm">
                  <span>프로젝트 설명</span>
                  <textarea className="min-h-32 rounded-2xl border border-border bg-background/60 px-4 py-3 outline-none transition focus:border-primary/50" placeholder="원하는 사이트 톤, 업종, 목표, 필요한 페이지 수를 알려주세요." />
                </label>
                <a href="mailto:hello@veloxstudio.co?subject=Velox%20Studio%20%EC%83%81%EB%8B%B4%20%EB%AC%B8%EC%9D%98" className="inline-flex h-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5">
                  상담 메일 보내기
                </a>
              </div>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="container-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <VeloxMark />
          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            AI 기반 설계, 프리미엄 디자인, 정적 최적화, Cloudflare 배포까지. Velox Studio는 빠르고 설득력 있는 웹사이트를 만듭니다.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-muted-foreground md:text-right">
          <a href="mailto:hello@veloxstudio.co" className="transition hover:text-primary">hello@veloxstudio.co</a>
          <a href="https://veloxstudio.co" className="transition hover:text-primary">veloxstudio.co</a>
          <p>© 2026 Velox Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Velox Studio",
    url: "https://veloxstudio.co",
    email: "hello@veloxstudio.co",
    description: "AI 기반 프리미엄 웹사이트 제작 에이전시",
    areaServed: "KR",
    priceRange: "₩99,000 - ₩2,490,000",
    serviceType: ["Website Design", "Website Development", "SEO", "Cloudflare Deployment"],
  };

  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Nav />
      <Hero />
      <WhyVelox />
      <ProcessSection />
      <PortfolioSection />
      <PricingSection />
      <TestimonialsSection />
      <StackSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
