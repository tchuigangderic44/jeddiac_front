import React from "react";
import { Award, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function AfriveSpotlight({ onOpenApplication }) {
  const { t, isEnglish } = useLanguage();

  return (
    <section className="afrive-spotlight-section">
      <div className="container">
        <div className="afrive-editorial-card">
          <div className="afrive-editorial-grid">
            <div className="afrive-main-col">
              <div className="section-tag-pill light-pill">
                <Award size={15} />
                <span>{t("afriveTag")}</span>
              </div>

              <h2 className="afrive-headline">
                {t("afriveHeadlinePrefix")} <span className="afrive-highlight">AFRIVE</span>{t("afriveHeadlineSuffix")}
              </h2>

              <p className="afrive-lead">
                <strong>AFRIVE</strong>, {t("afriveLeadText")}
              </p>

              <div className="afrive-benefits-grid">
                <div className="afrive-benefit-item">
                  <h4>{t("afriveBenefit1Title")}</h4>
                  <p>{t("afriveBenefit1Desc")}</p>
                </div>

                <div className="afrive-benefit-item">
                  <h4>{t("afriveBenefit2Title")}</h4>
                  <p>{t("afriveBenefit2Desc")}</p>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (onOpenApplication) {
                    onOpenApplication(isEnglish ? "Institutional / Media Partnership" : "Partenariat Institutionnel / Média");
                  }
                }}
                className="btn btn-gold-solid"
              >
                <span>{t("afriveCtaBtn")}</span>
                <ArrowUpRight size={17} />
              </button>
            </div>

            {/* Founder Vision Box with Photo */}
            <div className="afrive-vision-card">
              <div className="afrive-vision-photo-frame">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80" 
                  alt={t("afriveVisionPhotoAlt")} 
                  className="afrive-vision-img"
                  loading="lazy"
                />
              </div>

              <div className="afrive-vision-text">
                <span className="badge badge-gold-solid">{t("afriveVisionBadge")}</span>
                <h3>{t("afriveVisionTitle")}</h3>
                <p>
                  {t("afriveVisionDesc")}
                </p>
                <div className="afrive-vision-founder">
                  <strong>{t("afriveVisionFounderName")}</strong> · {t("afriveVisionFounderRole")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
