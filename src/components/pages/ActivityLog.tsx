import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { useVault } from "../../context/VaultContext";
import { ActivityItem } from "../activity/ActivityItem";
import type { ActivityStatus } from "../../types";

const filters: { id: ActivityStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "success", label: "Success" },
  { id: "info", label: "Info" },
  { id: "warning", label: "Warning" },
];

export function ActivityLog() {
  const { activity, pushToast } = useVault();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ActivityStatus | "all">("all");

  const filteredActivity = useMemo(() => {
    return activity.filter((entry) => {
      const matchesQuery = entry.action.toLowerCase().includes(query.trim().toLowerCase());
      const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [activity, query, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-ink-primary">Activity log</h1>
          <p className="mt-1 text-sm text-ink-secondary">
            A record of every access and security event on your vault.
          </p>
        </div>
        <button
          type="button"
          onClick={() => pushToast("Activity log exported", "success")}
          className="flex items-center justify-center gap-2 self-start rounded-xl border border-graphite-700 px-4 py-2.5 text-sm text-ink-secondary transition-colors duration-200 hover:text-ink-primary sm:self-auto"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Export activity log
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search activity"
            aria-label="Search activity"
            className="w-full rounded-xl border border-graphite-700 bg-graphite-850 py-2.5 pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-lime/40"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setStatusFilter(filter.id)}
              className={`rounded-lg border px-3 py-1.5 text-xs transition-colors duration-200 ${
                statusFilter === filter.id
                  ? "border-lime/40 bg-lime/10 text-lime"
                  : "border-graphite-700 text-ink-secondary hover:text-ink-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-graphite-700 bg-graphite-850 p-5 shadow-vault">
        {filteredActivity.length > 0 ? (
          filteredActivity.map((entry) => <ActivityItem key={entry.id} entry={entry} />)
        ) : (
          <p className="py-8 text-center text-sm text-ink-secondary">
            No activity matches your filters.
          </p>
        )}
      </div>
    </div>
  );
}
