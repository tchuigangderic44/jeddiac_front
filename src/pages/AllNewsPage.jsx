import React, { useState, useEffect } from "react";
import { Bell, Calendar, ArrowRight, ArrowLeft, Clock, Search, X, Tag, Sparkles, Filter } from "lucide-react";
import { api, getMediaUrl } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

const FALLBACK_NEWS = [
  {
    id: "news-pilot-launch",
    title: "Lancement officiel de la Phase Pilote Cameroun (Octobre 2026 – Mai 2027)",
    category: "Événement Majeur",
    summary: "Déploiement du programme JEDDIAC à travers les 10 régions du Cameroun, mobilisant 90 structures scolaires et communautaires.",
    content: "Le programme JEDDIAC annonce officiellement le coup d'envoi de sa phase pilote sur l'ensemble du territoire camerounais. Durant 8 mois intensifs, les formateurs et journalistes mentors parcourront les 10 régions pour équiper, former et mettre en réseau 90 structures scolaires, universitaires et associatives. L'objectif est de transformer les jeunes en producteurs actifs d'information sur la durabilité.",
    tags: "Cameroun, Pilote, Jeunesse, Médias",
    publishedAt: "2026-09-29T21:46:47.420Z"
  },
  {
    id: "news-afrive-alliance",
    title: "Alliance stratégique entre JEDDIAC et la revue internationale AFRIVE",
    category: "Partenariat",
    summary: "Une synergie éditoriale pour offrir une tribune panafricaine aux jeunes voix et journalistes émergents du Bassin du Congo.",
    content: "AFRIVE, revue internationale de référence dédiée au développement durable en Afrique, s'engage aux côtés de JEDDIAC. Cet accord garantit la co-production de cahiers spéciaux, le mentorat des jeunes rédactions par les journalistes d'investigation de la revue, ainsi qu'une diffusion à grande échelle des reportages réalisés par les clubs médias.",
    tags: "Partenariat, AFRIVE, Rayonnement, Plaidoyer",
    publishedAt: "2026-09-27T21:46:47.420Z"
  },
  {
    id: "news-call-applications",
    title: "Bassin du Congo : Appel à candidatures ouvert pour les radios scolaires et communautaires",
    category: "Appel à Projets",
    summary: "Rejoignez la première cohorte régionale d'apprentis journalistes environnementaux et animateurs de solutions durables.",
    content: "Les établissements scolaires, campus universitaires et associations de jeunes des zones rurales et urbaines peuvent dès à présent postuler pour intégrer le réseau JEDDIAC. Les structures sélectionnées bénéficieront de kits mobiles d'enregistrement, de formations certifiantes et d'un accompagnement éditorial complet.",
    tags: "Candidature, Radios Scolaires, Formation, Cohorte",
    publishedAt: "2026-09-24T21:46:47.420Z"
  }
];

