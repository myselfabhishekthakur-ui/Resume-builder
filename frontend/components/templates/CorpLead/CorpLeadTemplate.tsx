import { ResumeData } from '@/lib/store';
import styles from './CorpLeadTemplate.module.css';

interface Props { data: ResumeData; }
const fmt = (d: string) => d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export default function CorpLeadTemplate({ data }: Props) {
  const { personal, experience, education, skills, projects, certifications } = data;
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerMain}>
          <h1 className={styles.name}>{personal.fullName || 'Your Name'}</h1>
          <div className={styles.title}>{personal.title}</div>
        </div>
        <div className={styles.headerContact}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>
      <div className={styles.body}>
        <main className={styles.main}>
          {personal.summary && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Executive Summary</h2>
              <p className={styles.summary}>{personal.summary}</p>
            </section>
          )}
          {experience.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Professional Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className={styles.entry} style={{ pageBreakBefore: exp.pageBreak ? 'always' : 'auto' }}>
                  <div className={styles.entryHeader}>
                    <div>
                      <div className={styles.entryTitle}>{exp.position}</div>
                      <div className={styles.company}>{exp.company}{exp.location ? ` | ${exp.location}` : ''}</div>
                    </div>
                    <div className={styles.date}>{fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}</div>
                  </div>
                  {exp.description && <div className={styles.desc}>{exp.description.split('\n').map((l, i) => <p key={i}>{l}</p>)}</div>}
                </div>
              ))}
            </section>
          )}
          {education.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Education</h2>
              {education.map(edu => (
                <div key={edu.id} className={styles.entry} style={{ pageBreakBefore: edu.pageBreak ? 'always' : 'auto' }}>
                  <div className={styles.entryHeader}>
                    <div>
                      <div className={styles.entryTitle}>{edu.degree} in {edu.field}</div>
                      <div className={styles.company}>{edu.institution}</div>
                    </div>
                    <div className={styles.date}>{fmt(edu.startDate)} – {fmt(edu.endDate)}</div>
                  </div>
                </div>
              ))}
            </section>
          )}
        </main>
        <aside className={styles.aside}>
          {skills.length > 0 && (
            <div className={styles.asideSection}>
              <h3 className={styles.asideTitle}>Core Competencies</h3>
              {skills.map(sk => (
                <div key={sk.id} className={styles.competency}>
                  <span className={styles.bullet}>▸</span>{sk.name}
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div className={styles.asideSection}>
              <h3 className={styles.asideTitle}>Certifications</h3>
              {certifications.map(cert => (
                <div key={cert.id} className={styles.certItem}>
                  <div className={styles.certName}>{cert.name}</div>
                  <div className={styles.certIssuer}>{cert.issuer} · {fmt(cert.date)}</div>
                </div>
              ))}
            </div>
          )}
          {projects.length > 0 && (
            <div className={styles.asideSection}>
              <h3 className={styles.asideTitle}>Key Projects</h3>
              {projects.map(proj => (
                <div key={proj.id} className={styles.projItem} style={{ pageBreakBefore: proj.pageBreak ? 'always' : 'auto' }}>
                  <div className={styles.certName}>{proj.name}</div>
                  {proj.description && <div className={styles.certIssuer}>{proj.description}</div>}
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
