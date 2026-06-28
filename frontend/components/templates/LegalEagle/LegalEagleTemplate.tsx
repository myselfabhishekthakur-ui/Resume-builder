import { ResumeData } from '@/lib/store';

interface Props { data: ResumeData; }
const fmt = (d: string) => d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export default function LegalEagleTemplate({ data }: Props) {
  const { personal, experience, education, skills, projects, certifications } = data;
  return (
    <div style={{
      width: '794px',
      minHeight: '1123px',
      background: '#ffffff',
      fontFamily: 'Georgia, serif',
      color: '#111827',
      padding: '56px 64px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      {/* Formal Centered Header */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #374151', paddingBottom: '16px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 500, letterSpacing: '0.02em', color: '#111827', margin: '0 0 4px 0' }}>
          {personal.fullName || 'YOUR NAME'}
        </h1>
        <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
          {personal.title || 'Attorney at Law'}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          fontSize: '0.78rem',
          color: '#4b5563',
          flexWrap: 'wrap'
        }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.email && (personal.phone || personal.location) && <span>•</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.phone && personal.location && <span>•</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>• {personal.linkedin}</span>}
        </div>
      </div>

      {/* Profile/Summary */}
      {personal.summary && (
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#374151', textAlign: 'justify', margin: 0 }}>
            {personal.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', borderBottom: '1px solid #9ca3af', paddingBottom: '3px', marginBottom: '12px' }}>
            Professional Experience
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <strong style={{ fontSize: '0.88rem', color: '#111827' }}>{exp.position}</strong>
                <span style={{ fontSize: '0.78rem', color: '#4b5563', fontStyle: 'italic' }}>{[fmt(exp.startDate), exp.current ? 'Present' : fmt(exp.endDate)].filter(Boolean).join(' – ')}</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#4b5563', fontWeight: 600, marginBottom: '4px' }}>
                {exp.company}{exp.location ? `, ${exp.location}` : ''}
              </div>
              {exp.description && (
                <div style={{ fontSize: '0.8rem', lineHeight: 1.5, color: '#374151', textAlign: 'justify' }}>
                  {exp.description.split('\n').map((line, i) => (
                    <p key={i} style={{ margin: '0 0 4px 0' }}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', borderBottom: '1px solid #9ca3af', paddingBottom: '3px', marginBottom: '12px' }}>
            Education
          </h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <strong style={{ fontSize: '0.88rem', color: '#111827' }}>{edu.degree} in {edu.field}</strong>
                <span style={{ fontSize: '0.78rem', color: '#4b5563', fontStyle: 'italic' }}>{[fmt(edu.startDate), fmt(edu.endDate)].filter(Boolean).join(' – ')}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#4b5563' }}>
                {edu.institution}
              </div>
              {edu.gpa && <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '2px' }}>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Two columns for projects, certifications, skills */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '28px' }}>
        {/* Projects / Publications */}
        <div>
          {projects.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', borderBottom: '1px solid #9ca3af', paddingBottom: '2px', marginBottom: '10px' }}>
                Publications & Case Highlights
              </h3>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#111827', display: 'block' }}>{proj.name}</strong>
                  {proj.description && <p style={{ fontSize: '0.78rem', color: '#374151', margin: '2px 0 0 0', lineHeight: 1.4 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills & Licenses */}
        <div>
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', borderBottom: '1px solid #9ca3af', paddingBottom: '2px', marginBottom: '10px' }}>
                Bar Admissions & Skills
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.78rem', color: '#374151' }}>
                {skills.map(sk => (
                  <div key={sk.id}>• {sk.name}</div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', borderBottom: '1px solid #9ca3af', paddingBottom: '2px', marginBottom: '10px' }}>
                Memberships & Certifications
              </h3>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '6px', fontSize: '0.75rem' }}>
                  <strong style={{ color: '#111827' }}>{cert.name}</strong>
                  <div style={{ color: '#4b5563' }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
