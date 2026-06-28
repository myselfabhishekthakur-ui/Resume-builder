import React from 'react';
import { ResumeData } from '@/lib/store';
import styles from './YellowAccentTemplate.module.css';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  GlobeAltIcon
} from '@heroicons/react/24/solid';

interface Props {
  data: ResumeData;
}

export default function YellowAccentTemplate({ data }: Props) {
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
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.name}>{personal.fullName ? personal.fullName.split(' ')[0] : ''} <br/> {personal.fullName && personal.fullName.split(' ').length > 1 ? personal.fullName.split(' ').slice(1).join(' ') : ''}</h1>
          <h2 className={styles.title}>{personal.title}</h2>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.contactList}>
            {personal.location && (
              <div className={styles.contactItem}>
                <span>{personal.location}</span>
                <div className={styles.iconBox}><MapPinIcon className={styles.icon} /></div>
              </div>
            )}
            {personal.phone && (
              <div className={styles.contactItem}>
                <span>{personal.phone}</span>
                <div className={styles.iconBox}><PhoneIcon className={styles.icon} /></div>
              </div>
            )}
            {personal.email && (
              <div className={styles.contactItem}>
                <span>{personal.email}</span>
                <div className={styles.iconBox}><EnvelopeIcon className={styles.icon} /></div>
              </div>
            )}
            {personal.website && (
              <div className={styles.contactItem}>
                <span>{personal.website}</span>
                <div className={styles.iconBox}><GlobeAltIcon className={styles.icon} /></div>
              </div>
            )}
          </div>
          <div className={styles.yellowBar}></div>
        </div>
      </header>

      <div className={styles.columns}>
        <aside className={styles.sidebar}>
          <div className={styles.avatarBlock}>
            <div className={styles.avatar}>
              {getInitials()}
            </div>
          </div>

          {education.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>EDUCATION</div>
              <div className={styles.entryListSmall}>
                {education.map(edu => (
                  <div key={edu.id} className={styles.entrySmall}>
                    <div className={styles.degree}>{edu.degree}</div>
                    <div className={styles.schoolName}>{edu.institution}</div>
                    <div className={styles.dateSmall}>
                      {edu.startDate} {edu.startDate && edu.endDate ? '-' : ''} {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>SKILLS</div>
              <div className={styles.skillList}>
                {skills.map((skill, i) => (
                  <div key={i} className={styles.skillItem}>
                    <div className={styles.skillName}>{skill.name}</div>
                    <div className={styles.skillBar}><div className={styles.skillFill}></div></div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </aside>

        <main className={styles.main}>
          {personal.summary && (
            <div className={styles.section}>
              <div className={styles.mainSectionTitle}>ABOUT ME</div>
              <div className={styles.quoteMark}>"</div>
              <div className={styles.summary} dangerouslySetInnerHTML={{ __html: personal.summary }} />
            </div>
          )}

          {experience.length > 0 && (
            <div className={styles.section}>
              <div className={styles.mainSectionTitle}>EXPERIENCE</div>
              <div className={styles.timeline}>
                {experience.map(exp => (
                  <div key={exp.id} className={styles.timelineEntry} style={exp.pageBreak ? { pageBreakBefore: 'always' } : {}}>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.entryPosition}>{exp.position}</div>
                    <div className={styles.entryCompanyDate}>
                      {exp.company} | {exp.startDate} {exp.startDate && exp.endDate ? '-' : ''} {exp.current ? 'PRESENT' : exp.endDate}
                    </div>
                    {exp.description && (
                      <div className={styles.entryDesc} dangerouslySetInnerHTML={{ __html: exp.description }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className={styles.section}>
              <div className={styles.mainSectionTitle}>PROJECTS</div>
              <div className={styles.timeline}>
                {projects.map(proj => (
                  <div key={proj.id} className={styles.timelineEntry} style={proj.pageBreak ? { pageBreakBefore: 'always' } : {}}>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.entryPosition}>{proj.name}</div>
                    <div className={styles.entryCompanyDate}>
                      {proj.technologies}
                    </div>
                    {proj.description && (
                      <div className={styles.entryDesc} dangerouslySetInnerHTML={{ __html: proj.description }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
