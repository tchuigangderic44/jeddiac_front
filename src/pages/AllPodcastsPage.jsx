import React, { useState, useEffect, useRef } from "react";
import { 
  Headphones, 
  ArrowLeft, 
  ArrowRight,
  Search, 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Mic, 
  Clock, 
  Radio, 
  Award,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Share2,
  Check
} from "lucide-react";
import { api, getMediaUrl } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function AllPodcastsPage({ onBackToHome }) {
  const { isEnglish } = useLanguage();
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Audio Playback states
  const [activePlayingId, setActivePlayingId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [audioDurationSec, setAudioDurationSec] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);
  const scrubberRef = useRef(null);
  const audioContextRef = useRef(null);
  const synthNodesRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadPodcasts();
    return () => {
      stopWebAudioFallback();
    };
  }, []);

  const loadPodcasts = async () => {
    try {
      setLoading(true);
      const res = await api.getPodcasts("?limit=50");
      if (res && Array.isArray(res.values)) {
        setPodcasts(res.values);
      } else {
        setPodcasts([]);
      }
    } catch (err) {
      console.error("Error loading podcasts in AllPodcastsPage from API:", err);
      setPodcasts([]);
    } finally {
      setLoading(false);
    }
  };

  // Web Audio Synthesizer Fallback in case of browser audio blockage
  const startWebAudioFallback = (freqIndex = 0) => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
        }
      }
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
      if (audioContextRef.current && !synthNodesRef.current) {
        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        const freqs = [220.00, 293.66, 329.63, 392.00];
        osc.frequency.setValueAtTime(freqs[freqIndex % freqs.length], ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        synthNodesRef.current = { osc, gain };
      }
    } catch (e) {
      console.warn("WebAudio fallback error:", e);
    }
  };

  const stopWebAudioFallback = () => {
    if (synthNodesRef.current) {
      try {
        synthNodesRef.current.gain.gain.linearRampToValueAtTime(0.0001, (audioContextRef.current?.currentTime || 0) + 0.1);
        synthNodesRef.current.osc.stop((audioContextRef.current?.currentTime || 0) + 0.15);
      } catch (e) {}
      synthNodesRef.current = null;
    }
  };

  // Play a podcast track directly
  const playTrack = (track) => {
    if (!track) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (activePlayingId === track.id && isPlaying) {
      audio.pause();
      stopWebAudioFallback();
      setIsPlaying(false);
      return;
    }

    stopWebAudioFallback();
    setActivePlayingId(track.id);
    setProgress(0);
    setCurrentTimeSec(0);

    const fullSrc = getMediaUrl(track.audioUrl);
    if (audio.src !== fullSrc) {
      audio.src = fullSrc;
      audio.currentTime = 0;
    }

    audio.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.warn("Direct play error, falling back to WebAudio synth:", err);
      startWebAudioFallback(0);
      setIsPlaying(true);
    });
  };

  // Time & Progress Update
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      const cur = audio.currentTime || 0;
      const dur = audio.duration || 0;
      setCurrentTimeSec(cur);
      if (dur > 0) {
        setProgress((cur / dur) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setAudioDurationSec(audio.duration);
    }
  };

  const handleScrubberClick = (e) => {
    const audio = audioRef.current;
    const scrubber = scrubberRef.current;
    if (!audio || !scrubber) return;

    const rect = scrubber.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));

    if (audio.duration) {
      audio.currentTime = ratio * audio.duration;
      setProgress(ratio * 100);
      setCurrentTimeSec(audio.currentTime);
    } else {
      setProgress(ratio * 100);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }
  };

  // Derive unique topics
  const topics = [
    "all",
    ...new Set(
      podcasts
        .map((p) => (isEnglish && p.topicEn ? p.topicEn : p.topic))
        .filter(Boolean)
    )
  ];

  // Filtered and sorted podcasts
  const filteredPodcasts = podcasts
    .filter((p) => {
      const currentTopic = (isEnglish && p.topicEn) ? p.topicEn : p.topic;
      const matchTopic = selectedTopic === "all" || currentTopic === selectedTopic || p.topic === selectedTopic || p.topicEn === selectedTopic;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.titleEn && p.titleEn.toLowerCase().includes(q)) ||
        (p.series && p.series.toLowerCase().includes(q)) ||
        (p.seriesEn && p.seriesEn.toLowerCase().includes(q)) ||
        (p.author && p.author.toLowerCase().includes(q)) ||
        (p.authorEn && p.authorEn.toLowerCase().includes(q)) ||
        (p.topic && p.topic.toLowerCase().includes(q)) ||
        (p.topicEn && p.topicEn.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.descriptionEn && p.descriptionEn.toLowerCase().includes(q));
      return matchTopic && matchSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "title") {
        const titleA = (isEnglish && a.titleEn ? a.titleEn : a.title) || "";
        const titleB = (isEnglish && b.titleEn ? b.titleEn : b.title) || "";
        return titleA.localeCompare(titleB);
      }
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "oldest" ? dateA - dateB : dateB - dateA;
    });

  const activePlayingPodcast = podcasts.find((p) => p.id === activePlayingId);

  const handleCopyShareLink = (podcast) => {
    const url = `${window.location.origin}${window.location.pathname}#podcasts-${podcast.id || ""}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    }
  };

  return (
    <div className="dedicated-page-wrapper">
      {/* Hidden Global Audio Element */}
      <audio
        ref={audioRef}
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Header Banner - Matching AllProfilesPage layout */}
      <div className="dedicated-page-header">
        <div className="container">
          <div className="section-tag-pill">
            <Headphones size={16} />
            <span>{isEnglish ? "Audio Hub & Youth Podcasts" : "Hub Audio & Podcasts Juniors"}</span>
          </div>

          {/* Bouton de retour placé immédiatement avant la classe dedicated-page-title */}
          <div className="dedicated-back-btn-wrapper">
            <button 
              onClick={onBackToHome} 
              className="btn btn-header-back"
              aria-label={isEnglish ? "Back to Home" : "Retour à l'accueil"}
              title={isEnglish ? "Back to Home" : "Retour à l'accueil"}
            >
              <ArrowLeft size={18} />
              <span>{isEnglish ? "Back to Home" : "Retour à l'accueil"}</span>
            </button>
          </div>

          <h1 className="dedicated-page-title">
            {isEnglish ? "The Audio Hub &" : "L'Audio-Thèque &"}{" "}
            <span className="text-highlight-green">
              {isEnglish ? "Junior Podcasts of JEDDIAC" : "les Émissions Sonores de JEDDIAC"}
            </span>
          </h1>

          <p className="dedicated-page-subtitle">
            {isEnglish
              ? "Discover the complete catalog of environmental broadcasts, student vox pops, and audio investigations produced across the Congo Basin by JEDDIAC media clubs."
              : "Retrouvez l'intégralité des reportages audios, micro-trottoirs et magazines radiophoniques enregistrés sur le terrain par les élèves et étudiants du programme JEDDIAC."}
          </p>
        </div>
      </div>

      {/* Main Content - Matching AllProfilesPage layout */}
      <div className="container dedicated-page-content">
        {/* Controls Bar */}
        <div className="dedicated-controls-bar">
          <div className="dedicated-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder={isEnglish ? "Search by title, topic, author or keyword..." : "Rechercher par titre, thématique, radio ou mots-clés..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dedicated-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="search-clear-btn" title="Effacer">
                <X size={15} />
              </button>
            )}
          </div>

          <div className="dedicated-sort-group">
            <span className="results-counter-pill">
              <strong>{filteredPodcasts.length}</strong> {isEnglish ? "broadcast(s)" : "émission(s)"}
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="dedicated-select"
            >
              <option value="newest">{isEnglish ? "Most recent" : "Plus récents"}</option>
              <option value="oldest">{isEnglish ? "Oldest first" : "Plus anciens"}</option>
              <option value="title">{isEnglish ? "Title (A-Z)" : "Titre (A-Z)"}</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="dedicated-category-pills">
          {topics.map((top) => {
            const label = top === "all" ? (isEnglish ? "All Topics" : "Toutes les thématiques") : top;
            return (
              <button
                key={top}
                onClick={() => setSelectedTopic(top)}
                className={`dedicated-cat-btn ${selectedTopic === top ? "active" : ""}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Floating / Sticky Mini-Player if a track is active */}
        {activePlayingPodcast && (
          <div style={{
            background: "linear-gradient(135deg, #1b4332 0%, #081c15 100%)",
            color: "#ffffff",
            borderRadius: "18px",
            padding: "1rem 1.5rem",
            marginBottom: "2.5rem",
            boxShadow: "0 14px 30px rgba(8, 28, 21, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: "260px" }}>
              <button
                type="button"
                onClick={() => playTrack(activePlayingPodcast)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#2d6a4f",
                  border: "none",
                  color: "#ffffff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: "2px" }} />}
              </button>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "300px" }}>
                  {isEnglish ? (activePlayingPodcast.titleEn || activePlayingPodcast.title) : activePlayingPodcast.title}
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>
                  {activePlayingPodcast.author} · {activePlayingPodcast.duration}
                </div>
              </div>
            </div>

            {/* Scrubber in sticky bar */}
            <div style={{ flex: 1, minWidth: "240px" }}>
              <div 
                ref={scrubberRef}
                onClick={handleScrubberClick}
                style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.2)", borderRadius: "9999px", cursor: "pointer", position: "relative" }}
              >
                <div style={{ width: `${progress}%`, height: "100%", background: "#52b788", borderRadius: "9999px" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>
                <span>{formatTime(currentTimeSec)}</span>
                <span>{audioDurationSec > 0 ? formatTime(audioDurationSec) : activePlayingPodcast.duration}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={toggleMute}
                style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: "36px", height: "36px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                aria-label="Muet"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                type="button"
                onClick={() => setSelectedPodcast(activePlayingPodcast)}
                className="btn btn-outline-forest btn-sm"
                style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.4)" }}
              >
                {isEnglish ? "View details" : "Voir la fiche"}
              </button>
            </div>
          </div>
        )}

        {/* Grid or Empty or Loading */}
        {loading ? (
          <div className="loading-state-container">
            <div className="spinner"></div>
            <p>{isEnglish ? "Loading broadcasts from API..." : "Chargement des émissions depuis l'API..."}</p>
          </div>
        ) : filteredPodcasts.length === 0 ? (
          <div className="dedicated-empty-state">
            <Headphones size={48} />
            <p>{isEnglish ? "No podcasts found matching your criteria." : "Aucune émission trouvée correspondant à vos critères."}</p>
            <button
              onClick={() => {
                setSelectedTopic("all");
                setSearchQuery("");
              }}
              className="btn btn-outline-forest btn-sm"
              style={{ marginTop: "1rem" }}
            >
              {isEnglish ? "Reset filters" : "Réinitialiser les filtres"}
            </button>
          </div>
        ) : (
          <div className="team-grid dedicated-grid">
            {filteredPodcasts.map((podcast) => {
              const itemTitle = isEnglish ? (podcast.titleEn || podcast.title) : podcast.title;
              const itemSeries = isEnglish ? (podcast.seriesEn || podcast.series) : podcast.series;
              const itemAuthor = isEnglish ? (podcast.authorEn || podcast.author) : podcast.author;
              const itemTopic = isEnglish ? (podcast.topicEn || podcast.topic) : podcast.topic;
              const itemDesc = isEnglish ? (podcast.descriptionEn || podcast.description) : podcast.description;
              const itemCover = getMediaUrl(podcast.cover || podcast.coverImage || "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80");
              const isItemPlaying = activePlayingId === podcast.id && isPlaying;

              return (
                <article 
                  key={podcast.id} 
                  className={`team-card ${isItemPlaying ? "playing-border" : ""}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    transition: "all 0.25s ease",
                    border: isItemPlaying ? "2px solid #166534" : "1px solid rgba(0,0,0,0.08)"
                  }}
                >
                  <div className="team-card-photo-wrapper" style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                    <img
                      src={itemCover}
                      alt={itemTitle}
                      className="team-card-photo"
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    
                    {/* Dark gradient overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)" }} />

                    {/* Topic Badge */}
                    <span className="team-card-pole-badge" style={{ position: "absolute", top: "12px", left: "12px" }}>
                      {itemTopic}
                    </span>

                    {/* Duration pill */}
                    <span style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(0,0,0,0.75)",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}>
                      <Clock size={12} />
                      {podcast.duration}
                    </span>

                    {/* Central Instant Play Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playTrack(podcast);
                      }}
                      style={{
                        position: "absolute",
                        bottom: "14px",
                        right: "14px",
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: isItemPlaying ? "#166534" : "#ffffff",
                        color: isItemPlaying ? "#ffffff" : "#166534",
                        border: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      aria-label={isItemPlaying ? "Pause" : "Play"}
                      title={isItemPlaying ? (isEnglish ? "Pause track" : "Mettre en pause") : (isEnglish ? "Listen track" : "Écouter la piste")}
                    >
                      {isItemPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: "2px" }} />}
                    </button>
                  </div>

                  <div className="team-card-info" style={{ display: "flex", flexDirection: "column", flex: 1, padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "#166534", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {itemSeries || "JEDDIAC Émission"}
                      </span>
                    </div>

                    <h3 className="team-card-name" style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.35, marginBottom: "0.5rem" }}>
                      {itemTitle}
                    </h3>

                    <p className="team-card-metier" style={{ fontSize: "0.85rem", color: "#6A8278", marginBottom: "0.75rem" }}>
                      {itemAuthor}
                    </p>

                    <p style={{ fontSize: "0.85rem", color: "#4b5563", lineHeight: 1.5, flex: 1, marginBottom: "1.25rem" }}>
                      {itemDesc && itemDesc.length > 115 ? `${itemDesc.slice(0, 115)}...` : itemDesc}
                    </p>

                    {/* Bottom Action Row: Play + Details button */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.75rem", borderTop: "1px solid #f3f4f6" }}>
                      <button
                        type="button"
                        onClick={() => playTrack(podcast)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#166534",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          cursor: "pointer"
                        }}
                      >
                        {isItemPlaying ? (
                          <>
                            <Pause size={15} />
                            <span>{isEnglish ? "Playing" : "En cours"}</span>
                          </>
                        ) : (
                          <>
                            <Play size={15} />
                            <span>{isEnglish ? "Listen" : "Écouter"}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPodcast(podcast)}
                        className="btn btn-outline-forest btn-sm"
                        style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "0.35rem 0.85rem", fontSize: "0.82rem" }}
                      >
                        <span>{isEnglish ? "Full Details" : "Détails de l'émission"}</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Podcast Full Detail Modal - Identical architecture to AllProfilesPage / Member Full Detail Modal */}
      {selectedPodcast && (() => {
        const modalTitle = isEnglish ? (selectedPodcast.titleEn || selectedPodcast.title) : selectedPodcast.title;
        const modalSeries = isEnglish ? (selectedPodcast.seriesEn || selectedPodcast.series) : selectedPodcast.series;
        const modalAuthor = isEnglish ? (selectedPodcast.authorEn || selectedPodcast.author) : selectedPodcast.author;
        const modalTopic = isEnglish ? (selectedPodcast.topicEn || selectedPodcast.topic) : selectedPodcast.topic;
        const modalDesc = isEnglish ? (selectedPodcast.descriptionEn || selectedPodcast.description) : selectedPodcast.description;
        const modalCover = getMediaUrl(selectedPodcast.cover || selectedPodcast.coverImage || "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80");
        const isCurrentActive = activePlayingId === selectedPodcast.id;

        return (
          <div className="modal-overlay" onClick={() => setSelectedPodcast(null)}>
            <div
              className="modal-card profile-modal-card podcast-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                onClick={() => setSelectedPodcast(null)}
                aria-label={isEnglish ? "Close modal" : "Fermer la fenêtre"}
              >
                <X size={20} />
              </button>

              <div className="profile-modal-grid">
                <div className="profile-modal-sidebar">
                  <div className="profile-modal-photo-container">
                    <img
                      src={modalCover}
                      alt={modalTitle}
                      className="profile-modal-photo"
                    />
                  </div>

                  <div className="profile-modal-meta">
                    <span className="profile-badge-role">
                      <Radio size={14} />
                      {modalTopic}
                    </span>
                    <span className="profile-badge-location">
                      <Clock size={14} />
                      {selectedPodcast.duration || "10:00"}
                    </span>
                    <span className="profile-badge-location">
                      <Mic size={14} />
                      {modalAuthor}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopyShareLink(selectedPodcast)}
                      className="btn btn-outline-forest btn-sm profile-linkedin-btn"
                      style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                    >
                      {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
                      <span>{copiedLink ? (isEnglish ? "Link copied!" : "Lien copié !") : (isEnglish ? "Share broadcast" : "Partager l'émission")}</span>
                    </button>
                  </div>
                </div>

                <div className="profile-modal-body">
                  <span className="profile-modal-kicker">
                    {isEnglish ? "Junior Environmental Radio Broadcast · JEDDIAC" : "Émission Radio & Podcast Junior · JEDDIAC"}
                  </span>
                  <h2 className="profile-modal-name">{modalTitle}</h2>
                  <p className="profile-modal-metier">{modalSeries} · <em>{modalTopic}</em></p>

                  {/* Built-in Full Interactive Audio Player in Modal */}
                  <div style={{
                    background: "linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%)",
                    border: "1.5px solid rgba(22, 101, 52, 0.2)",
                    borderRadius: "16px",
                    padding: "1.25rem",
                    margin: "1.25rem 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <button
                          type="button"
                          onClick={() => playTrack(selectedPodcast)}
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            background: "#166534",
                            color: "#ffffff",
                            border: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 4px 12px rgba(22, 101, 52, 0.25)"
                          }}
                          aria-label={isCurrentActive && isPlaying ? "Pause" : "Play"}
                        >
                          {isCurrentActive && isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: "2px" }} />}
                        </button>
                        <div>
                          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#166534" }}>
                            {isCurrentActive && isPlaying ? (isEnglish ? "Broadcast playing now" : "Lecture en cours") : (isEnglish ? "Click to play episode" : "Cliquer pour écouter l'émission")}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#6A8278" }}>
                            {modalAuthor} · {selectedPodcast.duration}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={toggleMute}
                        className="btn-mute"
                        aria-label="Muet"
                        style={{
                          background: "#ffffff",
                          border: "1px solid #d1d5db",
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer"
                        }}
                      >
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>

                    {/* Modal Interactive Scrubber */}
                    <div
                      ref={isCurrentActive ? scrubberRef : null}
                      onClick={isCurrentActive ? handleScrubberClick : () => playTrack(selectedPodcast)}
                      className="podcast-scrubber"
                      style={{ cursor: "pointer", margin: "0" }}
                      title={isEnglish ? "Click to seek" : "Cliquer pour naviguer dans l'audio"}
                    >
                      <div className="scrubber-track">
                        <div className="scrubber-progress" style={{ width: `${isCurrentActive ? progress : 0}%` }} />
                      </div>
                      <div className="scrubber-time" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#6A8278", marginTop: "4px" }}>
                        <span>{isCurrentActive ? formatTime(currentTimeSec) : "00:00"}</span>
                        <span>{isCurrentActive && audioDurationSec > 0 ? formatTime(audioDurationSec) : selectedPodcast.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Synopsis Section */}
                  <div className="profile-modal-section">
                    <h4>{isEnglish ? "Episode Synopsis & Storyline" : "Synopsis & Contenu de l'Émission"}</h4>
                    <p style={{ lineHeight: "1.7", color: "#374151" }}>{modalDesc}</p>
                  </div>

                  {/* Technical & Production Details (highlight-box) */}
                  <div className="profile-modal-section highlight-box">
                    <h4>
                      <Award size={16} />
                      {isEnglish ? "Technical Sheet & Junior Newsroom" : "Fiche Technique & Équipe de Réalisation"}
                    </h4>
                    <p style={{ color: "#1b4d3e" }}>
                      <strong>{isEnglish ? "Media Club / Radio:" : "Club Média / Radio :"}</strong> {modalAuthor} <br />
                      <strong>{isEnglish ? "Thematic Series:" : "Série thématique :"}</strong> {modalSeries} <br />
                      <strong>{isEnglish ? "Broadcast Duration:" : "Durée d'antenne :"}</strong> {selectedPodcast.duration || "10:00"} <br />
                      <strong>{isEnglish ? "Key Topic:" : "Axe prioritaire :"}</strong> {modalTopic}
                    </p>
                  </div>

                  {/* Educational Objectives */}
                  <div className="profile-modal-section">
                    <h4>
                      <BookOpen size={16} />
                      {isEnglish ? "Pedagogical Goals & Field Action" : "Objectifs Pédagogiques & Impact Terrain"}
                    </h4>
                    <p style={{ color: "#4b5563" }}>
                      {isEnglish
                        ? "This production is part of the JEDDIAC Junior Media Initiative, designed to train secondary and university students in fact-checked environmental reporting and community-centered ecological journalism."
                        : "Cette réalisation s'inscrit dans le cadre du réseau des clubs médias scolaires JEDDIAC, outillant les élèves et étudiants à la documentation factuelle des défis écologiques et à la diffusion de solutions concrètes pour le Bassin du Congo."}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="profile-modal-actions">
                    <button
                      type="button"
                      onClick={() => playTrack(selectedPodcast)}
                      className="btn btn-forest"
                    >
                      {isCurrentActive && isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      <span>{isCurrentActive && isPlaying ? (isEnglish ? "Pause Broadcast" : "Mettre en pause") : (isEnglish ? "Listen to Broadcast" : "Écouter l'émission")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPodcast(null)}
                      className="btn btn-outline-forest"
                    >
                      {isEnglish ? "Close Details" : "Fermer la fiche"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
