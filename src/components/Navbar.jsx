import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, ArrowUpRight, ArrowLeft, Globe, Users, ChevronRight, Trees } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar({ onOpenApplication, activeSection, onNavigateSection, isDedicatedPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [showNavCta, setShowNavCta] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const handleLinkClick = (e, targetSection) => {
    if (onNavigateSection) {
      onNavigateSection(targetSection);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Show nav CTA only when user has scrolled past "Rejoindre le Mouvement" hero button
      const heroBtn = document.getElementById("hero-main-cta");
      if (heroBtn) {
        const rect = heroBtn.getBoundingClientRect();
        setShowNavCta(rect.bottom < 65);
      } else {
        setShowNavCta(window.scrollY > 380);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("navHome"), href: "#accueil" },
    { label: t("navProgram"), href: "#programme" },
    { label: t("navTeam"), href: "#equipe" },
    { label: t("navAxes"), href: "#piliers" },
    { label: t("navPodcasts"), href: "#podcasts" },
    { label: t("navTerritories"), href: "#territoires" },
    { label: t("navContact"), href: "#contact" },
  ];

  return (
    <header className={`site-header-wrapper ${scrolled ? "scrolled" : ""}`}>
      {/* Institutional Top Bar */}
      <div className="top-utility-bar">
        <div className="container utility-container">
          <div className="utility-left">
            <span className="utility-badge">
              <Trees size={13} />
              {t("cordinatedIn")}
            </span>
            <span className="utility-divider">|</span>
            <span className="utility-text">
              {t("strategicPartner")} <strong>AFRIVE</strong>
            </span>
          </div>

          <div className="utility-right">
            <a 
              href="#agenda" 
              onClick={(e) => handleLinkClick(e, "agenda")}
              className="utility-link"
            >
              {t("cohortAgenda")}
            </a>
            <span className="utility-divider">·</span>
            
            {/* Interactive FR / EN Switcher */}
            <div className="utility-lang-switcher" role="group" aria-label="Langue / Language">
              <Globe size={13} className="lang-icon" />
              <button 
                type="button"
                onClick={() => setLanguage("fr")} 
                className={`lang-btn ${language === "fr" ? "active" : ""}`}
                aria-label="Version Française"
              >
                FR
              </button>
              <span className="lang-sep">/</span>
              <button 
                type="button"
                onClick={() => setLanguage("en")} 
                className={`lang-btn ${language === "en" ? "active" : ""}`}
                aria-label="English Version"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="main-navbar">
        <div className="container nav-container">
          {/* Brand Logo */}
          <a 
            href="#accueil" 
            onClick={(e) => handleLinkClick(e, "accueil")}
            className="nav-brand" 
            aria-label="JEDDIAC Accueil"
          >
            <img 
              src="/assets/jeddiac-lineaire-transparent.png" 
              alt="JEDDIAC — Jeunesse Engagée pour la Durabilité" 
              className="nav-logo-img" 
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links" aria-label="Navigation principale">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, sectionId)}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Area (NO ADMIN BUTTON - Admin accesses via direct URL) */}
          <div className="nav-actions">
            <button 
              onClick={onOpenApplication}
              className={`btn btn-forest btn-sm nav-cta-btn ${showNavCta ? "nav-cta-visible" : "nav-cta-hidden"}`}
              aria-label={t("joinNetwork")}
            >
              <Sparkles size={15} />
              <span>{t("joinNetwork")}</span>
            </button>

            {/* If user is logged in as a normal member, show minimal sign-out option without public admin badges */}
            {user && (
              <button
                onClick={logout}
                className="btn-user-signout"
                title={`Connecté en tant que ${user.firstName || user.email}. Cliquer pour vous déconnecter.`}
              >
                <span>{user.firstName || "Session"}</span>
                <span className="signout-label">(Quitter)</span>
              </button>
            )}

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-mobile-toggle"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <img 
                src="/assets/jeddiac-lineaire-transparent.png" 
                alt="JEDDIAC" 
                style={{ height: "38px", objectFit: "contain" }} 
              />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="modal-close-btn"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Language Switcher */}
            <div className="mobile-drawer-lang-strip">
              <span className="mobile-drawer-lang-title">
                <Globe size={14} />
                <span>Langue / Language :</span>
              </span>
              <div className="mobile-drawer-lang-toggle">
                <button
                  type="button"
                  onClick={() => setLanguage("fr")}
                  className={`mobile-lang-pill ${language === "fr" ? "active" : ""}`}
                >
                  Français (FR)
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`mobile-lang-pill ${language === "en" ? "active" : ""}`}
                >
                  English (EN)
                </button>
              </div>
            </div>

            <nav className="mobile-nav-links">
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleLinkClick(e, sectionId);
                    }}
                    className={`mobile-nav-link ${activeSection === sectionId ? "active" : ""}`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={18} className="chevron" />
                  </a>
                );
              })}
            </nav>

            <div className="mobile-drawer-cta">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenApplication(); }}
                className="btn btn-forest"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Sparkles size={16} />
                <span>{t("applyNow")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
