import React, { useState, useEffect } from "react";
import { Users, Search, ArrowRight, ArrowLeft, X, ExternalLink, Mail, Award, MapPin, Sparkles, ShieldCheck, BookOpen, Filter, Globe } from "lucide-react";
import { api } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

const CURATED_TEAM = [
  {
    id: "kenfack-jm",
    firstName: "Jean Marie",
    lastName: "Kenfack",
    metier: "Directeur & Porteur du Programme JEDDIAC",
    category: "direction",
    pole: "Coordination Régionale",
    location: "Yaoundé, Cameroun",
    country: "Cameroun",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    role: "coordinator",
    bibliographie: "Spécialiste en communication institutionnelle, plaidoyer environnemental et développement des médias émergents en Afrique Centrale. Initiateur du programme JEDDIAC visant à outiller plus de 20 000 jeunes journalistes et communicateurs sur les enjeux écologiques du Bassin du Congo.",
    conseil: "Supervise la stratégie globale, les relations inter-étatiques avec les ministères de l'Éducation et de l'Environnement, et la cohérence éditoriale des 5 axes du programme.",
    linkedin: "https://linkedin.com",
    contributions: "Coordination des 90 clubs médias scolaires, conception du syllabus 'Journalisme de Solutions & Climat'."
  },
  {
    id: "aissatou-bella",
    firstName: "Dr. Aïssatou",
    lastName: "Bella",
    metier: "Conseillère Scientifique & Écologie Forestière",
    category: "expert",
    pole: "Sciences & Biodiversité",
    location: "Libreville / Yaoundé",
    country: "Gabon",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    role: "expert",
    bibliographie: "Docteure en biologie de la conservation et chercheure associée sur les dynamiques de séquestration carbone des forêts denses humides et des tourbières du Bassin du Congo. Engagée pour la vulgarisation scientifique accessible aux jeunes.",
    conseil: "Conseille les rédactions juniors pour garantir l'exactitude scientifique, la vérification des données climatiques et le fact-checking des enquêtes de terrain.",
    linkedin: "https://linkedin.com",
    contributions: "Validation scientifique du guide 'Enquêter sur la déforestation et les puits de carbone'."
  },
  {
    id: "rodrigue-manga",
    firstName: "Rodrigue",
    lastName: "Manga",
    metier: "Responsable Pôle Radio & Médias Juniors",
    category: "journaliste",
    pole: "Production Audio & Podcasts",
    location: "Douala, Cameroun",
    country: "Cameroun",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    role: "member",
    bibliographie: "Journaliste radio, réalisateur de podcasts documentaires et formateur d'équipes de jeunes reporters. Ancien correspondant pour des radios communautaires et spécialiste des formats audio immersifs et du journalisme citoyen.",
    conseil: "Anime les sessions d'initiation à la prise de son mobile, au montage audio open-source et à la narration radiophonique pour les 90 clubs scolaires.",
    linkedin: "https://linkedin.com",
    contributions: "Direction technique de la série de podcasts 'Échos du Bassin' et du studio itinérant JEDDIAC."
  },
  {
    id: "grace-bikou",
    firstName: "Grâce",
    lastName: "Bikou",
    metier: "Rédactrice en Chef Adjointe - Enquêtes Jeunesse",
    category: "journaliste",
    pole: "Enquêtes & Journalisme de Solutions",
    location: "Brazzaville, Congo",
    country: "Congo",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=80",
    role: "member",
    bibliographie: "Jeune reporter environnementale primée, spécialisée dans les investigations sur la résilience des communautés fluviales et la gestion participative des aires protégées.",
    conseil: "Accompagne le mentorat des lycéens et étudiants pour la sélection des sujets d'enquêtes et la structuration d'articles de solutions reproductibles.",
    linkedin: "https://linkedin.com",
    contributions: "Auteure de l'enquête 'Les sentinelles des mangroves de l'estuaire du Wouri'."
  },
  {
    id: "patrick-ngono",
    firstName: "Patrick",
    lastName: "Ngono",
    metier: "Coordinateur des Pôles Territoriaux",
    category: "direction",
    pole: "Déploiement Territoires",
    location: "Bafoussam / Garoua, Cameroun",
    country: "Cameroun",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    role: "member",
    bibliographie: "Expert en animation territoriale et ingénierie de projets éducatifs en zone rurale. Travaille depuis plus de 8 ans au renforcement des synergies entre radios communautaires et chefferies traditionnelles.",
    conseil: "Pilote la logistique d'acheminement des kits médias vers les établissements secondaires et universités des 10 régions du Cameroun.",
    linkedin: "https://linkedin.com",
    contributions: "Cartographie complète des 90 structures relais pour la phase pilote 2026-2027."
  },
  {
    id: "clarisse-tambwe",
    firstName: "Clarisse",
    lastName: "Tambwe",
    metier: "Déléguée Partenariats & Société Civile",
    category: "partenaire",
    pole: "Réseau Régional RDC & Sous-Région",
    location: "Kinshasa, RDC",
    country: "RDC",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80",
    role: "partner",
    bibliographie: "Juriste de formation et militante associative pour l'autonomisation des jeunes femmes dans les médias climatiques en Afrique Centrale.",
    conseil: "Facilite les accords-cadres avec les collectifs de radios associatives de l'espace COMIFAC et CEEAC.",
    linkedin: "https://linkedin.com",
    contributions: "Structuration du pont d'échange Kinshasa-Yaoundé-Libreville pour les cohortes 2027."
  },
  {
    id: "emmanuel-kotto",
    firstName: "Emmanuel",
    lastName: "Kotto",
    metier: "Mentor Fact-Checking & Données Satellitaires",
    category: "expert",
    pole: "Sciences & Données Spatiales",
    location: "Douala, Cameroun",
    country: "Cameroun",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
    role: "expert",
    bibliographie: "Ingénieur géomaticien et analyste en télédétection appliquée au suivi du couvert forestier. Forme les jeunes enquêteurs à exploiter les plateformes open-data (Global Forest Watch, Sentinel).",
    conseil: "Supervise les modules d'investigation assistée par satellite pour prouver les infractions écologiques.",
    linkedin: "https://linkedin.com",
    contributions: "Atelier 'De la carte au reportage : utiliser les images satellites pour appuyer son enquête'."
  },
  {
    id: "nzinga-tshilombo",
    firstName: "Nzinga",
    lastName: "Tshilombo",
    metier: "Animateur Réseau Radio Communautaires",
    category: "journaliste",
    pole: "Radios & Langues Locales",
    location: "Goma / Bukavu, RDC",
    country: "RDC",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80",
    role: "member",
    bibliographie: "Journaliste de terrain et formateur en communication pour le développement dans les zones enclavées du Kivu.",
    conseil: "Accompagne l'adaptation des productions audio dans les langues vernaculaires (Swahili, Lingala).",
    linkedin: "https://linkedin.com",
    contributions: "Création du manuel de radiodiffusion environnementale d'urgence."
  }
];

