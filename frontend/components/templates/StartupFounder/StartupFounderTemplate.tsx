import { ResumeData } from '@/lib/store';

interface Props { data: ResumeData; }
const fmt = (d: string) => d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export default function StartupFounderTemplate({ data }: Props) {
  const { personal, experience, education, skills, projects, certifications } = data;
  return (
    <div style={{
      width: '794px',
      minHeight: '1123px',
      background: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#0f172a',
      padding: '48px 56px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      {/* Top Banner Accent */}
      <div style={{ height: '8px', background: '#ef4444', margin: '-48px -56px 32px -56px' }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.025em', color: '#1e293b', lineHeight: 1.1, marginBottom: '6px' }}>
            {personal.fullName || 'Your Name'}
          </h1>
          <div style={{ fontSize: '1.1rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {personal.title || 'Founder / Builder'}
          </div>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', color: '#64748b' }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.website && <div style={{ color: '#ef4444', fontWeight: 600 }}>{personal.website}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ef4444', marginBottom: '8px' }}>Vision & Impact</h2>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#334155', fontWeight: 500 }}>{personal.summary}</p>
        </div>
      )}

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '36px', flex: 1 }}>
        {/* Left Column: Experience & Projects */}
        <div>
          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ef4444', marginBottom: '16px', borderBottom: '2px solid #ef4444', paddingBottom: '4px' }}>
                Track Record & Ventures
              </h2>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>{exp.position}</h3>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                      {fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#ef4444', fontWeight: 600, marginBottom: '6px' }}>
                    {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <div style={{ fontSize: '0.8rem', lineHeight: 1.5, color: '#475569' }}>
                      {exp.description.split('\n').map((line, i) => <p key={i} style={{ margin: '0 0 4px 0' }}>{line}</p>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ef4444', marginBottom: '16px', borderBottom: '2px solid #ef4444', paddingBottom: '4px' }}>
                Builds & Open Source
              </h2>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>{proj.name}</h4>
                    {proj.github && <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{proj.github}</span>}
                  </div>
                  {proj.description && <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0 0 6px 0', lineHeight: 1.4 }}>{proj.description}</p>}
                  {proj.technologies && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {proj.technologies.split(',').map(tech => (
                        <span key={tech} style={{ fontSize: '0.65rem', padding: '2px 6px', background: '#f1f5f9', color: '#475569', borderRadius: '3px', fontWeight: 600 }}>
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Skills, Education, Certifications */}
        <div>
          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ef4444', marginBottom: '16px', borderBottom: '2px solid #ef4444', paddingBottom: '4px' }}>
                Core Stack & Expertise
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map(sk => (
                  <span key={sk.id} style={{
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    background: '#fef2f2',
                    border: '1px solid #fee2e2',
                    color: '#ef4444',
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ef4444', marginBottom: '16px', borderBottom: '2px solid #ef4444', paddingBottom: '4px' }}>
                Education
              </h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{edu.degree} {edu.field}</div>
                  <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 500 }}>{edu.institution}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic' }}>
                    {fmt(edu.startDate)} – {fmt(edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ef4444', marginBottom: '16px', borderBottom: '2px solid #ef4444', paddingBottom: '4px' }}>
                Certifications
              </h2>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e293b' }}>{cert.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{cert.issuer} · {fmt(cert.date)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
