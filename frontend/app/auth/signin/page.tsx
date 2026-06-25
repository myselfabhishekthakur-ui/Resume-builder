'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Link from 'next/link';

function SignInContent() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '40px 32px',
      width: '100%',
      maxWidth: '420px',
      textAlign: 'center',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
      zIndex: 10
    }}>
      <Link href="/" style={{
        fontSize: '1.8rem',
        fontWeight: 800,
        color: '#ffffff',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '28px'
      }}>
        ⚡ <span style={{ background: 'linear-gradient(to right, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Resume Builder</span>
      </Link>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Welcome back</h2>
      <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '32px' }}>
        Sign in to access your resumes and build new ones.
      </p>

      <button
        onClick={() => signIn('google', { callbackUrl })}
        style={{
          width: '100%',
          padding: '12px 24px',
          background: '#ffffff',
          color: '#0f172a',
          border: 'none',
          borderRadius: '12px',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          transition: 'all 0.2s',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = '#ffffff'; }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
        <Link href="/" style={{ fontSize: '0.85rem', color: '#818cf8', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top left, #1e1b4b, #0f172a)',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '24px'
    }}>
      {/* Background Decorative Glows */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'rgba(99, 102, 241, 0.15)',
        filter: 'blur(80px)',
        top: '20%',
        left: '20%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'rgba(236, 72, 153, 0.15)',
        filter: 'blur(80px)',
        bottom: '20%',
        right: '20%',
        pointerEvents: 'none'
      }} />

      <Suspense fallback={<div style={{ color: '#94a3b8' }}>Loading...</div>}>
        <SignInContent />
      </Suspense>
    </div>
  );
}
