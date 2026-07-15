import { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React.js", icon: "⚛️", category: "frontend", level: 95 },
  { name: "TypeScript", icon: "🔷", category: "frontend", level: 93 },
  { name: "JavaScript (ES6+)", icon: "♦️", category: "frontend", level: 93 },
  { name: "HTML5", icon: "🌐", category: "frontend", level: 96 },
  { name: "CSS3", icon: "🎨", category: "frontend", level: 95 },
  { name: "Vite", icon: "⚡", category: "frontend", level: 93 },
  { name: "React Router", icon: "🧭", category: "frontend", level: 93 },
  { name: "Framer Motion", icon: "✨", category: "frontend", level: 90 },
  { name: "React Hook Form", icon: "📝", category: "frontend", level: 86 },
  { name: "Axios", icon: "📡", category: "frontend", level: 90 },

  // Backend
  { name: "Node.js", icon: "📦", category: "backend", level: 91 },
  { name: "Express.js", icon: "🚀", category: "backend", level: 90 },
  { name: "REST API Design", icon: "🌐", category: "backend", level: 90 },
  { name: "JWT Authentication", icon: "🔐", category: "backend", level: 90 },
  { name: "HTTP-only Cookies", icon: "🍪", category: "backend", level: 89 },
  { name: "bcrypt", icon: "🔒", category: "backend", level: 88 },
  { name: "Zod Validation", icon: "✅", category: "backend", level: 87 },

  // Database
  { name: "PostgreSQL", icon: "🐘", category: "database", level: 90 },
  { name: "Prisma ORM", icon: "🔷", category: "database", level: 91 },
  { name: "Redis", icon: "🟥", category: "database", level: 84 },
  { name: "MongoDB", icon: "🗄️", category: "database", level: 85 },
  { name: "Mongoose", icon: "🔗", category: "database", level: 85 },

  // Architecture
  {
    name: "Full-Stack Architecture",
    icon: "🧠",
    category: "architecture",
    level: 92,
  },
  {
    name: "Scalable REST APIs",
    icon: "⚙️",
    category: "architecture",
    level: 90,
  },
  {
    name: "Authentication & Authorization",
    icon: "🛡️",
    category: "architecture",
    level: 90,
  },
  { name: "API Integration", icon: "🔗", category: "architecture", level: 91 },
  {
    name: "Performance Optimization",
    icon: "⚡",
    category: "architecture",
    level: 89,
  },
  {
    name: "Component Architecture",
    icon: "🧩",
    category: "architecture",
    level: 91,
  },

  // Design
  { name: "Responsive Design", icon: "📱", category: "design", level: 94 },
  { name: "CSS Grid & Flexbox", icon: "📐", category: "design", level: 95 },
  { name: "UI/UX Design", icon: "🖌️", category: "design", level: 90 },
  { name: "Glassmorphism", icon: "💎", category: "design", level: 91 },
  { name: "Accessibility", icon: "💡", category: "design", level: 86 },

  // Tools
  { name: "Git", icon: "🐙", category: "tools", level: 88 },
  { name: "GitHub", icon: "💻", category: "tools", level: 88 },
  {
    name: "Code Quality & Debugging",
    icon: "🧰",
    category: "tools",
    level: 85,
  },
  { name: "ESLint", icon: "📋", category: "tools", level: 85 },
  { name: "Debugging", icon: "🛠️", category: "tools", level: 89 },

  // DevOps
  { name: 'Vercel', icon: '▲', category: 'devops', level: 89 },
  { name: 'Railway', icon: '🚂', category: 'devops', level: 87 },
  { name: 'BullMQ', icon: '📬', category: 'devops', level: 82 },
];

export const skillCategories = [
  { id: "frontend" as const, labelKey: "skills.category.frontend", icon: "🎨" },
  { id: "backend" as const, labelKey: "skills.category.backend", icon: "⚙️" },
  { id: "database" as const, labelKey: "skills.category.database", icon: "🗄️" },
  {
    id: "architecture" as const,
    labelKey: "skills.category.architecture",
    icon: "🧠",
  },
  { id: "design" as const, labelKey: "skills.category.design", icon: "📐" },
  { id: "tools" as const, labelKey: "skills.category.tools", icon: "🔧" },
  { id: "devops" as const, labelKey: "skills.category.devops", icon: "🚀" },
];
