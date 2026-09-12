import { FileText, Link2, Plus, QrCode, ShieldPlus, Users, Utensils } from "lucide-react";
import { useVault } from "../../context/VaultContext";
import type { DocumentType, VaultDocument } from "../../types";
import { StatusBadge } from "../shared/StatusBadge";

const typeIcon: Record<DocumentType, typeof FileText> = {
  "relief-registration": ShieldPlus,
  "health-record": FileText,
  "family-registry": Users,
  "ration-card": Utensils,
};

interface DocumentCardProps {
  document: VaultDocument;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const { openProofModal, openAnchorModal, openIssueModal, t } = useVault();
  const Icon = typeIcon[document.type] || FileText;

  if (document.status === "empty") {
    return (
      <div className="flex flex-col justify-between rounded-2xl border border-dashed border-graphite-600 bg-graphite-850/40 p-5">
        <div>
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-graphite-700 text-ink-muted">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm font-medium text-ink-primary">{document.title}</p>
          <p className="mt-1 text-xs text-ink-muted">{document.subtitle || "Not issued yet"}</p>
        </div>
        <button
          type="button"
          onClick={() => openIssueModal(document.type)}
          className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-graphite-600 py-2 text-sm text-ink-secondary transition-colors duration-200 hover:border-lime/40 hover:text-lime"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {t.common.requestIssuance}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-graphite-700 bg-graphite-850 p-5 shadow-vault">
      <div>
        <div className="flex items-start justify-between">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-1.5">
            {document.anchor && (
              <button
                type="button"
                onClick={() => openAnchorModal(document.id)}
                title="Inspect On-Chain Anchor"
                className="flex items-center gap-1 rounded-md border border-graphite-700 bg-graphite-800 px-2 py-0.5 text-[11px] font-mono text-ink-secondary hover:text-lime hover:border-lime/30 transition-colors"
              >
                <Link2 className="h-3 w-3 text-lime" />
                #{document.anchor.blockNumber.toLocaleString().substring(0, 5)}...
              </button>
            )}
            <StatusBadge label={t.common.verified} tone="lime" />
          </div>
        </div>
        <p className="mt-4 text-sm font-medium text-ink-primary">{document.title}</p>
        <p className="text-xs text-ink-muted">{document.subtitle}</p>
        <p className="mt-3 font-mono text-sm text-ink-secondary" aria-label="Masked data">
          {document.maskedNumber}
        </p>
        <p className="mt-1 text-xs text-ink-muted">{document.updatedAt}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {document.anchor ? (
          <button
            type="button"
            onClick={() => openAnchorModal(document.id)}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-graphite-700 bg-graphite-800/60 py-2 text-xs text-ink-secondary transition-colors duration-200 hover:border-lime/40 hover:text-ink-primary"
          >
            <Link2 className="h-3.5 w-3.5 text-lime" />
            {t.common.anchorInfo}
          </button>
        ) : (
          <div />
        )}
        <button
          type="button"
          onClick={() => openProofModal(document.id)}
          className={`flex items-center justify-center gap-1.5 rounded-lg border border-graphite-600 py-2 text-xs text-ink-secondary transition-colors duration-200 hover:border-lime/40 hover:text-lime ${
            !document.anchor ? "col-span-2" : ""
          }`}
        >
          <QrCode className="h-3.5 w-3.5" aria-hidden="true" />
          {t.common.zkpProof}
        </button>
      </div>
    </div>
  );
}
