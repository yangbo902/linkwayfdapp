
export type Page = 'home' | 'about' | 'projects' | 'partners' | 'legal' | 'industry' | 'careers' | 'resources' | 'privacy' | 'terms' | 'slavery' | 'contact' | 'sitemap' | 'services' | 'methodology' | 'capabilities' | 'ecosystem';

export type IndustryId = 'smart-grid' | 'automotive' | 'manufacturing' | 'foods';

export enum ServiceType {
  FDI = 'Foreign Direct Investment',
  ODI = 'Outward Direct Investment'
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  type: ServiceType;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  sector: string;
  value: string;
  description: string;
  tags: string[];
  status: 'Open' | 'Closing Soon' | 'Vetted' | 'Completed';
  investmentType: 'FDI' | 'ODI';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  quote?: string;
  image: string;
  social: {
    linkedin?: string;
    email?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    image: string;
  };
}
