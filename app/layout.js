import { Playfair_Display, Inter, Martel } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import LanguagePrompt from "@/components/LanguagePrompt";
import Background3D from "@/components/Background3D";
import HeritageGuide from "@/components/HeritageGuide";
import InstallBanner from "@/components/InstallBanner";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const martel = Martel({
  subsets: ["latin", "devanagari"],
  variable: "--font-martel",
  weight: ["400", "700", "900"],
});

export const metadata = {
  metadataBase: new URL('https://chittorgarh-tourism.in'),
  title: {
    default: "Chittorgarh Tourism — Official Guide to Rajasthan's Greatest Fort",
    template: "%s | Chittorgarh Tourism"
  },
  description: "Official guide to Chittorgarh Fort, Rajasthan. Explore the UNESCO World Heritage Site, Rani Padmini's Palace, Vijay Stambh, and plan your perfect heritage trip.",
  alternates: {
    canonical: 'https://chittorgarh-tourism.in',
    languages: {
      'en': 'https://chittorgarh-tourism.in',
      'hi': 'https://chittorgarh-tourism.in?lang=hi',
      'fr': 'https://chittorgarh-tourism.in?lang=fr',
      'de': 'https://chittorgarh-tourism.in?lang=de',
      'ja': 'https://chittorgarh-tourism.in?lang=ja',
      'ru': 'https://chittorgarh-tourism.in?lang=ru',
      'es': 'https://chittorgarh-tourism.in?lang=es',
      'it': 'https://chittorgarh-tourism.in?lang=it',
    },
  },
  keywords: [
    "Chittorgarh", "Chittorgarh Fort", "Chittorgarh Tourism", "best places to visit in Chittorgarh",
    "Chittorgarh Fort travel guide", "Rajasthan Tourism", "Mewar History", "Rani Padmini",
    "Vijay Stambh", "Kirti Stambh", "Chittaurgarh"
  ],
  authors: [{ name: "Chittorgarh Tourism" }],
  creator: "Chittorgarh Tourism",
  manifest: "/manifest.json",
  icons: {
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Chittorgarh",
  },
  openGraph: {
    title: "Chittorgarh Tourism — Complete Guide to Rajasthan's Greatest Fort",
    description: "Discover the saga of bravery and sacrifice. Plan your ultimate trip to Rajasthan's mightiest citadel.",
    url: "https://chittorgarh-tourism.in",
    siteName: "Chittorgarh Tourism",
    images: [
      {
        url: "/Poster-For-Chittorgarh-Tourism.png",
        width: 1200,
        height: 630,
        alt: "Chittorgarh Fort Tourism",
        type: "image/png",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chittorgarh Tourism — Complete Guide to Rajasthan's Greatest Fort",
    description: "Plan your ultimate trip. Discover Rajasthan's mightiest citadel and best local attractions.",
    images: ["/Poster-For-Chittorgarh-Tourism.png"],
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  applicationName: "Chittorgarh Tourism",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#D4AF37",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Chittorgarh",
  },
};

export default function RootLayout({ children }) {
  const touristAttractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Chittorgarh Fort',
    description: "Rajasthan's mightiest citadel and a UNESCO World Heritage Site.",
    url: 'https://chittorgarh-tourism.in',
    image: 'https://chittorgarh-tourism.in/Poster-For-Chittorgarh-Tourism.png',
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
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    priceRange: '₹40 - ₹600'
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Chittorgarh Tourism',
    url: 'https://chittorgarh-tourism.in',
    logo: 'https://chittorgarh-tourism.in/logo.jpg',
    sameAs: [
      'https://www.facebook.com/chittorgarhtourism',
      'https://www.instagram.com/chittorgarhtourism',
      'https://twitter.com/chittorgarhtour'
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://chittorgarh-tourism.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Explore",
        "item": "https://chittorgarh-tourism.in/explore"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Plan Your Visit",
        "item": "https://chittorgarh-tourism.in/plan"
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://chittorgarh-tourism.in" />
        <link rel="preconnect" href="https://chittorgarh-tourism.in" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#D4AF37" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('beforeinstallprompt', (e) => {
                console.log('PWA: beforeinstallprompt intercepted');
                window.__pwaPrompt = e;
              });
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then((reg) => {
                    console.log('PWA: ServiceWorker registered with scope:', reg.scope);
                  }).catch((err) => {
                    console.error('PWA: ServiceWorker registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} ${martel.variable}`}>
        <Script
          id="attraction-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }}
        />
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Background3D />
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <LanguagePrompt />
            {children}
            <InstallBanner />
            <HeritageGuide />
            <Footer />
            <ScrollReveal />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
