import type { ChatAction, Language, VaultDocument, Guardian, PageId } from "../types";

export interface VaultStateSummary {
  currentPage: PageId;
  language: Language;
  uiMode: "human" | "auditor";
  isVaultLocked: boolean;
  isDuressMode: boolean;
  documents: VaultDocument[];
  guardians: Guardian[];
  userDisplayName?: string;
  userPhone?: string | null;
}

export interface AssistantResponse {
  text: string;
  actions?: ChatAction[];
}

const SAHAYA_SYSTEM_INSTRUCTION = `You are Sahaya AI (സഹായം / सहायता AI), an empathetic, highly secure AI assistant built into the Memoir (SecureID / ResilienceID) Vault app.
Memoir is a sovereign identity and emergency relief vault that allows citizens to store verifiable credentials (such as Relief Registration, Ration Cards, Health Records, Family Registries, and National IDs), generate Zero-Knowledge (ZK) privacy proofs, manage 2-of-3 social recovery guardians, and operate under safety Duress PIN mode.

Your goals:
1. Provide helpful, empathetic, concise, and accurate advice to users about their identity credentials, ZK proofs, emergency relief documents, and social recovery.
2. Adapt to the user's selected language (English, Malayalam, or Hindi) as instructed in context.
3. Keep responses clean, friendly, and structured with bullet points where appropriate.
4. Provide recommendations on how to use Memoir features (e.g. generating a ZK age proof, linking recovery guardians, issuing a new credential).`;

/**
 * Generate a response using Google Gemini API (`gemini-3.8-flash`) or smart fallback.
 */
export async function generateSahayaResponse(
  prompt: string,
  vaultContext: VaultStateSummary,
  apiKey?: string
): Promise<AssistantResponse> {
  const activeKey = apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string | undefined);

  if (activeKey && activeKey.trim().length > 0) {
    try {
      // Dynamic import to support both environments safely
      const { GoogleGenAI } = await import("@google/genai");
      const client = new GoogleGenAI({ apiKey: activeKey });
      
      const docSummary = vaultContext.documents
        .map((d) => `- ${d.title} (${d.type}): ${d.status === "verified" ? "Verified & Anchored" : "Empty / Missing"}`)
        .join("\n");

      const guardianSummary = vaultContext.guardians
        .map((g) => `- ${g.name} (${g.role}): ${g.status}`)
        .join("\n");

      const contextMessage = `
Current Vault Context:
- User: ${vaultContext.userDisplayName || "Sovereign Vault User"}
- Current Page: ${vaultContext.currentPage}
- Language: ${vaultContext.language}
- Mode: ${vaultContext.uiMode}
- Duress Mode Active: ${vaultContext.isDuressMode}
- Active Credentials (${vaultContext.documents.length}):
${docSummary || "No credentials stored"}
- Recovery Guardians (${vaultContext.guardians.length}):
${guardianSummary || "No guardians registered"}

User Prompt: ${prompt}
`;

      const response = await client.interactions.create({
        model: "gemini-3.8-flash",
        system_instruction: SAHAYA_SYSTEM_INSTRUCTION,
        input: contextMessage,
      });

      const text = response.output_text || "I am Sahaya AI. I received your request and am ready to assist you with your vault.";
      const actions = generateContextualActions(prompt);

      return { text, actions };
    } catch (err: any) {
      console.warn("Gemini API call failed or offline, using smart local engine:", err);
    }
  }

  // Fallback offline / local smart response engine
  return generateOfflineSahayaResponse(prompt, vaultContext);
}

/**
 * Smart offline / key-less response generator for Sahaya AI.
 */
