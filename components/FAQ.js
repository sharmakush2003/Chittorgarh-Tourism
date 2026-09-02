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

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <section className="faq-section">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
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
                    padding: 3rem 0;
                    background: var(--dark-bg);
                }

                .section-header {
                    margin-bottom: 1.5rem;
                }

                .faq-list {
                    max-width: 800px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                }

                .faq-item {
                    background: var(--dark-soft);
                    border: 1px solid rgba(212, 175, 55, 0.15);
                    border-radius: 10px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .faq-item:hover, .faq-item.open {
                    border-color: rgba(212, 175, 55, 0.45);
                    background: rgba(28, 21, 15, 0.95);
                }

                .faq-question {
                    padding: 0.9rem 1.25rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 0.75rem;
                }

                .faq-question h3 {
                    margin: 0;
                    font-size: 0.98rem;
                    font-family: var(--ff-body, sans-serif);
                    font-weight: 500;
                    color: #fff;
                    transition: color 0.3s ease;
                    line-height: 1.35;
                }

                .faq-item.open .faq-question h3 {
                    color: var(--gold);
                }

                .faq-icon {
                    color: var(--gold);
                    font-size: 1.2rem;
                    font-weight: 300;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease;
                    flex-shrink: 0;
                }

                .faq-answer-wrapper {
                    overflow: hidden;
                    transition: max-height 0.4s cubic-bezier(0, 1, 0, 1), opacity 0.4s ease;
                }

                .faq-answer {
                    padding: 0 1.25rem 1rem 1.25rem;
                    margin: 0;
                    color: rgba(255, 255, 255, 0.75);
                    line-height: 1.5;
                    font-size: 0.88rem;
                }

                @media (max-width: 640px) {
                    .faq-section {
                        padding: 2rem 0;
                    }
                    .faq-question {
                        padding: 0.75rem 1rem;
                    }
                    .faq-question h3 {
                        font-size: 0.88rem;
                    }
                    .faq-answer {
                        padding: 0 1rem 0.75rem 1rem;
                        font-size: 0.82rem;
                    }
                    .faq-list {
                        gap: 0.5rem;
                    }
                }
            `}</style>
        </section>
    );
}
