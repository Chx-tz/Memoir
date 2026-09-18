import { useState } from "react";
import { CheckCircle2, Scan, WifiOff, UserCheck } from "lucide-react";
import { useVault } from "../../context/VaultContext";

export function VerifierMode() {
  const { documents, pushToast, logActivity, t, uiMode } = useVault();
  
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || "doc-relief");
  const [isScanning, setIsScanning] = useState(false);
  const [verificationResult, setVerificationResult] = useState<"none" | "verified">("none");
  const [aidDispensed, setAidDispensed] = useState(false);

  const verifiedDocs = documents.filter((d) => d.status === "verified");
  const selectedDoc = documents.find((d) => d.id === selectedDocId) || verifiedDocs[0] || documents[0];

  const handleSimulateScan = () => {
    if (!selectedDoc) {
      pushToast("No credentials available in this wallet to verify. Issue a credential first.", "warning");
      return;
    }
    setIsScanning(true);
    setVerificationResult("none");
    setAidDispensed(false);

    setTimeout(() => {
      setIsScanning(false);
      setVerificationResult("verified");
      pushToast("Zero-Knowledge proof verified offline against cached issuer keys", "success");
      logActivity("Verifier Terminal: Offline ZK proof verified successfully", "success");
    }, 1100);
  };

  const handleDispenseAid = () => {
    setAidDispensed(true);
    pushToast("Emergency aid ration dispensed & logged to local station register", "success");
    logActivity("Aid Dispensed: Relief ration quota fulfilled", "success");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Offline Banner */}
      <section className="rounded-2xl border border-lime/30 bg-lime/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime/20 text-lime">
            <WifiOff className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-ink-primary">{t.nav.verifier}</span>
              <span className="rounded-full bg-lime px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-graphite-950">
                100% Offline
              </span>
            </div>
            <p className="text-xs text-ink-secondary mt-0.5">
              {uiMode === "human"
                ? "Relief officers scan camp passes offline to verify authenticity and ration quotas without internet."
                : "Validates ECDSA ZK-SNARK claims locally against offline cached issuer public keys (UNHCR/SDMA)."}
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-graphite-900/80 px-3 py-1.5 border border-graphite-700 text-xs font-mono text-ink-muted">
          Cached Signers: <span className="text-lime">1,420 Keys</span>
        </div>
      </section>

      {/* Main Verification Workflow */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.3fr] gap-6">
        {/* Scanner Simulation Controls */}
        <div className="rounded-2xl border border-graphite-700 bg-graphite-850 p-6 shadow-vault flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-ink-primary">Incoming Proof Channel</h2>
              <span className="text-xs text-ink-muted">NFC / Optical QR</span>
            </div>

            <label className="block text-xs font-medium text-ink-secondary mb-2">
              Select Proof Presented by Holder:
            </label>
            <select
              value={selectedDocId}
              onChange={(e) => {
                setSelectedDocId(e.target.value);
                setVerificationResult("none");
                setAidDispensed(false);
              }}
              className="w-full rounded-xl border border-graphite-700 bg-graphite-900 py-2.5 px-3 text-sm text-ink-primary mb-5"
            >
              {verifiedDocs.length > 0 ? (
                verifiedDocs.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.title} ({doc.subtitle})
                  </option>
                ))
              ) : (
                <option value="">No verified credentials in this wallet</option>
              )}
            </select>

            <div className="relative rounded-xl border-2 border-dashed border-graphite-600 bg-graphite-900/60 p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
              {isScanning ? (
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-graphite-700 border-t-lime"></div>
                  <p className="mt-4 text-xs font-mono text-lime animate-pulse">Reading QR / Verifying ECDSA signature...</p>
                </div>
              ) : (
                <>
                  <Scan className="h-10 w-10 text-ink-muted mb-3" />
                  <p className="text-xs text-ink-secondary">
                    Simulate scanning the holder's dynamic ZK Proof QR
                  </p>
                  <p className="text-[11px] text-ink-muted mt-1 font-mono">
                    Protocol: W3C DIDComm over Offline NFC/QR
                  </p>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            disabled={isScanning || !selectedDoc}
            onClick={handleSimulateScan}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-lime py-3 text-sm font-semibold text-graphite-950 shadow-glow transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            <Scan className="h-4 w-4" />
            {isScanning ? "Verifying..." : "Scan & Verify Proof"}
          </button>
        </div>

        {/* Verification & Selective Disclosure Outcome */}
        <div className="rounded-2xl border border-graphite-700 bg-graphite-850 p-6 shadow-vault flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-ink-primary">Verification Outcome</h2>
              <span className="text-xs font-mono text-ink-muted">ZK Disclosure Engine</span>
            </div>

            {verificationResult === "none" ? (
              <div className="rounded-xl border border-dashed border-graphite-700 p-8 text-center text-ink-muted text-xs">
                Awaiting proof submission. Click "Scan & Verify Proof" to simulate an offline checkpoint scan.
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-3 rounded-xl border border-lime/40 bg-lime/10 p-3.5 text-lime">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider">Zero-Knowledge Proof Valid</p>
                    <p className="text-[11px] text-ink-secondary">Cryptographic proof satisfied without leaking underlying raw PII.</p>
                  </div>
                </div>

                <div className="rounded-xl border border-graphite-700 bg-graphite-900 p-4 space-y-2.5 text-xs font-mono">
                  <div className="text-[11px] font-sans font-medium text-ink-muted uppercase border-b border-graphite-800 pb-2">
                    Selectively Disclosed Claims:
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-ink-secondary">Credential Type:</span>
                    <span className="text-ink-primary font-semibold">{selectedDoc?.title}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-ink-secondary">Age Eligibility (&gt;= 18):</span>
                    <span className="text-lime font-bold">YES [True]</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-ink-secondary">Raw Date of Birth:</span>
                    <span className="text-ink-muted">[REDACTED BY ZKP]</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-ink-secondary">Aadhaar / National ID:</span>
                    <span className="text-ink-muted">[NOT DISCLOSED]</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-ink-secondary">Camp Sector Authority:</span>
                    <span className="text-ink-primary">Camp Kiosk #4 (Wayanad)</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-ink-secondary">Revocation Status:</span>
                    <span className="text-lime">Non-Revoked (Accumulator Valid)</span>
                  </div>
                </div>

                <div className="rounded-lg bg-graphite-800/40 p-3 border border-graphite-700 text-[11px] text-ink-muted">
                  <strong className="text-ink-secondary">Judge Takeaway:</strong> The aid distribution officer confirms eligibility instantly with zero internet and zero risk of identity weaponization or surveillance.
                </div>
              </div>
            )}
          </div>

          {verificationResult === "verified" && (
            <div className="mt-6 pt-4 border-t border-graphite-700/60 flex items-center justify-between">
              {aidDispensed ? (
                <div className="flex items-center gap-2 text-xs font-medium text-lime">
                  <CheckCircle2 className="h-4 w-4" />
                  Ration Package Dispensed &amp; Reconciled Offline
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleDispenseAid}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-skyblue py-2.5 text-sm font-medium text-graphite-950 transition-colors hover:bg-skyblue/90"
                >
                  <UserCheck className="h-4 w-4" />
                  Authorize Aid Distribution
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
