import React, { useState } from "react";
import {
  Newspaper,
  CheckCircle2,
  Sparkles,
  Recycle,
  Sprout,
  Leaf,
  Droplets,
  Trees,
  Wrench,
  Boxes,
  UtensilsCrossed,
  MapPin,
  Megaphone,
  Compass,
  Award,
  ArrowRight,
  X,
  School,
  Users,
  CheckCircle,
  Eye,
  Layers,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { ACTIVITY_CONCEPTS } from "../data/activityConcepts";

// Icon mapping helper
const ICON_MAP = {
  Newspaper,
  CheckCircle2,
  Sparkles,
  Recycle,
  Sprout,
  Leaf,
  Droplets,
  Trees,
  Wrench,
  Boxes,
  UtensilsCrossed,
  MapPin,
  Megaphone,
  Compass,
  Award
};

export default function ActivityConceptsSection({ isEnglish = false, onOpenApplication }) {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Limit to initial 9 if not showing all
  const displayedActivities = !showAll
    ? ACTIVITY_CONCEPTS.slice(0, 9)
    : ACTIVITY_CONCEPTS;

  return (
    <section className="activity-concepts-wrapper" id="concepts-activites">
      {/* Section Header */}
      <div className="activity-concepts-header">
        <div className="activity-concepts-badge">
          <Sparkles size={14} className="badge-sparkle-icon" />
          <span>{isEnglish ? "Operational Framework & Programs" : "Programmes & Fiches de Terrain"}</span>
        </div>

        <h2 className="activity-concepts-title">
          {isEnglish ? "Activity Concepts" : "Des concepts d’activités"}
        </h2>

        <p className="activity-concepts-description">
          {isEnglish
            ? "The following concept sheets are ground proposals. They present turnkey activities with concrete methodologies, school contributions, and observable deliverables. Showing the recommended initial set, expandable based on active school partnerships."
            : "Les fiches suivantes sont des propositions de terrain. Le site pourra les présenter sous forme de cartes illustrées, chacune avec une description courte et un bouton « Découvrir l’activité ». Il est recommandé d’en afficher huit à dix au lancement, puis d’en ajouter selon les partenariats effectivement mobilisés."}
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="activity-cards-grid">
        {displayedActivities.map((act) => {
          const IconComponent = ICON_MAP[act.icon] || Sparkles;
          const title = isEnglish ? act.titleEn : act.titleFr;
          const summary = isEnglish ? act.summaryEn : act.summaryFr;

          return (
            <article key={act.id} className="activity-concept-card">
              {/* Card Visual Banner Header */}
              <div 
                className="activity-card-banner"
                style={{
                  background: `linear-gradient(135deg, ${act.accentColor} 0%, #132b20 100%)`
                }}
              >
                <div className="activity-banner-top">
                  <span className="activity-number-chip">#{act.number}</span>
                </div>
                <div className="activity-banner-icon-circle">
                  <IconComponent size={24} className="activity-banner-icon" />
                </div>
              </div>

              {/* Card Body */}
              <div className="activity-card-body">
                <h3 className="activity-card-title">
                  <span className="activity-id-prefix">{act.id}.</span> {title}
                </h3>
                <p className="activity-card-excerpt">{summary}</p>

                {/* Key Insights Preview */}
                <div className="activity-key-points">
                  <div className="activity-key-item">
                    <School size={14} className="activity-key-icon" />
                    <span>
                      <strong>{isEnglish ? "School:" : "École :"}</strong>{" "}
                      {isEnglish ? act.schoolContributionEn : act.schoolContributionFr}
                    </span>
                  </div>
                  <div className="activity-key-item">
                    <CheckCircle size={14} className="activity-key-icon" />
                    <span>
                      <strong>{isEnglish ? "Result:" : "Résultat :"}</strong>{" "}
                      {isEnglish ? act.resultsEn : act.resultsFr}
                    </span>
                  </div>
                </div>

                {/* Card Action */}
                <div className="activity-card-footer">
                  <button
                    onClick={() => setSelectedActivity(act)}
                    className="btn-discover-activity"
                    aria-label={`${isEnglish ? "Discover activity" : "Découvrir l’activité"} : ${title}`}
                  >
                    <span>{isEnglish ? "Discover Activity" : "Découvrir l’activité"}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Toggle View More / View Recommended Launch Set */}
      <div className="activity-toggle-wrapper">
        <button
          onClick={() => setShowAll(!showAll)}
          className="btn-toggle-activities"
        >
          {showAll ? (
            <>
              <ChevronUp size={18} />
              <span>{isEnglish ? "Show Recommended Launch Set (9)" : "Afficher la sélection recommandée au lancement (9)"}</span>
            </>
          ) : (
            <>
              <ChevronDown size={18} />
              <span>{isEnglish ? "Discover All 15 Activity Concepts" : "Voir l’ensemble des 15 concepts d’activités"}</span>
            </>
          )}
        </button>
      </div>

      {/* Modal Detail View */}
      {selectedActivity && (() => {
        const IconModal = ICON_MAP[selectedActivity.icon] || Sparkles;
        const modalTitle = isEnglish ? selectedActivity.titleEn : selectedActivity.titleFr;
        const modalDesc = isEnglish ? selectedActivity.descriptionEn : selectedActivity.descriptionFr;
        const modalSchool = isEnglish ? selectedActivity.schoolContributionEn : selectedActivity.schoolContributionFr;
        const modalPartners = isEnglish ? selectedActivity.partnersEn : selectedActivity.partnersFr;
        const modalResults = isEnglish ? selectedActivity.resultsEn : selectedActivity.resultsFr;
        const modalPillar = isEnglish ? selectedActivity.pillarLabelEn : selectedActivity.pillarLabelFr;

        return (
          <div className="modal-overlay" onClick={() => setSelectedActivity(null)}>
            <div
              className="modal-card activity-modal-card"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                className="modal-close-btn"
                onClick={() => setSelectedActivity(null)}
                aria-label={isEnglish ? "Close" : "Fermer"}
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div 
                className="activity-modal-header"
                style={{
                  background: `linear-gradient(135deg, ${selectedActivity.accentColor} 0%, #0d2118 100%)`
                }}
              >
                <div className="activity-modal-header-top">
                  <span className="activity-modal-chip">{modalPillar}</span>
                  <span className="activity-modal-number">Fiche #{selectedActivity.number}</span>
                </div>
                <div className="activity-modal-title-row">
                  <div className="activity-modal-icon-badge">
                    <IconModal size={28} />
                  </div>
                  <h2 className="activity-modal-title">
                    {selectedActivity.id}. {modalTitle}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="activity-modal-body">
                {/* Description */}
                <div className="activity-modal-desc-block">
                  <h4 className="activity-block-heading">
                    {isEnglish ? "Activity Overview & Objectives" : "Présentation & Déroulement de l'activité"}
                  </h4>
                  <p className="activity-modal-desc-text">{modalDesc}</p>
                </div>

                {/* 3 Pillars / Key Specifications */}
                <div className="activity-modal-pillars-grid">
                  {/* School Contribution */}
                  <div className="activity-spec-card school-spec">
                    <div className="spec-card-icon-title">
                      <School size={20} className="spec-icon" />
                      <h4>{isEnglish ? "School Contribution" : "Contribution de l’école"}</h4>
                    </div>
                    <p>{modalSchool}</p>
                  </div>

                  {/* Partners */}
                  <div className="activity-spec-card partners-spec">
                    <div className="spec-card-icon-title">
                      <Users size={20} className="spec-icon" />
                      <h4>{isEnglish ? "Potential Partners" : "Partenaires mobilisables"}</h4>
                    </div>
                    <p>{modalPartners}</p>
                  </div>

                  {/* Results */}
                  <div className="activity-spec-card results-spec">
                    <div className="spec-card-icon-title">
                      <CheckCircle2 size={20} className="spec-icon" />
                      <h4>{isEnglish ? "Observable Deliverables" : "Résultat observable"}</h4>
                    </div>
                    <p>{modalResults}</p>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="activity-modal-footer">
                <button
                  type="button"
                  onClick={() => setSelectedActivity(null)}
                  className="btn btn-outline-forest"
                >
                  {isEnglish ? "Close" : "Fermer"}
                </button>

                {onOpenApplication && (
                  <button
                    type="button"
                    onClick={() => {
                      const titleToSubmit = modalTitle;
                      setSelectedActivity(null);
                      onOpenApplication(`Déploiement activité : ${titleToSubmit}`);
                    }}
                    className="btn btn-forest"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                  >
                    <span>{isEnglish ? "Deploy This Activity" : "Proposer cette activité"}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
