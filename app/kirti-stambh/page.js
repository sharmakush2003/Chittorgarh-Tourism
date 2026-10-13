import KirtiStambhClient from "@/components/KirtiStambhClient";

export const metadata = {
    title: "Kirti Stambha (Tower of Fame) - Chittorgarh Fort",
    description: "Discover Kirti Stambh, the 12th-century 'Tower of Fame' dedicated to the first Jain Tirthankara, Adinath. Explore its intricate carvings and architectural beauty.",
    alternates: {
        canonical: '/kirti-stambh',
    },
    keywords: ["Kirti Stambh", "Tower of Fame", "Chittorgarh Fort", "Jain Tower Chittorgarh", "Adinath Tirthankara", "Rajasthan Tourism"],
    openGraph: {
        title: "Kirti Stambha (Tower of Fame) - Chittorgarh Fort",
        description: "Explore the magnificent Kirti Stambh, a masterpiece of medieval Jain architecture in Chittorgarh Fort.",
        url: "/kirti-stambh",
        siteName: "Chittorgarh Tourism",
        images: [
            {
                url: "/kirti_stambha.jpg",
                width: 1200,
                height: 630,
                alt: "Kirti Stambh, Chittorgarh Fort",
            },
        ],
    },
};

export default function KirtiStambh() {
    return <KirtiStambhClient />;
}
