import React from 'react';
import { ResumeData } from '@/lib/store';
import styles from './TealProfessionalTemplate.module.css';
import {
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  FolderIcon
} from '@heroicons/react/24/solid';

interface Props {
  data: ResumeData;
}

export default function TealProfessionalTemplate({ data }: Props) {
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

        <div className={styles.sidebarSection}>
          <div className={styles.sidebarTitle}>CONTACT</div>
          <div className={styles.contactList}>
            {personal.phone && (
              <div className={styles.contactItem}>
                <div className={styles.iconCircle}><PhoneIcon className={styles.icon} /></div>
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.email && (
              <div className={styles.contactItem}>
                <div className={styles.iconCircle}><EnvelopeIcon className={styles.icon} /></div>
                <span>{personal.email}</span>
              </div>
            )}
            {personal.location && (
              <div className={styles.contactItem}>
                <div className={styles.iconCircle}><MapPinIcon className={styles.icon} /></div>
                <span>{personal.location}</span>
              </div>
            )}
          </div>
        </div>


        {skills.length > 0 && (
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle}>SKILLS</div>
            <div className={styles.barList}>
              {skills.map((skill, i) => (
                <div key={i} className={styles.barItem}>
                  <div className={styles.barLabel}>{skill.name}</div>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: '90%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.name}>{personal.fullName}</h1>
          <h2 className={styles.title}>{personal.title}</h2>
        </div>
        <div className={styles.headerCurve}></div>

        <div className={styles.content}>
          {personal.summary && (
            <div className={styles.section}>
              <div className={styles.sectionTitlePill}>
                <UserIcon className={styles.pillIcon} />
                PROFILE
              </div>
              <div className={styles.summary} dangerouslySetInnerHTML={{ __html: personal.summary }} />
            </div>
          )}

          {education.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitlePill}>
                <AcademicCapIcon className={styles.pillIcon} />
                EDUCATION
              </div>
              <div className={styles.entryList}>
                {education.map(edu => (
                  <div key={edu.id} className={styles.entry}>
                    <div className={styles.date}>
                      {edu.startDate} {edu.startDate && edu.endDate ? '-' : ''} {edu.endDate}
                    </div>
                    <div className={styles.schoolName}>{edu.degree} - {edu.institution}</div>
                    {edu.gpa && <div className={styles.gpa}>GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {experience.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitlePill}>
                <BriefcaseIcon className={styles.pillIcon} />
                EXPERIENCE
              </div>
              <div className={styles.entryList}>
                {experience.map(exp => (
                  <div key={exp.id} className={styles.entry} style={exp.pageBreak ? { pageBreakBefore: 'always' } : {}}>
                    <div className={styles.date}>
                      {exp.startDate} {exp.startDate && exp.endDate ? '-' : ''} {exp.current ? 'PRESENT' : exp.endDate}
                    </div>
                    <div className={styles.companyPosition}>{exp.position} - {exp.company}</div>
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
              <div className={styles.sectionTitlePill}>
                <FolderIcon className={styles.pillIcon} />
                PROJECTS
              </div>
              <div className={styles.entryList}>
                {projects.map(proj => (
                  <div key={proj.id} className={styles.entry} style={proj.pageBreak ? { pageBreakBefore: 'always' } : {}}>
                    <div className={styles.companyPosition}>{proj.name}</div>
                    {proj.technologies && <div className={styles.gpa}>{proj.technologies}</div>}
                    {proj.description && (
                      <div className={styles.entryDesc} dangerouslySetInnerHTML={{ __html: proj.description }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
