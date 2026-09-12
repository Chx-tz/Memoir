interface StatusBadgeProps {
  label: string;
  tone: "lime" | "amber" | "violet" | "muted";
}

const toneStyles: Record<StatusBadgeProps["tone"], string> = {
  lime: "bg-lime/10 text-lime border-lime/30",
  amber: "bg-amber/10 text-amber border-amber/30",
  violet: "bg-violet/10 text-violet border-violet/30",
  muted: "bg-graphite-700/60 text-ink-secondary border-graphite-600",
};

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none ${toneStyles[tone]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}
