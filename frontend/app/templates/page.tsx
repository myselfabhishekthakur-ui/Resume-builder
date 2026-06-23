'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import { TEMPLATES, CATEGORIES, TemplateCategory, CATEGORY_ICONS } from '@/lib/templates';
import styles from './templates.module.css';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'All'>('All');

  const filteredTemplates = selectedCategory === 'All'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <main className={styles.main}>
      <Navbar />

      <header className={styles.header}>
        <div className="container">
          <span className="badge badge-primary">TEMPLATES</span>
          <h1>Pick a layout to <span className="gradient-text">get started</span></h1>
          <p>Whether you are in IT, Management, a Fresher, or a Creative, we have a template for you.</p>
        </div>
      </header>

      <section className={styles.showcase}>
        <div className="container">
          {/* Category Tabs */}
          <div className={styles.tabs}>
            <button
              onClick={() => setSelectedCategory('All')}
              className={`${styles.tab} ${selectedCategory === 'All' ? styles.activeTab : ''}`}
            >
              🌐 All Templates
            </button>
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.tab} ${selectedCategory === category ? styles.activeTab : ''}`}
              >
                {CATEGORY_ICONS[category]} {category}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className={styles.grid}>
            {filteredTemplates.map(template => (
              <div key={template.id} className={styles.card}>
                <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at 50% 0%, ${template.color}15, transparent 60%)` }} />
                <div className={styles.cardHeader} style={{ borderTop: `4px solid ${template.color}` }}>
                  <div className={styles.badgeRow}>
                    <span className={styles.categoryBadge}>{template.category}</span>
                    {template.popular && <span className={styles.popularBadge}>🔥 Popular</span>}
                  </div>
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.tags}>
                    {template.tags.map(tag => (
                      <span key={tag} className={styles.tag}>#{tag}</span>
                    ))}
                  </div>
                  <Link href={`/builder/${template.id}`} className={styles.useBtn} style={{ background: template.color }}>
                    Use Template →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
