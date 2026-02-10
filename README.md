# PoliTalk — Social Media Template (Open Source)

## Cosa è questo progetto?
Un template open source di un social media dove degli "agenti" con personalità
diverse postano, commentano e dibattono su topic a scelta tua.
Tutto è statico: niente backend, niente API, niente server.

## Licenza
MIT — puoi usarlo, modificarlo, distribuirlo come vuoi.
Unica cosa: se lo redistribuisci, lascia il copyright nel file LICENSE.

## Come avviare
Nessuna installazione necessaria. Apri `index.html` nel browser e hai finito.
Il progetto è vanilla HTML/CSS/JS — niente framework, niente dipendenze.

---

## Struttura del progetto

```
politalk/
├── index.html          → pagina principale
├── style.css           → tutti gli stili (tema scuro)
├── main.js             → logica principale dell'app
├── agents.js           → configurazione degli agenti
├── posts.js            → post e commenti
├── topics.js           → le notizie/topic del feed
├── LICENSE             → licenza MIT
└── README.md           → questo file
```

---

## Come modificare

### 1. Aggiungere / cambiare un agente
Apri `agents.js`. Ogni agente è un oggetto con questi campi:

| Campo           | Cosa è                                      | Esempio            |
|-----------------|---------------------------------------------|--------------------|
| `id`            | Numero unico (non ripetere)                 | `7`                |
| `name`          | Nome visualizzato                           | `"Paolo Bianchi"`  |
| `handle`        | Username con @                              | `"@paolo_tech"`    |
| `avatar`        | 2 lettere nell'avatar                       | `"PB"`             |
| `avatarBg`      | Colore esadecimale dell'avatar              | `"#6c5ce7"`        |
| `ideology`      | Etichetta politica/posizione                | `"Technocrata"`    |
| `ideologyColor` | Colore del badge                            | `"#6c5ce7"`        |
| `bio`           | Descrizione sul profilo                     | `"Ingegnere..."`   |
| `tone`          | Descrizione del tono di comunicazione       | `"Sarcastico..."`  |

Esempio completo:
```javascript
{
  id: 7,
  name: "Paolo Bianchi",
  handle: "@paolo_tech",
  avatar: "PB",
  avatarBg: "#6c5ce7",
  ideology: "Technocrata",
  ideologyColor: "#6c5ce7",
  bio: "Ingegnere software. Le soluzioni tecnologiche vengono prima della politica.",
  tone: "Tecnico e preciso, cita sempre benchmark e performance metrics."
}
```

### 2. Aggiungere un topic (notizia)
Apri `topics.js`. Ogni topic ha:

| Campo      | Cosa è                                  | Esempio                  |
|------------|-----------------------------------------|--------------------------|
| `id`       | Stringa unica                           | `"n6"`                   |
| `title`    | Titolo della notizia                    | `"Nuova legge su..."`    |
| `category` | Categoria (usata per filtro e colore)   | `"Tecnologia"`           |
| `date`     | Quando è apparsa                        | `"Oggi"`                 |

Se aggiungi una nuova category, aggiungi anche il suo colore nell'oggetto
`CATEGORY_COLORS` nello stesso file.

### 3. Aggiungere un post
Apri `posts.js`, nell'array `POSTS`. Ogni post ha:

| Campo      | Cosa è                                          | Esempio       |
|------------|-------------------------------------------------|---------------|
| `id`       | Stringa unica                                   | `"p13"`       |
| `agentId`  | Id dell'agente che posta (da agents.js)         | `2`           |
| `topicId`  | Id della notizia citata (da topics.js)          | `"n1"`        |
| `text`     | Contenuto del post                              | `"Secondo..."`|
| `likes`    | Numero iniziale di like                         | `142`         |
| `reposts`  | Numero iniziale di repost                       | `34`          |
| `time`     | Quando è stato postato                          | `"2h"`        |

### 4. Aggiungere commenti
Nel oggetto `COMMENTS` in `posts.js`, aggiungi una chiave uguale all'id del post
e un array di commenti:

```javascript
"p13": [
  { id: "c20", agentId: 2, text: "Commento qui...",  likes: 10, time: "1h",  replyTo: null   },
  { id: "c21", agentId: 5, text: "Risposta qui...",  likes: 5,  time: "30m", replyTo: "c20" }
]
```

Il campo `replyTo`:
- `null` → commento principale (nessuna risposta)
- `"c20"` → è una risposta al commento con id "c20" (viene mostrato indentato)

---

## Personalizzare il tema
Tutti i colori sono definiti come variabili CSS in `style.css`, in alto nel file:

```css
:root {
  --bg: #0a0a0f;              /* sfondo principale */
  --surface: #131318;          /* sfondo carte */
  --border: #2a2a35;           /* colore bordi */
  --text: #e2e2e8;             /* testo principale */
  --text-muted: #6b6b78;       /* testo secondario */
  --accent: #7c5cfc;           /* colore accento (viola) */
}
```

Cambia questi valori per ottenere un tema completamente diverso.
