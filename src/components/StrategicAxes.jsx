import React, { useState } from "react";
import { Search, PenTool, GraduationCap, Radio, Network, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export default function StrategicAxes({ onOpenApplication }) {
  const [activeTab, setActiveTab] = useState(0);

  const axes = [
    {
      id: "axe-1",
      number: "AXE 01",
      title: "Identifier & Cartographier",
      subtitle: "Repérer les forces vives sur le terrain",
      icon: Search,
      photo: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80",
      description: "JEDDIAC commence par cartographier minutieusement les structures partenaires territoire par territoire : clubs journaux, radios scolaires, radios universitaires et communautaires, et associations de jeunesse.",
      points: [
        "Repérage des clubs médias et radios scolaires en zones urbaines et rurales",
        "Diagnostic technique des besoins matériels et pédagogiques des rédactions",
        "Implication étroite des encadreurs éducatifs et des diffuseurs de proximité",
        "Bilan territorial pour une représentativité équitable de tous les terroirs"
      ],
      kpi: "90+ structures cartographiées dans les 10 régions du Cameroun",
      quote: "Construire sur l'existant pour garantir un ancrage communautaire indestructible."
    },
    {
      id: "axe-2",
      number: "AXE 02",
      title: "Créer & Renforcer",
      subtitle: "Faire vivre les espaces d'expression des jeunes",
      icon: PenTool,
      photo: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
      description: "JEDDIAC crée de nouvelles cellules d'expression et dote les clubs existants de kits mobiles d'enregistrement, de guides déontologiques et de chartes d'engagement pour l'environnement.",
      points: [
        "Dotation en kits mobiles pour reportage smartphone, micros cravates et enregistreurs",
        "Mise en place de comités de rédaction juniors et de mentorats locaux réguliers",
        "Priorité absolue aux zones rurales souvent exclues des grands flux d'information",
        "Structuration d'espaces d'expression libres, constructifs et scientifiques"
      ],
      kpi: "90 rédactions scolaires et studios juniors équipés",
      quote: "Donner aux jeunes les moyens techniques de porter leur voix avec rigueur et fierté."
    },
    {
      id: "axe-3",
      number: "AXE 03",
      title: "Former & Accompagner",
      subtitle: "Techniques journalistiques & enjeux de durabilité",
      icon: GraduationCap,
      photo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      description: "Les jeunes sont formés aux fondamentaux des sciences du climat et de la biodiversité du Bassin du Congo, tout en maîtrisant les compétences du journalisme moderne et du fact-checking.",
      points: [
        "Sciences du climat, biodiversité, forêts du Bassin du Congo et ODD des Nations unies",
        "Techniques d'enquête terrain, vérification des sources et fact-checking environnemental",
        "Production audio : conception d'émissions radio et de podcasts documentaires",
        "Vidéo mobile et narration sur les réseaux sociaux pour toucher des millions de pairs"
      ],
      kpi: "+20 000 jeunes journalistes en herbe et élèves formés",
      quote: "La rigueur scientifique combinée à l'énergie créative de la jeunesse africaine."
    },
    {
      id: "axe-4",
      number: "AXE 04",
      title: "Produire & Diffuser",
      subtitle: "Des contenus d'impact créés par et pour les jeunes",
      icon: Radio,
      photo: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80",
      description: "Les productions des jeunes journalistes sont diffusées à grande échelle : chroniques radio locales, podcasts immersifs, articles d'investigation et magazines scolaires.",
      points: [
        "Grilles de programmes dédiées sur les radios scolaires et communautaires partenaires",
        "Diffusion sur les plateformes numériques et réseaux sociaux jeunesse",
        "Synergie éditoriale et reprises avec les grands médias nationaux et sous-régionaux",
        "Création d'un fil d'information continu sur les solutions climatiques locales"
      ],
      kpi: "Des centaines d'heures de programmes radio et 100+ enquêtes de terrain",
      quote: "Une information de proximité qui touche les cœurs et déclenche l'action civique."
    },
    {
      id: "axe-5",
      number: "AXE 05",
      title: "Pérenniser & Fédérer",
      subtitle: "Un réseau durable à l'échelle de l'Afrique Centrale",
      icon: Network,
      photo: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
      description: "Pour que l'impact perdure, JEDDIAC tisse un réseau sous-régional solide reliant le Cameroun, le Gabon, le Congo, la RDC, la RCA et le Tchad, avec des bourses annuelles et un grand forum.",
      points: [
        "Bourses annuelles d'excellence pour les meilleurs reportages et enquêtes juniors",
        "Création du Réseau Sous-Régional des Jeunes Médias pour le Climat (RSJMC)",
        "Plaidoyer institutionnel auprès des ministères de l'Éducation et de l'Environnement",
        "Dialogue intergénérationnel et mutualisation des savoirs traditionnels et scientifiques"
      ],
      kpi: "6 pays interconnectés et un forum annuel sous-régional pérenne",
      quote: "Ancrer durablement le journalisme de solutions dans l'ADN des nouvelles générations."
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
            <span>Méthodologie & Cadre Opérationnel</span>
          </div>
          <h2 className="section-title-editorial">
            Les 5 Piliers Stratégiques <span className="text-highlight-green">du Programme</span>
          </h2>
          <p className="section-subtitle-editorial">
            Une approche globale et structurée qui guide chaque jeune de l'alphabétisation climatique à la production médiatique professionnelle.
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="axes-tab-bar">
          {axes.map((axis, index) => {
            const Icon = axis.icon;
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
                <span className="kpi-label">Objectif Clé :</span>
                <strong className="kpi-value">{currentAxis.kpi}</strong>
              </div>
            </div>

            <div className="axis-actions-row">
              <button 
                onClick={onOpenApplication}
                className="btn btn-forest"
              >
                <span>Participer à cet axe</span>
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
