import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ImpactGallery from "./components/ImpactGallery";
import StrategicAxes from "./components/StrategicAxes";
import TeamSection from "./components/TeamSection";
import TerritoriesMap from "./components/TerritoriesMap";
import PodcastPlayer from "./components/PodcastPlayer";
import ArticlesSection from "./components/ArticlesSection";
import NewsSection from "./components/NewsSection";
import AgendaSection from "./components/AgendaSection";
import AfriveSpotlight from "./components/AfriveSpotlight";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ApplicationModal from "./components/ApplicationModal";
import AdminPortal from "./components/AdminPortal";
import PageTransitionLoader from "./components/PageTransitionLoader";
import AllNewsPage from "./pages/AllNewsPage";
import AllProfilesPage from "./pages/AllProfilesPage";
import AllArticlesPage from "./pages/AllArticlesPage";
import AllAgendaPage from "./pages/AllAgendaPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { api } from "./services/api";

function AppContent() {
  const { isEnglish, t } = useLanguage();
  const [stats, setStats] = useState({
    journalistesCibles: 20000,
    structuresPartenaires: 90,
    regionsCameroun: 10,
    paysAfriqueCentrale: 6,
    articlesPublies: 4,
    actualitesCount: 3,
    evenementsCount: 3
  });

  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [applicationSubject, setApplicationSubject] = useState("");
  const [activeSection, setActiveSection] = useState("accueil");
  const [currentView, setCurrentView] = useState("home"); // "home" | "all-news" | "all-profiles" | "all-articles" | "all-agenda" | "admin"
  const [profilesCategory, setProfilesCategory] = useState("all");

  // Page Transition Simulation State
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMsg, setTransitionMsg] = useState("");
  const [transitionSubMsg, setTransitionSubMsg] = useState("");

  // URL Hash & Route handler
  const checkRoute = useCallback(() => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();

    // Dedicated Admin Page Check
    if (
      hash === "#admin" || 
      hash === "#admin-portal" || 
      hash === "#connexion-admin" || 
      hash === "#secret-admin" ||
      path.startsWith("/admin")
    ) {
      setCurrentView("admin");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Dedicated Page Views
    if (hash === "#actualites" || hash === "#toutes-les-actualites" || hash === "#actualites-toutes" || hash === "#centre-de-presse") {
      setCurrentView("all-news");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (hash === "#profils" || hash === "#tous-les-profils" || hash === "#membres" || hash === "#equipe-complete" || hash === "#repertoire") {
      setCurrentView("all-profiles");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (hash === "#enquetes" || hash === "#toutes-les-enquetes" || hash === "#articles-tous" || hash === "#publications") {
      setCurrentView("all-articles");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (hash === "#agenda-complet" || hash === "#toutes-les-formations" || hash === "#masterclasses-toutes" || hash === "#sessions") {
      setCurrentView("all-agenda");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentView("home");
    }
  }, []);

  useEffect(() => {
    loadOverviewStats();
    checkRoute();

    // Listen to hash and popstate for route updates
    window.addEventListener("hashchange", checkRoute);
    window.addEventListener("popstate", checkRoute);

    // Keyboard shortcut for admin convenience (Ctrl+Alt+A or Alt+A)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") || (e.altKey && e.key.toLowerCase() === "a")) {
        e.preventDefault();
        if (currentView === "admin") {
          handleCloseAdmin();
        } else {
          navigateTo("admin", "#admin", isEnglish ? "Accessing Admin Portal..." : "Accès à la Console Admin...");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // ScrollSpy for active section in navbar (only active on home landing page)
    const sections = ["accueil", "programme", "equipe", "piliers", "podcasts", "articles", "agenda", "territoires", "contact"];
    const handleScroll = () => {
      if (currentView !== "home") return;
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", checkRoute);
      window.removeEventListener("popstate", checkRoute);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [checkRoute, currentView]);

  const loadOverviewStats = async () => {
    try {
      const res = await api.getOverviewStats();
      if (res) {
        setStats((prev) => ({ ...prev, ...res }));
      }
    } catch (err) {
      console.warn("Using fallback overview stats:", err);
    }
  };

  const openApplication = (subject = "") => {
    setApplicationSubject(subject);
    setApplicationModalOpen(true);
  };

  const handleCloseAdmin = () => {
    navigateTo("home", "accueil", isEnglish ? "Returning to public site..." : "Retour au site public...");
    if (window.location.hash.toLowerCase().includes("admin") || window.location.pathname.startsWith("/admin")) {
      window.history.pushState(null, "", "/#accueil");
    }
  };

  // Dedicated view navigation helpers with simulated loading transition
  const navigateTo = (view, hashTarget, customMsg, customSub) => {
    setIsTransitioning(true);
    setTransitionMsg(customMsg || (isEnglish ? "Loading data in progress..." : "Chargement des données en cours..."));
    setTransitionSubMsg(customSub || (isEnglish ? "Connecting to JEDDIAC regional network..." : "Synchronisation avec le réseau régional JEDDIAC · Bassin du Congo"));

    setTimeout(() => {
      setCurrentView(view);
      if (hashTarget) {
        window.location.hash = hashTarget;
      } else {
        window.history.pushState(null, "", window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 380);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 620);
  };

  const navigateToHomeSection = (sectionId, customMsg) => {
    if (currentView !== "home") {
      setIsTransitioning(true);
      setTransitionMsg(customMsg || (isEnglish ? "Returning to Home Page..." : "Retour à l'accueil..."));
      setTransitionSubMsg(isEnglish ? "Accessing program overview" : "Accès au programme principal JEDDIAC");

      setTimeout(() => {
        setCurrentView("home");
        window.location.hash = `#${sectionId}`;
      }, 340);

      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 440);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Dedicated Admin Console View (Completely isolated, no public views mounted underneath)
  if (currentView === "admin") {
    return (
      <div className="app-layout">
        <PageTransitionLoader 
          visible={isTransitioning}
          message={transitionMsg}
          subMessage={transitionSubMsg}
        />
        <AdminPortal onClose={handleCloseAdmin} />
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* High-Precision Page Transition Simulated Loader */}
      <PageTransitionLoader 
        visible={isTransitioning}
        message={transitionMsg}
        subMessage={transitionSubMsg}
      />

      {/* Top Institutional Navigation (NO ADMIN BUTTON) */}
      <Navbar
        onOpenApplication={() => openApplication()}
        activeSection={currentView === "home" ? activeSection : ""}
        onNavigateSection={navigateToHomeSection}
        isDedicatedPage={currentView !== "home"}
      />

      {/* Render Dedicated View OR Home Landing Page */}
      {currentView === "all-news" && (
        <AllNewsPage onBackToHome={() => navigateToHomeSection("programme")} />
      )}

      {currentView === "all-profiles" && (
        <AllProfilesPage 
          onBackToHome={() => navigateToHomeSection("equipe")} 
          initialCategory={profilesCategory}
        />
      )}

      {currentView === "all-articles" && (
        <AllArticlesPage onBackToHome={() => navigateToHomeSection("articles")} />
      )}

      {currentView === "all-agenda" && (
        <AllAgendaPage 
          onBackToHome={() => navigateToHomeSection("agenda")} 
          onOpenApplication={(sub) => openApplication(sub)}
        />
      )}

      {currentView === "home" && (
        <>
          {/* Hero Showcase with Large Authentic Photography */}
          <HeroSection
            stats={stats}
            onOpenApplication={() => openApplication("Candidature Générale")}
            onExploreAxes={() => {
              const el = document.getElementById("piliers");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />

          {/* Visual Impact Photography Mosaic / Congo Basin Dispatch */}
          <ImpactGallery />

          {/* Program News & Press Announcements */}
          <NewsSection 
            onNavigateAllNews={() => navigateTo(
              "all-news", 
              "#toutes-les-actualites",
              isEnglish ? "Loading official news & dispatches..." : "Chargement des actualités & communiqués...",
              isEnglish ? "Fetching official press releases and updates" : "Récupération des dépêches officielles et annonces JEDDIAC"
            )} 
          />

          {/* Our Team & User Profiles (inspired by Climate Chance Qui sommes-nous / Équipe - strictly non-admin) */}
          <TeamSection 
            onNavigateAllProfiles={(cat = "all") => {
              setProfilesCategory(cat);
              navigateTo(
                "all-profiles", 
                "#tous-les-profils",
                isEnglish ? "Opening member & network directory..." : "Accès au répertoire des profils & membres...",
                isEnglish ? "Synchronizing 90 partner hubs and network journalists" : "Synchronisation des 90 structures et journalistes du réseau"
              );
            }} 
          />

          {/* The 5 Strategic Axes of JEDDIAC */}
          <StrategicAxes
            onOpenApplication={() => openApplication("Participation aux 5 Piliers")}
          />

          {/* Central Africa Territories & Regional Hubs */}
          <TerritoriesMap
            onOpenApplication={() => openApplication("Candidature Pôle Régional")}
          />

          {/* Youth Media & Audio Podcast Hub */}
          <PodcastPlayer />

          {/* Solution Journalism & Investigation Reports */}
          <ArticlesSection 
            onNavigateAllArticles={() => navigateTo(
              "all-articles", 
              "#toutes-les-enquetes",
              isEnglish ? "Loading in-depth investigations & reports..." : "Chargement des grandes enquêtes & reportages...",
              isEnglish ? "Accessing Congo Basin ecological solution publications" : "Accès aux publications de solutions écologiques du Bassin du Congo"
            )} 
          />

          {/* Upcoming Cohorts & Training Workshops */}
          <AgendaSection
            onOpenApplication={(sessionTitle) => openApplication(sessionTitle)}
            onNavigateAllAgenda={() => navigateTo(
              "all-agenda", 
              "#agenda-complet",
              isEnglish ? "Loading pedagogical calendar & cohorts..." : "Chargement du calendrier pédagogique...",
              isEnglish ? "Fetching upcoming cohort dates and regional workshops" : "Récupération des cohortes, masterclasses et forums régionaux"
            )}
          />

          {/* Strategic Partnership with AFRIVE & Founder Vision */}
          <AfriveSpotlight
            onOpenApplication={() => openApplication("Partenariat Institutionnel / Média")}
          />

          {/* Direct Contact & Coordination */}
          <ContactSection />
        </>
      )}

      {/* Rich Institutional Footer (NO ADMIN BUTTON) */}
      <Footer
        onOpenApplication={() => openApplication()}
      />

      {/* Application / Join Modal */}
      <ApplicationModal
        isOpen={applicationModalOpen}
        onClose={() => setApplicationModalOpen(false)}
        prefilledSubject={applicationSubject}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
