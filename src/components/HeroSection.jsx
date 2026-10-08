import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Radio, Award, MapPin, CheckCircle2, Trees, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { api, getMediaUrl } from "../services/api";

const TESTIMONIALS = {
  fr: [
    {
      id: 1,
      quote: "« Les jeunes ne doivent plus être de simples bénéficiaires de la sensibilisation, mais des producteurs de connaissances et des acteurs du changement. »",
      author: "Jean Marie Kenfack",
      role: "Porteur du programme JEDDIAC",
      badge: "Vision & Direction JEDDIAC",
      avatar: null
    }
  ],
  en: [
    {
      id: 1,
      quote: "“Youth should no longer be mere recipients of awareness, but producers of knowledge and catalysts for real change.”",
      author: "Jean Marie Kenfack",
      role: "Leader of JEDDIAC Program",
      badge: "Vision & Direction JEDDIAC",
      avatar: null
    }
  ]
};

function useAnimatedCounter(targetValue, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const target = Number(targetValue) || 0;
    if (target === 0) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [targetValue, duration]);

  return count;
}

export default function HeroSection({ stats, onOpenApplication, onExploreAxes }) {
  const { language, t, isEnglish } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [activeQuote, setActiveQuote] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Dynamic data from API
  const [apiMetrics, setApiMetrics] = useState(stats || null);
  const [leaderData, setLeaderData] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [heroImageCaption, setHeroImageCaption] = useState(null);
  const [heroImageLocation, setHeroImageLocation] = useState(null);
  const [latestDispatch, setLatestDispatch] = useState(null);

  useEffect(() => {
    if (stats) setApiMetrics((prev) => ({ ...(prev || {}), ...stats }));
  }, [stats]);

  // Animated counters directly driven by API metrics
  const targetJeunes = apiMetrics?.journalistesCibles ?? stats?.journalistesCibles ?? 20000;
  const targetPartenaires = apiMetrics?.structuresPartenaires ?? stats?.structuresPartenaires ?? 300;
  const targetRegions = apiMetrics?.regionsCameroun ?? stats?.regionsCameroun ?? 6;
  const targetPays = apiMetrics?.paysAfriqueCentrale ?? stats?.paysAfriqueCentrale ?? 9;

  const countJeunes = useAnimatedCounter(targetJeunes, 2000);
  const countPartenaires = useAnimatedCounter(targetPartenaires, 1600);
  const countRegions = useAnimatedCounter(targetRegions, 1400);
  const countPays = useAnimatedCounter(targetPays, 1200);

  const currentTestimonials = TESTIMONIALS[language] || TESTIMONIALS.fr;
  const currentQuote = currentTestimonials[activeQuote] || currentTestimonials[0];
  const hasMultipleQuotes = currentTestimonials.length > 1;

  // Parallax scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch API data for live overview metrics, member profile, authentic hero image and latest dispatch
  useEffect(() => {
    let isMounted = true;

    // Load live overview & impact metrics directly from API
    api.getOverviewStats()
      .then((res) => {
        if (!isMounted || !res) return;
        setApiMetrics(res);
      })
      .catch((err) => console.warn("Hero overview metrics load err:", err.message));

    // Load leader details from API (avatar, title)
    api.getMembers()
      .then((res) => {
        if (!isMounted || !res || !res.values) return;
        const leader = res.values.find(
          (m) =>
            m.lastName?.toLowerCase().includes("kenfack") ||
            m.role === "coordinator" ||
            m.category === "direction"
        );
        if (leader) {
          setLeaderData({
            author: `${leader.firstName || ""} ${leader.lastName || ""}`.trim(),
            role: isEnglish
              ? (leader.metierEn || leader.metier)
              : (leader.metier || leader.metierEn),
            avatar: leader.avatar ? getMediaUrl(leader.avatar) : null
          });
        }
      })
      .catch((err) => console.warn("Hero leader load err:", err.message));

    // Load authentic media and latest dispatch from news API
    api.getNews("?limit=10")
      .then((res) => {
        if (!isMounted || !res || !res.values) return;
        const withCover = res.values.find((n) => n.coverImage && n.status === "active");
        if (withCover) {
          setHeroImage(getMediaUrl(withCover.coverImage));
          setHeroImageCaption(isEnglish && withCover.titleEn ? withCover.titleEn : withCover.title);
          setHeroImageLocation(
            isEnglish && withCover.categoryEn
              ? withCover.categoryEn
              : withCover.category || "Dépêche Officielle"
          );
        }
        const latest = res.values.find((n) => n.status === "active");
        if (latest) {
          setLatestDispatch(latest);
        }
      })
      .catch((err) => console.warn("Hero news load err:", err.message));

    return () => {
      isMounted = false;
    };
  }, [isEnglish]);

  // Testimonial Carousel: only active when there is MORE than 1 testimonial
  useEffect(() => {
    if (!hasMultipleQuotes || isPaused) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveQuote((prev) => (prev + 1) % currentTestimonials.length);
        setIsFading(false);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, [hasMultipleQuotes, isPaused, activeQuote, currentTestimonials.length]);

  const switchQuote = (index) => {
    if (!hasMultipleQuotes || index === activeQuote || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveQuote(index);
      setIsFading(false);
    }, 250);
  };

  const nextQuote = () => {
    if (!hasMultipleQuotes) return;
    switchQuote((activeQuote + 1) % currentTestimonials.length);
  };

  const prevQuote = () => {
    if (!hasMultipleQuotes) return;
    switchQuote((activeQuote - 1 + currentTestimonials.length) % currentTestimonials.length);
  };

  // Parallax translation
  const parallaxOffset = Math.min(scrollY * 0.32, 280);

  // Compute author, role, avatar and initials
  const displayAuthor = leaderData?.author || currentQuote.author;
  const displayRole = leaderData?.role || currentQuote.role;
  const displayAvatar = leaderData?.avatar || currentQuote.avatar;
  const initials = displayAuthor
    ? displayAuthor
        .replace(/^(Dr\.?|Prof\.?|M\.?)\s+/i, "")
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "JM";

  return (
    <section id="accueil" className="hero-editorial-section">
      {/* Background Visual with Parallax & Living Nature Animation — Congo Basin Rainforest */}
      <div className="hero-parallax-wrapper" aria-hidden="true">
        <div 
          className="hero-parallax-image"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0)`
          }}
        >
          <div className="hero-animated-canopy" />
        </div>

        {/* Ambient Drifting Mist Over the Rainforest */}
        <div className="hero-mist-drifter hero-mist-layer-1" />
        <div className="hero-mist-drifter hero-mist-layer-2" />

        {/* Sunbeam Light Ray */}
        <div className="hero-parallax-lightbeam" />

        {/* Floating Organic Golden Spores */}
        <div className="hero-particles-field">
          <span className="hero-particle p-1" />
          <span className="hero-particle p-2" />
          <span className="hero-particle p-3" />
          <span className="hero-particle p-4" />
          <span className="hero-particle p-5" />
          <span className="hero-particle p-6" />
        </div>

        {/* Protective Gradient Overlay */}
        <div className="hero-parallax-overlay" />
      </div>

      <div className="container hero-container-relative">
        <div className="hero-editorial-grid">
          {/* Left Column: Mission, Editorial Title & CTAs */}
          <div className="hero-editorial-content">
            <div className="hero-kicker-strip">
              <span className="hero-kicker-tag">
                <Sparkles size={14} />
                {t("heroKickerTag")}
              </span>
              <span className="hero-kicker-badge">
                <Trees size={14} />
                {t("heroKickerBadge")}
              </span>
            </div>

            <h1 className="hero-title-editorial">
              {t("heroTitlePart1")}{" "}
              <span className="title-highlight">{t("heroTitleHighlight")}</span>{" "}
              {t("heroTitlePart2")}
            </h1>

            <p className="hero-lead-editorial">
              {t("heroLead")}
            </p>

            <div className="hero-editorial-ctas">
              <button 
                id="hero-main-cta"
                onClick={onOpenApplication}
                className="btn btn-forest"
              >
                <span>{t("heroCtaJoin")}</span>
                <ArrowRight size={17} />
              </button>

              <a 
                href="#equipe"
                className="btn btn-outline-forest"
              >
                <Users size={17} />
                <span>{t("heroCtaTeam")}</span>
              </a>

              <a 
                href="#podcasts"
                className="btn btn-ghost-forest"
              >
                <Radio size={17} />
                <span>{t("heroCtaPodcasts")}</span>
              </a>
            </div>

            {/* Impact Metric Strip */}
            <div className="hero-metrics-grid">
              <div className="metric-box metric-box-animated" style={{ animationDelay: "0.1s" }}>
                <span className="metric-box-number">{countJeunes.toLocaleString(language === "fr" ? "fr-FR" : "en-US").replace(/\s/g, " ")}</span>
                <span className="metric-box-label">
                  {(isEnglish ? apiMetrics?.labelYouthEn : apiMetrics?.labelYouthFr) || t("metricYouth")}
                </span>
              </div>
              <div className="metric-box metric-box-animated" style={{ animationDelay: "0.2s" }}>
                <span className="metric-box-number">{countPartenaires}+</span>
                <span className="metric-box-label">
                  {(isEnglish ? apiMetrics?.labelPartnersEn : apiMetrics?.labelPartnersFr) || t("metricPartners")}
                </span>
              </div>
              <div className="metric-box metric-box-animated" style={{ animationDelay: "0.3s" }}>
                <span className="metric-box-number">{countRegions}</span>
                <span className="metric-box-label">
                  {(isEnglish ? apiMetrics?.labelRegionsEn : apiMetrics?.labelRegionsFr) || t("metricRegions")}
                </span>
              </div>
              <div className="metric-box metric-box-animated" style={{ animationDelay: "0.4s" }}>
                <span className="metric-box-number">{countPays} M+</span>
                <span className="metric-box-label">
                  {(isEnglish ? apiMetrics?.labelCountriesEn : apiMetrics?.labelCountriesFr) || t("metricCountries")}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Photography Composition with Authentic Media */}
          <div className="hero-visual-composition">
            {/* Primary Large Image Frame */}
            <div className="hero-main-photo-frame">
              {heroImage ? (
                <img 
                  src={heroImage} 
                  alt={heroImageCaption || t("heroPhotoTag")} 
                  className="hero-main-photo" 
                />
              ) : (
                <img 
                  src="/assets/congo-basin-hero.jpg" 
                  alt="Programme JEDDIAC - Bassin du Congo" 
                  className="hero-main-photo" 
                />
              )}
              <div className="hero-photo-tag-overlay">
                <MapPin size={13} />
                <span>{heroImageLocation || t("heroPhotoTag")}</span>
              </div>
            </div>

            {/* Secondary Floating Overlapping Card: Testimonial Card */}
            <div 
              className="hero-floating-quote-card"
              onMouseEnter={() => { if (hasMultipleQuotes) setIsPaused(true); }}
              onMouseLeave={() => { if (hasMultipleQuotes) setIsPaused(false); }}
            >
              <div className="quote-card-header">
                <span className="quote-badge">
                  <Award size={14} />
                  {currentQuote.badge}
                </span>
                
                {/* Carousel Controls only rendered when there are multiple quotes */}
                {hasMultipleQuotes && (
                  <div className="quote-carousel-nav">
                    <button 
                      onClick={prevQuote} 
                      className="quote-nav-arrow"
                      aria-label="Témoignage précédent"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <span className="quote-nav-counter">
                      {activeQuote + 1}/{currentTestimonials.length}
                    </span>
                    <button 
                      onClick={nextQuote} 
                      className="quote-nav-arrow"
                      aria-label="Témoignage suivant"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                )}
              </div>

              <blockquote className={`quote-text ${hasMultipleQuotes && isFading ? "fade-out" : "fade-in"}`}>
                {currentQuote.quote}
              </blockquote>

              <div className={`quote-author-row ${hasMultipleQuotes && isFading ? "fade-out" : "fade-in"}`}>
                {displayAvatar ? (
                  <img 
                    src={displayAvatar} 
                    alt={displayAuthor} 
                    className="quote-avatar"
                  />
                ) : (
                  <div className="quote-avatar-fallback" aria-hidden="true">
                    {initials}
                  </div>
                )}
                <div>
                  <h4 className="quote-author-name">{displayAuthor}</h4>
                  <p className="quote-author-title">{displayRole}</p>
                </div>
              </div>

              {/* Pagination Dots with Animated Progress Bar only when multiple quotes */}
              {hasMultipleQuotes && (
                <div className="quote-carousel-dots">
                  {currentTestimonials.map((t, idx) => {
                    const isActive = idx === activeQuote;
                    return (
                      <button
                        key={t.id}
                        onClick={() => switchQuote(idx)}
                        className={`quote-dot ${isActive ? "active" : ""}`}
                        aria-label={`Aller au témoignage ${idx + 1}`}
                        title={`${t.author} — ${t.role}`}
                      >
                        {isActive && (
                          <span 
                            key={`prog-${activeQuote}`}
                            className={`quote-dot-progress ${isPaused ? "paused" : ""}`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Floating Live Dispatch Card */}
            <div className="hero-floating-status-pill">
              <span className="status-indicator-dot"></span>
              <div>
                <strong>
                  {latestDispatch
                    ? (isEnglish && latestDispatch.categoryEn ? latestDispatch.categoryEn : (latestDispatch.category || t("heroStatusTitle")))
                    : t("heroStatusTitle")}
                </strong>
                <span>
                  {latestDispatch
                    ? (isEnglish && latestDispatch.titleEn ? latestDispatch.titleEn : latestDispatch.title)
                    : t("heroStatusDesc")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
