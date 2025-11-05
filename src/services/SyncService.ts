// src/services/SyncService.ts - NOUVEAU FICHIER
import type { Dossier } from '../types/dossier';

// URL de ton API principale (à adapter selon ton environnement)
const API_BASE_URL = 'http://localhost:3001/api'; // ou l'URL de ton backend

export interface ClientData {
  username: string;
  email: string;
  siren: string;
  effectif: string;
  prix?: string;
  offre: string;
  dateSouscription: string;
  provenance: string;
  observation?: string;
  contratDataPlus?: boolean;
  sujetsPrioritaires?: string[];
  dossierNumber: string;
}

// Fonction pour transformer un Dossier en ClientData pour l'API
function transformDossierToClient(dossier: Dossier): ClientData {
  return {
    username: dossier.nom || 'Non renseigné',
    email: dossier.email || '',
    siren: dossier.siren,
    effectif: dossier.effectif,
    prix: dossier.prix,
    offre: dossier.offre.nom,
    dateSouscription: dossier.date,
    provenance: dossier.provenance || 'Landing Page',
    observation: dossier.observation,
    contratDataPlus: false, // À déterminer selon ta logique
    sujetsPrioritaires: dossier.sujets ? Object.values(dossier.sujets) : [],
    dossierNumber: dossier.reference
  };
}

// Fonction pour envoyer les données vers l'API principale
export async function syncDossierToMainApp(dossier: Dossier): Promise<boolean> {
  try {
    const clientData = transformDossierToClient(dossier);
    
    const response = await fetch(`${API_BASE_URL}/landing/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData)
    });

    if (response.ok) {
      console.log('✅ Dossier synchronisé avec succès:', dossier.reference);
      return true;
    } else {
      console.error('❌ Erreur synchronisation:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur réseau lors de la synchronisation:', error);
    return false;
  }
}

// Fonction pour synchroniser tous les dossiers existants
export async function syncAllDossiers(): Promise<void> {
  try {
    // Récupère tous les dossiers du localStorage
    const saved = localStorage.getItem("dossiers");
    if (!saved) return;

    const dossiers: Dossier[] = JSON.parse(saved);
    let successCount = 0;

    for (const dossier of dossiers) {
      const success = await syncDossierToMainApp(dossier);
      if (success) successCount++;
      
      // Petite pause pour éviter de surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`✅ Synchronisation terminée: ${successCount}/${dossiers.length} dossiers synchronisés`);
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation globale:', error);
  }
}

// Hook pour la synchronisation automatique
export function useAutoSync() {
  // Cette fonction peut être appelée au chargement de l'admin
  // pour synchroniser automatiquement les nouveaux dossiers
  return {
    syncAllDossiers,
    syncDossierToMainApp
  };
} 