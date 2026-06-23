import { create } from 'zustand';

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photo?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  url?: string;
  github?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

interface ResumeStore {
  resumeId: string | null;
  templateId: string;
  title: string;
  data: ResumeData;
  activeStep: number;
  isSaving: boolean;

  setResumeId: (id: string) => void;
  setTemplateId: (id: string) => void;
  setTitle: (title: string) => void;
  setActiveStep: (step: number) => void;
  setIsSaving: (saving: boolean) => void;
  updatePersonal: (personal: Partial<PersonalInfo>) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  loadResume: (data: ResumeData, templateId: string, title: string, resumeId: string) => void;
  reset: () => void;
}

const defaultPersonal: PersonalInfo = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  github: '',
  summary: '',
};

const defaultData: ResumeData = {
  personal: defaultPersonal,
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
};

const uid = () => Math.random().toString(36).slice(2, 10);

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeId: null,
  templateId: 'tech-pro',
  title: 'My Resume',
  data: defaultData,
  activeStep: 0,
  isSaving: false,

  setResumeId: (id) => set({ resumeId: id }),
  setTemplateId: (id) => set({ templateId: id }),
  setTitle: (title) => set({ title }),
  setActiveStep: (step) => set({ activeStep: step }),
  setIsSaving: (saving) => set({ isSaving: saving }),

  updatePersonal: (personal) =>
    set((s) => ({ data: { ...s.data, personal: { ...s.data.personal, ...personal } } })),

  addExperience: () =>
    set((s) => ({
      data: {
        ...s.data,
        experience: [...s.data.experience, { id: uid(), company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }],
      },
    })),
  updateExperience: (id, data) =>
    set((s) => ({ data: { ...s.data, experience: s.data.experience.map(e => e.id === id ? { ...e, ...data } : e) } })),
  removeExperience: (id) =>
    set((s) => ({ data: { ...s.data, experience: s.data.experience.filter(e => e.id !== id) } })),

  addEducation: () =>
    set((s) => ({
      data: {
        ...s.data,
        education: [...s.data.education, { id: uid(), institution: '', degree: '', field: '', startDate: '', endDate: '' }],
      },
    })),
  updateEducation: (id, data) =>
    set((s) => ({ data: { ...s.data, education: s.data.education.map(e => e.id === id ? { ...e, ...data } : e) } })),
  removeEducation: (id) =>
    set((s) => ({ data: { ...s.data, education: s.data.education.filter(e => e.id !== id) } })),

  addSkill: () =>
    set((s) => ({
      data: {
        ...s.data,
        skills: [...s.data.skills, { id: uid(), name: '', level: 'Intermediate', category: '' }],
      },
    })),
  updateSkill: (id, data) =>
    set((s) => ({ data: { ...s.data, skills: s.data.skills.map(sk => sk.id === id ? { ...sk, ...data } : sk) } })),
  removeSkill: (id) =>
    set((s) => ({ data: { ...s.data, skills: s.data.skills.filter(sk => sk.id !== id) } })),

  addProject: () =>
    set((s) => ({
      data: {
        ...s.data,
        projects: [...s.data.projects, { id: uid(), name: '', description: '', technologies: '' }],
      },
    })),
  updateProject: (id, data) =>
    set((s) => ({ data: { ...s.data, projects: s.data.projects.map(p => p.id === id ? { ...p, ...data } : p) } })),
  removeProject: (id) =>
    set((s) => ({ data: { ...s.data, projects: s.data.projects.filter(p => p.id !== id) } })),

  addCertification: () =>
    set((s) => ({
      data: {
        ...s.data,
        certifications: [...s.data.certifications, { id: uid(), name: '', issuer: '', date: '' }],
      },
    })),
  updateCertification: (id, data) =>
    set((s) => ({ data: { ...s.data, certifications: s.data.certifications.map(c => c.id === id ? { ...c, ...data } : c) } })),
  removeCertification: (id) =>
    set((s) => ({ data: { ...s.data, certifications: s.data.certifications.filter(c => c.id !== id) } })),

  loadResume: (data, templateId, title, resumeId) =>
    set({ data, templateId, title, resumeId }),

  reset: () =>
    set({ data: defaultData, resumeId: null, title: 'My Resume', activeStep: 0 }),
}));
