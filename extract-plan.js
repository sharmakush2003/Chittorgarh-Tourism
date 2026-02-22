const fs = require('fs');

const itineraries = {
    1: {
        title: "1 Day: The Royal Heritage Tour (Premium)",
        desc: "A meticulously curated journey through 1300 years of valor. Experience the grandeur of the largest fort in India with deep historical immersion.",
        highlights: ["7 Massive Gates (Pols)", "Vijay Stambha (Climb 157 steps)", "Rani Padmini's Water Palace", "Gaumukh Sacred Reservoir", "UNESCO World Heritage Site"],
        schedule: [
            {
                time: "08:30 AM",
                title: "Arrival & The Seven Gates",
                activity: "Begin your ascent driving through the seven historic pols (gates): Padan, Bhairon, Hanuman, Ganesh, Jodla, Laxman, and finally the main Ram Pol. Tip: Stop at the memorial chhatris of Jaimal and Patta between Bhairon and Hanuman Pol to pay respects to the martyrs of the 1568 siege."
            },
            {
                time: "09:30 AM",
                title: "Rana Kumbha Palace & Museums",
                activity: "Explore the ruins of the oldest palace in the fort. Visit the Government Museum inside Fateh Prakash Palace to see ancient sculptures, medieval weaponry, and royal artifacts. Legend says Rani Padmini performed Jauhar in the cellars of Rana Kumbha Palace."
            },
            {
                time: "11:00 AM",
                title: "Towers of Victory & Fame",
                activity: "Marvel at the Vijay Stambha (Tower of Victory), a 9-story marvel carved with thousands of Hindu deities. Pro Tip: The best view of the fort is from the top floor. Nearby, visit the Kirti Stambha (Tower of Fame), a 12th-century Jain monument dedicated to Adinath."
            },
            {
                time: "12:30 PM",
                title: "Temples of Devotion",
                activity: "Visit the Kumbha Shyam Temple (Varaha avatar of Vishnu) and the Meera Bai Temple. Sit for a moment where the poet-saint Meera Bai once sang bhajans for Lord Krishna. The intricate carvings here are a photographer's delight."
            },
            {
                time: "01:30 PM",
                title: "Royal Rajasthani Feast",
                activity: "Head to 'Chokhi Dhani' or 'Hotel Pratap Palace' nearby for an authentic thali featuring Dal Baati Churma, Gatte ki Sabzi, and Bajre ki Roti. Experience the hospitality of Mewar."
            },
            {
                time: "03:00 PM",
                title: "Rani Padmini's Palace",
                activity: "Visit the summer pavilion of Queen Padmini, surrounded by a lotus pool. This is the legendary spot where Alauddin Khilji is said to have glimpsed her reflection. The gardens here are lush and perfect for a leisurely walk."
            },
            {
                time: "04:30 PM",
                title: "Gaumukh Reservoir & Kalika Mata",
                activity: "Walk down to the Gaumukh Reservoir, fed by a perennial spring from a carved cow's mouth. It's a serene spot teeming with fish. Then, visit the 8th-century Kalika Mata Temple (originally a Sun temple) to witness the sunset prayer."
            },
            {
                time: "07:00 PM",
                title: "Lumiere: Sound & Light Show",
                activity: "Conclude with the spectacular Sound & Light show (English/Hindi) at the fort complex. Watch the history of Chittorgarh come alive through lights projected on the ancient walls. (Ticket: Approx ₹100, varying by season)."
            }
        ]
    },
    2: {
        title: "2 Days: Wildlife & Waterfalls Expedition",
        desc: "Beyond the fort lies the untamed beauty of the Aravallis. Discover leopards in the wild and ancient temples hidden by waterfalls.",
        highlights: ["Full Day 1 Fort Tour", "Bassi Wildlife Sanctuary Safari", "Orai Dam", "Menal Waterfalls", "11th Century Temples"],
        schedule: [
            { time: "Day 1", title: "Complete Heritage Tour", activity: "Follow the comprehensive 1-Day Itinerary detailed above for a full immersion into the fort's history." },
            {
                time: "Day 2 - 06:00 AM",
                title: "Sunrise Drive to Bassi",
                activity: "Depart early for Bassi Wildlife Sanctuary (25km). The morning mist over the Aravalli hills offers stunning photographic opportunities."
            },
            {
                time: "Day 2 - 07:00 AM",
                title: "Jungle Safari",
                activity: "Board a Gypsy for a safari. Keep your eyes peeled for Panthers, Sloth Bears, Hyenas, and the Four-horned Antelope. The sanctuary is also a birdwatcher's paradise (Peacocks, Eagles, Hawkes)."
            },
            {
                time: "Day 2 - 10:30 AM",
                title: "Bassi & Orai Dams",
                activity: "Visit the Bassi Dam and Orai Dam. The stillness of the water against the rugged hills is mesmerizing. Perfect for a mid-morning break and nature photography."
            },
            {
                time: "Day 2 - 01:00 PM",
                title: "Picnic at Menal",
                activity: "Drive to Menal (approx 60km). Enjoy a picnic lunch near the gorge. The area is lush green, especially post-monsoon."
            },
            {
                time: "Day 2 - 02:30 PM",
                title: "Menal: The Mini Khajuraho",
                activity: "Explore the Mahanaleshwar Temple complex (11th Century). The erotic sculptures and intricate stone carvings rival those of Khajuraho. Witness the Menal River plunging 150 feet into a gorge—a breathtaking sight."
            },
            {
                time: "Day 2 - 05:30 PM",
                title: "Rural Drive Back",
                activity: "Return to Chittorgarh via the scenic rural route. Witness local village life, cattle herders, and traditional mud houses."
            },
            {
                time: "Day 2 - 08:00 PM",
                title: "Dinner at Castle Bijaipur",
                activity: "Optional: drive to Castle Bijaipur (heritage hotel) for a royal dinner experience, or enjoy local street food (Mirchi Vada, Pyaaz Kachori) in Chittorgarh market."
            }
        ]
    },
    3: {
        title: "3 Days: The Soul of Mewar",
        desc: "A holistic journey covering History, Nature, Divinity, and Art. Meet the artisans of Akola and seek blessings at Sanwariya Seth.",
        highlights: ["Fort & Wildlife", "Sanwariya Seth Temple (Mandraphiya)", "Akola Indigo Printing", "Village Interaction", "Souvenir Shopping"],
        schedule: [
            { time: "Days 1 & 2", title: "History & Nature", activity: "Complete the 2-Day Itinerary covering the Fort, Bassi Sanctuary, and Menal Waterfalls." },
            {
                time: "Day 3 - 09:00 AM",
                title: "Pilgrimage to Mandraphiya",
                activity: "Drive 40km to the Sanwariya Seth Temple. Dedicated to Lord Krishna, this temple is famous for its opulence and the belief that the Lord is a business partner to his devotees."
            },
            {
                time: "Day 3 - 11:30 AM",
                title: "Akola: The Indigo Village",
                activity: "Visit Akola (Chhipon-ka-Akola). Watch the master craftsmen perform 'Dabu' printing—a unique mud-resist technique. See the indigo dyeing pits that have been used for generations."
            },
            {
                time: "Day 3 - 01:30 PM",
                title: "Traditional Village Lunch",
                activity: "Experience hospitality in a rural home or a local eatery. Try 'Makki ki Raab' (Corn soup) and fresh buttermilk."
            },
            {
                time: "Day 3 - 03:00 PM",
                title: "Artisan Shopping",
                activity: "Purchase fabrics directly from the source. Akola prints are famous for not bleeding color. Pick up bedsheets, sarees, and dress materials at unbeatable prices."
            },
            {
                time: "Day 3 - 05:30 PM",
                title: "Local Market Exploration",
                activity: "Return to Chittorgarh city. Explore Sadar Bazaar and Station Road. Look for 'Thewa' jewelry (gold on glass), wooden toys from Bassi, and colorful Jutits (shoes)."
            },
            {
                time: "Day 3 - 08:00 PM",
                title: "Royal Farewell",
                activity: "Conclude your trip with a rooftop dinner overlooking the illuminated Fort. Reflect on 1300 years of history, the roar of the wild, and the color of indigo."
            }
        ]
    }
};

