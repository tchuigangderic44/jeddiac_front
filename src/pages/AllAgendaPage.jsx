import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ArrowRight, ArrowLeft, Search, X, Sparkles, Filter, CheckCircle2, Award, Users } from "lucide-react";
import { api } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

const FALLBACK_AGENDAS = [
  {
    id: "agenda-inaugurale-yaounde",
    title: "Session Inaugurale de Formation : Investigation Climat & Écriture de Solutions",
    type: "Formation Régionale",
    description: "Atelier intensif de 3 jours réunissant 40 délégués de clubs de presse scolaires et universitaires : cartographie des sources scientifiques, déconstruction des fausses nouvelles écologiques et techniques d'interview de terrain.",
    location: "Yaoundé · Centre Régional des Médias & Hybride",
    duration: "Session intensive 3 jours",
    startDate: "2026-10-11T09:00:00.000Z",
    endDate: "2026-10-13T17:00:00.000Z",
    status: "active",
    seats: "40 places disponibles",
    audience: "Lycéens & Étudiants"
  },
  {
    id: "agenda-masterclass-audio",
    title: "Masterclass Audio : Réaliser un Podcast Environnemental avec un Smartphone",
    type: "Masterclass Virtuelle",
    description: "Apprenez les bases de la prise de son mobile, du montage audio léger avec Audacity et du storytelling sonore au cœur des forêts et des quartiers urbains africains.",
    location: "En direct sur JEDDIAC Live & Radios partenaires",
    duration: "Masterclass 2h30 + Exercice pratique",
    startDate: "2026-10-19T14:00:00.000Z",
    endDate: "2026-10-19T16:30:00.000Z",
    status: "active",
    seats: "Accès libre sur inscription",
    audience: "Jeunes reporters & animateurs radio"
  },
  {
    id: "agenda-forum-douala",
    title: "Forum Sous-Régional des Jeunes Médias du Bassin du Congo",
    type: "Conférence Régionale",
    description: "Rencontre plénière des délégations du Cameroun, du Gabon, de RDC, du Congo-Brazzaville, de Centrafrique et du Tchad pour signer le Pacte de la Jeunesse Médiatique pour la Durabilité.",
    location: "Douala & Retransmission Panafricaine",
    duration: "Forum de 2 jours",
    startDate: "2026-11-13T08:30:00.000Z",
    endDate: "2026-11-15T18:00:00.000Z",
    status: "active",
    seats: "Délégations invitées & Observateurs",
    audience: "Chefs d'équipes & Partenaires institutionnels"
  },
  {
    id: "agenda-atelier-kinshasa",
    title: "Atelier Itinérant : Tourbières du Bassin du Congo & Enquêtes Carbone",
    type: "Formation Régionale",
    description: "Immersion scientifique guidée par des chercheurs en écologie pour vulgariser l'importance planétaire des tourbières du Bassin du Congo auprès du grand public.",
    location: "Kinshasa / Mbandaka & Distanciel",
    duration: "Atelier 4 jours terrain + rédaction",
    startDate: "2026-12-05T09:00:00.000Z",
    endDate: "2026-12-09T17:00:00.000Z",
    status: "upcoming",
    seats: "25 places sur sélection",
    audience: "Étudiants en journalisme & sciences"
  }
];

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
      const res = await api.getAgendas();
      if (res && res.values && res.values.length > 0) {
        // Merge with rich metadata
        const merged = res.values.map((item, idx) => ({
          ...FALLBACK_AGENDAS[idx % FALLBACK_AGENDAS.length],
          ...item
        }));
        setAgendas(merged);
      } else {
        setAgendas(FALLBACK_AGENDAS);
      }
    } catch (err) {
      console.warn("Using fallback agenda:", err);
      setAgendas(FALLBACK_AGENDAS);
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
    const matchType = selectedType === "all" || item.type === selectedType;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.type && item.type.toLowerCase().includes(q));
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
                      <span className="badge badge-gold-light">
                        {item.seats || (isEnglish ? "Limited Seats" : "Places Limitées")}
                      </span>
                    </div>
                  </div>

                  <h3 className="agenda-card-title">{item.title}</h3>
                  <p className="agenda-card-desc">{item.description}</p>

                  <div className="agenda-card-details">
                    <div className="agenda-detail-row">
                      <MapPin size={15} className="detail-icon" />
                      <span>{item.location || (isEnglish ? "Yaoundé & Online (Bimodal)" : "Yaoundé & En ligne (Bimodal)")}</span>
                    </div>
                    <div className="agenda-detail-row">
                      <Clock size={15} className="detail-icon" />
                      <span>{item.duration || (isEnglish ? "Intensive 3-Day Session" : "Session intensive 3 jours")}</span>
                    </div>
                    {item.audience && (
                      <div className="agenda-detail-row">
                        <Users size={15} className="detail-icon" />
                        <span>{item.audience}</span>
                      </div>
                    )}
                  </div>

                  <div className="agenda-card-footer">
                    <button
                      onClick={() => onOpenApplication(`Inscription Session: ${item.title}`)}
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
