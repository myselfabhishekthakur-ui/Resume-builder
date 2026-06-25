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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { loadResume, points, setPoints } = useResumeStore();

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

      api.getPoints()
        .then(res => setPoints(res.points))
        .catch(console.error);
    }
  }, [status, resumeId, router, loadResume, setPoints]);

  const executeDownload = async () => {
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

  const handleDownloadPDF = async () => {
    if (points >= 10) {
      setShowConfirmModal(true);
      return;
    }

    // Points are less than 10, open Razorpay Checkout
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
              <span className="badge badge-secondary" style={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                Points: {points}
              </span>
              <button onClick={handleDownloadPDF} className="btn btn-primary btn-md">
                ⬇ Download PDF
              </button>
            </div>
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
              This will deduct <strong>10 points</strong> from your balance. Are you sure you want to download?
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
                Confirm (-10 pts)
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
