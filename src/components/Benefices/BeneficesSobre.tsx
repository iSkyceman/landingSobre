"use client";
import styles from "./BeneficesSobre.module.css";
import { FaBolt, FaCoins, FaShieldAlt, FaLeaf, FaChartLine } from "react-icons/fa";

const gradients = [
  { id: "gradient1", from: "#FFB86C", to: "#FF8C42" },
  { id: "gradient2", from: "#F76D3C", to: "#FFB86C" },
  { id: "gradient3", from: "#FF8C42", to: "#F76D3C" },
  { id: "gradient4", from: "#6EE7B7", to: "#3B82F6" },
  { id: "gradient5", from: "#A78BFA", to: "#6366F1" },
  { id: "gradient6", from: "#F472B6", to: "#F59E42" },
];

const icons = [
  FaBolt, FaCoins, FaShieldAlt, FaLeaf, FaChartLine, FaShieldAlt
];

const benefices = [
  {
    title: "🚀 Productivité immédiate",
    desc: "+15 % en 72h grâce à l'IA embarquée",
  },
  {
    title: "💰 Coûts maîtrisés",
    desc: "-20 % coûts maintenance via algorithmes prédictifs",
  },
  {
    title: "✅ Conformité totale",
    desc: "100 % audit optimisé prédictif, AI Act",
  },
  {
    title: "♻️ Éco-performance",
    desc: "-40 % empreinte carbone avec solutions vertes",
  },
  {
    title: "🏆 ROI garanti",
    desc: "ROI x3 d'ici 2030",
  },
  {
    title: "🛡️ Sécurité augmentée",
    desc: "99,5 % disponibilité machines",
  },
];

export default function BeneficesSobre() {
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
        <h2 className="calculateur-ia-title mb-10">
          Bénéfices Concrets &amp; Premium
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {benefices.map((b, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                tabIndex={0}
                className={styles.card}
                aria-label={b.title + ' : ' + b.desc}
              >
                <div className={styles.iconWrapper}>
                  <Icon size={32} style={{ fill: `url(#gradient${i + 1})` }} />
                </div>
                <h3 className={styles.cardTitle}>
                  {b.title}
                </h3>
                <p className={styles.cardDesc}>
                  {b.desc}
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
