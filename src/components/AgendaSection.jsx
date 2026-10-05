import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { api } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

export default function AgendaSection({ onOpenApplication, onNavigateAllAgenda }) {
  const { t, isEnglish } = useLanguage();
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    loadAgendas();
  }, []);

  const loadAgendas = async () => {
    try {
      setLoading(true);
      const res = await api.getAgendas("?limit=3");
      if (res && res.values) {
        setAgendas(res.values.slice(0, 3));
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

  return (
    <section id="agenda" className="agenda-editorial-section">
      <div className="container">
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

        {loading ? (
          <div className="loading-state-container">
            <div className="spinner"></div>
            <p>{t("agendaLoading")}</p>
          </div>
        ) : agendas.length === 0 ? (
          <div className="loading-state-container" style={{ padding: "3rem" }}>
            <Calendar size={36} style={{ color: "#5A7367", marginBottom: "0.75rem" }} />
            <p style={{ color: "#5A7367" }}>
              {isEnglish ? "No upcoming cohort scheduled at the moment." : "Aucune session programmée pour le moment."}
            </p>
          </div>
        ) : (
          <div className="agenda-cards-grid">
            {agendas.map((item) => {
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
                : (item.location || t("agendaDefaultLocation"));
              const displayDuration = (isEnglish && item.durationEn) 
                ? item.durationEn 
                : (item.duration || t("agendaDefaultDuration"));
              const displayType = (isEnglish && item.typeEn) 
                ? item.typeEn 
                : (item.type || t("agendaDefaultType"));
              const displaySeats = (isEnglish && item.seatsEn) 
                ? item.seatsEn 
                : (item.seats || t("agendaSeats"));

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
                  </div>

                  <div className="agenda-card-footer">
                    <button
                      onClick={() => onOpenApplication(`Inscription Session: ${displayTitle}`)}
                      className="btn btn-forest"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <span>{t("agendaApplyBtn")}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
