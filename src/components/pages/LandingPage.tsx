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

const ROTATING_WORDS = [
  "refugee family.",
  "ration allotment.",
  "offline checkpoint.",
  "medical triage record.",
  "displaced survivor.",
];

export function LandingPage() {
  const {
    setCurrentPage,
    unlockVault,
    isVaultLocked,
    pushToast,
    language,
    setLanguage,
    theme,
    toggleTheme,
  } = useVault();

  const [wordIndex, setWordIndex] = useState(0);
  const [wordFade, setWordFade] = useState(true);

  // Rotating words interval
  useEffect(() => {
    const interval = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setWordFade(true);
      }, 350);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const handleCreateWallet = () => {
    setCurrentPage("create_wallet");
  };

  const handleAccessWallet = () => {
    if (isVaultLocked) {
      setCurrentPage("overview");
      // App.tsx will show the PIN entry screen
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
            <p className="text-[11px] text-ink-muted -mt-0.5">Self-Sovereign Digital Identity</p>
          </div>
        </a>

        {/* Section Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm text-ink-secondary">
          <button
            type="button"
            onClick={() => scrollToSection("features")}
            className="transition-colors hover:text-ink-primary cursor-pointer"
          >
            Capabilities
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("how")}
            className="transition-colors hover:text-ink-primary cursor-pointer"
          >
            How it works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("pipeline")}
            className="transition-colors hover:text-ink-primary cursor-pointer"
          >
            Protocol Flow
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("architecture")}
            className="transition-colors hover:text-ink-primary cursor-pointer"
          >
            Architecture
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="transition-colors hover:text-ink-primary cursor-pointer"
          >
            About
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
            <span>Access Wallet</span>
          </button>

          {/* Create a Wallet Button */}
          <button
            type="button"
            onClick={handleCreateWallet}
            className="flex items-center gap-1.5 rounded-lg bg-lime px-3.5 py-2 text-xs font-semibold text-graphite-950 shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create a Wallet</span>
          </button>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Eyebrow badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 font-mono text-xs text-lime">
          <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
          <span>Self-Sovereign Identity · Offline Verifiable · W3C Standard</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-ink-primary sm:text-6xl sm:leading-[1.1]">
          The fastest path to
          <br />
          trusted identity for
          <span className="block text-sm sm:text-base font-normal text-ink-muted mt-2 tracking-normal font-sans">
            built by Team Serverless Syndicate · SIH Hackathon Project #26125
          </span>
        </h1>

        {/* Animated word line */}
        <div className="mt-3 flex items-center gap-3 text-3xl font-extrabold tracking-tight text-ink-primary sm:text-5xl">
          <span className="text-ink-secondary">every</span>
          <span
            className={`transition-all duration-300 transform font-mono text-lime ${
              wordFade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            {ROTATING_WORDS[wordIndex]}
          </span>
        </div>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-base text-ink-secondary sm:text-lg leading-relaxed">
          A decentralized, privacy-preserving digital identity vault purpose-built for displaced
          populations, disaster relief, and refugee camps. Verifiable 100% offline via Zero-Knowledge
          Proofs, anchored on Hyperledger Besu, and restorable through community guardians without
          central authority risk.
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleCreateWallet}
            className="flex items-center gap-2 rounded-xl bg-lime px-6 py-3.5 text-sm font-semibold text-graphite-950 shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Create a Wallet</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>

          <button
            type="button"
            onClick={handleAccessWallet}
            className="flex items-center gap-2 rounded-xl border border-graphite-700 bg-graphite-900/90 px-6 py-3.5 text-sm font-semibold text-ink-primary hover:border-graphite-600 hover:bg-graphite-850 transition-all cursor-pointer"
          >
            <Lock className="h-4 w-4 text-lime" />
            <span>Access Wallet</span>
          </button>
        </div>

        {/* Micro-indicators */}
        <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-ink-muted font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-lime" />
            <span>0 PII on-chain</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-lime" />
            <span>Works 100% offline</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-lime" />
            <span>2-of-3 Shamir recovery</span>
          </div>
        </div>
      </div>

      {/* ── STATS BAND ── */}
      <section className="relative z-10 border-y border-graphite-700/80 bg-graphite-900/60 backdrop-blur-sm py-8 px-4">
        <div className="mx-auto max-w-5xl grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
          <div>
            <div className="font-mono text-3xl sm:text-4xl font-bold text-lime">100%</div>
            <div className="mt-1 text-xs text-ink-muted">Offline Verifiable Claims</div>
          </div>
          <div>
            <div className="font-mono text-3xl sm:text-4xl font-bold text-skyblue">2-of-3</div>
            <div className="mt-1 text-xs text-ink-muted">Shamir Threshold Recovery</div>
          </div>
          <div>
            <div className="font-mono text-3xl sm:text-4xl font-bold text-violet">0 PII</div>
            <div className="mt-1 text-xs text-ink-muted">Public Ledger Exposure</div>
          </div>
          <div>
            <div className="font-mono text-3xl sm:text-4xl font-bold text-amber">W3C</div>
            <div className="mt-1 text-xs text-ink-muted">Verifiable Credential Spec</div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section id="features" className="relative z-10 mx-auto max-w-5xl px-4 py-20">
        <div className="text-center sm:text-left">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lime">
            Capabilities
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-primary sm:text-4xl">
            Everything evidence-based,
            <br />
            zero surveillance.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-ink-secondary">
            Every identity pass is encrypted in a device enclave. Cryptographic signatures confirm
            validity without exposing biometric records or national ID databases to unauthorized
            parties.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border border-graphite-700 bg-graphite-900/80 p-6 shadow-vault hover:border-graphite-600 transition-all group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/10 text-lime mb-4 group-hover:scale-105 transition-transform">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-ink-primary">Decentralized DID Root</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
              Generated locally on device using elliptic curve keys (<code className="text-lime">did:ethr</code>). No government registry or platform can freeze or revoke baseline existence.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-graphite-700 bg-graphite-900/80 p-6 shadow-vault hover:border-graphite-600 transition-all group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-skyblue/10 text-skyblue mb-4 group-hover:scale-105 transition-transform">
              <WifiOff className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-ink-primary">100% Offline Verifier</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
              Field relief officers scan optical QR or NFC tokens with zero internet. Signatures evaluate against locally cached issuer public keys.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-graphite-700 bg-graphite-900/80 p-6 shadow-vault hover:border-graphite-600 transition-all group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet/10 text-violet mb-4 group-hover:scale-105 transition-transform">
              <QrCode className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-ink-primary">Zero-Knowledge Proofs</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
              Prove qualifications (e.g. Adult status or Camp Sector membership) while keeping raw dates of birth, photos, and biometric signatures redacted.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-graphite-700 bg-graphite-900/80 p-6 shadow-vault hover:border-graphite-600 transition-all group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber/10 text-amber mb-4 group-hover:scale-105 transition-transform">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-ink-primary">Shamir Social Recovery</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
              Lost phone during flood evacuation? 2 of 3 trusted community guardians combine encrypted secret shards to reconstruct your master wallet on any device.
            </p>
          </div>

          {/* Card 5 */}
          <div className="rounded-2xl border border-graphite-700 bg-graphite-900/80 p-6 shadow-vault hover:border-graphite-600 transition-all group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/10 text-lime mb-4 group-hover:scale-105 transition-transform">
              <Link2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-ink-primary">On-Chain Anchoring</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
              Relief authorities anchor cryptographic state roots on Hyperledger Besu. Provides immutable audit integrity without leaking personal data.
            </p>
          </div>

          {/* Card 6 */}
          <div className="rounded-2xl border border-graphite-700 bg-graphite-900/80 p-6 shadow-vault hover:border-graphite-600 transition-all group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-danger/10 text-danger mb-4 group-hover:scale-105 transition-transform">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-ink-primary">Duress Mode (Decoy Vault)</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
              Under physical threat or hostile checkpoint scrutiny, entering safety PIN <code className="text-danger">9999</code> displays an authentic-looking decoy vault.
            </p>
          </div>
        </div>
      </section>

      {/* ── PIPELINE VISUAL ── */}
      <section id="pipeline" className="relative z-10 mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lime">
            Pipeline
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-primary sm:text-4xl">
            From enrollment to relief<br />distribution in seconds.
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
                1. Local DID
              </span>
            </div>

            <div className="text-ink-muted text-xl pb-6">→</div>

            <div className="flex flex-col items-center min-w-[90px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-graphite-700 bg-graphite-800 text-skyblue font-mono text-xl shadow-vault">
                <Boxes className="h-7 w-7" />
              </div>
              <span className="mt-2 text-[11px] font-medium text-ink-secondary text-center">
                2. Issue & Anchor
              </span>
            </div>

            <div className="text-ink-muted text-xl pb-6">→</div>

            <div className="flex flex-col items-center min-w-[90px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-graphite-700 bg-graphite-800 text-violet font-mono text-xl shadow-vault">
                <QrCode className="h-7 w-7" />
              </div>
              <span className="mt-2 text-[11px] font-medium text-ink-secondary text-center">
                3. ZK Proof Pass
              </span>
            </div>

            <div className="text-ink-muted text-xl pb-6">→</div>

            <div className="flex flex-col items-center min-w-[90px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-graphite-700 bg-graphite-800 text-amber font-mono text-xl shadow-vault">
                <Scan className="h-7 w-7" />
              </div>
              <span className="mt-2 text-[11px] font-medium text-ink-secondary text-center">
                4. Offline Scan
              </span>
            </div>

            <div className="text-ink-muted text-xl pb-6">→</div>

            <div className="flex flex-col items-center min-w-[90px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-graphite-700 bg-graphite-800 text-lime font-mono text-xl shadow-vault">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <span className="mt-2 text-[11px] font-medium text-ink-secondary text-center">
                5. Aid Granted
              </span>
            </div>
          </div>
        </div>

        {/* 4 Step detail blocks */}
        <div id="how" className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-graphite-700 bg-graphite-900/60 p-5">
            <div className="font-mono text-3xl font-extrabold text-lime/30 mb-2">01</div>
            <h4 className="text-sm font-semibold text-ink-primary">Enroll in Safe Enclave</h4>
            <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
              The user registers without disclosing private data. Key pairs are stored inside on-device hardware security modules.
            </p>
          </div>

          <div className="rounded-xl border border-graphite-700 bg-graphite-900/60 p-5">
            <div className="font-mono text-3xl font-extrabold text-skyblue/30 mb-2">02</div>
            <h4 className="text-sm font-semibold text-ink-primary">Camp Authority Signs</h4>
            <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
              Relief kiosk signs the ration quota and family link, anchoring state hash on-chain while handing the user decrypted credentials.
            </p>
          </div>

          <div className="rounded-xl border border-graphite-700 bg-graphite-900/60 p-5">
            <div className="font-mono text-3xl font-extrabold text-violet/30 mb-2">03</div>
            <h4 className="text-sm font-semibold text-ink-primary">Generate ZK Proof</h4>
            <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
              The user presents a dynamic QR proof at distribution checkpoints. Only the needed claims (age, entitlement tier) are revealed.
            </p>
          </div>

          <div className="rounded-xl border border-graphite-700 bg-graphite-900/60 p-5">
            <div className="font-mono text-3xl font-extrabold text-amber/30 mb-2">04</div>
            <h4 className="text-sm font-semibold text-ink-primary">Offline Aid Granted</h4>
            <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
              Field terminal validates signatures against local cached keys and dispenses rations instantly with 0 ms server delay.
            </p>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE SECTION (SIH #26125 EVALUATOR SPEC) ── */}
      <section id="architecture" className="relative z-10 mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-2xl border border-graphite-700 bg-graphite-900/80 p-6 sm:p-10 shadow-vault">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-graphite-700/80 pb-6">
            <div>
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lime">
                Hackathon Scope &amp; Architecture
              </div>
              <h3 className="mt-1 text-2xl font-bold text-ink-primary">
                Smart India Hackathon #26125 Overview
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 font-mono text-xs text-lime">
                Status: Field Demo Ready
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-ink-secondary leading-relaxed">
            <div>
              <h4 className="text-sm font-semibold text-ink-primary mb-2">
                Problem Addressed:
              </h4>
              <p>
                During severe climate floods, earthquakes, and forced population displacements,
                survivors lose physical Aadhaar/voter cards and ration booklets. Centralized state
                databases fail completely when cellular towers collapse, creating catastrophic
                relief distribution bottlenecks or dangerous biometric surveillance vulnerabilities.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink-primary mb-2">
                ResilienceID Technological Resolution:
              </h4>
              <p>
                ResilienceID decouples identity verification from connectivity. Using asymmetric
                cryptography, Zero-Knowledge proofs, and permissioned Hyperledger Besu state roots,
                displaced families retain verifiable identity rights and ration guarantees entirely
                offline with zero risk of identity weaponization.
              </p>
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
              <h3 className="text-xl font-bold text-ink-primary">Team Serverless Syndicate</h3>
              <span className="rounded-md bg-graphite-800 border border-graphite-700 px-2 py-0.5 font-mono text-[10px] text-lime">
                Lead Architect
              </span>
            </div>
            <p className="text-xs text-lime mt-0.5">SIH Hackathon 2024 · Problem Statement #26125</p>
            <p className="mt-3 text-xs leading-relaxed text-ink-secondary">
              This solution was designed to ensure that displaced persons, refugees, and disaster
              survivors never lose their fundamental legal rights or humanitarian entitlements due to
              lost paper documents or disrupted telecommunications networks. Every module — from
              on-chain merkle anchors to offline threshold key recovery — is implemented with zero-trust
              cryptography to guarantee human dignity and privacy.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-2xl border border-lime/30 bg-gradient-to-br from-graphite-900 to-graphite-950 p-8 sm:p-12 text-center shadow-vault">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-ink-primary">
            Empower displaced survivors with
            <br />
            self-sovereign dignity.
          </h2>
          <p className="mt-3 max-w-md mx-auto text-sm text-ink-secondary">
            Experience the live field-tested prototype on this device.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={handleCreateWallet}
              className="flex items-center gap-2 rounded-xl bg-lime px-6 py-3.5 text-sm font-semibold text-graphite-950 shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Create a Wallet</span>
            </button>

            <button
              type="button"
              onClick={handleAccessWallet}
              className="flex items-center gap-2 rounded-xl border border-graphite-700 bg-graphite-850 px-6 py-3.5 text-sm font-semibold text-ink-primary hover:border-graphite-600 hover:bg-graphite-800 transition-all cursor-pointer"
            >
              <KeyRound className="h-4 w-4 text-lime" />
              <span>Access Wallet</span>
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
          <span>Back to top</span>
        </button>

        <div className="mt-6 text-xs text-ink-muted">
          Built by <strong className="text-ink-secondary">Team Serverless Syndicate</strong> · ResilienceID · SIH #26125
          <br />
          <span className="mt-1 block text-[11px] text-ink-muted/80">
            Self-Sovereign Digital Identity for Displaced Populations · Smart India Hackathon
          </span>
        </div>
      </footer>
    </div>
  );
}
