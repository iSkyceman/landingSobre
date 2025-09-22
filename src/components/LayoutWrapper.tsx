import React from "react";

type LayoutWrapperProps = {
  children: React.ReactNode;
  variant?: "itech" | "sobre"; // Prop variante optionnelle avec valeurs possibles
};

export default function LayoutWrapper({ children, variant = "sobre" }: LayoutWrapperProps) {
  const baseClasses = "min-h-screen flex flex-col justify-center items-center p-5 font-sans";
  
  // Classes CSS Tailwind différentes selon variante
  const variantClasses =
    variant === "itech"
      ? "bg-[#0f2027] text-white" // Fond sombre et texte blanc pour Itech
      : "bg-white text-black";    // Fond blanc et texte noir pour Sobre

  return (
    <div className={`${baseClasses} ${variantClasses}`} style={{ background: "transparent" }}>
      {children}
    </div>
  );
}
