import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import type { ActivityEntry, ActivityStatus } from "../../types";

const statusConfig: Record<
  ActivityStatus,
  { icon: typeof CheckCircle2; classes: string }
> = {
  success: { icon: CheckCircle2, classes: "text-lime bg-lime/10" },
  info: { icon: Info, classes: "text-skyblue bg-skyblue/10" },
  warning: { icon: TriangleAlert, classes: "text-amber bg-amber/10" },
};

interface ActivityItemProps {
  entry: ActivityEntry;
}

export function ActivityItem({ entry }: ActivityItemProps) {
  const { icon: Icon, classes } = statusConfig[entry.status];

  return (
    <div className="flex items-start gap-3 border-b border-graphite-700/60 py-3.5 last:border-b-0">
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${classes}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-ink-primary">{entry.action}</p>
        <p className="mt-0.5 font-mono text-xs text-ink-muted">{entry.device}</p>
      </div>
      <p className="shrink-0 font-mono text-xs text-ink-muted">{entry.timestamp}</p>
    </div>
  );
}
