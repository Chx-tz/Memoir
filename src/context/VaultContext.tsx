import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialActivity,
  initialDocuments,
  decoyDocuments,
  initialGuardians,
} from "../data/mockData";
import type {
  ActivityEntry,
  ActivityStatus,
  Guardian,
  PageId,
  ToastMessage,
  ToastVariant,
  VaultDocument,
} from "../types";

interface VaultContextValue {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  isMobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;

  isVaultLocked: boolean;
  isDuressMode: boolean;
  unlockVault: (pin: string) => void;
  lockVault: () => void;
  toggleVaultLock: () => void;

  documents: VaultDocument[];
  documentSearch: string;
  setDocumentSearch: (val: string) => void;
  
  isProofModalOpen: boolean;
  proofDocumentId: string | null;
  openProofModal: (id: string) => void;
  closeProofModal: () => void;

  isAnchorModalOpen: boolean;
  anchorDocumentId: string | null;
  openAnchorModal: (id: string) => void;
  closeAnchorModal: () => void;

  isIssueModalOpen: boolean;
  issuePrefillType?: string;
  openIssueModal: (prefillType?: string) => void;
  closeIssueModal: () => void;
  issueCredential: (newDoc: VaultDocument) => void;

  // Social Recovery Simulation
  guardians: Guardian[];
  addGuardian: (guardian: Omit<Guardian, "id">) => void;
  isRecoverySimulating: boolean;
  approvedGuardianIds: string[];
  startRecoverySimulation: () => void;
  approveRecoveryGuardian: (guardianId: string) => void;
  resetRecoverySimulation: () => void;

  activity: ActivityEntry[];
  logActivity: (action: string, status: ActivityStatus) => void;

  toasts: ToastMessage[];
  pushToast: (message: string, variant?: ToastVariant) => void;
  dismissToast: (id: string) => void;
}

const VaultContext = createContext<VaultContextValue | null>(null);

let toastCounter = 0;
let activityCounter = 0;

