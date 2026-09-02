/**
 * Analytics utility to track visitor interactions and fetch live visitor count.
 */

export const trackVisit = async (page = "/") => {
    try {
        const language = typeof localStorage !== "undefined" ? localStorage.getItem("ctt_locale") || "en" : "en";
        const referrer = typeof document !== "undefined" ? document.referrer || "direct" : "direct";

        // Increment visitor counter on server
        const response = await fetch("/api/analytics/visitor-count", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                page,
                language,
                referrer,
                userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
                timestamp: new Date().toISOString()
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data.count;
        }
    } catch (error) {
        console.error("Analytics Tracking Error:", error);
    }
    return null;
};

export const getVisitorCount = async () => {
    try {
        const response = await fetch("/api/analytics/visitor-count");
        if (response.ok) {
            const data = await response.json();
            return data.count;
        }
    } catch (error) {
        console.error("Fetch Visitor Count Error:", error);
    }
    return null;
};
