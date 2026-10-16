import React, { useState, useEffect } from "react";
import { Bell, Calendar, ArrowRight, Clock, X, Sparkles, Filter } from "lucide-react";
import { api, getMediaUrl } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { OFFICIAL_NEWS } from "../data/officialNews";
import EnrichedArticleContent from "./EnrichedArticleContent";

const THEMATIC_CATEGORIES = [
  { fr: "Médias & Formation", en: "Media & Training", icon: "🎙️" },
  { fr: "Environnement & Déchets", en: "Environment & Waste", icon: "🌱" },
  { fr: "Eau & Biodiversité", en: "Water & Biodiversity", icon: "💧" },
  { fr: "Alimentation & Cantine", en: "Food & School Canteen", icon: "🥗" },
  { fr: "Innovation & Réemploi", en: "Innovation & Reuse", icon: "🔄" },
  { fr: "Rencontres & Restitution", en: "Dialogue & Restitution", icon: "🏛️" }
];

export default function NewsSection({ onNavigateAllNews, onOpenApplication }) {
  const { t, isEnglish } = useLanguage();
  const [news, setNews] = useState(OFFICIAL_NEWS.slice(0, 3));
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const res = await api.getNews("?limit=3");
      if (res && res.values && res.values.length > 0) {
        setNews(res.values.slice(0, 3));
      } else {
        setNews(OFFICIAL_NEWS.slice(0, 3));
      }
    } catch (err) {
      console.warn("Using official news fallback:", err);
      setNews(OFFICIAL_NEWS.slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="programme" className="news-editorial-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag-pill">
            <Bell size={16} />
            <span>Actualités & Communiqués Officiels</span>
          </div>
          <h2 className="section-title-editorial">
            Le Programme <span className="text-highlight-green">en Action</span>
          </h2>
          <p className="section-subtitle-editorial">
            Suivez les annonces majeures, les jalons de la phase pilote et les fiches d'action concrètes du programme JEDDIAC.
          </p>

          {/* Quick Thematic Filters */}
          <div className="news-home-thematic-pills">
            {THEMATIC_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onNavigateAllNews && onNavigateAllNews(isEnglish ? cat.en : cat.fr)}
                className="news-home-thematic-pill"
                title={isEnglish ? `View all ${cat.en} initiatives` : `Voir toutes les actions ${cat.fr}`}
              >
                <span>{isEnglish ? cat.en : cat.fr}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading-state-container">
            <div className="spinner"></div>
            <p>Chargement des actualités en cours...</p>
          </div>
        ) : (
          <div className="news-cards-grid">
            {news.map((item) => {
              const imageSrc = item.coverImage ? getMediaUrl(item.coverImage) : null;
              const title = (isEnglish && item.titleEn) ? item.titleEn : item.title;
              const category = (isEnglish && item.categoryEn) ? item.categoryEn : (item.category || (isEnglish ? "Official Dispatch" : "Communiqué"));
              const summary = (isEnglish && item.summaryEn) ? item.summaryEn : item.summary;
              const tags = (isEnglish && item.tagsEn) ? item.tagsEn : item.tags;

              return (
                <article key={item.id} className="news-editorial-card">
                  <div className="news-card-photo-wrap">
                    {imageSrc ? (
                      <img 
                        src={imageSrc} 
                        alt={title} 
                        className="news-card-photo" 
                        loading="lazy" 
                      />
                    ) : (
                      <div className="news-card-default-bg">
                        <div className="news-card-default-brand">
                          <img 
                            src="/assets/jeddiac-lineaire-blanc.png" 
                            alt="JEDDIAC" 
                            className="news-card-default-logo"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                          <span className="news-card-default-caption">
                            {category}
                          </span>
                        </div>
                      </div>
                    )}
                    <span className="news-category-badge">
                      {category}
                    </span>
                  </div>

                  <div className="news-card-body">

                    <h3 className="news-card-title">{title}</h3>
                    <p className="news-card-excerpt">{summary}</p>

                    {tags && (
                      <div className="news-tags-row">
                        {tags.split(",").slice(0, 3).map((tag, i) => (
                          <span key={i} className="news-tag-bubble">
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="news-card-footer">
                      <button 
                        onClick={() => setSelectedNews(item)}
                        className="btn-read-news"
                      >
                        <span>{isEnglish ? "Read dispatch" : "Lire le communiqué"}</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* View All News Button */}
        <div className="section-footer-action">
          <button 
            onClick={() => {
              setIsNavigating(true);
              if (onNavigateAllNews) {
                onNavigateAllNews();
              } else {
                window.location.hash = "#toutes-les-actualites";
              }
              setTimeout(() => setIsNavigating(false), 1200);
            }}
            disabled={isNavigating}
            className={`btn btn-outline-forest btn-lg ${isNavigating ? "btn-navigating" : ""}`}
          >
            {isNavigating ? (
              <>
                <span className="btn-spinner-ring"></span>
                <span>{isEnglish ? "Loading..." : "Chargement..."}</span>
              </>
            ) : (
              <>
                <span>{t("allNewsViewAllBtn")}</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedNews && (() => {
        const modalTitle = (isEnglish && selectedNews.titleEn) ? selectedNews.titleEn : selectedNews.title;
        const modalCategory = (isEnglish && selectedNews.categoryEn) ? selectedNews.categoryEn : (selectedNews.category || (isEnglish ? "Official Dispatch" : "Communiqué Officiel"));
        const modalSummary = (isEnglish && selectedNews.summaryEn) ? selectedNews.summaryEn : selectedNews.summary;
        const modalContent = (isEnglish && selectedNews.contentEn) ? selectedNews.contentEn : (selectedNews.content || selectedNews.summary);
        const modalTags = (isEnglish && selectedNews.tagsEn) ? selectedNews.tagsEn : selectedNews.tags;

        return (
          <div className="modal-overlay" onClick={() => setSelectedNews(null)}>
            <div className="modal-card article-modal-card" onClick={(e) => e.stopPropagation()}>
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedNews(null)}
                aria-label={isEnglish ? "Close" : "Fermer"}
              >
                <X size={20} />
              </button>

              <span className="badge badge-green-light" style={{ marginBottom: "1rem" }}>
                {modalCategory}
              </span>

              <div style={{ marginBottom: "1.25rem", borderRadius: "10px", overflow: "hidden", maxHeight: "260px" }}>
                {selectedNews.coverImage ? (
                  <img 
                    src={getMediaUrl(selectedNews.coverImage)} 
                    alt={modalTitle} 
                    style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }} 
                  />
                ) : (
                  <div className="news-card-default-bg" style={{ height: "180px" }}>
                    <div className="news-card-default-brand">
                      <img 
                        src="/assets/jeddiac-lineaire-blanc.png" 
                        alt="JEDDIAC" 
                        className="news-card-default-logo"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                      <span className="news-card-default-caption">
                        {modalCategory}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <h2 style={{ fontSize: "1.8rem", color: "#13221B", lineHeight: "1.3", marginBottom: "1rem" }}>
                {modalTitle}
              </h2>

              <div style={{ display: "flex", gap: "1.2rem", color: "#6A8278", fontSize: "0.88rem", marginBottom: "1.5rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Calendar size={14} />
                  {new Date(selectedNews.publishedAt || selectedNews.createdAt).toLocaleDateString(isEnglish ? "en-US" : "fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>

              <div style={{ color: "#2B4036", lineHeight: "1.8", fontSize: "1.05rem" }}>
                {modalSummary && (
                  <p style={{ fontWeight: 600, fontSize: "1.15rem", marginBottom: "1.2rem", color: "#13221B" }}>
                    {modalSummary}
                  </p>
                )}
                <EnrichedArticleContent
                  content={modalContent}
                  title={modalTitle}
                  isEnglish={isEnglish}
                  onProposeInitiative={(title) => {
                    setSelectedNews(null);
                    if (onOpenApplication) {
                      onOpenApplication(title);
                    }
                  }}
                />
              </div>

              {modalTags && (
                <div className="news-tags-row" style={{ marginTop: "1.5rem" }}>
                  {modalTags.split(",").map((tag, i) => (
                    <span key={i} className="news-tag-bubble">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #E5EBE7", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setSelectedNews(null)} className="btn btn-forest">
                  {isEnglish ? "Close" : "Fermer"}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
