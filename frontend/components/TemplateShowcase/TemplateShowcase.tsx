'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TEMPLATES, CATEGORIES, CATEGORY_ICONS, TemplateCategory } from '@/lib/templates';
import LivePreview from '@/components/Editor/LivePreview';
import { DUMMY_RESUME_DATA } from '@/lib/dummyData';
import styles from './TemplateShowcase.module.css';

export default function TemplateShowcase() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'All'>('All');

  const filtered = activeCategory === 'All'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === activeCategory);

  return (
    <div>
      {/* Category Filter */}
      <div className={styles.filters}>
        <button
          className={`${styles.filter} ${activeCategory === 'All' ? styles.filterActive : ''}`}
          onClick={() => setActiveCategory('All')}
        >
          🌟 All Templates
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.filter} ${activeCategory === cat ? styles.filterActive : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {CATEGORY_ICONS[cat]} {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className={styles.grid}>
        {filtered.map((template, i) => (
          <div
            key={template.id}
            className={`${styles.card} card card-glow`}
            style={{ animationDelay: `${i * 0.05}s`, '--accent-color': template.color } as any}
          >
            {/* Visual Preview */}
            <div className={styles.cardPreviewContainer}>
              <div className={styles.cardPreviewScaler}>
                <LivePreview templateId={template.id} dataOverride={DUMMY_RESUME_DATA} />
              </div>
              <Link href={`/template-preview/${template.id}`} className={styles.cardPreviewOverlay} />
            </div>

            {/* Card Body */}
            <div className={styles.cardBody}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{template.name}</h3>
                <span className={styles.categoryTag} style={{ color: template.color, borderColor: `${template.color}44`, background: `${template.color}11` }}>
                  {CATEGORY_ICONS[template.category]}
                </span>
              </div>
              <p className={styles.cardDesc}>{template.description}</p>
              <div className={styles.tags}>
                {template.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.cardActions}>
                <Link href={`/template-preview/${template.id}`} className={styles.previewBtn}>
                  View
                </Link>
                <Link href={`/builder/${template.id}`} className={`btn btn-primary ${styles.useBtn}`}>
                  Use Template →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniResume({ color, accent }: { color: string; accent: string }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: color, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 6, background: color, borderRadius: 3, width: '70%', marginBottom: 3 }} />
          <div style={{ height: 4, background: `${accent}66`, borderRadius: 2, width: '50%' }} />
        </div>
      </div>
      {/* Divider */}
      <div style={{ height: 1, background: `${color}33` }} />
      {/* Lines */}
      {[80, 60, 90, 70, 55].map((w, i) => (
        <div key={i} style={{ height: 4, background: i % 3 === 0 ? `${color}44` : 'rgba(255,255,255,0.1)', borderRadius: 2, width: `${w}%` }} />
      ))}
      <div style={{ height: 1, background: `${color}22` }} />
      {[65, 85, 50].map((w, i) => (
        <div key={i} style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, width: `${w}%` }} />
      ))}
    </div>
  );
}
