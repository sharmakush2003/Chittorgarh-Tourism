import ExploreClient from "@/components/ExploreClient";

export const metadata = {
    title: "Explore Chittorgarh — Attractions & Heritage Sites",
    description: "Explore Chittorgarh Fort attractions: Vijay Stambha, Rani Padmini's Palace, Gaumukh Reservoir, Meera Temple, Kirti Stambha, and more heritage sites in Rajasthan.",
    keywords: ["Chittorgarh attractions", "Vijay Stambha", "Rani Padmini Palace", "Rajasthan heritage sites", "Meera Temple", "Kirti Stambha"],
    openGraph: {
        title: "Explore Chittorgarh — Attractions & Heritage Sites",
        description: "Explore Rajasthan's finest heritage attractions in and around Chittorgarh Fort.",
        url: "https://chittorgarh-tourism-five.vercel.app/explore",
        siteName: "Chittorgarh Tourism",
    },
};

export default function Explore() {
    return <ExploreClient />;
}