export default function AllNewsPage({ onBackToHome }) {
  const { t, isEnglish } = useLanguage();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const res = await api.getNews();
      if (res && res.values && res.values.length > 0) {
        setNews(res.values);
      } else {
        setNews(FALLBACK_NEWS);
      }
    } catch (err) {
      console.warn("Using fallback news list:", err);
      setNews(FALLBACK_NEWS);
    } finally {
      setLoading(false);
    }
  };

  // Derive categories (both FR and EN if available)
  const categories = ["all", ...new Set(news.map((item) => (isEnglish && item.categoryEn) ? item.categoryEn : item.category).filter(Boolean))];

  // Filter and sort
  const filteredNews = news
    .filter((item) => {
      const itemCat = (isEnglish && item.categoryEn) ? item.categoryEn : item.category;
      const matchCat = selectedCategory === "all" || itemCat === selectedCategory || item.category === selectedCategory || item.categoryEn === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.titleEn && item.titleEn.toLowerCase().includes(q)) ||
        (item.summary && item.summary.toLowerCase().includes(q)) ||
        (item.summaryEn && item.summaryEn.toLowerCase().includes(q)) ||
        (item.content && item.content.toLowerCase().includes(q)) ||
        (item.contentEn && item.contentEn.toLowerCase().includes(q)) ||
        (item.tags && item.tags.toLowerCase().includes(q)) ||
        (item.tagsEn && item.tagsEn.toLowerCase().includes(q));
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.publishedAt || b.createdAt || 0).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="dedicated-page-wrapper">
      {/* Header Banner */}
      <div className="dedicated-page-header">
        <div className="container">
          <div className="section-tag-pill">
            <Bell size={16} />
            <span>{t("allNewsTag")}</span>
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
            {t("allNewsTitle")} <span className="text-highlight-green">{t("allNewsTitleHighlight")}</span>
          </h1>

          <p className="dedicated-page-subtitle">
            {t("allNewsSubtitle")}
          </p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="container dedicated-page-content">
        <div className="dedicated-controls-bar">
          {/* Search Box */}
          <div className="dedicated-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder={t("allNewsSearchPlaceholder")}
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

          {/* Sort & Counter */}
          <div className="dedicated-sort-group">
            <span className="results-counter-pill">
              <strong>{filteredNews.length}</strong> {t("allNewsCount")}
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="dedicated-select"
            >
              <option value="newest">{isEnglish ? "Most Recent First" : "Plus récents d'abord"}</option>
              <option value="oldest">{isEnglish ? "Oldest First" : "Plus anciens d'abord"}</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="dedicated-category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`dedicated-cat-btn ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat === "all" ? t("allNewsFilterAll") : cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="loading-state-container">
            <div className="spinner"></div>
            <p>{t("loading")}</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="dedicated-empty-state">
            <Bell size={48} />
            <p>{isEnglish ? "No news found matching your search." : "Aucune actualité ne correspond à vos critères de recherche."}</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="btn btn-outline-forest btn-sm"
              style={{ marginTop: "1rem" }}
            >
              {isEnglish ? "Reset Filters" : "Réinitialiser les filtres"}
            </button>
          </div>
        ) : (
          <div className="news-cards-grid dedicated-grid">
            {filteredNews.map((item) => {
              const imageSrc = item.coverImage ? getMediaUrl(item.coverImage) : null;
              const title = (isEnglish && item.titleEn) ? item.titleEn : item.title;
              const category = (isEnglish && item.categoryEn) ? item.categoryEn : (item.category || (isEnglish ? "Official Dispatch" : "Communiqué"));
              const summary = (isEnglish && item.summaryEn) ? item.summaryEn : item.summary;
              const tags = (isEnglish && item.tagsEn) ? item.tagsEn : item.tags;
              const dateStr = new Date(item.publishedAt || item.createdAt).toLocaleDateString(
                isEnglish ? "en-US" : "fr-FR",
                { day: "numeric", month: "long", year: "numeric" }
              );

              return (
                <article key={item.id} className="news-editorial-card">
                  <div className="news-card-photo-wrap">
                    {imageSrc ? (
                      <img src={imageSrc} alt={title} className="news-card-photo" loading="lazy" />
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
                    <div className="news-meta-row">
                      <span className="news-meta-date">
                        <Calendar size={13} />
                        {dateStr}
                      </span>
                      <span className="news-meta-readtime">
                        <Clock size={13} />
                        {isEnglish ? "3 min read" : "3 min de lecture"}
                      </span>
                    </div>

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
                      <button onClick={() => setSelectedNews(item)} className="btn-read-news">
                        <span>{t("allNewsReadArticle")}</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Full Detail Modal */}
      {selectedNews && (() => {
        const modalTitle = (isEnglish && selectedNews.titleEn) ? selectedNews.titleEn : selectedNews.title;
        const modalCategory = (isEnglish && selectedNews.categoryEn) ? selectedNews.categoryEn : (selectedNews.category || (isEnglish ? "Official Dispatch" : "Communiqué Officiel"));
        const modalSummary = (isEnglish && selectedNews.summaryEn) ? selectedNews.summaryEn : selectedNews.summary;
        const modalContent = (isEnglish && selectedNews.contentEn) ? selectedNews.contentEn : (selectedNews.content || selectedNews.summary);
        const modalTags = (isEnglish && selectedNews.tagsEn) ? selectedNews.tagsEn : selectedNews.tags;

        return (
          <div className="modal-overlay" onClick={() => setSelectedNews(null)}>
            <div className="modal-card article-modal-card" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedNews(null)} aria-label={isEnglish ? "Close" : "Fermer"}>
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

              <h2 style={{ fontSize: "1.75rem", color: "#13221B", lineHeight: "1.35", marginBottom: "1rem" }}>
                {modalTitle}
              </h2>

              <div style={{ display: "flex", gap: "1.2rem", color: "#6A8278", fontSize: "0.88rem", marginBottom: "1.5rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Calendar size={14} />
                  {new Date(selectedNews.publishedAt || selectedNews.createdAt).toLocaleDateString(
                    isEnglish ? "en-US" : "fr-FR",
                    { day: "numeric", month: "long", year: "numeric" }
                  )}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Clock size={14} />
                  {isEnglish ? "Official Release" : "Publication Officielle"}
                </span>
              </div>

              <div style={{ color: "#2B4036", lineHeight: "1.8", fontSize: "1.05rem" }}>
                {modalSummary && (
                  <p style={{ fontWeight: 600, fontSize: "1.15rem", marginBottom: "1.2rem", color: "#13221B" }}>
                    {modalSummary}
                  </p>
                )}
                <p style={{ whiteSpace: "pre-line" }}>{modalContent}</p>
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
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
