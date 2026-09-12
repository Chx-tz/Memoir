import { Boxes, CheckCircle2, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useVault } from "../../context/VaultContext";
import type { DocumentType, VaultDocument } from "../../types";

export function IssueCredentialModal() {
  const { isIssueModalOpen, closeIssueModal, issueCredential, issuePrefillType } = useVault();
  
  const [credentialType, setCredentialType] = useState<DocumentType>(
    (issuePrefillType as DocumentType) || "ration-card"
  );
  const [beneficiaryName, setBeneficiaryName] = useState("Antony Thomas");
  const [campSector, setCampSector] = useState("Camp Kiosk #4 (Wayanad Sector)");
  const [quotaTier, setQuotaTier] = useState("Tier 1 - Immediate Food & Essential Kit");
  const [step, setStep] = useState<"form" | "anchoring" | "complete">("form");

  if (!isIssueModalOpen) return null;

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("anchoring");

    setTimeout(() => {
      setStep("complete");

      const randomHash = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      const randomBlock = Math.floor(18493200 + Math.random() * 500);

      let newDoc: VaultDocument;

      if (credentialType === "ration-card") {
        newDoc = {
          id: "doc-ration-" + Date.now(),
          type: "ration-card",
          title: "UN Emergency Relief Ration Pass",
          subtitle: "WFP & SDMA Co-Issued",
          maskedNumber: "•••• •••• " + Math.floor(1000 + Math.random() * 9000),
          status: "verified",
          updatedAt: "Issued just now",
          claims: {
            "Beneficiary": beneficiaryName,
            "Camp Sector": campSector,
            "Ration Allocation": quotaTier,
            "Biometric Verification": "Local Iris/FP Matched on Device",
            "Issuing Node": "UNHCR Camp Station #4",
          },
          anchor: {
            txHash: randomHash,
            blockNumber: randomBlock,
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
            schemaId: "schema:sih:ration:v1",
            revocationStatus: "active",
          },
        };
      } else if (credentialType === "family-registry") {
        newDoc = {
          id: "doc-family",
          type: "family-registry",
          title: "Family Linkage & Reunification",
          subtitle: "Red Cross Tracer Service",
          maskedNumber: "FAM-LINK-4812",
          status: "verified",
          updatedAt: "Issued just now",
          claims: {
            "Household Head": beneficiaryName,
            "Family Size": "4 Members (2 Minors)",
            "Reunification Registry": "Active Tracking Node #4",
            "Biometric Binding": "ECDSA secp256k1 Key Pair",
          },
          anchor: {
            txHash: randomHash,
            blockNumber: randomBlock,
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
            schemaId: "schema:sih:family:v1",
            revocationStatus: "active",
          },
        };
      } else {
        newDoc = {
          id: "doc-issued-" + Date.now(),
          type: credentialType,
          title: credentialType === "health-record" ? "Medical Triage Record" : "State Relief Camp ID",
          subtitle: "Camp Kiosk #4 Authorized",
          maskedNumber: "•••• •••• 9102",
          status: "verified",
          updatedAt: "Issued just now",
          claims: {
            "Beneficiary": beneficiaryName,
            "Camp Sector": campSector,
            "Verification Status": "Confirmed On-Chain",
          },
          anchor: {
            txHash: randomHash,
            blockNumber: randomBlock,
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
            schemaId: "schema:sih:generic:v1",
            revocationStatus: "active",
          },
        };
      }

      setTimeout(() => {
        issueCredential(newDoc);
        setStep("form");
      }, 1000);
    }, 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={closeIssueModal}
        className="absolute inset-0 cursor-default"
      />
      <div className="animate-fade-in relative w-full max-w-lg rounded-2xl border border-graphite-700 bg-graphite-900 p-6 shadow-vault">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/10 text-lime">
              <Boxes className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-ink-primary">Camp Kiosk Issuance Station</h2>
              <p className="text-xs text-ink-secondary">Issue & Anchor Verifiable Credential (Step 1-2 Demo)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeIssueModal}
            className="rounded-md p-1.5 text-ink-muted transition-colors hover:text-ink-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === "form" && (
          <form onSubmit={handleIssue} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Credential Type
              </label>
              <select
                value={credentialType}
                onChange={(e) => setCredentialType(e.target.value as DocumentType)}
                className="w-full rounded-xl border border-graphite-700 bg-graphite-850 py-2.5 px-3 text-sm text-ink-primary focus:border-lime/40"
              >
                <option value="ration-card">UN Emergency Relief Ration Pass</option>
                <option value="family-registry">Family Linkage & Reunification</option>
                <option value="health-record">Medical Triage Clearance</option>
                <option value="relief-registration">State Disaster Relief ID</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Recipient DID Key
              </label>
              <input
                type="text"
                readOnly
                value="did:ethr:0x4f3e9a012bb45e908127394cf982e019283f66"
                className="w-full font-mono text-xs rounded-xl border border-graphite-700 bg-graphite-950 py-2 px-3 text-lime/90"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1">
                  Beneficiary Name
                </label>
                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  className="w-full rounded-xl border border-graphite-700 bg-graphite-850 py-2 px-3 text-sm text-ink-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1">
                  Camp Sector Node
                </label>
                <input
                  type="text"
                  value={campSector}
                  onChange={(e) => setCampSector(e.target.value)}
                  className="w-full rounded-xl border border-graphite-700 bg-graphite-850 py-2 px-3 text-sm text-ink-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Aid Quota / Allocation
              </label>
              <input
                type="text"
                value={quotaTier}
                onChange={(e) => setQuotaTier(e.target.value)}
                className="w-full rounded-xl border border-graphite-700 bg-graphite-850 py-2 px-3 text-sm text-ink-primary"
              />
            </div>

            <div className="rounded-xl border border-graphite-700 bg-graphite-800/40 p-3 text-xs text-ink-muted">
              <span className="font-semibold text-lime">Cryptographic Anchor:</span> When submitted, the issuer's key signs the credential claims and commits the cryptographic state root to the local Hyperledger node.
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeIssueModal}
                className="rounded-xl border border-graphite-700 px-4 py-2 text-sm text-ink-secondary hover:text-ink-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-lime px-5 py-2 text-sm font-semibold text-graphite-950 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4" />
                Sign & Anchor On-Chain
              </button>
            </div>
          </form>
        )}

        {step === "anchoring" && (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-graphite-700 border-t-lime"></div>
            <p className="mt-6 text-sm font-medium text-ink-primary">Signing Verifiable Credential...</p>
            <p className="mt-1 text-xs text-ink-secondary font-mono animate-pulse">
              Computing Merkle proof and anchoring state on Hyperledger Besu...
            </p>
          </div>
        )}

        {step === "complete" && (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime/10 text-lime mb-3">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <p className="text-base font-semibold text-ink-primary">Credential Anchored Successfully!</p>
            <p className="text-xs text-ink-secondary mt-1 max-w-sm">
              Signed by UNHCR Camp Kiosk authority. Decrypted and stored directly in user's on-device vault.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
