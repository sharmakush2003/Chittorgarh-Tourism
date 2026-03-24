import PanchGauravClient from "@/components/PanchGauravClient";

export const metadata = {
    title: "Panch Gaurav Program | Rajasthan District-Level Development",
    description: "Learn about the Panch Gaurav Program in Rajasthan - a district-level initiative to promote local resources, heritage, sports, and economy through five core pillars.",
    alternates: {
        canonical: '/panch-gaurav',
    },
    keywords: ["Panch Gaurav Rajasthan", "Bhajanlal Sharma government initiative", "One District One Product ODOP", "Rajasthan district development", "Mewar heritage promotion"],
    openGraph: {
        title: "Panch Gaurav Program | Integrated District-Level Initiative",
        description: "Promoting Rajasthan's local resources, crops, sports, and heritage through the Panch Gaurav initiative.",
        url: "/panch-gaurav",
        siteName: "Chittorgarh Tourism",
    },
};

export default function PanchGaurav() {
    return <PanchGauravClient />;
}
