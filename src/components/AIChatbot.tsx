import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { analyzeCivicText } from '../data/mockData';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  HelpCircle, 
  CheckCircle, 
  ArrowRight,
  RefreshCw,
  Lightbulb
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  categorySuggestion?: {
    category: string;
    priority: string;
    titleSuggestion: string;
    description: string;
  };
}

export const AIChatbot: React.FC = () => {
  const { isAiChatOpen, toggleAiChat, prefillComplaintForm, language } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: language === 'hi' 
        ? 'नमस्ते! मैं क्लीन सिटी एआई सहायक हूँ। मैं आपकी नागरिक शिकायत का सही वर्गीकरण करने, उपयुक्त शीर्षक व विवरण सुझाने और स्थिति समझने में सहायता कर सकता हूँ।'
        : language === 'gu'
        ? 'નમસ્તે! હું ક્લીન સિટી એઆઈ સહાયક છું. હું તમારી ફરિયાદનું યોગ્ય વર્ગીકરણ કરવા, શીર્ષક અને વર્ણન સૂચવવા તેમજ સ્ટેટસ સમજાવવામાં મદદ કરી શકું છું.'
        : 'Hello! I am your Clean City AI Assistant. I can help categorize your civic problem, suggest a clear complaint title and description, detect priority, or explain complaint statuses.',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Which category does my issue belong to?',
    'Help me draft a pothole complaint',
    'What does "Under Verification" status mean?',
    'Water pipe leaking heavily outside my home',
    'Streetlights not working on our road'
  ];

  useEffect(() => {
    if (isAiChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiChatOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // AI Response generation logic
    setTimeout(() => {
      const lower = query.toLowerCase();
      let botReply = '';
      let categorySuggestion: ChatMessage['categorySuggestion'] = undefined;

      if (lower.includes('status') || lower.includes('under verification') || lower.includes('assigned') || lower.includes('timeline')) {
        botReply = 'Here is how complaint statuses work:\n• **Submitted**: Received by portal system.\n• **Under Verification**: Control room checks severity, duplicates, and ward boundary.\n• **Assigned**: Dispatched to the specific municipal engineer or sanitation inspector.\n• **In Progress**: Field work, repair truck, or crew mobilized on-site.\n• **Resolved**: Issue repaired, verified, and photo evidence recorded.';
      } else if (lower.includes('how to report') || lower.includes('how do i submit') || lower.includes('register complaint')) {
        botReply = 'To submit a complaint:\n1. Click on "+ New Complaint" in the dashboard.\n2. Write a clear title and description.\n3. Our AI will automatically categorize and recommend the priority level.\n4. Click "Detect GPS Location" or select your Ward.\n5. Attach a clear photo showing the issue and surroundings.\n6. Click Submit to receive your tracking ID (e.g. CC-49452).';
      } else {
        // Run civic text analysis
        const analysis = analyzeCivicText(query);
        const titleGen = query.length > 25 
          ? query.charAt(0).toUpperCase() + query.slice(1)
          : `${analysis.category} issue reported at civic location`;

        categorySuggestion = {
          category: analysis.category,
          priority: analysis.priority,
          titleSuggestion: titleGen,
          description: query
        };

        botReply = `Based on your description, this belongs to **${analysis.category}** with **${analysis.priority} Priority**.\n\n` +
          `• **Recommended Category**: ${analysis.category}\n` +
          `• **Suggested Priority**: ${analysis.priority}\n` +
          `• **AI Advice**: ${analysis.reason}\n\n` +
          `You can directly transfer these details into the complaint form with the button below!`;
      }

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        categorySuggestion
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleApplyToForm = (suggestion: NonNullable<ChatMessage['categorySuggestion']>) => {
    prefillComplaintForm(suggestion.category, suggestion.titleSuggestion);
    toggleAiChat(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      {!isAiChatOpen && (
        <button
          id="ai-chatbot-floating-toggle"
          onClick={() => toggleAiChat(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all duration-300 hover:scale-105 cursor-pointer border border-emerald-500/40"
          aria-label="Open Clean City AI Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-emerald-800 rounded-full animate-pulse"></span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold uppercase tracking-wider">AI Assistant</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>
            <p className="text-[10px] text-emerald-100 font-medium">Categorize & Guide</p>
          </div>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isAiChatOpen && (
        <div 
          id="ai-chatbot-window"
          className="w-[92vw] sm:w-[400px] h-[540px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="bg-emerald-800 text-white px-4 py-3.5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 border border-emerald-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-tight">Clean City AI Assistant</h3>
                  <span className="px-1.5 py-0.2 bg-emerald-700 text-[10px] rounded font-semibold text-emerald-200">
                    Smart AI
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200">Categorization & Grievance Guidance</p>
              </div>
            </div>
            <button
              id="ai-chatbot-close-btn"
              onClick={() => toggleAiChat(false)}
              className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-700/60 transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Carousel / Pills */}
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                id={`ai-quick-prompt-${idx}`}
                onClick={() => handleSend(prompt)}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50 transition-colors flex-shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-br-xs shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line font-medium">{msg.text}</div>

                  {/* If the message has an AI category suggestion card */}
                  {msg.categorySuggestion && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 bg-emerald-50/60 -mx-1 p-2 rounded-lg">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-900 mb-1">
                        <span>AI Suggestion:</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold">
                          {msg.categorySuggestion.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleApplyToForm(msg.categorySuggestion!)}
                        className="w-full mt-1.5 py-1.5 px-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Apply to Complaint Form</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 p-2.5 rounded-2xl rounded-bl-xs text-xs text-slate-500 flex items-center gap-1.5 shadow-xs">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>AI Assistant analyzing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                id="ai-chatbot-input"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Describe issue (e.g. broken streetlight on MG road)..."
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
              <button
                id="ai-chatbot-send-btn"
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:hover:bg-emerald-700 text-white transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-slate-400 text-center mt-1.5">
              Powered by Clean City Municipal AI Classifier
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
