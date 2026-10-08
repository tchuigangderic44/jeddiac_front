import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, Globe, ArrowRight } from "lucide-react";
import { api } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

export default function ContactSection() {
  const { isEnglish } = useLanguage();
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
      await api.submitContact({
        ...formData,
        type: "contact",
        category: formData.subject.toLowerCase().includes("partenariat") 
          ? "partenariat" 
          : formData.subject.toLowerCase().includes("mentorat") 
          ? "mentorat" 
          : "information"
      });
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: isEnglish ? "General inquiry" : "Demande d'information générale",
        message: "",
      });
    } catch (err) {
      setError(
        err.message || 
        (isEnglish 
          ? "Error submitting your message. Please try again." 
          : "Erreur lors de l'envoi du message.")
      );
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
            <span>{isEnglish ? "Coordination & Partner Relations" : "Coordination & Relations Partenaires"}</span>
          </div>
          <h2 className="section-title-editorial">
            {isEnglish ? "Write to the " : "Écrivez à la Coordination "}
            <span className="text-highlight-green">JEDDIAC</span>
            {isEnglish ? " Coordination" : ""}
          </h2>
          <p className="section-subtitle-editorial">
            {isEnglish 
              ? "A question about the pilot phase, a mentoring proposal or a partnership inquiry? Our team responds within 48 hours."
              : "Une question sur la phase pilote, une proposition de mentorat ou une démarche de partenariat ? Notre équipe vous répond sous 48 heures."}
          </p>
        </div>

        <div className="contact-editorial-grid">
          {/* Left Column: Direct Info Card */}
          <div className="contact-info-card">
            <div>
              <span className="badge badge-green-light" style={{ marginBottom: "1.2rem" }}>
                {isEnglish ? "Administrative & Technical Hub" : "Pôle Administratif & Technique"}
              </span>
              <h3 className="contact-info-title">
                {isEnglish ? "Programme General Secretariat" : "Secrétariat Général du Programme"}
              </h3>
              <p className="contact-info-desc">
                {isEnglish 
                  ? "Headquartered in Yaoundé with regional focal points in Douala, Libreville, Brazzaville and Kinshasa, JEDDIAC coordination steers deployment across 10 regions of Cameroon and Congo Basin countries."
                  : "Basée à Yaoundé avec des relais régionaux à Douala, Libreville, Brazzaville et Kinshasa, la coordination JEDDIAC pilote le déploiement sur les 10 régions du Cameroun et les pays du Bassin du Congo."}
              </p>

              <div className="contact-details-list">
                <div className="contact-item">
                  <div className="contact-icon-bubble">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="contact-label">{isEnglish ? "Headquarters" : "Siège de la Coordination"}</span>
                    <strong className="contact-value">Yaoundé, Cameroun · Bassin du Congo</strong>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-bubble">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="contact-label">{isEnglish ? "Official Email" : "Courriel Officiel"}</span>
                    <strong className="contact-value">contact@jeddiac.org</strong>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-bubble">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="contact-label">{isEnglish ? "Phone Line" : "Permanence Téléphonique"}</span>
                    <strong className="contact-value">+33 651 159 013</strong>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-bubble">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="contact-label">{isEnglish ? "Availability" : "Disponibilité"}</span>
                    <strong className="contact-value">
                      {isEnglish ? "Monday to Friday: 08:30 AM – 05:30 PM (GMT+1)" : "Du Lundi au Vendredi : 08h30 – 17h30 (GMT+1)"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-info-footer">
              <div className="contact-partner-callout">
                <strong>Revue AFRIVE</strong>
                <span>{isEnglish ? "International editorial partner & journalistic mentorship." : "Partenaire éditorial international & mentorat journalistique."}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Card */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="form-success-box">
                <CheckCircle2 size={48} className="success-icon" />
                <h3>{isEnglish ? "Message Successfully Sent!" : "Message transmis avec succès !"}</h3>
                <p>
                  {isEnglish 
                    ? "Thank you for reaching out. A coordination representative will review your inquiry and get back to you promptly."
                    : "Merci pour votre prise de contact. Un membre de la coordination examinera votre demande et vous répondra dans les meilleurs délais."}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-forest"
                  style={{ marginTop: "1.5rem" }}
                >
                  {isEnglish ? "Send Another Message" : "Envoyer un autre message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-card-title">
                  {isEnglish ? "Direct Contact Form" : "Formulaire de Contact Direct"}
                </h3>

                {error && (
                  <div className="form-error-alert">
                    {error}
                  </div>
                )}

                <div className="form-row-two-col">
                  <div className="form-group">
                    <label className="form-label">{isEnglish ? "Full Name *" : "Nom et Prénom *"}</label>
                    <input
                      type="text"
                      required
                      placeholder={isEnglish ? "e.g. Samuel Lobe" : "Ex: Samuel Lobe"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-control-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{isEnglish ? "Email Address *" : "Adresse Email *"}</label>
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
                    <label className="form-label">{isEnglish ? "Phone / WhatsApp" : "Téléphone / WhatsApp"}</label>
                    <input
                      type="tel"
                      placeholder="+237 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-control-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{isEnglish ? "Inquiry Subject *" : "Objet de la démarche *"}</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-control-input"
                    >
                      <option value="Demande d'information générale">
                        {isEnglish ? "General Information" : "Information générale"}
                      </option>
                      <option value="Renseignement pour Club Média Scolaire">
                        {isEnglish ? "School Media Club Inquiry" : "Renseignement pour club scolaire"}
                      </option>
                      <option value="Partenariat Radio Communautaire">
                        {isEnglish ? "Community Radio Partnership" : "Partenariat radio communautaire"}
                      </option>
                      <option value="Proposition de Mentorat Journalistique">
                        {isEnglish ? "Journalistic Mentorship Proposal" : "Proposition de mentorat"}
                      </option>
                      <option value="Partenariat Institutionnel / Bailleurs">
                        {isEnglish ? "Institutional / Donor Partnership" : "Partenariat institutionnel / Bailleurs"}
                      </option>
                      <option value="Autre">
                        {isEnglish ? "Other Inquiry" : "Autre demande"}
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{isEnglish ? "Your Message or Proposal *" : "Votre message ou projet *"}</label>
                  <textarea
                    rows={5}
                    required
                    placeholder={
                      isEnglish 
                        ? "Specify your institution, region and expectations..." 
                        : "Précisez votre établissement, votre région d'attache et vos attentes..."
                    }
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
                    <span>{isEnglish ? "Sending message..." : "Transmission en cours..."}</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>{isEnglish ? "Send Message" : "Envoyer le message"}</span>
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
