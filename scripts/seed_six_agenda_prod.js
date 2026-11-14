/**
 * Seed 6 Mission Agenda Steps directly into production DB
 */
const { connection, Agenda } = require("./src/models");
const { Op } = require("sequelize");

const AUTHOR_ID = "00db99c2-23b4-48a6-a26f-9520b21a0f49";

const SIX_AGENDA_STEPS = [
  {
    id: "a0000001-0000-4000-8000-000000000001",
    authorId: AUTHOR_ID,
    title: "Préparatifs de la mission",
    titleEn: "Mission Preparations",
    slug: "etape-1-preparatifs-mission-cameroun",
    type: "Préparation",
    typeEn: "Preparation",
    description: "Cadrage des objectifs, du calendrier et du budget de la mission, prise de contact avec les structures cibles, dépôt et confirmation des demandes d'audience, et préparation des supports de présentation de JEDDIAC.",
    descriptionEn: "Scoping of mission objectives, schedule, and budget, liaising with target organizations, submission and confirmation of hearing requests, and drafting JEDDIAC presentation materials.",
    location: "France → Cameroun · préparation à distance",
    locationEn: "France → Cameroon · remote preparation",
    duration: "20 octobre – 12 novembre 2026",
    durationEn: "October 20 – November 12, 2026",
    startDate: new Date("2026-10-20T08:00:00Z"),
    endDate: new Date("2026-11-12T18:00:00Z"),
    seats: "Avant départ",
    seatsEn: "Pre-departure",
    audience: "Équipe JEDDIAC & Partenaires",
    audienceEn: "JEDDIAC Team & Partners",
    status: "active"
  },
  {
    id: "a0000001-0000-4000-8000-000000000002",
    authorId: AUTHOR_ID,
    title: "Arrivée à Douala & cadrage",
    titleEn: "Arrival in Douala & Scoping",
    slug: "etape-2-arrivee-douala-cadrage",
    type: "Arrivée · Douala",
    typeEn: "Arrival · Douala",
    description: "Arrivée par Douala, point logistique, finalisation des trames d'entretien et des lignes directrices des échanges, puis départ vers Bafoussam pour les premières actions de terrain.",
    descriptionEn: "Arrival via Douala, logistical briefing, finalizing interview frameworks and discussion guidelines, followed by departure to Bafoussam for initial field activities.",
    location: "Douala · Littoral",
    locationEn: "Douala · Littoral",
    duration: "13 novembre 2026",
    durationEn: "November 13, 2026",
    startDate: new Date("2026-11-13T08:00:00Z"),
    endDate: new Date("2026-11-13T18:00:00Z"),
    seats: "Cadrage",
    seatsEn: "Scoping",
    audience: "Équipe de mission",
    audienceEn: "Mission team",
    status: "active"
  },
  {
    id: "a0000001-0000-4000-8000-000000000003",
    authorId: AUTHOR_ID,
    title: "Bafoussam — accompagnement de deux écoles",
    titleEn: "Bafoussam — Supporting Two Pilot Schools",
    slug: "etape-3-bafoussam-accompagnement-ecoles",
    type: "Terrain · Bafoussam",
    typeEn: "Field · Bafoussam",
    description: "Rencontre de deux clubs journaux pilotes. Deux actions concrètes : formations simples et pratiques, remise d'un paquet minimum symbolique, et dialogue avec les écoles sur leurs rôles possibles — espaces de culture et encadrement par des enseignants outillés.",
    descriptionEn: "Engaging two pilot press clubs. Two concrete actions: hands-on practical training, handover of a symbolic starter kit, and dialogue with schools on their roles — cultural spaces and guidance by equipped teachers.",
    location: "Bafoussam · Ouest",
    locationEn: "Bafoussam · West",
    duration: "14 – 16 novembre 2026",
    durationEn: "November 14 – 16, 2026",
    startDate: new Date("2026-11-14T08:00:00Z"),
    endDate: new Date("2026-11-16T18:00:00Z"),
    seats: "Clubs journaux",
    seatsEn: "Press clubs",
    audience: "Élèves, enseignants, clubs de presse",
    audienceEn: "Students, teachers, press clubs",
    status: "active"
  },
  {
    id: "a0000001-0000-4000-8000-000000000004",
    authorId: AUTHOR_ID,
    title: "Yaoundé — audiences institutionnelles",
    titleEn: "Yaoundé — Institutional Hearings",
    slug: "etape-4-yaounde-audiences-institutionnelles",
    type: "Terrain · Yaoundé",
    typeEn: "Field · Yaoundé",
    description: "Audiences avec les ministères, partenaires publics et institutionnels, organisations de la société civile et coordinateurs du programme. Présentation de JEDDIAC et identification des premières pistes de partenariat.",
    descriptionEn: "Hearings with ministries, public and institutional partners, civil society organizations, and program coordinators. Presentation of JEDDIAC and identification of inaugural partnership pathways.",
    location: "Yaoundé · Centre",
    locationEn: "Yaoundé · Centre",
    duration: "16 – 25 novembre 2026",
    durationEn: "November 16 – 25, 2026",
    startDate: new Date("2026-11-16T08:00:00Z"),
    endDate: new Date("2026-11-25T18:00:00Z"),
    seats: "Institutions",
    seatsEn: "Institutions",
    audience: "Ministères, partenaires et société civile",
    audienceEn: "Ministries, partners, and civil society",
    status: "active"
  },
  {
    id: "a0000001-0000-4000-8000-000000000005",
    authorId: AUTHOR_ID,
    title: "Retour Douala & point de mission",
    titleEn: "Return to Douala & Mission Review",
    slug: "etape-5-retour-douala-point-mission",
    type: "Douala · retour",
    typeEn: "Douala · Return",
    description: "Retour à Douala, point sur les contacts et opportunités côté littoral, consolidation des échanges menés pendant la mission, puis clôture du voyage.",
    descriptionEn: "Return to Douala, assessment of contacts and opportunities in the coastal hub, consolidation of exchanges conducted throughout the mission, and conclusion of the trip.",
    location: "Douala → France",
    locationEn: "Douala → France",
    duration: "26 – 27 novembre 2026",
    durationEn: "November 26 – 27, 2026",
    startDate: new Date("2026-11-26T08:00:00Z"),
    endDate: new Date("2026-11-27T18:00:00Z"),
    seats: "Débrief",
    seatsEn: "Debrief",
    audience: "Équipe de mission",
    audienceEn: "Mission team",
    status: "active"
  },
  {
    id: "a0000001-0000-4000-8000-000000000006",
    authorId: AUTHOR_ID,
    title: "Bilan de mission & premier rapport",
    titleEn: "Mission Evaluation & First Report",
    slug: "etape-6-bilan-mission-premier-rapport",
    type: "Restitution",
    typeEn: "Restitution",
    description: "Début décembre : bilan de la mission camerounaise. Fin décembre : premier rapport des actions engagées et des premiers déploiements de JEDDIAC, incluant un point chiffré sur les coûts de la mission.",
    descriptionEn: "Early December: Cameroon mission evaluation. Late December: first report on initiated actions and inaugural JEDDIAC rollouts, including an itemized breakdown of mission costs.",
    location: "France · restitution au réseau",
    locationEn: "France · Network Restitution",
    duration: "1er – 31 décembre 2026",
    durationEn: "December 1 – 31, 2026",
    startDate: new Date("2026-12-01T08:00:00Z"),
    endDate: new Date("2026-12-31T18:00:00Z"),
    seats: "Bilan & coûts",
    seatsEn: "Evaluation & Costs",
    audience: "Conseil d'administration, adhérents & partenaires",
    audienceEn: "Board of Directors, members & partners",
    status: "active"
  }
];

