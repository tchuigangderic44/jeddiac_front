import React, { useState, useEffect } from "react";
import { BookOpen, Eye, Calendar, ArrowRight, X, Share2, Tag, User, Clock } from "lucide-react";
import { api } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

const ARTICLE_PHOTO_MAP = {
  "bassin-du-congo-deuxieme-poumon-de-la-terre": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
  "du-constat-a-l-action-journalisme-de-solutions": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80",
  "radios-communautaires-en-milieu-rural": "https://images.unsplash.com/photo-1589903102059-7667b384237b?w=800&auto=format&fit=crop&q=80",
  "entretien-jean-marie-kenfack-porteur-du-programme": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
};

const DEFAULT_ARTICLE_PHOTOS = [
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=80"
];

export default function ArticlesSection({ onNavigateAllArticles }) {
  const { t, isEnglish } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const res = await api.getArticles();
      if (res && res.values) {
        setArticles(res.values);
      }
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "all",
    "Investigation & Climat",
    "Médias & Méthodes",
    "Territoires & Communautés",
    "Tribune & Entretien"
  ];

  const filtered = activeCategory === "all"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <section id="articles" className="articles-editorial-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag-pill">
            <BookOpen size={16} />
            <span>Journalisme de Solutions & Investigations</span>
          </div>
          <h2 className="section-title-editorial">
            Les Enquêtes & <span className="text-highlight-green">Grands Reportages</span>
          </h2>
          <p className="section-subtitle-editorial">
            Une presse rigoureuse, indépendante et engagée : les investigations rédigées par nos cohortes de jeunes journalistes et universitaires.
          </p>
        </div>

        {/* Category Filters */}
        <div className="articles-cat-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`article-cat-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat === "all" ? "Toutes les enquêtes" : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="loading-state-container">
            <div className="spinner"></div>
            <p>Chargement des publications...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="articles-empty-state">
            <p>Aucune publication trouvée dans cette catégorie.</p>
          </div>
        ) : (
          <div className="articles-magazine-grid">
            {filtered.map((item, idx) => {
              const photo = ARTICLE_PHOTO_MAP[item.slug] || DEFAULT_ARTICLE_PHOTOS[idx % DEFAULT_ARTICLE_PHOTOS.length];
              return (
                <article key={item.id} className="article-magazine-card">
                  {/* Real Image Container */}
                  <div className="article-photo-container">
                    <img 
                      src={photo} 
                      alt={item.title} 
                      className="article-card-image"
                      loading="lazy"
                    />
                    <span className="article-photo-badge">
                      {item.category || "Reportage"}
                    </span>
                    <span className="article-readtime-badge">
                      <Clock size={12} />
                      5 min
                    </span>
                  </div>

                  <div className="article-magazine-body">
                    <div className="article-meta-row">
                      <span className="article-meta-item">
                        <Calendar size={13} />
                        {new Date(item.publishedAt || item.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                      <span className="article-meta-item">
                        <Eye size={13} />
                        {item.viewsCount?.toLocaleString("fr-FR") || "1 200"} lectures
                      </span>
                    </div>

                    <h3 className="article-magazine-title">{item.title}</h3>
                    <p className="article-magazine-summary">{item.summary}</p>

                    <div className="article-magazine-footer">
                      <span className="article-tag-item">
                        <Tag size={12} />
                        {item.tags?.split(",")[0] || "Bassin du Congo"}
                      </span>

                      <button
                        onClick={() => setSelectedArticle({ ...item, photo })}
                        className="btn-read-article"
                      >
                        <span>Lire l'enquête</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* View All Articles Action */}
        <div className="section-footer-action">
          <button 
            onClick={() => {
              setIsNavigating(true);
              if (onNavigateAllArticles) {
                onNavigateAllArticles();
              } else {
                window.location.hash = "#toutes-les-enquetes";
              }
              setTimeout(() => setIsNavigating(false), 1200);
            }}
            disabled={isNavigating}
            className={`btn btn-outline-forest btn-lg ${isNavigating ? "btn-navigating" : ""}`}
          >
            {isNavigating ? (
              <>
                <span className="btn-spinner-ring"></span>
                <span>{isEnglish ? "Loading investigations..." : "Chargement des enquêtes..."}</span>
              </>
            ) : (
              <>
                <span>{t("allArticlesViewAllBtn")}</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-card article-reader-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedArticle(null)}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            {/* Header with image */}
            <div className="modal-article-hero">
              <img src={selectedArticle.photo} alt={selectedArticle.title} />
              <div className="modal-article-hero-overlay">
                <span className="badge badge-green-light">{selectedArticle.category}</span>
                <h2>{selectedArticle.title}</h2>
              </div>
            </div>

            <div className="modal-article-body">
              <div className="modal-article-meta-bar">
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Calendar size={14} />
                  Publié le {new Date(selectedArticle.publishedAt || selectedArticle.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Eye size={14} />
                  {selectedArticle.viewsCount || 0} consultations
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Tag size={14} />
                  {selectedArticle.tags}
                </span>
              </div>

              <div className="modal-article-chapo">
                {selectedArticle.summary}
              </div>

              <div className="modal-article-text">
                <p>{selectedArticle.content || selectedArticle.summary}</p>
                
                <div className="article-quote-box">
                  <p>
                    « L'information vérifiée sur la biodiversité du Bassin du Congo est le premier levier de défense de notre souveraineté environnementale. »
                  </p>
                  <span>— Rédaction d'enquête JEDDIAC</span>
                </div>
              </div>

              <div className="modal-article-footer">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="btn btn-forest"
                >
                  Fermer la lecture
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
