"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { FaCertificate, FaChartLine, FaArrowRight } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";

// Utilitaire pour l'effet glitch sur un mot
function GlitchText({ children }) {
  return (
    <span className="relative inline-block glitch" aria-label={children}>
      <span aria-hidden="true" className="glitch-before">{children}</span>
      <span aria-hidden="true" className="glitch-after">{children}</span>
      {children}
      <style jsx>{`
        .glitch {
          color: #fff;
          position: relative;
          display: inline-block;
        }
        .glitch-before, .glitch-after {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0.7;
          pointer-events: none;
        }
        .glitch-before {
          color: #0ff;
          animation: glitchTop 1.2s infinite linear alternate-reverse;
          z-index: 2;
        }
        .glitch-after {
          color: #f0f;
          animation: glitchBot 1.2s infinite linear alternate-reverse;
          z-index: 1;
        }
        @keyframes glitchTop {
          0% { transform: translate(0,0);}
          20% { transform: translate(-2px,-2px);}
          40% { transform: translate(-2px,2px);}
          60% { transform: translate(2px,2px);}
          80% { transform: translate(2px,-2px);}
          100% { transform: translate(0,0);}
        }
        @keyframes glitchBot {
          0% { transform: translate(0,0);}
          20% { transform: translate(2px,2px);}
          40% { transform: translate(2px,-2px);}
          60% { transform: translate(-2px,-2px);}
          80% { transform: translate(-2px,2px);}
          100% { transform: translate(0,0);}
        }
      `}</style>
    </span>
  );
}

