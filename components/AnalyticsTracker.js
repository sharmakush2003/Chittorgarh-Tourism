"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackVisit } from "@/lib/analytics";

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // We wrap in a small delay to ensure page titles etc are set
        // and to avoid tracking rapid navigation too aggressively
        const timer = setTimeout(() => {
            trackVisit(pathname || "/");
        }, 1000);

        return () => clearTimeout(timer);
    }, [pathname]);

    return null; // This component doesn't render anything
}
