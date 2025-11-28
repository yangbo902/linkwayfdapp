
import React, { useState } from 'react';
import { LayoutGrid, PieChart, FileText, Bell, Settings, Search, Plus, Filter, MoreHorizontal, ArrowUpRight, Clock, CheckCircle2, AlertCircle, Building2, Download, Zap, TrendingUp, ChevronRight, FolderOpen, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface DashboardPageProps {
  language: string;
  investmentMode: 'FDI' | 'ODI';
}

const TRANSLATIONS = {
  en: {
    welcome: "Welcome back, Alexander",
    role: "Senior Investment Manager",
    overview: "Portfolio Overview",
    active_projects: "Active Projects",
    pending_tasks: "Pending Tasks",
    new_opps: "New Opportunities",
    quick_actions: "Quick Actions",
    new_project: "New Project",
    schedule_call: "Schedule Call",
    recent_activity: "Recent Activity",
    ai_insight: "AI Market Alert"
  },
  de: {
    welcome: "Willkommen zurück, Alexander",
    role: "Senior Investment Manager",
    overview: "Portfolio Übersicht",
    active_projects: "Aktive Projekte",
    pending_tasks: "Ausstehende Aufgaben",
    new_opps: "Neue Chancen",
    quick_actions: "Schnellzugriff",
    new_project: "Neues Projekt",
    schedule_call: "Anruf planen",
    recent_activity: "Letzte Aktivitäten",
    ai_insight: "KI-Marktbericht"
  },
  cn: {
    welcome: "欢迎回来, Alexander",
    role: "高级投资经理",
    overview: "投资组合概览",
    active_projects: "活跃项目",
    pending_tasks: "待办事项",
    new_opps: "新商机",
    quick_actions: "快速操作",
    new_project: "新建项目",
    schedule_call: "预约会议",
    recent_activity: "近期动态",
    ai_insight: "AI 市场预警"
  }
};

export const DashboardPage: React.FC<DashboardPageProps> = ({ language, investmentMode }) => {
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;
  const isFDI = investmentMode === 'FDI';

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock Data
  const projects = [
    { id: 1, name: "Project Alpha (Baoying)", stage: "Site Selection", progress: 35, status: "On Track", update: "2h ago" },
    { id: 2, name: "Jiangsu EV Joint Venture", stage: "Legal Review", progress: 60, status: "Review", update: "1d ago" },
    { id: 3, name: "Logistics Hub Phase II", stage: "Gov Approval", progress: 90, status: "On Track", update: "2d ago" }
  ];

  return (
    <div className="pt-16 min-h-screen bg-slate-50 font-sans flex">
      
      {/* Sidebar (SaaS Style) */}
      <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-slate-900 border-r border-slate-800 z-30 transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
          <div className="p-6">
              <div className="flex items-center gap-3 px-3 py-2 bg-slate-800/50 rounded-xl mb-8 border border-slate-700">
                  <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xs">AL</div>
                  <div className="overflow-hidden">
                      <div className="text-sm font-bold text-white truncate">Acme Corp Ltd.</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Enterprise Plan</div>
                  </div>
              </div>

              <nav className="space-y-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium transition-colors">
                      <LayoutGrid className="h-4 w-4" /> {t.overview}
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                      <PieChart className="h-4 w-4" /> Analytics
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                      <FileText className="h-4 w-4" /> Documents <span className="ml-auto bg-slate-700 text-slate-300 text-[10px] px-1.5 rounded">3</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                      <Bell className="h-4 w-4" /> Alerts
                  </button>
              </nav>

              <div className="mt-8 pt-8 border-t border-slate-800">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">System</div>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                      <Settings className="h-4 w-4" /> Settings
                  </button>
              </div>
          </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                      <h1 className="text-2xl font-serif font-bold text-slate-900">{t.welcome}</h1>
                      <p className="text-slate-500 text-sm">{t.role} • {isFDI ? 'Inbound Strategy' : 'Global Expansion'}</p>
                  </div>
                  <div className="flex gap-3">
                      <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2">
                          {t.schedule_call}
                      </button>
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md hover:bg-slate-800 flex items-center gap-2">
                          <Plus className="h-4 w-4" /> {t.new_project}
                      </button>
                  </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><FolderOpen className="h-5 w-5" /></div>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+2 this week</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">3</div>
                      <div className="text-sm text-slate-500">{t.active_projects}</div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Clock className="h-5 w-5" /></div>
                          <span className="text-xs font-bold text-slate-400">Due Soon</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">5</div>
                      <div className="text-sm text-slate-500">{t.pending_tasks}</div>
                  </div>

                  <div className="bg-gradient-to-br from-brand-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden group cursor-pointer">
                      <div className="absolute top-0 right-0 p-4 opacity-10"><Zap className="h-24 w-24" /></div>
                      <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-4 text-brand-200 text-xs font-bold uppercase tracking-wider">
                              <Zap className="h-3 w-3" /> {t.ai_insight}
                          </div>
                          <h3 className="font-bold text-lg leading-tight mb-2">New Policy: Tech Tax Incentives in Baoying</h3>
                          <div className="flex items-center gap-2 text-xs font-medium text-brand-100 mt-4 group-hover:text-white transition-colors">
                              View Analysis <ArrowRight className="h-3 w-3" />
                          </div>
                      </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><TrendingUp className="h-5 w-5" /></div>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">12</div>
                      <div className="text-sm text-slate-500">{t.new_opps}</div>
                  </div>
              </div>

              {/* Main Split Layout */}
              <div className="grid lg:grid-cols-3 gap-8">
                  
                  {/* Left: Project List */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                          <h3 className="font-bold text-slate-900 text-lg">{t.active_projects}</h3>
                          <div className="flex gap-2">
                              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600"><Search className="h-4 w-4" /></button>
                              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600"><Filter className="h-4 w-4" /></button>
                          </div>
                      </div>
                      <div className="overflow-x-auto">
                          <table className="w-full text-sm text-left">
                              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                                  <tr>
                                      <th className="px-6 py-4">Project Name</th>
                                      <th className="px-6 py-4">Stage</th>
                                      <th className="px-6 py-4">Progress</th>
                                      <th className="px-6 py-4">Last Update</th>
                                      <th className="px-6 py-4"></th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                  {projects.map((p) => (
                                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                                          <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                                              <div className="w-8 h-8 rounded bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
                                                  {p.name.charAt(0)}
                                              </div>
                                              {p.name}
                                          </td>
                                          <td className="px-6 py-4">
                                              <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600 border border-slate-200">
                                                  {p.stage}
                                              </span>
                                          </td>
                                          <td className="px-6 py-4">
                                              <div className="flex items-center gap-3">
                                                  <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                      <div className={`h-full rounded-full ${p.progress > 75 ? 'bg-emerald-500' : 'bg-brand-500'}`} style={{width: `${p.progress}%`}}></div>
                                                  </div>
                                                  <span className="text-xs text-slate-500">{p.progress}%</span>
                                              </div>
                                          </td>
                                          <td className="px-6 py-4 text-slate-500">{p.update}</td>
                                          <td className="px-6 py-4 text-right">
                                              <button className="text-slate-400 hover:text-brand-600"><MoreHorizontal className="h-4 w-4" /></button>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                      <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
                          <button className="text-sm font-bold text-brand-600 hover:text-brand-700">View All Projects</button>
                      </div>
                  </div>

                  {/* Right: AI Feed & Tasks */}
                  <div className="space-y-6">
                      
                      {/* AI Feed */}
                      <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-20"><Zap className="h-20 w-20 text-brand-500" /></div>
                          <h3 className="font-bold mb-4 flex items-center gap-2 relative z-10">
                              <Settings className="h-4 w-4 text-brand-400 animate-spin-slow" /> System Intelligence
                          </h3>
                          <div className="space-y-4 relative z-10">
                              <div className="p-3 bg-white/10 rounded-xl border border-white/5 hover:bg-white/20 transition-colors cursor-pointer">
                                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Opportunity</div>
                                  <p className="text-sm font-medium leading-snug">New industrial land released in Zone B matching your "Automotive" criteria.</p>
                              </div>
                              <div className="p-3 bg-white/10 rounded-xl border border-white/5 hover:bg-white/20 transition-colors cursor-pointer">
                                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">Compliance</div>
                                  <p className="text-sm font-medium leading-snug">Updated environmental regulations for 2025 published. View impact analysis.</p>
                              </div>
                          </div>
                      </div>

                      {/* Recent Files */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                          <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Recent Documents</h3>
                          <div className="space-y-3">
                              {[
                                  { name: "Investment_Memo_v2.pdf", size: "2.4 MB", date: "Today" },
                                  { name: "Site_Plan_Cad_Final.dwg", size: "18 MB", date: "Yesterday" },
                                  { name: "Legal_Due_Diligence.docx", size: "1.1 MB", date: "Oct 24" }
                              ].map((file, i) => (
                                  <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                                      <div className="p-2 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors"><FileText className="h-4 w-4" /></div>
                                      <div className="flex-1 min-w-0">
                                          <div className="text-sm font-bold text-slate-700 truncate group-hover:text-brand-700">{file.name}</div>
                                          <div className="text-xs text-slate-400">{file.size} • {file.date}</div>
                                      </div>
                                      <Download className="h-4 w-4 text-slate-300 group-hover:text-brand-500" />
                                  </div>
                              ))}
                          </div>
                      </div>

                  </div>
              </div>

          </div>
      </main>
    </div>
  );
};
