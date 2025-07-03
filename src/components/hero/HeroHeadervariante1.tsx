"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { FaCertificate, FaChartLine, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HeaderHero() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setPos({ x, y });
  };

  const handleMouseLeave = () => setPos({ x: 50, y: 50 });

  return (
    <header
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen overflow-y-auto"
    >
      {/* Arrière-plan parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/usine.webp')",
          backgroundSize: "cover",
          backgroundPosition: `${pos.x}% ${pos.y}%`,
          backgroundRepeat: "no-repeat",
          transition: "background-position 0.2s cubic-bezier(.45,1.8,.43,1.03)",
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Contenu animé */}
      <div
        className="relative z-10 flex flex-col items-start w-full max-w-7xl px-4 sm:px-12 xl:px-24 py-5"
        style={{ marginLeft: "max(3vw, 2rem)" }}
      >
        {/* Logo animé */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.45, 1.8, 0.43, 1.03] }}
          whileHover={{ rotate: 2, filter: "brightness(1.15)" }}
          className="mb-5"
        >
          <Image
            src="/images/logo-iskyce-industrie-5.0.png"
            alt="Logo iSkyce industrie 5.0"
            width={112}
            height={58}
            priority
            className="block drop-shadow-md"
            style={{ width: 112, height: "auto" }}
          />
        </motion.div>

        {/* Titre principal animé */}
        <motion.h1
          className="text-white font-black drop-shadow-lg leading-tight mb-4 tracking-tight text-left"
          style={{
            fontSize: "clamp(1.5rem, 5vw, 3.2rem)",
            lineHeight: 1.15,
          }}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.04, 1],
            transition: {
              duration: 0.9,
              ease: [0.45, 1.8, 0.43, 1.03],
              scale: { repeat: Infinity, repeatType: "mirror", duration: 2 }
            }
          }}
        >
          Transformez votre entreprise
          <span className="block text-white">avec l’IA humaine</span>
        </motion.h1>

        {/* Texte descriptif animé */}
        <motion.p
          className="text-white font-semibold drop-shadow max-w-3xl mb-5 text-left"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            lineHeight: 1.35,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
        >
          +15% de performance, -20% de coûts, 40% de réduction CO₂.
          <br />
          Analyse IA personnalisée, résultats en 72h.
          <span className="text-orange-300 font-bold ml-1">
            Prenez une longueur d’avance.
          </span>
        </motion.p>

        {/* Bouton animé */}
        <motion.a
          href="#offres"
          className={`
            flex justify-center items-center gap-3
            bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400
            hover:from-orange-600 hover:to-yellow-500
            text-white font-extrabold py-3 px-7 rounded-full shadow-2xl
            uppercase tracking-wider animate-btn-pop transition-all duration-200
            text-base sm:text-lg md:text-xl
            hover:scale-105 focus:ring-2 focus:ring-orange-200
            mb-5 w-full max-w-md border-0
          `}
          style={{
            background: "linear-gradient(90deg, #f97316 0%, #fbbf24 100%)",
            color: "#fff",
            textDecoration: "none",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          whileHover={{ scale: 1.07, boxShadow: "0 8px 32px rgba(251,191,36,0.25)" }}
        >
          Découvrez nos solutions IA
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            <FaArrowRight className="ml-2 text-2xl" />
          </motion.span>
        </motion.a>

        {/* Cartes animées */}
        <div
          className="flex flex-col sm:flex-row items-start gap-5 sm:gap-8 w-full max-w-2xl"
          style={{ marginTop: "2rem" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.06, boxShadow: "0 8px 32px rgba(251,191,36,0.18)" }}
            className="flex items-center gap-3 bg-white/90 text-blue-900 font-semibold rounded-2xl px-6 py-3 shadow-2xl border border-gray-200 min-w-[140px] sm:min-w-[172px] justify-center transition-transform"
          >
            <motion.span
              initial={{ rotate: -20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
            >
              <FaCertificate className="text-orange-400 text-2xl" />
            </motion.span>
            Audit prédictif
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.06, boxShadow: "0 8px 32px rgba(34,197,94,0.18)" }}
            className="flex items-center gap-3 bg-white/90 text-blue-900 font-semibold rounded-2xl px-6 py-3 shadow-2xl border border-gray-200 min-w-[110px] sm:min-w-[135px] justify-center transition-transform"
          >
            <motion.span
              initial={{ rotate: 20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
            >
              <FaChartLine className="text-green-500 text-2xl" />
            </motion.span>
            ROI x3
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        .animate-btn-pop {
          animation: btn-pop 0.65s cubic-bezier(.45,1.8,.43,1.03) both;
        }
        @keyframes btn-pop {
          0% {
            transform: scale(0.8);
          }
          70% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </header>
  );
}
 
