"use client";
import styles from "./CtaFinalItech.module.css";

export default function CtaFinalItech() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Et si la vraie surprise, c’était votre potentiel ?
      </h2>
      <button
        className={styles.ctaButton}
        onClick={() => {
          window.dispatchEvent(new Event("ouvrirCalculateurIA1"));
        }}
      >
        Je veux voir ce que l’IA pense de mon entreprise
      </button>
    </section>
  );
}
