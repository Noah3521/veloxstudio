"use client";

import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  Cloud,
  Code2,
  Globe,
  Layers3,
  Menu,
  MessageCircleMore,
  Rocket,
  Sparkles,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";

const SITE_URL = "https://veloxstudio.co";
const KAKAO_URL = "https://open.kakao.com/o/s8t59Nmi";
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/hello@veloxstudio.co";
const CONTACT_EMAIL = "hello@veloxstudio.co";

const navigation = [
  { label: "특장점", href: "#usp", id: "usp" },
  { label: "서비스", href: "#services", id: "services" },
  { label: "포트폴리오", href: "#portfolio", id: "portfolio" },
  { label: "가격", href: "#pricing", id: "pricing" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "문의", href: "#contact", id: "contact" },
];

const heroLines = ["인스타·카카오·예약정보를 한 페이지로,", "첫 홈페이지 49,000원부터"];

const uspItems = [
  {
    icon: Rocket,
    title: "7일 안에 런칭",
    description:
      "인스타, 카카오, 예약 링크에 흩어진 정보를 정리해 1인샵도 빠르게 첫 홈페이지를 열 수 있게 돕습니다.",
    accent: "#D97706",
  },
  {
    icon: Cloud,
    title: "월 호스팅비 0원",
    description:
      "Cloudflare Pages 기반 정적 배포로 유지비 부담 없이 가볍게 시작합니다.",
    accent: "#C89B6D",
  },
  {
    icon: WandSparkles,
    title: "프리미엄 첫인상",
    description:
      "차분한 웜톤, 넉넉한 여백, 설득력 있는 흐름으로 브랜드의 존재감을 끌어올립니다.",
    accent: "#B8602C",
  },
  {
    icon: Zap,
    title: "전환 중심 구조",
    description:
      "예쁘기만 한 화면이 아니라 카카오 상담·예약 문의로 자연스럽게 이어지는 흐름을 설계합니다.",
    accent: "#D97706",
  },
];

const services = [
  {
    title: "Landing Launch",
    subtitle: "1페이지 임팩트 런치",
    description:
      "첫 홈페이지가 필요한 1인샵·소규모 업장이 가장 가볍게 시작할 수 있는 1페이지 패키지.",
    points: ["한 페이지 구조 설계", "카카오 · 예약 CTA", "모바일 최적화"],
  },
  {
    title: "Brand Site",
    subtitle: "브랜드를 설명하는 다층형 웹사이트",
    description:
      "메뉴, 가격, 위치, 예약 방법, 후기까지 차분하게 정리하는 4~5페이지 구성.",
    points: ["메뉴 · 가격 정보 정리", "프리미엄 UI", "SEO 기본 탑재"],
  },
  {
    title: "Growth Platform",
    subtitle: "확장 가능한 프리미엄 구축",
    description:
      "브랜드 확장, 프로그램 소개, 포트폴리오 축적까지 고려한 확장형 패키지.",
    points: ["다페이지 구조", "무제한 수정", "운영 연계"],
  },
];

const portfolio = [
  {
    name: "PulseStack",
    url: "https://velox-portfolio-saas.pages.dev",
    tag: "AI SaaS",
    desc: "대시보드형 SaaS 랜딩 구조를 미니 프로덕트 UI로 시각화해 제품 신뢰도를 즉시 전달하는 런치 페이지.",
    accent: "#D97706",
    badge: "실시간 리포트",
    metric: "전환 CTA 중심",
    hero: "from-[#D97706] via-[#E8A84C] to-[#FDF5EC]",
    header: "bg-[#FFF8F0]",
    panel: "bg-[#FDF5EC]",
    side: "bg-[#F8EDE0]",
  },
  {
    name: "Nova Legal",
    url: "https://velox-portfolio-legal.pages.dev",
    tag: "Law / Advisory",
    desc: "전문가 프로필, 상담 플로우, 신뢰 지표를 조합한 법률·자문형 고급 상담 사이트 레이아웃.",
    accent: "#B8602C",
    badge: "상담 예약 흐름",
    metric: "권위감 강화",
    hero: "from-[#B8602C] via-[#D4956C] to-[#FAF0EE]",
    header: "bg-[#FDF2F0]",
    panel: "bg-[#FAF0EE]",
    side: "bg-[#F5E8E5]",
  },
  {
    name: "Orbit Commerce",
    url: "https://velox-portfolio-commerce.pages.dev",
    tag: "D2C / Tech",
    desc: "상품 하이라이트와 베네핏 블록, 구매 유도 섹션을 결합한 커머스형 브랜드 페이지 구성.",
    accent: "#6B8F60",
    badge: "상품 USP 배치",
    metric: "구매 전환 최적화",
    hero: "from-[#6B8F60] via-[#A8C89C] to-[#F0F5EA]",
    header: "bg-[#F5F8F0]",
    panel: "bg-[#F0F5EA]",
    side: "bg-[#E8F0DE]",
  },
  {
    name: "NeonGrid",
    url: "https://velox-portfolio-startup.pages.dev",
    tag: "Startup Studio",
    desc: "포트폴리오·팀·파트너십 블록이 살아있는 투자사/스튜디오형 메인 페이지 시안.",
    accent: "#9B6DB0",
    badge: "파트너십 강조",
    metric: "브랜드 존재감 상승",
    hero: "from-[#9B6DB0] via-[#C4A8D4] to-[#F2F0FA]",
    header: "bg-[#F8F5FF]",
    panel: "bg-[#F2F0FA]",
    side: "bg-[#ECE8F5]",
  },
];

