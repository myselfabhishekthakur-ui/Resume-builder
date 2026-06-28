import { ResumeData } from '@/lib/store';

interface Props { data: ResumeData; }
const fmt = (d: string) => d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export default function CreativeFlowTemplate({ data }: Props) {
  const { personal, experience, education, skills, projects, certifications } = data;
  return (
    <div style={{
      width: '794px',
      minHeight: '1123px',
      background: '#faf5ff', // Very light purple
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#3b0764', // Dark purple text
      padding: '40px 48px',
      display: 'flex',
      gap: '24px',
      boxSizing: 'border-box'
    }}>
      {/* Left Column (Colorful sidebar) */}
      <div style={{
        width: '220px',
        background: '#a855f7',
        color: '#ffffff',
        borderRadius: '16px',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        flexShrink: 0
      }}>
        {/* Profile Head */}
        <div>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: '#ffffff',
            color: '#a855f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            fontWeight: 900,
            marginBottom: '16px'
          }}>
            {personal.fullName ? personal.fullName.charAt(0).toUpperCase() : '*'}
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px 0', lineHeight: 1.1 }}>{personal.fullName || 'Your Name'}</h2>
          <div style={{ fontSize: '0.8rem', color: '#f3e8ff', fontWeight: 600 }}>{personal.title}</div>
        </div>

        {/* Contact info */}
        <div>
          <h3 style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f3e8ff', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', marginBottom: '8px' }}>
            CONNECT
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem', wordBreak: 'break-all' }}>
            {personal.email && <div>✉ {personal.email}</div>}
            {personal.phone && <div>📱 {personal.phone}</div>}
            {personal.location && <div>📍 {personal.location}</div>}
            {personal.website && <div style={{ fontWeight: 600 }}>🔗 {personal.website}</div>}
            {personal.linkedin && <div>in: {personal.linkedin}</div>}
            {personal.github && <div>gh: {personal.github}</div>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f3e8ff', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', marginBottom: '8px' }}>
              SKILLS
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.map(sk => (
                <span key={sk.id} style={{ fontSize: '0.68rem', padding: '3px 8px', background: 'rgba(255,255,255,0.15)', borderRadius: '6px', fontWeight: 500 }}>
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f3e8ff', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', marginBottom: '8px' }}>
              RECOGNITION
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {certifications.map(cert => (
                <div key={cert.id} style={{ fontSize: '0.7rem' }}>
                  <div style={{ fontWeight: 600 }}>{cert.name}</div>
                  <div style={{ opacity: 0.8 }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column (Content) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', padding: '8px 0' }}>
        {/* Intro Summary */}
        {personal.summary && (
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #f3e8ff' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>My Creative Focus</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#581c87', margin: 0 }}>{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', borderBottom: '2px solid #e9d5ff', paddingBottom: '4px' }}>
              Work History
            </h3>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '14px', background: '#ffffff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #f3e8ff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#3b0764' }}>{exp.position}</strong>
                  <span style={{ fontSize: '0.72rem', color: '#9333ea', fontWeight: 600 }}>{[fmt(exp.startDate), exp.current ? 'Present' : fmt(exp.endDate)].filter(Boolean).join(' – ')}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#a855f7', fontWeight: 600, marginBottom: '6px' }}>{exp.company}</div>
                {exp.description && <p style={{ fontSize: '0.78rem', color: '#581c87', margin: 0, lineHeight: 1.45 }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', borderBottom: '2px solid #e9d5ff', paddingBottom: '4px' }}>
              Featured Creations
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {projects.map(proj => (
                <div key={proj.id} style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #f3e8ff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#3b0764' }}>{proj.name}</strong>
                    {proj.url && <span style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: 600 }}>🔗 Link</span>}
                  </div>
                  {proj.description && <p style={{ fontSize: '0.78rem', color: '#581c87', margin: '0 0 6px 0', lineHeight: 1.4 }}>{proj.description}</p>}
                  {proj.technologies && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {proj.technologies.split(',').map(tech => (
                        <span key={tech} style={{ fontSize: '0.62rem', padding: '2px 6px', background: '#faf5ff', color: '#a855f7', borderRadius: '4px', border: '1px solid #f3e8ff' }}>
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

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', borderBottom: '2px solid #e9d5ff', paddingBottom: '4px' }}>
              Education
            </h3>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#3b0764' }}>{edu.degree} {edu.field}</strong>
                  <span style={{ fontSize: '0.7rem', color: '#7c3aed' }}>{[fmt(edu.startDate), fmt(edu.endDate)].filter(Boolean).join(' – ')}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#701a75' }}>{edu.institution}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
