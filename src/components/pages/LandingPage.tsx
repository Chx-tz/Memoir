import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  Globe,
  KeyRound,
  Link2,
  Lock,
  Moon,
  Plus,
  QrCode,
  Scan,
  Shield,
  ShieldAlert,
  ShieldHalf,
  Sparkles,
  Sun,
  Users,
  WifiOff,
  Boxes,
} from "lucide-react";
import { useVault } from "../../context/VaultContext";
import type { Language } from "../../types";
import { landingTranslations } from "../../data/landingTranslations";

export function LandingPage() {
  const {
    setCurrentPage,
    isVaultLocked,
    language,
    setLanguage,
    theme,
    toggleTheme,
  } = useVault();

  const lt = landingTranslations[language] || landingTranslations.en;

  const [wordIndex, setWordIndex] = useState(0);
  const [wordFade, setWordFade] = useState(true);

  // Rotating words interval
  useEffect(() => {
    const rotatingWords = lt.hero.rotatingWords;
    const interval = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setWordFade(true);
      }, 350);
    }, 2600);
    return () => clearInterval(interval);
  }, [lt.hero.rotatingWords]);

  const handleCreateWallet = () => {
    setCurrentPage("create_wallet");
  };

  const handleAccessWallet = () => {
    if (isVaultLocked) {
      setCurrentPage("overview");
    } else {
      setCurrentPage("overview");
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const featureIcons = [
    { icon: Shield, color: "text-lime", bg: "bg-lime/10" },
    { icon: WifiOff, color: "text-skyblue", bg: "bg-skyblue/10" },
    { icon: QrCode, color: "text-violet", bg: "bg-violet/10" },
    { icon: Users, color: "text-amber", bg: "bg-amber/10" },
    { icon: Link2, color: "text-lime", bg: "bg-lime/10" },
    { icon: ShieldAlert, color: "text-danger", bg: "bg-danger/10" },
  ];

  const stepNumberColors = [
    "text-lime/30",
    "text-skyblue/30",
    "text-violet/30",
    "text-amber/30",
  ];

  return (
    <div className="relative min-h-screen bg-graphite-950 text-ink-primary selection:bg-lime/20 selection:text-ink-primary font-sans">
      {/* Background Subtle Grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "-1px -1px",
        }}
      />

      {/* Glow ambient circle */}
      <div
        className="pointer-events-none fixed -top-40 -left-20 h-[600px] w-[600px] rounded-full opacity-15 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #b6f03c 0%, transparent 70%)",
        }}
      />

      {/* ── TOP NAV ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-graphite-700/80 bg-graphite-950/85 px-4 py-3.5 backdrop-blur-md sm:px-8">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 text-decoration-none group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-graphite-800 text-lime border border-graphite-700 transition-transform group-hover:scale-105">
            <ShieldHalf className="h-5 w-5 text-lime" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-base text-ink-primary">
                ResilienceID
              </span>
              <span className="hidden sm:inline-block rounded-full bg-lime/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-lime border border-lime/20">
                SIH #26125
              </span>
            </div>
            <p className="text-[11px] text-ink-muted -mt-0.5">{lt.tagline}</p>
          </div>
        </a>

        {/* Section Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm text-ink-secondary">
          <button
            type="button"
            onClick={() => scrollToSection("features")}
            className="transition-colors hover:text-ink-primary cursor-pointer"
          >
            {lt.nav.capabilities}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("how")}
            className="transition-colors hover:text-ink-primary cursor-pointer"
          >
            {lt.nav.howItWorks}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("pipeline")}
            className="transition-colors hover:text-ink-primary cursor-pointer"
          >
            {lt.nav.protocolFlow}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("architecture")}
            className="transition-colors hover:text-ink-primary cursor-pointer"
          >
            {lt.nav.architecture}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="transition-colors hover:text-ink-primary cursor-pointer"
          >
            {lt.nav.about}
          </button>
        </div>

        {/* Actions (Language, Theme, Access Wallet, Create a Wallet) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="relative flex items-center">
            <Globe className="pointer-events-none absolute left-2 h-3.5 w-3.5 text-ink-muted" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              aria-label="Select language"
              className="appearance-none rounded-lg border border-graphite-700 bg-graphite-900 py-1.5 pl-7 pr-6 text-xs font-medium text-ink-primary hover:border-graphite-600 focus:outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="ml">ML</option>
              <option value="hi">HI</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-1.5 h-3 w-3 text-ink-muted" />
          </div>

          {/* Theme Switch */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title="Toggle Theme"
            className="flex items-center justify-center rounded-lg border border-graphite-700 bg-graphite-900 p-2 text-ink-secondary hover:text-ink-primary transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5 text-amber" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-skyblue" />
            )}
          </button>

          {/* Access Wallet Button */}
          <button
            type="button"
            onClick={handleAccessWallet}
            className="flex items-center gap-1.5 rounded-lg border border-graphite-700 bg-graphite-900 px-3 py-2 text-xs font-semibold text-ink-primary hover:border-graphite-600 hover:bg-graphite-850 transition-all cursor-pointer"
          >
            <KeyRound className="h-3.5 w-3.5 text-ink-muted" />
            <span>{lt.nav.accessWallet}</span>
          </button>

          {/* Create a Wallet Button */}
          <button
            type="button"
            onClick={handleCreateWallet}
            className="flex items-center gap-1.5 rounded-lg bg-lime px-3.5 py-2 text-xs font-semibold text-graphite-950 shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>{lt.nav.createWallet}</span>
          </button>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Eyebrow badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 font-mono text-xs text-lime">
          <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
          <span>{lt.hero.badge}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-ink-primary sm:text-6xl sm:leading-[1.1]">
          {lt.hero.headline1}
          <br />
          {lt.hero.headline2}
          <span className="block text-sm sm:text-base font-normal text-ink-muted mt-2 tracking-normal font-sans">
            {lt.hero.teamCredit}
          </span>
        </h1>

        {/* Animated word line */}
        <div className="mt-3 flex items-center gap-3 text-3xl font-extrabold tracking-tight text-ink-primary sm:text-5xl">
          <span className="text-ink-secondary">{lt.hero.every}</span>
          <span
            className={`transition-all duration-300 transform font-mono text-lime ${
              wordFade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            {lt.hero.rotatingWords[wordIndex % lt.hero.rotatingWords.length]}
          </span>
        </div>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-base text-ink-secondary sm:text-lg leading-relaxed">
          {lt.hero.subtitle}
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleCreateWallet}
            className="flex items-center gap-2 rounded-xl bg-lime px-6 py-3.5 text-sm font-semibold text-graphite-950 shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>{lt.hero.createBtn}</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>

          <button
            type="button"
            onClick={handleAccessWallet}
            className="flex items-center gap-2 rounded-xl border border-graphite-700 bg-graphite-900/90 px-6 py-3.5 text-sm font-semibold text-ink-primary hover:border-graphite-600 hover:bg-graphite-850 transition-all cursor-pointer"
          >
            <Lock className="h-4 w-4 text-lime" />
            <span>{lt.hero.accessBtn}</span>
          </button>
        </div>

        {/* Micro-indicators */}
        <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-ink-muted font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-lime" />
            <span>{lt.hero.stats0Pii}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-lime" />
            <span>{lt.hero.statsOffline}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-lime" />
            <span>{lt.hero.statsShamir}</span>
          </div>
        </div>
      </div>

      {/* ── STATS BAND ── */}
      <section className="relative z-10 border-y border-graphite-700/80 bg-graphite-900/60 backdrop-blur-sm py-8 px-4">
        <div className="mx-auto max-w-5xl grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
          <div>
            <div className="font-mono text-3xl sm:text-4xl font-bold text-lime">100%</div>
            <div className="mt-1 text-xs text-ink-muted">{lt.stats.stat1Label}</div>
          </div>
          <div>
            <div className="font-mono text-3xl sm:text-4xl font-bold text-skyblue">2-of-3</div>
            <div className="mt-1 text-xs text-ink-muted">{lt.stats.stat2Label}</div>
          </div>
          <div>
            <div className="font-mono text-3xl sm:text-4xl font-bold text-violet">0 PII</div>
            <div className="mt-1 text-xs text-ink-muted">{lt.stats.stat3Label}</div>
          </div>
          <div>
            <div className="font-mono text-3xl sm:text-4xl font-bold text-amber">W3C</div>
            <div className="mt-1 text-xs text-ink-muted">{lt.stats.stat4Label}</div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section id="features" className="relative z-10 mx-auto max-w-5xl px-4 py-20">
        <div className="text-center sm:text-left">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lime">
            {lt.capabilities.eyebrow}
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-primary sm:text-4xl">
            {lt.capabilities.title1}
            <br />
            {lt.capabilities.title2}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-ink-secondary">
            {lt.capabilities.desc}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lt.capabilities.cards.map((card, idx) => {
            const Icon = featureIcons[idx]?.icon || Shield;
            const colorClass = featureIcons[idx]?.color || "text-lime";
            const bgClass = featureIcons[idx]?.bg || "bg-lime/10";
            return (
              <div
                key={idx}
                className="rounded-2xl border border-graphite-700 bg-graphite-900/80 p-6 shadow-vault hover:border-graphite-600 transition-all group"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${bgClass} ${colorClass} mb-4 group-hover:scale-105 transition-transform`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-ink-primary">{card.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PIPELINE VISUAL ── */}
      <section id="pipeline" className="relative z-10 mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lime">
            {lt.pipeline.eyebrow}
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-primary sm:text-4xl">
            {lt.pipeline.title}
          </h2>
        </div>

        {/* Visual Pipeline flowchart */}
        <div className="mt-12 rounded-2xl border border-graphite-700 bg-graphite-900/80 p-6 sm:p-8 shadow-vault">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center min-w-[90px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-graphite-700 bg-graphite-800 text-lime font-mono text-xl shadow-vault">
                <KeyRound className="h-7 w-7" />
              </div>
              <span className="mt-2 text-[11px] font-medium text-ink-secondary text-center">
                {lt.pipeline.steps[0]}
              </span>
            </div>

            <div className="text-ink-muted text-xl pb-6">→</div>

            <div className="flex flex-col items-center min-w-[90px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-graphite-700 bg-graphite-800 text-skyblue font-mono text-xl shadow-vault">
                <Boxes className="h-7 w-7" />
              </div>
              <span className="mt-2 text-[11px] font-medium text-ink-secondary text-center">
                {lt.pipeline.steps[1]}
              </span>
            </div>

            <div className="text-ink-muted text-xl pb-6">→</div>

            <div className="flex flex-col items-center min-w-[90px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-graphite-700 bg-graphite-800 text-violet font-mono text-xl shadow-vault">
                <QrCode className="h-7 w-7" />
              </div>
              <span className="mt-2 text-[11px] font-medium text-ink-secondary text-center">
                {lt.pipeline.steps[2]}
              </span>
            </div>

            <div className="text-ink-muted text-xl pb-6">→</div>

            <div className="flex flex-col items-center min-w-[90px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-graphite-700 bg-graphite-800 text-amber font-mono text-xl shadow-vault">
                <Scan className="h-7 w-7" />
              </div>
              <span className="mt-2 text-[11px] font-medium text-ink-secondary text-center">
                {lt.pipeline.steps[3]}
              </span>
            </div>

            <div className="text-ink-muted text-xl pb-6">→</div>

            <div className="flex flex-col items-center min-w-[90px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-graphite-700 bg-graphite-800 text-lime font-mono text-xl shadow-vault">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <span className="mt-2 text-[11px] font-medium text-ink-secondary text-center">
                {lt.pipeline.steps[4]}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Step detail blocks */}
        <div id="how" className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {lt.pipeline.details.map((detail, idx) => {
            const stepNumColor = stepNumberColors[idx] || "text-lime/30";
            return (
              <div key={idx} className="rounded-xl border border-graphite-700 bg-graphite-900/60 p-5">
                <div className={`font-mono text-3xl font-extrabold ${stepNumColor} mb-2`}>
                  {detail.step}
                </div>
                <h4 className="text-sm font-semibold text-ink-primary">{detail.title}</h4>
                <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
                  {detail.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ARCHITECTURE SECTION (SIH #26125 EVALUATOR SPEC) ── */}
      <section id="architecture" className="relative z-10 mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-2xl border border-graphite-700 bg-graphite-900/80 p-6 sm:p-10 shadow-vault">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-graphite-700/80 pb-6">
            <div>
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lime">
                {lt.architecture.eyebrow}
              </div>
              <h3 className="mt-1 text-2xl font-bold text-ink-primary">
                {lt.architecture.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 font-mono text-xs text-lime">
                {lt.architecture.status}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-ink-secondary leading-relaxed">
            <div>
              <h4 className="text-sm font-semibold text-ink-primary mb-2">
                {lt.architecture.problemTitle}
              </h4>
              <p>{lt.architecture.problemDesc}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink-primary mb-2">
                {lt.architecture.solutionTitle}
              </h4>
              <p>{lt.architecture.solutionDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT / CREATOR CARD ── */}
      <section id="about" className="relative z-10 mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-2xl border border-graphite-700 bg-graphite-900 p-6 sm:p-8 shadow-vault flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet to-lime font-mono text-2xl font-bold text-graphite-950 shadow-glow">
            SS
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-ink-primary">{lt.about.team}</h3>
              <span className="rounded-md bg-graphite-800 border border-graphite-700 px-2 py-0.5 font-mono text-[10px] text-lime">
                {lt.about.role}
              </span>
            </div>
            <p className="text-xs text-lime mt-0.5">{lt.about.hackathon}</p>
            <p className="mt-3 text-xs leading-relaxed text-ink-secondary">
              {lt.about.desc}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-2xl border border-lime/30 bg-gradient-to-br from-graphite-900 to-graphite-950 p-8 sm:p-12 text-center shadow-vault">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-ink-primary">
            {lt.cta.title1}
            <br />
            {lt.cta.title2}
          </h2>
          <p className="mt-3 max-w-md mx-auto text-sm text-ink-secondary">
            {lt.cta.desc}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={handleCreateWallet}
              className="flex items-center gap-2 rounded-xl bg-lime px-6 py-3.5 text-sm font-semibold text-graphite-950 shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>{lt.cta.createBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleAccessWallet}
              className="flex items-center gap-2 rounded-xl border border-graphite-700 bg-graphite-850 px-6 py-3.5 text-sm font-semibold text-ink-primary hover:border-graphite-600 hover:bg-graphite-800 transition-all cursor-pointer"
            >
              <KeyRound className="h-4 w-4 text-lime" />
              <span>{lt.cta.accessBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-graphite-700/80 py-10 px-4 text-center">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 rounded-xl border border-graphite-700 bg-graphite-900 px-4 py-2 text-xs font-semibold text-ink-secondary hover:text-ink-primary hover:border-graphite-600 transition-all cursor-pointer"
        >
          <ArrowUp className="h-3.5 w-3.5" />
          <span>{lt.footer.backToTop}</span>
        </button>

        <div className="mt-6 text-xs text-ink-muted">
          {lt.footer.builtBy}
          <br />
          <span className="mt-1 block text-[11px] text-ink-muted/80">
            {lt.footer.subtext}
          </span>
        </div>
      </footer>
    </div>
  );
}