const plans = [
  {
    name: "STANDARD",
    price: "49,000원",
    originalPrice: "99,000원",
    discount: "50%",
    duration: "3일",
    featured: false,
    features: ["1페이지", "2회 수정", "모바일 반응형", "기본 SEO"],
  },
  {
    name: "DELUXE",
    price: "490,000원",
    originalPrice: "890,000원",
    discount: "45%",
    duration: "7일",
    featured: true,
    features: [
      "4-5페이지",
      "5회 수정",
      "브랜드 맞춤 구조",
      "Cloudflare 배포",
      "고급 SEO",
    ],
  },
  {
    name: "PREMIUM",
    price: "1,490,000원",
    originalPrice: "2,490,000원",
    discount: "40%",
    duration: "14-30일",
    featured: false,
    features: [
      "6페이지 이상",
      "무제한 수정",
      "전략 반영",
      "프리미엄 인터랙션",
      "운영 가이드",
    ],
  },
];

const testimonials = [
  {
    quote:
      "런칭 2주 안에 상담 문의가 이전 대비 2.4배 늘었습니다. 처음 통화부터 ‘사이트가 신뢰돼 보인다’는 말을 들었어요.",
    name: "김서준",
    role: "서준 법률사무소 대표 변호사",
    result: "상담 문의 2.4배 증가",
    rating: 5,
    avatar: "김",
  },
  {
    quote:
      "기존 외주 견적보다 훨씬 빠르게 오픈했는데도 퀄리티가 높았습니다. 첫 미팅 전환율이 31% 정도 올라갔습니다.",
    name: "박지윤",
    role: "TaxFlow 세무법인 마케팅 리드",
    result: "첫 미팅 전환율 31% 상승",
    rating: 5,
    avatar: "박",
  },
  {
    quote:
      "투자자와 파트너에게 보여줄 메인 사이트가 필요했는데, 7일 만에 ‘작은 팀처럼 안 보이는’ 인상을 만들었습니다.",
    name: "이도현",
    role: "Northstar Labs 스타트업 COO",
    result: "런칭 준비 기간 3주 단축",
    rating: 5,
    avatar: "이",
  },
];

const techStack = [
  { icon: Bot, label: "AI Workflow" },
  { icon: Code2, label: "Next.js 15" },
  { icon: Layers3, label: "shadcn/ui" },
  { icon: Sparkles, label: "Framer Motion" },
  { icon: Cloud, label: "Cloudflare Pages" },
  { icon: Globe, label: "SEO + JSON-LD" },
];

const faqs = [
  {
    q: "정말 7일 안에 가능한가요?",
    a: "네. 자료 전달과 방향 확정이 빠르면 DELUXE 기준 7일 안에 충분히 가능합니다. 인스타, 카카오, 예약 링크처럼 이미 운영 중인 채널이 있으면 더 빠르게 정리할 수 있습니다.",
  },
  {
    q: "왜 일반 외주보다 저렴하거나 빠를 수 있나요?",
    a: "기획부터 디자인 시스템, 개발, 배포까지 AI 기반 제작 파이프라인으로 압축하기 때문입니다. 인건비 구조를 줄이되 결과물은 프리미엄 랜딩 페이지 수준으로 맞춥니다.",
  },
  {
    q: "결과가 마음에 안 들면 어떻게 되나요?",
    a: "100% 재작업 보장을 제공합니다. 방향이 맞지 않거나 기대 결과에 미달하면 핵심 메시지·구조·비주얼을 다시 조정해 만족 가능한 상태까지 책임지고 수정합니다.",
  },
  {
    q: "1인샵이나 소규모 예약형 업장에 잘 맞나요?",
    a: "네. 네일샵, 필라테스, 공방, 에스테틱, 상담형 소규모 업장처럼 예약과 첫인상이 중요한 업종에 특히 잘 맞습니다. 과한 연출보다 차분한 신뢰감과 예약 동선을 중심으로 톤을 맞춥니다.",
  },
  {
    q: "SEO와 문의 전환 세팅도 포함되나요?",
    a: "포함됩니다. 메타태그, Open Graph, JSON-LD, sitemap, robots, 모바일 반응형, CTA 동선, 상담 폼까지 기본 세팅합니다.",
  },
  {
    q: "유지보수가 복잡하지 않나요?",
    a: "정적 배포 기반이라 운영이 단순합니다. 텍스트 수정, 섹션 교체, 포트폴리오 업데이트도 빠르게 반영할 수 있고 일반적인 월 서버비 부담도 거의 없습니다.",
  },
  {
    q: "무료 견적은 얼마나 걸리나요?",
    a: "이름과 연락처만 남겨주시면 3분 안에 접수되고, 보통 24시간 안에 범위·예산·납기를 정리한 무료 견적을 전달합니다.",
  },
];

type ContactFormState = {
  name: string;
  contact: string;
  website: string;
  plan: string;
};

function validateForm(values: ContactFormState) {
  const errors: Partial<Record<keyof ContactFormState, string>> = {};
  if (!values.name.trim()) errors.name = "이름을 입력해주세요.";
  if (!values.contact.trim()) {
    errors.contact = "연락처 또는 이메일을 입력해주세요.";
  }
  if (!values.website.trim()) {
    errors.website = "웹사이트 URL, 인스타그램 또는 예약 링크를 입력해주세요.";
  }
  return errors;
}

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white/80 text-sm font-black text-foreground shadow-[0_8px_22px_rgba(140,120,100,0.12)]">
        V
      </div>
      <div>
        <p className="display-title text-lg font-black">Velox Studio</p>
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          AI Web Agency
        </p>
      </div>
    </div>
  );
}

