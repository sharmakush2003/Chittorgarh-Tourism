import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, increment, doc, setDoc } from "firebase/firestore";

export async function POST(req) {
    try {
        const body = await req.json();
        const { page, language, referrer, userAgent } = body;

        // 1. Get IP-based Country info (using a free service or headers)
        // For simplicity, we'll use a header or just log that it's from the trackVisit
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        
        // 2. Log full visit data
        if (db) {
            await addDoc(collection(db, "analytics_raw"), {
                page,
                language,
                referrer,
                userAgent,
                ip,
                timestamp: serverTimestamp()
            });

            // 3. Increment daily & total stats for easy dashboarding
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const statsRef = doc(db, "analytics_stats", today);
            
            await setDoc(statsRef, {
                date: today,
                visits: increment(1),
                [`pages.${page.replace(/\//g, '_')}`]: increment(1),
                [`languages.${language}`]: increment(1)
            }, { merge: true });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Tracking API Error:", error);
        return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
    }
}
