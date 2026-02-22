import { Cormorant_Garamond, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import LanguagePrompt from "@/components/LanguagePrompt";
import Background3D from "@/components/Background3D";
import VisitorGate from "@/components/VisitorGate";
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
  metadataBase: new URL('https://chittorgarh-tourism-five.vercel.app'),
  title: {
    default: "Chittorgarh Tourism — The Saga of Bravery & Sacrifice",
    template: "%s | Chittorgarh Tourism"
  },
  description: "Discover Chittorgarh Fort — Rajasthan's mightiest citadel. Plan your journey, explore heritage sites, and immerse in the rich history of Mewar.",
  keywords: ["Chittorgarh Fort", "Rajasthan Tourism", "Mewar History", "Rani Padmini", "Maharana Pratap", "Indian Heritage Sites"],
  authors: [{ name: "Chittorgarh Tourism Authority" }],
  creator: "Chittorgarh Tourism",
  canonical: "https://chittorgarh-tourism-five.vercel.app",
  manifest: "/manifest.json",
  themeColor: "#D4AF37",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Chittorgarh",
  },
  openGraph: {
    title: "Chittorgarh Tourism — The Saga of Bravery & Sacrifice",
    description: "Discover Rajasthan's mightiest citadel.",
    url: "https://chittorgarh-tourism-five.vercel.app",
    siteName: "Chittorgarh Tourism",
    images: [
      {
        url: "/Pride.webp", // Will fall back to whatever is deployed or locally available as Pride.webp/Pride.jpg
        width: 1200,
        height: 630,
        alt: "Chittorgarh Fort Tourism",
        type: "image/webp",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chittorgarh Tourism — The Saga of Bravery & Sacrifice",
    description: "Discover Rajasthan's mightiest citadel.",
    images: ["/Pride.webp"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Chittorgarh Fort',
    description: "Rajasthan's mightiest citadel and a UNESCO World Heritage Site.",
    url: 'https://chittorgarh-tourism-five.vercel.app',
    image: 'https://chittorgarh-tourism-five.vercel.app/Pride.webp',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chittorgarh',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '24.8887',
      longitude: '74.6269'
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${jost.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Background3D />
        <LanguageProvider>
          <VisitorGate />
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
