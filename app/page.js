import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Chittorgarh Tourism — Complete Guide to Rajasthan's Greatest Fort",
  description: "Explore Chittorgarh Fort, the largest fort in India. Discover history, palaces, temples, and plan your visit with our ultimate travel guide to Chittorgarh, Rajasthan.",
  keywords: [
    "Chittorgarh",
    "Chittorgarh Fort",
    "Chittorgarh Tourism",
    "How to reach Chittorgarh",
    "Best time to visit Chittorgarh",
    "Rajasthan's largest fort",
    "Mewar history",
    "Chittaurgarh Fort"
  ],
  openGraph: {
    title: "Chittorgarh Tourism — Complete Guide to Rajasthan's Greatest Fort",
    description: "Discover the ultimate travel guide for Chittorgarh Fort. Find out the best places to see, local tips, and how to plan your journey to Rajasthan.",
    url: "https://chittorgarh-tourism-five.vercel.app",
    siteName: "Chittorgarh Tourism",
  },
};

export default function Home() {
  return <HomeClient />;
}
