import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Radio, Award, MapPin, CheckCircle2, Trees, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const TESTIMONIALS = {
  fr: [
    {
      id: 1,
      quote: "« Les jeunes ne doivent plus être de simples bénéficiaires de la sensibilisation, mais des producteurs de connaissances et des acteurs du changement. »",
      author: "Jean Marie Kenfack",
      role: "Porteur du programme JEDDIAC",
      badge: "Vision & Direction JEDDIAC",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      quote: "« La rigueur de la donnée écologique couplée à la créativité des jeunes journalistes est la clé pour préserver durablement le Bassin du Congo. »",
      author: "Dr. Aïssatou Bella",
      role: "Conseillère Scientifique & Écologie",
      badge: "Sciences & Biodiversité",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      quote: "« En confiant des micros aux élèves des 10 régions, nous faisons émerger des voix et des solutions locales que les grands médias ignorent. »",
      author: "Rodrigue Manga",
      role: "Responsable Pôle Radio & Podcasts",
      badge: "Production Audio & Terroirs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      quote: "« Le journalisme de solutions donne le pouvoir d'agir. Chacune de nos enquêtes junior met en valeur des actions citoyennes concrètes et reproductibles. »",
      author: "Grâce Bikou",
      role: "Rédactrice en Chef Adjointe Enquêtes",
      badge: "Journalisme de Solutions",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&auto=format&fit=crop&q=80"
    }
  ],
  en: [
    {
      id: 1,
      quote: "“Youth should no longer be mere recipients of awareness, but producers of knowledge and catalysts for real change.”",
      author: "Jean Marie Kenfack",
      role: "Leader of JEDDIAC Program",
      badge: "Vision & Direction JEDDIAC",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      quote: "“The rigor of ecological data coupled with the creativity of young journalists is key to sustainably preserving the Congo Basin.”",
      author: "Dr. Aïssatou Bella",
      role: "Scientific Advisor & Ecology",
      badge: "Sciences & Biodiversity",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      quote: "“By handing microphones to students across 10 regions, we surface grassroots voices and solutions that mainstream media overlook.”",
      author: "Rodrigue Manga",
      role: "Head of Youth Radio & Podcasts",
      badge: "Audio Production & Grassroots",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      quote: "“Solutions journalism provides the agency to act. Each junior investigation showcases tangible and replicable citizen initiatives.”",
      author: "Grâce Bikou",
      role: "Deputy Editor-in-Chief Investigations",
      badge: "Solutions Journalism",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&auto=format&fit=crop&q=80"
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
  const { language, t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [activeQuote, setActiveQuote] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Animated counters
  const countJeunes = useAnimatedCounter(stats?.journalistesCibles || 20000, 2000);
  const countPartenaires = useAnimatedCounter(stats?.structuresPartenaires || 90, 1600);
  const countRegions = useAnimatedCounter(stats?.regionsCameroun || 10, 1400);
  const countPays = useAnimatedCounter(stats?.paysAfriqueCentrale || 6, 1200);

  const currentTestimonials = TESTIMONIALS[language] || TESTIMONIALS.fr;
  const currentQuote = currentTestimonials[activeQuote] || currentTestimonials[0];

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

  // Automatic Testimonial Carousel with 8s progressive duration
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveQuote((prev) => (prev + 1) % currentTestimonials.length);
        setIsFading(false);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused, activeQuote, currentTestimonials.length]);

  const switchQuote = (index) => {
    if (index === activeQuote || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveQuote(index);
      setIsFading(false);
    }, 250);
  };

  const nextQuote = () => {
    switchQuote((activeQuote + 1) % currentTestimonials.length);
  };

  const prevQuote = () => {
    switchQuote((activeQuote - 1 + currentTestimonials.length) % currentTestimonials.length);
  };

  // Parallax translation: slower movement factor
  const parallaxOffset = Math.min(scrollY * 0.32, 280);

  return (
    <section id="accueil" className="hero-editorial-section">
      {/* Background Visual with Parallax & Living Nature Animation — Congo Basin Rainforest & Sunrise */}
      <div className="hero-parallax-wrapper" aria-hidden="true">
        {/* Parallax scroll translation layer */}
        <div 
          className="hero-parallax-image"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0)`
          }}
        >
          {/* Inner animated living canopy: continuous Ken Burns slow zoom & pan */}
          <div className="hero-animated-canopy" />
        </div>

        {/* Ambient Drifting Mist Over the Rainforest */}
        <div className="hero-mist-drifter hero-mist-layer-1" />
        <div className="hero-mist-drifter hero-mist-layer-2" />

        {/* Sunbeam Pulsing Light Ray from Dawn Horizon */}
        <div className="hero-parallax-lightbeam" />

        {/* Floating Organic Golden Morning Spores */}
        <div className="hero-particles-field">
          <span className="hero-particle p-1" />
          <span className="hero-particle p-2" />
          <span className="hero-particle p-3" />
          <span className="hero-particle p-4" />
          <span className="hero-particle p-5" />
          <span className="hero-particle p-6" />
        </div>

        {/* Editorial Protective Gradient Overlay for Contrast */}
        <div className="hero-parallax-overlay" />
      </div>

      <div className="container hero-container-relative">
        <div className="hero-editorial-grid">
          {/* Left Column: Mission, Grand Editorial Title & CTAs */}
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

            {/* Impact Metric Strip - Animated Counters & Micro-Lift Cards */}
            <div className="hero-metrics-grid">
              <div className="metric-box metric-box-animated" style={{ animationDelay: "0.1s" }}>
                <span className="metric-box-number">+{countJeunes.toLocaleString(language === "fr" ? "fr-FR" : "en-US")}</span>
                <span className="metric-box-label">{t("metricYouth")}</span>
              </div>
              <div className="metric-box metric-box-animated" style={{ animationDelay: "0.2s" }}>
                <span className="metric-box-number">{countPartenaires}</span>
                <span className="metric-box-label">{t("metricPartners")}</span>
              </div>
              <div className="metric-box metric-box-animated" style={{ animationDelay: "0.3s" }}>
                <span className="metric-box-number">{countRegions}</span>
                <span className="metric-box-label">{t("metricRegions")}</span>
              </div>
              <div className="metric-box metric-box-animated" style={{ animationDelay: "0.4s" }}>
                <span className="metric-box-number">{countPays}</span>
                <span className="metric-box-label">{t("metricCountries")}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Visual Photography Composition with Animated Quote Carousel */}
          <div className="hero-visual-composition">
            {/* Primary Large Image Frame */}
            <div className="hero-main-photo-frame">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&auto=format&fit=crop&q=85" 
                alt="Jeunes reporters et environnementalistes dans le Bassin du Congo" 
                className="hero-main-photo" 
              />
              <div className="hero-photo-tag-overlay">
                <MapPin size={13} />
                <span>{t("heroPhotoTag")}</span>
              </div>
            </div>

            {/* Secondary Floating Overlapping Card: 4 Rotating Testimonials Carousel */}
            <div 
              className="hero-floating-quote-card"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="quote-card-header">
                <span className="quote-badge">
                  <Award size={14} />
                  {currentQuote.badge}
                </span>
                
                {/* Carousel Controls */}
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
              </div>

              <blockquote className={`quote-text ${isFading ? "fade-out" : "fade-in"}`}>
                {currentQuote.quote}
              </blockquote>

              <div className={`quote-author-row ${isFading ? "fade-out" : "fade-in"}`}>
                <img 
                  src={currentQuote.avatar} 
                  alt={currentQuote.author} 
                  className="quote-avatar"
                />
                <div>
                  <h4 className="quote-author-name">{currentQuote.author}</h4>
                  <p className="quote-author-title">{currentQuote.role}</p>
                </div>
              </div>

              {/* Pagination Dots with Animated Progress Bar */}
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
            </div>

            {/* Floating Live Dispatch Card */}
            <div className="hero-floating-status-pill">
              <span className="status-indicator-dot"></span>
              <div>
                <strong>{t("heroStatusTitle")}</strong>
                <span>{t("heroStatusDesc")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
