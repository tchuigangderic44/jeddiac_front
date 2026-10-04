import React, { useState, useEffect } from "react";
import { Users, Search, ArrowRight, ArrowLeft, X, ExternalLink, Mail, Award, MapPin, Sparkles, ShieldCheck, BookOpen, Filter, Globe } from "lucide-react";
import { api, getMediaUrl } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

const CURATED_TEAM = [
  {
    id: "kenfack-jm",
    firstName: "Jean Marie",
    lastName: "Kenfack",
    metier: "Directeur & Porteur du Programme JEDDIAC",
    metierEn: "Director & Programme Lead of JEDDIAC",
    category: "direction",
    pole: "Coordination Régionale",
    poleEn: "Regional Coordination",
    location: "Yaoundé, Cameroun",
    country: "Cameroun",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    role: "coordinator",
    bibliographie: "Spécialiste en communication institutionnelle, plaidoyer environnemental et développement des médias émergents en Afrique Centrale. Initiateur du programme JEDDIAC visant à outiller plus de 20 000 jeunes journalistes et communicateurs sur les enjeux écologiques du Bassin du Congo.",
    bibliographieEn: "Specialist in institutional communication, environmental advocacy and emerging media development in Central Africa. Initiator of the JEDDIAC programme aimed at equipping over 20,000 young journalists and communicators on Congo Basin ecological issues.",
    conseil: "Supervise la stratégie globale, les relations inter-étatiques avec les ministères de l'Éducation et de l'Environnement, et la cohérence éditoriale des 5 axes du programme.",
    conseilEn: "Supervises overall strategy, inter-state relations with Ministries of Education and Environment, and editorial coherence across the 5 programme axes.",
    linkedin: "https://linkedin.com",
    contributions: "Coordination des 90 clubs médias scolaires, conception du syllabus 'Journalisme de Solutions & Climat'.",
    contributionsEn: "Coordination of the 90 school media clubs, syllabus design for 'Solutions Journalism & Climate'."
  },
  {
    id: "aissatou-bella",
    firstName: "Dr. Aïssatou",
    lastName: "Bella",
    metier: "Conseillère Scientifique & Écologie Forestière",
    metierEn: "Scientific Advisor & Forest Ecology",
    category: "expert",
    pole: "Sciences & Biodiversité",
    poleEn: "Sciences & Biodiversity",
    location: "Libreville / Yaoundé",
    country: "Gabon",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    role: "expert",
    bibliographie: "Docteure en biologie de la conservation et chercheure associée sur les dynamiques de séquestration carbone des forêts denses humides et des tourbières du Bassin du Congo. Engagée pour la vulgarisation scientifique accessible aux jeunes.",
    bibliographieEn: "PhD in conservation biology and associate researcher on carbon sequestration dynamics in rainforests and peatlands of the Congo Basin. Committed to making science accessible to youth.",
    conseil: "Conseille les rédactions juniors pour garantir l'exactitude scientifique, la vérification des données climatiques et le fact-checking des enquêtes de terrain.",
    conseilEn: "Advises junior newsrooms to ensure scientific accuracy, climate data verification and field investigation fact-checking.",
    linkedin: "https://linkedin.com",
    contributions: "Validation scientifique du guide 'Enquêter sur la déforestation et les puits de carbone'.",
    contributionsEn: "Scientific validation of the handbook 'Investigating deforestation and carbon sinks'."
  },
  {
    id: "rodrigue-manga",
    firstName: "Rodrigue",
    lastName: "Manga",
    metier: "Responsable Pôle Radio & Médias Juniors",
    metierEn: "Head of Radio Hub & Junior Media",
    category: "journaliste",
    pole: "Production Audio & Podcasts",
    poleEn: "Audio Production & Podcasts",
    location: "Douala, Cameroun",
    country: "Cameroun",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    role: "member",
    bibliographie: "Journaliste radio, réalisateur de podcasts documentaires et formateur d'équipes de jeunes reporters. Ancien correspondant pour des radios communautaires et spécialiste des formats audio immersifs et du journalisme citoyen.",
    bibliographieEn: "Radio journalist, documentary podcast producer and trainer of young reporter teams. Former community radio correspondent and specialist in immersive audio formats and citizen journalism.",
    conseil: "Anime les sessions d'initiation à la prise de son mobile, au montage audio open-source et à la narration radiophonique pour les 90 clubs scolaires.",
    conseilEn: "Leads introductory sessions in mobile sound recording, open-source audio editing and radio storytelling for the 90 school clubs.",
    linkedin: "https://linkedin.com",
    contributions: "Direction technique de la série de podcasts 'Échos du Bassin' et du studio itinérant JEDDIAC.",
    contributionsEn: "Technical direction of the podcast series 'Echoes of the Basin' and the JEDDIAC mobile studio."
  },
  {
    id: "grace-bikou",
    firstName: "Grâce",
    lastName: "Bikou",
    metier: "Rédactrice en Chef Adjointe - Enquêtes Jeunesse",
    metierEn: "Deputy Editor-in-Chief - Youth Investigations",
    category: "journaliste",
    pole: "Enquêtes & Journalisme de Solutions",
    poleEn: "Investigations & Solutions Journalism",
    location: "Brazzaville, Congo",
    country: "Congo",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=80",
    role: "member",
    bibliographie: "Jeune reporter environnementale primée, spécialisée dans les investigations sur la résilience des communautés fluviales et la gestion participative des aires protégées.",
    bibliographieEn: "Award-winning young environmental reporter, specializing in investigations on river community resilience and participatory management of protected areas.",
    conseil: "Accompagne le mentorat des lycéens et étudiants pour la sélection des sujets d'enquêtes et la structuration d'articles de solutions reproductibles.",
    conseilEn: "Mentors high school and university students in story selection and structuring scalable solutions journalism articles.",
    linkedin: "https://linkedin.com",
    contributions: "Auteure de l'enquête 'Les sentinelles des mangroves de l'estuaire du Wouri'.",
    contributionsEn: "Author of the investigation 'The mangrove sentinels of the Wouri estuary'."
  },
  {
    id: "patrick-ngono",
    firstName: "Patrick",
    lastName: "Ngono",
    metier: "Coordinateur des Pôles Territoriaux",
    metierEn: "Territorial Hubs Coordinator",
    category: "direction",
    pole: "Déploiement Territoires",
    poleEn: "Territorial Deployment",
    location: "Bafoussam / Garoua, Cameroun",
    country: "Cameroun",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    role: "member",
    bibliographie: "Expert en animation territoriale et ingénierie de projets éducatifs en zone rurale. Travaille depuis plus de 8 ans au renforcement des synergies entre radios communautaires et chefferies traditionnelles.",
    bibliographieEn: "Expert in territorial animation and educational project engineering in rural areas. Over 8 years strengthening synergies between community radios and traditional leaderships.",
    conseil: "Pilote la logistique d'acheminement des kits médias vers les établissements secondaires et universités des 10 régions du Cameroun.",
    conseilEn: "Manages logistics for media kits distribution to secondary schools and universities across Cameroon's 10 regions.",
    linkedin: "https://linkedin.com",
    contributions: "Cartographie complète des 90 structures relais pour la phase pilote 2026-2027.",
    contributionsEn: "Full mapping of the 90 relay structures for the 2026-2027 pilot phase."
  },
  {
    id: "clarisse-tambwe",
    firstName: "Clarisse",
    lastName: "Tambwe",
    metier: "Déléguée Partenariats & Société Civile",
    metierEn: "Delegate for Partnerships & Civil Society",
    category: "partenaire",
    pole: "Réseau Régional RDC & Sous-Région",
    poleEn: "DRC & Sub-regional Network",
    location: "Kinshasa, RDC",
    country: "RDC",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80",
    role: "partner",
    bibliographie: "Juriste de formation et militante associative pour l'autonomisation des jeunes femmes dans les médias climatiques en Afrique Centrale.",
    bibliographieEn: "Legal scholar and civil society advocate for the empowerment of young women in Central African climate media.",
    conseil: "Facilite les accords-cadres avec les collectifs de radios associatives de l'espace COMIFAC et CEEAC.",
    conseilEn: "Facilitates framework agreements with community radio collectives across COMIFAC and ECCAS zones.",
    linkedin: "https://linkedin.com",
    contributions: "Structuration du pont d'échange Kinshasa-Yaoundé-Libreville pour les cohortes 2027.",
    contributionsEn: "Structuring the Kinshasa-Yaoundé-Libreville exchange pipeline for 2027 cohorts."
  }
];

