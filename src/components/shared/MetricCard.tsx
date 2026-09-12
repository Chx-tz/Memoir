import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  accent: "lime" | "violet" | "skyblue";
}

const accentStyles: Record<MetricCardProps["accent"], string> = {
  lime: "text-lime bg-lime/10",
  violet: "text-violet bg-violet/10",
  skyblue: "text-skyblue bg-skyblue/10",
};

export function MetricCard({ icon: Icon, value, label, accent }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-graphite-700 bg-graphite-850 p-5 shadow-vault">
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${accentStyles[accent]}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="mt-4 font-mono text-2xl font-medium text-ink-primary">{value}</p>
      <p className="mt-1 text-sm text-ink-secondary">{label}</p>
    </div>
  );
}
