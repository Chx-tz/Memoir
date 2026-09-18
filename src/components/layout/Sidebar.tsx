import { FileStack, History, LayoutGrid, Scan, ShieldHalf, Users, X } from "lucide-react";
import { useVault } from "../../context/VaultContext";
import type { PageId } from "../../types";

const navItems: { id: PageId; label: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "documents", label: "My credentials", icon: FileStack },
  { id: "recovery", label: "Guardians & Recovery", icon: Users },
  { id: "verifier", label: "Aid Station Verifier", icon: Scan },
  { id: "activity", label: "Activity log", icon: History },
];

interface SidebarContentProps {
  onNavigate?: () => void;
}

function SidebarContent({ onNavigate }: SidebarContentProps) {
  const { currentPage, setCurrentPage, t, activePhone } = useVault();

  const isDemo = activePhone === "1234567890" || activePhone === "1234";
  const displayName = isDemo
    ? "Demo (Arjun Ravi)"
    : activePhone
    ? `User +91 ${activePhone}`
    : "Sovereign Vault";
  const displayDid = isDemo
    ? "did:ethr:0x4f3e...9a01"
    : activePhone
    ? `did:ethr:0x${activePhone.slice(-4)}...${activePhone.slice(0, 4)}`
    : "did:ethr:local-enclave";
  const initials = isDemo ? "AR" : activePhone ? activePhone.slice(0, 2) : "ID";

  return (
    <div className="flex h-full flex-col">
      <button
        type="button"
        onClick={() => {
          setCurrentPage("landing");
          onNavigate?.();
        }}
        className="flex items-center gap-3 px-6 pt-7 text-left group transition-transform hover:opacity-95 cursor-pointer"
        title="Return to Project Landing Page"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-graphite-800 text-lime border border-graphite-700 group-hover:scale-105 transition-transform">
          <ShieldHalf className="h-5 w-5 text-lime" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight text-ink-primary group-hover:text-lime transition-colors">{t.appName}</p>
          <p className="text-xs text-ink-muted">← Project Landing</p>
        </div>
      </button>

      <nav className="mt-8 flex-1 space-y-1 px-3" aria-label="Primary">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCurrentPage(item.id);
                onNavigate?.();
              }}
              aria-current={isActive ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-lime/10 text-lime"
                  : "text-ink-secondary hover:bg-graphite-800 hover:text-ink-primary"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {t.nav[item.id] || item.label}
            </button>
          );
        })}
      </nav>

      <div className="mx-4 mb-4 rounded-xl border border-graphite-700 bg-graphite-800/60 p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-ink-secondary">{t.common.offlineBadge}</p>
          <p className="font-mono text-xs text-lime">100%</p>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-graphite-700">
          <div className="h-full w-full rounded-full bg-lime" />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-graphite-700 px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-graphite-700 font-mono text-xs text-ink-primary">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm text-ink-primary">{displayName}</p>
          <p className="truncate text-xs text-ink-muted">{displayDid}</p>
        </div>
      </div>
    </div>
  );
}

export function DesktopSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-graphite-700 bg-graphite-900 lg:block">
      <div className="sticky top-0 h-screen">
        <SidebarContent />
      </div>
    </aside>
  );
}

export function MobileSidebar() {
  const { isMobileNavOpen, closeMobileNav } = useVault();

  if (!isMobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={closeMobileNav}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="animate-slide-in absolute inset-y-0 left-0 w-72 max-w-[80vw] border-r border-graphite-700 bg-graphite-900">
        <button
          type="button"
          onClick={closeMobileNav}
          aria-label="Close menu"
          className="absolute right-3 top-6 rounded-md p-1.5 text-ink-secondary hover:text-ink-primary"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <SidebarContent onNavigate={closeMobileNav} />
      </div>
    </div>
  );
}
