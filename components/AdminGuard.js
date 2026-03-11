"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/admin/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="loading-overlay">
                <style jsx>{`
                    .loading-overlay {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #0f0a06;
                        color: var(--gold);
                        font-family: var(--font-cormorant);
                        font-size: 2rem;
                    }
                `}</style>
                Authenticating...
            </div>
        );
    }

    if (!user) return null;

    return <>{children}</>;
}
