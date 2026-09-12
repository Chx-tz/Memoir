import { Lock } from "lucide-react";
import { useState } from "react";
import { useVault } from "../../context/VaultContext";

export function VaultLockedScreen() {
  const { unlockVault, t, uiMode } = useVault();
  const [pin, setPin] = useState("");

  const handleKeyPress = (key: string) => {
    if (pin.length < 4) {
      const newPin = pin + key;
      setPin(newPin);
      if (newPin.length === 4) {
        unlockVault(newPin);
        setPin(""); // reset for next time or if wrong
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber/30 bg-amber/10">
        <Lock className="h-7 w-7 text-amber" aria-hidden="true" />
      </div>
      <h1 className="mt-6 text-xl font-semibold text-ink-primary">{t.appName}</h1>
      <p className="mt-2 text-sm text-ink-secondary">
        {uiMode === "human" ? "Enter your 4-digit security PIN" : "Enter Master PIN to decrypt local enclave"}
      </p>
      
      <div className="mt-8 flex gap-3">
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
        {uiMode === "human"
          ? "Demo PIN: 1234 (Normal) • 9999 (Safety Decoy)"
          : "SIH Evaluator Specs: Genuine DID PIN: 1234 • Duress (Decoy Vault) PIN: 9999"}
      </p>
    </div>
  );
}
