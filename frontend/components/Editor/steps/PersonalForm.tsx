'use client';
import { useState } from 'react';
import { useResumeStore } from '@/lib/store';
import styles from './FormStyles.module.css';

export default function PersonalForm() {
  const { data, updatePersonal } = useResumeStore();
  const { personal } = data;

  const [isGenerating, setIsGenerating] = useState(false);

  const generateWithChatGPT = async () => {
    setIsGenerating(true);
    try {
      const skills = data.skills.map(s => s.name).join(', ');
      const experience = data.experience.map(e => `${e.position} at ${e.company}`).join(', ');
      const title = data.personal.title || 'Professional';
      
      const prompt = `I am writing my resume for a ${title} role.\nHere are my core skills: ${skills || 'Not specified yet'}.\nHere is my recent experience: ${experience || 'Not specified yet'}.\n\nPlease write a compelling, concise, and ATS-friendly professional summary for my resume (about 3-4 sentences). Focus on my strengths and make it sound highly professional. Give me only the summary text without any surrounding explanation.`;

      await navigator.clipboard.writeText(prompt);
      
      setTimeout(() => {
        window.open('https://chatgpt.com/', '_blank');
        setIsGenerating(false);
      }, 1000);
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <h3 className={styles.sectionTitle}>👤 Personal Information</h3>
      <div className="form-group">
        <label className="label">Full Name *</label>
        <input className="input" placeholder="John Doe" value={personal.fullName}
          onChange={e => updatePersonal({ fullName: e.target.value })} />
      </div>
      <div className="form-group">
        <label className="label">Professional Title</label>
        <input className="input" placeholder="Senior Software Engineer" value={personal.title}
          onChange={e => updatePersonal({ title: e.target.value })} />
      </div>
      <div className={styles.row}>
        <div className="form-group">
          <label className="label">Email *</label>
          <input className="input" type="email" placeholder="john@example.com" value={personal.email}
            onChange={e => updatePersonal({ email: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="label">Phone</label>
          <input className="input" placeholder="+1 (555) 000-0000" value={personal.phone}
            onChange={e => updatePersonal({ phone: e.target.value })} />
        </div>
      </div>
      <div className="form-group">
        <label className="label">Location</label>
        <input className="input" placeholder="San Francisco, CA" value={personal.location}
          onChange={e => updatePersonal({ location: e.target.value })} />
      </div>
      <div className={styles.row}>
        <div className="form-group">
          <label className="label">LinkedIn</label>
          <input className="input" placeholder="linkedin.com/in/johndoe" value={personal.linkedin}
            onChange={e => updatePersonal({ linkedin: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="label">GitHub</label>
          <input className="input" placeholder="github.com/johndoe" value={personal.github}
            onChange={e => updatePersonal({ github: e.target.value })} />
        </div>
      </div>
      <div className="form-group">
        <label className="label">Website</label>
        <input className="input" placeholder="https://johndoe.dev" value={personal.website}
          onChange={e => updatePersonal({ website: e.target.value })} />
      </div>
      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label className="label" style={{ marginBottom: 0 }}>Professional Summary</label>
          <button 
            onClick={generateWithChatGPT}
            type="button" 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '6px', 
              background: 'rgba(16, 163, 127, 0.15)', color: '#10a37f', 
              border: '1px solid rgba(16, 163, 127, 0.3)', padding: '5px 12px', 
              borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer',
              fontWeight: 600, transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(16, 163, 127, 0.1)'
            }}
          >
            {isGenerating ? (
              'Prompt copied! Redirecting...'
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.28 9.82a6 6 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9 6.07 6.07 0 0 0-10.27 2.17 6 6 0 0 0-3.16 5.45 6.05 6.05 0 0 0 3.15 5.85 6 6 0 0 0 .52 4.91 6.05 6.05 0 0 0 6.51 2.9 6.07 6.07 0 0 0 10.27-2.17 6 6 0 0 0 3.16-5.45 6.05 6.05 0 0 0-3.15-5.85zm-10.28 10.63c-1.58 0-3.05-.59-4.15-1.56.57-.02 1.16-.18 1.66-.48l5.6-3.23c.57-.33 1.05-.81 1.38-1.38.33-.57.48-1.09.48-1.66v-4.12c1.16.66 1.86 1.84 1.86 3.22 0 2.25-1.83 4.08-4.08 4.08h-2.75zM4.08 12c0-1.58.59-3.05 1.56-4.15.02.57.18 1.16.48 1.66l3.23 5.6c.33.57.81 1.05 1.38 1.38.57.33 1.09.48 1.66.48h4.12c-.66 1.16-1.84 1.86-3.22 1.86-2.25 0-4.08-1.83-4.08-4.08v-2.75zM12 3.55c1.58 0 3.05.59 4.15 1.56-.57-.02-1.16-.18-1.66-.48l-5.6-3.23C8.32 1.07 7.84.59 7.51.02 7.18-.55 7.03-1.07 7.03-1.64v4.12c-1.16-.66-1.86-1.84-1.86-3.22 0-2.25 1.83-4.08 4.08-4.08h2.75z" />
                </svg>
                Ask ChatGPT ✨
              </>
            )}
          </button>
        </div>
        <textarea className="input" rows={5} placeholder="Write a compelling summary about yourself..."
          value={personal.summary} onChange={e => updatePersonal({ summary: e.target.value })} />
      </div>
    </div>
  );
}