export function VaultProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>("overview");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  const [isVaultLocked, setIsVaultLocked] = useState(true);
  const [isDuressMode, setIsDuressMode] = useState(false);

  const [documentSearch, setDocumentSearch] = useState("");
  const [activeDocuments, setActiveDocuments] = useState<VaultDocument[]>(initialDocuments);

  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [proofDocumentId, setProofDocumentId] = useState<string | null>("doc-relief");

  const [isAnchorModalOpen, setIsAnchorModalOpen] = useState(false);
  const [anchorDocumentId, setAnchorDocumentId] = useState<string | null>(null);

  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issuePrefillType, setIssuePrefillType] = useState<string | undefined>(undefined);

  // Social Recovery Simulation
  const [guardians, setGuardians] = useState<Guardian[]>(initialGuardians);
  const [isRecoverySimulating, setIsRecoverySimulating] = useState(false);
  const [approvedGuardianIds, setApprovedGuardianIds] = useState<string[]>([]);

  const [activity, setActivity] = useState<ActivityEntry[]>(initialActivity);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      toastCounter += 1;
      const id = `toast-${toastCounter}`;
      setToasts((prev) => [...prev, { id, message, variant }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3800);
    },
    [],
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const logActivity = useCallback(
    (action: string, status: ActivityStatus) => {
      activityCounter += 1;
      const entry: ActivityEntry = {
        id: `act-new-${activityCounter}`,
        action,
        device: "This device • Current session",
        timestamp: "Just now",
        status,
      };
      setActivity((prev) => [entry, ...prev]);
    },
    [],
  );

  const openMobileNav = useCallback(() => setIsMobileNavOpen(true), []);
  const closeMobileNav = useCallback(() => setIsMobileNavOpen(false), []);

  const unlockVault = useCallback((pin: string) => {
    if (pin === "9999") { // Duress PIN
      setIsDuressMode(true);
      setIsVaultLocked(false);
      pushToast("Vault unlocked in restricted mode", "warning");
      logActivity("Duress PIN entered • Decoy vault loaded", "warning");
    } else if (pin === "1234") { // Real PIN
      setIsDuressMode(false);
      setIsVaultLocked(false);
      pushToast("ResilienceID Vault unlocked", "success");
      logActivity("Vault unlocked successfully", "success");
    } else {
      pushToast("Incorrect PIN. Please try again.", "warning");
    }
  }, [pushToast, logActivity]);

  const lockVault = useCallback(() => {
    setIsVaultLocked(true);
    setIsDuressMode(false);
    pushToast("Vault locked securely", "warning");
    logActivity("Vault locked manually", "warning");
  }, [pushToast, logActivity]);

  const toggleVaultLock = useCallback(() => {
    if (isVaultLocked) {
      unlockVault("1234");
    } else {
      lockVault();
    }
  }, [isVaultLocked, unlockVault, lockVault]);

  const openProofModal = useCallback((id: string) => {
    setProofDocumentId(id);
    setIsProofModalOpen(true);
    logActivity("Zero-knowledge proof generated for credential", "info");
  }, [logActivity]);

  const closeProofModal = useCallback(() => {
    setIsProofModalOpen(false);
  }, []);

  const openAnchorModal = useCallback((id: string) => {
    setAnchorDocumentId(id);
    setIsAnchorModalOpen(true);
    logActivity("On-chain blockchain anchor inspected", "info");
  }, [logActivity]);

  const closeAnchorModal = useCallback(() => {
    setIsAnchorModalOpen(false);
    setAnchorDocumentId(null);
  }, []);

  const openIssueModal = useCallback((prefillType?: string) => {
    setIssuePrefillType(prefillType);
    setIsIssueModalOpen(true);
  }, []);

  const closeIssueModal = useCallback(() => {
    setIsIssueModalOpen(false);
    setIssuePrefillType(undefined);
  }, []);

  const issueCredential = useCallback(
    (newDoc: VaultDocument) => {
      setActiveDocuments((prev) => {
        const existingIdx = prev.findIndex(
          (d) => d.id === newDoc.id || (d.type === newDoc.type && d.status === "empty")
        );
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = newDoc;
          return updated;
        }
        return [...prev, newDoc];
      });
      setIsIssueModalOpen(false);
      pushToast(`Credential issued & anchored: ${newDoc.title}`, "success");
      logActivity(`Verifiable credential anchored on-chain: ${newDoc.title}`, "success");
    },
    [pushToast, logActivity],
  );

  const addGuardian = useCallback(
    (g: Omit<Guardian, "id">) => {
      const newGuardian: Guardian = {
        ...g,
        id: `g-${Date.now()}`,
      };
      setGuardians((prev) => [...prev, newGuardian]);
      pushToast(`Guardian linked: ${g.name}`, "success");
      logActivity(`New recovery guardian registered: ${g.name}`, "info");
    },
    [pushToast, logActivity],
  );

  const startRecoverySimulation = useCallback(() => {
    setIsRecoverySimulating(true);
    setApprovedGuardianIds([]);
    pushToast("Social recovery simulation started", "info");
    logActivity("Social recovery test triggered (Threshold: 2 of 3)", "warning");
  }, [pushToast, logActivity]);

  const approveRecoveryGuardian = useCallback(
    (guardianId: string) => {
      setApprovedGuardianIds((prev) => {
        if (prev.includes(guardianId)) return prev;
        const next = [...prev, guardianId];
        const guardian = guardians.find((g) => g.id === guardianId);
        logActivity(`Recovery signature confirmed by ${guardian?.name || "Guardian"}`, "success");
        if (next.length >= 2) {
          pushToast("Quorum achieved! Master DID and private keys restored.", "success");
          logActivity("Social recovery quorum complete • Keys reconstructed", "success");
        } else {
          pushToast("Approval registered (1/2 threshold)", "info");
        }
        return next;
      });
    },
    [guardians, pushToast, logActivity],
  );

  const resetRecoverySimulation = useCallback(() => {
    setIsRecoverySimulating(false);
    setApprovedGuardianIds([]);
  }, []);

  const documents = isDuressMode ? decoyDocuments : activeDocuments;

  const value = useMemo<VaultContextValue>(
    () => ({
      currentPage,
      setCurrentPage,
      isMobileNavOpen,
      openMobileNav,
      closeMobileNav,
      isVaultLocked,
      isDuressMode,
      unlockVault,
      lockVault,
      toggleVaultLock,
      documents,
      documentSearch,
      setDocumentSearch,
      isProofModalOpen,
      proofDocumentId,
      openProofModal,
      closeProofModal,
      isAnchorModalOpen,
      anchorDocumentId,
      openAnchorModal,
      closeAnchorModal,
      isIssueModalOpen,
      issuePrefillType,
      openIssueModal,
      closeIssueModal,
      issueCredential,
      guardians,
      addGuardian,
      isRecoverySimulating,
      approvedGuardianIds,
      startRecoverySimulation,
      approveRecoveryGuardian,
      resetRecoverySimulation,
      activity,
      logActivity,
      toasts,
      pushToast,
      dismissToast,
    }),
    [
      currentPage,
      isMobileNavOpen,
      openMobileNav,
      closeMobileNav,
      isVaultLocked,
      isDuressMode,
      unlockVault,
      lockVault,
      toggleVaultLock,
      documents,
      documentSearch,
      isProofModalOpen,
      proofDocumentId,
      openProofModal,
      closeProofModal,
      isAnchorModalOpen,
      anchorDocumentId,
      openAnchorModal,
      closeAnchorModal,
      isIssueModalOpen,
      issuePrefillType,
      openIssueModal,
      closeIssueModal,
      issueCredential,
      guardians,
      addGuardian,
      isRecoverySimulating,
      approvedGuardianIds,
      startRecoverySimulation,
      approveRecoveryGuardian,
      resetRecoverySimulation,
      activity,
      logActivity,
      toasts,
      pushToast,
      dismissToast,
    ],
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault(): VaultContextValue {
  const ctx = useContext(VaultContext);
  if (!ctx) {
    throw new Error("useVault must be used within a VaultProvider");
  }
  return ctx;
}
