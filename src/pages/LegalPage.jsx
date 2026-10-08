import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  ShieldCheck, 
  FileText, 
  Building2, 
  UserCheck, 
  Server, 
  Lock, 
  Scale, 
  Mail, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink,
  Cookie,
  Users,
  Eye,
  Calendar,
  Printer
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LegalPage({ onBackToHome, initialTab = "mentions" }) {
  const { isEnglish, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(initialTab); // "mentions" | "confidentialite"

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="dedicated-page-wrapper legal-page-wrapper">
      {/* Header */}
      <div className="dedicated-page-header">
        <div className="container">
          <div className="dedicated-header-top-bar">
            <button 
              onClick={onBackToHome} 
              className="btn btn-header-back"
              aria-label={t("backToHome")}
              title={t("backToHome")}
            >
              <ArrowLeft size={18} />
              <span>{t("backToHome")}</span>
            </button>

            <div className="legal-header-actions">
              <button 
                onClick={handlePrint}
                className="btn-print-legal"
                title={isEnglish ? "Print document" : "Imprimer le document"}
              >
                <Printer size={16} />
                <span>{isEnglish ? "Print" : "Imprimer"}</span>
              </button>
            </div>
          </div>

          <div className="legal-title-section">
            <div className="legal-badge-pill">
              <Scale size={15} />
              <span>{isEnglish ? "Legal Framework & Compliance" : "Cadre Réglementaire & Conformité"}</span>
            </div>

            <h1 className="dedicated-page-title">
              {activeTab === "mentions" ? (
                <>
                  {isEnglish ? "Legal Notice & " : "Mentions Légales & "}
                  <span className="text-highlight-green">
                    {isEnglish ? "Identification" : "Éditeur Officiel"}
                  </span>
                </>
              ) : (
                <>
                  {isEnglish ? "Privacy & " : "Politique de Confidentialité & "}
                  <span className="text-highlight-green">
                    {isEnglish ? "Data Protection" : "Protection des Données"}
                  </span>
                </>
              )}
            </h1>

            <p className="dedicated-page-subtitle">
              {activeTab === "mentions" 
                ? (isEnglish 
                    ? "Statutory legal information, publishing director, hosting provider, and intellectual property terms for the JEDDIAC official platform."
                    : "Informations légales, identification de l'éditeur, direction de la publication, hébergement et propriété intellectuelle de la plateforme officielle JEDDIAC.")
                : (isEnglish 
                    ? "Commitment to personal data protection, transparency, RGPD compliance, and rights management for the JEDDIAC regional initiative."
                    : "Engagement de transparence, conformité RGPD, gestion des cookies et respect des droits des personnes pour le programme régional JEDDIAC.")
              }
            </p>

            <div className="legal-last-updated-row">
              <Calendar size={14} />
              <span>{isEnglish ? "Last updated: October 7, 2026" : "Dernière mise à jour : 7 octobre 2026"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="container dedicated-page-content legal-content-container">
        {/* Navigation Tabs */}
        <div className="legal-tabs-bar">
          <button
            onClick={() => {
              setActiveTab("mentions");
              window.location.hash = "#mentions-legales";
            }}
            className={`legal-tab-btn ${activeTab === "mentions" ? "active" : ""}`}
          >
            <FileText size={18} />
            <span>{isEnglish ? "Legal Notice" : "Mentions Légales"}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("confidentialite");
              window.location.hash = "#politique-de-confidentialite";
            }}
            className={`legal-tab-btn ${activeTab === "confidentialite" ? "active" : ""}`}
          >
            <ShieldCheck size={18} />
            <span>{isEnglish ? "Privacy Policy (RGPD)" : "Politique de Confidentialité (RGPD)"}</span>
          </button>
        </div>

        {/* Tab 1: MENTIONS LÉGALES */}
        {activeTab === "mentions" && (
          <div className="legal-article-card">
            {/* Quick Summary Cards */}
            <div className="legal-kpi-cards-grid">
              <div className="legal-kpi-card">
                <div className="legal-kpi-icon">
                  <Building2 size={20} />
                </div>
                <div>
                  <span className="legal-kpi-lbl">{isEnglish ? "Publisher" : "Éditeur du site"}</span>
                  <strong className="legal-kpi-val">JEDDIAC (Loi 1901)</strong>
                  <span className="legal-kpi-sub">RNA : W941021545</span>
                </div>
              </div>

              <div className="legal-kpi-card">
                <div className="legal-kpi-icon">
                  <UserCheck size={20} />
                </div>
                <div>
                  <span className="legal-kpi-lbl">{isEnglish ? "Publication Director" : "Directeur de Publication"}</span>
                  <strong className="legal-kpi-val">Jean Marie Kenfack Tasanou</strong>
                  <span className="legal-kpi-sub">{isEnglish ? "President of JEDDIAC" : "Président de JEDDIAC"}</span>
                </div>
              </div>

              <div className="legal-kpi-card">
                <div className="legal-kpi-icon">
                  <Server size={20} />
                </div>
                <div>
                  <span className="legal-kpi-lbl">{isEnglish ? "Hosting Provider" : "Hébergement"}</span>
                  <strong className="legal-kpi-val">PlanetHoster</strong>
                  <span className="legal-kpi-sub">Puteaux, France</span>
                </div>
              </div>
            </div>

            {/* Document Body */}
            <div className="legal-prose-body">
              <section className="legal-section-block">
                <h3>1. {isEnglish ? "Site Publisher" : "Éditeur du site"}</h3>
                <p>
                  {isEnglish 
                    ? "The website accessible at https://jeddiac.org/ is published by:"
                    : "Le présent site internet, accessible à l’adresse https://jeddiac.org/, est édité par :"}
                </p>
                <div className="legal-highlight-box">
                  <p><strong>JEDDIAC – Jeunesse Engagée pour la Durabilité, le Développement et l’Information en Afrique centrale</strong></p>
                  <p>{isEnglish ? "Non-profit association governed by the French law of July 1, 1901." : "Association régie par la loi du 1er juillet 1901."}</p>
                  <p><strong>{isEnglish ? "Headquarters:" : "Siège social :"}</strong> 66 bis, avenue Maurice Thorez, 94200 Ivry-sur-Seine, France</p>
                  <p><strong>{isEnglish ? "Official E-mail:" : "E-mail :"}</strong> <a href="mailto:contact@jeddiac.org">contact@jeddiac.org</a></p>
                  <p><strong>{isEnglish ? "Phone line:" : "Téléphone :"}</strong> {isEnglish ? "Not disclosed" : "non communiqué"}</p>
                  <p><strong>{isEnglish ? "RNA Number:" : "N° RNA :"}</strong> W941021545</p>
                  <p><strong>{isEnglish ? "SIREN / SIRET Numbers:" : "N° SIREN/SIRET :"}</strong> SIREN : 109 807 354 – SIRET : 109 807 354 00013</p>
                </div>
              </section>

              <section className="legal-section-block">
                <h3>2. {isEnglish ? "Purpose of the Association" : "Objet de l’association"}</h3>
                <p>
                  {isEnglish
                    ? "JEDDIAC aims to contribute to the mobilization, information, and civic engagement of youth towards sustainable development, environmental protection, education, citizenship, and development across Central Africa."
                    : "JEDDIAC a pour objet de contribuer à la mobilisation, à l’information et à l’engagement des jeunes en faveur du développement durable, de la protection de l’environnement, de l’éducation, de la citoyenneté et du développement en Afrique centrale."}
                </p>
                <p>
                  {isEnglish
                    ? "As part of its pilot deployment phase in Cameroon, JEDDIAC carries out informational, awareness, training, and mobilization initiatives for youth through schools, universities, radios, media outlets, and community organizations."
                    : "Dans le cadre de sa phase pilote au Cameroun, JEDDIAC développe notamment des actions d’information, de sensibilisation, de formation et de mobilisation des jeunes à travers les médias, les établissements scolaires, les universités, les radios et les structures communautaires."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>3. {isEnglish ? "Publication Director" : "Directeur de la publication"}</h3>
                <p>
                  {isEnglish ? "The publication director of the website is:" : "Le directeur de la publication du site est :"}
                </p>
                <p><strong>Jean Marie Kenfack Tasanou</strong>, {isEnglish ? "President of JEDDIAC." : "Président de JEDDIAC."}</p>
              </section>

              <section className="legal-section-block">
                <h3>4. {isEnglish ? "Editorial Responsibility" : "Responsable éditorial"}</h3>
                <p>
                  {isEnglish
                    ? "Editorial responsibility for published content belongs to JEDDIAC, under the authority of its legal representative and the editorial team designated by the association."
                    : "La responsabilité éditoriale des contenus publiés sur le site relève de JEDDIAC, sous la responsabilité de son représentant légal et de l’équipe éditoriale désignée par l’association."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>5. {isEnglish ? "Hosting Provider" : "Hébergement"}</h3>
                <p>
                  {isEnglish ? "The website jeddiac.org is hosted by:" : "Le site jeddiac.org est hébergé par :"}
                </p>
                <div className="legal-highlight-box">
                  <p><strong>PlanetHoster</strong></p>
                  <p>5-7 Rue Bellini, 92800 Puteaux, France</p>
                  <p><strong>{isEnglish ? "Telephone:" : "Téléphone :"}</strong> +33 (0)1 76 60 41 43</p>
                  <p><strong>{isEnglish ? "Website:" : "Site web :"}</strong> <a href="https://www.planethoster.fr/" target="_blank" rel="noopener noreferrer">https://www.planethoster.fr/</a></p>
                </div>
              </section>

              <section className="legal-section-block">
                <h3>6. {isEnglish ? "Intellectual Property" : "Propriété intellectuelle"}</h3>
                <p>
                  {isEnglish
                    ? "All elements presented on the site, including texts, articles, photographs, illustrations, logos, graphics, videos, documents, and editorial content, are protected by intellectual property laws."
                    : "L’ensemble des éléments présents sur le site, notamment les textes, articles, photographies, illustrations, logos, éléments graphiques, vidéos, documents et contenus éditoriaux, est protégé par les dispositions relatives à la propriété intellectuelle."}
                </p>
                <p>
                  {isEnglish
                    ? "Unless stated otherwise, these contents are the property of JEDDIAC or used with explicit permission of their right holders."
                    : "Sauf mention contraire, ces contenus sont la propriété de JEDDIAC ou sont utilisés avec l’autorisation de leurs titulaires de droits."}
                </p>
                <p>
                  {isEnglish
                    ? "Any total or partial reproduction, modification, distribution, or exploitation without prior authorization from JEDDIAC or relevant right holders constitutes an infringement punishable by law."
                    : "Toute reproduction, représentation, modification, adaptation, publication, distribution ou exploitation, totale ou partielle, des contenus du site, par quelque procédé que ce soit, sans autorisation préalable de JEDDIAC ou du titulaire des droits concernés, est susceptible de constituer une contrefaçon."}
                </p>
                <p>
                  {isEnglish
                    ? "Short quotes are allowed under legal fair use conditions, provided the source and authors are credited explicitly."
                    : "Les contenus peuvent être cités ou repris dans les conditions prévues par la législation applicable, sous réserve de mentionner clairement leur source et de respecter les droits des auteurs et titulaires de droits."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>7. {isEnglish ? "Photographs and Image Rights" : "Photographies et droit à l’image"}</h3>
                <p>
                  {isEnglish
                    ? "Photographs and audiovisual materials published on the platform are used with respect to the moral rights of portrayed persons and authors."
                    : "Les photographies et contenus audiovisuels publiés sur le site sont utilisés dans le respect, autant que possible, des droits des personnes représentées et des droits des auteurs."}
                </p>
                <p>
                  {isEnglish
                    ? "Whenever an individual is identifiable, JEDDIAC ensures the necessary consent has been acquired when required by law."
                    : "Lorsqu'une photographie représente des personnes identifiables, JEDDIAC veille à disposer des autorisations nécessaires lorsque celles-ci sont requises."}
                </p>
                <p>
                  {isEnglish
                    ? "Any individual who believes an image or document infringes their privacy or image rights may contact JEDDIAC at contact@jeddiac.org for immediate examination and, where appropriate, removal."
                    : "Toute personne estimant qu’une photographie ou un contenu publié porte atteinte à ses droits peut contacter JEDDIAC afin de demander son examen et, le cas échéant, son retrait : <a href='mailto:contact@jeddiac.org'>contact@jeddiac.org</a>."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>8. {isEnglish ? "Liability & Hyperlinks" : "Responsabilité"}</h3>
                <p>
                  {isEnglish
                    ? "JEDDIAC strives to provide accurate, accessible, and regularly updated information on this platform. However, the association cannot guarantee the absolute completeness or total absence of inadvertent errors."
                    : "JEDDIAC s’efforce de fournir sur son site des informations exactes, accessibles et régulièrement actualisées. Toutefois, l’association ne saurait garantir l’exhaustivité, l’exactitude ou l’absence d’erreur de l’ensemble des informations publiées."}
                </p>
                <p>
                  {isEnglish
                    ? "JEDDIAC cannot be held responsible for direct or indirect consequences resulting from the interpretation or use of information available on the site."
                    : "JEDDIAC ne peut être tenue responsable des conséquences résultant de l’utilisation des informations disponibles sur le site."}
                </p>
                <p>
                  {isEnglish
                    ? "External hyperlinks are provided for informative purposes. JEDDIAC exercises no control over third-party websites and assumes no liability for their contents or availability."
                    : "Les liens hypertextes pouvant être proposés vers des sites ou services tiers sont fournis à titre informatif. JEDDIAC n’exerce aucun contrôle permanent sur ces sites et ne saurait être tenue responsable de leur contenu, de leur disponibilité ou de leurs pratiques."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>9. {isEnglish ? "Personal Data Protection" : "Données personnelles"}</h3>
                <p>
                  {isEnglish
                    ? "JEDDIAC attaches paramount importance to privacy protection. Personal data collected through this platform is processed in compliance with the General Data Protection Regulation (EU 2016/679) and French data protection legislation."
                    : "JEDDIAC accorde une importance particulière à la protection des données personnelles. Les données éventuellement collectées par l’intermédiaire du site sont traitées conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés."}
                </p>
                <p>
                  {isEnglish
                    ? "Detailed collection, retention, and rights exercise policies are specified in our "
                    : "Les modalités de collecte, d’utilisation, de conservation et d’exercice des droits sont détaillées dans notre "}
                  <button 
                    onClick={() => setActiveTab("confidentialite")}
                    className="legal-inline-link-btn"
                  >
                    {isEnglish ? "Privacy & Personal Data Protection Policy" : "Politique de confidentialité et de protection des données personnelles"}
                  </button>.
                </p>
              </section>

              <section className="legal-section-block">
                <h3>10. {isEnglish ? "Cookies & Trackers" : "Cookies"}</h3>
                <p>
                  {isEnglish
                    ? "The site may use cookies strictly necessary for its proper technical operation, audience measurement, or enhanced user experience."
                    : "Le site peut utiliser des cookies ou autres traceurs nécessaires à son fonctionnement, à la mesure d’audience ou à l’amélioration de l’expérience utilisateur."}
                </p>
                <p>
                  {isEnglish
                    ? "Where legally required, non-essential cookies require user consent. Details are available in the Privacy Policy section."
                    : "Lorsque la réglementation l’exige, le dépôt de cookies soumis au consentement de l’utilisateur est conditionné à son accord. Les modalités relatives aux cookies sont précisées dans la Politique de confidentialité du site."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>11. {isEnglish ? "Applicable Law & Jurisdiction" : "Droit applicable"}</h3>
                <p>
                  {isEnglish
                    ? "This website and its legal terms are governed by French law. In case of any dispute or claim, users are invited to contact JEDDIAC amicably at:"
                    : "Le présent site et ses mentions légales sont soumis au droit français. En cas de difficulté ou de réclamation concernant le fonctionnement du site, les utilisateurs sont invités à contacter préalablement JEDDIAC à l’adresse suivante :"}
                </p>
                <p className="legal-contact-callout">
                  <Mail size={16} />
                  <a href="mailto:contact@jeddiac.org"><strong>contact@jeddiac.org</strong></a>
                </p>
              </section>
            </div>
          </div>
        )}

        {/* Tab 2: POLITIQUE DE CONFIDENTIALITÉ */}
        {activeTab === "confidentialite" && (
          <div className="legal-article-card">
            {/* Quick Principles Banner */}
            <div className="legal-principles-banner">
              <div className="legal-principles-icon">
                <Lock size={22} />
              </div>
              <div>
                <h4>{isEnglish ? "Commitment to RGPD & Data Minimization" : "Engagement de Conformité RGPD & Minimisation des Données"}</h4>
                <p>
                  {isEnglish
                    ? "In accordance with European Regulation (EU) 2016/679 (RGPD) and the French Data Protection Act, JEDDIAC collects strictly only the data necessary for its non-profit educational and journalistic missions."
                    : "Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés modifiée, JEDDIAC n'effectue aucun commerce de données et applique rigoureusement le principe de minimisation recommandé par la CNIL."}
                </p>
              </div>
            </div>

            {/* Document Body */}
            <div className="legal-prose-body">
              <div className="legal-preamble-box">
                <p>
                  {isEnglish
                    ? "JEDDIAC – Jeunesse Engagée pour la Durabilité, le Développement et l’Information en Afrique centrale pays utmost attention to the protection of personal data of website visitors, members, volunteers, partners, beneficiaries, activity participants, and anyone contacting the organization."
                    : "JEDDIAC – Jeunesse Engagée pour la Durabilité, le Développement et l’Information en Afrique centrale accorde une importance particulière à la protection des données personnelles des visiteurs de son site, de ses membres, bénévoles, partenaires, bénéficiaires, participants à ses activités et de toute personne entrant en contact avec l’association."}
                </p>
                <p>
                  {isEnglish
                    ? "This policy explains which data may be collected, for what purposes, on what legal bases, and what rights belong to the individuals concerned."
                    : "La présente politique explique quelles données peuvent être collectées, pour quelles finalités, sur quelles bases juridiques et quels sont les droits des personnes concernées."}
                </p>
              </div>

              <section className="legal-section-block">
                <h3>1. {isEnglish ? "Data Controller" : "Responsable du traitement"}</h3>
                <p>
                  {isEnglish 
                    ? "The data controller for processing carried out within JEDDIAC activities is:"
                    : "Le responsable des traitements de données personnelles réalisés dans le cadre des activités de JEDDIAC est :"}
                </p>
                <div className="legal-highlight-box">
                  <p><strong>JEDDIAC – Jeunesse Engagée pour la Durabilité, le Développement et l’Information en Afrique centrale</strong></p>
                  <p>{isEnglish ? "Association governed by the French law of July 1, 1901." : "Association régie par la loi du 1er juillet 1901."}</p>
                  <p><strong>{isEnglish ? "Headquarters:" : "Siège social :"}</strong> 66 bis, avenue Maurice Thorez, 94200 Ivry-sur-Seine, France</p>
                  <p><strong>{isEnglish ? "Contact:" : "E-mail :"}</strong> <a href="mailto:contact@jeddiac.org">contact@jeddiac.org</a></p>
                </div>
              </section>

              <section className="legal-section-block">
                <h3>2. {isEnglish ? "Data Likely to be Collected" : "Données susceptibles d’être collectées"}</h3>
                <p>
                  {isEnglish
                    ? "Depending on the nature of your interaction with JEDDIAC, the data collected may include:"
                    : "Selon la nature de votre interaction avec JEDDIAC, les données susceptibles d’être collectées peuvent notamment comprendre :"}
                </p>
                <ul className="legal-bullet-list">
                  <li><strong>{isEnglish ? "Full Name:" : "Nom et prénom"}</strong></li>
                  <li><strong>{isEnglish ? "Email address:" : "Adresse e-mail"}</strong></li>
                  <li><strong>{isEnglish ? "Phone number:" : "Numéro de téléphone"}</strong></li>
                  <li><strong>{isEnglish ? "Role or Organization:" : "Fonction ou organisme"}</strong></li>
                  <li><strong>{isEnglish ? "Country or Geographic Area:" : "Pays ou zone géographique"}</strong></li>
                  <li><strong>{isEnglish ? "Activity Information:" : "Informations relatives à la participation à une activité, formation, rencontre ou événement"}</strong></li>
                  <li><strong>{isEnglish ? "Voluntarily Communicated Information:" : "Informations communiquées volontairement dans un formulaire ou par e-mail"}</strong></li>
                  <li><strong>{isEnglish ? "Photos & Videos:" : "Photographies ou vidéos réalisées dans le cadre des activités de l’association, lorsque leur utilisation est autorisée"}</strong></li>
                  <li><strong>{isEnglish ? "Technical Navigation Data:" : "Données techniques liées à la navigation sur le site"}</strong> ({isEnglish ? "IP address, browser type, device used, visit metrics" : "adresse IP, type de navigateur, terminal utilisé et informations relatives à la consultation"}).</li>
                </ul>
                <div className="legal-tip-box">
                  <CheckCircle2 size={16} />
                  <span>
                    {isEnglish
                      ? "JEDDIAC applies the minimization principle: only strictly necessary data is collected, in line with CNIL recommendations for non-profit entities."
                      : "JEDDIAC applique le principe de minimisation : seules les données nécessaires à la finalité poursuivie sont collectées, conformément aux recommandations de la CNIL pour les associations."}
                  </span>
                </div>
              </section>

              <section className="legal-section-block">
                <h3>3. {isEnglish ? "Purposes of Processing" : "Finalités des traitements"}</h3>
                <p>
                  {isEnglish ? "Personal data may be processed for:" : "Les données personnelles peuvent être utilisées notamment pour :"}
                </p>
                <ul className="legal-bullet-list">
                  <li>{isEnglish ? "Responding to inquiries submitted to JEDDIAC;" : "répondre aux demandes adressées à JEDDIAC ;"}</li>
                  <li>{isEnglish ? "Managing contacts and correspondence with the association;" : "gérer les prises de contact avec l’association ;"}</li>
                  <li>{isEnglish ? "Managing memberships, applications, and activity registrations;" : "gérer les adhésions, participations et inscriptions aux activités ;"}</li>
                  <li>{isEnglish ? "Organizing workshops, masterclasses, forums, and regional meetings;" : "organiser les formations, ateliers, rencontres et événements ;"}</li>
                  <li>{isEnglish ? "Monitoring program participants and beneficiaries;" : "assurer le suivi des participants et bénéficiaires des programmes ;"}</li>
                  <li>{isEnglish ? "Communicating with members, volunteers, partners, and participants;" : "communiquer avec les membres, bénévoles, partenaires et participants ;"}</li>
                  <li>{isEnglish ? "Sending information on JEDDIAC activities when consented to or authorized;" : "envoyer, lorsque la personne y a consenti ou lorsque la réglementation le permet, des informations relatives aux activités de JEDDIAC ;"}</li>
                  <li>{isEnglish ? "Ensuring security and proper operation of the website;" : "assurer la sécurité et le bon fonctionnement du site ;"}</li>
                  <li>{isEnglish ? "Measuring and analyzing website traffic where applicable;" : "mesurer et analyser la fréquentation du site, lorsque cela est applicable ;"}</li>
                  <li>{isEnglish ? "Managing administrative and associative obligations;" : "assurer la gestion administrative et associative de JEDDIAC ;"}</li>
                  <li>{isEnglish ? "Complying with statutory legal requirements." : "respecter les obligations légales auxquelles l’association peut être soumise."}</li>
                </ul>
                <p>
                  {isEnglish
                    ? "Data is never used for purposes incompatible with the original reasons for collection."
                    : "Les données ne sont pas utilisées à des fins incompatibles avec les finalités pour lesquelles elles ont été collectées."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>4. {isEnglish ? "Legal Grounds for Processing" : "Bases légales des traitements"}</h3>
                <p>
                  {isEnglish
                    ? "Depending on the processing involved, JEDDIAC relies on grounds recognized under the RGPD:"
                    : "Selon le traitement concerné, JEDDIAC s’appuie sur différentes bases juridiques prévues par le RGPD, notamment :"}
                </p>
                <ul className="legal-bullet-list">
                  <li><strong>{isEnglish ? "Consent:" : "Le consentement :"}</strong> {isEnglish ? "when the individual gave explicit consent for a determined use." : "lorsque la personne a donné son accord pour une utilisation déterminée de ses données."}</li>
                  <li><strong>{isEnglish ? "Contract or Relationship Execution:" : "L’exécution d’un engagement ou d’une relation :"}</strong> {isEnglish ? "necessary to manage membership, registration, or interaction with JEDDIAC." : "lorsque le traitement est nécessaire à la gestion d’une adhésion, d’une inscription, d’une participation à une activité ou d’une relation avec JEDDIAC."}</li>
                  <li><strong>{isEnglish ? "Legitimate Interest:" : "L’intérêt légitime :"}</strong> {isEnglish ? "necessary for legitimate associative missions while respecting individuals' rights and freedoms." : "lorsque le traitement est nécessaire à certaines activités légitimes de l’association, sous réserve du respect des droits et libertés des personnes."}</li>
                  <li><strong>{isEnglish ? "Legal Obligation:" : "L’obligation légale :"}</strong> {isEnglish ? "when required by administrative, tax, or statutory laws." : "lorsque JEDDIAC doit traiter certaines données afin de respecter une obligation prévue par la loi."}</li>
                </ul>
              </section>

              <section className="legal-section-block">
                <h3>5. {isEnglish ? "Data Recipients" : "Destinataires des données"}</h3>
                <p>
                  {isEnglish
                    ? "Personal data is intended primarily for authorized members and staff of JEDDIAC who require access in the exercise of their duties."
                    : "Les données personnelles sont destinées en priorité aux personnes habilitées au sein de JEDDIAC qui ont besoin d’y accéder dans le cadre de leurs fonctions."}
                </p>
                <p>
                  {isEnglish
                    ? "Data may also be transmitted where necessary to technical service providers acting on behalf of the association, specifically for:"
                    : "Elles peuvent également être communiquées, lorsque cela est nécessaire, à des prestataires techniques intervenant pour le compte de l’association, notamment pour :"}
                </p>
                <ul className="legal-bullet-list">
                  <li>{isEnglish ? "Website hosting (PlanetHoster);" : "l’hébergement du site (PlanetHoster) ;"}</li>
                  <li>{isEnglish ? "IT maintenance and security;" : "la maintenance informatique ;"}</li>
                  <li>{isEnglish ? "Email dispatch and newsletters;" : "l’envoi d’e-mails ou de newsletters ;"}</li>
                  <li>{isEnglish ? "Event logistics and management;" : "l’organisation d’événements ;"}</li>
                  <li>{isEnglish ? "Digital collaborative tools;" : "la gestion d’outils numériques ;"}</li>
                  <li>{isEnglish ? "Audience measurement." : "la mesure d’audience."}</li>
                </ul>
                <div className="legal-tip-box">
                  <CheckCircle2 size={16} />
                  <span>
                    <strong>{isEnglish ? "Strict Non-Commercial Guarantee: " : "Garantie absolue : "}</strong>
                    {isEnglish ? "JEDDIAC never sells, rents, or monetizes personal data to third parties." : "JEDDIAC ne vend pas et ne commercialise aucune donnée personnelle."}
                  </span>
                </div>
              </section>

              <section className="legal-section-block">
                <h3>6. {isEnglish ? "Data Transfers Outside the European Union" : "Transferts de données hors de l’Union européenne"}</h3>
                <p>
                  {isEnglish
                    ? "When third-party providers or tools imply data transfers outside the European Union or the European Economic Area, JEDDIAC ensures the transfer complies with RGPD standards, including appropriate security safeguards."
                    : "Lorsque certains prestataires ou services utilisés par JEDDIAC impliquent un transfert de données personnelles vers un pays situé hors de l’Union européenne ou de l’Espace économique européen, JEDDIAC veille à ce que ce transfert soit effectué conformément aux exigences du RGPD. Les garanties appropriées sont mises en place lorsque cela est nécessaire."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>7. {isEnglish ? "Data Retention Periods" : "Durée de conservation"}</h3>
                <p>
                  {isEnglish
                    ? "JEDDIAC keeps personal data for a duration proportionate to the purpose of collection:"
                    : "JEDDIAC conserve les données personnelles pendant une durée proportionnée à la finalité pour laquelle elles ont été collectées :"}
                </p>
                <ul className="legal-bullet-list">
                  <li><strong>{isEnglish ? "Contact requests:" : "Demandes de contact :"}</strong> {isEnglish ? "kept for the time required to handle the inquiry and follow-up." : "conservées pendant le temps nécessaire à leur traitement et au suivi de la relation ;"}</li>
                  <li><strong>{isEnglish ? "Members and participants:" : "Membres, bénévoles et participants :"}</strong> {isEnglish ? "kept for the duration of the relationship and statutory retention requirements." : "conservées pendant la durée nécessaire à la gestion de la relation ;"}</li>
                  <li><strong>{isEnglish ? "Newsletter subscriptions:" : "Envoi d'informations et newsletters :"}</strong> {isEnglish ? "kept until consent is withdrawn or unsubscribe requested." : "conservées jusqu’au retrait du consentement ou à la demande de désinscription ;"}</li>
                  <li><strong>{isEnglish ? "Legal Defense & Statutory Obligations:" : "Obligations légales :"}</strong> {isEnglish ? "kept where required by law or for legal defense." : "conservées plus longtemps lorsqu’une obligation légale l’impose ou pour la défense des droits de l’association."}</li>
                </ul>
              </section>

              <section className="legal-section-block">
                <h3>8. {isEnglish ? "Photos, Videos and Image Rights" : "Photographies, vidéos et droit à l’image"}</h3>
                <p>
                  {isEnglish
                    ? "Within its educational and regional activities, JEDDIAC creates photos and videos to document and highlight actions on the ground."
                    : "Dans le cadre de ses activités, JEDDIAC peut réaliser ou recevoir des photographies et vidéos destinées à documenter et valoriser ses actions."}
                </p>
                <p>
                  {isEnglish
                    ? "When necessary, JEDDIAC obtains consent before using images for public communication. For minors, consent is collected from legal guardians. Any person may ask for image examination or withdrawal by writing to contact@jeddiac.org."
                    : "Lorsque cela est nécessaire, JEDDIAC recueille l’autorisation des personnes concernées avant d’utiliser leur image à des fins de communication. Pour les mineurs, les autorisations nécessaires sont recueillies auprès de leurs représentants légaux lorsque la réglementation ou les circonstances l’exigent. Toute personne peut contacter JEDDIAC afin d’obtenir des informations sur l’utilisation de son image ou demander l’examen d’un contenu : <a href='mailto:contact@jeddiac.org'>contact@jeddiac.org</a>."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>9. {isEnglish ? "Minors' Data" : "Données relatives aux mineurs"}</h3>
                <p>
                  {isEnglish
                    ? "Because JEDDIAC works extensively with school journalism clubs and youth, special care is dedicated to minors' data protection. Minor data is collected strictly when essential for the educational activity, with parental or guardian consent secured where legally required."
                    : "JEDDIAC mène des actions pouvant concerner des jeunes et, selon les programmes, des mineurs. Une attention particulière est accordée à la protection de leurs données personnelles. Les informations concernant les mineurs sont collectées uniquement lorsqu’elles sont nécessaires à la réalisation de l’activité concernée et dans le respect des règles applicables. Lorsque le consentement est la base juridique utilisée, JEDDIAC veille à recueillir les autorisations nécessaires auprès des représentants légaux lorsque cela est requis."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>10. {isEnglish ? "Data Security" : "Sécurité des données"}</h3>
                <p>
                  {isEnglish
                    ? "JEDDIAC implements reasonable technical and organizational security measures to protect personal data against unauthorized access, loss, destruction, alteration, or unlawful disclosure. Access is restricted to personnel who need it in their functions."
                    : "JEDDIAC met en œuvre des mesures techniques et organisationnelles raisonnables destinées à protéger les données personnelles contre l’accès non autorisé, la perte, la destruction, l’altération et la divulgation non autorisée. L’accès aux données est strictement limité aux personnes habilitées dans le cadre de leurs fonctions."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>11. {isEnglish ? "Cookies & Tracking Technologies" : "Cookies et traceurs"}</h3>
                <p>
                  {isEnglish
                    ? "The JEDDIAC website may use cookies or similar technologies to ensure technical performance, enhance security, measure visits, and improve user comfort. Users may accept or decline cookies via their browser preferences."
                    : "Le site JEDDIAC peut utiliser des cookies ou technologies similaires pour assurer le fonctionnement technique du site, la sécurisation, la mesure de fréquentation et l’amélioration de l’expérience utilisateur. Lorsque le consentement est requis, l’utilisateur peut accepter ou refuser les cookies, ou modifier les paramètres de son navigateur."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>12. {isEnglish ? "Your Rights Under RGPD" : "Vos droits"}</h3>
                <p>
                  {isEnglish
                    ? "Under the RGPD, you hold the following rights regarding your personal data:"
                    : "Conformément au RGPD, vous disposez, selon les conditions prévues par la réglementation, des droits suivants :"}
                </p>
                <div className="legal-rights-grid">
                  <div className="legal-right-item">
                    <strong>{isEnglish ? "Right of Access" : "Droit d’accès"}</strong>
                    <p>{isEnglish ? "Obtain confirmation and copy of your processed data." : "Accéder aux données personnelles détenues vous concernant."}</p>
                  </div>
                  <div className="legal-right-item">
                    <strong>{isEnglish ? "Right of Rectification" : "Droit de rectification"}</strong>
                    <p>{isEnglish ? "Request correction of inaccurate or incomplete data." : "Corriger des informations inexactes ou incomplètes."}</p>
                  </div>
                  <div className="legal-right-item">
                    <strong>{isEnglish ? "Right to Erasure" : "Droit à l’effacement"}</strong>
                    <p>{isEnglish ? "Request deletion of your data under statutory grounds." : "Demander l’effacement dans les cas prévus par la loi."}</p>
                  </div>
                  <div className="legal-right-item">
                    <strong>{isEnglish ? "Right of Limitation" : "Droit à la limitation"}</strong>
                    <p>{isEnglish ? "Temporarily freeze the processing of your data." : "Limiter temporairement le traitement de vos données."}</p>
                  </div>
                  <div className="legal-right-item">
                    <strong>{isEnglish ? "Right to Object" : "Droit d’opposition"}</strong>
                    <p>{isEnglish ? "Object to specific processing based on legitimate interests." : "S’opposer à certains traitements pour motifs légitimes."}</p>
                  </div>
                  <div className="legal-right-item">
                    <strong>{isEnglish ? "Right to Data Portability" : "Droit à la portabilité"}</strong>
                    <p>{isEnglish ? "Receive your data in a structured, machine-readable format." : "Recevoir vos données dans un format structuré et lisible."}</p>
                  </div>
                </div>
                <p className="legal-notice-note">
                  {isEnglish
                    ? "Associations have in principle a statutory one-month period to reply to any request, subject to extensions provided by the RGPD."
                    : "JEDDIAC dispose en principe d’un délai d’un mois pour répondre à votre demande, sous réserve des règles applicables et des éventuelles prolongations prévues par le RGPD."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>13. {isEnglish ? "How to Exercise Your Rights" : "Exercer vos droits"}</h3>
                <p>
                  {isEnglish
                    ? "To exercise your rights or ask any questions regarding your personal data, you may contact JEDDIAC:"
                    : "Pour exercer vos droits ou poser une question relative à la protection de vos données, vous pouvez contacter JEDDIAC :"}
                </p>
                <div className="legal-highlight-box">
                  <p><strong>{isEnglish ? "By Email:" : "Par courrier électronique :"}</strong> <a href="mailto:contact@jeddiac.org">contact@jeddiac.org</a></p>
                  <p><strong>{isEnglish ? "By Postal Mail:" : "Par courrier postal :"}</strong></p>
                  <p>JEDDIAC – Jeunesse Engagée pour la Durabilité, le Développement et l’Information en Afrique centrale</p>
                  <p>66 bis, avenue Maurice Thorez, 94200 Ivry-sur-Seine, France</p>
                </div>
                <p className="legal-subtext">
                  {isEnglish
                    ? "For security reasons, proof of identity may be requested if needed to prevent unauthorized requests."
                    : "Pour des raisons de sécurité, JEDDIAC peut demander un justificatif d’identité lorsque cela est nécessaire pour éviter qu’une demande ne soit effectuée par une personne non autorisée."}
                </p>
              </section>

              <section className="legal-section-block">
                <h3>14. {isEnglish ? "Lodge a Complaint with the CNIL" : "Réclamation auprès de la CNIL"}</h3>
                <p>
                  {isEnglish
                    ? "If, after contacting JEDDIAC, you believe your personal data rights have not been respected, you are entitled to file a complaint with the French data protection supervisory authority:"
                    : "Si, après avoir contacté JEDDIAC, vous estimez que vos droits relatifs à vos données personnelles ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission nationale de l’informatique et des libertés (CNIL), autorité française chargée de la protection des données personnelles :"}
                </p>
                <div className="legal-highlight-box">
                  <p><strong>Commission Nationale de l’Informatique et des Libertés (CNIL)</strong></p>
                  <p>3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07</p>
                  <p><a href="https://www.cnil.fr/" target="_blank" rel="noopener noreferrer">https://www.cnil.fr/</a></p>
                </div>
              </section>

              <section className="legal-section-block">
                <h3>15. {isEnglish ? "Policy Modifications" : "Modification de la présente politique"}</h3>
                <p>
                  {isEnglish
                    ? "JEDDIAC may update this privacy policy to reflect changes in its activities, digital tools, or regulatory standards. The last update date is indicated at the top of this document."
                    : "JEDDIAC peut modifier la présente politique afin de tenir compte de l’évolution de ses activités, de ses outils numériques ou de la réglementation applicable. La date de dernière mise à jour est indiquée en haut de cette page."}
                </p>
                <p className="legal-effective-date">
                  <strong>{isEnglish ? "Effective date:" : "Date d'application :"}</strong> {isEnglish ? "October 7, 2026." : "7 octobre 2026."}
                </p>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
