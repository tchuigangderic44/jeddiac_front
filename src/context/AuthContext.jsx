
import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("jeddiac_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("jeddiac_token") || null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("jeddiac_token", token);
    } else {
      localStorage.removeItem("jeddiac_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("jeddiac_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("jeddiac_user");
    }
  }, [user]);

  const loginAdmin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.adminLogin(email, password);
      if (res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        return { success: true };
      }
      throw new Error("Identifiants invalides");
    } catch (err) {
      setError(err.message || "Erreur de connexion");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.userLogin(email, password);
      if (res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        return { success: true };
      }
      throw new Error("Identifiants invalides");
    } catch (err) {
      setError(err.message || "Erreur de connexion");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jeddiac_token");
    localStorage.removeItem("jeddiac_user");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin,
        loading,
        error,
        loginAdmin,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
