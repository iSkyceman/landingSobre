import styles from "./SuccesFee.module.css";
import Image from "next/image";

export default function SuccesFee1() {
  return (
    <section className={styles.succesFee1Section}>
      {/* Animation de fond i-tech */}
      <div className={styles.itechBackground}>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
      </div>
      <div className={styles.content}>
        <h2 className={styles.titleItech}>
          Option: Accompagnement à la mise en œuvre – Succès fee 
        </h2>
        <p className={styles.descriptionItech}>
          Profitez d’un suivi opérationnel augmenté par nos outils IA avancés, avec rémunération indexée sur vos résultats. L’offre i-tech intègre dashboard, reporting en temps réel et automatisations sur-mesure.<br />
          <b>Réservé aux entreprises engagées dans une transformation digitale ambitieuse.</b>
        </p>
        {/* Mini schéma pédagogique */}
        <div className={styles.miniSchemaItech}>
          <span className={styles.stepItech}>
            <span aria-hidden="true" className={styles.emojiItech}>⚡</span>
            30%<br /><small>à la signature</small>
          </span>
          <span className={styles.arrowItech}>→</span>
          <span className={styles.stepItech}>
            <span aria-hidden="true" className={styles.emojiItech}>🤖</span>
            70%<br /><small>si objectifs IA atteints</small>
          </span>
        </div>
        {/* Témoignages */}
        <div className={styles.testimonialsRow}>
          <div className={styles.testimonial}>
            <div className={styles.avatarWrapperSquare}>
              <Image
                src="/images/bloc2.png"
                alt="Pierre L."
                width={64}
                height={64}
                className={styles.avatarSquare}
                loading="lazy"
              />
            </div>
            <div>
              <p className={styles.testimonialText}>
                “L’intégration IA sur-mesure a boosté nos indicateurs et fluidifié nos process. L’accompagnement tech est un vrai plus.”
              </p>
              <p className={styles.testimonialAuthor}>Pierre L., CEO, Industrie</p>
            </div>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.avatarWrapperSquare}>
              <Image
                src="/images/bloc1.png"
                alt="Sophie M."
                width={64}
                height={64}
                className={styles.avatarSquare}
                loading="lazy"
              />
            </div>
            <div>
              <p className={styles.testimonialText}>
                “Le dashboard IA et les automatisations ont permis un pilotage ultra-réactif de nos projets.”
              </p>
              <p className={styles.testimonialAuthor}>Sophie M., Responsable Opérations, Services</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

