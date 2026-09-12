import { Code2, Globe, HeartHandshake, Lock, Menu, Moon, Scan, ShieldAlert, Sun } from "lucide-react";
import { useVault } from "../../context/VaultContext";
import type { Language } from "../../types";

export function Header() {
  const {
    currentPage,
    setCurrentPage,
    openMobileNav,
    lockVault,
    isDuressMode,
    language,
    setLanguage,
    uiMode,
    toggleUiMode,
    theme,
    toggleTheme,
    t,
  } = useVault();

  const langOptions: { id: Language; label: string; full: string }[] = [
    { id: "en", label: "EN", full: "English" },
    { id: "ml", label: "മല", full: "മലയാളം (Malayalam)" },
    { id: "hi", label: "हिं", full: "हिंदी (Hindi)" },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-graphite-700 bg-graphite-950/85 px-4 py-3.5 backdrop-blur sm:px-6 lg:px-8">
      {/* Left section: mobile hamburger & breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={openMobileNav}
          aria-label="Open menu"
          className="rounded-lg border border-graphite-700 p-2 text-ink-secondary transition-colors hover:text-ink-primary lg:hidden"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="min-w-0 flex items-center gap-2.5">
          <p className="truncate font-mono text-xs text-ink-muted">
            {t.appName} / <span className="text-ink-secondary font-medium">{t.nav[currentPage] || currentPage}</span>
          </p>
          {isDuressMode && (
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-2 py-0.5 text-xs font-medium text-amber">
              <ShieldAlert className="h-3.5 w-3.5" />
              {t.header.duressActive}
            </div>
          )}
        </div>
      </div>

      {/* Right section: Language + Human/Auditor + Theme + Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Language Selector */}
        <div className="flex items-center rounded-lg border border-graphite-700 bg-graphite-900 p-0.5 text-xs">
          <span className="pl-1.5 pr-1 text-ink-muted hidden sm:inline" title="Select Language">
            <Globe className="h-3.5 w-3.5" />
          </span>
          {langOptions.map((lang) => (
            <button
              key={lang.id}
              type="button"
              onClick={() => setLanguage(lang.id)}
              title={lang.full}
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                language === lang.id
                  ? "bg-lime text-graphite-950 font-semibold"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Human vs Auditor Mode Switch */}
        <button
          type="button"
          onClick={toggleUiMode}
          title={uiMode === "human" ? "Switch to Auditor Mode (Cryptographic Specs)" : "Switch to Human Mode (Empathetic / Plain Language)"}
          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
            uiMode === "human"
              ? "border-lime/40 bg-lime/10 text-lime"
              : "border-violet/40 bg-violet/10 text-violet"
          }`}
        >
          {uiMode === "human" ? (
            <>
              <HeartHandshake className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t.header.modeHuman}</span>
            </>
          ) : (
            <>
              <Code2 className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t.header.modeAuditor}</span>
            </>
          )}
        </button>

        {/* Dark / Light Mode Switch */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="flex items-center justify-center rounded-lg border border-graphite-700 bg-graphite-900 p-2 text-ink-secondary transition-colors hover:text-ink-primary hover:border-graphite-600"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-amber" />
          ) : (
            <Moon className="h-4 w-4 text-skyblue" />
          )}
        </button>

        {/* Quick Demo Verifier Toggle */}
        <button
          type="button"
          onClick={() => setCurrentPage(currentPage === "verifier" ? "overview" : "verifier")}
          className={`hidden xl:flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
            currentPage === "verifier"
              ? "border-lime/40 bg-lime/10 text-lime"
              : "border-graphite-700 text-ink-secondary hover:text-ink-primary"
          }`}
        >
          <Scan className="h-3.5 w-3.5" />
          {currentPage === "verifier" ? t.header.exitVerifier : t.header.demoVerifier}
        </button>

        {/* Lock Vault */}
        <button
          type="button"
          onClick={lockVault}
          title={t.header.lockVault}
          className="hidden items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs text-ink-secondary transition-colors border-graphite-700 hover:text-ink-primary sm:flex"
        >
          <Lock className="h-3.5 w-3.5" />
          {t.header.lockVault}
        </button>

        <button
          type="button"
          onClick={lockVault}
          aria-label={t.header.lockVault}
          className="flex items-center justify-center rounded-lg border p-2 sm:hidden border-graphite-700 text-ink-secondary"
        >
          <Lock className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