export default function AllProfilesPage({ onBackToHome }) {
  const { t, isEnglish } = useLanguage();
  const [members, setMembers] = useState(CURATED_TEAM);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadMembersFromApi();
  }, []);

  const loadMembersFromApi = async () => {
    try {
      setLoading(true);
      const res = await api.getMembers();
      if (res && res.values && Array.isArray(res.values)) {
        // STRICTLY EXCLUDE ANY ADMIN
        const nonAdminApiMembers = res.values.filter(
          (m) => m.role !== "admin" && m.role !== "administrator" && !m.isAdmin
        );

        if (nonAdminApiMembers.length > 0) {
          const formatted = nonAdminApiMembers.map((m, idx) => ({
            id: m.id || `api-profile-${idx}`,
            firstName: m.firstName || "Membre",
            lastName: m.lastName || "JEDDIAC",
            metier: m.metier || "Spécialiste Médias & Durabilité",
            category: m.role === "partner" ? "partenaire" : m.role === "expert" ? "expert" : "journaliste",
            pole: m.conseil?.includes("consultatif") ? "Comité Consultatif" : "Pôle Technique & Média",
            location: m.location || "Afrique Centrale",
            country: m.location?.includes("RDC") ? "RDC" : m.location?.includes("Congo") ? "Congo" : "Cameroun",
            photo:
              m.firstName === "Marie"
                ? "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=500&auto=format&fit=crop&q=80"
                : "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80",
            role: m.role || "member",
            bibliographie:
              m.bibliographie ||
              "Acteur engagé pour le développement durable et l'information responsable en Afrique Centrale.",
            conseil: m.conseil || "Participe activement à la mobilisation des clubs médias régionaux.",
            linkedin: m.linkedin || "https://linkedin.com",
            contributions: "Mobilisation territoriale et ateliers de formation JEDDIAC."
          }));

          const combined = [...CURATED_TEAM];
          formatted.forEach((f) => {
            if (!combined.some((c) => c.firstName === f.firstName && c.lastName === f.lastName)) {
              combined.push(f);
            }
          });
          setMembers(combined);
        }
      }
    } catch (err) {
      console.warn("Using curated profiles fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", label: t("teamAllProfiles") },
    { id: "direction", label: t("teamCoordination") },
    { id: "journaliste", label: t("teamJournalists") },
    { id: "expert", label: t("teamExperts") },
    { id: "partenaire", label: t("teamPartners") }
  ];

  const countries = [
    { id: "all", label: isEnglish ? "All Countries / Territories" : "Tous les pays / Territoires" },
    { id: "Cameroun", label: "Cameroun" },
    { id: "RDC", label: "RD Congo (RDC)" },
    { id: "Congo", label: "République du Congo" },
    { id: "Gabon", label: "Gabon" }
  ];

  // Filtering
  const filteredMembers = members
    .filter((m) => m.role !== "admin" && m.role !== "administrator")
    .filter((m) => {
      const matchCat = activeCategory === "all" || m.category === activeCategory;
      const matchCountry = selectedCountry === "all" || (m.country && m.country.includes(selectedCountry)) || (m.location && m.location.includes(selectedCountry));
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
        m.metier.toLowerCase().includes(q) ||
        (m.pole && m.pole.toLowerCase().includes(q)) ||
        (m.location && m.location.toLowerCase().includes(q)) ||
        (m.bibliographie && m.bibliographie.toLowerCase().includes(q));
      return matchCat && matchCountry && matchSearch;
    });

  return (
    <div className="dedicated-page-wrapper">
      {/* Header Banner */}
      <div className="dedicated-page-header">
        <div className="container">
          <div className="section-tag-pill">
            <Users size={16} />
            <span>{t("allProfilesTag")}</span>
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
            {t("allProfilesTitle")} <span className="text-highlight-green">{t("allProfilesTitleHighlight")}</span>
          </h1>

          <p className="dedicated-page-subtitle">
            {t("allProfilesSubtitle")}
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
              placeholder={t("allProfilesSearchPlaceholder")}
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
              <strong>{filteredMembers.length}</strong> {t("allProfilesCount")}
            </span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="dedicated-select"
            >
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
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

        {/* Grid or Empty */}
        {loading ? (
          <div className="loading-state-container">
            <div className="spinner"></div>
            <p>{t("loading")}</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="dedicated-empty-state">
            <Users size={48} />
            <p>{t("teamEmptyState")}</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSelectedCountry("all");
                setSearchQuery("");
              }}
              className="btn btn-outline-forest btn-sm"
              style={{ marginTop: "1rem" }}
            >
              {t("teamResetFilters")}
            </button>
          </div>
        ) : (
          <div className="team-grid dedicated-grid">
            {filteredMembers.map((member) => (
              <article key={member.id} className="team-card">
                <div className="team-card-photo-wrapper">
                  <img
                    src={member.photo}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="team-card-photo"
                    loading="lazy"
                  />
                  <span className="team-card-pole-badge">
                    {member.pole || "Pôle Média"}
                  </span>
                  {member.location && (
                    <span className="team-card-location-tag">
                      <MapPin size={12} />
                      <span>{member.location}</span>
                    </span>
                  )}
                </div>

                <div className="team-card-content">
                  <h3 className="team-card-name">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="team-card-metier">{member.metier}</p>

                  <p className="team-card-bio-snippet">
                    {member.bibliographie?.slice(0, 135)}...
                  </p>

                  <div className="team-card-footer">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="btn-view-profile"
                    >
                      <span>{t("teamViewProfile")}</span>
                      <ArrowRight size={15} />
                    </button>

                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-card-social-link"
                        title={`LinkedIn: ${member.firstName} ${member.lastName}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Member Full Detail Modal */}
      {selectedMember && (
        <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
          <div
            className="modal-card profile-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedMember(null)}
              aria-label={t("modalCloseBtn")}
            >
              <X size={20} />
            </button>

            <div className="profile-modal-grid">
              <div className="profile-modal-sidebar">
                <div className="profile-modal-photo-container">
                  <img
                    src={selectedMember.photo}
                    alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                    className="profile-modal-photo"
                  />
                </div>
                <div className="profile-modal-meta">
                  <span className="profile-badge-role">
                    <ShieldCheck size={14} />
                    {selectedMember.pole || "Pôle Régional"}
                  </span>
                  {selectedMember.location && (
                    <span className="profile-badge-location">
                      <MapPin size={14} />
                      {selectedMember.location}
                    </span>
                  )}
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-forest btn-sm profile-linkedin-btn"
                    >
                      <ExternalLink size={14} />
                      <span>{t("professionalNetwork")}</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="profile-modal-body">
                <span className="profile-modal-kicker">{t("modalProfileKicker")}</span>
                <h2 className="profile-modal-name">
                  {selectedMember.firstName} {selectedMember.lastName}
                </h2>
                <p className="profile-modal-metier">{selectedMember.metier}</p>

                <div className="profile-modal-section">
                  <h4>{t("modalBioTitle")}</h4>
                  <p>{selectedMember.bibliographie}</p>
                </div>

                {selectedMember.conseil && (
                  <div className="profile-modal-section highlight-box">
                    <h4>
                      <Award size={16} />
                      {t("modalMissionTitle")}
                    </h4>
                    <p>{selectedMember.conseil}</p>
                  </div>
                )}

                {selectedMember.contributions && (
                  <div className="profile-modal-section">
                    <h4>
                      <BookOpen size={16} />
                      {t("modalContributionsTitle")}
                    </h4>
                    <p>{selectedMember.contributions}</p>
                  </div>
                )}

                <div className="profile-modal-actions">
                  <a
                    href="#contact"
                    onClick={() => {
                      setSelectedMember(null);
                      onBackToHome();
                      setTimeout(() => {
                        const el = document.getElementById("contact");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="btn btn-forest"
                  >
                    <Mail size={16} />
                    <span>{t("modalContactBtn")}</span>
                  </a>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="btn btn-outline-forest"
                  >
                    {t("modalCloseBtn")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
