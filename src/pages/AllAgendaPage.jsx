import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ArrowRight, ArrowLeft, Search, X } from "lucide-react";
import { api } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { OFFICIAL_AGENDA } from "../data/officialAgenda";

export default function AllAgendaPage({ onBackToHome, onOpenApplication }) {
  const { t, isEnglish } = useLanguage();
  const [agendas, setAgendas] = useState(OFFICIAL_AGENDA);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadAgendas();
  }, []);

  const loadAgendas = async () => {
    try {
      setLoading(true);
      const res = await api.getAgendas("?limit=100");
      if (res && res.values && res.values.length > 0) {
        setAgendas(res.values);
      } else {
        setAgendas(OFFICIAL_AGENDA);
      }
    } catch (err) {
      console.warn("Using fallback official agendas:", err);
      setAgendas(OFFICIAL_AGENDA);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgendas = agendas.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.titleEn && item.titleEn.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.descriptionEn && item.descriptionEn.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.locationEn && item.locationEn.toLowerCase().includes(q)) ||
      (item.type && item.type.toLowerCase().includes(q)) ||
      (item.typeEn && item.typeEn.toLowerCase().includes(q))
    );
  });

  const handleCardClick = (item) => {
    const title = isEnglish && item.titleEn ? item.titleEn : item.title;
    if (onOpenApplication) {
      onOpenApplication(`Mission Cameroun — ${title}`);
    } else {
      window.location.hash = "#contact";
    }
  };

  return (
    <div className="dedicated-page-wrapper">
      {/* Header Banner */}
      <div className="dedicated-page-header">
        <div className="container">
          <div className="section-tag-pill">
            <Calendar size={16} />
            <span>{t("allAgendaTag")}</span>
          </div>

          <div className="dedicated-back-btn-wrapper">
            <button 
              onClick={onBackToHome} 
              className="btn btn-header-back"
              aria-label={t("backToHome")}
              title={t("backToHome")}
            >
              <ArrowLeft size={18} />
              <span>{t("backToHome")}</span>
            </button>
          </div>

          <h1 className="dedicated-page-title">
            {t("allAgendaTitle")} <span className="text-highlight-green">{t("allAgendaTitleHighlight")}</span>
          </h1>

          <p className="dedicated-page-subtitle">
            {t("allAgendaSubtitle")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container dedicated-page-content">
        {/* Controls Bar */}
        <div className="dedicated-controls-bar">
          <div className="dedicated-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder={t("allAgendaSearchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dedicated-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="search-clear-btn" title="Effacer">
                <X size={15} />
              </button>
            )}
          </div>

          <div className="dedicated-sort-group">
            <span className="results-counter-pill">
              <strong>{filteredAgendas.length}</strong> {t("allAgendaCount")}
            </span>
          </div>
        </div>

        {/* Loading or Empty or Grid */}
        {loading ? (
          <div className="loading-state-container">
            <div className="spinner"></div>
            <p>{t("loading")}</p>
          </div>
        ) : filteredAgendas.length === 0 ? (
          <div className="dedicated-empty-state">
            <Calendar size={48} />
            <p>{isEnglish ? "No training session found matching your criteria." : "Aucune étape trouvée pour cette recherche."}</p>
            <button
              onClick={() => setSearchQuery("")}
              className="btn btn-outline-forest btn-sm"
              style={{ marginTop: "1rem" }}
            >
              {isEnglish ? "Reset Search" : "Réinitialiser la recherche"}
            </button>
          </div>
        ) : (
          <div className="agenda-cards-grid dedicated-grid">
            {filteredAgendas.map((item, idx) => {
              const matchedOfficial = OFFICIAL_AGENDA.find((o) => o.id === item.id || o.title === item.title) || OFFICIAL_AGENDA[idx] || {};

              const day = item.day || matchedOfficial.day || (item.startDate ? new Date(item.startDate).toLocaleDateString(isEnglish ? "en-US" : "fr-FR", { day: "2-digit" }) : "20");
              const month = (isEnglish && (item.monthEn || matchedOfficial.monthEn)) ? (item.monthEn || matchedOfficial.monthEn) : (item.month || matchedOfficial.month || "Nov 2026");
              
              const displayTitle = (isEnglish && item.titleEn) ? item.titleEn : item.title;
              const displayDesc = (isEnglish && item.descriptionEn) ? item.descriptionEn : item.description;
              const displayLocation = (isEnglish && item.locationEn) 
                ? item.locationEn 
                : (item.location || matchedOfficial.location || "Cameroun");
              const displayDuration = (isEnglish && item.durationEn) 
                ? item.durationEn 
                : (item.duration || matchedOfficial.duration || "Mission 2026");

              const badge1 = (isEnglish && (item.badge1En || matchedOfficial.badge1En))
                ? (item.badge1En || matchedOfficial.badge1En)
                : (item.badge1 || matchedOfficial.badge1 || item.type);
              const badge2 = (isEnglish && (item.badge2En || matchedOfficial.badge2En))
                ? (item.badge2En || matchedOfficial.badge2En)
                : (item.badge2 || matchedOfficial.badge2 || item.seats);

              return (
                <div key={item.id} className="agenda-card">
                  <div className="agenda-card-top">
                    <div className="agenda-date-stamp">
                      <div className="agenda-day">{day}</div>
                      <div className="agenda-month">{month}</div>
                    </div>

                    <div className="agenda-meta-badges">
                      {badge1 && <span className="agenda-mission-badge">{badge1}</span>}
                      {badge2 && (
                        <span className={`agenda-mission-badge ${matchedOfficial.isBadge2Gold !== false ? "badge-gold" : ""}`}>
                          {badge2}
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
        )}
      </div>
    </div>
  );
}
