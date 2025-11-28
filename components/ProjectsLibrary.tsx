
import React, { useState, useEffect } from 'react';
import { Search, Lock, Crown, ArrowRight, Building2, MapPin, DollarSign, Loader2, CheckCircle, ArrowDownToLine, Clock, ShieldCheck, PlaneTakeoff, Filter, Factory, LandPlot, ExternalLink, Briefcase, SlidersHorizontal, Tag, Globe2, Briefcase as BriefcaseIcon, Coins, History, LayoutGrid } from 'lucide-react';
import { Project } from '../types';
import { ProjectDetails } from './ProjectDetails';

interface ProjectsLibraryProps {
  isPremium: boolean;
  onUnlockPremium: () => void;
  initialSector?: string;
  language: string;
  investmentMode: 'FDI' | 'ODI';
  onModeChange: (mode: 'FDI' | 'ODI') => void;
}

// EXTENDED DATASET INCLUDING ODI TARGETS AND COMPLETED PROJECTS
const SAMPLE_PROJECTS: Project[] = [
  // --- FDI PROJECTS (Active) ---
  {
    id: 'p1',
    name: 'Baoying Economic Dev Zone - Plot A1',
    location: 'Baoying EDZ, Jiangsu',
    sector: 'High-End Equipment',
    value: 'Land 150 Mu',
    description: 'Prime industrial land zoned for advanced manufacturing. Adjacent to the new High-Speed Railway station.',
    tags: ['Greenfield', 'Utilities Ready'],
    status: 'Open',
    investmentType: 'FDI'
  },
  {
    id: 'p2',
    name: 'Intelligent Electrical Appliance Park',
    location: 'Liubao Industrial Park',
    sector: 'Electrical Engineering',
    value: 'Standard Factory',
    description: 'Move-in ready standard workshops (3,000 - 10,000 sqm) specifically designed for transformer and cable manufacturing.',
    tags: ['Standard Factory', 'Lease/Buy'],
    status: 'Vetted',
    investmentType: 'FDI'
  },
  {
    id: 'p3',
    name: 'Auto Parts Industry Base',
    location: 'Baoying EDZ',
    sector: 'Automotive',
    value: 'JV Opportunity',
    description: 'Existing facility looking for European JV partner for EV thermal management component production.',
    tags: ['Brownfield', 'Joint Venture'],
    status: 'Closing Soon',
    investmentType: 'FDI'
  },
  {
    id: 'p4',
    name: 'Organic Food Processing Center',
    location: 'Baoying Agricultural Zone',
    sector: 'Ecological Foods',
    value: 'Land 80 Mu',
    description: 'Dedicated zone for food processing with abundant clean water supply and cold chain logistics support.',
    tags: ['Food Grade', 'Greenfield'],
    status: 'Open',
    investmentType: 'FDI'
  },
  
  // --- FDI PROJECTS (Completed / Track Record) ---
  {
    id: 'pc1',
    name: 'German Hydraulic Components Plant',
    location: 'Baoying EDZ',
    sector: 'Advanced Manufacturing',
    value: '€45M Invest',
    description: 'Successfully established WFOE and constructed 20,000 sqm facility. Operational since 2022.',
    tags: ['Completed', 'Greenfield'],
    status: 'Completed',
    investmentType: 'FDI'
  },
  {
    id: 'pc2',
    name: 'Sino-Italian Textile JV',
    location: 'Sheyanghu Town',
    sector: 'Manufacturing',
    value: '¥120M',
    description: 'Joint venture formation and technology transfer for high-end textile machinery.',
    tags: ['Completed', 'JV'],
    status: 'Completed',
    investmentType: 'FDI'
  },

  // --- ODI PROJECTS (Active) ---
  {
    id: 'o1',
    name: 'Project "Optics": Precision Lens Mfr',
    location: 'Jena, Germany',
    sector: 'Advanced Manufacturing',
    value: '€45M - €60M',
    description: 'Hidden champion in precision optics for medical and industrial applications. 100% Share Deal. Owner retiring.',
    tags: ['M&A', 'Buyout', 'High Tech'],
    status: 'Vetted',
    investmentType: 'ODI'
  },
  {
    id: 'o2',
    name: 'Project "Volt": EV Charging Network',
    location: 'Netherlands / Nordics',
    sector: 'Automotive / Energy',
    value: 'Series B Lead',
    description: 'Fast-growing EV charging operator looking for strategic investor to fund expansion into Southern Europe.',
    tags: ['Minority Stake', 'Growth Capital'],
    status: 'Open',
    investmentType: 'ODI'
  },
  {
    id: 'o3',
    name: 'MedTech Patent Portfolio (Cardio)',
    location: 'Zurich, Switzerland',
    sector: 'Healthcare',
    value: 'Asset Sale',
    description: 'Acquisition of IP portfolio related to minimally invasive cardiac surgery devices. FDA approved.',
    tags: ['IP Acquisition', 'Tech Transfer'],
    status: 'Closing Soon',
    investmentType: 'ODI'
  },
  
  // --- ODI PROJECTS (Completed / Track Record) ---
  {
    id: 'oc1',
    name: 'Acquisition of French Robotics Integrator',
    location: 'Lyon, France',
    sector: 'Robotics',
    value: '€28M',
    description: 'Full acquisition by Jiangsu-based automation group. Regulatory approval secured in 4 months.',
    tags: ['Completed', 'M&A'],
    status: 'Completed',
    investmentType: 'ODI'
  },
  {
    id: 'oc2',
    name: 'R&D Center Establishment',
    location: 'Munich, Germany',
    sector: 'Automotive',
    value: 'Greenfield',
    description: 'Site selection and HR setup for the European R&D HQ of a leading Chinese EV battery maker.',
    tags: ['Completed', 'Expansion'],
    status: 'Completed',
    investmentType: 'ODI'
  }
];

