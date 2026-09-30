import React, { useState, useEffect } from "react";
import { BookOpen, Calendar, ArrowRight, ArrowLeft, Clock, Search, X, Tag, Eye, Share2, Sparkles, Filter } from "lucide-react";
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
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80"
];

const FALLBACK_ARTICLES = [
  {
    id: "art-bassin-poumon",
    title: "Bassin du Congo : Le deuxième poumon de la Terre au cœur de l'engagement des jeunes",
    category: "Investigation & Climat",
    slug: "bassin-du-congo-deuxieme-poumon-de-la-terre",
    summary: "Avec 200 millions d'hectares de forêt et 70% du couvert végétal africain, le Bassin du Congo est le sanctuaire écologique vital de l'humanité.",
    content: "Le Bassin du Congo représente la 2e plus grande forêt tropicale de notre planète après l'Amazonie. Véritable puits de carbone indispensable à la stabilité climatique mondiale, il abrite une biodiversité unique au monde. Au Cameroun et dans toute l'Afrique centrale, plus de 60% de la population a moins de 25 ans. Pourtant, les jeunes producteurs de contenus restent trop souvent marginalisés dans les récits médiatiques. JEDDIAC inverse cette tendance en les formant à devenir les sentinelles et investigateurs du climat.",
    tags: "Bassin du Congo, Forêt Tropicale, Carbone, Biodiversité",
    viewsCount: 1420,
    publishedAt: "2026-09-29T21:46:47.423Z"
  },
  {
    id: "art-journalisme-solutions",
    title: "Du constat à l'action : Pourquoi le journalisme de solutions séduit la jeunesse africaine",
    category: "Médias & Méthodes",
    slug: "du-constat-a-l-action-journalisme-de-solutions",
    summary: "Loin du catastrophisme, les jeunes reporters enquêtent sur les initiatives concrètes d'agro-écologie, de recyclage et d'énergie solaire.",
    content: "Le journalisme de solutions ne consiste pas à ignorer les crises environnementales, mais à analyser rigoureusement les réponses apportées par les communautés locales. Dans le cadre des ateliers JEDDIAC, les jeunes apprennent à interroger l'efficacité, les limites et la reproductibilité des innovations locales : compostage urbain, foyers améliorés, reforestation participative et préservation des mangroves.",
    tags: "Journalisme de Solutions, Écologie, Innovation, Société",
    viewsCount: 980,
    publishedAt: "2026-09-26T21:46:47.423Z"
  },
  {
    id: "art-radios-rural",
    title: "Radios communautaires en milieu rural : Les voix qui éclairent les terroirs",
    category: "Territoires & Communautés",
    slug: "radios-communautaires-en-milieu-rural",
    summary: "Enquête sur le rôle déterminant des radios locales pour sensibiliser les agriculteurs et les familles aux aléas climatiques.",
    content: "Dans les villages de la région de l'Est et de l'Ouest Cameroun, la radio reste le média roi, accessible dans les langues locales et garant d'une information de confiance. Les clubs radios scolaires créés par JEDDIAC s'associent aux diffuseurs communautaires pour concevoir des chroniques hebdomadaires : préservation des cours d'eau, protection des pollinisateurs et calendrier des semences adapté aux dérèglements pluviaux.",
    tags: "Radios Communautaires, Ruralité, Savoirs Locaux, ODD",
    viewsCount: 760,
    publishedAt: "2026-09-22T21:46:47.423Z"
  },
  {
    id: "art-interview-kenfack",
    title: "Jean Marie Kenfack : « Faire des jeunes des producteurs de connaissances, non de simples récepteurs »",
    category: "Tribune & Entretien",
    slug: "entretien-jean-marie-kenfack-porteur-du-programme",
    summary: "Rencontre avec le porteur du programme JEDDIAC sur la vision à l'horizon 2035 pour l'information environnementale en Afrique Centrale.",
    content: "« Les jeunes ne doivent plus être cantonnés au rôle de spectateurs ou de cibles passives des campagnes de sensibilisation. Ils ont le regard acéré, l'énergie militante et la maîtrise des nouveaux formats numériques. Donnons-leur les outils techniques, la déontologie journalistique et le réseau pour porter haut la voix du continent. » Propos recueillis à l'occasion de la présentation du programme à Yaoundé.",
    tags: "Vision, Entretien, Horizon 2035, Leadership",
    viewsCount: 1850,
    publishedAt: "2026-09-19T21:46:47.423Z"
  }
];

