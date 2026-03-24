"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { triggerHaptic } from "@/lib/haptics";
import "./HeritageGuide.css";

export default function HeritageGuide() {
    const pathname = usePathname();
    const { t, lang } = useLanguage();

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [chatLang, setChatLang] = useState(lang || 'en');
    const scrollRef = useRef(null);

    if (pathname?.startsWith("/admin")) return null;

    // Initial message when opening
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                setMessages([
                    {
                        id: 1,
                        text: t("bot.greeting"),
                        sender: "bot",
                        isHindi: lang === 'hi',
                        timestamp: new Date()
                    }
                ]);
                setIsTyping(false);
            }, 800);
        }
    }, [isOpen, messages.length, t, lang]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const toggleGuide = () => {
        setIsOpen(!isOpen);
        triggerHaptic("medium");
    };

    // --- LOCAL ZERO-API SEARCH ENGINE ---
    const getLocalAnswer = (query, effectiveLang) => {
        const { KNOWLEDGE_BASE } = require("@/lib/chat-knowledge");
        const lowerQuery = query.toLowerCase().trim();
        const isHindi = effectiveLang === 'hi' || /[\u0900-\u097F]/.test(query);

        // 0. Language / Greeting Detection
        if (['hindi', 'हिंदी', 'हिन्दी'].includes(lowerQuery)) {
            return {
                text: "निश्चित रूप से! अब मैं आपसे हिंदी में बात करूँगा। मैं आपकी कैसे मदद कर सकता हूँ? ✨ [AI मार्गदर्शक]",
                isHindi: true
            };
        }
        if (['english', 'अंग्रेजी', 'अंग्रेज़ी'].includes(lowerQuery)) {
            return {
                text: "Of course! I will now converse with you in English. How can I help you explore Chittorgarh? ✨ [AI Guide]",
                isHindi: false
            };
        }
        
        const isGreetings = /^(hi|hello|hey|नमस्ते|प्रणाम|hey|hi there)/i.test(lowerQuery) || 
                          ['hello', 'hi', 'namaste', 'नमस्ते', 'hey'].includes(lowerQuery);
        
        if (isGreetings) {
             return {
                text: isHindi 
                    ? "नमस्ते! मैं चित्तौड़गढ़ का AI मार्गदर्शक हूँ। मैं इस महान विरासत को खोजने में आपकी सहायता कर सकता हूँ। आप क्या जानना चाहेंगे? ✨"
                    : "Greetings! I am the AI Guide of Chittorgarh. I can assist you in exploring this great heritage. What would you like to know? ✨",
                isHindi: isHindi
             };
        }
        
        // 1. Precise Keyword Matching
        let bestMatch = null;
        let maxScore = 0;

        KNOWLEDGE_BASE.forEach(item => {
            let score = 0;
            item.keywords.forEach(kw => {
                if (lowerQuery.includes(kw.toLowerCase())) {
                    score += 2; 
                }
            });

            // Boost score if ID or English/Hindi name matches exactly
            if (item.id && lowerQuery.includes(item.id.toLowerCase())) {
                score += 3;
            }

            if (score > maxScore) {
                maxScore = score;
                bestMatch = item;
            }
        });

        // 2. Refusal Logic (Strictly restricted)
        if (!bestMatch || maxScore < 2) {
            return {
                text: isHindi 
                    ? "मैं आपके प्रश्न का उत्तर देने में असमर्थ हूँ। यह चित्तौड़गढ़ के बारे में मेरे आधिकारिक डेटा से बाहर है। कृपया विरासत या स्मारकों के बारे में पूछें।"
                    : "I am not able to answer your query. It is away from my official data about Chittorgarh heritage. Please ask about monuments or history.",
                isHindi: isHindi
            };
        }

        // 3. Authentic Response (Markdown links handled by renderMessage)
        const responseCtx = isHindi ? (bestMatch.hi || bestMatch.en) : bestMatch.en;
        return {
            text: responseCtx + " ✨ [AI Guide]",
            isHindi: isHindi
        };
    };

    const handleSend = async (e) => {
        e?.preventDefault();
        const input = inputValue.trim();
        if (!input || isTyping) return;

        const userMsg = {
            id: Date.now(),
            text: input,
            sender: "user",
            isHindi: /[\u0900-\u097F]/.test(input),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);
        triggerHaptic("medium");

        // Artificial delay for "royal thinking"
        setTimeout(() => {
            const { KNOWLEDGE_BASE } = require("@/lib/chat-knowledge");
            const lowerQuery = input.toLowerCase().trim();
            const hasHindi = /[\u0900-\u097F]/.test(input);
            
            let effectiveLang = hasHindi ? 'hi' : chatLang;

            // Handle explicit language switch
            if (['hindi', 'हिंदी', 'हिन्दी'].includes(lowerQuery)) {
                setChatLang('hi');
                effectiveLang = 'hi';
            } else if (['english', 'अंग्रेजी', 'अंग्रेज़ी'].includes(lowerQuery)) {
                setChatLang('en');
                effectiveLang = 'en';
            }

            const botAnswer = getLocalAnswer(input, effectiveLang);
            
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: botAnswer.text,
                sender: "bot",
                isHindi: botAnswer.isHindi,
                timestamp: new Date()
            }]);
            
            setIsTyping(false);
            triggerHaptic("soft");
        }, 600);
    };

    const handleQuickAction = (actionKey) => {
        const actionText = t(actionKey);
        setInputValue(actionText);
        // We set input but state might not update fast enough, so we pass text directly
        const userMsg = {
            id: Date.now(),
            text: actionText,
            sender: "user",
            isHindi: /[\u0900-\u097F]/.test(actionText),
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);
        triggerHaptic("medium");

        setTimeout(() => {
            const hasHindi = /[\u0900-\u097F]/.test(actionText);
            const effectiveLang = hasHindi ? 'hi' : chatLang;
            const botAnswer = getLocalAnswer(actionText, effectiveLang);
            
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: botAnswer.text,
                sender: "bot",
                isHindi: botAnswer.isHindi,
                timestamp: new Date()
            }]);
            setIsTyping(false);
            triggerHaptic("soft");
        }, 600);
    };

    const renderMessage = (msg) => {
        const { text, isHindi } = msg;
        if (!text) return null;
        // Simple regex to match [Link Name](URL)
        const parts = text.split(/(\[.*?\]\(.*?\))/g);
        return parts.map((part, i) => {
            const match = part && part.match(/\[(.*?)\]\((.*?)\)/);
            if (match) {
                // Make link relative to current origin and append language
                let linkUrl = match[2].replace('https://chittorgarh-tourism.in', '');
                linkUrl = `${linkUrl}${linkUrl.includes('?') ? '&' : '?'}lang=${isHindi ? 'hi' : 'en'}`;

                return (
                    <a 
                        key={i} 
                        href={linkUrl} 
                        className="chat-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            triggerHaptic('light');
                        }}
                    >
                        {match[1]}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <div className="heritage-guide-container">
            {/* Toggle Button */}
            <div className="guide-toggle" onClick={toggleGuide}>
                {isOpen ? (
                    <span className="guide-icon">✕</span>
                ) : (
                    <img
                        src="/vijay_stambh.jpg"
                        alt="Guide"
                        className="guide-image"
                    />
                )}
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="bot-avatar">🔱</div>
                        <div className="bot-info">
                            <h3>{t("bot.name")}</h3>
                            <div className="bot-status">
                                <span className="status-dot"></span>
                                {t("bot.status.online")}
                            </div>
                        </div>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    <div className="chat-messages" ref={scrollRef}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {renderMessage(msg)}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="message bot typing">
                                <span>.</span><span>.</span><span>.</span>
                            </div>
                        )}

                        {messages.length === 1 && !isTyping && (
                            <div className="quick-actions">
                                <button className="action-btn" onClick={() => handleQuickAction("bot.action.history")}>
                                    {t("bot.action.history")}
                                </button>
                                <button className="action-btn" onClick={() => handleQuickAction("bot.action.plan")}>
                                    {t("bot.action.plan")}
                                </button>
                                <button className="action-btn" onClick={() => handleQuickAction("bot.action.reach")}>
                                    {t("bot.action.reach")}
                                </button>
                            </div>
                        )}
                    </div>

                    <form className="chat-input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder={t("bot.placeholder")}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" className="send-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
