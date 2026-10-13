import VisitorInfoLoader from "@/components/VisitorInfoLoader";

export const metadata = {
    title: "Visitor Information Hub | Chittorgarh Tourism",
    description: "Your complete guide to reaching Chittorgarh Fort and essential emergency services including SOS, hospitals, and transport bookings.",
    alternates: {
        canonical: '/visitor-info',
    },
};

export default function VisitorInfoPage() {
    return <VisitorInfoLoader />;
}
