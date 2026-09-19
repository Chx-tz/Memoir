import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useVault } from "./VaultContext";
import { generateSahayaResponse } from "../services/geminiService";
import type { ChatMessage, PageId } from "../types";

interface ChatContextValue {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  messages: ChatMessage[];
  sendMessage: (text: string) => Promise<void>;
  isThinking: boolean;
  unreadCount: number;
  apiKey: string;
  setApiKey: (key: string) => void;
  clearMessages: () => void;
  handleActionClick: (targetPage?: PageId, modalToOpen?: "issue" | "proof" | "anchor") => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

const INITIAL_MESSAGE: ChatMessage = {
  id: "msg-welcome",
  sender: "assistant",
  text: "Hello! I am **Sahaya AI** (സഹായം / सहायता), your empathetic vault assistant. How can I assist with your emergency credentials, ZK proofs, or recovery today?",
  timestamp: "Just now",
  actions: [
    { label: "📁 View My Credentials", targetPage: "documents" },
    { label: "👥 Social Recovery Hub", targetPage: "recovery" },
    { label: "🔐 ZK Privacy Proof", modalToOpen: "proof" },
  ],
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [apiKey, setApiKeyState] = useState<string>(() => {
    return localStorage.getItem("sahaya_gemini_api_key") || "";
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem("sahaya_chat_messages");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [INITIAL_MESSAGE];
  });

  const vault = useVault();

  useEffect(() => {
    try {
      localStorage.setItem("sahaya_chat_messages", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  const setApiKey = useCallback((key: string) => {
    setApiKeyState(key);
    localStorage.setItem("sahaya_gemini_api_key", key);
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setUnreadCount(0);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setUnreadCount(0);
      return next;
    });
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
  }, []);

  const handleActionClick = useCallback(
    (targetPage?: PageId, modalToOpen?: "issue" | "proof" | "anchor") => {
      if (targetPage) {
        vault.setCurrentPage(targetPage);
        vault.pushToast(`Navigated to ${targetPage}`, "info");
      }
      if (modalToOpen === "issue") {
        vault.openIssueModal();
      } else if (modalToOpen === "proof") {
        if (vault.documents.length > 0) {
          vault.openProofModal(vault.documents[0].id);
        } else {
          vault.pushToast("No credentials available to generate ZK proof.", "warning");
        }
      } else if (modalToOpen === "anchor") {
        if (vault.documents.length > 0) {
          vault.openAnchorModal(vault.documents[0].id);
        }
      }
    },
    [vault]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: "user",
        text: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsThinking(true);

      const contextSummary = {
        currentPage: vault.currentPage,
        language: vault.language,
        uiMode: vault.uiMode,
        isVaultLocked: vault.isVaultLocked,
        isDuressMode: vault.isDuressMode,
        documents: vault.documents,
        guardians: vault.guardians,
        userDisplayName: vault.profile?.displayName,
        userPhone: vault.activePhone,
      };

      try {
        const response = await generateSahayaResponse(text, contextSummary, apiKey);

        const botMsg: ChatMessage = {
          id: `msg-res-${Date.now()}`,
          sender: "assistant",
          text: response.text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actions: response.actions,
        };

        setMessages((prev) => [...prev, botMsg]);

        if (!isOpen) {
          setUnreadCount((prev) => prev + 1);
        }
      } catch (error) {
        const errorMsg: ChatMessage = {
          id: `msg-err-${Date.now()}`,
          sender: "assistant",
          text: "I am having trouble connecting right now, but your vault and credentials remain completely secure locally.",
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsThinking(false);
      }
    },
    [vault, apiKey, isOpen]
  );

  const value = useMemo<ChatContextValue>(
    () => ({
      isOpen,
      openChat,
      closeChat,
      toggleChat,
      messages,
      sendMessage,
      isThinking,
      unreadCount,
      apiKey,
      setApiKey,
      clearMessages,
      handleActionClick,
    }),
    [
      isOpen,
      openChat,
      closeChat,
      toggleChat,
      messages,
      sendMessage,
      isThinking,
      unreadCount,
      apiKey,
      setApiKey,
      clearMessages,
      handleActionClick,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return ctx;
}
