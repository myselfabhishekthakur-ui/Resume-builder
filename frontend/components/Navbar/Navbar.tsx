'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className="container">
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            ⚡ Resume Builder
          </Link>

          <div className={styles.links}>
            <Link href="/templates" className={styles.link}>Templates</Link>
            {session && <Link href="/dashboard" className={styles.link}>Dashboard</Link>}
          </div>

          <div className={styles.actions}>
            {session ? (
              <div className={styles.userMenu}>
                <button className={styles.avatar} onClick={() => setMenuOpen(!menuOpen)}>
                  {session.user?.image && !imageError ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || ''} 
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <span>{session.user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                  )}
                </button>
                {menuOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownHeader}>
                      <p className={styles.dropdownName}>{session.user?.name}</p>
                      <p className={styles.dropdownEmail}>{session.user?.email}</p>
                    </div>
                    <div className="divider" style={{ margin: '8px 0' }} />
                    <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                      📋 My Resumes
                    </Link>
                    <Link href="/templates" className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                      🎨 Templates
                    </Link>
                    <div className="divider" style={{ margin: '8px 0' }} />
                    <button className={styles.dropdownItem} onClick={() => signOut()}>
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => signIn('google')} className="btn btn-primary btn-sm">
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
