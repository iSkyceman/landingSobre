"use client";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import styles from "./FooterSobre.module.css";

export default function FooterSobre() {
  return (
    <footer className={styles.footer}>
      {/* Image de fond premium */}
      <div className={styles.bgImage} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <p>© 2025 iSkyce - Tous droits réservés</p>
            <div className={styles.legalLink}>
              {/* Liens vers les fichiers HTML du dossier /public */}
              <a href="/mentions-legales.html" target="_blank" rel="noopener">Mentions légales</a> |{" "}
              <a href="/politique-de-confidentialite.html" target="_blank" rel="noopener">Politique de confidentialité</a> |{" "}
              <a href="/cgv.html" target="_blank" rel="noopener">CGV</a>
            </div>
            <div className={styles.coords}>
              <p>
                <strong>Michel Klein</strong><br />
                6 rue Schelmenwasen<br />
                67590 Schweighouse Sur Moder, France<br />
                Téléphone : <a href="tel:+33781289088" className={styles.contactLink}>+33 781 289 088</a><br />
                <a href="mailto:iSkyceman@gmail.com" className={styles.contactLink}>Nous contacter</a><br />
                SIRET : 392 736 104 000 28<br />
                Statut : Entreprise Individuelle<br />
                Responsable de publication : Michel Klein<br />
                Hébergeur : Vercel Inc.
              </p>
            </div>
          </div>
          <div>
            <h3>Réseaux sociaux</h3>
            <div className={styles.social}>
              <a href="https://www.linkedin.com/company/iskyce" target="_blank" rel="noopener" aria-label="LinkedIn">
                <FaLinkedin size={32} />
              </a>
              <a href="https://www.youtube.com/@iskyce" target="_blank" rel="noopener" aria-label="YouTube">
                <FaYoutube size={32} />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Bandeau orange doux en bas */}
      <div className={styles.gradient} />
    </footer>
  );
}

