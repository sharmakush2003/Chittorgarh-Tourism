import PlanClient from "@/components/PlanClient";

export const metadata = {
    title: "Chittorgarh Fort Itinerary Planner",
    description: "Plan your trip to Chittorgarh Fort with our curated travel itineraries. Download travel guides, discover key monuments, timings, and tips.",
    alternates: {
        canonical: '/plan',
    },
    keywords: ["Chittorgarh Fort itinerary", "Chittorgarh Fort travel plan", "Chittorgarh travel guide", "Rajasthan trip planner", "Chittorgarh tour guide"],
    openGraph: {
        title: "Chittorgarh Fort Itinerary Planner",
        description: "Curated travel itineraries and guides for your Chittorgarh Fort trip.",
        url: "/plan",
        siteName: "Chittorgarh Tourism",
    },
};

export default function Plan() {
    return <PlanClient />;
}
