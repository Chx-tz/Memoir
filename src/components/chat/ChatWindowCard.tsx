import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Check,
  ChevronRight,
  Key,
  RotateCcw,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useChat } from "../../context/ChatContext";

export function ChatWindowCard() {
  const {
    isOpen,
    closeChat,
    messages,
    sendMessage,
    isThinking,
    apiKey,
    setApiKey,
    clearMessages,
    handleActionClick,
  } = useChat();

  const [inputText, setInputText] = useState("");
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isThinking, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isThinking) return;
    const text = inputText;
    setInputText("");
    await sendMessage(text);
  };

  const handleQuickPrompt = (promptText: string) => {
    sendMessage(promptText);
  };

  const handleSaveKey = () => {
    setApiKey(tempKey.trim());
    setShowKeyConfig(false);
  };

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 z-50 flex h-[560px] max-h-[82vh] w-[calc(100vw-2rem)] sm:w-[420px] flex-col rounded-2xl border border-graphite-700 bg-graphite-950/95 shadow-2xl backdrop-blur-xl animate-scale-up overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-graphite-800 bg-graphite-900/90 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-lime/20 to-emerald-500/20 border border-lime/30 text-lime">
            <Bot className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-lime ring-2 ring-graphite-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-semibold text-ink-primary">Sahaya AI</h3>
              <span className="rounded bg-lime/10 px-1.5 py-0.2 text-[10px] font-mono text-lime border border-lime/20">
                {apiKey ? "Gemini 3.8 Flash" : "Smart Offline"}
              </span>
            </div>
            <p className="text-[11px] text-ink-muted">Empathetic Vault & Relief Guide</p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowKeyConfig(!showKeyConfig)}
            title="Configure Gemini API Key"
            className={`rounded-lg p-1.5 transition-colors ${
              showKeyConfig || apiKey
                ? "text-lime bg-lime/10"
                : "text-ink-secondary hover:bg-graphite-800 hover:text-ink-primary"
            }`}
          >
            <Key className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={clearMessages}
            title="Clear Chat History"
            className="rounded-lg p-1.5 text-ink-secondary hover:bg-graphite-800 hover:text-ink-primary transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={closeChat}
            aria-label="Close Chat Window"
            className="rounded-lg p-1.5 text-ink-secondary hover:bg-graphite-800 hover:text-ink-primary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Gemini API Key Overlay / Panel */}
      {showKeyConfig && (
        <div className="border-b border-graphite-700 bg-graphite-900 p-3.5 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-ink-primary flex items-center gap-1.5">
              <Key className="h-3.5 w-3.5 text-lime" />
              Google Gemini API Key
            </span>
            <span className="text-[10px] text-ink-muted">Optional for Live AI</span>
          </div>
          <p className="text-[11px] text-ink-secondary mb-2.5">
            Enter your API key to enable live Gemini 3.8 Flash model execution. If left empty, Sahaya operates using smart local vault intelligence.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="AIzaSy..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="flex-1 rounded-lg border border-graphite-700 bg-graphite-950 px-3 py-1.5 text-xs text-ink-primary placeholder-ink-muted focus:border-lime focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSaveKey}
              className="flex items-center gap-1 rounded-lg bg-lime px-3 py-1.5 text-xs font-semibold text-graphite-950 hover:bg-lime/90 transition-colors"
            >
              <Check className="h-3.5 w-3.5" /> Save
            </button>
          </div>
        </div>
      )}

      {/* Messages thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`flex gap-2.5 max-w-[88%] ${
                  isUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                    isUser
                      ? "bg-graphite-700 text-ink-primary"
                      : "bg-lime/10 text-lime border border-lime/30"
                  }`}
                >
                  {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    isUser
                      ? "bg-lime/15 border border-lime/30 text-ink-primary rounded-tr-none"
                      : "bg-graphite-900 border border-graphite-800 text-ink-primary rounded-tl-none"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text.split("\n").map((line, idx) => {
                      if (line.startsWith("• ")) {
                        return (
                          <div key={idx} className="ml-2 my-0.5 text-ink-secondary">
                            {line}
                          </div>
                        );
                      }
                      return (
                        <p key={idx} className={idx > 0 ? "mt-1.5" : ""}>
                          {line}
                        </p>
                      );
                    })}
                  </div>

                  {/* Interactive Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-graphite-800">
                      {msg.actions.map((act, actIdx) => (
                        <button
                          key={actIdx}
                          type="button"
                          onClick={() => handleActionClick(act.targetPage, act.modalToOpen)}
                          className="flex items-center gap-1 rounded-lg border border-lime/30 bg-lime/10 px-2.5 py-1 text-[11px] font-medium text-lime hover:bg-lime/20 transition-colors"
                        >
                          <span>{act.label}</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <span className="mt-1 px-1 text-[10px] text-ink-muted">{msg.timestamp}</span>
            </div>
          );
        })}

        {/* Thinking / Processing animation */}
        {isThinking && (
          <div className="flex items-center gap-2 text-ink-muted text-xs bg-graphite-900/60 p-2.5 rounded-xl border border-graphite-800 max-w-[200px]">
            <Sparkles className="h-3.5 w-3.5 text-lime animate-spin" />
            <span>Sahaya AI is analyzing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="border-t border-graphite-800/80 bg-graphite-900/50 p-2 overflow-x-auto">
        <div className="flex gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={() => handleQuickPrompt("What credentials do I have?")}
            className="shrink-0 rounded-full border border-graphite-700 bg-graphite-950 px-2.5 py-1 text-ink-secondary hover:border-lime/40 hover:text-lime transition-colors"
          >
            📁 My Credentials
          </button>
          <button
            type="button"
            onClick={() => handleQuickPrompt("How does social recovery work?")}
            className="shrink-0 rounded-full border border-graphite-700 bg-graphite-950 px-2.5 py-1 text-ink-secondary hover:border-lime/40 hover:text-lime transition-colors"
          >
            👥 Social Recovery
          </button>
          <button
            type="button"
            onClick={() => handleQuickPrompt("Explain Duress PIN 9999")}
            className="shrink-0 rounded-full border border-graphite-700 bg-graphite-950 px-2.5 py-1 text-ink-secondary hover:border-lime/40 hover:text-lime transition-colors"
          >
            🛡️ Duress Mode
          </button>
          <button
            type="button"
            onClick={() => handleQuickPrompt("മലയാളത്തിൽ സഹായിക്കൂ")}
            className="shrink-0 rounded-full border border-graphite-700 bg-graphite-950 px-2.5 py-1 text-ink-secondary hover:border-lime/40 hover:text-lime transition-colors"
          >
            🌐 മലയാളം
          </button>
        </div>
      </div>

      {/* Input form */}
      <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-graphite-800 bg-graphite-950 p-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Sahaya AI..."
          className="flex-1 rounded-xl border border-graphite-700 bg-graphite-900 px-3.5 py-2 text-xs text-ink-primary placeholder-ink-muted focus:border-lime focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isThinking}
          aria-label="Send Message"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime font-semibold text-graphite-950 disabled:opacity-40 hover:bg-lime/90 transition-all cursor-pointer shrink-0"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
