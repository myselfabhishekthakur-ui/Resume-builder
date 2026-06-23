import { ResumeData } from '@/lib/store';
import styles from './TechProTemplate.module.css';

interface Props { data: ResumeData; }

const fmt = (d: string) => d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export default function TechProTemplate({ data }: Props) {
  const { personal, experience, education, skills, projects, certifications } = data;

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.avatarBlock}>
          <div className={styles.avatar}>
            {personal.fullName ? personal.fullName.charAt(0).toUpperCase() : '?'}
          </div>
        </div>
        {/* Contact */}
        <div className={styles.section}>
          <h4 className={styles.sideTitle}>CONTACT</h4>
          {personal.email && <div className={styles.contactItem}><span>✉</span>{personal.email}</div>}
          {personal.phone && <div className={styles.contactItem}><span>📱</span>{personal.phone}</div>}
          {personal.location && <div className={styles.contactItem}><span>📍</span>{personal.location}</div>}
          {personal.linkedin && <div className={styles.contactItem}><span>in</span>{personal.linkedin}</div>}
          {personal.github && <div className={styles.contactItem}><span>gh</span>{personal.github}</div>}
        </div>
        {/* Skills */}
        {skills.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sideTitle}>SKILLS</h4>
            {skills.map(skill => (
              <div key={skill.id} className={styles.skillItem}>
                <span className={styles.skillName}>{skill.name}</span>
                <div className={styles.skillBar}>
                  <div className={styles.skillFill} style={{ width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '80%' : skill.level === 'Intermediate' ? '60%' : '35%' }} />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Certifications */}
        {certifications.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sideTitle}>CERTIFICATIONS</h4>
            {certifications.map(cert => (
              <div key={cert.id} className={styles.certItem}>
                <div className={styles.certName}>{cert.name}</div>
                <div className={styles.certIssuer}>{cert.issuer} · {fmt(cert.date)}</div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.name}>{personal.fullName || 'Your Name'}</h1>
          <div className={styles.title}>{personal.title || 'Professional Title'}</div>
          {personal.website && <div className={styles.website}>{personal.website}</div>}
        </div>

        {personal.summary && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><span className={styles.dot} />SUMMARY</h2>
            <p className={styles.summary}>{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><span className={styles.dot} />EXPERIENCE</h2>
            {experience.map(exp => (
              <div key={exp.id} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div>
                    <div className={styles.entryTitle}>{exp.position}</div>
                    <div className={styles.entrySubtitle}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                  </div>
                  <div className={styles.entryDate}>{fmt(exp.startDate)} — {exp.current ? 'Present' : fmt(exp.endDate)}</div>
                </div>
                {exp.description && (
                  <div className={styles.entryDesc}>
                    {exp.description.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><span className={styles.dot} />PROJECTS</h2>
            {projects.map(proj => (
              <div key={proj.id} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div className={styles.entryTitle}>{proj.name}</div>
                  {proj.technologies && <div className={styles.techPills}>{proj.technologies.split(',').map(t => <span key={t} className={styles.tech}>{t.trim()}</span>)}</div>}
                </div>
                {proj.description && <p className={styles.entryDesc}>{proj.description}</p>}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><span className={styles.dot} />EDUCATION</h2>
            {education.map(edu => (
              <div key={edu.id} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div>
                    <div className={styles.entryTitle}>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</div>
                    <div className={styles.entrySubtitle}>{edu.institution}</div>
                  </div>
                  <div className={styles.entryDate}>{fmt(edu.startDate)} — {fmt(edu.endDate)}</div>
                </div>
                {edu.gpa && <div className={styles.gpa}>GPA: {edu.gpa}</div>}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
