import PlanClient from "@/components/PlanClient";

export const metadata = {
    title: "Chittorgarh Fort 1-Day & 2-Day Trip Itinerary Planner",
    description: "Plan your perfect trip to Chittorgarh Fort with our curated 1-day, 2-day, and 3-day travel itineraries. Discover what to see and when to go.",
    alternates: {
        canonical: 'https://chittorgarh-tourism.in/plan',
    },
    keywords: ["Chittorgarh Fort 1-day trip itinerary", "Chittorgarh 2-day travel plan", "how many days are enough for Chittorgarh", "Rajasthan trip planner", "Chittorgarh tour guide"],
    openGraph: {
        title: "Chittorgarh Fort 1-Day & 2-Day Trip Itinerary Planner",
        description: "Curated 1, 2, and 3-day travel itineraries for your perfect Chittorgarh trip.",
        url: "https://chittorgarh-tourism.in/plan",
        siteName: "Chittorgarh Tourism",
    },
};

export default function Plan() {
    return <PlanClient />;
}
