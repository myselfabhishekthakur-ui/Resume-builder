'use client';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import styles from './page.module.css';
import Navbar from '@/components/Navbar/Navbar';
import TemplateShowcase from '@/components/TemplateShowcase/TemplateShowcase';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className={styles.main}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroGlow2} />
        <div className="container">
          <div className={styles.heroContent}>
            <div className={`${styles.heroBadge} badge badge-primary animate-fade-up`}>
              ✨ 12+ Professional Templates
            </div>
            <h1 className={`${styles.heroTitle} animate-fade-up`} style={{ animationDelay: '0.1s' }}>
              Build Your{' '}
              <span className="gradient-text">Dream Resume</span>
              <br />in Minutes
            </h1>
            <p className={`${styles.heroDesc} animate-fade-up`} style={{ animationDelay: '0.2s' }}>
              Choose from 12+ stunning templates crafted for every profession. Fully optimized for Applicant Tracking Systems (ATS) with our accurate keyword matching. Sign in with Google and land your next opportunity.
            </p>
            <div className={`${styles.heroCta} animate-fade-up`} style={{ animationDelay: '0.3s' }}>
              {session ? (
                <Link href="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard →
                </Link>
              ) : (
                <button onClick={() => signIn('google')} className="btn btn-primary btn-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Get Started with Google
                </button>
              )}
              <Link href="/templates" className="btn btn-secondary btn-lg">
                Browse Templates
              </Link>
            </div>
            <div className={`${styles.heroStats} animate-fade-up`} style={{ animationDelay: '0.4s' }}>
              <div className={styles.stat}>
                <span className={styles.statNum}>12+</span>
                <span className={styles.statLabel}>Templates</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>4</span>
                <span className={styles.statLabel}>Categories</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>₹20</span>
                <span className={styles.statLabel}>PER RESUME</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="badge badge-accent">Templates</span>
            <h2>Choose Your <span className="gradient-text">Perfect Style</span></h2>
            <p>Hand-crafted for every career path and profession</p>
          </div>
          <TemplateShowcase />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="badge badge-primary">Why Resume Builder?</span>
            <h2>Everything You <span className="gradient-text">Need to Succeed</span></h2>
          </div>
          <div className="grid-3">
            {features.map((feature, i) => (
              <div key={i} className={`card card-glow ${styles.featureCard}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaGlow} />
            <h2>Ready to Land Your <span className="gradient-text">Dream Job?</span></h2>
            <p>Join thousands of professionals who built their careers with Resume Builder</p>
            {!session && (
              <button onClick={() => signIn('google')} className="btn btn-primary btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Start Building for Free
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <span className={styles.logo}>⚡ Resume Builder</span>
              <p>Build resumes that get noticed.</p>
            </div>
            <div className={styles.footerLinks}>
              <Link href="/templates">Templates</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2026 Resume Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

const features = [
  {
    icon: '🎯',
    title: 'Full ATS Optimization',
    desc: 'Beat automated filters with our accurate ATS keyword search and matching. Ensure your resume never gets lost in the system.',
  },
  {
    icon: '🎨',
    title: '12+ Premium Templates',
    desc: 'From minimal to creative — templates designed for every industry and career level.',
  },
  {
    icon: '⚡',
    title: 'Live Preview',
    desc: 'See your resume update in real-time as you type. No page refreshes needed.',
  },
  {
    icon: '📄',
    title: 'One-Click PDF Export',
    desc: 'Download your polished resume as a print-ready PDF instantly — completely free.',
  },
  {
    icon: '🔒',
    title: 'Google Sign-In',
    desc: 'Secure authentication with your Google account. No passwords to remember.',
  },
  {
    icon: '☁️',
    title: 'Auto-Save to Cloud',
    desc: 'Your resumes are saved automatically. Access and edit them from any device.',
  }
];
