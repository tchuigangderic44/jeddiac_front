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
      const res = await api.getAgendas();
      if (res && res.values) {
        setAgendas(res.values);
      }
    } catch (err) {
      console.error("Failed to load agendas:", err);
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
            <span>Calendrier Pédagogique & Masterclasses</span>
          </div>
          <h2 className="section-title-editorial">
            Prochaines Sessions & <span className="text-highlight-green">Formations Régionales</span>
          </h2>
          <p className="section-subtitle-editorial">
            Inscrivez votre rédaction scolaire, radio communautaire ou collectif de jeunes reporters aux prochaines cohortes certifiantes.
          </p>
        </div>

        {loading ? (
          <div className="loading-state-container">
            <div className="spinner"></div>
            <p>Chargement des dates du programme...</p>
          </div>
        ) : (
          <div className="agenda-cards-grid">
            {agendas.map((item) => {
              const dateObj = new Date(item.startDate || item.createdAt);
              const dayStr = dateObj.toLocaleDateString("fr-FR", { day: "2-digit" });
              const monthStr = dateObj.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase();
              const yearStr = dateObj.getFullYear();

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
                      <span className="badge badge-green-light">{item.type || "Formation"}</span>
                      <span className="badge badge-gold-light">Places Limitées</span>
                    </div>
                  </div>

                  <h3 className="agenda-card-title">{item.title}</h3>
                  <p className="agenda-card-desc">{item.description}</p>

                  <div className="agenda-card-details">
                    <div className="agenda-detail-row">
                      <MapPin size={15} className="detail-icon" />
                      <span>{item.location || "Yaoundé & En ligne (Bimodal)"}</span>
                    </div>
                    <div className="agenda-detail-row">
                      <Clock size={15} className="detail-icon" />
                      <span>{item.duration || "Session intensive 3 jours"}</span>
                    </div>
                  </div>

                  <div className="agenda-card-footer">
                    <button
                      onClick={() => onOpenApplication(`Inscription Session: ${item.title}`)}
                      className="btn btn-forest"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <span>Postuler à cette cohorte</span>
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
