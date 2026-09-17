import { useState } from "react";
import { useVault } from "../../context/VaultContext";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export function CreateWallet() {
  const { createWallet, setCurrentPage, pushToast } = useVault();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phone || phone.length < 5) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (pin.length !== 4) {
      setError("PIN must be exactly 4 digits.");
      return;
    }

    try {
      createWallet(phone, pin);
      pushToast("✨ New Sovereign Identity Enclave initialized", "success");
      setCurrentPage("overview");
    } catch (err: any) {
      setError(err.message || "Failed to create wallet");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-graphite-950 text-ink-primary">
      <div className="w-full max-w-md rounded-2xl border border-graphite-700 bg-graphite-900 p-8 shadow-vault">
        <button
          onClick={() => setCurrentPage("landing")}
          className="mb-6 flex items-center text-sm text-ink-muted hover:text-ink-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </button>
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-lime/30 bg-lime/10">
            <ShieldCheck className="h-7 w-7 text-lime" />
          </div>
        </div>
        <h2 className="mb-2 text-center text-2xl font-bold">Create Wallet</h2>
        <p className="mb-8 text-center text-sm text-ink-secondary">
          Enter your phone number and choose a 4-digit security PIN.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-danger/10 p-3 text-sm text-danger border border-danger/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink-secondary mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="e.g. 1234567890"
              className="w-full rounded-lg border border-graphite-700 bg-graphite-800 px-4 py-3 text-ink-primary placeholder:text-graphite-500 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-secondary mb-1">
              4-Digit PIN
            </label>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              placeholder="••••"
              className="w-full rounded-lg border border-graphite-700 bg-graphite-800 px-4 py-3 text-ink-primary placeholder:text-graphite-500 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime tracking-widest text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 flex items-center justify-center rounded-xl bg-lime px-4 py-3.5 text-sm font-semibold text-graphite-950 shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Secure Wallet
          </button>
        </form>
      </div>
    </div>
  );
}
