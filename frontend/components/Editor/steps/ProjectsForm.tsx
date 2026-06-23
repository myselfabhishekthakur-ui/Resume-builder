'use client';
import { useResumeStore } from '@/lib/store';
import styles from './FormStyles.module.css';

export default function ProjectsForm() {
  const { data, addProject, updateProject, removeProject } = useResumeStore();

  return (
    <div>
      <h3 className={styles.sectionTitle}>🚀 Projects</h3>
      {data.projects.map((proj, i) => (
        <div key={proj.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Project #{i + 1}</span>
            <button className={styles.removeBtn} onClick={() => removeProject(proj.id)}>✕</button>
          </div>
          <div className="form-group">
            <label className="label">Project Name *</label>
            <input className="input" placeholder="ResumeForge" value={proj.name}
              onChange={e => updateProject(proj.id, { name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="label">Description</label>
            <textarea className="input" rows={3} placeholder="A full-stack resume builder..."
              value={proj.description}
              onChange={e => updateProject(proj.id, { description: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="label">Technologies Used</label>
            <input className="input" placeholder="React, Node.js, PostgreSQL" value={proj.technologies}
              onChange={e => updateProject(proj.id, { technologies: e.target.value })} />
          </div>
          <div className={styles.row}>
            <div className="form-group">
              <label className="label">Live URL</label>
              <input className="input" placeholder="https://..." value={proj.url || ''}
                onChange={e => updateProject(proj.id, { url: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="label">GitHub URL</label>
              <input className="input" placeholder="github.com/..." value={proj.github || ''}
                onChange={e => updateProject(proj.id, { github: e.target.value })} />
            </div>
          </div>
        </div>
      ))}
      <button className={styles.addBtn} onClick={addProject}>+ Add Project</button>
    </div>
  );
}
