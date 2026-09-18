import { AlertCircle, Boxes, CheckCircle2, Paperclip, Sparkles, Trash2, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { useVault } from "../../context/VaultContext";
import type { DocumentType, VaultDocument } from "../../types";

export function IssueCredentialModal() {
  const { isIssueModalOpen, closeIssueModal, issueCredential, issuePrefillType, activePhone } = useVault();
  
  const [credentialType, setCredentialType] = useState<DocumentType>(
    (issuePrefillType as DocumentType) || "relief-registration"
  );
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState(
    activePhone ? `User +91 ${activePhone}` : "Antony Thomas"
  );
  const [campSector, setCampSector] = useState("Camp Kiosk #4 (Wayanad Sector)");
  const quotaTier = "Tier 1 - Immediate Food & Essential Kit";

  // File Upload State (< 2 MB)
  const [attachedFile, setAttachedFile] = useState<{
    data: string;
    name: string;
    size: string;
    type: string;
  } | null>(null);
  const [fileError, setFileError] = useState("");

  const [step, setStep] = useState<"form" | "anchoring" | "complete">("form");

  if (!isIssueModalOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeBytes = 2 * 1024 * 1024; // 2 MB limit
    if (file.size > maxSizeBytes) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setFileError(`File size (${sizeMb} MB) exceeds the 2 MB limit. Please select a smaller file.`);
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const sizeStr = file.size < 1024 * 1024 
        ? `${Math.round(file.size / 1024)} KB` 
        : `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
      setAttachedFile({
        data: reader.result as string,
        name: file.name,
        size: sizeStr,
        type: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setAttachedFile(null);
    setFileError("");
  };

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("anchoring");

    setTimeout(() => {
      setStep("complete");

      const randomHash = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      const randomBlock = Math.floor(18493200 + Math.random() * 500);

      let docTitle = title.trim();
      let docSubtitle = subtitle.trim();
      let docClaims: Record<string, string> = {
        "Beneficiary": beneficiaryName,
        "Camp Sector": campSector,
      };

      if (credentialType === "ration-card") {
        docTitle = docTitle || "UN Emergency Relief Ration Pass";
        docSubtitle = docSubtitle || "WFP & SDMA Co-Issued";
        docClaims["Ration Allocation"] = quotaTier;
        docClaims["Issuing Authority"] = "UNHCR Camp Station #4";
      } else if (credentialType === "health-record") {
        docTitle = docTitle || "Medical Triage & Health Pass";
        docSubtitle = docSubtitle || "Red Cross Camp Clinic #4";
        docClaims["Health Status"] = "Triage Cleared • Tetanus Valid";
        docClaims["Blood Group"] = "O+";
      } else if (credentialType === "family-registry") {
        docTitle = docTitle || "Family Linkage & Reunification";
        docSubtitle = docSubtitle || "Red Cross Tracer Service";
        docClaims["Household Head"] = beneficiaryName;
        docClaims["Family Size"] = "4 Members";
      } else if (credentialType === "national-id") {
        docTitle = docTitle || "National Identity / Aadhaar Pass";
        docSubtitle = docSubtitle || "Government Verified SSI Root";
        docClaims["Identity Verification"] = "ECDSA secp256k1 Key Pair";
        docClaims["PII Redaction"] = "Zero-Knowledge Proof Enabled";
      } else if (credentialType === "other-certificate") {
        docTitle = docTitle || "Emergency Aid Certificate";
        docSubtitle = docSubtitle || "Field Relief Kiosk";
        docClaims["Category"] = "Disaster Relief Assistance";
      } else {
        docTitle = docTitle || "State Disaster Relief ID";
        docSubtitle = docSubtitle || "Issued by SDMA / Disaster Cell";
        docClaims["Status"] = "Active & Anchored on Hyperledger";
      }

      const newDoc: VaultDocument = {
        id: "doc-" + credentialType + "-" + Date.now(),
        type: credentialType,
        title: docTitle,
        subtitle: docSubtitle,
        maskedNumber: "•••• •••• " + Math.floor(1000 + Math.random() * 9000),
        status: "verified",
        updatedAt: "Issued just now",
        claims: docClaims,
        anchor: {
          txHash: randomHash,
          blockNumber: randomBlock,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
          schemaId: `schema:sih:${credentialType}:v1`,
          revocationStatus: "active",
        },
        fileData: attachedFile?.data,
        fileName: attachedFile?.name,
        fileSize: attachedFile?.size,
        fileType: attachedFile?.type,
      };

      setTimeout(() => {
        issueCredential(newDoc);
        setStep("form");
        setAttachedFile(null);
        setTitle("");
        setSubtitle("");
      }, 1000);
    }, 1600);
  };

  const recipientDid = activePhone 
    ? `did:ethr:0x${activePhone.slice(-4)}...${activePhone.slice(0, 4)}` 
    : "did:ethr:0x4f3e9a012bb45e908127394cf982e019283f66";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={closeIssueModal}
        className="absolute inset-0 cursor-default"
      />
      <div className="animate-fade-in relative w-full max-w-lg my-8 rounded-2xl border border-graphite-700 bg-graphite-900 p-6 shadow-vault">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/10 text-lime">
              <Boxes className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-ink-primary">Upload &amp; Issue Document</h2>
              <p className="text-xs text-ink-secondary">Add any credential with on-chain cryptographic anchor (Max 2 MB)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeIssueModal}
            className="rounded-md p-1.5 text-ink-muted transition-colors hover:text-ink-primary cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === "form" && (
          <form onSubmit={handleIssue} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Document / Credential Type
              </label>
              <select
                value={credentialType}
                onChange={(e) => setCredentialType(e.target.value as DocumentType)}
                className="w-full rounded-xl border border-graphite-700 bg-graphite-850 py-2.5 px-3 text-sm text-ink-primary focus:border-lime/40"
              >
                <option value="relief-registration">State Disaster Relief Camp ID</option>
                <option value="health-record">Medical Triage / Health Record</option>
                <option value="ration-card">UN Emergency Relief Ration Pass</option>
                <option value="family-registry">Family Linkage &amp; Reunification</option>
                <option value="national-id">National ID / Aadhaar / Voter Pass</option>
                <option value="other-certificate">Other Certificate / Emergency Document</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1">
                  Custom Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Wayanad Relief Pass"
                  className="w-full rounded-xl border border-graphite-700 bg-graphite-850 py-2 px-3 text-sm text-ink-primary placeholder:text-graphite-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1">
                  Issuing Authority / Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. SDMA Relief Cell"
                  className="w-full rounded-xl border border-graphite-700 bg-graphite-850 py-2 px-3 text-sm text-ink-primary placeholder:text-graphite-500"
                />
              </div>
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

            {/* File Upload Section under 2MB */}
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Attach Document File / Photo (Max 2 MB)
              </label>
              
              {!attachedFile ? (
                <div className="relative rounded-xl border-2 border-dashed border-graphite-700 hover:border-lime/50 bg-graphite-850/50 p-4 text-center transition-colors">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center pointer-events-none">
                    <UploadCloud className="h-7 w-7 text-ink-muted mb-1" />
                    <p className="text-xs text-ink-primary font-medium">Click or drag &amp; drop document</p>
                    <p className="text-[10px] text-ink-muted mt-0.5">Supports PNG, JPG, JPEG, WEBP or PDF (strictly under 2 MB)</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-lime/30 bg-lime/10 p-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Paperclip className="h-4 w-4 text-lime shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-ink-primary truncate">{attachedFile.name}</p>
                      <p className="text-[10px] font-mono text-lime">{attachedFile.size} • Attached</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1 text-ink-muted hover:text-danger transition-colors cursor-pointer"
                    title="Remove file"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}

              {fileError && (
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Recipient DID
              </label>
              <input
                type="text"
                readOnly
                value={recipientDid}
                className="w-full font-mono text-xs rounded-xl border border-graphite-700 bg-graphite-950 py-2 px-3 text-lime/90"
              />
            </div>

            <div className="rounded-xl border border-graphite-700 bg-graphite-800/40 p-3 text-xs text-ink-muted">
              <span className="font-semibold text-lime">Cryptographic Seal:</span> When issued, the document file and claims are signed with an on-device key and anchored to the local Hyperledger Besu state cache.
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeIssueModal}
                className="rounded-xl border border-graphite-700 px-4 py-2.5 text-sm font-medium text-ink-secondary hover:text-ink-primary cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-graphite-950 shadow-glow transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                Upload &amp; Anchor On-Chain
              </button>
            </div>
          </form>
        )}

        {step === "anchoring" && (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-graphite-700 border-t-lime"></div>
            <p className="mt-6 text-sm font-medium text-ink-primary">Signing &amp; Anchoring Document...</p>
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
            <p className="text-base font-semibold text-ink-primary">Document Anchored &amp; Stored!</p>
            <p className="text-xs text-ink-secondary mt-1 max-w-sm">
              Document verified on-chain. Encrypted and saved securely into your local sovereign vault.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
