"use client";

import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import "../../styles/calculateur-ia.css";

type SujetForm = { [key: string]: string };

type Offre = { nom: string; cible: string; prix: string; code: string; detail: string };

type Dossier = {
  reference: string;
  offre: Offre;
  nom: string;
  secteur: string;
  siren: string;
  effectif: string;
  email: string;
  observation?: string;
  sujets?: SujetForm;
  question?: string;
  date: string;
  prix: string;
  provenance: string;
};

const PDF_LINKS = {
  diagnostic: "https://drive.google.com/file/d/1woF9MkW5Wm3omWyevfceOSzpwWe2n7nk/preview",
  feuille: "https://drive.google.com/file/d/1TNf3-9BoJRORJkrsvbXQP6PSrYnPtvn3/view?usp=sharing",
  totale: "https://drive.google.com/file/d/115txXF3KykV55nitlCK9HqSqld2uMlYn/view?usp=sharing"
};

function getLienPDF(code: string): string {
  if (code.startsWith("diagnostic")) return PDF_LINKS.diagnostic;
  if (code.startsWith("feuille")) return PDF_LINKS.feuille;
  if (code.startsWith("totale")) return PDF_LINKS.totale;
  return "#";
}

function getOffres(salaries: number): Offre[] {
  if (salaries <= 15) {
    return [
      { nom: "Diagnostic Express", cible: "≤ 15 salariés", prix: "590 €", code: "diagnostic15", detail: "Rapport IA personnalisé (10 slides), 4h de recherche, appel explicatif 15min" },
      { nom: "Feuille de route stratégique", cible: "≤ 15 salariés", prix: "2 390 €", code: "feuille15", detail: "Rapport IA approfondi (25–30 slides), 12h de recherche, 3 sujets prioritaires, roadmap visuelle, appel 20min" },
      { nom: "Analyse IA Totale", cible: "≤ 15 salariés", prix: "4 900 €", code: "totale15", detail: "Audit IA complet (40-45 slides), 30h de recherche, 5 sujets, roadmap avancée, appel 1h" }
    ];
  } else if (salaries <= 49) {
    return [
      { nom: "Diagnostic Express", cible: "16 à 49 salariés", prix: "990 €", code: "diagnostic49", detail: "Rapport IA personnalisé (10 slides), 4h de recherche, appel explicatif 15min" },
      { nom: "Feuille de route stratégique", cible: "16 à 49 salariés", prix: "3 900 €", code: "feuille49", detail: "Rapport IA approfondi (25–30 slides), 12h de recherche, 3 sujets prioritaires, roadmap visuelle, appel 20min" },
      { nom: "Analyse IA Totale", cible: "16 à 49 salariés", prix: "7 900 €", code: "totale49", detail: "Audit IA complet (40-45 slides), 30h de recherche, 5 sujets, roadmap avancée, appel 1h" }
    ];
  } else if (salaries <= 99) {
    return [
      { nom: "Diagnostic Express", cible: "50 à 99 salariés", prix: "1 990 €", code: "diagnostic99", detail: "Rapport IA personnalisé (10 slides), 4h de recherche, appel explicatif 15min" },
      { nom: "Feuille de route stratégique", cible: "50 à 99 salariés", prix: "5 900 €", code: "feuille99", detail: "Rapport IA approfondi (25–30 slides), 12h de recherche, 3 sujets prioritaires, roadmap visuelle, appel 20min" },
      { nom: "Analyse IA Totale", cible: "50 à 99 salariés", prix: "11 900 €", code: "totale99", detail: "Audit IA complet (40-45 slides), 30h de recherche, 5 sujets, roadmap avancée, appel 1h" }
    ];
  } else if (salaries <= 250) {
    return [
      { nom: "Diagnostic Express", cible: "100 à 250 salariés", prix: "2 990 €", code: "diagnostic250", detail: "Rapport IA personnalisé (10 slides), 4h de recherche, appel explicatif 15min" },
      { nom: "Feuille de route stratégique", cible: "100 à 250 salariés", prix: "7 900 €", code: "feuille250", detail: "Rapport IA approfondi (25–30 slides), 12h de recherche, 3 sujets prioritaires, roadmap visuelle, appel 20min" },
      { nom: "Analyse IA Totale", cible: "100 à 250 salariés", prix: "15 900 €", code: "totale250", detail: "Audit IA complet (40-45 slides), 30h de recherche, 5 sujets, roadmap avancée, appel 1h" }
    ];
  }
  return [
    { nom: "Diagnostic Express", cible: "> 250 salariés", prix: "3 900 €", code: "diagnosticplus", detail: "Rapport IA personnalisé (10 slides), 4h de recherche, appel explicatif 15min" },
    { nom: "Feuille de route stratégique", cible: "> 250 salariés", prix: "15 900 €", code: "feuilleplus", detail: "Rapport IA approfondi (25–30 slides), 12h de recherche, 3 sujets prioritaires, roadmap visuelle, appel 20min" },
    { nom: "Analyse IA Totale", cible: "> 250 salariés", prix: "29 900 €", code: "totaleplus", detail: "Audit IA complet (40-45 slides), 30h de recherche, 5 sujets, roadmap avancée, appel 1h" }
  ];
}