export default function HeaderHero() {
  const [halo, setHalo] = useState({ x: 50, y: 50 });
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Halo suit la souris
  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHalo({ x, y });
  };
  const handleMouseLeave = () => setHalo({ x: 50, y: 50 });

  return (
    <header
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen overflow-y-auto flex items-center justify-center"
      aria-label="En-tête principal"
    >
      {/* Arrière-plan gradient animé */}
      <div className="absolute inset-0 z-0 bg-gradient-animate" aria-hidden="true" />

      {/* Halo lumineux autour du logo */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          left: `calc(50% - 80px)`,
          top: `calc(15% - 40px)`,
          width: 160,
          height: 160,
          background: `radial-gradient(circle at ${halo.x}% ${halo.y}%, #00fff7bb 0%, #00fff700 80%)`,
          filter: "blur(32px)",
          transition: shouldReduceMotion ? undefined : "background-position 0.2s, left 0.2s, top 0.2s"
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-20 flex flex-col items-center justify-center w-full max-w-3xl px-4 py-4 md:py-8"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, y: 60 }}
        animate={shouldReduceMotion ? false : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.45, 1.8, 0.43, 1.03] }}
        role="main"
      >
        {/* Logo flottant */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8, y: -30 }}
          animate={shouldReduceMotion ? false : {
            opacity: 1,
            scale: [1, 1.07, 1],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 1.2,
            scale: { repeat: Infinity, repeatType: "mirror", duration: 2.5 },
            y: { repeat: Infinity, repeatType: "mirror", duration: 3 },
            ease: "easeInOut"
          }}
          className="mb-4"
          style={{ willChange: "transform, filter" }}
        >
          <Image
            src="/images/logo-iskyce-industrie-5.0.png"
            alt="Logo iSkyce industrie 5.0"
            width={110}
            height={55}
            priority
            className="block drop-shadow-lg"
            style={{ width: 110, height: "auto" }}
          />
        </motion.div>

        {/* Titre principal avec effet glitch sur "IA humaine" */}
        <h1
          className="text-white font-black drop-shadow-lg leading-tight mb-3 tracking-tight text-center"
          style={{
            fontSize: "clamp(1.3rem, 5vw, 2.5rem)",
            letterSpacing: "0.01em",
            minHeight: "2.8rem",
            fontFamily: "Geist, sans-serif",
          }}
          tabIndex={0}
        >
          Transformez votre entreprise avec <GlitchText>l’IA humaine</GlitchText>
        </h1>

        {/* Texte descriptif animé */}
        <motion.p
          className="text-white/90 font-semibold drop-shadow max-w-2xl mb-5 text-center"
          style={{
            fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
            lineHeight: 1.35,
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
        >
          +15% de performance, -20% de coûts, 40% de réduction CO₂.<br />
          Analyse IA personnalisée, résultats en 72h.
          <span className="text-cyan-200 font-bold ml-1">
            Prenez une longueur d’avance.
          </span>
        </motion.p>

        {/* Bouton CTA connecté au CalculateurIA1 */}
        <motion.button
          type="button"
          className="relative flex justify-center items-center gap-3 bg-cyan-400/90 hover:bg-cyan-500 text-blue-900 font-extrabold py-3 px-6 rounded-full shadow-xl uppercase tracking-wider transition-all duration-200 text-base md:text-lg hover:scale-105 focus:ring-2 focus:ring-cyan-200 mb-5 border-0 outline-none focus:outline-cyan-400 overflow-hidden"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={shouldReduceMotion ? false : { opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.07, boxShadow: "0 0 32px #67e8f9, 0 0 64px #22d3ee" }}
          whileTap={{ scale: 0.96 }}
          aria-label="Découvrez nos solutions IA"
          tabIndex={0}
          style={{ willChange: "transform, box-shadow" }}
          onClick={() => {
            window.dispatchEvent(new Event("ouvrirCalculateurIA1"));
          }}
        >
          <span className="relative z-10">Découvrez nos solutions IA</span>
          <motion.span
            initial={shouldReduceMotion ? false : { x: 0 }}
            animate={shouldReduceMotion ? false : { x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            aria-hidden="true"
            style={{ willChange: "transform" }}
          >
            <FaArrowRight className="ml-2 text-2xl" />
          </motion.span>
          {/* Scan light */}
          <span className="absolute inset-0 pointer-events-none">
            <span className="scan-bar" />
          </span>
        </motion.button>

        {/* Cartes flottantes, effet levitation */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full max-w-xl mx-auto mt-2">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30, scale: 0.92 }}
            animate={shouldReduceMotion ? false : {
              opacity: 1,
              y: [0, -6, 0, 6, 0],
              scale: 1,
            }}
            transition={{
              delay: 0.5,
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            className="flex items-center gap-3 bg-white/40 backdrop-blur-lg text-blue-900 font-semibold rounded-2xl px-5 py-3 shadow-2xl border border-white/30 min-w-[120px] justify-center transition-transform"
            tabIndex={0}
            style={{ willChange: "transform, box-shadow" }}
          >
            <FaCertificate className="text-cyan-400 text-2xl" />
            Audit prédictif
          </motion.div>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -30, scale: 0.92 }}
            animate={shouldReduceMotion ? false : {
              opacity: 1,
              y: [0, 6, 0, -6, 0],
              scale: 1,
            }}
            transition={{
              delay: 0.7,
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            className="flex items-center gap-3 bg-white/40 backdrop-blur-lg text-blue-900 font-semibold rounded-2xl px-5 py-3 shadow-2xl border border-white/30 min-w-[110px] justify-center transition-transform"
            tabIndex={0}
            style={{ willChange: "transform, box-shadow" }}
          >
            <FaChartLine className="text-cyan-400 text-2xl" />
            ROI x3
          </motion.div>
        </div>
      </motion.div>
      <style jsx>{`
        /* Gradient animé */
        .bg-gradient-animate {
          background: linear-gradient(120deg, #0f2027 0%, #2c5364 50%, #00fff7 100%);
          background-size: 200% 200%;
          animation: gradientMove 8s ease-in-out infinite alternate;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        /* Scan effect on button */
        .scan-bar {
          position: absolute;
          left: -60%;
          top: 0; bottom: 0;
          width: 60%;
          background: linear-gradient(90deg, transparent, #fff8, transparent);
          filter: blur(4px);
          animation: scanMove 1.8s linear infinite;
        }
        @keyframes scanMove {
          0% { left: -60%; }
          100% { left: 120%; }
        }
      `}</style>
    </header>
  );
}
