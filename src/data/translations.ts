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
        nodeSynced: "Synced • Works with zero internet",
        title: "Camp Kiosk #4 • Wayanad Sector",
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
        title: "Camp Kiosk Node #4 • SIH-26125",
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
      appName: "റെസിലിയൻസ് ഐഡി",
      appSubtitle: "ദുരിതാശ്വാസ കാർഡ് വോൾട്ട്",
      nav: {
        landing: "ഹോം",
        overview: "അവലോകനം",
        documents: "എന്റെ ക്യാമ്പ് കാർഡുകൾ",
        recovery: "കുടുംബവും സഹായികളും",
        verifier: "റിലീഫ് കൗണ്ടർ സ്കാനർ",
        activity: "സമീപകാല വിവരങ്ങൾ",
        create_wallet: "Create Wallet",
      },
      header: {
        duressActive: "സുരക്ഷാ മോഡ് സജീവം",
        lockVault: "ലോക്ക് ചെയ്യുക",
        modeHuman: "ലളിതമായ രൂപം",
        modeAuditor: "സാങ്കേതിക രൂപം",
        exitVerifier: "തിരികെ വോൾട്ടിലേക്ക്",
        demoVerifier: "റിലീഫ് സ്കാനർ",
      },
      overview: {
        nodeSynced: "ഇന്റർനെറ്റ് ഇല്ലാതെ പ്രവർത്തിക്കുന്നു",
        title: "ക്യാമ്പ് കിയോസ്ക് #4 • വയനാട് മേഖല",
        desc: "ദുരിതാശ്വാസ ക്യാമ്പ് സഹായങ്ങൾ ലഭ്യമാണ്. നിങ്ങളുടെ വിവരങ്ങൾ നിങ്ങളുടെ ഫോണിൽ മാത്രം സുരക്ഷിതം.",
        issueBtn: "+ പുതിയ ക്യാമ്പ് കാർഡ് എടുക്കുക",
        metricVerified: "ഉറപ്പാക്കിയ കാർഡുകൾ",
        metricGuardians: "സഹായികൾ",
        metricOffline: "ഓഫ്‌ലൈൻ തയ്യാറാണ്",
        secCredentials: "നിങ്ങളുടെ തിരിച്ചറിയൽ കാർഡുകൾ",
        manageAll: "എല്ലാം കാണുക",
        recentActivity: "സമീപകാല പ്രവർത്തനങ്ങൾ",
        viewAll: "മുഴുവൻ ചരിത്രം",
      },
      actions: {
        issuePass: "പുതിയ കാർഡ്",
        aidVerifier: "റിലീഫ് സ്കാനർ",
        backupShards: "കുടുംബ ബാക്കപ്പ്",
        lockNow: "ലോക്ക് ചെയ്യുക",
      },
      common: {
        verified: "സ്ഥിരീകരിച്ചു",
        offlineBadge: "ഓഫ്‌ലൈൻ സജീവം",
        zkpProof: "സുരക്ഷിത QR കോഡ്",
        anchorInfo: "ഉറപ്പുവരുത്തിയ രേഖ",
        requestIssuance: "കാർഡ് അപേക്ഷിക്കുക",
        simulateApproval: "അനുമതി നൽകുക",
      },
    },
    auditor: {
      appName: "ResilienceID (മലയാളം)",
      appSubtitle: "W3C സെൽഫ്-സോവറിൻ ഐഡന്റിറ്റി",
      nav: {
        landing: "ഹോം",
        overview: "അവലോകനം",
        documents: "പരിശോധിക്കാവുന്ന ക്രെഡൻഷ്യലുകൾ",
        recovery: "ഷാമിർ ത്രെഷോൾഡ് റിക്കവറി",
        verifier: "ഓഫ്‌ലൈൻ ZK വെരിഫയർ",
        activity: "ക്രിപ്റ്റോഗ്രാഫിക് ഓഡിറ്റ് ലോഗ്",
        create_wallet: "Create Wallet",
      },
      header: {
        duressActive: "ഡ്യൂറസ് മോഡ് സജീവം",
        lockVault: "വോൾട്ട് ലോക്ക് ചെയ്യുക",
        modeHuman: "ലളിതമായ രൂപം",
        modeAuditor: "സാങ്കേതിക രൂപം",
        exitVerifier: "വെരിഫയർ അവസാനിപ്പിക്കുക",
        demoVerifier: "വെരിഫയർ സ്റ്റേഷൻ",
      },
      overview: {
        nodeSynced: "ഹൈപ്പർലെഡ്ജർ ലോക്കൽ കാഷെ സിങ്ക് ആയി",
        title: "ക്യാമ്പ് നോഡ് #4 • SIH-26125",
        desc: "W3C DID അടിസ്ഥാനമാക്കിയുള്ള സിസ്റ്റം. വ്യക്തിഗത വിവരങ്ങൾ ഒന്നും ബ്ലോക്ക്ചെയിനിൽ ശേഖരിക്കുന്നില്ല.",
        issueBtn: "+ VC ഇഷ്യൂ ചെയ്യുക",
        metricVerified: "സ്ഥിരീകരിച്ച ക്രെഡൻഷ്യലുകൾ",
        metricGuardians: "ക്വോറം അംഗങ്ങൾ",
        metricOffline: "ഓഫ്‌ലൈൻ കാഷെ",
        secCredentials: "ആങ്കർ ചെയ്ത ക്രെഡൻഷ്യലുകൾ",
        manageAll: "സ്കീമ ലിസ്റ്റ്",
        recentActivity: "ഓഡിറ്റ് ഇവന്റുകൾ",
        viewAll: "ലോഗ് പരിശോധിക്കുക",
      },
      actions: {
        issuePass: "VC ഇഷ്യൂ ചെയ്യുക",
        aidVerifier: "ZK വെരിഫയർ",
        backupShards: "കീ ഷാർഡ് ബാക്കപ്പ്",
        lockNow: "സെഷൻ ലോക്ക്",
      },
      common: {
        verified: "ആങ്കർ സാധുവാണ്",
        offlineBadge: "കാഷെ ചെയ്ത കീകൾ: 1,420",
        zkpProof: "സീറോ-നോളജ് പ്രൂഫ് (QR)",
        anchorInfo: "മെർക്കിൾ ആങ്കർ",
        requestIssuance: "ഇഷ്യൂ ചെയ്യുക",
        simulateApproval: "സിഗ്നേച്ചർ സ്ഥിരീകരിക്കുക",
      },
    },
  },
  hi: {
    human: {
      appName: "रेज़िलिएंस आईडी",
      appSubtitle: "आपदा राहत वॉलेट",
      nav: {
        landing: "होम",
        overview: "अवलोकन",
        documents: "मेरे राहत कार्ड",
        recovery: "अभिभावक और परिवार",
        verifier: "राहत वितरण काउंटर",
        activity: "हाल की गतिविधि",
        create_wallet: "Create Wallet",
      },
      header: {
        duressActive: "सुरक्षा शील्ड सक्रिय",
        lockVault: "वॉलेट लॉक करें",
        modeHuman: "सरल मोड",
        modeAuditor: "तकनीकी मोड",
        exitVerifier: "वॉलेट पर वापस जाएं",
        demoVerifier: "राहत स्कैनर",
      },
      overview: {
        nodeSynced: "बिना इंटरनेट के 100% काम करता है",
        title: "राहत शिविर कियोस्क #4",
        desc: "आपदा राहत कार्य सक्रिय। आपकी पहचान आपके उपकरण पर ही सुरक्षित है।",
        issueBtn: "+ नया राहत पास प्राप्त करें",
        metricVerified: "सक्रिय राहत पास",
        metricGuardians: "विश्वसनीय अभिभावक",
        metricOffline: "ऑफ़लाइन तैयार",
        secCredentials: "आपके पहचान और राहत पत्र",
        manageAll: "सभी देखें",
        recentActivity: "हाल का इतिहास",
        viewAll: "पूरा इतिहास",
      },
      actions: {
        issuePass: "राहत पास लें",
        aidVerifier: "राहत स्कैनर",
        backupShards: "पारिवारिक बैकअप",
        lockNow: "अभी लॉक करें",
      },
      common: {
        verified: "सत्यापित और सक्रिय",
        offlineBadge: "ऑफ़लाइन तैयार",
        zkpProof: "गोपनीयता शील्ड (QR)",
        anchorInfo: "सुरक्षित मुहर",
        requestIssuance: "पास के लिए अनुरोध",
        simulateApproval: "मंजूरी दें",
      },
    },
    auditor: {
      appName: "ResilienceID (हिंदी)",
      appSubtitle: "W3C सेल्फ-सॉवरेन पहचान",
      nav: {
        landing: "होम",
        overview: "अवलोकन",
        documents: "सत्यापनीय क्रेडेंशियल्स",
        recovery: "शमीर सोशल रिकवरी",
        verifier: "ऑफ़लाइन ZK सत्यापन टर्मिनल",
        activity: "ऑडिट इवेंट लॉग",
        create_wallet: "Create Wallet",
      },
      header: {
        duressActive: "ड्यूरेस मोड (नकली वॉलेट)",
        lockVault: "मास्टर वॉलेट लॉक करें",
        modeHuman: "सरल मोड",
        modeAuditor: "तकनीकी मोड",
        exitVerifier: "टर्मिनल से बाहर निकलें",
        demoVerifier: "सत्यापन स्टेशन",
      },
      overview: {
        nodeSynced: "हाइपरलेज़र नोड स्थानीय कैश में सिंक है",
        title: "शिविर कियोस्क नोड #4 • SIH-26125",
        desc: "W3C DID आधारित पहचान। ब्लॉकचेन पर कोई भी व्यक्तिगत डेटा संग्रहीत नहीं किया जाता।",
        issueBtn: "+ VC जारी और एंकर करें",
        metricVerified: "सत्यापित क्रेडेंशियल्स",
        metricGuardians: "कोरम नोड्स",
        metricOffline: "स्थानीय कैश स्थिति",
        secCredentials: "एंकर किए गए क्रेडेंशियल्स",
        manageAll: "स्कीमा रजिस्ट्री",
        recentActivity: "क्रिप्टोग्राफिक ऑडिट लॉग",
        viewAll: "लॉग देखें",
      },
      actions: {
        issuePass: "VC जारी करें",
        aidVerifier: "ZK सत्यापन टर्मिनल",
        backupShards: "कुंजी बैकअप",
        lockNow: "सत्र लॉक करें",
      },
      common: {
        verified: "एंकर मान्य",
        offlineBadge: "कैश की गई सार्वजनिक कुंजियाँ: 1,420",
        zkpProof: "ज़ीरो-नॉलेज प्रूफ (QR)",
        anchorInfo: "मर्कल एंकर",
        requestIssuance: "क्रेडेंशियल हस्ताक्षर",
        simulateApproval: "कोरम हस्ताक्षर करें",
      },
    },
  },
};

export function getTranslation(lang: Language = "en", mode: UiMode = "human"): TranslationDictionary {
  const langDict = translations[lang] || translations.en;
  return langDict[mode] || langDict.human;
}

