
import styles from "./SuccesFee.module.css";
import Image from "next/image";

export default function SuccesFee() {
  return (
    <section className={`${styles.succesFeeSection} max-w-7xl mx-auto px-4 sm:px-8`}>
      {/* Image de fond translucide */}
      <div className={styles.backgroundImage}>
        <Image
          src="/images/bloc3.1.webp"
          alt=""
          fill
          style={{ objectFit: "cover", opacity: 0.45 }}
          priority={false}
          quality={70}
          sizes="100vw"
        />
      </div>

      <div
        className={styles.contentLeft}
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        <h2 className={`${styles.titleLeft} text-center sm:text-left`}>
          Option complémentaire : Accompagnement à la mise en œuvre – Succès fee
        </h2>

        <p className={`${styles.descriptionLeft} text-center sm:text-left`}>
          Après votre Feuille de route ou Analyse IA Totale, vous pouvez choisir notre accompagnement
          opérationnel « payé à la performance ».
          <br />
          Ce service optionnel aligne nos intérêts : vous bénéficiez d’un suivi personnalisé pour la
          mise en œuvre de vos recommandations stratégiques, avec une part de rémunération indexée
          sur l’atteinte des résultats définis ensemble.
          <br />
          <b>
            Vous restez libre : cette option n’est proposée qu’aux clients engagés dans une démarche de
            transformation IA, sans aucune obligation.
          </b>
        </p>

        {/* Mini schéma pédagogique */}
        <div
          className={styles.miniSchema}
          style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
          aria-label="Schéma pédagogique"
        >
          <span className={styles.step}>
            <span aria-hidden="true" className={styles.emoji}>
              💡
            </span>
            30%
            <br />
            <small>à la signature</small>
          </span>
          <span className={styles.arrow}>→</span>
          <span className={styles.step}>
            <span aria-hidden="true" className={styles.emoji}>
              🎯
            </span>
            70%
            <br />
            <small>si objectifs atteints</small>
          </span>
        </div>

        {/* Témoignages */}
        <div
          className={styles.testimonialsRow}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <div className={styles.testimonial} style={{ maxWidth: "95%" }}>
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
                “L’équipe a su comprendre nos enjeux et adapter l’IA à nos process, sans jamais
                survendre les résultats. Nous avons avancé ensemble, étape par étape.”
              </p>
              <p className={styles.testimonialAuthor}>Pierre L., CEO, Industrie</p>
            </div>
          </div>
          <div className={styles.testimonial} style={{ maxWidth: "95%" }}>
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
                “Un accompagnement pragmatique, une vraie écoute, et des résultats concrets dès les
                premières semaines.”
              </p>
              <p className={styles.testimonialAuthor}>Sophie M., Responsable Opérations, Services</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
