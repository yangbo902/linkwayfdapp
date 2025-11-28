
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { generateInvestmentAdvice } from '../services/geminiService';

interface AIConsultantProps {
  language: string;
}

export const AIConsultant: React.FC<AIConsultantProps> = ({ language }) => {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Welcome to LinkwayFDI. I am your strategic investment assistant. How can I help you with your cross-border expansion today?',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const prompt = `As an expert consultant for LinkwayFDI (a cross-border investment firm between Europe and Asia), answer this question briefly: "${userMsg.text}". Focus on FDI/ODI strategies.`;
      const responseText = await generateInvestmentAdvice(prompt);
      const modelMsg = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        
        <div className="lg:w-1/2">
          <div className="flex items-center gap-2 mb-4 text-brand-300">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">AI Strategy Assistant</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Instant Investment <br /> Intelligence
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Need quick insights on regulatory frameworks, market entry requirements, or industry trends? Our AI model is trained on global investment data to provide preliminary guidance.
          </p>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[400px]">
            <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-3">
              <div className="p-2 bg-brand-600 rounded-full">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Linkway AI</h4>
                <p className="text-xs text-slate-400">Online</p>
              </div>
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.role === 'user' ? 'bg-brand-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-slate-700 p-3 rounded-2xl rounded-bl-none">
                      <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-slate-800 border-t border-slate-700 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about China market entry..."
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-full py-3 pl-4 pr-12 focus:outline-none focus:border-brand-500"
              />
              <button onClick={handleSend} disabled={isLoading} className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-400 hover:text-white transition-colors">
                 <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
