import { Bell, Lock, Menu, Scan, ShieldAlert } from "lucide-react";
import { useVault } from "../../context/VaultContext";
import type { PageId } from "../../types";

const pageLabels: Record<PageId, string> = {
  overview: "Overview",
  documents: "My credentials",
  recovery: "Guardians & Recovery",
  verifier: "Aid Station Verifier",
  activity: "Activity log",
};

export function Header() {
  const { currentPage, setCurrentPage, openMobileNav, lockVault, isDuressMode } = useVault();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-graphite-700 bg-graphite-950/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={openMobileNav}
        aria-label="Open menu"
        className="rounded-lg border border-graphite-700 p-2 text-ink-secondary transition-colors hover:text-ink-primary lg:hidden"
      >
        <Menu className="h-4 w-4" aria-hidden="true" />
      </button>

      <div className="min-w-0 flex-1 flex items-center gap-3">
        <p className="truncate font-mono text-xs text-ink-muted">
          ResilienceID / <span className="text-ink-secondary">{pageLabels[currentPage]}</span>
        </p>
        {isDuressMode && (
          <div className="flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-2 py-0.5 text-xs font-medium text-amber">
            <ShieldAlert className="h-3.5 w-3.5" />
            Duress Mode Active
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setCurrentPage(currentPage === "verifier" ? "overview" : "verifier")}
        className={`hidden sm:flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
          currentPage === "verifier"
            ? "border-lime/40 bg-lime/10 text-lime"
            : "border-graphite-700 text-ink-secondary hover:text-ink-primary"
        }`}
      >
        <Scan className="h-3.5 w-3.5" />
        {currentPage === "verifier" ? "Exit Verifier" : "Demo Verifier Station"}
      </button>

      <button
        type="button"
        aria-label="View notifications"
        className="relative rounded-lg border border-graphite-700 p-2 text-ink-secondary transition-colors hover:text-ink-primary"
      >
        <Bell className="h-4 w-4" aria-hidden="true" />
        <span
          className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber"
          aria-hidden="true"
        />
      </button>

      <button
        type="button"
        onClick={lockVault}
        className="hidden items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors duration-200 sm:flex border-graphite-700 text-ink-secondary hover:text-ink-primary"
      >
        <Lock className="h-4 w-4" aria-hidden="true" />
        Lock vault
      </button>

      <button
        type="button"
        onClick={lockVault}
        aria-label="Lock vault"
        className="flex items-center justify-center rounded-lg border p-2 sm:hidden border-graphite-700 text-ink-secondary"
      >
        <Lock className="h-4 w-4" aria-hidden="true" />
      </button>
    </header>
  );
}
