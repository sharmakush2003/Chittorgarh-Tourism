"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import WeatherWidget from "@/components/WeatherWidget";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>

      {/* ═══ HERO ══════════════════════════════════ */}
      <header id="home" className="hero">
        <div style={{ position: 'fixed', bottom: '80px', right: '20px', zIndex: 100 }}>
          <WeatherWidget />
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            {t("hero.badge")}
          </div>
          <h1>
            <span>{t("hero.line1")}</span>
            <br />
            <em>{t("hero.line2")}</em>
          </h1>
          <p className="hero-sub">
            {t("hero.sub")}
          </p>
          <div className="hero-actions">
            <Link href="/plan" className="btn-gold">
              {t("hero.cta1")}
            </Link>
            <Link href="/artisans" className="btn-outline">
              {t("hero.cta2")}
            </Link>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </header>

      {/* ═══ STATS ══════════════════════════════════ */}
      <section className="stats-band">
        <div className="container">
          <div className="stat-item reveal">
            <div className="number">1.5M+</div>
            <div className="label">
              {t("stats.l1")}
            </div>
          </div>
          <div className="stat-item reveal reveal-delay-1">
            <div className="number">700 Acres</div>
            <div className="label">
              {t("stats.l2")}
            </div>
          </div>
          <div className="stat-item reveal reveal-delay-2">
            <div className="number">500+</div>
            <div className="label">
              {t("stats.l3")}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ════════════════════════════════════ */}
      <section className="quote-band">
        <div className="container">
          <blockquote className="reveal">
            "{t("quote.text")}"
          </blockquote>
          <cite className="reveal reveal-delay-1">
            — {t("quote.cite")}
          </cite>
        </div>
      </section>

      {/* ═══ CTA ══════════════════════════════════════ */}
      <section className="cta-section" id="contact">
        <div className="container">
          <span
            className="eyebrow reveal"
            style={{ color: "var(--gold-lt)" }}
          >
            {t("cta.eyebrow")}
          </span>
          <h2 className="reveal reveal-delay-1">
            <span>{t("cta.title")}</span>{" "}
            <em>{t("cta.title2")}</em>
          </h2>
          <p className="reveal reveal-delay-2">
            {t("cta.desc")}
          </p>
          <Link href="/plan" className="btn-gold reveal reveal-delay-3">
            {t("cta.btn")}
          </Link>
        </div>
      </section>
    </>
  );
}
