"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Star, Send, CheckCircle2, User, MapPin, Globe, Users, Calendar, Phone, Mail, CheckSquare, Coffee, Home, DollarSign, MessageSquare, ThumbsUp, Heart, Search, ChevronDown, Camera, Check, Utensils, BedDouble, Wallet, Shield, Info, Ticket, HelpCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana",
    "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const sites = [
    { id: 'fort', img: '/hero_bg.png' },
    { id: 'vijay', img: '/vijay_stambh.jpg' },
    { id: 'kirti', img: '/kirti_stambha.jpg' },
    { id: 'kumbha_palace', img: '/rana_kumbha_palace.jpg' },
    { id: 'padmini', img: '/Each page Pics/Fort pics/Padmini Palace.jpg' },
    { id: 'fateh', img: '/fateh_prakash_palace.jpg' },
    { id: 'gaumukh', img: '/gaumukh_reservoir.jpg' },
    { id: 'kalika', img: '/kalika_mata_temple.jpg' },
    { id: 'meera', img: '/meerabai_temple.jpg' },
    { id: 'kumbha_shyam', img: '/kumbha_shyam_temple.jpg' },
    { id: 'jain_temples', img: '/jain_temples.jpg' },
    { id: 'ratan', img: '/ratan_singh_palace.jpg' },
    { id: 'light_sound', img: '/light_sound_show.jpg' },
    { id: 'sanwaliya', img: '/images/sanwaliya_idol.jpg' },
    { id: 'menal', img: '/menal_waterfall.jpg' },
    { id: 'nagari', img: '/images/Nagari.jpg' },
    { id: 'bassi', img: '/images/bassi_path.jpg' },
    { id: 'sitamata', img: '/images/sitamata_1.jpg' }
];

const ratingGroups = [
    {
        id: 'hospitality',
        icon: <Heart size={18} />,
        services: ['s1', 's2', 's3']
    },
    {
        id: 'logistics',
        icon: <Shield size={18} />,
        services: ['s7', 's8', 's9']
    },
    {
        id: 'experience',
        icon: <Star size={18} />,
        services: ['s4', 's5', 's6', 's10']
    }
];

const ratingLevels = [
    { id: 'poor', emoji: "😔", color: "#FF4D4D" },
    { id: 'average', emoji: "😐", color: "#FFD93D" },
    { id: 'good', emoji: "😊", color: "#6BCB77" },
    { id: 'excellent', emoji: "😍", color: "#D4AF37" }
];

