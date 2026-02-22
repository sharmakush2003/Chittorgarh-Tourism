import fs from 'fs';
import path from 'path';
import GalleryClient from './GalleryClient';

export const metadata = {
    title: "Gallery | Chittorgarh Tourism",
    description: "Explore the stunning visual heritage of Chittorgarh Fort.",
};

export default function GalleryPage() {
    const dirPath = path.join(process.cwd(), 'public', 'pinterest');
    let images = [];

    try {
        const files = fs.readdirSync(dirPath);
        images = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
        });
    } catch (error) {
        console.warn("Could not read pinterest directory for Gallery:", error);
    }

    return <GalleryClient images={images} />;
}
