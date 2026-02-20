import { Cormorant_Garamond, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import LanguagePrompt from "@/components/LanguagePrompt";
import Background3D from "@/components/Background3D";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Chittorgarh Tourism — The Saga of Bravery & Sacrifice",
  description: "Discover Chittorgarh Fort — Rajasthan's mightiest citadel. Plan your journey, explore heritage sites, and connect with master artisans.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable}`}>
        <Background3D />
        <LanguageProvider>
          <Navbar />
          <LanguagePrompt />
          {children}
          <Footer />
          <ScrollReveal />
        </LanguageProvider>
      </body>
    </html>
  );
}
