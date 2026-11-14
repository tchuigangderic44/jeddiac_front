import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  MapPin, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  ArrowRight 
} from "lucide-react";
import { api } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { OFFICIAL_AGENDA } from "../data/officialAgenda";

const CALENDAR_STEPS = [
  {
    year: "2026 – 2029",
    phase: "01",
    title: "Phase pilote · Cameroun",
    titleEn: "Pilot Phase · Cameroon",
    desc: "Déploiement progressif dans les 10 régions, en s'appuyant sur les établissements scolaires et universitaires, les radios communautaires et les structures de jeunesse.",
    descEn: "Gradual deployment across the 10 administrative regions, partnering with academic institutions, community radios, and youth hubs.",
    tag: "10 régions couvertes",
    tagEn: "10 Regions Covered"
  },
  {
    year: "2026 – 2036",
    phase: "02",
    title: "Extension régionale · CEMAC",
    titleEn: "Regional Expansion · CEMAC",
    desc: "Élargissement progressif au Gabon, au Congo, à la République centrafricaine, au Tchad et à la Guinée équatoriale.",
    descEn: "Progressive expansion into Gabon, Republic of Congo, Central African Republic, Chad, and Equatorial Guinea.",
    tag: "6 pays de la CEMAC",
    tagEn: "6 CEMAC Nations"
  },
  {
    year: "Horizon",
    phase: "03",
    title: "Réseau régional de référence",
    titleEn: "Flagship Regional Network",
    desc: "Le premier réseau régional de jeunes médias engagés pour le développement durable en Afrique centrale.",
    descEn: "Central Africa's premier youth-led media network dedicated to sustainable ecological development.",
    tag: "Communauté pérenne",
    tagEn: "Long-term Impact"
  }
];

