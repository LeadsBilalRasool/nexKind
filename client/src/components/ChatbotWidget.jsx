import { useState, useRef, useEffect } from 'react';
import { X, Send, User, Minimize2, Maximize2, Paperclip, MessageSquare } from 'lucide-react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI academic assistant. How can I help you today?",
      sender: "support",
      timestamp: new Date().toISOString(),
    },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const messageData = {
        text: message,
        sender: "user",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, { ...messageData, id: Date.now() }]);
      setMessage("");

      // Simulate dummy response
      setTimeout(() => {
        const dummyResponse = {
          id: Date.now() + 1,
          text: "I'm just a frontend demo right now, but soon I'll be able to help you with your studies!",
          sender: "support",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, dummyResponse]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={`
          transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] origin-bottom-right
          mb-4 ${isExpanded ? "w-[90vw] sm:w-[500px]" : "w-[350px]"
          } max-w-[calc(100vw-2rem)]
          bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden
          ${isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none absolute bottom-0 right-0"
          }
        `}
      >
        {/* Header */}
        <div className="bg-primary p-4 flex items-center justify-between shadow-lg relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <User className="w-5 h-5 text-secondary" />
              </div>
              <span
                className="absolute bottom-0 right-0 w-3 h-3 border-2 border-primary rounded-full bg-green-500"
              ></span>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg leading-tight">
                AI Assistant
              </h3>
              <p className="text-blue-100 text-xs flex items-center gap-1">
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-blue-100 relative z-10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className={`${isExpanded ? "h-[500px]" : "h-[400px]"
          } overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent transition-all duration-300`}>
          <div className="text-center text-xs text-slate-400 my-4 flex items-center justify-center gap-2 before:h-px before:w-12 before:bg-slate-200 after:h-px after:w-12 after:bg-slate-200">
            Today
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                } animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`
                  max-w-[80%] p-3.5 rounded-2xl text-sm relative shadow-sm
                  ${msg.sender === "user"
                    ? "bg-primary text-white rounded-tr-none"
                    : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                  }
                `}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[10px] mt-1 block w-full text-right ${msg.sender === "user" ? "text-blue-200" : "text-slate-400"
                    }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/50 border-t border-slate-100 backdrop-blur-sm">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-full border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all shadow-inner"
          >
            <button
              type="button"
              className="p-2.5 text-slate-400 hover:text-primary hover:bg-white rounded-full transition-all"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400 min-w-0"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className={`
                p-2.5 rounded-full flex items-center justify-center transition-all duration-200
                ${message.trim()
                  ? "bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-dark transform hover:scale-105 active:scale-95"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }
              `}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              Powered by <span className="font-bold text-primary">NexKind AI</span>
            </span>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          group relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl shadow-primary/50 transition-all duration-300 z-50 overflow-hidden
          ${isOpen ? "rotate-90 hover:rotate-180" : "hover:scale-105"}
        `}
      >
        <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
          {isOpen ? (
            <X className="w-8 h-8 text-white" />
          ) : (
            <MessageSquare className="w-8 h-8 text-white" />
          )}
        </div>
      </button>
    </div>
  );
};

export default ChatbotWidget;
