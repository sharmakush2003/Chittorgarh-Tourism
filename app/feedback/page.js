import FeedbackLoader from "@/components/FeedbackLoader";

export const metadata = {
    title: "Feedback Hub | Chittorgarh Tourism",
    description: "Share your experience and help us improve the visitor guide for Chittorgarh Fort. Your voice helps us preserve our heritage better.",
    alternates: {
        canonical: '/feedback',
    },
};

export default function FeedbackPage() {
    return <FeedbackLoader />;
}
