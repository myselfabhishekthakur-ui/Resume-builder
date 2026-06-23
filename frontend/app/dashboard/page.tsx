'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import { api, ResumeServerResponse } from '@/lib/api';
import { TEMPLATES } from '@/lib/templates';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState<ResumeServerResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const data = await api.getResumes();
      setResumes(data);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      // Small timeout to ensure the SessionSync has finished and set the nestjs_jwt
      const timer = setTimeout(() => {
        fetchResumes();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this resume?')) return;
    try {
      await api.deleteResume(id);
      setResumes(resumes.filter(r => r.id !== id));
    } catch (err) {
      console.error('Failed to delete resume:', err);
    }
  };

  if (status === 'loading' || (status === 'authenticated' && loading)) {
    return (
      <div className={styles.loading}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <Navbar />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerRow}>
            <div>
              <span className="badge badge-primary">DASHBOARD</span>
              <h1>Welcome back, <span className="gradient-text">{session?.user?.name || 'User'}</span></h1>
              <p>Manage your saved resumes, or create a brand new one.</p>
            </div>
            <Link href="/templates" className="btn btn-primary btn-lg">
              ➕ Create New Resume
            </Link>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className="container">
          {resumes.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📄</div>
              <h2>No resumes found</h2>
              <p>Select a template and start building your professional CV today.</p>
              <Link href="/templates" className="btn btn-primary btn-lg" style={{ marginTop: '20px' }}>
                Browse Templates
              </Link>
            </div>
          ) : (
            <div className={styles.grid}>
              {resumes.map(resume => {
                const template = TEMPLATES.find(t => t.id === resume.templateId);
                return (
                  <div key={resume.id} className={styles.card}>
                    <div className={styles.cardInfo}>
                      <span className={styles.templateBadge} style={{ background: template?.color }}>
                        {template?.name || 'Unknown Template'}
                      </span>
                      <h3>{resume.title}</h3>
                      <p className={styles.updatedAt}>
                        Last updated: {new Date(resume.updatedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className={styles.cardActions}>
                      <Link href={`/builder/${resume.templateId}?resumeId=${resume.id}`} className="btn btn-primary btn-sm">
                        ✏️ Edit
                      </Link>
                      <Link href={`/preview/${resume.id}`} className="btn btn-secondary btn-sm">
                        👁️ Preview
                      </Link>
                      <button onClick={(e) => handleDelete(resume.id, e)} className="btn btn-ghost btn-sm" style={{ color: '#ef4444' }}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
