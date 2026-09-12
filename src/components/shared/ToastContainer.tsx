import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { useVault } from "../../context/VaultContext";
import type { ToastVariant } from "../../types";

const variantConfig: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; classes: string }
> = {
  success: { icon: CheckCircle2, classes: "border-lime/30 text-lime" },
  info: { icon: Info, classes: "border-skyblue/30 text-skyblue" },
  warning: { icon: TriangleAlert, classes: "border-amber/30 text-amber" },
};

export function ToastContainer() {
  const { toasts, dismissToast } = useVault();

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:top-6"
      aria-live="polite"
      role="status"
    >
      {toasts.map((toast) => {
        const { icon: Icon, classes } = variantConfig[toast.variant];
        return (
          <div
            key={toast.id}
            className={`animate-toast-in pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border bg-graphite-850/95 px-4 py-3 shadow-vault backdrop-blur ${classes}`}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <p className="flex-1 text-sm text-ink-primary">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 rounded-md p-1 text-ink-muted transition-colors hover:text-ink-primary"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
