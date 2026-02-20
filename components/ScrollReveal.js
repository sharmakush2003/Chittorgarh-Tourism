"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
    const pathname = usePathname();

    useEffect(() => {
        let observer;

        // Small delay to ensure new page content is mounted
        const timeout = setTimeout(() => {
            observer = new IntersectionObserver(
                (entries) =>
                    entries.forEach((e) => {
                        if (e.isIntersecting) {
                            e.target.classList.add("visible");
                            observer.unobserve(e.target);
                        }
                    }),
                { threshold: 0.1 }
            );

            const elements = document.querySelectorAll(".reveal");
            elements.forEach((el) => observer.observe(el));
        }, 150);

        return () => {
            clearTimeout(timeout);
            if (observer) observer.disconnect();
        };
    }, [pathname]);

    return null;
}
