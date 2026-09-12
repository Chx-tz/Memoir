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
  const { currentPage, setCurrentPage } = useVault();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-6 pt-7">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime/10">
          <ShieldHalf className="h-5 w-5 text-lime" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight text-ink-primary">ResilienceID</p>
          <p className="text-xs text-ink-muted">Relief Vault</p>
        </div>
      </div>

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
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200 ${
                isActive
                  ? "bg-lime/10 text-lime"
                  : "text-ink-secondary hover:bg-graphite-800 hover:text-ink-primary"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mx-4 mb-4 rounded-xl border border-graphite-700 bg-graphite-800/60 p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-ink-secondary">Offline Sync</p>
          <p className="font-mono text-xs text-lime">100%</p>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-graphite-700">
          <div className="h-full w-full rounded-full bg-lime" />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-graphite-700 px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-graphite-700 font-mono text-xs text-ink-primary">
          DID
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm text-ink-primary">did:ethr:0x4f...</p>
          <p className="truncate text-xs text-ink-muted">Self-Sovereign ID</p>
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
