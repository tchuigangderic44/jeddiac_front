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
      subtitle: isEnglish ? "Identifying grassroots forces" : "Repérer les forces vives",
      icon: Search,
      photo: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80",
      description: isEnglish
        ? "JEDDIAC maps partner structures territory by territory: school press clubs, student, university and community radios, and youth associations."
        : "JEDDIAC cartographie les structures partenaires territoire par territoire : clubs journaux, radios scolaires, universitaires et communautaires, et associations de jeunesse.",
      points: isEnglish
        ? [
            "Mapping media clubs and radios in urban and rural areas",
            "Assessment of newsrooms' material and pedagogical needs",
            "Engagement of local educators and community broadcasters",
            "Territorial review ensuring equitable representation"
          ]
        : [
            "Repérage des clubs médias et radios en zones urbaines et rurales",
            "Diagnostic des besoins matériels et pédagogiques des rédactions",
            "Implication des encadreurs et diffuseurs de proximité",
            "Bilan territorial pour une représentativité équitable"
          ],
      kpi: isEnglish
        ? "90+ structures mapped across Cameroon's 10 regions."
        : "90+ structures cartographiées dans les 10 régions du Cameroun.",
      quote: isEnglish
        ? "Building on existing foundations for a lasting community anchor."
        : "Construire sur l'existant pour un ancrage communautaire durable."
    },
    {
      id: "axe-2",
      number: isEnglish ? "PILLAR 02" : "AXE 02",
      title: isEnglish ? "Create & Strengthen" : "Créer & Renforcer",
      subtitle: isEnglish ? "Building youth expression spaces" : "Bâtir des espaces",
      icon: PenTool,
      photo: "/assets/creer-renforcer.png",
      description: isEnglish
        ? "Consolidating existing structures and supporting the creation of new spaces of expression where they are lacking."
        : "Consolider les structures existantes et accompagner la création de nouveaux espaces d'expression là où ils manquent.",
      points: isEnglish
        ? [
            "Creation of newspaper and media clubs",
            "Support for school radios and university web radios",
            "Pedagogical kits and methodological guides",
            "Leadership support for youth editorial boards"
          ]
        : [
            "Création de clubs journaux et clubs médias",
            "Appui aux radios scolaires et web-radios universitaires",
            "Kits pédagogiques et guides méthodologiques",
            "Accompagnement des équipes dirigeantes"
          ],
      kpi: isEnglish
        ? "Viable and sustainable structures in each pilot territory."
        : "Des structures viables et pérennes dans chaque territoire pilote.",
      quote: isEnglish
        ? "Lasting spaces of expression, driven by youth."
        : "Des espaces d'expression durables, animés par les jeunes."
    },
    {
      id: "axe-3",
      number: isEnglish ? "PILLAR 03" : "AXE 03",
      title: isEnglish ? "Train & Mentor" : "Former & Accompagner",
      subtitle: isEnglish ? "Building capacity & skills" : "Monter en compétences",
      icon: GraduationCap,
      photo: "/assets/former-accompagner.png",
      description: isEnglish
        ? "A practical and progressive curriculum combining sustainability challenges and media techniques."
        : "Un parcours pratique et progressif alliant enjeux de durabilité et techniques médiatiques.",
      points: isEnglish
        ? [
            "Workshops, masterclasses and train-the-trainer programs",
            "Fact-checking and combating disinformation",
            "Meetings and masterclasses with professional journalists",
            "Individualized mentorship for young newsrooms"
          ]
        : [
            "Ateliers, masterclass et formations de formateurs",
            "Fact-checking et lutte contre la désinformation",
            "Rencontres avec des journalistes professionnels",
            "Mentorat individualisé des jeunes rédactions"
          ],
      kpi: isEnglish
        ? "20,000 youth directly trained across the entire program."
        : "20 000 jeunes formés directement sur l'ensemble du programme.",
      quote: isEnglish
        ? "From climate literacy to solutions journalism."
        : "De l'alphabétisation climatique au journalisme de solutions."
    },
    {
      id: "axe-4",
      number: isEnglish ? "PILLAR 04" : "AXE 04",
      title: isEnglish ? "Produce & Broadcast" : "Produire & Diffuser",
      subtitle: isEnglish ? "Amplifying youth voices" : "Donner de la voix",
      icon: Radio,
      photo: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80",
      description: isEnglish
        ? "Transforming learnings into concrete editorial outputs and civic campaigns."
        : "Transformer les apprentissages en contenus concrets et en campagnes citoyennes.",
      points: isEnglish
        ? [
            "School newspapers, radio broadcasts, podcasts, reports, videos",
            "Awareness campaigns conceived and led by youth",
            "Broadcast via radio, digital platforms, and events",
            "Media promotion via strategic partner AFRIVE"
          ]
        : [
            "Journaux scolaires, émissions radio, podcasts, reportages, vidéos",
            "Campagnes de sensibilisation conçues par les jeunes",
            "Diffusion via radios, plateformes et événements",
            "Valorisation médiatique via le partenaire AFRIVE"
          ],
      kpi: isEnglish
        ? "5,000+ contents produced and broadcast on sustainability."
        : "5 000+ contenus produits et diffusés sur la durabilité.",
      quote: isEnglish
        ? "Reliable information, championed by youth."
        : "Une information fiable, portée par la jeunesse."
    },
    {
      id: "axe-5",
      number: isEnglish ? "PILLAR 05" : "AXE 05",
      title: isEnglish ? "Sustain & Unite" : "Pérenniser & Fédérer",
      subtitle: isEnglish ? "Anchoring for the long term" : "Inscrire dans la durée",
      icon: Network,
      photo: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
      description: isEnglish
        ? "Consolidating achievements and building an enduring regional network of youth media."
        : "Consolider les acquis et bâtir un réseau régional durable de jeunes médias.",
      points: isEnglish
        ? [
            "National then regional networking across Central Africa",
            "Interregional exchanges and joint reporting",
            "Engaged digital community",
            "Institutional and international partnerships"
          ]
        : [
            "Mise en réseau nationale puis régionale",
            "Échanges interrégionaux et productions conjointes",
            "Communauté numérique engagée",
            "Partenariats institutionnels et internationaux"
          ],
      kpi: isEnglish
        ? "20,000+ members in the engaged digital community."
        : "20 000+ membres dans la communauté numérique engagée.",
      quote: isEnglish
        ? "A community of practice spanning the CEMAC region."
        : "Une communauté de pratique à l'échelle de la CEMAC."
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
            <span>{t("axesKicker", "⚙ Méthodologie & cadre opérationnel")}</span>
          </div>
          <h2 className="section-title-editorial">
            {t("axesTitle", "Les 5 Piliers Stratégiques")}{" "}
            <span className="text-highlight-green">{t("axesTitleHighlight", "du Programme")}</span>
          </h2>
          <p className="section-subtitle-editorial">
            {t("axesSubtitle", "Une approche structurée qui guide chaque jeune, de l'alphabétisation climatique à la production médiatique professionnelle.")}
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
