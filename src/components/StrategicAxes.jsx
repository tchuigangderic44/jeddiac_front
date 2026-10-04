import React, { useState } from "react";
import { Search, PenTool, GraduationCap, Radio, Network, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function StrategicAxes({ onOpenApplication }) {
  const { isEnglish, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const axes = [
    {
      id: "axe-1",
      number: isEnglish ? "PILLAR 01" : "AXE 01",
      title: isEnglish ? "Identify & Map" : "Identifier & Cartographier",
      subtitle: isEnglish ? "Mobilizing key actors on the ground" : "Repérer les forces vives sur le terrain",
      icon: Search,
      photo: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80",
      description: isEnglish
        ? "JEDDIAC begins by thoroughly mapping partner organizations territory by territory: newspaper clubs, school radio stations, university and community radios, and youth associations."
        : "JEDDIAC commence par cartographier minutieusement les structures partenaires territoire par territoire : clubs journaux, radios scolaires, radios universitaires et communautaires, et associations de jeunesse.",
      points: isEnglish
        ? [
            "Mapping media clubs and school radios across urban and rural zones",
            "Technical assessment of newsrooms' equipment and pedagogical needs",
            "Close engagement of educational mentors and community broadcasters",
            "Territorial review to ensure equitable representation across all regions"
          ]
        : [
            "Repérage des clubs médias et radios scolaires en zones urbaines et rurales",
            "Diagnostic technique des besoins matériels et pédagogiques des rédactions",
            "Implication étroite des encadreurs éducatifs et des diffuseurs de proximité",
            "Bilan territorial pour une représentativité équitable de tous les terroirs"
          ],
      kpi: isEnglish
        ? "90+ organizations mapped across Cameroon's 10 regions"
        : "90+ structures cartographiées dans les 10 régions du Cameroun",
      quote: isEnglish
        ? "Building on existing foundations to secure an unshakeable community anchor."
        : "Construire sur l'existant pour garantir un ancrage communautaire indestructible."
    },
    {
      id: "axe-2",
      number: isEnglish ? "PILLAR 02" : "AXE 02",
      title: isEnglish ? "Create & Strengthen" : "Créer & Renforcer",
      subtitle: isEnglish ? "Empowering youth expression spaces" : "Faire vivre les espaces d'expression des jeunes",
      icon: PenTool,
      photo: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
      description: isEnglish
        ? "JEDDIAC establishes new expression hubs and equips existing clubs with mobile recording kits, ethical handbooks, and environmental commitment charters."
        : "JEDDIAC crée de nouvelles cellules d'expression et dote les clubs existants de kits mobiles d'enregistrement, de guides déontologiques et de chartes d'engagement pour l'environnement.",
      points: isEnglish
        ? [
            "Provision of mobile kits for smartphone reporting, lavalier mics, and recorders",
            "Setting up junior editorial boards and regular local mentorship sessions",
            "High priority on rural areas often left out of mainstream news flows",
            "Structuring free, constructive, and scientifically grounded expression spaces"
          ]
        : [
            "Dotation en kits mobiles pour reportage smartphone, micros cravates et enregistreurs",
            "Mise en place de comités de rédaction juniors et de mentorats locaux réguliers",
            "Priorité absolue aux zones rurales souvent exclues des grands flux d'information",
            "Structuration d'espaces d'expression libres, constructifs et scientifiques"
          ],
      kpi: isEnglish
        ? "90 school newsrooms and junior studios equipped"
        : "90 rédactions scolaires et studios juniors équipés",
      quote: isEnglish
        ? "Giving youth the technical tools to raise their voices with rigor and pride."
        : "Donner aux jeunes les moyens techniques de porter leur voix avec rigueur et fierté."
    },
    {
      id: "axe-3",
      number: isEnglish ? "PILLAR 03" : "AXE 03",
      title: isEnglish ? "Train & Mentor" : "Former & Accompagner",
      subtitle: isEnglish ? "Journalistic skills & sustainability challenges" : "Techniques journalistiques & enjeux de durabilité",
      icon: GraduationCap,
      photo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      description: isEnglish
        ? "Youth are trained in the fundamentals of climate science and Congo Basin biodiversity, while mastering modern journalism skills and fact-checking."
        : "Les jeunes sont formés aux fondamentaux des sciences du climat et de la biodiversité du Bassin du Congo, tout en maîtrisant les compétences du journalisme moderne et du fact-checking.",
      points: isEnglish
        ? [
            "Climate science, biodiversity, Congo Basin forests, and UN SDGs",
            "Field investigation methods, source verification, and environmental fact-checking",
            "Audio production: designing radio broadcasts and documentary podcasts",
            "Mobile video and social media storytelling to reach millions of peers"
          ]
        : [
            "Sciences du climat, biodiversité, forêts du Bassin du Congo et ODD des Nations unies",
            "Techniques d'enquête terrain, vérification des sources et fact-checking environnemental",
            "Production audio : conception d'émissions radio et de podcasts documentaires",
            "Vidéo mobile et narration sur les réseaux sociaux pour toucher des millions de pairs"
          ],
      kpi: isEnglish
        ? "+20,000 aspiring young journalists and students trained"
        : "+20 000 jeunes journalistes en herbe et élèves formés",
      quote: isEnglish
        ? "Scientific rigor combined with the creative drive of African youth."
        : "La rigueur scientifique combinée à l'énergie créative de la jeunesse africaine."
    },
    {
      id: "axe-4",
      number: isEnglish ? "PILLAR 04" : "AXE 04",
      title: isEnglish ? "Produce & Broadcast" : "Produire & Diffuser",
      subtitle: isEnglish ? "High-impact stories made by and for youth" : "Des contenus d'impact créés par et pour les jeunes",
      icon: Radio,
      photo: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80",
      description: isEnglish
        ? "Young journalists' productions are broadcast at scale: local radio columns, immersive podcasts, investigative features, and school magazines."
        : "Les productions des jeunes journalistes sont diffusées à grande échelle : chroniques radio locales, podcasts immersifs, articles d'investigation et magazines scolaires.",
      points: isEnglish
        ? [
            "Dedicated programming slots on partner school and community radio stations",
            "Distribution across youth-focused digital platforms and social networks",
            "Editorial synergy and syndication with major national and regional media",
            "Building a continuous newsfeed spotlighting local climate solutions"
          ]
        : [
            "Grilles de programmes dédiées sur les radios scolaires et communautaires partenaires",
            "Diffusion sur les plateformes numériques et réseaux sociaux jeunesse",
            "Synergie éditoriale et reprises avec les grands médias nationaux et sous-régionaux",
            "Création d'un fil d'information continu sur les solutions climatiques locales"
          ],
      kpi: isEnglish
        ? "Hundreds of broadcast hours and 100+ field investigations"
        : "Des centaines d'heures de programmes radio et 100+ enquêtes de terrain",
      quote: isEnglish
        ? "Grassroots reporting that touches hearts and sparks civic action."
        : "Une information de proximité qui touche les cœurs et déclenche l'action civique."
    },
    {
      id: "axe-5",
      number: isEnglish ? "PILLAR 05" : "AXE 05",
      title: isEnglish ? "Sustain & Unite" : "Pérenniser & Fédérer",
      subtitle: isEnglish ? "A lasting network across Central Africa" : "Un réseau durable à l'échelle de l'Afrique Centrale",
      icon: Network,
      photo: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
      description: isEnglish
        ? "To ensure lasting impact, JEDDIAC weaves a robust sub-regional network connecting Cameroon, Gabon, Congo, DRC, CAR, and Chad, featuring annual grants and a flagship forum."
        : "Pour que l'impact perdure, JEDDIAC tisse un réseau sous-régional solide reliant le Cameroun, le Gabon, le Congo, la RDC, la RCA et le Tchad, avec des bourses annuelles et un grand forum.",
      points: isEnglish
        ? [
            "Annual excellence grants for standout junior reporting and investigations",
            "Establishment of the Sub-Regional Youth Climate Media Network (SYCMN)",
            "Institutional advocacy with Ministries of Education and the Environment",
            "Intergenerational dialogue bridging traditional wisdom with scientific insights"
          ]
        : [
            "Bourses annuelles d'excellence pour les meilleurs reportages et enquêtes juniors",
            "Création du Réseau Sous-Régional des Jeunes Médias pour le Climat (RSJMC)",
            "Plaidoyer institutionnel auprès des ministères de l'Éducation et de l'Environnement",
            "Dialogue intergénérationnel et mutualisation des savoirs traditionnels et scientifiques"
          ],
      kpi: isEnglish
        ? "6 interconnected nations and a standing annual sub-regional forum"
        : "6 pays interconnectés et un forum annuel sous-régional pérenne",
      quote: isEnglish
        ? "Deeply rooting solution journalism in the DNA of new generations."
        : "Ancrer durablement le journalisme de solutions dans l'ADN des nouvelles générations."
    }
  ];

  const currentAxis = axes[activeTab];

  return (
    <section id="piliers" className="axes-editorial-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag-pill">
            <Sparkles size={16} />
            <span>{t("axesKicker", "Méthodologie & Cadre Opérationnel")}</span>
          </div>
          <h2 className="section-title-editorial">
            {t("axesTitle", "Les 5 Piliers Stratégiques")}{" "}
            <span className="text-highlight-green">{t("axesTitleHighlight", "du Programme")}</span>
          </h2>
          <p className="section-subtitle-editorial">
            {t("axesSubtitle", "Une approche globale et structurée qui guide chaque jeune de l'alphabétisation climatique à la production médiatique professionnelle.")}
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="axes-tab-bar">
          {axes.map((axis, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={axis.id}
                onClick={() => setActiveTab(index)}
                className={`axis-tab-pill ${isActive ? "active" : ""}`}
              >
                <span className="axis-tab-num">{axis.number}</span>
                <span className="axis-tab-title">{axis.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Axis Card Showcase */}
        <div className="axis-showcase-card">
          <div className="axis-info-col">
            <div className="axis-card-badge-row">
              <span className="badge badge-green-light">
                {currentAxis.number}
              </span>
              <span className="axis-card-subtitle">{currentAxis.subtitle}</span>
            </div>

            <h3 className="axis-card-title">{currentAxis.title}</h3>
            <p className="axis-card-desc">{currentAxis.description}</p>

            <div className="axis-points-list">
              {currentAxis.points.map((pt, i) => (
                <div key={i} className="axis-point-item">
                  <CheckCircle2 size={18} className="axis-point-icon" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="axis-kpi-banner">
              <div className="axis-kpi-metric">
                <span className="kpi-label">{t("axesKeyObjective", "Objectif Clé :")}</span>
                <strong className="kpi-value">{currentAxis.kpi}</strong>
              </div>
            </div>

            <div className="axis-actions-row">
              <button 
                onClick={onOpenApplication}
                className="btn btn-forest"
              >
                <span>{t("axesJoinBtn", "Participer à cet axe")}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="axis-photo-col">
            <div className="axis-photo-wrapper">
              <img 
                src={currentAxis.photo} 
                alt={currentAxis.title} 
                className="axis-photo-img" 
              />
              <div className="axis-quote-box">
                <p>« {currentAxis.quote} »</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
