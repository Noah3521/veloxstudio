import type { Metadata } from "next";

const DEFAULT_CTA_LINK = "#contact";

type LinkItem = {
  label: string;
  href: string;
};

type CardItem = {
  title: string;
  description: string;
};

type PageItem = {
  name: string;
  summary: string;
};

type PricePlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
};

type IndustryLandingProps = {
  slug: "lawyer" | "tax";
  navLabel: string;
  accent: "cyan" | "blue";
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref?: string;
  badgeItems: string[];
  problemTitle: string;
  problems: CardItem[];
  methodTitle: string;
  methods: CardItem[];
  pagesTitle: string;
  pages: PageItem[];
  extraSection?: {
    eyebrow: string;
    title: string;
    items: CardItem[];
  };
  processTitle: string;
  process: string[];
  pricingTitle: string;
  pricingNote: string;
  pricingPlans: PricePlan[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  finalTitle: string;
  finalDescription: string;
  finalHighlight?: string;
};

const accentThemes = {
  cyan: {
    softText: "text-electric",
    pill: "border-electric/20 bg-electric/10 text-electric",
    glow: "from-electric/18 via-transparent to-emerald/10",
    button: "from-electric to-emerald text-navy",
    cardRing: "from-electric/30 via-white/0 to-emerald/25",
    timeline: "from-electric/60 via-emerald/35 to-transparent",
    spotlight: "bg-electric/[0.07]",
  },
  blue: {
    softText: "text-sky-300",
    pill: "border-sky-300/20 bg-sky-300/10 text-sky-200",
    glow: "from-sky-400/20 via-transparent to-blue-500/15",
    button: "from-sky-300 to-blue-500 text-slate-950",
    cardRing: "from-sky-300/30 via-white/0 to-blue-500/25",
    timeline: "from-sky-300/60 via-blue-400/35 to-transparent",
    spotlight: "bg-sky-300/[0.07]",
  },
} as const;

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
      <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
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
      className="transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden="true"
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

function SectionHeading({
  eyebrow,
  title,
  description,
  accentClass,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  accentClass: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-semibold uppercase tracking-[0.28em] ${accentClass}`}>
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function buildIndustryMetadata({
  title,
  subtitle,
  slug,
}: Pick<IndustryLandingProps, "title" | "subtitle" | "slug">): Metadata {
  const url = `https://veloxstudio.co/${slug}`;

  return {
    title: `${title} | Velox Studio`,
    description: subtitle,
    openGraph: {
      title: `${title} | Velox Studio`,
      description: subtitle,
      url,
      siteName: "Velox Studio",
      locale: "ko_KR",
      type: "website",
    },
    alternates: { canonical: url },
  };
}

export function IndustryLanding(props: IndustryLandingProps) {
  const theme = accentThemes[props.accent];
  const ctaHref = props.ctaHref ?? DEFAULT_CTA_LINK;
  const navLinks: LinkItem[] = [
    { label: "문제", href: "#problems" },
    { label: "구성", href: "#pages" },
    { label: "가격", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-[140px] ${theme.spotlight}`} />
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/[0.03] to-transparent" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
          <a href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.14em] text-white uppercase">
            <VeloxLogo />
            <span className="hidden sm:inline">Velox Studio</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={ctaHref}
            className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 ${theme.pill}`}
          >
            {props.ctaLabel}
          </a>
        </div>
      </header>

      <main className="relative">
        <section className="px-5 pb-20 pt-20 sm:px-6 sm:pt-24 md:pb-28">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] ${theme.pill}`}>
                {props.eyebrow}
              </div>
              <h1 className="mt-8 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                {props.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {props.subtitle}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={ctaHref}
                  className={`group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r px-7 text-base font-semibold shadow-[0_24px_60px_rgba(8,15,32,0.35)] transition duration-300 hover:-translate-y-0.5 ${theme.button}`}
                >
                  {props.ctaLabel}
                  <ArrowIcon />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.03] px-7 text-base font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  Founding 5 가격 보기
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {props.badgeItems.map((item) => (
                  <span
                    key={item}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium ${theme.pill}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br p-7 sm:p-8 ${theme.glow}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_38%)]" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
                  Landing Blueprint
                </p>
                <div className="mt-6 space-y-3">
                  {props.pages.map((page, index) => (
                    <div
                      key={page.name}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-4"
                    >
                      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${theme.pill}`}>
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{page.name}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-300">{page.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="problems" className="px-5 py-18 sm:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Problem"
              title={props.problemTitle}
              description="첫 인상은 디자인보다 구조와 메시지에서 결정됩니다. 방문자가 바로 이해하고 문의할 수 있도록 설계해야 합니다."
              accentClass={theme.softText}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {props.problems.map((item) => (
                <article
                  key={item.title}
                  className={`rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 shadow-[0_20px_60px_rgba(2,6,23,0.24)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent`}
                >
                  <div className={`mb-5 h-1.5 w-16 rounded-full bg-gradient-to-r ${theme.glow}`} />
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-18 sm:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Velox Method"
              title={props.methodTitle}
              description="Velox는 업종 특성을 반영해 신뢰를 빠르게 형성하고, 실제 문의 전환까지 이어지는 구조를 먼저 설계합니다."
              accentClass={theme.softText}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {props.methods.map((item) => (
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6"
                >
                  <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${theme.cardRing}`} />
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pages" className="px-5 py-18 sm:px-6 md:py-24">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <SectionHeading
              eyebrow="Recommended Pages"
              title={props.pagesTitle}
              description="방문자가 정보를 찾는 흐름대로 페이지를 배치하면 이해도와 신뢰도가 동시에 올라갑니다."
              accentClass={theme.softText}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {props.pages.map((page) => (
                <div key={page.name} className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-6">
                  <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${theme.softText}`}>
                    {page.name}
                  </p>
                  <p className="mt-4 text-base leading-7 text-slate-300">{page.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {props.extraSection ? (
          <section className="px-5 py-18 sm:px-6 md:py-24">
            <div className="mx-auto max-w-6xl">
              <SectionHeading
                eyebrow={props.extraSection.eyebrow}
                title={props.extraSection.title}
                accentClass={theme.softText}
              />
              <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {props.extraSection.items.map((item) => (
                  <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="px-5 py-18 sm:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Process"
              title={props.processTitle}
              description="의사결정이 빠르게 이뤄지도록 필요한 자료와 선택지를 단계별로 정리해 전달합니다."
              accentClass={theme.softText}
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {props.process.map((step, index) => (
                <div key={step} className="relative rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-6">
                  <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${theme.timeline}`} />
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${theme.pill}`}>
                    {index + 1}
                  </div>
                  <p className="mt-5 text-lg font-semibold text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-5 py-18 sm:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Founding 5"
              title={props.pricingTitle}
              description={props.pricingNote}
              accentClass={theme.softText}
            />
            <div className="mt-12 grid gap-6 xl:grid-cols-3">
              {props.pricingPlans.map((plan) => (
                <article
                  key={plan.name}
                  className={`relative flex flex-col rounded-[2rem] border p-8 ${
                    plan.highlight
                      ? "border-white/20 bg-white/[0.06] shadow-[0_24px_80px_rgba(4,12,30,0.4)]"
                      : "border-white/10 bg-slate-950/45"
                  }`}
                >
                  {plan.highlight ? (
                    <span className={`absolute -top-3 left-8 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${theme.pill}`}>
                      Best Fit
                    </span>
                  ) : null}
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
                    {plan.name}
                  </p>
                  <div className="mt-5 text-4xl font-semibold tracking-tight text-white">
                    {plan.price}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{plan.description}</p>
                  <ul className="mt-8 space-y-3 text-sm text-slate-200">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 leading-6">
                        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${theme.softText.replace("text", "bg")}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={ctaHref}
                    className={`mt-8 inline-flex h-12 items-center justify-center rounded-xl border text-sm font-semibold transition hover:-translate-y-0.5 ${theme.pill}`}
                  >
                    {props.ctaLabel}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-5 py-18 sm:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="FAQ" title={props.faqTitle} accentClass={theme.softText} />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {props.faqs.map((faq) => (
                <article key={faq.q} className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7">
                  <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{faq.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 pb-24 pt-8 sm:px-6 md:pb-28">
          <div className={`mx-auto max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-r p-8 sm:p-12 ${theme.glow}`}>
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className={`text-sm font-semibold uppercase tracking-[0.28em] ${theme.softText}`}>
                  Final CTA
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {props.finalTitle}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                  {props.finalDescription}
                </p>
                {props.finalHighlight ? (
                  <p className={`mt-4 text-sm font-semibold uppercase tracking-[0.24em] ${theme.softText}`}>
                    {props.finalHighlight}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={ctaHref}
                  className={`group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r px-7 text-base font-semibold transition hover:-translate-y-0.5 ${theme.button}`}
                >
                  {props.ctaLabel}
                  <ArrowIcon />
                </a>
                <a
                  href="mailto:hello@veloxstudio.co"
                  className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.03] px-7 text-base font-medium text-slate-100 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  hello@veloxstudio.co
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
