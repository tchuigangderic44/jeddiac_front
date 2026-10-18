import React from "react";
import { Globe, ArrowRight, Trees, Sparkles, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const COUNTRIES_DATA = [
  {
    id: "cm",
    flag: "🇨🇲",
    name: "Cameroun",
    nameEn: "Cameroon",
    isPilot: true,
    statusBadge: "PHASE PILOTE · 2026–2029",
    statusBadgeEn: "PILOT PHASE · 2026–2029",
    statusNote: "🇨🇲 Pays pilote de la CEMAC",
    statusNoteEn: "🇨🇲 CEMAC Pilot Country",
    identity: "✦ Le laboratoire régional de JEDDIAC",
    identityEn: "✦ The regional laboratory of JEDDIAC",
    description: "Déploiement initial dans les 10 régions du pays à travers les établissements scolaires et universitaires, les clubs médias, les radios communautaires et les réseaux de jeunes.",
    descriptionEn: "Initial rollout across the country's 10 regions through secondary and higher education institutions, media clubs, community radio stations, and youth networks.",
    priorities: [
      "Journalisme environnemental",
      "Formation",
      "Clubs médias",
      "Production",
      "Campagnes locales"
    ],
    prioritiesEn: [
      "Environmental journalism",
      "Training",
      "Media clubs",
      "Production",
      "Local campaigns"
    ],
    landmark: "Chutes d'Ekom Nkam & Forêt équatoriale du Dja",
    landmarkEn: "Ekom Nkam Falls & Dja Rainforest",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&auto=format&fit=crop&q=85"
  },
  {
    id: "ga",
    flag: "🇬🇦",
    name: "Gabon",
    nameEn: "Gabon",
    isPilot: false,
    statusBadge: "EXPANSION CEMAC",
    statusBadgeEn: "CEMAC EXPANSION",
    identity: "Forêts, biodiversité & territoires",
    identityEn: "Forests, biodiversity & territories",
    description: "Déployer le modèle JEDDIAC auprès des jeunes médias en s'appuyant sur les enjeux de forêt, biodiversité et résilience des territoires.",
    descriptionEn: "Roll out the JEDDIAC model with young media, leveraging forest, biodiversity, and territorial resilience challenges.",
    priorities: [
      "Forêts",
      "Biodiversité",
      "Climat"
    ],
    prioritiesEn: [
      "Forests",
      "Biodiversity",
      "Climate"
    ],
    landmark: "Parc National de Loango & Canopée de l'Ivindo",
    landmarkEn: "Loango National Park & Ivindo Canopy",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "cg",
    flag: "🇨🇬",
    name: "Congo",
    nameEn: "Congo",
    isPilot: false,
    statusBadge: "EXPANSION CEMAC",
    statusBadgeEn: "CEMAC EXPANSION",
    identity: "Forêts, villes & communautés",
    identityEn: "Forests, cities & communities",
    description: "Adapter le programme aux territoires forestiers et urbains, en renforçant la capacité des jeunes à produire une information locale.",
    descriptionEn: "Tailor the program to forested and urban territories, boosting youth capacity to produce local reporting.",
    priorities: [
      "Forêts",
      "Déchets",
      "Villes"
    ],
    prioritiesEn: [
      "Forests",
      "Waste management",
      "Cities"
    ],
    landmark: "Sanctuaire des Tourbières & Fleuve Congo",
    landmarkEn: "Peatlands Sanctuary & Congo River",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "cf",
    flag: "🇨🇫",
    name: "Centrafrique",
    nameEn: "Central African Republic",
    isPilot: false,
    statusBadge: "EXPANSION CEMAC",
    statusBadgeEn: "CEMAC EXPANSION",
    identity: "Jeunesse, territoires & résilience",
    identityEn: "Youth, territories & resilience",
    description: "Développer des espaces de formation, de production médiatique et de sensibilisation adaptés aux réalités locales.",
    descriptionEn: "Establish training, media production, and awareness hubs tailored to local realities.",
    priorities: [
      "Résilience",
      "Environnement",
      "Citoyenneté"
    ],
    prioritiesEn: [
      "Resilience",
      "Environment",
      "Citizenship"
    ],
    landmark: "Réserve de Dzanga-Sangha & Forêt dense",
    landmarkEn: "Dzanga-Sangha Reserve & Dense Forest",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "td",
    flag: "🇹🇩",
    name: "Tchad",
    nameEn: "Chad",
    isPilot: false,
    statusBadge: "EXPANSION CEMAC",
    statusBadgeEn: "CEMAC EXPANSION",
    identity: "Climat, eau & adaptation",
    identityEn: "Climate, water & adaptation",
    description: "Adapter les contenus aux enjeux sahéliens : eau, changement climatique, agriculture et résilience.",
    descriptionEn: "Adapt educational modules to the stakes of Sahelian territories: water access, climate change, agriculture, and resilience.",
    priorities: [
      "Eau",
      "Climat",
      "Agriculture"
    ],
    prioritiesEn: [
      "Water",
      "Climate",
      "Agriculture"
    ],
    landmark: "Bassin du Lac Tchad & Oasis sahéliennes",
    landmarkEn: "Lake Chad Basin & Sahelian Oasis",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "gq",
    flag: "🇬🇶",
    name: "Guinée Équatoriale",
    nameEn: "Equatorial Guinea",
    isPilot: false,
    statusBadge: "EXPANSION CEMAC",
    statusBadgeEn: "CEMAC EXPANSION",
    identity: "Littoral, biodiversité & jeunesse",
    identityEn: "Coastline, biodiversity & youth",
    description: "Développer les capacités des jeunes médias autour du littoral, des écosystèmes et de la sensibilisation.",
    descriptionEn: "Develop young media capacity around coastal ecosystems, biodiversity, and environmental sensitization.",
    priorities: [
      "Littoral",
      "Biodiversité",
      "Jeunesse"
    ],
    prioritiesEn: [
      "Coastline",
      "Biodiversity",
      "Youth"
    ],
    landmark: "Littoral sauvage de Bioko & Pico Basile",
    landmarkEn: "Wild Coastline of Bioko & Pico Basile",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"
  }
];

export default function TerritoriesMap({ onOpenApplication }) {
  const { isEnglish, t } = useLanguage();

  const pilotCountry = COUNTRIES_DATA.find((c) => c.isPilot) || COUNTRIES_DATA[0];
  const expansionCountries = COUNTRIES_DATA.filter((c) => !c.isPilot);

  return (
    <section id="territoires" className="territories-editorial-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag-pill">
            <Globe size={16} />
            <span>{t("territoriesKicker", "Ancrage géographique · zone CEMAC")}</span>
          </div>
          <h2 className="section-title-editorial">
            {t("territoriesTitle", "Territoires d'intervention en")}{" "}
            <span className="text-highlight-green">{t("territoriesTitleHighlight", "Afrique centrale")}</span>
          </h2>
          <p className="section-subtitle-editorial">
            {t("territoriesSubtitle", "JEDDIAC intervient dans les six pays de la CEMAC. Le Cameroun, pays pilote, ouvre la voie ; l'ensemble s'inscrit dans le contexte écologique du bassin du Congo.")}
          </p>
        </div>

        {/* 6 Country Cards Grid */}
        <div className="territories-cards-wrapper">
          {/* 1. CAMEROON — Visually dominant pilot card */}
          <div className="territory-card territory-card-pilot">
            <div className="territory-pilot-visual">
              <img
                src={pilotCountry.image}
                alt={isEnglish ? pilotCountry.landmarkEn : pilotCountry.landmark}
                className="territory-pilot-photo"
                loading="lazy"
              />
              <div className="territory-photo-overlay-gradient" />
              <div className="territory-photo-badge-top">
                <span className="pilot-live-indicator">
                  <span className="pulse-dot" />
                  {isEnglish ? pilotCountry.statusBadgeEn : pilotCountry.statusBadge}
                </span>
              </div>
              <div className="territory-photo-caption-bottom">
                <Trees size={14} />
                <span>{isEnglish ? pilotCountry.landmarkEn : pilotCountry.landmark}</span>
              </div>
            </div>

            <div className="territory-pilot-body">
              <div className="territory-pilot-header">
                <div className="territory-country-badge-row">
                  <div>
                    <span className="territory-kicker-pilot">
                      {isEnglish ? pilotCountry.statusNoteEn : pilotCountry.statusNote}
                    </span>
                    <h3 className="territory-country-title">
                      {isEnglish ? pilotCountry.nameEn : pilotCountry.name}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="territory-identity-box">
                <Sparkles size={16} className="text-gold-icon" />
                <h4 className="territory-identity-title">
                  {isEnglish ? pilotCountry.identityEn : pilotCountry.identity}
                </h4>
              </div>

              <p className="territory-description-text">
                {isEnglish ? pilotCountry.descriptionEn : pilotCountry.description}
              </p>

              <div className="territory-priorities-block">
                <span className="priorities-label">
                  {isEnglish ? "Priorities :" : "Priorités :"}
                </span>
                <div className="priorities-tags-list">
                  {(isEnglish ? pilotCountry.prioritiesEn : pilotCountry.priorities).map((p, idx) => (
                    <span key={idx} className="priority-pill priority-pill-pilot">
                      <CheckCircle2 size={12} />
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="territory-action-row">
                <button
                  onClick={() => onOpenApplication && onOpenApplication(isEnglish ? `Pilot Territory - ${pilotCountry.nameEn}` : `Territoire Pilote - ${pilotCountry.name}`)}
                  className="btn btn-forest"
                >
                  <span>{isEnglish ? `Join the ${pilotCountry.nameEn} Pilot Hub` : `Rejoindre le pôle pilote ${pilotCountry.name}`}</span>
                  <ArrowRight size={16} />
                </button>
                <span className="territory-pilot-statut-pill">
                  {isEnglish ? "Status : Pilot phase" : "Statut : Phase pilote"}
                </span>
              </div>
            </div>
          </div>

          {/* Sub-heading for CEMAC expansion countries */}
          <div className="territories-expansion-divider">
            <div className="divider-line" />
            <span className="divider-tag">
              {t("territoriesExpansionTag", isEnglish ? "Progressive expansion — 5 other CEMAC nations" : "Extension progressive — 5 autres pays de la CEMAC")}
            </span>
            <div className="divider-line" />
          </div>

          {/* 2 to 6. The 5 CEMAC Expansion Country Cards */}
          <div className="territories-expansion-grid">
            {expansionCountries.map((c) => {
              const countryName = isEnglish ? c.nameEn : c.name;
              const identity = isEnglish ? c.identityEn : c.identity;
              const description = isEnglish ? c.descriptionEn : c.description;
              const priorities = isEnglish ? c.prioritiesEn : c.priorities;
              const landmark = isEnglish ? c.landmarkEn : c.landmark;
              const statusBadge = isEnglish ? c.statusBadgeEn : c.statusBadge;

              return (
                <div key={c.id} className="territory-card territory-card-expansion">
                  {/* Card Photo Header */}
                  <div className="territory-card-photo-wrap">
                    <img
                      src={c.image}
                      alt={landmark}
                      className="territory-card-photo"
                      loading="lazy"
                    />
                    <div className="territory-card-photo-overlay" />
                    <span className="territory-card-status-badge">
                      {statusBadge}
                    </span>
                    <div className="territory-card-landmark-tag">
                      <Trees size={13} />
                      <span>{landmark}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="territory-card-body">
                    <div className="territory-card-title-row">
                      <span className="territory-flag-inline">{c.flag}</span>
                      <h3 className="territory-card-country-name">{countryName}</h3>
                    </div>

                    <div className="territory-card-identity">
                      <h4 className="territory-identity-heading">{identity}</h4>
                    </div>

                    <p className="territory-card-desc">{description}</p>

                    <div className="territory-priorities-block">
                      <span className="priorities-label">
                        {isEnglish ? "Priorities :" : "Priorités :"}
                      </span>
                      <div className="priorities-tags-list">
                        {priorities.map((item, i) => (
                          <span key={i} className="priority-pill">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="territory-card-footer">
                      <button
                        onClick={() => onOpenApplication && onOpenApplication(isEnglish ? `Regional Outpost - ${countryName}` : `Pôle Relais - ${countryName}`)}
                        className="btn-link-territory"
                      >
                        <span>{isEnglish ? `Join ${countryName} Hub` : `Rejoindre le pôle ${countryName}`}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Context · Congo Basin Card */}
            <div className="territory-card territory-card-congo-context">
              <div className="congo-context-content">
                <span className="congo-context-badge">
                  <Trees size={15} />
                  <span>{isEnglish ? "Ecological Sanctuary" : "Sanctuaire Écologique"}</span>
                </span>
                <h4 className="congo-context-title">
                  {t("territoriesCongoContextTitle", "Contexte · Bassin du Congo")}
                </h4>
                <p className="congo-context-desc">
                  {t("territoriesCongoContextDesc", "2ᵉ forêt tropicale du monde, ~70 % du couvert forestier africain. JEDDIAC inscrit son action dans cet écosystème, aux côtés des six pays de la CEMAC.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
