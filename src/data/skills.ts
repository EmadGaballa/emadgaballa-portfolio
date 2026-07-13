import { Skill } from '@/types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React.js', icon: '⚛️', category: 'frontend', level: 95 },
  { name: 'Vite', icon: '⚡', category: 'frontend', level: 92 },
  { name: 'HTML5', icon: '🌐', category: 'frontend', level: 95 },
  { name: 'CSS3', icon: '🎨', category: 'frontend', level: 93 },
  { name: 'JavaScript (ES6+)', icon: '♦️', category: 'frontend', level: 92 },
  { name: 'TypeScript', icon: '🔷', category: 'frontend', level: 90 },
  { name: 'Framer Motion', icon: '✨', category: 'frontend', level: 88 },
  { name: 'React Router', icon: '🧭', category: 'frontend', level: 92 },

  // Backend
  { name: 'Node.js', icon: '📦', category: 'backend', level: 90 },
  { name: 'Express.js', icon: '🚀', category: 'backend', level: 88 },
  { name: 'Authentication (JWT)', icon: '🔐', category: 'backend', level: 88 },
  { name: 'RESTful APIs', icon: '📡', category: 'backend', level: 88 },

  // Database
  { name: 'MongoDB', icon: '🗄️', category: 'database', level: 85 },
  { name: 'Mongoose', icon: '🔗', category: 'database', level: 85 },

  // Architecture
  { name: 'Full-Stack Architecture', icon: '🧠', category: 'architecture', level: 90 },
  { name: 'CRUD Systems', icon: '🔄', category: 'architecture', level: 90 },
  { name: 'API Integration', icon: '⚙️', category: 'architecture', level: 88 },

  // Design
  { name: 'Responsive Design', icon: '📱', category: 'design', level: 92 },
  { name: 'CSS Grid & Flexbox', icon: '📐', category: 'design', level: 93 },
  { name: 'UI/UX Principles', icon: '🎯', category: 'design', level: 88 },

  // Tools
  { name: 'Git', icon: '🐙', category: 'tools', level: 88 },
  { name: 'GitHub', icon: '💻', category: 'tools', level: 88 },
  { name: 'Code Quality & Debugging', icon: '🧰', category: 'tools', level: 85 },
  { name: 'ESLint', icon: '📋', category: 'tools', level: 85 },

  // DevOps
  { name: 'Vercel Deployment', icon: '▲', category: 'devops', level: 85 },
  { name: 'GitHub Pages', icon: '📄', category: 'devops', level: 85 },
];

export const skillCategories = [
  { id: 'frontend' as const, labelKey: 'skills.category.frontend', icon: '🎨' },
  { id: 'backend' as const, labelKey: 'skills.category.backend', icon: '⚙️' },
  { id: 'database' as const, labelKey: 'skills.category.database', icon: '🗄️' },
  { id: 'architecture' as const, labelKey: 'skills.category.architecture', icon: '🧠' },
  { id: 'design' as const, labelKey: 'skills.category.design', icon: '📐' },
  { id: 'tools' as const, labelKey: 'skills.category.tools', icon: '🔧' },
  { id: 'devops' as const, labelKey: 'skills.category.devops', icon: '🚀' },
];