"use client";

import { useEffect, useState } from "react";

export default function HeritageCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const onMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const onMouseOver = (e) => {
            if (
                e.target.tagName === "A" ||
                e.target.tagName === "BUTTON" ||
                e.target.closest("a") ||
                e.target.closest("button") ||
                e.target.style.cursor === "pointer"
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseenter", onMouseEnter);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <div
                className={`cursor-dot ${isHovering ? "hover" : ""}`}
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                }}
            />
            <div
                className={`cursor-ring ${isHovering ? "hover" : ""}`}
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                }}
            />
            <style jsx>{`
                .cursor-dot {
                    position: fixed;
                    top: -4px;
                    left: -4px;
                    width: 8px;
                    height: 8px;
                    background-color: var(--gold);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: transform 0.1s ease-out, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
                }

                .cursor-ring {
                    position: fixed;
                    top: -20px;
                    left: -20px;
                    width: 40px;
                    height: 40px;
                    border: 1px solid var(--gold);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    transition: transform 0.15s ease-out, width 0.3s ease, height 0.3s ease, border-width 0.3s ease;
                }

                .cursor-dot.hover {
                    width: 12px;
                    height: 12px;
                    top: -6px;
                    left: -6px;
                    background-color: #fff;
                }

                .cursor-ring.hover {
                    width: 60px;
                    height: 60px;
                    top: -30px;
                    left: -30px;
                    border-width: 2px;
                    border-color: #fff;
                }

                @media (max-width: 1024px) {
                    .cursor-dot, .cursor-ring {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
}
