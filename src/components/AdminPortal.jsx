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
  AlertTriangle,
  MessageSquare,
  Building,
  Phone,
  Archive,
  Headphones,
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX
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
  const [news, setNews] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Modals for creating items

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

  // Podcast Management States
  const [podcastFilterTopic, setPodcastFilterTopic] = useState("all");
  const [podcastFilterStatus, setPodcastFilterStatus] = useState("all");
  const [newPodcastOpen, setNewPodcastOpen] = useState(false);
  const [podcastFormLangTab, setPodcastFormLangTab] = useState("fr"); // 'fr' | 'en'
  const [podcastForm, setPodcastForm] = useState({
    title: "",
    titleEn: "",
    series: "Les Voix de la Durabilité · Épisode 01",
    seriesEn: "Voices of Sustainability · Episode 01",
    duration: "10:00",
    author: "Club Média Lycée Leclerc, Yaoundé",
    authorEn: "General Leclerc High School Media Club, Yaoundé",
    topic: "Biodiversité & Forêts Primaires",
    topicEn: "Biodiversity & Primary Forests",
    description: "",
    descriptionEn: "",
    audioUrl: "",
    order: 0,
    cover: "",
    coverFile: null,
    coverPreview: null
  });

  const [viewPodcastOpen, setViewPodcastOpen] = useState(false);
  const [viewPodcastLangTab, setViewPodcastLangTab] = useState("fr");
  const [selectedPodcastItem, setSelectedPodcastItem] = useState(null);

  const [editPodcastOpen, setEditPodcastOpen] = useState(false);
  const [editPodcastLangTab, setEditPodcastLangTab] = useState("fr");
  const [editPodcastForm, setEditPodcastForm] = useState({
    id: "",
    title: "",
    titleEn: "",
    series: "",
    seriesEn: "",
    duration: "",
    author: "",
    authorEn: "",
    topic: "",
    topicEn: "",
    description: "",
    descriptionEn: "",
    audioUrl: "",
    order: 0,
    cover: "",
    coverFile: null,
    coverPreview: null
  });

  // User / Member Management States
  const [newUserOpen, setNewUserOpen] = useState(false);
  const [userFormLangTab, setUserFormLangTab] = useState("fr"); // 'fr' | 'en'
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "member",
    category: "journaliste",
    linkedin: "",
    metier: "",
    metierEn: "",
    pole: "Pôle Média & Climat",
    poleEn: "Climate & Media Hub",
    location: "Yaoundé, Cameroun",
    country: "Cameroun",
    bibliographie: "",
    bibliographieEn: "",
    conseil: "",
    conseilEn: "",
    contributions: "",
    contributionsEn: "",
    avatarFile: null,
    avatarPreview: null
  });

  const [editUserOpen, setEditUserOpen] = useState(false);
  const [editUserLangTab, setEditUserLangTab] = useState("fr");
  const [editUserForm, setEditUserForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "member",
    category: "journaliste",
    linkedin: "",
    metier: "",
    metierEn: "",
    pole: "",
    poleEn: "",
    location: "",
    country: "",
    bibliographie: "",
    bibliographieEn: "",
    conseil: "",
    conseilEn: "",
    contributions: "",
    contributionsEn: "",
    avatar: "",
    avatarFile: null,
    avatarPreview: null,
    removeExistingAvatar: false
  });

  const [viewUserOpen, setViewUserOpen] = useState(false);
  const [viewUserLangTab, setViewUserLangTab] = useState("fr");
  const [selectedUserItem, setSelectedUserItem] = useState(null);

  // Contact & Candidature Management States
  const [viewContactOpen, setViewContactOpen] = useState(false);
  const [selectedContactItem, setSelectedContactItem] = useState(null);
  const [contactTypeFilter, setContactTypeFilter] = useState("all"); // 'all' | 'candidature' | 'contact'
  const [contactStatusFilter, setContactStatusFilter] = useState("all"); // 'all' | 'new' | 'validated'
  const [adminNotesDraft, setAdminNotesDraft] = useState("");
  const [isSavingContactNotes, setIsSavingContactNotes] = useState(false);
  const [isValidatingContact, setIsValidatingContact] = useState(false);

  // Public Hero Impact Metrics States
  const [heroMetrics, setHeroMetrics] = useState({
    journalistesCibles: 20000,
    structuresPartenaires: 300,
    regionsCameroun: 6,
    paysAfriqueCentrale: 9,
    labelYouthFr: "Jeunes formés directement",
    labelYouthEn: "Young people trained directly",
    labelPartnersFr: "Structures accompagnées",
    labelPartnersEn: "Organisations receiving support",
    labelRegionsFr: "Pays à terme",
    labelRegionsEn: "Target countries",
    labelCountriesFr: "Personnes sensibilisées",
    labelCountriesEn: "People sensitized"
  });
  const [metricsModalOpen, setMetricsModalOpen] = useState(false);
  const [metricsForm, setMetricsForm] = useState({ ...heroMetrics });
  const [isSavingMetrics, setIsSavingMetrics] = useState(false);
  const [metricsFormLangTab, setMetricsFormLangTab] = useState("fr"); // 'fr' | 'en'

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
  const [agendaFormLangTab, setAgendaFormLangTab] = useState("fr"); // 'fr' | 'en'
  const [agendaForm, setAgendaForm] = useState({
    title: "",
    titleEn: "",
    type: "Formation Régionale",
    typeEn: "Regional Training",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    location: "Yaoundé · Hybride",
    locationEn: "Yaoundé · Hybrid",
    duration: "Session intensive 3 jours",
    durationEn: "3-day intensive session",
    seats: "40 places disponibles",
    seatsEn: "40 seats available",
    audience: "Lycéens & Étudiants",
    audienceEn: "High school & University students",
    description: "",
    descriptionEn: "",
    registrationLink: "/candidature"
  });

  const [editAgendaOpen, setEditAgendaOpen] = useState(false);
  const [editAgendaLangTab, setEditAgendaLangTab] = useState("fr");
  const [editAgendaForm, setEditAgendaForm] = useState({
    id: "",
    title: "",
    titleEn: "",
    type: "Formation Régionale",
    typeEn: "Regional Training",
    startDate: "",
    endDate: "",
    location: "",
    locationEn: "",
    duration: "",
    durationEn: "",
    seats: "",
    seatsEn: "",
    audience: "",
    audienceEn: "",
    description: "",
    descriptionEn: "",
    registrationLink: "/candidature",
    status: "active"
  });

  const [viewAgendaOpen, setViewAgendaOpen] = useState(false);
  const [viewAgendaLangTab, setViewAgendaLangTab] = useState("fr");
  const [selectedAgendaItem, setSelectedAgendaItem] = useState(null);

  const [agendaFilterStatus, setAgendaFilterStatus] = useState("all"); // 'all' | 'active' | 'suspended'
  const [agendaFilterType, setAgendaFilterType] = useState("all");

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
      const [statsRes, newsRes, agendaRes, contactsRes, newsletterRes, usersRes, podcastsRes, overviewStatsRes] = await Promise.all([
        api.getAdminStats(token).catch(() => null),
        api.getAdminNews(token, "?limit=100").catch(() => api.getNews("?limit=50").catch(() => ({ values: [] }))),
        api.getAdminAgendas(token, "?limit=100").catch(() => api.getAgendas("?limit=50").catch(() => ({ values: [] }))),
        api.getAdminContacts(token, "?limit=50").catch(() => ({ data: [], values: [] })),
        api.getAdminNewsletters(token, "?limit=50").catch(() => ({ data: [], values: [] })),
        api.getAdminUsers(token, "?limit=50").catch(() => ({ data: [], values: [] })),
        api.getAdminPodcasts(token, "?limit=100").catch(() => api.getPodcasts("?limit=50").catch(() => ({ values: [] }))),
        api.getOverviewStats().catch(() => null)
      ]);

      if (statsRes) setStats(statsRes);
      if (overviewStatsRes) {
        setHeroMetrics((prev) => ({ ...prev, ...overviewStatsRes }));
        setMetricsForm((prev) => ({ ...prev, ...overviewStatsRes }));
      }
      if (newsRes?.values) setNews(newsRes.values);
      if (agendaRes?.values) setAgendas(agendaRes.values);
      if (contactsRes) setContacts(contactsRes.data || contactsRes.values || []);
      if (newsletterRes) setNewsletters(newsletterRes.data || newsletterRes.values || []);
      if (usersRes) setUsersList(usersRes.data || usersRes.values || []);
      if (podcastsRes?.values) setPodcasts(podcastsRes.values);
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

  // ==========================================
  // PODCAST ACTIONS (CRUD + STATUS TOGGLE)
  // ==========================================
  const handleCreatePodcast = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", podcastForm.title);
      if (podcastForm.titleEn) formData.append("titleEn", podcastForm.titleEn);
      formData.append("series", podcastForm.series || "Les Voix de la Durabilité");
      if (podcastForm.seriesEn) formData.append("seriesEn", podcastForm.seriesEn);
      formData.append("duration", podcastForm.duration || "10:00");
      formData.append("author", podcastForm.author || "Club Média Junior");
      if (podcastForm.authorEn) formData.append("authorEn", podcastForm.authorEn);
      formData.append("topic", podcastForm.topic || "Environnement & Climat");
      if (podcastForm.topicEn) formData.append("topicEn", podcastForm.topicEn);
      if (podcastForm.description) formData.append("description", podcastForm.description);
      if (podcastForm.descriptionEn) formData.append("descriptionEn", podcastForm.descriptionEn);
      if (podcastForm.audioUrl) formData.append("audioUrl", podcastForm.audioUrl);
      formData.append("order", String(podcastForm.order || 0));
      if (podcastForm.coverFile) {
        formData.append("cover", podcastForm.coverFile);
      } else if (podcastForm.cover) {
        formData.append("cover", podcastForm.cover);
      }

      await api.createPodcast(token, formData);
      setNewPodcastOpen(false);
      setPodcastFormLangTab("fr");
      setPodcastForm({
        title: "",
        titleEn: "",
        series: "Les Voix de la Durabilité · Épisode 01",
        seriesEn: "Voices of Sustainability · Episode 01",
        duration: "10:00",
        author: "Club Média Lycée Leclerc, Yaoundé",
        authorEn: "General Leclerc High School Media Club, Yaoundé",
        topic: "Biodiversité & Forêts Primaires",
        topicEn: "Biodiversity & Primary Forests",
        description: "",
        descriptionEn: "",
        audioUrl: "",
        order: 0,
        cover: "",
        coverFile: null,
        coverPreview: null
      });
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  const handleOpenViewPodcast = (item) => {
    setSelectedPodcastItem(item);
    setViewPodcastLangTab(isEnglish ? "en" : "fr");
    setViewPodcastOpen(true);
  };

  const handleOpenEditPodcast = (item) => {
    setEditPodcastLangTab("fr");
    setEditPodcastForm({
      id: item.id,
      title: item.title || "",
      titleEn: item.titleEn || "",
      series: item.series || "",
      seriesEn: item.seriesEn || "",
      duration: item.duration || "",
      author: item.author || "",
      authorEn: item.authorEn || "",
      topic: item.topic || "",
      topicEn: item.topicEn || "",
      description: item.description || "",
      descriptionEn: item.descriptionEn || "",
      audioUrl: item.audioUrl || "",
      order: item.order ?? 0,
      cover: item.cover || item.coverImage || "",
      coverFile: null,
      coverPreview: null
    });
    setEditPodcastOpen(true);
  };

  const handleUpdatePodcast = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", editPodcastForm.title);
      if (editPodcastForm.titleEn) formData.append("titleEn", editPodcastForm.titleEn);
      formData.append("series", editPodcastForm.series || "");
      if (editPodcastForm.seriesEn) formData.append("seriesEn", editPodcastForm.seriesEn);
      formData.append("duration", editPodcastForm.duration || "");
      formData.append("author", editPodcastForm.author || "");
      if (editPodcastForm.authorEn) formData.append("authorEn", editPodcastForm.authorEn);
      formData.append("topic", editPodcastForm.topic || "");
      if (editPodcastForm.topicEn) formData.append("topicEn", editPodcastForm.topicEn);
      if (editPodcastForm.description !== undefined) formData.append("description", editPodcastForm.description);
      if (editPodcastForm.descriptionEn !== undefined) formData.append("descriptionEn", editPodcastForm.descriptionEn);
      if (editPodcastForm.audioUrl !== undefined) formData.append("audioUrl", editPodcastForm.audioUrl);
      formData.append("order", String(editPodcastForm.order ?? 0));
      if (editPodcastForm.coverFile) {
        formData.append("cover", editPodcastForm.coverFile);
      } else if (editPodcastForm.cover) {
        formData.append("cover", editPodcastForm.cover);
      }

      await api.updatePodcast(token, editPodcastForm.id, formData);
      setEditPodcastOpen(false);
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  const handleTogglePodcastStatus = (item) => {
    const isCurrentlyActive = item.status === "active";
    const title = item?.title ? `« ${item.title} »` : (isEnglish ? "this podcast" : "ce podcast");

    if (isCurrentlyActive) {
      setConfirmModal({
        isOpen: true,
        title: isEnglish ? "Deactivate Podcast?" : "Désactiver le podcast ?",
        message: isEnglish 
          ? `Do you want to deactivate ${title}?`
          : `Voulez-vous désactiver le podcast ${title} ?`,
        subMessage: isEnglish
          ? "It will no longer appear on the public player or podcast hub. You can reactivate it at any time from this dashboard."
          : "Il ne sera plus audible ni affiché sur le lecteur public. Vous pourrez le réactiver à tout moment depuis ce tableau de bord.",
        confirmText: isEnglish ? "Yes, Deactivate" : "Oui, désactiver",
        cancelText: isEnglish ? "Cancel" : "Annuler",
        variant: "warning",
        icon: "power",
        isProcessing: false,
        onConfirm: async () => {
          await api.deactivatePodcast(token, item.id);
          loadAllAdminData();
        }
      });
    } else {
      setConfirmModal({
        isOpen: true,
        title: isEnglish ? "Activate Podcast?" : "Activer le podcast ?",
        message: isEnglish 
          ? `Do you want to activate ${title}?`
          : `Voulez-vous activer le podcast ${title} ?`,
        subMessage: isEnglish
          ? "It will immediately become playable and visible to all visitors on the public audio hub."
          : "Il sera immédiatement visible et écoutable par tous les visiteurs sur le hub audio public.",
        confirmText: isEnglish ? "Yes, Activate" : "Oui, activer",
        cancelText: isEnglish ? "Cancel" : "Annuler",
        variant: "success",
        icon: "check",
        isProcessing: false,
        onConfirm: async () => {
          await api.activatePodcast(token, item.id);
          loadAllAdminData();
        }
      });
    }
  };

  const handleDeletePodcast = (target) => {
    const item = typeof target === "object" ? target : podcasts.find(p => p.id === target);
    const title = item?.title ? `« ${item.title} »` : (isEnglish ? "this podcast" : "ce podcast");

    setConfirmModal({
      isOpen: true,
      title: isEnglish ? "Delete Podcast?" : "Supprimer le podcast ?",
      message: isEnglish 
        ? `Are you sure you want to permanently delete ${title}?`
        : `Voulez-vous vraiment supprimer définitivement ${title} ?`,
      subMessage: isEnglish
        ? "This action is irreversible. The podcast record and media links will be permanently removed from the server."
        : "Cette action est irréversible. L'émission ainsi que ses liens médias associés seront définitivement supprimés.",
      confirmText: isEnglish ? "Yes, Delete" : "Oui, supprimer",
      cancelText: isEnglish ? "Cancel" : "Annuler",
      variant: "danger",
      icon: "trash",
      isProcessing: false,
      onConfirm: async () => {
        const idToDelete = item?.id || target;
        await api.deletePodcast(token, idToDelete);
        loadAllAdminData();
      }
    });
  };

  // Agenda Actions
  const handleCreateAgenda = async (e) => {
    e.preventDefault();
    try {
      await api.createAgenda(token, agendaForm);
      setNewAgendaOpen(false);
      setAgendaForm({
        title: "",
        titleEn: "",
        type: "Formation Régionale",
        typeEn: "Regional Training",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
        location: "Yaoundé · Hybride",
        locationEn: "Yaoundé · Hybrid",
        duration: "Session intensive 3 jours",
        durationEn: "3-day intensive session",
        seats: "40 places disponibles",
        seatsEn: "40 seats available",
        audience: "Lycéens & Étudiants",
        audienceEn: "High school & University students",
        description: "",
        descriptionEn: "",
        registrationLink: "/candidature"
      });
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  const handleOpenViewAgenda = (item) => {
    setSelectedAgendaItem(item);
    setViewAgendaLangTab("fr");
    setViewAgendaOpen(true);
  };

  const handleOpenEditAgenda = (item) => {
    setEditAgendaForm({
      id: item.id,
      title: item.title || "",
      titleEn: item.titleEn || "",
      type: item.type || "Formation Régionale",
      typeEn: item.typeEn || "Regional Training",
      startDate: item.startDate ? new Date(item.startDate).toISOString().split("T")[0] : "",
      endDate: item.endDate ? new Date(item.endDate).toISOString().split("T")[0] : "",
      location: item.location || "",
      locationEn: item.locationEn || "",
      duration: item.duration || "",
      durationEn: item.durationEn || "",
      seats: item.seats || "",
      seatsEn: item.seatsEn || "",
      audience: item.audience || "",
      audienceEn: item.audienceEn || "",
      description: item.description || "",
      descriptionEn: item.descriptionEn || "",
      registrationLink: item.registrationLink || "/candidature",
      status: item.status || "active"
    });
    setEditAgendaLangTab("fr");
    setEditAgendaOpen(true);
  };

  const handleUpdateAgenda = async (e) => {
    e.preventDefault();
    try {
      await api.updateAgenda(token, editAgendaForm.id, editAgendaForm);
      setEditAgendaOpen(false);
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  const handleToggleAgendaStatus = (target) => {
    const item = typeof target === "object" ? target : agendas.find(ag => ag.id === target);
    const isActivating = item?.status !== "active";
    const title = item?.title ? `« ${item.title} »` : (isEnglish ? "this session" : "cette session");

    setConfirmModal({
      isOpen: true,
      title: isActivating 
        ? (isEnglish ? "Activate Session?" : "Activer la session ?") 
        : (isEnglish ? "Deactivate Session?" : "Désactiver la session ?"),
      message: isActivating
        ? (isEnglish ? `Do you want to make ${title} publicly visible?` : `Voulez-vous rendre la session ${title} visible au public ?`)
        : (isEnglish ? `Do you want to suspend publication of ${title}?` : `Voulez-vous suspendre l'affichage public de la session ${title} ?`),
      subMessage: isActivating
        ? (isEnglish ? "The session will reappear in the public calendar." : "La session réapparaîtra dans le calendrier public.")
        : (isEnglish ? "The session will be hidden from the public website but preserved in the admin dashboard." : "La session sera masquée du site public tout en restant archivée dans l'administration."),
      confirmText: isActivating 
        ? (isEnglish ? "Yes, Activate" : "Oui, activer") 
        : (isEnglish ? "Yes, Deactivate" : "Oui, désactiver"),
      cancelText: isEnglish ? "Cancel" : "Annuler",
      variant: isActivating ? "success" : "warning",
      icon: isActivating ? "check" : "power",
      isProcessing: false,
      onConfirm: async () => {
        const id = item?.id || target;
        if (isActivating) {
          await api.reactivateAgenda(token, id);
        } else {
          await api.suspendAgenda(token, id);
        }
        loadAllAdminData();
      }
    });
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

  // Contact & Candidature Actions
  const handleOpenViewContact = async (c) => {
    setSelectedContactItem(c);
    setAdminNotesDraft(c.adminNotes || "");
    setViewContactOpen(true);
    if (!c.isRead) {
      try {
        await api.markContactRead(token, c.id);
        setContacts((prev) =>
          prev.map((item) =>
            item.id === c.id ? { ...item, isRead: true, status: item.status === "new" ? "read" : item.status } : item
          )
        );
      } catch (err) {
        console.error("Failed to mark contact read:", err);
      }
    }
  };

  const handleValidateContact = async (contactId) => {
    if (!contactId || isValidatingContact) return;
    setIsValidatingContact(true);
    try {
      const res = await api.updateContactStatus(token, contactId, { status: "validated", isRead: true });
      const updated = res.data || res;
      setContacts((prev) =>
        prev.map((item) => (item.id === contactId ? { ...item, ...updated, status: "validated", isRead: true } : item))
      );
      if (selectedContactItem && selectedContactItem.id === contactId) {
        setSelectedContactItem((prev) => ({ ...prev, ...updated, status: "validated", isRead: true }));
      }
    } catch (err) {
      alert("Erreur lors de la validation: " + err.message);
    } finally {
      setIsValidatingContact(false);
    }
  };

  const handleMarkContactProcessed = async (contactId, nextStatus = "processed") => {
    if (!contactId || isValidatingContact) return;
    setIsValidatingContact(true);
    try {
      const res = await api.updateContactStatus(token, contactId, { status: nextStatus, isRead: true });
      const updated = res.data || res;
      setContacts((prev) =>
        prev.map((item) => (item.id === contactId ? { ...item, ...updated, status: nextStatus, isRead: true } : item))
      );
      if (selectedContactItem && selectedContactItem.id === contactId) {
        setSelectedContactItem((prev) => ({ ...prev, ...updated, status: nextStatus, isRead: true }));
      }
    } catch (err) {
      alert(isEnglish ? "Error updating contact: " + err.message : "Erreur lors de la mise à jour: " + err.message);
    } finally {
      setIsValidatingContact(false);
    }
  };

  const handleSaveHeroMetrics = async (e) => {
    e.preventDefault();
    setIsSavingMetrics(true);
    try {
      const res = await api.updateOverviewStats(token, metricsForm);
      const updated = res.data || res;
      setHeroMetrics((prev) => ({ ...prev, ...updated }));
      setMetricsModalOpen(false);
      alert(isEnglish ? "Hero impact metrics updated successfully!" : "Indicateurs d'impact du site public mis à jour avec succès !");
    } catch (err) {
      alert(isEnglish ? "Error updating metrics: " + err.message : "Erreur lors de la mise à jour: " + err.message);
    } finally {
      setIsSavingMetrics(false);
    }
  };

  const handleSaveContactNotes = async (contactId) => {
    if (!contactId) return;
    setIsSavingContactNotes(true);
    try {
      const res = await api.updateContactStatus(token, contactId, { adminNotes: adminNotesDraft });
      const updated = res.data || res;
      setContacts((prev) =>
        prev.map((item) => (item.id === contactId ? { ...item, adminNotes: adminNotesDraft } : item))
      );
      if (selectedContactItem && selectedContactItem.id === contactId) {
        setSelectedContactItem((prev) => ({ ...prev, adminNotes: adminNotesDraft }));
      }
    } catch (err) {
      alert("Erreur: " + err.message);
    } finally {
      setIsSavingContactNotes(false);
    }
  };

  const handleDeleteContact = (c) => {
    const contactId = typeof c === "object" ? c.id : c;
    const contactName = typeof c === "object" ? c.name : "";
    setConfirmModal({
      isOpen: true,
      title: isEnglish ? "Delete Inquiry / Application?" : "Supprimer la candidature / message ?",
      message: isEnglish 
        ? `Are you sure you want to delete this submission${contactName ? ` from "${contactName}"` : ""}?`
        : `Voulez-vous vraiment supprimer ce message${contactName ? ` de "${contactName}"` : ""} ?`,
      subMessage: isEnglish
        ? "The contact details, application data and internal notes will be permanently removed."
        : "Les coordonnées du candidat, les données du message et les notes internes seront supprimées.",
      confirmText: isEnglish ? "Yes, Delete" : "Oui, supprimer",
      cancelText: isEnglish ? "Cancel" : "Annuler",
      variant: "danger",
      icon: "trash",
      isProcessing: false,
      onConfirm: async () => {
        await api.deleteContact(token, contactId);
        if (selectedContactItem && selectedContactItem.id === contactId) {
          setViewContactOpen(false);
          setSelectedContactItem(null);
        }
        loadAllAdminData();
      }
    });
  };

  const getContactCategoryLabel = (category) => {
    const map = {
      jeune_reporter: isEnglish ? "Youth Reporter" : "Jeune Reporter",
      journaliste_confirme: isEnglish ? "Senior Journalist" : "Journaliste Confirmé",
      expert_climat: isEnglish ? "Climate Expert" : "Expert Climat & Scientifique",
      medias_partenaires: isEnglish ? "Media Partner / Newsroom" : "Média Partenaire / Rédaction",
      societe_civile_ong: isEnglish ? "Civil Society / NGO" : "Société Civile & ONG",
      institutions_recherche: isEnglish ? "Research & Academia" : "Institution & Université",
      autre: isEnglish ? "Other" : "Autre"
    };
    return map[category] || category || (isEnglish ? "General Inquiry" : "Prise de contact");
  };

  const getContactStatusBadge = (c) => {
    const isCandidature = c.type === "candidature";
    const status = c.status || (c.isRead ? "read" : "new");
    if (status === "validated" || status === "processed") {
      return (
        <span className="badge badge-green-light" style={{ fontWeight: 700, fontSize: "0.74rem" }}>
          ✓ {isCandidature ? (isEnglish ? "Validated" : "Validé") : (isEnglish ? "Processed" : "Traité")}
        </span>
      );
    }
    if (status === "new" || (!c.isRead && status !== "validated" && status !== "processed")) {
      return (
        <span className="badge badge-gold-light" style={{ fontWeight: 700, fontSize: "0.74rem" }}>
          ● {isEnglish ? "New" : "Nouveau"}
        </span>
      );
    }
    return (
      <span className="badge badge-forest-light" style={{ fontWeight: 700, fontSize: "0.74rem" }}>
        {isEnglish ? "Read" : "Lu"}
      </span>
    );
  };

  // User / Member Actions
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", userForm.firstName);
      formData.append("lastName", userForm.lastName);
      formData.append("email", userForm.email);
      if (userForm.phone) formData.append("phone", userForm.phone);
      if (userForm.password) formData.append("password", userForm.password);
      formData.append("role", userForm.role || "member");
      if (userForm.category) formData.append("category", userForm.category);
      if (userForm.metier) formData.append("metier", userForm.metier);
      if (userForm.metierEn) formData.append("metierEn", userForm.metierEn);
      if (userForm.pole) formData.append("pole", userForm.pole);
      if (userForm.poleEn) formData.append("poleEn", userForm.poleEn);
      if (userForm.location) formData.append("location", userForm.location);
      if (userForm.country) formData.append("country", userForm.country);
      if (userForm.bibliographie) formData.append("bibliographie", userForm.bibliographie);
      if (userForm.bibliographieEn) formData.append("bibliographieEn", userForm.bibliographieEn);
      if (userForm.conseil) formData.append("conseil", userForm.conseil);
      if (userForm.conseilEn) formData.append("conseilEn", userForm.conseilEn);
      if (userForm.contributions) formData.append("contributions", userForm.contributions);
      if (userForm.contributionsEn) formData.append("contributionsEn", userForm.contributionsEn);
      if (userForm.linkedin) formData.append("linkedin", userForm.linkedin);
      if (userForm.displayOrder !== undefined) formData.append("displayOrder", userForm.displayOrder);
      if (userForm.photoSource) formData.append("photoSource", userForm.photoSource);
      if (userForm.avatarFile) formData.append("avatar", userForm.avatarFile);

      await api.createUser(token, formData);
      setNewUserOpen(false);
      setUserFormLangTab("fr");
      setUserForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        role: "member",
        category: "journaliste",
        linkedin: "",
        metier: "",
        metierEn: "",
        pole: "Pôle Média & Climat",
        poleEn: "Climate & Media Hub",
        location: "Yaoundé, Cameroun",
        country: "Cameroun",
        bibliographie: "",
        bibliographieEn: "",
        conseil: "",
        conseilEn: "",
        contributions: "",
        contributionsEn: "",
        displayOrder: 999,
        photoSource: "",
        avatarFile: null,
        avatarPreview: null
      });
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  const handleOpenEditUser = (userItem) => {
    setEditUserForm({
      id: userItem.id,
      firstName: userItem.firstName || "",
      lastName: userItem.lastName || "",
      email: userItem.email || "",
      phone: userItem.phone || "",
      role: userItem.role || "member",
      category: userItem.category || "journaliste",
      linkedin: userItem.linkedin || "",
      metier: userItem.metier || "",
      metierEn: userItem.metierEn || "",
      pole: userItem.pole || "",
      poleEn: userItem.poleEn || "",
      location: userItem.location || "",
      country: userItem.country || "",
      bibliographie: userItem.bibliographie || "",
      bibliographieEn: userItem.bibliographieEn || "",
      conseil: userItem.conseil || "",
      conseilEn: userItem.conseilEn || "",
      contributions: userItem.contributions || "",
      contributionsEn: userItem.contributionsEn || "",
      displayOrder: userItem.displayOrder !== undefined ? userItem.displayOrder : 999,
      photoSource: userItem.photoSource || "",
      avatar: userItem.avatar || "",
      avatarFile: null,
      avatarPreview: userItem.avatar ? getMediaUrl(userItem.avatar) : null,
      removeExistingAvatar: false
    });
    setEditUserLangTab("fr");
    setEditUserOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", editUserForm.firstName);
      formData.append("lastName", editUserForm.lastName);
      formData.append("email", editUserForm.email);
      if (editUserForm.phone) formData.append("phone", editUserForm.phone);
      formData.append("role", editUserForm.role || "member");
      formData.append("category", editUserForm.category || "journaliste");
      formData.append("metier", editUserForm.metier || "");
      formData.append("metierEn", editUserForm.metierEn || "");
      formData.append("pole", editUserForm.pole || "");
      formData.append("poleEn", editUserForm.poleEn || "");
      formData.append("location", editUserForm.location || "");
      formData.append("country", editUserForm.country || "");
      formData.append("bibliographie", editUserForm.bibliographie || "");
      formData.append("bibliographieEn", editUserForm.bibliographieEn || "");
      formData.append("conseil", editUserForm.conseil || "");
      formData.append("conseilEn", editUserForm.conseilEn || "");
      formData.append("contributions", editUserForm.contributions || "");
      formData.append("contributionsEn", editUserForm.contributionsEn || "");
      formData.append("linkedin", editUserForm.linkedin || "");
      if (editUserForm.displayOrder !== undefined) formData.append("displayOrder", editUserForm.displayOrder);
      if (editUserForm.photoSource !== undefined) formData.append("photoSource", editUserForm.photoSource);

      if (editUserForm.avatarFile) {
        formData.append("avatar", editUserForm.avatarFile);
      } else if (editUserForm.removeExistingAvatar) {
        formData.append("avatar", "");
      }

      await api.updateUser(token, editUserForm.id, formData);
      setEditUserOpen(false);
      loadAllAdminData();
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  const handleOpenViewUser = (u) => {
    setSelectedUserItem(u);
    setViewUserLangTab("fr");
    setViewUserOpen(true);
  };

  const handleToggleUserStatus = (u) => {
    const isCurrentlyActive = u.status === "active";
    const name = `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email;

    setConfirmModal({
      isOpen: true,
      title: isCurrentlyActive
        ? (isEnglish ? "Deactivate Account?" : "Désactiver le compte ?")
        : (isEnglish ? "Activate Account?" : "Activer le compte ?"),
      message: isCurrentlyActive
        ? (isEnglish ? `Do you want to deactivate ${name}'s account?` : `Voulez-vous désactiver le compte de ${name} ?`)
        : (isEnglish ? `Do you want to activate ${name}'s account?` : `Voulez-vous activer le compte de ${name} ?`),
      subMessage: isCurrentlyActive
        ? (isEnglish ? "The member will no longer appear in the public directory." : "Ce membre ne sera plus visible sur le répertoire public.")
        : (isEnglish ? "The profile will be visible in the public directory." : "Ce profil sera visible sur le répertoire public des membres."),
      confirmText: isCurrentlyActive
        ? (isEnglish ? "Yes, Deactivate" : "Oui, désactiver")
        : (isEnglish ? "Yes, Activate" : "Oui, activer"),
      cancelText: isEnglish ? "Cancel" : "Annuler",
      variant: isCurrentlyActive ? "warning" : "success",
      icon: isCurrentlyActive ? "power" : "check",
      isProcessing: false,
      onConfirm: async () => {
        if (isCurrentlyActive) {
          await api.deactivateUser(token, u.id);
        } else {
          await api.activateUser(token, u.id);
        }
        loadAllAdminData();
      }
    });
  };

  const handleDeleteUser = (u) => {
    const name = `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email;

    setConfirmModal({
      isOpen: true,
      title: isEnglish ? "Delete Member Account?" : "Supprimer le compte membre ?",
      message: isEnglish 
        ? `Are you sure you want to permanently delete ${name}?`
        : `Voulez-vous vraiment supprimer définitivement le compte de ${name} ?`,
      subMessage: isEnglish
        ? "This action is irreversible. The account and profile will be deleted."
        : "Cette action est irréversible. Toutes les données du profil seront supprimées.",
      confirmText: isEnglish ? "Yes, Delete" : "Oui, supprimer",
      cancelText: isEnglish ? "Cancel" : "Annuler",
      variant: "danger",
      icon: "trash",
      isProcessing: false,
      onConfirm: async () => {
        await api.deleteUser(token, u.id);
        loadAllAdminData();
      }
    });
  };

  // Filtered queries
  const q = searchQuery.toLowerCase().trim();
  const filteredNews = news.filter(n => !q || n.title?.toLowerCase().includes(q) || n.titleEn?.toLowerCase().includes(q) || n.category?.toLowerCase().includes(q) || n.categoryEn?.toLowerCase().includes(q) || n.tags?.toLowerCase().includes(q) || n.tagsEn?.toLowerCase().includes(q));
  const filteredAgendas = agendas.filter((ag) => {
    if (agendaFilterStatus !== "all" && ag.status !== agendaFilterStatus) {
      return false;
    }
    if (agendaFilterType !== "all" && ag.type !== agendaFilterType && ag.typeEn !== agendaFilterType) {
      return false;
    }
    if (!q) return true;
    return (
      ag.title?.toLowerCase().includes(q) ||
      ag.titleEn?.toLowerCase().includes(q) ||
      ag.location?.toLowerCase().includes(q) ||
      ag.locationEn?.toLowerCase().includes(q) ||
      ag.type?.toLowerCase().includes(q) ||
      ag.typeEn?.toLowerCase().includes(q) ||
      ag.description?.toLowerCase().includes(q) ||
      ag.descriptionEn?.toLowerCase().includes(q)
    );
  });
  const podcastTopics = [
    "all",
    ...new Set(
      podcasts
        .map((p) => (isEnglish && p.topicEn ? p.topicEn : p.topic))
        .filter(Boolean)
    )
  ];
  const filteredPodcasts = podcasts.filter((p) => {
    const itemTopic = (isEnglish && p.topicEn) ? p.topicEn : p.topic;
    if (podcastFilterTopic !== "all" && itemTopic !== podcastFilterTopic && p.topic !== podcastFilterTopic && p.topicEn !== podcastFilterTopic) {
      return false;
    }
    if (podcastFilterStatus !== "all" && p.status !== podcastFilterStatus) {
      return false;
    }
    if (!q) return true;
    return (
      p.title?.toLowerCase().includes(q) ||
      p.titleEn?.toLowerCase().includes(q) ||
      p.series?.toLowerCase().includes(q) ||
      p.seriesEn?.toLowerCase().includes(q) ||
      p.author?.toLowerCase().includes(q) ||
      p.authorEn?.toLowerCase().includes(q) ||
      p.topic?.toLowerCase().includes(q) ||
      p.topicEn?.toLowerCase().includes(q)
    );
  });
  const filteredContacts = contacts.filter((c) => {
    // Type filter
    if (contactTypeFilter !== "all") {
      const cType = c.type || "contact";
      if (cType !== contactTypeFilter) return false;
    }
    // Status filter
    if (contactStatusFilter !== "all") {
      const effStatus = c.status || (c.isRead ? "read" : "new");
      if (contactStatusFilter === "new" && (effStatus !== "new" && c.isRead)) return false;
      if (contactStatusFilter === "validated" && effStatus !== "validated" && effStatus !== "processed") return false;
    }
    if (!q) return true;
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.toLowerCase().includes(q) ||
      c.subject?.toLowerCase().includes(q) ||
      c.message?.toLowerCase().includes(q) ||
      c.structureName?.toLowerCase().includes(q) ||
      c.country?.toLowerCase().includes(q) ||
      c.category?.toLowerCase().includes(q) ||
      c.adminNotes?.toLowerCase().includes(q)
    );
  });
  const filteredUsers = usersList.filter(u => {
    if (!q) return true;
    return (
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.metier?.toLowerCase().includes(q) ||
      u.metierEn?.toLowerCase().includes(q) ||
      u.pole?.toLowerCase().includes(q) ||
      u.poleEn?.toLowerCase().includes(q) ||
      u.category?.toLowerCase().includes(q) ||
      u.location?.toLowerCase().includes(q) ||
      u.country?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q)
    );
  });

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

          <div
            onClick={() => { setActiveTab("podcasts"); setMobileSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === "podcasts" ? "active" : ""}`}
          >
            <div className="admin-nav-item-content">
              <Headphones size={18} />
              <span>{isEnglish ? "Podcasts & Audio" : "Podcasts & Émissions"}</span>
            </div>
            <span className="admin-nav-badge">{podcasts.length}</span>
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
                  <button onClick={() => setNewNewsOpen(true)} className="btn btn-forest btn-sm">
                    <Plus size={16} />
                    <span>{isEnglish ? "New Announcement" : "Nouvelle Actualité"}</span>
                  </button>
                  <button onClick={() => setNewAgendaOpen(true)} className="btn btn-outline-forest btn-sm">
                    <Plus size={16} />
                    <span>{isEnglish ? "New Session" : "Nouvelle Session"}</span>
                  </button>
                  <button onClick={() => setNewPodcastOpen(true)} className="btn btn-outline-forest btn-sm">
                    <Plus size={16} />
                    <span>{isEnglish ? "New Podcast" : "Nouveau Podcast"}</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="admin-kpi-grid">
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

                <div className="admin-kpi-card" onClick={() => setActiveTab("podcasts")} style={{ cursor: "pointer" }}>
                  <div className="admin-kpi-top">
                    <span className="admin-kpi-label">{isEnglish ? "Audio Hub & Podcasts" : "Podcasts & Émissions"}</span>
                    <div className="admin-kpi-icon-wrap"><Headphones size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{podcasts.length}</div>
                  <div className="admin-kpi-sub" style={{ color: "#166534" }}>
                    <Radio size={14} />
                    <span>{isEnglish ? "Active audio programs" : "Émissions audio publiées"}</span>
                  </div>
                </div>
              </div>

              {/* Public Hero Impact Metrics Card */}
              <div className="admin-card" style={{ marginBottom: "1.75rem" }}>
                <div className="admin-card-header">
                  <div>
                    <h3 className="admin-card-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <TrendingUp size={18} style={{ color: "#1E5128" }} />
                      <span>{isEnglish ? "Hero Impact Metrics (Live on Landing Page)" : "Indicateurs d'Impact & Chiffres Clés (Hero du Site Public)"}</span>
                    </h3>
                    <p style={{ margin: "0.2rem 0 0 0", fontSize: "0.82rem", color: "#6A8278" }}>
                      {isEnglish 
                        ? "These 4 metrics are queried by the API and displayed dynamically inside the 'hero-metrics-grid' on the homepage."
                        : "Ces 4 indicateurs proviennent directement de l'API et sont affichés en temps réel dans la bande 'hero-metrics-grid' de la page d'accueil."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMetricsForm({ ...heroMetrics });
                      setMetricsModalOpen(true);
                    }}
                    className="btn btn-outline-forest btn-sm"
                  >
                    <Edit3 size={14} />
                    <span>{isEnglish ? "Edit Impact Metrics" : "Modifier les indicateurs"}</span>
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", padding: "1.25rem" }}>
                  <div style={{ background: "#F4F8F5", padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid #D9E3DE" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4A6356", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                      {isEnglish ? (heroMetrics.labelYouthEn || "Young people trained directly") : (heroMetrics.labelYouthFr || "Jeunes formés directement")}
                    </div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#13221B" }}>
                      {Number(heroMetrics.journalistesCibles || 20000).toLocaleString(isEnglish ? "en-US" : "fr-FR")}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#6A8278", marginTop: "0.2rem" }}>
                      API: <code>journalistesCibles</code>
                    </div>
                  </div>

                  <div style={{ background: "#F4F8F5", padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid #D9E3DE" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4A6356", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                      {isEnglish ? (heroMetrics.labelPartnersEn || "Organisations receiving support") : (heroMetrics.labelPartnersFr || "Structures accompagnées")}
                    </div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#13221B" }}>
                      {heroMetrics.structuresPartenaires || 300}+
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#6A8278", marginTop: "0.2rem" }}>
                      API: <code>structuresPartenaires</code>
                    </div>
                  </div>

                  <div style={{ background: "#F4F8F5", padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid #D9E3DE" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4A6356", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                      {isEnglish ? (heroMetrics.labelRegionsEn || "Target countries") : (heroMetrics.labelRegionsFr || "Pays à terme")}
                    </div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#13221B" }}>
                      {heroMetrics.regionsCameroun || 6}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#6A8278", marginTop: "0.2rem" }}>
                      API: <code>regionsCameroun</code>
                    </div>
                  </div>

                  <div style={{ background: "#F4F8F5", padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid #D9E3DE" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4A6356", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                      {isEnglish ? (heroMetrics.labelCountriesEn || "People sensitized") : (heroMetrics.labelCountriesFr || "Personnes sensibilisées")}
                    </div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#13221B" }}>
                      {heroMetrics.paysAfriqueCentrale || 9} M+
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#6A8278", marginTop: "0.2rem" }}>
                      API: <code>paysAfriqueCentrale</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Table: Recent Inquiries & Applications */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3 className="admin-card-title">
                      {isEnglish ? "Recent Inquiries & Program Applications" : "Dernières Candidatures & Prises de Contact"}
                    </h3>
                    <p style={{ margin: "0.2rem 0 0 0", fontSize: "0.82rem", color: "#6A8278" }}>
                      {isEnglish
                        ? "Latest incoming submissions from youth media candidates and direct public inquiries."
                        : "Derniers flux reçus : candidatures au réseau des jeunes médias et prises de contact direct."}
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab("contacts")} 
                    className="btn btn-outline-forest btn-sm"
                  >
                    <span>{isEnglish ? "View all submissions" : "Voir tous les messages"}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{isEnglish ? "Type & Date" : "Type & Date"}</th>
                        <th>{isEnglish ? "Applicant / Sender" : "Candidat / Expéditeur"}</th>
                        <th>{isEnglish ? "Structure & Territory" : "Structure & Territoire"}</th>
                        <th>{isEnglish ? "Subject & Message" : "Objet & Message"}</th>
                        <th>{isEnglish ? "Status" : "Statut"}</th>
                        <th style={{ textAlign: "right", paddingRight: "1.25rem" }}>{isEnglish ? "Actions" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.slice(0, 5).map((c) => {
                        const isCandidature = c.type === "candidature";
                        const initials = c.name ? c.name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase() : "C";
                        const dateFormatted = new Date(c.createdAt || Date.now()).toLocaleDateString(isEnglish ? "en-US" : "fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        });

                        return (
                          <tr key={c.id} style={{ background: !c.isRead ? "rgba(235, 178, 40, 0.04)" : "transparent" }}>
                            {/* 1. Type & Date */}
                            <td>
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-start" }}>
                                <span className={`badge ${isCandidature ? "badge-forest-light" : "badge-purple-light"}`} style={{ fontSize: "0.72rem", padding: "0.15rem 0.55rem" }}>
                                  {isCandidature ? (isEnglish ? "📝 Application" : "📝 Candidature") : (isEnglish ? "💬 Contact" : "💬 Contact direct")}
                                </span>
                                <span style={{ fontSize: "0.75rem", color: "#6A8278", whiteSpace: "nowrap" }}>
                                  {dateFormatted}
                                </span>
                              </div>
                            </td>

                            {/* 2. Applicant / Sender */}
                            <td style={{ fontWeight: 600, color: "#13221B" }}>
                              <div className="member-avatar-cell">
                                <div className="member-avatar-fallback" style={{ background: isCandidature ? "#E8F5E9" : "#F3E8FF", color: isCandidature ? "#1E5128" : "#7E22CE" }}>
                                  {initials}
                                </div>
                                <div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                    <span style={{ color: "#13221B" }}>{c.name}</span>
                                    {!c.isRead && (
                                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#D97706", display: "inline-block" }} title={isEnglish ? "Unread" : "Non lu"}></span>
                                    )}
                                  </div>
                                  <a href={`mailto:${c.email}`} style={{ fontSize: "0.78rem", color: "#2563EB", textDecoration: "none", display: "block" }}>
                                    {c.email}
                                  </a>
                                  {c.phone && (
                                    <span style={{ fontSize: "0.74rem", color: "#6A8278", display: "block" }}>
                                      📞 {c.phone}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* 3. Structure & Territory */}
                            <td>
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", maxWidth: "190px" }}>
                                {c.structureName && (
                                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#13221B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    🏢 {c.structureName}
                                  </span>
                                )}
                                {c.country && (
                                  <span style={{ fontSize: "0.76rem", color: "#4A6356" }}>
                                    🌍 {c.country}
                                  </span>
                                )}
                                {c.category && (
                                  <span style={{ fontSize: "0.72rem", color: "#1E5128", fontWeight: 600 }}>
                                    #{getContactCategoryLabel(c.category)}
                                  </span>
                                )}
                                {!c.structureName && !c.country && !c.category && (
                                  <span style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>—</span>
                                )}
                              </div>
                            </td>

                            {/* 4. Subject & Message snippet */}
                            <td>
                              <div style={{ maxWidth: "260px" }}>
                                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#13221B", marginBottom: "0.15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {c.subject || (isEnglish ? "(No subject)" : "(Sans objet)")}
                                </div>
                                <div style={{ fontSize: "0.78rem", color: "#5A7367", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {c.message}
                                </div>
                                {c.adminNotes && (
                                  <div style={{ marginTop: "0.2rem" }}>
                                    <span style={{ fontSize: "0.68rem", padding: "1px 5px", borderRadius: "4px", background: "rgba(37,99,235,0.08)", color: "#2563EB", fontWeight: 600 }}>
                                      📌 {isEnglish ? "Admin Note" : "Note interne"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* 5. Status Badge */}
                            <td>
                              {getContactStatusBadge(c)}
                            </td>

                            {/* 6. Actions */}
                            <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                                <button
                                  type="button"
                                  onClick={() => handleOpenViewContact(c)}
                                  className="btn btn-outline-forest btn-sm"
                                  style={{ padding: "0.3rem 0.65rem", fontSize: "0.76rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                                  title={isEnglish ? "View details" : "Voir les détails"}
                                >
                                  <Eye size={13} />
                                  <span>{isEnglish ? "Details" : "Détails"}</span>
                                </button>

                                {/* Action contextuelle selon Candidature ou Contact Direct */}
                                {isCandidature && c.status !== "validated" && (
                                  <button
                                    type="button"
                                    onClick={() => handleValidateContact(c.id)}
                                    disabled={isValidatingContact}
                                    className="btn btn-forest btn-sm"
                                    style={{ padding: "0.3rem 0.65rem", fontSize: "0.76rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                                    title={isEnglish ? "Validate candidature" : "Valider la candidature"}
                                  >
                                    <CheckCircle size={13} />
                                    <span>{isEnglish ? "Validate" : "Valider"}</span>
                                  </button>
                                )}

                                {!isCandidature && (
                                  <button
                                    type="button"
                                    onClick={() => handleMarkContactProcessed(c.id, (c.status === "processed" || c.status === "validated") ? "read" : "processed")}
                                    disabled={isValidatingContact}
                                    className={`btn btn-sm ${c.status === "processed" || c.status === "validated" ? "btn-outline" : "btn-forest"}`}
                                    style={{ padding: "0.3rem 0.65rem", fontSize: "0.76rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                                    title={
                                      (c.status === "processed" || c.status === "validated")
                                        ? (isEnglish ? "Mark as unprocessed" : "Marquer comme non traité")
                                        : (isEnglish ? "Mark as processed" : "Marquer comme traité")
                                    }
                                  >
                                    <CheckCircle size={13} />
                                    <span>
                                      {(c.status === "processed" || c.status === "validated")
                                        ? (isEnglish ? "Reopen" : "Rouvrir")
                                        : (isEnglish ? "Process" : "Traiter")}
                                    </span>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {contacts.length === 0 && (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center", color: "#6A8278", padding: "2.5rem 1rem" }}>
                            <MessageSquare size={32} style={{ margin: "0 auto 0.5rem", opacity: 0.35, color: "#1E5128" }} />
                            <div>{isEnglish ? "No inquiries or applications received yet." : "Aucun message ou candidature reçu pour le moment."}</div>
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

                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                    {/* Status Filter */}
                    <select
                      value={agendaFilterStatus}
                      onChange={(e) => setAgendaFilterStatus(e.target.value)}
                      style={{
                        padding: "0.45rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #D5E0D5",
                        fontSize: "0.85rem",
                        color: "#13221B",
                        backgroundColor: "#FFFFFF"
                      }}
                    >
                      <option value="all">{isEnglish ? "All statuses" : "Tous les statuts"}</option>
                      <option value="active">{isEnglish ? "Active only" : "Actifs uniquement"}</option>
                      <option value="suspended">{isEnglish ? "Suspended only" : "Désactivés uniquement"}</option>
                    </select>

                    {/* Type Filter */}
                    <select
                      value={agendaFilterType}
                      onChange={(e) => setAgendaFilterType(e.target.value)}
                      style={{
                        padding: "0.45rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #D5E0D5",
                        fontSize: "0.85rem",
                        color: "#13221B",
                        backgroundColor: "#FFFFFF"
                      }}
                    >
                      <option value="all">{isEnglish ? "All formats" : "Tous les formats"}</option>
                      <option value="Formation Régionale">{isEnglish ? "Regional Training" : "Formation Régionale"}</option>
                      <option value="Masterclass Virtuelle">{isEnglish ? "Virtual Masterclass" : "Masterclass Virtuelle"}</option>
                      <option value="Conférence Régionale">{isEnglish ? "Regional Conference / Forum" : "Conférence Régionale"}</option>
                    </select>

                    <span className="results-counter-pill">
                      <strong>{filteredAgendas.length}</strong> {isEnglish ? "sessions listed" : "sessions répertoriées"}
                    </span>
                  </div>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{isEnglish ? "Training / Session" : "Intitulé & Cohorte"}</th>
                        <th>{isEnglish ? "Typology" : "Format"}</th>
                        <th>{isEnglish ? "Timeline" : "Période"}</th>
                        <th>{isEnglish ? "Location / Territory" : "Lieu & Territoire"}</th>
                        <th>{isEnglish ? "Status" : "Statut"}</th>
                        <th style={{ textAlign: "right", paddingRight: "1.5rem" }}>{isEnglish ? "Actions" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAgendas.map((ag) => {
                        const tableTitle = (isEnglish && ag.titleEn) ? ag.titleEn : ag.title;
                        const tableType = (isEnglish && ag.typeEn) ? ag.typeEn : ag.type;
                        const tableLocation = (isEnglish && ag.locationEn) ? ag.locationEn : ag.location;
                        const hasBilingual = !!(ag.title && ag.titleEn);

                        return (
                          <tr key={ag.id}>
                            <td style={{ fontWeight: 600, color: "#13221B", maxWidth: "320px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                <span>{tableTitle}</span>
                                {hasBilingual && (
                                  <span style={{ fontSize: "0.65rem", padding: "1px 5px", borderRadius: "4px", background: "rgba(30,81,40,0.12)", color: "#1E5128", fontWeight: 700, flexShrink: 0 }}>
                                    FR/EN
                                  </span>
                                )}
                              </div>
                            </td>
                            <td><span className="badge badge-green-light">{tableType}</span></td>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#5A7367" }}>
                                <Calendar size={13} />
                                <span>Du {new Date(ag.startDate).toLocaleDateString(isEnglish ? "en-US" : "fr-FR")}</span>
                              </div>
                            </td>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#5A7367" }}>
                                <MapPin size={13} />
                                <span>{tableLocation}</span>
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${ag.status === "active" ? "badge-green-light" : "badge-gold-light"}`}>
                                {ag.status === "active" ? (isEnglish ? "Active" : "Actif") : (isEnglish ? "Suspended" : "Désactivé")}
                              </span>
                            </td>
                            <td style={{ textAlign: "right", position: "relative" }}>
                              <div className="action-menu-container">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveActionMenuId(activeActionMenuId === ag.id ? null : ag.id);
                                  }}
                                  className={`btn-action-more ${activeActionMenuId === ag.id ? "active" : ""}`}
                                  aria-label={isEnglish ? "Actions menu" : "Menu d'actions"}
                                  title={isEnglish ? "Actions" : "Options"}
                                >
                                  <MoreVertical size={16} />
                                </button>

                                {activeActionMenuId === ag.id && (
                                  <div 
                                    className="action-dropdown-menu" 
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {/* 1. VOIR */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveActionMenuId(null);
                                        handleOpenViewAgenda(ag);
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
                                        handleOpenEditAgenda(ag);
                                      }}
                                      className="action-dropdown-item"
                                    >
                                      <Edit3 size={14} style={{ color: "#059669" }} />
                                      <span>{isEnglish ? "Edit session" : "Modifier la session"}</span>
                                    </button>

                                    {/* 3. ACTIVER / DÉSACTIVER */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveActionMenuId(null);
                                        handleToggleAgendaStatus(ag);
                                      }}
                                      className="action-dropdown-item"
                                    >
                                      <Power size={14} style={{ color: ag.status === "active" ? "#D97706" : "#16A34A" }} />
                                      <span>
                                        {ag.status === "active" 
                                          ? (isEnglish ? "Deactivate" : "Désactiver") 
                                          : (isEnglish ? "Activate" : "Activer")}
                                      </span>
                                    </button>

                                    {/* 4. SUPPRIMER */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveActionMenuId(null);
                                        handleDeleteAgenda(ag);
                                      }}
                                      className="action-dropdown-item action-dropdown-item-danger"
                                    >
                                      <Trash2 size={14} style={{ color: "#DC2626" }} />
                                      <span>{isEnglish ? "Delete" : "Supprimer"}</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredAgendas.length === 0 && (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center", color: "#6A8278", padding: "2.5rem" }}>
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

          {/* TAB: PODCASTS */}
          {activeTab === "podcasts" && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">
                    {isEnglish ? "Junior Audio Hub & Podcasts" : "Hub Audio & Podcasts Juniors"}
                  </h1>
                  <p className="admin-page-subtitle">
                    {isEnglish 
                      ? "Manage student audio reports, investigative podcasts, and community radio broadcasts."
                      : "Gérez les émissions sonores, podcasts d'investigation et magazines des radios scolaires et communautaires."}
                  </p>
                </div>
                <button onClick={() => setNewPodcastOpen(true)} className="btn btn-forest">
                  <Plus size={18} />
                  <span>{isEnglish ? "New Podcast" : "Nouveau Podcast"}</span>
                </button>
              </div>

              <div className="admin-card">
                <div className="admin-card-header" style={{ flexWrap: "wrap", gap: "1rem" }}>
                  <div className="dedicated-search-box" style={{ maxWidth: "340px", flex: 1 }}>
                    <Search size={16} className="search-icon" />
                    <input
                      type="text"
                      placeholder={isEnglish ? "Filter podcasts by title, author, topic..." : "Filtrer les podcasts par titre, auteur, thème..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="dedicated-search-input"
                    />
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                    {/* Status Filter */}
                    <select
                      value={podcastFilterStatus}
                      onChange={(e) => setPodcastFilterStatus(e.target.value)}
                      style={{
                        padding: "0.45rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #D5E0D5",
                        fontSize: "0.85rem",
                        color: "#13221B",
                        backgroundColor: "#FFFFFF"
                      }}
                    >
                      <option value="all">{isEnglish ? "All statuses" : "Tous les statuts"}</option>
                      <option value="active">{isEnglish ? "Active only" : "Actifs uniquement"}</option>
                      <option value="suspended">{isEnglish ? "Suspended only" : "Désactivés uniquement"}</option>
                    </select>

                    {/* Topic Filter */}
                    <select
                      value={podcastFilterTopic}
                      onChange={(e) => setPodcastFilterTopic(e.target.value)}
                      style={{
                        padding: "0.45rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid #D5E0D5",
                        fontSize: "0.85rem",
                        color: "#13221B",
                        backgroundColor: "#FFFFFF"
                      }}
                    >
                      <option value="all">{isEnglish ? "All topics" : "Toutes les thématiques"}</option>
                      {podcastTopics.filter(t => t !== "all").map(top => (
                        <option key={top} value={top}>{top}</option>
                      ))}
                    </select>

                    <span className="results-counter-pill">
                      <strong>{filteredPodcasts.length}</strong> {isEnglish ? "podcasts listed" : "émissions listées"}
                    </span>
                  </div>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{isEnglish ? "Podcast / Episode" : "Émission / Épisode"}</th>
                        <th>{isEnglish ? "Series" : "Série"}</th>
                        <th>{isEnglish ? "Topic" : "Thématique"}</th>
                        <th>{isEnglish ? "Media Club / Author" : "Club Média / Auteur"}</th>
                        <th>{isEnglish ? "Duration" : "Durée"}</th>
                        <th>{isEnglish ? "Status" : "Statut"}</th>
                        <th style={{ textAlign: "right", paddingRight: "1.5rem" }}>{isEnglish ? "Actions" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPodcasts.map((pod) => {
                        const tableTitle = (isEnglish && pod.titleEn) ? pod.titleEn : pod.title;
                        const tableSeries = (isEnglish && pod.seriesEn) ? pod.seriesEn : pod.series;
                        const tableTopic = (isEnglish && pod.topicEn) ? pod.topicEn : pod.topic;
                        const tableAuthor = (isEnglish && pod.authorEn) ? pod.authorEn : pod.author;
                        const hasBilingual = !!(pod.title && pod.titleEn);
                        const coverImg = getMediaUrl(pod.cover || pod.coverImage);

                        return (
                          <tr key={pod.id}>
                            <td style={{ fontWeight: 600, color: "#13221B", maxWidth: "280px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                {coverImg ? (
                                  <img 
                                    src={coverImg} 
                                    alt={tableTitle} 
                                    style={{ width: "42px", height: "42px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} 
                                  />
                                ) : (
                                  <div style={{ width: "42px", height: "42px", borderRadius: "8px", background: "#E8EFEA", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A7367", flexShrink: 0 }}>
                                    <Headphones size={18} />
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
                            <td>
                              <span style={{ fontSize: "0.85rem", color: "#5A7367", fontWeight: 500 }}>
                                {tableSeries}
                              </span>
                            </td>
                            <td>
                              <span className="badge badge-green-light">{tableTopic}</span>
                            </td>
                            <td>
                              <span style={{ fontSize: "0.85rem", color: "#5A7367" }}>{tableAuthor}</span>
                            </td>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#5A7367", fontSize: "0.85rem" }}>
                                <Clock size={13} />
                                <span>{pod.duration}</span>
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${pod.status === "active" ? "badge-green-light" : "badge-gold-light"}`}>
                                {pod.status === "active" ? (isEnglish ? "Active" : "Actif") : (isEnglish ? "Suspended" : "Désactivé")}
                              </span>
                            </td>
                            <td style={{ textAlign: "right", position: "relative" }}>
                              <div className="action-menu-container">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveActionMenuId(activeActionMenuId === pod.id ? null : pod.id);
                                  }}
                                  className={`btn-action-more ${activeActionMenuId === pod.id ? "active" : ""}`}
                                  aria-label={isEnglish ? "Actions menu" : "Menu d'actions"}
                                  title={isEnglish ? "Actions" : "Options"}
                                >
                                  <MoreVertical size={16} />
                                </button>

                                {activeActionMenuId === pod.id && (
                                  <div 
                                    className="action-dropdown-menu" 
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {/* 1. VOIR */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveActionMenuId(null);
                                        handleOpenViewPodcast(pod);
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
                                        handleOpenEditPodcast(pod);
                                      }}
                                      className="action-dropdown-item"
                                    >
                                      <Edit3 size={14} style={{ color: "#D97706" }} />
                                      <span>{isEnglish ? "Edit podcast" : "Éditer l'émission"}</span>
                                    </button>

                                    {/* 3. DÉSACTIVER / ACTIVER */}
                                    {pod.status === "active" ? (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveActionMenuId(null);
                                          handleTogglePodcastStatus(pod);
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
                                          handleTogglePodcastStatus(pod);
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
                                        handleDeletePodcast(pod);
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
                      {filteredPodcasts.length === 0 && (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center", color: "#6A8278", padding: "3rem 1rem" }}>
                            <Headphones size={36} style={{ color: "#9ca3af", margin: "0 auto 0.75rem", display: "block" }} />
                            <p style={{ fontWeight: 600, color: "#111827", marginBottom: "0.25rem" }}>
                              {isEnglish ? "No podcasts found" : "Aucun podcast trouvé"}
                            </p>
                            <span style={{ fontSize: "0.85rem" }}>
                              {isEnglish ? "Try modifying your search or filters." : "Modifiez vos filtres ou créez votre premier podcast."}
                            </span>
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

                <div className="dedicated-search-box" style={{ maxWidth: "340px" }}>
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder={isEnglish ? "Search applicants, email, structure..." : "Rechercher candidat, email, structure..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="dedicated-search-input"
                  />
                </div>
              </div>

              {/* Type & Status Filter Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
                {/* Type Tabs */}
                <div className="modal-lang-tabs" style={{ margin: 0 }}>
                  <button
                    type="button"
                    className={`modal-lang-tab-btn ${contactTypeFilter === "all" ? "active" : ""}`}
                    onClick={() => setContactTypeFilter("all")}
                  >
                    {isEnglish ? "All Messages" : "Tous"} ({contacts.length})
                  </button>
                  <button
                    type="button"
                    className={`modal-lang-tab-btn ${contactTypeFilter === "candidature" ? "active" : ""}`}
                    onClick={() => setContactTypeFilter("candidature")}
                  >
                    📝 {isEnglish ? "Applications" : "Candidatures"} ({contacts.filter(c => c.type === "candidature").length})
                  </button>
                  <button
                    type="button"
                    className={`modal-lang-tab-btn ${contactTypeFilter === "contact" ? "active" : ""}`}
                    onClick={() => setContactTypeFilter("contact")}
                  >
                    💬 {isEnglish ? "Direct Inquiries" : "Contacts Directs"} ({contacts.filter(c => c.type !== "candidature").length})
                  </button>
                </div>

                {/* Status Tabs */}
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {[
                    { id: "all", label: isEnglish ? "All Statuses" : "Tous statuts", count: contacts.length },
                    { id: "new", label: isEnglish ? "New" : "Nouveaux", count: contacts.filter(c => !c.isRead || c.status === "new").length },
                    { 
                      id: "validated", 
                      label: contactTypeFilter === "candidature" 
                        ? (isEnglish ? "Validated" : "Validées") 
                        : contactTypeFilter === "contact" 
                        ? (isEnglish ? "Processed" : "Traités") 
                        : (isEnglish ? "Processed / Validated" : "Traités / Validés"), 
                      count: contacts.filter(c => c.status === "validated" || c.status === "processed").length 
                    },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setContactStatusFilter(st.id)}
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.78rem",
                        fontWeight: contactStatusFilter === st.id ? 700 : 500,
                        border: contactStatusFilter === st.id ? "1px solid #1E5128" : "1px solid #D9E3DE",
                        background: contactStatusFilter === st.id ? "#1E5128" : "#FFFFFF",
                        color: contactStatusFilter === st.id ? "#FFFFFF" : "#4A6356",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <span>{st.label}</span>
                      <span style={{
                        padding: "0.1rem 0.4rem",
                        borderRadius: "10px",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        background: contactStatusFilter === st.id ? "rgba(255,255,255,0.2)" : "#F0F4F2",
                        color: contactStatusFilter === st.id ? "#FFFFFF" : "#5A7367"
                      }}>
                        {st.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="admin-card">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{isEnglish ? "Type & Date" : "Type & Date"}</th>
                        <th>{isEnglish ? "Applicant / Sender" : "Candidat / Expéditeur"}</th>
                        <th>{isEnglish ? "Structure & Territory" : "Structure & Territoire"}</th>
                        <th>{isEnglish ? "Subject & Message" : "Objet & Message"}</th>
                        <th>{isEnglish ? "Status" : "Statut"}</th>
                        <th style={{ textAlign: "right", paddingRight: "1.5rem" }}>{isEnglish ? "Actions" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map((c) => {
                        const isCandidature = c.type === "candidature";
                        const initials = c.name ? c.name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase() : "C";
                        const dateFormatted = new Date(c.createdAt || Date.now()).toLocaleDateString(isEnglish ? "en-US" : "fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        });

                        return (
                          <tr key={c.id} style={{ background: !c.isRead ? "rgba(235, 178, 40, 0.04)" : "transparent" }}>
                            {/* 1. Type & Date */}
                            <td>
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-start" }}>
                                <span className={`badge ${isCandidature ? "badge-forest-light" : "badge-purple-light"}`} style={{ fontSize: "0.72rem", padding: "0.15rem 0.55rem" }}>
                                  {isCandidature ? (isEnglish ? "📝 Application" : "📝 Candidature") : (isEnglish ? "💬 Contact" : "💬 Contact direct")}
                                </span>
                                <span style={{ fontSize: "0.76rem", color: "#6A8278", whiteSpace: "nowrap" }}>
                                  {dateFormatted}
                                </span>
                              </div>
                            </td>

                            {/* 2. Applicant / Sender */}
                            <td style={{ fontWeight: 600, color: "#13221B" }}>
                              <div className="member-avatar-cell">
                                <div className="member-avatar-fallback" style={{ background: isCandidature ? "#E8F5E9" : "#F3E8FF", color: isCandidature ? "#1E5128" : "#7E22CE" }}>
                                  {initials}
                                </div>
                                <div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                    <span style={{ color: "#13221B" }}>{c.name}</span>
                                    {!c.isRead && (
                                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#D97706", display: "inline-block" }} title={isEnglish ? "Unread" : "Non lu"}></span>
                                    )}
                                  </div>
                                  <a href={`mailto:${c.email}`} style={{ fontSize: "0.78rem", color: "#2563EB", textDecoration: "none", display: "block" }}>
                                    {c.email}
                                  </a>
                                  {c.phone && (
                                    <a href={`tel:${c.phone}`} style={{ fontSize: "0.74rem", color: "#6A8278", textDecoration: "none", display: "block" }}>
                                      📞 {c.phone}
                                    </a>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* 3. Structure & Territory */}
                            <td>
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", maxWidth: "200px" }}>
                                {c.structureName && (
                                  <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#13221B" }}>
                                    🏢 {c.structureName}
                                  </span>
                                )}
                                {c.country && (
                                  <span style={{ fontSize: "0.78rem", color: "#4A6356" }}>
                                    🌍 {c.country}
                                  </span>
                                )}
                                {c.category && (
                                  <span style={{ fontSize: "0.72rem", color: "#1E5128", fontWeight: 600 }}>
                                    #{getContactCategoryLabel(c.category)}
                                  </span>
                                )}
                                {!c.structureName && !c.country && !c.category && (
                                  <span style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>—</span>
                                )}
                              </div>
                            </td>

                            {/* 4. Subject & Message snippet */}
                            <td>
                              <div style={{ maxWidth: "300px" }}>
                                <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "#13221B", marginBottom: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {c.subject || (isEnglish ? "(No subject)" : "(Sans objet)")}
                                </div>
                                <div style={{ fontSize: "0.78rem", color: "#5A7367", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {c.message}
                                </div>
                                {c.adminNotes && (
                                  <div style={{ marginTop: "0.25rem" }}>
                                    <span style={{ fontSize: "0.7rem", padding: "1px 6px", borderRadius: "4px", background: "rgba(37,99,235,0.08)", color: "#2563EB", fontWeight: 600 }}>
                                      📌 {isEnglish ? "Admin Note" : "Note interne"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* 5. Status Badge */}
                            <td>
                              {getContactStatusBadge(c)}
                            </td>

                            {/* 6. Actions (3-dots action menu) */}
                            <td style={{ textAlign: "right", position: "relative" }}>
                              <div className="action-menu-container">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveActionMenuId(activeActionMenuId === c.id ? null : c.id);
                                  }}
                                  className={`btn-action-more ${activeActionMenuId === c.id ? "active" : ""}`}
                                  aria-label={isEnglish ? "Actions menu" : "Menu d'actions"}
                                  title={isEnglish ? "Actions" : "Options"}
                                >
                                  <MoreVertical size={16} />
                                </button>

                                {activeActionMenuId === c.id && (
                                  <div 
                                    className="action-dropdown-menu" 
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {/* 1. VOIR LES DÉTAILS */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveActionMenuId(null);
                                        handleOpenViewContact(c);
                                      }}
                                      className="action-dropdown-item"
                                    >
                                      <Eye size={14} style={{ color: "#2563EB" }} />
                                      <span>{isEnglish ? "View details" : "Voir les détails"}</span>
                                    </button>

                                    {/* Action rapide : Valider (Candidature) ou Marquer traité (Contact direct) */}
                                    {c.type === "candidature" && c.status !== "validated" && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveActionMenuId(null);
                                          handleValidateContact(c.id);
                                        }}
                                        className="action-dropdown-item"
                                        style={{ color: "#166534" }}
                                      >
                                        <CheckCircle size={14} />
                                        <span>{isEnglish ? "Validate candidature" : "Valider la candidature"}</span>
                                      </button>
                                    )}

                                    {c.type !== "candidature" && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveActionMenuId(null);
                                          handleMarkContactProcessed(c.id, (c.status === "processed" || c.status === "validated") ? "read" : "processed");
                                        }}
                                        className="action-dropdown-item"
                                        style={{ color: (c.status === "processed" || c.status === "validated") ? "#6A8278" : "#166534" }}
                                      >
                                        <CheckCircle size={14} />
                                        <span>
                                          {(c.status === "processed" || c.status === "validated")
                                            ? (isEnglish ? "Mark as unprocessed" : "Marquer comme non traité")
                                            : (isEnglish ? "Mark as processed" : "Marquer comme traité")}
                                        </span>
                                      </button>
                                    )}

                                    <div className="action-dropdown-divider"></div>

                                    {/* 2. SUPPRIMER */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveActionMenuId(null);
                                        handleDeleteContact(c);
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
                    </tbody>
                  </table>
                </div>

                {filteredContacts.length === 0 && (
                  <div style={{ padding: "3.5rem 1.5rem", textAlign: "center", color: "#6A8278" }}>
                    <MessageSquare size={36} style={{ margin: "0 auto 0.75rem", opacity: 0.35, color: "#1E5128" }} />
                    <div style={{ fontSize: "1rem", fontWeight: 600, color: "#13221B", marginBottom: "0.25rem" }}>
                      {isEnglish ? "No submissions found" : "Aucun message ou candidature"}
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#6A8278", margin: 0 }}>
                      {isEnglish ? "Try modifying your search or filter criteria." : "Essayez de modifier votre recherche ou vos critères de filtre."}
                    </p>
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

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                  <div className="dedicated-search-box" style={{ maxWidth: "300px" }}>
                    <Search size={16} className="search-icon" />
                    <input
                      type="text"
                      placeholder={isEnglish ? "Filter users..." : "Filtrer les comptes..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="dedicated-search-input"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setUserFormLangTab("fr");
                      setNewUserOpen(true);
                    }}
                    className="btn btn-forest"
                    style={{ gap: "0.4rem", whiteSpace: "nowrap" }}
                  >
                    <Plus size={16} />
                    <span>{isEnglish ? "Add Member" : "Nouveau Membre"}</span>
                  </button>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{isEnglish ? "Member / Profile" : "Membre / Profil"}</th>
                        <th>{isEnglish ? "Role & Category" : "Rôle & Catégorie"}</th>
                        <th>{isEnglish ? "Job & Pillar" : "Métier & Pôle"}</th>
                        <th>{isEnglish ? "Location" : "Territoire"}</th>
                        <th>{isEnglish ? "Status" : "Statut"}</th>
                        <th style={{ textAlign: "right", paddingRight: "1.5rem" }}>{isEnglish ? "Actions" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => {
                        const displayName = `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email;
                        const jobTitle = (isEnglish && u.metierEn) ? u.metierEn : (u.metier || "—");
                        const pillar = (isEnglish && u.poleEn) ? u.poleEn : (u.pole || "—");
                        const territory = [u.location, u.country].filter(Boolean).join(" · ") || "—";
                        const isBilingual = !!(u.metier && u.metierEn);
                        const initials = `${u.firstName?.charAt(0) || ""}${u.lastName?.charAt(0) || ""}`.toUpperCase() || "J";

                        return (
                          <tr key={u.id}>
                            <td style={{ fontWeight: 600, color: "#13221B" }}>
                              <div className="member-avatar-cell">
                                {u.avatar ? (
                                  <img 
                                    src={getMediaUrl(u.avatar)} 
                                    alt={displayName} 
                                    className="member-avatar-thumb"
                                  />
                                ) : (
                                  <div className="member-avatar-fallback">
                                    {initials}
                                  </div>
                                )}
                                <div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                    <span>{displayName}</span>
                                    {isBilingual && (
                                      <span style={{ fontSize: "0.65rem", padding: "1px 5px", borderRadius: "4px", background: "rgba(30,81,40,0.12)", color: "#1E5128", fontWeight: 700, flexShrink: 0 }}>
                                        FR/EN
                                      </span>
                                    )}
                                  </div>
                                  <span style={{ fontSize: "0.78rem", color: "#6A8278", display: "block" }}>
                                    {u.email}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-start" }}>
                                <span className={`badge ${u.role === "admin" ? "badge-gold-light" : "badge-green-light"}`}>
                                  {u.role === "admin" ? "Super Admin" : u.role}
                                </span>
                                {u.category && (
                                  <span style={{ fontSize: "0.74rem", color: "#4A6356", fontWeight: 600 }}>
                                    #{u.category}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div style={{ maxWidth: "220px" }}>
                                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#13221B" }}>
                                  {jobTitle}
                                </div>
                                <div style={{ fontSize: "0.76rem", color: "#5A7367" }}>
                                  {pillar}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ fontSize: "0.82rem", color: "#4A6356" }}>
                                {territory}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${u.status === "active" ? "badge-green-light" : "badge-gold-light"}`}>
                                {u.status === "active" ? (isEnglish ? "Active" : "Actif") : (isEnglish ? "Deactivated" : "Désactivé")}
                              </span>
                            </td>
                            <td style={{ textAlign: "right", position: "relative" }}>
                              <div className="action-menu-container">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveActionMenuId(activeActionMenuId === u.id ? null : u.id);
                                  }}
                                  className={`btn-action-more ${activeActionMenuId === u.id ? "active" : ""}`}
                                  aria-label={isEnglish ? "Actions menu" : "Menu d'actions"}
                                  title={isEnglish ? "Actions" : "Options"}
                                >
                                  <MoreVertical size={16} />
                                </button>

                                {activeActionMenuId === u.id && (
                                  <div 
                                    className="action-dropdown-menu" 
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {/* 1. VOIR */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveActionMenuId(null);
                                        handleOpenViewUser(u);
                                      }}
                                      className="action-dropdown-item"
                                    >
                                      <Eye size={14} style={{ color: "#2563EB" }} />
                                      <span>{isEnglish ? "View profile" : "Voir le profil"}</span>
                                    </button>

                                    {/* 2. ÉDITER */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveActionMenuId(null);
                                        handleOpenEditUser(u);
                                      }}
                                      className="action-dropdown-item"
                                    >
                                      <Edit3 size={14} style={{ color: "#D97706" }} />
                                      <span>{isEnglish ? "Edit member" : "Éditer le membre"}</span>
                                    </button>

                                    {/* 3. DÉSACTIVER / ACTIVER (sauf admin courant) */}
                                    {u.role !== "admin" && (
                                      u.status === "active" ? (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setActiveActionMenuId(null);
                                            handleToggleUserStatus(u);
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
                                            handleToggleUserStatus(u);
                                          }}
                                          className="action-dropdown-item"
                                        >
                                          <CheckCircle size={14} style={{ color: "#059669" }} />
                                          <span>{isEnglish ? "Activate" : "Activer"}</span>
                                        </button>
                                      )
                                    )}

                                    {u.role !== "admin" && <div className="action-dropdown-divider"></div>}

                                    {/* 4. SUPPRIMER (sauf admin) */}
                                    {u.role !== "admin" && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveActionMenuId(null);
                                          handleDeleteUser(u);
                                        }}
                                        className="action-dropdown-item text-danger"
                                      >
                                        <Trash2 size={14} />
                                        <span>{isEnglish ? "Delete" : "Supprimer"}</span>
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredUsers.length === 0 && (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center", color: "#6A8278", padding: "2.5rem" }}>
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

      {/* ======================================================== */}
      {/* CREATE PODCAST MODAL */}
      {/* ======================================================== */}
      {newPodcastOpen && (
        <div className="modal-overlay" onClick={() => setNewPodcastOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
            <button 
              onClick={() => setNewPodcastOpen(false)} 
              className="modal-close-btn"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(30, 81, 40, 0.12)", color: "#1E5128", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Headphones size={20} />
              </div>
              <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-serif)", fontWeight: 800, color: "#13221B", margin: 0 }}>
                {isEnglish ? "Publish a Podcast Episode" : "Publier une Émission Audio / Podcast"}
              </h3>
            </div>
            <p style={{ color: "#5A7367", fontSize: "0.88rem", marginBottom: "1.25rem" }}>
              {isEnglish 
                ? "Add a student vox pop, investigative report, or thematic audio broadcast in French and English." 
                : "Ajoutez un reportage audio, micro-trottoir ou émission radiophonique junior bilingue."}
            </p>

            {/* Language Switcher Tabs */}
            <div className="modal-lang-tabs" style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", borderBottom: "1px solid #E8EFEA", paddingBottom: "0.5rem" }}>
              <button
                type="button"
                onClick={() => setPodcastFormLangTab("fr")}
                className={`lang-tab-btn ${podcastFormLangTab === "fr" ? "active" : ""}`}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  background: podcastFormLangTab === "fr" ? "#1E5128" : "transparent",
                  color: podcastFormLangTab === "fr" ? "#FFFFFF" : "#5A7367"
                }}
              >
                🇫🇷 Français {podcastForm.title ? "✓" : "*"}
              </button>
              <button
                type="button"
                onClick={() => setPodcastFormLangTab("en")}
                className={`lang-tab-btn ${podcastFormLangTab === "en" ? "active" : ""}`}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  background: podcastFormLangTab === "en" ? "#1E5128" : "transparent",
                  color: podcastFormLangTab === "en" ? "#FFFFFF" : "#5A7367"
                }}
              >
                🇬🇧 English {podcastForm.titleEn ? "✓" : ""}
              </button>
            </div>

            <form onSubmit={handleCreatePodcast}>
              {podcastFormLangTab === "fr" ? (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      Titre de l'émission (Français) *
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="form-control" 
                      value={podcastForm.title} 
                      onChange={(e) => setPodcastForm({ ...podcastForm, title: e.target.value })} 
                      placeholder="ex: Les gardiens silencieux du Bassin du Congo"
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>
                        Série / Rubrique (Français)
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={podcastForm.series} 
                        onChange={(e) => setPodcastForm({ ...podcastForm, series: e.target.value })} 
                        placeholder="ex: Les Voix de la Durabilité · Épisode 01"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>
                        Thématique (Français)
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={podcastForm.topic} 
                        onChange={(e) => setPodcastForm({ ...podcastForm, topic: e.target.value })} 
                        placeholder="ex: Biodiversité & Forêts Primaires"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      Club Média / Auteur (Français)
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={podcastForm.author} 
                      onChange={(e) => setPodcastForm({ ...podcastForm, author: e.target.value })} 
                      placeholder="ex: Club Média Lycée Leclerc, Yaoundé"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      Description & Résumé (Français)
                    </label>
                    <textarea 
                      className="form-control" 
                      rows={3}
                      value={podcastForm.description} 
                      onChange={(e) => setPodcastForm({ ...podcastForm, description: e.target.value })} 
                      placeholder="Une immersion sonore au cœur de la forêt équatoriale..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      Episode Title (English)
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={podcastForm.titleEn} 
                      onChange={(e) => setPodcastForm({ ...podcastForm, titleEn: e.target.value })} 
                      placeholder="e.g. The Silent Guardians of the Congo Basin"
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>
                        Series / Show (English)
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={podcastForm.seriesEn} 
                        onChange={(e) => setPodcastForm({ ...podcastForm, seriesEn: e.target.value })} 
                        placeholder="e.g. Voices of Sustainability · Episode 01"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>
                        Topic / Category (English)
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={podcastForm.topicEn} 
                        onChange={(e) => setPodcastForm({ ...podcastForm, topicEn: e.target.value })} 
                        placeholder="e.g. Biodiversity & Primary Forests"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      Media Club / Author (English)
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={podcastForm.authorEn} 
                      onChange={(e) => setPodcastForm({ ...podcastForm, authorEn: e.target.value })} 
                      placeholder="e.g. General Leclerc High School Media Club, Yaoundé"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      Audio Summary & Description (English)
                    </label>
                    <textarea 
                      className="form-control" 
                      rows={3}
                      value={podcastForm.descriptionEn} 
                      onChange={(e) => setPodcastForm({ ...podcastForm, descriptionEn: e.target.value })} 
                      placeholder="A sonic immersion in the heart of the equatorial forest..."
                    />
                  </div>
                </>
              )}

              {/* Common Technical Parameters */}
              <div style={{ background: "#F7FAF8", padding: "1rem", borderRadius: "10px", marginTop: "1rem", marginBottom: "1rem", border: "1px solid #E8EFEA" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1E5128", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.75rem" }}>
                  {isEnglish ? "Audio File & Media Settings" : "Paramètres Audio & Médias"}
                </span>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group" style={{ marginBottom: "0.75rem" }}>
                    <label className="form-label" style={{ color: "#13221B", fontSize: "0.85rem" }}>
                      {isEnglish ? "Duration (MM:SS)" : "Durée (ex: 08:45)"}
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={podcastForm.duration} 
                      onChange={(e) => setPodcastForm({ ...podcastForm, duration: e.target.value })} 
                      placeholder="10:00"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "0.75rem" }}>
                    <label className="form-label" style={{ color: "#13221B", fontSize: "0.85rem" }}>
                      {isEnglish ? "Display Order" : "Ordre de priorité"}
                    </label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={podcastForm.order} 
                      onChange={(e) => setPodcastForm({ ...podcastForm, order: parseInt(e.target.value, 10) || 0 })} 
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "0.75rem" }}>
                  <label className="form-label" style={{ color: "#13221B", fontSize: "0.85rem" }}>
                    {isEnglish ? "Direct Audio URL (MP3 / OGG / Streaming Link)" : "URL du flux audio (MP3 / OGG / Lien direct)"}
                  </label>
                  <input 
                    type="url" 
                    className="form-control" 
                    value={podcastForm.audioUrl} 
                    onChange={(e) => setPodcastForm({ ...podcastForm, audioUrl: e.target.value })} 
                    placeholder="https://actions.google.com/sounds/v1/nature/forest_birds_singing.ogg"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: "#13221B", fontSize: "0.85rem" }}>
                    {isEnglish ? "Cover Artwork (Upload File or URL)" : "Illustration de couverture (Fichier ou URL)"}
                  </label>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setPodcastForm({
                            ...podcastForm,
                            coverFile: file,
                            coverPreview: URL.createObjectURL(file)
                          });
                        }
                      }}
                      className="form-control" 
                      style={{ flex: 1 }}
                    />
                    <input 
                      type="text" 
                      placeholder={isEnglish ? "Or image URL..." : "Ou URL directe..."}
                      value={podcastForm.cover} 
                      onChange={(e) => setPodcastForm({ ...podcastForm, cover: e.target.value })} 
                      className="form-control" 
                      style={{ flex: 1 }}
                    />
                  </div>

                  {(podcastForm.coverPreview || podcastForm.cover) && (
                    <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <img 
                        src={podcastForm.coverPreview || getMediaUrl(podcastForm.cover)} 
                        alt="Preview" 
                        style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }} 
                      />
                      <span style={{ fontSize: "0.8rem", color: "#1E5128" }}>✓ {isEnglish ? "Cover ready" : "Aperçu de la pochette"}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                <button 
                  type="button" 
                  onClick={() => setNewPodcastOpen(false)} 
                  className="btn btn-outline"
                >
                  {isEnglish ? "Cancel" : "Annuler"}
                </button>
                <button type="submit" className="btn btn-forest">
                  <Headphones size={16} />
                  <span>{isEnglish ? "Publish Podcast" : "Publier l'émission"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* EDIT PODCAST MODAL */}
      {/* ======================================================== */}
      {editPodcastOpen && (
        <div className="modal-overlay" onClick={() => setEditPodcastOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
            <button 
              onClick={() => setEditPodcastOpen(false)} 
              className="modal-close-btn"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(217, 119, 6, 0.12)", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Edit3 size={20} />
              </div>
              <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-serif)", fontWeight: 800, color: "#13221B", margin: 0 }}>
                {isEnglish ? "Edit Podcast Episode" : "Modifier l'Émission Audio"}
              </h3>
            </div>
            <p style={{ color: "#5A7367", fontSize: "0.88rem", marginBottom: "1.25rem" }}>
              {isEnglish 
                ? "Update episode titles, media links, and bilingual descriptions." 
                : "Mettez à jour les informations, fichiers médias et descriptions bilingues."}
            </p>

            {/* Language Switcher Tabs */}
            <div className="modal-lang-tabs" style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", borderBottom: "1px solid #E8EFEA", paddingBottom: "0.5rem" }}>
              <button
                type="button"
                onClick={() => setEditPodcastLangTab("fr")}
                className={`lang-tab-btn ${editPodcastLangTab === "fr" ? "active" : ""}`}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  background: editPodcastLangTab === "fr" ? "#1E5128" : "transparent",
                  color: editPodcastLangTab === "fr" ? "#FFFFFF" : "#5A7367"
                }}
              >
                🇫🇷 Français {editPodcastForm.title ? "✓" : "*"}
              </button>
              <button
                type="button"
                onClick={() => setEditPodcastLangTab("en")}
                className={`lang-tab-btn ${editPodcastLangTab === "en" ? "active" : ""}`}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  background: editPodcastLangTab === "en" ? "#1E5128" : "transparent",
                  color: editPodcastLangTab === "en" ? "#FFFFFF" : "#5A7367"
                }}
              >
                🇬🇧 English {editPodcastForm.titleEn ? "✓" : ""}
              </button>
            </div>

            <form onSubmit={handleUpdatePodcast}>
              {editPodcastLangTab === "fr" ? (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      Titre de l'émission (Français) *
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="form-control" 
                      value={editPodcastForm.title} 
                      onChange={(e) => setEditPodcastForm({ ...editPodcastForm, title: e.target.value })} 
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>
                        Série / Rubrique (Français)
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editPodcastForm.series} 
                        onChange={(e) => setEditPodcastForm({ ...editPodcastForm, series: e.target.value })} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>
                        Thématique (Français)
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editPodcastForm.topic} 
                        onChange={(e) => setEditPodcastForm({ ...editPodcastForm, topic: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      Club Média / Auteur (Français)
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editPodcastForm.author} 
                      onChange={(e) => setEditPodcastForm({ ...editPodcastForm, author: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      Description & Résumé (Français)
                    </label>
                    <textarea 
                      className="form-control" 
                      rows={3}
                      value={editPodcastForm.description} 
                      onChange={(e) => setEditPodcastForm({ ...editPodcastForm, description: e.target.value })} 
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      Episode Title (English)
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editPodcastForm.titleEn} 
                      onChange={(e) => setEditPodcastForm({ ...editPodcastForm, titleEn: e.target.value })} 
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>
                        Series / Show (English)
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editPodcastForm.seriesEn} 
                        onChange={(e) => setEditPodcastForm({ ...editPodcastForm, seriesEn: e.target.value })} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>
                        Topic / Category (English)
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editPodcastForm.topicEn} 
                        onChange={(e) => setEditPodcastForm({ ...editPodcastForm, topicEn: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      Media Club / Author (English)
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editPodcastForm.authorEn} 
                      onChange={(e) => setEditPodcastForm({ ...editPodcastForm, authorEn: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>
                      Audio Summary & Description (English)
                    </label>
                    <textarea 
                      className="form-control" 
                      rows={3}
                      value={editPodcastForm.descriptionEn} 
                      onChange={(e) => setEditPodcastForm({ ...editPodcastForm, descriptionEn: e.target.value })} 
                    />
                  </div>
                </>
              )}

              {/* Common Technical Parameters */}
              <div style={{ background: "#F7FAF8", padding: "1rem", borderRadius: "10px", marginTop: "1rem", marginBottom: "1rem", border: "1px solid #E8EFEA" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1E5128", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.75rem" }}>
                  {isEnglish ? "Audio File & Media Settings" : "Paramètres Audio & Médias"}
                </span>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group" style={{ marginBottom: "0.75rem" }}>
                    <label className="form-label" style={{ color: "#13221B", fontSize: "0.85rem" }}>
                      {isEnglish ? "Duration (MM:SS)" : "Durée (ex: 08:45)"}
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editPodcastForm.duration} 
                      onChange={(e) => setEditPodcastForm({ ...editPodcastForm, duration: e.target.value })} 
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "0.75rem" }}>
                    <label className="form-label" style={{ color: "#13221B", fontSize: "0.85rem" }}>
                      {isEnglish ? "Display Order" : "Ordre de priorité"}
                    </label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={editPodcastForm.order} 
                      onChange={(e) => setEditPodcastForm({ ...editPodcastForm, order: parseInt(e.target.value, 10) || 0 })} 
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "0.75rem" }}>
                  <label className="form-label" style={{ color: "#13221B", fontSize: "0.85rem" }}>
                    {isEnglish ? "Direct Audio URL (MP3 / OGG / Streaming Link)" : "URL du flux audio (MP3 / OGG / Lien direct)"}
                  </label>
                  <input 
                    type="url" 
                    className="form-control" 
                    value={editPodcastForm.audioUrl} 
                    onChange={(e) => setEditPodcastForm({ ...editPodcastForm, audioUrl: e.target.value })} 
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: "#13221B", fontSize: "0.85rem" }}>
                    {isEnglish ? "Cover Artwork (Upload File or URL)" : "Illustration de couverture (Fichier ou URL)"}
                  </label>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setEditPodcastForm({
                            ...editPodcastForm,
                            coverFile: file,
                            coverPreview: URL.createObjectURL(file)
                          });
                        }
                      }}
                      className="form-control" 
                      style={{ flex: 1 }}
                    />
                    <input 
                      type="text" 
                      placeholder={isEnglish ? "Or image URL..." : "Ou URL directe..."}
                      value={editPodcastForm.cover} 
                      onChange={(e) => setEditPodcastForm({ ...editPodcastForm, cover: e.target.value })} 
                      className="form-control" 
                      style={{ flex: 1 }}
                    />
                  </div>

                  {(editPodcastForm.coverPreview || editPodcastForm.cover) && (
                    <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <img 
                        src={editPodcastForm.coverPreview || getMediaUrl(editPodcastForm.cover)} 
                        alt="Preview" 
                        style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }} 
                      />
                      <span style={{ fontSize: "0.8rem", color: "#1E5128" }}>✓ {isEnglish ? "Cover selected" : "Pochette active"}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                <button 
                  type="button" 
                  onClick={() => setEditPodcastOpen(false)} 
                  className="btn btn-outline"
                >
                  {isEnglish ? "Cancel" : "Annuler"}
                </button>
                <button type="submit" className="btn btn-forest">
                  <Check size={16} />
                  <span>{isEnglish ? "Save Changes" : "Enregistrer les modifications"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW PODCAST DETAILS MODAL */}
      {/* ======================================================== */}
      {viewPodcastOpen && selectedPodcastItem && (
        <div className="modal-overlay" onClick={() => setViewPodcastOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
            <button 
              onClick={() => setViewPodcastOpen(false)} 
              className="modal-close-btn"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            {/* Media Player Showcase Preview */}
            <div style={{
              display: "flex",
              gap: "1.25rem",
              background: "linear-gradient(135deg, #13221B 0%, #1E5128 100%)",
              borderRadius: "14px",
              padding: "1.25rem",
              color: "#ffffff",
              marginBottom: "1.5rem"
            }}>
              <img 
                src={getMediaUrl(selectedPodcastItem.cover || selectedPodcastItem.coverImage)} 
                alt={selectedPodcastItem.title} 
                style={{ width: "110px", height: "110px", borderRadius: "10px", objectFit: "cover", flexShrink: 0, boxShadow: "0 8px 16px rgba(0,0,0,0.3)" }} 
              />
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center", marginBottom: "0.35rem" }}>
                    <span className="badge badge-green-light" style={{ fontSize: "0.72rem" }}>
                      {viewPodcastLangTab === "en" ? (selectedPodcastItem.topicEn || selectedPodcastItem.topic) : selectedPodcastItem.topic}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#A3D9B1" }}>
                      {selectedPodcastItem.duration}
                    </span>
                    <span className={`badge ${selectedPodcastItem.status === "active" ? "badge-green-light" : "badge-gold-light"}`} style={{ fontSize: "0.7rem" }}>
                      {selectedPodcastItem.status === "active" ? (isEnglish ? "Active" : "Actif") : (isEnglish ? "Suspended" : "Désactivé")}
                    </span>
                  </div>

                  <h4 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 0.25rem 0", color: "#FFFFFF", lineHeight: 1.3 }}>
                    {viewPodcastLangTab === "en" ? (selectedPodcastItem.titleEn || selectedPodcastItem.title) : selectedPodcastItem.title}
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "#D5E0D5", margin: 0 }}>
                    {viewPodcastLangTab === "en" ? (selectedPodcastItem.seriesEn || selectedPodcastItem.series) : selectedPodcastItem.series} · <em>{viewPodcastLangTab === "en" ? (selectedPodcastItem.authorEn || selectedPodcastItem.author) : selectedPodcastItem.author}</em>
                  </p>
                </div>

                {selectedPodcastItem.audioUrl && (
                  <audio 
                    controls 
                    src={selectedPodcastItem.audioUrl} 
                    style={{ width: "100%", height: "36px", marginTop: "0.75rem" }} 
                  />
                )}
              </div>
            </div>

            {/* Language Switcher Tabs */}
            <div className="modal-lang-tabs" style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", borderBottom: "1px solid #E8EFEA", paddingBottom: "0.5rem" }}>
              <button
                type="button"
                onClick={() => setViewPodcastLangTab("fr")}
                className={`lang-tab-btn ${viewPodcastLangTab === "fr" ? "active" : ""}`}
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  background: viewPodcastLangTab === "fr" ? "#1E5128" : "transparent",
                  color: viewPodcastLangTab === "fr" ? "#FFFFFF" : "#5A7367"
                }}
              >
                🇫🇷 Vue Français
              </button>
              <button
                type="button"
                onClick={() => setViewPodcastLangTab("en")}
                className={`lang-tab-btn ${viewPodcastLangTab === "en" ? "active" : ""}`}
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  background: viewPodcastLangTab === "en" ? "#1E5128" : "transparent",
                  color: viewPodcastLangTab === "en" ? "#FFFFFF" : "#5A7367"
                }}
              >
                🇬🇧 English View
              </button>
            </div>

            <div style={{ background: "#F7FAF8", padding: "1rem", borderRadius: "10px", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#5A7367", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                {isEnglish ? "Episode Synopsis & Notes" : "Synopsis & Note d'intention"}
              </span>
              <p style={{ fontSize: "0.9rem", color: "#13221B", lineHeight: 1.6, margin: 0 }}>
                {viewPodcastLangTab === "en" 
                  ? (selectedPodcastItem.descriptionEn || selectedPodcastItem.description || "No English description provided.") 
                  : (selectedPodcastItem.description || "Aucune description fournie.")}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", paddingTop: "0.5rem", borderTop: "1px solid #E8EFEA" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    setViewPodcastOpen(false);
                    handleOpenEditPodcast(selectedPodcastItem);
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Edit3 size={14} />
                  <span>{isEnglish ? "Edit" : "Modifier"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setViewPodcastOpen(false);
                    handleTogglePodcastStatus(selectedPodcastItem);
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Power size={14} />
                  <span>{selectedPodcastItem.status === "active" ? (isEnglish ? "Deactivate" : "Désactiver") : (isEnglish ? "Activate" : "Activer")}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setViewPodcastOpen(false);
                  handleDeletePodcast(selectedPodcastItem);
                }}
                className="btn btn-action-delete"
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <Trash2 size={14} />
                <span>{isEnglish ? "Delete" : "Supprimer"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE AGENDA MODAL */}
      {newAgendaOpen && (
        <div className="modal-overlay" onClick={() => setNewAgendaOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
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
            <p style={{ color: "#5A7367", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
              {isEnglish ? "Add a masterclass or workshop to the regional calendar in French and English." : "Ajouter une masterclass ou atelier pratique au calendrier pédagogique en français et anglais."}
            </p>

            {/* Bilingual Tab Switcher */}
            <div className="modal-lang-tabs">
              <button 
                type="button" 
                className={`modal-lang-tab-btn ${agendaFormLangTab === "fr" ? "active" : ""}`}
                onClick={() => setAgendaFormLangTab("fr")}
              >
                <span>🇫🇷</span>
                <span>{isEnglish ? "French Version (Primary *)" : "Version Française (Principale *)"}</span>
              </button>
              <button 
                type="button" 
                className={`modal-lang-tab-btn ${agendaFormLangTab === "en" ? "active" : ""}`}
                onClick={() => setAgendaFormLangTab("en")}
              >
                <span>🇬🇧</span>
                <span>{isEnglish ? "English Version" : "Version Anglaise"}</span>
              </button>
            </div>

            <form onSubmit={handleCreateAgenda}>
              {agendaFormLangTab === "fr" ? (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Intitulé de la session (FR) *</label>
                    <input 
                      type="text" 
                      required 
                      className="form-control" 
                      value={agendaForm.title} 
                      onChange={(e) => setAgendaForm({ ...agendaForm, title: e.target.value })} 
                      placeholder="ex: Session Inaugurale : Investigation Climat & Écriture de Solutions"
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Format / Typologie</label>
                      <select
                        className="dedicated-select"
                        style={{ width: "100%" }}
                        value={agendaForm.type}
                        onChange={(e) => setAgendaForm({ ...agendaForm, type: e.target.value })}
                      >
                        <option value="Formation Régionale">Formation Régionale</option>
                        <option value="Masterclass Virtuelle">Masterclass Virtuelle</option>
                        <option value="Conférence Régionale">Conférence Régionale</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Lieu & Territoire (FR)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={agendaForm.location} 
                        onChange={(e) => setAgendaForm({ ...agendaForm, location: e.target.value })} 
                        placeholder="ex: Yaoundé · Hybride"
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Durée de la session (FR)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={agendaForm.duration} 
                        onChange={(e) => setAgendaForm({ ...agendaForm, duration: e.target.value })} 
                        placeholder="ex: Session intensive 3 jours"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Places / Modalités (FR)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={agendaForm.seats} 
                        onChange={(e) => setAgendaForm({ ...agendaForm, seats: e.target.value })} 
                        placeholder="ex: 40 places disponibles"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Public cible (FR)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={agendaForm.audience} 
                      onChange={(e) => setAgendaForm({ ...agendaForm, audience: e.target.value })} 
                      placeholder="ex: Lycéens, étudiants et jeunes reporters"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Description pédagogique (FR) *</label>
                    <textarea 
                      required 
                      rows={3} 
                      className="form-control" 
                      value={agendaForm.description} 
                      onChange={(e) => setAgendaForm({ ...agendaForm, description: e.target.value })} 
                      placeholder="Objectifs pédagogiques, compétences acquises, méthodologie..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Session Title (EN)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={agendaForm.titleEn} 
                      onChange={(e) => setAgendaForm({ ...agendaForm, titleEn: e.target.value })} 
                      placeholder="e.g. Inaugural Training Session: Climate Investigation"
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Format / Typology (EN)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={agendaForm.typeEn} 
                        onChange={(e) => setAgendaForm({ ...agendaForm, typeEn: e.target.value })} 
                        placeholder="e.g. Regional Training"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Location / Territory (EN)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={agendaForm.locationEn} 
                        onChange={(e) => setAgendaForm({ ...agendaForm, locationEn: e.target.value })} 
                        placeholder="e.g. Yaoundé · Hybrid"
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Duration (EN)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={agendaForm.durationEn} 
                        onChange={(e) => setAgendaForm({ ...agendaForm, durationEn: e.target.value })} 
                        placeholder="e.g. 3-day intensive session"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Seats / Access (EN)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={agendaForm.seatsEn} 
                        onChange={(e) => setAgendaForm({ ...agendaForm, seatsEn: e.target.value })} 
                        placeholder="e.g. 40 seats available"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Target Audience (EN)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={agendaForm.audienceEn} 
                      onChange={(e) => setAgendaForm({ ...agendaForm, audienceEn: e.target.value })} 
                      placeholder="e.g. High school & university students"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Pedagogical Description (EN)</label>
                    <textarea 
                      rows={3} 
                      className="form-control" 
                      value={agendaForm.descriptionEn} 
                      onChange={(e) => setAgendaForm({ ...agendaForm, descriptionEn: e.target.value })} 
                      placeholder="Learning objectives, acquired skills, field methodologies..."
                    />
                  </div>
                </>
              )}

              {/* Shared Date Settings */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #E5EBE7" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Start Date *" : "Date de début *"}</label>
                  <input 
                    type="date" 
                    required 
                    className="form-control" 
                    value={agendaForm.startDate} 
                    onChange={(e) => setAgendaForm({ ...agendaForm, startDate: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "End Date" : "Date de fin"}</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={agendaForm.endDate} 
                    onChange={(e) => setAgendaForm({ ...agendaForm, endDate: e.target.value })} 
                  />
                </div>
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

      {/* EDIT AGENDA MODAL */}
      {editAgendaOpen && (
        <div className="modal-overlay" onClick={() => setEditAgendaOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
            <button 
              onClick={() => setEditAgendaOpen(false)} 
              className="modal-close-btn"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", fontWeight: 800, color: "#13221B", marginBottom: "0.4rem" }}>
              {isEnglish ? "Edit Training Session" : "Modifier la Session de Formation"}
            </h3>
            <p style={{ color: "#5A7367", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
              {isEnglish ? "Update the session details, schedule, or English translation." : "Mettez à jour les informations, les dates ou la version anglaise."}
            </p>

            {/* Bilingual Tab Switcher */}
            <div className="modal-lang-tabs">
              <button 
                type="button" 
                className={`modal-lang-tab-btn ${editAgendaLangTab === "fr" ? "active" : ""}`}
                onClick={() => setEditAgendaLangTab("fr")}
              >
                <span>🇫🇷</span>
                <span>{isEnglish ? "French Version" : "Version Française"}</span>
              </button>
              <button 
                type="button" 
                className={`modal-lang-tab-btn ${editAgendaLangTab === "en" ? "active" : ""}`}
                onClick={() => setEditAgendaLangTab("en")}
              >
                <span>🇬🇧</span>
                <span>{isEnglish ? "English Version" : "Version Anglaise"}</span>
              </button>
            </div>

            <form onSubmit={handleUpdateAgenda}>
              {editAgendaLangTab === "fr" ? (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Intitulé de la session (FR) *</label>
                    <input 
                      type="text" 
                      required 
                      className="form-control" 
                      value={editAgendaForm.title} 
                      onChange={(e) => setEditAgendaForm({ ...editAgendaForm, title: e.target.value })} 
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Format / Typologie</label>
                      <select
                        className="dedicated-select"
                        style={{ width: "100%" }}
                        value={editAgendaForm.type}
                        onChange={(e) => setEditAgendaForm({ ...editAgendaForm, type: e.target.value })}
                      >
                        <option value="Formation Régionale">Formation Régionale</option>
                        <option value="Masterclass Virtuelle">Masterclass Virtuelle</option>
                        <option value="Conférence Régionale">Conférence Régionale</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Lieu & Territoire (FR)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editAgendaForm.location} 
                        onChange={(e) => setEditAgendaForm({ ...editAgendaForm, location: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Durée de la session (FR)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editAgendaForm.duration} 
                        onChange={(e) => setEditAgendaForm({ ...editAgendaForm, duration: e.target.value })} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Places / Modalités (FR)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editAgendaForm.seats} 
                        onChange={(e) => setEditAgendaForm({ ...editAgendaForm, seats: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Public cible (FR)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editAgendaForm.audience} 
                      onChange={(e) => setEditAgendaForm({ ...editAgendaForm, audience: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Description pédagogique (FR) *</label>
                    <textarea 
                      required 
                      rows={3} 
                      className="form-control" 
                      value={editAgendaForm.description} 
                      onChange={(e) => setEditAgendaForm({ ...editAgendaForm, description: e.target.value })} 
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Session Title (EN)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editAgendaForm.titleEn} 
                      onChange={(e) => setEditAgendaForm({ ...editAgendaForm, titleEn: e.target.value })} 
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Format / Typology (EN)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editAgendaForm.typeEn} 
                        onChange={(e) => setEditAgendaForm({ ...editAgendaForm, typeEn: e.target.value })} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Location / Territory (EN)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editAgendaForm.locationEn} 
                        onChange={(e) => setEditAgendaForm({ ...editAgendaForm, locationEn: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Duration (EN)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editAgendaForm.durationEn} 
                        onChange={(e) => setEditAgendaForm({ ...editAgendaForm, durationEn: e.target.value })} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: "#13221B" }}>Seats / Access (EN)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editAgendaForm.seatsEn} 
                        onChange={(e) => setEditAgendaForm({ ...editAgendaForm, seatsEn: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Target Audience (EN)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editAgendaForm.audienceEn} 
                      onChange={(e) => setEditAgendaForm({ ...editAgendaForm, audienceEn: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>Pedagogical Description (EN)</label>
                    <textarea 
                      rows={3} 
                      className="form-control" 
                      value={editAgendaForm.descriptionEn} 
                      onChange={(e) => setEditAgendaForm({ ...editAgendaForm, descriptionEn: e.target.value })} 
                    />
                  </div>
                </>
              )}

              {/* Shared Date Settings */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #E5EBE7" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Start Date *" : "Date de début *"}</label>
                  <input 
                    type="date" 
                    required 
                    className="form-control" 
                    value={editAgendaForm.startDate} 
                    onChange={(e) => setEditAgendaForm({ ...editAgendaForm, startDate: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "End Date" : "Date de fin"}</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={editAgendaForm.endDate} 
                    onChange={(e) => setEditAgendaForm({ ...editAgendaForm, endDate: e.target.value })} 
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid #E5EBE7" }}>
                <button type="button" onClick={() => setEditAgendaOpen(false)} className="btn btn-outline-forest">
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

      {/* VIEW AGENDA DETAILS MODAL */}
      {viewAgendaOpen && selectedAgendaItem && (
        <div className="modal-overlay" onClick={() => setViewAgendaOpen(false)}>
          <div className="modal-card article-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
            <button 
              onClick={() => setViewAgendaOpen(false)} 
              className="modal-close-btn"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <span className={`badge ${selectedAgendaItem.status === "active" ? "badge-green-light" : "badge-gold-light"}`}>
                {selectedAgendaItem.status === "active" ? (isEnglish ? "Active" : "Actif") : (isEnglish ? "Suspended" : "Désactivé")}
              </span>
              <span className="badge badge-green-light">
                {(viewAgendaLangTab === "en" && selectedAgendaItem.typeEn) ? selectedAgendaItem.typeEn : selectedAgendaItem.type}
              </span>
            </div>

            {/* Bilingual Tab Switcher */}
            <div className="modal-lang-tabs">
              <button 
                type="button" 
                className={`modal-lang-tab-btn ${viewAgendaLangTab === "fr" ? "active" : ""}`}
                onClick={() => setViewAgendaLangTab("fr")}
              >
                <span>🇫🇷</span>
                <span>{isEnglish ? "French Content" : "Contenu Français"}</span>
              </button>
              <button 
                type="button" 
                className={`modal-lang-tab-btn ${viewAgendaLangTab === "en" ? "active" : ""}`}
                onClick={() => setViewAgendaLangTab("en")}
              >
                <span>🇬🇧</span>
                <span>{isEnglish ? "English Content" : "Contenu Anglais"}</span>
              </button>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontFamily: "var(--font-serif)", fontWeight: 800, color: "#13221B", marginBottom: "1rem" }}>
                {(viewAgendaLangTab === "en" && selectedAgendaItem.titleEn) ? selectedAgendaItem.titleEn : selectedAgendaItem.title}
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", background: "#F4F7F5", padding: "1rem", borderRadius: "10px", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2D5A43", fontSize: "0.9rem" }}>
                  <Calendar size={16} />
                  <span><strong>{isEnglish ? "Start:" : "Début :"}</strong> {new Date(selectedAgendaItem.startDate).toLocaleDateString(viewAgendaLangTab === "en" ? "en-US" : "fr-FR")}</span>
                </div>
                {selectedAgendaItem.endDate && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2D5A43", fontSize: "0.9rem" }}>
                    <Calendar size={16} />
                    <span><strong>{isEnglish ? "End:" : "Fin :"}</strong> {new Date(selectedAgendaItem.endDate).toLocaleDateString(viewAgendaLangTab === "en" ? "en-US" : "fr-FR")}</span>
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2D5A43", fontSize: "0.9rem" }}>
                  <MapPin size={16} />
                  <span><strong>{isEnglish ? "Location:" : "Lieu :"}</strong> {(viewAgendaLangTab === "en" && selectedAgendaItem.locationEn) ? selectedAgendaItem.locationEn : selectedAgendaItem.location}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2D5A43", fontSize: "0.9rem" }}>
                  <Clock size={16} />
                  <span><strong>{isEnglish ? "Duration:" : "Durée :"}</strong> {(viewAgendaLangTab === "en" && selectedAgendaItem.durationEn) ? selectedAgendaItem.durationEn : (selectedAgendaItem.duration || "Non spécifiée")}</span>
                </div>
              </div>

              {(selectedAgendaItem.seats || selectedAgendaItem.seatsEn) && (
                <div style={{ marginBottom: "0.75rem", fontSize: "0.9rem", color: "#13221B" }}>
                  <strong>{isEnglish ? "Places / Modality:" : "Places / Modalités :"}</strong> {(viewAgendaLangTab === "en" && selectedAgendaItem.seatsEn) ? selectedAgendaItem.seatsEn : selectedAgendaItem.seats}
                </div>
              )}

              {(selectedAgendaItem.audience || selectedAgendaItem.audienceEn) && (
                <div style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "#13221B" }}>
                  <strong>{isEnglish ? "Target Audience:" : "Public cible :"}</strong> {(viewAgendaLangTab === "en" && selectedAgendaItem.audienceEn) ? selectedAgendaItem.audienceEn : selectedAgendaItem.audience}
                </div>
              )}

              <div style={{ marginTop: "1rem" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#13221B", marginBottom: "0.4rem" }}>
                  {isEnglish ? "Pedagogical Description" : "Description Pédagogique"}
                </h4>
                <p style={{ color: "#3B4E44", lineHeight: 1.6, fontSize: "0.95rem" }}>
                  {(viewAgendaLangTab === "en" && selectedAgendaItem.descriptionEn) ? selectedAgendaItem.descriptionEn : selectedAgendaItem.description}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid #E5EBE7" }}>
              <button
                type="button"
                onClick={() => {
                  const item = selectedAgendaItem;
                  setViewAgendaOpen(false);
                  handleToggleAgendaStatus(item);
                }}
                className={`btn btn-sm ${selectedAgendaItem.status === "active" ? "btn-outline-forest" : "btn-forest"}`}
              >
                <Power size={14} />
                <span>
                  {selectedAgendaItem.status === "active" 
                    ? (isEnglish ? "Deactivate" : "Désactiver") 
                    : (isEnglish ? "Activate" : "Activer")}
                </span>
              </button>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    const item = selectedAgendaItem;
                    setViewAgendaOpen(false);
                    handleOpenEditAgenda(item);
                  }}
                  className="btn btn-outline-forest btn-sm"
                >
                  <Edit3 size={14} />
                  <span>{isEnglish ? "Edit" : "Modifier"}</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => setViewAgendaOpen(false)} 
                  className="btn btn-forest btn-sm"
                >
                  {isEnglish ? "Close" : "Fermer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW USER / MEMBER MODAL */}
      {viewUserOpen && selectedUserItem && (
        <div className="modal-overlay" onClick={() => setViewUserOpen(false)}>
          <div className="modal-card article-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
            <button 
              className="modal-close-btn" 
              onClick={() => setViewUserOpen(false)}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                <span className="badge badge-gold-light">
                  {selectedUserItem.category || selectedUserItem.role || "Membre"}
                </span>
                <span className={`badge ${selectedUserItem.status === "active" ? "badge-green-light" : "badge-gold-light"}`}>
                  {selectedUserItem.status === "active" ? (isEnglish ? "● Active Profile" : "● Profil Actif") : (isEnglish ? "○ Deactivated" : "○ Désactivé")}
                </span>
              </div>

              {(selectedUserItem.metierEn || selectedUserItem.bibliographieEn) && (
                <div className="modal-lang-tabs" style={{ margin: 0, padding: "2px" }}>
                  <button
                    type="button"
                    className={`modal-lang-tab-btn ${viewUserLangTab === "fr" ? "active" : ""}`}
                    onClick={() => setViewUserLangTab("fr")}
                    style={{ padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}
                  >
                    🇫🇷 FR
                  </button>
                  <button
                    type="button"
                    className={`modal-lang-tab-btn ${viewUserLangTab === "en" ? "active" : ""}`}
                    onClick={() => setViewUserLangTab("en")}
                    style={{ padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}
                  >
                    🇬🇧 EN
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem", padding: "1.2rem", background: "#F4F7F5", borderRadius: "12px", border: "1px solid #D5E2DA" }}>
              {selectedUserItem.avatar ? (
                <img 
                  src={getMediaUrl(selectedUserItem.avatar)} 
                  alt={`${selectedUserItem.firstName} ${selectedUserItem.lastName}`} 
                  style={{ width: "74px", height: "74px", borderRadius: "50%", objectFit: "cover", border: "2px solid #1E5128", flexShrink: 0 }} 
                />
              ) : (
                <div style={{ width: "74px", height: "74px", borderRadius: "50%", background: "linear-gradient(135deg, #1E5128 0%, #2E5C46 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 800, flexShrink: 0 }}>
                  {selectedUserItem.firstName?.charAt(0)}{selectedUserItem.lastName?.charAt(0)}
                </div>
              )}
              <div>
                <h2 style={{ fontSize: "1.5rem", color: "#13221B", margin: "0 0 0.25rem", fontFamily: "var(--font-serif)" }}>
                  {selectedUserItem.firstName} {selectedUserItem.lastName}
                </h2>
                <p style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", fontWeight: 600, color: "#1E5128" }}>
                  {(viewUserLangTab === "en" && selectedUserItem.metierEn) ? selectedUserItem.metierEn : (selectedUserItem.metier || "Spécialiste JEDDIAC")}
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.8rem", color: "#6A8278" }}>
                  <span>✉️ {selectedUserItem.email}</span>
                  {selectedUserItem.phone && <span>📞 {selectedUserItem.phone}</span>}
                  {selectedUserItem.location && <span>📍 {selectedUserItem.location}</span>}
                </div>
              </div>
            </div>

            <div style={{ color: "#2B4036", lineHeight: "1.7", fontSize: "0.95rem" }}>
              {((viewUserLangTab === "en" && selectedUserItem.bibliographieEn) || selectedUserItem.bibliographie) && (
                <div style={{ marginBottom: "1.25rem" }}>
                  <h4 style={{ fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "#1E5128", marginBottom: "0.4rem", fontWeight: 700 }}>
                    {viewUserLangTab === "en" ? "Biography & Commitment" : "Biographie & Engagement"}
                  </h4>
                  <p style={{ margin: 0 }}>
                    {(viewUserLangTab === "en" && selectedUserItem.bibliographieEn) ? selectedUserItem.bibliographieEn : selectedUserItem.bibliographie}
                  </p>
                </div>
              )}

              {((viewUserLangTab === "en" && selectedUserItem.conseilEn) || selectedUserItem.conseil) && (
                <div style={{ marginBottom: "1.25rem", padding: "0.9rem", background: "rgba(30,81,40,0.06)", borderRadius: "8px", borderLeft: "3px solid #1E5128" }}>
                  <h4 style={{ fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "#1E5128", marginBottom: "0.4rem", fontWeight: 700 }}>
                    {viewUserLangTab === "en" ? "Mission & Advisory Role" : "Rôle Consultatif & Mission"}
                  </h4>
                  <p style={{ margin: 0 }}>
                    {(viewUserLangTab === "en" && selectedUserItem.conseilEn) ? selectedUserItem.conseilEn : selectedUserItem.conseil}
                  </p>
                </div>
              )}

              {((viewUserLangTab === "en" && selectedUserItem.contributionsEn) || selectedUserItem.contributions) && (
                <div style={{ marginBottom: "1.25rem" }}>
                  <h4 style={{ fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "#1E5128", marginBottom: "0.4rem", fontWeight: 700 }}>
                    {viewUserLangTab === "en" ? "Key Contributions & Initiatives" : "Contributions & Réalisations Clés"}
                  </h4>
                  <p style={{ margin: 0 }}>
                    {(viewUserLangTab === "en" && selectedUserItem.contributionsEn) ? selectedUserItem.contributionsEn : selectedUserItem.contributions}
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid #E5EBE7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button 
                type="button" 
                onClick={() => {
                  setViewUserOpen(false);
                  handleOpenEditUser(selectedUserItem);
                }} 
                className="btn-action-edit"
              >
                <Edit3 size={14} />
                <span>{isEnglish ? "Edit this profile" : "Modifier ce profil"}</span>
              </button>

              <button onClick={() => setViewUserOpen(false)} className="btn btn-forest">
                {isEnglish ? "Close" : "Fermer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE USER / MEMBER MODAL */}
      {newUserOpen && (
        <div className="modal-overlay" onClick={() => setNewUserOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "720px", maxHeight: "90vh", overflowY: "auto" }}>
            <button 
              onClick={() => setNewUserOpen(false)} 
              className="modal-close-btn"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", fontWeight: 800, color: "#13221B", marginBottom: "0.4rem" }}>
              {isEnglish ? "Add Network Member / Profile" : "Nouveau Membre du Réseau"}
            </h3>
            <p style={{ color: "#5A7367", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              {isEnglish ? "Register a coordinator, journalist, expert or partner in the regional directory." : "Enregistrer un coordinateur, journaliste, expert ou partenaire dans le répertoire régional."}
            </p>

            <form onSubmit={handleCreateUser}>
              {/* Profile Avatar Upload */}
              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>
                  {isEnglish ? "Profile Photo / Avatar" : "Photo de profil / Avatar"}
                </label>

                {userForm.avatarPreview ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "#F4F7F5", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #D5E2DA" }}>
                    <img 
                      src={userForm.avatarPreview} 
                      alt="Preview" 
                      style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "2px solid #1E5128" }} 
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: "0.88rem", color: "#13221B" }}>
                        {userForm.avatarFile?.name || "avatar.jpg"}
                      </p>
                      <span style={{ fontSize: "0.75rem", color: "#5A7367" }}>
                        {isEnglish ? "Custom photo selected" : "Photo personnalisée sélectionnée"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUserForm({ ...userForm, avatarFile: null, avatarPreview: null })}
                      className="btn-action-delete"
                      title={isEnglish ? "Remove photo" : "Supprimer la photo"}
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <div 
                    style={{
                      border: "2px dashed #9EBEAF",
                      borderRadius: "10px",
                      padding: "1.2rem",
                      textAlign: "center",
                      background: "#F4F7F5",
                      cursor: "pointer",
                      transition: "border-color 0.2s"
                    }}
                    onClick={() => document.getElementById("new-user-avatar-input")?.click()}
                  >
                    <Upload size={22} style={{ color: "#2E5C46", margin: "0 auto 0.4rem" }} />
                    <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, color: "#13221B" }}>
                      {isEnglish ? "Click to upload a profile photo (JPG, PNG, WebP)" : "Cliquer pour téléverser une photo de profil (JPG, PNG, WebP)"}
                    </p>
                    <p style={{ margin: "0.2rem 0 0", fontSize: "0.75rem", color: "#6A8278" }}>
                      {isEnglish ? "Multipart Form-Data · Max 5MB" : "Support Form-Data multipart · Max 5 Mo"}
                    </p>
                  </div>
                )}

                <input 
                  id="new-user-avatar-input"
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const previewUrl = URL.createObjectURL(file);
                      setUserForm({ ...userForm, avatarFile: file, avatarPreview: previewUrl });
                    }
                  }}
                />
              </div>

              {/* Identity & Contact Info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "First Name *" : "Prénom *"}</label>
                  <input 
                    type="text" 
                    required 
                    className="form-control" 
                    value={userForm.firstName} 
                    onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })} 
                    placeholder="ex: Jean Marie"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Last Name *" : "Nom *"}</label>
                  <input 
                    type="text" 
                    required 
                    className="form-control" 
                    value={userForm.lastName} 
                    onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })} 
                    placeholder="ex: Kenfack"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Email *" : "Email *"}</label>
                  <input 
                    type="email" 
                    required 
                    className="form-control" 
                    value={userForm.email} 
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} 
                    placeholder="ex: jm.kenfack@jeddiac.org"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Phone" : "Téléphone"}</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    value={userForm.phone} 
                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })} 
                    placeholder="+237 600 000 000"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "System Role" : "Rôle Système"}</label>
                  <select 
                    className="dedicated-select" 
                    style={{ width: "100%" }}
                    value={userForm.role} 
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                  >
                    <option value="president">Président (Direction)</option>
                    <option value="secretaire_general">Secrétaire général (Direction)</option>
                    <option value="tresorier">Trésorier (Direction)</option>
                    <option value="president_honneur">Président / Présidente d’honneur</option>
                    <option value="parrain">Parrain de la phase pilote</option>
                    <option value="marraine">Marraine</option>
                    <option value="conseiller">Conseiller / Conseillère</option>
                    <option value="ambassadeur">Ambassadeur / Ambassadrice</option>
                    <option value="member">Membre</option>
                    <option value="partner">Partenaire Institutionnel</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Category" : "Catégorie Répertoire"}</label>
                  <select 
                    className="dedicated-select" 
                    style={{ width: "100%" }}
                    value={userForm.category} 
                    onChange={(e) => setUserForm({ ...userForm, category: e.target.value })}
                  >
                    <option value="direction">Direction du Programme</option>
                    <option value="honneur">Présidence d'honneur</option>
                    <option value="parrainage">Parrain & Marraines</option>
                    <option value="conseil">Conseillers</option>
                    <option value="ambassadeur">Ambassadeurs</option>
                    <option value="partenaire">Partenaires</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Country" : "Pays"}</label>
                  <select 
                    className="dedicated-select" 
                    style={{ width: "100%" }}
                    value={userForm.country} 
                    onChange={(e) => setUserForm({ ...userForm, country: e.target.value })}
                  >
                    <option value="Cameroun">Cameroun</option>
                    <option value="RDC">RD Congo (RDC)</option>
                    <option value="Congo">République du Congo</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Afrique Centrale">Afrique Centrale (Régional)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Location / City" : "Ville / Localisation"}</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={userForm.location} 
                    onChange={(e) => setUserForm({ ...userForm, location: e.target.value })} 
                    placeholder="ex: Yaoundé, Cameroun"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "LinkedIn Profile URL" : "Lien Profil LinkedIn"}</label>
                <input 
                  type="url" 
                  className="form-control" 
                  value={userForm.linkedin} 
                  onChange={(e) => setUserForm({ ...userForm, linkedin: e.target.value })} 
                  placeholder="https://linkedin.com/in/profil"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Display Order" : "Ordre d'affichage"}</label>
                  <input 
                    type="number" 
                    min="1"
                    className="form-control" 
                    value={userForm.displayOrder} 
                    onChange={(e) => setUserForm({ ...userForm, displayOrder: e.target.value })} 
                    placeholder="1, 2, 3..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Photo Source / Credit" : "Source de la photo (Crédit)"}</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={userForm.photoSource} 
                    onChange={(e) => setUserForm({ ...userForm, photoSource: e.target.value })} 
                    placeholder="ex: Ministère de l'Europe et des Affaires étrangères _Sindbad Bonfanti"
                  />
                </div>
              </div>

              {/* Language Switcher Tabs */}
              <div className="modal-lang-tabs" style={{ marginTop: "1rem", marginBottom: "1.25rem" }}>
                <button
                  type="button"
                  className={`modal-lang-tab-btn ${userFormLangTab === "fr" ? "active" : ""}`}
                  onClick={() => setUserFormLangTab("fr")}
                >
                  🇫🇷 {isEnglish ? "French Profile (Required)" : "Profil Français (Obligatoire)"}
                </button>
                <button
                  type="button"
                  className={`modal-lang-tab-btn ${userFormLangTab === "en" ? "active" : ""}`}
                  onClick={() => setUserFormLangTab("en")}
                >
                  🇬🇧 {isEnglish ? "English Profile (Optional)" : "Profil Anglais (Optionnel)"} {userForm.metierEn ? "✓" : ""}
                </button>
              </div>

              {/* TAB FR */}
              {userFormLangTab === "fr" && (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Job / Title (French) *" : "Métier / Titre (Français) *"}</label>
                    <input 
                      type="text" 
                      required 
                      className="form-control" 
                      value={userForm.metier} 
                      onChange={(e) => setUserForm({ ...userForm, metier: e.target.value })} 
                      placeholder="ex: Conseillère Scientifique & Écologie Forestière"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Pillar / Hub (French)" : "Pôle d'intervention (Français)"}</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={userForm.pole} 
                      onChange={(e) => setUserForm({ ...userForm, pole: e.target.value })} 
                      placeholder="ex: Sciences & Biodiversité"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Biography (French) *" : "Biographie détaillée (Français) *"}</label>
                    <textarea 
                      required 
                      rows={3} 
                      className="form-control" 
                      value={userForm.bibliographie} 
                      onChange={(e) => setUserForm({ ...userForm, bibliographie: e.target.value })} 
                      placeholder="Parcours académique, engagement écologique et expertise de terrain..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Mission & Advisory Role (French)" : "Mission & Rôle Consultatif (Français)"}</label>
                    <textarea 
                      rows={2} 
                      className="form-control" 
                      value={userForm.conseil} 
                      onChange={(e) => setUserForm({ ...userForm, conseil: e.target.value })} 
                      placeholder="Conseils aux rédactions juniors, encadrement pédagogique..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Deliverables & Contributions (French)" : "Réalisations & Contributions (Français)"}</label>
                    <textarea 
                      rows={2} 
                      className="form-control" 
                      value={userForm.contributions} 
                      onChange={(e) => setUserForm({ ...userForm, contributions: e.target.value })} 
                      placeholder="Coordination de guides, animation d'ateliers..."
                    />
                  </div>
                </>
              )}

              {/* TAB EN */}
              {userFormLangTab === "en" && (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Job / Title (English)" : "Métier / Titre (Anglais)"}</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={userForm.metierEn} 
                      onChange={(e) => setUserForm({ ...userForm, metierEn: e.target.value })} 
                      placeholder="e.g. Scientific Advisor & Forest Ecology"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Pillar / Hub (English)" : "Pôle d'intervention (Anglais)"}</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={userForm.poleEn} 
                      onChange={(e) => setUserForm({ ...userForm, poleEn: e.target.value })} 
                      placeholder="e.g. Sciences & Biodiversity"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Biography (English)" : "Biographie (Anglais)"}</label>
                    <textarea 
                      rows={3} 
                      className="form-control" 
                      value={userForm.bibliographieEn} 
                      onChange={(e) => setUserForm({ ...userForm, bibliographieEn: e.target.value })} 
                      placeholder="Academic journey, ecological commitment and field expertise..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Mission & Advisory Role (English)" : "Mission & Rôle Consultatif (Anglais)"}</label>
                    <textarea 
                      rows={2} 
                      className="form-control" 
                      value={userForm.conseilEn} 
                      onChange={(e) => setUserForm({ ...userForm, conseilEn: e.target.value })} 
                      placeholder="Junior newsrooms mentorship, scientific validation..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Deliverables & Contributions (English)" : "Réalisations & Contributions (Anglais)"}</label>
                    <textarea 
                      rows={2} 
                      className="form-control" 
                      value={userForm.contributionsEn} 
                      onChange={(e) => setUserForm({ ...userForm, contributionsEn: e.target.value })} 
                      placeholder="Handbooks validation, masterclasses facilitation..."
                    />
                  </div>
                </>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid #E5EBE7" }}>
                <button type="button" onClick={() => setNewUserOpen(false)} className="btn btn-outline-forest">
                  {isEnglish ? "Cancel" : "Annuler"}
                </button>
                <button type="submit" className="btn btn-forest">
                  {isEnglish ? "Save Member" : "Enregistrer le membre"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER / MEMBER MODAL */}
      {editUserOpen && (
        <div className="modal-overlay" onClick={() => setEditUserOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "720px", maxHeight: "90vh", overflowY: "auto" }}>
            <button 
              onClick={() => setEditUserOpen(false)} 
              className="modal-close-btn"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", fontWeight: 800, color: "#13221B", marginBottom: "0.4rem" }}>
              {isEnglish ? "Edit Member Profile" : "Modifier le Profil Membre"}
            </h3>
            <p style={{ color: "#5A7367", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              {isEnglish ? "Update member details, pillar assignments and bilingual information." : "Mettre à jour les informations, le pôle d'intervention et les textes bilingues."}
            </p>

            <form onSubmit={handleUpdateUser}>
              {/* Profile Avatar Upload */}
              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>
                  {isEnglish ? "Profile Photo / Avatar" : "Photo de profil / Avatar"}
                </label>

                {editUserForm.avatarPreview ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "#F4F7F5", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #D5E2DA" }}>
                    <img 
                      src={editUserForm.avatarPreview} 
                      alt="Preview" 
                      style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "2px solid #1E5128" }} 
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: "0.88rem", color: "#13221B" }}>
                        {editUserForm.avatarFile?.name || "Photo actuelle"}
                      </p>
                      <span style={{ fontSize: "0.75rem", color: "#5A7367" }}>
                        {editUserForm.avatarFile ? (isEnglish ? "New photo selected" : "Nouvelle photo sélectionnée") : (isEnglish ? "Current profile photo" : "Photo de profil actuelle")}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditUserForm({ ...editUserForm, avatarFile: null, avatarPreview: null, removeExistingAvatar: true })}
                      className="btn-action-delete"
                      title={isEnglish ? "Remove photo" : "Supprimer la photo"}
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <div 
                    style={{
                      border: "2px dashed #9EBEAF",
                      borderRadius: "10px",
                      padding: "1.2rem",
                      textAlign: "center",
                      background: "#F4F7F5",
                      cursor: "pointer",
                      transition: "border-color 0.2s"
                    }}
                    onClick={() => document.getElementById("edit-user-avatar-input")?.click()}
                  >
                    <Upload size={22} style={{ color: "#2E5C46", margin: "0 auto 0.4rem" }} />
                    <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, color: "#13221B" }}>
                      {isEnglish ? "Click to change profile photo (JPG, PNG, WebP)" : "Cliquer pour modifier la photo de profil (JPG, PNG, WebP)"}
                    </p>
                    <p style={{ margin: "0.2rem 0 0", fontSize: "0.75rem", color: "#6A8278" }}>
                      {isEnglish ? "Multipart Form-Data · Max 5MB" : "Support Form-Data multipart · Max 5 Mo"}
                    </p>
                  </div>
                )}

                <input 
                  id="edit-user-avatar-input"
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const previewUrl = URL.createObjectURL(file);
                      setEditUserForm({ ...editUserForm, avatarFile: file, avatarPreview: previewUrl, removeExistingAvatar: false });
                    }
                  }}
                />
              </div>

              {/* Identity & Contact Info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "First Name *" : "Prénom *"}</label>
                  <input 
                    type="text" 
                    required 
                    className="form-control" 
                    value={editUserForm.firstName} 
                    onChange={(e) => setEditUserForm({ ...editUserForm, firstName: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Last Name *" : "Nom *"}</label>
                  <input 
                    type="text" 
                    required 
                    className="form-control" 
                    value={editUserForm.lastName} 
                    onChange={(e) => setEditUserForm({ ...editUserForm, lastName: e.target.value })} 
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Email *" : "Email *"}</label>
                  <input 
                    type="email" 
                    required 
                    className="form-control" 
                    value={editUserForm.email} 
                    onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Phone" : "Téléphone"}</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    value={editUserForm.phone} 
                    onChange={(e) => setEditUserForm({ ...editUserForm, phone: e.target.value })} 
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "System Role" : "Rôle Système"}</label>
                  <select 
                    className="dedicated-select" 
                    style={{ width: "100%" }}
                    value={editUserForm.role} 
                    onChange={(e) => setEditUserForm({ ...editUserForm, role: e.target.value })}
                  >
                    <option value="president">Président (Direction)</option>
                    <option value="secretaire_general">Secrétaire général (Direction)</option>
                    <option value="tresorier">Trésorier (Direction)</option>
                    <option value="president_honneur">Président / Présidente d’honneur</option>
                    <option value="parrain">Parrain de la phase pilote</option>
                    <option value="marraine">Marraine</option>
                    <option value="conseiller">Conseiller / Conseillère</option>
                    <option value="ambassadeur">Ambassadeur / Ambassadrice</option>
                    <option value="member">Membre</option>
                    <option value="partner">Partenaire Institutionnel</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Category" : "Catégorie Répertoire"}</label>
                  <select 
                    className="dedicated-select" 
                    style={{ width: "100%" }}
                    value={editUserForm.category} 
                    onChange={(e) => setEditUserForm({ ...editUserForm, category: e.target.value })}
                  >
                    <option value="direction">Direction du Programme</option>
                    <option value="honneur">Présidence d'honneur</option>
                    <option value="parrainage">Parrain & Marraines</option>
                    <option value="conseil">Conseillers</option>
                    <option value="ambassadeur">Ambassadeurs</option>
                    <option value="partenaire">Partenaires</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Country" : "Pays"}</label>
                  <select 
                    className="dedicated-select" 
                    style={{ width: "100%" }}
                    value={editUserForm.country} 
                    onChange={(e) => setEditUserForm({ ...editUserForm, country: e.target.value })}
                  >
                    <option value="Cameroun">Cameroun</option>
                    <option value="RDC">RD Congo (RDC)</option>
                    <option value="Congo">République du Congo</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Afrique Centrale">Afrique Centrale (Régional)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Location / City" : "Ville / Localisation"}</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={editUserForm.location} 
                    onChange={(e) => setEditUserForm({ ...editUserForm, location: e.target.value })} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "LinkedIn Profile URL" : "Lien Profil LinkedIn"}</label>
                <input 
                  type="url" 
                  className="form-control" 
                  value={editUserForm.linkedin} 
                  onChange={(e) => setEditUserForm({ ...editUserForm, linkedin: e.target.value })} 
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Display Order" : "Ordre d'affichage"}</label>
                  <input 
                    type="number" 
                    min="1"
                    className="form-control" 
                    value={editUserForm.displayOrder} 
                    onChange={(e) => setEditUserForm({ ...editUserForm, displayOrder: e.target.value })} 
                    placeholder="1, 2, 3..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Photo Source / Credit" : "Source de la photo (Crédit)"}</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={editUserForm.photoSource} 
                    onChange={(e) => setEditUserForm({ ...editUserForm, photoSource: e.target.value })} 
                    placeholder="ex: Ministère de l'Europe et des Affaires étrangères _Sindbad Bonfanti"
                  />
                </div>
              </div>

              {/* Language Switcher Tabs */}
              <div className="modal-lang-tabs" style={{ marginTop: "1rem", marginBottom: "1.25rem" }}>
                <button
                  type="button"
                  className={`modal-lang-tab-btn ${editUserLangTab === "fr" ? "active" : ""}`}
                  onClick={() => setEditUserLangTab("fr")}
                >
                  🇫🇷 {isEnglish ? "French Profile (Required)" : "Profil Français (Obligatoire)"}
                </button>
                <button
                  type="button"
                  className={`modal-lang-tab-btn ${editUserLangTab === "en" ? "active" : ""}`}
                  onClick={() => setEditUserLangTab("en")}
                >
                  🇬🇧 {isEnglish ? "English Profile (Optional)" : "Profil Anglais (Optionnel)"} {editUserForm.metierEn ? "✓" : ""}
                </button>
              </div>

              {/* TAB FR */}
              {editUserLangTab === "fr" && (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Job / Title (French) *" : "Métier / Titre (Français) *"}</label>
                    <input 
                      type="text" 
                      required 
                      className="form-control" 
                      value={editUserForm.metier} 
                      onChange={(e) => setEditUserForm({ ...editUserForm, metier: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Pillar / Hub (French)" : "Pôle d'intervention (Français)"}</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editUserForm.pole} 
                      onChange={(e) => setEditUserForm({ ...editUserForm, pole: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Biography (French) *" : "Biographie détaillée (Français) *"}</label>
                    <textarea 
                      required 
                      rows={3} 
                      className="form-control" 
                      value={editUserForm.bibliographie} 
                      onChange={(e) => setEditUserForm({ ...editUserForm, bibliographie: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Mission & Advisory Role (French)" : "Mission & Rôle Consultatif (Français)"}</label>
                    <textarea 
                      rows={2} 
                      className="form-control" 
                      value={editUserForm.conseil} 
                      onChange={(e) => setEditUserForm({ ...editUserForm, conseil: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Deliverables & Contributions (French)" : "Réalisations & Contributions (Français)"}</label>
                    <textarea 
                      rows={2} 
                      className="form-control" 
                      value={editUserForm.contributions} 
                      onChange={(e) => setEditUserForm({ ...editUserForm, contributions: e.target.value })} 
                    />
                  </div>
                </>
              )}

              {/* TAB EN */}
              {editUserLangTab === "en" && (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Job / Title (English)" : "Métier / Titre (Anglais)"}</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editUserForm.metierEn} 
                      onChange={(e) => setEditUserForm({ ...editUserForm, metierEn: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Pillar / Hub (English)" : "Pôle d'intervention (Anglais)"}</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editUserForm.poleEn} 
                      onChange={(e) => setEditUserForm({ ...editUserForm, poleEn: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Biography (English)" : "Biographie (Anglais)"}</label>
                    <textarea 
                      rows={3} 
                      className="form-control" 
                      value={editUserForm.bibliographieEn} 
                      onChange={(e) => setEditUserForm({ ...editUserForm, bibliographieEn: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Mission & Advisory Role (English)" : "Mission & Rôle Consultatif (Anglais)"}</label>
                    <textarea 
                      rows={2} 
                      className="form-control" 
                      value={editUserForm.conseilEn} 
                      onChange={(e) => setEditUserForm({ ...editUserForm, conseilEn: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#13221B" }}>{isEnglish ? "Deliverables & Contributions (English)" : "Réalisations & Contributions (Anglais)"}</label>
                    <textarea 
                      rows={2} 
                      className="form-control" 
                      value={editUserForm.contributionsEn} 
                      onChange={(e) => setEditUserForm({ ...editUserForm, contributionsEn: e.target.value })} 
                    />
                  </div>
                </>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid #E5EBE7" }}>
                <button type="button" onClick={() => setEditUserOpen(false)} className="btn btn-outline-forest">
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

      {/* VIEW CONTACT / CANDIDATURE MODAL */}
      {viewContactOpen && selectedContactItem && (
        <div className="modal-overlay" onClick={() => setViewContactOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px", maxHeight: "90vh", overflowY: "auto" }}>
            <button 
              className="modal-close-btn" 
              onClick={() => setViewContactOpen(false)}
              aria-label={isEnglish ? "Close" : "Fermer"}
            >
              <X size={20} />
            </button>

            {/* Header badges */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                <span className={`badge ${selectedContactItem.type === "candidature" ? "badge-forest-light" : "badge-purple-light"}`}>
                  {selectedContactItem.type === "candidature" 
                    ? (isEnglish ? "📝 Network Application" : "📝 Candidature Réseau")
                    : (isEnglish ? "💬 Direct Inquiry" : "💬 Prise de Contact")}
                </span>
                {getContactStatusBadge(selectedContactItem)}
              </div>
              <span style={{ fontSize: "0.82rem", color: "#6A8278" }}>
                {new Date(selectedContactItem.createdAt || Date.now()).toLocaleDateString(isEnglish ? "en-US" : "fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </span>
            </div>

            {/* Applicant Summary Card */}
            <div style={{ background: "#F4F8F5", borderRadius: "12px", padding: "1.25rem", border: "1px solid #D9E3DE", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#13221B", margin: "0 0 0.5rem 0" }}>
                    {selectedContactItem.name}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.88rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2B4036" }}>
                      <Mail size={15} style={{ color: "#1E5128", flexShrink: 0 }} />
                      <a href={`mailto:${selectedContactItem.email}`} style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>
                        {selectedContactItem.email}
                      </a>
                    </div>
                    {selectedContactItem.phone && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2B4036" }}>
                        <Phone size={15} style={{ color: "#1E5128", flexShrink: 0 }} />
                        <a href={`tel:${selectedContactItem.phone}`} style={{ color: "#2B4036", textDecoration: "none" }}>
                          {selectedContactItem.phone}
                        </a>
                      </div>
                    )}
                    {selectedContactItem.structureName && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2B4036" }}>
                        <Building size={15} style={{ color: "#1E5128", flexShrink: 0 }} />
                        <span><strong>{isEnglish ? "Organization / Media" : "Structure / Média"}:</strong> {selectedContactItem.structureName}</span>
                      </div>
                    )}
                    {selectedContactItem.country && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2B4036" }}>
                        <Globe size={15} style={{ color: "#1E5128", flexShrink: 0 }} />
                        <span><strong>{isEnglish ? "Country" : "Pays"}:</strong> {selectedContactItem.country}</span>
                      </div>
                    )}
                    {selectedContactItem.category && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2B4036" }}>
                        <Tag size={15} style={{ color: "#1E5128", flexShrink: 0 }} />
                        <span><strong>{isEnglish ? "Category" : "Catégorie"}:</strong> {getContactCategoryLabel(selectedContactItem.category)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Subject and Message Content */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#4A6356", display: "block", marginBottom: "0.35rem" }}>
                {isEnglish ? "Subject" : "Objet du message"}
              </label>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#13221B", margin: "0 0 0.75rem 0" }}>
                {selectedContactItem.subject || (isEnglish ? "(No subject provided)" : "(Aucun objet)")}
              </h4>

              <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#4A6356", display: "block", marginBottom: "0.35rem" }}>
                {isEnglish ? "Message Content" : "Contenu de la demande / message"}
              </label>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #D9E3DE",
                borderRadius: "10px",
                padding: "1.1rem 1.25rem",
                color: "#13221B",
                fontSize: "0.92rem",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.02)"
              }}>
                {selectedContactItem.message}
              </div>
            </div>

            {/* Validation (Candidature) ou Traitement (Contact direct) */}
            {(() => {
              const isCandidature = selectedContactItem.type === "candidature";
              const isProcessed = selectedContactItem.status === "processed" || (!isCandidature && selectedContactItem.status === "validated");
              const isValidated = selectedContactItem.status === "validated";

              if (isCandidature) {
                return (
                  <div style={{
                    marginBottom: "1.5rem",
                    padding: "1.1rem 1.25rem",
                    borderRadius: "10px",
                    background: isValidated ? "#F0FDF4" : "#F4F8F5",
                    border: isValidated ? "1px solid #86EFAC" : "1px solid #D9E3DE"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: isValidated ? "#166534" : "#13221B", marginBottom: "0.2rem", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                          {isValidated ? (
                            <>
                              <CheckCircle size={18} style={{ color: "#16a34a" }} />
                              <span>{isEnglish ? "Candidature Validated" : "Candidature Validée"}</span>
                            </>
                          ) : (
                            <span>{isEnglish ? "Candidature Validation & Email Notification" : "Validation de la Candidature & Notification"}</span>
                          )}
                        </div>
                        <p style={{ fontSize: "0.82rem", color: isValidated ? "#15803d" : "#5A7367", margin: 0 }}>
                          {isValidated
                            ? (isEnglish 
                                ? "This application is officially validated. The confirmation email was automatically sent to the candidate."
                                : "Ce dossier est validé. L'email de confirmation a été automatiquement envoyé au candidat.")
                            : (isEnglish 
                                ? "Clicking validate will mark this submission as validated and immediately send the automated confirmation email."
                                : "Valider cette candidature enregistre le statut et transmet instantanément l'email de confirmation automatique.")}
                        </p>
                      </div>

                      {!isValidated ? (
                        <button
                          type="button"
                          onClick={() => handleValidateContact(selectedContactItem.id)}
                          disabled={isValidatingContact}
                          className="btn btn-forest"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.45rem",
                            padding: "0.6rem 1.25rem",
                            fontWeight: 700,
                            boxShadow: "0 2px 6px rgba(30,81,40,0.2)"
                          }}
                        >
                          {isValidatingContact ? (
                            <>
                              <span className="btn-spinner-ring" style={{ width: "15px", height: "15px", borderWidth: "2px", borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }}></span>
                              <span>{isEnglish ? "Validating..." : "Validation en cours..."}</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle size={16} />
                              <span>{isEnglish ? "Validate Candidature" : "Valider la candidature"}</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="badge badge-green-light" style={{ padding: "0.4rem 0.85rem", fontSize: "0.82rem", fontWeight: 700 }}>
                          ✓ {isEnglish ? "Confirmation Email Sent" : "Email envoyé automatiquement"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              }

              // Cas Contact Direct : Traitement sans validation de candidature ni email de validation
              return (
                <div style={{
                  marginBottom: "1.5rem",
                  padding: "1.1rem 1.25rem",
                  borderRadius: "10px",
                  background: isProcessed ? "#F0FDF4" : "#F4F8F5",
                  border: isProcessed ? "1px solid #86EFAC" : "1px solid #D9E3DE"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: isProcessed ? "#166534" : "#13221B", marginBottom: "0.2rem", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                        {isProcessed ? (
                          <>
                            <CheckCircle size={18} style={{ color: "#16a34a" }} />
                            <span>{isEnglish ? "Inquiry Processed" : "Prise de Contact Traitée"}</span>
                          </>
                        ) : (
                          <span>{isEnglish ? "Inquiry Processing & Follow-up" : "Traitement & Suivi du Message"}</span>
                        )}
                      </div>
                      <p style={{ fontSize: "0.82rem", color: isProcessed ? "#15803d" : "#5A7367", margin: 0 }}>
                        {isProcessed
                          ? (isEnglish 
                              ? "This inquiry has been marked as processed. Follow-up or response was completed."
                              : "Ce message a été marqué comme traité par l'équipe. Le suivi ou la réponse a été apporté.")
                          : (isEnglish 
                              ? "Mark this inquiry as processed once a response or action has been completed."
                              : "Marquez cette prise de contact comme traitée dès qu'une réponse ou un suivi a été réalisé.")}
                      </p>
                    </div>

                    {!isProcessed ? (
                      <button
                        type="button"
                        onClick={() => handleMarkContactProcessed(selectedContactItem.id, "processed")}
                        disabled={isValidatingContact}
                        className="btn btn-forest"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.45rem",
                          padding: "0.6rem 1.25rem",
                          fontWeight: 700,
                          boxShadow: "0 2px 6px rgba(30,81,40,0.2)"
                        }}
                      >
                        {isValidatingContact ? (
                          <>
                            <span className="btn-spinner-ring" style={{ width: "15px", height: "15px", borderWidth: "2px", borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }}></span>
                            <span>{isEnglish ? "Updating..." : "Mise à jour..."}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle size={16} />
                            <span>{isEnglish ? "Mark as Processed" : "Marquer comme traité"}</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span className="badge badge-green-light" style={{ padding: "0.4rem 0.85rem", fontSize: "0.82rem", fontWeight: 700 }}>
                          ✓ {isEnglish ? "Processed" : "Traité"}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleMarkContactProcessed(selectedContactItem.id, "read")}
                          disabled={isValidatingContact}
                          style={{
                            padding: "0.35rem 0.75rem",
                            borderRadius: "6px",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            border: "1px solid #D9E3DE",
                            background: "#FFFFFF",
                            color: "#4A6356",
                            cursor: "pointer"
                          }}
                          title={isEnglish ? "Unmark as processed" : "Annuler le marquage"}
                        >
                          {isEnglish ? "Reopen" : "Rouvrir"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Internal Admin Notes */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#4A6356" }}>
                  📌 {isEnglish ? "Internal Notes (Admin Only)" : "Notes internes (Visibles uniquement par l'équipe)"}
                </label>
                {selectedContactItem.adminNotes && (
                  <span style={{ fontSize: "0.74rem", color: "#059669", fontWeight: 600 }}>
                    ✓ {isEnglish ? "Note recorded" : "Note enregistrée"}
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                className="form-control"
                placeholder={isEnglish ? "Add private notes on this applicant, interviews, evaluation or decision..." : "Ajouter des notes privées sur ce candidat, compte-rendu d'évaluation ou décision..."}
                value={adminNotesDraft}
                onChange={(e) => setAdminNotesDraft(e.target.value)}
                style={{ fontSize: "0.88rem" }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => handleSaveContactNotes(selectedContactItem.id)}
                  disabled={isSavingContactNotes || adminNotesDraft === (selectedContactItem.adminNotes || "")}
                  className="btn btn-outline-forest"
                  style={{ fontSize: "0.8rem", padding: "0.35rem 0.85rem" }}
                >
                  {isSavingContactNotes ? (
                    <span>{isEnglish ? "Saving..." : "Enregistrement..."}</span>
                  ) : (
                    <span>{isEnglish ? "Save Notes" : "Enregistrer la note"}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E5EBE7", paddingTop: "1.25rem", marginTop: "1rem" }}>
              <button
                type="button"
                onClick={() => handleDeleteContact(selectedContactItem)}
                className="btn btn-outline-danger"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "#DC2626", borderColor: "#FCA5A5" }}
              >
                <Trash2 size={15} />
                <span>{isEnglish ? "Delete Inquiry" : "Supprimer"}</span>
              </button>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setViewContactOpen(false)}
                  className="btn btn-forest"
                >
                  {isEnglish ? "Close" : "Fermer"}
                </button>
              </div>
            </div>
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
      {/* MODALE : ÉDITION DES INDICATEURS HERO DU SITE PUBLIC */}
      {metricsModalOpen && (
        <div className="modal-overlay" onClick={() => setMetricsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
            <button
              type="button"
              onClick={() => setMetricsModalOpen(false)}
              className="modal-close-btn"
              aria-label={isEnglish ? "Close" : "Fermer"}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", fontWeight: 800, color: "#13221B", marginBottom: "0.4rem" }}>
              {isEnglish ? "Edit Hero Impact Metrics" : "Modifier les Indicateurs d'Impact (Hero)"}
            </h3>
            <p style={{ color: "#5A7367", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
              {isEnglish 
                ? "Update the numbers and titles queried by the API and displayed in the hero metrics grid."
                : "Mettez à jour les chiffres et intitulés diffusés par l'API dans le hero du site public."}
            </p>

            {/* Bilingual Tab Switcher */}
            <div className="modal-lang-tabs" style={{ marginBottom: "1.25rem" }}>
              <button 
                type="button" 
                className={`modal-lang-tab-btn ${metricsFormLangTab === "fr" ? "active" : ""}`}
                onClick={() => setMetricsFormLangTab("fr")}
              >
                <span>🇫🇷</span>
                <span>{isEnglish ? "French Version (FR)" : "Version Française (FR)"}</span>
              </button>
              <button 
                type="button" 
                className={`modal-lang-tab-btn ${metricsFormLangTab === "en" ? "active" : ""}`}
                onClick={() => setMetricsFormLangTab("en")}
              >
                <span>🇬🇧</span>
                <span>{isEnglish ? "English Version (EN)" : "Version Anglaise (EN)"}</span>
              </button>
            </div>

            <form onSubmit={handleSaveHeroMetrics}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* 1. Jeunes formés directement */}
                <div style={{ background: "#F8FAF9", padding: "1.1rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label className="form-label" style={{ fontWeight: 700, margin: 0, color: "#13221B" }}>
                      1. {isEnglish ? "Directly Trained Youth" : "Jeunes Formés Directement"}
                    </label>
                    <span style={{ fontSize: "0.75rem", color: "#6A8278", background: "#E8F0EB", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                      {isEnglish ? "Standard (e.g. 20 000)" : "Format standard (ex: 20 000)"}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "0.85rem" }}>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#4A6356", display: "block", marginBottom: "0.3rem", fontWeight: 600 }}>
                        {isEnglish ? "Number (value) *" : "Chiffre (valeur) *"}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={metricsForm.journalistesCibles}
                        onChange={(e) => setMetricsForm({ ...metricsForm, journalistesCibles: Number(e.target.value) })}
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#4A6356", display: "block", marginBottom: "0.3rem", fontWeight: 600 }}>
                        {metricsFormLangTab === "fr" ? "Intitulé (FR) *" : "Label (EN) *"}
                      </label>
                      {metricsFormLangTab === "fr" ? (
                        <input
                          type="text"
                          value={metricsForm.labelYouthFr || ""}
                          onChange={(e) => setMetricsForm({ ...metricsForm, labelYouthFr: e.target.value })}
                          className="form-control"
                          placeholder="Jeunes formés directement"
                          required
                        />
                      ) : (
                        <input
                          type="text"
                          value={metricsForm.labelYouthEn || ""}
                          onChange={(e) => setMetricsForm({ ...metricsForm, labelYouthEn: e.target.value })}
                          className="form-control"
                          placeholder="Young people trained directly"
                          required
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Structures accompagnées */}
                <div style={{ background: "#F8FAF9", padding: "1.1rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label className="form-label" style={{ fontWeight: 700, margin: 0, color: "#13221B" }}>
                      2. {isEnglish ? "Supported Organizations" : "Structures Accompagnées"}
                    </label>
                    <span style={{ fontSize: "0.75rem", color: "#6A8278", background: "#E8F0EB", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                      {isEnglish ? "Suffix '+' auto (e.g. 300+)" : "Suffixe '+' auto (ex: 300+)"}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "0.85rem" }}>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#4A6356", display: "block", marginBottom: "0.3rem", fontWeight: 600 }}>
                        {isEnglish ? "Number (value) *" : "Chiffre (valeur) *"}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={metricsForm.structuresPartenaires}
                        onChange={(e) => setMetricsForm({ ...metricsForm, structuresPartenaires: Number(e.target.value) })}
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#4A6356", display: "block", marginBottom: "0.3rem", fontWeight: 600 }}>
                        {metricsFormLangTab === "fr" ? "Intitulé (FR) *" : "Label (EN) *"}
                      </label>
                      {metricsFormLangTab === "fr" ? (
                        <input
                          type="text"
                          value={metricsForm.labelPartnersFr || ""}
                          onChange={(e) => setMetricsForm({ ...metricsForm, labelPartnersFr: e.target.value })}
                          className="form-control"
                          placeholder="Structures accompagnées"
                          required
                        />
                      ) : (
                        <input
                          type="text"
                          value={metricsForm.labelPartnersEn || ""}
                          onChange={(e) => setMetricsForm({ ...metricsForm, labelPartnersEn: e.target.value })}
                          className="form-control"
                          placeholder="Organisations receiving support"
                          required
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Pays à terme */}
                <div style={{ background: "#F8FAF9", padding: "1.1rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label className="form-label" style={{ fontWeight: 700, margin: 0, color: "#13221B" }}>
                      3. {isEnglish ? "Target Countries" : "Pays à Terme"}
                    </label>
                    <span style={{ fontSize: "0.75rem", color: "#6A8278", background: "#E8F0EB", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                      {isEnglish ? "Target scope (e.g. 6)" : "Objectif à terme (ex: 6)"}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "0.85rem" }}>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#4A6356", display: "block", marginBottom: "0.3rem", fontWeight: 600 }}>
                        {isEnglish ? "Number (value) *" : "Chiffre (valeur) *"}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={metricsForm.regionsCameroun}
                        onChange={(e) => setMetricsForm({ ...metricsForm, regionsCameroun: Number(e.target.value) })}
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#4A6356", display: "block", marginBottom: "0.3rem", fontWeight: 600 }}>
                        {metricsFormLangTab === "fr" ? "Intitulé (FR) *" : "Label (EN) *"}
                      </label>
                      {metricsFormLangTab === "fr" ? (
                        <input
                          type="text"
                          value={metricsForm.labelRegionsFr || ""}
                          onChange={(e) => setMetricsForm({ ...metricsForm, labelRegionsFr: e.target.value })}
                          className="form-control"
                          placeholder="Pays à terme"
                          required
                        />
                      ) : (
                        <input
                          type="text"
                          value={metricsForm.labelRegionsEn || ""}
                          onChange={(e) => setMetricsForm({ ...metricsForm, labelRegionsEn: e.target.value })}
                          className="form-control"
                          placeholder="Target countries"
                          required
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. Personnes sensibilisées */}
                <div style={{ background: "#F8FAF9", padding: "1.1rem", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label className="form-label" style={{ fontWeight: 700, margin: 0, color: "#13221B" }}>
                      4. {isEnglish ? "People Sensitized" : "Personnes Sensibilisées"}
                    </label>
                    <span style={{ fontSize: "0.75rem", color: "#6A8278", background: "#E8F0EB", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                      {isEnglish ? "Suffix 'M+' auto (e.g. 9 M+)" : "Suffixe 'M+' auto (ex: 9 M+)"}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "0.85rem" }}>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#4A6356", display: "block", marginBottom: "0.3rem", fontWeight: 600 }}>
                        {isEnglish ? "Number (value) *" : "Chiffre (valeur) *"}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={metricsForm.paysAfriqueCentrale}
                        onChange={(e) => setMetricsForm({ ...metricsForm, paysAfriqueCentrale: Number(e.target.value) })}
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#4A6356", display: "block", marginBottom: "0.3rem", fontWeight: 600 }}>
                        {metricsFormLangTab === "fr" ? "Intitulé (FR) *" : "Label (EN) *"}
                      </label>
                      {metricsFormLangTab === "fr" ? (
                        <input
                          type="text"
                          value={metricsForm.labelCountriesFr || ""}
                          onChange={(e) => setMetricsForm({ ...metricsForm, labelCountriesFr: e.target.value })}
                          className="form-control"
                          placeholder="Personnes sensibilisées"
                          required
                        />
                      ) : (
                        <input
                          type="text"
                          value={metricsForm.labelCountriesEn || ""}
                          onChange={(e) => setMetricsForm({ ...metricsForm, labelCountriesEn: e.target.value })}
                          className="form-control"
                          placeholder="People sensitized"
                          required
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid #E5EBE7" }}>
                <button
                  type="button"
                  onClick={() => setMetricsModalOpen(false)}
                  disabled={isSavingMetrics}
                  className="btn btn-outline-forest"
                >
                  {isEnglish ? "Cancel" : "Annuler"}
                </button>
                <button
                  type="submit"
                  disabled={isSavingMetrics}
                  className="btn btn-forest"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}
                >
                  {isSavingMetrics ? (
                    <>
                      <span className="btn-spinner-ring" style={{ width: "15px", height: "15px", borderWidth: "2px", borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }}></span>
                      <span>{isEnglish ? "Saving..." : "Enregistrement..."}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      <span>{isEnglish ? "Save Impact Metrics" : "Enregistrer les modifications"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