async function run() {
  console.log("Checking DB connection...");
  await connection.authenticate();
  console.log("Connected to MySQL DB.");

  const sixIds = SIX_AGENDA_STEPS.map((s) => s.id);

  // Soft delete all other agenda items
  const deletedCount = await Agenda.destroy({
    where: {
      id: { [Op.notIn]: sixIds }
    }
  });
  console.log(`Soft-deleted ${deletedCount} other agenda items.`);

  // Insert or update the 6 steps
  for (const step of SIX_AGENDA_STEPS) {
    const existing = await Agenda.findByPk(step.id, { paranoid: false });
    if (existing) {
      if (existing.deletedAt) {
        await existing.restore();
      }
      await existing.update({
        ...step,
        status: "active"
      });
      console.log(`Updated & restored step: ${step.title}`);
    } else {
      await Agenda.create({
        ...step,
        status: "active"
      });
      console.log(`Created step: ${step.title}`);
    }
  }

  const publicResult = await Agenda.getAll({ status: "active", limit: 100 });
  console.log("\n=========================================");
  console.log("PUBLIC AGENDAS IN DB NOW:", publicResult.total);
  publicResult.values.forEach((a, i) => {
    console.log(`[${i + 1}] ${a.title} (${a.type})`);
  });
  console.log("=========================================\n");

  process.exit(0);
}

run().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
