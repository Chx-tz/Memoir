import { useState } from "react";
import { CheckCircle2, KeyRound, RotateCcw, ShieldAlert, ShieldCheck, UserPlus, Users, X } from "lucide-react";
import { useVault } from "../../context/VaultContext";

export function SocialRecovery() {
  const {
    guardians,
    isRecoverySimulating,
    approvedGuardianIds,
    startRecoverySimulation,
    approveRecoveryGuardian,
    resetRecoverySimulation,
    addGuardian,
    t,
    uiMode,
  } = useVault();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newGuardianName, setNewGuardianName] = useState("");
  const [newGuardianRole, setNewGuardianRole] = useState("");
  const [newGuardianContact, setNewGuardianContact] = useState("");

  const thresholdMet = approvedGuardianIds.length >= 2;

  const handleAddGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuardianName.trim()) return;
    addGuardian({
      name: newGuardianName.trim(),
      role: newGuardianRole.trim() || "Community Member",
      status: "active",
      phoneOrContact: newGuardianContact.trim() || "+91 90000 00000",
    });
    setNewGuardianName("");
    setNewGuardianRole("");
    setNewGuardianContact("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <section className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-primary">
            {t.nav.recovery}
          </h1>
          <p className="mt-1 text-sm text-ink-secondary">
            {uiMode === "human"
              ? "Loss of a phone during displacement should not mean loss of identity. Recover your passes with help from 2 trusted guardians."
              : "Decentralized threshold key recovery (2-of-3 Shamir Shards). Cryptographically restores did:ethr root identity without central authority."}
          </p>
        </div>
        {!isRecoverySimulating && (
          <button
            type="button"
            onClick={startRecoverySimulation}
            className="flex items-center justify-center gap-2 rounded-xl bg-lime px-4 py-2.5 text-sm font-medium text-graphite-950 shadow-glow transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <KeyRound className="h-4 w-4" />
            {uiMode === "human" ? "Test Account Recovery" : "Simulate Lost Device Recovery (Step 6)"}
          </button>
        )}
      </section>

      {/* Recovery Simulation Banner */}
      {isRecoverySimulating && (
        <section className="animate-fade-in rounded-2xl border border-amber/40 bg-amber/10 p-5 shadow-vault">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber/20 text-amber">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-ink-primary">
                  Social Key Recovery Simulation Active
                </h2>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Simulating a displaced person who lost their smartphone during camp relocation. 2 of 3 guardian signatures required.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetRecoverySimulation}
              className="flex items-center gap-1.5 rounded-lg border border-graphite-700 bg-graphite-900 px-3 py-1.5 text-xs text-ink-secondary hover:text-ink-primary"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Test
            </button>
          </div>

          <div className="mt-5 rounded-xl border border-graphite-700 bg-graphite-900/80 p-4">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-medium text-ink-primary">Threshold Quorum Status:</span>
              <span className={`font-mono font-bold ${thresholdMet ? "text-lime" : "text-amber"}`}>
                {approvedGuardianIds.length} / 2 Signatures Collected
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-graphite-800">
              <div
                className={`h-full transition-all duration-300 ${thresholdMet ? "bg-lime" : "bg-amber"}`}
                style={{ width: `${Math.min((approvedGuardianIds.length / 2) * 100, 100)}%` }}
              />
            </div>
          </div>

          {thresholdMet && (
            <div className="mt-4 animate-fade-in rounded-xl border border-lime/40 bg-lime/10 p-4 text-xs text-ink-primary">
              <div className="flex items-center gap-2 text-lime font-bold mb-1">
                <CheckCircle2 className="h-5 w-5" />
                Quorum Achieved! Master Cryptographic Key Reconstructed
              </div>
              <p className="text-ink-secondary leading-relaxed">
                Using Shamir's Secret Sharing scheme (2-of-3 threshold), the encrypted shards were combined to restore <span className="font-mono text-lime">did:ethr:0x4f3e...9a01</span> onto this device without trusting any single central authority.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Guardians List */}
      <section className="rounded-2xl border border-graphite-700 bg-graphite-850 p-6 shadow-vault">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-skyblue/10 text-skyblue">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-medium text-ink-primary">Designated Guardians</h2>
              <p className="text-xs text-ink-muted">
                {guardians.length > 0
                  ? `Threshold: 2 of ${guardians.length} guardians`
                  : "Threshold: Minimum 2 trusted guardians required"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-lime bg-lime/10 px-2.5 py-1 rounded-full border border-lime/20">
            {guardians.length > 0 ? `Shamir 2-of-${guardians.length} Active` : "No Guardians Set"}
          </span>
        </div>
        
        {guardians.length > 0 ? (
          <div className="mt-6 flex flex-col gap-3">
            {guardians.map((guardian) => {
              const isApproved = approvedGuardianIds.includes(guardian.id);

              return (
                <div
                  key={guardian.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-graphite-700/50 pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-graphite-800 border border-graphite-700">
                      <Users className="h-4 w-4 text-ink-secondary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-ink-primary">{guardian.name}</p>
                        <span className="text-[10px] font-mono text-ink-muted">
                          {guardian.phoneOrContact || "+91 98470 •••••"}
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted">{guardian.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {isRecoverySimulating ? (
                      isApproved ? (
                        <span className="flex items-center gap-1.5 rounded-lg border border-lime/40 bg-lime/10 px-3 py-1.5 text-xs font-medium text-lime">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Approved
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => approveRecoveryGuardian(guardian.id)}
                          className="rounded-lg border border-amber/40 bg-amber/10 px-3 py-1.5 text-xs font-medium text-amber hover:bg-amber/20 transition-colors"
                        >
                          {t.common.simulateApproval}
                        </button>
                      )
                    ) : (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-lime/10 text-lime">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-graphite-700 bg-graphite-900/40 p-6 text-center text-xs text-ink-secondary">
            No recovery guardians added to this account yet. Add at least 2 trusted community members (e.g. NGO doctor, camp elder, sister) to enable 2-of-3 threshold recovery in case of lost device.
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-graphite-600 py-3 text-sm font-medium text-ink-secondary transition-colors hover:border-lime/40 hover:text-lime"
        >
          <UserPlus className="h-4 w-4" />
          Add Trusted Guardian
        </button>
      </section>

      {/* Add Guardian Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-graphite-700 bg-graphite-900 p-6 shadow-vault">
            <div className="flex items-start justify-between">
              <h2 className="text-base font-semibold text-ink-primary">Link New Guardian</h2>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-md p-1.5 text-ink-muted hover:text-ink-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddGuardian} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-ink-secondary mb-1">Guardian Full Name</label>
                <input
                  type="text"
                  value={newGuardianName}
                  onChange={(e) => setNewGuardianName(e.target.value)}
                  placeholder="e.g. Maya Nair"
                  className="w-full rounded-xl border border-graphite-700 bg-graphite-850 p-2.5 text-sm text-ink-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-ink-secondary mb-1">Role / Affiliation</label>
                <input
                  type="text"
                  value={newGuardianRole}
                  onChange={(e) => setNewGuardianRole(e.target.value)}
                  placeholder="e.g. Camp Relief Volunteer"
                  className="w-full rounded-xl border border-graphite-700 bg-graphite-850 p-2.5 text-sm text-ink-primary"
                />
              </div>

              <div>
                <label className="block text-ink-secondary mb-1">Contact / DID Key</label>
                <input
                  type="text"
                  value={newGuardianContact}
                  onChange={(e) => setNewGuardianContact(e.target.value)}
                  placeholder="e.g. +91 94000 12345 or did:ethr:0x..."
                  className="w-full rounded-xl border border-graphite-700 bg-graphite-850 p-2.5 text-sm text-ink-primary"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-graphite-700 px-4 py-2.5 text-sm font-medium text-ink-secondary hover:text-ink-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-lime px-4 py-2.5 text-sm font-medium text-graphite-950 shadow-glow transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Confirm &amp; Encrypt Shard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
