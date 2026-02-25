"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQ() {
    const { t } = useLanguage();

    const faqs = [
        {
            q: t("faq.q1"),
            a: t("faq.a1"),
        },
        {
            q: t("faq.q2"),
            a: t("faq.a2"),
        },
        {
            q: t("faq.q3"),
            a: t("faq.a3"),
        },
        {
            q: t("faq.q4"),
            a: t("faq.a4"),
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="container">
                <header className="section-header">
                    <span className="eyebrow">{t("faq.eyebrow")}</span>
                    <h2 className="section-title">{t("faq.title")}</h2>
                    <div className="gold-divider"></div>
                </header>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${openIndex === index ? "open" : ""}`}
                            onClick={() => toggleFaq(index)}
                        >
                            <div className="faq-question">
                                <h3>{faq.q}</h3>
                                <span className="faq-icon">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </div>
                            <div
                                className="faq-answer-wrapper"
                                style={{
                                    maxHeight: openIndex === index ? "500px" : "0",
                                    opacity: openIndex === index ? 1 : 0,
                                }}
                            >
                                <p className="faq-answer">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .faq-section {
                    padding: 6rem 0;
                    background: var(--dark-bg);
                }

                .faq-list {
                    max-width: 800px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .faq-item {
                    background: var(--dark-soft);
                    border: 1px solid rgba(212, 175, 55, 0.1);
                    border-radius: 8px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .faq-item:hover, .faq-item.open {
                    border-color: rgba(212, 175, 55, 0.4);
                }

                .faq-question {
                    padding: 1.5rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1rem;
                }

                .faq-question h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    font-family: var(--font-jost);
                    font-weight: 500;
                    color: #fff;
                    transition: color 0.3s ease;
                }

                .faq-item.open .faq-question h3 {
                    color: var(--gold);
                }

                .faq-icon {
                    color: var(--gold);
                    font-size: 1.5rem;
                    font-weight: 300;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease;
                }

                .faq-answer-wrapper {
                    overflow: hidden;
                    transition: max-height 0.4s cubic-bezier(0, 1, 0, 1), opacity 0.4s ease;
                }

                .faq-answer {
                    padding: 0 2rem 1.5rem 2rem;
                    margin: 0;
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 1.6;
                    font-size: 0.95rem;
                }
            `}</style>
        </section>
    );
}
