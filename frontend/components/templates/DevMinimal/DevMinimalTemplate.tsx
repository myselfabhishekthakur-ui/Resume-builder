import { ResumeData } from '@/lib/store';
import styles from './DevMinimalTemplate.module.css';

interface Props { data: ResumeData; }
const fmt = (d: string) => d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export default function DevMinimalTemplate({ data }: Props) {
  const { personal, experience, education, skills, projects, certifications } = data;
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.name}>{personal.fullName || 'Your Name'}</h1>
        <div className={styles.title}>{personal.title}</div>
        <div className={styles.contacts}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.github && <span className={styles.link}>{personal.github}</span>}
          {personal.linkedin && <span className={styles.link}>{personal.linkedin}</span>}
        </div>
      </div>
      <div className={styles.divider} />
      {personal.summary && (
        <section className={styles.section}><p className={styles.summary}>{personal.summary}</p></section>
      )}
      {experience.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className={styles.entry}>
              <div className={styles.entryRow}>
                <strong className={styles.entryTitle}>{exp.position}</strong>
                <span className={styles.date}>{fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}</span>
              </div>
              <div className={styles.company}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
              {exp.description && <div className={styles.desc}>{exp.description.split('\n').map((l, i) => <p key={i}>{l}</p>)}</div>}
            </div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.skillsGrid}>
            {skills.map(sk => (<span key={sk.id} className={styles.skill}>{sk.name}</span>))}
          </div>
        </section>
      )}
      {projects.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} className={styles.entry}>
              <div className={styles.entryRow}>
                <strong className={styles.entryTitle}>{proj.name}</strong>
                {proj.github && <span className={styles.link}>{proj.github}</span>}
              </div>
              {proj.description && <p className={styles.desc}>{proj.description}</p>}
              {proj.technologies && <div className={styles.techRow}>{proj.technologies.split(',').map(t => <span key={t} className={styles.tech}>{t.trim()}</span>)}</div>}
            </div>
          ))}
        </section>
      )}
      {education.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} className={styles.entry}>
              <div className={styles.entryRow}>
                <strong className={styles.entryTitle}>{edu.degree} {edu.field}</strong>
                <span className={styles.date}>{fmt(edu.startDate)} – {fmt(edu.endDate)}</span>
              </div>
              <div className={styles.company}>{edu.institution}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
