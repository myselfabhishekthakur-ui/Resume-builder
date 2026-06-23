'use client';
import { useResumeStore } from '@/lib/store';
import styles from './FormStyles.module.css';

export default function SkillsForm() {
  const { data, addSkill, updateSkill, removeSkill } = useResumeStore();

  return (
    <div>
      <h3 className={styles.sectionTitle}>⚡ Skills</h3>
      {data.skills.map((skill, i) => (
        <div key={skill.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Skill #{i + 1}</span>
            <button className={styles.removeBtn} onClick={() => removeSkill(skill.id)}>✕</button>
          </div>
          <div className={styles.row}>
            <div className="form-group">
              <label className="label">Skill Name *</label>
              <input className="input" placeholder="React.js" value={skill.name}
                onChange={e => updateSkill(skill.id, { name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="label">Level</label>
              <select className={styles.levelSelect} value={skill.level}
                onChange={e => updateSkill(skill.id, { level: e.target.value as any })}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="label">Category (optional)</label>
            <input className="input" placeholder="Frontend, Backend, Tools..." value={skill.category || ''}
              onChange={e => updateSkill(skill.id, { category: e.target.value })} />
          </div>
        </div>
      ))}
      <button className={styles.addBtn} onClick={addSkill}>+ Add Skill</button>
    </div>
  );
}
