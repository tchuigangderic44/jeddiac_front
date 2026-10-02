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
  Globe,
  Upload,
  Image,
  Edit3,
  Power,
  MoreVertical,
  AlertTriangle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { api, getMediaUrl } from "../services/api";

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
  const [newsFormLangTab, setNewsFormLangTab] = useState("fr"); // 'fr' | 'en'
  const [newsForm, setNewsForm] = useState({
    title: "",
    titleEn: "",
    category: "Communiqué",
    categoryEn: "Official Dispatch",
    summary: "",
    summaryEn: "",
    content: "",
    contentEn: "",
    tags: "Annonce, 2026",
    tagsEn: "Announcement, 2026",
    coverImageFile: null,
    coverImagePreview: null
  });

  // View News Modal State
  const [viewNewsOpen, setViewNewsOpen] = useState(false);
  const [viewNewsLangTab, setViewNewsLangTab] = useState("fr");
  const [selectedNewsItem, setSelectedNewsItem] = useState(null);

  // Edit News Modal State
  const [editNewsOpen, setEditNewsOpen] = useState(false);
  const [editNewsLangTab, setEditNewsLangTab] = useState("fr"); // 'fr' | 'en'
  const [editNewsForm, setEditNewsForm] = useState({
    id: "",
    title: "",
    titleEn: "",
    category: "Communiqué",
    categoryEn: "Official Dispatch",
    summary: "",
    summaryEn: "",
    content: "",
    contentEn: "",
    tags: "",
    tagsEn: "",
    coverImage: "",
    coverImageFile: null,
    coverImagePreview: null,
    removeExistingImage: false
  });

  // Action Menu Dropdown State
  const [activeActionMenuId, setActiveActionMenuId] = useState(null);

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveActionMenuId(null);
    };
    if (activeActionMenuId) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [activeActionMenuId]);

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

  // Confirmation Modal State (Désactiver / Activer / Supprimer)
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    subMessage: "",
    confirmText: "",
    cancelText: "",
    variant: "danger", // 'danger' | 'warning' | 'success'
    icon: "trash", // 'trash' | 'power' | 'check' | 'alert'
    onConfirm: null,
    isProcessing: false
  });

  const closeConfirmModal = () => {
    if (confirmModal.isProcessing) return;
    setConfirmModal((prev) => ({ ...prev, isOpen: false, onConfirm: null }));
  };

  const handleExecuteConfirm = async () => {
    if (!confirmModal.onConfirm) return;
    try {
      setConfirmModal((prev) => ({ ...prev, isProcessing: true }));
      await confirmModal.onConfirm();
      setConfirmModal((prev) => ({ ...prev, isOpen: false, isProcessing: false, onConfirm: null }));
    } catch (err) {
      setConfirmModal((prev) => ({ ...prev, isProcessing: false }));
      alert("Erreur: " + err.message);
    }
  };

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
        api.getAdminArticles(token, "?limit=100").catch(() => api.getArticles("?limit=50").catch(() => ({ values: [] }))),
        api.getAdminNews(token, "?limit=100").catch(() => api.getNews("?limit=50").catch(() => ({ values: [] }))),
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

  const handleDeleteArticle = (target) => {
    const item = typeof target === "object" ? target : articles.find(a => a.id === target);
    const title = item?.title ? `« ${item.title} »` : (isEnglish ? "this article" : "cet article");

    setConfirmModal({
      isOpen: true,
      title: isEnglish ? "Delete Article?" : "Supprimer l'article ?",
      message: isEnglish 
        ? `Are you sure you want to permanently delete ${title}?`
        : `Voulez-vous vraiment supprimer définitivement ${title} ?`,
      subMessage: isEnglish
        ? "This action is irreversible. The publication will be removed immediately from the portal."
        : "Cette action est irréversible. L'article sera définitivement supprimé de la plateforme.",
      confirmText: isEnglish ? "Yes, Delete" : "Oui, supprimer",
      cancelText: isEnglish ? "Cancel" : "Annuler",
      variant: "danger",
      icon: "trash",
      isProcessing: false,
      onConfirm: async () => {
        const idToDelete = item?.id || target;
        await api.deleteArticle(token, idToDelete);
        loadAllAdminData();
      }
    });
  };

  // News Actions
  const handleCreateNews = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newsForm.title);
      if (newsForm.titleEn) formData.append("titleEn", newsForm.titleEn);
      formData.append("category", newsForm.category);
      if (newsForm.categoryEn) formData.append("categoryEn", newsForm.categoryEn);
      formData.append("summary", newsForm.summary);
      if (newsForm.summaryEn) formData.append("summaryEn", newsForm.summaryEn);
      formData.append("content", newsForm.content);
      if (newsForm.contentEn) formData.append("contentEn", newsForm.contentEn);
      if (newsForm.tags) formData.append("tags", newsForm.tags);
      if (newsForm.tagsEn) formData.append("tagsEn", newsForm.tagsEn);
      if (newsForm.coverImageFile) {
        formData.append("coverImage", newsForm.coverImageFile);
      }

      await api.createNews(token, formData);
      setNewNewsOpen(false);
      setNewsFormLangTab("fr");
      setNewsForm({
        title: "",
        titleEn: "",
        category: "Communiqué",
        categoryEn: "Official Dispatch",
        summary: "",
        summaryEn: "",
        content: "",
        contentEn: "",
        tags: "Annonce, 2026",
        tagsEn: "Announcement, 2026",
        coverImageFile: null,
        coverImagePreview: null
      });
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  const handleDeleteNews = (target) => {
    const item = typeof target === "object" ? target : news.find(n => n.id === target);
    const title = item?.title ? `« ${item.title} »` : (isEnglish ? "this announcement" : "cette actualité");

    setConfirmModal({
      isOpen: true,
      title: isEnglish ? "Delete Announcement?" : "Supprimer l'actualité ?",
      message: isEnglish 
        ? `Are you sure you want to permanently delete ${title}?`
        : `Voulez-vous vraiment supprimer définitivement ${title} ?`,
      subMessage: isEnglish
        ? "This action is irreversible. The announcement and its cover image will be permanently removed from the server."
        : "Cette action est irréversible. L'annonce ainsi que son image d'illustration associée seront définitivement supprimées du serveur.",
      confirmText: isEnglish ? "Yes, Delete" : "Oui, supprimer",
      cancelText: isEnglish ? "Cancel" : "Annuler",
      variant: "danger",
      icon: "trash",
      isProcessing: false,
      onConfirm: async () => {
        const idToDelete = item?.id || target;
        await api.deleteNews(token, idToDelete);
        loadAllAdminData();
      }
    });
  };

  const handleOpenViewNews = (item) => {
    setSelectedNewsItem(item);
    setViewNewsLangTab(isEnglish ? "en" : "fr");
    setViewNewsOpen(true);
  };

  const handleOpenEditNews = (item) => {
    setEditNewsLangTab("fr");
    setEditNewsForm({
      id: item.id,
      title: item.title || "",
      titleEn: item.titleEn || "",
      category: item.category || "Communiqué",
      categoryEn: item.categoryEn || "Official Dispatch",
      summary: item.summary || "",
      summaryEn: item.summaryEn || "",
      content: item.content || "",
      contentEn: item.contentEn || "",
      tags: item.tags || "",
      tagsEn: item.tagsEn || "",
      coverImage: item.coverImage || "",
      coverImageFile: null,
      coverImagePreview: item.coverImage ? getMediaUrl(item.coverImage) : null,
      removeExistingImage: false
    });
    setEditNewsOpen(true);
  };

  const handleUpdateNews = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", editNewsForm.title);
      if (editNewsForm.titleEn !== undefined) formData.append("titleEn", editNewsForm.titleEn);
      formData.append("category", editNewsForm.category);
      if (editNewsForm.categoryEn !== undefined) formData.append("categoryEn", editNewsForm.categoryEn);
      formData.append("summary", editNewsForm.summary);
      if (editNewsForm.summaryEn !== undefined) formData.append("summaryEn", editNewsForm.summaryEn);
      formData.append("content", editNewsForm.content);
      if (editNewsForm.contentEn !== undefined) formData.append("contentEn", editNewsForm.contentEn);
      if (editNewsForm.tags !== undefined) formData.append("tags", editNewsForm.tags);
      if (editNewsForm.tagsEn !== undefined) formData.append("tagsEn", editNewsForm.tagsEn);
      
      if (editNewsForm.coverImageFile) {
        formData.append("coverImage", editNewsForm.coverImageFile);
      } else if (editNewsForm.removeExistingImage) {
        formData.append("coverImage", "");
      }

      await api.updateNews(token, editNewsForm.id, formData);
      setEditNewsOpen(false);
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  const handleToggleNewsStatus = (item) => {
    const isCurrentlyActive = item.status === "active";
    const title = item?.title ? `« ${item.title} »` : (isEnglish ? "this announcement" : "cette actualité");

    if (isCurrentlyActive) {
      setConfirmModal({
        isOpen: true,
        title: isEnglish ? "Deactivate Announcement?" : "Désactiver l'actualité ?",
        message: isEnglish 
          ? `Do you want to deactivate ${title}?`
          : `Voulez-vous désactiver l'actualité ${title} ?`,
        subMessage: isEnglish
          ? "It will no longer appear on the public website. You can reactivate it at any time from this dashboard."
          : "Elle ne sera plus visible par le public sur le site web. Vous pourrez la réactiver à tout moment depuis ce tableau de bord.",
        confirmText: isEnglish ? "Yes, Deactivate" : "Oui, désactiver",
        cancelText: isEnglish ? "Cancel" : "Annuler",
        variant: "warning",
        icon: "power",
        isProcessing: false,
        onConfirm: async () => {
          await api.deactivateNews(token, item.id);
          loadAllAdminData();
        }
      });
    } else {
      setConfirmModal({
        isOpen: true,
        title: isEnglish ? "Activate Announcement?" : "Activer l'actualité ?",
        message: isEnglish 
          ? `Do you want to publish and activate ${title}?`
          : `Voulez-vous activer et publier l'actualité ${title} ?`,
        subMessage: isEnglish
          ? "It will become immediately visible to all visitors on the public portal."
          : "Elle redeviendra immédiatement visible par tous les visiteurs sur le portail public.",
        confirmText: isEnglish ? "Yes, Activate" : "Oui, activer & publier",
        cancelText: isEnglish ? "Cancel" : "Annuler",
        variant: "success",
        icon: "check",
        isProcessing: false,
        onConfirm: async () => {
          await api.activateNews(token, item.id);
          loadAllAdminData();
        }
      });
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

  const handleDeleteAgenda = (target) => {
    const item = typeof target === "object" ? target : agendas.find(ag => ag.id === target);
    const title = item?.title ? `« ${item.title} »` : (isEnglish ? "this session" : "cette session");

    setConfirmModal({
      isOpen: true,
      title: isEnglish ? "Delete Training Session?" : "Supprimer la session ?",
      message: isEnglish 
        ? `Are you sure you want to delete ${title}?`
        : `Voulez-vous supprimer la session de formation ${title} ?`,
      subMessage: isEnglish
        ? "Registered users will no longer see this scheduled training session."
        : "Cette session d'atelier / formation sera retirée de l'agenda public.",
      confirmText: isEnglish ? "Yes, Delete" : "Oui, supprimer",
      cancelText: isEnglish ? "Cancel" : "Annuler",
      variant: "danger",
      icon: "trash",
      isProcessing: false,
      onConfirm: async () => {
        const idToDelete = item?.id || target;
        await api.deleteAgenda(token, idToDelete);
        loadAllAdminData();
      }
    });
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

  const handleDeleteContact = (id) => {
    setConfirmModal({
      isOpen: true,
      title: isEnglish ? "Delete Message?" : "Supprimer le message ?",
      message: isEnglish 
        ? "Are you sure you want to delete this inquiry message?"
        : "Voulez-vous vraiment supprimer ce message de contact ?",
      subMessage: isEnglish
        ? "The sender details and message history will be permanently deleted."
        : "Les détails de l'expéditeur et le contenu du message seront supprimés.",
      confirmText: isEnglish ? "Yes, Delete" : "Oui, supprimer",
      cancelText: isEnglish ? "Cancel" : "Annuler",
      variant: "danger",
      icon: "trash",
      isProcessing: false,
      onConfirm: async () => {
        await api.deleteContact(token, id);
        loadAllAdminData();
      }
    });
  };

  // Filtered queries
  const q = searchQuery.toLowerCase().trim();
  const filteredArticles = articles.filter(a => !q || a.title?.toLowerCase().includes(q) || a.category?.toLowerCase().includes(q));
  const filteredNews = news.filter(n => !q || n.title?.toLowerCase().includes(q) || n.titleEn?.toLowerCase().includes(q) || n.category?.toLowerCase().includes(q) || n.categoryEn?.toLowerCase().includes(q) || n.tags?.toLowerCase().includes(q) || n.tagsEn?.toLowerCase().includes(q));
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
                        <th>{isEnglish ? "Status" : "Statut"}</th>
                        <th>{isEnglish ? "Date" : "Date"}</th>
                        <th>{isEnglish ? "Tags" : "Mots-clés"}</th>
                        <th style={{ textAlign: "right", paddingRight: "1.5rem" }}>{isEnglish ? "Actions" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNews.map((n) => {
                        const tableTitle = (isEnglish && n.titleEn) ? n.titleEn : n.title;
                        const tableCategory = (isEnglish && n.categoryEn) ? n.categoryEn : (n.category || (isEnglish ? "Official Dispatch" : "Communiqué"));
                        const tableTags = (isEnglish && n.tagsEn) ? n.tagsEn : (n.tags || "#JEDDIAC");
                        const hasBilingual = !!(n.title && n.titleEn);

                        return (
                          <tr key={n.id}>
                            <td style={{ fontWeight: 600, color: "#13221B", maxWidth: "300px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                {n.coverImage ? (
                                  <img 
                                    src={getMediaUrl(n.coverImage)} 
                                    alt={tableTitle} 
                                    style={{ width: "42px", height: "42px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }} 
                                  />
                                ) : (
                                  <div style={{ width: "42px", height: "42px", borderRadius: "6px", background: "#E8EFEA", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A7367", flexShrink: 0 }}>
                                    <Image size={18} />
                                  </div>
                                )}
                                <div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                    <span>{tableTitle}</span>
                                    {hasBilingual && (
                                      <span style={{ fontSize: "0.65rem", padding: "1px 5px", borderRadius: "4px", background: "rgba(30,81,40,0.12)", color: "#1E5128", fontWeight: 700, flexShrink: 0 }}>
                                        FR/EN
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td><span className="badge badge-gold-light">{tableCategory}</span></td>
                            <td>
                              <span className={`badge ${n.status === "active" ? "badge-green-light" : "badge-gold-light"}`}>
                                {n.status === "active" ? (isEnglish ? "Active" : "Publié") : (isEnglish ? "Suspended" : "Désactivé")}
                              </span>
                            </td>
                            <td>{new Date(n.publishedAt || n.createdAt).toLocaleDateString(isEnglish ? "en-US" : "fr-FR")}</td>
                            <td>
                              <span style={{ fontSize: "0.8rem", color: "#5A7367" }}>
                                {tableTags}
                              </span>
                            </td>
                          <td style={{ textAlign: "right", position: "relative" }}>
                            <div className="action-menu-container">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveActionMenuId(activeActionMenuId === n.id ? null : n.id);
                                }}
                                className={`btn-action-more ${activeActionMenuId === n.id ? "active" : ""}`}
                                aria-label={isEnglish ? "Actions menu" : "Menu d'actions"}
                                title={isEnglish ? "Actions" : "Options"}
                              >
                                <MoreVertical size={16} />
                              </button>

                              {activeActionMenuId === n.id && (
                                <div 
                                  className="action-dropdown-menu" 
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {/* 1. VOIR */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveActionMenuId(null);
                                      handleOpenViewNews(n);
                                    }}
                                    className="action-dropdown-item"
                                  >
                                    <Eye size={14} style={{ color: "#2563EB" }} />
                                    <span>{isEnglish ? "View details" : "Voir les détails"}</span>
                                  </button>

                                  {/* 2. ÉDITER */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveActionMenuId(null);
                                      handleOpenEditNews(n);
                                    }}
                                    className="action-dropdown-item"
                                  >
                                    <Edit3 size={14} style={{ color: "#D97706" }} />
                                    <span>{isEnglish ? "Edit news" : "Éditer l'actualité"}</span>
                                  </button>

                                  {/* 3. DÉSACTIVER / ACTIVER */}
                                  {n.status === "active" ? (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveActionMenuId(null);
                                        handleToggleNewsStatus(n);
                                      }}
                                      className="action-dropdown-item"
                                    >
                                      <Power size={14} style={{ color: "#EA580C" }} />
                                      <span>{isEnglish ? "Deactivate" : "Désactiver"}</span>
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveActionMenuId(null);
                                        handleToggleNewsStatus(n);
                                      }}
                                      className="action-dropdown-item"
                                    >
                                      <CheckCircle size={14} style={{ color: "#059669" }} />
                                      <span>{isEnglish ? "Activate" : "Activer"}</span>
                                    </button>
                                  )}

                                  <div className="action-dropdown-divider"></div>

                                  {/* 4. SUPPRIMER */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveActionMenuId(null);
                                      handleDeleteNews(n);
                                    }}
                                    className="action-dropdown-item text-danger"
                                  >
                                    <Trash2 size={14} />
                                    <span>{isEnglish ? "Delete" : "Supprimer"}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                        );
                      })}
                      {filteredNews.length === 0 && (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center", color: "#6A8278", padding: "2.5rem" }}>
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
            <p style={{ color: "#5A7367", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
              {isEnglish ? "Broadcast a press release or institutional milestone in French and English." : "Diffuser un communiqué ou jalon institutionnel en français et en anglais pour les médias partenaires."}
            </p>

            {/* Bilingual Tab Switcher */}
            <div className="modal-lang-tabs">
              <button 
                type="button" 
                className={`modal-lang-tab-btn ${newsFormLangTab === "fr" ? "active" : ""}`}
                onClick={() => setNewsFormLangTab("fr")}
              >
                <span>🇫🇷</span>
                <span>{isEnglish ? "French Version (Primary *)" : "Version Française (Principale *)"}</span>
              </button>
              <button 
                type="button" 
                className={`modal-lang-tab-btn ${newsFormLangTab === "en" ? "active" : ""}`}
                onClick={() => setNewsFormLangTab("en")}
              >
                <span>🇬🇧</span>
                <span>{isEnglish ? "English Version" : "Version Anglaise"}</span>
                {newsForm.titleEn && (
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }} title="Contenu anglais saisi"></span>
                )}
              </button>
            </div>

            <form onSubmit={handleCreateNews}>
              {/* SHARED COVER IMAGE */}
              <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                <label className="form-label" style={{ color: "#13221B" }}>
                  {isEnglish ? "Cover Image (Shared · optional)" : "Image d'illustration (Commune aux deux langues · optionnelle)"}
                </label>
                
                {newsForm.coverImagePreview ? (
                  <div style={{ position: "relative", marginBottom: "0.5rem", borderRadius: "8px", overflow: "hidden", border: "1px solid #C8D6CF", maxHeight: "180px" }}>
                    <img 
                      src={newsForm.coverImagePreview} 
                      alt="Preview" 
                      style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} 
                    />
                    <button
                      type="button"
                      onClick={() => setNewsForm({ ...newsForm, coverImageFile: null, coverImagePreview: null })}
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "rgba(19, 34, 27, 0.8)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                      }}
                      title={isEnglish ? "Remove image" : "Supprimer l'image"}
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <div 
                    style={{
                      border: "2px dashed #9EBEAF",
                      borderRadius: "8px",
                      padding: "1.2rem",
                      textAlign: "center",
                      background: "#F4F7F5",
                      cursor: "pointer",
                      transition: "border-color 0.2s"
                    }}
                    onClick={() => document.getElementById("news-image-upload-input")?.click()}
                  >
                    <Upload size={24} style={{ color: "#2E5C46", margin: "0 auto 0.5rem" }} />
                    <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, color: "#13221B" }}>
                      {isEnglish ? "Click to select an image (JPG, PNG, WebP)" : "Cliquer pour sélectionner une image (JPG, PNG, WebP)"}
                    </p>
                    <p style={{ margin: "0.2rem 0 0", fontSize: "0.75rem", color: "#6A8278" }}>
                      {isEnglish ? "Multipart Form-Data · Max 6MB" : "Support Form-Data multipart · Max 6 Mo"}
                    </p>
                  </div>
                )}

                <input 
                  id="news-image-upload-input"
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const previewUrl = URL.createObjectURL(file);
                      setNewsForm({
                        ...newsForm,
                        coverImageFile: file,
                        coverImagePreview: previewUrl
                      });
                    }
                  }}
                />
              </div>

              {/* FRENCH TAB FIELDS */}
              {newsFormLangTab === "fr" && (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Titre de l'annonce (Français) *</label>
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
                    <label className="form-label" style={{ color: "#13221B" }}>Catégorie (Français)</label>
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
                    <label className="form-label" style={{ color: "#13221B" }}>Résumé synthétique (Français) *</label>
                    <textarea 
                      required 
                      rows={2} 
                      className="form-control" 
                      value={newsForm.summary} 
                      onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })} 
                      placeholder="Accroche synthétique de l'annonce..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Texte complet (Français) *</label>
                    <textarea 
                      required 
                      rows={5} 
                      className="form-control" 
                      value={newsForm.content} 
                      onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} 
                      placeholder="Corps détaillé du communiqué..."
                    />
                  </div>

                  <div className="form-group">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                      <label className="form-label" style={{ color: "#13221B", marginBottom: 0 }}>
                        Mots-clés / Tags (Français)
                      </label>
                      <span style={{ fontSize: "0.78rem", color: "#6A8278" }}>
                        Séparés par des virgules
                      </span>
                    </div>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={newsForm.tags} 
                      onChange={(e) => setNewsForm({ ...newsForm, tags: e.target.value })} 
                      placeholder="ex: Climat, Bassin du Congo, Cohorte 2026, Jeunesse"
                    />

                    {/* Active Tag Bubbles */}
                    {newsForm.tags && (
                      <div style={{ marginTop: "0.6rem" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#4A6356", display: "block", marginBottom: "0.25rem" }}>
                          Tags actifs :
                        </span>
                        <div className="news-tags-row" style={{ marginTop: 0 }}>
                          {newsForm.tags.split(",").map((t) => t.trim()).filter(Boolean).map((tag, idx) => (
                            <span key={idx} className="news-tag-bubble" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                              #{tag}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = newsForm.tags.split(",").map(t => t.trim()).filter(t => t !== tag).join(", ");
                                  setNewsForm({ ...newsForm, tags: updated });
                                }}
                                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "inherit", display: "inline-flex" }}
                                title="Retirer ce tag"
                              >
                                <X size={11} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Suggestion Bubbles */}
                    <div style={{ marginTop: "0.6rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "#6A8278", display: "block", marginBottom: "0.3rem" }}>
                        Suggestions rapides :
                      </span>
                      <div className="news-tags-row" style={{ marginTop: 0 }}>
                        {["Bassin du Congo", "Climat", "Jeunesse", "Médias", "Cohorte 2026", "Partenariat", "Formation"].map((suggestion) => {
                          const currentTags = newsForm.tags ? newsForm.tags.split(",").map(t => t.trim()) : [];
                          const isSelected = currentTags.includes(suggestion);
                          return (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  const updated = currentTags.filter(t => t !== suggestion).join(", ");
                                  setNewsForm({ ...newsForm, tags: updated });
                                } else {
                                  const updated = currentTags.length > 0 ? `${newsForm.tags.trim().replace(/,+$/, "")}, ${suggestion}` : suggestion;
                                  setNewsForm({ ...newsForm, tags: updated });
                                }
                              }}
                              className="news-tag-bubble"
                              style={{
                                cursor: "pointer",
                                border: isSelected ? "1px solid #1E5128" : "1px dashed rgba(30, 81, 40, 0.25)",
                                background: isSelected ? "rgba(30, 81, 40, 0.16)" : "rgba(30, 81, 40, 0.05)",
                                fontWeight: isSelected ? 700 : 500
                              }}
                            >
                              #{suggestion} {isSelected ? "✓" : "+"}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ENGLISH TAB FIELDS */}
              {newsFormLangTab === "en" && (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Announcement Title (English)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={newsForm.titleEn} 
                      onChange={(e) => setNewsForm({ ...newsForm, titleEn: e.target.value })} 
                      placeholder="e.g. Official Launch of the 2026-2027 Cohort Applications"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Category (English)</label>
                    <select 
                      className="dedicated-select" 
                      style={{ width: "100%" }}
                      value={newsForm.categoryEn} 
                      onChange={(e) => setNewsForm({ ...newsForm, categoryEn: e.target.value })}
                    >
                      <option value="Official Dispatch">Official Dispatch</option>
                      <option value="Institutional Partnership">Institutional Partnership</option>
                      <option value="Event & Forum">Event & Forum</option>
                      <option value="Call for Applications">Call for Applications</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Executive Summary (English)</label>
                    <textarea 
                      rows={2} 
                      className="form-control" 
                      value={newsForm.summaryEn} 
                      onChange={(e) => setNewsForm({ ...newsForm, summaryEn: e.target.value })} 
                      placeholder="Concise overview of the release for English-speaking readers..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Full Body / Content (English)</label>
                    <textarea 
                      rows={5} 
                      className="form-control" 
                      value={newsForm.contentEn} 
                      onChange={(e) => setNewsForm({ ...newsForm, contentEn: e.target.value })} 
                      placeholder="Full English announcement text..."
                    />
                  </div>

                  <div className="form-group">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                      <label className="form-label" style={{ color: "#13221B", marginBottom: 0 }}>
                        Keywords / Tags (English)
                      </label>
                      <span style={{ fontSize: "0.78rem", color: "#6A8278" }}>
                        Separated by commas
                      </span>
                    </div>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={newsForm.tagsEn} 
                      onChange={(e) => setNewsForm({ ...newsForm, tagsEn: e.target.value })} 
                      placeholder="e.g. Climate, Congo Basin, 2026 Cohort, Youth"
                    />

                    {/* Active Tag Bubbles */}
                    {newsForm.tagsEn && (
                      <div style={{ marginTop: "0.6rem" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#4A6356", display: "block", marginBottom: "0.25rem" }}>
                          Active Tags:
                        </span>
                        <div className="news-tags-row" style={{ marginTop: 0 }}>
                          {newsForm.tagsEn.split(",").map((t) => t.trim()).filter(Boolean).map((tag, idx) => (
                            <span key={idx} className="news-tag-bubble" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                              #{tag}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = newsForm.tagsEn.split(",").map(t => t.trim()).filter(t => t !== tag).join(", ");
                                  setNewsForm({ ...newsForm, tagsEn: updated });
                                }}
                                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "inherit", display: "inline-flex" }}
                                title="Remove tag"
                              >
                                <X size={11} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Suggestion Bubbles */}
                    <div style={{ marginTop: "0.6rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "#6A8278", display: "block", marginBottom: "0.3rem" }}>
                        Quick suggestions:
                      </span>
                      <div className="news-tags-row" style={{ marginTop: 0 }}>
                        {["Congo Basin", "Climate", "Youth", "Media", "2026 Cohort", "Partnership", "Training"].map((suggestion) => {
                          const currentTags = newsForm.tagsEn ? newsForm.tagsEn.split(",").map(t => t.trim()) : [];
                          const isSelected = currentTags.includes(suggestion);
                          return (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  const updated = currentTags.filter(t => t !== suggestion).join(", ");
                                  setNewsForm({ ...newsForm, tagsEn: updated });
                                } else {
                                  const updated = currentTags.length > 0 ? `${newsForm.tagsEn.trim().replace(/,+$/, "")}, ${suggestion}` : suggestion;
                                  setNewsForm({ ...newsForm, tagsEn: updated });
                                }
                              }}
                              className="news-tag-bubble"
                              style={{
                                cursor: "pointer",
                                border: isSelected ? "1px solid #1E5128" : "1px dashed rgba(30, 81, 40, 0.25)",
                                background: isSelected ? "rgba(30, 81, 40, 0.16)" : "rgba(30, 81, 40, 0.05)",
                                fontWeight: isSelected ? 700 : 500
                              }}
                            >
                              #{suggestion} {isSelected ? "✓" : "+"}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}

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

      {/* VIEW NEWS DETAILS MODAL */}
      {viewNewsOpen && selectedNewsItem && (
        <div className="modal-overlay" onClick={() => setViewNewsOpen(false)}>
          <div className="modal-card article-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "700px" }}>
            <button 
              className="modal-close-btn" 
              onClick={() => setViewNewsOpen(false)}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                <span className="badge badge-gold-light">
                  {(viewNewsLangTab === "en" && selectedNewsItem.categoryEn) ? selectedNewsItem.categoryEn : (selectedNewsItem.category || "Communiqué")}
                </span>
                <span className={`badge ${selectedNewsItem.status === "active" ? "badge-green-light" : "badge-forest-light"}`}>
                  {selectedNewsItem.status === "active" ? (isEnglish ? "● Active (Public)" : "● Publié (Actif)") : (isEnglish ? "○ Deactivated" : "○ Désactivé")}
                </span>
              </div>

              {(selectedNewsItem.titleEn || selectedNewsItem.contentEn || selectedNewsItem.summaryEn) && (
                <div className="modal-lang-tabs" style={{ margin: 0, padding: "2px" }}>
                  <button
                    type="button"
                    className={`modal-lang-tab-btn ${viewNewsLangTab === "fr" ? "active" : ""}`}
                    onClick={() => setViewNewsLangTab("fr")}
                    style={{ padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}
                  >
                    🇫🇷 FR
                  </button>
                  <button
                    type="button"
                    className={`modal-lang-tab-btn ${viewNewsLangTab === "en" ? "active" : ""}`}
                    onClick={() => setViewNewsLangTab("en")}
                    style={{ padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}
                  >
                    🇬🇧 EN
                  </button>
                </div>
              )}
            </div>

            <div style={{ marginBottom: "1.25rem", borderRadius: "10px", overflow: "hidden", maxHeight: "260px", border: "1px solid #E5EBE7" }}>
              {selectedNewsItem.coverImage ? (
                <img 
                  src={getMediaUrl(selectedNewsItem.coverImage)} 
                  alt={(viewNewsLangTab === "en" && selectedNewsItem.titleEn) ? selectedNewsItem.titleEn : selectedNewsItem.title} 
                  style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }} 
                />
              ) : (
                <div className="news-card-default-bg" style={{ height: "180px" }}>
                  <div className="news-card-default-brand">
                    <img 
                      src="/assets/jeddiac-lineaire-blanc.png" 
                      alt="JEDDIAC" 
                      className="news-card-default-logo"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    <span className="news-card-default-caption">
                      {(viewNewsLangTab === "en" && selectedNewsItem.categoryEn) ? selectedNewsItem.categoryEn : (selectedNewsItem.category || "Communiqué Officiel")}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <h2 style={{ fontSize: "1.75rem", color: "#13221B", lineHeight: "1.35", marginBottom: "0.8rem", fontFamily: "var(--font-serif)" }}>
              {(viewNewsLangTab === "en" && selectedNewsItem.titleEn) ? selectedNewsItem.titleEn : selectedNewsItem.title}
            </h2>

            <div style={{ display: "flex", gap: "1.5rem", color: "#6A8278", fontSize: "0.85rem", marginBottom: "1.5rem", flexWrap: "wrap", borderBottom: "1px solid #E5EBE7", paddingBottom: "1rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Calendar size={14} />
                {new Date(selectedNewsItem.publishedAt || selectedNewsItem.createdAt).toLocaleDateString(viewNewsLangTab === "en" ? "en-US" : "fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              {selectedNewsItem.slug && (
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Tag size={13} />
                  Slug: {selectedNewsItem.slug}
                </span>
              )}
              {selectedNewsItem.titleEn && (
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#1E5128", fontWeight: 600 }}>
                  🌐 {isEnglish ? "Bilingual article (FR / EN)" : "Article bilingue (FR / EN)"}
                </span>
              )}
            </div>

            <div style={{ color: "#2B4036", lineHeight: "1.8", fontSize: "1rem" }}>
              {((viewNewsLangTab === "en" && selectedNewsItem.summaryEn) || selectedNewsItem.summary) && (
                <div style={{ fontWeight: 600, fontSize: "1.05rem", marginBottom: "1rem", color: "#13221B", padding: "0.85rem", background: "#F4F7F5", borderRadius: "8px", borderLeft: "3px solid #2E5C46" }}>
                  {(viewNewsLangTab === "en" && selectedNewsItem.summaryEn) ? selectedNewsItem.summaryEn : selectedNewsItem.summary}
                </div>
              )}
              <div style={{ whiteSpace: "pre-line" }}>
                {(viewNewsLangTab === "en" && (selectedNewsItem.contentEn || selectedNewsItem.summaryEn)) 
                  ? (selectedNewsItem.contentEn || selectedNewsItem.summaryEn) 
                  : (selectedNewsItem.content || selectedNewsItem.summary)}
              </div>
            </div>

            {((viewNewsLangTab === "en" && selectedNewsItem.tagsEn) ? selectedNewsItem.tagsEn : selectedNewsItem.tags) && (
              <div className="news-tags-row" style={{ marginTop: "1.5rem" }}>
                {((viewNewsLangTab === "en" && selectedNewsItem.tagsEn) ? selectedNewsItem.tagsEn : selectedNewsItem.tags).split(",").map((tag, i) => (
                  <span key={i} className="news-tag-bubble">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <div style={{ marginTop: "2rem", paddingTop: "1.25rem", borderTop: "1px solid #E5EBE7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button 
                type="button" 
                onClick={() => {
                  setViewNewsOpen(false);
                  handleOpenEditNews(selectedNewsItem);
                }} 
                className="btn-action-edit"
              >
                <Edit3 size={14} />
                <span>{isEnglish ? "Edit this announcement" : "Modifier cette actualité"}</span>
              </button>

              <button onClick={() => setViewNewsOpen(false)} className="btn btn-forest">
                {isEnglish ? "Close" : "Fermer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT NEWS MODAL */}
      {editNewsOpen && (
        <div className="modal-overlay" onClick={() => setEditNewsOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "660px" }}>
            <button 
              onClick={() => setEditNewsOpen(false)} 
              className="modal-close-btn"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", fontWeight: 800, color: "#13221B", marginBottom: "0.4rem" }}>
              {isEnglish ? "Edit Announcement" : "Modifier l'Actualité"}
            </h3>
                       <form onSubmit={handleUpdateNews}>
              {/* Cover Image Upload (Shared) */}
              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>
                  {isEnglish ? "Cover Image (Shared)" : "Image d'illustration (commune aux deux langues)"}
                </label>

                {editNewsForm.coverImagePreview ? (
                  <div style={{ position: "relative", marginBottom: "0.5rem", borderRadius: "8px", overflow: "hidden", border: "1px solid #C8D6CF", maxHeight: "180px" }}>
                    <img 
                      src={editNewsForm.coverImagePreview} 
                      alt="Preview" 
                      style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} 
                    />
                    <button
                      type="button"
                      onClick={() => setEditNewsForm({
                        ...editNewsForm,
                        coverImageFile: null,
                        coverImagePreview: null,
                        removeExistingImage: true
                      })}
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "rgba(19, 34, 27, 0.8)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                      }}
                      title={isEnglish ? "Remove image" : "Supprimer l'image"}
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <div 
                    style={{
                      border: "2px dashed #9EBEAF",
                      borderRadius: "8px",
                      padding: "1.2rem",
                      textAlign: "center",
                      background: "#F4F7F5",
                      cursor: "pointer",
                      transition: "border-color 0.2s"
                    }}
                    onClick={() => document.getElementById("edit-news-image-input")?.click()}
                  >
                    <Upload size={24} style={{ color: "#2E5C46", margin: "0 auto 0.5rem" }} />
                    <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, color: "#13221B" }}>
                      {isEnglish ? "Click to upload a new image (JPG, PNG, WebP)" : "Cliquer pour téléverser une nouvelle image (JPG, PNG, WebP)"}
                    </p>
                    <p style={{ margin: "0.2rem 0 0", fontSize: "0.75rem", color: "#6A8278" }}>
                      {isEnglish ? "Multipart Form-Data · Max 6MB" : "Support Form-Data multipart · Max 6 Mo"}
                    </p>
                  </div>
                )}

                <input 
                  id="edit-news-image-input"
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const previewUrl = URL.createObjectURL(file);
                      setEditNewsForm({
                        ...editNewsForm,
                        coverImageFile: file,
                        coverImagePreview: previewUrl,
                        removeExistingImage: false
                      });
                    }
                  }}
                />
              </div>

              {/* Language Switcher Tabs */}
              <div className="modal-lang-tabs" style={{ marginBottom: "1.25rem" }}>
                <button
                  type="button"
                  className={`modal-lang-tab-btn ${editNewsLangTab === "fr" ? "active" : ""}`}
                  onClick={() => setEditNewsLangTab("fr")}
                >
                  🇫🇷 {isEnglish ? "French Version (Principal)" : "Version Française (Obligatoire)"}
                </button>
                <button
                  type="button"
                  className={`modal-lang-tab-btn ${editNewsLangTab === "en" ? "active" : ""}`}
                  onClick={() => setEditNewsLangTab("en")}
                >
                  🇬🇧 {isEnglish ? "English Version (Optional)" : "Version Anglaise (Optionnelle)"} {editNewsForm.titleEn ? "✓" : ""}
                </button>
              </div>

              {/* TAB FR */}
              {editNewsLangTab === "fr" && (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      {isEnglish ? "Announcement Title (French) *" : "Titre de l'annonce (Français) *"}
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="form-control" 
                      value={editNewsForm.title} 
                      onChange={(e) => setEditNewsForm({ ...editNewsForm, title: e.target.value })} 
                      placeholder="ex: Clôture des candidatures pour la cohorte 2026"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      {isEnglish ? "Category (French)" : "Catégorie (Français)"}
                    </label>
                    <select 
                      className="dedicated-select" 
                      style={{ width: "100%" }}
                      value={editNewsForm.category} 
                      onChange={(e) => setEditNewsForm({ ...editNewsForm, category: e.target.value })}
                    >
                      <option value="Communiqué">Communiqué Officiel</option>
                      <option value="Partenariat">Partenariat Institutionnel</option>
                      <option value="Événement">Événement & Forum</option>
                      <option value="Appel à projets">Appel à candidatures</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      {isEnglish ? "Summary (French) *" : "Résumé synthétique (Français) *"}
                    </label>
                    <textarea 
                      required 
                      rows={2} 
                      className="form-control" 
                      value={editNewsForm.summary} 
                      onChange={(e) => setEditNewsForm({ ...editNewsForm, summary: e.target.value })} 
                      placeholder="Court paragraphe d'accroche visible sur la carte..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      {isEnglish ? "Full Body (French) *" : "Texte complet (Français) *"}
                    </label>
                    <textarea 
                      required 
                      rows={5} 
                      className="form-control" 
                      value={editNewsForm.content} 
                      onChange={(e) => setEditNewsForm({ ...editNewsForm, content: e.target.value })} 
                      placeholder="Corps complet de l'article ou du communiqué..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span>{isEnglish ? "Tags / Keywords (French)" : "Mots-clés / Tags (Français)"}</span>
                      <span style={{ fontSize: "0.75rem", color: "#6A8278", fontWeight: 400 }}>
                        {isEnglish ? "Separated by commas" : "Séparés par des virgules"}
                      </span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editNewsForm.tags} 
                      onChange={(e) => setEditNewsForm({ ...editNewsForm, tags: e.target.value })} 
                      placeholder="ex: Bassin du Congo, Climat, 2026"
                    />

                    {/* Live News Tag Bubbles Preview */}
                    {editNewsForm.tags && editNewsForm.tags.split(",").map((t) => t.trim()).filter(Boolean).length > 0 && (
                      <div style={{ marginTop: "0.5rem" }}>
                        <span style={{ fontSize: "0.75rem", color: "#6A8278", display: "block", marginBottom: "0.25rem" }}>
                          {isEnglish ? "Active tags:" : "Tags actifs :"}
                        </span>
                        <div className="news-tags-row" style={{ marginTop: 0 }}>
                          {editNewsForm.tags.split(",").map((t) => t.trim()).filter(Boolean).map((tag, idx) => (
                            <span key={idx} className="news-tag-bubble" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                              #{tag}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = editNewsForm.tags.split(",").map(t => t.trim()).filter(t => t !== tag).join(", ");
                                  setEditNewsForm({ ...editNewsForm, tags: updated });
                                }}
                                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "inherit", display: "inline-flex" }}
                                title={isEnglish ? "Remove tag" : "Retirer ce tag"}
                              >
                                <X size={11} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Suggestion Bubbles */}
                    <div style={{ marginTop: "0.6rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "#6A8278", display: "block", marginBottom: "0.3rem" }}>
                        {isEnglish ? "Quick suggestions:" : "Suggestions rapides :"}
                      </span>
                      <div className="news-tags-row" style={{ marginTop: 0 }}>
                        {["Bassin du Congo", "Climat", "Jeunesse", "Médias", "Cohorte 2026", "Partenariat", "Formation"].map((suggestion) => {
                          const currentTags = editNewsForm.tags ? editNewsForm.tags.split(",").map(t => t.trim()) : [];
                          const isSelected = currentTags.includes(suggestion);
                          return (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  const updated = currentTags.filter(t => t !== suggestion).join(", ");
                                  setEditNewsForm({ ...editNewsForm, tags: updated });
                                } else {
                                  const updated = currentTags.length > 0 ? `${editNewsForm.tags.trim().replace(/,+$/, "")}, ${suggestion}` : suggestion;
                                  setEditNewsForm({ ...editNewsForm, tags: updated });
                                }
                              }}
                              className="news-tag-bubble"
                              style={{
                                cursor: "pointer",
                                border: isSelected ? "1px solid #1E5128" : "1px dashed rgba(30, 81, 40, 0.25)",
                                background: isSelected ? "rgba(30, 81, 40, 0.16)" : "rgba(30, 81, 40, 0.05)",
                                fontWeight: isSelected ? 700 : 500
                              }}
                            >
                              #{suggestion} {isSelected ? "✓" : "+"}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* TAB EN */}
              {editNewsLangTab === "en" && (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      {isEnglish ? "Announcement Title (English)" : "Titre de l'annonce (Anglais)"}
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editNewsForm.titleEn} 
                      onChange={(e) => setEditNewsForm({ ...editNewsForm, titleEn: e.target.value })} 
                      placeholder="e.g. Applications closed for the 2026 Cohort"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      {isEnglish ? "Category (English)" : "Catégorie (Anglais)"}
                    </label>
                    <select 
                      className="dedicated-select" 
                      style={{ width: "100%" }}
                      value={editNewsForm.categoryEn} 
                      onChange={(e) => setEditNewsForm({ ...editNewsForm, categoryEn: e.target.value })}
                    >
                      <option value="Official Press Release">Official Press Release</option>
                      <option value="Institutional Partnership">Institutional Partnership</option>
                      <option value="Event & Forum">Event & Forum</option>
                      <option value="Call for Applications">Call for Applications</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      {isEnglish ? "Summary (English)" : "Résumé synthétique (Anglais)"}
                    </label>
                    <textarea 
                      rows={2} 
                      className="form-control" 
                      value={editNewsForm.summaryEn} 
                      onChange={(e) => setEditNewsForm({ ...editNewsForm, summaryEn: e.target.value })} 
                      placeholder="Short introductory summary for the English card..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      {isEnglish ? "Full Body (English)" : "Texte complet (Anglais)"}
                    </label>
                    <textarea 
                      rows={5} 
                      className="form-control" 
                      value={editNewsForm.contentEn} 
                      onChange={(e) => setEditNewsForm({ ...editNewsForm, contentEn: e.target.value })} 
                      placeholder="Full English body text..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span>{isEnglish ? "Tags / Keywords (English)" : "Mots-clés / Tags (Anglais)"}</span>
                      <span style={{ fontSize: "0.75rem", color: "#6A8278", fontWeight: 400 }}>
                        {isEnglish ? "Separated by commas" : "Séparés par des virgules"}
                      </span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editNewsForm.tagsEn} 
                      onChange={(e) => setEditNewsForm({ ...editNewsForm, tagsEn: e.target.value })} 
                      placeholder="e.g. Congo Basin, Climate, 2026 Cohort"
                    />

                    {/* Live News Tag Bubbles Preview */}
                    {editNewsForm.tagsEn && editNewsForm.tagsEn.split(",").map((t) => t.trim()).filter(Boolean).length > 0 && (
                      <div style={{ marginTop: "0.5rem" }}>
                        <span style={{ fontSize: "0.75rem", color: "#6A8278", display: "block", marginBottom: "0.25rem" }}>
                          Active tags (EN):
                        </span>
                        <div className="news-tags-row" style={{ marginTop: 0 }}>
                          {editNewsForm.tagsEn.split(",").map((t) => t.trim()).filter(Boolean).map((tag, idx) => (
                            <span key={idx} className="news-tag-bubble" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                              #{tag}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = editNewsForm.tagsEn.split(",").map(t => t.trim()).filter(t => t !== tag).join(", ");
                                  setEditNewsForm({ ...editNewsForm, tagsEn: updated });
                                }}
                                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "inherit", display: "inline-flex" }}
                                title="Remove tag"
                              >
                                <X size={11} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Suggestion Bubbles */}
                    <div style={{ marginTop: "0.6rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "#6A8278", display: "block", marginBottom: "0.3rem" }}>
                        Quick suggestions:
                      </span>
                      <div className="news-tags-row" style={{ marginTop: 0 }}>
                        {["Congo Basin", "Climate", "Youth", "Media", "2026 Cohort", "Partnership", "Training"].map((suggestion) => {
                          const currentTags = editNewsForm.tagsEn ? editNewsForm.tagsEn.split(",").map(t => t.trim()) : [];
                          const isSelected = currentTags.includes(suggestion);
                          return (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  const updated = currentTags.filter(t => t !== suggestion).join(", ");
                                  setEditNewsForm({ ...editNewsForm, tagsEn: updated });
                                } else {
                                  const updated = currentTags.length > 0 ? `${editNewsForm.tagsEn.trim().replace(/,+$/, "")}, ${suggestion}` : suggestion;
                                  setEditNewsForm({ ...editNewsForm, tagsEn: updated });
                                }
                              }}
                              className="news-tag-bubble"
                              style={{
                                cursor: "pointer",
                                border: isSelected ? "1px solid #1E5128" : "1px dashed rgba(30, 81, 40, 0.25)",
                                background: isSelected ? "rgba(30, 81, 40, 0.16)" : "rgba(30, 81, 40, 0.05)",
                                fontWeight: isSelected ? 700 : 500
                              }}
                            >
                              #{suggestion} {isSelected ? "✓" : "+"}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid #E5EBE7" }}>
                <button type="button" onClick={() => setEditNewsOpen(false)} className="btn btn-outline-forest">
                  {isEnglish ? "Cancel" : "Annuler"}
                </button>
                <button type="submit" className="btn btn-forest">
                  {isEnglish ? "Save Changes" : "Enregistrer les modifications"}
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

      {/* CONFIRMATION MODAL FOR DEACTIVATE / ACTIVATE / DELETE */}
      {confirmModal.isOpen && (
        <div className="confirm-modal-overlay" onClick={closeConfirmModal}>
          <div className="confirm-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={closeConfirmModal}
              disabled={confirmModal.isProcessing}
              className="modal-close-btn"
              aria-label={isEnglish ? "Close" : "Fermer"}
              style={{ top: "1rem", right: "1rem", width: "32px", height: "32px" }}
            >
              <X size={16} />
            </button>

            <div className={`confirm-icon-badge ${confirmModal.variant}`}>
              {confirmModal.icon === "trash" && <Trash2 size={26} />}
              {confirmModal.icon === "power" && <Power size={26} />}
              {confirmModal.icon === "check" && <CheckCircle size={26} />}
              {confirmModal.icon === "alert" && <AlertTriangle size={26} />}
            </div>

            <h3 className="confirm-modal-title">
              {confirmModal.title}
            </h3>

            <p className="confirm-modal-message">
              {confirmModal.message}
            </p>

            {confirmModal.subMessage && (
              <div className={`confirm-modal-submessage ${confirmModal.variant}`}>
                {confirmModal.subMessage}
              </div>
            )}

            <div className="confirm-modal-actions">
              <button 
                type="button" 
                onClick={closeConfirmModal} 
                disabled={confirmModal.isProcessing}
                className="btn-confirm-cancel"
              >
                {confirmModal.cancelText || (isEnglish ? "Cancel" : "Annuler")}
              </button>

              <button 
                type="button" 
                onClick={handleExecuteConfirm} 
                disabled={confirmModal.isProcessing}
                className={`btn-confirm-action ${confirmModal.variant}`}
              >
                {confirmModal.isProcessing ? (
                  <>
                    <span className="btn-spinner-ring" style={{ width: "16px", height: "16px", borderWidth: "2px", borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }}></span>
                    <span>{isEnglish ? "Processing..." : "Traitement..."}</span>
                  </>
                ) : (
                  <>
                    {confirmModal.icon === "trash" && <Trash2 size={15} />}
                    {confirmModal.icon === "power" && <Power size={15} />}
                    {confirmModal.icon === "check" && <CheckCircle size={15} />}
                    <span>{confirmModal.confirmText}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
