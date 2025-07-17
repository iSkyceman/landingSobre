"use client";
import styles from "./ConfidentialiteSobre.module.css";
import { FaLock } from "react-icons/fa";

export default function ConfidentialiteSobre() {
  return (
    <section className={styles.section}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.content}>
        <h2 className={styles.title}>
          <FaLock className={styles.lockIcon} />
          Confidentialité & Rapport PDF
        </h2>
        <div className={styles.badge}>
          <FaLock className={styles.badgeIcon} />
          Données cryptées & hébergement sécurisé
        </div>
        <p className={styles.intro}>
          Vos données sont strictement confidentielles, elles ne seront jamais partagées.
        </p>
        <div className={styles.engagementBlock}>
          <h3 className={styles.subTitle}>
            Notre engagement : sécurité, expertise, indépendance
          </h3>
          <ul className={styles.list}>
            <li>
              <span className={styles.emoji}>🔒</span>
              <span>
                <strong>Sécurité & confidentialité</strong> : Données cryptées, hébergement sécurisé, jamais partagées sans consentement.
              </span>
            </li>
            <li>
              <span className={styles.emoji}>✅</span>
              <span>
                <strong>Conformité RGPD</strong> : Respect strict du RGPD pour une gestion transparente et responsable.
              </span>
            </li>
            <li>
              <span className={styles.emoji}>🤝</span>
              <span>
                <strong>Accompagnement par des experts IA & métiers</strong> : Expérience en gestion, finance, analyse sectorielle, comptabilité.
              </span>
            </li>
            <li>
              <span className={styles.emoji}>🦎</span>
              <span>
                <strong>Indépendance & approche proactive</strong> : Analyses personnalisées, fusion intelligente de vos données & IA internationale.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
