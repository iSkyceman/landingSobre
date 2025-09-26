// services/DataService.ts
import type { Dossier } from '../app/admin-dossiers/page'; // adapte le chemin si besoin

export async function getDossiers(): Promise<Dossier[]> {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem("dossiers");
  return saved ? JSON.parse(saved) : [];
}

export async function setDossiers(dossiers: Dossier[]): Promise<void> {
  if (typeof window === 'undefined') return;
  localStorage.setItem("dossiers", JSON.stringify(dossiers));
}

export async function supprimerDossier(ref: string): Promise<Dossier[]> {
  const dossiers = await getDossiers();
  const updated = dossiers.filter(d => d.reference !== ref);
  await setDossiers(updated);
  return updated;
}

export async function supprimerSelection(refs: Set<string>): Promise<Dossier[]> {
  const dossiers = await getDossiers();
  const updated = dossiers.filter(d => !refs.has(d.reference));
  await setDossiers(updated);
  return updated;
}
