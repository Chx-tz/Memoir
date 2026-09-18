import type { Language, UiMode, PageId } from "../types";

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  nav: Record<PageId, string>;
  header: {
    duressActive: string;
    lockVault: string;
    modeHuman: string;
    modeAuditor: string;
    exitVerifier: string;
    demoVerifier: string;
  };
  overview: {
    nodeSynced: string;
    title: string;
    desc: string;
    issueBtn: string;
    metricVerified: string;
    metricGuardians: string;
    metricOffline: string;
    secCredentials: string;
    manageAll: string;
    recentActivity: string;
    viewAll: string;
  };
  actions: {
    issuePass: string;
    aidVerifier: string;
    backupShards: string;
    lockNow: string;
  };
  auth: {
    createWalletTitle: string;
    createWalletDesc: string;
    phoneLabel: string;
    pinLabel: string;
    createBtn: string;
    backHome: string;
    lockedDescHuman: string;
    lockedDescAuditor: string;
    demoPinText: string;
  };
  common: {
    verified: string;
    offlineBadge: string;
    zkpProof: string;
    anchorInfo: string;
    requestIssuance: string;
    simulateApproval: string;
  };
}

export const translations: Record<Language, { human: TranslationDictionary; auditor: TranslationDictionary }> = {
  en: {
    human: {
      appName: "ResilienceID",
      appSubtitle: "Relief Pass Wallet",
      nav: {
        landing: "Home",
        overview: "Overview",
        documents: "My Passes & Cards",
        recovery: "Family & Guardians",
        verifier: "Aid Distribution Station",
        activity: "Recent Updates",
        create_wallet: "Create Wallet",
        profile: "Profile & Settings",
      },
      header: {
        duressActive: "Safety Shield Active",
        lockVault: "Lock Wallet",
        modeHuman: "Human Mode",
        modeAuditor: "Auditor Mode",
        exitVerifier: "Return to Wallet",
        demoVerifier: "Aid Station Scanner",
      },
      overview: {
        nodeSynced: "Synced â€¢ Works with zero internet",
        title: "Camp Kiosk #4 â€¢ Wayanad Sector",
        desc: "Relief camp operations active. Your identity belongs to you, not the platform.",
        issueBtn: "+ Get New Camp Pass",
        metricVerified: "Active Camp Passes",
        metricGuardians: "Trusted Guardians",
        metricOffline: "Offline Ready",
        secCredentials: "Your Camp Passes & Identity Cards",
        manageAll: "View All Cards",
        recentActivity: "Recent History",
        viewAll: "Full History",
      },
      actions: {
        issuePass: "Get Camp Pass",
        aidVerifier: "Aid Scanner",
        backupShards: "Family Backup",
        lockNow: "Lock Now",
      },
      auth: {
        createWalletTitle: "Create Wallet",
        createWalletDesc: "Enter your phone number and choose a 4-digit security PIN.",
        phoneLabel: "Phone Number",
        pinLabel: "4-Digit PIN",
        createBtn: "Create Secure Wallet",
        backHome: "Back to home",
        lockedDescHuman: "Enter your phone number and 4-digit security PIN",
        lockedDescAuditor: "Enter Phone and PIN to decrypt local enclave",
        demoPinText: "Demo PIN: 1234 (Normal) \u2022 9999 (Safety Decoy)",
      },
      common: {
        verified: "Verified & Active",
        offlineBadge: "100% Offline Ready",
        zkpProof: "Privacy Shield (QR)",
        anchorInfo: "Tamper Proof Seal",
        requestIssuance: "Request Pass",
        simulateApproval: "Approve for Family Member",
      },
    },
    auditor: {
      appName: "ResilienceID",
      appSubtitle: "W3C SSI Framework",
      nav: {
        landing: "Home",
        overview: "Overview",
        documents: "Verifiable Credentials",
        recovery: "Threshold Social Recovery",
        verifier: "Offline ZK Verifier Terminal",
        activity: "Cryptographic Tamper Log",
        create_wallet: "Create Wallet",
        profile: "Profile & Settings",
      },
      header: {
        duressActive: "Duress Mode (Decoy Vault)",
        lockVault: "Lock Master Vault",
        modeHuman: "Human Mode",
        modeAuditor: "Auditor Mode",
        exitVerifier: "Exit Verifier Terminal",
        demoVerifier: "Launch Verifier Station",
      },
      overview: {
        nodeSynced: "Hyperledger Node Synced (Local Besu Cache)",
        title: "Camp Kiosk Node #4 â€¢ SIH-26125",
        desc: "Decentralized Identifiers (W3C DID) anchored on permissioned ledger. Zero PII on-chain.",
        issueBtn: "+ Issue & Anchor VC",
        metricVerified: "Anchored Credentials",
        metricGuardians: "Shamir Quorum Nodes",
        metricOffline: "Ledger Cache Status",
        secCredentials: "Anchored Verifiable Credentials",
        manageAll: "Schema Registry",
        recentActivity: "Audit Event Trail",
        viewAll: "Inspect Log",
      },
      actions: {
        issuePass: "Sign & Anchor VC",
        aidVerifier: "ZK Verifier Terminal",
        backupShards: "Export Shard Backup",
        lockNow: "Revoke Session",
      },
      auth: {
        createWalletTitle: "Create Wallet",
        createWalletDesc: "Enter your phone number and choose a 4-digit security PIN.",
        phoneLabel: "Phone Number",
        pinLabel: "4-Digit PIN",
        createBtn: "Create Secure Wallet",
        backHome: "Back to home",
        lockedDescHuman: "Enter your phone number and 4-digit security PIN",
        lockedDescAuditor: "Enter Phone and PIN to decrypt local enclave",
        demoPinText: "SIH Evaluator: Genuine DID PIN 1234 \u2022 Duress (Decoy Vault) PIN 9999",
      },
      common: {
        verified: "Anchor Valid",
        offlineBadge: "Cached Public Keys: 1,420",
        zkpProof: "ZK Proof (QR)",
        anchorInfo: "Merkle Anchor",
        requestIssuance: "Sign Credential",
        simulateApproval: "Simulate Quorum Signer",
      },
    },
  },
  ml: {
    human: {
      appName: "à´±àµ†à´¸à´¿à´²à´¿à´¯àµ»à´¸àµ à´à´¡à´¿",
      appSubtitle: "à´¦àµà´°à´¿à´¤à´¾à´¶àµà´µà´¾à´¸ à´•à´¾àµ¼à´¡àµ à´µàµ‹àµ¾à´Ÿàµà´Ÿàµ",
      nav: {
        landing: "à´¹àµ‹à´‚",
        overview: "à´…à´µà´²àµ‹à´•à´¨à´‚",
        documents: "à´Žà´¨àµà´±àµ† à´•àµà´¯à´¾à´®àµà´ªàµ à´•à´¾àµ¼à´¡àµà´•àµ¾",
        recovery: "à´•àµà´Ÿàµà´‚à´¬à´µàµà´‚ à´¸à´¹à´¾à´¯à´¿à´•à´³àµà´‚",
        verifier: "à´±à´¿à´²àµ€à´«àµ à´•àµ—à´£àµà´Ÿàµ¼ à´¸àµà´•à´¾à´¨àµ¼",
        activity: "à´¸à´®àµ€à´ªà´•à´¾à´² à´µà´¿à´µà´°à´™àµà´™àµ¾",
        create_wallet: "à´µà´¾à´²à´±àµà´±àµ à´‰à´£àµà´Ÿà´¾à´•àµà´•àµà´•",
        profile: "Profile & Settings",
      },
      header: {
        duressActive: "à´¸àµà´°à´•àµà´·à´¾ à´®àµ‹à´¡àµ à´¸à´œàµ€à´µà´‚",
        lockVault: "à´²àµ‹à´•àµà´•àµ à´šàµ†à´¯àµà´¯àµà´•",
        modeHuman: "à´²à´³à´¿à´¤à´®à´¾à´¯ à´°àµ‚à´ªà´‚",
        modeAuditor: "à´¸à´¾à´™àµà´•àµ‡à´¤à´¿à´• à´°àµ‚à´ªà´‚",
        exitVerifier: "à´¤à´¿à´°à´¿à´•àµ† à´µàµ‹àµ¾à´Ÿàµà´Ÿà´¿à´²àµ‡à´•àµà´•àµ",
        demoVerifier: "à´±à´¿à´²àµ€à´«àµ à´¸àµà´•à´¾à´¨àµ¼",
      },
      overview: {
        nodeSynced: "à´‡à´¨àµà´±àµ¼à´¨àµ†à´±àµà´±àµ à´‡à´²àµà´²à´¾à´¤àµ† à´ªàµà´°à´µàµ¼à´¤àµà´¤à´¿à´•àµà´•àµà´¨àµà´¨àµ",
        title: "à´•àµà´¯à´¾à´®àµà´ªàµ à´•à´¿à´¯àµ‹à´¸àµà´•àµ #4 â€¢ à´µà´¯à´¨à´¾à´Ÿàµ à´®àµ‡à´–à´²",
        desc: "à´¦àµà´°à´¿à´¤à´¾à´¶àµà´µà´¾à´¸ à´•àµà´¯à´¾à´®àµà´ªàµ à´¸à´¹à´¾à´¯à´™àµà´™àµ¾ à´²à´­àµà´¯à´®à´¾à´£àµ. à´¨à´¿à´™àµà´™à´³àµà´Ÿàµ† à´µà´¿à´µà´°à´™àµà´™àµ¾ à´¨à´¿à´™àµà´™à´³àµà´Ÿàµ† à´«àµ‹à´£à´¿àµ½ à´®à´¾à´¤àµà´°à´‚ à´¸àµà´°à´•àµà´·à´¿à´¤à´‚.",
        issueBtn: "+ à´ªàµà´¤à´¿à´¯ à´•àµà´¯à´¾à´®àµà´ªàµ à´•à´¾àµ¼à´¡àµ à´Žà´Ÿàµà´•àµà´•àµà´•",
        metricVerified: "à´‰à´±à´ªàµà´ªà´¾à´•àµà´•à´¿à´¯ à´•à´¾àµ¼à´¡àµà´•àµ¾",
        metricGuardians: "à´¸à´¹à´¾à´¯à´¿à´•àµ¾",
        metricOffline: "à´“à´«àµâ€Œà´²àµˆàµ» à´¤à´¯àµà´¯à´¾à´±à´¾à´£àµ",
        secCredentials: "à´¨à´¿à´™àµà´™à´³àµà´Ÿàµ† à´¤à´¿à´°à´¿à´šàµà´šà´±à´¿à´¯àµ½ à´•à´¾àµ¼à´¡àµà´•àµ¾",
        manageAll: "à´Žà´²àµà´²à´¾à´‚ à´•à´¾à´£àµà´•",
        recentActivity: "à´¸à´®àµ€à´ªà´•à´¾à´² à´ªàµà´°à´µàµ¼à´¤àµà´¤à´¨à´™àµà´™àµ¾",
        viewAll: "à´®àµà´´àµà´µàµ» à´šà´°à´¿à´¤àµà´°à´‚",
      },
      actions: {
        issuePass: "à´ªàµà´¤à´¿à´¯ à´•à´¾àµ¼à´¡àµ",
        aidVerifier: "à´±à´¿à´²àµ€à´«àµ à´¸àµà´•à´¾à´¨àµ¼",
        backupShards: "à´•àµà´Ÿàµà´‚à´¬ à´¬à´¾à´•àµà´•à´ªàµà´ªàµ",
        lockNow: "à´²àµ‹à´•àµà´•àµ à´šàµ†à´¯àµà´¯àµà´•",
      },
      auth: {
        createWalletTitle: "à´µà´¾à´²à´±àµà´±àµ à´‰à´£àµà´Ÿà´¾à´•àµà´•àµà´•",
        createWalletDesc: "à´¨à´¿à´™àµà´™à´³àµà´Ÿàµ† à´«àµ‹àµº à´¨à´®àµà´ªà´±àµà´‚ 4 à´…à´•àµà´• à´¸àµà´°à´•àµà´·à´¾ à´ªà´¿àµ» à´¨àµ½à´•àµà´•.",
        phoneLabel: "à´«àµ‹àµº à´¨à´®àµà´ªàµ¼",
        pinLabel: "4 à´…à´•àµà´• à´ªà´¿àµ»",
        createBtn: "à´¸àµà´°à´•àµà´·à´¿à´¤ à´µà´¾à´²à´±àµà´±àµ à´‰à´£àµà´Ÿà´¾à´•àµà´•àµà´•",
        backHome: "à´¹àµ‹à´®à´¿à´²àµ‡à´•àµà´•àµ à´®à´Ÿà´™àµà´™àµà´•",
        lockedDescHuman: "à´¨à´¿à´™àµà´™à´³àµà´Ÿàµ† à´«àµ‹àµº à´¨à´®àµà´ªà´±àµà´‚ 4 à´…à´•àµà´• à´¸àµà´°à´•àµà´·à´¾ à´ªà´¿àµ» à´¨àµ½à´•àµà´•",
        lockedDescAuditor: "à´ªàµà´°à´¾à´¦àµ‡à´¶à´¿à´• à´Žàµ»à´•àµà´²àµ‡à´µàµ à´¡àµ€à´•àµà´°à´¿à´ªàµà´±àµà´±àµ à´šàµ†à´¯àµà´¯à´¾àµ» à´«àµ‹à´£àµà´‚ à´ªà´¿àµ» à´¨àµ½à´•àµà´•",
        demoPinText: "à´¡àµ†à´®àµ‹ à´ªà´¿àµ»: 1234 (à´¸à´¾à´§à´¾à´°à´£à´‚) \u2022 9999 (à´¸àµà´°à´•àµà´·à´¾ à´¡àµ†à´•àµà´•àµ‹à´¯àµ)",
      },
      common: {
        verified: "à´¸àµà´¥à´¿à´°àµ€à´•à´°à´¿à´šàµà´šàµ",
        offlineBadge: "à´“à´«àµâ€Œà´²àµˆàµ» à´¸à´œàµ€à´µà´‚",
        zkpProof: "à´¸àµà´°à´•àµà´·à´¿à´¤ QR à´•àµ‹à´¡àµ",
        anchorInfo: "à´‰à´±à´ªàµà´ªàµà´µà´°àµà´¤àµà´¤à´¿à´¯ à´°àµ‡à´–",
        requestIssuance: "à´•à´¾àµ¼à´¡àµ à´…à´ªàµ‡à´•àµà´·à´¿à´•àµà´•àµà´•",
        simulateApproval: "à´…à´¨àµà´®à´¤à´¿ à´¨àµ½à´•àµà´•",
      },
    },
    auditor: {
      appName: "ResilienceID (à´®à´²à´¯à´¾à´³à´‚)",
      appSubtitle: "W3C à´¸àµ†àµ½à´«àµ-à´¸àµ‹à´µà´±à´¿àµ» à´à´¡à´¨àµà´±à´¿à´±àµà´±à´¿",
      nav: {
        landing: "à´¹àµ‹à´‚",
        overview: "à´…à´µà´²àµ‹à´•à´¨à´‚",
        documents: "à´ªà´°à´¿à´¶àµ‹à´§à´¿à´•àµà´•à´¾à´µàµà´¨àµà´¨ à´•àµà´°àµ†à´¡àµ»à´·àµà´¯à´²àµà´•àµ¾",
        recovery: "à´·à´¾à´®à´¿àµ¼ à´¤àµà´°àµ†à´·àµ‹àµ¾à´¡àµ à´±à´¿à´•àµà´•à´µà´±à´¿",
        verifier: "à´“à´«àµâ€Œà´²àµˆàµ» ZK à´µàµ†à´°à´¿à´«à´¯àµ¼",
        activity: "à´•àµà´°à´¿à´ªàµà´±àµà´±àµ‹à´—àµà´°à´¾à´«à´¿à´•àµ à´“à´¡à´¿à´±àµà´±àµ à´²àµ‹à´—àµ",
        create_wallet: "à´µà´¾à´²à´±àµà´±àµ à´‰à´£àµà´Ÿà´¾à´•àµà´•àµà´•",
        profile: "Profile & Settings",
      },
      header: {
        duressActive: "à´¡àµà´¯àµ‚à´±à´¸àµ à´®àµ‹à´¡àµ à´¸à´œàµ€à´µà´‚",
        lockVault: "à´µàµ‹àµ¾à´Ÿàµà´Ÿàµ à´²àµ‹à´•àµà´•àµ à´šàµ†à´¯àµà´¯àµà´•",
        modeHuman: "à´²à´³à´¿à´¤à´®à´¾à´¯ à´°àµ‚à´ªà´‚",
        modeAuditor: "à´¸à´¾à´™àµà´•àµ‡à´¤à´¿à´• à´°àµ‚à´ªà´‚",
        exitVerifier: "à´µàµ†à´°à´¿à´«à´¯àµ¼ à´…à´µà´¸à´¾à´¨à´¿à´ªàµà´ªà´¿à´•àµà´•àµà´•",
        demoVerifier: "à´µàµ†à´°à´¿à´«à´¯àµ¼ à´¸àµà´±àµà´±àµ‡à´·àµ»",
      },
      overview: {
        nodeSynced: "à´¹àµˆà´ªàµà´ªàµ¼à´²àµ†à´¡àµà´œàµ¼ à´²àµ‹à´•àµà´•àµ½ à´•à´¾à´·àµ† à´¸à´¿à´™àµà´•àµ à´†à´¯à´¿",
        title: "à´•àµà´¯à´¾à´®àµà´ªàµ à´¨àµ‹à´¡àµ #4 â€¢ SIH-26125",
        desc: "W3C DID à´…à´Ÿà´¿à´¸àµà´¥à´¾à´¨à´®à´¾à´•àµà´•à´¿à´¯àµà´³àµà´³ à´¸à´¿à´¸àµà´±àµà´±à´‚. à´µàµà´¯à´•àµà´¤à´¿à´—à´¤ à´µà´¿à´µà´°à´™àµà´™àµ¾ à´’à´¨àµà´¨àµà´‚ à´¬àµà´²àµ‹à´•àµà´•àµà´šàµ†à´¯à´¿à´¨à´¿àµ½ à´¶àµ‡à´–à´°à´¿à´•àµà´•àµà´¨àµà´¨à´¿à´²àµà´².",
        issueBtn: "+ VC à´‡à´·àµà´¯àµ‚ à´šàµ†à´¯àµà´¯àµà´•",
        metricVerified: "à´¸àµà´¥à´¿à´°àµ€à´•à´°à´¿à´šàµà´š à´•àµà´°àµ†à´¡àµ»à´·àµà´¯à´²àµà´•àµ¾",
        metricGuardians: "à´•àµà´µàµ‹à´±à´‚ à´…à´‚à´—à´™àµà´™àµ¾",
        metricOffline: "à´“à´«àµâ€Œà´²àµˆàµ» à´•à´¾à´·àµ†",
        secCredentials: "à´†à´™àµà´•àµ¼ à´šàµ†à´¯àµà´¤ à´•àµà´°àµ†à´¡àµ»à´·àµà´¯à´²àµà´•àµ¾",
        manageAll: "à´¸àµà´•àµ€à´® à´²à´¿à´¸àµà´±àµà´±àµ",
        recentActivity: "à´“à´¡à´¿à´±àµà´±àµ à´‡à´µà´¨àµà´±àµà´•àµ¾",
        viewAll: "à´²àµ‹à´—àµ à´ªà´°à´¿à´¶àµ‹à´§à´¿à´•àµà´•àµà´•",
      },
      actions: {
        issuePass: "VC à´‡à´·àµà´¯àµ‚ à´šàµ†à´¯àµà´¯àµà´•",
        aidVerifier: "ZK à´µàµ†à´°à´¿à´«à´¯àµ¼",
        backupShards: "à´•àµ€ à´·à´¾àµ¼à´¡àµ à´¬à´¾à´•àµà´•à´ªàµà´ªàµ",
        lockNow: "à´¸àµ†à´·àµ» à´²àµ‹à´•àµà´•àµ",
      },
      auth: {
        createWalletTitle: "à´µà´¾à´²à´±àµà´±àµ à´‰à´£àµà´Ÿà´¾à´•àµà´•àµà´•",
        createWalletDesc: "à´¨à´¿à´™àµà´™à´³àµà´Ÿàµ† à´«àµ‹àµº à´¨à´®àµà´ªà´±àµà´‚ 4 à´…à´•àµà´• à´¸àµà´°à´•àµà´·à´¾ à´ªà´¿àµ» à´¨àµ½à´•àµà´•.",
        phoneLabel: "à´«àµ‹àµº à´¨à´®àµà´ªàµ¼",
        pinLabel: "4 à´…à´•àµà´• à´ªà´¿àµ»",
        createBtn: "à´¸àµà´°à´•àµà´·à´¿à´¤ à´µà´¾à´²à´±àµà´±àµ à´‰à´£àµà´Ÿà´¾à´•àµà´•àµà´•",
        backHome: "à´¹àµ‹à´®à´¿à´²àµ‡à´•àµà´•àµ à´®à´Ÿà´™àµà´™àµà´•",
        lockedDescHuman: "à´¨à´¿à´™àµà´™à´³àµà´Ÿàµ† à´«àµ‹àµº à´¨à´®àµà´ªà´±àµà´‚ 4 à´…à´•àµà´• à´¸àµà´°à´•àµà´·à´¾ à´ªà´¿àµ» à´¨àµ½à´•àµà´•",
        lockedDescAuditor: "à´ªàµà´°à´¾à´¦àµ‡à´¶à´¿à´• à´Žàµ»à´•àµà´²àµ‡à´µàµ à´¡àµ€à´•àµà´°à´¿à´ªàµà´±àµà´±àµ à´šàµ†à´¯àµà´¯à´¾àµ» à´«àµ‹à´£àµà´‚ à´ªà´¿àµ» à´¨àµ½à´•àµà´•",
        demoPinText: "SIH Evaluator: Genuine DID PIN 1234 \u2022 Duress (Decoy Vault) PIN 9999",
      },
      common: {
        verified: "à´†à´™àµà´•àµ¼ à´¸à´¾à´§àµà´µà´¾à´£àµ",
        offlineBadge: "à´•à´¾à´·àµ† à´šàµ†à´¯àµà´¤ à´•àµ€à´•àµ¾: 1,420",
        zkpProof: "à´¸àµ€à´±àµ‹-à´¨àµ‹à´³à´œàµ à´ªàµà´°àµ‚à´«àµ (QR)",
        anchorInfo: "à´®àµ†àµ¼à´•àµà´•à´¿àµ¾ à´†à´™àµà´•àµ¼",
        requestIssuance: "à´‡à´·àµà´¯àµ‚ à´šàµ†à´¯àµà´¯àµà´•",
        simulateApproval: "à´¸à´¿à´—àµà´¨àµ‡à´šàµà´šàµ¼ à´¸àµà´¥à´¿à´°àµ€à´•à´°à´¿à´•àµà´•àµà´•",
      },
    },
  },
  hi: {
    human: {
      appName: "à¤°à¥‡à¤œà¤¼à¤¿à¤²à¤¿à¤à¤‚à¤¸ à¤†à¤ˆà¤¡à¥€",
      appSubtitle: "à¤†à¤ªà¤¦à¤¾ à¤°à¤¾à¤¹à¤¤ à¤µà¥‰à¤²à¥‡à¤Ÿ",
      nav: {
        landing: "à¤¹à¥‹à¤®",
        overview: "à¤…à¤µà¤²à¥‹à¤•à¤¨",
        documents: "à¤®à¥‡à¤°à¥‡ à¤°à¤¾à¤¹à¤¤ à¤•à¤¾à¤°à¥à¤¡",
        recovery: "à¤…à¤­à¤¿à¤­à¤¾à¤µà¤• à¤”à¤° à¤ªà¤°à¤¿à¤µà¤¾à¤°",
        verifier: "à¤°à¤¾à¤¹à¤¤ à¤µà¤¿à¤¤à¤°à¤£ à¤•à¤¾à¤‰à¤‚à¤Ÿà¤°",
        activity: "à¤¹à¤¾à¤² à¤•à¥€ à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿",
        create_wallet: "à¤µà¥‰à¤²à¥‡à¤Ÿ à¤¬à¤¨à¤¾à¤à¤‚",
        profile: "Profile & Settings",
      },
      header: {
        duressActive: "à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤¶à¥€à¤²à¥à¤¡ à¤¸à¤•à¥à¤°à¤¿à¤¯",
        lockVault: "à¤µà¥‰à¤²à¥‡à¤Ÿ à¤²à¥‰à¤• à¤•à¤°à¥‡à¤‚",
        modeHuman: "à¤¸à¤°à¤² à¤®à¥‹à¤¡",
        modeAuditor: "à¤¤à¤•à¤¨à¥€à¤•à¥€ à¤®à¥‹à¤¡",
        exitVerifier: "à¤µà¥‰à¤²à¥‡à¤Ÿ à¤ªà¤° à¤µà¤¾à¤ªà¤¸ à¤œà¤¾à¤à¤‚",
        demoVerifier: "à¤°à¤¾à¤¹à¤¤ à¤¸à¥à¤•à¥ˆà¤¨à¤°",
      },
      overview: {
        nodeSynced: "à¤¬à¤¿à¤¨à¤¾ à¤‡à¤‚à¤Ÿà¤°à¤¨à¥‡à¤Ÿ à¤•à¥‡ 100% à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ",
        title: "à¤°à¤¾à¤¹à¤¤ à¤¶à¤¿à¤µà¤¿à¤° à¤•à¤¿à¤¯à¥‹à¤¸à¥à¤• #4",
        desc: "à¤†à¤ªà¤¦à¤¾ à¤°à¤¾à¤¹à¤¤ à¤•à¤¾à¤°à¥à¤¯ à¤¸à¤•à¥à¤°à¤¿à¤¯à¥¤ à¤†à¤ªà¤•à¥€ à¤ªà¤¹à¤šà¤¾à¤¨ à¤†à¤ªà¤•à¥‡ à¤‰à¤ªà¤•à¤°à¤£ à¤ªà¤° à¤¹à¥€ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤¹à¥ˆà¥¤",
        issueBtn: "+ à¤¨à¤¯à¤¾ à¤°à¤¾à¤¹à¤¤ à¤ªà¤¾à¤¸ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤•à¤°à¥‡à¤‚",
        metricVerified: "à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤°à¤¾à¤¹à¤¤ à¤ªà¤¾à¤¸",
        metricGuardians: "à¤µà¤¿à¤¶à¥à¤µà¤¸à¤¨à¥€à¤¯ à¤…à¤­à¤¿à¤­à¤¾à¤µà¤•",
        metricOffline: "à¤‘à¤«à¤¼à¤²à¤¾à¤‡à¤¨ à¤¤à¥ˆà¤¯à¤¾à¤°",
        secCredentials: "à¤†à¤ªà¤•à¥‡ à¤ªà¤¹à¤šà¤¾à¤¨ à¤”à¤° à¤°à¤¾à¤¹à¤¤ à¤ªà¤¤à¥à¤°",
        manageAll: "à¤¸à¤­à¥€ à¤¦à¥‡à¤–à¥‡à¤‚",
        recentActivity: "à¤¹à¤¾à¤² à¤•à¤¾ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸",
        viewAll: "à¤ªà¥‚à¤°à¤¾ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸",
      },
      actions: {
        issuePass: "à¤°à¤¾à¤¹à¤¤ à¤ªà¤¾à¤¸ à¤²à¥‡à¤‚",
        aidVerifier: "à¤°à¤¾à¤¹à¤¤ à¤¸à¥à¤•à¥ˆà¤¨à¤°",
        backupShards: "à¤ªà¤¾à¤°à¤¿à¤µà¤¾à¤°à¤¿à¤• à¤¬à¥ˆà¤•à¤…à¤ª",
        lockNow: "à¤…à¤­à¥€ à¤²à¥‰à¤• à¤•à¤°à¥‡à¤‚",
      },
      auth: {
        createWalletTitle: "à¤µà¥‰à¤²à¥‡à¤Ÿ à¤¬à¤¨à¤¾à¤à¤‚",
        createWalletDesc: "à¤…à¤ªà¤¨à¤¾ à¤«à¥‹à¤¨ à¤¨à¤‚à¤¬à¤° à¤”à¤° 4 à¤…à¤‚à¤•à¥‹à¤‚ à¤•à¤¾ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤ªà¤¿à¤¨ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚à¥¤",
        phoneLabel: "à¤«à¥‹à¤¨ à¤¨à¤‚à¤¬à¤°",
        pinLabel: "4 à¤…à¤‚à¤•à¥‹à¤‚ à¤•à¤¾ à¤ªà¤¿à¤¨",
        createBtn: "à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤µà¥‰à¤²à¥‡à¤Ÿ à¤¬à¤¨à¤¾à¤à¤‚",
        backHome: "à¤¹à¥‹à¤® à¤ªà¤° à¤µà¤¾à¤ªà¤¸ à¤œà¤¾à¤à¤‚",
        lockedDescHuman: "à¤…à¤ªà¤¨à¤¾ à¤«à¥‹à¤¨ à¤¨à¤‚à¤¬à¤° à¤”à¤° 4 à¤…à¤‚à¤•à¥‹à¤‚ à¤•à¤¾ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤ªà¤¿à¤¨ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚",
        lockedDescAuditor: "à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯ à¤à¤¨à¥à¤•à¥à¤²à¥‡à¤µ à¤•à¥‹ à¤¡à¤¿à¤•à¥à¤°à¤¿à¤ªà¥à¤Ÿ à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤«à¥‹à¤¨ à¤”à¤° à¤ªà¤¿à¤¨ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚",
        demoPinText: "à¤¡à¥‡à¤®à¥‹ à¤ªà¤¿à¤¨: 1234 (à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯) \u2022 9999 (à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤¡à¤¿à¤•à¥‰à¤¯)",
      },
      common: {
        verified: "à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤”à¤° à¤¸à¤•à¥à¤°à¤¿à¤¯",
        offlineBadge: "à¤‘à¤«à¤¼à¤²à¤¾à¤‡à¤¨ à¤¤à¥ˆà¤¯à¤¾à¤°",
        zkpProof: "à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾ à¤¶à¥€à¤²à¥à¤¡ (QR)",
        anchorInfo: "à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤®à¥à¤¹à¤°",
        requestIssuance: "à¤ªà¤¾à¤¸ à¤•à¥‡ à¤²à¤¿à¤ à¤…à¤¨à¥à¤°à¥‹à¤§",
        simulateApproval: "à¤®à¤‚à¤œà¥‚à¤°à¥€ à¤¦à¥‡à¤‚",
      },
    },
    auditor: {
      appName: "ResilienceID (à¤¹à¤¿à¤‚à¤¦à¥€)",
      appSubtitle: "W3C à¤¸à¥‡à¤²à¥à¤«-à¤¸à¥‰à¤µà¤°à¥‡à¤¨ à¤ªà¤¹à¤šà¤¾à¤¨",
      nav: {
        landing: "à¤¹à¥‹à¤®",
        overview: "à¤…à¤µà¤²à¥‹à¤•à¤¨",
        documents: "à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨à¥€à¤¯ à¤•à¥à¤°à¥‡à¤¡à¥‡à¤‚à¤¶à¤¿à¤¯à¤²à¥à¤¸",
        recovery: "à¤¶à¤®à¥€à¤° à¤¸à¥‹à¤¶à¤² à¤°à¤¿à¤•à¤µà¤°à¥€",
        verifier: "à¤‘à¤«à¤¼à¤²à¤¾à¤‡à¤¨ ZK à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨ à¤Ÿà¤°à¥à¤®à¤¿à¤¨à¤²",
        activity: "à¤‘à¤¡à¤¿à¤Ÿ à¤‡à¤µà¥‡à¤‚à¤Ÿ à¤²à¥‰à¤—",
        create_wallet: "à¤µà¥‰à¤²à¥‡à¤Ÿ à¤¬à¤¨à¤¾à¤à¤‚",
        profile: "Profile & Settings",
      },
      header: {
        duressActive: "à¤¡à¥à¤¯à¥‚à¤°à¥‡à¤¸ à¤®à¥‹à¤¡ (à¤¨à¤•à¤²à¥€ à¤µà¥‰à¤²à¥‡à¤Ÿ)",
        lockVault: "à¤®à¤¾à¤¸à¥à¤Ÿà¤° à¤µà¥‰à¤²à¥‡à¤Ÿ à¤²à¥‰à¤• à¤•à¤°à¥‡à¤‚",
        modeHuman: "à¤¸à¤°à¤² à¤®à¥‹à¤¡",
        modeAuditor: "à¤¤à¤•à¤¨à¥€à¤•à¥€ à¤®à¥‹à¤¡",
        exitVerifier: "à¤Ÿà¤°à¥à¤®à¤¿à¤¨à¤² à¤¸à¥‡ à¤¬à¤¾à¤¹à¤° à¤¨à¤¿à¤•à¤²à¥‡à¤‚",
        demoVerifier: "à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨ à¤¸à¥à¤Ÿà¥‡à¤¶à¤¨",
      },
      overview: {
        nodeSynced: "à¤¹à¤¾à¤‡à¤ªà¤°à¤²à¥‡à¤œà¤¼à¤° à¤¨à¥‹à¤¡ à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯ à¤•à¥ˆà¤¶ à¤®à¥‡à¤‚ à¤¸à¤¿à¤‚à¤• à¤¹à¥ˆ",
        title: "à¤¶à¤¿à¤µà¤¿à¤° à¤•à¤¿à¤¯à¥‹à¤¸à¥à¤• à¤¨à¥‹à¤¡ #4 â€¢ SIH-26125",
        desc: "W3C DID à¤†à¤§à¤¾à¤°à¤¿à¤¤ à¤ªà¤¹à¤šà¤¾à¤¨à¥¤ à¤¬à¥à¤²à¥‰à¤•à¤šà¥‡à¤¨ à¤ªà¤° à¤•à¥‹à¤ˆ à¤­à¥€ à¤µà¥à¤¯à¤•à¥à¤¤à¤¿à¤—à¤¤ à¤¡à¥‡à¤Ÿà¤¾ à¤¸à¤‚à¤—à¥à¤°à¤¹à¥€à¤¤ à¤¨à¤¹à¥€à¤‚ à¤•à¤¿à¤¯à¤¾ à¤œà¤¾à¤¤à¤¾à¥¤",
        issueBtn: "+ VC à¤œà¤¾à¤°à¥€ à¤”à¤° à¤à¤‚à¤•à¤° à¤•à¤°à¥‡à¤‚",
        metricVerified: "à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤•à¥à¤°à¥‡à¤¡à¥‡à¤‚à¤¶à¤¿à¤¯à¤²à¥à¤¸",
        metricGuardians: "à¤•à¥‹à¤°à¤® à¤¨à¥‹à¤¡à¥à¤¸",
        metricOffline: "à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯ à¤•à¥ˆà¤¶ à¤¸à¥à¤¥à¤¿à¤¤à¤¿",
        secCredentials: "à¤à¤‚à¤•à¤° à¤•à¤¿à¤ à¤—à¤ à¤•à¥à¤°à¥‡à¤¡à¥‡à¤‚à¤¶à¤¿à¤¯à¤²à¥à¤¸",
        manageAll: "à¤¸à¥à¤•à¥€à¤®à¤¾ à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€",
        recentActivity: "à¤•à¥à¤°à¤¿à¤ªà¥à¤Ÿà¥‹à¤—à¥à¤°à¤¾à¤«à¤¿à¤• à¤‘à¤¡à¤¿à¤Ÿ à¤²à¥‰à¤—",
        viewAll: "à¤²à¥‰à¤— à¤¦à¥‡à¤–à¥‡à¤‚",
      },
      actions: {
        issuePass: "VC à¤œà¤¾à¤°à¥€ à¤•à¤°à¥‡à¤‚",
        aidVerifier: "ZK à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨ à¤Ÿà¤°à¥à¤®à¤¿à¤¨à¤²",
        backupShards: "à¤•à¥à¤‚à¤œà¥€ à¤¬à¥ˆà¤•à¤…à¤ª",
        lockNow: "à¤¸à¤¤à¥à¤° à¤²à¥‰à¤• à¤•à¤°à¥‡à¤‚",
      },
      auth: {
        createWalletTitle: "à¤µà¥‰à¤²à¥‡à¤Ÿ à¤¬à¤¨à¤¾à¤à¤‚",
        createWalletDesc: "à¤…à¤ªà¤¨à¤¾ à¤«à¥‹à¤¨ à¤¨à¤‚à¤¬à¤° à¤”à¤° 4 à¤…à¤‚à¤•à¥‹à¤‚ à¤•à¤¾ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤ªà¤¿à¤¨ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚à¥¤",
        phoneLabel: "à¤«à¥‹à¤¨ à¤¨à¤‚à¤¬à¤°",
        pinLabel: "4 à¤…à¤‚à¤•à¥‹à¤‚ à¤•à¤¾ à¤ªà¤¿à¤¨",
        createBtn: "à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤µà¥‰à¤²à¥‡à¤Ÿ à¤¬à¤¨à¤¾à¤à¤‚",
        backHome: "à¤¹à¥‹à¤® à¤ªà¤° à¤µà¤¾à¤ªà¤¸ à¤œà¤¾à¤à¤‚",
        lockedDescHuman: "à¤…à¤ªà¤¨à¤¾ à¤«à¥‹à¤¨ à¤¨à¤‚à¤¬à¤° à¤”à¤° 4 à¤…à¤‚à¤•à¥‹à¤‚ à¤•à¤¾ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤ªà¤¿à¤¨ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚",
        lockedDescAuditor: "à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯ à¤à¤¨à¥à¤•à¥à¤²à¥‡à¤µ à¤•à¥‹ à¤¡à¤¿à¤•à¥à¤°à¤¿à¤ªà¥à¤Ÿ à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤«à¥‹à¤¨ à¤”à¤° à¤ªà¤¿à¤¨ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚",
        demoPinText: "SIH Evaluator: Genuine DID PIN 1234 \u2022 Duress (Decoy Vault) PIN 9999",
      },
      common: {
        verified: "à¤à¤‚à¤•à¤° à¤®à¤¾à¤¨à¥à¤¯",
        offlineBadge: "à¤•à¥ˆà¤¶ à¤•à¥€ à¤—à¤ˆ à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤•à¥à¤‚à¤œà¤¿à¤¯à¤¾à¤: 1,420",
        zkpProof: "à¤œà¤¼à¥€à¤°à¥‹-à¤¨à¥‰à¤²à¥‡à¤œ à¤ªà¥à¤°à¥‚à¤« (QR)",
        anchorInfo: "à¤®à¤°à¥à¤•à¤² à¤à¤‚à¤•à¤°",
        requestIssuance: "à¤•à¥à¤°à¥‡à¤¡à¥‡à¤‚à¤¶à¤¿à¤¯à¤² à¤¹à¤¸à¥à¤¤à¤¾à¤•à¥à¤·à¤°",
        simulateApproval: "à¤•à¥‹à¤°à¤® à¤¹à¤¸à¥à¤¤à¤¾à¤•à¥à¤·à¤° à¤•à¤°à¥‡à¤‚",
      },
    },
  },
};

export function getTranslation(lang: Language = "en", mode: UiMode = "human"): TranslationDictionary {
  const langDict = translations[lang] || translations.en;
  return langDict[mode] || langDict.human;
}

