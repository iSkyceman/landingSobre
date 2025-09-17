"use client";

import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import styles from "./NosOffresItech.module.css";
import { FaMicrochip, FaRobot, FaQuestionCircle, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

// --- Données (grille SOBRE, palette ITECH) ---
const SECTEURS = [
  "Industrie", "Services", "Santé", "Finance", "Transport", "Construction", "Commerce", "Agroalimentaire",
  "IT / Digital", "Énergie", "Collectivité", "Éducation", "Tourisme", "Logistique", "Autre"
];

const OFFRES = [
  {
    id: "diagnostic",
    nom: "Diagnostic Express IA",
    description: "Rapport IA personnalisé (10 slides), 4h de recherche expert, appel explicatif 15 min",
    tailles: [
      { label: "0–15 salariés", prix: "590\u202F€" },
      { label: "16–49 salariés", prix: "990\u202F€" },
      { label: "50–99 salariés", prix: "1\u202F990\u202F€" },
      { label: "100–250 salariés", prix: "2\u202F990\u202F€" },
      { label: ">250 salariés", prix: "3\u202F900\u202F€" }
    ],
    detail: [
      "Rapport IA personnalisé (10 slides)",
      "4h de recherche expert",
      "Appel explicatif 15 min"
    ],
    benefices: "+10% productivité en 72h",
    delai: "72h maximum",
    badge: { label: "⚡ Livraison 72h", color: "badgeMust" },
    note: "Rapport personnalisé livré sous 3 jours ouvrés",
    sujets: 0,
    pdf: "https://drive.google.com/file/d/1woF9MkW5Wm3omWyevfceOSzpwWe2n7nk/preview"
  },
  {
    id: "strategie",
    nom: "Feuille de Route IA",
    description: "Rapport IA approfondi (25–30 slides), 12h de recherche, 3 sujets prioritaires, roadmap visuelle, appel 20min",
    tailles: [
      { label: "0–15 salariés", prix: "2\u202F390\u202F€" },
      { label: "16–49 salariés", prix: "3\u202F900\u202F€" },
      { label: "50–99 salariés", prix: "5\u202F900\u202F€" },
      { label: "100–250 salariés", prix: "7\u202F900\u202F€" },
      { label: ">250 salariés", prix: "15\u202F900\u202F€" }
    ],
    detail: [
      "Rapport IA approfondi (25–30 slides)",
      "12h de recherche, 3 sujets prioritaires",
      "Roadmap visuelle, appel 20 min"
    ],
    benefices: "+15% productivité globale",
    delai: "5-7 jours ouvrés",
    badge: { label: "🟢 Best Value", color: "badgeBest" },
    note: "Coaching IA offert pour toute réservation ce mois-ci",
    sujets: 3,
    pdf: "https://drive.google.com/file/d/1TNf3-9BoJRORJkrsvbXQP6PSrYnPtvn3/view?usp=sharing"
  },
  {
    id: "analyse",
    nom: "Analyse IA Totale",
    description: "Audit IA complet (40–45 slides), 30h de recherche, 5 sujets, roadmap avancée, appel 1h",
    tailles: [
      { label: "0–15 salariés", prix: "4\u202F900\u202F€" },
      { label: "16–49 salariés", prix: "7\u202F900\u202F€" },
      { label: "50–99 salariés", prix: "11\u202F900\u202F€" },
      { label: "100–250 salariés", prix: "15\u202F900\u202F€" },
      { label: ">250 salariés", prix: "29\u202F900\u202F€" }
    ],
    detail: [
      "Audit IA complet (40–45 slides)",
      "30h de recherche, 5 sujets, roadmap avancée",
      "Appel 1h, accompagnement premium"
    ],
    benefices: "+25% performance opérationnelle",
    delai: "10 jours + accompagnement continu",
    badge: { label: "🔵 Assistance IA 24/7", color: "badgeExpert" },
    note: "Paiement 100% sécurisé – Données confidentielles",
    sujets: 5,
    pdf: "https://drive.google.com/file/d/115txXF3KykV55nitlCK9HqSqld2uMlYn/view?usp=sharing"
  }
];

type Etape = "form" | "sujets" | "recap" | "paiement" | "confirmation";

const sujetsInstructions = {
  diagnostic: {
    titre: "Diagnostic Express IA – Présentation",
    sousTitre: "Découvrez un exemple de rapport IA personnalisé",
    intro: "",
    precision: "",
    placeholder1: ""
  },
  strategie: {
    titre: "Feuille de Route IA – Personnalisation",
    sousTitre: "Aidez-nous à personnaliser votre feuille de route IA",
    intro: "Merci de préciser les 3 sujets ou problématiques à traiter en priorité.",
    precision: "Plus votre réponse est précise, plus notre feuille de route sera pertinente et actionnable.",
    placeholder1: "ex\u202F: automatisation, réduction des coûts, qualité…"
  },
  analyse: {
    titre: "Analyse IA Totale – Personnalisation",
    sousTitre: "Aidez-nous à personnaliser votre audit IA complet",
    intro: "Merci de préciser les 5 sujets ou problématiques à traiter en priorité.",
    precision: "Plus votre réponse est précise, plus notre audit sera pertinent et actionnable.",
    placeholder1: "ex\u202F: cybersécurité, data, automatisation, supply chain…"
  }
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length >= 6;
}

function isValidSiren(siren: string): boolean {
  return /^\d{9}$/.test(siren);
}

function isValidSiret(siret: string): boolean {
  return /^\d{14}$/.test(siret);
}

interface DossierStored {
  reference: string;
  offre: { nom: string };
  taille: string;
  prix: string;
  nom: string;
  secteur: string;
  email: string;
  effectif: string;
  siren: string;
  observation?: string;
  sujets: { [key: string]: string };
  date: string;
  provenance: string;
}

const generateReference = (): string => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}-${random}`;
};

function saveDossierToStorage(dossier: DossierStored): void {
  let dossiers: DossierStored[] = [];
  try {
    dossiers = JSON.parse(localStorage.getItem("dossiers") || "[]");
  } catch {
    dossiers = [];
  }
  dossiers.push(dossier);
  localStorage.setItem("dossiers", JSON.stringify(dossiers));
}

export default function NosOffresItech() {
  const [taillesSelectionnees, setTaillesSelectionnees] = useState<number[]>(OFFRES.map(() => 0));
  const [showModal, setShowModal] = useState(false);
  const [etape, setEtape] = useState<Etape>("form");
  const [offreIdx, setOffreIdx] = useState<number | null>(null);
  const [tailleIdx, setTailleIdx] = useState<number>(0);

  const [form, setForm] = useState({
    nom: "",
    secteur: "",
    email: "",
    effectif: "",
    siren: "",
    observation: ""
  });

  const [sujets, setSujets] = useState<{ [key: string]: string }>({});
  const [confirmation, setConfirmation] = useState("");
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [sirenFormatValid, setSirenFormatValid] = useState(true);
  const [reference, setReference] = useState<string>("");
  const [showInfoIdx, setShowInfoIdx] = useState<number | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const sujetsRef = useRef<HTMLFormElement>(null);

  const openModal = (idx: number, tailleInitiale: number): void => {
    setOffreIdx(idx);
    setTailleIdx(tailleInitiale);
    setEtape("form");
    setShowModal(true);
    setForm({ nom: "", secteur: "", email: "", effectif: "", siren: "", observation: "" });
    setSujets({});
    setConfirmation("");
    setEmailValid(true);
    setSirenFormatValid(true);
    setShowStripeModal(false);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "auto" });
    }, 50);
  };

  useEffect(() => {
    if (etape === "sujets" && offreIdx !== null) {
      const nb = OFFRES[offreIdx].sujets;
      const initSujets: { [key: string]: string } = {};
      for (let i = 1; i <= nb; i++) {
        initSujets[`sujet${i}`] = "";
      }
      setSujets(initSujets);
      setTimeout(() => {
        sujetsRef.current?.scrollIntoView({ behavior: "auto" });
      }, 50);
    }
    if (etape === "form" && formRef.current) {
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: "auto" }), 50);
    }
  }, [etape, offreIdx]);

  function isEffectifInTaille(effectif: string, tailleLabel: string): boolean {
    const val = Number(effectif);
    if (tailleLabel.startsWith("0–15")) return val >= 0 && val <= 15;
    if (tailleLabel.startsWith("16–49")) return val >= 16 && val <= 49;
    if (tailleLabel.startsWith("50–99")) return val >= 50 && val <= 99;
    if (tailleLabel.startsWith("100–250")) return val >= 100 && val <= 250;
    if (tailleLabel.startsWith(">250")) return val > 250;
    return false;
  }

  const isFormValid = (): boolean =>
    form.nom.length > 0 &&
    form.secteur.length > 0 &&
    isValidEmail(form.email) &&
    emailValid &&
    form.effectif.length > 0 &&
    ((isValidSiren(form.siren) || isValidSiret(form.siren)) && sirenFormatValid) &&
    offreIdx !== null &&
    isEffectifInTaille(form.effectif, OFFRES[offreIdx].tailles[tailleIdx].label);

  const isSujetsValid = (): boolean => Object.values(sujets).every(s => s.trim().length >= 3);

  let effectifMsg = null;
  if (offreIdx !== null && form.effectif) {
    const tailleLabel = OFFRES[offreIdx].tailles[tailleIdx].label;
    if (!isEffectifInTaille(form.effectif, tailleLabel)) {
      const nouvelleTaille = OFFRES[offreIdx].tailles.find(t => isEffectifInTaille(form.effectif, t.label));
      effectifMsg = (
        <div style={{ color: "#8be9fd", marginTop: 8, fontWeight: 500 }}>
          L&apos;effectif saisi ne correspond pas à la tranche sélectionnée.<br />
          {nouvelleTaille
            ? <>Sélectionnez plutôt la tranche <b>{nouvelleTaille.label}</b> ({nouvelleTaille.prix}).</>
            : <>Aucune tranche ne correspond à cet effectif.</>
          }
        </div>
      );
    }
  }

  useEffect(() => {
    setEmailValid(isValidEmail(form.email) || form.email === "");
  }, [form.email]);

  function handleSirenChange(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value.trim().replace(/\s/g, "");
    setForm(f => ({ ...f, siren: value }));
    setSirenFormatValid(value === "" || isValidSiren(value) || isValidSiret(value));
  }

  function handleMouseLeave(): void {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setShowInfoIdx(null), 150);
  }

  function handleMouseEnter(idx: number): void {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setShowInfoIdx(idx);
  }

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>
            <FaMicrochip className={styles.icon} /> Nos Offres
          </h2>
          <p className={styles.subtitle}>
            Boostez votre transformation digitale avec l&apos;IA la plus avancée.&nbsp;
            <span style={{ color: "#8be9fd" }}>
              Sécurité, performance, innovation : passez à l&apos;ère Itech.
            </span>
          </p>
          <div className={styles.grid}>
            {OFFRES.map((offre, idx) => (
              <div key={offre.id} className={styles.card}>
                <h3>
                  <FaRobot className={styles.cardIcon} />
                  <span className={styles.cardTitle}>{offre.nom}</span>
                  <span
                    className={styles.infoBulleCustom}
                    tabIndex={0}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={handleMouseLeave}
                    onFocus={() => setShowInfoIdx(idx)}
                    onBlur={() => setShowInfoIdx(null)}
                    style={{ position: "relative" }}
                  >
                    <FaQuestionCircle />
                    {showInfoIdx === idx && (
                      <span
                        className={styles.infoBulleContent}
                        onMouseEnter={() => handleMouseEnter(idx)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {offre.description}
                        <br />
                        <a
                          href={offre.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#8be9fd", textDecoration: "underline" }}
                        >
                          Voir un exemple PDF <FaExternalLinkAlt />
                        </a>
                      </span>
                    )}
                  </span>
                </h3>
                <select
                  className={styles.select}
                  aria-label="Taille de l&apos;entreprise"
                  value={taillesSelectionnees[idx]}
                  onChange={e => {
                    const v = Number(e.target.value);
                    setTaillesSelectionnees(ts => ts.map((t, i) => (i === idx ? v : t)));
                  }}
                >
                  {offre.tailles.map((t, i) => (
                    <option value={i} key={t.label}>
                      {t.label} ({t.prix})
                    </option>
                  ))}
                </select>
                <div className={styles.price}>{offre.tailles[taillesSelectionnees[idx]].prix}</div>
                <ul>
                  {offre.detail.map((d, i) => {
                    const match = d.match(/^(.*?)(\s*\(.*\))$/);
                    return (
                      <li key={i}>
                        {match ? (
                          <>
                            {match[1]}
                            <span className={styles.nobr}>{match[2]}</span>
                          </>
                        ) : (
                          d
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p style={{ color: "#8be9fd" }}>
                  <strong>Bénéfices :</strong> {offre.benefices}
                </p>
                <p style={{ textAlign: "left", margin: "0.5em 0", color: "#8be9fd" }}>
                  <strong>Délai :</strong> {offre.delai}
                </p>
                <span className={`${styles.pricingBadge} ${styles[offre.badge.color] || offre.badge.color}`}>
                  {offre.badge.label}
                </span>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.ctaTech}
                    onClick={() => openModal(idx, taillesSelectionnees[idx])}
                  >
                    {offre.id === "diagnostic"
                      ? "Réserver Itech"
                      : offre.id === "strategie"
                      ? "Choisir ma route IA"
                      : "Devenir Leader"}
                  </button>
                </div>
                <div style={{ fontSize: "0.97rem", color: "#8be9fd", marginTop: "0.5rem" }}>
                  {offre.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODALE */}
      {showModal && offreIdx !== null && (
        <div
          className={styles.modalBg}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          onClick={e => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className={styles.modal} tabIndex={0} style={{ background: "#23294a" }}>
            <div className={styles.modalHeader}>
              <h2>Réservez votre offre IA</h2>
              <button
                className={styles.modalClose}
                aria-label="Fermer"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className={styles.modalBody}>
              {/* FORM */}
              {etape === "form" && (
                <form
                  ref={formRef}
                  className={styles.form}
                  style={{ marginTop: 24, maxWidth: 420, color: "#fff" }}
                  onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    if (OFFRES[offreIdx].sujets > 0) setEtape("sujets");
                    else setEtape("recap");
                  }}
                >
                  <h3 style={{ marginBottom: 14, color: "#8be9fd" }}>
                    {OFFRES[offreIdx].nom} – {OFFRES[offreIdx].tailles[tailleIdx].label}
                  </h3>
                  {OFFRES[offreIdx].id === "diagnostic" && (
                    <div style={{ marginBottom: 12 }}>
                      <a
                        href={OFFRES[offreIdx].pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#8be9fd", textDecoration: "underline", fontWeight: 500 }}
                      >
                        Voir la présentation Diagnostic Express (PDF)
                      </a>
                    </div>
                  )}
                  <label>
                    Nom et prénom
                    <input
                      required
                      value={form.nom}
                      onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                    />
                  </label>
                  <label>
                    Secteur d&apos;activité
                    <select
                      required
                      value={form.secteur}
                      onChange={e => setForm(f => ({ ...f, secteur: e.target.value }))}
                    >
                      <option value="">Choisissez...</option>
                      {SECTEURS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Email professionnel
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onBlur={e => setEmailValid(isValidEmail(e.target.value))}
                      style={emailValid ? {} : { border: "1.5px solid #50fa7b" }}
                    />
                    {!emailValid && (
                      <div className={styles.emailError}>
                        Merci de renseigner une adresse email valide.
                      </div>
                    )}
                  </label>
                  <label>
                    Effectif
                    <input
                      required
                      type="number"
                      min={1}
                      value={form.effectif}
                      onChange={e => setForm(f => ({ ...f, effectif: e.target.value }))}
                    />
                  </label>
                  {/* MESSAGE EFFECTIF ERREUR */}
                  {effectifMsg && (
                    <div className={styles.effectifError}>
                      {effectifMsg.props.children}
                    </div>
                  )}
                  <label>
                    SIREN ou SIRET
                    <input
                      required
                      value={form.siren}
                      onChange={handleSirenChange}
                      pattern="\d{9}|\d{14}"
                      title="Saisissez un SIREN (9 chiffres) ou SIRET (14 chiffres) valide"
                      style={sirenFormatValid ? {} : { border: "1.5px solid #50fa7b" }}
                    />
                    {!sirenFormatValid && (
                      <div className={styles.sirenError}>
                        Merci de renseigner un SIREN (9 chiffres) ou SIRET (14 chiffres) valide.
                      </div>
                    )}
                    <div style={{
                      color: "#8be9fd",
                      fontSize: "0.9em",
                      marginTop: 8,
                      background: "#181b2a",
                      borderRadius: 6,
                      padding: "8px 12px"
                    }}>
                      <b>À savoir :</b> L&apos;audit sera réalisé sur l&apos;entité réelle correspondant au SIREN/SIRET fourni.<br />
                      Le secteur officiel de l&apos;entreprise, tel qu&apos;enregistré dans la base INSEE, sera utilisé pour personnaliser l&apos;analyse.<br />
                      La validité du SIREN/SIRET sera vérifiée manuellement lors du traitement de votre demande.<br />
                      {form.siren && (isValidSiren(form.siren) || isValidSiret(form.siren)) && (
                        <a
                          href={`https://annuaire-entreprises.data.gouv.fr/entreprise/${form.siren}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.sirenAnnuaire}
                        >
                          Vérifiez votre SIREN/SIRET sur l&apos;Annuaire des Entreprises
                        </a>
                      )}
                    </div>
                  </label>
                  {OFFRES[offreIdx].id === "diagnostic" && (
                    <label>
                      Observation ou sujet à signaler (optionnel)
                      <textarea
                        value={form.observation}
                        onChange={e => setForm(f => ({ ...f, observation: e.target.value }))}
                        placeholder="Vous pouvez préciser un point d&apos;attention, une question ou un sujet spécifique…"
                        rows={3}
                        style={{ resize: "vertical", marginTop: 4, marginBottom: 8, width: "100%" }}
                      />
                    </label>
                  )}
                  <div className={styles.buttonContainer}>
                    <button
                      type="submit"
                      className={styles.ctaTech}
                      style={{ background: "linear-gradient(90deg,#9048ff 40%,#8be9fd 120%)", color: "#fff" }}
                      disabled={!isFormValid()}
                    >
                      Continuer
                    </button>
                    <button
                      type="button"
                      className={styles.ctaTech}
                      style={{ background: "#23294a", color: "#8be9fd" }}
                      onClick={() => setShowModal(false)}
                    >
                      ⟵ Annuler
                    </button>
                  </div>
                </form>
              )}

              {/* ÉTAPE SUJETS */}
              {etape === "sujets" && OFFRES[offreIdx].sujets > 0 && (
                <form
                  ref={sujetsRef}
                  className={styles.form}
                  style={{ marginTop: 20, maxWidth: 420, color: "#fff" }}
                  onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    setEtape("recap");
                  }}
                >
                  {OFFRES[offreIdx].id === "strategie" && (
                    <>
                      <h3 style={{ color: "#8be9fd" }}>{sujetsInstructions.strategie.titre}</h3>
                      <div style={{ marginBottom: 4, color: "#fff", fontWeight: 500 }}>
                        {sujetsInstructions.strategie.sousTitre}
                      </div>
                      <div style={{ color: "#8be9fd", fontSize: "0.97em", marginBottom: 7 }}>
                        {sujetsInstructions.strategie.intro}
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <a
                          href={OFFRES[offreIdx].pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#8be9fd", textDecoration: "underline", fontWeight: 500 }}
                        >
                          Voir la présentation Feuille de Route IA (PDF)
                        </a>
                      </div>
                      <div style={{ fontSize: "0.93em", color: "#cde8fd", marginBottom: 10, fontStyle: "italic" }}>
                        {sujetsInstructions.strategie.precision}
                      </div>
                    </>
                  )}
                  {OFFRES[offreIdx].id === "analyse" && (
                    <>
                      <h3 style={{ color: "#8be9fd" }}>{sujetsInstructions.analyse.titre}</h3>
                      <div style={{ marginBottom: 4, color: "#fff", fontWeight: 500 }}>
                        {sujetsInstructions.analyse.sousTitre}
                      </div>
                      <div style={{ color: "#8be9fd", fontSize: "0.97em", marginBottom: 7 }}>
                        {sujetsInstructions.analyse.intro}
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <a
                          href={OFFRES[offreIdx].pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#8be9fd", textDecoration: "underline", fontWeight: 500 }}
                        >
                          Voir la présentation Analyse IA Totale (PDF)
                        </a>
                      </div>
                      <div style={{ fontSize: "0.93em", color: "#cde8fd", marginBottom: 10, fontStyle: "italic" }}>
                        {sujetsInstructions.analyse.precision}
                      </div>
                    </>
                  )}

                  {Array.from({ length: OFFRES[offreIdx].sujets }).map((_, i) => (
                    <label key={i}>
                      Sujet prioritaire n°{i + 1}
                      <input
                        required
                        value={sujets[`sujet${i + 1}`] || ""}
                        onChange={e => setSujets(s => ({ ...s, [`sujet${i + 1}`]: e.target.value }))}
                        minLength={3}
                        autoComplete="off"
                        placeholder={i === 0 ?
                          OFFRES[offreIdx].id === "strategie" ? sujetsInstructions.strategie.placeholder1 :
                          OFFRES[offreIdx].id === "analyse" ? sujetsInstructions.analyse.placeholder1 :
                          undefined : undefined}
                      />
                    </label>
                  ))}

                  <div style={{ fontSize: "0.95em", color: "#8be9fd", marginTop: "0.7em" }}>
                    <FaQuestionCircle style={{ color: "#8be9fd", marginRight: 4 }} />
                    Vous pouvez préciser un enjeu, un objectif, ou une difficulté rencontrée dans votre activité.
                    <br />
                    Toutes vos informations restent strictement confidentielles.
                  </div>

                  <div className={styles.buttonContainer}>
                    <button
                      type="submit"
                      className={styles.ctaTech}
                      style={{ background: "linear-gradient(90deg,#9048ff 40%,#8be9fd 120%)", color: "#fff" }}
                      disabled={!isSujetsValid()}
                    >
                      Valider et recevoir mon offre
                    </button>
                    <button
                      type="button"
                      className={styles.ctaTech}
                      style={{ background: "#23294a", color: "#8be9fd" }}
                      onClick={() => setEtape("form")}
                    >
                      ⟵ Retour
                    </button>
                  </div>
                </form>
              )}

              {/* RECAP */}
              {etape === "recap" && (
                <div style={{ marginTop: 22, maxWidth: 420 }}>
                  <h3 style={{ color: "#8be9fd" }}>Récapitulatif de votre demande</h3>
                  <ul style={{ margin: "1em 0 1.5em 0", paddingLeft: 18, color: "#fff" }}>
                    <li><b>Offre :</b> {OFFRES[offreIdx].nom}</li>
                    <li><b>Taille :</b> {OFFRES[offreIdx].tailles[tailleIdx].label}</li>
                    <li><b>Prix :</b> {OFFRES[offreIdx].tailles[tailleIdx].prix}</li>
                    <li><b>Nom :</b> {form.nom}</li>
                    <li><b>Secteur :</b> {form.secteur}</li>
                    <li><b>Email :</b> {form.email}</li>
                    <li><b>Effectif :</b> {form.effectif}</li>
                    <li><b>SIREN/SIRET :</b> {form.siren}</li>
                    {form.observation && (
                      <li><b>Observation / sujet :</b> {form.observation}</li>
                    )}
                    {Object.keys(sujets).length > 0 && Object.values(sujets).map((s, i) => (
                      <li key={i}><b>Sujet prioritaire n°{i + 1} :</b> {s}</li>
                    ))}
                  </ul>
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.ctaTech}
                      style={{ background: "#23294a", color: "#8be9fd" }}
                      onClick={() => setEtape(OFFRES[offreIdx].sujets > 0 ? "sujets" : "form")}
                    >
                      ⟵ Retour
                    </button>
                    <button
                      className={styles.ctaTech}
                      style={{ background: "linear-gradient(90deg,#9048ff 40%,#8be9fd 120%)", color: "#fff" }}
                      onClick={() => setEtape("paiement")}
                    >
                      OK, je réserve et je paie
                    </button>
                  </div>
                </div>
              )}

              {/* PAIEMENT */}
              {etape === "paiement" && (
                <div style={{ marginTop: 30, maxWidth: 420 }}>
                  <h3 style={{ color: "#8be9fd" }}>Paiement sécurisé</h3>
                  <div style={{ margin: "1em 0 1.5em 0", color: "#fff" }}>
                    <b>{OFFRES[offreIdx].nom}</b> – {OFFRES[offreIdx].tailles[tailleIdx].label}
                    <br />
                    <b>Prix :</b> {OFFRES[offreIdx].tailles[tailleIdx].prix}
                  </div>
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.ctaTech}
                      style={{ background: "linear-gradient(90deg,#8be9fd 60%,#9048ff 120%)", color: "#23294a", fontWeight: 700 }}
                      onClick={() => setShowStripeModal(true)}
                    >
                      Confirmer et payer
                    </button>
                    <button
                      className={styles.ctaTech}
                      style={{ background: "#23294a", color: "#8be9fd" }}
                      onClick={() => setEtape("recap")}
                    >
                      ⟵ Retour
                    </button>
                  </div>
                </div>
              )}

              {/* MODALE STRIPE */}
              {showStripeModal && (
                <div
                  className={styles.modalBg}
                  tabIndex={-1}
                  aria-modal="true"
                  role="dialog"
                  onClick={e => { if (e.target === e.currentTarget) setShowStripeModal(false); }}
                >
                  <div className={styles.modal} tabIndex={0} style={{ background: "#22253c", color: "#fff" }}>
                    <div className={styles.modalHeader}>
                      <h2>Paiement Stripe pour l&apos;offre : {OFFRES[offreIdx].nom}</h2>
                      <button className={styles.modalClose} aria-label="Fermer" onClick={() => setShowStripeModal(false)}>
                        <FaTimes />
                      </button>
                    </div>
                    <div className={styles.modalBody} style={{ padding: 30, textAlign: "center" }}>
                      <p><b>Intégration Stripe à faire ici</b></p>
                      <p><i>Vous pourrez activer le paiement réel dès que vos identifiants Stripe seront disponibles.</i></p>
                      <button
                        className={styles.ctaTech}
                        style={{ marginTop: 20, background: "linear-gradient(90deg,#8be9fd 60%,#9048ff 120%)", color: "#23294a", fontWeight: 700 }}
                        onClick={() => {
                          const ref = generateReference();
                          setReference(ref);
                          setShowStripeModal(false);
                          setConfirmation("Merci, votre réservation a bien été prise en compte !");
                          setEtape("confirmation");
                          const dossier: DossierStored = {
                            reference: ref,
                            offre: { nom: OFFRES[offreIdx].nom },
                            taille: OFFRES[offreIdx].tailles[tailleIdx].label,
                            prix: OFFRES[offreIdx].tailles[tailleIdx].prix,
                            nom: form.nom,
                            secteur: form.secteur,
                            email: form.email,
                            effectif: form.effectif,
                            siren: form.siren,
                            observation: form.observation,
                            sujets,
                            date: new Date().toISOString(),
                            provenance: "NosOffresItech"
                          };
                          saveDossierToStorage(dossier);
                        }}
                      >
                        Simuler le paiement (mode test)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* CONFIRMATION */}
              {etape === "confirmation" && (
                <div style={{ marginTop: 40, fontSize: "1.2em", color: "#8be9fd", fontWeight: 600 }}>
                  {confirmation}
                  {reference && (
                    <div style={{ marginTop: 18, fontSize: "1.1em", color: "#8be9fd" }}>
                      <b>Votre n° de dossier :</b> {reference}
                      <br />
                      <span style={{ fontSize: "0.92em", color: "#d1f0fa" }}>
                        Merci de conserver ce numéro pour toute demande de suivi ou accéder à votre interface de jumeau numérique.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

