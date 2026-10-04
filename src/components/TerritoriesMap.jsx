import React, { useState } from "react";
import { MapPin, Globe, Users, ShieldCheck, ArrowRight, Trees, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function TerritoriesMap({ onOpenApplication }) {
  const { isEnglish, t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState("cm");

  const countries = [
    {
      id: "cm",
      name: isEnglish ? "Cameroon" : "Cameroun",
      status: isEnglish ? "Active Pilot Phase" : "Phase Pilote Active",
      badgeClass: "badge-green-light",
      tagline: isEnglish 
        ? "10 Administrative regions · 90 school & community organizations" 
        : "10 Régions administratives · 90 structures scolaires & communautaires",
      coverage: isEnglish ? "10 / 10 regions" : "10 / 10 régions",
      youthCount: isEnglish ? "+20,000 youth targeted" : "+20 000 jeunes ciblés",
      photo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
      focus: isEnglish
        ? "Southern & Eastern forests, Littoral mangroves, Western highlands, and northern Sahelian transition."
        : "Forêts du Sud & Est, mangroves du Littoral, plateaux de l'Ouest et transition sahélienne dans le Nord.",
      hubs: isEnglish
        ? ["Yaoundé (Regional Hub)", "Douala (Littoral)", "Bertoua (East)", "Bafoussam (West)", "Garoua (Far North)"]
        : ["Yaoundé (Hub Régional)", "Douala (Littoral)", "Bertoua (Est)", "Bafoussam (Ouest)", "Garoua (Grand Nord)"],
      description: isEnglish
        ? "Cameroon serves as the program's initial testing ground. All 10 regions are mobilized to validate the journalism curriculum ahead of cross-border deployment."
        : "Le Cameroun constitue le laboratoire d'expérimentation initial du programme. Les 10 régions sont mobilisées pour valider les modules de formation journalistique avant le déploiement transfrontalier."
    },
    {
      id: "ga",
      name: "Gabon",
      status: isEnglish ? "Sub-Regional Expansion" : "Expansion Sous-Régionale",
      badgeClass: "badge-gold-light",
      tagline: isEnglish 
        ? "National parks & Ivindo Rainforest" 
        : "Parcs nationaux & Forêt de l'Ivindo",
      coverage: "Libreville, Port-Gentil, Makokou",
      youthCount: isEnglish ? "15 pre-identified media clubs" : "15 clubs médias pré-identifiés",
      photo: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=80",
      focus: isEnglish
        ? "Marine biodiversity protection, anti-poaching initiatives, and carbon sanctuaries."
        : "Protection de la biodiversité marine, lutte contre le braconnage et sanctuaires de carbone.",
      hubs: ["Libreville", "Makokou", "Oyem"],
      description: isEnglish
        ? "Strong mobilization across grassroots radio stations and university student groups protecting Gabon's primary rainforest."
        : "Forte mobilisation autour des radios associatives et des associations étudiantes de protection de la forêt primaire gabonaise."
    },
    {
      id: "cg",
      name: isEnglish ? "Republic of the Congo" : "Congo-Brazzaville",
      status: isEnglish ? "Sub-Regional Expansion" : "Expansion Sous-Régionale",
      badgeClass: "badge-gold-light",
      tagline: isEnglish 
        ? "Congo Basin peatlands & river ecosystems" 
        : "Tourbières du Bassin du Congo & fleuve",
      coverage: "Brazzaville, Pointe-Noire, Ouesso",
      youthCount: isEnglish ? "18 partner media clubs" : "18 clubs médias partenaires",
      photo: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
      focus: isEnglish
        ? "Safeguarding the colossal Congo Basin peatlands and fostering resilience for riverine communities."
        : "Protection des gigantesques tourbières du Bassin du Congo et résilience des communautés fluviales.",
      hubs: ["Brazzaville", "Pointe-Noire", "Ouesso"],
      description: isEnglish
        ? "Establishing radio training workshops to build public awareness around the vital carbon sinks of Congolese peatlands."
        : "Création d'ateliers de formation radiophonique pour sensibiliser à l'immense réservoir de carbone des tourbières congolaises."
    },
    {
      id: "cd",
      name: isEnglish ? "DR Congo" : "RD Congo",
      status: isEnglish ? "Sub-Regional Expansion" : "Expansion Sous-Régionale",
      badgeClass: "badge-gold-light",
      tagline: isEnglish 
        ? "Heart of the Congo Basin · Megacities & Rural Lands" 
        : "Cœur du Bassin du Congo · Mégalopoles & Terroirs",
      coverage: "Kinshasa, Kisangani, Goma, Lubumbashi",
      youthCount: isEnglish ? "40 university and school organizations" : "40 structures universitaires et scolaires",
      photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
      focus: isEnglish
        ? "Preserving the great equatorial forest, advancing energy transition, and responsible resource stewardship."
        : "Préservation de la grande forêt équatoriale, transition énergétique et exploitation minière responsable.",
      hubs: ["Kinshasa", "Kisangani", "Goma"],
      description: isEnglish
        ? "Empowering a vibrant and creative university student body to produce ecological investigative podcasts at scale."
        : "Mobilisation d'une jeunesse universitaire nombreuse et créative pour produire des podcasts d'investigation écologique à large échelle."
    },
    {
      id: "cf",
      name: isEnglish ? "Central African Republic" : "République Centrafricaine",
      status: isEnglish ? "Sub-Regional Expansion" : "Expansion Sous-Régionale",
      badgeClass: "badge-gold-light",
      tagline: isEnglish 
        ? "Savanna-forest transition & Dzanga-Sangha Reserve" 
        : "Transition savane-forêt & Forêt de Dzanga-Sangha",
      coverage: "Bangui, Berberati, Nola",
      youthCount: isEnglish ? "12 targeted community radio stations" : "12 radios communautaires ciblées",
      photo: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
      focus: isEnglish
        ? "Forest elephant conservation, community eco-tourism, and radio awareness campaigns."
        : "Préservation des éléphants de forêt, éco-tourisme communautaire et sensibilisation radiophonique.",
      hubs: ["Bangui", "Berberati"],
      description: isEnglish
        ? "Providing urgent technical support to local community radios to champion peaceful environmental journalism."
        : "Appui technique d'urgence aux radios de proximité pour renforcer l'information environnementale pacifique."
    },
    {
      id: "td",
      name: isEnglish ? "Chad" : "Tchad",
      status: isEnglish ? "Sub-Regional Expansion" : "Expansion Sous-Régionale",
      badgeClass: "badge-gold-light",
      tagline: isEnglish 
        ? "Sahelian zone & Lake Chad" 
        : "Zone sahélienne & Lac Tchad",
      coverage: "N'Djamena, Moundou, Sarh",
      youthCount: isEnglish ? "15 youth media organizations" : "15 structures médias jeunes",
      photo: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
      focus: isEnglish
        ? "Restoring Lake Chad, combating desertification (Great Green Wall), and sustainable pastoralism."
        : "Restauration du Lac Tchad, lutte contre l'avancée du désert (Grande Muraille Verte) et pastoralisme.",
      hubs: ["N'Djamena", "Moundou"],
      description: isEnglish
        ? "Training young reporters on water resilience solutions and Sahelian reforestation initiatives."
        : "Formation de jeunes reporters sur les solutions d'adaptation hydrique et de reforestation sahélienne."
    }
  ];

  const current = countries.find((c) => c.id === selectedCountry) || countries[0];

  return (
    <section id="territoires" className="territories-editorial-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag-pill">
            <Globe size={16} />
            <span>{t("territoriesKicker", "Ancrage Géographique & Écosystèmes")}</span>
          </div>
          <h2 className="section-title-editorial">
            {t("territoriesTitle", "Territoires d'Intervention &")}{" "}
            <span className="text-highlight-green">{t("territoriesTitleHighlight", "Bassin du Congo")}</span>
          </h2>
          <p className="section-subtitle-editorial">
            {t("territoriesSubtitle", "Du cœur de la forêt tropicale aux rives des fleuves et zones sahéliennes, JEDDIAC connecte les jeunes voix de 6 pays d'Afrique Centrale.")}
          </p>
        </div>

        {/* Territory Selector Grid */}
        <div className="territories-tabs-row">
          {countries.map((c) => {
            const isSelected = selectedCountry === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c.id)}
                className={`territory-pill-btn ${isSelected ? "active" : ""}`}
              >
                <span className="territory-flag-code">{c.id.toUpperCase()}</span>
                <span className="territory-btn-name">{c.name}</span>
                {c.id === "cm" && <span className="territory-pilote-tag">{t("territoryPilotTag", "Pilote")}</span>}
              </button>
            );
          })}
        </div>

        {/* Selected Country Editorial Card */}
        <div className="territory-feature-card">
          <div className="territory-feature-content">
            <div className="territory-meta-header">
              <span className={`badge ${current.badgeClass}`}>
                {current.status}
              </span>
              <span className="territory-tagline">{current.tagline}</span>
            </div>

            <h3 className="territory-name-title">{current.name}</h3>
            <p className="territory-description">{current.description}</p>

            <div className="territory-stats-boxes">
              <div className="territory-stat-item">
                <span className="territory-stat-label">{t("territoryCoverageLabel", "Couverture Territoriale")}</span>
                <strong className="territory-stat-val">{current.coverage}</strong>
              </div>
              <div className="territory-stat-item">
                <span className="territory-stat-label">{t("territoryYouthLabel", "Jeunesse Cible")}</span>
                <strong className="territory-stat-val">{current.youthCount}</strong>
              </div>
            </div>

            <div className="territory-focus-box">
              <strong>{t("territoryFocusLabel", "Priorités Écologiques :")}</strong> {current.focus}
            </div>

            <div className="territory-hubs-section">
              <span className="hubs-label">{t("territoryHubsLabel", "Pôles & Hubs Relais :")}</span>
              <div className="hubs-tags-list">
                {current.hubs.map((hub, i) => (
                  <span key={i} className="hub-tag">
                    <MapPin size={12} />
                    {hub}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "1.8rem" }}>
              <button
                onClick={() => onOpenApplication(isEnglish ? `Regional Hub - ${current.name}` : `Pôle Régional - ${current.name}`)}
                className="btn btn-forest"
              >
                <span>{isEnglish ? `Join the ${current.name} Hub` : `Rejoindre le pôle ${current.name}`}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="territory-feature-photo-wrap">
            <img 
              src={current.photo} 
              alt={isEnglish ? `Landscape and biodiversity: ${current.name}` : `Paysage et biodiversité : ${current.name}`} 
              className="territory-feature-photo" 
            />
            <div className="territory-photo-caption">
              <Trees size={14} />
              <span>{t("territoryPhotoCaption", "Écosystème préservé ·")} {current.name}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
