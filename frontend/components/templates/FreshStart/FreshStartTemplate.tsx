import { ResumeData } from '@/lib/store';

interface Props { data: ResumeData; }
const fmt = (d: string) => d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export default function FreshStartTemplate({ data }: Props) {
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
      {/* Header card with gradient border */}
      <div style={{
        background: 'linear-gradient(135deg, #fdf2f8, #fbcfe8)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '28px',
        border: '1px solid #f9a8d4',
        position: 'relative'
      }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#be185d', margin: '0 0 6px 0', lineHeight: 1.1 }}>
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '1rem', color: '#db2777', fontWeight: 600, marginBottom: '16px' }}>
          {personal.title || 'Aspiring Professional'}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px 16px',
          fontSize: '0.8rem',
          color: '#475569',
          borderTop: '1px solid rgba(219, 39, 119, 0.2)',
          paddingTop: '16px'
        }}>
          {personal.email && <div>✉ {personal.email}</div>}
          {personal.phone && <div>📱 {personal.phone}</div>}
          {personal.location && <div>📍 {personal.location}</div>}
          {personal.website && <div>🔗 <span style={{ color: '#db2777', fontWeight: 600 }}>{personal.website}</span></div>}
          {personal.linkedin && <div>in: {personal.linkedin}</div>}
          {personal.github && <div>gh: {personal.github}</div>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#db2777', marginBottom: '8px' }}>About Me</h2>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#475569' }}>{personal.summary}</p>
        </div>
      )}

      {/* Skills-First Layout */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#db2777', marginBottom: '12px' }}>Skills & Strengths</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map(sk => (
              <div key={sk.id} style={{
                fontSize: '0.8rem',
                padding: '6px 12px',
                background: '#ffffff',
                border: '2px solid #fbcfe8',
                borderRadius: '9999px',
                color: '#db2777',
                fontWeight: 600,
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}>
                {sk.name} <span style={{ fontSize: '0.65rem', color: '#f472b6', marginLeft: '4px' }}>• {sk.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Education, Projects & Experience */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', flex: 1 }}>
        <div>
          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#db2777', marginBottom: '14px', borderBottom: '2px dashed #fbcfe8', paddingBottom: '4px' }}>
                Academic & Personal Projects
              </h2>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', margin: '0 0 4px 0' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0 0 6px 0', lineHeight: 1.45 }}>{proj.description}</p>}
                  {proj.technologies && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {proj.technologies.split(',').map(tech => (
                        <span key={tech} style={{ fontSize: '0.62rem', padding: '1px 5px', background: '#fdf2f8', color: '#db2777', border: '1px solid #fbcfe8', borderRadius: '3px' }}>
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#db2777', marginBottom: '14px', borderBottom: '2px dashed #fbcfe8', paddingBottom: '4px' }}>
                Experience / Internships
              </h2>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>{exp.position}</h3>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#db2777', fontWeight: 500, marginBottom: '4px' }}>{exp.company}</div>
                  {exp.description && <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#db2777', marginBottom: '14px', borderBottom: '2px dashed #fbcfe8', paddingBottom: '4px' }}>
                Education
              </h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{edu.degree} {edu.field}</div>
                  <div style={{ fontSize: '0.78rem', color: '#475569' }}>{edu.institution}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{fmt(edu.startDate)} – {fmt(edu.endDate)}</div>
                  {edu.gpa && <div style={{ fontSize: '0.75rem', color: '#db2777', fontWeight: 600, marginTop: '2px' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#db2777', marginBottom: '14px', borderBottom: '2px dashed #fbcfe8', paddingBottom: '4px' }}>
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
