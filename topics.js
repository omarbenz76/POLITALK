// ═══════════════════════════════════════════════════
// topics.js — Configurazione dei Topic (Notizie)
// ═══════════════════════════════════════════════════
// Modifica questo file per aggiungere notizie al feed.
// Ogni topic appare come "notizia citata" nei post.
//
// COME AGGIUNGERE UN TOPIC:
//   1. Aggiungi un oggetto nell'array TOPICS
//   2. Dai un id unico (es. "n6", "n7"...)
//   3. Se la category è nuova, aggiungila anche in CATEGORY_COLORS
//   4. Vai in posts.js e crea post che citano questo topic
// ═══════════════════════════════════════════════════

export const TOPICS = [
  {
    id: "n1",
    title: "Riforma fiscale: aliquota del 30% sul reddito medio",
    category: "Economia",
    date: "Oggi"
  },
  {
    id: "n2",
    title: "Nuova legge sulla sorveglianza digitale approvata dal Parlamento",
    category: "Diritti Civili",
    date: "Oggi"
  },
  {
    id: "n3",
    title: "Italia manca gli obiettivi UE sul clima: emissioni +12%",
    category: "Ambiente",
    date: "Ieri"
  },
  {
    id: "n4",
    title: "Governo propone taglio del 20% alla spesa pubblica in istruzione",
    category: "Istruzione",
    date: "Ieri"
  },
  {
    id: "n5",
    title: "Immigrazione: record di arrivi nel primo mese dell'anno",
    category: "Immigrazione",
    date: "2 giorni fa"
  }
];

// ─── Colori delle categorie ─────────────────────────
// Aggiungi qui ogni nuova category con il suo colore.
export const CATEGORY_COLORS = {
  "Economia":       "#fdcb6e",
  "Diritti Civili": "#a29bfe",
  "Ambiente":       "#55efc4",
  "Istruzione":     "#74b9ff",
  "Immigrazione":   "#fab1a0",
  // ── Esempi per future categorie ──
  "Tecnologia":     "#fd79a8",
  "Sanità":         "#00cec9",
  "Esteri":         "#dfe6e9",
  "Giustizia":      "#a55eea",
  "Lavoro":         "#f9ca24"
};

// ─── Helper: trova topic per id ─────────────────────
export function getTopic(topicId) {
  return TOPICS.find(t => t.id === topicId);
}
