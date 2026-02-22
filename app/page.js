import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Chittorgarh Tourism — The Saga of Bravery & Sacrifice",
  description: "Discover Chittorgarh Fort — Rajasthan's mightiest citadel. Plan your journey, explore heritage sites, and immerse in the rich history of Mewar.",
  keywords: ["Chittorgarh Fort", "Rajasthan Tourism", "Mewar History", "Rani Padmini", "Maharana Pratap", "Indian Heritage Sites"],
  openGraph: {
    title: "Chittorgarh Tourism — The Saga of Bravery & Sacrifice",
    description: "Discover Rajasthan's mightiest citadel.",
    url: "https://chittorgarh-tourism-five.vercel.app",
    siteName: "Chittorgarh Tourism",
  },
};

export default function Home() {
  return <HomeClient />;
}
