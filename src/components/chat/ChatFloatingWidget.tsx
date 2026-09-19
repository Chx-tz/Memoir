import { Bot, Sparkles, X } from "lucide-react";
import { useChat } from "../../context/ChatContext";

export function ChatFloatingWidget() {
  const { isOpen, toggleChat, unreadCount } = useChat();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip hint when closed */}
      {!isOpen && (
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-graphite-700 bg-graphite-900/95 px-3 py-2 text-xs font-medium text-ink-primary shadow-xl backdrop-blur animate-bounce-slow">
          <Sparkles className="h-3.5 w-3.5 text-lime" />
          <span>Ask **Sahaya AI**</span>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={toggleChat}
        aria-label={isOpen ? "Close Sahaya AI Assistant" : "Open Sahaya AI Assistant"}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-graphite-800 text-ink-primary border border-graphite-600 ring-2 ring-lime/20"
            : "bg-gradient-to-tr from-lime to-emerald-400 text-graphite-950 shadow-lime/20 ring-4 ring-lime/30"
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
        ) : (
          <>
            <Bot className="h-7 w-7 transition-transform duration-200 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-graphite-950 text-[10px] font-bold text-lime">
              <Sparkles className="h-2.5 w-2.5" />
            </span>
          </>
        )}

        {/* Unread badge */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber text-[10px] font-bold text-graphite-950 shadow-md animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
