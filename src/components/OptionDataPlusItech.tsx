"use client";
import { useState, useEffect } from "react";
import styles from "./OptionDataPlusItech.module.css";

// ---- Données métier, helpers ----
const VALID_CODES = [
  { code: "ITECH2025-TWINX12", nom: "InnovTech", email: "welcome@innovtech.com", siren: "987654321", salaries: "106", secteur: "informatique", adresse: "3 avenue du Futur, 75010 Paris" },
  { code: "ESSAI2025-ITECH", nom: "DemoClientItech", email: "demo@itech.com", siren: "444555666", secteur: "aéronautique", salaries: "250", adresse: "12 rue Technopole, 69000 Lyon" },
];
const FORMULES = [
  { value: "0-15", label: "0–15 salariés", prix: 79 },
  { value: "16-49", label: "16–49 salariés", prix: 199 },
  { value: "50-99", label: "50–99 salariés", prix: 360 },
  { value: "100-249", label: "100–249 salariés", prix: 690 },
  { value: "250+", label: "250 salariés et +", prix: 995 }
];
const CONTRACT_TEXT = `Entre lEntre les soussignés :
iSkyce, Société [Entreprise individuelle], au capital de [X] euros, dont le siège social est situé [6, rue
schelmenwasen], immatriculée au RCS de [Strasbourg] sous le numéro [39273610400028],
représentée par M. Michel Klein, en qualité de [dirigeant],
ci-après dénommée « le Prestataire » ou « iSkyce »,
Et
[Nom de l’entreprise cliente], Société [forme juridique], au capital de [X] euros, dont le siège
social est situé [adresse], immatriculée au RCS de [ville] sous le numéro [SIRET], représentée par
[nom, fonction],
ci-après dénommée « le Client »,
Il a été convenu ce qui suit :

Article 1 – Objet
Le présent contrat a pour objet la fourniture par iSkyce au Client d’un abonnement au service
« Data+ », comprenant la complétude, la vérification et le rafraîchissement mensuel automatisé du
jumeau numérique de l’entreprise cliente, selon les modalités précisées ci-après.

Article 2 – Description des Services
iSkyce s’engage à :
 Enrichir et actualiser mensuellement le jumeau numérique du Client à partir des données
collectées et vérifiées.
 Fournir un accès sécurisé à la plateforme Data+.
 Envoyer au Client une note de service mensuelle récapitulant les opérations de complétude, de
vérification et de rafraîchissement réalisées, ainsi que les éventuelles évolutions ou
recommandations.
 Assurer une assistance technique par chat ou email aux horaires ouvrés.

Article 3 – Durée

Le présent contrat est conclu pour une durée ferme d’un (1) an à compter de sa date de signature,
renouvelable tacitement par périodes successives d’un (1) an, sauf dénonciation par l’une des
parties dans les conditions prévues à l’article 10.

Article 4 – Tarification et Modalités de Paiement
 L’abonnement Data+ est facturé selon la grille tarifaire en vigueur au jour de la souscription, en
fonction de la tranche d’effectif déclarée par le Client.
 Le paiement s’effectue par prélèvement automatique via la plateforme Stripe, selon la périodicité
convenue (mensuelle ou annuelle).
 Tout retard de paiement entraînera l’application d’intérêts de retard au taux légal et pourra
entraîner la suspension des services après mise en demeure restée sans effet.

Article 5 – Obligations des Parties
Obligations d’iSkyce :
 Fournir le service Data+ conformément à la description du présent contrat.
 Garantir la confidentialité, l’intégrité et la sécurité des données du Client, conformément à la
norme RGPD.
 Informer le Client de toute évolution majeure du service ou des conditions d’utilisation.
Obligations du Client :
 Fournir des informations exactes et à jour nécessaires à la création et à la maintenance du jumeau
numérique.
 S’acquitter du paiement de l’abonnement dans les délais convenus.
 Respecter les conditions d’utilisation de la plateforme Data+.

Article 6 – Propriété Intellectuelle
6.1. Le Client reconnaît que le service Data+, incluant le concept de jumeau numérique, le logiciel
sous-jacent, les algorithmes de complétude, vérification et rafraîchissement, les bases de données,
la documentation, et toute amélioration ou adaptation y afférent, sont et demeurent la propriété
exclusive d’iSkyce ou des tiers lui ayant concédé les droits d’utilisation.
6.2. Le présent Contrat confère au Client un droit d’accès et d’utilisation non-exclusif, non
transférable et limité aux seuls Services Data+ fournis par iSkyce, pour la durée du Contrat. Ce
droit d’utilisation ne saurait en aucun cas être interprété comme une cession, une licence étendue
ou un transfert de propriété intellectuelle des éléments susmentionnés au bénéfice du Client.
6.3. Le Client s’interdit formellement de reproduire, adapter, modifier, traduire, arranger, diffuser,
décompiler, désassembler ou tenter d’accéder au code source du jumeau numérique ou de tout
élément du service Data+, sauf dans les limites expressément autorisées par la loi et le présent
Contrat.
6.4. Le jumeau numérique créé et maintenu dans le cadre du Service Data+, bien qu’il reflète les
données du Client, constitue une œuvre de l’esprit et une base de données dont la conception, la

structure et le mécanisme de mise à jour restent la propriété exclusive d’iSkyce. Le Client n’acquiert
aucun droit de propriété sur ce jumeau numérique en tant que tel.

Article 7 – Disponibilité, Maintenance et Évolution du Service
7.1. iSkyce s’engage à assurer une disponibilité du service Data+ de 99 % sur une base annuelle,
hors périodes de maintenance planifiée notifiées au Client au moins 48h à l’avance.
7.2. iSkyce ne saurait être tenue responsable des interruptions dues à des cas de force majeure ou
à des interventions nécessaires pour garantir la sécurité et la stabilité du service.
7.3. iSkyce se réserve le droit de faire évoluer le service Data+ (fonctionnalités, sécurité, interface...)
dans l’intérêt de ses clients. Toute modification substantielle sera notifiée au Client.

Article 8 – Sous-traitance
iSkyce pourra recourir à des sous-traitants pour l’exécution de tout ou partie du service, tout en
demeurant responsable vis-à-vis du Client.

Article 9 – Sauvegarde et Restitution des Données
À la demande du Client et en cas de résiliation, iSkyce restituera les données brutes fournies par le
Client dans un format standard, à l’exclusion du jumeau numérique et de tout élément relevant de
la propriété intellectuelle d’iSkyce.

Article 10 – Résiliation
 Chacune des parties peut résilier le contrat à l’issue de la période initiale ou de chaque période de
renouvellement, par lettre recommandée avec accusé de réception, moyennant un préavis de
trente (30) jours.
 En cas de manquement grave par l’une des parties à ses obligations contractuelles, le contrat
pourra être résilié de plein droit, après mise en demeure restée sans effet pendant quinze (15)
jours.
 En cas de résiliation anticipée à l’initiative du Client hors manquement d’iSkyce, les sommes dues
pour la période en cours restent exigibles.

Article 11 – Responsabilité
 iSkyce est tenue à une obligation de moyens pour la fourniture du service Data+. Sa responsabilité
ne saurait être engagée en cas d’indisponibilité temporaire du service pour maintenance, force
majeure ou mauvaise utilisation par le Client.

 En aucun cas, la responsabilité d’iSkyce ne saurait excéder le montant total des sommes versées
par le Client au titre du présent contrat sur les douze (12) derniers mois.

Article 12 – Force majeure
Aucune des parties ne pourra être tenue responsable d’un manquement à ses obligations en cas
de survenance d’un événement de force majeure, tel que défini par la jurisprudence française.

Article 13 – Conformité réglementaire
iSkyce garantit que le service Data+ est conforme à la réglementation en vigueur, notamment le
RGPD. Le Client s’engage à utiliser le service dans le respect de la loi.

Article 14 – Audit et Traçabilité
Toutes les opérations sur les données du Client sont tracées et peuvent faire l’objet d’un audit à la
demande du Client, dans la limite du raisonnable.

Article 15 – Non-sollicitation
Le Client s’interdit de solliciter ou d’embaucher directement ou indirectement tout collaborateur
d’iSkyce ayant participé à l’exécution du contrat, pendant la durée du contrat et un an après sa
cessation.

Article 16 – Limitation d’accès
L’accès au service Data+ est réservé aux seuls salariés/mandataires du Client et ne peut être cédé,
transféré ou mis à disposition de tiers sans accord écrit d’iSkyce.

Article 17 – Communication et Références
Sauf refus exprès du Client, iSkyce est autorisée à mentionner le nom et le logo du Client comme
référence commerciale.

Article 18 – Litiges et Droit applicable

Le présent contrat est régi par le droit français.
En cas de litige, les parties s’efforceront de résoudre leur différend à l’amiable. À défaut, le litige
sera porté devant le tribunal compétent du ressort du siège social d’iSkyce.

Article 19 – Divers
Toute modification du présent contrat devra faire l’objet d’un avenant écrit signé par les deux
parties.
Les coordonnées de contact pour toute question relative au contrat sont : [adresse
email support@iskyce.com], iskyceman@gmail.com .

Fait à [lieu], le [date]
Pour iSkyce
Michel Klein
[fonction]
Pour le Client
[Nom, fonction]
(Signatures précédées de la mention « Lu et approuvé »)
`.trim(); // mets ici ton contrat complet

