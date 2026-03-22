"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  ChevronDown,
  Cloud,
  Code2,
  Gem,
  Globe,
  Instagram,
  Layers3,
  Menu,
  MessageCircleMore,
  Phone,
  Rocket,
  Sparkles,
  Star,
  Github,
  ExternalLink,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";

const KAKAO_URL = "https://open.kakao.com/o/veloxstudio-demo";
const CONTACT_EMAIL = "hello@veloxstudio.co";
const CONTACT_PHONE = "010-0000-0000";
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/hello@veloxstudio.co";

const navigation = [
  { label: "Why Velox", href: "#why-velox", id: "why-velox" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Portfolio", href: "#portfolio", id: "portfolio" },
  { label: "Pricing", href: "#pricing", id: "pricing" },
  { label: "FAQ", href: "#faq", id: "faq" },
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
    status: "실제 프리뷰 준비 중",
    href: "https://veloxstudio.co",
    classes: "md:col-span-7 md:row-span-2",
    palette: "from-[#6f63ff]/35 via-background to-[#d9a441]/18",
  },
  {
    title: "Lexium Partners",
    category: "변호사/로펌",
    stack: ["Structured Data", "SEO", "LocalBusiness"],
    description: "신뢰감을 우선한 다크 에디토리얼 레이아웃과 상담 CTA 설계.",
    status: "Coming Soon",
    href: "",
    classes: "md:col-span-5 md:row-span-1",
    palette: "from-[#2d274c] via-background to-[#a8894b]/16",
  },
  {
    title: "Neuron Launch",
    category: "AI 스타트업",
    stack: ["Landing", "Animation", "Analytics"],
    description: "제품 데모보다 메시지와 전환 흐름을 먼저 설계한 런치 페이지.",
    status: "Coming Soon",
    href: "",
    classes: "md:col-span-5 md:row-span-1",
    palette: "from-[#5747ff]/28 via-background to-[#36d6b2]/18",
  },
  {
    title: "Ledger Mint",
    category: "세무사/회계",
    stack: ["Fast Export", "Cloudflare", "Form Funnel"],
    description: "복잡한 서비스 내용을 명확한 섹션 구조로 재정리한 전문직 홈페이지.",
    status: "Coming Soon",
    href: "",
    classes: "md:col-span-7 md:row-span-1",
    palette: "from-[#e2b45d]/22 via-background to-[#6c5cff]/18",
  },
];

const plans = [
  {
    name: "STANDARD",
    price: "99,000원",
    delivery: "3일",
    features: ["1페이지 랜딩", "2회 수정", "모바일 반응형", "기본 SEO"],
    mobileOrder: "order-2 lg:order-1",
  },
  {
    name: "DELUXE",
    price: "890,000원",
    delivery: "7일",
    featured: true,
    features: ["4-5페이지", "5회 수정", "맞춤 카피 가이드", "고급 SEO", "Cloudflare 배포"],
    mobileOrder: "order-1 lg:order-2",
  },
  {
    name: "PREMIUM",
    price: "2,490,000원",
    delivery: "14-30일",
    features: ["6페이지 이상", "무제한 수정", "브랜드 전략 반영", "프리미엄 인터랙션", "운영 가이드"],
    mobileOrder: "order-3 lg:order-3",
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
    a: "네. 카카오톡 오픈채팅으로 바로 문의할 수 있고, 폼으로 남겨주시면 24시간 내에 답변드립니다.",
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

type ContactFormState = {
  company: string;
  contact: string;
  description: string;
};

type ContactErrors = Partial<Record<keyof ContactFormState, string>>;

function validateContact(values: ContactFormState) {
  const errors: ContactErrors = {};

  if (!values.company.trim()) errors.company = "회사명을 입력해주세요.";
  if (!values.contact.trim()) {
    errors.contact = "이메일 또는 전화번호를 입력해주세요.";
  } else {
    const normalized = values.contact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
    const isPhone = /^[0-9+\-()\s]{8,}$/.test(normalized);
    if (!isEmail && !isPhone) {
      errors.contact = "올바른 이메일 또는 전화번호 형식으로 입력해주세요.";
    }
  }

  if (!values.description.trim()) errors.description = "프로젝트 설명을 입력해주세요.";

  return errors;
}

function VeloxMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="gradient-border rounded-[var(--radius-icon)] p-[1px]">
        <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-icon)] bg-background">
          <span className="display-title text-lg font-bold">V</span>
        </div>
      </div>
      <div>
        <p className="display-title text-lg font-bold tracking-tight">Velox Studio</p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">AI web agency</p>
      </div>
    </div>
  );
}

