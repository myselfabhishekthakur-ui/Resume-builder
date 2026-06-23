'use client';
import { useResumeStore } from '@/lib/store';
import styles from './FormStyles.module.css';

export default function CertificationsForm() {
  const { data, addCertification, updateCertification, removeCertification } = useResumeStore();

  return (
    <div>
      <h3 className={styles.sectionTitle}>🏆 Certifications</h3>
      {data.certifications.map((cert, i) => (
        <div key={cert.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Certification #{i + 1}</span>
            <button className={styles.removeBtn} onClick={() => removeCertification(cert.id)}>✕</button>
          </div>
          <div className="form-group">
            <label className="label">Certification Name *</label>
            <input className="input" placeholder="AWS Solutions Architect" value={cert.name}
              onChange={e => updateCertification(cert.id, { name: e.target.value })} />
          </div>
          <div className={styles.row}>
            <div className="form-group">
              <label className="label">Issuing Organization</label>
              <input className="input" placeholder="Amazon Web Services" value={cert.issuer}
                onChange={e => updateCertification(cert.id, { issuer: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="label">Date Earned</label>
              <input className="input" type="month" value={cert.date}
                onChange={e => updateCertification(cert.id, { date: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="label">Credential URL</label>
            <input className="input" placeholder="https://..." value={cert.url || ''}
              onChange={e => updateCertification(cert.id, { url: e.target.value })} />
          </div>
        </div>
      ))}
      <button className={styles.addBtn} onClick={addCertification}>+ Add Certification</button>
    </div>
  );
}
