"use client";
import styles from "./RisquesItech.module.css";
import {
  FaTriangleExclamation,
  FaHourglassEnd,
  FaBolt,
  FaUserSlash,
  FaWind,
  FaCoins,
  FaSkullCrossbones,
} from "react-icons/fa6";

// Dégradés d’alerte pour chaque icône
const gradients = [
  { id: "risk-itech-gradient1", from: "#ffb86c", to: "#ff8c42" },      // orange clair → orange vif
  { id: "risk-itech-gradient2", from: "#ff6a00", to: "#ee0979" },      // orange → rose
  { id: "risk-itech-gradient3", from: "#ffd200", to: "#ff6a00" },      // jaune → orange
  { id: "risk-itech-gradient4", from: "#f7971e", to: "#f44336" },      // orange vif → rouge
  { id: "risk-itech-gradient5", from: "#ff8c42", to: "#7f5fff" },      // orange → violet
  { id: "risk-itech-gradient6", from: "#f44336", to: "#3c8ce7" },      // rouge → bleu
];

const icons = [
  FaHourglassEnd, FaBolt, FaUserSlash, FaWind, FaCoins, FaSkullCrossbones,
];

const risques = [
  {
    title: "Perte de compétitivité",
    desc: "Perdre 15 % de productivité/an face aux entreprises adoptant l&apos;IA",
  },
  {
    title: "Pannes imprévues",
    desc: "Coûts imprévus liés aux pannes non anticipées",
  },
  {
    title: "Retard sur vos concurrents",
    desc: "Vos concurrents prendront de l&apos;avance stratégique",
  },
  {
    title: "Mises réglementaires",
    desc: "Non-conformité avec les nouvelles réglementations",
  },
  {
    title: "Surcoûts cachés",
    desc: "Coûts cachés liés à une infrastructure obsolète",
  },
  {
    title: "Obsolescence accélérée",
    desc: "Perte de pertinence face à l&apos;évolution technologique rapide",
  },
];

export default function RisquesItech() {
  return (
    <section className={styles.section}>
      {/* Définition des gradients SVG */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {gradients.map((g) => (
            <linearGradient id={g.id} key={g.id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={g.from} />
              <stop offset="100%" stopColor={g.to} />
            </linearGradient>
          ))}
        </defs>
      </svg>
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className={styles.riskTitle}>
          <FaTriangleExclamation className={styles.riskIcon} />
          Ce que vous risquez à ne rien faire
        </h2>
        <p className={styles.riskIntro}>
          D&apos;ici 2027, 80 % des leaders industriels auront intégré l&apos;IA. Ne prenez pas de retard.
        </p>
        <div className={styles.grid}>
          {risques.map((r, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                tabIndex={0}
                className={styles.card}
                aria-label={r.title + ' : ' + r.desc}
              >
                <div className={styles.iconWrapper}>
                  <Icon size={32} style={{ fill: `url(#${gradients[i].id})` }} />
                </div>
                <h3 className={styles.cardTitle}>
                  {r.title}
                </h3>
                <p className={styles.cardDesc}>
                  {r.desc}
                </p>
                <span className={styles.highlight}></span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
