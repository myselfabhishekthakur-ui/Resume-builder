'use client';
import { useResumeStore } from '@/lib/store';
import styles from './FormStyles.module.css';

export default function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation } = useResumeStore();

  return (
    <div>
      <h3 className={styles.sectionTitle}>🎓 Education</h3>
      {data.education.map((edu, i) => (
        <div key={edu.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Education #{i + 1}</span>
            <button className={styles.removeBtn} onClick={() => removeEducation(edu.id)}>✕</button>
          </div>
          <div className="form-group">
            <label className="label">Institution *</label>
            <input className="input" placeholder="MIT" value={edu.institution}
              onChange={e => updateEducation(edu.id, { institution: e.target.value })} />
          </div>
          <div className={styles.row}>
            <div className="form-group">
              <label className="label">Degree</label>
              <input className="input" placeholder="Bachelor's" value={edu.degree}
                onChange={e => updateEducation(edu.id, { degree: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="label">Field of Study</label>
              <input className="input" placeholder="Computer Science" value={edu.field}
                onChange={e => updateEducation(edu.id, { field: e.target.value })} />
            </div>
          </div>
          <div className={styles.row}>
            <div className="form-group">
              <label className="label">Start Date</label>
              <input className="input" type="month" value={edu.startDate}
                onChange={e => updateEducation(edu.id, { startDate: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="label">End Date</label>
              <input className="input" type="month" value={edu.endDate}
                onChange={e => updateEducation(edu.id, { endDate: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="label">GPA (optional)</label>
            <input className="input" placeholder="3.8/4.0" value={edu.gpa || ''}
              onChange={e => updateEducation(edu.id, { gpa: e.target.value })} />
          </div>
        </div>
      ))}
      <button className={styles.addBtn} onClick={addEducation}>+ Add Education</button>
    </div>
  );
}
