"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Eye } from "lucide-react";

export default function VisitorCounter() {
    const { t } = useLanguage();
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function initVisitorCount() {
            try {
                const hasVisited = sessionStorage.getItem("ctt_visit_counted");

                let res;
                if (!hasVisited) {
                    res = await fetch("/api/analytics/visitor-count", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ referrer: document.referrer || "Direct" })
                    });
                    sessionStorage.setItem("ctt_visit_counted", "true");
                } else {
                    res = await fetch("/api/analytics/visitor-count");
                }

                if (res.ok) {
                    const data = await res.json();
                    if (isMounted && data.success && typeof data.count === "number") {
                        setCount(data.count);
                    }
                }
            } catch (err) {
                console.error("Failed to load visitor count:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        initVisitorCount();

        return () => {
            isMounted = false;
        };
    }, []);

    const labelText = t("footer.visitorCount") || "Total Visitors";

    return (
        <div style={{ marginTop: "16px", marginBottom: "8px", display: "flex", alignItems: "center" }}>
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px",
                    background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(20, 15, 10, 0.75) 100%)",
                    border: "1px solid rgba(212, 175, 55, 0.45)",
                    borderRadius: "50px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    userSelect: "none"
                }}
            >
                {/* Pulsing Green Dot */}
                <span
                    style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#10B981",
                        borderRadius: "50%",
                        boxShadow: "0 0 8px #10B981",
                        display: "inline-block"
                    }}
                />

                {/* Eye Icon */}
                <Eye size={14} style={{ color: "#D4AF37", filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.5))" }} />

                {/* Label */}
                <span
                    style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "rgba(255, 255, 255, 0.9)",
                        whiteSpace: "nowrap"
                    }}
                >
                    {labelText}
                </span>

                {/* Colon */}
                <span style={{ color: "rgba(212, 175, 55, 0.7)", fontWeight: "bold" }}>:</span>

                {/* Count Number */}
                <span
                    style={{
                        fontFamily: "var(--ff-display, monospace, serif)",
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#F3E5AB",
                        letterSpacing: "1px",
                        textShadow: "0 0 8px rgba(212, 175, 55, 0.4)"
                    }}
                >
                    {loading ? "..." : (count ?? 48)}
                </span>
            </div>
        </div>
    );
}
