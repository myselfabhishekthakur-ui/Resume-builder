'use client';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import LivePreview from '@/components/Editor/LivePreview';
import { DUMMY_RESUME_DATA } from '@/lib/dummyData';
import { TEMPLATES } from '@/lib/templates';
import styles from '../../preview/[resumeId]/preview.module.css'; // Reuse preview styles

export default function TemplatePreviewPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const router = useRouter();

  const template = TEMPLATES.find(t => t.id === templateId);

  if (!template) {
    return (
      <div className={styles.main}>
        <div className="container" style={{ textAlign: 'center', marginTop: '80px' }}>
          <h2>Template not found</h2>
          <button onClick={() => router.push('/templates')} className="btn btn-primary" style={{ marginTop: '20px' }}>
            Back to Templates
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
              <button onClick={() => router.push('/templates')} className="btn btn-ghost btn-sm">
                ← Back to Templates
              </button>
              <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Example: {template.name}</h1>
            </div>
            <button onClick={() => router.push(`/builder/${template.id}`)} className="btn btn-primary btn-md" style={{ background: template.color }}>
              Use This Template →
            </button>
          </div>
        </div>
      </header>

      <section className={styles.previewSection}>
        <div className={styles.pageContainer}>
          <div className={styles.previewWrapper}>
            <LivePreview templateId={template.id} dataOverride={DUMMY_RESUME_DATA} />
          </div>
        </div>
      </section>
    </main>
  );
}
