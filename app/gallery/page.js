import fs from 'fs';
import path from 'path';
import GalleryClient from './GalleryClient';

export const metadata = {
    title: "Gallery | Chittorgarh Tourism",
    description: "Explore the stunning visual heritage of Chittorgarh Fort.",
};

// Curated Heritage Captions
const captions = [
    "The sun casts a golden hue over the ancient ramparts.",
    "A glimpse into the architectural marvels of the Rajput era.",
    "Where every stone whispers tales of bravery and sacrifice.",
    "The iconic towers reaching towards the Mewar sky.",
    "Intricate carvings that have withstood the test of centuries.",
    "The serene water pavilions reflecting centuries of history.",
    "A testament to the undying spirit of Rajasthan.",
    "Walking the paths carved by kings, queens, and warriors.",
    "The grand gateways standing as silent guardians to the citadel.",
    "Lush green surroundings contrasting the rugged fort walls.",
    "Spiritual sanctuaries hidden within the fortress.",
    "The panoramic view of the city from the fort's highest point.",
    "Echoes of devotion lingering in the ancient temples.",
    "The majestic ruins telling stories of a bygone golden age.",
    "A closer look at the masterful Solanki architecture.",
    "The tranquil reservoirs that quenched the thirst of legends.",
    "Shadows dancing across the intricately sculpted pillars.",
    "The colossal scale of India's largest fort complex.",
    "Where the legacy of Rana Kumbha meets the horizon.",
    "A visual symphony of stone, sky, and history."
];

export default function GalleryPage() {
    const dirPath = path.join(process.cwd(), 'public', 'pinterest');
    let images = [];

    try {
        const files = fs.readdirSync(dirPath);
        const filteredFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
        });

        images = filteredFiles.map((file, index) => ({
            src: `/pinterest/${file}`,
            // Assign a unique curated caption, looping if there are more images than captions
            caption: captions[index % captions.length]
        }));
    } catch (error) {
        console.warn("Could not read pinterest directory for Gallery:", error);
    }

    return <GalleryClient images={images} />;
}
