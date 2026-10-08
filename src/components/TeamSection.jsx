import React, { useState, useEffect } from "react";
import { Users, Search, ArrowRight, X, ExternalLink, Mail, Award, MapPin, Sparkles, ShieldCheck, BookOpen } from "lucide-react";
import { api, getMediaUrl } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

export default function TeamSection({ onNavigateAllProfiles }) {
  const { t, isEnglish } = useLanguage();
  const [members, setMembers] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    loadMembersFromApi();
  }, []);

  const loadMembersFromApi = async () => {
    try {
      setLoading(true);
      const res = await api.getMembers({ limit: 100 });
      if (res && res.values && Array.isArray(res.values)) {
        // STRICTLY FILTER OUT ANY ADMIN USER
        const nonAdminApiMembers = res.values.filter(
          (m) => m.role !== "admin" && m.role !== "administrator" && !m.isAdmin
        );

        const formatted = nonAdminApiMembers.map((m, idx) => {
          const isThani = (m.email && m.email.includes("thani")) || 
                          (m.lastName && m.lastName.toLowerCase().includes("soilihi"));

          return {
            id: m.id || `member-${idx}`,
            firstName: m.firstName || "",
            lastName: m.lastName || "",
            metier: m.metier || "Membre du Réseau",
            metierEn: m.metierEn || m.metier || "Network Member",
            role: m.role || "member",
            category: m.category || (m.role?.includes("president") ? "honneur" : "direction"),
            pole: m.pole || (m.category === "direction" ? "Direction du Programme" : "Membres d'Honneur"),
            poleEn: m.poleEn || (m.category === "direction" ? "Programme Leadership" : "Honorary Members"),
            location: m.location || "",
            country: m.country || "",
            photo: m.avatar ? (m.avatar.startsWith("http") ? m.avatar : getMediaUrl(m.avatar)) : null,
            displayOrder: m.displayOrder !== undefined ? m.displayOrder : 999,
            photoSource: m.photoSource || (isThani ? "Ministère de l'Europe et des Affaires étrangères _Sindbad Bonfanti" : null),
            bibliographie: m.bibliographie || "",
            bibliographieEn: m.bibliographieEn || m.bibliographie || "",
            conseil: m.conseil && !m.conseil.includes("Source photo") ? m.conseil : "",
            conseilEn: m.conseilEn || "",
            contributions: m.contributions || "",
            contributionsEn: m.contributionsEn || "",
            linkedin: m.linkedin || ""
          };
        });

        formatted.sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
        setMembers(formatted);
      }
    } catch (err) {
      console.error("Error loading members from API:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", label: t("teamAllProfiles") },
    { id: "direction", label: t("teamDirection") },
    { id: "honneur", label: t("teamHonoraryPresidency") },
    { id: "parrainage", label: t("teamPatrons") },
    { id: "conseil", label: t("teamAdvisors") },
    { id: "ambassadeur", label: t("teamAmbassadors") }
  ];

  // Filter members (CRITICAL: exclude any admin)
  const filteredMembers = members
    .filter((m) => m.role !== "admin" && m.role !== "administrator")
    .filter((m) => {
      const matchCat = activeCategory === "all" || m.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
        (m.metier && m.metier.toLowerCase().includes(q)) ||
        (m.metierEn && m.metierEn.toLowerCase().includes(q)) ||
        (m.pole && m.pole.toLowerCase().includes(q)) ||
        (m.poleEn && m.poleEn.toLowerCase().includes(q)) ||
        (m.location && m.location.toLowerCase().includes(q)) ||
        (m.country && m.country.toLowerCase().includes(q)) ||
        (m.bibliographie && m.bibliographie.toLowerCase().includes(q)) ||
        (m.bibliographieEn && m.bibliographieEn.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });

  // Display all matching members
  const displayedMembers = filteredMembers;

  return (
    <section id="equipe" className="team-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag-pill">
            <Users size={16} />
            <span>{t("teamKicker")}</span>
          </div>
          <h2 className="section-title-editorial">
            {t("teamTitle")} <span className="text-highlight-green">{t("teamTitleHighlight")}</span>
          </h2>
          <p className="section-subtitle-editorial">
            {t("teamSubtitle")}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="team-controls-bar">
          <div className="team-category-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`team-cat-btn ${activeCategory === cat.id ? "active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="team-search-box">
            <Search size={18} className="team-search-icon" />
            <input
              type="text"
              placeholder={t("teamSearchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="team-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="team-search-clear"
                title={t("close")}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--color-forest)" }}>
            <span className="btn-spinner-ring" style={{ width: "32px", height: "32px", display: "inline-block" }}></span>
            <p style={{ marginTop: "1rem", fontWeight: 600 }}>
              {isEnglish ? "Loading official members..." : "Chargement des membres officiels..."}
            </p>
          </div>
        )}

        {/* Profiles Grid */}
        {!loading && (
          <div className="team-grid">
            {displayedMembers.map((member) => {
              const metier = (isEnglish && member.metierEn) ? member.metierEn : member.metier;
              const pole = (isEnglish && member.poleEn) ? member.poleEn : (member.pole || "Membres d'Honneur");
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
                          {pole}
                        </span>
                      </div>
                    )}

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
                      {bio ? `${bio.slice(0, 140)}...` : ""}
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

        {!loading && filteredMembers.length === 0 && (
          <div className="team-empty-state">
            <Users size={42} />
            <p>{t("teamEmptyState")}</p>
            <button 
              onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
              className="btn btn-outline-forest btn-sm"
              style={{ marginTop: "1rem" }}
            >
              {t("teamResetFilters")}
            </button>
          </div>
        )}

        {/* View All Profiles Action */}
        <div className="section-footer-action">
          <button 
            onClick={() => {
              setIsNavigating(true);
              if (onNavigateAllProfiles) {
                onNavigateAllProfiles(activeCategory);
              } else {
                window.location.hash = "#tous-les-profils";
              }
              setTimeout(() => setIsNavigating(false), 1200);
            }}
            disabled={isNavigating}
            className={`btn btn-outline-forest btn-lg ${isNavigating ? "btn-navigating" : ""}`}
          >
            {isNavigating ? (
              <>
                <span className="btn-spinner-ring"></span>
                <span>{isEnglish ? "Loading directory..." : "Chargement du répertoire..."}</span>
              </>
            ) : (
              <>
                <span>{t("allProfilesViewAllBtn")}</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>

        {/* Institutional Callout */}
        <div className="team-join-banner">
          <div className="team-join-content">
            <span className="team-join-tag">
              <Sparkles size={16} />
              {t("teamJoinBannerTag")}
            </span>
            <h3>{t("teamJoinBannerTitle")}</h3>
            <p>
              {t("teamJoinBannerDesc")}
            </p>
          </div>
          <a href="#contact" className="btn btn-forest">
            <span>{t("teamJoinBannerBtn")}</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Member Full Detail Modal / Fiche Profil */}
      {selectedMember && (() => {
        const modalMetier = (isEnglish && selectedMember.metierEn) ? selectedMember.metierEn : selectedMember.metier;
        const modalPole = (isEnglish && selectedMember.poleEn) ? selectedMember.poleEn : (selectedMember.pole || "Direction du Programme");
        const modalBio = (isEnglish && selectedMember.bibliographieEn) ? selectedMember.bibliographieEn : selectedMember.bibliographie;
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
                  <div className="profile-modal-photo-block">
                    <div className="profile-modal-photo-container">
                      {selectedMember.photo ? (
                        <img 
                          src={selectedMember.photo} 
                          alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                          className="profile-modal-photo" 
                        />
                      ) : (
                        <div className="team-card-default-avatar" style={{ height: "200px", borderRadius: "12px" }}>
                          <div className="team-card-default-initials">
                            {initials}
                          </div>
                          <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                            {modalPole}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Photo Attribution exactly like user attachment */}
                    {selectedMember.photoSource && (
                      <p className="profile-modal-photo-attribution">
                        Source : {selectedMember.photoSource.startsWith("http") ? (
                          <a 
                            href={selectedMember.photoSource} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: "var(--color-forest)", textDecoration: "underline" }}
                          >
                            {selectedMember.photoSource.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
                          </a>
                        ) : selectedMember.photoSource}
                      </p>
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
                  </div>
                </div>

                <div className="profile-modal-body">
                  <span className="profile-modal-kicker">{modalPole}</span>
                  <h2 className="profile-modal-name">
                    {selectedMember.firstName} {selectedMember.lastName}
                  </h2>
                  <p className="profile-modal-metier" style={{ fontSize: "1.15rem", fontWeight: 700 }}>
                    {modalMetier}
                  </p>

                  {modalBio && (
                    <div className="profile-modal-section">
                      <h4>{t("modalBioTitle")}</h4>
                      <p style={{ whiteSpace: "pre-line", lineHeight: 1.75 }}>
                        {modalBio}
                      </p>
                    </div>
                  )}

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
                    {selectedMember.linkedin && (
                      <a 
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-forest"
                      >
                        <ExternalLink size={16} />
                        <span>Profil LinkedIn Officiel</span>
                      </a>
                    )}
                    <a 
                      href="#contact" 
                      onClick={() => setSelectedMember(null)} 
                      className="btn btn-outline-forest"
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
    </section>
  );
}
