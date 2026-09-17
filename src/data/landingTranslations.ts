import type { Language } from "../types";

export interface LandingTranslation {
  tagline: string;
  nav: {
    capabilities: string;
    howItWorks: string;
    protocolFlow: string;
    architecture: string;
    about: string;
    accessWallet: string;
    createWallet: string;
  };
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    teamCredit: string;
    every: string;
    rotatingWords: string[];
    subtitle: string;
    createBtn: string;
    accessBtn: string;
    stats0Pii: string;
    statsOffline: string;
    statsShamir: string;
  };
  stats: {
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    stat4Label: string;
  };
  capabilities: {
    eyebrow: string;
    title1: string;
    title2: string;
    desc: string;
    cards: {
      title: string;
      desc: string;
    }[];
  };
  pipeline: {
    eyebrow: string;
    title: string;
    steps: string[];
    details: {
      step: string;
      title: string;
      desc: string;
    }[];
  };
  architecture: {
    eyebrow: string;
    title: string;
    status: string;
    problemTitle: string;
    problemDesc: string;
    solutionTitle: string;
    solutionDesc: string;
  };
  about: {
    team: string;
    role: string;
    hackathon: string;
    desc: string;
  };
  cta: {
    title1: string;
    title2: string;
    desc: string;
    createBtn: string;
    accessBtn: string;
  };
  footer: {
    backToTop: string;
    builtBy: string;
    subtext: string;
  };
}

