import { redirect } from "next/navigation";

export const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeBDx8SK9Rm-S0QBO6wCFV5v-pfE6uCYTYU6ubMR5jNDOkpOA/viewform";

export const metadata = {
    title: "Feedback Hub | Chittorgarh Tourism",
    description: "Share your experience and help us improve the visitor guide for Chittorgarh Fort. Your voice helps us preserve our heritage better.",
    alternates: {
        canonical: '/feedback',
    },
};

export default function FeedbackPage() {
    redirect(GOOGLE_FORM_URL);
}

