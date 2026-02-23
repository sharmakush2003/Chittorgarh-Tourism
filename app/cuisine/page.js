import CuisineClient from "@/components/CuisineClient";

export const metadata = {
    title: "Local Cuisines | Chittorgarh Tourism",
    description: "Discover the authentic flavors and royal culinary heritage of Chittorgarh. Explore traditional Rajasthani dishes like Dal Bati Churma, Laal Maas, and Ghevar.",
    openGraph: {
        title: "Local Cuisines | Chittorgarh Tourism",
        description: "Discover the authentic flavors and royal culinary heritage of Chittorgarh.",
        url: "https://chittorgarhtourism.com/cuisine",
        images: [
            {
                url: "/hero_bg.png",
                width: 1200,
                height: 630,
                alt: "Flavors of Mewar",
            },
        ],
    },
};

export default function CuisinePage() {
    return <CuisineClient />;
}