function generateRef() {
  const date = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `ITECH-DATA-${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${Math.floor(100000 + Math.random() * 900000)}`;
}
function downloadPDF(html: HTMLElement, fileName: string) {
  if (!(window as any).html2pdf) {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => (window as any).html2pdf().from(html).save(fileName);
    document.body.appendChild(script);
  } else {
    (window as any).html2pdf().from(html).save(fileName);
  }
}

// ----- CodeInputSection -----
function CodeInputSection({ code, setCode, accessGranted, setFieldsInitialised, setShowModal }) {
  return (
    <div className={styles.centerCodeBox}>
      <label htmlFor="code_data_plus" className={styles.codeLabel}>
        Saisissez votre code d’accès Data+ :
      </label>
      <input
        className={styles.select}
        type="text"
        id="code_data_plus"
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="EX: ITECH2025-TWINX12"
      />
      <div className={styles.codeMessage}>
        {code.length === 0 && "Un code est requis pour souscrire."}
        {code.length > 3 && !accessGranted && "Code invalide ou expiré."}
      </div>
      {accessGranted && (
        <button
          type="button"
          onClick={() => { setFieldsInitialised(false); setShowModal(true); }}
          className={styles.buttonBlue}
        >
          S’abonner à Data+
        </button>
      )}
    </div>
  );
}

