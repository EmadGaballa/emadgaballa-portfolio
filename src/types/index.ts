export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  tagline: string;
  type: string;
  heroImage: string;
  screenshots: Screenshot[];
  overview: string;
  problem?: string;
  objectives?: string[];
  designProcess?: string;
  architecture?: string;
  challenges?: string[];
  solutions?: string[];
  features: Feature[];
  techStack: string[];
  lessons?: string;
  future?: string;
  liveUrl: string;
  githubUrl: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  label: string;
}

export interface Feature {
  number: string;
  name: string;
  description: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  level?: number;
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'architecture'
  | 'design'
  | 'tools'
  | 'devops';

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'career' | 'milestone';
}

export interface ContactInfo {
  label: string;
  value: string;
  href: string;
  icon: string;
}

export interface NavItem {
  path: string;
  labelKey: string;
}

export type Theme = 'dark' | 'light';
export type Lang = 'en' | 'ar';

export interface PortfolioData {
  name: string;
  initials: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  resume: string;
  availability: string;
}