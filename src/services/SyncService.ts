// src/services/SyncService.ts - VERSION CORRIGÉE
import type { Dossier } from '../types/dossier';

// URL de ton API principale - CORRIGÉE
const API_BASE_URL = 'http://localhost:5000/api'; // Ton backend sur port 5000

export interface ClientData {
  dossierNumber: string;
  offre: string;
  username: string;
  email: string;
  siren: string;
  effectif: string;
  prix?: string;
  date: string;
  sujets: string[];
  observation?: string;
  contrat: boolean;
  provenance: string;
}

// Fonction pour transformer un Dossier en ClientData pour l'API
function transformDossierToClient(dossier: Dossier): ClientData {
  return {
    dossierNumber: dossier.reference,
    offre: dossier.offre.nom,
    username: dossier.nom || 'Non renseigné',
    email: dossier.email || '',
    siren: dossier.siren || '',
    effectif: dossier.effectif || '',
    prix: dossier.prix,
    date: dossier.date,
    sujets: dossier.sujets ? Object.values(dossier.sujets).filter(s => s) : [],
    observation: dossier.observation,
    contrat: false, // À adapter selon ta logique
    provenance: dossier.provenance || 'Landing Page'
  };
}

// Fonction pour envoyer les données vers l'API principale - CORRIGÉE
export async function syncDossierToMainApp(dossier: Dossier): Promise<boolean> {
  try {
    const clientData = transformDossierToClient(dossier);
    
    console.log('🔄 Envoi vers API:', clientData);
    
    const response = await fetch(`${API_BASE_URL}/landing/sync-client`, { // CORRIGÉ: /sync-client
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Dossier synchronisé avec succès:', dossier.reference, result);
      return true;
    } else {
      const errorText = await response.text();
      console.error('❌ Erreur synchronisation:', errorText);
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
    if (!saved) {
      console.log('ℹ️ Aucun dossier à synchroniser');
      return;
    }

    const dossiers: Dossier[] = JSON.parse(saved);
    let successCount = 0;

    console.log(`🔄 Début synchronisation de ${dossiers.length} dossiers...`);

    for (const dossier of dossiers) {
      const success = await syncDossierToMainApp(dossier);
      if (success) successCount++;
      
      // Petite pause pour éviter de surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ Synchronisation terminée: ${successCount}/${dossiers.length} dossiers synchronisés`);
    
    // Notification pour l'utilisateur
    if (successCount > 0) {
      alert(`✅ ${successCount} dossier(s) synchronisé(s) avec succès vers l'application principale!`);
    } else {
      alert('❌ Aucun dossier n\'a pu être synchronisé. Vérifiez la console.');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation globale:', error);
    alert('❌ Erreur lors de la synchronisation. Vérifiez la console.');
  }
}

// Hook pour la synchronisation automatique
export function useAutoSync() {
  return {
    syncAllDossiers,
    syncDossierToMainApp
  };
} 