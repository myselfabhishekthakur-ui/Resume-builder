'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar/Navbar';
import { api, ResumeServerResponse } from '@/lib/api';
import LivePreview from '@/components/Editor/LivePreview';
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
          // Also load into store so LivePreview can read it
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

  const handleDownloadPDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    const { default: html2canvas } = await import('html2canvas');
    if (!previewRef.current || !resume) return;

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, w, h);
    pdf.save(`${resume.data.personal.fullName || 'resume'}.pdf`);
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
            <button onClick={handleDownloadPDF} className="btn btn-primary btn-md">
              ⬇ Download PDF
            </button>
          </div>
        </div>
      </header>

      <section className={styles.previewSection}>
        <div className={styles.pageContainer}>
          <div className={styles.previewWrapper} ref={previewRef}>
            <LivePreview templateId={resume.templateId} />
          </div>
        </div>
      </section>
    </main>
  );
}
