import ChroniclesClient from "@/components/ChroniclesClient";

export const metadata = {
    title: "Real History & Story of Chittorgarh Fort: Rani Padmini & Pratap",
    description: "What is the real story of Chittorgarh? Discover the legendary history and sacrifices of Rani Padmini, Maharana Pratap, Panna Dhai, and Meera Bai.",
    alternates: {
        canonical: 'https://chittorgarh-tourism-five.vercel.app/chronicles',
    },
    keywords: ["real story of Chittorgarh Fort", "Rani Padmini history", "Maharana Pratap Chittorgarh", "Panna Dhai sacrifice", "Meera Bai", "Mewar Chronicles"],
    openGraph: {
        title: "Real History & Story of Chittorgarh Fort: Rani Padmini & Pratap",
        description: "Experience the legendary history and true stories of Mewar's greatest heroes.",
        url: "https://chittorgarh-tourism-five.vercel.app/chronicles",
        siteName: "Chittorgarh Tourism",
    },
};

export default function Chronicles() {
    return <ChroniclesClient />;
}