export default function AgendaSection({ onOpenApplication, onNavigateAllAgenda }) {
  const { t, isEnglish } = useLanguage();
  const [agendas, setAgendas] = useState(OFFICIAL_AGENDA);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    loadAgendas();
  }, []);

  const loadAgendas = async () => {
    try {
      const res = await api.getAgendas("?limit=10");
      if (res && res.values && res.values.length >= 6) {
        const merged = OFFICIAL_AGENDA.map((item, idx) => {
          const apiItem = res.values[idx];
          if (!apiItem) return item;
          return {
            ...item,
            id: apiItem.id || item.id,
            registrationLink: apiItem.registrationLink
          };
        });
        setAgendas(merged);
      } else {
        setAgendas(OFFICIAL_AGENDA);
      }
    } catch (err) {
      setAgendas(OFFICIAL_AGENDA);
    }
  };

  const handleCardClick = (item) => {
    const title = isEnglish && item.titleEn ? item.titleEn : item.title;
    if (onOpenApplication) {
      onOpenApplication(`Mission Cameroun — ${title}`);
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = "#contact";
      }
    }
  };

  const handleFootCtaClick = () => {
    if (onOpenApplication) {
      onOpenApplication("Mission Cameroun — Prise de contact");
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = "#contact";
      }
    }
  };

  return (
    <section id="agenda" className="agenda-editorial-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag-pill">
            <Calendar size={16} />
            <span>{t("agendaKicker")}</span>
          </div>
          <h2 className="section-title-editorial">
            {t("agendaTitle")} <span className="text-highlight-green">{t("agendaTitleHighlight")}</span>
          </h2>
          <p className="section-subtitle-editorial">
            {t("agendaSubtitle")}
          </p>
        </div>

        {/* 6 Mission Cards Grid */}
        <div className="agenda-cards-grid">
          {agendas.map((item) => {
            const displayTitle = (isEnglish && item.titleEn) ? item.titleEn : item.title;
            const displayDesc = (isEnglish && item.descriptionEn) ? item.descriptionEn : item.description;
            const displayLocation = (isEnglish && item.locationEn) ? item.locationEn : item.location;
            const displayDuration = (isEnglish && item.durationEn) ? item.durationEn : item.duration;
            const displayMonth = (isEnglish && item.monthEn) ? item.monthEn : item.month;
            const displayBadge1 = (isEnglish && item.badge1En) ? item.badge1En : item.badge1;
            const displayBadge2 = (isEnglish && item.badge2En) ? item.badge2En : item.badge2;

            return (
              <div key={item.id} className="agenda-card">
                <div className="agenda-card-top">
                  <div className="agenda-date-stamp">
                    <div className="agenda-day">{item.day}</div>
                    <div className="agenda-month">{displayMonth}</div>
                  </div>

                  <div className="agenda-meta-badges">
                    {displayBadge1 && <span className="agenda-mission-badge">{displayBadge1}</span>}
                    {displayBadge2 && (
                      <span className={`agenda-mission-badge ${item.isBadge2Gold ? "badge-gold" : ""}`}>
                        {displayBadge2}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="agenda-card-title">{displayTitle}</h3>
                <p className="agenda-card-desc">{displayDesc}</p>

                <div className="agenda-card-details">
                  <div className="agenda-detail-row">
                    <span>📍 {displayLocation}</span>
                  </div>
                  <div className="agenda-detail-row">
                    <span>⏱ {displayDuration}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCardClick(item)}
                  className="agenda-card-cta-btn"
                >
                  <span>{t("agendaCardCta", "Nous contacter pour en savoir plus →")}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Note */}
        <div className="agenda-disclaimer-note">
          {t("agendaDisclaimerNote")}
        </div>

        {/* Foot CTA */}
        <div className="agenda-foot-cta-wrap">
          <button
            type="button"
            onClick={handleFootCtaClick}
            className="agenda-foot-cta-btn"
          >
            <span>{t("agendaFootCta", "Vous souhaitez participer ou en savoir plus ? Nous contacter →")}</span>
          </button>
        </div>

        {/* =========================================================
            03 · CALENDRIER STRATÉGIQUE (Une montée en puissance progressive)
            Feuille de route pluriannuelle : 2026–2029, 2026–2036, Horizon
            Harmonisé avec le style clair & institutionnel du site
            ========================================================= */}
        <div className="agenda-roadmap-module">
          <div className="agenda-roadmap-divider">
            <div className="divider-line" />
            <span className="divider-tag">
              <Compass size={14} />
              <span>{t("progCalendarEyebrow", "03 · Calendrier")}</span>
            </span>
            <div className="divider-line" />
          </div>

          <div className="agenda-roadmap-header">
            <h3 className="agenda-roadmap-title">
              {t("progCalendarTitle", "Une montée en puissance")}{" "}
              <span className="text-highlight-green">{t("progCalendarTitleHighlight", "progressive")}</span>
            </h3>
            <p className="agenda-roadmap-subtitle">
              {isEnglish 
                ? "A structured three-phase rollout, from the Cameroonian pilot laboratory to the Central African regional network." 
                : "Une feuille de route structurée en trois phases clés, du laboratoire pilote camerounais au réseau régional de référence."}
            </p>
          </div>

          <div className="agenda-roadmap-grid">
            {CALENDAR_STEPS.map((step, idx) => (
              <div key={idx} className="roadmap-phase-card">
                <div className="roadmap-phase-top">
                  <span className="roadmap-phase-badge">
                    {`Phase ${step.phase}`}
                  </span>
                  <span className="roadmap-phase-year">{step.year}</span>
                </div>

                <div className="roadmap-phase-icon-wrap">
                  {idx === 0 && <MapPin size={22} />}
                  {idx === 1 && <Globe size={22} />}
                  {idx === 2 && <Sparkles size={22} />}
                </div>

                <h4 className="roadmap-phase-title">
                  {isEnglish ? step.titleEn : step.title}
                </h4>

                <p className="roadmap-phase-desc">
                  {isEnglish ? step.descEn : step.desc}
                </p>

                <div className="roadmap-phase-footer">
                  <span className="roadmap-phase-pill">
                    <CheckCircle2 size={13} />
                    <span>{isEnglish ? step.tagEn : step.tag}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Agenda Action */}
        <div className="section-footer-action">
          <button 
            onClick={() => {
              setIsNavigating(true);
              if (onNavigateAllAgenda) {
                onNavigateAllAgenda();
              } else {
                window.location.hash = "#agenda-complet";
              }
              setTimeout(() => setIsNavigating(false), 1200);
            }}
            disabled={isNavigating}
            className={`btn btn-outline-forest btn-lg ${isNavigating ? "btn-navigating" : ""}`}
          >
            {isNavigating ? (
              <>
                <span className="btn-spinner-ring"></span>
                <span>{isEnglish ? "Loading calendar..." : "Chargement du calendrier..."}</span>
              </>
            ) : (
              <>
                <span>{t("allAgendaViewAllBtn")}</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