export const ProjectsLibrary: React.FC<ProjectsLibraryProps> = ({ isPremium, onUnlockPremium, initialSector, language, investmentMode, onModeChange }) => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterSector, setFilterSector] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'active' | 'past'>('active');
  
  // Reset filters when mode changes
  useEffect(() => {
      setFilterSector('All');
      setSearchQuery('');
  }, [investmentMode, viewMode]);

  const filteredProjects = SAMPLE_PROJECTS.filter(p => {
    // 1. Filter by Deal Type (FDI vs ODI)
    if (p.investmentType !== investmentMode) return false;

    // 2. Filter by Status (Active vs Completed)
    if (viewMode === 'active' && p.status === 'Completed') return false;
    if (viewMode === 'past' && p.status !== 'Completed') return false;

    // 3. Filter by Sector
    const matchesSector = filterSector === 'All' || p.sector.includes(filterSector) || p.tags.some(t => t.includes(filterSector));
    
    // 4. Filter by Search
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSector && matchesSearch;
  });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setView('detail');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedProject(null);
  };

  // Dynamic Filters based on Deal Type
  const FDI_FILTERS = ['All', 'Land', 'Factory', 'Automotive', 'Equipment', 'Food'];
  const ODI_FILTERS = ['All', 'M&A', 'Tech', 'Healthcare', 'Automotive', 'Minority Stake'];

  const currentFilters = investmentMode === 'FDI' ? FDI_FILTERS : ODI_FILTERS;
  const dealType = investmentMode;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans transition-colors duration-500">
      
      {view === 'list' && (
        <div className="container mx-auto px-6">
          
          {/* Header Section */}
          <div className="mb-12 flex flex-col lg:flex-row justify-between items-end gap-8">
            <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${
                    dealType === 'FDI' ? 'bg-brand-50 text-brand-600 border-brand-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                }`}>
                     {dealType === 'FDI' ? <ArrowDownToLine className="h-3 w-3" /> : <PlaneTakeoff className="h-3 w-3" />}
                     {dealType === 'FDI' ? 'Inbound Investment' : 'Outbound Investment'}
                </div>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-4">
                    Investment Portfolio
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
                    {dealType === 'FDI' 
                        ? "Explore available industrial assets in Baoying or review our track record of successful foreign enterprise establishments."
                        : "Browse exclusive global M&A targets or analyze our history of helping Chinese firms expand internationally."
                    }
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                {/* Active vs Past Toggle */}
                <div className="bg-slate-200 p-1 rounded-xl flex">
                    <button
                        onClick={() => setViewMode('active')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                            viewMode === 'active'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <LayoutGrid className="h-3 w-3" /> Active Deals
                    </button>
                    <button
                        onClick={() => setViewMode('past')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                            viewMode === 'past'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <History className="h-3 w-3" /> Track Record
                    </button>
                </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-8 flex flex-col xl:flex-row gap-4 items-center justify-between sticky top-24 z-30 transition-all">
             
             {/* Search */}
             <div className="relative w-full xl:w-96">
                 <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                 <input 
                    type="text"
                    placeholder={dealType === 'FDI' ? "Search land, factories..." : "Search targets, assets..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 transition-all font-medium text-sm text-slate-900 ${
                        dealType === 'FDI' ? 'focus:border-brand-500 focus:ring-brand-500' : 'focus:border-emerald-500 focus:ring-emerald-500'
                    }`}
                 />
             </div>

             <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto overflow-x-auto">
                 
                 {/* Mode Toggle */}
                 <div className="flex bg-slate-100 p-1 rounded-lg flex-shrink-0">
                    <button 
                        onClick={() => onModeChange('FDI')}
                        className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${
                            dealType === 'FDI' 
                            ? 'bg-white text-brand-600 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <ArrowDownToLine className="h-3 w-3" /> FDI
                    </button>
                    <button 
                        onClick={() => onModeChange('ODI')}
                        className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${
                            dealType === 'ODI' 
                            ? 'bg-white text-emerald-600 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <PlaneTakeoff className="h-3 w-3" /> ODI
                    </button>
                 </div>

                 <div className="w-px h-8 bg-slate-200 hidden md:block"></div>

                 {/* Filters */}
                 <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
                     <div className="flex items-center gap-2 px-3 py-2 border-r border-slate-100 mr-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">
                        <Filter className="h-3 w-3" /> Sector
                     </div>
                     {currentFilters.map(sector => (
                        <button
                            key={sector}
                            onClick={() => setFilterSector(sector)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border whitespace-nowrap ${
                                filterSector === sector 
                                ? (dealType === 'FDI' ? 'bg-brand-600 text-white border-brand-600' : 'bg-emerald-600 text-white border-emerald-600')
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {sector}
                        </button>
                     ))}
                 </div>
             </div>
          </div>

          {/* Data Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className={`group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full relative ${
                      dealType === 'FDI' ? 'hover:border-brand-300' : 'hover:border-emerald-300'
                  }`}
                >
                  {/* Status Stripe */}
                  <div className={`h-1 w-full ${
                      project.status === 'Completed' 
                      ? 'bg-slate-400' 
                      : (project.investmentType === 'FDI' ? 'bg-brand-500' : 'bg-emerald-500')
                  }`}></div>

                  <div className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 ${
                            project.investmentType === 'FDI' 
                            ? 'bg-brand-50 text-brand-700 border-brand-100' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                            {project.investmentType === 'FDI' ? <MapPin className="h-3 w-3"/> : <Globe2 className="h-3 w-3"/>}
                            {project.investmentType === 'FDI' ? 'Local Asset' : 'Global Target'}
                        </div>
                        <div className="flex gap-2">
                             {project.status === 'Open' && (
                                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Active
                                 </div>
                             )}
                             {project.status === 'Vetted' && <Lock className="h-4 w-4 text-amber-500" />}
                             {project.status === 'Closing Soon' && (
                                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                                     <Clock className="h-3 w-3" /> Closing
                                 </div>
                             )}
                             {project.status === 'Completed' && (
                                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                     <CheckCircle className="h-3 w-3" /> Success
                                 </div>
                             )}
                        </div>
                    </div>

                    <h3 className={`text-lg font-display font-bold text-slate-900 mb-2 leading-tight transition-colors ${
                        dealType === 'FDI' ? 'group-hover:text-brand-600' : 'group-hover:text-emerald-600'
                    }`}>
                      {project.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
                        {project.investmentType === 'FDI' ? <MapPin className="h-3.5 w-3.5 text-slate-400" /> : <Globe2 className="h-3.5 w-3.5 text-slate-400" />}
                        {project.location}
                    </div>

                    {/* Deal Specs Grid */}
                    <div className="grid grid-cols-2 gap-px bg-slate-100 rounded-lg overflow-hidden border border-slate-200 mb-6">
                        <div className="bg-slate-50 p-3">
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Sector</div>
                            <div className="text-xs font-bold text-slate-900 truncate">{project.sector}</div>
                        </div>
                        <div className="bg-slate-50 p-3">
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                                {project.status === 'Completed' ? 'Deal Volume' : 'Valuation'}
                            </div>
                            <div className="text-xs font-bold text-slate-900 font-mono truncate">{project.value}</div>
                        </div>
                    </div>

                    <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed flex-grow">
                        {project.description}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                        <div className="flex gap-2">
                             {project.tags.slice(0, 2).map(tag => (
                                 <span key={tag} className="flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">
                                     <Tag className="h-3 w-3" /> {tag}
                                 </span>
                             ))}
                        </div>
                        <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 transition-all ${
                            dealType === 'FDI' 
                            ? 'group-hover:bg-brand-600 group-hover:text-white' 
                            : 'group-hover:bg-emerald-600 group-hover:text-white'
                        }`}>
                             <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-24 text-center opacity-60">
                 <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                     <Search className="h-8 w-8 text-slate-400" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900">No projects found</h3>
                 <p className="text-slate-500 max-w-xs mt-2">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detail View */}
      {view === 'detail' && selectedProject && (
        <ProjectDetails 
            project={selectedProject} 
            isPremium={isPremium} 
            onBack={handleBackToList} 
            onUnlock={onUnlockPremium} 
            language={language}
        />
      )}

    </div>
  );
};