function NavLink({ href, label, active, mobile = false }: { href: string; label: string; active: boolean; mobile?: boolean }) {
  return (
    <a
      href={href}
      className={mobile
        ? `rounded-2xl border px-4 py-3 text-base transition ${active ? "border-primary/40 bg-primary/10 text-primary" : "border-border/60 text-muted-foreground hover:text-foreground"}`
        : `relative text-sm transition ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
    >
      {label}
      {!mobile && (
        <span
          className={`absolute inset-x-0 -bottom-2 h-px origin-left bg-primary transition ${active ? "scale-x-100" : "scale-x-0"}`}
          aria-hidden="true"
        />
      )}
    </a>
  );
}

function Nav({ activeSection }: { activeSection: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div className="container-shell">
        <div className="glass-panel flex items-center justify-between rounded-full px-4 py-3 md:px-6">
          <a href="#top" className="shrink-0">
            <VeloxMark />
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} active={activeSection === item.id} />
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/50 text-foreground md:hidden"
                  aria-label="메뉴 열기"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l border-border/70 bg-background/95 sm:max-w-sm">
                <SheetHeader className="pr-12">
                  <SheetTitle className="display-title text-2xl">Velox Studio</SheetTitle>
                  <SheetDescription>섹션 이동과 무료 상담 CTA를 한 번에 제공합니다.</SheetDescription>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-3">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <div>
                        <NavLink href={item.href} label={item.label} active={activeSection === item.id} mobile />
                      </div>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-8 space-y-3">
                  <SheetClose asChild>
                    <a
                      href="#contact"
                      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
                    >
                      무료 상담 신청하기
                    </a>
                  </SheetClose>
                  <a
                    href={KAKAO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border/70 bg-background/60 px-5 text-sm font-semibold transition hover:border-primary/40 hover:text-primary"
                  >
                    카카오톡으로 문의
                  </a>
                </div>
              </SheetContent>
            </Sheet>
            <a
              href="#contact"
              className="hidden h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:translate-y-[-1px] hover:shadow-[0_12px_30px_rgba(124,114,255,0.32)] md:inline-flex"
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
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <section id="top" className="relative overflow-hidden pt-28">
      <div className="spotlight left-[6%] top-28 h-56 w-56 bg-primary/40" />
      <div className="spotlight right-[8%] top-24 h-56 w-56 bg-accent/30" />
      <div className="container-shell relative py-16 md:py-24">
        <div className="noise mesh relative overflow-hidden rounded-[var(--radius-card)] border border-border/60 px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <motion.div style={prefersReducedMotion ? undefined : { y }} className="absolute inset-y-0 right-[-12%] hidden w-[44%] lg:block">
            <div className="absolute right-0 top-8 h-[80%] w-full rounded-[var(--radius-card)] border border-white/10 bg-gradient-to-br from-white/12 to-transparent shadow-2xl backdrop-blur-2xl" />
            <div className="absolute left-[10%] top-[18%] h-48 w-48 rounded-full bg-primary/25 blur-3xl" />
            <div className="absolute bottom-[12%] right-[8%] h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute left-[8%] top-[12%] rounded-[var(--radius-card-sm)] border border-white/10 bg-background/70 px-4 py-3 shadow-xl backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">AI workflow</p>
              <p className="mt-2 display-title text-2xl font-semibold">Prompt → Design → Build → Deploy</p>
            </div>
            <div className="absolute bottom-[15%] left-[16%] rounded-[var(--radius-card-sm)] border border-white/10 bg-background/70 p-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <BadgeCheck aria-hidden="true" className="h-4 w-4 text-chart-3" />
                SEO · Cloudflare · Responsive 포함
              </div>
              <p className="mt-3 text-3xl font-bold">7-Day Launch</p>
            </div>
          </motion.div>

          <div className="relative max-w-3xl">
            <Reveal>
              <div className="section-label border-primary/20 bg-primary/10 text-primary">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                전문직 · 스타트업 전용 프리미엄 웹사이트
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display-title text-balance mt-6 text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-8xl">
                고객이 먼저 연락해오는 웹사이트,
                <span className="block bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  7일 안에
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-balance mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                법률 · 세무 · 컨설팅 · 스타트업 전용. AI 설계 + Cloudflare 배포. 월 유지비 0원.
                상담은 무료이며, 강요 없습니다.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex h-14 items-center justify-center rounded-[var(--radius-pill)] bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(124,114,255,0.34)]"
                >
                  무료 상담 신청하기
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a
                  href={KAKAO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-[var(--radius-pill)] border border-border/70 bg-background/40 px-7 text-sm font-semibold transition hover:border-primary/40 hover:text-primary"
                >
                  카카오톡으로 바로 문의
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-4 text-sm text-muted-foreground">상담은 무료이며, 강요 없습니다.</p>
            </Reveal>
            <Reveal delay={0.36}>
              <div className="mt-14 grid gap-4 sm:grid-cols-3">
                {[
                  ["7일", "DELUXE 평균 런칭"],
                  ["₩0", "Cloudflare 호스팅비"],
                  ["SEO", "구조화 데이터 기본 포함"],
                ].map(([value, label]) => (
                  <div key={label} className="glass-panel rounded-[var(--radius-card-sm)] px-5 py-4">
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
            <h2 className="display-title mt-5 text-4xl font-bold md:text-6xl">
              속도, 비용, 인상.
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
              <div className="group glass-panel rounded-[var(--radius-card-sm)] p-7 transition hover:-translate-y-1 hover:border-primary/40">
                <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-icon)] bg-primary/12 text-primary transition group-hover:scale-105 group-hover:bg-primary/18">
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
                whileHover={{ y: 0 }}
                transition={{ duration: 0.25 }}
                className="glass-panel rounded-[var(--radius-card-sm)] p-7 md:hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-sm text-primary">STEP {step.step}</p>
                    <h3 className="mt-3 text-2xl font-semibold">{step.title}</h3>
                  </div>
                  <div className="rounded-[var(--radius-pill)] border border-border/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
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

function PortfolioPreview({ title, palette }: { title: string; palette: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[calc(var(--radius-card)-0.5rem)] border border-white/10 bg-gradient-to-br ${palette} p-3`}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(var(--radius-card-sm)-0.25rem)] border border-white/10 bg-background/70 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>{title}</span>
          <span>Live preview</span>
        </div>
        <div className="grid grid-cols-[1.05fr_0.95fr] gap-3 p-4">
          <div className="space-y-3">
            <div className="h-3 w-20 rounded-full bg-primary/40" />
            <div className="h-8 w-full rounded-2xl bg-foreground/85" />
            <div className="h-3 w-5/6 rounded-full bg-muted-foreground/35" />
            <div className="h-3 w-3/4 rounded-full bg-muted-foreground/25" />
            <div className="flex gap-2 pt-2">
              <div className="h-9 w-28 rounded-full bg-primary/85" />
              <div className="h-9 w-24 rounded-full border border-border/70 bg-background/70" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-24 rounded-[1.25rem] bg-gradient-to-br from-white/55 to-white/10" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-14 rounded-[1rem] bg-background/80" />
              <div className="h-14 rounded-[1rem] bg-background/80" />
            </div>
            <div className="h-10 rounded-[1rem] bg-accent/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioSection() {
  return (
    <section id="portfolio" className="container-shell py-24 md:py-32">
      <Reveal>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-label border-accent/30 bg-accent/10 text-accent">Portfolio</div>
            <h2 className="display-title mt-5 text-4xl font-bold md:text-6xl">업종별 프리뷰로 결과물을 먼저 보여드립니다.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
            에이전시, 변호사, 스타트업, 세무사. 업종별로 톤과 정보 구조를 다르게 설계하는 것이 Velox 방식입니다.
          </p>
        </div>
      </Reveal>
      <div className="mt-14 grid auto-rows-auto gap-5 md:grid-cols-12 md:auto-rows-[280px]">
        {portfolio.map((item, index) => {
          const Wrapper = item.href ? "a" : "div";
          const wrapperProps = item.href
            ? { href: item.href, target: "_blank", rel: "noreferrer" }
            : {};

          return (
            <Reveal key={item.title} delay={index * 0.06} className={item.classes}>
              <Wrapper
                {...wrapperProps}
                className="group glass-panel block h-full overflow-hidden rounded-[var(--radius-card)] p-4 transition hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="flex h-full flex-col justify-between gap-5">
                  <PortfolioPreview title={item.title} palette={item.palette} />
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.category}</p>
                        <h3 className="display-title mt-2 text-3xl font-bold">{item.title}</h3>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-[var(--radius-pill)] border border-border/70 bg-background/55 px-3 py-1 text-xs text-muted-foreground">
                        {item.href ? "외부 보기" : item.status}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.stack.map((tag) => (
                        <span key={tag} className="rounded-[var(--radius-pill)] border border-border/70 bg-background/55 px-3 py-1 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Wrapper>
            </Reveal>
          );
        })}
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
            <Reveal key={plan.name} delay={index * 0.08} className={plan.mobileOrder}>
              <motion.article
                whileHover={{ y: 0 }}
                transition={{ duration: 0.25 }}
                className={`rounded-[var(--radius-card)] p-[1px] md:hover:-translate-y-1 ${plan.featured ? "bg-gradient-to-br from-primary via-accent/70 to-primary/20" : "bg-white/0"}`}
              >
                <div className={`glass-panel flex h-full flex-col rounded-[var(--radius-card)] p-8 ${plan.featured ? "shadow-[0_28px_80px_rgba(124,114,255,0.18)]" : ""}`}>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm text-muted-foreground">{plan.name}</p>
                    {plan.featured && <span className="rounded-[var(--radius-pill)] bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">추천</span>}
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
                    className={`mt-10 inline-flex h-12 items-center justify-center rounded-[var(--radius-pill)] px-5 text-sm font-semibold transition ${plan.featured ? "bg-primary text-primary-foreground hover:-translate-y-0.5" : "border border-border/70 hover:border-primary/40 hover:text-primary"}`}
                  >
                    {plan.name} 문의하기
                  </a>
                  <p className="mt-5 text-sm text-muted-foreground">결과 미달 시 100% 재작업 보장</p>
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
            <div className="section-label border-accent/30 bg-accent/10 text-accent">클라이언트 후기</div>
            <h2 className="display-title mt-5 text-4xl font-bold md:text-6xl">추천과 후기에서 신뢰가 완성됩니다.</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star aria-hidden="true" className="h-4 w-4 fill-accent text-accent" />
            평균 만족도 4.9 / 5
          </div>
        </div>
      </Reveal>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.08}>
            <article className="glass-panel rounded-[var(--radius-card-sm)] p-7">
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
  const icons = useMemo(() => [Bot, Code2, Layers3, Globe, Cloud, Sparkles], []);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-shell">
        <Reveal>
          <div className="glass-panel rounded-[var(--radius-card)] px-6 py-10 md:px-10 md:py-12">
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
                  <div key={item} className="rounded-[var(--radius-icon)] border border-border/60 bg-background/50 px-4 py-5">
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
        <div className="mt-12 rounded-[var(--radius-card)] border border-border/60 bg-card/70 p-4 md:p-6">
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
  const [form, setForm] = useState<ContactFormState>({ company: "", contact: "", description: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSuccessMessage("");
    setSubmitError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContact(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          company: form.company,
          contact: form.contact,
          message: form.description,
          _subject: `[Velox Studio] 상담 문의 - ${form.company}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error("폼 전송 실패");
      }

      setForm({ company: "", contact: "", description: "" });
      setErrors({});
      setSuccessMessage("상담 요청이 접수되었습니다. 24시간 내 연락드리겠습니다.");
    } catch {
      setSubmitError("전송에 실패했습니다. 잠시 후 다시 시도하거나 카카오톡으로 문의해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="container-shell pb-28 pt-10 md:pb-24">
      <Reveal>
        <div className="noise mesh overflow-hidden rounded-[var(--radius-card)] border border-border/60 px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="section-label border-primary/20 bg-primary/10 text-primary">Start Now</div>
              <h2 className="display-title mt-5 text-4xl font-bold md:text-6xl">
                오늘 상담하면,
                <span className="block text-muted-foreground">이번 주 안에 시작합니다.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                업종별 벤치마크와 구조 제안까지 함께 드립니다. 폼으로 남기거나, 카카오톡으로 바로 편하게 문의하세요.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border/70 px-4 py-2 transition hover:border-primary/40 hover:text-primary">
                  <MessageCircleMore aria-hidden="true" className="h-4 w-4" />
                  {CONTACT_EMAIL}
                </a>
                <a href={`tel:${CONTACT_PHONE.replace(/-/g, "")}`} className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border/70 px-4 py-2 transition hover:border-primary/40 hover:text-primary">
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  {CONTACT_PHONE}
                </a>
                <a href={KAKAO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border/70 px-4 py-2 transition hover:border-primary/40 hover:text-primary">
                  <Globe aria-hidden="true" className="h-4 w-4" />
                  카카오톡 오픈채팅
                </a>
              </div>
            </div>
            <form className="glass-panel rounded-[var(--radius-card-sm)] p-5 md:p-6" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm" htmlFor="company">
                  <span>회사명 *</span>
                  <input
                    id="company"
                    value={form.company}
                    onChange={(event) => handleChange("company", event.target.value)}
                    className="h-12 rounded-[var(--radius-icon)] border border-border bg-background/60 px-4 transition"
                    placeholder="Velox Studio"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "company-error" : undefined}
                  />
                  {errors.company && <span id="company-error" className="text-sm text-[var(--chart-4)]">{errors.company}</span>}
                </label>
                <label className="grid gap-2 text-sm" htmlFor="contact-field">
                  <span>연락처 또는 이메일 *</span>
                  <input
                    id="contact-field"
                    value={form.contact}
                    onChange={(event) => handleChange("contact", event.target.value)}
                    className="h-12 rounded-[var(--radius-icon)] border border-border bg-background/60 px-4 transition"
                    placeholder="hello@company.com 또는 010-1234-5678"
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={errors.contact ? "contact-error" : undefined}
                  />
                  {errors.contact && <span id="contact-error" className="text-sm text-[var(--chart-4)]">{errors.contact}</span>}
                </label>
                <label className="grid gap-2 text-sm" htmlFor="description">
                  <span>프로젝트 설명 *</span>
                  <textarea
                    id="description"
                    value={form.description}
                    onChange={(event) => handleChange("description", event.target.value)}
                    className="min-h-32 rounded-[var(--radius-icon)] border border-border bg-background/60 px-4 py-3 transition"
                    placeholder="원하는 사이트 톤, 업종, 목표, 필요한 페이지 수를 알려주세요."
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? "description-error" : undefined}
                  />
                  {errors.description && <span id="description-error" className="text-sm text-[var(--chart-4)]">{errors.description}</span>}
                </label>
                <button type="submit" disabled={isSubmitting} className="inline-flex h-12 items-center justify-center rounded-[var(--radius-pill)] bg-primary text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
                  {isSubmitting ? "전송 중..." : "무료 상담 신청하기"}
                </button>
                {successMessage && <p className="text-sm text-[var(--chart-3)]">{successMessage}</p>}
                {submitError && <p className="text-sm text-[var(--chart-4)]">{submitError}</p>}
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
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-primary">{CONTACT_EMAIL}</a>
          <a href="https://veloxstudio.co" className="transition hover:text-primary">veloxstudio.co</a>
          <a href="https://instagram.com/veloxstudio.co" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-primary md:justify-end"><Instagram className="h-4 w-4" /> @veloxstudio.co</a>
          <a href="https://github.com/Noah3521/veloxstudio" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-primary md:justify-end"><Github className="h-4 w-4" /> GitHub</a>
          <p>© 2026 Velox Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/92 px-4 py-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-[1240px] gap-3">
        <a href={KAKAO_URL} target="_blank" rel="noreferrer" className="inline-flex h-12 flex-1 items-center justify-center rounded-[var(--radius-pill)] border border-border/70 bg-background/70 px-4 text-sm font-semibold">
          카카오톡 문의
        </a>
        <a href="#contact" className="inline-flex h-12 flex-1 items-center justify-center rounded-[var(--radius-pill)] bg-primary px-4 text-sm font-semibold text-primary-foreground">
          무료 상담받기
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("why-velox");

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Velox Studio",
    url: "https://veloxstudio.co",
    email: CONTACT_EMAIL,
    description: "AI 기반 프리미엄 웹사이트 제작 에이전시",
    areaServed: "KR",
    priceRange: "₩99,000 - ₩2,490,000",
    serviceType: ["Website Design", "Website Development", "SEO", "Cloudflare Deployment"],
  };

  return (
    <main className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <Nav activeSection={activeSection} />
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
      <MobileStickyCTA />
    </main>
  );
}
