'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useResumeStore } from '@/lib/store';
import { TEMPLATES } from '@/lib/templates';
import Navbar from '@/components/Navbar/Navbar';
import EditorForm from '@/components/Editor/EditorForm';
import LivePreview from '@/components/Editor/LivePreview';
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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

    if (status === 'authenticated') {
      api.getPoints()
        .then(res => setPoints(res.points))
        .catch(console.error);
    }
  }, [resumeIdParam, resumeId, loadResume, templateId, setTemplateId, reset, status, setPoints]);

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
    const { default: jsPDF } = await import('jspdf');
    const { default: html2canvas } = await import('html2canvas');
    if (!previewRef.current) return;

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
    pdf.save(`${data.personal.fullName || 'resume'}.pdf`);
  };

  const handleDownloadPDF = async () => {
    if (points >= 20) {
      setShowConfirmModal(true);
      return;
    }

    // Points are less than 20, open Razorpay Checkout
    try {
      const res = await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

      if (!res) {
        alert('Razorpay SDK failed to load. Please check your connection.');
        return;
      }

      const order = await api.createRazorpayOrder();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_T5wmOerMaU9ASY',
        amount: order.amount,
        currency: order.currency,
        name: "Resume Builder",
        description: "Premium PDF Download",
        order_id: order.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await api.verifyRazorpayPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
            
            if (verifyRes.success) {
              setPoints(verifyRes.points);
              alert(`Payment successful! You now have ${verifyRes.points} points.`);
            }
          } catch (err) {
            alert('Payment verification failed. Please contact support.');
            console.error(err);
          }
        },
        prefill: {
          name: session?.user?.name || "User",
          email: session?.user?.email || "",
          contact: "",
        },
        theme: {
          color: "#818cf8",
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err) {
      alert('Could not initiate payment. Please try again.');
      console.error(err);
    }
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
            <span className="badge badge-secondary">
              Points: {points}
            </span>
            <button onClick={handleDownloadPDF} className="btn btn-secondary btn-sm">
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
            <LivePreview templateId={templateId} />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: 'white', padding: '30px', borderRadius: '12px',
            maxWidth: '400px', width: '90%', textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ color: '#333', marginBottom: '10px' }}>Download Resume</h2>
            <p style={{ color: '#666', marginBottom: '25px' }}>
              This will deduct <strong>20 points</strong> from your balance. Are you sure you want to download?
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                className="btn btn-ghost" 
                onClick={() => setShowConfirmModal(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={async () => {
                  setShowConfirmModal(false);
                  try {
                    const res = await api.redeemPoint();
                    setPoints(res.points);
                    executeDownload();
                  } catch (err: any) {
                    alert('Failed to verify points. Please try again.');
                  }
                }}
              >
                Confirm (-20 pts)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
