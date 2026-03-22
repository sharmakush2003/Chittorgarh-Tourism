import NagariClient from "@/components/NagariClient";

export const metadata = {
    title: "Ancient Nagari (Majhimika) - Archaeological Wonders near Chittorgarh",
    description: "Explore Nagari, an ancient 443 BC town known as Majhimika. Discover the Sibi tribe heritage, ancient Shiva Temple, and archaeological excavations near the Berach river.",
    alternates: {
        canonical: 'https://chittorgarh-tourism.in/nagari',
    },
    keywords: ["Nagari Chittorgarh", "Majhimika", "Madhyamika", "Ancient India Archaeology", "Sibi Tribe", "Shiva Temple Nagari", "Chittorgarh Tourism"],
    openGraph: {
        title: "Ancient Nagari (Majhimika) - Archaeological Wonders near Chittorgarh",
        description: "A journey back to 443 BC. Explore the historic ruins and archaeological significance of Nagari.",
        url: "https://chittorgarh-tourism.in/nagari",
        siteName: "Chittorgarh Tourism",
        images: [
            {
                url: "/nagari_hero.png",
                width: 1200,
                height: 630,
                alt: "Ancient Ruins of Nagari near Chittorgarh",
            },
        ],
    },
};

export default function Nagari() {
    return <NagariClient />;
}