// ----- TunnelModal -----
type TunnelModalProps = {
  step: number;
  steps: string[];
  fields: any;
  setFields: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formule: string;
  setFormule: (s: string) => void;
  paiement: string;
  setPaiement: (s: string) => void;
  prixBase: number;
  prix: number;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  prev: () => void;
  next: () => void;
  contratLu: boolean;
  setContratLu: (b: boolean) => void;
  contratMenuOpen: boolean;
  setContratMenuOpen: (b: boolean) => void;
  buildContractHtml: () => string;
  handleContratAccept: () => void;
  showSimuStripe: boolean;
  handleSimuStripe: () => void;
  isSaving: boolean;
  refDossier: string;
  pdfReady: boolean;
  handleDownloadPdf: () => void;
  emailSent: boolean;
  confirmation: string;
  onClose: () => void;
};

function TunnelModal(props: TunnelModalProps) {
  const {
    step, steps, fields, handleChange, formule, setFormule, paiement, setPaiement, prixBase, prix,
    handleFormSubmit, prev, next, contratLu, setContratLu, contratMenuOpen, setContratMenuOpen, buildContractHtml,
    handleContratAccept, showSimuStripe, handleSimuStripe, isSaving, refDossier, pdfReady, handleDownloadPdf, emailSent, confirmation,
    onClose
  } = props;

  return (
    <>
      <div className={styles.modalHeader}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Fermer">×</button>
        <ol className={styles.progressBar}>
          {steps.map((e, idx) => (
            <li key={e}
                className={idx === step
                  ? styles.stepActive
                  : idx < step ? styles.stepDone : styles.stepTodo}>
              <span>{idx + 1}</span> {e}
            </li>
          ))}
        </ol>
        <div className={styles.modalTitle}>
          <span className={styles.bulletIcon} aria-hidden="true"></span>
          Abonnement Data+ ITech
        </div>
      </div>
      <div className={styles.modalBody}>
        {step === 0 && (
          <form onSubmit={handleFormSubmit} autoComplete="off">
            <label>Email professionnel
              <input type="email" name="email" autoComplete="off" className={styles.select} required value={fields.email} onChange={handleChange} />
            </label>
            <label>SIREN
              <input type="text" name="siren" autoComplete="off" className={styles.select} required value={fields.siren} onChange={handleChange} />
            </label>
            <label>Adresse
              <input type="text" name="adresse" autoComplete="off" className={styles.select} required value={fields.adresse} onChange={handleChange} />
            </label>
            <label>Formule Data+
              <select className={styles.select} value={formule} onChange={e => setFormule(e.target.value)} required>
                <option value="">Tranche de salariés</option>
                {FORMULES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </label>
            <label>Paiement
              <select className={styles.select} value={paiement} onChange={e => setPaiement(e.target.value)}>
                <option value="mensuel">Mensuel — {prixBase} €/mois</option>
                <option value="annuel">Annuel (-10%) — {prix} €/an</option>
              </select>
            </label>
            <button className={styles.buttonBlue} type="submit" style={{ marginTop: 8 }}>
              Suivant →
            </button>
          </form>
        )}
        {step === 1 && (
          <div>
            <h4 className={styles.contractTitle}>Contrat d’abonnement Data+ ITech</h4>
            <div className={styles.contractMenu}>
              <button
                className={styles.contractDropdownBtn}
                type="button"
                onClick={() => setContratMenuOpen(!contratMenuOpen)}
                aria-expanded={contratMenuOpen}
              >
                {contratMenuOpen ? "▲ Masquer le contrat" : "▼ Visualiser le contrat"}
              </button>
              {contratMenuOpen && (
                <div className={styles.contractZone} style={{ animation: "fadeIn 0.4s" }}>
                  <div dangerouslySetInnerHTML={{ __html: buildContractHtml() }} />
                  <a
                    href="https://drive.google.com/file/d/1_HeICEiGO4vPFQK7gIPniHxc6s3xuMAp/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >📄 Voir le contrat type (PDF Drive)</a>
                </div>
              )}
            </div>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={contratLu} onChange={e => setContratLu(e.target.checked)} />
              J’ai bien lu et j’accepte l’ensemble du contrat ci-dessus.
            </label>
            <button
              className={styles.buttonBlue}
              type="button"
              onClick={handleContratAccept}
              disabled={!contratLu}
              style={{ marginTop: 12 }}>
              Valider et passer au paiement
            </button>
            <button className={styles.buttonOutline} onClick={prev} type="button" style={{ marginLeft: 12 }}>← Précédent</button>
          </div>
        )}
        {step === 2 && (
          <div style={{ textAlign: "center" }}>
            <h3 className={styles.contractTitle}>Paiement sécurisé</h3>
            {showSimuStripe ? (
              <div className={styles.loader}>Traitement Stripe…</div>
            ) : (
              <button className={styles.buttonBlue} onClick={handleSimuStripe} disabled={isSaving}>
                Procéder au paiement
              </button>
            )}
            <div style={{ color: "#53308d", marginTop: 16, fontSize: "1em" }}>
              Référence dossier : <b>{refDossier || "[assignée à l’étape suivante]"}</b>
            </div>
            <button className={styles.buttonOutline} onClick={prev} type="button" style={{ marginTop: 14 }}>← Précédent</button>
          </div>
        )}
        {step === 3 && (
          <div style={{ textAlign: "center" }}>
            <div dangerouslySetInnerHTML={{ __html: confirmation }} />
            {pdfReady && (
              <>
                <button onClick={handleDownloadPdf} className={styles.buttonBlue} style={{ marginTop: 10 }}>
                  📄 Télécharger mon contrat signé (PDF)
                </button>
                {emailSent && (
                  <div className={styles.emailNotif}>
                    Le PDF a été (virtuellement) envoyé à <b>{fields.email}</b> !
                  </div>
                )}
              </>
            )}
            <div className={styles.successMessage}>
              Félicitations, votre souscription est enregistrée&nbsp;!<br />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ----- Composant principal -----
export default function OptionDataPlusItech() {
  // STATES
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const steps = ["Informations", "Contrat", "Paiement", "Confirmation"];
  const [code, setCode] = useState("");
  const [client, setClient] = useState<any>(null);
  const [accessGranted, setAccessGranted] = useState(false);
  const [fields, setFields] = useState({ nom: "", email: "", siren: "", secteur: "", salaries: "", adresse: "" });
  const [fieldsInitialised, setFieldsInitialised] = useState(false);
  const [formule, setFormule] = useState("");
  const [paiement, setPaiement] = useState("mensuel");
  const [contratLu, setContratLu] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [refDossier, setRefDossier] = useState("");
  const [pdfReady, setPdfReady] = useState(false);
  const [showSimuStripe, setShowSimuStripe] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [contratMenuOpen, setContratMenuOpen] = useState(false);

  // Lock scroll sur modal/info
  useEffect(() => {
    if (showModal || showInfo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showModal, showInfo]);

  useEffect(() => {
    const found = VALID_CODES.find(c => c.code.trim().toLowerCase() === code.trim().toLowerCase());
    if (found) {
      setAccessGranted(true);
      setClient(found);
    } else {
      setAccessGranted(false);
      setClient(null);
      setFields({ nom: "", email: "", siren: "", secteur: "", salaries: "", adresse: "" });
      setFieldsInitialised(false);
    }
  }, [code]);

  useEffect(() => {
    if (showModal && client && !fieldsInitialised) {
      setFields({
        nom: client.nom || "",
        email: client.email || "",
        siren: client.siren || "",
        secteur: client.secteur || "",
        salaries: client.salaries || "",
        adresse: client.adresse || ""
      });
      setFieldsInitialised(true);
    }
  }, [showModal, client, fieldsInitialised]);

  // Handlers
  const prixBase = FORMULES.find(f => f.value === formule)?.prix || 0;
  const prix = paiement === "annuel" ? Math.round(prixBase * 12 * 0.9) : prixBase;
  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  }
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); if (!formule) return; next(); }
  function buildContractHtml() {
    return `
      <h3 style="text-align:center;font-family:inherit;color:#9048FF;">
        Abonnement Data+ ITech <span style="font-size:1.22em;">🤝</span>
      </h3>
      <p><strong>Entre les soussignés :</strong></p>
      <p>iSkyce, Société individuelle, …</p>
      <p><strong>${fields.nom}</strong> … SIREN ${fields.siren}, Email : ${fields.email}</p>
      <p><strong>Formule choisie :</strong> ${FORMULES.find(f => f.value === formule)?.label}<br/>
      <strong>Périodicité :</strong> ${paiement === "annuel" ? "annuel (-10%)" : "mensuel"}<br/>
      <strong>Montant :</strong> ${prix} €/${paiement === "annuel" ? "an" : "mois"}</p>
      <hr/>
      <div style="font-size:0.92em;line-height:1.5;text-align:left;max-height:320px;overflow:auto;color:#22305a;">
        ${CONTRACT_TEXT.replace(/\n/g, "<br/>")}
      </div>
      <p>Fait à Strasbourg, le ${new Date().toLocaleDateString()}</p>
      <p><b>Pour iSkyce :</b><br/>Michel Klein</p>
      <p><b>Pour le Client :</b><br/>${fields.nom}</p>
      <p style="font-style:italic;font-size:0.85em;">Signature électronique générée automatiquement par validation en ligne.</p>`;
  }
  function handleContratAccept() { setContratLu(true); next(); }
  function handleSimuStripe() {
    setShowSimuStripe(true);
    setTimeout(() => { setShowSimuStripe(false); validerPaiement(); }, 1700);
  }
  function validerPaiement() {
    setIsSaving(true);
    const ref = generateRef(); setRefDossier(ref);
    setTimeout(() => {
      const dossier = {
        reference: ref, ...fields, abonnement: "Data+ ITech", formule: FORMULES.find(f => f.value === formule)?.label, paiement, prix,
        codeClient: code, contrat: buildContractHtml(), date: new Date().toISOString(), provenance: "abosDataPlusItech"
      };
      const data = JSON.parse(localStorage.getItem("dossiers") || "[]"); data.push(dossier); localStorage.setItem("dossiers", JSON.stringify(data));
      setIsSaving(false);
      setConfirmation(`
        <div>
          <b>Merci, ${fields.nom} !</b><br/>Votre abonnement Data+ ITech est activé.<br/>
          <b>Réf : ${ref}</b><br/><b>Montant :</b> ${prix} €/${paiement === "annuel" ? "an" : "mois"}
          <hr><b>Téléchargez votre contrat signé&nbsp;:</b>
        </div>
      `);
      setPdfReady(true);
      next();
    }, 900);
  }
  function handleDownloadPdf() {
    const container = document.createElement("div");
    container.innerHTML = buildContractHtml();
    downloadPDF(container, `Contrat-DataPlus-ITech-${fields.nom.replace(/\s/g, "_") || "Client"}-${refDossier}.pdf`);
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 4300);
  }
  function handleCloseModal() {
    setShowModal(false);
    setStep(0);
    setFieldsInitialised(false);
  }

  function DiscoverModal() {
    return (
      <div className={styles.tunnelModalOverlay}>
        <div className={styles.fullscreenModal}>
          <button className={styles.closeBtn} onClick={() => setShowInfo(false)}>×</button>
          <div className={styles.modalTitle}>Abonnement Data+ ITech</div>
          <div className={styles.modalContentItech}>
            <strong style={{color:"#9048FF"}}>Data+ : l’abonnement réservé aux industriels engagés dans la transformation 5.0</strong><br /><br />
            Cette offre avancée s’adresse exclusivement aux clients ayant déjà bénéficié d’un Diagnostic,
            d’une Feuille de route ou d’une Analyse IA.<br /><br />
            Nous créons pour vous un jumeau numérique sur-mesure, mis à jour chaque mois avec vos données réelles,
            pour un pilotage ultra-précis et une optimisation continue.<br /><br />
            Dès que votre jumeau numérique est prêt, vous recevez une invitation personnalisée
            pour activer votre abonnement Data+.<br /><br />
            <strong style={{color:"#9048FF"}}>Rejoignez les industriels qui anticipent, innovent et gardent une longueur d’avance.</strong>
            <br /><br />
            <a
              href="https://drive.google.com/file/d/1_HeICEiGO4vPFQK7gIPniHxc6s3xuMAp/view"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              style={{
                background: "linear-gradient(90deg,#e3d6fe 0%,#9048ff 94%)",
                color: "#181c2f",
                fontWeight: "700",
                padding: "0.32em 1.0em",
                borderRadius: 5,
                textDecoration: "none"
              }}
            >📄 Voir le contrat type (PDF Drive)</a>
          </div>
          <button className={styles.buttonOrange} onClick={() => setShowInfo(false)}>
            Fermer
          </button>
        </div>
      </div>
    );
  }

  // ----- RENDU principal -----
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.bulletIcon} aria-hidden="true"></span>
        Abonnement Data+ ITech
      </h2>
      <div style={{ textAlign: "center", margin: "1.1em 0" }}>
        <button className={styles.buttonOrange} onClick={() => setShowInfo(true)}>
          Découvrir Data+
        </button>
      </div>
      <p className={styles.text}>
        Data+ ITech vous ouvre l’accès à un pilotage avancé de vos données, avec rafraîchissement mensuel,
        contrat numérique transparent et conformité secteur 5.0.
      </p>
      <div className={styles.noteLeft}>
        Accès réservé : code requis (fourni après diagnostic, feuille ou analyse IA).
      </div>
      {/* Bloc central : input code, tunnel d’abonnement, popup découverte */}
      {!showModal && !showInfo && (
        <CodeInputSection
          code={code}
          setCode={setCode}
          accessGranted={accessGranted}
          setFieldsInitialised={setFieldsInitialised}
          setShowModal={setShowModal}
        />
      )}
      {showInfo && !showModal && <DiscoverModal />}
      {showModal && (
        <div className={styles.tunnelModalOverlay}>
          <div className={styles.tunnelModal}>
            <TunnelModal
              step={step}
              steps={steps}
              fields={fields}
              setFields={setFields}
              handleChange={handleChange}
              formule={formule}
              setFormule={setFormule}
              paiement={paiement}
              setPaiement={setPaiement}
              prixBase={prixBase}
              prix={prix}
              handleFormSubmit={handleFormSubmit}
              prev={prev}
              next={next}
              contratLu={contratLu}
              setContratLu={setContratLu}
              contratMenuOpen={contratMenuOpen}
              setContratMenuOpen={setContratMenuOpen}
              buildContractHtml={buildContractHtml}
              handleContratAccept={handleContratAccept}
              showSimuStripe={showSimuStripe}
              handleSimuStripe={handleSimuStripe}
              isSaving={isSaving}
              refDossier={refDossier}
              pdfReady={pdfReady}
              handleDownloadPdf={handleDownloadPdf}
              emailSent={emailSent}
              confirmation={confirmation}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
      <div className={styles.info}>
        <br />
        Réservé aux clients ayant déjà réalisé un Diagnostic, une Feuille de route ou une Analyse IA Totale – <b>accès par invitation seulement</b>.
        <br />
        <a
          href="https://drive.google.com/file/d/1_HeICEiGO4vPFQK7gIPniHxc6s3xuMAp/view"
          target="_blank"
          className={styles.link}
          rel="noopener noreferrer"
        >
          Voir le contrat type
        </a>
      </div>
    </section>
  );
}
