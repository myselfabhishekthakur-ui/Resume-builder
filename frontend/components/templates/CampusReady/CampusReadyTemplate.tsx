import { ResumeData } from '@/lib/store';

interface Props { data: ResumeData; }
const fmt = (d: string) => d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export default function CampusReadyTemplate({ data }: Props) {
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
      {/* Top Banner */}
      <div style={{
        borderBottom: '4px solid #14b8a6',
        paddingBottom: '16px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f766e', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
            {personal.fullName || 'Your Name'}
          </h1>
          <div style={{ fontSize: '0.95rem', color: '#14b8a6', fontWeight: 600 }}>
            {personal.title || 'Student / Intern'}
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px 16px',
          justifyContent: 'flex-end',
          maxWidth: '50%',
          fontSize: '0.75rem',
          color: '#475569',
          textAlign: 'right'
        }}>
          {personal.email && <div>✉ {personal.email}</div>}
          {personal.phone && <div>📱 {personal.phone}</div>}
          {personal.location && <div>📍 {personal.location}</div>}
          {personal.website && <div style={{ color: '#14b8a6', fontWeight: 600 }}>🔗 {personal.website}</div>}
          {personal.linkedin && <div>in: {personal.linkedin}</div>}
          {personal.github && <div>gh: {personal.github}</div>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.5, color: '#475569', margin: 0 }}>{personal.summary}</p>
        </div>
      )}

      {/* Education First */}
      {education.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f766e', background: '#f0fdfa', padding: '4px 8px', borderRadius: '4px', marginBottom: '10px' }}>
            Education
          </h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{edu.degree} in {edu.field || 'General Study'}</strong>
                <div style={{ fontSize: '0.8rem', color: '#475569' }}>{edu.institution}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{[fmt(edu.startDate), fmt(edu.endDate)].filter(Boolean).join(' – ')}</div>
                {edu.gpa && <div style={{ fontSize: '0.75rem', color: '#14b8a6', fontWeight: 700 }}>GPA: {edu.gpa}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f766e', background: '#f0fdfa', padding: '4px 8px', borderRadius: '4px', marginBottom: '10px' }}>
            Internships & Experience
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{exp.position}</strong>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{[fmt(exp.startDate), exp.current ? 'Present' : fmt(exp.endDate)].filter(Boolean).join(' – ')}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#14b8a6', fontWeight: 600, marginBottom: '4px' }}>{exp.company}</div>
              {exp.description && <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0, lineHeight: 1.45 }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f766e', background: '#f0fdfa', padding: '4px 8px', borderRadius: '4px', marginBottom: '10px' }}>
            Key Projects
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ border: '1px solid #e2e8f0', padding: '10px', borderRadius: '6px', background: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#0f172a' }}>{proj.name}</strong>
                  {proj.github && <span style={{ fontSize: '0.68rem', color: '#64748b' }}>gh</span>}
                </div>
                {proj.description && <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0 0 6px 0', lineHeight: 1.4 }}>{proj.description}</p>}
                {proj.technologies && (
                  <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                    {proj.technologies.split(',').map(tech => (
                      <span key={tech} style={{ fontSize: '0.6rem', padding: '1px 4px', background: '#e0f2fe', color: '#0369a1', borderRadius: '2px' }}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Columns for Skills & Certifications */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f766e', background: '#f0fdfa', padding: '4px 8px', borderRadius: '4px', marginBottom: '10px' }}>
              Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.map(sk => (
                <span key={sk.id} style={{ fontSize: '0.72rem', padding: '2px 8px', border: '1px solid #14b8a6', color: '#0f766e', borderRadius: '4px', background: '#ffffff', fontWeight: 600 }}>
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f766e', background: '#f0fdfa', padding: '4px 8px', borderRadius: '4px', marginBottom: '10px' }}>
              Certifications
            </h2>
            {certifications.map(cert => (
              <div key={cert.id} style={{ marginBottom: '6px', fontSize: '0.75rem' }}>
                <strong style={{ color: '#0f172a' }}>{cert.name}</strong>
                <div style={{ color: '#64748b' }}>{cert.issuer} ({fmt(cert.date)})</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
