import ExploreClient from "@/components/ExploreClient";

export const metadata = {
    title: "Best Historical Places to Visit in Chittorgarh Fort",
    description: "Explore the top hidden temples and historical places to visit inside Chittorgarh Fort: Vijay Stambha, Rani Padmini's Palace, Gaumukh Reservoir, and more.",
    alternates: {
        canonical: 'https://chittorgarh-tourism-five.vercel.app/explore',
    },
    keywords: ["best historical places to visit in Chittorgarh Fort", "Chittorgarh Fort hidden temples", "Vijay Stambha", "Rani Padmini Palace", "Rajasthan heritage sites", "Meera Temple", "Kirti Stambha"],
    openGraph: {
        title: "Best Historical Places to Visit in Chittorgarh Fort",
        description: "Explore Rajasthan's finest heritage attractions and hidden temples in and around Chittorgarh Fort.",
        url: "https://chittorgarh-tourism-five.vercel.app/explore",
        siteName: "Chittorgarh Tourism",
    },
};

export default function Explore() {
    return <ExploreClient />;
}
