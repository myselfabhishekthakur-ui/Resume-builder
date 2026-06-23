import { ResumeData } from '@/lib/store';

interface Props { data: ResumeData; }
const fmt = (d: string) => d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export default function MarketProTemplate({ data }: Props) {
  const { personal, experience, education, skills, projects, certifications } = data;
  return (
    <div style={{
      width: '794px',
      minHeight: '1123px',
      background: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#1e293b',
      padding: '48px 56px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      {/* Top section with bold orange header */}
      <div style={{
        display: 'flex',
        borderBottom: '3px solid #f97316',
        paddingBottom: '24px',
        marginBottom: '24px',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c2410c', margin: '0 0 4px 0', letterSpacing: '-0.025em' }}>
            {personal.fullName || 'Your Name'}
          </h1>
          <div style={{ fontSize: '1.1rem', color: '#f97316', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {personal.title || 'Marketing & Growth Professional'}
          </div>
        </div>
        <div style={{
          textAlign: 'right',
          fontSize: '0.8rem',
          color: '#475569',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px'
        }}>
          {personal.email && <div>✉ {personal.email}</div>}
          {personal.phone && <div>📱 {personal.phone}</div>}
          {personal.location && <div>📍 {personal.location}</div>}
          {personal.website && <div style={{ color: '#ea580c', fontWeight: 600 }}>🔗 {personal.website}</div>}
          {personal.linkedin && <div>in: {personal.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#334155', borderLeft: '3px solid #f97316', paddingLeft: '16px', margin: 0, fontStyle: 'italic' }}>
            {personal.summary}
          </p>
        </div>
      )}

      {/* Main Grid: left content, right sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '32px', flex: 1 }}>
        <div>
          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c2410c', marginBottom: '16px' }}>
                Professional History
              </h2>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{exp.position}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#f97316', fontWeight: 600, marginBottom: '6px' }}>{exp.company}</div>
                  {exp.description && (
                    <div style={{ fontSize: '0.8rem', lineHeight: 1.5, color: '#475569' }}>
                      {exp.description.split('\n').map((line, i) => (
                        <p key={i} style={{ margin: '0 0 4px 0' }}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c2410c', marginBottom: '16px' }}>
                Key Campaigns & Projects
              </h2>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: '16px' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#1e293b', display: 'block', marginBottom: '4px' }}>{proj.name}</strong>
                  {proj.description && <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0 0 6px 0', lineHeight: 1.4 }}>{proj.description}</p>}
                  {proj.technologies && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {proj.technologies.split(',').map(tech => (
                        <span key={tech} style={{ fontSize: '0.62rem', padding: '1px 5px', background: '#fff7ed', color: '#c2410c', border: '1px solid #ffedd5', borderRadius: '3px' }}>
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

        <div>
          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c2410c', marginBottom: '16px' }}>
                Expertise & Tools
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map(sk => (
                  <span key={sk.id} style={{
                    fontSize: '0.72rem',
                    padding: '4px 10px',
                    background: '#fff7ed',
                    border: '1px solid #ffedd5',
                    color: '#ea580c',
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
              <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c2410c', marginBottom: '16px' }}>
                Education
              </h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{edu.degree} {edu.field}</div>
                  <div style={{ fontSize: '0.78rem', color: '#475569' }}>{edu.institution}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{fmt(edu.startDate)} – {fmt(edu.endDate)}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c2410c', marginBottom: '16px' }}>
                Certifications
              </h2>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e293b' }}>{cert.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{cert.issuer} ({fmt(cert.date)})</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
