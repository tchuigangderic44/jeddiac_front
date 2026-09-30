import React, { useState, useEffect } from "react";
import { 
  Shield, 
  LayoutDashboard, 
  FileText, 
  Bell, 
  Calendar, 
  Mail, 
  Users, 
  ArrowLeft, 
  LogOut, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Send,
  Sparkles,
  Lock,
  RefreshCw,
  Search,
  Filter,
  Check,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Tag,
  Clock,
  MapPin,
  Globe
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { api } from "../services/api";

export default function AdminPortal({ onClose }) {
  const { user, token, isAdmin, loginAdmin, logout, loading: authLoading } = useAuth();
  const { isEnglish, language, setLanguage } = useLanguage();

  // Login form state
  const [email, setEmail] = useState("admin@organization.org");
  const [password, setPassword] = useState("Admin@123456");
  const [loginError, setLoginError] = useState(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Admin Data state
  const [stats, setStats] = useState(null);
  const [articles, setArticles] = useState([]);
  const [news, setNews] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Modals for creating items
  const [newArticleOpen, setNewArticleOpen] = useState(false);
  const [articleForm, setArticleForm] = useState({
    title: "",
    category: "Investigation & Climat",
    summary: "",
    content: "",
    tags: "Climat, Bassin du Congo"
  });

  const [newNewsOpen, setNewNewsOpen] = useState(false);
  const [newsForm, setNewsForm] = useState({
    title: "",
    category: "Communiqué",
    summary: "",
    content: "",
    tags: "Annonce, 2026"
  });

  const [newAgendaOpen, setNewAgendaOpen] = useState(false);
  const [agendaForm, setAgendaForm] = useState({
    title: "",
    type: "Formation Régionale",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    location: "Yaoundé · Hybride",
    description: "",
    registrationLink: "/candidature"
  });

  useEffect(() => {
    if (isAdmin && token) {
      loadAllAdminData();
    }
  }, [isAdmin, token]);

  const loadAllAdminData = async () => {
    setDataLoading(true);
    try {
      const [statsRes, articlesRes, newsRes, agendaRes, contactsRes, newsletterRes, usersRes] = await Promise.all([
        api.getAdminStats(token).catch(() => null),
        api.getArticles("?limit=50").catch(() => ({ values: [] })),
        api.getNews("?limit=50").catch(() => ({ values: [] })),
        api.getAgendas("?limit=50").catch(() => ({ values: [] })),
        api.getAdminContacts(token, "?limit=50").catch(() => ({ data: [], values: [] })),
        api.getAdminNewsletters(token, "?limit=50").catch(() => ({ data: [], values: [] })),
        api.getAdminUsers(token, "?limit=50").catch(() => ({ data: [], values: [] }))
      ]);

      if (statsRes) setStats(statsRes);
      if (articlesRes?.values) setArticles(articlesRes.values);
      if (newsRes?.values) setNews(newsRes.values);
      if (agendaRes?.values) setAgendas(agendaRes.values);
      if (contactsRes) setContacts(contactsRes.data || contactsRes.values || []);
      if (newsletterRes) setNewsletters(newsletterRes.data || newsletterRes.values || []);
      if (usersRes) setUsersList(usersRes.data || usersRes.values || []);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    const res = await loginAdmin(email, password);
    if (!res.success) {
      setLoginError(res.error || (isEnglish ? "Authentication failed." : "Échec de connexion."));
    }
  };

  // Article Actions
  const handleCreateArticle = async (e) => {
    e.preventDefault();
    try {
      await api.createArticle(token, articleForm);
      setNewArticleOpen(false);
      setArticleForm({ title: "", category: "Investigation & Climat", summary: "", content: "", tags: "Climat, Bassin du Congo" });
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!confirm(isEnglish ? "Delete this article permanently?" : "Voulez-vous vraiment supprimer cet article ?")) return;
    try {
      await api.deleteArticle(token, id);
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  // News Actions
  const handleCreateNews = async (e) => {
    e.preventDefault();
    try {
      await api.createNews(token, newsForm);
      setNewNewsOpen(false);
      setNewsForm({ title: "", category: "Communiqué", summary: "", content: "", tags: "Annonce, 2026" });
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!confirm(isEnglish ? "Delete this announcement?" : "Supprimer cette actualité ?")) return;
    try {
      await api.deleteNews(token, id);
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  // Agenda Actions
  const handleCreateAgenda = async (e) => {
    e.preventDefault();
    try {
      await api.createAgenda(token, agendaForm);
      setNewAgendaOpen(false);
      setAgendaForm({
        title: "",
        type: "Formation Régionale",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
        location: "Yaoundé · Hybride",
        description: "",
        registrationLink: "/candidature"
      });
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  const handleDeleteAgenda = async (id) => {
    if (!confirm(isEnglish ? "Delete this session?" : "Supprimer cette session ?")) return;
    try {
      await api.deleteAgenda(token, id);
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  // Contact Actions
  const handleMarkRead = async (id) => {
    try {
      await api.markContactRead(token, id);
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!confirm(isEnglish ? "Delete this inquiry message?" : "Supprimer ce message ?")) return;
    try {
      await api.deleteContact(token, id);
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  // Filtered queries
  const q = searchQuery.toLowerCase().trim();
  const filteredArticles = articles.filter(a => !q || a.title?.toLowerCase().includes(q) || a.category?.toLowerCase().includes(q));
  const filteredNews = news.filter(n => !q || n.title?.toLowerCase().includes(q) || n.category?.toLowerCase().includes(q));
  const filteredAgendas = agendas.filter(ag => !q || ag.title?.toLowerCase().includes(q) || ag.location?.toLowerCase().includes(q) || ag.type?.toLowerCase().includes(q));
  const filteredContacts = contacts.filter(c => !q || c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.subject?.toLowerCase().includes(q));
  const filteredUsers = usersList.filter(u => !q || u.firstName?.toLowerCase().includes(q) || u.lastName?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q));

  // ==========================================
  // VIEW: ADMIN AUTHENTICATION (Matching Brand)
  // ==========================================
  if (!user || !isAdmin) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-card">
          <button 
            onClick={onClose} 
            className="modal-close-btn"
            title={isEnglish ? "Return to public site" : "Retour au site public"}
            aria-label="Fermer"
          >
            <ArrowLeft size={18} />
          </button>

          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <img 
              src="/assets/jeddiac-lineaire-transparent.png" 
              alt="JEDDIAC" 
              style={{ height: "42px", objectFit: "contain", margin: "0 auto 1.25rem" }} 
            />
            <div className="section-tag-pill" style={{ margin: "0 auto 0.75rem" }}>
              <Shield size={14} />
              <span>{isEnglish ? "Restricted Access" : "Accès Réservé"}</span>
            </div>
            <h2 style={{ fontSize: "1.75rem", fontFamily: "var(--font-serif)", fontWeight: 800, color: "#13221B", lineHeight: 1.25 }}>
              Console <span className="text-highlight-green">{isEnglish ? "Administration" : "d'Administration"}</span>
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#5A7367", marginTop: "0.5rem", lineHeight: 1.5 }}>
              {isEnglish 
                ? "Secure portal for managing JEDDIAC programs, dispatches and cohorts."
                : "Espace sécurisé de gestion et modération du programme JEDDIAC."}
            </p>
          </div>

          {loginError && (
            <div style={{ 
              background: "#FEF2F2", 
              border: "1px solid #FCA5A5", 
              borderRadius: "10px", 
              padding: "0.85rem", 
              color: "#991B1B", 
              fontSize: "0.88rem", 
              marginBottom: "1.25rem", 
              display: "flex", 
              alignItems: "center", 
              gap: "0.5rem" 
            }}>
              <AlertCircle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" style={{ color: "#13221B" }}>
                {isEnglish ? "Administrator Email" : "Identifiant Administrateur"}
              </label>
              <input
                type="email"
                required
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@organization.org"
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: "#13221B" }}>
                {isEnglish ? "Secure Password" : "Mot de Passe Sécurisé"}
              </label>
              <input
                type="password"
                required
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="btn btn-forest"
              style={{ width: "100%", justifyContent: "center", marginTop: "1rem", padding: "0.75rem" }}
            >
              <Lock size={16} />
              <span>{authLoading ? (isEnglish ? "Signing in..." : "Authentification...") : (isEnglish ? "Access Dashboard" : "Accéder au Tableau de Bord")}</span>
            </button>
          </form>

          <div style={{ marginTop: "1.8rem", paddingTop: "1.2rem", borderTop: "1px solid #E5EBE7", fontSize: "0.82rem", color: "#6A8278", textAlign: "center" }}>
            <span>{isEnglish ? "Demo credentials" : "Identifiants Démo"} : <strong>admin@organization.org</strong> / <strong>Admin@123456</strong></span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: LOGGED IN ADMIN CONSOLE
  // ==========================================
  return (
    <div className="admin-portal-wrapper">
      {/* Admin Top Navigation Bar */}
      <header className="admin-header">
        <div className="admin-header-left">
          <button 
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="admin-mobile-toggle"
            aria-label="Menu"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="admin-header-brand">
            <img 
              src="/assets/jeddiac-lineaire-transparent.png" 
              alt="JEDDIAC" 
              className="admin-brand-logo" 
            />
            <span className="admin-brand-badge">
              {isEnglish ? "Admin Console" : "Console Admin"}
            </span>
          </div>
        </div>

        <div className="admin-header-actions">
          <button
            onClick={loadAllAdminData}
            className="btn btn-outline-forest btn-sm"
            title={isEnglish ? "Refresh all data" : "Rafraîchir les données"}
            style={{ gap: "0.45rem" }}
          >
            <RefreshCw size={14} className={dataLoading ? "animate-spin" : ""} />
            <span className="hide-on-mobile">{isEnglish ? "Refresh" : "Actualiser"}</span>
          </button>

          {/* User Status Badge */}
          <div className="admin-user-pill hide-on-mobile">
            <Shield size={14} />
            <span>{user.firstName || "Admin"} (Super Admin)</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            className="btn btn-outline-forest btn-sm"
            title="Langue / Language"
            style={{ padding: "0.35rem 0.65rem", fontSize: "0.78rem" }}
          >
            <Globe size={13} />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Return to Public Site Button */}
          <button 
            onClick={onClose}
            className="btn btn-header-back"
            style={{ padding: "0.45rem 1rem", fontSize: "0.84rem" }}
            title={isEnglish ? "Return to public site" : "Retour au site public"}
          >
            <ArrowLeft size={16} />
            <span className="hide-on-mobile">{isEnglish ? "Public Site" : "Site Public"}</span>
          </button>

          {/* Sign Out */}
          <button 
            onClick={logout}
            className="btn-action-delete"
            style={{ padding: "0.45rem 0.75rem" }}
            title={isEnglish ? "Sign out" : "Déconnexion"}
          >
            <LogOut size={15} />
          </button>
        </div>
      </header>

      {/* Main Admin Layout */}
      <div className="admin-layout">
        {/* Mobile Sidebar Backdrop */}
        {mobileSidebarOpen && (
          <div 
            className="admin-sidebar-backdrop" 
            onClick={() => setMobileSidebarOpen(false)} 
          />
        )}

        {/* Sidebar Navigation */}
        <aside className={`admin-sidebar ${mobileSidebarOpen ? "mobile-open" : ""}`}>
          <div className="admin-sidebar-section-title">
            {isEnglish ? "Main Navigation" : "Navigation Principale"}
          </div>

          <div
            onClick={() => { setActiveTab("dashboard"); setMobileSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
          >
            <div className="admin-nav-item-content">
              <LayoutDashboard size={18} />
              <span>{isEnglish ? "Overview" : "Vue d'Ensemble"}</span>
            </div>
          </div>

          <div
            onClick={() => { setActiveTab("articles"); setMobileSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === "articles" ? "active" : ""}`}
          >
            <div className="admin-nav-item-content">
              <FileText size={18} />
              <span>{isEnglish ? "Investigations" : "Articles & Enquêtes"}</span>
            </div>
            <span className="admin-nav-badge">{articles.length}</span>
          </div>

          <div
            onClick={() => { setActiveTab("news"); setMobileSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === "news" ? "active" : ""}`}
          >
            <div className="admin-nav-item-content">
              <Bell size={18} />
              <span>{isEnglish ? "News & Press" : "Actualités & Annonces"}</span>
            </div>
            <span className="admin-nav-badge">{news.length}</span>
          </div>

          <div
            onClick={() => { setActiveTab("agenda"); setMobileSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === "agenda" ? "active" : ""}`}
          >
            <div className="admin-nav-item-content">
              <Calendar size={18} />
              <span>{isEnglish ? "Pedagogical Agenda" : "Agenda & Formations"}</span>
            </div>
            <span className="admin-nav-badge">{agendas.length}</span>
          </div>

          <div className="admin-sidebar-section-title" style={{ marginTop: "1.2rem" }}>
            {isEnglish ? "Engagements & Users" : "Relations & Membres"}
          </div>

          <div
            onClick={() => { setActiveTab("contacts"); setMobileSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === "contacts" ? "active" : ""}`}
          >
            <div className="admin-nav-item-content">
              <Mail size={18} />
              <span>{isEnglish ? "Inquiries & Cohorts" : "Candidatures & Messages"}</span>
            </div>
            {contacts.filter(c => !c.isRead).length > 0 && (
              <span className="badge badge-gold" style={{ fontSize: "0.72rem" }}>
                {contacts.filter(c => !c.isRead).length} new
              </span>
            )}
          </div>

          <div
            onClick={() => { setActiveTab("newsletter"); setMobileSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === "newsletter" ? "active" : ""}`}
          >
            <div className="admin-nav-item-content">
              <Send size={18} />
              <span>{isEnglish ? "Newsletter Readers" : "Abonnés Newsletter"}</span>
            </div>
            <span className="admin-nav-badge">{newsletters.length}</span>
          </div>

          <div
            onClick={() => { setActiveTab("users"); setMobileSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === "users" ? "active" : ""}`}
          >
            <div className="admin-nav-item-content">
              <Users size={18} />
              <span>{isEnglish ? "Network Directory" : "Membres & Comptes"}</span>
            </div>
            <span className="admin-nav-badge">{usersList.length}</span>
          </div>
        </aside>

        {/* Content Area */}
        <main className="admin-content">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">
                    {isEnglish ? "Regional Control Center" : "Tableau de Bord Régional"}
                  </h1>
                  <p className="admin-page-subtitle">
                    {isEnglish 
                      ? "Key program indicators, publication metrics and incoming communications in real-time."
                      : "Indicateurs clés du programme JEDDIAC, état des publications et flux communautaires en temps réel."}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button onClick={() => setNewArticleOpen(true)} className="btn btn-forest btn-sm">
                    <Plus size={16} />
                    <span>{isEnglish ? "New Article" : "Nouvel Article"}</span>
                  </button>
                  <button onClick={() => setNewNewsOpen(true)} className="btn btn-outline-forest btn-sm">
                    <Plus size={16} />
                    <span>{isEnglish ? "New Announcement" : "Nouvelle Actualité"}</span>
                  </button>
                  <button onClick={() => setNewAgendaOpen(true)} className="btn btn-outline-forest btn-sm">
                    <Plus size={16} />
                    <span>{isEnglish ? "New Session" : "Nouvelle Session"}</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-top">
                    <span className="admin-kpi-label">{isEnglish ? "Published Investigations" : "Articles & Enquêtes"}</span>
                    <div className="admin-kpi-icon-wrap"><FileText size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{stats?.kpi?.totalArticles ?? articles.length}</div>
                  <div className="admin-kpi-sub">
                    <TrendingUp size={14} />
                    <span>{isEnglish ? "Active verified stories" : "Publications vérifiées"}</span>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top">
                    <span className="admin-kpi-label">{isEnglish ? "News & Bulletins" : "Actualités & Presse"}</span>
                    <div className="admin-kpi-icon-wrap"><Bell size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{stats?.kpi?.totalNews ?? news.length}</div>
                  <div className="admin-kpi-sub">
                    <CheckCircle size={14} />
                    <span>{isEnglish ? "Official releases" : "Communiqués officiels"}</span>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top">
                    <span className="admin-kpi-label">{isEnglish ? "Pedagogical Sessions" : "Formations & Ateliers"}</span>
                    <div className="admin-kpi-icon-wrap"><Calendar size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{stats?.kpi?.totalAgendas ?? agendas.length}</div>
                  <div className="admin-kpi-sub">
                    <Clock size={14} />
                    <span>{isEnglish ? "Hybrid cohorts" : "Sessions programmées"}</span>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top">
                    <span className="admin-kpi-label">{isEnglish ? "Applications & Messages" : "Candidatures & Messages"}</span>
                    <div className="admin-kpi-icon-wrap"><Mail size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{stats?.kpi?.totalContacts ?? contacts.length}</div>
                  <div className="admin-kpi-sub" style={{ color: "#D49A29" }}>
                    <AlertCircle size={14} />
                    <span>{stats?.kpi?.unreadContacts ?? contacts.filter(c => !c.isRead).length} {isEnglish ? "pending review" : "en attente"}</span>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top">
                    <span className="admin-kpi-label">{isEnglish ? "Newsletter Subscribers" : "Abonnés Newsletter"}</span>
                    <div className="admin-kpi-icon-wrap"><Send size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{stats?.kpi?.totalNewsletters ?? newsletters.length}</div>
                  <div className="admin-kpi-sub">
                    <Users size={14} />
                    <span>{isEnglish ? "Audience reached" : "Lecteurs engagés"}</span>
                  </div>
                </div>
              </div>

              {/* Quick Table: Recent Inquiries */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">
                    {isEnglish ? "Recent Inquiries & Program Applications" : "Dernières Candidatures & Prises de Contact"}
                  </h3>
                  <button 
                    onClick={() => setActiveTab("contacts")} 
                    className="btn btn-outline-forest btn-sm"
                  >
                    <span>{isEnglish ? "View all messages" : "Voir tous les messages"}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{isEnglish ? "Date" : "Date"}</th>
                        <th>{isEnglish ? "Applicant" : "Expéditeur"}</th>
                        <th>{isEnglish ? "Contact" : "Email & Tél"}</th>
                        <th>{isEnglish ? "Subject" : "Objet"}</th>
                        <th>{isEnglish ? "Status" : "Statut"}</th>
                        <th>{isEnglish ? "Actions" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.slice(0, 5).map((c) => (
                        <tr key={c.id}>
                          <td>{new Date(c.createdAt).toLocaleDateString(isEnglish ? "en-US" : "fr-FR")}</td>
                          <td style={{ fontWeight: 600, color: "#13221B" }}>{c.name}</td>
                          <td>{c.email} {c.phone ? `(${c.phone})` : ""}</td>
                          <td>{c.subject}</td>
                          <td>
                            <span className={`badge ${c.isRead ? "badge-green-light" : "badge-gold-light"}`}>
                              {c.isRead ? (isEnglish ? "Processed" : "Traité") : (isEnglish ? "New" : "Nouveau")}
                            </span>
                          </td>
                          <td>
                            {!c.isRead && (
                              <button
                                onClick={() => handleMarkRead(c.id)}
                                className="btn-action-read"
                              >
                                <Check size={13} />
                                <span>{isEnglish ? "Mark Read" : "Marquer lu"}</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {contacts.length === 0 && (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center", color: "#6A8278", padding: "2rem" }}>
                            {isEnglish ? "No inquiries received yet." : "Aucun message pour le moment."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTICLES */}
          {activeTab === "articles" && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">
                    {isEnglish ? "Investigations & Solutions Desk" : "Gestion des Articles & Enquêtes"}
                  </h1>
                  <p className="admin-page-subtitle">
                    {isEnglish 
                      ? "Publish, review and manage long-form solution journalism and ecological investigations."
                      : "Rédigez, modifiez et modérez les publications d'investigation et de journalisme de solutions."}
                  </p>
                </div>
                <button onClick={() => setNewArticleOpen(true)} className="btn btn-forest">
                  <Plus size={18} />
                  <span>{isEnglish ? "Write an Article" : "Rédiger un Article"}</span>
                </button>
              </div>

              {/* Controls & Search Bar */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div className="dedicated-search-box" style={{ maxWidth: "380px" }}>
                    <Search size={16} className="search-icon" />
                    <input
                      type="text"
                      placeholder={isEnglish ? "Search by title or topic..." : "Rechercher par titre ou mot-clé..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="dedicated-search-input"
                    />
                  </div>

                  <span className="results-counter-pill">
                    <strong>{filteredArticles.length}</strong> {isEnglish ? "articles available" : "articles répertoriés"}
                  </span>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{isEnglish ? "Title" : "Titre"}</th>
                        <th>{isEnglish ? "Category" : "Catégorie"}</th>
                        <th>{isEnglish ? "Publication Date" : "Date de publication"}</th>
                        <th>{isEnglish ? "Read Count" : "Lectures"}</th>
                        <th>{isEnglish ? "Status" : "Statut"}</th>
                        <th>{isEnglish ? "Actions" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredArticles.map((a) => (
                        <tr key={a.id}>
                          <td style={{ fontWeight: 600, color: "#13221B", maxWidth: "340px" }}>
                            {a.title}
                          </td>
                          <td>
                            <span className="badge badge-green-light">
                              {a.category || "Investigation"}
                            </span>
                          </td>
                          <td>
                            {new Date(a.publishedAt || a.createdAt).toLocaleDateString(isEnglish ? "en-US" : "fr-FR")}
                          </td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#5A7367" }}>
                              <Eye size={13} />
                              <span>{a.viewsCount || 0}</span>
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${a.status === "active" ? "badge-green-light" : "badge-gold-light"}`}>
                              {a.status === "active" ? (isEnglish ? "Published" : "Actif") : a.status}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDeleteArticle(a.id)}
                              className="btn-action-delete"
                              title={isEnglish ? "Delete" : "Supprimer"}
                            >
                              <Trash2 size={14} />
                              <span>{isEnglish ? "Delete" : "Supprimer"}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredArticles.length === 0 && (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center", color: "#6A8278", padding: "2.5rem" }}>
                            {isEnglish ? "No matching articles found." : "Aucun article correspondant."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NEWS */}
          {activeTab === "news" && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">
                    {isEnglish ? "Official News & Press Dispatches" : "Actualités & Communiqués"}
                  </h1>
                  <p className="admin-page-subtitle">
                    {isEnglish 
                      ? "Publish milestones, institutional partnerships and regional stakeholder alerts."
                      : "Diffusez les étapes du programme, partenariats et annonces institutionnelles officielles."}
                  </p>
                </div>
                <button onClick={() => setNewNewsOpen(true)} className="btn btn-forest">
                  <Plus size={18} />
                  <span>{isEnglish ? "Publish News" : "Publier une Actualité"}</span>
                </button>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <div className="dedicated-search-box" style={{ maxWidth: "380px" }}>
                    <Search size={16} className="search-icon" />
                    <input
                      type="text"
                      placeholder={isEnglish ? "Filter news..." : "Filtrer les actualités..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="dedicated-search-input"
                    />
                  </div>

                  <span className="results-counter-pill">
                    <strong>{filteredNews.length}</strong> {isEnglish ? "news listed" : "annonces publiées"}
                  </span>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{isEnglish ? "Title" : "Titre"}</th>
                        <th>{isEnglish ? "Category" : "Catégorie"}</th>
                        <th>{isEnglish ? "Date" : "Date"}</th>
                        <th>{isEnglish ? "Tags" : "Mots-clés"}</th>
                        <th>{isEnglish ? "Actions" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNews.map((n) => (
                        <tr key={n.id}>
                          <td style={{ fontWeight: 600, color: "#13221B", maxWidth: "340px" }}>{n.title}</td>
                          <td><span className="badge badge-gold-light">{n.category || "Communiqué"}</span></td>
                          <td>{new Date(n.publishedAt || n.createdAt).toLocaleDateString(isEnglish ? "en-US" : "fr-FR")}</td>
                          <td>
                            <span style={{ fontSize: "0.8rem", color: "#5A7367" }}>
                              {n.tags || "#JEDDIAC"}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDeleteNews(n.id)}
                              className="btn-action-delete"
                            >
                              <Trash2 size={14} />
                              <span>{isEnglish ? "Delete" : "Supprimer"}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredNews.length === 0 && (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center", color: "#6A8278", padding: "2.5rem" }}>
                            {isEnglish ? "No news found." : "Aucune actualité trouvée."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AGENDA */}
          {activeTab === "agenda" && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">
                    {isEnglish ? "Pedagogical Calendar & Cohort Sessions" : "Agenda des Formations & Masterclasses"}
                  </h1>
                  <p className="admin-page-subtitle">
                    {isEnglish 
                      ? "Schedule regional masterclasses, hands-on training workshops and investigative cohorts."
                      : "Planifiez les sessions de formation en présentiel et masterclasses en ligne du Bassin du Congo."}
                  </p>
                </div>
                <button onClick={() => setNewAgendaOpen(true)} className="btn btn-forest">
                  <Plus size={18} />
                  <span>{isEnglish ? "Add Session" : "Ajouter une Session"}</span>
                </button>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <div className="dedicated-search-box" style={{ maxWidth: "380px" }}>
                    <Search size={16} className="search-icon" />
                    <input
                      type="text"
                      placeholder={isEnglish ? "Filter calendar sessions..." : "Filtrer les sessions d'agenda..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="dedicated-search-input"
                    />
                  </div>

                  <span className="results-counter-pill">
                    <strong>{filteredAgendas.length}</strong> {isEnglish ? "sessions programmed" : "sessions programmées"}
                  </span>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{isEnglish ? "Training Title" : "Intitulé de la Formation"}</th>
                        <th>{isEnglish ? "Typology" : "Format"}</th>
                        <th>{isEnglish ? "Timeline" : "Période"}</th>
                        <th>{isEnglish ? "Territory" : "Lieu & Territoire"}</th>
                        <th>{isEnglish ? "Actions" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAgendas.map((ag) => (
                        <tr key={ag.id}>
                          <td style={{ fontWeight: 600, color: "#13221B", maxWidth: "340px" }}>{ag.title}</td>
                          <td><span className="badge badge-green-light">{ag.type}</span></td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#5A7367" }}>
                              <Calendar size={13} />
                              <span>Du {new Date(ag.startDate).toLocaleDateString(isEnglish ? "en-US" : "fr-FR")}</span>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#5A7367" }}>
                              <MapPin size={13} />
                              <span>{ag.location}</span>
                            </div>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDeleteAgenda(ag.id)}
                              className="btn-action-delete"
                            >
                              <Trash2 size={14} />
                              <span>{isEnglish ? "Delete" : "Supprimer"}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredAgendas.length === 0 && (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center", color: "#6A8278", padding: "2.5rem" }}>
                            {isEnglish ? "No sessions found." : "Aucune session trouvée."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CONTACTS */}
          {activeTab === "contacts" && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">
                    {isEnglish ? "Cohort Inquiries & Candidatures" : "Candidatures & Prises de Contact"}
                  </h1>
                  <p className="admin-page-subtitle">
                    {isEnglish 
                      ? "Messages received through public portals, partnership requests and membership submissions."
                      : "Messages reçus via le formulaire public et candidatures directes au réseau JEDDIAC."}
                  </p>
                </div>

                <div className="dedicated-search-box" style={{ maxWidth: "320px" }}>
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder={isEnglish ? "Search applicants..." : "Rechercher un candidat..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="dedicated-search-input"
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {filteredContacts.map((c) => (
                  <div key={c.id} className="admin-contact-item">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                          <span className={`badge ${c.isRead ? "badge-green-light" : "badge-gold-light"}`}>
                            {c.isRead ? (isEnglish ? "Processed" : "Traité") : (isEnglish ? "New Submission" : "Nouveau Message")}
                          </span>
                          <span style={{ fontSize: "0.82rem", color: "#6A8278" }}>
                            {new Date(c.createdAt).toLocaleDateString(isEnglish ? "en-US" : "fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#13221B", margin: "0.2rem 0" }}>
                          {c.subject}
                        </h3>
                        <div style={{ fontSize: "0.86rem", color: "#5A7367", marginTop: "0.25rem" }}>
                          {isEnglish ? "From" : "De"}: <strong>{c.name}</strong> ({c.email}) {c.phone && `· Tél: ${c.phone}`}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        {!c.isRead && (
                          <button
                            onClick={() => handleMarkRead(c.id)}
                            className="btn-action-read"
                          >
                            <Check size={14} />
                            <span>{isEnglish ? "Mark Read" : "Marquer lu"}</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteContact(c.id)}
                          className="btn-action-delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="admin-contact-message">
                      {c.message}
                    </div>
                  </div>
                ))}

                {filteredContacts.length === 0 && (
                  <div className="admin-card" style={{ padding: "3rem", textAlign: "center", color: "#6A8278" }}>
                    {isEnglish ? "No inquiries match your query." : "Aucune candidature ne correspond à votre recherche."}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: NEWSLETTER */}
          {activeTab === "newsletter" && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">
                    {isEnglish ? "Newsletter Subscribers" : "Abonnés à la Newsletter"}
                  </h1>
                  <p className="admin-page-subtitle">
                    {isEnglish 
                      ? "Audience list registered to receive the Congo Basin environmental briefings."
                      : "Base de lecteurs abonnés aux dépêches et synthèses environnementales du Bassin du Congo."}
                  </p>
                </div>

                <span className="results-counter-pill">
                  <strong>{newsletters.length}</strong> {isEnglish ? "subscribers" : "abonnés enregistrés"}
                </span>
              </div>

              <div className="admin-card">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{isEnglish ? "Subscriber Email" : "Email de l'abonné"}</th>
                        <th>{isEnglish ? "Subscription Date" : "Date d'inscription"}</th>
                        <th>{isEnglish ? "Status" : "Statut"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newsletters.map((nl) => (
                        <tr key={nl.id}>
                          <td style={{ fontWeight: 600, color: "#13221B" }}>{nl.email}</td>
                          <td>{new Date(nl.createdAt || nl.subscribedAt).toLocaleDateString(isEnglish ? "en-US" : "fr-FR")}</td>
                          <td><span className="badge badge-green-light">{isEnglish ? "Active" : "Actif"}</span></td>
                        </tr>
                      ))}
                      {newsletters.length === 0 && (
                        <tr>
                          <td colSpan={3} style={{ textAlign: "center", color: "#6A8278", padding: "2.5rem" }}>
                            {isEnglish ? "No subscribers yet." : "Aucun abonné enregistré."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: USERS */}
          {activeTab === "users" && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">
                    {isEnglish ? "Accounts & Network Directory" : "Gestion des Comptes & Membres"}
                  </h1>
                  <p className="admin-page-subtitle">
                    {isEnglish 
                      ? "Registered institutional accounts, partner journalists and community mentors."
                      : "Liste des administrateurs, journalistes partenaires et mentors certifiés du réseau."}
                  </p>
                </div>

                <div className="dedicated-search-box" style={{ maxWidth: "320px" }}>
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder={isEnglish ? "Filter users..." : "Filtrer les comptes..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="dedicated-search-input"
                  />
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{isEnglish ? "Member Name" : "Nom complet"}</th>
                        <th>{isEnglish ? "Email" : "Email"}</th>
                        <th>{isEnglish ? "Role" : "Rôle"}</th>
                        <th>{isEnglish ? "Phone" : "Téléphone"}</th>
                        <th>{isEnglish ? "Status" : "Statut"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => (
                        <tr key={u.id}>
                          <td style={{ fontWeight: 600, color: "#13221B" }}>
                            {u.firstName} {u.lastName}
                          </td>
                          <td>{u.email}</td>
                          <td>
                            <span className={`badge ${u.role === "admin" ? "badge-gold-light" : "badge-green-light"}`}>
                              {u.role === "admin" ? "Super Admin" : u.role}
                            </span>
                          </td>
                          <td>{u.phone || "—"}</td>
                          <td>
                            <span className={`badge ${u.status === "active" ? "badge-green-light" : "badge-gold-light"}`}>
                              {u.status === "active" ? (isEnglish ? "Active" : "Actif") : u.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredUsers.length === 0 && (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center", color: "#6A8278", padding: "2.5rem" }}>
                            {isEnglish ? "No accounts found." : "Aucun compte répertorié."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE ARTICLE MODAL (Matches Site Modals) */}
      {newArticleOpen && (
        <div className="modal-overlay" onClick={() => setNewArticleOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
            <button 
              onClick={() => setNewArticleOpen(false)} 
              className="modal-close-btn"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", fontWeight: 800, color: "#13221B", marginBottom: "0.4rem" }}>
              {isEnglish ? "Write an Investigation" : "Rédiger un Article d'Investigation"}
            </h3>
            <p style={{ color: "#5A7367", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              {isEnglish ? "Publish a new story to the investigative solutions catalog." : "Diffuser une nouvelle enquête dans le catalogue des solutions durables."}
            </p>

            <form onSubmit={handleCreateArticle}>
              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Article Title *" : "Titre de l'article *"}</label>
                <input 
                  type="text" 
                  required 
                  className="form-control" 
                  value={articleForm.title} 
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} 
                  placeholder={isEnglish ? "e.g. Congo Basin: Forest governance in Central Africa" : "ex: Bassin du Congo : Gouvernance forestière et jeunesse"}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Thematic Category" : "Catégorie Thématique"}</label>
                <select 
                  className="dedicated-select" 
                  style={{ width: "100%" }}
                  value={articleForm.category} 
                  onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                >
                  <option value="Investigation & Climat">Investigation & Climat</option>
                  <option value="Médias & Méthodes">Médias & Méthodes</option>
                  <option value="Territoires & Communautés">Territoires & Communautés</option>
                  <option value="Tribune & Entretien">Tribune & Entretien</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Summary / Lead paragraph *" : "Résumé / Chapeau introductif *"}</label>
                <textarea 
                  required 
                  rows={2} 
                  className="form-control" 
                  value={articleForm.summary} 
                  onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })} 
                  placeholder={isEnglish ? "Concise hook summarizing the investigation..." : "Accroche concise résumant l'enquête..."}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Full Body Content *" : "Contenu intégral de l'article *"}</label>
                <textarea 
                  required 
                  rows={6} 
                  className="form-control" 
                  value={articleForm.content} 
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })} 
                  placeholder={isEnglish ? "Full journalistic text, data and testimonies..." : "Texte complet du reportage, données de terrain et témoignages..."}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Tags (comma separated)" : "Mots-clés / Tags (séparés par des virgules)"}</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={articleForm.tags} 
                  onChange={(e) => setArticleForm({ ...articleForm, tags: e.target.value })} 
                  placeholder="Forêt, Biodiversité, COMIFAC, Jeunesse"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid #E5EBE7" }}>
                <button type="button" onClick={() => setNewArticleOpen(false)} className="btn btn-outline-forest">
                  {isEnglish ? "Cancel" : "Annuler"}
                </button>
                <button type="submit" className="btn btn-forest">
                  {isEnglish ? "Publish Story" : "Publier l'article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEWS MODAL */}
      {newNewsOpen && (
        <div className="modal-overlay" onClick={() => setNewNewsOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "640px" }}>
            <button 
              onClick={() => setNewNewsOpen(false)} 
              className="modal-close-btn"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", fontWeight: 800, color: "#13221B", marginBottom: "0.4rem" }}>
              {isEnglish ? "Publish an Announcement" : "Publier une Actualité Officielle"}
            </h3>
            <p style={{ color: "#5A7367", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              {isEnglish ? "Broadcast a press release or institutional milestone." : "Diffuser un communiqué ou jalon institutionnel pour les médias partenaires."}</p>

            <form onSubmit={handleCreateNews}>
              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Announcement Title *" : "Titre de l'annonce *"}</label>
                <input 
                  type="text" 
                  required 
                  className="form-control" 
                  value={newsForm.title} 
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} 
                  placeholder="ex: Lancement des candidatures cohorte 2026-2027"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Category" : "Catégorie"}</label>
                <select 
                  className="dedicated-select" 
                  style={{ width: "100%" }}
                  value={newsForm.category} 
                  onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                >
                  <option value="Communiqué">Communiqué Officiel</option>
                  <option value="Partenariat">Partenariat Institutionnel</option>
                  <option value="Événement">Événement & Forum</option>
                  <option value="Appel à projets">Appel à candidatures</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Summary *" : "Résumé synthétique *"}</label>
                <textarea 
                  required 
                  rows={2} 
                  className="form-control" 
                  value={newsForm.summary} 
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })} 
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Full Body *" : "Texte complet *"}</label>
                <textarea 
                  required 
                  rows={5} 
                  className="form-control" 
                  value={newsForm.content} 
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} 
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid #E5EBE7" }}>
                <button type="button" onClick={() => setNewNewsOpen(false)} className="btn btn-outline-forest">
                  {isEnglish ? "Cancel" : "Annuler"}
                </button>
                <button type="submit" className="btn btn-forest">
                  {isEnglish ? "Publish Release" : "Publier l'actualité"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE AGENDA MODAL */}
      {newAgendaOpen && (
        <div className="modal-overlay" onClick={() => setNewAgendaOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "640px" }}>
            <button 
              onClick={() => setNewAgendaOpen(false)} 
              className="modal-close-btn"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", fontWeight: 800, color: "#13221B", marginBottom: "0.4rem" }}>
              {isEnglish ? "Program a Training Session" : "Programmer une Session de Formation"}
            </h3>
            <p style={{ color: "#5A7367", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              {isEnglish ? "Add a masterclass or workshop to the regional calendar." : "Ajouter une masterclass ou atelier pratique au calendrier pédagogique."}
            </p>

            <form onSubmit={handleCreateAgenda}>
              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Session Title *" : "Intitulé de la session *"}</label>
                <input 
                  type="text" 
                  required 
                  className="form-control" 
                  value={agendaForm.title} 
                  onChange={(e) => setAgendaForm({ ...agendaForm, title: e.target.value })} 
                  placeholder="ex: Atelier d'investigation par imagerie satellite"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Start Date" : "Date de début"}</label>
                  <input 
                    type="date" 
                    required 
                    className="form-control" 
                    value={agendaForm.startDate} 
                    onChange={(e) => setAgendaForm({ ...agendaForm, startDate: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Location / Territory" : "Lieu & Format"}</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={agendaForm.location} 
                    onChange={(e) => setAgendaForm({ ...agendaForm, location: e.target.value })} 
                    placeholder="ex: Yaoundé · Hybride"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Pedagogical Description *" : "Description pédagogique *"}</label>
                <textarea 
                  required 
                  rows={3} 
                  className="form-control" 
                  value={agendaForm.description} 
                  onChange={(e) => setAgendaForm({ ...agendaForm, description: e.target.value })} 
                  placeholder="Objectifs pédagogiques, formateurs et publics cibles..."
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid #E5EBE7" }}>
                <button type="button" onClick={() => setNewAgendaOpen(false)} className="btn btn-outline-forest">
                  {isEnglish ? "Cancel" : "Annuler"}
                </button>
                <button type="submit" className="btn btn-forest">
                  {isEnglish ? "Create Session" : "Créer la session"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