export default function AllProfilesPage({ onBackToHome, initialCategory = "all" }) {
  const { t, isEnglish } = useLanguage();
  const [members, setMembers] = useState(CURATED_TEAM);
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

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
            metierEn: m.metierEn || m.metier,
            category: m.category || (m.role === "partner" ? "partenaire" : (m.role === "expert" ? "expert" : "journaliste")),
            pole: m.pole || (m.conseil?.includes("consultatif") ? "Comité Consultatif" : "Pôle Technique & Média"),
            poleEn: m.poleEn || m.pole,
            location: m.location || "Afrique Centrale",
            country: m.country || "Afrique Centrale",
            photo: m.avatar ? getMediaUrl(m.avatar) : null,
            role: m.role || "member",
            bibliographie:
              m.bibliographie ||
              "Acteur engagé pour le développement durable et l'information responsable en Afrique Centrale.",
            bibliographieEn: m.bibliographieEn || m.bibliographie,
            conseil: m.conseil || "Participe activement à la mobilisation des clubs médias régionaux.",
            conseilEn: m.conseilEn || m.conseil,
            linkedin: m.linkedin || "https://linkedin.com",
            contributions: m.contributions || "Mobilisation territoriale et ateliers de formation JEDDIAC.",
            contributionsEn: m.contributionsEn || m.contributions
          }));

          // Prioritize API members over curated fallback
          const combined = [...formatted];
          CURATED_TEAM.forEach((c) => {
            if (!combined.some((f) => f.firstName === c.firstName && f.lastName === c.lastName)) {
              combined.push(c);
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
      const matchCountry = selectedCountry === "all" || (m.country && m.country.toLowerCase().includes(selectedCountry.toLowerCase())) || (m.location && m.location.toLowerCase().includes(selectedCountry.toLowerCase()));
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
        (m.metier && m.metier.toLowerCase().includes(q)) ||
        (m.metierEn && m.metierEn.toLowerCase().includes(q)) ||
        (m.pole && m.pole.toLowerCase().includes(q)) ||
        (m.poleEn && m.poleEn.toLowerCase().includes(q)) ||
        (m.location && m.location.toLowerCase().includes(q)) ||
        (m.country && m.country.toLowerCase().includes(q)) ||
        (m.bibliographie && m.bibliographie.toLowerCase().includes(q)) ||
        (m.bibliographieEn && m.bibliographieEn.toLowerCase().includes(q));
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
            {filteredMembers.map((member) => {
              const metier = (isEnglish && member.metierEn) ? member.metierEn : member.metier;
              const pole = (isEnglish && member.poleEn) ? member.poleEn : (member.pole || "Pôle Média");
              const bio = (isEnglish && member.bibliographieEn) ? member.bibliographieEn : member.bibliographie;
              const initials = `${member.firstName?.charAt(0) || ""}${member.lastName?.charAt(0) || ""}`.toUpperCase() || "J";

              return (
                <article key={member.id} className="team-card">
                  <div className="team-card-photo-wrapper">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={`${member.firstName} ${member.lastName}`}
                        className="team-card-photo"
                        loading="lazy"
                      />
                    ) : (
                      <div className="team-card-default-avatar">
                        <div className="team-card-default-initials">
                          {initials}
                        </div>
                        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                          JEDDIAC Network
                        </span>
                      </div>
                    )}
                    <span className="team-card-pole-badge">
                      {pole}
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
                    <p className="team-card-metier">{metier}</p>

                    <p className="team-card-bio-snippet">
                      {bio ? `${bio.slice(0, 135)}...` : ""}
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
              );
            })}
          </div>
        )}
      </div>

      {/* Member Full Detail Modal */}
      {selectedMember && (() => {
        const modalMetier = (isEnglish && selectedMember.metierEn) ? selectedMember.metierEn : selectedMember.metier;
        const modalPole = (isEnglish && selectedMember.poleEn) ? selectedMember.poleEn : (selectedMember.pole || "Pôle Régional");
        const modalBio = (isEnglish && selectedMember.bibliographieEn) ? selectedMember.bibliographieEn : selectedMember.bibliographie;
        const modalConseil = (isEnglish && selectedMember.conseilEn) ? selectedMember.conseilEn : selectedMember.conseil;
        const modalContributions = (isEnglish && selectedMember.contributionsEn) ? selectedMember.contributionsEn : selectedMember.contributions;
        const initials = `${selectedMember.firstName?.charAt(0) || ""}${selectedMember.lastName?.charAt(0) || ""}`.toUpperCase() || "J";

        return (
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
                    {selectedMember.photo ? (
                      <img
                        src={selectedMember.photo}
                        alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                        className="profile-modal-photo"
                      />
                    ) : (
                      <div className="profile-modal-photo-fallback">
                        <div className="profile-fallback-avatar">
                          {initials}
                        </div>
                        <span className="profile-fallback-sub">JEDDIAC Media Network</span>
                      </div>
                    )}
                  </div>
                  <div className="profile-modal-meta">
                    <span className="profile-badge-role">
                      <ShieldCheck size={14} />
                      {modalPole}
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
                  <p className="profile-modal-metier">{modalMetier}</p>

                  <div className="profile-modal-section">
                    <h4>{t("modalBioTitle")}</h4>
                    <p>{modalBio}</p>
                  </div>

                  {modalConseil && (
                    <div className="profile-modal-section highlight-box">
                      <h4>
                        <Award size={16} />
                        {t("modalMissionTitle")}
                      </h4>
                      <p>{modalConseil}</p>
                    </div>
                  )}

                  {modalContributions && (
                    <div className="profile-modal-section">
                      <h4>
                        <BookOpen size={16} />
                        {t("modalContributionsTitle")}
                      </h4>
                      <p>{modalContributions}</p>
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
        );
      })()}
    </div>
  );
}
