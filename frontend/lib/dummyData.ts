import { ResumeData } from './store';

export const DUMMY_RESUME_DATA: ResumeData = {
  personal: {
    fullName: 'Alex Johnson',
    title: 'Senior Full-Stack Engineer',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexj.dev',
    linkedin: 'linkedin.com/in/alexj',
    github: 'github.com/alexj',
    summary: 'Passionate and results-driven software engineer with 7+ years of experience building scalable web applications. Proven track record of leading cross-functional teams, optimizing performance, and architecting robust cloud infrastructure.',
  },
  experience: [
    {
      id: 'exp1',
      position: 'Senior Software Engineer',
      company: 'TechFlow Solutions',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: 'Present',
      current: true,
      description: '• Architected and migrated a monolithic legacy system to a highly scalable microservices architecture using Node.js and Docker, reducing system downtime by 40%.\n• Mentored a team of 5 junior developers, conducting code reviews and leading pair programming sessions to improve code quality.\n• Implemented advanced caching strategies with Redis, improving API response times by 300%.',
    },
    {
      id: 'exp2',
      position: 'Software Engineer',
      company: 'DataStream Inc',
      location: 'Austin, TX',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: '• Developed interactive and responsive frontend components using React and TypeScript for a high-traffic SaaS dashboard.\n• Designed RESTful APIs in Python/Django to support new feature rollouts, catering to 100,000+ active users.\n• Automated deployment pipelines using GitHub Actions, reducing deployment time from hours to minutes.',
    }
  ],
  education: [
    {
      id: 'edu1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2018-05',
      gpa: '3.9/4.0',
      description: 'Specialization in Artificial Intelligence and Distributed Systems. Graduated with Honors.',
    },
    {
      id: 'edu2',
      institution: 'University of Texas at Austin',
      degree: 'Bachelor of Science',
      field: 'Software Engineering',
      startDate: '2012-09',
      endDate: '2016-05',
      description: "Dean's List. Capstone Project: Real-time traffic analysis using Machine Learning.",
    }
  ],
  skills: [
    { id: 'sk1', name: 'JavaScript / TypeScript', level: 'Expert', category: 'Languages' },
    { id: 'sk2', name: 'React.js & Next.js', level: 'Expert', category: 'Frontend' },
    { id: 'sk3', name: 'Node.js', level: 'Advanced', category: 'Backend' },
    { id: 'sk4', name: 'Python & Django', level: 'Advanced', category: 'Backend' },
    { id: 'sk5', name: 'AWS (EC2, S3, RDS)', level: 'Intermediate', category: 'Cloud' },
    { id: 'sk6', name: 'Docker & Kubernetes', level: 'Intermediate', category: 'DevOps' },
    { id: 'sk7', name: 'PostgreSQL & MongoDB', level: 'Advanced', category: 'Database' },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'CloudSync CLI',
      description: 'An open-source command-line tool built in Go that synchronizes local directories with AWS S3 up to 5x faster than standard tools.',
      github: 'github.com/alexj/cloudsync',
      technologies: 'Go, AWS S3, Concurrency'
    },
    {
      id: 'proj2',
      name: 'E-Commerce Dashboard',
      description: 'A comprehensive analytics dashboard for online merchants providing real-time sales data, inventory alerts, and predictive trends.',
      url: 'alexj.dev/projects/dashboard',
      technologies: 'React, Next.js, Tailwind, Python'
    }
  ],
  certifications: [
    {
      id: 'cert1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022-08',
      url: '',
    },
    {
      id: 'cert2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      date: '2021-11',
      url: '',
    }
  ]
};
