import React from "react";
import { 
  Users, 
  Handshake, 
  GraduationCap, 
  Target, 
  Camera, 
  Megaphone, 
  Compass, 
  FileText,
  Radio,
  Sparkles
} from "lucide-react";

export function getStepIcon(iconName, stepNum, size = 32) {
  const strokeWidth = 1.8;
  switch (iconName || stepNum) {
    case "Users":
    case 1:
      return <Users size={size} strokeWidth={strokeWidth} />;
    case "Handshake":
    case 2:
      return <Handshake size={size} strokeWidth={strokeWidth} />;
    case "GraduationCap":
    case 3:
      return <GraduationCap size={size} strokeWidth={strokeWidth} />;
    case "Target":
    case 4:
      return <Target size={size} strokeWidth={strokeWidth} />;
    case "Camera":
    case 5:
      return <Camera size={size} strokeWidth={strokeWidth} />;
    case "Megaphone":
    case 6:
      return <Megaphone size={size} strokeWidth={strokeWidth} />;
    case "Radio":
      return <Radio size={size} strokeWidth={strokeWidth} />;
    case "FileText":
      return <FileText size={size} strokeWidth={strokeWidth} />;
    default:
      return <Compass size={size} strokeWidth={strokeWidth} />;
  }
}

export default function NewsPictogram({ item, isEnglish, isModal = false }) {
  let stepNumber = item?.stepNumber;
  if (!stepNumber && item?.title) {
    const match = item.title.match(/(?:Étape|Step)\s*([1-6])/i);
    if (match) {
      stepNumber = parseInt(match[1], 10);
    }
  }
  if (!stepNumber && item?.id) {
    const matchId = String(item.id).match(/b0000001-0000-4000-8000-00000000000([1-6])/);
    if (matchId) {
      stepNumber = parseInt(matchId[1], 10);
    }
  }

  const iconName = item?.icon || (
    stepNumber === 1 ? "Users" :
    stepNumber === 2 ? "Handshake" :
    stepNumber === 3 ? "GraduationCap" :
    stepNumber === 4 ? "Target" :
    stepNumber === 5 ? "Camera" :
    stepNumber === 6 ? "Megaphone" : null
  );

  const category = (isEnglish && item?.categoryEn) ? item.categoryEn : (item?.category || (isEnglish ? "Operational Protocol" : "Protocole Opérationnel"));

  const stepLabel = stepNumber 
    ? `${isEnglish ? "Step" : "Étape"} 0${stepNumber}`
    : "JEDDIAC";

  if (isModal) {
    return (
      <div className="news-modal-pictogram-banner">
        <div className="news-modal-pictogram-topbar">
          <span className="news-card-step-badge">{stepLabel}</span>
          <span className="news-card-category-pill">{category}</span>
        </div>
        <div className="news-card-pictogram-emblem modal-emblem">
          <div className="news-card-pictogram-glow" />
          <div className="news-card-pictogram-icon modal-icon">
            {getStepIcon(iconName, stepNumber, 38)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-card-pictogram-header">
      <div className="news-card-pictogram-topbar">
        <span className="news-card-step-badge">{stepLabel}</span>
        <span className="news-card-category-pill">{category}</span>
      </div>

      <div className="news-card-pictogram-emblem">
        <div className="news-card-pictogram-glow" />
        <div className="news-card-pictogram-icon">
          {getStepIcon(iconName, stepNumber, 32)}
        </div>
      </div>
    </div>
  );
}
