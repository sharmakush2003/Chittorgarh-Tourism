import SitamataClient from "@/components/SitamataClient";

export const metadata = {
    title: "Sitamata Wildlife Sanctuary - Teak Forests & Flying Squirrels",
    description: "Explore the lush Sitamata Wildlife Sanctuary, home to unique teak forests, the rare flying squirrel, and diverse wildlife across the Aravali and Vindhyachal ranges.",
    alternates: {
        canonical: '/sitamata',
    },
    keywords: ["Sitamata Wildlife Sanctuary", "Flying Squirrel Rajasthan", "Teak Forests India", "Chittorgarh Wildlife", "Nature Trails Rajasthan", "Aravalli Hills Sanctuary"],
    openGraph: {
        title: "Sitamata Wildlife Sanctuary - Teak Forests & Flying Squirrels",
        description: "A biodiverse haven spanning the Aravalli and Vindhyachal ranges. Discover the rare flying squirrel and lush teak forests.",
        url: "/sitamata",
        siteName: "Chittorgarh Tourism",
        images: [
            {
                url: "/sitamata_hero.png",
                width: 1200,
                height: 630,
                alt: "Dense forests of Sitamata Wildlife Sanctuary",
            },
        ],
    },
};

export default function SitamataPage() {
    return <SitamataClient />;
}