function JaugeScore({ score }: { score: number }) {
  return (
    <div className="jauge-score">
      <div className="jauge-score-label">Score IA&nbsp;: {score}%</div>
      <div className="jauge-score-svg">
        <svg width="180" height="180" aria-label={`Score IA : ${score} pour cent`} role="img">
          <circle cx="90" cy="90" r="80" stroke="#eee" strokeWidth="16" fill="none" />
          <circle
            cx="90"
            cy="90"
            r="80"
            stroke="#FF8C42"
            strokeWidth="16"
            fill="none"
            strokeDasharray={2 * Math.PI * 80}
            strokeDashoffset={2 * Math.PI * 80 * (1 - score / 100)}
            style={{ transition: "stroke-dashoffset 1s" }}
            strokeLinecap="round"
          />
          <text x="90" y="100" textAnchor="middle" fontSize="2.2em" fontWeight="bold" fill="#FF8C42">
            {score}%
          </text>
        </svg>
      </div>
    </div>
  );
}

function Tooltip({ children, content }: { children: React.ReactNode; content: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShow(false), 120);
  };

  return (
    <span className="tooltip-root" style={{ position: "relative" }}>
      <span
        tabIndex={0}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="tooltip-btn"
        aria-label="Détails de l&apos;offre"
        role="button"
      >
        {children}
      </span>
      {show && (
        <div className="tooltip-content" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {content}
        </div>
      )}
    </span>
  );
}

function generateRef(): string {
  const date = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const d = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  const t = `${pad(date.getHours())}${pad(date.getMinutes())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${d}-${t}-${rand}`;
}

function envoyerDossier(dossier: Dossier): void {
  let dossiers: Dossier[] = [];
  try {
    dossiers = JSON.parse(localStorage.getItem("dossiers") ?? "[]");
  } catch {
    dossiers = [];
  }
  dossiers.push(dossier);
  localStorage.setItem("dossiers", JSON.stringify(dossiers));
}

