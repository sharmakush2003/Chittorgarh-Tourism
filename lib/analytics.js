/**
 * Analytics utility to track visitor interactions.
 */

export const trackVisit = async (page) => {
    try {
        // We get some data locally
        const language = localStorage.getItem("ctt_locale") || "en";
        const referrer = document.referrer || "direct";
        
        await fetch("/api/analytics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                page,
                language,
                referrer,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            })
        });
    } catch (error) {
        console.error("Analytics Error:", error);
    }
};
