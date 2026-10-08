
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getMediaUrl = (pathOrUrl) => {
  if (!pathOrUrl) return "";
  if (
    pathOrUrl.startsWith("http://") || 
    pathOrUrl.startsWith("https://") || 
    pathOrUrl.startsWith("data:") ||
    pathOrUrl.startsWith("blob:")
  ) {
    return pathOrUrl;
  }
  // Local static audio in frontend public folder
  if (pathOrUrl.startsWith("/audio/")) {
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
  getNews: (params = "") => request(`/news${params}`),
  getNewsDetails: (idOrSlug) => request(`/news/${idOrSlug}`),
  getAgendas: (params = "") => request(`/agenda${params}`),
  getAgendaDetails: (idOrSlug) => request(`/agenda/${idOrSlug}`),
  getMembers: (params = "?limit=100") => {
    let query = "?limit=100";
    if (typeof params === "string") {
      query = params ? (params.startsWith("?") ? params : `?${params}`) : "?limit=100";
    } else if (params && typeof params === "object") {
      const sp = new URLSearchParams();
      if (!("limit" in params)) sp.append("limit", "100");
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) sp.append(k, String(v));
      });
      query = `?${sp.toString()}`;
    }
    return request(`/members${query}`);
  },
  getPodcastDetails: (idOrSlug) => request(`/podcasts/${idOrSlug}`),
  
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
  updateOverviewStats: (token, payload) => request("/admin/overview-stats", {
    method: "PUT",
    token,
    body: JSON.stringify(payload),
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
  getAdminAgendaDetails: (token, id) => request(`/admin/agenda/${id}`, { token }),
  createAgenda: (token, payload) => request("/admin/agenda", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  }),
  updateAgenda: (token, id, payload) => request(`/admin/agenda/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(payload),
  }),
  deleteAgenda: (token, id) => request(`/admin/agenda/${id}`, {
    method: "DELETE",
    token,
  }),
  suspendAgenda: (token, id) => request(`/admin/agenda/${id}/suspend`, {
    method: "PATCH",
    token,
  }),
  reactivateAgenda: (token, id) => request(`/admin/agenda/${id}/reactivate`, {
    method: "PATCH",
    token,
  }),

  // Admin Contacts
  getAdminContacts: (token, params = "") => request(`/admin/contacts${params}`, { token }),
  getAdminContactDetails: (token, id) => request(`/admin/contacts/${id}`, { token }),
  updateContactStatus: (token, id, payload) => request(`/admin/contacts/${id}/status`, {
    method: "PATCH",
    token,
    body: JSON.stringify(payload),
  }),
  markContactRead: (token, id) => request(`/admin/contacts/${id}`, { token }),
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

  // Admin Podcasts
  getAdminPodcasts: (token, params = "") => request(`/admin/podcasts${params}`, { token }),
  createPodcast: (token, payload) => {
    const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
    return request("/admin/podcasts", {
      method: "POST",
      token,
      body: isFormData ? payload : JSON.stringify(payload),
    });
  },
  updatePodcast: (token, id, payload) => {
    const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
    return request(`/admin/podcasts/${id}`, {
      method: "PUT",
      token,
      body: isFormData ? payload : JSON.stringify(payload),
    });
  },
  deletePodcast: (token, id) => request(`/admin/podcasts/${id}`, {
    method: "DELETE",
    token,
  }),
  getAdminPodcastDetails: (token, id) => request(`/admin/podcasts/${id}`, { token }),
  suspendPodcast: (token, id) => request(`/admin/podcasts/${id}/suspend`, {
    method: "PATCH",
    token,
  }),
  reactivatePodcast: (token, id) => request(`/admin/podcasts/${id}/reactivate`, {
    method: "PATCH",
    token,
  }),
  deactivatePodcast: (token, id) => request(`/admin/podcasts/${id}/deactivate`, {
    method: "PATCH",
    token,
  }),
  activatePodcast: (token, id) => request(`/admin/podcasts/${id}/activate`, {
    method: "PATCH",
    token,
  }),

  // Admin Users
  getAdminUsers: (token, params = "") => request(`/admin/users${params}`, { token }),
  createUser: (token, payload) => {
    const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
    return request("/admin/users", {
      method: "POST",
      token,
      body: isFormData ? payload : JSON.stringify(payload),
    });
  },
  updateUser: (token, id, payload) => {
    const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
    return request(`/admin/users/${id}`, {
      method: "PUT",
      token,
      body: isFormData ? payload : JSON.stringify(payload),
    });
  },
  getAdminUserDetails: (token, id) => request(`/admin/users/${id}`, { token }),
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
