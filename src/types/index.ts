export type PageId = "landing" | "overview" | "documents" | "recovery" | "verifier" | "activity" | "create_wallet";

export type UiMode = "human" | "auditor";
export type Language = "en" | "ml" | "hi";
export type ThemeMode = "dark" | "light";

export type DocumentType = 
  | "relief-registration" 
  | "health-record" 
  | "family-registry" 
  | "ration-card";

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
