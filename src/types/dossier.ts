// src/types/dossier.ts

export interface Dossier {
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
  contrat?: string;
}

