import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { api } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

const PREMIUM_COHORTS = [
  {
    id: "cohort-1",
    day: "11",
    month: "Nov",
    year: "2026",
    startDate: "2026-11-11T09:00:00.000Z",
    type: "Formation régionale",
    typeEn: "Regional Training",
    seats: "40 places",
    seatsEn: "40 seats",
    title: "Investigation climat & écriture de solutions",
    titleEn: "Climate Investigation & Solutions Reporting",
    description: "Atelier intensif de 3 jours réunissant 40 délégués de clubs de presse : cartographie des sources, déconstruction des fausses nouvelles écologiques et interview de terrain.",
    descriptionEn: "3-day intensive workshop convening 40 press club delegates: mapping sources, debunking ecological fake news, and field interviews.",
    location: "Yaoundé · Centre régional des médias & hybride",
    locationEn: "Yaoundé · Regional Media Hub & Hybrid",
    duration: "Session intensive 3 jours",
    durationEn: "3-day intensive session"
  },
  {
    id: "cohort-2",
    day: "19",
    month: "Nov",
    year: "2026",
    startDate: "2026-11-19T14:00:00.000Z",
    type: "Masterclass virtuelle",
    typeEn: "Virtual Masterclass",
    seats: "Accès libre",
    seatsEn: "Open access",
    title: "Podcast environnemental avec un smartphone",
    titleEn: "Environmental Podcast with a Smartphone",
    description: "Les bases de la prise de son mobile, du montage audio léger et du storytelling sonore au cœur des forêts et des quartiers urbains africains.",
    descriptionEn: "The fundamentals of mobile field recording, lightweight audio editing, and sound storytelling in the heart of African forests and urban neighborhoods.",
    location: "En direct sur JEDDIAC Live & radios partenaires",
    locationEn: "Live on JEDDIAC Stream & partner radios",
    duration: "Masterclass 2h30 + exercice",
    durationEn: "2.5-hour masterclass + exercise"
  },
  {
    id: "cohort-3",
    day: "13",
    month: "Déc",
    year: "2026",
    startDate: "2026-12-13T09:00:00.000Z",
    type: "Conférence régionale",
    typeEn: "Regional Conference",
    seats: "Délégations",
    seatsEn: "Delegations",
    title: "Forum des jeunes médias d'Afrique centrale",
    titleEn: "Central African Youth Media Forum",
    description: "Rencontre plénière des délégations des pays de la CEMAC autour de la jeunesse médiatique et du développement durable.",
    descriptionEn: "Plenary summit of CEMAC youth delegations focused on youth media and sustainable development.",
    location: "Douala · Retransmission panafricaine",
    locationEn: "Douala · Panafrican Broadcast",
    duration: "Forum de 2 jours",
    durationEn: "2-day forum"
  }
];

const CALENDAR_STEPS = [
  {
    year: "2026 – 2029",
    title: "Phase pilote · Cameroun",
    titleEn: "Pilot Phase · Cameroon",
    desc: "Déploiement progressif dans les 10 régions, en s'appuyant sur les établissements scolaires et universitaires, les radios communautaires et les structures de jeunesse.",
    descEn: "Gradual deployment across the 10 administrative regions, partnering with academic institutions, community radios, and youth hubs."
  },
  {
    year: "2026 – 2036",
    title: "Extension régionale · CEMAC",
    titleEn: "Regional Expansion · CEMAC",
    desc: "Élargissement progressif au Gabon, au Congo, à la République centrafricaine, au Tchad et à la Guinée équatoriale.",
    descEn: "Progressive expansion into Gabon, Republic of Congo, Central African Republic, Chad, and Equatorial Guinea."
  },
  {
    year: "Horizon",
    title: "Réseau régional de référence",
    titleEn: "Flagship Regional Network",
    desc: "Le premier réseau régional de jeunes médias engagés pour le développement durable en Afrique centrale.",
    descEn: "Central Africa's premier youth-led media network dedicated to sustainable ecological development."
  }
];

export default function AgendaSection({ onOpenApplication, onNavigateAllAgenda }) {
  const { t, isEnglish } = useLanguage();
  const [agendas, setAgendas] = useState(PREMIUM_COHORTS);
  const [loading, setLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    loadAgendas();
  }, []);

  const loadAgendas = async () => {
    try {
      const res = await api.getAgendas("?limit=3");
      if (res && res.values && res.values.length > 0) {
        // Harmonize with API registration IDs while guaranteeing exact official text
        const merged = PREMIUM_COHORTS.map((cohort, idx) => {
          const apiItem = res.values[idx];
          if (!apiItem) return cohort;
          return {
            ...cohort,
            id: apiItem.id || cohort.id,
            registrationLink: apiItem.registrationLink
          };
        });
        setAgendas(merged);
      } else {
        setAgendas(PREMIUM_COHORTS);
      }
    } catch (err) {
      console.warn("Using official pedagogical cohorts reference:", err.message);
      setAgendas(PREMIUM_COHORTS);
    }
  };

  return (
    <section id="agenda" className="agenda-editorial-section">
      <div className="container">
        {/* =========================================================
            03 · CALENDRIER STRATÉGIQUE (Une montée en puissance progressive)
            Feuille de route pluriannuelle : 2026–2029, 2026–2036, Horizon
            ========================================================= */}
        <div className="agenda-roadmap-card">
          <div className="roadmap-header">
            <div className="roadmap-tag-pill">
              <Calendar size={14} />
              <span>{t("progCalendarEyebrow", "03 · Calendrier")}</span>
            </div>
            <h2 className="roadmap-title">
              {t("progCalendarTitle", "Une montée en puissance")}{" "}
              <span className="text-highlight-gold">{t("progCalendarTitleHighlight", "progressive")}</span>
            </h2>
          </div>

          <div className="roadmap-tl">
            {CALENDAR_STEPS.map((step, idx) => (
              <div key={idx} className="roadmap-tl-item">
                <div className="roadmap-tl-marker">
                  <span className="roadmap-tl-dot" />
                </div>
                <div className="roadmap-tl-body">
                  <div className="roadmap-tl-year">{step.year}</div>
                  <h3 className="roadmap-tl-heading">{isEnglish ? step.titleEn : step.title}</h3>
                  <p className="roadmap-tl-desc">{isEnglish ? step.descEn : step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header for Upcoming Sessions & Cohorts */}
        <div className="section-header agenda-sessions-header">
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
              const displayDay = item.day || (item.startDate ? new Date(item.startDate).toLocaleDateString(isEnglish ? "en-US" : "fr-FR", { day: "2-digit" }) : "11");
              const displayMonth = isEnglish 
                ? (item.month === "Déc" ? "DEC" : (item.month || "NOV").toUpperCase())
                : (item.month || "NOV").toUpperCase();
              const displayYear = item.year || (item.startDate ? new Date(item.startDate).getFullYear() : "2026");

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
                      <span className="agenda-day">{displayDay}</span>
                      <span className="agenda-month">{displayMonth}</span>
                      <span className="agenda-year">{displayYear}</span>
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
                      <span>{isEnglish ? "Apply →" : "Postuler →"}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Disclaimer Note from jeddiac_site_premium.html */}
        <div className="agenda-disclaimer-note">
          {t("agendaDisclaimerNote", isEnglish 
            ? "Session dates and formats are indicative and will be confirmed according to mobilized partnerships and local conditions." 
            : "Les dates et formats des sessions sont indicatifs et seront confirmés selon les partenariats mobilisés et les conditions locales."
          )}
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
