import React, { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  fr: {
    // Utility bar
    cordinatedIn: "Bassin du Congo · Afrique Centrale",
    strategicPartner: "Partenaire Média Stratégique :",
    cohortAgenda: "Agenda des Cohortes",

    // Navigation
    navHome: "Accueil",
    navProgram: "Programme",
    navTeam: "L'Équipe",
    navAxes: "Les 5 Piliers",
    navPodcasts: "Podcasts",
    navTerritories: "Territoires",
    navContact: "Contact",
    joinNetwork: "Devenir partenaire",
    applyNow: "Candidater / Rejoindre le Réseau",

    // Strategic Axes (Méthodologie & Cadre Opérationnel)
    axesKicker: "Méthodologie & Cadre Opérationnel",
    axesTitle: "Les 5 Piliers Stratégiques",
    axesTitleHighlight: "du Programme",
    axesSubtitle: "Une approche globale et structurée qui guide chaque jeune de l'alphabétisation climatique à la production médiatique professionnelle.",
    axesKeyObjective: "Objectif Clé :",
    axesJoinBtn: "Participer à cet axe",

    // Territories (Ancrage Géographique & Écosystèmes)
    territoriesKicker: "Ancrage Géographique & Écosystèmes",
    territoriesTitle: "Territoires d'Intervention &",
    territoriesTitleHighlight: "Bassin du Congo",
    territoriesSubtitle: "Du cœur de la forêt tropicale aux rives des fleuves et zones sahéliennes, JEDDIAC connecte les jeunes voix de 6 pays d'Afrique Centrale.",
    territoryPilotTag: "Pilote",
    territoryCoverageLabel: "Couverture Territoriale",
    territoryYouthLabel: "Jeunesse Cible",
    territoryFocusLabel: "Priorités Écologiques :",
    territoryHubsLabel: "Pôles & Hubs Relais :",
    territoryJoinBtn: "Rejoindre le pôle",
    territoryPhotoCaption: "Écosystème préservé ·",

    // Hero Section
    heroKickerTag: "PROGRAMME RÉGIONAL PILOTE · 2026–2029",
    heroKickerBadge: "CEMAC · AFRIQUE CENTRALE",
    heroTitlePart1: "Faire des jeunes les",
    heroTitleHighlight: "voix de la durabilité",
    heroTitlePart2: "en Afrique centrale",
    heroLeadP1: "JEDDIAC — Jeunesse Engagée pour la Durabilité, le Développement et l’Information en Afrique Centrale — est une association loi 1901 établie en France, dont le siège social est situé à Ivry-sur-Seine. Elle porte un programme dédié à la jeunesse et au développement durable en Afrique centrale, déployé au Cameroun en phase pilote de 2026 à 2029, avant une extension progressive aux six pays de la CEMAC.",
    heroLeadP2: "JEDDIAC s’adresse aux lycéens, étudiants, futurs journalistes et communicants. Le programme mobilise les établissements scolaires et universitaires, les écoles de journalisme, les clubs médias, les radios communautaires et les médias de proximité, avec l’appui d’éducateurs, de professionnels des médias et d’acteurs du développement durable.",
    heroLead: "JEDDIAC — Jeunesse Engagée pour la Durabilité, le Développement et l’Information en Afrique Centrale — est une association loi 1901 établie en France, dont le siège social est situé à Ivry-sur-Seine. Elle porte un programme dédié à la jeunesse et au développement durable en Afrique centrale, déployé au Cameroun en phase pilote de 2026 à 2029, avant une extension progressive aux six pays de la CEMAC.",
    heroCtaProgram: "Découvrir le programme",
    heroCtaPartner: "Devenir partenaire",
    heroCtaLearnMore: "En savoir plus sur JEDDIAC (Les cinq piliers)",

    // Hero Metrics
    metricYouth: "Jeunes formés directement",
    metricPartners: "Structures accompagnées",
    metricRegions: "Pays à terme",
    metricCountries: "Personnes sensibilisées",

    // Hero Photo Tag & Status
    heroPhotoTag: "Enquête de terrain · Réserve du Dja, Cameroun",
    heroStatusTitle: "Phase Pilote Ouverte",
    heroStatusDesc: "Candidatures cohortes 2026-2027",

    // Team Section
    teamKicker: "Qui sommes-nous · Gouvernance & Réseau",
    teamTitle: "Membres",
    teamTitleHighlight: "de JEDDIAC",
    teamSubtitle: "JEDDIAC s'entoure de personnalités issues des institutions publiques, des organisations internationales, de la société civile, du monde économique, des médias et de la jeunesse. Elles accompagnent le programme à travers quatre formes d'engagement : présidence d'honneur, parrainage, ambassade et conseil.",
    teamAllProfiles: "Tous les profils",
    teamDirection: "Direction du Programme",
    teamHonoraryPresidency: "Présidence d'honneur",
    teamPatrons: "Parrain & Marraines",
    teamAdvisors: "Conseillers",
    teamAmbassadors: "Ambassadeurs",
    teamCoordination: "Direction du Programme",
    teamJournalists: "Ambassadeurs & Médias",
    teamExperts: "Conseillers & Experts",
    teamPartners: "Membres d'Honneur",
    teamSearchPlaceholder: "Rechercher un profil, un métier, une ville...",
    teamViewProfile: "Consulter le profil",
    teamJoinBannerTag: "Rejoindre l'équipe & les comités régionaux",
    teamJoinBannerTitle: "Vous êtes journaliste, scientifique ou animateur de radio locale ?",
    teamJoinBannerDesc: "JEDDIAC recrute en continu des mentors, correspondants régionaux et encadreurs d'ateliers pour la phase pilote au Cameroun et dans toute l'Afrique Centrale.",
    teamJoinBannerBtn: "Proposer ma candidature au Réseau",

    // Profile Modal
    modalProfileKicker: "Fiche Profil Membre JEDDIAC",
    modalBioTitle: "Parcours & Biographie",
    modalMissionTitle: "Mission & Rôle au sein du Réseau",
    modalContributionsTitle: "Contributions Clés & Projets",
    modalContactBtn: "Contacter via la coordination",
    modalCloseBtn: "Fermer la fiche",

    // Afrive Spotlight (Partenariat Média International & Mentorat)
    afriveTag: "Partenariat Média International & Mentorat",
    afriveHeadlinePrefix: "Synergie avec",
    afriveHeadlineSuffix: " : La voix panafricaine de la durabilité",
    afriveLeadText: "revue internationale pour le développement durable de l'Afrique, apporte son expertise éditoriale de haut niveau, son réseau de journalistes d'investigation et sa caisse de résonance médiatique aux jeunes talents formés par JEDDIAC.",
    afriveBenefit1Title: "Mentorat d'Investigation",
    afriveBenefit1Desc: "Accompagnement personnalisé par des rédacteurs en chef chevronnés sur les grands dossiers environnementaux.",
    afriveBenefit2Title: "Diffusion Panafricaine",
    afriveBenefit2Desc: "Publication des meilleurs reportages scolaires et universitaires dans les éditions imprimées et web d'AFRIVE.",
    afriveCtaBtn: "Devenir Partenaire Institutionnel",
    afriveVisionBadge: "Vision Bassin du Congo",
    afriveVisionTitle: "200 millions d'hectares, 60% de jeunes de moins de 25 ans",
    afriveVisionDesc: "Le Bassin du Congo est la 2ᵉ forêt tropicale du monde. En équipant sa jeunesse des outils du journalisme rigoureux, nous transformons une vulnérabilité en une force motrice pour le continent et la planète.",
    afriveVisionFounderName: "Jean Marie Kenfack",
    afriveVisionFounderRole: "Porteur du programme JEDDIAC",
    afriveVisionPhotoAlt: "Forêt du Bassin du Congo",

    // Impact Gallery Section
    galleryTag: "JEDDIAC sur le terrain",
    galleryTitle: "Les territoires d’action",
    galleryTitleHighlight: "de JEDDIAC",
    gallerySubtitle: "JEDDIAC déploie progressivement son modèle à l’échelle de l’Afrique centrale. Le Cameroun constitue le territoire pilote du programme pour les trois premières années, avant une extension progressive aux cinq autres pays de la CEMAC sur un horizon de dix ans.",
    galleryStat1Num: "65,3 M",
    galleryStat1Label: "Population de la CEMAC",
    galleryStat2Num: "3,0 M KM²",
    galleryStat2Label: "Territoire couvert",
    galleryStat3Num: "29–37 %",
    galleryStat3Label: "Jeunes de 10 à 14 ans selon les pays",
    galleryCloseModal: "Fermer",

    // Footer
    footerMission: "Jeunesse Engagée pour la Durabilité, le Développement et l'Information en Afrique Centrale. Le programme régional de formation et de mobilisation des jeunes médias en faveur du climat et du Bassin du Congo.",
    footerPill: "Sanctuaire Écologique du Bassin du Congo",
    footerQuickLinks: "Navigation Rapide",
    footerResources: "Ressources & Programmes",
    footerColProgram: "Le Programme",
    footerLinkContext: "Contexte & Enjeux",
    footerLinkPillars: "Les 5 Piliers Stratégiques",
    footerLinkTeam: "L'Équipe & Le Réseau",
    footerLinkTerritories: "Territoires & Bassin du Congo",
    footerLinkAgenda: "Agenda des Cohortes",
    footerColNetwork: "Réseau & Partenaires",
    footerLinkAfrive: "Revue AFRIVE (Partenaire Média)",
    footerLinkPodcasts: "Podcasts & Studios Juniors",
    footerLinkApply: "Candidater / Rejoindre le Réseau",
    footerLinkPartnership: "Proposer un Partenariat",
    footerLinkCharter: "Charte Déontologique",
    footerLinkLegal: "Mentions Légales",
    footerLinkPrivacy: "Politique de Confidentialité",
    footerNewsletterTitle: "Lettre d'Information",
    footerNewsletterDesc: "Recevez les synthèses des enquêtes de terrain, les nouveaux épisodes audio et les appels à candidatures pour les prochaines cohortes.",
    footerNewsletterPlaceholder: "Votre adresse email...",
    footerNewsletterButtonLabel: "S'inscrire à la lettre d'information",
    footerNewsletterSuccess: "Merci ! Votre inscription est validée.",
    footerCopyright: "Tous droits réservés. Programme régional indépendant en Afrique Centrale.",
    footerSynergy: "En synergie éditoriale avec",
    footerCities: "Yaoundé — Douala — Libreville — Brazzaville — Kinshasa",

    // Dedicated Pages
    backToHome: "Retour à l'accueil",
    breadcrumbHome: "Accueil",

    // All News Page
    allNewsTag: "Actualités & Communiqués Officiels",
    allNewsTitle: "Centre de Presse &",
    allNewsTitleHighlight: "Communiqués JEDDIAC",
    allNewsSubtitle: "Retrouvez l'intégralité des annonces publiques, conventions institutionnelles, comptes-rendus de missions et jalons du déploiement en Afrique Centrale.",
    allNewsSearchPlaceholder: "Rechercher dans les actualités (titre, sujet, mot-clé)...",
    allNewsViewAllBtn: "Voir toutes les Actualités & Communiqués",
    allNewsReadArticle: "Lire le communiqué complet",
    allNewsFilterAll: "Toutes les catégories",
    allNewsCount: "communiqués répertoriés",

    // All Profiles Page
    allProfilesTag: "Répertoire Officiel · Gouvernance & Réseau",
    allProfilesTitle: "L'Annuaire & les Visages",
    allProfilesTitleHighlight: "de JEDDIAC",
    allProfilesSubtitle: "Explorez la communauté pluridisciplinaire des journalistes, chercheurs, correspondants régionaux et ambassadeurs engagés pour le Bassin du Congo.",
    allProfilesSearchPlaceholder: "Rechercher par nom, métier, ville, mots-clés...",
    allProfilesViewAllBtn: "Consulter tous les profils & membres",
    allProfilesCount: "profils certifiés",
    allProfilesFilterCountry: "Tous les pays",

    // Agenda Section & All Agenda Page
    agendaKicker: "Calendrier Pédagogique & Masterclasses",
    agendaTitle: "Prochaines Sessions &",
    agendaTitleHighlight: "Formations Régionales",
    agendaSubtitle: "Inscrivez votre rédaction scolaire, radio communautaire ou collectif de jeunes reporters aux prochaines cohortes certifiantes.",
    agendaSeats: "Places Limitées",
    agendaApplyBtn: "Postuler à cette cohorte",
    agendaLoading: "Chargement des dates du programme...",
    agendaDefaultLocation: "Yaoundé & En ligne (Bimodal)",
    agendaDefaultDuration: "Session intensive 3 jours",
    agendaDefaultType: "Formation Régionale",
    allAgendaTag: "Calendrier Pédagogique & Masterclasses",
    allAgendaTitle: "Calendrier Intégral &",
    allAgendaTitleHighlight: "Formations Régionales",
    allAgendaSubtitle: "Consultez l'ensemble des cohortes, ateliers de terrain, masterclasses virtuelles et forums régionaux ouverts aux candidatures.",
    allAgendaSearchPlaceholder: "Rechercher une session, un thème, une ville...",
    allAgendaViewAllBtn: "Voir l'agenda complet des cohortes & sessions",
    allAgendaApplyBtn: "Postuler à cette session",
    allAgendaCount: "sessions programmées",
    allAgendaFilterAll: "Tous les formats",

    // Common
    teamResetFilters: "Réinitialiser les filtres",
    teamEmptyState: "Aucun profil ne correspond à votre recherche dans cette catégorie.",
    professionalNetwork: "Réseau Professionnel",
    close: "Fermer",
    loading: "Chargement...",
  },

  en: {
    // Utility bar
    cordinatedIn: "Congo Basin · Central Africa",
    strategicPartner: "Strategic Media Partner :",
    cohortAgenda: "Cohorts Agenda",

    // Navigation
    navHome: "Home",
    navProgram: "Program",
    navTeam: "Team",
    navAxes: "The 5 Pillars",
    navPodcasts: "Podcasts",
    navTerritories: "Territories",
    navContact: "Contact",
    joinNetwork: "Become a partner",
    applyNow: "Apply / Join the Network",

    // Strategic Axes (Methodology & Operational Framework)
    axesKicker: "Methodology & Operational Framework",
    axesTitle: "The 5 Strategic Pillars",
    axesTitleHighlight: "of the Program",
    axesSubtitle: "A comprehensive and structured approach guiding every youth from climate literacy to professional media production.",
    axesKeyObjective: "Key Objective :",
    axesJoinBtn: "Join this pillar",

    // Territories (Geographical Footprint & Ecosystems)
    territoriesKicker: "Geographical Footprint & Ecosystems",
    territoriesTitle: "Target Territories &",
    territoriesTitleHighlight: "Congo Basin",
    territoriesSubtitle: "From the heart of the tropical rainforest to riverbanks and Sahelian zones, JEDDIAC connects youth voices across 6 Central African nations.",
    territoryPilotTag: "Pilot",
    territoryCoverageLabel: "Territorial Coverage",
    territoryYouthLabel: "Target Youth",
    territoryFocusLabel: "Ecological Priorities :",
    territoryHubsLabel: "Regional Hubs & Outposts :",
    territoryJoinBtn: "Join the hub of",
    territoryPhotoCaption: "Preserved Ecosystem ·",

    // Hero Section
    heroKickerTag: "PILOT REGIONAL PROGRAM · 2026–2029",
    heroKickerBadge: "CEMAC · CENTRAL AFRICA",
    heroTitlePart1: "Empowering youth to be the",
    heroTitleHighlight: "voices of sustainability",
    heroTitlePart2: "in Central Africa",
    heroLeadP1: "JEDDIAC — Youth Engaged for Sustainability, Development and Information in Central Africa — is a non-profit association established in France (under the 1901 Act), headquartered in Ivry-sur-Seine. It leads a program dedicated to youth and sustainable development across Central Africa, rolled out in Cameroon as a pilot phase from 2026 to 2029, before gradual expansion to the six CEMAC countries.",
    heroLeadP2: "JEDDIAC is aimed at high schoolers, university students, aspiring journalists, and media communicators. The program mobilizes educational institutions, universities, journalism schools, media clubs, community radio stations, and grassroots media, supported by educators, media professionals, and sustainable development stakeholders.",
    heroLead: "JEDDIAC — Youth Engaged for Sustainability, Development and Information in Central Africa — is a non-profit association established in France (under the 1901 Act), headquartered in Ivry-sur-Seine. It leads a program dedicated to youth and sustainable development across Central Africa, rolled out in Cameroon as a pilot phase from 2026 to 2029, before gradual expansion to the six CEMAC countries.",
    heroCtaProgram: "Discover the program",
    heroCtaPartner: "Become a partner",
    heroCtaLearnMore: "Learn more about JEDDIAC (The five pillars)",

    // Hero Metrics
    metricYouth: "Directly trained youth",
    metricPartners: "Supported organizations",
    metricRegions: "Target countries",
    metricCountries: "People sensitized",

    // Hero Photo Tag & Status
    heroPhotoTag: "Field Investigation · Dja Reserve, Cameroon",
    heroStatusTitle: "Pilot Phase Open",
    heroStatusDesc: "2026-2027 cohort applications",

    // Team Section
    teamKicker: "Who We Are · Governance & Network",
    teamTitle: "Members",
    teamTitleHighlight: "of JEDDIAC",
    teamSubtitle: "JEDDIAC is supported by distinguished figures from public institutions, international organizations, civil society, the economy, media, and youth. They support the programme across four forms of engagement: honorary presidency, patronage, ambassadorship, and advisory.",
    teamAllProfiles: "All Profiles",
    teamDirection: "Programme Leadership",
    teamHonoraryPresidency: "Honorary Presidency",
    teamPatrons: "Patrons & Sponsors",
    teamAdvisors: "Advisors",
    teamAmbassadors: "Ambassadors",
    teamCoordination: "Programme Leadership",
    teamJournalists: "Ambassadors & Media",
    teamExperts: "Advisors & Experts",
    teamPartners: "Honorary Members",
    teamSearchPlaceholder: "Search for a profile, role, city...",
    teamViewProfile: "View profile",
    teamJoinBannerTag: "Join the team & regional committees",
    teamJoinBannerTitle: "Are you a journalist, scientist or community radio host?",
    teamJoinBannerDesc: "JEDDIAC continuously recruits mentors, regional correspondents and workshop leaders for the pilot phase across Cameroon and Central Africa.",
    teamJoinBannerBtn: "Submit application to the Network",

    // Profile Modal
    modalProfileKicker: "JEDDIAC Member Profile Sheet",
    modalBioTitle: "Background & Biography",
    modalMissionTitle: "Mission & Network Role",
    modalContributionsTitle: "Key Contributions & Projects",
    modalContactBtn: "Contact through coordination",
    modalCloseBtn: "Close profile",

    // Afrive Spotlight (International Media Partnership & Mentorship)
    afriveTag: "International Media Partnership & Mentorship",
    afriveHeadlinePrefix: "Synergy with",
    afriveHeadlineSuffix: ": The pan-African voice for sustainability",
    afriveLeadText: "an international review dedicated to Africa's sustainable development, brings its high-level editorial expertise, investigative journalism network, and media resonance to the young talents trained by JEDDIAC.",
    afriveBenefit1Title: "Investigative Mentorship",
    afriveBenefit1Desc: "One-on-one guidance by seasoned senior editors on major environmental investigations.",
    afriveBenefit2Title: "Pan-African Distribution",
    afriveBenefit2Desc: "Publication of top high school and university reports across AFRIVE print and digital editions.",
    afriveCtaBtn: "Become an Institutional Partner",
    afriveVisionBadge: "Congo Basin Vision",
    afriveVisionTitle: "200 million hectares, 60% youth under 25",
    afriveVisionDesc: "The Congo Basin is the world's second-largest tropical rainforest. By empowering its youth with rigorous journalism tools, we transform vulnerability into a driving force for the continent and the planet.",
    afriveVisionFounderName: "Jean Marie Kenfack",
    afriveVisionFounderRole: "JEDDIAC Program Leader",
    afriveVisionPhotoAlt: "Congo Basin Forest",

    // Impact Gallery Section
    galleryTag: "JEDDIAC in the field",
    galleryTitle: "Action Territories",
    galleryTitleHighlight: "of JEDDIAC",
    gallerySubtitle: "JEDDIAC is progressively rolling out its model across Central Africa. Cameroon serves as the pilot territory for the first three years, before a gradual expansion to the five other CEMAC countries over a ten-year horizon.",
    galleryStat1Num: "65.3 M",
    galleryStat1Label: "CEMAC Population",
    galleryStat2Num: "3.0 M KM²",
    galleryStat2Label: "Covered Territory",
    galleryStat3Num: "29–37%",
    galleryStat3Label: "Youth aged 10 to 14 by country",
    galleryCloseModal: "Close",

    // Footer
    footerMission: "Youth Engaged for Sustainability, Development and Information in Central Africa. Regional program training and mobilizing youth media for climate and the Congo Basin.",
    footerPill: "Congo Basin Ecological Sanctuary",
    footerQuickLinks: "Quick Navigation",
    footerResources: "Resources & Programs",
    footerColProgram: "The Program",
    footerLinkContext: "Context & Challenges",
    footerLinkPillars: "The 5 Strategic Pillars",
    footerLinkTeam: "The Team & Network",
    footerLinkTerritories: "Territories & Congo Basin",
    footerLinkAgenda: "Cohorts Agenda",
    footerColNetwork: "Network & Partners",
    footerLinkAfrive: "AFRIVE Magazine (Media Partner)",
    footerLinkPodcasts: "Podcasts & Junior Studios",
    footerLinkApply: "Apply / Join the Network",
    footerLinkPartnership: "Propose a Partnership",
    footerLinkCharter: "Ethical Charter",
    footerLinkLegal: "Legal Notice",
    footerLinkPrivacy: "Privacy Policy",
    footerNewsletterTitle: "Newsletter",
    footerNewsletterDesc: "Receive our quarterly field investigations, new audio episodes, and application calls for upcoming cohorts.",
    footerNewsletterPlaceholder: "Your email address...",
    footerNewsletterButtonLabel: "Subscribe to newsletter",
    footerNewsletterSuccess: "Thank you! Your subscription is confirmed.",
    footerCopyright: "All rights reserved. Independent regional program in Central Africa.",
    footerSynergy: "In editorial synergy with",
    footerCities: "Yaoundé — Douala — Libreville — Brazzaville — Kinshasa",

    // Dedicated Pages
    backToHome: "Back to Home",
    breadcrumbHome: "Home",

    // All News Page
    allNewsTag: "Official News & Press Releases",
    allNewsTitle: "Press Center &",
    allNewsTitleHighlight: "JEDDIAC Dispatches",
    allNewsSubtitle: "Access all public announcements, institutional agreements, mission reports, and deployment milestones across Central Africa.",
    allNewsSearchPlaceholder: "Search news (title, topic, keyword)...",
    allNewsViewAllBtn: "View all News & Press Releases",
    allNewsReadArticle: "Read full dispatch",
    allNewsFilterAll: "All categories",
    allNewsCount: "dispatches listed",

    // All Profiles Page
    allProfilesTag: "Official Directory · Governance & Network",
    allProfilesTitle: "Directory & Faces",
    allProfilesTitleHighlight: "of JEDDIAC",
    allProfilesSubtitle: "Explore the multidisciplinary community of journalists, researchers, regional correspondents, and ambassadors committed to the Congo Basin.",
    allProfilesSearchPlaceholder: "Search by name, role, city, keywords...",
    allProfilesViewAllBtn: "Browse all profiles & network members",
    allProfilesCount: "certified profiles",
    allProfilesFilterCountry: "All countries",

    // Agenda Section & All Agenda Page
    agendaKicker: "Pedagogical Calendar & Masterclasses",
    agendaTitle: "Upcoming Sessions &",
    agendaTitleHighlight: "Regional Trainings",
    agendaSubtitle: "Register your student newsroom, community radio, or youth reporter collective for upcoming certified cohorts.",
    agendaSeats: "Limited Seats",
    agendaApplyBtn: "Apply for this cohort",
    agendaLoading: "Loading program calendar...",
    agendaDefaultLocation: "Yaoundé & Online (Hybrid)",
    agendaDefaultDuration: "3-day intensive session",
    agendaDefaultType: "Regional Training",
    allAgendaTag: "Pedagogical Calendar & Masterclasses",
    allAgendaTitle: "Full Calendar &",
    allAgendaTitleHighlight: "Regional Trainings",
    allAgendaSubtitle: "Browse all upcoming cohorts, field workshops, virtual masterclasses, and regional forums open for applications.",
    allAgendaSearchPlaceholder: "Search a session, topic, city...",
    allAgendaViewAllBtn: "View full cohorts & sessions calendar",
    allAgendaApplyBtn: "Apply for this session",
    allAgendaCount: "scheduled sessions",
    allAgendaFilterAll: "All formats",

    // Common
    teamResetFilters: "Reset filters",
    teamEmptyState: "No profile matches your search in this category.",
    professionalNetwork: "Professional Network",
    close: "Close",
    loading: "Loading...",
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem("jeddiac_lang") || "fr";
    } catch {
      return "fr";
    }
  });

  const setLanguage = (lang) => {
    const validLang = lang === "en" ? "en" : "fr";
    setLanguageState(validLang);
    try {
      localStorage.setItem("jeddiac_lang", validLang);
      document.documentElement.lang = validLang;
    } catch (e) {
      console.warn("Could not save language preference:", e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key, fallback = "") => {
    const langDict = translations[language] || translations.fr;
    return langDict[key] ?? translations.fr[key] ?? fallback ?? key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        translations: translations[language] || translations.fr,
        isEnglish: language === "en",
        isFrench: language === "fr",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
