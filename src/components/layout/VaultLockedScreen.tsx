import { Lock } from "lucide-react";
import { useState } from "react";
import { useVault } from "../../context/VaultContext";

export function VaultLockedScreen() {
  const { unlockVault, setCurrentPage, t, uiMode } = useVault();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const handleKeyPress = (key: string) => {
    if (pin.length < 4) {
      const newPin = pin + key;
      setPin(newPin);
      if (newPin.length === 4) {
        unlockVault(phone, newPin);
        setPin(""); // reset for next time or if wrong
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center relative">
      <button
        type="button"
        onClick={() => setCurrentPage("landing")}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-xs text-ink-muted hover:text-lime transition-colors cursor-pointer"
      >
        ← Return to Landing Page
      </button>
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber/30 bg-amber/10">
        <Lock className="h-7 w-7 text-amber" aria-hidden="true" />
      </div>
      <h1 className="mt-6 text-xl font-semibold text-ink-primary">{t.appName}</h1>
      <p className="mt-2 text-sm text-ink-secondary mb-6">
        {uiMode === "human" ? t.auth.lockedDescHuman : t.auth.lockedDescAuditor}
      </p>

      <div className="w-full max-w-xs mb-8">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          placeholder={t.auth.phoneLabel}
          className="w-full rounded-lg border border-graphite-700 bg-graphite-800 px-4 py-3 text-ink-primary placeholder:text-graphite-500 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime text-center"
        />
      </div>

      <div className="flex gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-4 w-4 rounded-full transition-colors duration-200 ${
              i < pin.length ? "bg-lime" : "bg-graphite-700"
            }`}
          />
        ))}
      </div>

      <div className="mt-12 grid max-w-xs grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleKeyPress(num.toString())}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-graphite-800 text-xl font-medium text-ink-primary transition-colors hover:bg-graphite-700 active:bg-graphite-600"
          >
            {num}
          </button>
        ))}
        <div />
        <button
          type="button"
          onClick={() => handleKeyPress("0")}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-graphite-800 text-xl font-medium text-ink-primary transition-colors hover:bg-graphite-700 active:bg-graphite-600"
        >
          0
        </button>
        <button
          type="button"
          onClick={handleBackspace}
          className="flex h-16 w-16 items-center justify-center rounded-full text-sm font-medium text-ink-secondary transition-colors hover:text-ink-primary active:text-ink-primary/70"
        >
          Del
        </button>
      </div>
      <p className="mt-12 text-xs text-ink-muted">
        {t.auth.demoPinText}
      </p>
    </div>
  );
}
