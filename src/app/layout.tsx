import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://essai26-images.vercel.app/"),
  title: {
    default: "iSkyce Industrie 5.0 – IA & Data pour l’industrie",
    template: "%s | iSkyce Industrie 5.0",
  },
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
  twitter: {
    card: "summary_large_image",
    title: "iSkyce Industrie 5.0",
    description: "Landing page IA, data, automatisation et offres sur-mesure.",
    images: ["/images/logo-iskyce-industrie-5.0.png"],
    site: "@iskyce", // Mets ici ton handle Twitter/X si tu en as un
  },
  icons: {
    icon: [
      { url: "/favicon.ico", rel: "icon", type: "image/x-icon" },
      { url: "/images/icon-light.png", media: "(prefers-color-scheme: light)", rel: "icon", type: "image/png" },
      { url: "/images/icon-dark.png", media: "(prefers-color-scheme: dark)", rel: "icon", type: "image/png" },
      // Optionnel, pour le support SVG moderne :
      // { url: "/images/icon.svg", rel: "icon", type: "image/svg+xml" },
    ],
    apple: "/images/icon-light.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

