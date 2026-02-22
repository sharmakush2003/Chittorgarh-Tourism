import StaysClient from "@/components/StaysClient";

export const metadata = {
    title: "Hotels & Stays in Chittorgarh — Best Accommodation",
    description: "Find the best hotels and stays near Chittorgarh Fort. Browse premium heritage accommodation options from Kesarbagh Palace to Hotel Pride of Chittor.",
    keywords: ["Chittorgarh hotels", "Chittorgarh stays", "heritage hotels Rajasthan", "Kesarbagh Palace", "accommodation near Chittorgarh Fort"],
    openGraph: {
        title: "Hotels & Stays in Chittorgarh — Best Accommodation",
        description: "Premium hotels and heritage stays near Chittorgarh Fort, Rajasthan.",
        url: "https://chittorgarh-tourism-five.vercel.app/stays",
        siteName: "Chittorgarh Tourism",
    },
};

export default function Stays() {
    return <StaysClient />;
}
