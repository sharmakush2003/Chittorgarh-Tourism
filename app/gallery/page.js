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

// Instead of fs.readdirSync (which fails on Vercel), manually list the files we found earlier.
const pinterestFiles = [
    "091f86434521964e811a69e9d17bfb9f.jpg",
    "1b78731f3593cf08faec5245493513b2.jpg",
    "2013ee5294450ff79484ad1694525c1c.jpg",
    "23fea764949d322b17bcdb8685a91449.jpg",
    "2af7d6d1d4b33677ed8e7da1d2db0b85.jpg",
    "3c3d00b11e5955e293552d7f838ebf47.jpg",
    "5998593e8a26812cabecfda1b760bd41.jpg",
    "74.jpg",
    "75.jpg",
    "76.jpg",
    "78.jpg",
    "80.jpg",
    "83.jpg",
    "9b74a28af2a88dc24de1abbb16a35c74.jpg",
    "9d7a42a1b217b3474ef71150a635ff14.jpg",
    "NA537.jpg",
    "a31490bd7f7ba48177ddc554361ee627.jpg",
    "bhamasha.jpg",
    "ff17323b1e25a193f131076ab9b42563.jpg",
    "ff1f3ff9983aacfdd757fc43ef2d77a9.jpg"
];

export default function GalleryPage() {
    const images = pinterestFiles.map((file, index) => ({
        src: `/pinterest/${file}`,
        // Assign a unique curated caption, looping if there are more images than captions
        caption: captions[index % captions.length]
    }));

    return <GalleryClient images={images} />;
}
