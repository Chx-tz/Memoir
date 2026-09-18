import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
  Language,
  Nominee,
  PageId,
  ThemeMode,
  ToastMessage,
  ToastVariant,
  UiMode,
  UserProfile,
  VaultDocument,
} from "../types";
import { getTranslation, type TranslationDictionary } from "../data/translations";

interface UserData {
  phone: string;
  pin: string;
  documents: VaultDocument[];
  activity: ActivityEntry[];
  guardians: Guardian[];
  profile: UserProfile;
  nominees: Nominee[];
}

export const DEMO_PHONE = "1234567890";

const DEMO_ACCOUNT: UserData = {
  phone: DEMO_PHONE,
  pin: "1234",
  documents: initialDocuments,
  activity: initialActivity,
  guardians: initialGuardians,
  profile: { displayName: "Arjun Ravi (Demo)", avatarData: null },
  nominees: [],
};

const getUsers = (): Record<string, UserData> => {
  try {
    const raw = localStorage.getItem("resilienceIdUsers");
    const users: Record<string, UserData> = raw ? JSON.parse(raw) : {};
    // Ensure the demo dummy account always exists with demo resources
    if (!users[DEMO_PHONE]) {
      users[DEMO_PHONE] = DEMO_ACCOUNT;
    }
    return users;
  } catch {
    return { [DEMO_PHONE]: DEMO_ACCOUNT };
  }
};

const saveUsers = (users: Record<string, UserData>) => {
  localStorage.setItem("resilienceIdUsers", JSON.stringify(users));
};

interface SessionData {
  activePhone: string | null;
  isVaultLocked: boolean;
  currentPage: PageId;
  isDuressMode: boolean;
}

const getSavedSession = (): SessionData => {
  try {
    const raw = localStorage.getItem("resilienceIdSession");
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    activePhone: null,
    isVaultLocked: true,
    currentPage: "landing",
    isDuressMode: false,
  };
};

const saveSession = (session: SessionData) => {
  try {
    localStorage.setItem("resilienceIdSession", JSON.stringify(session));
  } catch {}
};

interface VaultContextValue {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  isMobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;

  uiMode: UiMode;
  setUiMode: (mode: UiMode) => void;
  toggleUiMode: () => void;

  language: Language;
  setLanguage: (lang: Language) => void;

  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;

  t: TranslationDictionary;

  isVaultLocked: boolean;
  isDuressMode: boolean;
  activePhone: string | null;
  createWallet: (phone: string, pin: string) => void;
  unlockVault: (phone: string, pin: string) => void;
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

  // Profile & Account Settings
  profile: UserProfile;
  updateProfile: (patch: Partial<UserProfile>) => void;
  nominees: Nominee[];
  addNominee: (nominee: Omit<Nominee, "id">) => void;
  removeNominee: (id: string) => void;
  changePin: (oldPin: string, newPin: string) => boolean;
}

const VaultContext = createContext<VaultContextValue | null>(null);

let toastCounter = 0;
let activityCounter = 0;

