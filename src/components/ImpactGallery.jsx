import React, { useState } from "react";
import { Camera, MapPin, Sparkles, ArrowRight, Eye, X } from "lucide-react";

const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Atelier Prise de Son Mobile & Podcasts Juniors",
    location: "Yaoundé · Lycée Général Leclerc",
    category: "Formation Pratique",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
    description: "Formation de 35 lycéens à la captation audio, aux techniques d'interviews de terrain et au montage de chroniques radiophoniques sur la protection des bassins versants urbains."
  },
  {
    id: "g2",
    title: "Investigation en Forêt Dense : Les Puits de Carbone",
    location: "Réserve de faune du Dja · Sud Cameroun",
    category: "Enquête Écologique",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
    description: "Une équipe mixte de jeunes journalistes et de scientifiques mesure le taux de séquestration carbone et interviewe les communautés riveraines sur les savoirs ancestraux."
  },
  {
    id: "g3",
    title: "Radio Communautaire & Dialogue avec les Pêcheurs",
    location: "Kribi · Littoral Maritime",
    category: "Médias de Proximité",
    image: "https://images.unsplash.com/photo-1589903102059-7667b384237b?w=800&auto=format&fit=crop&q=80",
    description: "Diffusion en direct d'une émission participative bilingue sur l'érosion côtière et la restauration des mangroves de l'estuaire du Nyong."
  },
  {
    id: "g4",
    title: "Forum Sous-Régional des Jeunes Voix Écologiques",
    location: "Palais des Congrès · Yaoundé",
    category: "Plaidoyer & Débats",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    description: "Présentation des 10 premières enquêtes juniors devant les délégations ministérielles de la COMIFAC, les bailleurs internationaux et les directeurs de médias."
  }
];

export default function ImpactGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="gallery-header-row">
          <div>
            <div className="section-tag-pill">
              <Camera size={16} />
              <span>JEDDIAC sur le terrain</span>
            </div>
            <h2 className="section-title-editorial">
              Zone d'intervention <span className="text-highlight-green">de Jeddiac</span>
            </h2>
            <p className="section-subtitle-editorial" style={{ margin: 0, textAlign: "left" }}>
              Des programmes conçus pour transformer les jeunes en acteurs de l'information, de la sensibilisation et du développement durable.
            </p>
          </div>
          <div className="gallery-header-stats">
            <div className="gallery-stat-badge">
              <span className="gallery-stat-num">90</span>
              <span className="gallery-stat-lbl">Clubs & Studios documentés</span>
            </div>
            <div className="gallery-stat-badge">
              <span className="gallery-stat-num">100%</span>
              <span className="gallery-stat-lbl">Terrain & Récits vivants</span>
            </div>
          </div>
        </div>

        <div className="gallery-mosaic-grid">
          {GALLERY_ITEMS.map((item, index) => (
            <div 
              key={item.id} 
              className={`gallery-card ${index === 0 ? "featured-card" : ""}`}
              onClick={() => setSelectedPhoto(item)}
            >
              <div className="gallery-card-img-wrap">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="gallery-card-img" 
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span className="gallery-overlay-badge">{item.category}</span>
                  <div className="gallery-overlay-bottom">
                    <span className="gallery-location">
                      <MapPin size={13} />
                      {item.location}
                    </span>
                    <h3 className="gallery-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-card gallery-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedPhoto(null)}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
            <div className="lightbox-img-wrap">
              <img src={selectedPhoto.image} alt={selectedPhoto.title} />
            </div>
            <div className="lightbox-caption">
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.5rem" }}>
                <span className="badge badge-green-light">{selectedPhoto.category}</span>
                <span style={{ fontSize: "0.85rem", color: "#4F675D", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <MapPin size={14} />
                  {selectedPhoto.location}
                </span>
              </div>
              <h3 style={{ fontSize: "1.4rem", color: "#13221B", marginBottom: "0.8rem", fontWeight: 700 }}>
                {selectedPhoto.title}
              </h3>
              <p style={{ color: "#3B5247", lineHeight: "1.7", fontSize: "0.98rem" }}>
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
