import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlowingOrbs from "./components/GlowingOrbs";
import AnimatedBubbles from "./components/AnimatedBubbles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SOKPA Edo Yawo - Portfolio",
  description: "Portfolio de SOKPA Edo Yawo, étudiant en deuxième année en Systèmes d'information / Ingénierie cybersécurité.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className}`}>
        <GlowingOrbs />
        <AnimatedBubbles />
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
