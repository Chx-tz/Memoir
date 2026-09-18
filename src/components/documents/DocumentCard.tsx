import { Award, CreditCard, Eye, FileText, Link2, Paperclip, Plus, QrCode, ShieldPlus, Users, Utensils, X } from "lucide-react";
import { useState } from "react";
import { useVault } from "../../context/VaultContext";
import type { DocumentType, VaultDocument } from "../../types";
import { StatusBadge } from "../shared/StatusBadge";

const typeIcon: Record<DocumentType, typeof FileText> = {
  "relief-registration": ShieldPlus,
  "health-record": FileText,
  "family-registry": Users,
  "ration-card": Utensils,
  "national-id": CreditCard,
  "other-certificate": Award,
};

interface DocumentCardProps {
  document: VaultDocument;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const { openProofModal, openAnchorModal, openIssueModal, t } = useVault();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
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
          className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-graphite-600 py-2 text-sm text-ink-secondary transition-colors duration-200 hover:border-lime/40 hover:text-lime cursor-pointer"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {t.common.requestIssuance}
        </button>
      </div>
    );
  }

  return (
    <>
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
                  className="flex items-center gap-1 rounded-md border border-graphite-700 bg-graphite-800 px-2 py-0.5 text-[11px] font-mono text-ink-secondary hover:text-lime hover:border-lime/30 transition-colors cursor-pointer"
                >
                  <Link2 className="h-3 w-3 text-lime" />
                  #{document.anchor.blockNumber.toLocaleString().substring(0, 5)}...
                </button>
              )}
              <StatusBadge label={t.common.verified} tone="lime" />
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold text-ink-primary">{document.title}</p>
          <p className="text-xs text-ink-muted">{document.subtitle}</p>
          <p className="mt-3 font-mono text-sm text-ink-secondary" aria-label="Masked data">
            {document.maskedNumber}
          </p>
          <p className="mt-1 text-xs text-ink-muted">{document.updatedAt}</p>

          {/* Attached File Preview Badge */}
          {document.fileData && (
            <div className="mt-3 flex items-center justify-between rounded-lg border border-graphite-700 bg-graphite-900/80 px-2.5 py-1.5 text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <Paperclip className="h-3.5 w-3.5 text-lime shrink-0" />
                <span className="truncate text-ink-secondary font-mono text-[11px]">
                  {document.fileName || "document.pdf"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="ml-2 flex items-center gap-1 text-[11px] font-medium text-lime hover:underline cursor-pointer shrink-0"
              >
                <Eye className="h-3 w-3" />
                <span>View</span>
              </button>
            </div>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {document.anchor ? (
            <button
              type="button"
              onClick={() => openAnchorModal(document.id)}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-graphite-700 bg-graphite-800/60 py-2 text-sm text-ink-secondary transition-colors duration-200 hover:border-lime/40 hover:text-ink-primary cursor-pointer"
            >
              <Link2 className="h-4 w-4 text-lime" />
              {t.common.anchorInfo}
            </button>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={() => openProofModal(document.id)}
            className={`flex items-center justify-center gap-1.5 rounded-lg border border-graphite-600 py-2 text-sm text-ink-secondary transition-colors duration-200 hover:border-lime/40 hover:text-lime cursor-pointer ${
              !document.anchor ? "col-span-2" : ""
            }`}
          >
            <QrCode className="h-4 w-4" aria-hidden="true" />
            {t.common.zkpProof}
          </button>
        </div>
      </div>

      {/* File Preview Modal */}
      {isPreviewOpen && document.fileData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => setIsPreviewOpen(false)}
            className="absolute inset-0 cursor-default"
          />
          <div className="animate-fade-in relative w-full max-w-lg rounded-2xl border border-graphite-700 bg-graphite-900 p-6 shadow-vault">
            <div className="flex items-center justify-between pb-4 border-b border-graphite-700/80">
              <div className="flex items-center gap-2.5">
                <Paperclip className="h-4 w-4 text-lime" />
                <div>
                  <p className="text-sm font-semibold text-ink-primary truncate">{document.fileName || document.title}</p>
                  <p className="text-xs text-ink-muted">{document.fileSize || "< 2 MB"} • Encrypted Local Storage</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="rounded-md p-1.5 text-ink-muted hover:text-ink-primary cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex flex-col items-center justify-center">
              {document.fileType?.startsWith("image/") || document.fileData.startsWith("data:image/") ? (
                <img
                  src={document.fileData}
                  alt={document.fileName || "Attached Document"}
                  className="max-h-[60vh] w-auto rounded-lg object-contain border border-graphite-700"
                />
              ) : (
                <div className="p-8 text-center bg-graphite-850 rounded-xl border border-graphite-700 w-full">
                  <FileText className="h-12 w-12 text-lime mx-auto mb-3" />
                  <p className="text-sm font-medium text-ink-primary mb-1">{document.fileName || "Document File"}</p>
                  <p className="text-xs text-ink-muted mb-4">PDF / Digital Certificate</p>
                  <a
                    href={document.fileData}
                    download={document.fileName || "document.pdf"}
                    className="inline-flex items-center gap-2 rounded-xl bg-lime px-4 py-2 text-xs font-semibold text-graphite-950 shadow-glow"
                  >
                    Download / Open File
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
