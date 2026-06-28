import { ResumeData } from '@/lib/store';
import styles from './DataSciTemplate.module.css';

interface Props { data: ResumeData; }
const fmt = (d: string) => d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export default function DataSciTemplate({ data }: Props) {
  const { personal, experience, education, skills, projects, certifications } = data;
  return (
    <div className={styles.page}>
      <div className={styles.topBar} />
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.profileBlock}>
            <div className={styles.avatar}>{personal.fullName?.charAt(0) || '?'}</div>
            <h1 className={styles.name}>{personal.fullName || 'Your Name'}</h1>
            <div className={styles.title}>{personal.title}</div>
          </div>
          <div className={styles.sideSection}>
            <h4 className={styles.sideTitle}>CONTACT</h4>
            {personal.email && <div className={styles.info}>{personal.email}</div>}
            {personal.phone && <div className={styles.info}>{personal.phone}</div>}
            {personal.location && <div className={styles.info}>{personal.location}</div>}
            {personal.linkedin && <div className={styles.info}>{personal.linkedin}</div>}
          </div>
          {skills.length > 0 && (
            <div className={styles.sideSection}>
              <h4 className={styles.sideTitle}>TECHNICAL SKILLS</h4>
              {skills.map(sk => (
                <div key={sk.id} className={styles.skillRow}>
                  <span className={styles.skillName}>{sk.name}</span>
                  <span className={styles.skillLevel}>{sk.level}</span>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div className={styles.sideSection}>
              <h4 className={styles.sideTitle}>CERTIFICATIONS</h4>
              {certifications.map(cert => (
                <div key={cert.id} className={styles.certBlock}>
                  <div className={styles.certName}>{cert.name}</div>
                  <div className={styles.certIssuer}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </aside>
        <main className={styles.main}>
          {personal.summary && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About Me</h2>
              <p className={styles.summary}>{personal.summary}</p>
            </section>
          )}
          {experience.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Work Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className={styles.entry} style={{ pageBreakBefore: exp.pageBreak ? 'always' : 'auto' }}>
                  <div className={styles.entryLeft}><div className={styles.dot}/></div>
                  <div className={styles.entryRight}>
                    <div className={styles.entryTop}>
                      <strong>{exp.position}</strong>
                      <span className={styles.date}>{[fmt(exp.startDate), exp.current ? 'Present' : fmt(exp.endDate)].filter(Boolean).join(' – ')}</span>
                    </div>
                    <div className={styles.company}>{exp.company} {exp.location ? `· ${exp.location}` : ''}</div>
                    {exp.description && <div className={styles.desc}>{exp.description.split('\n').map((l, i) => <p key={i}>{l}</p>)}</div>}
                  </div>
                </div>
              ))}
            </section>
          )}
          {projects.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Projects</h2>
              {projects.map(proj => (
                <div key={proj.id} className={styles.projCard} style={{ pageBreakBefore: proj.pageBreak ? 'always' : 'auto' }}>
                  <div className={styles.projName}>{proj.name}</div>
                  {proj.description && <p className={styles.desc}>{proj.description}</p>}
                  {proj.technologies && <div className={styles.chips}>{proj.technologies.split(',').map(t => <span key={t} className={styles.chip}>{t.trim()}</span>)}</div>}
                </div>
              ))}
            </section>
          )}
          {education.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Education</h2>
              {education.map(edu => (
                <div key={edu.id} className={styles.entry} style={{ pageBreakBefore: edu.pageBreak ? 'always' : 'auto' }}>
                  <div className={styles.entryLeft}><div className={styles.dot}/></div>
                  <div className={styles.entryRight}>
                    <div className={styles.entryTop}>
                      <strong>{edu.degree} {edu.field}</strong>
                      <span className={styles.date}>{[fmt(edu.startDate), fmt(edu.endDate)].filter(Boolean).join(' – ')}</span>
                    </div>
                    <div className={styles.company}>{edu.institution}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</div>
                  </div>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
