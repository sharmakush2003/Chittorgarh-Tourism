"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * A custom hook to handle audio guide functionality using Web Speech API.
 * This centralizes the logic for voice selection, playback control, and language mapping.
 */
export function useAudioGuide() {
    const { t, lang } = useLanguage();
    const [playingAudio, setPlayingAudio] = useState(null);
    const voicesRef = useRef([]);

    // Initialize voices
    useEffect(() => {
        if (typeof window === "undefined") return;

        const updateVoices = () => {
            voicesRef.current = window.speechSynthesis.getVoices();
        };

        updateVoices();
        window.speechSynthesis.onvoiceschanged = updateVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
            // Stop any ongoing speech when the component unmounts
            window.speechSynthesis.cancel();
        };
    }, []);

    /**
     * Toggles playback of a specific section's audio.
     * @param {string} sectionId - Unique ID for the section (e.g., 'overview').
     * @param {string|string[]} input - A translation key, an array of keys, or a raw string.
     */
    const handleAudioPlay = (sectionId, input) => {
        const synth = window.speechSynthesis;
        
        // If the same section is clicked, stop it
        if (playingAudio === sectionId) {
            synth.cancel();
            setPlayingAudio(null);
            return;
        }

        // Always stop any current speech before starting new one
        synth.cancel();

        let textToSpeak = "";
        if (Array.isArray(input)) {
            textToSpeak = input.map(key => t(key)).join(". ");
        } else {
            // Check if it's a key or raw text
            const translated = t(input);
            // If t(input) returns the input string itself and the input doesn't look like a key (e.g. has spaces), 
            // it's likely already raw text.
            textToSpeak = translated;
        }

        if (!textToSpeak) {
            console.warn(`useAudioGuide: No text to speak for section "${sectionId}"`);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        // Language mapping
        const langMap = { 'en': 'en-US', 'hi': 'hi-IN' };
        const targetLang = langMap[lang] || 'en-US';
        utterance.lang = targetLang;
        
        // Voice selection logic (Prioritize Natural/Online/Google voices)
        const voices = voicesRef.current.length > 0 ? voicesRef.current : synth.getVoices();
        const bestVoice = voices.find(v => v.lang.includes(targetLang) && (v.name.includes("Natural") || v.name.includes("Online")))
                       || voices.find(v => v.lang.includes(targetLang) && v.name.includes("Google"))
                       || voices.find(v => v.lang === targetLang);
        
        if (bestVoice) {
            utterance.voice = bestVoice;
        }

        // Slightly slower rate for better clarity in guides
        utterance.rate = 0.85; 
        
        utterance.onstart = () => setPlayingAudio(sectionId);
        utterance.onend = () => setPlayingAudio(null);
        utterance.onerror = (event) => {
            console.error("useAudioGuide: SpeechSynthesis error", event);
            setPlayingAudio(null);
        };

        synth.speak(utterance);
    };

    /**
     * Stops all current speech.
     */
    const stopAudio = () => {
        window.speechSynthesis.cancel();
        setPlayingAudio(null);
    };

    return {
        playingAudio,
        handleAudioPlay,
        stopAudio
    };
}
