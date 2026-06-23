'use client';
import { useState } from 'react';
import { useResumeStore } from '@/lib/store';
import styles from './EditorForm.module.css';
import PersonalForm from './steps/PersonalForm';
import ExperienceForm from './steps/ExperienceForm';
import EducationForm from './steps/EducationForm';
import SkillsForm from './steps/SkillsForm';
import ProjectsForm from './steps/ProjectsForm';
import CertificationsForm from './steps/CertificationsForm';

const STEPS = [
  { id: 0, label: 'Personal', icon: '👤' },
  { id: 1, label: 'Experience', icon: '💼' },
  { id: 2, label: 'Education', icon: '🎓' },
  { id: 3, label: 'Skills', icon: '⚡' },
  { id: 4, label: 'Projects', icon: '🚀' },
  { id: 5, label: 'Certifications', icon: '🏆' },
];

export default function EditorForm() {
  const { activeStep, setActiveStep } = useResumeStore();

  return (
    <div className={styles.editor}>
      {/* Step Nav */}
      <div className={styles.steps}>
        {STEPS.map((step) => (
          <button
            key={step.id}
            className={`${styles.step} ${activeStep === step.id ? styles.stepActive : ''}`}
            onClick={() => setActiveStep(step.id)}
          >
            <span className={styles.stepIcon}>{step.icon}</span>
            <span className={styles.stepLabel}>{step.label}</span>
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className={styles.content}>
        {activeStep === 0 && <PersonalForm />}
        {activeStep === 1 && <ExperienceForm />}
        {activeStep === 2 && <EducationForm />}
        {activeStep === 3 && <SkillsForm />}
        {activeStep === 4 && <ProjectsForm />}
        {activeStep === 5 && <CertificationsForm />}
      </div>

      {/* Navigation Buttons */}
      <div className={styles.nav}>
        <button
          className="btn btn-ghost btn-sm"
          disabled={activeStep === 0}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          ← Previous
        </button>
        <button
          className="btn btn-primary btn-sm"
          disabled={activeStep === STEPS.length - 1}
          onClick={() => setActiveStep(activeStep + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
