import SanwaliyaClient from "@/components/SanwaliyaClient";

export default function SanwaliyaPage() {
    return <SanwaliyaClient />;
}

export async function generateMetadata() {
    return {
        title: "Sanwaliya ji Temple | Pilgrimage near Chittorgarh",
        description: "Visit the grand Sanwaliya ji Temple in Mandafiya village. Discover the history of the three idols found in 1840 and stay updated with Arati timings.",
    };
}
