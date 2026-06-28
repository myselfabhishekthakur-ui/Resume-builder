import { ResumeData } from '@/lib/store';
const fmt = (d: string) => d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export default function ExecSuiteTemplate({ data }: { data: ResumeData }) {
  const { personal, experience, education, skills, certifications } = data;
  return (
    <div style={{ width: 794, minHeight: 1123, background: '#fff', fontFamily: 'Georgia, serif', color: '#1a1a1a', padding: '48px 56px' }}>
      <div style={{ borderBottom: '3px solid #f59e0b', paddingBottom: 24, marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Georgia', fontSize: '2.4rem', fontWeight: 700, letterSpacing: '-0.01em', color: '#111', marginBottom: 6 }}>{personal.fullName || 'Your Name'}</h1>
        <div style={{ fontSize: '1rem', color: '#f59e0b', fontWeight: 600, marginBottom: 10 }}>{personal.title}</div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: '0.78rem', color: '#555' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>
      {personal.summary && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 10 }}>EXECUTIVE PROFILE</h2>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: '#333', fontStyle: 'italic' }}>{personal.summary}</p>
        </div>
      )}
      {experience.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 14 }}>CAREER HISTORY</h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: 16, paddingLeft: 16, borderLeft: '3px solid #fbbf24' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '0.9rem', color: '#111' }}>{exp.position}</strong>
                <span style={{ fontSize: '0.7rem', color: '#888', fontStyle: 'italic' }}>{[fmt(exp.startDate), exp.current ? 'Present' : fmt(exp.endDate)].filter(Boolean).join(' – ')}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
              {exp.description && <div style={{ fontSize: '0.78rem', lineHeight: 1.6, color: '#444', marginTop: 6 }}>{exp.description.split('\n').map((l, i) => <p key={i}>{l}</p>)}</div>}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 12 }}>EDUCATION</h2>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{edu.degree} {edu.field}</div>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>{edu.institution}</div>
              </div>
            ))}
          </div>
        )}
        {skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 12 }}>EXPERTISE</h2>
            {skills.map(sk => (
              <div key={sk.id} style={{ fontSize: '0.8rem', color: '#333', marginBottom: 4 }}>▸ {sk.name}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
