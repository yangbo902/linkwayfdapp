
import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Users, Zap, Building, ArrowRight, RefreshCcw, TrendingDown, BarChart3, PieChart, Download, MoveRight, Sliders } from 'lucide-react';

interface CostEstimatorProps {
  language: string;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ language }) => {
  const [landSize, setLandSize] = useState(50); 
  const [employees, setEmployees] = useState(100); 
  const [power, setPower] = useState(50000); 
  const [industry, setIndustry] = useState('manufacturing');
  const [isAnimating, setIsAnimating] = useState(false);

  // Benchmarks (Tier 1 City vs Baoying)
  const BENCHMARKS = {
    land: { tier1: 450000, baoying: 168000 }, 
    labor: { tier1: 10500, baoying: 6200 },   
    power: { tier1: 0.85, baoying: 0.62 },    
  };

  const calculate = () => {
    const landCostT1 = landSize * BENCHMARKS.land.tier1;
    const landCostBY = landSize * BENCHMARKS.land.baoying;
    
    const laborCostT1 = employees * BENCHMARKS.labor.tier1 * 12;
    const laborCostBY = employees * BENCHMARKS.labor.baoying * 12;
    
    const powerCostT1 = power * BENCHMARKS.power.tier1 * 12;
    const powerCostBY = power * BENCHMARKS.power.baoying * 12;

    const totalAnnualT1 = laborCostT1 + powerCostT1;
    const totalAnnualBY = laborCostBY + powerCostBY;

    return {
      capex: { t1: landCostT1, by: landCostBY, save: landCostT1 - landCostBY },
      opex: { t1: totalAnnualT1, by: totalAnnualBY, save: totalAnnualT1 - totalAnnualBY }
    };
  };

  const results = calculate();
  const fmt = (val: number) => `¥${(val / 1000000).toFixed(2)}M`;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [landSize, employees, power]);

  return (
    <section className="py-24 bg-slate-950 text-white border-t border-slate-900 relative overflow-hidden">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-500/20 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]">
                  <Calculator className="h-3 w-3" /> ROI Calculator
               </div>
               <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-2 leading-tight">
                 Cost Efficiency Engine
               </h2>
               <p className="text-slate-400 text-lg">Compare operational costs in real-time.</p>
            </div>
            
            <button 
                onClick={() => { setLandSize(50); setEmployees(100); setPower(50000); }}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white transition-colors mt-6 md:mt-0 group"
            >
                <RefreshCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" /> Reset
            </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Controls Panel */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
                
                <div className="flex items-center gap-2 mb-6 text-sm font-bold text-slate-300">
                    <Sliders className="h-4 w-4" /> Parameters
                </div>

                {/* Industry Select */}
                <div className="mb-8">
                    <div className="grid grid-cols-2 gap-2">
                        {['manufacturing', 'chemical', 'logistics', 'data'].map(ind => (
                            <button
                                key={ind}
                                onClick={() => setIndustry(ind)}
                                className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all duration-200 ${
                                    industry === ind 
                                    ? 'bg-white text-slate-900 border-white' 
                                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                                }`}
                            >
                                {ind}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Land Slider */}
                    <div className="group/slider">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Land</label>
                            <span className="text-sm font-mono font-bold text-brand-400">{landSize} Mu</span>
                        </div>
                        <input 
                            type="range" min="20" max="500" step="10" 
                            value={landSize} onChange={(e) => setLandSize(Number(e.target.value))}
                            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400"
                        />
                    </div>

                    {/* Employees Slider */}
                    <div className="group/slider">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Staff</label>
                            <span className="text-sm font-mono font-bold text-brand-400">{employees} FTE</span>
                        </div>
                        <input 
                            type="range" min="50" max="2000" step="50" 
                            value={employees} onChange={(e) => setEmployees(Number(e.target.value))}
                            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400"
                        />
                    </div>

                    {/* Power Slider */}
                    <div className="group/slider">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Power</label>
                            <span className="text-sm font-mono font-bold text-brand-400">{(power/1000).toFixed(0)}k kWh</span>
                        </div>
                        <input 
                            type="range" min="10000" max="1000000" step="10000" 
                            value={power} onChange={(e) => setPower(Number(e.target.value))}
                            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400"
                        />
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                    <button className="w-full py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-500 transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-brand-900/20">
                        <Download className="h-4 w-4" /> Download Report
                    </button>
                </div>
            </div>

            {/* Visualization Panel */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* Metrics Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 relative overflow-hidden">
                        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Annual OPEX Savings</div>
                        <div className={`text-4xl font-mono font-bold text-white mb-2 transition-all duration-300 ${isAnimating ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
                            {fmt(results.opex.save)}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">vs Tier 1 Coastal Cities</div>
                        
                        <div className="absolute right-0 bottom-0 opacity-10">
                            <TrendingDown className="h-24 w-24 text-white" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 relative overflow-hidden">
                        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Initial CAPEX Savings</div>
                        <div className={`text-4xl font-mono font-bold text-white mb-2 transition-all duration-300 ${isAnimating ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
                            {fmt(results.capex.save)}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">Land & Setup Differential</div>
                         <div className="absolute right-0 bottom-0 opacity-10">
                            <Building className="h-24 w-24 text-white" />
                        </div>
                    </div>
                </div>

                {/* Bars */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative">
                     <div className="mb-6 flex justify-between items-center">
                        <h3 className="font-bold text-white text-sm uppercase tracking-wide">Comparison Breakdown</h3>
                        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-700 rounded-full"></div> Benchmark</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-500 rounded-full"></div> Baoying</div>
                        </div>
                     </div>

                     <div className="space-y-6">
                        {/* OPEX */}
                        <div>
                             <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono">
                                <span>OPEX</span>
                                <span>-{((1 - results.opex.by / results.opex.t1) * 100).toFixed(0)}%</span>
                             </div>
                             <div className="h-10 bg-slate-800 rounded flex overflow-hidden">
                                 <div style={{ width: `${(results.opex.by / results.opex.t1) * 100}%` }} className="bg-brand-500 h-full transition-all duration-500"></div>
                             </div>
                             <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-mono">
                                 <span>{fmt(results.opex.by)}</span>
                                 <span>{fmt(results.opex.t1)}</span>
                             </div>
                        </div>

                         {/* CAPEX */}
                        <div>
                             <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono">
                                <span>CAPEX</span>
                                <span>-{((1 - results.capex.by / results.capex.t1) * 100).toFixed(0)}%</span>
                             </div>
                             <div className="h-10 bg-slate-800 rounded flex overflow-hidden">
                                 <div style={{ width: `${(results.capex.by / results.capex.t1) * 100}%` }} className="bg-blue-500 h-full transition-all duration-500"></div>
                             </div>
                             <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-mono">
                                 <span>{fmt(results.capex.by)}</span>
                                 <span>{fmt(results.capex.t1)}</span>
                             </div>
                        </div>
                     </div>
                </div>

            </div>

        </div>

      </div>
    </section>
  );
};
