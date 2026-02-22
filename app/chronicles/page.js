import ChroniclesClient from "@/components/ChroniclesClient";

export const metadata = {
    title: "The Mewar Chronicles — Legends of Chittorgarh",
    description: "Discover the legendary stories of Rani Padmini, Maharana Pratap, Panna Dhai, and Meera Bai. The Mewar Chronicles — a cinematic journey through Chittorgarh's heroic past.",
    keywords: ["Rani Padmini", "Maharana Pratap", "Panna Dhai", "Meera Bai", "Mewar Chronicles", "Chittorgarh history"],
    openGraph: {
        title: "The Mewar Chronicles — Legends of Chittorgarh",
        description: "Experience the legendary stories of Mewar's greatest heroes and heroines.",
        url: "https://chittorgarh-tourism-five.vercel.app/chronicles",
        siteName: "Chittorgarh Tourism",
    },
};

export default function Chronicles() {
    return <ChroniclesClient />;
}
