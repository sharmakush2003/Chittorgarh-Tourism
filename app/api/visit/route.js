import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'visits.json');

async function readData() {
    try {
        const raw = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return { total: 0, referrers: {} };
    }
}

async function writeData(data) {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request) {
    try {
        const { referrer } = await request.json();
        const data = await readData();

        data.total += 1;

        // Categorize referrer
        let source = 'Direct';
        if (referrer) {
            try {
                const url = new URL(referrer);
                const hostname = url.hostname.replace('www.', '');
                if (hostname.includes('google')) source = 'Google';
                else if (hostname.includes('facebook') || hostname.includes('fb.com')) source = 'Facebook';
                else if (hostname.includes('instagram')) source = 'Instagram';
                else if (hostname.includes('twitter') || hostname.includes('x.com')) source = 'Twitter/X';
                else if (hostname.includes('github')) source = 'GitHub';
                else if (hostname.includes('linkedin')) source = 'LinkedIn';
                else if (hostname.includes('youtube')) source = 'YouTube';
                else if (hostname.includes('whatsapp')) source = 'WhatsApp';
                else source = hostname;
            } catch {
                source = 'Direct';
            }
        }

        data.referrers[source] = (data.referrers[source] || 0) + 1;
        await writeData(data);

        return Response.json({ success: true, total: data.total });
    } catch (error) {
        return Response.json({ error: 'Failed to record visit' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const data = await readData();
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: 'Failed to read visits' }, { status: 500 });
    }
}
