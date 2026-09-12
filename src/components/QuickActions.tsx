import { Boxes, Download, Lock, Scan } from "lucide-react";
import { useVault } from "../context/VaultContext";

export function QuickActions() {
  const { openIssueModal, setCurrentPage, pushToast, logActivity, lockVault } = useVault();

  const actions = [
    {
      id: "issue",
      label: "Issue Credential",
      icon: Boxes,
      onClick: () => openIssueModal(),
    },
    {
      id: "verifier",
      label: "Aid Verifier",
      icon: Scan,
      onClick: () => {
        setCurrentPage("verifier");
        pushToast("Switched to Aid Station Verifier Terminal", "info");
      },
    },
    {
      id: "export",
      label: "Backup Shards",
      icon: Download,
      onClick: () => {
        pushToast("Encrypted Shamir backup exported", "success");
        logActivity("Backup of encrypted key shards exported", "info");
      },
    },
    {
      id: "lock",
      label: "Lock now",
      icon: Lock,
      onClick: lockVault,
    },
  ] as const;

  return (
    <div className="rounded-2xl border border-graphite-700 bg-graphite-850 p-5 shadow-vault">
      <p className="text-sm font-medium text-ink-primary">Quick actions</p>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              className="flex flex-col items-center gap-2 rounded-xl border border-graphite-700 py-4 text-xs text-ink-secondary transition-colors duration-200 hover:border-lime/30 hover:text-lime"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