function generateOfflineSahayaResponse(
  prompt: string,
  context: VaultStateSummary
): AssistantResponse {
  const lower = prompt.toLowerCase();
  const lang = context.language;

  // 1. Language preference or translation query
  if (lower.includes("malayalam") || lower.includes("മലയാളം")) {
    return {
      text: "തീർച്ചയായും! **Sahaya AI (സഹായം)** നിങ്ങളെ മലയാളത്തിൽ സഹായിക്കാൻ സജ്ജമാണ്. നിങ്ങളുടെ സുരക്ഷിത ഡിജിറ്റൽ റേഷൻ കാർഡ്, ഹെൽത്ത് റെക്കോർഡ്, അല്ലെങ്കിൽ സോഷ്യൽ റിക്കവരി ഗാർഡിയനുകളെ കുറിച്ച് എന്തുവേണമെങ്കിലും ചോദിക്കൂ.",
      actions: [{ label: "My Credentials", targetPage: "documents" }],
    };
  }
  if (lower.includes("hindi") || lower.includes("हिंदी")) {
    return {
      text: "नमस्ते! **Sahaya AI (सहायता)** आपका स्वागत करता है। मैं आपके मेमॉयर (Memoir) डिजिटल आईडी वाल्ट, ZK प्रमाण और रिकवरी गार्जियन में आपकी सहायता कर सकता हूँ।",
      actions: [{ label: "View Documents", targetPage: "documents" }],
    };
  }

  // 2. Documents & Credentials
  if (
    lower.includes("credential") ||
    lower.includes("document") ||
    lower.includes("ration") ||
    lower.includes("health") ||
    lower.includes("card") ||
    lower.includes("id")
  ) {
    const verifiedCount = context.documents.filter((d) => d.status === "verified").length;
    let text = "";
    if (lang === "ml") {
      text = `നിങ്ങളുടെ വോൾട്ടിൽ **${context.documents.length}** ക്രെഡൻഷ്യലുകൾ ഉണ്ട് (${verifiedCount} എണ്ണം സ്ഥിരീകരിച്ചവ). തദ്ദേശീയ ദുരിതാശ്വാസ കാർഡുകൾ അല്ലെങ്കിൽ റേഷൻ കാർഡുകൾ ഇവിടെ ലഭ്യമാണ്.`;
    } else if (lang === "hi") {
      text = `आपके वाल्ट में **${context.documents.length}** डिजिटल क्रेडेंशियल हैं (${verifiedCount} सत्यापित)। आप कभी भी नए दस्तावेज़ जारी या सत्यापित कर सकते हैं।`;
    } else {
      text = `You currently have **${context.documents.length}** credentials listed in your Memoir Vault (**${verifiedCount} verified & anchored on-chain**).\n\nKey stored documents include:\n` +
        context.documents.map((d) => `• **${d.title}** (${d.status.toUpperCase()})`).join("\n");
    }

    return {
      text,
      actions: [
        { label: "📁 View Credentials", targetPage: "documents" },
        { label: "➕ Issue New Credential", modalToOpen: "issue" },
      ],
    };
  }

  // 3. ZK Proofs & Privacy
  if (lower.includes("proof") || lower.includes("zk") || lower.includes("zero knowledge") || lower.includes("privacy")) {
    let text = "";
    if (lang === "ml") {
      text = "സീറോ-നോളജ് (ZK) പ്രൂഫുകൾ ഉപയോഗിച്ച് നിങ്ങളുടെ വ്യക്തിഗത വിവരങ്ങൾ (ഉദാഹരണത്തിന് വയസ്സ് അല്ലെങ്കിൽ വിലാസം) വെളിപ്പെടുത്താതെ തന്നെ യോഗ്യത തെളിയിക്കാം.";
    } else if (lang === "hi") {
      text = "जीरो-नॉलेज (ZK) प्रूफ के माध्यम से आप अपनी निजी जानकारी छुपाते हुए अपनी पात्रता साबित कर सकते हैं।";
    } else {
      text = "Zero-Knowledge (ZK) proofs allow you to cryptographically verify claims (e.g. proof of eligibility or age over 18) to relief officers without exposing your private numbers or sensitive data.";
    }

    return {
      text,
      actions: [
        { label: "🔐 Generate ZK Proof", modalToOpen: "proof" },
        { label: "🔍 Aid Verifier Mode", targetPage: "verifier" },
      ],
    };
  }

  // 4. Recovery & Guardians
  if (lower.includes("recovery") || lower.includes("guardian") || lower.includes("lost") || lower.includes("key")) {
    const gCount = context.guardians.length;
    let text = "";
    if (lang === "ml") {
      text = `നിങ്ങൾക്ക് **${gCount}** സോഷ്യൽ റിക്കവരി ഗാർഡിയനുകൾ ലിങ്ക് ചെയ്തിട്ടുണ്ട്. PIN മറന്നുപോയാൽ 2/3 ഗാർഡിയൻ ഒപ്പുകൾ ലഭിച്ചാൽ വോൾട്ട് വീണ്ടെടുക്കാം.`;
    } else if (lang === "hi") {
      text = `आपके पास **${gCount}** रिकवरी गार्जियन पंजीकृत हैं। यदि आप अपना पिन भूल जाते हैं, तो 2/3 गार्जियन सहमति से वाल्ट पुनर्प्राप्त किया जा सकता है।`;
    } else {
      text = `Memoir uses a **2-of-3 Social Recovery Threshold**. You currently have **${gCount} registered guardians** (${context.guardians.map((g) => g.name).join(", ") || "None yet"}).\n\nIf you lose your device or PIN, your trusted guardians can cryptographically reconstruct your master key.`;
    }

    return {
      text,
      actions: [{ label: "👥 Social Recovery Hub", targetPage: "recovery" }],
    };
  }

  // 5. Duress Mode & Security
  if (lower.includes("duress") || lower.includes("safety") || lower.includes("pin") || lower.includes("9999") || lower.includes("lock")) {
    let text = "";
    if (lang === "ml") {
      text = "അടിയന്തിര ഘട്ടങ്ങളിൽ **9999** എന്ന ഡ്യൂറസ് PIN എൻ്റർ ചെയ്താൽ നിങ്ങളുടെ യഥാർത്ഥ വിവരങ്ങൾ മറച്ചുവെച്ച് ഡെക്കോയ് വോൾട്ട് മാത്രം പ്രദർശിപ്പിക്കും.";
    } else if (lang === "hi") {
      text = "सुरक्षा के लिए, पिन **9999** दर्ज करने पर केवल नकली (decoy) डेटा प्रदर्शित होता है, जिससे आपका वास्तविक डेटा सुरक्षित रहता है।";
    } else {
      text = "🛡️ **Safety Duress PIN (9999)**:\nIf forced to unlock your vault under coercion, enter PIN `9999`. Memoir will open in **Safety Decoy Mode**, displaying dummy certificates while silently locking your private sovereign keys.";
    }

    return {
      text,
      actions: [{ label: "📊 Activity Log", targetPage: "activity" }],
    };
  }

  // 6. Default greeting & guidance
  let defaultText = "";
  if (lang === "ml") {
    defaultText = "നമസ്കാരം! ഞാൻ **Sahaya AI (സഹായം)** ആണ്. നിങ്ങളുടെ തിരിച്ചറിയൽ രേഖകൾ, ZK പ്രൂഫുകൾ, ഗാർഡിയൻ റിക്കവരി അല്ലെങ്കിൽ ആപ്പ് നാവിഗേഷൻ എന്നിവയിൽ സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്.";
  } else if (lang === "hi") {
    defaultText = "नमस्ते! मैं **Sahaya AI (सहायता)** हूँ। मैं आपके डिजिटल पहचान पत्र, ZK प्रूफ और सुरक्षा रिकवरी में मदद कर सकता हूँ।";
  } else {
    defaultText = `Hello! I am **Sahaya AI** (സഹായം / सहायता), your empathetic assistant for Memoir Vault.\n\nI can help you:\n• Verify & issue disaster relief credentials\n• Generate Zero-Knowledge privacy proofs\n• Set up Social Recovery guardians\n• Explain Duress PIN (9999) safety mode\n\nHow can I assist you today?`;
  }

  return {
    text: defaultText,
    actions: generateContextualActions(prompt),
  };
}

function generateContextualActions(prompt: string): ChatAction[] {
  const lower = prompt.toLowerCase();
  const actions: ChatAction[] = [];

  if (lower.includes("document") || lower.includes("credential") || lower.includes("card")) {
    actions.push({ label: "📁 View Credentials", targetPage: "documents" });
  }
  if (lower.includes("recovery") || lower.includes("guardian")) {
    actions.push({ label: "👥 Recovery Hub", targetPage: "recovery" });
  }
  if (lower.includes("verifier") || lower.includes("scan") || lower.includes("qr")) {
    actions.push({ label: "🔍 Aid Verifier", targetPage: "verifier" });
  }
  if (actions.length === 0) {
    actions.push({ label: "📋 Overview", targetPage: "overview" });
    actions.push({ label: "📁 Credentials", targetPage: "documents" });
  }

  return actions;
}
