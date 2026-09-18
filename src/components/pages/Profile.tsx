import {
  Camera,
  ChevronDown,
  ChevronUp,
  KeyRound,
  Lock,
  Plus,
  Shield,
  Trash2,
  UploadCloud,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useVault } from "../../context/VaultContext";
import type { Nominee } from "../../types";

const RELATION_OPTIONS = [
  "Spouse",
  "Parent",
  "Child",
  "Sibling",
  "Friend",
  "Legal Guardian",
  "Other",
];

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof UserCircle;
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-graphite-700 bg-graphite-900 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-4 hover:bg-graphite-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime/10">
            <Icon className="h-4 w-4 text-lime" />
          </div>
          <span className="text-sm font-semibold text-ink-primary">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 text-ink-muted" />
        ) : (
          <ChevronDown className="h-4 w-4 text-ink-muted" />
        )}
      </button>
      {open && <div className="border-t border-graphite-700 px-6 py-5">{children}</div>}
    </div>
  );
}

function IdentitySection() {
  const { profile, updateProfile, activePhone } = useVault();
  const [name, setName] = useState(profile.displayName);
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatarError, setAvatarError] = useState("");

  const handleSaveName = () => {
    updateProfile({ displayName: name.trim() });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarError("");
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setAvatarError("Photo must be under 2 MB"); return; }
    if (!file.type.startsWith("image/")) { setAvatarError("Only image files are accepted"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => { updateProfile({ avatarData: ev.target?.result as string }); };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => updateProfile({ avatarData: null });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="relative">
          {profile.avatarData ? (
            <img src={profile.avatarData} alt="Profile" className="h-20 w-20 rounded-full object-cover border-2 border-graphite-600" />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-graphite-700 border-2 border-graphite-600">
              <UserCircle className="h-10 w-10 text-ink-muted" />
            </div>
          )}
          <button type="button" onClick={() => fileRef.current?.click()}
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-lime text-graphite-950 hover:bg-lime/90 transition-colors shadow">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="space-y-1">
          <button type="button" onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 text-sm text-lime hover:text-lime/80 transition-colors">
            <UploadCloud className="h-4 w-4" />Upload photo
          </button>
          {profile.avatarData && (
            <button type="button" onClick={removeAvatar}
              className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-red-400 transition-colors">
              <X className="h-3 w-3" />Remove
            </button>
          )}
          <p className="text-xs text-ink-muted">Image · max 2 MB</p>
          {avatarError && <p className="text-xs text-red-400">{avatarError}</p>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
      </div>

      <div>
        <label className="block text-xs font-medium text-ink-secondary mb-1.5">Display Name</label>
        <div className="flex gap-2">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Antony Thomas"
            className="flex-1 rounded-xl border border-graphite-600 bg-graphite-800 px-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-lime focus:outline-none" />
          <button type="button" onClick={handleSaveName} disabled={name.trim() === profile.displayName}
            className="rounded-xl bg-lime px-4 py-2.5 text-sm font-semibold text-graphite-950 hover:bg-lime/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            Save
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-ink-secondary mb-1.5">Phone Number (read-only)</label>
        <div className="rounded-xl border border-graphite-600 bg-graphite-800/50 px-4 py-2.5 text-sm text-ink-muted font-mono">
          +91 {activePhone || "—"}
        </div>
      </div>
    </div>
  );
}

function NomineesSection() {
  const { nominees, addNominee, removeNominee } = useVault();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Nominee, "id">>({ name: "", relation: "Spouse", phone: "" });
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!form.name.trim()) { setError("Name is required"); return; }
    if (!/^\d{10}$/.test(form.phone)) { setError("Phone must be 10 digits"); return; }
    addNominee(form);
    setForm({ name: "", relation: "Spouse", phone: "" });
    setShowForm(false);
    setError("");
  };

  return (
    <div className="space-y-4">
      {nominees.length === 0 && !showForm && (
        <p className="text-sm text-ink-muted text-center py-3">
          No nominees added yet. Add emergency contacts who should be notified during a disaster.
        </p>
      )}
      {nominees.map((n) => (
        <div key={n.id} className="flex items-center justify-between rounded-xl border border-graphite-700 bg-graphite-800/60 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-ink-primary">{n.name}</p>
            <p className="text-xs text-ink-muted">{n.relation} · +91 {n.phone}</p>
          </div>
          <button type="button" onClick={() => removeNominee(n.id)}
            className="p-1.5 rounded-lg text-ink-muted hover:text-red-400 hover:bg-red-400/10 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      {showForm && (
        <div className="rounded-xl border border-graphite-600 bg-graphite-800/80 p-4 space-y-3">
          <p className="text-xs font-semibold text-lime uppercase tracking-wide">New Nominee</p>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs text-ink-secondary mb-1">Full Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Meera Thomas"
                className="w-full rounded-xl border border-graphite-600 bg-graphite-800 px-3 py-2 text-sm text-ink-primary placeholder:text-ink-muted focus:border-lime focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-ink-secondary mb-1">Relation</label>
              <select value={form.relation} onChange={(e) => setForm((f) => ({ ...f, relation: e.target.value }))}
                className="w-full rounded-xl border border-graphite-600 bg-graphite-800 px-3 py-2 text-sm text-ink-primary focus:border-lime focus:outline-none">
                {RELATION_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-ink-secondary mb-1">Phone (10 digits)</label>
              <input type="tel" value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                placeholder="9876543210"
                className="w-full rounded-xl border border-graphite-600 bg-graphite-800 px-3 py-2 text-sm text-ink-primary placeholder:text-ink-muted focus:border-lime focus:outline-none" />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={handleAdd}
              className="flex-1 rounded-xl bg-lime py-2 text-sm font-semibold text-graphite-950 hover:bg-lime/90 transition-colors">
              Add Nominee
            </button>
            <button type="button" onClick={() => { setShowForm(false); setError(""); }}
              className="rounded-xl border border-graphite-600 px-4 py-2 text-sm text-ink-secondary hover:bg-graphite-700 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
      {!showForm && (
        <button type="button" onClick={() => setShowForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-graphite-600 py-2.5 text-sm text-ink-muted hover:border-lime hover:text-lime transition-colors">
          <Plus className="h-4 w-4" />Add Nominee
        </button>
      )}
    </div>
  );
}

function ChangePinSection() {
  const { changePin } = useVault();
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = () => {
    setError(""); setSuccess(false);
    if (newPin.length < 4) { setError("New PIN must be at least 4 digits"); return; }
    if (newPin !== confirmPin) { setError("New PINs do not match"); return; }
    if (newPin === "9999") { setError("9999 is reserved for duress mode — choose another PIN"); return; }
    const ok = changePin(oldPin, newPin);
    if (ok) { setOldPin(""); setNewPin(""); setConfirmPin(""); setSuccess(true); }
  };

  return (
    <div className="space-y-3">
      {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}
      {success && <div className="rounded-xl border border-lime/30 bg-lime/10 px-4 py-3 text-sm text-lime">PIN changed successfully ✓</div>}
      {["Current PIN", "New PIN", "Confirm New PIN"].map((label, i) => {
        const vals = [oldPin, newPin, confirmPin];
        const setters = [setOldPin, setNewPin, setConfirmPin];
        return (
          <div key={label}>
            <label className="block text-xs font-medium text-ink-secondary mb-1.5">{label}</label>
            <input type="password" inputMode="numeric" maxLength={8} value={vals[i]}
              onChange={(e) => setters[i](e.target.value.replace(/\D/g, ""))}
              placeholder="••••"
              className="w-full rounded-xl border border-graphite-600 bg-graphite-800 px-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-lime focus:outline-none" />
          </div>
        );
      })}
      <button type="button" onClick={handleChange}
        className="w-full rounded-xl bg-lime py-2.5 text-sm font-semibold text-graphite-950 hover:bg-lime/90 transition-colors mt-1">
        Update PIN
      </button>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-yellow-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-yellow-300 mb-1">Duress PIN — 9999</p>
            <p className="text-xs text-ink-muted leading-relaxed">
              If you enter PIN <span className="font-mono font-bold text-yellow-300">9999</span> at the lock screen, the vault opens in <strong className="text-ink-secondary">Decoy Mode</strong> — showing fake documents. Your real credentials stay hidden. Use this if forced to unlock under coercion.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-graphite-700 bg-graphite-800/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <Lock className="h-4 w-4 text-ink-muted" />
          <div>
            <p className="text-sm font-medium text-ink-primary">Biometric Unlock</p>
            <p className="text-xs text-ink-muted">Fingerprint or Face ID</p>
          </div>
        </div>
        <span className="rounded-full border border-graphite-600 bg-graphite-700 px-2.5 py-0.5 text-xs text-ink-muted">Coming soon</span>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-graphite-700 bg-graphite-800/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <KeyRound className="h-4 w-4 text-ink-muted" />
          <div>
            <p className="text-sm font-medium text-ink-primary">Auto-lock</p>
            <p className="text-xs text-ink-muted">Lock after inactivity</p>
          </div>
        </div>
        <span className="rounded-full border border-graphite-600 bg-graphite-700 px-2.5 py-0.5 text-xs text-ink-muted">Coming soon</span>
      </div>
    </div>
  );
}

export function Profile() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-ink-primary">Profile &amp; Settings</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Manage your identity, emergency nominees, and security settings.
        </p>
      </div>
      <Section icon={UserCircle} title="Identity">
        <IdentitySection />
      </Section>
      <Section icon={Users} title="Nominees (Emergency Contacts)">
        <NomineesSection />
      </Section>
      <Section icon={KeyRound} title="Change PIN">
        <ChangePinSection />
      </Section>
      <Section icon={Shield} title="Security Settings">
        <SecuritySection />
      </Section>
    </div>
  );
}
