export type PageId = "landing" | "overview" | "documents" | "recovery" | "verifier" | "activity" | "create_wallet" | "profile";

export type UiMode = "human" | "auditor";
export type Language = "en" | "ml" | "hi";
export type ThemeMode = "dark" | "light";

export type DocumentType = 
  | "relief-registration" 
  | "health-record" 
  | "family-registry" 
  | "ration-card"
  | "national-id"
  | "other-certificate";

export type DocumentStatus = "verified" | "empty";

export interface OnChainAnchor {
  txHash: string;
  blockNumber: number;
  timestamp: string;
  schemaId: string;
  revocationStatus: "active" | "revoked";
}

export interface VaultDocument {
  id: string;
  type: DocumentType;
  title: string;
  subtitle: string;
  maskedNumber: string | null;
  status: DocumentStatus;
  updatedAt: string | null;
  claims?: Record<string, string>;
  anchor?: OnChainAnchor;
  fileData?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
}

export type GuardianStatus = "active" | "pending" | "unavailable";

export interface Guardian {
  id: string;
  name: string;
  role: string;
  status: GuardianStatus;
  phoneOrContact?: string;
}

export type ActivityStatus = "success" | "info" | "warning";

export interface ActivityEntry {
  id: string;
  action: string;
  device: string;
  timestamp: string;
  status: ActivityStatus;
}

export type ToastVariant = "success" | "info" | "warning";

export interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
}

export interface Nominee {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

export interface UserProfile {
  displayName: string;
  avatarData: string | null;
}

export interface ChatAction {
  label: string;
  targetPage?: PageId;
  modalToOpen?: "issue" | "proof" | "anchor";
  customHandler?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
  actions?: ChatAction[];
  isThinking?: boolean;
}