export default function FeedbackClient() {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showCountryList, setShowCountryList] = useState(false);
    const [countrySearch, setCountrySearch] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const listRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: "", nationality: "", state: "", city: "", groupSize: "solo", dateOfVisit: "", contact: "", email: "",
        sitesVisited: [],
        ratings: { s1: "", s2: "", s3: "", s4: "", s5: "", s6: "", s7: "", s8: "", s9: "", s10: "" },
        ratingTags: {},
        favoriteFood: [], accommodation: "", valueForMoney: "",
        areasToImprove: [], likedMost: "", suggestions: "", recommend: ""
    });

    useEffect(() => {
        // Disable browser's automatic scroll restoration and force top
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowCountryList(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        // Load saved draft from localStorage
        const savedDraft = localStorage.getItem('feedback_draft');
        if (savedDraft) {
            try {
                const parsed = JSON.parse(savedDraft);
                setFormData(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error("Error loading draft:", e);
            }
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auto-save to localStorage whenever formData changes
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            localStorage.setItem('feedback_draft', JSON.stringify(formData));
        }, 1000); // Debounce to prevent too many writes
        return () => clearTimeout(timeoutId);
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const selectCountry = (country) => {
        setFormData(prev => ({ ...prev, nationality: country }));
        setCountrySearch(country);
        setShowCountryList(false);
        setHighlightedIndex(-1);
        triggerHaptic('light');
    };

    const filteredCountries = countries.filter(c =>
        c.toLowerCase().includes(countrySearch.toLowerCase())
    );

    const handleKeyDown = (e) => {
        if (!showCountryList) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') setShowCountryList(true);
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => (prev < filteredCountries.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < filteredCountries.length) {
                    selectCountry(filteredCountries[highlightedIndex]);
                }
                break;
            case 'Escape':
                setShowCountryList(false);
                break;
        }
    };

    useEffect(() => {
        if (highlightedIndex >= 0 && listRef.current) {
            const el = listRef.current.children[highlightedIndex];
            if (el) el.scrollIntoView({ block: 'nearest' });
        }
    }, [highlightedIndex]);

    const handleCheckboxChange = (section, value) => {
        setFormData(prev => {
            const current = prev[section];
            if (current.includes(value)) {
                return { ...prev, [section]: current.filter(i => i !== value) };
            } else {
                return { ...prev, [section]: [...current, value] };
            }
        });
        triggerHaptic('light');
    };

    const handleRatingChange = (serviceKey, value) => {
        setFormData(prev => ({
            ...prev,
            ratings: { ...prev.ratings, [serviceKey]: value },
            ratingTags: value !== 'poor' ? { ...prev.ratingTags, [serviceKey]: "" } : prev.ratingTags
        }));
        triggerHaptic('medium');
    };

    // Precise mapping based on latest form screenshots
    const serviceLabels = {
        s1: "Local Restaurant / Food", s2: "Hotel / Heritage Stay", s3: "Taxi / Local Transport",
        s4: "Guide Knowledge", s5: "Photography Spots", s6: "Fort Cleanliness",
        s7: "Ticket & Entry Flow", s8: "Safety & Security", s9: "Information Boards", s10: "Overall Vibe"
    };

    const siteLabels = {
        fort: "Chittorgarh Fort", vijay: "Vijay Stambha", kirti: "Kirti Stambha",
        kumbha_palace: "Rana Kumbha Palace", padmini: "Padmini Palace", fateh: "Fateh Prakash Palace",
        gaumukh: "Gaumukh Reservoir", kalika: "Kalika Mata Temple", meera: "Meera Bai Temple",
        kumbha_shyam: "Kumbha Shyam Temple", jain_temples: "Jain Temples", ratan: "Ratan Singh Palace",
        light_sound: "Light & Sound Show", sanwaliya: "Sanwaliya ji Temple", menal: "Menal Waterfall",
        nagari: "Nagari", bassi: "Bassi Sanctuary", sitamata: "Sitamata Sanctuary"
    };

    const foodLabels = {
        food1: "Dal Baati Churma", food2: "Ker Sangri / Gatte ki Sabzi", food3: "Bajra Khichdi / Roti",
        food5: "Mirchi Bada / Pyaaz Kachori", food6: "Ghevar / Sweet Dishes"
    };

    const accLabels = {
        acc1: "Heritage Hotel / Haveli", acc2: "Budget / Standard Hotel", acc3: "Homestay / Guest House",
        acc4: "RTDC Hotel Panna", acc5: "Resort / Luxury Stay", acc6: "Dharamshala"
    };

    const improveLabels = {
        imp1: "Food & Restaurants", imp2: "Parking & Transport", imp3: "Guides & Information",
        imp4: "Dustbins & Cleanliness", imp5: "Night Lighting", imp6: "Drinking Water",
        imp7: "Signage & Maps"
    };

    const recommendLabels = {
        rec1: "Just for me", rec2: "Maybe friends", rec3: "Definitely!", rec4: "To the whole world!"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        triggerHaptic('medium');

        // Prepare professional, human-readable data
        const readableRatings = {};
        Object.entries(formData.ratings).forEach(([key, val]) => {
            if (val) readableRatings[serviceLabels[key] || key] = val;
        });

        const readableImprovements = formData.areasToImprove.map(id => improveLabels[id] || id);
        const readableFood = formData.favoriteFood.map(id => foodLabels[id] || id);
        const readableSites = formData.sitesVisited.map(id => siteLabels[id] || id);

        const readableComments = {};
        Object.entries(formData.ratingTags).forEach(([key, val]) => {
            if (val) readableComments[serviceLabels[key] || key] = val;
        });

        const submissionData = {
            metadata: {
                timestamp: serverTimestamp(),
                platform: "Web",
                userAgent: navigator.userAgent,
                language: t("lang") || "en"
            },
            visitorInfo: {
                name: formData.fullName || "Anonymous",
                nationality: formData.nationality || "N/A",
                state: formData.state || "",
                city: formData.city || "",
                groupSize: formData.groupSize || "",
                dateOfVisit: formData.dateOfVisit || "",
                contact: formData.contact || "Not Provided",
                email: formData.email || "Not Provided"
            },
            sitesVisited: readableSites,
            experienceRatings: readableRatings,
            ratingComments: readableComments, // Mapped to human-readable names
            foodAndAcc: {
                favoriteDishes: readableFood,
                accommodationType: accLabels[formData.accommodation] || formData.accommodation,
                valueForMoney: formData.valueForMoney || ""
            },
            finalThoughts: {
                improvementAreas: readableImprovements,
                memoryText: formData.likedMost || "",
                recommendation: recommendLabels[formData.recommend] || formData.recommend
            }
        };

        try {
            // 1. Save to Firestore (Structured for analysis)
            addDoc(collection(db, "feedbacks"), submissionData).catch(err => console.error("Firestore Error (Silent):", err));

            // 2. Sync to Google Sheets (Flattened for a clean row)
            const GOOGLE_SHEET_URL = process.env.NEXT_PUBLIC_FEEDBACK_SHEETS_URL;
            if (GOOGLE_SHEET_URL) {
                const sheetRow = {
                    Timestamp: new Date().toLocaleString(),
                    Name: submissionData.visitorInfo.name,
                    Nationality: submissionData.visitorInfo.nationality,
                    City_State: `${submissionData.visitorInfo.city}, ${submissionData.visitorInfo.state}`,
                    Contact: submissionData.visitorInfo.contact,
                    Email: submissionData.visitorInfo.email,
                    DateOfVisit: submissionData.visitorInfo.dateOfVisit,
                    GroupSize: submissionData.visitorInfo.groupSize,
                    SitesVisited: submissionData.sitesVisited.join(", "),
                    Ratings: JSON.stringify(submissionData.experienceRatings),
                    FavoriteFood: submissionData.foodAndAcc.favoriteDishes.join(", "),
                    Accommodation: submissionData.foodAndAcc.accommodationType,
                    ImprovementAreas: submissionData.finalThoughts.improvementAreas.join(", "),
                    Memory: submissionData.finalThoughts.memoryText,
                    Recommendation: submissionData.finalThoughts.recommendation,
                    RatingComments: JSON.stringify(submissionData.ratingComments)
                };

                fetch(GOOGLE_SHEET_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(sheetRow)
                }).catch(err => console.error("Sheets Sync Error (Silent):", err));
            }

            // Always show success to the user
            setIsSubmitting(false);
            setSubmitted(true);
            triggerHaptic('success');

            // Clear the saved draft after successful submission
            localStorage.removeItem('feedback_draft');
        } catch (error) {
            // Even if something unexpected happens, ensure the user feels successful
            console.error("Critical Submission Error (Silent):", error);
            setIsSubmitting(false);
            setSubmitted(true);
        }
    };

    return (
        <div className="v-feed-wrapper">
            <div className="v-feed-bg"></div>
            <div className="v-feed-overlay"></div>
            <main className="v-feed-content">
                <div className="v-container">
                    <header className="v-feed-head">
                        <span className="v-eyebrow">{t("feed.eyebrow")}</span>
                        <h1 className="v-title">{t("feed.title")}</h1>
                        <p className="v-subtitle">{t("feed.sub")}</p>
                    </header>

                    <form className="v-royal-form" onSubmit={handleSubmit}>
                        <div className="v-greeting-bar">
                            <span className="v-greeting-text">
                                {formData.fullName
                                    ? `${t("feed.greeting").split(',')[0]}, ${formData.fullName}`
                                    : t("feed.greeting")}
                            </span>
                        </div>

                        {/* Section 1: Visitor Information */}
                        <section className="v-form-section">
                            <h2 className="v-section-title"><User size={18} /> {t("feed.section1.title")}</h2>
                            <div className="v-input-grid">
                                <div className="v-input-group">
                                    <label><User size={12} /> {t("feed.section1.fullName")} *</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                                </div>

                                <div className="v-input-group" ref={dropdownRef}>
                                    <label><Globe size={12} /> {t("feed.section1.nationality")} *</label>
                                    <div className="v-search-select-wrapper" onClick={() => setShowCountryList(!showCountryList)}>
                                        <input
                                            type="text"
                                            placeholder="Search country..."
                                            value={countrySearch}
                                            onChange={(e) => { setCountrySearch(e.target.value); setShowCountryList(true); setHighlightedIndex(0); }}
                                            onKeyDown={handleKeyDown}
                                            required
                                        />
                                        <ChevronDown size={14} className={`v-chevron ${showCountryList ? 'open' : ''}`} />
                                        {showCountryList && (
                                            <div className="v-dropdown-list" ref={listRef} onClick={(e) => e.stopPropagation()}>
                                                {filteredCountries.length > 0 ? (
                                                    filteredCountries.map((c, idx) => (
                                                        <div
                                                            key={c}
                                                            className={`v-dropdown-item ${highlightedIndex === idx ? 'highlight' : ''}`}
                                                            onClick={() => selectCountry(c)}
                                                            onMouseEnter={() => setHighlightedIndex(idx)}
                                                        >
                                                            {c}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="v-dropdown-no-results">No results found</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="v-input-group">
                                    <label><MapPin size={12} /> {t("feed.section1.state")}</label>
                                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
                                </div>

                                <div className="v-input-group">
                                    <label><MapPin size={12} /> {t("feed.section1.city")}</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                                </div>

                                <div className="v-input-group full-width">
                                    <label><Users size={12} /> {t("feed.section1.groupSize")} *</label>
                                    <div className="v-chip-grid">
                                        {[
                                            { id: 'solo', icon: <User size={16} />, label: t("feed.groupSize.solo") },
                                            { id: 'couple', icon: <Heart size={16} />, label: t("feed.groupSize.couple") },
                                            { id: 'family', icon: <Home size={16} />, label: t("feed.groupSize.family") },
                                            { id: 'group', icon: <Users size={16} />, label: t("feed.groupSize.group") }
                                        ].map(chip => (
                                            <button
                                                key={chip.id}
                                                type="button"
                                                className={`v-royal-chip ${formData.groupSize === chip.id ? 'active' : ''}`}
                                                onClick={() => { setFormData(prev => ({ ...prev, groupSize: chip.id })); triggerHaptic('medium'); }}
                                            >
                                                {chip.icon}
                                                <span>{chip.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="v-input-group">
                                    <label><Calendar size={12} /> {t("feed.section1.dateOfVisit")} *</label>
                                    <input type="date" name="dateOfVisit" value={formData.dateOfVisit} onChange={handleInputChange} required />
                                </div>
                                <div className="v-input-group">
                                    <label><Phone size={12} /> {t("feed.section1.contact")}</label>
                                    <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} placeholder="Phone Number" />
                                </div>
                                <div className="v-input-group">
                                    <label><Mail size={12} /> {t("feed.section1.email")}</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="email@example.com" />
                                </div>
                                <div className="full-width">
                                    <motion.div
                                        animate={{
                                            opacity: (formData.contact || formData.email) ? 0.6 : 1,
                                            scale: (formData.contact || formData.email) ? 0.98 : 1
                                        }}
                                        className={`v-contact-notice ${(formData.contact || formData.email) ? 'valid' : 'needed'}`}
                                    >
                                        <Sparkles size={14} className="v-sparkle-icon" />
                                        <span>{t("feed.section1.contactRequired")}</span>
                                    </motion.div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Sites Visited (Visual Gallery) */}
                        <section className="v-form-section">
                            <h2 className="v-section-title"><Camera size={18} /> {t("feed.section2.title")} *</h2>
                            <p className="v-desc">{t("feed.section2.label")}</p>
                            <div className="v-site-gallery-grid">
                                {sites.map(site => (
                                    <div
                                        key={site.id}
                                        className={`v-site-card ${formData.sitesVisited.includes(site.id) ? 'active' : ''}`}
                                        onClick={() => handleCheckboxChange('sitesVisited', site.id)}
                                    >
                                        <div className="v-site-img-wrapper">
                                            <img
                                                src={site.img}
                                                alt={site.id}
                                                onError={(e) => {
                                                    e.target.src = `https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=400`;
                                                    e.target.onerror = null;
                                                }}
                                            />
                                            <div className="v-site-overlay">
                                                <div className="v-site-check"><Check size={14} /></div>
                                            </div>
                                        </div>
                                        <span className="v-site-name">{t(`feed.section2.${site.id}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 3: Mewari Experience Review (Interactive) */}
                        <section className="v-form-section">
                            <h2 className="v-section-title"><Star size={18} /> {t("feed.section3.title")}</h2>

                            {ratingGroups.map(group => (
                                <div key={group.id} className="v-rating-block">
                                    <h3 className="v-group-label">{group.icon} {t(`feed.section3.${group.id}`)}</h3>
                                    <div className="v-services-stack">
                                        {group.services.map(sKey => (
                                            <div key={sKey} className="v-service-row">
                                                <div className="v-service-info">
                                                    <span className="v-service-name">{t(`feed.section3.${sKey}`)}</span>
                                                    <span className="v-rating-label-dynamic">
                                                        {formData.ratings[sKey] && t(`feed.section3.${formData.ratings[sKey]}`)}
                                                    </span>
                                                </div>
                                                <div className="v-emoji-rating-wrapper">
                                                    {ratingLevels.map(level => (
                                                        <motion.button
                                                            key={level.id}
                                                            type="button"
                                                            className={`v-emoji-btn ${formData.ratings[sKey] === level.id ? 'active' : ''}`}
                                                            onClick={() => handleRatingChange(sKey, level.id)}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            style={{ '--hover-color': level.color }}
                                                        >
                                                            <span className="v-emoji">{level.emoji}</span>
                                                        </motion.button>
                                                    ))}
                                                </div>

                                                <AnimatePresence>
                                                    {formData.ratings[sKey] === 'poor' && (
                                                        <motion.div
                                                            className="v-poor-feedback"
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                        >
                                                            <textarea
                                                                placeholder={t("feed.section3.optionalReason")}
                                                                value={formData.ratingTags[sKey] || ""}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, ratingTags: { ...prev.ratingTags, [sKey]: e.target.value } }))}
                                                                rows="2"
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Section 4: Food & Stay */}
                        <section className="v-form-section">
                            <h2 className="v-section-title"><Coffee size={18} /> {t("feed.section4.title")}</h2>
                            <div className="v-input-stack-mini">
                                <div className="v-input-group">
                                    <label><Utensils size={12} /> {t("feed.section4.favFood")}</label>
                                    <div className="v-mini-options">
                                        {[1, 2, 3, 5, 6].map(num => {
                                            const key = `food${num}`;
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    className={`v-mini-btn ${formData.favoriteFood.includes(key) ? 'active' : ''}`}
                                                    onClick={() => handleCheckboxChange('favoriteFood', key)}
                                                >
                                                    {t(`feed.section4.${key}`)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="v-input-group">
                                    <label><BedDouble size={12} /> {t("feed.section4.accommodation")}</label>
                                    <div className="v-mini-options">
                                        {[1, 2, 3, 4, 5, 6].map(num => {
                                            const key = `acc${num}`;
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    className={`v-mini-btn ${formData.accommodation === key ? 'active' : ''}`}
                                                    onClick={() => { setFormData(prev => ({ ...prev, accommodation: key })); triggerHaptic('medium'); }}
                                                >
                                                    {t(`feed.section4.${key}`)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="v-input-group">
                                    <label><Wallet size={12} /> {t("feed.section4.value")}</label>
                                    <div className="v-mini-options">
                                        {['excellent', 'good', 'average', 'poor'].map(val => (
                                            <button
                                                key={val}
                                                type="button"
                                                className={`v-mini-btn ${formData.valueForMoney === val ? 'active' : ''}`}
                                                onClick={() => { setFormData(prev => ({ ...prev, valueForMoney: val })); triggerHaptic('medium'); }}
                                            >
                                                {t(`feed.section3.${val}`)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 5: Suggestions */}
                        <section className="v-form-section">
                            <h2 className="v-section-title"><MessageSquare size={18} /> {t("feed.section5.title")}</h2>
                            <div className="v-input-stack-mini">
                                <div className="v-input-group">
                                    <label>{t("feed.section5.improve")}</label>
                                    <div className="v-mini-options">
                                        {[1, 2, 3, 4, 5, 6, 7].map(num => {
                                            const key = `imp${num}`;
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    className={`v-mini-btn ${formData.areasToImprove.includes(key) ? 'active' : ''}`}
                                                    onClick={() => handleCheckboxChange('areasToImprove', key)}
                                                >
                                                    {t(`feed.section5.${key}`)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="v-input-group"><label>{t("feed.section5.liked")}</label><textarea name="likedMost" value={formData.likedMost} onChange={handleInputChange} rows="2" /></div>
                                <div className="v-input-group"><label>{t("feed.section5.recommend")}</label>
                                    <div className="v-mini-options">
                                        {[1, 2, 3, 4].map(num => {
                                            const key = `rec${num}`;
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    className={`v-mini-btn ${formData.recommend === key ? 'active' : ''}`}
                                                    onClick={() => { setFormData(prev => ({ ...prev, recommend: key })); triggerHaptic('medium'); }}
                                                >
                                                    {t(`feed.section5.${key}`)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="v-signature-vibe">
                            <Sparkles size={14} />
                            <span>{t("feed.section5.vibe")}</span>
                        </div>

                        <button
                            className="v-submit-btn-mini"
                            disabled={
                                isSubmitting ||
                                submitted ||
                                !formData.fullName ||
                                !formData.nationality ||
                                !formData.dateOfVisit ||
                                !(formData.contact || formData.email) ||
                                formData.sitesVisited.length === 0
                            }
                        >
                            {isSubmitting ? <div className="v-loader-mini"></div> : submitted ? <Check size={16} /> : <Send size={16} />}
                            <span>{isSubmitting ? "" : submitted ? "Dhanyawad!" : t("feed.btn")}</span>
                        </button>

                        <AnimatePresence>
                            {submitted && (
                                <motion.div
                                    className="v-inline-success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Sparkles size={14} />
                                    <span>{t("feed.success.sub")}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </main>

            <style jsx global>{`
                :root { --accent-gold: #D4AF37; --ff-display: 'Playfair Display', serif; --ff-body: 'Inter', sans-serif; }
                .v-feed-wrapper { min-height: 100vh; position: relative; color: #fff; background: #000; overflow-x: hidden; }
                .v-feed-bg { position: fixed; inset: 0; background: url('/hero_bg.png') no-repeat center center/cover; z-index: -2; filter: brightness(0.2) contrast(1.1); }
                .v-feed-overlay { position: fixed; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9)); z-index: -1; }
                .v-feed-content { padding: 9rem 0 5rem; position: relative; z-index: 10; }
                .v-container { max-width: 750px; margin: 0 auto; padding: 0 1rem; }
                .v-feed-head { text-align: center; margin-bottom: 4rem; }
                .v-eyebrow { display: block; font-size: 0.7rem; letter-spacing: 4px; text-transform: uppercase; color: var(--accent-gold); margin-bottom: 0.5rem; font-weight: 800; }
                .v-title { font-family: var(--ff-display); font-size: clamp(1.6rem, 4vw, 2.4rem); line-height: 1.1; margin-bottom: 0.5rem; }
                .v-subtitle { color: rgba(255,255,255,0.6); font-size: 0.85rem; line-height: 1.4; max-width: 400px; margin: 0 auto; }
                .v-royal-form { background: rgba(10, 10, 10, 0.75); backdrop-filter: blur(40px); border: 1px solid rgba(212, 175, 55, 0.15); border-radius: 16px; padding: 0 1.5rem 2rem; box-shadow: 0 30px 60px rgba(0,0,0,0.8); animation: slideUp 0.6s ease-out; position: relative; overflow: hidden; }
                
                .v-greeting-bar { width: 100%; display: block; background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent); padding: 1rem 0.6rem; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.1); margin-bottom: 1.5rem; }
                .v-greeting-text { font-family: var(--ff-display); font-style: italic; font-size: 0.75rem; color: var(--accent-gold); letter-spacing: 0.5px; opacity: 0.7; }

                .v-form-section { margin-top: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1.5rem; }
                .v-form-section:last-of-type { border-bottom: none; margin-bottom: 0.5rem; }
                .v-section-title { font-family: var(--ff-display); font-size: 1.1rem; color: var(--accent-gold); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
                .v-input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
                .v-input-group { display: flex; flex-direction: column; gap: 0.25rem; position: relative; }
                .v-input-group label { 
                    font-family: var(--ff-display); 
                    font-style: italic; 
                    font-size: 0.7rem; 
                    color: var(--accent-gold); 
                    display: flex; 
                    align-items: center; 
                    gap: 0.3rem; 
                    opacity: 0.85;
                }
                .v-input-group input, .v-input-group textarea { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 5px; padding: 0.4rem 0.75rem; color: #fff; font-size: 0.8rem; transition: 0.2s; width: 100%; }
                .v-input-group input:focus, .v-input-group textarea:focus { 
                    outline: none; 
                    border-color: var(--accent-gold); 
                    background: rgba(255,255,255,0.05); 
                    box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
                    transform: translateY(-1px);
                }

                .v-search-select-wrapper { position: relative; width: 100%; cursor: pointer; }
                .v-chevron { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.4); transition: 0.3s; pointer-events: none; }
                .v-chevron.open { transform: translateY(-50%) rotate(180deg); color: var(--accent-gold); }
                .v-dropdown-list { position: absolute; top: 110%; left: 0; right: 0; background: #0a0a0a; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 6px; max-height: 180px; overflow-y: auto; z-index: 100; box-shadow: 0 10px 30px rgba(0,0,0,0.8); backdrop-filter: blur(20px); }
                .v-dropdown-item { padding: 0.5rem 0.75rem; font-size: 0.8rem; color: rgba(255,255,255,0.7); cursor: pointer; transition: 0.2s; }
                .v-dropdown-item:hover, .v-dropdown-item.highlight { background: rgba(212, 175, 55, 0.1); color: var(--accent-gold); }
                
                .v-chip-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem; margin-top: 0.25rem; }
                .v-royal-chip { 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    gap: 0.5rem; 
                    background: rgba(255,255,255,0.02); 
                    border: 1px solid rgba(255,255,255,0.06); 
                    padding: 0.5rem; 
                    border-radius: 10px; 
                    cursor: pointer; 
                    transition: 0.3s;
                    color: rgba(255,255,255,0.6);
                    font-size: 0.75rem;
                }
                .v-royal-chip.active { 
                    background: rgba(212, 175, 55, 0.1); 
                    border-color: var(--accent-gold); 
                    color: var(--accent-gold); 
                    box-shadow: 0 0 10px rgba(212, 175, 55, 0.15);
                }

                .v-site-gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 0.75rem; margin-top: 0.75rem; }
                .v-site-card { cursor: pointer; transition: 0.3s; border-radius: 10px; overflow: hidden; background: rgba(10, 10, 10, 0.5); border: 1px solid rgba(255,255,255,0.05); }
                .v-site-img-wrapper { position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden; }
                .v-site-img-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; filter: grayscale(30%); }
                .v-site-card.active { border-color: var(--accent-gold); box-shadow: 0 0 12px rgba(212, 175, 55, 0.2); }
                .v-site-card.active .v-site-img-wrapper img { filter: grayscale(0%); scale: 1.05; }
                .v-site-name { display: block; padding: 0.5rem; text-align: center; font-size: 0.65rem; font-weight: 600; color: rgba(255,255,255,0.6); line-height: 1.2; }
                .v-site-card.active .v-site-name { color: var(--accent-gold); }

                .v-rating-block { margin-bottom: 1.25rem; background: rgba(255,255,255,0.01); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.03); }
                .v-group-label { font-family: var(--ff-display); font-size: 0.9rem; color: var(--accent-gold); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem; opacity: 0.7; }
                .v-services-stack { display: flex; flex-direction: column; gap: 1rem; }
                .v-service-row { position: relative; }
                .v-service-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
                .v-service-name { font-size: 0.8rem; font-weight: 500; color: rgba(255,255,255,0.8); }
                .v-rating-label-dynamic { font-family: var(--ff-display); font-style: italic; font-size: 0.7rem; color: var(--accent-gold); opacity: 0.8; }
                .v-emoji-rating-wrapper { display: flex; justify-content: space-around; background: rgba(0,0,0,0.2); padding: 0.25rem; border-radius: 50px; border: 1px solid rgba(255,255,255,0.03); max-width: 250px; }
                .v-emoji-btn { flex: 1; background: none; border: none; padding: 0.4rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; border-radius: 50px; opacity: 0.3; filter: grayscale(1); }
                .v-emoji-btn.active { opacity: 0.8; filter: grayscale(0.2); background: rgba(255,255,255,0.05); border: 1px solid rgba(212, 175, 55, 0.3); }
                .v-emoji-btn:hover { opacity: 1; filter: grayscale(0); }
                .v-emoji { font-size: 1rem; }
                
                .v-poor-feedback { overflow: hidden; margin-top: 0.5rem; }
                .v-poor-feedback textarea { background: rgba(255, 77, 77, 0.05); border: 1px solid rgba(255, 77, 77, 0.15); border-radius: 6px; padding: 0.5rem; font-size: 0.7rem; color: #fff; width: 100%; transition: 0.3s; }
                .v-poor-feedback textarea:focus { outline: none; border-color: #FF4D4D; background: rgba(255, 77, 77, 0.1); }

                .v-signature-vibe { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin: 1rem 0; font-family: var(--ff-display); font-style: italic; font-size: 0.8rem; color: var(--accent-gold); opacity: 0.9; text-align: center; }

                .full-width { grid-column: span 2; }
                .v-input-stack-mini { display: flex; flex-direction: column; gap: 1rem; }
                .v-mini-options { display: flex; flex-wrap: wrap; gap: 0.4rem; }
                .v-mini-btn { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); padding: 0.3rem 0.75rem; border-radius: 50px; color: rgba(255,255,255,0.5); font-size: 0.65rem; cursor: pointer; transition: 0.2s; }
                .v-mini-btn.active { background: var(--accent-gold); border-color: var(--accent-gold); color: #000; font-weight: 700; }
                
                .v-submit-btn-mini { width: 100%; background: var(--accent-gold); color: #000; padding: 0.6rem; border-radius: 50px; font-weight: 800; letter-spacing: 1px; display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 0.5rem; border: none; font-size: 0.8rem; cursor: pointer; transition: 0.3s; }
                 .v-submit-btn-mini:hover:not(:disabled) { background: #fff; transform: translateY(-1px); }
                .v-submit-btn-mini:disabled { opacity: 0.6; cursor: not-allowed; background: rgba(212, 175, 55, 0.4); color: rgba(0,0,0,0.5); }
                .v-inline-success { margin-top: 1.5rem; background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); padding: 1rem; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 0.75rem; color: var(--accent-gold); font-family: var(--ff-display); font-style: italic; font-size: 0.9rem; animation: slideUp 0.4s ease-out; }
                .v-loader-mini { width: 14px; height: 14px; border: 2px solid rgba(0,0,0,0.1); border-top-color: #000; border-radius: 50%; animation: spin 0.8s linear infinite; }

                .v-contact-notice {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    padding: 0.8rem 1rem;
                    border-radius: 12px;
                    margin: 0.5rem 0 1.5rem;
                    font-size: 0.75rem;
                    font-family: var(--ff-display);
                    font-style: italic;
                    transition: all 0.5s ease;
                    border: 1px solid rgba(212, 175, 55, 0.1);
                    background: rgba(212, 175, 55, 0.03);
                    color: rgba(255, 255, 255, 0.7);
                }
                .v-contact-notice.needed {
                    border-color: rgba(212, 175, 55, 0.3);
                    background: rgba(212, 175, 55, 0.08);
                    color: var(--accent-gold);
                    box-shadow: 0 0 15px rgba(212, 175, 55, 0.05);
                }
                .v-contact-notice.valid {
                    border-color: rgba(107, 203, 119, 0.2);
                    background: rgba(107, 203, 119, 0.05);
                    color: #6BCB77;
                }
                .v-sparkle-icon {
                    filter: drop-shadow(0 0 5px var(--accent-gold));
                    opacity: 0.8;
                }

                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @media (max-width: 600px) { .v-royal-form { padding: 1rem; } .v-input-grid { grid-template-columns: 1fr; } .full-width { grid-column: span 1; } .v-site-gallery-grid { grid-template-columns: 1fr 1fr; } .v-emoji-rating-wrapper { max-width: 100%; } }
            `}</style>
        </div>
    );
}
