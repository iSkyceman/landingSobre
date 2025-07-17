"use client";
import styles from "./RisquesSobre.module.css";
import {
  FaTriangleExclamation,
  FaHourglassEnd,
  FaBolt,
  FaUserSlash,
  FaWind,
  FaCoins,
  FaSkullCrossbones
} from "react-icons/fa6";

// Dégradés/niveaux d’alerte pour chaque icône
const gradients = [
  { id: "risk-gradient1", from: "#FFB86C", to: "#FF8C42" },      // orange clair → orange vif
  { id: "risk-gradient2", from: "#F76D3C", to: "#FFB86C" },      // orange foncé → orange clair
  { id: "risk-gradient3", from: "#FF8C42", to: "#F76D3C" },      // orange vif → orange foncé
  { id: "risk-gradient4", from: "#FFD200", to: "#FFA502" },      // jaune → orange
  { id: "risk-gradient5", from: "#FF6A00", to: "#FFD200" },      // orange → jaune
  { id: "risk-gradient6", from: "#F7971E", to: "#F44336" },      // orange vif → rouge alerte
];

const icons = [
  FaHourglassEnd, FaBolt, FaUserSlash, FaWind, FaCoins, FaSkullCrossbones
];

const risques = [
  {
    title: "Perte de compétitivité",
    desc: "Perdre 15 % de productivité/an face aux entreprises adoptant l'IA"
  },
  {
    title: "Pannes imprévues",
    desc: "Coûts imprévus liés aux pannes non anticipées"
  },
  {
    title: "Retard sur vos concurrents",
    desc: "Vos concurrents prendront de l'avance stratégique"
  },
  {
    title: "Mises réglementaires",
    desc: "Non-conformité avec les nouvelles réglementations"
  },
  {
    title: "Surcoûts cachés",
    desc: "Coûts cachés liés à une infrastructure obsolète"
  },
  {
    title: "Obsolescence accélérée",
    desc: "Perte de pertinence face à l'évolution technologique rapide"
  }
];

export default function RisquesSobre() {
  return (
    <section className={styles.section}>
      {/* Définition des gradients SVG */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {gradients.map(g => (
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
          D'ici 2027, 80 % des leaders industriels auront intégré l'IA. Ne prenez pas de retard.
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