const keys = {
    "plan.sub": "Curated experiences to help you explore the best of the Land of Sacrifice.",
    "plan.tabLabel": "Day Itinerary",
    "plan.highlights": "Highlights",
    "plan.form.title": "Plan Your Visit",
    "plan.form.name": "Name / नाम",
    "plan.form.namePlaceholder": "Your Full Name",
    "plan.form.email": "Email",
    "plan.form.emailPlaceholder": "example@mail.com",
    "plan.form.date": "Travel Date / यात्रा की तिथि",
    "plan.form.sending": "Sending:",
    "plan.form.submitLoading": "Sending Mail...",
    "plan.form.submitIdle": "Email Me This Itinerary",
    "plan.form.success": "Email Sent Successfully! Check your inbox.",
    "plan.form.timeout": "Mail functionality not working right now. Please try again later.",
    "plan.form.error": "Something went wrong. Please try again."
};

for (const day in itineraries) {
    keys[`plan.${day}.title`] = itineraries[day].title;
    keys[`plan.${day}.desc`] = itineraries[day].desc;

    itineraries[day].highlights.forEach((hlt, i) => {
        keys[`plan.${day}.hlt.${i}`] = hlt;
    });

    itineraries[day].schedule.forEach((sch, i) => {
        keys[`plan.${day}.sch.${i}.time`] = sch.time;
        keys[`plan.${day}.sch.${i}.title`] = sch.title;
        keys[`plan.${day}.sch.${i}.activity`] = sch.activity;
    });
}

const enPath = 'public/translations/en.json';
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
Object.assign(en, keys);
fs.writeFileSync(enPath, JSON.stringify(en, null, 4));
console.log("Updated en.json with plan keys!");