export default function AllArticlesPage({ onBackToHome }) {
  const { t, isEnglish } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("views");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const res = await api.getArticles();
      if (res && res.values && res.values.length > 0) {
        setArticles(res.values);
      } else {
        setArticles(FALLBACK_ARTICLES);
      }
    } catch (err) {
      console.warn("Using fallback articles list:", err);
      setArticles(FALLBACK_ARTICLES);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", label: isEnglish ? "All Investigations" : "Toutes les enquêtes" },
    { id: "Investigation & Climat", label: isEnglish ? "Climate & Investigation" : "Investigation & Climat" },
    { id: "Médias & Méthodes", label: isEnglish ? "Media & Methods" : "Médias & Méthodes" },
    { id: "Territoires & Communautés", label: isEnglish ? "Territories & Communities" : "Territoires & Communautés" },
    { id: "Tribune & Entretien", label: isEnglish ? "Opinion & Interviews" : "Tribune & Entretien" }
  ];

  const filteredArticles = articles
    .filter((a) => {
      const matchCat = activeCategory === "all" || a.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (a.title && a.title.toLowerCase().includes(q)) ||
        (a.summary && a.summary.toLowerCase().includes(q)) ||
        (a.content && a.content.toLowerCase().includes(q)) ||
        (a.tags && a.tags.toLowerCase().includes(q));
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "views") {
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      }
      const dateA = new Date(a.publishedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.publishedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    });

  return (
    <div className="dedicated-page-wrapper">
      {/* Header Banner */}
      <div className="dedicated-page-header">
        <div className="container">
          <div className="section-tag-pill">
            <BookOpen size={16} />
            <span>{t("allArticlesTag")}</span>
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
            {t("allArticlesTitle")} <span className="text-highlight-green">{t("allArticlesTitleHighlight")}</span>
          </h1>

          <p className="dedicated-page-subtitle">
            {t("allArticlesSubtitle")}
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
              placeholder={t("allArticlesSearchPlaceholder")}
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
              <strong>{filteredArticles.length}</strong> {t("allArticlesCount")}
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="dedicated-select"
            >
              <option value="views">{isEnglish ? "Most Popular First" : "Plus consultées d'abord"}</option>
              <option value="recent">{isEnglish ? "Most Recent First" : "Plus récentes d'abord"}</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="dedicated-category-pills">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`dedicated-cat-btn ${activeCategory === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading or Empty or Grid */}
        {loading ? (
          <div className="loading-state-container">
            <div className="spinner"></div>
            <p>{t("loading")}</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="dedicated-empty-state">
            <BookOpen size={48} />
            <p>{isEnglish ? "No investigation found matching your criteria." : "Aucune enquête ne correspond à vos critères de recherche."}</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="btn btn-outline-forest btn-sm"
              style={{ marginTop: "1rem" }}
            >
              {isEnglish ? "Reset Filters" : "Réinitialiser les filtres"}
            </button>
          </div>
        ) : (
          <div className="articles-magazine-grid dedicated-grid">
            {filteredArticles.map((item, idx) => {
              const photo =
                ARTICLE_PHOTO_MAP[item.slug] ||
                DEFAULT_ARTICLE_PHOTOS[idx % DEFAULT_ARTICLE_PHOTOS.length];
              const dateStr = new Date(item.publishedAt || item.createdAt).toLocaleDateString(
                isEnglish ? "en-US" : "fr-FR",
                { day: "numeric", month: "short", year: "numeric" }
              );

              return (
                <article key={item.id} className="article-magazine-card">
                  <div className="article-photo-container">
                    <img src={photo} alt={item.title} className="article-card-image" loading="lazy" />
                    <span className="article-photo-badge">
                      {item.category || "Investigation"}
                    </span>
                    <span className="article-readtime-badge">
                      <Eye size={12} />
                      <span>{item.viewsCount || 520} {isEnglish ? "views" : "vues"}</span>
                    </span>
                  </div>

                  <div className="article-magazine-body">
                    <div className="article-meta-row">
                      <span className="article-meta-item">
                        <Calendar size={13} />
                        {dateStr}
                      </span>
                      <span className="article-meta-item">
                        <Clock size={13} />
                        {isEnglish ? "4 min read" : "4 min de lecture"}
                      </span>
                    </div>

                    <h3 className="article-magazine-title">{item.title}</h3>
                    <p className="article-magazine-summary">{item.summary}</p>

                    {item.tags && (
                      <div className="article-tags-wrap">
                        {item.tags.split(",").slice(0, 3).map((tag, i) => (
                          <span key={i} className="article-tag-item">
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="article-magazine-footer">
                      <span className="article-tag-item">
                        <Tag size={12} />
                        {item.tags?.split(",")[0] || "Bassin du Congo"}
                      </span>

                      <button
                        onClick={() => setSelectedArticle({ ...item, photo })}
                        className="btn-read-article"
                      >
                        <span>{t("allArticlesReadFull")}</span>
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

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-card article-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedArticle(null)} aria-label="Fermer">
              <X size={20} />
            </button>

            {selectedArticle.photo && (
              <div style={{ borderRadius: "12px", overflow: "hidden", marginBottom: "1.5rem", maxHeight: "280px" }}>
                <img
                  src={selectedArticle.photo}
                  alt={selectedArticle.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem" }}>
              <span className="badge badge-green-light">
                {selectedArticle.category || "Investigation Climat"}
              </span>
              <span style={{ fontSize: "0.82rem", color: "#6A8278", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Eye size={13} />
                {selectedArticle.viewsCount || 850} {isEnglish ? "reads" : "lectures"}
              </span>
            </div>

            <h2 style={{ fontSize: "1.8rem", color: "#13221B", lineHeight: "1.35", marginBottom: "1rem" }}>
              {selectedArticle.title}
            </h2>

            <div style={{ display: "flex", gap: "1.2rem", color: "#6A8278", fontSize: "0.88rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #E5EBE7" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Calendar size={14} />
                {new Date(selectedArticle.publishedAt || selectedArticle.createdAt).toLocaleDateString(
                  isEnglish ? "en-US" : "fr-FR",
                  { day: "numeric", month: "long", year: "numeric" }
                )}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Clock size={14} />
                {isEnglish ? "JEDDIAC Investigative Desk" : "Rédaction Junior JEDDIAC"}
              </span>
            </div>

            <div style={{ color: "#2B4036", lineHeight: "1.85", fontSize: "1.08rem" }}>
              <p style={{ fontWeight: 600, fontSize: "1.2rem", marginBottom: "1.5rem", color: "#13221B", lineHeight: "1.6" }}>
                {selectedArticle.summary}
              </p>
              <p>{selectedArticle.content || selectedArticle.summary}</p>
            </div>

            {selectedArticle.tags && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "2rem", paddingTop: "1.2rem", borderTop: "1px solid #E5EBE7" }}>
                {selectedArticle.tags.split(",").map((tag, i) => (
                  <span key={i} className="badge badge-gold-light">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #E5EBE7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: selectedArticle.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert(isEnglish ? "Link copied to clipboard!" : "Lien de l'enquête copié dans le presse-papiers !");
                  }
                }}
                className="btn btn-outline-forest btn-sm"
              >
                <Share2 size={15} />
                <span>{isEnglish ? "Share" : "Partager"}</span>
              </button>
              <button onClick={() => setSelectedArticle(null)} className="btn btn-forest">
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
