"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FaCertificate, FaChartLine, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence, Variants } from "framer-motion";

const titleVariants: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.04, 1],
    transition: {
      duration: 0.9,
      ease: [0.45, 1.8, 0.43, 1.03],
      repeat: Infinity,
      repeatType: "mirror" as const,
    },
  },
};

export default function HeaderHero() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLElement>(null);
  const [isVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const { top, height } = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const yPos = Math.min(
        100,
        Math.max(0, ((top + height) / (windowHeight + height)) * 100)
      );
      setPos((old) => ({ x: old.x, y: yPos }));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
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
      className="relative w-full h-screen overflow-hidden"
      style={{ cursor: "pointer" }}
    >
      {/* Image background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/usine.webp')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: `${pos.x}% ${pos.y}%`,
          height: "100%",
          width: "100%",
          transition: "background-position 0.3s ease",
          willChange: "background-position",
        }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/80 via-black/40 to-transparent pointer-events-none" />

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0)" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(4px)" }}
            transition={{ duration: 0.8 }}
            className="relative z-20 flex flex-col items-start w-full max-w-7xl"
            style={{
              marginLeft: "max(3vw, 2rem)",
              marginRight: "max(3vw, 2rem)",
              paddingTop: "6rem",
              paddingBottom: "2rem",
            }}
          >
            {/* Logo */}
            <motion.div
              initial={false}
              whileHover={{ rotate: 2, filter: "brightness(1.15)" }}
              className="mb-6"
            >
              <Image
                src="/images/logo-iskyce-industrie-5.0.png"
                alt="Logo iSkyce industrie 5.0"
                width={140}
                height={72}
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </motion.div>

            {/* Container anti-débordement */}
            <div
              className="w-full max-w-full"
              style={{
                boxSizing: "border-box",
                overflow: "hidden",
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <motion.h1
                className="font-black drop-shadow-lg mb-4 leading-tight tracking-tight"
                style={{
                  fontSize: "clamp(1.6rem, 5vw, 3.3rem)",
                  lineHeight: 1.15,
                  color: "white",
                  wordBreak: "break-word",
                  maxWidth: "100%",
                }}
                variants={titleVariants}
                initial="initial"
                animate="animate"
              >
                Transformez votre entreprise
                <span className="block text-white">
                  avec l’IA humaine
                </span>
              </motion.h1>

              <motion.p
                className="font-semibold drop-shadow max-w-3xl mb-6"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                  lineHeight: 1.35,
                  color: "white",
                  wordBreak: "break-word",
                }}
                initial={false}
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
            </div>

            {/* CTA */}
            <motion.button
              type="button"
              className="flex justify-center items-center gap-3 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-extrabold py-3 px-7 rounded-full shadow-2xl uppercase tracking-wider animate-btn-pop transition-all duration-200 text-base sm:text-lg md:text-xl hover:scale-105 focus:ring-2 focus:ring-orange-200 mb-12 max-w-md"
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ scale: 1.07, boxShadow: "0 8px 32px rgba(251,191,36,0.25)" }}
              onClick={() => window.dispatchEvent(new Event("ouvrirCalculateurIA"))}
            >
              Découvrez nos solutions IA
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              >
                <FaArrowRight className="ml-2 text-2xl" />
              </motion.span>
            </motion.button>

            <style jsx>{`
              .animate-btn-pop {
                animation: btn-pop 0.65s cubic-bezier(.45,1.8,.43,1.03) both;
              }
              @keyframes btn-pop {
                0% { transform: scale(0.8); }
                70% { transform: scale(1.1); }
                100% { transform: scale(1); }
              }

              /* Corrections stricte mobile */
              @media (max-width: 600px) {
                .max-w-full,
                .w-full {
                  max-width: 100vw !important;
                  padding-left: 5vw !important;
                  padding-right: 5vw !important;
                }
                h1 {
                  font-size: clamp(1.4rem, 6vw, 2.2rem) !important;
                }
                p {
                  font-size: clamp(0.9rem, 4.5vw, 1.2rem) !important;
                  margin-bottom: 1.5rem !important;
                }
                header {
                  padding-top: 2rem !important;
                  padding-bottom: 2rem !important;
                }
              }

              @media (orientation: landscape) and (max-width: 900px) {
                .max-w-full,
                .w-full {
                  max-width: 100vw !important;
                  padding-left: 4vw !important;
                  padding-right: 4vw !important;
                }
                h1, p {
                  font-size: 3vw !important;
                }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
