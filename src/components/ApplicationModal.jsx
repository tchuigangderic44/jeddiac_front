import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, Send, Trees } from "lucide-react";
import { api } from "../services/api";

export default function ApplicationModal({ isOpen, onClose, prefilledSubject }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "club_presse",
    country: "Cameroun",
    structureName: "",
    message: prefilledSubject ? ("Candidature pour : " + prefilledSubject) : "",
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
      const fullMessage = "Catégorie : " + formData.category + "\n" +
                          "Structure : " + (formData.structureName || "N/A") + "\n" +
                          "Pays : " + formData.country + "\n\n" +
                          "Motivation :\n" + formData.message;

      await api.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: "[CANDIDATURE - " + formData.category.toUpperCase() + "] " + (formData.structureName || formData.name) + " (" + formData.country + ")",
        message: fullMessage,
      });

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Impossible de soumettre votre candidature. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card application-modal-card" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn" aria-label="Fermer">
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
              Candidature Transmise avec Succès !
            </h3>

            <p style={{ color: "#4F675D", fontSize: "1.05rem", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto 2rem" }}>
              Merci pour votre engagement. L'équipe de coordination régionale de <strong>JEDDIAC</strong> examinera votre dossier et prendra contact avec vous sous 48 heures.
            </p>

            <button 
              onClick={() => { setSuccess(false); onClose(); }}
              className="btn btn-forest"
            >
              Retour au site
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
              <span className="badge badge-green-light">
                <Sparkles size={14} />
                Appel à Candidatures · Réseau JEDDIAC
              </span>
            </div>

            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#13221B", marginBottom: "0.6rem" }}>
              Rejoindre le Réseau des Jeunes Médias
            </h3>

            <p style={{ color: "#4F675D", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.8rem" }}>
              Que vous soyez un club journal scolaire, une radio communautaire, un étudiant en journalisme ou une association, intégrez le réseau pour bénéficier de formations et de dotations techniques.
            </p>

            {error && (
              <div style={{ padding: "0.9rem", background: "#FEF2F2", border: "1px solid #F87171", borderRadius: "var(--radius-md)", color: "#991B1B", fontSize: "0.9rem", marginBottom: "1.2rem" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>Nom complet ou Référent *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Ex: Paul Mbarga"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>Email professionnel ou contact *</label>
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
                  <label className="form-label" style={{ color: "#13221B" }}>Téléphone / WhatsApp *</label>
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
                  <label className="form-label" style={{ color: "#13221B" }}>Pays de rattachement *</label>
                  <select
                    className="form-control"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    <option value="Cameroun">Cameroun (Phase Pilote)</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Congo">Congo-Brazzaville</option>
                    <option value="RDC">RD Congo</option>
                    <option value="RCA">République Centrafricaine</option>
                    <option value="Tchad">Tchad</option>
                    <option value="Autre">Autre pays</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>Typologie de structure *</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="club_presse">Club Journal / Radio Scolaire</option>
                    <option value="radio_communautaire">Radio Communautaire / Associative</option>
                    <option value="etudiant_journalisme">Étudiant en Journalisme / Université</option>
                    <option value="jeune_reporter">Jeune Reporter Indépendant</option>
                    <option value="association">Association de Jeunesse Écologique</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: "#13221B" }}>Nom de l'établissement / Club</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: Lycée de Biyem-Assi"
                    value={formData.structureName}
                    onChange={(e) => setFormData({ ...formData, structureName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: "#13221B" }}>Vos motivations & projets *</label>
                <textarea
                  rows={4}
                  required
                  className="form-control"
                  placeholder="Décrivez vos activités médiatiques actuelles, vos besoins en formation ou matériel..."
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
                  <span>Envoi de la candidature...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Soumettre ma candidature</span>
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
