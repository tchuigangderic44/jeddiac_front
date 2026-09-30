import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, Globe, ArrowRight } from "lucide-react";
import { api } from "../services/api";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Demande d'information générale",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.submitContact(formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Demande d'information générale",
        message: "",
      });
    } catch (err) {
      setError(err.message || "Erreur lors de l'envoi du message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-editorial-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag-pill">
            <MessageSquare size={16} />
            <span>Coordination & Relations Partenaires</span>
          </div>
          <h2 className="section-title-editorial">
            Écrivez à la Coordination <span className="text-highlight-green">JEDDIAC</span>
          </h2>
          <p className="section-subtitle-editorial">
            Une question sur la phase pilote, une proposition de mentorat ou une démarche de partenariat ? Notre équipe vous répond sous 48 heures.
          </p>
        </div>

        <div className="contact-editorial-grid">
          {/* Left Column: Direct Info Card */}
          <div className="contact-info-card">
            <div>
              <span className="badge badge-green-light" style={{ marginBottom: "1.2rem" }}>
                Pôle Administratif & Technique
              </span>
              <h3 className="contact-info-title">Secrétariat Général du Programme</h3>
              <p className="contact-info-desc">
                Basée à Yaoundé avec des relais régionaux à Douala, Libreville, Brazzaville et Kinshasa, la coordination JEDDIAC pilote le déploiement sur les 10 régions du Cameroun et les pays du Bassin du Congo.
              </p>

              <div className="contact-details-list">
                <div className="contact-item">
                  <div className="contact-icon-bubble">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Siège de la Coordination</span>
                    <strong className="contact-value">Yaoundé, Cameroun · Bassin du Congo</strong>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-bubble">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Courriel Officiel</span>
                    <strong className="contact-value">contact@jeddiac.org / jeddiac.contact@gmail.com</strong>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-bubble">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Permanence Téléphonique</span>
                    <strong className="contact-value">+237 670 00 00 00 / +237 690 00 00 00</strong>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-bubble">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Disponibilité</span>
                    <strong className="contact-value">Du Lundi au Vendredi : 08h30 – 17h30 (GMT+1)</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-info-footer">
              <div className="contact-partner-callout">
                <strong>Revue AFRIVE</strong>
                <span>Partenaire éditorial international & mentorat journalistique.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Card */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="form-success-box">
                <CheckCircle2 size={48} className="success-icon" />
                <h3>Message transmis avec succès !</h3>
                <p>
                  Merci pour votre prise de contact. Un membre de la coordination examinera votre demande et vous répondra dans les meilleurs délais.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-forest"
                  style={{ marginTop: "1.5rem" }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-card-title">Formulaire de Contact Direct</h3>

                {error && (
                  <div className="form-error-alert">
                    {error}
                  </div>
                )}

                <div className="form-row-two-col">
                  <div className="form-group">
                    <label className="form-label">Nom et Prénom *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Samuel Eto'o"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-control-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Adresse Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="votre.email@domaine.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-control-input"
                    />
                  </div>
                </div>

                <div className="form-row-two-col">
                  <div className="form-group">
                    <label className="form-label">Téléphone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+237 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-control-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Objet de la démarche *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-control-input"
                    >
                      <option value="Demande d'information générale">Information générale</option>
                      <option value="Candidature d'un Club Média Scolaire">Candidature d'un club scolaire</option>
                      <option value="Partenariat Radio Communautaire">Partenariat radio communautaire</option>
                      <option value="Proposition de Mentorat Journalistique">Proposition de mentorat</option>
                      <option value="Partenariat Institutionnel / Bailleurs">Partenariat institutionnel / Bailleurs</option>
                      <option value="Autre">Autre demande</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Votre message ou projet *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Précisez votre établissement, votre région d'attache et vos attentes..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-control-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-forest"
                  style={{ width: "100%", justifyContent: "center", padding: "1rem" }}
                >
                  {submitting ? (
                    <span>Transmission en cours...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
