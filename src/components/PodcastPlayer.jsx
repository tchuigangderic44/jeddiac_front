import React, { useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Radio, Sparkles, Mic, Headphones, ArrowRight } from "lucide-react";

export default function PodcastPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(32);
  const [isMuted, setIsMuted] = useState(false);

  const playlist = [
    {
      title: "Les gardiens silencieux du Bassin du Congo",
      series: "Les Voix de la Durabilité · Épisode 01",
      duration: "08:45",
      author: "Club Média Lycée Général Leclerc, Yaoundé",
      topic: "Biodiversité & Forêts Primaires",
      cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80",
      description: "Une immersion sonore au cœur de la forêt équatoriale avec les témoignages des éco-gardes et des jeunes scouts environnementaux."
    },
    {
      title: "Enquête : Le recyclage plastique et l'économie circulaire à Douala",
      series: "Journalisme Vert · Épisode 02",
      duration: "12:20",
      author: "Radio Universitaire Campus Douala",
      topic: "Pollution Urbaine & Économie Circulaire",
      cover: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80",
      description: "Des rives du fleuve Wouri aux ateliers d'artisans transformateurs, les jeunes reporters documentent les filières citoyennes de recyclage."
    },
    {
      title: "L'or bleu : Préserver les sources d'eau face aux dérèglements climatiques",
      series: "Micro-Trottoir Jeunesse · Épisode 03",
      duration: "09:15",
      author: "Club Journal Bafoussam & Radio Communautaire",
      topic: "Ressources en Eau & Climat",
      cover: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80",
      description: "Comment les élèves et agriculteurs s'organisent pour protéger les têtes de sources et installer des récupérateurs d'eau de pluie."
    },
    {
      title: "Reforestation participative : L'initiative des jeunes de l'Est Cameroun",
      series: "Reportages de Solutions · Épisode 04",
      duration: "14:10",
      author: "Rédaction Junior Bertoua",
      topic: "Agroforesterie & Communautés",
      cover: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80",
      description: "Quand les lycéens s'associent aux pépiniéristes locaux pour reboiser les abords des réserves fauniques."
    }
  ];

  const current = playlist[currentTrackIndex];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setProgress(0);
    setIsPlaying(true);
  };
  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <section id="podcasts" className="podcast-editorial-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag-pill">
            <Headphones size={15} />
            <span>Hub Audio & Podcasts Juniors</span>
          </div>
          <h2 className="section-title-editorial">
            Écoutez les <span className="text-highlight-green">Récits de Terrain</span>
          </h2>
          <p className="section-subtitle-editorial">
            Chaque semaine, découvrez les émissions et enquêtes sonores enregistrées par les élèves et étudiants formés au journalisme environnemental.
          </p>
        </div>

        {/* Master Audio Player Showcase */}
        <div className="podcast-player-card">
          <div className="podcast-cover-col">
            <div className="podcast-cover-frame">
              <img 
                src={current.cover} 
                alt={current.title} 
                className="podcast-cover-image" 
              />
              <span className="podcast-live-badge">
                <Mic size={13} />
                Studio JEDDIAC Junior
              </span>
            </div>
          </div>

          <div className="podcast-info-col">
            <div className="podcast-track-meta">
              <span className="badge badge-green-light">{current.series}</span>
              <span className="podcast-duration">{current.duration}</span>
            </div>

            <h3 className="podcast-track-title">{current.title}</h3>
            <p className="podcast-track-author">{current.author} · <em>{current.topic}</em></p>
            <p className="podcast-track-desc">{current.description}</p>

            {/* Simulated Animated Waveform */}
            <div className="podcast-waveform">
              {[40, 65, 80, 50, 90, 75, 45, 60, 85, 100, 70, 55, 65, 80, 95, 60, 45, 75, 90, 80, 50, 65, 75, 55, 85, 90, 60, 40].map((h, i) => (
                <div 
                  key={i} 
                  className={`wave-bar ${isPlaying ? "playing" : ""}`}
                  style={{ 
                    height: `${isPlaying ? Math.max(20, (h * (progress + i * 2) % 95)) : h}%`,
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>

            {/* Scrubber Bar */}
            <div className="podcast-scrubber">
              <div className="scrubber-track">
                <div className="scrubber-progress" style={{ width: `${progress}%` }} />
              </div>
              <div className="scrubber-time">
                <span>03:14</span>
                <span>{current.duration}</span>
              </div>
            </div>

            {/* Controls Row */}
            <div className="podcast-controls-row">
              <div className="playback-btns">
                <button 
                  onClick={prevTrack} 
                  className="btn-control-prev"
                  aria-label="Piste précédente"
                >
                  <SkipBack size={18} />
                </button>

                <button 
                  onClick={togglePlay} 
                  className="btn-control-play-master"
                  aria-label={isPlaying ? "Mettre en pause" : "Écouter l'épisode"}
                >
                  {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: "2px" }} />}
                </button>

                <button 
                  onClick={nextTrack} 
                  className="btn-control-next"
                  aria-label="Piste suivante"
                >
                  <SkipForward size={18} />
                </button>
              </div>

              <div className="track-selector-dropdown">
                <span style={{ fontSize: "0.85rem", color: "#6A8278", marginRight: "0.5rem" }}>
                  Épisode {currentTrackIndex + 1} / {playlist.length}
                </span>
                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className="btn-mute"
                  aria-label="Muet"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Playlist Grid */}
        <div className="podcast-playlist-grid">
          {playlist.map((item, idx) => {
            const isSelected = idx === currentTrackIndex;
            return (
              <div 
                key={idx} 
                onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); setProgress(0); }}
                className={`playlist-item-card ${isSelected ? "active" : ""}`}
              >
                <div className="playlist-item-thumb">
                  <img src={item.cover} alt={item.title} />
                  <div className="playlist-item-play-icon">
                    {isSelected && isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </div>
                </div>
                <div className="playlist-item-content">
                  <span className="playlist-item-badge">{item.topic}</span>
                  <h4 className="playlist-item-title">{item.title}</h4>
                  <div className="playlist-item-meta">
                    <span>{item.author}</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
