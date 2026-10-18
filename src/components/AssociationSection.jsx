import React from "react";
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Users, 
  Quote, 
  CheckCircle2, 
  Calendar,
  Building,
  Globe2,
  Landmark
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function AssociationSection({ onExploreProgram }) {
  const { t, isEnglish } = useLanguage();

  const JOURNEY_STEPS = [
    {
      year: "2011–2012",
      yearEn: "2011–2012",
      title: "Président du club journal · Lycée classique de Bafoussam",
      titleEn: "Press Club President · Lycée Classique de Bafoussam",
      desc: "Censeur, secrétaire, rédacteur en chef puis président, l'année du baccalauréat.",
      descEn: "Censor, secretary, editor-in-chief, then president during his final high school year."
    },
    {
      year: "Lycée",
      yearEn: "High School",
      title: "Rédaction en chef de l'émission Juvénile",
      titleEn: "Editor-in-Chief of Juvénile Radio Broadcast",
      desc: "Une émission de référence des radios de l'Ouest. Attestation d'honneur du délégué régional de la communication.",
      descEn: "A flagship youth program on Western regional radio. Awarded an official commendation from the Regional Delegate of Communication."
    },
    {
      year: "ESSTIC",
      yearEn: "ESSTIC",
      title: "Licence en journalisme, puis master 1",
      titleEn: "Bachelor in Journalism, then Master 1",
      desc: "Master 1 en sciences de l'information et de la communication. Quatre ans de formation académique rigoureuse.",
      descEn: "Master 1 in Information and Communication Sciences. Four rigorous years of journalistic and media training."
    },
    {
      year: "Yaoundé",
      yearEn: "Yaoundé",
      title: "CRTV, radios et presse privée",
      titleEn: "CRTV, Radio and Independent Press",
      desc: "Stagiaire puis bénévole (sport, société), avant d'écrire dans plusieurs titres au Cameroun et en Afrique centrale.",
      descEn: "Intern and volunteer on national sports and societal broadcasts, then investigative writer for private newspapers."
    },
    {
      year: "2020",
      yearEn: "2020",
      title: "France · double MBA",
      titleEn: "France · Dual MBA",
      desc: "Communication et marketing digital ; gestion de projet numérique.",
      descEn: "Digital Communication & Marketing, and Digital Project Management."
    },
    {
      year: "Auteur",
      yearEn: "Author",
      title: "Deux ouvrages à portée sociale",
      titleEn: "Two Socially Committed Books",
      desc: "« Et s'il fallait refaire ? » (2022) et « La fin d'un rêve » (2024).",
      descEn: "“Et s'il fallait refaire ?” (2022) and “La fin d'un rêve” (2024)."
    },
    {
      year: "Depuis 2022",
      yearEn: "Since 2022",
      title: "Rédacteur en chef · revue Qualité Références",
      titleEn: "Editor-in-Chief · Qualité Références Journal",
      desc: "Revue professionnelle d'ingénierie et de management de la qualité.",
      descEn: "Professional management and quality assurance industry review."
    },
    {
      year: "Avril 2023",
      yearEn: "April 2023",
      title: "AFRIVE · co-fondateur et rédacteur en chef",
      titleEn: "AFRIVE · Co-Founder and Editor-in-Chief",
      desc: "Projet pensé dès 2017, concrétisé en 2021, SAS officielle en avril 2023 réunissant trois associés égalitaires.",
      descEn: "Conceived in 2017, officially established in April 2023 as a joint-stock company with three equal partners."
    },
    {
      year: "2026",
      yearEn: "2026",
      title: "JEDDIAC · porteur du programme",
      titleEn: "JEDDIAC · Program Leader",
      desc: "Le retour au terrain : former la jeunesse d'Afrique centrale aux médias et à la durabilité.",
      descEn: "Returning to the field: training Central African youth in sustainable development and ethical journalism."
    }
  ];

  return (
    <section id="association" className="association-editorial-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag-pill">
            <Compass size={16} />
            <span>{t("assocTag")}</span>
          </div>
          <h2 className="section-title-editorial">
            {t("assocTitle")} <span className="text-highlight-green">{t("assocTitleHighlight")}</span>
          </h2>
          <p className="section-subtitle-editorial">
            {t("assocSubtitle")}
          </p>
        </div>

        {/* Manifesto Intro */}
        <div className="assoc-manifesto-box">
          <div className="assoc-manifesto-quote-icon">
            <Quote size={32} />
          </div>
          <blockquote className="assoc-manifesto-lead">
            {t("assocQuote")}
          </blockquote>
          <p className="assoc-manifesto-desc">
            {t("assocManifestoDesc")}
          </p>
        </div>

        {/* 4 Key Figures */}
        <div className="assoc-facts-grid">
          <div className="assoc-fact-card">
            <div className="assoc-fact-num">{t("assocFact1Num")}</div>
            <div className="assoc-fact-label">{t("assocFact1Label")}</div>
          </div>
          <div className="assoc-fact-card">
            <div className="assoc-fact-num">{t("assocFact2Num")}</div>
            <div className="assoc-fact-label">{t("assocFact2Label")}</div>
          </div>
          <div className="assoc-fact-card">
            <div className="assoc-fact-num">{t("assocFact3Num")}</div>
            <div className="assoc-fact-label">{t("assocFact3Label")}</div>
          </div>
          <div className="assoc-fact-card">
            <div className="assoc-fact-num">{t("assocFact4Num")}</div>
            <div className="assoc-fact-label">{t("assocFact4Label")}</div>
          </div>
        </div>

        {/* Two Columns: Story & Timeline */}
        <div className="assoc-main-split">
          {/* Left Column: Narrative Story */}
          <div className="assoc-story-col">
            <h3 className="assoc-story-heading">
              {t("assocStoryHeading")}
            </h3>
            
            <p className="assoc-story-p">
              {t("assocStoryP1")}
            </p>
            <p className="assoc-story-p">
              {t("assocStoryP2")}
            </p>
            <p className="assoc-story-p">
              {t("assocStoryP3")}
            </p>
            <p className="assoc-story-p">
              {t("assocStoryP4")}
            </p>
            <p className="assoc-story-p assoc-story-p-strong">
              {t("assocStoryP5")}
            </p>

            {/* Pullquote */}
            <div className="assoc-pullquote">
              <p className="assoc-pullquote-text">
                {t("assocPullquoteText")}
              </p>
              <span className="assoc-pullquote-author">
                {t("assocPullquoteAuthor")}
              </span>
            </div>
          </div>

          {/* Right Column: Sticky Timeline Card */}
          <div className="assoc-timeline-col">
            <div className="assoc-timeline-card">
              <div className="assoc-timeline-header">
                <Calendar size={17} className="assoc-timeline-icon" />
                <h4 className="assoc-timeline-title">
                  {t("assocTimelineTitle")}
                </h4>
              </div>

              <div className="assoc-journey-list">
                {JOURNEY_STEPS.map((step, idx) => (
                  <div key={idx} className="assoc-journey-item">
                    <div className="assoc-journey-year">
                      {isEnglish ? step.yearEn : step.year}
                    </div>
                    <div className="assoc-journey-marker">
                      <div className="assoc-journey-dot"></div>
                      {idx !== JOURNEY_STEPS.length - 1 && <div className="assoc-journey-line"></div>}
                    </div>
                    <div className="assoc-journey-content">
                      <h5 className="assoc-journey-step-title">
                        {isEnglish ? step.titleEn : step.title}
                      </h5>
                      <p className="assoc-journey-step-desc">
                        {isEnglish ? step.descEn : step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why this association is necessary */}
        <div className="assoc-why-section">
          <div className="assoc-why-header">
            <span className="assoc-why-eyebrow">
              {t("assocWhyEyebrow")}
            </span>
            <h3 className="assoc-why-title">
              {t("assocWhyTitle")} <span className="text-highlight-green">{t("assocWhyTitleHighlight")}</span>
            </h3>
            <p className="assoc-why-subtitle">
              {t("assocWhySubtitle")}
            </p>
          </div>

          {/* 3 Pillar Cards */}
          <div className="assoc-why-cards-grid">
            <div className="assoc-why-card">
              <div className="assoc-why-icon-wrap icon-youth">
                🌱
              </div>
              <h4 className="assoc-why-card-title">
                {t("assocWhyCard1Title")}
              </h4>
              <p className="assoc-why-card-text">
                {t("assocWhyCard1Text")}
              </p>
            </div>

            <div className="assoc-why-card">
              <div className="assoc-why-icon-wrap icon-info">
                🛡️
              </div>
              <h4 className="assoc-why-card-title">
                {t("assocWhyCard2Title")}
              </h4>
              <p className="assoc-why-card-text">
                {t("assocWhyCard2Text")}
              </p>
            </div>

            <div className="assoc-why-card">
              <div className="assoc-why-icon-wrap icon-network">
                🔗
              </div>
              <h4 className="assoc-why-card-title">
                {t("assocWhyCard3Title")}
              </h4>
              <p className="assoc-why-card-text">
                {t("assocWhyCard3Text")}
              </p>
            </div>
          </div>

          {/* 3 Legal & Status Fact Cards */}
          <div className="assoc-legal-facts-grid">
            <div className="assoc-legal-fact">
              <div className="assoc-legal-title">
                <Landmark size={18} />
                <span>{t("assocFactLegal1Title")}</span>
              </div>
              <p className="assoc-legal-desc">
                {t("assocFactLegal1Desc")}
              </p>
            </div>

            <div className="assoc-legal-fact">
              <div className="assoc-legal-title">
                <Building size={18} />
                <span>{t("assocFactLegal2Title")}</span>
              </div>
              <p className="assoc-legal-desc">
                {t("assocFactLegal2Desc")}
              </p>
            </div>

            <div className="assoc-legal-fact">
              <div className="assoc-legal-title">
                <Globe2 size={18} />
                <span>{t("assocFactLegal3Title")}</span>
              </div>
              <p className="assoc-legal-desc">
                {t("assocFactLegal3Desc")}
              </p>
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="assoc-action-row">
            <a 
              href="#programme" 
              onClick={(e) => {
                if (onExploreProgram) {
                  e.preventDefault();
                  onExploreProgram();
                }
              }}
              className="btn btn-forest btn-lg"
            >
              <span>{t("assocDiscoverProgramBtn")}</span>
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
