import React from "react";
import { Award, Compass, Trees, Target, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function AfriveSpotlight({ onOpenApplication }) {
  return (
    <section className="afrive-spotlight-section">
      <div className="container">
        <div className="afrive-editorial-card">
          <div className="afrive-editorial-grid">
            <div className="afrive-main-col">
              <div className="section-tag-pill light-pill">
                <Award size={15} />
                <span>Partenariat Média International & Mentorat</span>
              </div>

              <h2 className="afrive-headline">
                Synergie avec <span className="afrive-highlight">AFRIVE</span> : La voix panafricaine de la durabilité
              </h2>

              <p className="afrive-lead">
                <strong>AFRIVE</strong>, revue internationale pour le développement durable de l'Afrique, apporte son expertise éditoriale de haut niveau, son réseau de journalistes d'investigation et sa caisse de résonance médiatique aux jeunes talents formés par JEDDIAC.
              </p>

              <div className="afrive-benefits-grid">
                <div className="afrive-benefit-item">
                  <h4>Mentorat d'Investigation</h4>
                  <p>Accompagnement personnalisé par des rédacteurs en chef chevronnés sur les grands dossiers environnementaux.</p>
                </div>

                <div className="afrive-benefit-item">
                  <h4>Diffusion Panafricaine</h4>
                  <p>Publication des meilleurs reportages scolaires et universitaires dans les éditions imprimées et web d'AFRIVE.</p>
                </div>
              </div>

              <button 
                onClick={onOpenApplication}
                className="btn btn-gold-solid"
              >
                <span>Devenir Partenaire Institutionnel</span>
                <ArrowUpRight size={17} />
              </button>
            </div>

            {/* Founder Vision Box with Photo */}
            <div className="afrive-vision-card">
              <div className="afrive-vision-photo-frame">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80" 
                  alt="Forêt du Bassin du Congo" 
                  className="afrive-vision-img"
                />
              </div>

              <div className="afrive-vision-text">
                <span className="badge badge-gold-solid">Vision Bassin du Congo</span>
                <h3>200 millions d'hectares, 60% de jeunes de moins de 25 ans</h3>
                <p>
                  Le Bassin du Congo est la 2ᵉ forêt tropicale du monde. En équipant sa jeunesse des outils du journalisme rigoureux, nous transformons une vulnérabilité en une force motrice pour le continent et la planète.
                </p>
                <div className="afrive-vision-founder">
                  <strong>Jean Marie Kenfack</strong> · Porteur du programme JEDDIAC
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
