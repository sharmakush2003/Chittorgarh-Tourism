import StaysClient from "@/components/StaysClient";

export const metadata = {
    title: "Best Hotels & Premium Stays near Chittorgarh Fort",
    description: "Looking for where to stay? Find the best hotels, heritage properties, and premium stays near Chittorgarh Fort. Browse options from Kesarbagh Palace to Hotel Pride of Chittor.",
    keywords: ["best hotels near Chittorgarh Fort", "where to stay in Chittorgarh", "premium heritage stays Rajasthan", "Kesarbagh Palace", "accommodation near Chittorgarh Fort"],
    openGraph: {
        title: "Best Hotels & Premium Stays near Chittorgarh Fort",
        description: "Premium hotels and heritage stays near Chittorgarh Fort, Rajasthan.",
        url: "https://chittorgarh-tourism-five.vercel.app/stays",
        siteName: "Chittorgarh Tourism",
    },
};

export default function Stays() {
    return <StaysClient />;
}
