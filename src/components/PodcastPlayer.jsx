import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Radio, 
  Sparkles, 
  Mic, 
  Headphones, 
  ArrowRight 
} from "lucide-react";
import { api, getMediaUrl } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function PodcastPlayer({ onNavigateAllPodcasts }) {
  const { isEnglish } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [audioDurationSec, setAudioDurationSec] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isNavigating, setIsNavigating] = useState(false);

  const audioRef = useRef(null);
  const scrubberRef = useRef(null);
  const audioContextRef = useRef(null);
  const synthNodesRef = useRef(null);

  useEffect(() => {
    loadPodcasts();
    return () => {
      stopWebAudioFallback();
    };
  }, []);

  const loadPodcasts = async () => {
    try {
      setLoading(true);
      const res = await api.getPodcasts("?limit=20");
      if (res && Array.isArray(res.values)) {
        setPlaylist(res.values);
      } else {
        setPlaylist([]);
      }
    } catch (err) {
      console.error("Error loading podcasts from API:", err);
      setPlaylist([]);
    } finally {
      setLoading(false);
    }
  };

  // Strictly display up to 4 podcasts on home page: "on affiche 04"
  const displayedPlaylist = playlist.slice(0, 4);
  const current = displayedPlaylist[currentTrackIndex] || displayedPlaylist[0] || null;

  const currentAudioSrc = current ? getMediaUrl(current.audioUrl) : "";

  // Web Audio Synthesizer Fallback if needed
  const startWebAudioFallback = () => {
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
        // Warm harmonic chord frequency based on track index
        const freqs = [220.00, 293.66, 329.63, 392.00];
        osc.frequency.setValueAtTime(freqs[currentTrackIndex % freqs.length], ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        synthNodesRef.current = { osc, gain };
      }
    } catch (e) {
      console.warn("WebAudio fallback init error:", e);
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

  // Play / Pause Master Toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      stopWebAudioFallback();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Direct HTML5 audio play error, falling back to WebAudio synth:", err);
        startWebAudioFallback();
        setIsPlaying(true);
      });
    }
  };

  // Select a track from the playlist
  const selectTrack = (idx) => {
    const track = displayedPlaylist[idx];
    if (!track) return;

    stopWebAudioFallback();
    setCurrentTrackIndex(idx);
    setProgress(0);
    setCurrentTimeSec(0);

    const audio = audioRef.current;
    if (audio) {
      audio.src = getMediaUrl(track.audioUrl);
      audio.currentTime = 0;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Play error on track selection:", err);
        startWebAudioFallback();
        setIsPlaying(true);
      });
    }
  };

  const nextTrack = () => {
    if (displayedPlaylist.length === 0) return;
    const nextIdx = (currentTrackIndex + 1) % displayedPlaylist.length;
    selectTrack(nextIdx);
  };

  const prevTrack = () => {
    if (displayedPlaylist.length === 0) return;
    const prevIdx = (currentTrackIndex - 1 + displayedPlaylist.length) % displayedPlaylist.length;
    selectTrack(prevIdx);
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

  // Interactive scrubber seeking
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

  // Mute / Unmute
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }
    if (synthNodesRef.current) {
      synthNodesRef.current.gain.gain.value = newMuted ? 0 : 0.12;
    }
  };

  const currentTitle = current ? (isEnglish ? (current.titleEn || current.title) : current.title) : "";
  const currentSeries = current ? (isEnglish ? (current.seriesEn || current.series) : current.series) : "";
  const currentAuthor = current ? (isEnglish ? (current.authorEn || current.author) : current.author) : "";
  const currentTopic = current ? (isEnglish ? (current.topicEn || current.topic) : current.topic) : "";
  const currentDesc = current ? (isEnglish ? (current.descriptionEn || current.description) : current.description) : "";
  const currentCover = current ? getMediaUrl(current.cover || current.coverImage || "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80") : "";
  const currentDuration = current?.duration || "00:00";

  return (
    <section id="podcasts" className="podcast-editorial-section">
      {/* HTML5 Native Audio Engine with automatic event bindings */}
      {currentAudioSrc && (
        <audio
          ref={audioRef}
          src={currentAudioSrc}
          preload="auto"
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={nextTrack}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      <div className="container">
        <div className="section-header">
          <div className="section-tag-pill">
            <Headphones size={15} />
            <span>{isEnglish ? "Junior Audio Hub & Podcasts" : "Hub Audio & Podcasts Juniors"}</span>
          </div>
          <h2 className="section-title-editorial">
            {isEnglish ? (
              <>Listen to <span className="text-highlight-green">Field Stories</span></>
            ) : (
              <>Écoutez les <span className="text-highlight-green">Récits de Terrain</span></>
            )}
          </h2>
          <p className="section-subtitle-editorial">
            {isEnglish 
              ? "Every week, discover broadcasts and sound investigations recorded by students trained in environmental journalism."
              : "Chaque semaine, découvrez les émissions et enquêtes sonores enregistrées par les élèves et étudiants formés au journalisme environnemental."}
          </p>
        </div>

        {loading ? (
          <div style={{ padding: "4rem 0", textAlign: "center", color: "#6A8278" }}>
            <div className="spinner-green" />
            <p style={{ marginTop: "1rem" }}>{isEnglish ? "Loading broadcasts from API..." : "Chargement des émissions depuis l'API..."}</p>
          </div>
        ) : !current ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem", background: "#f8faf9", borderRadius: "16px", margin: "2rem 0" }}>
            <Headphones size={40} style={{ color: "#9ca3af", margin: "0 auto 1rem" }} />
            <p style={{ color: "#6b7280" }}>{isEnglish ? "No podcasts available from the API at this time." : "Aucun podcast disponible sur l'API pour le moment."}</p>
          </div>
        ) : (
          <>
            {/* Master Audio Player Showcase */}
            <div className="podcast-player-card">
              <div className="podcast-cover-col">
                <div className="podcast-cover-frame">
                  <img 
                    src={currentCover} 
                    alt={currentTitle} 
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
                  <span className="badge badge-green-light">{currentSeries}</span>
                  <span className="podcast-duration">{currentDuration}</span>
                </div>

                <h3 className="podcast-track-title">{currentTitle}</h3>
                <p className="podcast-track-author">{currentAuthor} · <em>{currentTopic}</em></p>
                <p className="podcast-track-desc">{currentDesc}</p>

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

                {/* Interactive Scrubber Bar */}
                <div 
                  ref={scrubberRef} 
                  onClick={handleScrubberClick} 
                  className="podcast-scrubber"
                  style={{ cursor: "pointer" }}
                  title={isEnglish ? "Click to seek" : "Cliquer pour naviguer dans l'audio"}
                >
                  <div className="scrubber-track">
                    <div className="scrubber-progress" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
                  </div>
                  <div className="scrubber-time">
                    <span>{formatTime(currentTimeSec)}</span>
                    <span>{audioDurationSec > 0 ? formatTime(audioDurationSec) : currentDuration}</span>
                  </div>
                </div>

                {/* Controls Row */}
                <div className="podcast-controls-row">
                  <div className="playback-btns">
                    <button 
                      onClick={prevTrack} 
                      className="btn-control-prev"
                      aria-label={isEnglish ? "Previous track" : "Piste précédente"}
                    >
                      <SkipBack size={18} />
                    </button>

                    <button 
                      onClick={togglePlay} 
                      className="btn-control-play-master"
                      aria-label={isPlaying ? (isEnglish ? "Pause" : "Mettre en pause") : (isEnglish ? "Play" : "Écouter l'épisode")}
                    >
                      {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: "2px" }} />}
                    </button>

                    <button 
                      onClick={nextTrack} 
                      className="btn-control-next"
                      aria-label={isEnglish ? "Next track" : "Piste suivante"}
                    >
                      <SkipForward size={18} />
                    </button>
                  </div>

                  <div className="track-selector-dropdown">
                    <span style={{ fontSize: "0.85rem", color: "#6A8278", marginRight: "0.5rem" }}>
                      {isEnglish ? "Episode" : "Épisode"} {currentTrackIndex + 1} / {displayedPlaylist.length}
                    </span>
                    <button 
                      onClick={toggleMute} 
                      className="btn-mute"
                      aria-label={isMuted ? (isEnglish ? "Unmute" : "Activer le son") : (isEnglish ? "Mute" : "Muet")}
                      title={isMuted ? "Son coupé" : "Son actif"}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Playlist Grid: Display strictly 4 items */}
            <div className="podcast-playlist-grid">
              {displayedPlaylist.map((item, idx) => {
                const isSelected = idx === currentTrackIndex;
                const itemTitle = isEnglish ? (item.titleEn || item.title) : item.title;
                const itemTopic = isEnglish ? (item.topicEn || item.topic) : item.topic;
                const itemAuthor = isEnglish ? (item.authorEn || item.author) : item.author;
                const itemCover = getMediaUrl(item.cover || item.coverImage);

                return (
                  <div 
                    key={item.id || idx} 
                    onClick={() => selectTrack(idx)}
                    className={`playlist-item-card ${isSelected ? "active" : ""}`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="playlist-item-thumb">
                      <img src={itemCover} alt={itemTitle} />
                      <div className="playlist-item-play-icon">
                        {isSelected && isPlaying ? <Pause size={14} /> : <Play size={14} />}
                      </div>
                    </div>
                    <div className="playlist-item-content">
                      <span className="playlist-item-badge">{itemTopic}</span>
                      <h4 className="playlist-item-title">{itemTitle}</h4>
                      <div className="playlist-item-meta">
                        <span>{itemAuthor}</span>
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All Podcasts Action - Exact same container and hover as TeamSection */}
            <div className="section-footer-action">
              <button
                type="button"
                onClick={() => {
                  setIsNavigating(true);
                  if (onNavigateAllPodcasts) {
                    onNavigateAllPodcasts();
                  } else {
                    window.location.hash = "#tous-les-podcasts";
                  }
                  setTimeout(() => setIsNavigating(false), 1200);
                }}
                disabled={isNavigating}
                className={`btn btn-outline-forest btn-lg ${isNavigating ? "btn-navigating" : ""}`}
              >
                {isNavigating ? (
                  <>
                    <span className="btn-spinner-ring"></span>
                    <span>{isEnglish ? "Loading podcasts..." : "Chargement des émissions..."}</span>
                  </>
                ) : (
                  <>
                    <span>{isEnglish ? "Explore all podcasts & audio reports" : "Écouter tous les podcasts & émissions"}</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
