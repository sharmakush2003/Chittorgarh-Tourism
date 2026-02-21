"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const VISITED_KEY = "ctt_visited";
const FROM_CITY_KEY = "ctt_fromCity";

/**
 * VisitorGate — IP-based first-time visitor routing.
 *
 * Flow:
 *   localStorage[ctt_visited] set  →  render nothing (repeat visit)
 *   First visit, local (Chittorgarh/Rajasthan)  →  show LOCAL welcome modal
 *   First visit, tourist  →  brief loading then redirect to /how-to-reach
 *   API failure  →  show FALLBACK manual choice modal
 */
export default function VisitorGate() {
    const router = useRouter();
    const [status, setStatus] = useState("idle"); // idle | checking | local | tourist | fallback | done

    useEffect(() => {
        const visited = localStorage.getItem(VISITED_KEY);
        if (visited) {
            setStatus("done");
            return;
        }

        setStatus("checking");

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

        fetch("/api/geo", { signal: controller.signal })
            .then(res => res.json())
            .then(data => {
                clearTimeout(timeout);
                // Store city for the how-to-reach estimated travel time feature
                if (data.city) {
                    localStorage.setItem(FROM_CITY_KEY, data.city);
                }

                if (data.isChittorgarh || data.isRajasthan) {
                    setStatus("local");
                } else {
                    // Tourist — show choice modal
                    setStatus("tourist_prompt");
                }
            })
            .catch(() => {
                clearTimeout(timeout);
                setStatus("fallback");
            });
    }, [router]);

    const markVisited = (value = "true") => {
        localStorage.setItem(VISITED_KEY, value);
    };

    const handleLocalContinue = () => {
        markVisited("local");
        setStatus("done");
    };

    const handleLocalViewTravel = () => {
        markVisited("local");
        setStatus("done");
        router.push("/how-to-reach");
    };

    const handleTouristYes = () => {
        markVisited("tourist");
        setStatus("done");
        router.push("/how-to-reach");
    };

    const handleTouristNo = () => {
        markVisited("tourist");
        setStatus("done");
        router.push("/");
    };

    const handleFallbackTourist = () => {
        markVisited("tourist");
        setStatus("done");
        router.replace("/how-to-reach");
    };

    const handleFallbackLocal = () => {
        markVisited("local");
        setStatus("done");
    };

    const [hasLocale, setHasLocale] = useState(false);

    useEffect(() => {
        // Check for locale immediately and then periodically or via event
        const checkLocale = () => {
            const locale = localStorage.getItem("ctt_locale");
            if (locale) setHasLocale(true);
        };

        checkLocale();
        const interval = setInterval(checkLocale, 500); // 500ms check is safe and fast enough

        return () => clearInterval(interval);
    }, []);

    // Render nothing when done or still in idle state
    if (status === "done" || status === "idle") return null;

    // Delay showing any VisitorGate UI until Language selection is complete
    // This ensures we ask "Need travel help?" AFTER the language prompt as requested.
    if (!hasLocale) return null;

    // Thin loading veil while checking geo (fast, ~100ms — doesn't block page render)
    if (status === "checking" || status === "redirecting") {
        return <div className="vg-loading-veil" aria-hidden="true" />;
    }

    // ── LOCAL MODAL ───────────────────────────────────────────────────────────
    if (status === "local") {
        return (
            <div className="vg-overlay" role="dialog" aria-modal="true" aria-labelledby="vg-local-body">
                <div className="vg-modal vg-modal--local">
                    <p className="vg-modal-body" id="vg-local-body">
                        Welcome! As a local of this historic land,
                        you can enter the site directly. Or explore our travel guide for visitors.
                    </p>
                    <div className="vg-local-actions">
                        <button className="btn-gold vg-btn-primary" onClick={handleLocalContinue}>
                            Continue to Website
                        </button>
                        <button className="vg-btn-ghost" onClick={handleLocalViewTravel}>
                            View Travel Info
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── TOURIST PROMPT ───────────────────────────────────────────────────────
    if (status === "tourist_prompt") {
        return (
            <div className="vg-overlay" role="dialog" aria-modal="true" aria-labelledby="vg-tourist-title">
                <div className="vg-modal vg-modal--tourist">
                    <div className="vg-modal-emblem">✦</div>
                    <h2 className="vg-modal-title" id="vg-tourist-title">Welcome</h2>
                    <p className="vg-modal-body">
                        Do you need help with travel information on how to reach Chittorgarh?
                    </p>
                    <div className="vg-local-actions">
                        <button className="btn-gold vg-btn-primary" onClick={handleTouristYes}>
                            Yes, Guide Me
                        </button>
                        <button className="vg-btn-ghost" onClick={handleTouristNo}>
                            No, Enter Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── FALLBACK MODAL (API failure) ──────────────────────────────────────────
    if (status === "fallback") {
        return (
            <div className="vg-overlay" role="dialog" aria-modal="true" aria-labelledby="vg-fallback-title">
                <div className="vg-modal vg-modal--fallback">
                    <div className="vg-modal-emblem">✦</div>
                    <h2 className="vg-modal-title" id="vg-fallback-title">Welcome</h2>
                    <p className="vg-modal-body">
                        To guide you better, tell us about your visit:
                    </p>
                    <div className="vg-choice-grid">
                        <button className="vg-choice-card" onClick={handleFallbackTourist}>
                            <span className="vg-choice-label">I am a Visitor</span>
                            <span className="vg-choice-sub">Guide me to Chittorgarh</span>
                        </button>
                        <button className="vg-choice-card" onClick={handleFallbackLocal}>
                            <span className="vg-choice-label">I am a Local</span>
                            <span className="vg-choice-sub">Enter the site directly</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
