
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getMediaUrl = (pathOrUrl) => {
  if (!pathOrUrl) return "";
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://") || pathOrUrl.startsWith("data:")) {
    return pathOrUrl;
  }
  const cleanBase = API_BASE_URL.replace(/\/$/, "");
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${cleanBase}${cleanPath}`;
};

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });
    
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = typeof data.message === "object" 
        ? data.message.fr || data.message.en 
        : data.message || `Erreur ${res.status}`;
      throw new Error(msg);
    }
    return data;
  } catch (err) {
    console.warn(`API request failed on ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Public
  getOverviewStats: () => request("/overview-stats"),
  getArticles: (params = "") => request(`/articles${params}`),
  getArticleDetails: (idOrSlug) => request(`/articles/${idOrSlug}`),
  getNews: (params = "") => request(`/news${params}`),
  getNewsDetails: (idOrSlug) => request(`/news/${idOrSlug}`),
  getAgendas: (params = "") => request(`/agenda${params}`),
  getAgendaDetails: (idOrSlug) => request(`/agenda/${idOrSlug}`),
  getMissions: () => request("/missions"),
  getMembers: () => request("/members"),
  
  // Interactions
  submitContact: (payload) => request("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  subscribeNewsletter: (email) => request("/newsletter/subscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  }),
  registerMember: (payload) => request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  }),

  // Auth
  adminLogin: (email, password) => request("/auth/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }),
  userLogin: (email, password) => request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }),

  // Admin Management
  getAdminStats: (token) => request("/admin/stats", { token }),
  
  // Admin Articles
  getAdminArticles: (token, params = "") => request(`/admin/articles${params}`, { token }),
  createArticle: (token, payload) => request("/admin/articles", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  }),
  updateArticle: (token, id, payload) => request(`/admin/articles/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(payload),
  }),
  deleteArticle: (token, id) => request(`/admin/articles/${id}`, {
    method: "DELETE",
    token,
  }),
  suspendArticle: (token, id) => request(`/admin/articles/${id}/suspend`, {
    method: "PATCH",
    token,
  }),
  reactivateArticle: (token, id) => request(`/admin/articles/${id}/reactivate`, {
    method: "PATCH",
    token,
  }),

  // Admin News
  getAdminNews: (token, params = "") => request(`/admin/news${params}`, { token }),
  createNews: (token, payload) => {
    const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
    return request("/admin/news", {
      method: "POST",
      token,
      body: isFormData ? payload : JSON.stringify(payload),
    });
  },
  updateNews: (token, id, payload) => {
    const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
    return request(`/admin/news/${id}`, {
      method: "PUT",
      token,
      body: isFormData ? payload : JSON.stringify(payload),
    });
  },
  deleteNews: (token, id) => request(`/admin/news/${id}`, {
    method: "DELETE",
    token,
  }),
  getAdminNewsDetails: (token, id) => request(`/admin/news/${id}`, { token }),
  suspendNews: (token, id) => request(`/admin/news/${id}/suspend`, {
    method: "PATCH",
    token,
  }),
  reactivateNews: (token, id) => request(`/admin/news/${id}/reactivate`, {
    method: "PATCH",
    token,
  }),
  deactivateNews: (token, id) => request(`/admin/news/${id}/deactivate`, {
    method: "PATCH",
    token,
  }),
  activateNews: (token, id) => request(`/admin/news/${id}/activate`, {
    method: "PATCH",
    token,
  }),

  // Admin Agenda
  getAdminAgendas: (token, params = "") => request(`/admin/agenda${params}`, { token }),
  createAgenda: (token, payload) => request("/admin/agenda", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  }),
  deleteAgenda: (token, id) => request(`/admin/agenda/${id}`, {
    method: "DELETE",
    token,
  }),

  // Admin Contacts
  getAdminContacts: (token, params = "") => request(`/admin/contacts${params}`, { token }),
  markContactRead: (token, id) => request(`/admin/contacts/${id}/read`, {
    method: "PATCH",
    token,
  }),
  deleteContact: (token, id) => request(`/admin/contacts/${id}`, {
    method: "DELETE",
    token,
  }),

  // Admin Newsletter
  getAdminNewsletters: (token, params = "") => request(`/admin/newsletter${params}`, { token }),
  deleteNewsletter: (token, id) => request(`/admin/newsletter/${id}`, {
    method: "DELETE",
    token,
  }),

  // Admin Users
  getAdminUsers: (token, params = "") => request(`/admin/users${params}`, { token }),
  activateUser: (token, id) => request(`/admin/users/${id}/activate`, {
    method: "PATCH",
    token,
  }),
  deactivateUser: (token, id) => request(`/admin/users/${id}/deactivate`, {
    method: "PATCH",
    token,
  }),
  deleteUser: (token, id) => request(`/admin/users/${id}`, {
    method: "DELETE",
    token,
  }),
};
