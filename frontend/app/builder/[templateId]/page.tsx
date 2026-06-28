'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useResumeStore } from '@/lib/store';
import { TEMPLATES } from '@/lib/templates';
import Navbar from '@/components/Navbar/Navbar';
import EditorForm from '@/components/Editor/EditorForm';
import LivePreview from '@/components/Editor/LivePreview';
import PaginatedPreview from '@/components/Editor/PaginatedPreview';
import { api } from '@/lib/api';
import styles from './builder.module.css';

export default function BuilderPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeIdParam = searchParams.get('resumeId');
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    setTemplateId,
    title,
    setTitle,
    isSaving,
    setIsSaving,
    data,
    resumeId,
    setResumeId,
    loadResume,
    reset,
    points,
    setPoints,
  } = useResumeStore();

  const template = TEMPLATES.find(t => t.id === templateId);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Handle loading and initial setup
  useEffect(() => {
    if (resumeIdParam) {
      if (resumeId !== resumeIdParam) {
        api.getResume(resumeIdParam)
          .then(res => {
            loadResume(res.data, res.templateId, res.title, res.id);
          })
          .catch(err => {
            console.error('Failed to load resume:', err);
          });
      }
    } else {
      if (resumeId) {
        reset();
      }
      if (templateId) setTemplateId(templateId);
    }

  }, [resumeIdParam, resumeId, loadResume, templateId, setTemplateId, reset, status]);

  // Debounced autosave for all resumes
  useEffect(() => {
    // We want to skip saving if data is completely empty and unchanged, but let's just 
    // rely on a timeout to save. To avoid saving immediately on load, we could track mounted state,
    // but the simplest is just to save after 2s of any change.
    const timer = setTimeout(async () => {
      setIsSaving(true);
      try {
        if (resumeId) {
          await api.updateResume(resumeId, {
            title,
            templateId,
            data,
          });
        } else {
          const created = await api.createResume(templateId, title, data);
          setResumeId(created.id);
          router.replace(`/builder/${templateId}?resumeId=${created.id}`, { scroll: false });
        }
      } catch (err: any) {
        console.error('Autosave failed:', err);
      } finally {
        setIsSaving(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, templateId, data, resumeId, setIsSaving, router, setResumeId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (resumeId) {
        await api.updateResume(resumeId, {
          title,
          templateId,
          data,
        });
      } else {
        const created = await api.createResume(templateId, title, data);
        setResumeId(created.id);
        router.replace(`/builder/${templateId}?resumeId=${created.id}`);
      }
    } catch (err: any) {
      console.error('Save failed:', err);
      alert('Save failed: ' + (err?.response?.data?.message || err.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const parsedData = await api.uploadAndParseResume(file);
      useResumeStore.setState({ data: parsedData });
      alert('Resume parsed successfully! Please review the extracted data carefully.');
    } catch (err: any) {
      console.error(err);
      alert('Failed to parse resume: ' + (err?.response?.data?.message || err.message));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const executeDownload = async () => {
    // Dynamically import html2pdf in browser environment
    const html2pdf = (await import('html2pdf.js')).default;
    if (!previewRef.current) return;

    const opt = {
      margin:       0,
      filename:     `${data.personal.fullName || 'resume'}.pdf`,
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

  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Builder Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button onClick={() => router.push('/dashboard')} className="btn btn-ghost btn-sm">
            ← Dashboard
          </button>
          <input
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Resume title..."
          />
          {template && (
            <span className="badge badge-primary">{template.name}</span>
          )}
        </div>
        <div className={styles.headerRight}>
          {isSaving && <span className={styles.saving}>Saving...</span>}
          <button 
            onClick={handleSave} 
            className={`btn ${resumeId ? 'btn-ghost' : 'btn-primary'} btn-sm`} 
            style={{ marginRight: '8px' }}
          >
            {resumeId ? '✓ Saved' : '💾 Save Resume'}
          </button>
          
          <input 
            type="file" 
            accept=".pdf,.doc,.docx"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="btn btn-secondary btn-sm"
            style={{ marginRight: '8px' }}
            disabled={isUploading}
          >
            {isUploading ? '⏳ Parsing...' : '📄 Import Old Resume'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={executeDownload} className="btn btn-secondary btn-sm">
              ⬇ Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Builder Layout */}
      <div className={styles.builderLayout}>
        {/* Editor Panel */}
        <div className={styles.editorPanel}>
          <EditorForm />
        </div>

        {/* Preview Panel */}
        <div className={styles.previewPanel}>
          <div className={styles.previewWrapper} ref={previewRef}>
            <PaginatedPreview>
              <LivePreview templateId={templateId} />
            </PaginatedPreview>
          </div>
        </div>
      </div>
    </div>
  );
}
