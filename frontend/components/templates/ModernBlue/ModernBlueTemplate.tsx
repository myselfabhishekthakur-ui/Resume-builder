import React from 'react';
import { ResumeData } from '@/lib/store';
import styles from './ModernBlueTemplate.module.css';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  GlobeAltIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

interface Props {
  data: ResumeData;
}

export default function ModernBlueTemplate({ data }: Props) {
  const { personal, experience, education, projects, skills } = data;

  const getInitials = () => {
    if (!personal.fullName) return '?';
    const parts = personal.fullName.split(' ');
    const f = parts[0] ? parts[0].charAt(0).toUpperCase() : '';
    const l = parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() : '';
    return f + l || '?';
  };

  return (
    <div className={`${styles.resume} stretch-template`}>
      <aside className={styles.sidebar}>
        <div className={styles.avatar}>
          {getInitials()}
        </div>

        <div className={styles.sectionTitle}>CONTACT</div>
        <div className={styles.contactList}>
          {personal.phone && (
            <div className={styles.contactItem}>
              <PhoneIcon className={styles.icon} />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.email && (
            <div className={styles.contactItem}>
              <EnvelopeIcon className={styles.icon} />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.location && (
            <div className={styles.contactItem}>
              <MapPinIcon className={styles.icon} />
              <span>{personal.location}</span>
            </div>
          )}
          {personal.website && (
            <div className={styles.contactItem}>
              <GlobeAltIcon className={styles.icon} />
              <span>{personal.website}</span>
            </div>
          )}
        </div>

        {education.length > 0 && (
          <>
            <div className={styles.sectionTitle}>EDUCATION</div>
            <div className={styles.entryList}>
              {education.map(edu => (
                <div key={edu.id} className={styles.entry}>
                  <div className={styles.date}>
                    {edu.startDate} {edu.startDate && edu.endDate ? '-' : ''} {edu.endDate}
                  </div>
                  <div className={styles.schoolName}>{edu.institution}</div>
                  <div className={styles.degree}>{edu.degree}</div>
                  {edu.gpa && <div className={styles.gpa}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </>
        )}

        {skills.length > 0 && (
          <>
            <div className={styles.sectionTitle}>SKILLS</div>
            <ul className={styles.skillList}>
              {skills.map((skill, i) => (
                <li key={i} className={styles.skillItem}>{skill.name}</li>
              ))}
            </ul>
          </>
        )}

      </aside>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.name}>
            <span className={styles.firstName}>{personal.fullName ? personal.fullName.split(' ')[0] : ''}</span>{' '}
            <span className={styles.lastName}>{personal.fullName && personal.fullName.split(' ').length > 1 ? personal.fullName.split(' ').slice(1).join(' ') : ''}</span>
          </h1>
          <h2 className={styles.title}>{personal.title}</h2>
          <div className={styles.headerLine}></div>
        </div>

        {personal.summary && (
          <>
            <div className={styles.mainSectionTitle}>PROFILE</div>
            <div className={styles.summary} dangerouslySetInnerHTML={{ __html: personal.summary }} />
          </>
        )}

        {experience.length > 0 && (
          <>
            <div className={styles.mainSectionTitle}>WORK EXPERIENCE</div>
            <div className={styles.entryList}>
              {experience.map(exp => (
                <div key={exp.id} className={styles.mainEntry} style={exp.pageBreak ? { pageBreakBefore: 'always' } : {}}>
                  <div className={styles.mainEntryHeader}>
                    <div className={styles.entryCompany}>{exp.company}</div>
                    <div className={styles.mainDate}>
                      {exp.startDate} {exp.startDate && exp.endDate ? '-' : ''} {exp.current ? 'PRESENT' : exp.endDate}
                    </div>
                  </div>
                  <div className={styles.entryPosition}>{exp.position}</div>
                  {exp.description && (
                    <div className={styles.entryDesc} dangerouslySetInnerHTML={{ __html: exp.description }} />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {projects.length > 0 && (
          <>
            <div className={styles.mainSectionTitle}>PROJECTS</div>
            <div className={styles.entryList}>
              {projects.map(proj => (
                <div key={proj.id} className={styles.mainEntry} style={proj.pageBreak ? { pageBreakBefore: 'always' } : {}}>
                  <div className={styles.mainEntryHeader}>
                    <div className={styles.entryCompany}>{proj.name}</div>
                  </div>
                  {proj.technologies && <div className={styles.entryPosition}>{proj.technologies}</div>}
                  {proj.url && (
                    <div className={styles.link}>
                      <LinkIcon className={styles.iconSmall} /> {proj.url}
                    </div>
                  )}
                  {proj.description && (
                    <div className={styles.entryDesc} dangerouslySetInnerHTML={{ __html: proj.description }} />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
