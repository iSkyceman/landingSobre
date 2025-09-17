import React from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-5 font-sans"
      style={{ background: "transparent" }}
    >
      {children}
    </div>
  );
}
