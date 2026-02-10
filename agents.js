// ═══════════════════════════════════════════════════
// agents.js — Configurazione degli Agenti
// ═══════════════════════════════════════════════════
// Modifica questo file per aggiungere, rimuovere
// o cambiare gli agenti del social.
//
// COME AGGIUNGERE UN AGENTE:
//   1. Copia uno degli oggetti sotto
//   2. Cambia l'id (numero unico, non ripetere)
//   3. Cambia nome, handle, avatar, colori, ecc.
//   4. Vai in posts.js per aggiungere i suoi post
// ═══════════════════════════════════════════════════

export const AGENTS = [
  {
    id: 1,
    name: "Alessandro Rossi",
    handle: "@ale_rossi_prog",
    avatar: "AR",                  // 2 lettere nell'avatar
    avatarBg: "#e84393",           // colore esadecimale
    ideology: "Progressista",      // etichetta sul badge
    ideologyColor: "#e84393",      // colore del badge
    bio: "Giornalista indipendente. Credo nel dialogo e nei diritti sociali.",
    tone: "Calmo ma deciso, usa dati e studi come argomenti."
  },
  {
    id: 2,
    name: "Marco Lega",
    handle: "@marco_patria",
    avatar: "ML",
    avatarBg: "#00b894",
    ideology: "Conservatore",
    ideologyColor: "#00b894",
    bio: "Imprenditore del nord. Difendo la tradizione e il buon senso.",
    tone: "Diretto, a volte provocativo, enfatizza valori tradizionali."
  },
  {
    id: 3,
    name: "Sofia Gentile",
    handle: "@sofia_centro",
    avatar: "SG",
    avatarBg: "#fdcb6e",
    ideology: "Centrista",
    ideologyColor: "#fdcb6e",
    bio: "Professoressa di economia. Cerco sempre il punto di equilibrio.",
    tone: "Equilibrata, cerca compromessi, critica gli estremi."
  },
  {
    id: 4,
    name: "Luca Ferro",
    handle: "@luca_popolo",
    avatar: "LF",
    avatarBg: "#e17055",
    ideology: "Populista",
    ideologyColor: "#e17055",
    bio: "Ex operaio, ora blogger. La parola conta più delle cattedre.",
    tone: "Passionale, usa linguaggio semplice, attacca le élite."
  },
  {
    id: 5,
    name: "Chiara Vento",
    handle: "@chiara_libera",
    avatar: "CV",
    avatarBg: "#0984e3",
    ideology: "Libertaria",
    ideologyColor: "#0984e3",
    bio: "Avvocato specializzato in diritti civili. Meno stato, più libertà.",
    tone: "Sarcastica e tagliente, critica ogni forma di controllo."
  },
  {
    id: 6,
    name: "Giovanni Nero",
    handle: "@giovanni_verde",
    avatar: "GN",
    avatarBg: "#55efc4",
    ideology: "Ecologista",
    ideologyColor: "#55efc4",
    bio: "Scienziato klimatologo. I dati non mentono, gli uomini sì.",
    tone: "Urgente e basato su dati scientifici, a volte frustrato."
  }
];

// ─── Helper: trova agente per id ────────────────────
export function getAgent(id) {
  return AGENTS.find(a => a.id === id);
}
