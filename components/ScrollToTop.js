"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
    const pathname = usePathname();
    const isInitialMount = useRef(true);

    // Track scroll position on current route
    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleScroll = () => {
            if (window.scrollY > 0) {
                sessionStorage.setItem(`scroll_pos_${pathname}`, window.scrollY.toString());
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    // Handle scroll position on mount / reload vs route change
    useEffect(() => {
        if (typeof window === "undefined") return;

        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        if (isInitialMount.current) {
            // Page reload (F5) or initial load
            isInitialMount.current = false;
            const savedPos = sessionStorage.getItem(`scroll_pos_${pathname}`);
            if (savedPos !== null) {
                const targetY = parseInt(savedPos, 10);
                if (!isNaN(targetY) && targetY > 0) {
                    const restoreScroll = () => {
                        window.scrollTo(0, targetY);
                    };
                    restoreScroll();
                    const t1 = setTimeout(restoreScroll, 50);
                    const t2 = setTimeout(restoreScroll, 150);
                    const t3 = setTimeout(restoreScroll, 350);
                    const t4 = setTimeout(restoreScroll, 600);
                    return () => {
                        clearTimeout(t1);
                        clearTimeout(t2);
                        clearTimeout(t3);
                        clearTimeout(t4);
                    };
                }
            }
        } else {
            // Route change to a new page
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
}



