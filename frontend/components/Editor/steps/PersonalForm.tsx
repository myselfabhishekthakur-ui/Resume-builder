'use client';
import { useResumeStore } from '@/lib/store';
import styles from './FormStyles.module.css';

export default function PersonalForm() {
  const { data, updatePersonal } = useResumeStore();
  const { personal } = data;

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
        <label className="label">Professional Summary</label>
        <textarea className="input" rows={5} placeholder="Write a compelling summary about yourself..."
          value={personal.summary} onChange={e => updatePersonal({ summary: e.target.value })} />
      </div>
    </div>
  );
}
