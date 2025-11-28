
import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  language: string;
}

const TRANSLATIONS = {
  en: {
    title: "Client Portal Login",
    sub: "Access your investment dashboard, secure data room, and project status.",
    email_label: "Business Email",
    pass_label: "Password",
    login_btn: "Secure Login",
    processing: "Verifying Credentials...",
    security_note: "256-bit SSL Encrypted Connection"
  },
  de: {
    title: "Kundenportal Login",
    sub: "Zugriff auf Ihr Investment-Dashboard, sicheren Datenraum und Projektstatus.",
    email_label: "Geschäfts-E-Mail",
    pass_label: "Passwort",
    login_btn: "Sicher Anmelden",
    processing: "Anmeldeinformationen werden überprüft...",
    security_note: "256-Bit SSL-verschlüsselte Verbindung"
  },
  cn: {
    title: "客户门户登录",
    sub: "访问您的投资仪表盘、安全数据室和项目进度。",
    email_label: "企业邮箱",
    pass_label: "密码",
    login_btn: "安全登录",
    processing: "正在验证凭证...",
    security_note: "256位 SSL 加密连接"
  }
};

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, language }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      onLogin();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-950 p-8 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
                <X className="h-5 w-5" />
            </button>
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 border border-white/10">
                <Lock className="h-6 w-6 text-brand-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">{t.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t.sub}</p>
        </div>

        {/* Form */}
        <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.email_label}</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm font-medium"
                            placeholder="name@company.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.pass_label}</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                        <input 
                            type="password" 
                            required
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm font-medium"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" /> {t.processing}
                        </>
                    ) : (
                        <>
                            {t.login_btn} <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100 flex justify-center">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" /> {t.security_note}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
