import HeroHeaderVariante1 from "@/components/hero/HeroHeaderVariante1";
import HeroHeaderVariante2 from "@/components/hero/HeroHeaderVariante2";
import CalculateurIA from "@/components/calculateur/CalculateurIA";
import CalculateurIA1 from "@/components/calculateur/CalculateurIA1";
import "@/styles/calculateur-ia.css";
import "../styles/calculateur-ia1.css";
import NosOffresSobre from "@/components/NosOffres/NosOffresSobre";
import NosOffresItech from "@/components/NosOffres/NosOffresItech";
import SuccesFee from "@/components/SuccesFee/SuccesFee";
import SuccesFee1 from "@/components/SuccesFee/SuccesFee1";
import OptionDataPlusSobre from "@/components/OptionDataPlusSobre";
import OptionDataPlusItech from "@/components/OptionDataPlusItech";
import BeneficesSobre from "@/components/Benefices/BeneficesSobre";
import BeneficesItech from "@/components/Benefices/BeneficesItech";
import RisquesSobre from "@/components/RisquesSection/RisquesSobre";
import RisquesItech from "@/components/RisquesSection/RisquesItech";
import ConfidentialiteSobre from "@/components/ConfidentialiteSection/ConfidentialiteSobre";
import ConfidentialiteItech from "@/components/ConfidentialiteSection/ConfidentialiteItech";
import CtaFinalSobre from "@/components/CtaFinalSection/CtaFinalSobre";
import CtaFinalItech from "@/components/CtaFinalSection/CtaFinalItech";
import FooterSobre from "@/components/Footer/FooterSobre";
import FooterItech from "@/components/Footer/FooterItech";

const VARIANTE = 1; // 2 = i-tech, 1 = sobre 

export const metadata = {
  title: "iSkyce Industrie 5.0 – IA & Data pour l’industrie",
  description:
    "Boostez votre performance industrielle grâce à l’IA humaine : +15% de rendement, -20% de coûts, 40% de réduction CO₂. Diagnostic IA personnalisé, résultats en 72h.",
  openGraph: {
    title: "iSkyce Industrie 5.0",
    description: "Landing page IA, data, automatisation et offres sur-mesure.",
    url: "https://essai26-images.vercel.app/",
    images: [
      {
        url: "/images/logo-iskyce-industrie-5.0.png",
        width: 800,
        height: 600,
        alt: "Logo iSkyce Industrie 5.0",
      },
    ],
    siteName: "iSkyce Industrie 5.0",
  },
};

export default function Home() {
  // Astuce clé dynamique pour "forcer le reset" et l’état neuf à chaque navigation 
  const pathname = typeof window !== "undefined" ? window.location.pathname : "sobre";

  return (
    <main className={VARIANTE === 2 ? "min-h-screen bg-[#171b2a]" : "min-h-screen bg-white"}>
      {/* Header */}
      {VARIANTE === 1 ? <HeroHeaderVariante1 /> : <HeroHeaderVariante2 />}
      {/* Calculateur */}
      {VARIANTE === 1 ? <CalculateurIA /> : <CalculateurIA1 />}
      {/* Bloc Nos Offres */}
      {VARIANTE === 1 && <NosOffresSobre />}
      {VARIANTE === 2 && <NosOffresItech />}
      {/* Bloc Succès Fee */}
      {VARIANTE === 1 && <SuccesFee />}
      {VARIANTE === 2 && <SuccesFee1 />}
      {/* Bloc Data+ */}
      {VARIANTE === 1 && (
        <OptionDataPlusSobre key={pathname} />
      )}
      {VARIANTE === 2 && <OptionDataPlusItech />}
      {/* Bloc Bénéfices */}
      {VARIANTE === 1 && <BeneficesSobre />}
      {VARIANTE === 2 && <BeneficesItech />}
      {/* Bloc Risques */}
      {VARIANTE === 1 && <RisquesSobre />}
      {VARIANTE === 2 && <RisquesItech />}
      {/* Bloc Confidentialité */}
      {VARIANTE === 1 && <ConfidentialiteSobre />}
      {VARIANTE === 2 && <ConfidentialiteItech />}
      {/* Bloc CTA Final */}
      {VARIANTE === 1 && <CtaFinalSobre />}
      {VARIANTE === 2 && <CtaFinalItech />}
      {/* Footer premium dynamique */}
      {VARIANTE === 1 && <FooterSobre />}
      {VARIANTE === 2 && <FooterItech />}
    </main>
  );
}
