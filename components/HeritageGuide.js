"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { triggerHaptic } from "@/lib/haptics";
import "./HeritageGuide.css";

export default function HeritageGuide() {
    const { t, lang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

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
                        timestamp: new Date()
                    }
                ]);
                setIsTyping(false);
            }, 800);
        }
    }, [isOpen, messages.length, t]);

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

    const handleSend = async (e) => {
        e?.preventDefault();
        const input = inputValue.trim();
        if (!input) return;

        const userMsg = {
            id: Date.now(),
            text: input,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        triggerHaptic("light");

        // Call the Real-Time AI API
        setIsTyping(true);
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    history: messages.slice(-5), // Send last 5 messages for context
                    lang: lang
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.details || "API Error");
            }

            const data = await response.json();

            if (data.text) {
                const botMsg = {
                    id: Date.now() + 1,
                    text: data.text,
                    sender: "bot",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botMsg]);
            } else {
                throw new Error("No text in response");
            }
        } catch (error) {
            console.error("Bot Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: t("bot.error") || "I am currently disconnected from the royal archives. Please try again in a moment.",
                sender: "bot",
                timestamp: new Date(),
                isError: true
            }]);
        } finally {
            setIsTyping(false);
            triggerHaptic("soft");
        }
    };

    const handleQuickAction = (actionKey) => {
        const actionText = t(actionKey);
        setInputValue(actionText);
        // Trigger handleSend manually for quick actions
        setTimeout(() => {
            const mockEvent = { preventDefault: () => { } };
            // Since we need the current input value which we just set, 
            // but the state update might be async, we call handleSend logic directly
            processQuickAction(actionText);
        }, 100);
    };

    const processQuickAction = async (text) => {
        const userMsg = {
            id: Date.now(),
            text: text,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    history: messages.slice(-5),
                    lang: lang
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.details || "API Error");
            }

            const data = await response.json();

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: data.text || t("bot.error") || "I lost my connection. Please ask again.",
                sender: "bot",
                timestamp: new Date()
            }]);
        } catch (error) {
            console.error("Quick Action Bot Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: t("bot.error") || "The royal library is currently out of reach. Please try again later.",
                sender: "bot",
                timestamp: new Date(),
                isError: true
            }]);
        } finally {
            setIsTyping(false);
            triggerHaptic("soft");
        }
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
                        alt="Royal Guide"
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
                                {msg.text}
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
