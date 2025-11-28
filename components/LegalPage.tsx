
import React from 'react';
import { Shield, FileText, Scale, Map, ArrowRight, LayoutGrid, ExternalLink } from 'lucide-react';

interface LegalPageProps {
  type: string;
  language: string;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, language }) => {
  const getContent = () => {
    switch(type) {
      case 'privacy':
        return {
          title: "Global Privacy Policy",
          icon: Shield,
          date: "Last Updated: October 15, 2023",
          content: (
            <div className="space-y-6 text-slate-600">
              <p>At LinkwayFDI ("The Firm"), we recognize that privacy is fundamental to maintaining trust with our investors, partners, and employees. This Global Privacy Policy describes how we collect, use, and protect your personal data across all jurisdictions where we operate.</p>
              
              <h3 className="text-xl font-bold text-slate-900 mt-8">1. Data Collection & Usage</h3>
              <p>We collect information that you provide directly to us, including contact details, professional credentials, and financial data relevant to our investment services. We use this data to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide strategic FDI/ODI advisory services.</li>
                <li>Execute regulatory compliance checks and risk assessments.</li>
                <li>Facilitate communication regarding project milestones.</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 mt-8">2. Cross-Border Data Transfer</h3>
              <p>As a global operation, your data may be transferred to and processed in countries other than your country of residence. We implement robust legal mechanisms, such as Standard Contractual Clauses (SCCs), to ensure your data remains protected in compliance with GDPR, CCPA, and other regional laws.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">3. AI & Automated Processing</h3>
              <p>We utilize generative AI models to analyze market trends. Personal data is anonymized before being processed by our AI systems to ensure confidentiality and prevent unauthorized model training.</p>
            </div>
          )
        };
      case 'terms':
        return {
          title: "Terms of Engagement",
          icon: Scale,
          date: "Effective Date: January 1, 2024",
          content: (
            <div className="space-y-6 text-slate-600">
              <p>These Terms of Engagement govern the professional relationship between LinkwayFDI ("The Firm") and its investors ("The Investor").</p>
              
              <h3 className="text-xl font-bold text-slate-900 mt-8">1. Scope of Services</h3>
              <p>The Firm agrees to provide strategic consultancy, market intelligence, and regulatory advisory services as outlined in the specific Project Investment Agreement. Any services outside this agreement may be subject to separate terms.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">2. Confidentiality</h3>
              <p>Both parties agree to maintain strict confidentiality regarding all proprietary information, trade secrets, and strategic plans shared during the engagement. This obligation survives the termination of the agreement.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">3. Limitation of Liability</h3>
              <p>While The Firm utilizes expert analysis to provide recommendations, The Investor acknowledges that all investment decisions involve risk. The Firm provides guidance based on current policy but is not liable for market fluctuations affecting project outcomes.</p>
            </div>
          )
        };
      case 'slavery':
        return {
          title: "Modern Slavery Statement",
          icon: FileText,
          date: "Fiscal Year 2024",
          content: (
            <div className="space-y-6 text-slate-600">
              <p>LinkwayFDI maintains a zero-tolerance approach to modern slavery and human trafficking. We are committed to acting ethically and with integrity in all our business dealings and relationships.</p>
              
              <h3 className="text-xl font-bold text-slate-900 mt-8">1. Our Structure & Supply Chain</h3>
              <p>We are a consultancy entity with offices in Europe and Asia. Our supply chain primarily consists of highly skilled professionals and infrastructure providers. We consider the risk of modern slavery within our direct operations to be low.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">2. Due Diligence Processes</h3>
              <p>Despite the low risk, we implement the following measures:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Rigorous vetting of all third-party vendors and partners.</li>
                <li>Mandatory ethics training for all employees.</li>
                <li>Whistleblowing channels for reporting concerns anonymously.</li>
              </ul>
            </div>
          )
        };
      case 'sitemap':
        return {
          title: "Site Navigation",
          icon: LayoutGrid,
          date: "Overview",
          content: (
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Core</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-brand-600 hover:underline flex items-center gap-2"><ExternalLink className="h-3 w-3"/> Home</a></li>
                  <li><a href="#" className="text-brand-600 hover:underline flex items-center gap-2"><ExternalLink className="h-3 w-3"/> About Us</a></li>
                  <li><a href="#" className="text-brand-600 hover:underline flex items-center gap-2"><ExternalLink className="h-3 w-3"/> Contact</a></li>
                </ul>
              </div>
              <div>
                 <h3 className="font-serif text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Solutions</h3>
                 <ul className="space-y-3 text-slate-600">
                    <li>Foreign Direct Investment (FDI)</li>
                    <li>Outward Direct Investment (ODI)</li>
                    <li>Regulatory Compliance</li>
                    <li>Corporate Structuring</li>
                    <li>Market Intelligence</li>
                 </ul>
              </div>
              <div>
                 <h3 className="font-serif text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Resources</h3>
                 <ul className="space-y-3 text-slate-600">
                    <li>Investment Library (Projects)</li>
                    <li>Partner Success Stories</li>
                    <li>Careers</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                 </ul>
              </div>
            </div>
          )
        };
      default:
        return { title: "Page Not Found", icon: FileText, date: "", content: <p>Content unavailable.</p> };
    }
  };

  const data = getContent();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 max-w-4xl animate-fade-in-up">
        <div className="mb-12 pb-8 border-b border-slate-200">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
            <data.icon className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">{data.title}</h1>
          {data.date && <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">{data.date}</p>}
        </div>
        
        <div className="prose prose-slate prose-lg max-w-none">
          {data.content}
        </div>

        {type !== 'sitemap' && (
            <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h4 className="font-bold text-slate-900 mb-2">Have questions about our policies?</h4>
                    <p className="text-slate-500 text-sm">Our compliance team is available to provide further clarification.</p>
                </div>
                <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:border-brand-500 hover:text-brand-600 transition-all shadow-sm flex items-center gap-2">
                    Contact Legal Team <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
