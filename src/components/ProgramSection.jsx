import React from "react";
import { 
  GraduationCap, 
  PenTool, 
  Radio, 
  Share2, 
  Layers, 
  ArrowRight, 
  Calendar, 
  Info, 
  CheckCircle2,
  Newspaper
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ProgramSection({ onOpenApplication, onExploreAxes, onNavigateAllNews }) {
  const { t, isEnglish } = useLanguage();

  const PILLARS = [
    {
      icon: "🎓",
      title: t("progPillar1Title"),
      desc: t("progPillar1Desc")
    },
    {
      icon: "✍️",
      title: t("progPillar2Title"),
      desc: t("progPillar2Desc")
    },
    {
      icon: "📡",
      title: t("progPillar3Title"),
      desc: t("progPillar3Desc")
    },
    {
      icon: "🌍",
      title: t("progPillar4Title"),
      desc: t("progPillar4Desc")
    }
  ];

  const COMPONENTS = [
    { num: t("progComp1Num"), title: t("progComp1Title"), desc: t("progComp1Desc") },
    { num: t("progComp2Num"), title: t("progComp2Title"), desc: t("progComp2Desc") },
    { num: t("progComp3Num"), title: t("progComp3Title"), desc: t("progComp3Desc") },
    { num: t("progComp4Num"), title: t("progComp4Title"), desc: t("progComp4Desc") },
    { num: t("progComp5Num"), title: t("progComp5Title"), desc: t("progComp5Desc") },
    { num: t("progComp6Num"), title: t("progComp6Title"), desc: t("progComp6Desc") },
    { num: t("progComp7Num"), title: t("progComp7Title"), desc: t("progComp7Desc"), badge: t("progComp7Badge") },
    { num: t("progComp8Num"), title: t("progComp8Title"), desc: t("progComp8Desc"), badge: t("progComp8Badge") },
    { num: t("progComp9Num"), title: t("progComp9Title"), desc: t("progComp9Desc") },
    { num: t("progComp10Num"), title: t("progComp10Title"), desc: t("progComp10Desc") },
  ];

  return (
    <section id="programme" className="program-editorial-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag-pill">
            <Layers size={16} />
            <span>{t("progTag")}</span>
          </div>
          <h2 className="section-title-editorial">
            {t("progTitle")} <span className="text-highlight-green">{t("progTitleHighlight")}</span>
          </h2>
          <p className="section-subtitle-editorial">
            {t("progSubtitle")}
          </p>
        </div>

        {/* 4 Main Action Vectors */}
        <div className="program-vectors-grid">
          {PILLARS.map((p, idx) => (
            <div key={idx} className="program-vector-card">
              <div className="program-vector-icon">{p.icon}</div>
              <h3 className="program-vector-title">{p.title}</h3>
              <p className="program-vector-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* 10 Operational Components */}
        <div className="program-components-block">
          <h3 className="program-components-heading">
            {t("progComponentsHeading")}
          </h3>

          <div className="program-components-grid">
            {COMPONENTS.map((item, idx) => (
              <div key={idx} className="program-component-item">
                <div className="program-component-num">{item.num}</div>
                <div className="program-component-body">
                  <div className="program-component-header">
                    <h4 className="program-component-title">{item.title}</h4>
                    {item.badge && (
                      <span className="program-badge-planned">{item.badge}</span>
                    )}
                  </div>
                  <p className="program-component-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Operational Implementation Note */}
          <div className="program-operational-note">
            <Info size={18} className="program-note-icon" />
            <p className="program-note-text">
              {t("progNote")}
            </p>
          </div>
        </div>

        {/* Action Row */}
        <div className="program-actions-row">
          <button 
            type="button"
            onClick={() => onOpenApplication && onOpenApplication("Participation au Programme JEDDIAC")}
            className="btn btn-forest btn-lg"
          >
            <span>{t("progCtaBtn")}</span>
            <ArrowRight size={17} />
          </button>

          {onNavigateAllNews && (
            <button
              type="button"
              onClick={() => onNavigateAllNews("all")}
              className="btn btn-ghost btn-lg"
            >
              <Newspaper size={16} />
              <span>{t("progNewsDispatchesBtn", "Le programme en Action")}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
