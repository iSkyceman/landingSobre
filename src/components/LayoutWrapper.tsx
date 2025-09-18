import React from "react";

type LayoutWrapperProps = {
  children: React.ReactNode;
  variant?: "itech" | "sobre"; // Prop variante optionnelle avec valeurs possibles
};

export default function LayoutWrapper({ children, variant = "sobre" }: LayoutWrapperProps) {
  const baseClasses = "min-h-screen flex flex-col p-5 font-sans max-w-[1200px] mx-auto";
  
  // Classes CSS Tailwind différentes selon variante
  const variantClasses =
    variant === "itech"
      ? "bg-[#0f2027] text-white" // Fond sombre et texte blanc pour Itech
      : "bg-white text-black";    // Fond blanc et texte noir pour Sobre

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {children}
    </div>
  );
}
