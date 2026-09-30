import React, { useEffect, useState } from "react";
import { Trees, Sparkles, Loader2 } from "lucide-react";

export default function PageTransitionLoader({ 
  visible, 
  message = "Chargement des données...",
  subMessage = "Synchronisation avec le réseau JEDDIAC · Bassin du Congo"
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) {
      setProgress(0);
      return;
    }

    setProgress(15);
    const t1 = setTimeout(() => setProgress(45), 80);
    const t2 = setTimeout(() => setProgress(82), 220);
    const t3 = setTimeout(() => setProgress(98), 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="page-transition-overlay" role="status" aria-live="polite">
      {/* Top running progress bar */}
      <div 
        className="page-transition-top-bar"
        style={{ width: `${progress}%` }}
      />

      <div className="page-transition-box">
        <div className="page-transition-spinner-wrap">
          <div className="transition-spinner-ring"></div>
          <Trees size={26} className="transition-center-icon" />
        </div>

        <h3 className="page-transition-title">{message}</h3>
        <p className="page-transition-sub">{subMessage}</p>

        <div className="page-transition-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
