import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "visits.json");
const INITIAL_BASELINE = 40; // Under 100 as requested

// Helper to read local visits file
function readVisits() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const fileData = fs.readFileSync(DATA_FILE, "utf8");
            return JSON.parse(fileData);
        }
    } catch (err) {
        console.error("Error reading visits.json:", err);
    }
    return { total: 0, baseline: INITIAL_BASELINE };
}

// Helper to write local visits file
function writeVisits(data) {
    try {
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
    } catch (err) {
        console.error("Error writing visits.json:", err);
    }
}

export async function GET() {
    try {
        const data = readVisits();
        const base = data.baseline || INITIAL_BASELINE;
        const totalVisits = base + (data.total || 0);

        return NextResponse.json({
            success: true,
            count: totalVisits,
            uniqueVisits: data.total || 0
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, count: INITIAL_BASELINE, error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const data = readVisits();
        data.total = (data.total || 0) + 1;
        data.baseline = data.baseline || INITIAL_BASELINE;

        let referrer = "Direct";
        try {
            const body = await req.json();
            if (body && body.referrer) {
                referrer = body.referrer;
            }
        } catch (e) {
            // Body optional
        }

        data.referrers = data.referrers || {};
        data.referrers[referrer] = (data.referrers[referrer] || 0) + 1;

        writeVisits(data);

        const totalVisits = data.baseline + data.total;

        return NextResponse.json({
            success: true,
            count: totalVisits,
            incremented: true
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
