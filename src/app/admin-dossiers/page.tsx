'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import styles from './AdminDossiers.module.css';

type Dossier = {
  reference: string;
  offre: { nom: string };
  nom: string;
  email?: string;
  siren: string;
  effectif: string;
  prix?: string;
  date: string;
  sujets?: { [key: string]: string };
  observation?: string;
  provenance?: string;
};

export default function AdminDossiers() {
  const [dossiers, setDossiers] = useState<Dossier[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      router.replace('/login');
    } else {
      const saved = localStorage.getItem("dossiers");
      setDossiers(saved ? JSON.parse(saved) : []);
    }
  }, []);

  function supprimerDossier(ref: string) {
    if (!window.confirm("Supprimer ce dossier ?")) return;
    if (dossiers) {
      const updated = dossiers.filter(d => d.reference !== ref);
      setDossiers(updated);
      localStorage.setItem("dossiers", JSON.stringify(updated));
    }
  }

  function exportCSV() {
    if (!dossiers || dossiers.length === 0) return;
    const sep = ";";
    const headers = [
      "N° dossier", "Offre", "Nom", "Email", "SIREN", "Effectif", "Prix", "Date", "Sujets", "Observation", "Provenance"
    ];
    const rows = dossiers.map(d => [
      d.reference,
      d.offre?.nom || "",
      d.nom || "",
      d.email || "",
      d.siren || "",
      d.effectif || "",
      d.prix ?? "",
      d.date ? new Date(d.date).toLocaleString() : "",
      d.sujets ? Object.values(d.sujets).join(" / ") : "",
      d.observation || "",
      d.provenance || "?"
    ].map(cell => `"${(cell ?? "").toString().replace(/"/g, '""')}"`).join(sep));
    const csv = [headers.join(sep), ...rows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dossiers.csv";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  if (dossiers === null) return null;

  return (
    <main style={{ padding: 20, maxWidth: 1200, margin: "auto" }}>
      <h1>Interface de gestion des dossiers</h1>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => {
            localStorage.removeItem('isAdmin');
            router.push('/');
          }}
          className={styles.adminBtn}
          style={{ background: "#999", marginBottom: 10 }}
        >
          🔒 Déconnexion
        </button>
      </div>
      <div style={{ marginBottom: 18 }}>
        <button
          onClick={exportCSV}
          disabled={dossiers.length === 0}
          className={dossiers.length ? styles.adminBtn : `${styles.adminBtn} ${styles.Disabled}`}
        >
          Exporter CSV
        </button>
        <span style={{ color: "#888", fontSize: "0.97em", marginLeft: 10 }}>
          {dossiers.length} dossier{dossiers.length > 1 ? "s" : ""}
        </span>
      </div>

      {dossiers.length === 0 && <p>Aucun dossier enregistré.</p>}
      {dossiers.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table className={styles.tableAdmin}>
            <thead>
              <tr className={styles.theadMain}>
                <th>N° dossier</th>
                <th>Offre</th>
                <th>Nom</th>
                <th>Email</th>
                <th>SIREN</th>
                <th>Effectif</th>
                <th>Prix</th>
                <th>Date</th>
                <th>Sujets</th>
                <th>Observation</th>
                <th>Provenance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dossiers.map((dossier) => {
                const sujetsList = dossier.sujets
                  ? Object.values(dossier.sujets).filter(s => s && s.trim() !== "")
                  : [];
                return (
                  <tr key={dossier.reference} className={styles.tbodyRow}>
                    <td>{dossier.reference}</td>
                    <td>{dossier.offre?.nom || ""}</td>
                    <td>{dossier.nom || ""}</td>
                    <td>{dossier.email || "—"}</td>
                    <td>
                      <a
                        href={`https://annuaire-entreprises.data.gouv.fr/entreprise/${dossier.siren}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#0051ff", textDecoration: "underline" }}
                      >
                        {dossier.siren}
                      </a>
                    </td>
                    <td>{dossier.effectif}</td>
                    <td>{dossier.prix ?? "—"}</td>
                    <td>{dossier.date ? new Date(dossier.date).toLocaleString() : ""}</td>
                    <td>
                      {sujetsList.length > 0 ? (
                        <span className={styles.infobulleRoot} tabIndex={0}>
                          {sujetsList.length} sujet{sujetsList.length > 1 ? "s" : ""}
                          <span className={styles.infobulleBox}>
                            {sujetsList.map((r, i) => (
                              <div key={i}>{r}</div>
                            ))}
                          </span>
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                   {dossier.observation && dossier.observation.trim() !== "" ? (
                    <span className={styles.infobulleRoot} tabIndex={0}>
                    Voir
                      <span
                    className={styles.infobulleBox}
                    style={{ whiteSpace: "pre-line", maxWidth: 340 }}
                      >
                    {dossier.observation}
                    </span>
                    </span>
                     ) : (
                     "—"
                      )}
                    </td>
                    <td>
                      <span style={{
                        color: dossier.provenance === "NosOffresSobre" ? "#FF8C42"
                          : dossier.provenance === "NosOffresItech" ? "#0051ff"
                          : dossier.provenance === "CalculateurItech" ? "#00eaff"
                          : dossier.provenance === "CalculateurSobre" ? "#F76D3C"
                          : "#888",
                        fontWeight: 600
                      }}>
                        {dossier.provenance || "?"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => supprimerDossier(dossier.reference)}
                        className={`${styles.adminBtn} ${styles.Delete}`}
                        title="Supprimer ce dossier"
                      >
                        🗑️ Supprimer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
