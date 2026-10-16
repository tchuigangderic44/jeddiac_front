import React from "react";
import { GraduationCap, Target, Users, AlertCircle, Sparkles, ArrowRight } from "lucide-react";

export function parseArticleContent(text) {
  if (!text) return { hasEnriched: false, body: "" };

  const patterns = [
    { key: "contribution", regex: /(?:^|\n)[^\w\n]*\s*(Contribution attendue de l'\''école|Contribution attendue|School Contribution)[\s:]*\n([\s\S]*?)(?=(?:\n[^\w\n]*\s*(Résultats concrets|Concrete Expected|Partenaires|Partner Network|Mention de transparence|Transparency Notice))|$)/i },
    { key: "results", regex: /(?:^|\n)[^\w\n]*\s*(Résultats concrets & Livrables attendus|Résultats concrets & Livrables|Concrete Expected Outcomes)[\s:]*\n([\s\S]*?)(?=(?:\n[^\w\n]*\s*(Partenaires|Partner Network|Mention de transparence|Transparency Notice))|$)/i },
    { key: "partners", regex: /(?:^|\n)[^\w\n]*\s*(Partenaires mobilisables|Partner Network|Partenaires)[\s:]*\n([\s\S]*?)(?=(?:\n[^\w\n]*\s*(Mention de transparence|Transparency Notice))|$)/i },
    { key: "transparency", regex: /(?:^|\n)[^\w\n]*\s*(Mention de transparence|Transparency Notice)[\s:]*\n([\s\S]*?)$/i }
  ];

  const firstHeaderMatch = text.search(/(?:^|\n)[^\w\n]*\s*(Contribution attendue|School Contribution|Résultats concrets|Concrete Expected)/i);
  const body = firstHeaderMatch !== -1 ? text.substring(0, firstHeaderMatch).trim() : text.trim();

  const sections = {};
  for (const p of patterns) {
    const match = text.match(p.regex);
    sections[p.key] = match ? match[2].trim() : null;
  }

  const hasEnriched = Boolean(sections.contribution || sections.results || sections.partners || sections.transparency);

  return {
    body,
    ...sections,
    hasEnriched
  };
}

export default function EnrichedArticleContent({ 
  content, 
  title, 
  isEnglish, 
  onProposeInitiative 
}) {
  const parsed = parseArticleContent(content);

  if (!parsed.hasEnriched) {
    return (
      <div className="article-body-text" style={{ whiteSpace: "pre-line", lineHeight: "1.8", color: "#2B4036" }}>
        {content}
      </div>
    );
  }

  return (
    <div className="enriched-article-wrapper">
      {/* Narrative Body */}
      {parsed.body && (
        <div className="article-body-text" style={{ whiteSpace: "pre-line", lineHeight: "1.8", color: "#2B4036", marginBottom: "1.8rem" }}>
          {parsed.body}
        </div>
      )}

      {/* Structured Action Cards Grid */}
      <div className="enriched-cards-grid">
        {/* School Contribution */}
        {parsed.contribution && (
          <div className="enriched-feature-card enriched-card-contribution">
            <div className="enriched-card-header">
              <span className="enriched-card-icon icon-school">
                <GraduationCap size={18} />
              </span>
              <h4 className="enriched-card-title">
                {isEnglish ? "Expected School Contribution" : "Contribution attendue de l'établissement"}
              </h4>
            </div>
            <p className="enriched-card-body">{parsed.contribution}</p>
          </div>
        )}

        {/* Concrete Deliverables & Outcomes */}
        {parsed.results && (
          <div className="enriched-feature-card enriched-card-results">
            <div className="enriched-card-header">
              <span className="enriched-card-icon icon-results">
                <Target size={18} />
              </span>
              <h4 className="enriched-card-title">
                {isEnglish ? "Tangible Outcomes & Deliverables" : "Résultats concrets & Livrables attendus"}
              </h4>
            </div>
            <p className="enriched-card-body">{parsed.results}</p>
          </div>
        )}

        {/* Mobilizable Partners */}
        {parsed.partners && (
          <div className="enriched-feature-card enriched-card-partners">
            <div className="enriched-card-header">
              <span className="enriched-card-icon icon-partners">
                <Users size={18} />
              </span>
              <h4 className="enriched-card-title">
                {isEnglish ? "Mobilizable Partner Network" : "Partenaires mobilisables"}
              </h4>
            </div>
            <p className="enriched-card-body">{parsed.partners}</p>
          </div>
        )}
      </div>

      {/* Institutional Transparency Notice */}
      {parsed.transparency && (
        <div className="enriched-transparency-card">
          <div className="transparency-icon-col">
            <AlertCircle size={20} className="transparency-icon" />
          </div>
          <div className="transparency-content-col">
            <strong className="transparency-label">
              {isEnglish ? "Institutional Transparency Notice:" : "Mention de transparence institutionnelle :"}
            </strong>
            <p className="transparency-text">{parsed.transparency}</p>
          </div>
        </div>
      )}

      {/* Contextual Action CTA Box */}
      {onProposeInitiative && (
        <div className="enriched-action-cta-box">
          <div className="action-cta-text">
            <div className="action-cta-badge">
              <Sparkles size={14} />
              <span>{isEnglish ? "Field Action Opportunity" : "Action de terrain"}</span>
            </div>
            <h4 className="action-cta-title">
              {isEnglish 
                ? "Would you like to implement this initiative in your school?" 
                : "Vous souhaitez déployer cette initiative dans votre établissement ?"}
            </h4>
            <p className="action-cta-subtitle">
              {isEnglish 
                ? "JEDDIAC supports schools, universities, and youth hubs across Cameroon with zero participation fees." 
                : "JEDDIAC accompagne les collèges, lycées et universités sans frais de participation pour l'établissement."}
            </p>
          </div>
          <button 
            type="button" 
            className="btn btn-emerald-action"
            onClick={() => onProposeInitiative(title)}
          >
            <span>{isEnglish ? "Propose this initiative" : "Proposer cette initiative"}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
