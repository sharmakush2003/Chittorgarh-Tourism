import CuisineClient from "@/components/CuisineClient";

export const metadata = {
    title: "Best Authentic Local Food to Eat in Chittorgarh",
    description: "Discover the best authentic Rajasthani food in Chittorgarh. Explore traditional dishes like Dal Bati Churma and find local restaurants near the Fort.",
    openGraph: {
        title: "Best Authentic Local Food to Eat in Chittorgarh",
        description: "Discover the best authentic Rajasthani food and culinary heritage of Chittorgarh.",
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