export const landingTranslations: Record<Language, LandingTranslation> = {
  en: {
    tagline: "Self-Sovereign Digital Identity",
    nav: {
      capabilities: "Capabilities",
      howItWorks: "How it works",
      protocolFlow: "Protocol Flow",
      architecture: "Architecture",
      about: "About",
      accessWallet: "Access Wallet",
      createWallet: "Create a Wallet",
    },
    hero: {
      badge: "Self-Sovereign Identity · Offline Verifiable · W3C Standard",
      headline1: "The fastest path to",
      headline2: "trusted identity for",
      teamCredit: "built by Team Serverless Syndicate · SIH Hackathon Project #26125",
      every: "every",
      rotatingWords: [
        "refugee family.",
        "ration allotment.",
        "offline checkpoint.",
        "medical triage record.",
        "displaced survivor.",
      ],
      subtitle:
        "A decentralized, privacy-preserving digital identity vault purpose-built for displaced populations, disaster relief, and refugee camps. Verifiable 100% offline via Zero-Knowledge Proofs, anchored on Hyperledger Besu, and restorable through community guardians without central authority risk.",
      createBtn: "Create a Wallet",
      accessBtn: "Access Wallet",
      stats0Pii: "0 PII on-chain",
      statsOffline: "Works 100% offline",
      statsShamir: "2-of-3 Shamir recovery",
    },
    stats: {
      stat1Label: "Offline Verifiable Claims",
      stat2Label: "Shamir Threshold Recovery",
      stat3Label: "Public Ledger Exposure",
      stat4Label: "Verifiable Credential Spec",
    },
    capabilities: {
      eyebrow: "Capabilities",
      title1: "Everything evidence-based,",
      title2: "zero surveillance.",
      desc: "Every identity pass is encrypted in a device enclave. Cryptographic signatures confirm validity without exposing biometric records or national ID databases to unauthorized parties.",
      cards: [
        {
          title: "Decentralized DID Root",
          desc: "Generated locally on device using elliptic curve keys (did:ethr). No government registry or platform can freeze or revoke baseline existence.",
        },
        {
          title: "100% Offline Verifier",
          desc: "Field relief officers scan optical QR or NFC tokens with zero internet. Signatures evaluate against locally cached issuer public keys.",
        },
        {
          title: "Zero-Knowledge Proofs",
          desc: "Prove qualifications (e.g. Adult status or Camp Sector membership) while keeping raw dates of birth, photos, and biometric signatures redacted.",
        },
        {
          title: "Shamir Social Recovery",
          desc: "Lost phone during flood evacuation? 2 of 3 trusted community guardians combine encrypted secret shards to reconstruct your master wallet on any device.",
        },
        {
          title: "On-Chain Anchoring",
          desc: "Relief authorities anchor cryptographic state roots on Hyperledger Besu. Provides immutable audit integrity without leaking personal data.",
        },
        {
          title: "Duress Mode (Decoy Vault)",
          desc: "Under physical threat or hostile checkpoint scrutiny, entering safety PIN 9999 displays an authentic-looking decoy vault.",
        },
      ],
    },
    pipeline: {
      eyebrow: "Pipeline",
      title: "From enrollment to relief distribution in seconds.",
      steps: ["1. Local DID", "2. Issue & Anchor", "3. ZK Proof Pass", "4. Offline Scan", "5. Aid Granted"],
      details: [
        {
          step: "01",
          title: "Enroll in Safe Enclave",
          desc: "The user registers without disclosing private data. Key pairs are stored inside on-device hardware security modules.",
        },
        {
          step: "02",
          title: "Camp Authority Signs",
          desc: "Relief kiosk signs the ration quota and family link, anchoring state hash on-chain while handing the user decrypted credentials.",
        },
        {
          step: "03",
          title: "Generate ZK Proof",
          desc: "The user presents a dynamic QR proof at distribution checkpoints. Only the needed claims (age, entitlement tier) are revealed.",
        },
        {
          step: "04",
          title: "Offline Aid Granted",
          desc: "Field terminal validates signatures against local cached keys and dispenses rations instantly with 0 ms server delay.",
        },
      ],
    },
    architecture: {
      eyebrow: "Hackathon Scope & Architecture",
      title: "Smart India Hackathon #26125 Overview",
      status: "Status: Field Demo Ready",
      problemTitle: "Problem Addressed:",
      problemDesc:
        "During severe climate floods, earthquakes, and forced population displacements, survivors lose physical Aadhaar/voter cards and ration booklets. Centralized state databases fail completely when cellular towers collapse, creating catastrophic relief distribution bottlenecks or dangerous biometric surveillance vulnerabilities.",
      solutionTitle: "ResilienceID Technological Resolution:",
      solutionDesc:
        "ResilienceID decouples identity verification from connectivity. Using asymmetric cryptography, Zero-Knowledge proofs, and permissioned Hyperledger Besu state roots, displaced families retain verifiable identity rights and ration guarantees entirely offline with zero risk of identity weaponization.",
    },
    about: {
      team: "Team Serverless Syndicate",
      role: "Lead Architect",
      hackathon: "SIH Hackathon 2024 · Problem Statement #26125",
      desc: "This solution was designed to ensure that displaced persons, refugees, and disaster survivors never lose their fundamental legal rights or humanitarian entitlements due to lost paper documents or disrupted telecommunications networks. Every module — from on-chain merkle anchors to offline threshold key recovery — is implemented with zero-trust cryptography to guarantee human dignity and privacy.",
    },
    cta: {
      title1: "Empower displaced survivors with",
      title2: "self-sovereign dignity.",
      desc: "Experience the live field-tested prototype on this device.",
      createBtn: "Create a Wallet",
      accessBtn: "Access Wallet",
    },
    footer: {
      backToTop: "Back to top",
      builtBy: "Built by Team Serverless Syndicate · ResilienceID · SIH #26125",
      subtext: "Self-Sovereign Digital Identity for Displaced Populations · Smart India Hackathon",
    },
  },
  ml: {
    tagline: "സ്വയം പരമാധികാര ഡിജിറ്റൽ ഐഡന്റിറ്റി",
    nav: {
      capabilities: "സവിശേഷതകൾ",
      howItWorks: "പ്രവർത്തനരീതി",
      protocolFlow: "പ്രോട്ടോക്കോൾ ഫ്ലോ",
      architecture: "സാങ്കേതിക ഘടന",
      about: "ഞങ്ങളെക്കുറിച്ച്",
      accessWallet: "വോൾട്ട് തുറക്കുക",
      createWallet: "വാലറ്റ് ഉണ്ടാക്കുക",
    },
    hero: {
      badge: "സെൽഫ്-സോവറിൻ ഐഡന്റിറ്റി · ഓഫ്‌ലൈൻ വെരിഫിക്കേഷൻ · W3C സ്റ്റാൻഡേർഡ്",
      headline1: "ഏറ്റവും വേഗമേറിയതും സുരക്ഷിതവുമായ",
      headline2: "തിരിച്ചറിയൽ സംവിധാനം",
      teamCredit: "ടീം സെർവർലെസ് സിൻഡിക്കേറ്റ് നിർമ്മിച്ചത് · SIH ഹാക്കത്തോൺ #26125",
      every: "ഓരോ",
      rotatingWords: [
        "അഭയാർത്ഥി കുടുംബത്തിനും.",
        "റേഷൻ വിതരണത്തിനും.",
        "ഓഫ്‌ലൈൻ ചെക്ക്പോയിന്റുകൾക്കും.",
        "മെഡിക്കൽ ട്രയാജ് രേഖകൾക്കും.",
        "ദുരിതാശ്വാസ ക്യാമ്പുകൾക്കും.",
      ],
      subtitle:
        "ദുരിതാശ്വാസ മേഖലകൾക്കും ദുരന്തബാധിതർക്കും വേണ്ടി പ്രത്യേകം രൂപകൽപ്പന ചെയ്ത വികേന്ദ്രീകൃത ഡിജിറ്റൽ തിരിച്ചറിയൽ സംവിധാനം. ഇന്റർനെറ്റ് ഇല്ലാതെ 100% പരിശോധിക്കാവുന്ന സീറോ-നോളജ് പ്രൂഫ്, ഹൈപ്പർലെഡ്ജർ ബെസു ബ്ലോക്ക്‌ചെയിൻ പിന്തുണ, സാമൂഹിക റിക്കവറി സൗകര്യം.",
      createBtn: "വാലറ്റ് ഉണ്ടാക്കുക",
      accessBtn: "വോൾട്ട് തുറക്കുക",
      stats0Pii: "0 വ്യക്തിഗത ഡാറ്റ പബ്ലിക് ചെയിനിൽ",
      statsOffline: "100% ഓഫ്‌ലൈൻ പ്രവർത്തനം",
      statsShamir: "2-of-3 ഷാമിർ റിക്കവറി",
    },
    stats: {
      stat1Label: "ഓഫ്‌ലൈൻ പരിശോധനാ സംവിധാനം",
      stat2Label: "ഷാമിർ ത്രെഷോൾഡ് റിക്കവറി",
      stat3Label: "പബ്ലിക് ലെഡ്ജർ എക്സ്പോഷർ",
      stat4Label: "W3C വെരിഫയബിൾ ക്രെഡൻഷ്യൽ",
    },
    capabilities: {
      eyebrow: "പ്രത്യേകതകൾ",
      title1: "സമ്പൂർണ്ണ സുരക്ഷിതത്വം,",
      title2: "രഹസ്യസ്വഭാവ സംരക്ഷണം.",
      desc: "എല്ലാ ഐഡന്റിറ്റി കാർഡുകളും നിങ്ങളുടെ ഫോണിൽ സുരക്ഷിതമായി എൻക്രിപ്റ്റ് ചെയ്തിരിക്കുന്നു. വ്യക്തിഗത വിവരങ്ങൾ ചോരാതെ തന്നെ ആധികാരികത തെളിയിക്കാം.",
      cards: [
        {
          title: "വികേന്ദ്രീകൃത DID റൂട്ട്",
          desc: "ഫോണിൽ തന്നെ സുരക്ഷിതമായി ക്രിപ്റ്റോഗ്രാഫിക് കീകൾ ഉപയോഗിച്ച് നിർമ്മിക്കുന്നു. ആർക്കും നിങ്ങളുടെ ഐഡന്റിറ്റി റദ്ദാക്കാനാകില്ല.",
        },
        {
          title: "100% ഓഫ്‌ലൈൻ സ്കാനർ",
          desc: "ഇന്റർനെറ്റ് ഇല്ലാത്ത ക്യാമ്പുകളിൽ റിലീഫ് ഓഫീസർമാർക്ക് QR കോഡ് വഴി തൽക്ഷണം ക്രെഡൻഷ്യലുകൾ പരിശോധിക്കാം.",
        },
        {
          title: "സീറോ-നോളജ് പ്രൂഫുകൾ",
          desc: "ജനനത്തീയതിയോ മറ്റ് വ്യക്തിഗത വിവരങ്ങളോ വെളിപ്പെടുത്താതെ അർഹത മാത്രം തെളിയിക്കുന്ന അത്യാധുനിക ZK സാങ്കേതികവിദ്യ.",
        },
        {
          title: "ഷാമിർ സോഷ്യൽ റിക്കവറി",
          desc: "പ്രളയത്തിലോ മറ്റ് ദുരന്തങ്ങളിലോ ഫോൺ നഷ്ടപ്പെട്ടാൽ, 3 അംഗങ്ങളിൽ 2 പേരുടെ സഹായത്തോടെ വാലറ്റ് വീണ്ടെടുക്കാം.",
        },
        {
          title: "ബ്ലോക്ക്‌ചെയിൻ ആങ്കറിംഗ്",
          desc: "ഹൈപ്പർലെഡ്ജർ ബെസു അടിസ്ഥാനമാക്കിയുള്ള സുരക്ഷിത ആങ്കറിംഗ്. വിവരങ്ങൾ മാറ്റം വരുത്താൻ സാധിക്കില്ല.",
        },
        {
          title: "ഡ്യൂറസ് മോഡ് (ഡെക്കോയ് വോൾട്ട്)",
          desc: "ഭീഷണിയോ നിർബന്ധിത പരിശോധനയോ ഉണ്ടാകുമ്പോൾ 9999 പിൻ നൽകിയാൽ സുരക്ഷിതമായ വ്യാജ വോൾട്ട് പ്രദർശിപ്പിക്കുന്നു.",
        },
      ],
    },
    pipeline: {
      eyebrow: "പ്രവർത്തന ഘട്ടങ്ങൾ",
      title: "രജിസ്ട്രേഷൻ മുതൽ സഹായ വിതരണം വരെ നിമിഷങ്ങൾക്കുള്ളിൽ.",
      steps: ["1. ലോക്കൽ DID", "2. ഇഷ്യൂ & ആങ്കർ", "3. ZK പ്രൂഫ് പാസ്", "4. ഓഫ്‌ലൈൻ സ്കാൻ", "5. സഹായം ലഭ്യമാക്കി"],
      details: [
        {
          step: "01",
          title: "സുരക്ഷിത എൻക്ലേവിൽ രജിസ്റ്റർ ചെയ്യുക",
          desc: "വ്യക്തിഗത രഹസ്യങ്ങൾ പുറത്തുവിടാതെ ഉപയോക്താവ് ഫോണിൽ പ്രാദേശികമായി കീകൾ നിർമ്മിക്കുന്നു.",
        },
        {
          step: "02",
          title: "ക്യാമ്പ് അതോറിറ്റി ഒപ്പിടുന്നു",
          desc: "റിലീഫ് കിയോസ്ക് റേഷൻ അർഹത പരിശോധിച്ച് ക്രിപ്റ്റോഗ്രാഫിക് ആയി ഒപ്പിട്ട് നൽകുന്നു.",
        },
        {
          step: "03",
          title: "ZK പ്രൂഫ് നൽകുക",
          desc: "വിതരണ കൗണ്ടറിൽ ഡൈനാമിക് QR കോഡ് കാണിക്കുന്നു. ആവശ്യമായ വിവരങ്ങൾ മാത്രം പ്രദർശിപ്പിക്കുന്നു.",
        },
        {
          step: "04",
          title: "ഓഫ്‌ലൈൻ സഹായ വിതരണം",
          desc: "ഫീൽഡ് ടെർമിനൽ തൽക്ഷണം ക്രെഡൻഷ്യലുകൾ പരിശോധിച്ച് കാലതാമസമില്ലാതെ സാധനങ്ങൾ വിതരണം ചെയ്യുന്നു.",
        },
      ],
    },
    architecture: {
      eyebrow: "ഹാക്കത്തോൺ ഘടന & വ്യാപ്തി",
      title: "സ്മാർട്ട് ഇന്ത്യ ഹാക്കത്തോൺ #26125 അവലോകനം",
      status: "സ്റ്റാറ്റസ്: ഫീൽഡ് ഡെമോ സജ്ജം",
      problemTitle: "പരിഹരിക്കുന്ന പ്രശ്നം:",
      problemDesc:
        "പ്രളയങ്ങൾ, ഭൂകമ്പങ്ങൾ തുടങ്ങിയ പ്രകൃതിദുരന്തങ്ങളിൽ ആളുകൾക്ക് തിരിച്ചറിയൽ രേഖകൾ നഷ്ടപ്പെടുന്നു. മൊബൈൽ നെറ്റ്‌വർക്കുകൾ തകരുമ്പോൾ കേന്ദ്രീകൃത ഡാറ്റാബേസുകൾ പ്രവർത്തിക്കാതെ റിലീഫ് വിതരണം തടസ്സപ്പെടുന്നു.",
      solutionTitle: "ResilienceID സാങ്കേതിക പരിഹാരം:",
      solutionDesc:
        "ഇന്റർനെറ്റിനെ ആശ്രയിക്കാത്ത വികേന്ദ്രീകൃത ഐഡന്റിറ്റി. ക്രിപ്റ്റോഗ്രഫിയും സീറോ-നോളജ് പ്രൂഫുകളും ഉപയോഗിച്ച് ജനങ്ങൾക്ക് തങ്ങളുടെ അവകാശങ്ങളും സഹായങ്ങളും 100% ഓഫ്‌ലൈനായി ലഭ്യമാക്കുന്നു.",
    },
    about: {
      team: "ടീം സെർവർലെസ് സിൻഡിക്കേറ്റ്",
      role: "ലീഡ് ആർക്കിടെക്റ്റ്",
      hackathon: "SIH ഹാക്കത്തോൺ 2024 · പ്രോബ്ലം സ്റ്റേറ്റ്‌മെന്റ് #26125",
      desc: "ദുരന്തമുഖത്ത് ജനങ്ങളുടെ അവകാശങ്ങളും അന്തസ്സും സംരക്ഷിക്കാൻ പൂർണ്ണമായും ഓഫ്‌ലൈൻ-ഫസ്റ്റ് ആയി രൂപകൽപ്പന ചെയ്ത സംവിധാനം. വ്യക്തിഗത വിവരങ്ങളുടെ സുരക്ഷ ഉറപ്പാക്കുന്നു.",
    },
    cta: {
      title1: "ദുരിതബാധിതർക്ക് സ്വയം പരമാധികാരമുള്ള",
      title2: "തിരിച്ചറിയൽ അവകാശം നൽകുക.",
      desc: "ഈ ഉപകരണത്തിൽ തന്നെ ലൈവ് പ്രോട്ടോടൈപ്പ് പരീക്ഷിക്കൂ.",
      createBtn: "വാലറ്റ് ഉണ്ടാക്കുക",
      accessBtn: "വോൾട്ട് തുറക്കുക",
    },
    footer: {
      backToTop: "മുകളിലേക്ക് പോകുക",
      builtBy: "ടീം സെർവർലെസ് സിൻഡിക്കേറ്റ് നിർമ്മിച്ചത് · ResilienceID · SIH #26125",
      subtext: "ദുരിതബാധിതർക്കായുള്ള സെൽഫ്-സോവറിൻ ഡിജിറ്റൽ ഐഡന്റിറ്റി · സ്മാർട്ട് ഇന്ത്യ ഹാക്കത്തോൺ",
    },
  },
  hi: {
    tagline: "सेल्फ-सॉवरेन डिजिटल पहचान",
    nav: {
      capabilities: "सुविधाएं",
      howItWorks: "कार्यप्रणाली",
      protocolFlow: "प्रोटोकॉल फ्लो",
      architecture: "वास्तुकला",
      about: "परिचय",
      accessWallet: "वॉलेट खोलें",
      createWallet: "वॉलेट बनाएं",
    },
    hero: {
      badge: "सेल्फ-सॉवरेन पहचान · ऑफ़लाइन सत्यापन · W3C मानक",
      headline1: "सबसे तेज़ और सुरक्षित",
      headline2: "पहचान प्रणाली",
      teamCredit: "टीम सर्वरलेस सिंडिकेट द्वारा निर्मित · SIH हैकाथॉन #26125",
      every: "प्रत्येक",
      rotatingWords: [
        "शरणार्थी परिवार के लिए।",
        "राशन वितरण के लिए।",
        "ऑफ़लाइन चेकपॉइंट के लिए।",
        "चिकित्सा रिकॉर्ड के लिए।",
        "आपदा राहत शिविर के लिए।",
      ],
      subtitle:
        "विस्थापित आबादी और आपदा राहत शिविरों के लिए विशेष रूप से निर्मित विकेंद्रीकृत डिजिटल पहचान वॉलेट। शून्य-ज्ञान प्रमाण (ZK Proof) और हाइपरलेज़र बेसू ब्लॉकचेन द्वारा 100% ऑफ़लाइन सत्यापन योग्य।",
      createBtn: "वॉलेट बनाएं",
      accessBtn: "वॉलेट खोलें",
      stats0Pii: "0 व्यक्तिगत डेटा ब्लॉकचेन पर",
      statsOffline: "100% ऑफ़लाइन तैयार",
      statsShamir: "2-of-3 शमीर रिकवरी",
    },
    stats: {
      stat1Label: "ऑफ़लाइन सत्यापन योग्य दावे",
      stat2Label: "शमीर थ्रेशोल्ड रिकवरी",
      stat3Label: "पब्लिक लेज़र एक्सपोज़र",
      stat4Label: "W3C सत्यापन योग्य क्रेडेंशियल",
    },
    capabilities: {
      eyebrow: "क्षमताएं",
      title1: "पूर्णतः साक्ष्य-आधारित,",
      title2: "शून्य निगरानी।",
      desc: "प्रत्येक पहचान पत्र डिवाइस एन्क्लेव में सुरक्षित रूप से एन्क्रिप्ट किया गया है। व्यक्तिगत डेटा को उजागर किए बिना प्रामाणिकता की पुष्टि होती है।",
      cards: [
        {
          title: "विकेंद्रीकृत DID रूट",
          desc: "डिवाइस पर स्थानीय रूप से निर्मित। कोई भी प्राधिकरण या प्लेटफ़ॉर्म आपकी पहचान को फ्रीज या रद्द नहीं कर सकता।",
        },
        {
          title: "100% ऑफ़लाइन सत्यापनकर्ता",
          desc: "राहत अधिकारी बिना इंटरनेट के QR या NFC टोकन स्कैन करके तुरंत क्रेडेंशियल सत्यापित कर सकते हैं।",
        },
        {
          title: "ज़ीरो-नॉलेज प्रूफ़ (ZK Proof)",
          desc: "जन्म तिथि या संवेदनशील विवरण प्रकट किए बिना पात्रता (जैसे आयु या शिविर सदस्यता) सिद्ध करें।",
        },
        {
          title: "शमीर सोशल रिकवरी",
          desc: "फोन खो जाने पर 3 में से 2 विश्वसनीय अभिभावकों की मदद से किसी भी डिवाइस पर वॉलेट पुनः प्राप्त करें।",
        },
        {
          title: "ब्लॉकचेन एंकरिंग",
          desc: "हाइपरलेज़र बेसू पर क्रिप्टोग्राफ़िक स्थिति दर्ज की जाती है, जिससे पूर्ण पारदर्शिता और सुरक्षा मिलती है।",
        },
        {
          title: "ड्यूरेस मोड (नकली वॉलेट)",
          desc: "दबाव या खतरे की स्थिति में 9999 पिन दर्ज करने पर सुरक्षित और प्रामाणिक दिखने वाला नकली वॉलेट प्रदर्शित होता है।",
        },
      ],
    },
    pipeline: {
      eyebrow: "प्रक्रिया",
      title: "नामांकन से लेकर राहत वितरण तक सेकंडों में।",
      steps: ["1. स्थानीय DID", "2. जारी और एंकर", "3. ZK प्रूफ़ पास", "4. ऑफ़लाइन स्कैन", "5. सहायता प्रदान की"],
      details: [
        {
          step: "01",
          title: "सुरक्षित एन्क्लेव में नामांकन",
          desc: "उपयोगकर्ता बिना निजी डेटा साझा किए स्थानीय रूप से कुंजी जोड़े उत्पन्न करता है।",
        },
        {
          step: "02",
          title: "शिविर प्राधिकरण हस्ताक्षर",
          desc: "राहत कियोस्क राशन कोटे को डिजिटल रूप से हस्ताक्षरित और एंकर करता है।",
        },
        {
          step: "03",
          title: "ZK प्रूफ़ उत्पन्न करें",
          desc: "वितरण चेकपॉइंट पर डायनामिक QR कोड प्रस्तुत किया जाता है, जिसमें केवल आवश्यक जानकारी होती है।",
        },
        {
          step: "04",
          title: "ऑफ़लाइन सहायता वितरण",
          desc: "फ़ील्ड टर्मिनल तुरंत स्थानीय कुंजियों के माध्यम से सत्यापन करके राहत सामग्री वितरित करता है।",
        },
      ],
    },
    architecture: {
      eyebrow: "हैकाथॉन दायरा और संरचना",
      title: "स्मार्ट इंडिया हैकाथॉन #26125 विवरण",
      status: "स्थिति: फ़ील्ड डेमो तैयार",
      problemTitle: "सुलझाई गई समस्या:",
      problemDesc:
        "बाढ़ या भूकंप के दौरान भौतिक पहचान पत्र नष्ट हो जाते हैं और मोबाइल नेटवर्क ठप होने से राहत वितरण रुक जाता है।",
      solutionTitle: "ResilienceID तकनीकी समाधान:",
      solutionDesc:
        "इंटरनेट कनेक्टिविटी से मुक्त पहचान सत्यापन। क्रिप्टोग्राफी और ZK प्रूफ़ के माध्यम से विस्थापित परिवारों को 100% ऑफ़लाइन अधिकार और राशन की गारंटी मिलती है।",
    },
    about: {
      team: "टीम सर्वरलेस सिंडिकेट",
      role: "लीड आर्किटेक्ट",
      hackathon: "SIH हैकाथॉन 2024 · समस्या विवरण #26125",
      desc: "यह समाधान सुनिश्चित करता है कि संकट के समय लोगों के मौलिक अधिकार सुरक्षित रहें। मानवीय गरिमा और गोपनीयता की पूर्ण गारंटी।",
    },
    cta: {
      title1: "विस्थापित पीड़ितों को सशक्त बनाएं",
      title2: "आत्म-सम्मान और गरिमा के साथ।",
      desc: "इस डिवाइस पर लाइव प्रोटोटाइप का अनुभव करें।",
      createBtn: "वॉलेट बनाएं",
      accessBtn: "वॉलेट खोलें",
    },
    footer: {
      backToTop: "शीर्ष पर वापस जाएं",
      builtBy: "टीम सर्वरलेस सिंडिकेट द्वारा निर्मित · ResilienceID · SIH #26125",
      subtext: "विस्थापित आबादी के लिए सेल्फ-सॉवरेन डिजिटल पहचान · स्मार्ट इंडिया हैकाथॉन",
    },
  },
};
