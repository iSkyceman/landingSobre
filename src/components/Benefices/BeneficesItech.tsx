"use client";
import styles from "./BeneficesItech.module.css";
import { FaBolt, FaCoins, FaShieldAlt, FaLeaf, FaChartLine } from "react-icons/fa";


const gradients = [
  { id: "itech-gradient1", from: "#7f5fff", to: "#3c8ce7" },
  { id: "itech-gradient2", from: "#43e97b", to: "#38f9d7" },
  { id: "itech-gradient3", from: "#ff6a00", to: "#ee0979" },
  { id: "itech-gradient4", from: "#30cfd0", to: "#330867" },
  { id: "itech-gradient5", from: "#a8ff78", to: "#78ffd6" },
  { id: "itech-gradient6", from: "#f7971e", to: "#ffd200" },
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


export default function BeneficesItech() {
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
        <h2 className={styles.itechTitle}>
          Bénéfices Concrets &amp; Premium
        </h2>
        <div className={styles.grid}>
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
                  <Icon size={32} style={{ fill: `url(#${gradients[i].id})` }} />
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
