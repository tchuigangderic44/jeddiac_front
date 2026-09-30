import React, { useState, useEffect } from "react";
import { Bell, Calendar, ArrowRight, Clock, X } from "lucide-react";
import { api } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

const NEWS_DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80"
];

export default function NewsSection({ onNavigateAllNews }) {
  const { t, isEnglish } = useLanguage();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const res = await api.getNews();
      if (res && res.values) {
        setNews(res.values);
      }
    } catch (err) {
      console.error("Failed to load news:", err);
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
            Suivez les annonces majeures, les jalons de la phase pilote et les partenariats institutionnels du programme JEDDIAC.
          </p>
        </div>

        {loading ? (
          <div className="loading-state-container">
            <div className="spinner"></div>
            <p>Chargement des actualités en cours...</p>
          </div>
        ) : (
          <div className="news-cards-grid">
            {news.map((item, index) => {
              const imageSrc = item.imageUrl || NEWS_DEFAULT_IMAGES[index % NEWS_DEFAULT_IMAGES.length];
              return (
                <article key={item.id} className="news-editorial-card">
                  <div className="news-card-photo-wrap">
                    <img 
                      src={imageSrc} 
                      alt={item.title} 
                      className="news-card-photo" 
                      loading="lazy" 
                    />
                    <span className="news-category-badge">
                      {item.category || "Communiqué"}
                    </span>
                  </div>

                  <div className="news-card-body">
                    <div className="news-meta-row">
                      <span className="news-meta-date">
                        <Calendar size={13} />
                        {new Date(item.publishedAt || item.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                      <span className="news-meta-readtime">
                        <Clock size={13} />
                        3 min de lecture
                      </span>
                    </div>

                    <h3 className="news-card-title">{item.title}</h3>
                    <p className="news-card-excerpt">{item.summary}</p>

                    <div className="news-card-footer">
                      <button 
                        onClick={() => setSelectedNews(item)}
                        className="btn-read-news"
                      >
                        <span>Lire le communiqué</span>
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
      {selectedNews && (
        <div className="modal-overlay" onClick={() => setSelectedNews(null)}>
          <div className="modal-card article-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedNews(null)}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <span className="badge badge-green-light" style={{ marginBottom: "1rem" }}>
              {selectedNews.category || "Communiqué Officiel"}
            </span>

            <h2 style={{ fontSize: "1.8rem", color: "#13221B", lineHeight: "1.3", marginBottom: "1rem" }}>
              {selectedNews.title}
            </h2>

            <div style={{ display: "flex", gap: "1.2rem", color: "#6A8278", fontSize: "0.88rem", marginBottom: "1.5rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Calendar size={14} />
                {new Date(selectedNews.publishedAt || selectedNews.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>

            <div style={{ color: "#2B4036", lineHeight: "1.8", fontSize: "1.05rem" }}>
              <p style={{ fontWeight: 600, fontSize: "1.15rem", marginBottom: "1.2rem", color: "#13221B" }}>
                {selectedNews.summary}
              </p>
              <p>{selectedNews.content || selectedNews.summary}</p>
            </div>

            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #E5EBE7", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setSelectedNews(null)} className="btn btn-forest">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
