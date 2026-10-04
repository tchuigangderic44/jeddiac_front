import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, Send, Trees, Globe, MapPin, Building, Phone, Mail, User } from "lucide-react";
import { api } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

export default function ApplicationModal({ isOpen, onClose, prefilledSubject }) {
  const { isEnglish } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "club_presse",
    country: "Cameroun",
    structureName: "",
    message: prefilledSubject 
      ? (isEnglish ? `Application for: ${prefilledSubject}` : `Candidature pour : ${prefilledSubject}`) 
      : "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const subject = `[${isEnglish ? "APPLICATION" : "CANDIDATURE"} - ${formData.category.toUpperCase()}] ${formData.structureName || formData.name} (${formData.country})`;

      await api.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject,
        message: formData.message,
        type: "candidature",
        category: formData.category,
        country: formData.country,
        structureName: formData.structureName || ""
      });

      setSuccess(true);
    } catch (err) {
      setError(
        err.message || 
        (isEnglish 
          ? "Unable to submit your application. Please try again." 
          : "Impossible de soumettre votre candidature. Veuillez réessayer.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card application-modal-card" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn" aria-label={isEnglish ? "Close" : "Fermer"}>
          <X size={20} />
        </button>

        {success ? (
          <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
            <div style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#E8F5EF",
              border: "2px solid #1B7354",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              color: "#1B7354"
            }}>
              <CheckCircle2 size={42} />
            </div>

            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#13221B", marginBottom: "0.8rem" }}>
              {isEnglish ? "Application Successfully Transmitted!" : "Candidature Transmise avec Succès !"}
            </h3>

            <p style={{ color: "#4F675D", fontSize: "1.05rem", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto 2rem" }}>
              {isEnglish 
                ? "Thank you for your engagement. The JEDDIAC regional coordination team will review your application dossier and reach out within 48 hours."
                : "Merci pour votre engagement. L'équipe de coordination régionale de JEDDIAC examinera votre dossier et prendra contact avec vous sous 48 heures."}
            </p>

            <button 
              onClick={() => { setSuccess(false); onClose(); }}
              className="btn btn-forest"
            >
              {isEnglish ? "Back to Site" : "Retour au site"}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
              <span className="badge badge-green-light">
                <Sparkles size={14} />
                {isEnglish ? "Call for Applications · JEDDIAC Network" : "Appel à Candidatures · Réseau JEDDIAC"}
              </span>
            </div>

            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#13221B", marginBottom: "0.6rem" }}>
              {isEnglish ? "Join the Youth Media Network" : "Rejoindre le Réseau des Jeunes Médias"}
            </h3>

            <p style={{ color: "#4F675D", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.8rem" }}>
              {isEnglish 
                ? "Whether you are a school press club, a community radio station, a journalism student or a youth ecological association, integrate the network to receive trainings, mentoring and mobile kits."
                : "Que vous soyez un club journal scolaire, une radio communautaire, un étudiant en journalisme ou une association, intégrez le réseau pour bénéficier de formations et de dotations techniques."}
            </p>

            {error && (
              <div style={{ padding: "0.9rem", background: "#FEF2F2", border: "1px solid #F87171", borderRadius: "var(--radius-md)", color: "#991B1B", fontSize: "0.9rem", marginBottom: "1.2rem" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>
                    {isEnglish ? "Full Name or Lead Contact *" : "Nom complet ou Référent *"}
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder={isEnglish ? "e.g. Paul Mbarga" : "Ex: Paul Mbarga"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>
                    {isEnglish ? "Professional or Contact Email *" : "Email professionnel ou contact *"}
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="contact@exemple.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>
                    {isEnglish ? "Phone / WhatsApp *" : "Téléphone / WhatsApp *"}
                  </label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="+237 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>
                    {isEnglish ? "Country / Territory *" : "Pays de rattachement *"}
                  </label>
                  <select
                    className="form-control"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    <option value="Cameroun">{isEnglish ? "Cameroon (Pilot Phase)" : "Cameroun (Phase Pilote)"}</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Congo">Congo-Brazzaville</option>
                    <option value="RDC">{isEnglish ? "DR Congo" : "RD Congo"}</option>
                    <option value="RCA">{isEnglish ? "Central African Republic" : "République Centrafricaine"}</option>
                    <option value="Tchad">{isEnglish ? "Chad" : "Tchad"}</option>
                    <option value="Autre">{isEnglish ? "Other Territory" : "Autre pays"}</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>
                    {isEnglish ? "Structure Category *" : "Typologie de structure *"}
                  </label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="club_presse">{isEnglish ? "School Press / Radio Club" : "Club Journal / Radio Scolaire"}</option>
                    <option value="radio_communautaire">{isEnglish ? "Community Radio / Station" : "Radio Communautaire / Associative"}</option>
                    <option value="etudiant_journalisme">{isEnglish ? "Journalism Student / University" : "Étudiant en Journalisme / Université"}</option>
                    <option value="jeune_reporter">{isEnglish ? "Independent Young Reporter" : "Jeune Reporter Indépendant"}</option>
                    <option value="association">{isEnglish ? "Youth Ecological Association" : "Association de Jeunesse Écologique"}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>
                    {isEnglish ? "Institution / Structure Name" : "Nom de l'établissement / Club"}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={isEnglish ? "e.g. Biyem-Assi High School" : "Ex: Lycée de Biyem-Assi"}
                    value={formData.structureName}
                    onChange={(e) => setFormData({ ...formData, structureName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>
                  {isEnglish ? "Your Motivations & Projects *" : "Vos motivations & projets *"}
                </label>
                <textarea
                  rows={4}
                  required
                  className="form-control"
                  placeholder={
                    isEnglish
                      ? "Describe your current media activities, training needs or equipment objectives..."
                      : "Décrivez vos activités médiatiques actuelles, vos besoins en formation ou matériel..."
                  }
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-forest"
                style={{ width: "100%", justifyContent: "center", padding: "1rem" }}
              >
                {submitting ? (
                  <span>{isEnglish ? "Submitting application..." : "Envoi de la candidature..."}</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>{isEnglish ? "Submit My Application" : "Soumettre ma candidature"}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
