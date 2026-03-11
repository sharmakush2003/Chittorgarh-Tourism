import { Cormorant_Garamond, Jost } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import LanguagePrompt from "@/components/LanguagePrompt";
import Background3D from "@/components/Background3D";
import VisitorGate from "@/components/VisitorGate";
import HeritageGuide from "@/components/HeritageGuide";
import Newsletter from "@/components/Newsletter";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import AnalyticsTracker from "@/components/AnalyticsTracker";
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
    default: "Chittorgarh Tourism — Official Guide to Rajasthan's Greatest Fort",
    template: "%s | Chittorgarh Tourism"
  },
  description: "Official guide to Chittorgarh Fort, Rajasthan. Explore the UNESCO World Heritage Site, Rani Padmini's Palace, Vijay Stambh, and plan your perfect heritage trip.",
  alternates: {
    canonical: 'https://chittorgarh-tourism-five.vercel.app',
    languages: {
      'en': 'https://chittorgarh-tourism-five.vercel.app',
      'hi': 'https://chittorgarh-tourism-five.vercel.app?lang=hi',
      'fr': 'https://chittorgarh-tourism-five.vercel.app?lang=fr',
      'de': 'https://chittorgarh-tourism-five.vercel.app?lang=de',
      'ja': 'https://chittorgarh-tourism-five.vercel.app?lang=ja',
      'ru': 'https://chittorgarh-tourism-five.vercel.app?lang=ru',
      'es': 'https://chittorgarh-tourism-five.vercel.app?lang=es',
      'it': 'https://chittorgarh-tourism-five.vercel.app?lang=it',
    },
  },
  keywords: [
    "Chittorgarh",
    "Chittorgarh Fort",
    "Chittorgarh Tourism",
    "best places to visit in Chittorgarh",
    "Chittorgarh Fort travel guide",
    "Rajasthan Tourism",
    "Mewar History",
    "Rani Padmini",
    "Vijay Stambh",
    "Kirti Stambh",
    "Chittaurgarh"
  ],
  authors: [{ name: "Chittorgarh Tourism" }],
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
    title: "Chittorgarh Tourism — Complete Guide to Rajasthan's Greatest Fort",
    description: "Discover the saga of bravery and sacrifice. Plan your ultimate trip to Rajasthan's mightiest citadel.",
    url: "https://chittorgarh-tourism-five.vercel.app",
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
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  const touristAttractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Chittorgarh Fort',
    description: "Rajasthan's mightiest citadel and a UNESCO World Heritage Site.",
    url: 'https://chittorgarh-tourism-five.vercel.app',
    image: 'https://chittorgarh-tourism-five.vercel.app/Poster-For-Chittorgarh-Tourism.png',
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
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
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
    url: 'https://chittorgarh-tourism-five.vercel.app',
    logo: 'https://chittorgarh-tourism-five.vercel.app/logo.png',
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
        "item": "https://chittorgarh-tourism-five.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Explore",
        "item": "https://chittorgarh-tourism-five.vercel.app/explore"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Plan Your Visit",
        "item": "https://chittorgarh-tourism-five.vercel.app/plan"
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-2280719839889797" />
        <Script 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2280719839889797"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${cormorant.variable} ${jost.variable}`}>
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
          <AnalyticsTracker />
          <LanguageProvider>
            <VisitorGate />
            <Navbar />
            <LanguagePrompt />
            {children}
            <HeritageGuide />
            <Newsletter />
            <Footer />
            <ScrollReveal />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
