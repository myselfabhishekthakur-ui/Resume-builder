'use client';
import { useResumeStore } from '@/lib/store';
import styles from './FormStyles.module.css';

export default function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience } = useResumeStore();

  return (
    <div>
      <h3 className={styles.sectionTitle}>💼 Work Experience</h3>
      {data.experience.map((exp, i) => (
        <div key={exp.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Experience #{i + 1}</span>
            <button className={styles.removeBtn} onClick={() => removeExperience(exp.id)}>✕</button>
          </div>
          <div className="form-group">
            <label className="label">Company *</label>
            <input className="input" placeholder="Google" value={exp.company}
              onChange={e => updateExperience(exp.id, { company: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="label">Position *</label>
            <input className="input" placeholder="Senior Software Engineer" value={exp.position}
              onChange={e => updateExperience(exp.id, { position: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="label">Location</label>
            <input className="input" placeholder="Mountain View, CA" value={exp.location}
              onChange={e => updateExperience(exp.id, { location: e.target.value })} />
          </div>
          <div className={styles.row}>
            <div className="form-group">
              <label className="label">Start Date</label>
              <input className="input" type="month" value={exp.startDate}
                onChange={e => updateExperience(exp.id, { startDate: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="label">End Date</label>
              <input className="input" type="month" value={exp.endDate} disabled={exp.current}
                onChange={e => updateExperience(exp.id, { endDate: e.target.value })} />
            </div>
          </div>
          <div className={styles.checkboxRow}>
            <input type="checkbox" id={`current-${exp.id}`} checked={exp.current}
              onChange={e => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? '' : exp.endDate })} />
            <label htmlFor={`current-${exp.id}`}>Currently working here</label>
          </div>
          <div className="form-group">
            <label className="label">Description & Achievements</label>
            <textarea className="input" rows={4}
              placeholder="• Led a team of 5 engineers to build...&#10;• Improved performance by 40%..."
              value={exp.description}
              onChange={e => updateExperience(exp.id, { description: e.target.value })} />
          </div>
        </div>
      ))}
      <button className={styles.addBtn} onClick={addExperience}>+ Add Work Experience</button>
    </div>
  );
}
