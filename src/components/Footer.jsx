import React, { useState } from "react";
import { Trees, Mail, ArrowRight, CheckCircle2, Heart, Shield, Globe, Users } from "lucide-react";
import { api } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

export default function Footer({ onOpenApplication }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    setError(null);

    try {
      await api.subscribeNewsletter(email);
      setSubscribed(true);
      setEmail("");
    } catch (err) {
      setError(err.message || "Erreur d'inscription.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="site-footer-institutional">
      <div className="container">
        <div className="footer-main-grid">
          {/* Col 1: Brand & Purpose */}
          <div className="footer-col-brand">
            <div className="footer-logo-wrap">
              <img 
                src="/assets/jeddiac-lineaire-blanc.png" 
                alt="JEDDIAC" 
                className="footer-logo-img" 
              />
            </div>

            <p className="footer-mission-text">
              <strong>JEDDIAC</strong> : {t("footerMission")}
            </p>

            <div className="footer-pill-tag">
              <Trees size={14} />
              <span>{t("footerPill")}</span>
            </div>
          </div>

          {/* Col 2: Le Programme */}
          <div className="footer-col-links">
            <h4 className="footer-col-heading">{t("footerColProgram")}</h4>
            <ul className="footer-nav-list">
              <li><a href="#programme">{t("footerLinkContext")}</a></li>
              <li><a href="#piliers">{t("footerLinkPillars")}</a></li>
              <li><a href="#equipe">{t("footerLinkTeam")}</a></li>
              <li><a href="#territoires">{t("footerLinkTerritories")}</a></li>
              <li><a href="#agenda">{t("footerLinkAgenda")}</a></li>
            </ul>
          </div>

          {/* Col 3: Partenariats & Réseau (NO ADMIN BUTTON) */}
          <div className="footer-col-links">
            <h4 className="footer-col-heading">{t("footerColNetwork")}</h4>
            <ul className="footer-nav-list">
              <li><span className="footer-highlight-link">{t("footerLinkAfrive")}</span></li>
              <li><a href="#podcasts">{t("footerLinkPodcasts")}</a></li>
              <li>
                <button 
                  onClick={onOpenApplication} 
                  className="footer-btn-link"
                >
                  {t("footerLinkApply")}
                </button>
              </li>
              <li><a href="#contact">{t("footerLinkPartnership")}</a></li>
              <li><a href="#accueil">{t("footerLinkCharter")}</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="footer-col-newsletter">
            <h4 className="footer-col-heading">{t("footerNewsletterTitle")}</h4>
            <p className="footer-newsletter-desc">
              {t("footerNewsletterDesc")}
            </p>

            {subscribed ? (
              <div className="footer-newsletter-success">
                <CheckCircle2 size={18} />
                <span>{t("footerNewsletterSuccess")}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                <div className="newsletter-input-group">
                  <input
                    type="email"
                    required
                    placeholder={t("footerNewsletterPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                  />
                  <button 
                    type="submit" 
                    disabled={subscribing} 
                    className="newsletter-submit-btn"
                    aria-label={t("footerNewsletterButtonLabel")}
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>
                {error && <p className="newsletter-error-msg">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accreditations (NO ADMIN LINK) */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} JEDDIAC. {t("footerCopyright")}
          </p>

          <div className="footer-partner-strip">
            <span>{t("footerSynergy")} <strong>AFRIVE</strong></span>
            <span>·</span>
            <span>{t("footerCities")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
