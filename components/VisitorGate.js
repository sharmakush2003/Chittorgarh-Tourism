"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const VISITED_KEY = "ctt_visited";
const FROM_CITY_KEY = "ctt_fromCity";

/**
 * VisitorGate — IP-based first-time visitor routing.
 *
 * Flow:
 *   localStorage[ctt_visited] set  →  render nothing (repeat visit)
 *   First visit  →  show "Need travel help?" prompt modal
 *   API failure  →  show FALLBACK manual choice modal
 */
export default function VisitorGate() {
    const { t } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const [status, setStatus] = useState("idle"); // idle | checking | local | tourist | fallback | done

    useEffect(() => {
        // If we're on an admin page, we don't need the visitor gate logic
        if (pathname.startsWith('/admin')) {
            setStatus("done");
            return;
        }

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

                // Treat everyone as needing a prompt for their first visit
                setStatus("tourist_prompt");
            })
            .catch(() => {
                clearTimeout(timeout);
                setStatus("fallback");
            });
    }, [router, pathname]);

    const markVisited = (value = "true") => {
        localStorage.setItem(VISITED_KEY, value);
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
        markVisited("tourist");
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

    // Hide on admin routes or when done
    if (pathname.startsWith('/admin') || status === "done" || status === "idle") return null;

    // Delay showing any VisitorGate UI until Language selection is complete
    if (!hasLocale) return null;

    // Thin loading veil while checking geo (fast, ~100ms — doesn't block page render)
    if (status === "checking" || status === "redirecting") {
        return <div className="vg-loading-veil" aria-hidden="true" />;
    }

    // ── TOURIST PROMPT ───────────────────────────────────────────────────────
    if (status === "tourist_prompt") {
        return (
            <div className="vg-overlay" role="dialog" aria-modal="true" aria-labelledby="vg-tourist-title">
                <div className="vg-modal vg-modal--tourist">
                    <div className="vg-modal-emblem">✦</div>
                    <h2 className="vg-modal-title" id="vg-tourist-title">{t("gate.tourist.title")}</h2>
                    <p className="vg-modal-body">
                        {t("gate.tourist.body")}
                    </p>
                    <div className="vg-local-actions">
                        <button className="btn-gold vg-btn-primary" onClick={handleTouristYes}>
                            {t("gate.tourist.yes")}
                        </button>
                        <button className="vg-btn-ghost" onClick={handleTouristNo}>
                            {t("gate.tourist.no")}
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
                    <h2 className="vg-modal-title" id="vg-fallback-title">{t("gate.fallback.title")}</h2>
                    <p className="vg-modal-body">
                        {t("gate.fallback.body")}
                    </p>
                    <div className="vg-choice-grid">
                        <button className="vg-choice-card" onClick={handleFallbackTourist}>
                            <span className="vg-choice-label">{t("gate.fallback.touristTag")}</span>
                            <span className="vg-choice-sub">{t("gate.fallback.touristSub")}</span>
                        </button>
                        <button className="vg-choice-card" onClick={handleFallbackLocal}>
                            <span className="vg-choice-label">{t("gate.fallback.localTag")}</span>
                            <span className="vg-choice-sub">{t("gate.fallback.localSub")}</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
