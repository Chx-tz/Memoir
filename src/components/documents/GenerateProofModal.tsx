import { CheckCircle2, QrCode, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useVault } from "../../context/VaultContext";

export function GenerateProofModal() {
  const { isProofModalOpen, closeProofModal, documents, proofDocumentId } = useVault();
  const [isGenerating, setIsGenerating] = useState(true);

  const document = documents.find(d => d.id === proofDocumentId);

  useEffect(() => {
    if (isProofModalOpen) {
      setIsGenerating(true);
      const timer = setTimeout(() => {
        setIsGenerating(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isProofModalOpen]);

  if (!isProofModalOpen || !document) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={closeProofModal}
        className="absolute inset-0 w-full h-full cursor-default"
      />
      <div className="animate-fade-in relative w-full max-w-sm rounded-2xl border border-graphite-700 bg-graphite-900 p-6 shadow-vault text-center">
        <div className="flex justify-between items-start absolute right-4 top-4">
          <button
            type="button"
            onClick={closeProofModal}
            className="rounded-md p-1.5 text-ink-muted transition-colors hover:text-ink-primary"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <h2 className="text-lg font-semibold text-ink-primary mb-1">
          Zero-Knowledge Proof
        </h2>
        <p className="text-sm text-ink-secondary mb-8">
          {document.title}
        </p>

        {isGenerating ? (
          <div className="py-12 flex flex-col items-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-graphite-700 border-t-lime"></div>
            <p className="mt-6 text-sm text-ink-secondary animate-pulse">Computing cryptographic proof...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="bg-white p-4 rounded-xl mb-6">
              <QrCode className="h-48 w-48 text-black" strokeWidth={1} />
            </div>
            
            <div className="flex items-center gap-2 text-lime mb-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Ready to verify</span>
            </div>
            
            <div className="bg-graphite-800 rounded-lg p-3 w-full text-left mt-2 border border-graphite-700">
              <p className="text-xs text-ink-muted uppercase tracking-wider mb-1">Sharing only:</p>
              <ul className="text-sm text-ink-primary space-y-1">
                <li>• Verification Status: <span className="text-lime">Valid</span></li>
                {document.type === "health-record" && <li>• Eligibility: <span className="text-lime">Confirmed</span></li>}
                {document.type === "relief-registration" && <li>• Camp ID: <span className="text-lime">Verified</span></li>}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