function TypeHeadline() {
  const reduceMotion = useReducedMotion();
  const [line1, setLine1] = useState(reduceMotion ? heroLines[0] : "");
  const [line2, setLine2] = useState(reduceMotion ? heroLines[1] : "");

  useEffect(() => {
    if (reduceMotion) return;

    let firstIndex = 0;
    let secondIndex = 0;

    const typeFirst = window.setInterval(() => {
      firstIndex += 1;
      setLine1(heroLines[0].slice(0, firstIndex));
      if (firstIndex >= heroLines[0].length) {
        window.clearInterval(typeFirst);
        const typeSecond = window.setInterval(() => {
          secondIndex += 1;
          setLine2(heroLines[1].slice(0, secondIndex));
          if (secondIndex >= heroLines[1].length) {
            window.clearInterval(typeSecond);
          }
        }, 42);
      }
    }, 28);

    return () => window.clearInterval(typeFirst);
  }, [reduceMotion]);

  return (
    <h1 className="display-title text-5xl font-black leading-[0.95] sm:text-6xl lg:text-[88px] xl:text-[104px]">
      <span className="block">{line1 || "\u00A0"}</span>
      <span className="block bg-gradient-to-r from-[#D97706] via-[#1A1410] to-[#B8602C] bg-clip-text text-transparent">
        {line2 || "\u00A0"}
      </span>
      {!reduceMotion &&
        (line2.length < heroLines[1].length ||
          line1.length < heroLines[0].length) && (
          <span
            className="ml-2 inline-block h-[0.9em] w-[0.08em] animate-pulse bg-primary align-middle"
            aria-hidden="true"
          />
        )}
    </h1>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("usp");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    contact: "",
    website: "",
    plan: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormState, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.04]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -36]);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    setSuccess("");
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          message: `빠른 무료 견적 요청\n이름: ${form.name}\n연락처: ${form.contact}`,
          _subject: `[Velox Studio] 첫 홈페이지 문의 - ${form.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) throw new Error("submit failed");

      setForm({ name: "", contact: "", website: "", plan: "" });
      setSuccess(
        "무료 홈페이지 진단 요청이 접수되었습니다. 보통 24시간 안에 첫 홈페이지 구성 방향과 개선 포인트를 정리해 회신드립니다.",
      );
    } catch {
      setSubmitError(
        "전송에 실패했습니다. 잠시 후 다시 시도하거나 아래 이메일로 바로 문의해주세요.",
      );
    } finally {
      setSubmitting(false);
    }
  }



  function selectPlan(planName: string) {
    setForm((prev) => ({ ...prev, plan: planName }));
    setErrors((prev) => ({ ...prev }));

    const section = document.getElementById("contact");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      const field = document.getElementById("plan-field") as HTMLInputElement | null;
      field?.focus();
    }, 350);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Velox Studio",
    url: SITE_URL,
    description: "AI 기반 프리미엄 웹사이트 제작 에이전시",
    areaServed: "KR",
    priceRange: "₩99,000 - ₩2,490,000",
    email: CONTACT_EMAIL,
    serviceType: [
      "Website Design",
      "Website Development",
      "Landing Page",
      "SEO",
    ],
  };

  return (
    <main className="overflow-x-hidden pb-24 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
        <div className="container-shell">
          <div className="soft-card flex items-center justify-between rounded-full px-4 py-3 md:px-6">
            <a href="#top" aria-label="Velox Studio 홈으로 이동">
              <BrandMark />
            </a>

            <nav className="hidden items-center gap-6 md:flex">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium ${activeSection === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_10px_26px_rgba(140,120,100,0.14)] hover:scale-[1.02] md:inline-flex"
              >
                무료 상담 시작
              </a>
              <button
                type="button"
                aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 md:hidden"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="soft-card mt-3 rounded-[28px] p-4 md:hidden">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary/35 hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <section id="top" className="relative pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(232,226,218,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(232,226,218,0.7)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle,black,transparent_80%)] opacity-60" />
        <div className="container-shell py-10 md:py-16">
          <motion.div
            className="mesh-panel soft-card relative overflow-hidden rounded-[32px] px-6 py-10 md:px-10 md:py-14"
            style={reduceMotion ? undefined : { scale: heroScale, y: heroY }}
          >
            <div className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-accent/10 blur-2xl" />
            <div className="absolute bottom-10 right-16 h-40 w-40 rounded-full bg-[#C89B6D]/12 blur-2xl" />

            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <Reveal>
                  <div className="flex flex-col items-start gap-3">
                    <div className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 shadow-sm">
                      🎉 런칭 기념 최대 50% 할인 — 선착순 5팀 한정
                    </div>
                    <div className="section-chip border-primary/20 text-primary">
                      <Sparkles className="h-3.5 w-3.5" />
                      1인샵 · 소규모 예약형 업장에 최적화
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.06}>
                  <div className="mt-6 max-w-4xl">
                    <TypeHeadline />
                  </div>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                    인스타그램, 카카오톡, 예약 정보를 한 페이지에 정리해
                    처음 방문한 고객이 바로 이해하고 연락할 수 있게 만듭니다.
                    첫 홈페이지가 필요한 1인샵·극소규모 업장에 특히 잘 맞는
                    구조를 7일 안에 완성합니다.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#contact"
                      className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-7 text-sm font-black text-white shadow-[0_12px_28px_rgba(140,120,100,0.14)] hover:shadow-[0_16px_34px_rgba(140,120,100,0.16)]"
                    >
                      3분 안에 무료 견적 받기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                    <a
                      href={KAKAO_URL}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex h-14 items-center justify-center rounded-full border-2 border-[#E2CA00] bg-[#FEE500] px-7 text-sm font-black text-[#181600] shadow-[0_16px_34px_rgba(254,229,0,0.30)] hover:-translate-y-0.5 hover:shadow-[0_20px_38px_rgba(254,229,0,0.36)]"
                    >
                      💬 카카오톡 상담
                    </a>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-foreground/80">
                    <span className="rounded-full border border-[#C89B6D]/30 bg-[#C89B6D]/10 px-3 py-1 text-[#9A6A42]">
                      100% 재작업 보장
                    </span>
                    <span className="rounded-full border border-border bg-white/80 px-3 py-1">
                      Cloudflare Pages 파트너급 배포 워크플로우
                    </span>
                    <span className="rounded-full border border-border bg-white/80 px-3 py-1">
                      모바일 하단 CTA 최적화
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={0.24}>
                  <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      ["49,000원~", "첫 홈페이지 시작가"],
                      ["7일", "평균 완성"],
                      ["1페이지", "예약 정보 집중 정리"],
                      ["24시간", "1차 견적 회신"],
                    ].map(([value, label]) => (
                      <div
                        key={label}
                        className="rounded-[24px] border border-border bg-secondary px-4 py-4"
                      >
                        <p className="display-title text-3xl font-black">
                          {value}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.16} className="lg:pl-6">
                <div className="relative rounded-[28px] border border-border bg-white/80 p-4 soft-card">
                  <div className="rounded-[24px] border border-border bg-white p-4">
                    <div className="flex items-center justify-between border-b border-border pb-3 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                      <span>첫 홈페이지 미리보기</span>
                      <span>예약 전환형 구조</span>
                    </div>
                    <div className="space-y-4 pt-4">
                      <div className="h-3 w-24 rounded-full bg-primary/70" />
                      <div className="h-12 rounded-[18px] bg-gradient-to-r from-white via-[#D97706]/80 to-[#B8602C]/80" />
                      <div className="h-3 w-4/5 rounded-full bg-white/60" />
                      <div className="h-3 w-3/5 rounded-full bg-[#F5F0EB]" />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-28 rounded-[20px] bg-primary/12" />
                        <div className="h-28 rounded-[20px] bg-accent/12" />
                      </div>
                      <div className="h-24 rounded-[20px] bg-[#C89B6D]/10" />
                    </div>
                  </div>
                  <div className="absolute -right-5 -top-5 rounded-full border border-accent/25 bg-[#f8efe7] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-accent shadow-[0_10px_24px_rgba(140,120,100,0.12)]">
                    Small Shop Fit
                  </div>
                </div>
              </Reveal>
            </div>
          </motion.div>

          <a
            href="#usp"
            className="mx-auto mt-8 flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            아래로 스크롤
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section id="usp" className="container-shell py-24 md:py-28">
        <Reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="section-chip border-accent/20 text-accent">
                USP
              </div>
              <h2 className="display-title mt-5 text-4xl font-black md:text-6xl">
                처음 만드는 홈페이지도
                <span className="block text-muted-foreground">
                  부담 없이 잘 시작하는 네 가지 기준.
                </span>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-muted-foreground">
              1인샵과 극소규모 업장은 복잡한 사이트보다, 고객이 필요한 정보를
              한 번에 보고 바로 연락할 수 있는 구조가 더 중요합니다. Velox는 그
              핵심만 깔끔하게 정리해 첫 홈페이지의 부담을 낮춥니다.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {uspItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <motion.article
                  className="soft-card h-full rounded-[28px] p-6"
                  whileHover={reduceMotion ? undefined : { scale: 1.03, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                    style={{
                      borderColor: `${item.accent}55`,
                      color: item.accent,
                      boxShadow: `0 0 22px ${item.accent}22`,
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="services" className="container-shell py-24 md:py-28">
        <Reveal>
          <div>
            <div className="section-chip border-primary/20 text-primary">
              서비스
            </div>
            <h2 className="display-title mt-5 text-4xl font-black md:text-6xl">
              작은 업장에 맞는 구조로, 필요한 정보만 선명하게.
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -8 }}
                className="group soft-card h-full rounded-[30px] border border-border p-[1px]"
              >
                <div className="h-full rounded-[29px] bg-white p-7 transition group-hover:border-primary/20 group-hover:shadow-[0_0_0_1px_rgba(217,119,6,0.12),0_18px_34px_rgba(140,120,100,0.10)]">
                  <p className="text-xs uppercase tracking-[0.24em] text-primary">
                    {service.subtitle}
                  </p>
                  <h3 className="display-title mt-4 text-3xl font-black">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#C89B6D] shadow-[0_6px_14px_rgba(140,120,100,0.12)]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="portfolio" className="container-shell py-24 md:py-28">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="section-chip border-[#C89B6D]/30 text-[#9A6A42]">
                포트폴리오
              </div>
              <h2 className="display-title mt-5 text-4xl font-black md:text-6xl">
                업장별로 바로 떠올릴 수 있는 홈페이지 예시.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
              뷰티샵, 공방, 필라테스, 네일샵처럼 예약형 소규모 업장이 어떤 식으로
              정보를 정리하면 좋은지 한눈에 감을 잡을 수 있게 구성했습니다.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {portfolio.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.06}>
              <motion.article
                whileHover={reduceMotion ? undefined : { scale: 1.015 }}
                className="group soft-card overflow-hidden rounded-[30px] p-4"
              >
                <div className="rounded-[24px] border border-border bg-white p-4 transition group-hover:shadow-[0_0_0_1px_rgba(184,96,44,0.12),0_0_42px_rgba(184,96,44,0.10)]">
                  <a
                    href={item.url}
                    target={item.url.startsWith("http") ? "_blank" : undefined}
                    rel={item.url.startsWith("http") ? "noopener" : undefined}
                    className="block rounded-[22px] border border-border bg-gradient-to-br from-white/5 via-transparent to-transparent p-4 transition hover:-translate-y-0.5"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-flex rounded-full border border-border bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-foreground/70">
                        {item.badge}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                        {item.metric}
                      </span>
                    </div>
                    <div className="overflow-hidden rounded-[20px] border border-border bg-[#fcfbf8] shadow-[0_18px_40px_rgba(140,120,100,0.12)]">
                      <div
                        className={`flex items-center justify-between px-4 py-2 ${item.header}`}
                      >
                        <div className="flex gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#D08A5B]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#E3B267]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#B98E5F]" />
                        </div>
                        <div className="h-2 w-24 rounded-full bg-[#F5F0EB]" />
                      </div>
                      <div className="grid gap-0 md:grid-cols-[1.28fr_0.72fr]">
                        <div
                          className={`border-r border-border/70 p-4 ${item.panel}`}
                        >
                          <div
                            className={`rounded-[18px] bg-gradient-to-r ${item.hero} px-4 py-5`}
                          >
                            <div className="h-2.5 w-16 rounded-full bg-[#8C7864]/22" />
                            <div className="mt-3 h-7 w-4/5 rounded-full bg-[#8C7864]/38" />
                            <div className="mt-2 h-2.5 w-3/5 rounded-full bg-[#8C7864]/18" />
                            <div className="mt-4 flex gap-2">
                              <div className="h-9 w-24 rounded-full bg-[#8C7864]/48" />
                              <div className="h-9 w-16 rounded-full bg-white/70" />
                            </div>
                          </div>
                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-[18px] bg-white/80 p-3">
                              <div className="h-2.5 w-20 rounded-full bg-[#e7ddd3]" />
                              <div className="mt-3 h-16 rounded-[14px] bg-[#F5F0EB]" />
                              <div className="mt-3 h-2 w-4/5 rounded-full bg-[#EEE6DD]" />
                            </div>
                            <div className="rounded-[18px] bg-white/80 p-3">
                              <div className="h-2.5 w-14 rounded-full bg-[#e7ddd3]" />
                              <div className="mt-3 grid gap-2">
                                <div className="h-9 rounded-[12px] bg-[#F5F0EB]" />
                                <div className="h-9 rounded-[12px] bg-[#F7F2EC]" />
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 rounded-[18px] bg-white/80 p-3">
                            <div className="flex items-center justify-between">
                              <div className="h-2.5 w-[72px] rounded-full bg-[#e7ddd3]" />
                              <div
                                className="h-6 w-16 rounded-full"
                                style={{ backgroundColor: `${item.accent}33` }}
                              />
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2">
                              <div className="h-12 rounded-[12px] bg-[#F5F0EB]" />
                              <div className="h-12 rounded-[12px] bg-[#FAF6F1]" />
                              <div className="h-12 rounded-[12px] bg-[#F5F0EB]" />
                            </div>
                          </div>
                        </div>
                        <div className={`p-4 ${item.side}`}>
                          <div className="rounded-[18px] bg-[#f1e8de] p-3">
                            <div className="h-2.5 w-12 rounded-full bg-[#e7ddd3]" />
                            <div
                              className="mt-3 h-20 rounded-[14px]"
                              style={{ backgroundColor: `${item.accent}26` }}
                            />
                          </div>
                          <div className="mt-3 rounded-[18px] bg-[#f1e8de] p-3">
                            <div className="h-2.5 w-14 rounded-full bg-[#e7ddd3]" />
                            <div className="mt-3 space-y-2">
                              <div className="h-2 rounded-full bg-white/14" />
                              <div className="h-2 rounded-full bg-[#F5F0EB]" />
                              <div className="h-2 w-4/5 rounded-full bg-[#F5F0EB]" />
                            </div>
                          </div>
                          <div className="mt-3 grid gap-3">
                            <div
                              className="rounded-[18px] p-3"
                              style={{ backgroundColor: `${item.accent}1f` }}
                            >
                              <div className="h-2.5 w-16 rounded-full bg-[#e7ddd3]" />
                              <div className="mt-3 h-10 rounded-[12px] bg-[#F5F0EB]" />
                            </div>
                            <div className="rounded-[18px] bg-white/80 p-3">
                              <div className="h-2.5 w-10 rounded-full bg-[#e7ddd3]" />
                              <div className="mt-3 grid grid-cols-2 gap-2">
                                <div className="h-8 rounded-[12px] bg-[#F5F0EB]" />
                                <div className="h-8 rounded-[12px] bg-[#F5F0EB]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      {item.tag}
                    </p>
                    <h3 className="display-title mt-3 text-3xl font-black">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.desc}
                    </p>
                    <a
                      href={item.url}
                      target={item.url.startsWith("http") ? "_blank" : undefined}
                      rel={item.url.startsWith("http") ? "noopener" : undefined}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent"
                    >
                      {item.url.startsWith("http") ? "실제 라이브 사이트 보기" : "라이브 링크 준비 중"}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="testimonials" className="container-shell py-24 md:py-28">
        <Reveal>
          <div>
            <div className="section-chip border-primary/20 text-primary">
              후기
            </div>
            <h2 className="display-title mt-5 text-4xl font-black md:text-6xl">
              작은 업장도, 홈페이지 하나로 인상이 달라집니다.
            </h2>
          </div>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            "첫 홈페이지 49,000원부터",
            "7일 완성",
            "카카오 CTA 유지",
            "모바일 최적화",
          ].map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-border bg-white/80 px-4 py-2 text-xs font-semibold text-foreground/80"
            >
              {badge}
            </span>
          ))}
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.quote} delay={index * 0.08}>
              <blockquote className="soft-card h-full rounded-[28px] p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-gradient-to-br from-[#D97706]/30 to-[#B8602C]/30 text-lg font-black text-foreground">
                    {item.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[#9A6A42]">
                      {Array.from({ length: item.rating }).map(
                        (_, starIndex) => (
                          <span key={starIndex}>★</span>
                        ),
                      )}
                    </div>
                    <p className="mt-1 font-bold text-foreground">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </div>
                <p className="mt-6 text-lg leading-8 text-foreground/92">
                  “{item.quote}”
                </p>
                <footer className="mt-8 inline-flex rounded-full border border-[#C89B6D]/22 bg-[#C89B6D]/10 px-3 py-1 text-sm font-semibold text-[#9A6A42]">
                  {item.result}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="free-diagnosis" className="container-shell py-24 md:py-28">
        <Reveal>
          <div className="rounded-[34px] border border-[#E8D8C8] bg-gradient-to-br from-[#FFF8F1] via-[#FFFDF8] to-[#F8EFE7] p-[1px] shadow-[0_24px_60px_rgba(190,120,56,0.10)]">
            <div className="mesh-panel rounded-[33px] px-6 py-8 md:px-10 md:py-12">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <div className="section-chip border-primary/20 text-primary">
                    무료 홈페이지 진단 받기
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold">
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary">
                      24시간 내 회신
                    </span>
                    <span className="rounded-full border border-[#C89B6D]/25 bg-[#FFF4E8] px-3 py-1 text-[#9A6A42]">
                      문제 3가지 + 개선점 3가지
                    </span>
                    <span className="rounded-full border border-[#E2CA00]/50 bg-[#FEE500] px-3 py-1 text-[#181600]">
                      사이트 없는 1인샵도 가능
                    </span>
                  </div>
                  <h2 className="display-title mt-6 text-4xl font-black leading-tight md:text-6xl">
                    홈페이지가 아직 없거나 약해도, 지금 어디서부터 시작하면 좋을지 무료로 정리해드립니다
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                    인스타그램, 카카오 채널, 예약 링크만 있어도 괜찮습니다. 지금 보이는 정보만 기준으로 첫 홈페이지에 꼭 들어가야 할 내용과 개선 포인트를 24시간 안에 정리해드립니다.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {[
                      "인스타 · 카카오 · 예약정보 정리 포인트",
                      "첫 화면 메시지 · 신뢰 요소 점검",
                      "첫 홈페이지 구성 추천",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[24px] border border-white/70 bg-white/80 px-5 py-5 text-sm font-semibold text-foreground shadow-[0_10px_24px_rgba(140,120,100,0.08)]"
                      >
                        <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          ✓
                        </span>
                        <p className="leading-6">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] border border-[#E8D8C8] bg-white/88 p-6 shadow-[0_18px_40px_rgba(140,120,100,0.10)]">
                  <p className="text-sm font-bold tracking-[0.18em] text-[#9A6A42]">FREE DIAGNOSIS</p>
                  <h3 className="mt-4 text-2xl font-black text-foreground md:text-3xl">
                    상담 전에, 지금 있는 채널만으로도 방향부터 잡아보세요.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    긴 미팅 없이도 가능합니다. 사이트가 없어도 인스타, 카카오, 예약 링크만 보내주시면 실전형 피드백으로 바로 방향을 잡아드립니다.
                  </p>
                  <div className="mt-6 space-y-3 rounded-[24px] border border-primary/15 bg-[#FFF8F0] p-5 text-sm text-foreground/85">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-primary" />
                      <p>첫 화면에 무엇을 넣어야 예약 문의가 쉬워지는지 함께 봅니다.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#B8602C]" />
                      <p>인스타·카카오·예약 정보를 어떻게 한 페이지로 묶을지 구체적으로 짚어드립니다.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#C89B6D]" />
                      <p>무료 진단 후 원하실 때만 제작 상담으로 이어가시면 됩니다.</p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#contact"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(140,120,100,0.16)] hover:-translate-y-0.5"
                    >
                      첫 홈페이지 상담하기
                    </a>
                    <a
                      href={KAKAO_URL}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#E2CA00] bg-[#FEE500] px-5 text-sm font-black text-[#181600] shadow-[0_14px_30px_rgba(254,229,0,0.26)] hover:-translate-y-0.5"
                    >
                      카카오로 URL 보내기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="pricing" className="container-shell py-24 md:py-28">
        <Reveal>
          <div className="text-center">
            <div className="section-chip border-accent/20 text-accent">
              가격
            </div>
            <div className="mx-auto mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 shadow-sm">
              <span>🔥 현재 2자리 남음</span>
              <span className="hidden text-red-300 sm:inline">•</span>
              <span>선착순 5팀 런칭 프로모션</span>
            </div>
            <h2 className="display-title mt-5 text-4xl font-black md:text-6xl">
              첫 홈페이지는 가볍게 시작하고, 인상은 가볍지 않게.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
              처음부터 큰 사이트를 만들 필요는 없습니다. Velox Studio는 첫
              홈페이지에 꼭 필요한 구조만 정리해 빠르게 오픈하고, 예약 문의가
              바로 이어질 수 있는 동선부터 만듭니다.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <div className="soft-card rounded-[28px] p-6 text-left">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                일반 외주
              </p>
              <p className="mt-4 text-3xl font-black text-foreground/90">
                100만~수백만원
              </p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>첫 홈페이지치고 부담 큰 견적</li>
                <li>일정이 길고 준비 자료가 많음</li>
                <li>작은 업장엔 과한 구성 제안</li>
              </ul>
            </div>
            <div className="soft-card rounded-[28px] border border-primary/20 p-6 text-left shadow-[0_16px_32px_rgba(140,120,100,0.10)]">
              <p className="text-xs uppercase tracking-[0.24em] text-primary">
                Velox START / DELUXE
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground line-through">89만원</span>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                  런칭 기념 45% 할인
                </span>
              </div>
              <p className="mt-2 text-3xl font-black">49만원</p>
              <p className="mt-2 text-xs font-semibold text-red-600">선착순 5팀 한정 · 4/30까지</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>49,000원부터 시작 가능</li>
                <li>7일 안에 완성</li>
                <li>인스타 · 카카오 · 예약 링크 정리</li>
              </ul>
            </div>
            <div className="soft-card rounded-[28px] p-6 text-left">
              <p className="text-xs uppercase tracking-[0.24em] text-[#9A6A42]">
                예상 효과
              </p>
              <p className="mt-4 text-3xl font-black text-[#9A6A42]">
                첫인상과 예약 동선만 정리돼도 체감이 큽니다
              </p>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                1인샵과 소규모 업장은 고객이 필요한 정보를 빠르게 찾고 연락할 수
                있게 만드는 것만으로도 체감 차이가 큽니다. 비싼 구축보다 먼저,
                잘 정리된 첫 페이지가 중요합니다.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
              <article
                className={`rounded-[32px] p-[1px] ${plan.featured ? "bg-gradient-to-br from-[#D97706] via-[#B8602C] to-[#C89B6D] shadow-[0_18px_36px_rgba(140,120,100,0.12)]" : "bg-[#F5F0EB]"}`}
              >
                <div className="soft-card flex h-full flex-col rounded-[31px] p-8">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold tracking-[0.18em] text-muted-foreground">
                      {plan.name}
                    </p>
                    <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-black text-red-600">
                      선착순 5팀
                    </span>
                    {plan.featured && (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-black">
                        추천
                      </span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                        런칭 기념 {plan.discount} 할인
                      </span>
                    </div>
                  )}
                  <p className="display-title mt-2 text-5xl font-black">
                    {plan.price}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-red-600">
                    선착순 5팀 한정 · 4/30까지
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    납기 {plan.duration}
                  </p>
                  <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-primary shadow-[0_6px_14px_rgba(140,120,100,0.14)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => selectPlan(plan.name)}
                    className={`mt-10 inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-black ${plan.featured ? "bg-primary text-white" : "border border-border bg-white/80 text-foreground hover:border-primary/35"}`}
                  >
                    {plan.name} 문의하기
                  </button>
                  <p className="mt-3 text-xs text-accent font-semibold">🔥 현재 2자리 남음</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-[#C89B6D]/22 bg-secondary px-6 py-5 text-center">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-[#9A6A42]">
                  ✓ 결과 미달 시 100% 재작업
                </span>
                <br />
                만족 가능한 방향이 나올 때까지 핵심 구조를 다시 다듬습니다.
              </p>
            </div>
            <div className="rounded-[24px] border border-primary/20 bg-secondary px-6 py-5 text-center">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-primary">
                  ✓ 납기 지연 최소화
                </span>
                <br />
                자료 전달이 끝나면 일정표 기준으로 빠르게 제작을 진행합니다.
              </p>
            </div>
            <div className="rounded-[24px] border border-accent/20 bg-secondary px-6 py-5 text-center">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-accent">
                  ✓ 3분 무료 견적 접수
                </span>
                <br />
                이름과 연락처만 남기면 빠르게 범위와 예산을 안내합니다.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="tech-stack" className="container-shell py-24 md:py-28">
        <Reveal>
          <div className="soft-card rounded-[32px] px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="section-chip border-[#C89B6D]/30 text-[#9A6A42]">
                  Tech Stack
                </div>
                <h2 className="display-title mt-5 text-4xl font-black md:text-5xl">
                  빠르게 만들고, 오래 운영하는 기술 선택.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Next.js 15, Tailwind, shadcn/ui, Framer Motion, Cloudflare Pages
                조합으로 성능과 유연성을 동시에 확보합니다.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
              {techStack.map((item, index) => {
                const Icon = item.icon;
                const accents = [
                  "#D97706",
                  "#B8602C",
                  "#C89B6D",
                  "#D97706",
                  "#B8602C",
                  "#C89B6D",
                ];
                return (
                  <Reveal key={item.label} delay={index * 0.04}>
                    <div className="rounded-[24px] border border-border bg-secondary px-4 py-5">
                      <Icon
                        className="h-5 w-5"
                        style={{ color: accents[index] }}
                      />
                      <p className="mt-4 text-sm font-semibold">{item.label}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="faq" className="container-shell py-24 md:py-28">
        <Reveal>
          <div>
            <div className="section-chip border-accent/20 text-accent">FAQ</div>
            <h2 className="display-title mt-5 text-4xl font-black md:text-6xl">
              자주 묻는 질문
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="soft-card mt-10 rounded-[30px] p-4 md:p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${index}`}
                  className="border-b border-border px-2 md:px-4"
                >
                  <AccordionTrigger className="text-left text-base font-bold hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-3xl text-sm leading-7 text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      <section className="container-shell pb-6">
        <Reveal>
          <div className="rounded-[30px] border border-[#E8D8C8] bg-gradient-to-r from-[#FFF8F0] via-[#FFFCF7] to-[#F8EFE7] px-6 py-6 shadow-[0_16px_38px_rgba(140,120,100,0.08)] md:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-black tracking-[0.18em] text-[#9A6A42]">FREE DIAGNOSIS CTA</p>
                <h3 className="mt-2 text-2xl font-black text-foreground md:text-3xl">
                  홈페이지 URL만 보내주시면, 24시간 안에 핵심 문제 3가지와 개선점 3가지를 드립니다.
                </h3>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-black text-white"
                >
                  첫 홈페이지 상담하기
                </a>
                <a
                  href={KAKAO_URL}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#E2CA00] bg-[#FEE500] px-5 text-sm font-black text-[#181600]"
                >
                  카카오로 URL 보내기
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="container-shell py-24 md:py-28">
        <Reveal>
          <div className="mesh-panel soft-card rounded-[34px] px-6 py-8 md:px-10 md:py-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
              <div>
                <div className="section-chip border-primary/20 text-primary">
                  문의
                </div>
                <div className="mt-5 inline-flex rounded-full border border-accent/20 bg-[#f8efe7] px-4 py-2 text-sm text-foreground">
                  이번 달 잔여 슬롯:{" "}
                  <strong className="ml-2 text-accent">3자리</strong>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-foreground/80">
                  <span className="rounded-full border border-[#C89B6D]/30 bg-[#C89B6D]/10 px-3 py-1 text-[#9A6A42]">
                    24시간 내 무료 진단 회신
                  </span>
                  <span className="rounded-full border border-border bg-white/80 px-3 py-1">
                    문제 3가지 + 개선점 3가지
                  </span>
                  <span className="rounded-full border border-border bg-white/80 px-3 py-1">
                    웹사이트 URL만 보내도 시작 가능
                  </span>
                </div>
                <h2 className="display-title mt-5 text-4xl font-black md:text-6xl">
                  지금 시작하면,
                  <span className="block text-muted-foreground">
                    이번 주 안에 첫 홈페이지를 열 수 있습니다.
                  </span>
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                  사이트가 아직 없어도 괜찮습니다. 이름과 연락처, 인스타그램 또는 예약 링크만 남겨주시면 24시간 안에 첫 홈페이지 구성과 개선 포인트를 정리해드립니다.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={KAKAO_URL}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#E2CA00] bg-[#FEE500] px-5 text-sm font-black text-[#181600] shadow-[0_14px_30px_rgba(254,229,0,0.26)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(254,229,0,0.34)]"
                  >
                    💬 카카오톡 상담
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white/80 px-5 text-sm font-bold text-foreground"
                  >
                    <MessageCircleMore className="mr-2 h-4 w-4" />
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-[28px] border border-border bg-white/80 p-5 md:p-6"
              >
                <div className="mb-5 rounded-[22px] border border-primary/20 bg-primary/10 p-4 text-sm text-foreground/90">
                  <p className="font-bold text-primary">
                    무료 홈페이지 진단 접수
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    사이트가 없으면 인스타그램, 카카오 채널, 예약 링크를 보내주셔도 됩니다. 접수 후 24시간 안에 첫 홈페이지 구성과 개선 포인트를 정리해 안내드립니다.
                  </p>
                </div>
                <div className="grid gap-4">
                  <label className="grid gap-2 text-sm" htmlFor="plan-field">
                    <span>문의 유형</span>
                    <select
                      id="plan-field"
                      aria-label="문의 유형"
                      value={form.plan}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, plan: e.target.value }))
                      }
                      className="h-12 rounded-2xl border border-primary/20 bg-primary/10 px-4 font-semibold text-foreground"
                    >
                      <option value="">선택해주세요</option>
                      <option value="무료 홈페이지 진단">무료 홈페이지 진단</option>
                      <option value="DELUXE">DELUXE</option>
                      <option value="PREMIUM">PREMIUM</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm" htmlFor="name">
                    <span>이름 *</span>
                    <input
                      id="name"
                      aria-label="이름"
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="h-12 rounded-2xl border border-border bg-white/80 px-4"
                      placeholder="홍길동"
                    />
                    {errors.name && (
                      <span
                        id="name-error"
                        className="text-sm text-[#b94a48]"
                        role="alert"
                      >
                        {errors.name}
                      </span>
                    )}
                  </label>
                  <label className="grid gap-2 text-sm" htmlFor="website-field">
                    <span>웹사이트 URL / 인스타 / 예약 링크 *</span>
                    <input
                      id="website-field"
                      aria-label="웹사이트 URL"
                      required
                      aria-invalid={Boolean(errors.website)}
                      aria-describedby={errors.website ? "website-error" : undefined}
                      value={form.website}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                      className="h-12 rounded-2xl border border-border bg-white/80 px-4"
                      placeholder="사이트가 없으면 인스타그램 또는 예약 링크를 남겨주세요"
                    />
                    <span className="text-xs text-muted-foreground">
                      사이트가 아직 없어도 인스타그램, 카카오 채널, 예약 링크 중 하나만 보내주시면 됩니다.
                    </span>
                    {errors.website && (
                      <span
                        id="website-error"
                        className="text-sm text-[#b94a48]"
                        role="alert"
                      >
                        {errors.website}
                      </span>
                    )}
                  </label>
                  <label className="grid gap-2 text-sm" htmlFor="contact-field">
                    <span>연락처 또는 이메일 *</span>
                    <input
                      id="contact-field"
                      aria-label="연락처 또는 이메일"
                      required
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={
                        errors.contact ? "contact-error" : undefined
                      }
                      value={form.contact}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          contact: e.target.value,
                        }))
                      }
                      className="h-12 rounded-2xl border border-border bg-white/80 px-4"
                      placeholder="010-0000-0000 또는 hello@company.com"
                    />
                    {errors.contact && (
                      <span
                        id="contact-error"
                        className="text-sm text-[#b94a48]"
                        role="alert"
                      >
                        {errors.contact}
                      </span>
                    )}
                  </label>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-primary text-sm font-black text-white shadow-[0_12px_28px_rgba(140,120,100,0.14)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "전송 중..." : "무료 진단 요청하기"}
                  </button>
                  {success && (
                    <p className="text-sm text-[#9A6A42]">{success}</p>
                  )}
                  {submitError && (
                    <p className="text-sm text-[#b94a48]">{submitError}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-border py-10">
        <div className="container-shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              Velox Studio는 1인샵과 극소규모 업장이 첫 홈페이지를 부담 없이
              시작할 수 있도록, 빠른 제작과 정돈된 첫인상을 함께 설계합니다.
            </p>
          </div>
          <div className="grid gap-2 text-sm text-muted-foreground md:text-right">
            <a href={SITE_URL} className="hover:text-foreground">
              {SITE_URL.replace("https://", "")}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hover:text-foreground"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener"
              className="font-semibold text-[#7A6500] hover:text-foreground"
            >
              카카오톡 상담
            </a>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/92 px-4 py-3 md:hidden">
        <div className="mx-auto flex max-w-[1280px] gap-3">
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full border-2 border-[#E2CA00] bg-[#FEE500] text-sm font-black text-[#181600] shadow-[0_12px_26px_rgba(254,229,0,0.28)]"
          >
            💬 카카오톡 상담
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-primary text-sm font-black text-white"
          >
            첫 홈페이지 상담
          </a>
        </div>
      </div>
    </main>
  );
}
