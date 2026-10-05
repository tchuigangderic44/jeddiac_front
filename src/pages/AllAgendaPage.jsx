import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ArrowRight, ArrowLeft, Search, X, Sparkles, Filter, CheckCircle2, Award, Users } from "lucide-react";
import { api } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

export default function AllAgendaPage({ onBackToHome, onOpenApplication }) {
  const { t, isEnglish } = useLanguage();
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadAgendas();
  }, []);

  const loadAgendas = async () => {
    try {
      setLoading(true);
      const res = await api.getAgendas("?limit=100");
      if (res && res.values) {
        setAgendas(res.values);
      } else {
        setAgendas([]);
      }
    } catch (err) {
      console.error("Failed to load agendas from API:", err);
      setAgendas([]);
    } finally {
      setLoading(false);
    }
  };

  const sessionTypes = [
    { id: "all", label: isEnglish ? "All Sessions" : "Toutes les sessions" },
    { id: "Formation Régionale", label: isEnglish ? "Regional Trainings" : "Formations Régionales" },
    { id: "Masterclass Virtuelle", label: isEnglish ? "Virtual Masterclasses" : "Masterclasses Virtuelles" },
    { id: "Conférence Régionale", label: isEnglish ? "Forums & Conferences" : "Forums & Conférences" }
  ];

  const filteredAgendas = agendas.filter((item) => {
    const itemTypeFr = item.type || "";
    const itemTypeEn = item.typeEn || "";

    const matchType =
      selectedType === "all" ||
      itemTypeFr === selectedType ||
      (selectedType === "Formation Régionale" && (itemTypeFr.includes("Formation") || itemTypeEn.includes("Training"))) ||
      (selectedType === "Masterclass Virtuelle" && (itemTypeFr.includes("Masterclass") || itemTypeEn.includes("Masterclass"))) ||
      (selectedType === "Conférence Régionale" && (itemTypeFr.includes("Conférence") || itemTypeFr.includes("Forum") || itemTypeEn.includes("Conference") || itemTypeEn.includes("Forum")));

    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.titleEn && item.titleEn.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.descriptionEn && item.descriptionEn.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.locationEn && item.locationEn.toLowerCase().includes(q)) ||
      (item.type && item.type.toLowerCase().includes(q)) ||
      (item.typeEn && item.typeEn.toLowerCase().includes(q));

    return matchType && matchSearch;
  });

  return (
    <div className="dedicated-page-wrapper">
      {/* Header Banner */}
      <div className="dedicated-page-header">
        <div className="container">
          <div className="section-tag-pill">
            <Calendar size={16} />
            <span>{t("allAgendaTag")}</span>
          </div>

          {/* Bouton de retour avant la classe dedicated-page-title */}
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

        {/* Type Filter Pills */}
        <div className="dedicated-category-pills">
          {sessionTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`dedicated-cat-btn ${selectedType === type.id ? "active" : ""}`}
            >
              {type.label}
            </button>
          ))}
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
            <p>{isEnglish ? "No training session found matching your criteria." : "Aucune session trouvée dans cette catégorie."}</p>
            <button
              onClick={() => {
                setSelectedType("all");
                setSearchQuery("");
              }}
              className="btn btn-outline-forest btn-sm"
              style={{ marginTop: "1rem" }}
            >
              {isEnglish ? "Reset Filters" : "Réinitialiser les filtres"}
            </button>
          </div>
        ) : (
          <div className="agenda-cards-grid dedicated-grid">
            {filteredAgendas.map((item) => {
              const dateObj = new Date(item.startDate || item.createdAt);
              const dayStr = dateObj.toLocaleDateString(isEnglish ? "en-US" : "fr-FR", { day: "2-digit" });
              const monthStr = dateObj
                .toLocaleDateString(isEnglish ? "en-US" : "fr-FR", { month: "short" })
                .toUpperCase();
              const yearStr = dateObj.getFullYear();

              const displayTitle = (isEnglish && item.titleEn) ? item.titleEn : item.title;
              const displayDesc = (isEnglish && item.descriptionEn) ? item.descriptionEn : item.description;
              const displayLocation = (isEnglish && item.locationEn) 
                ? item.locationEn 
                : (item.location || (isEnglish ? "Yaoundé & Online (Hybrid)" : "Yaoundé & En ligne (Bimodal)"));
              const displayDuration = (isEnglish && item.durationEn) 
                ? item.durationEn 
                : (item.duration || (isEnglish ? "3-day intensive session" : "Session intensive 3 jours"));
              const displayType = (isEnglish && item.typeEn) 
                ? item.typeEn 
                : (item.type || (isEnglish ? "Regional Training" : "Formation"));
              const displaySeats = (isEnglish && item.seatsEn) 
                ? item.seatsEn 
                : (item.seats || (isEnglish ? "Limited Seats" : "Places Limitées"));
              const displayAudience = (isEnglish && item.audienceEn) 
                ? item.audienceEn 
                : item.audience;

              return (
                <div key={item.id} className="agenda-card">
                  <div className="agenda-card-top">
                    {/* Big Date Stamp */}
                    <div className="agenda-date-stamp">
                      <span className="agenda-day">{dayStr}</span>
                      <span className="agenda-month">{monthStr}</span>
                      <span className="agenda-year">{yearStr}</span>
                    </div>

                    <div className="agenda-meta-badges">
                      <span className="badge badge-green-light">{displayType}</span>
                      <span className="badge badge-gold-light">{displaySeats}</span>
                    </div>
                  </div>

                  <h3 className="agenda-card-title">{displayTitle}</h3>
                  <p className="agenda-card-desc">{displayDesc}</p>

                  <div className="agenda-card-details">
                    <div className="agenda-detail-row">
                      <MapPin size={15} className="detail-icon" />
                      <span>{displayLocation}</span>
                    </div>
                    <div className="agenda-detail-row">
                      <Clock size={15} className="detail-icon" />
                      <span>{displayDuration}</span>
                    </div>
                    {displayAudience && (
                      <div className="agenda-detail-row">
                        <Users size={15} className="detail-icon" />
                        <span>{displayAudience}</span>
                      </div>
                    )}
                  </div>

                  <div className="agenda-card-footer">
                    <button
                      onClick={() => onOpenApplication(`Inscription Session: ${displayTitle}`)}
                      className="btn btn-forest"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <span>{t("allAgendaApplyBtn")}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
