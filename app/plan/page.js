import PlanClient from "@/components/PlanClient";

export const metadata = {
    title: "Plan Your Visit — Chittorgarh Itinerary & Travel Guide",
    description: "Plan your perfect trip to Chittorgarh with our curated 1-day, 2-day, and 3-day itineraries. Get personalized travel plans emailed directly to you.",
    keywords: ["Chittorgarh itinerary", "Chittorgarh travel plan", "Rajasthan trip planner", "Chittorgarh 1 day tour", "Chittorgarh 2 day tour"],
    openGraph: {
        title: "Plan Your Visit — Chittorgarh Itinerary & Travel Guide",
        description: "Curated 1, 2, and 3-day itineraries for your perfect Chittorgarh trip.",
        url: "https://chittorgarh-tourism-five.vercel.app/plan",
        siteName: "Chittorgarh Tourism",
    },
};

export default function Plan() {
    return <PlanClient />;
}
