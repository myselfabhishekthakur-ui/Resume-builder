'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar/Navbar';
import { api, ResumeServerResponse } from '@/lib/api';
import LivePreview from '@/components/Editor/LivePreview';
import PaginatedPreview from '@/components/Editor/PaginatedPreview';
import { useResumeStore } from '@/lib/store';
import styles from './preview.module.css';

export default function PreviewPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resume, setResume] = useState<ResumeServerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  const { loadResume } = useResumeStore();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && resumeId) {
      api.getResume(resumeId)
        .then(res => {
          setResume(res);
          loadResume(res.data, res.templateId, res.title, res.id);
        })
        .catch(err => {
          console.error('Failed to load resume for preview:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [status, resumeId, router, loadResume]);

  const executeDownload = async () => {
    // Dynamically import html2pdf in browser environment
    const html2pdf = (await import('html2pdf.js')).default;
    if (!previewRef.current || !resume) return;

    const opt = {
      margin:       0,
      filename:     `${resume.data.personal.fullName || 'resume'}.pdf`,
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
      pagebreak:    { mode: 'css', avoid: 'tr, img' }
    };

    const element = document.getElementById('pdf-export-container') || previewRef.current;
    html2pdf().set(opt).from(element).save();
  };

  const handleDownloadPDF = async () => {
    await executeDownload();
  };

  if (status === 'loading' || loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner" />
      </div>
    );
  }

  if (!resume) {
    return (
      <div className={styles.main}>
        <div className="container" style={{ textAlign: 'center', marginTop: '80px' }}>
          <h2>Resume not found</h2>
          <button onClick={() => router.push('/dashboard')} className="btn btn-primary" style={{ marginTop: '20px' }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerRow}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={() => router.push('/dashboard')} className="btn btn-ghost btn-sm">
                ← Dashboard
              </button>
              <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Previewing: {resume.title}</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={executeDownload} className="btn btn-primary btn-md">
                ⬇ Download PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.previewSection}>
        <div className={styles.pageContainer}>
          <div className={styles.previewWrapper} ref={previewRef}>
            <PaginatedPreview>
              <LivePreview templateId={resume.templateId} />
            </PaginatedPreview>
          </div>
        </div>
      </section>

    </main>
  );
}
