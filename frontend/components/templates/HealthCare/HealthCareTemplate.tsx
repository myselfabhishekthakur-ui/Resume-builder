import { ResumeData } from '@/lib/store';

interface Props { data: ResumeData; }
const fmt = (d: string) => d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export default function HealthCareTemplate({ data }: Props) {
  const { personal, experience, education, skills, projects, certifications } = data;
  return (
    <div style={{
      width: '794px',
      minHeight: '1123px',
      background: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#334155',
      padding: '48px 56px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      {/* Clinically clean top band */}
      <div style={{ height: '6px', background: '#0ea5e9', margin: '-48px -56px 28px -56px' }} />

      {/* Header */}
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#0369a1', margin: '0 0 4px 0' }}>
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '1rem', color: '#0ea5e9', fontWeight: 600, marginBottom: '12px' }}>
          {personal.title || 'Healthcare Professional'}
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px 20px',
          fontSize: '0.78rem',
          color: '#64748b'
        }}>
          {personal.email && <div>✉ {personal.email}</div>}
          {personal.phone && <div>📱 {personal.phone}</div>}
          {personal.location && <div>📍 {personal.location}</div>}
          {personal.linkedin && <div>in: {personal.linkedin}</div>}
          {personal.website && <div style={{ color: '#0ea5e9' }}>🔗 {personal.website}</div>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0369a1', marginBottom: '8px' }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.55, color: '#475569', margin: 0 }}>{personal.summary}</p>
        </div>
      )}

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '32px', flex: 1 }}>
        <div>
          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0369a1', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                Clinical & Work Experience
              </h2>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{exp.position}</strong>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{[fmt(exp.startDate), exp.current ? 'Present' : fmt(exp.endDate)].filter(Boolean).join(' – ')}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#0ea5e9', fontWeight: 600, marginBottom: '4px' }}>{exp.company}</div>
                  {exp.description && (
                    <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.45 }}>
                      {exp.description.split('\n').map((line, i) => (
                        <p key={i} style={{ margin: '0 0 2px 0' }}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects or Case Studies */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0369a1', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                Research & Case Studies
              </h2>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: '12px' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#0f172a', display: 'block' }}>{proj.name}</strong>
                  {proj.description && <p style={{ fontSize: '0.75rem', color: '#475569', margin: '2px 0' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0369a1', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                Expertise & Specialties
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {skills.map(sk => (
                  <div key={sk.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#475569' }}>
                    <span>• {sk.name}</span>
                    <span style={{ fontSize: '0.65rem', background: '#f0f9ff', color: '#0369a1', padding: '1px 5px', borderRadius: '3px', fontWeight: 600 }}>{sk.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0369a1', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                Education
              </h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{edu.degree} {edu.field}</div>
                  <div style={{ fontSize: '0.75rem', color: '#475569' }}>{edu.institution}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{[fmt(edu.startDate), fmt(edu.endDate)].filter(Boolean).join(' – ')}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications & Licensure */}
          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0369a1', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                Licensure & Certs
              </h2>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '8px', fontSize: '0.75rem' }}>
                  <strong style={{ color: '#0f172a' }}>{cert.name}</strong>
                  <div style={{ color: '#64748b' }}>{cert.issuer} ({fmt(cert.date)})</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
