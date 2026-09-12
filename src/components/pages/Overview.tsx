import { FileStack, Sparkles, Users } from "lucide-react";
import { useVault } from "../../context/VaultContext";
import { ActivityItem } from "../activity/ActivityItem";
import { DocumentCard } from "../documents/DocumentCard";
import { QuickActions } from "../QuickActions";
import { MetricCard } from "../shared/MetricCard";

export function Overview() {
  const { documents, activity, guardians, openIssueModal, setCurrentPage } = useVault();

  const verifiedCount = documents.filter((d) => d.status === "verified").length;
  const verifiedStr = verifiedCount < 10 ? `0${verifiedCount}` : `${verifiedCount}`;
  const guardianStr = guardians.length < 10 ? `0${guardians.length}` : `${guardians.length}`;

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-2.5 py-1 font-mono text-[11px] text-lime">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
            Node synced / offline ready
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-primary">
            Camp Kiosk #4 • ResilienceID
          </h1>
          <p className="mt-1 text-sm text-ink-secondary">
            Disaster relief operations active. Self-sovereign identity anchored on Hyperledger.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openIssueModal()}
          className="self-start sm:self-auto rounded-xl bg-lime px-4 py-2 text-xs font-semibold text-graphite-950 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          + Issue Verifiable Credential
        </button>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard icon={FileStack} value={verifiedStr} label="Verified credentials" accent="violet" />
        <MetricCard icon={Users} value={guardianStr} label="Guardians linked" accent="skyblue" />
        <MetricCard icon={Sparkles} value="100%" label="Offline sync" accent="lime" />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-ink-primary">Verifiable Credentials</h2>
          <button
            type="button"
            onClick={() => setCurrentPage("documents")}
            className="text-xs text-lime hover:underline font-medium"
          >
            Manage all
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1.2fr]">
        <QuickActions />
        <div className="rounded-2xl border border-graphite-700 bg-graphite-850 p-5 shadow-vault">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-ink-primary">Recent activity</p>
            <button
              type="button"
              onClick={() => setCurrentPage("activity")}
              className="text-xs text-lime hover:underline font-medium"
            >
              View all
            </button>
          </div>
          <div className="mt-2">
            {activity.slice(0, 4).map((entry) => (
              <ActivityItem key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
