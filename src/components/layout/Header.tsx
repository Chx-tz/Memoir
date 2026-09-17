import { Bell, ChevronDown, Code2, Globe, HeartHandshake, Lock, Menu, Moon, ShieldAlert, Sun } from "lucide-react";
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
    pushToast,
    t,
  } = useVault();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-graphite-700 bg-graphite-950/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      {/* Left section: mobile hamburger & breadcrumb */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
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
            <button
              type="button"
              onClick={() => setCurrentPage("landing")}
              className="hover:text-lime hover:underline transition-colors cursor-pointer text-ink-muted"
              title="Return to Landing Page"
            >
              {t.appName}
            </button>{" "}
            / <span className="text-ink-secondary">{t.nav[currentPage] || currentPage}</span>
          </p>
          {isDuressMode && (
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-2.5 py-0.5 text-xs font-medium text-amber">
              <ShieldAlert className="h-3.5 w-3.5" />
              {t.header.duressActive}
            </div>
          )}
        </div>
      </div>

      {/* Right section: Language Dropdown + Mode + Theme + Notifications + Lock + Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Dropdown List */}
        <div className="relative flex items-center">
          <Globe className="pointer-events-none absolute left-2.5 h-4 w-4 text-ink-muted" aria-hidden="true" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            aria-label="Select language"
            className="appearance-none rounded-lg border border-graphite-700 bg-graphite-900 py-2 pl-8 pr-7 text-xs font-medium text-ink-primary transition-colors hover:border-graphite-600 focus:border-lime/40 focus:outline-none cursor-pointer"
          >
            <option value="en" className="bg-graphite-900 text-ink-primary">English (EN)</option>
            <option value="ml" className="bg-graphite-900 text-ink-primary">മലയാളം (ML)</option>
            <option value="hi" className="bg-graphite-900 text-ink-primary">हिंदी (HI)</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
        </div>

        {/* Human vs Auditor Mode Switch */}
        <button
          type="button"
          onClick={toggleUiMode}
          title={uiMode === "human" ? "Switch to Auditor Mode (Cryptographic Specs)" : "Switch to Human Mode (Empathetic / Plain Language)"}
          className={`hidden sm:flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
            uiMode === "human"
              ? "border-lime/40 bg-lime/10 text-lime"
              : "border-violet/40 bg-violet/10 text-violet"
          }`}
        >
          {uiMode === "human" ? (
            <>
              <HeartHandshake className="h-4 w-4" />
              <span className="hidden md:inline">{t.header.modeHuman}</span>
            </>
          ) : (
            <>
              <Code2 className="h-4 w-4" />
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

        {/* Notifications Bell Button */}
        <button
          type="button"
          onClick={() => pushToast("All cryptographic roots & verifiable claims synced.", "info")}
          aria-label="View notifications"
          className="relative rounded-lg border border-graphite-700 p-2 text-ink-secondary transition-colors hover:text-ink-primary"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          <span
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber"
            aria-hidden="true"
          />
        </button>

        {/* Lock Vault */}
        <button
          type="button"
          onClick={lockVault}
          className="hidden items-center gap-2 rounded-lg border border-graphite-700 px-3 py-2 text-sm text-ink-secondary transition-colors duration-200 hover:text-ink-primary sm:flex"
        >
          <Lock className="h-4 w-4" aria-hidden="true" />
          {t.header.lockVault}
        </button>

        <button
          type="button"
          onClick={lockVault}
          aria-label={t.header.lockVault}
          className="flex items-center justify-center rounded-lg border border-graphite-700 p-2 text-ink-secondary sm:hidden"
        >
          <Lock className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-graphite-700 font-mono text-xs text-ink-primary">
          AR
        </div>
      </div>
    </header>
  );
}
