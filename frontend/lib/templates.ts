export type TemplateCategory = 'IT & Tech' | 'Management' | 'Fresher / Student' | 'Creative & Other';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  color: string;
  accent: string;
  tags: string[];
  popular?: boolean;
}

export const TEMPLATES: Template[] = [
  {
    id: 'tech-pro',
    name: 'TechPro',
    description: 'Dark sidebar with a bold accent — perfect for software engineers and developers.',
    category: 'IT & Tech',
    color: '#6366f1',
    accent: '#818cf8',
    tags: ['Software Engineer', 'Developer', 'IT'],
    popular: true,
  },
  {
    id: 'dev-minimal',
    name: 'DevMinimal',
    description: 'Clean GitHub-inspired layout. Simple, elegant, and laser-focused on skills.',
    category: 'IT & Tech',
    color: '#10b981',
    accent: '#34d399',
    tags: ['Full-Stack', 'Open Source', 'Backend'],
  },
  {
    id: 'data-sci',
    name: 'DataSci',
    description: 'Grid-based layout with data visualization accents for data scientists.',
    category: 'IT & Tech',
    color: '#06b6d4',
    accent: '#22d3ee',
    tags: ['Data Science', 'ML', 'Analytics'],
    popular: true,
  },
  {
    id: 'corp-lead',
    name: 'CorpLead',
    description: 'Classic two-column formal layout for corporate managers and directors.',
    category: 'Management',
    color: '#8b5cf6',
    accent: '#a78bfa',
    tags: ['Manager', 'Director', 'Corporate'],
    popular: true,
  },
  {
    id: 'exec-suite',
    name: 'ExecSuite',
    description: 'Premium bold typography for C-level executives. Exudes authority.',
    category: 'Management',
    color: '#f59e0b',
    accent: '#fbbf24',
    tags: ['CEO', 'CTO', 'Executive'],
  },
  {
    id: 'startup-founder',
    name: 'StartupFounder',
    description: 'Bold, impact-first design for entrepreneurs and startup professionals.',
    category: 'Management',
    color: '#ef4444',
    accent: '#f87171',
    tags: ['Founder', 'Entrepreneur', 'Startup'],
  },
  {
    id: 'fresh-start',
    name: 'FreshStart',
    description: 'Colorful, skills-first layout designed to make freshers shine.',
    category: 'Fresher / Student',
    color: '#ec4899',
    accent: '#f472b6',
    tags: ['Fresher', 'Graduate', 'Entry Level'],
    popular: true,
  },
  {
    id: 'campus-ready',
    name: 'CampusReady',
    description: 'Compact education-first layout. Ideal for college students and interns.',
    category: 'Fresher / Student',
    color: '#14b8a6',
    accent: '#2dd4bf',
    tags: ['Student', 'Intern', 'College'],
  },
  {
    id: 'creative-flow',
    name: 'CreativeFlow',
    description: 'Portfolio-style with vibrant color blocks — for designers and creatives.',
    category: 'Creative & Other',
    color: '#a855f7',
    accent: '#c084fc',
    tags: ['Designer', 'Creative', 'Portfolio'],
    popular: true,
  },
  {
    id: 'market-pro',
    name: 'MarketPro',
    description: 'Achievement-focused with metrics highlights for marketing and sales pros.',
    category: 'Creative & Other',
    color: '#f97316',
    accent: '#fb923c',
    tags: ['Marketing', 'Sales', 'Growth'],
  },
  {
    id: 'health-care',
    name: 'HealthCare',
    description: 'Clean clinical style for doctors, nurses, and healthcare professionals.',
    category: 'Creative & Other',
    color: '#0ea5e9',
    accent: '#38bdf8',
    tags: ['Doctor', 'Nurse', 'Healthcare'],
  },
  {
    id: 'legal-eagle',
    name: 'LegalEagle',
    description: 'Formal serif-based traditional layout for lawyers and legal professionals.',
    category: 'Creative & Other',
    color: '#64748b',
    accent: '#94a3b8',
    tags: ['Lawyer', 'Legal', 'Attorney'],
  },
];

export const CATEGORIES: TemplateCategory[] = [
  'IT & Tech',
  'Management',
  'Fresher / Student',
  'Creative & Other',
];

export const CATEGORY_ICONS: Record<TemplateCategory, string> = {
  'IT & Tech': '💻',
  'Management': '👔',
  'Fresher / Student': '🎓',
  'Creative & Other': '🎨',
};