export default function CalculateurIA() {
  const [showModal, setShowModal] = useState(false);
  const [etape, setEtape] = useState<"formulaire" | "resultat" | "diagnostic" | "feuille" | "analyse" | "recap" | "confirmation">(
    "formulaire"
  );
  const [formData, setFormData] = useState({
    nom: "",
    siren: "",
    secteur: "",
    email: "",
    utilisation: "",
    salaries: "",
    contexte: "",
    observation: ""
  });
  const [score, setScore] = useState(0);
  const [suggestion, setSuggestion] = useState("");
  const [offres, setOffres] = useState<Offre[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offre | null>(null);
  const [sujets, setSujets] = useState<SujetForm>({});
  const [confirmation, setConfirmation] = useState("");
  const [showStripeModal, setShowStripeModal] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const calculateurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      setShowModal(true);
      resetModal();
      calculateurRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener("ouvrirCalculateurIA", handler);
    return () => window.removeEventListener("ouvrirCalculateurIA", handler);
  }, []);

  useEffect(() => {
    if (showModal && modalRef.current) {
      modalRef.current.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      resetModal();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  function resetModal() {
    setEtape("formulaire");
    setFormData({
      nom: "",
      siren: "",
      secteur: "",
      email: "",
      utilisation: "",
      salaries: "",
      contexte: "",
      observation: ""
    });
    setSelectedOffer(null);
    setSujets({});
    setConfirmation("");
    setScore(0);
    setSuggestion("");
    setOffres([]);
    setShowStripeModal(false);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function validateSirenSiret(value: string): boolean {
  const sirenRegex = /^\d{9}$/;
  const siretRegex = /^\d{14}$/;
  return sirenRegex.test(value) || siretRegex.test(value);
}

function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  // Validation SIREN/SIRET
  if (!validateSirenSiret(formData.siren)) {
    alert("Veuillez entrer un SIREN à 9 chiffres ou un SIRET à 14 chiffres.");
    return;
  }

  // Validation des autres champs requis si besoin
  if (!formData.nom || !formData.email || !formData.secteur || !formData.salaries) {
    alert("Veuillez remplir tous les champs requis.");
    return;
  }

  const { secteur, utilisation, salaries } = formData;
  const nbSalaries = parseInt(salaries, 10) || 0;

  const scores: Record<string, number> = {
    industrie: 42,
    services: 45,
    sante: 28,
    construction: 15,
    commerce: 30,
    transport: 35,
    agroalimentaire: 38,
    tourisme: 33,
    energie: 40,
    informatique: 60,
    immobilier: 32,
    finance: 50,
    education: 36,
    administration: 25,
    autre: 35
  };

  let scoreCalc = scores[secteur] ?? 30;
  if (utilisation === "oui") scoreCalc += 30;
  else if (utilisation === "exp") scoreCalc += 15;

  if (scoreCalc > 100) scoreCalc = 100;

  const suggestions: Record<string, string> = {
    construction:
      "L’IA peut optimiser la gestion de vos chantiers, la planification, la gestion des stocks et l’analyse des devis.",
    industrie:
      "L’IA optimise la maintenance prédictive, la production et anticipe les pannes.",
    sante:
      "L’IA accélère la gestion des dossiers patients, aide au diagnostic et optimise les plannings.",
    commerce:
      "L’IA analyse les ventes, prédit les tendances et automatise la gestion des stocks.",
    services:
      "L’IA améliore la gestion des plannings, l’analyse client et automatise l’administratif.",
    transport: "L’IA optimise la logistique, les itinéraires et la maintenance.",
    agroalimentaire: "L’IA contrôle la qualité, anticipe la demande et optimise la logistique.",
    tourisme:
      "L’IA personnalise l’expérience client, optimise les réservations et analyse la satisfaction.",
    energie:
      "L’IA optimise la gestion énergétique, la maintenance et la prévision de la demande.",
    informatique:
      "L’IA automatise la cybersécurité, l’analyse de données et le support technique.",
    immobilier:
      "L’IA valorise les biens, analyse le marché et automatise la gestion locative.",
    finance:
      "L’IA détecte les fraudes, optimise les investissements et personnalise les offres clients.",
    education:
      "L’IA personnalise les parcours d’apprentissage et automatise l’évaluation.",
    administration:
      "L’IA simplifie la gestion documentaire et automatise le traitement des demandes.",
    autre:
      "L’IA automatise les tâches répétitives, analyse vos données et améliore la relation client."
  };

  const suggestionCalc = suggestions[secteur] ?? suggestions["autre"];

  setScore(scoreCalc);
  setSuggestion(suggestionCalc);
  setOffres(getOffres(nbSalaries));
  setEtape("resultat");
  setTimeout(() => {
    modalBodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, 50);
}

  function handleChoisirOffre(opt: Offre) {
    setSelectedOffer(opt);
    setConfirmation("");
    if (opt.code.startsWith("diagnostic")) {
      setEtape("diagnostic");
    } else if (opt.code.startsWith("feuille")) {
      setSujets({ sujet1: "", sujet2: "", sujet3: "" });
      setEtape("feuille");
    } else if (opt.code.startsWith("totale")) {
      setSujets({ sujet1: "", sujet2: "", sujet3: "", sujet4: "", sujet5: "" });
      setEtape("analyse");
    }
  }

  function handleValiderDiagnostic(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtape("recap");
  }

  function handleValiderFeuille(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtape("recap");
  }

  function handleValiderAnalyse(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtape("recap");
  }

  function handleConfirmerRecap() {
    if (!selectedOffer) return;

    const ref = generateRef();

    const dossier: Dossier = {
      reference: ref,
      offre: selectedOffer,
      nom: formData.nom,
      secteur: formData.secteur,
      siren: formData.siren,
      effectif: formData.salaries,
      prix: selectedOffer.prix,
      email: formData.email,
      observation: selectedOffer.code.startsWith("diagnostic") ? formData.observation : undefined,
      sujets:
        selectedOffer.code.startsWith("feuille") || selectedOffer.code.startsWith("totale")
          ? sujets
          : undefined,
      question: formData.contexte,
      date: new Date().toISOString(),
      provenance: "CalculateurIA"
    };
    envoyerDossier(dossier);
    setConfirmation(
      `Merci, votre réservation a bien été prise en compte !<br /><br />
      <b>Votre n° de dossier : <span style="color:#F76D3C">${ref}</span></b><br /><br />
      Merci de conserver ce numéro pour toute demande de suivi ou accéder à votre interface de jumeau numérique.`
    );
    setEtape("confirmation");
  }

  return (
    <section
      className="calculateur-ia-section max-w-7xl mx-auto px-4 sm:px-8 md:px-12"
      id="calculateur-ia"
      ref={calculateurRef}
      style={{ position: "relative", minHeight: 600 }}
    >
      {/* AJOUT DU FOND ANIMÉ */}
      <div
        className="calculateur-ia-bg"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden"
        }}
        aria-hidden="true"
      >
        <picture>
          <source srcSet="/images/bloc14.webp" type="image/webp" />
          <img
            src="/images/bloc14.png"
            alt=""
            draggable={false}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </picture>
      </div>

      <div className="calculateur-ia-header relative z-10 text-center sm:text-left">
        <h2 className="calculateur-ia-title">🤝 Notre Méthode</h2>
        <p>
          Nous croyons en un accompagnement sur-mesure, basé sur l&apos;écoute, la confidentialité et la transparence.
          Chaque mission débute par une analyse approfondie de vos besoins, suivie de recommandations personnalisées et d’un suivi régulier.
          Notre équipe certifiée s’engage à vos côtés pour garantir la réussite de votre transformation vers l’Industrie 5.0,
          tout en assurant la sécurité et la confidentialité de vos données.
        </p>
        <div className="calculateur-ia-audio">
          <p><b>🎧 Écoutez la synthèse audio de notre démarche :</b></p>
          <audio controls>
            <source src="https://github.com/iSkyceman/podcast/raw/refs/heads/main/podcast.mp3" type="audio/mpeg" />
            Votre navigateur ne supporte pas la lecture audio.
          </audio>
        </div>
        <div className="calculateur-ia-btn-container">
          <button
            className="calculateur-ia-btn calculateur-ia-methode-btn"
            onClick={() => {
              setShowModal(true);
              resetModal();
            }}
          >
            Découvrir mon potentiel
          </button>
        </div>
      </div>

      {/* ----------- MODAL / TUNNEL ---------- */}
      {showModal && (
        <div
          className="calculateur-ia-modal-bg"
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          onClick={e => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="calculateur-ia-modal" ref={modalRef} tabIndex={0}>
            <div className="calculateur-ia-modal-header">
              <h2>Calculez votre score IA</h2>
              <button aria-label="Fermer" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className="calculateur-ia-modal-body" ref={modalBodyRef}>
              {/* --- ÉTAPE 1 : FORMULAIRE --- */}
              {etape === "formulaire" && (
                <>
                  <div className="calculateur-ia-form-desc">
                    Remplissez ce formulaire pour découvrir gratuitement le potentiel IA de votre entreprise.
                    <br />
                    Posez-nous une question : notre équipe vous répondra en plus de votre score personnalisé.
                  </div>
                  <form onSubmit={handleSubmit} className="calculateur-ia-form">
                    <label>
                      Nom de l&apos;entreprise
                      <input type="text" name="nom" required value={formData.nom} onChange={handleChange} />
                    </label>
                    <label>
                      SIREN ou SIRET
                      <input
                        type="text"
                        name="siren"
                        pattern="\\d{9}|\\d{14}"
                        title="Veuillez entrer un SIREN (9 chiffres) ou SIRET (14 chiffres)"
                        required
                        value={formData.siren}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Email professionnel
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                    </label>
                    <label>
                      Secteur d&apos;activité
                      <select name="secteur" required value={formData.secteur} onChange={handleChange}>
                        <option value="">Sélectionner...</option>
                        <option value="industrie">Industrie manufacturière</option>
                        <option value="services">Services aux entreprises</option>
                        <option value="sante">Santé / Médico-social</option>
                        <option value="construction">Construction / BTP</option>
                        <option value="commerce">Commerce / Distribution</option>
                        <option value="transport">Transport / Logistique</option>
                        <option value="agroalimentaire">Agroalimentaire</option>
                        <option value="tourisme">Tourisme / Hôtellerie</option>
                        <option value="energie">Énergie / Environnement</option>
                        <option value="informatique">Informatique / Télécoms</option>
                        <option value="immobilier">Immobilier</option>
                        <option value="finance">Banque / Assurance / Finance</option>
                        <option value="education">Éducation / Formation</option>
                        <option value="administration">Administration / Collectivités</option>
                        <option value="autre">Autre secteur</option>
                      </select>
                    </label>
                    <label>
                      Votre entreprise utilise-t-elle déjà des solutions d&apos;intelligence artificielle&nbsp;?
                      <select name="utilisation" required value={formData.utilisation} onChange={handleChange}>
                        <option value="">Sélectionner...</option>
                        <option value="non">Non, pas encore</option>
                        <option value="exp">Oui, en expérimentation</option>
                        <option value="oui">Oui, déjà intégrée à nos process</option>
                      </select>
                    </label>
                    <label>
                      Nombre de salariés
                      <input
                        type="number"
                        name="salaries"
                        min={1}
                        max={10000}
                        required
                        value={formData.salaries}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Posez une question à notre IA (optionnel)
                      <input type="text" name="contexte" placeholder="Ex : Comment l’IA peut-elle optimiser nos chantiers ?" value={formData.contexte} onChange={handleChange} />
                    </label>
                    <div className="calculateur-ia-btn-container">
                      <button type="submit" className="calculateur-ia-form-btn">
                        Calculer mon score IA
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* --- ÉTAPE 2 : RÉSULTAT --- */}
              {etape === "resultat" && (
                <div>
                  <div className="calculateur-ia-result-title">
                    <b>{formData.nom || "Votre entreprise"}, voici votre diagnostic IA :</b>
                  </div>
                  <JaugeScore score={score} />
                  <div className="calculateur-ia-result-suggestion">
                    Ce score reflète le potentiel d’intégration de l’IA dans votre entreprise. Voici des pistes concrètes pour passer à l’action.
                  </div>
                  {formData.contexte && (
                    <div style={{ margin: "1em 0 0.5em 0" }}>
                      <b>Votre question :</b> <i>{formData.contexte}</i>
                      <div style={{ margin: "0.5em 0 1em 0" }}>
                        <b>Notre réponse :</b> Intégrer l’IA dans votre développement interne peut vous permettre d’optimiser vos processus, d’automatiser certaines tâches et de gagner en compétitivité. Pour réussir, commencez par un projet pilote, formez vos équipes et entourez-vous d’experts en IA.
                      </div>
                    </div>
                  )}
                  <div style={{ margin: "0.5em 0 1em 0" }}>
                    <b>Notre première piste pour vous :</b> {suggestion}
                  </div>
                  <div style={{ marginTop: "1.2em", fontWeight: 600 }}>
                    Quelle offre souhaitez-vous retenir&nbsp;?
                  </div>
                  <div className="calculateur-ia-offres">
                    {offres.map((opt, idx) => {
                      const backgroundColors = [
                        "linear-gradient(90deg,#FFB86C 0%,#FF8C42 60%,#F76D3C 100%)",
                        "#2196f3",
                        "#00bcd4"
                      ];
                      return (
                        <div
                          key={opt.code}
                          className="calculateur-ia-offre"
                          style={{
                            background: backgroundColors[idx] ?? "#2196f3",
                            color: "#fff",
                            boxShadow: "0 2px 18px #F76D3C22",
                            borderRadius: "18px"
                          }}
                        >
                          <div className="calculateur-ia-offre-header">
                            <b>{opt.nom}</b>
                            <Tooltip
                              content={
                                <>
                                  <div>{opt.detail}</div>
                                  <a href={getLienPDF(opt.code)} target="_blank" rel="noopener noreferrer" style={{ color: "#F76D3C", textDecoration: "underline" }}>
                                    Voir la présentation PDF
                                  </a>
                                </>
                              }
                            >
                              <span style={{ marginLeft: 8, color: "#fff", cursor: "pointer" }}>?</span>
                            </Tooltip>
                          </div>
                          <div style={{ fontSize: "0.97em", color: "#fff" }}>{opt.cible}</div>
                          <div className="calculateur-ia-offre-prix" style={{ fontWeight: 700, fontSize: "1.15em" }}>{opt.prix}</div>
                          <div className="calculateur-ia-btn-container">
                            <button className="calculateur-ia-offre-btn" onClick={() => handleChoisirOffre(opt)}>
                              Choisir cette offre
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="calculateur-ia-modal-actions">
                    <button className="calculateur-ia-btn-alt" onClick={() => setEtape("formulaire")}>⟵ Retour au formulaire</button>
                    <button className="calculateur-ia-btn-alt" onClick={() => setShowModal(false)}>Fermer</button>
                  </div>
                </div>
              )}

              {/* --- ÉTAPE 3A : DIAGNOSTIC EXPRESS --- */}
              {etape === "diagnostic" && selectedOffer && (
                <form className="calculateur-ia-tunnel-form" onSubmit={handleValiderDiagnostic}>
                  <h4>{selectedOffer.nom}</h4>
                  <div>{selectedOffer.detail}</div>
                  <div style={{ margin: "1em 0" }}>
                    <a href={getLienPDF(selectedOffer.code)} target="_blank" rel="noopener noreferrer" style={{ color: "#F76D3C", textDecoration: "underline", fontWeight: "bold" }}>
                      Voir la présentation Diagnostic Express (PDF)
                    </a>
                  </div>
                  <label>
                    Observation ou sujet à signaler (optionnel)
                    <textarea name="observation" value={formData.observation} onChange={handleChange} placeholder="Vous pouvez préciser un point d&apos;attention, une question ou un sujet spécifique…" rows={3} style={{ resize: "vertical", marginTop: 4, marginBottom: 8, width: "100%" }} />
                  </label>
                  <div className="calculateur-ia-tunnel-actions">
                    <button className="calculateur-ia-form-btn" type="submit">Valider et recevoir mon offre</button>
                    <button className="calculateur-ia-btn-alt" type="button" onClick={() => setEtape("resultat")}>⟵ Retour</button>
                  </div>
                </form>
              )}

              {/* --- ÉTAPE 3B : FEUILLE DE ROUTE --- */}
              {etape === "feuille" && selectedOffer && (
                <form className="calculateur-ia-tunnel-form" onSubmit={handleValiderFeuille}>
                  <h4>{selectedOffer.nom}</h4>
                  <div>{selectedOffer.detail}</div>
                  <div style={{ margin: "1em 0" }}>
                    <a href={getLienPDF(selectedOffer.code)} target="_blank" rel="noopener noreferrer" style={{ color: "#F76D3C", textDecoration: "underline", fontWeight: "bold" }}>
                      Voir la présentation Feuille de Route Stratégique (PDF)
                    </a>
                  </div>
                  <p style={{ marginBottom: "1em", fontSize: "1.07em" }}>
                    <b>Aidez-nous à personnaliser votre feuille de route IA</b><br />
                    Merci de préciser les <b>3 sujets ou problématiques à traiter en priorité</b>.<br />
                    <span style={{ color: "#666" }}>
                      Plus votre réponse est précise, plus notre feuille de route sera pertinente et actionnable.
                    </span>
                  </p>
                  {[1, 2, 3].map(i => (
                    <label key={i}>
                      Sujet prioritaire n°{i}{" "}
                      {i === 1 && (
                        <span style={{ color: "#888", fontSize: "0.95em" }}>
                          (ex&nbsp;: automatisation, réduction des coûts, qualité…)
                        </span>
                      )}
                      <input type="text" required={i === 1} value={sujets[`sujet${i}`] ?? ""} onChange={e => setSujets(s => ({ ...s, [`sujet${i}`]: e.target.value }))} />
                    </label>
                  ))}
                  <div style={{ fontSize: "0.95em", color: "#555", marginTop: "0.7em" }}>
                    <span style={{ color: "#F76D3C", marginRight: 4 }}>ℹ️</span> Vous pouvez préciser un enjeu, un objectif, ou une difficulté rencontrée dans votre activité.
                    <br />
                    Toutes vos informations restent strictement confidentielles.
                  </div>
                  <div className="calculateur-ia-tunnel-actions">
                    <button className="calculateur-ia-form-btn" type="submit">Valider et recevoir mon offre</button>
                    <button className="calculateur-ia-btn-alt" type="button" onClick={() => setEtape("resultat")}>⟵ Retour</button>
                  </div>
                </form>
              )}

              {/* --- ÉTAPE 3C : ANALYSE IA TOTALE --- */}
              {etape === "analyse" && selectedOffer && (
                <form className="calculateur-ia-tunnel-form" onSubmit={handleValiderAnalyse}>
                  <h4>{selectedOffer.nom}</h4>
                  <div>{selectedOffer.detail}</div>
                  <div style={{ margin: "1em 0" }}>
                    <a href={getLienPDF(selectedOffer.code)} target="_blank" rel="noopener noreferrer" style={{ color: "#F76D3C", textDecoration: "underline", fontWeight: "bold" }}>
                      Voir la présentation Analyse IA Totale (PDF)
                    </a>
                  </div>
                  <p style={{ marginBottom: "1em", fontSize: "1.07em" }}>
                    <b>Aidez-nous à personnaliser votre audit IA complet</b><br />
                    Merci de préciser les <b>5 sujets ou problématiques à traiter en priorité</b>.<br />
                    <span style={{ color: "#666" }}>
                      Plus votre réponse est précise, plus notre audit sera pertinent et actionnable.
                    </span>
                  </p>
                  {[1, 2, 3, 4, 5].map(i => (
                    <label key={i}>
                      Sujet prioritaire n°{i}{" "}
                      {i === 1 && (
                        <span style={{ color: "#888", fontSize: "0.95em" }}>
                          (ex&nbsp;: cybersécurité, data, automatisation, supply chain…)
                        </span>
                      )}
                      <input type="text" required={i === 1} value={sujets[`sujet${i}`] ?? ""} onChange={e => setSujets(s => ({ ...s, [`sujet${i}`]: e.target.value }))} />
                    </label>
                  ))}
                  <div style={{ fontSize: "0.95em", color: "#555", marginTop: "0.7em" }}>
                    <span style={{ color: "#F76D3C", marginRight: 4 }}>ℹ️</span> Vous pouvez préciser un enjeu, un objectif, ou une difficulté rencontrée dans votre activité.
                    <br />
                    Toutes vos informations restent strictement confidentielles.
                  </div>
                  <div className="calculateur-ia-tunnel-actions">
                    <button className="calculateur-ia-form-btn" type="submit">Valider et recevoir mon offre</button>
                    <button className="calculateur-ia-btn-alt" type="button" onClick={() => setEtape("resultat")}>⟵ Retour</button>
                  </div>
                </form>
              )}

              {/* --- ÉTAPE 4 : RÉCAPITULATIF --- */}
              {etape === "recap" && selectedOffer && (
                <div className="calculateur-ia-recap">
                  <h3>Récapitulatif de votre demande</h3>
                  <ul>
                    <li><b>Offre :</b> {selectedOffer.nom}</li>
                    <li><b>Taille :</b> {selectedOffer.cible}</li>
                    <li><b>Prix :</b> {selectedOffer.prix}</li>
                    <li><b>Nom :</b> {formData.nom}</li>
                    <li><b>Secteur :</b> {formData.secteur}</li>
                    <li><b>SIREN/SIRET :</b> {formData.siren}</li>
                    <li><b>Effectif :</b> {formData.salaries}</li>
                    {selectedOffer.code.startsWith("diagnostic") && formData.observation && (
                      <li><b>Observation / sujet :</b> {formData.observation}</li>
                    )}
                    {selectedOffer.code.startsWith("feuille") && (
                      <>
                        <li><b>Sujet prioritaire n°1 :</b> {sujets.sujet1}</li>
                        <li><b>Sujet prioritaire n°2 :</b> {sujets.sujet2}</li>
                        <li><b>Sujet prioritaire n°3 :</b> {sujets.sujet3}</li>
                      </>
                    )}
                    {selectedOffer.code.startsWith("totale") && (
                      <>
                        <li><b>Sujet prioritaire n°1 :</b> {sujets.sujet1}</li>
                        <li><b>Sujet prioritaire n°2 :</b> {sujets.sujet2}</li>
                        <li><b>Sujet prioritaire n°3 :</b> {sujets.sujet3}</li>
                        <li><b>Sujet prioritaire n°4 :</b> {sujets.sujet4}</li>
                        <li><b>Sujet prioritaire n°5 :</b> {sujets.sujet5}</li>
                      </>
                    )}
                    {formData.contexte && <li><b>Question :</b> {formData.contexte}</li>}
                  </ul>
                  <div style={{ display: "flex", gap: "16px", marginTop: "1.5em" }}>
                    <button type="button" className="calculateur-ia-btn-alt" onClick={() => {
                      if (selectedOffer.code.startsWith("diagnostic")) setEtape("diagnostic");
                      else if (selectedOffer.code.startsWith("feuille")) setEtape("feuille");
                      else if (selectedOffer.code.startsWith("totale")) setEtape("analyse");
                      else setEtape("resultat");
                    }}>⟵ Retour</button>
                    <button type="button" className="calculateur-ia-form-btn" onClick={() => setShowStripeModal(true)}>OK, je réserve et je paie</button>
                  </div>
                </div>
              )}

              {/* --- MODALE STRIPE --- */}
              {showStripeModal && (
                <div className="calculateur-ia-modal-bg" tabIndex={-1} aria-modal="true" role="dialog" onClick={e => { if (e.target === e.currentTarget) setShowStripeModal(false); }}>
                  <div className="calculateur-ia-modal" tabIndex={0}>
                    <div className="calculateur-ia-modal-header">
                      <h2>Paiement Stripe pour l&apos;offre : {selectedOffer?.nom}</h2>
                      <button aria-label="Fermer" onClick={() => setShowStripeModal(false)}>&times;</button>
                    </div>
                    <div className="calculateur-ia-modal-body" style={{ padding: 30, textAlign: "center" }}>
                      <p><b>Intégration Stripe à faire ici</b></p>
                      <p><i>Vous pourrez activer le paiement réel dès que vos identifiants Stripe seront disponibles.</i></p>
                      <button className="calculateur-ia-form-btn" style={{ marginTop: 20 }} onClick={() => { handleConfirmerRecap(); setShowStripeModal(false); }}>
                        Simuler le paiement (mode test)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* --- ÉTAPE 5 : CONFIRMATION --- */}
              {etape === "confirmation" && (
                <div className="calculateur-ia-confirm-msg" dangerouslySetInnerHTML={{ __html: confirmation }} />
              )}
            </div>
          </div>
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <a href="/admin-dossiers" style={{ color: "#888", fontSize: "0.93em", textDecoration: "underline dotted", opacity: 0.7 }} tabIndex={-1}>
          Accès interface gestion dossiers
        </a>
      </div>
    </section>
  );
}