export function VaultProvider({ children }: { children: ReactNode }) {
  const [savedSession] = useState(() => getSavedSession());
  const [initialUserData] = useState(() => {
    if (savedSession.activePhone && !savedSession.isVaultLocked) {
      const users = getUsers();
      return users[savedSession.activePhone] || null;
    }
    return null;
  });

  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (savedSession.activePhone && !savedSession.isVaultLocked) {
      return savedSession.currentPage === "landing" || savedSession.currentPage === "create_wallet"
        ? "overview"
        : savedSession.currentPage;
    }
    return "landing";
  });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [uiMode, setUiMode] = useState<UiMode>("human");
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const toggleUiMode = useCallback(() => {
    setUiMode((prev) => (prev === "human" ? "auditor" : "human"));
  }, []);

  const t = useMemo(() => getTranslation(language, uiMode), [language, uiMode]);
  
  const [isVaultLocked, setIsVaultLocked] = useState<boolean>(() =>
    savedSession.activePhone ? savedSession.isVaultLocked : true
  );
  const [isDuressMode, setIsDuressMode] = useState<boolean>(() =>
    savedSession.activePhone ? savedSession.isDuressMode : false
  );
  const [activePhone, setActivePhone] = useState<string | null>(() =>
    savedSession.activePhone && !savedSession.isVaultLocked ? savedSession.activePhone : null
  );

  const [documentSearch, setDocumentSearch] = useState("");
  const [activeDocuments, setActiveDocuments] = useState<VaultDocument[]>(
    () => initialUserData?.documents || []
  );

  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [proofDocumentId, setProofDocumentId] = useState<string | null>(null);

  const [isAnchorModalOpen, setIsAnchorModalOpen] = useState(false);
  const [anchorDocumentId, setAnchorDocumentId] = useState<string | null>(null);

  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issuePrefillType, setIssuePrefillType] = useState<string | undefined>(undefined);

  // Social Recovery Simulation
  const [guardians, setGuardians] = useState<Guardian[]>(
    () => initialUserData?.guardians || []
  );
  const [isRecoverySimulating, setIsRecoverySimulating] = useState(false);
  const [approvedGuardianIds, setApprovedGuardianIds] = useState<string[]>([]);

  // Profile & Nominees
  const [profile, setProfile] = useState<UserProfile>(
    () => initialUserData?.profile || { displayName: "", avatarData: null }
  );
  const [nominees, setNominees] = useState<Nominee[]>(
    () => initialUserData?.nominees || []
  );

  const [activity, setActivity] = useState<ActivityEntry[]>(
    () => initialUserData?.activity || []
  );
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync active session state to local storage so refreshes retain active account & current page
  useEffect(() => {
    saveSession({
      activePhone,
      isVaultLocked,
      currentPage,
      isDuressMode,
    });
  }, [activePhone, isVaultLocked, currentPage, isDuressMode]);

  // Sync state to local storage for the active user
  useEffect(() => {
    if (activePhone) {
      const users = getUsers();
      if (users[activePhone]) {
        users[activePhone] = {
          ...users[activePhone],
          documents: activeDocuments,
          activity,
          guardians,
          profile,
          nominees,
        };
        saveUsers(users);
      }
    }
  }, [activePhone, activeDocuments, activity, guardians, profile, nominees]);

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

  const createWallet = useCallback((phone: string, pin: string) => {
    const users = getUsers();
    if (users[phone] && phone !== DEMO_PHONE) {
      throw new Error("Phone number already registered.");
    }
    const newUser: UserData = {
      phone,
      pin,
      documents: [],
      activity: [
        {
          id: `act-${Date.now()}`,
          action: "Wallet Created & Sovereign DID Initialized",
          device: "This device • Current session",
          timestamp: "Just now",
          status: "success",
        },
      ],
      guardians: [],
      profile: { displayName: "", avatarData: null },
      nominees: [],
    };
    users[phone] = newUser;
    saveUsers(users);

    setActivePhone(phone);
    setActiveDocuments(newUser.documents);
    setActivity(newUser.activity);
    setGuardians(newUser.guardians);
    setProfile(newUser.profile);
    setNominees(newUser.nominees);
    setIsDuressMode(false);
    setIsVaultLocked(false);
    setCurrentPage("overview");
  }, []);

  const unlockVault = useCallback((phone: string, pin: string) => {
    // 1. Duress PIN (Safety Decoy Mode)
    if (pin === "9999") {
      setIsDuressMode(true);
      setIsVaultLocked(false);
      setCurrentPage("overview");
      pushToast("Vault unlocked in restricted mode", "warning");
      logActivity("Duress PIN entered • Decoy vault loaded", "warning");
      return;
    }

    const users = getUsers();

    // 2. Demo Dummy Account (PIN 1234 with empty phone, 1234, demo, or DEMO_PHONE)
    const isDemoLogin =
      pin === "1234" &&
      (!phone || phone === "1234" || phone === DEMO_PHONE || phone === "demo");

    if (isDemoLogin) {
      const demoData = users[DEMO_PHONE] || DEMO_ACCOUNT;
      setActivePhone(DEMO_PHONE);
      setActiveDocuments(demoData.documents);
      setActivity(demoData.activity);
      setGuardians(demoData.guardians);
      setProfile(demoData.profile || { displayName: "Arjun Ravi (Demo)", avatarData: null });
      setNominees(demoData.nominees || []);

      setIsDuressMode(false);
      setIsVaultLocked(false);
      setCurrentPage("overview");
      pushToast("Demo Vault unlocked (Evaluator Mode)", "success");
      logActivity("Demo dummy vault unlocked with PIN 1234", "success");
      return;
    }

    // 3. Normal User Account
    const user = users[phone];
    if (user && user.pin === pin) {
      setActivePhone(phone);
      setActiveDocuments(user.documents || []);
      setActivity(user.activity || []);
      setGuardians(user.guardians || []);
      setProfile(user.profile || { displayName: "", avatarData: null });
      setNominees(user.nominees || []);

      setIsDuressMode(false);
      setIsVaultLocked(false);
      setCurrentPage("overview");
      pushToast("ResilienceID Vault unlocked", "success");
      logActivity("Vault unlocked successfully", "success");
    } else {
      pushToast("Incorrect Phone Number or PIN. Please try again.", "warning");
    }
  }, [pushToast, logActivity]);

  const lockVault = useCallback(() => {
    setIsVaultLocked(true);
    setIsDuressMode(false);
    setActivePhone(null);
    setCurrentPage("landing");
    saveSession({
      activePhone: null,
      isVaultLocked: true,
      currentPage: "landing",
      isDuressMode: false,
    });
    pushToast("Vault locked securely", "warning");
    logActivity("Vault locked manually", "warning");
  }, [pushToast, logActivity]);

  const changePage = useCallback(
    (page: PageId) => {
      if (page === "landing") {
        lockVault();
      } else {
        setCurrentPage(page);
      }
    },
    [lockVault],
  );

  const toggleVaultLock = useCallback(() => {
    if (isVaultLocked) {
      unlockVault("", ""); // Handled by VaultLockedScreen UI mostly
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

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
    pushToast("Profile updated", "success");
    logActivity("Profile settings updated", "info");
  }, [pushToast, logActivity]);

  const addNominee = useCallback(
    (n: Omit<Nominee, "id">) => {
      const newNominee: Nominee = { ...n, id: `nom-${Date.now()}` };
      setNominees((prev) => [...prev, newNominee]);
      pushToast(`Nominee added: ${n.name}`, "success");
      logActivity(`Emergency nominee registered: ${n.name}`, "info");
    },
    [pushToast, logActivity],
  );

  const removeNominee = useCallback(
    (id: string) => {
      setNominees((prev) => prev.filter((n) => n.id !== id));
      pushToast("Nominee removed", "info");
    },
    [pushToast],
  );

  const changePin = useCallback(
    (oldPin: string, newPin: string): boolean => {
      if (!activePhone) return false;
      const users = getUsers();
      const user = users[activePhone];
      if (!user || user.pin !== oldPin) {
        pushToast("Incorrect current PIN", "warning");
        return false;
      }
      users[activePhone] = { ...user, pin: newPin };
      saveUsers(users);
      pushToast("PIN changed successfully", "success");
      logActivity("Vault PIN changed", "success");
      return true;
    },
    [activePhone, pushToast, logActivity],
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
      setCurrentPage: changePage,
      isMobileNavOpen,
      openMobileNav,
      closeMobileNav,
      uiMode,
      setUiMode,
      toggleUiMode,
      language,
      setLanguage,
      theme,
      setTheme,
      toggleTheme,
      t,
      isVaultLocked,
      isDuressMode,
      activePhone,
      createWallet,
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
      profile,
      updateProfile,
      nominees,
      addNominee,
      removeNominee,
      changePin,
    }),
    [
      currentPage,
      isMobileNavOpen,
      openMobileNav,
      closeMobileNav,
      uiMode,
      toggleUiMode,
      language,
      theme,
      toggleTheme,
      t,
      isVaultLocked,
      isDuressMode,
      activePhone,
      createWallet,
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
      profile,
      updateProfile,
      nominees,
      addNominee,
      removeNominee,
      changePin,
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
