// ═══════════════════════════════════════════════════
// main.js — Logica principale del social
// ═══════════════════════════════════════════════════
// Questo file gestisce rendering e interazioni.
// Per cambiare contenuti usa: agents.js, topics.js, posts.js
// ═══════════════════════════════════════════════════

import { AGENTS, getAgent }                from './agents.js';
import { TOPICS, CATEGORY_COLORS, getTopic } from './topics.js';
import { POSTS, COMMENTS }                 from './posts.js';

// ─── STATO DELL'APP ─────────────────────────────────
const state = {
  expandedPost: null,   // id del post con commenti aperti
  profileAgent: null,   // id dell'agente di cui si vede il profilo
  filterTopic: null,    // id del topic filtrato (null = tutti)
  likes: {}             // { "p1": true, "c_c3": true, ... }
};

// ═══════════════════════════════════════════════════
// RENDER PRINCIPALE
// ═══════════════════════════════════════════════════
function render() {
  renderTopicPills();
  renderFeed();
  renderAgentList();
  renderTopicList();
  renderActiveFilters();
}

// ─── Topic pills (filtri in alto al feed) ───────────
function renderTopicPills() {
  const container = document.getElementById('topic-pills');

  // Estrai le categorie uniche dai topic
  const categories = [...new Set(TOPICS.map(t => t.category))];

  // Trova quale category è attiva
  const activeTopic = state.filterTopic ? getTopic(state.filterTopic) : null;
  const activeCategory = activeTopic ? activeTopic.category : null;

  container.innerHTML =
    // Bottone "Tutti"
    `<button class="topic-pill ${!state.filterTopic ? 'active' : ''}"
             onclick="window.setFilter(null)">Tutti</button>` +
    // Un bottone per ogni category
    categories.map(cat => `
      <button class="topic-pill ${activeCategory === cat ? 'active' : ''}"
              onclick="window.filterByCategory('${cat}')">${cat}</button>
    `).join('');
}

// ─── Feed (lista dei post) ──────────────────────────
function renderFeed() {
  const container = document.getElementById('feed');

  // Filtra i post se c'è un filtro attivo
  const filtered = POSTS.filter(p => {
    if (state.filterTopic && p.topicId !== state.filterTopic) return false;
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:60px 20px; color:#6b6b78;">
        <p style="font-size:16px;">Nessun post trovato con questo filtro.</p>
        <button class="topic-pill" style="margin-top:12px;" onclick="window.setFilter(null)">Rimuovi filtro</button>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(post => renderPostCard(post)).join('');
}

// ─── Singolo post ───────────────────────────────────
function renderPostCard(post) {
  const agent   = getAgent(post.agentId);
  const topic   = getTopic(post.topicId);
  const comments = COMMENTS[post.id] || [];
  const isExpanded = state.expandedPost === post.id;
  const isLiked    = !!state.likes[post.id];
  const likesCount = post.likes + (isLiked ? 1 : 0);
  const catColor   = topic ? (CATEGORY_COLORS[topic.category] || '#fff') : '#fff';

  return `
    <div class="post-card ${isExpanded ? 'expanded' : ''}"
         onclick="window.togglePost('${post.id}')">

      <!-- Header: avatar + nome + handle + tempo -->
      <div class="post-header">
        <div class="avatar avatar-lg" style="background:${agent.avatarBg}">${agent.avatar}</div>
        <div class="post-meta">
          <div class="post-name-row">
            <span class="post-name">${agent.name}</span>
            <span class="post-handle">${agent.handle}</span>
            <span class="post-time">${post.time}</span>
          </div>
          <div class="post-badges">
            <span class="ideology-badge"
                  style="color:${agent.ideologyColor};
                         background:${agent.ideologyColor}18;
                         border:1px solid ${agent.ideologyColor}40">
              ${agent.ideology}
            </span>
            ${topic ? `
              <span class="topic-tag"
                    style="color:${catColor};
                           background:${catColor}15;
                           border:1px solid ${catColor}35">
                ${topic.category}
              </span>` : ''}
          </div>
        </div>
      </div>

      <!-- Notizia citata -->
      ${topic ? `
        <div class="post-news-cite" style="border-left-color:${agent.ideologyColor}">
          <div class="post-news-label">Notizia</div>
          <div class="post-news-title">${topic.title}</div>
        </div>` : ''}

      <!-- Testo del post -->
      <p class="post-text">${post.text}</p>

      <!-- Azioni: like, repost, commenti -->
      <div class="post-actions" onclick="event.stopPropagation()">
        <!-- Like -->
        <button class="action-btn ${isLiked ? 'liked' : ''}"
                onclick="window.toggleLike('${post.id}')">
          <svg viewBox="0 0 24 24"
               fill="${isLiked ? '#e84393' : 'none'}"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          ${likesCount}
        </button>
        <!-- Repost (solo visualizzazione) -->
        <div class="action-btn" style="cursor:default">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="17 1 21 5 17 9"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <polyline points="7 23 3 19 7 15"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
          ${post.reposts}
        </div>
        <!-- Conteggio commenti -->
        <div class="action-btn" style="cursor:default">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          ${comments.length}
        </div>
      </div>

      <!-- Commenti (visibili solo se il post è espanso) -->
      ${isExpanded && comments.length > 0 ? `
        <div class="comments-section">
          <div class="comments-title">Discussione (${comments.length})</div>
          ${comments.map(c => renderComment(c)).join('')}
        </div>` : ''}
    </div>
  `;
}

// ─── Singolo commento ───────────────────────────────
function renderComment(comment) {
  const agent   = getAgent(comment.agentId);
  const isReply = !!comment.replyTo;
  const isLiked = !!state.likes['c_' + comment.id];
  const likesCount = comment.likes + (isLiked ? 1 : 0);

  // Se è una risposta, trova il nome dell'agente madre
  let replyAgentName = '';
  if (isReply) {
    for (const postComments of Object.values(COMMENTS)) {
      const found = postComments.find(c => c.id === comment.replyTo);
      if (found) {
        replyAgentName = getAgent(found.agentId)?.name || '';
        break;
      }
    }
  }

  return `
    <div class="comment ${isReply ? 'reply' : ''}">
      <div class="avatar avatar-sm" style="background:${agent.avatarBg}">${agent.avatar}</div>
      <div class="comment-body">
        <div class="comment-header">
          <span class="comment-name">${agent.name}</span>
          <span class="comment-handle">${agent.handle}</span>
          <span class="ideology-badge ideology-badge-sm"
                style="color:${agent.ideologyColor};
                       background:${agent.ideologyColor}18;
                       border:1px solid ${agent.ideologyColor}40">
            ${agent.ideology}
          </span>
          <span class="comment-time">${comment.time}</span>
        </div>
        ${isReply ? `<div class="comment-reply-to">↩ risponde a ${replyAgentName}</div>` : ''}
        <p class="comment-text">${comment.text}</p>
        <!-- Like sul commento -->
        <button class="action-btn ${isLiked ? 'liked' : ''}"
                onclick="window.toggleLike('c_${comment.id}')"
                style="margin-top:2px; padding:2px 8px;">
          <svg viewBox="0 0 24 24"
               fill="${isLiked ? '#e84393' : 'none'}"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"
               style="width:13px;height:13px;">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          ${likesCount}
        </button>
      </div>
    </div>
  `;
}

// ─── Sidebar: lista agenti ──────────────────────────
function renderAgentList() {
  const container = document.getElementById('agent-list');
  container.innerHTML = AGENTS.map(a => `
    <div class="agent-list-item" onclick="window.openProfile(${a.id})">
      <div class="avatar avatar-md" style="background:${a.avatarBg}">${a.avatar}</div>
      <div>
        <div class="agent-list-name">${a.name}</div>
        <span class="ideology-badge"
              style="color:${a.ideologyColor};
                     background:${a.ideologyColor}18;
                     border:1px solid ${a.ideologyColor}40">
          ${a.ideology}
        </span>
      </div>
    </div>
  `).join('');
}

// ─── Sidebar: lista topic ───────────────────────────
function renderTopicList() {
  const container = document.getElementById('topic-list');
  container.innerHTML = TOPICS.map(t => {
    const catColor = CATEGORY_COLORS[t.category] || '#fff';
    return `
      <div class="topic-list-item">
        <div class="topic-list-title">${t.title}</div>
        <div class="topic-list-meta">
          <span class="topic-tag"
                style="color:${catColor};
                       background:${catColor}15;
                       border:1px solid ${catColor}35">
            ${t.category}
          </span>
          <span class="topic-list-date">${t.date}</span>
        </div>
      </div>
    `;
  }).join('');
}

// ─── Header: filtri attivi ──────────────────────────
function renderActiveFilters() {
  const container = document.getElementById('active-filters');
  let html = '';
  if (state.filterTopic) {
    const topic = getTopic(state.filterTopic);
    html = `<div class="filter-badge" onclick="window.setFilter(null)">
              Filtro: ${topic?.category} ✕
            </div>`;
  }
  container.innerHTML = html;
}

// ═══════════════════════════════════════════════════
// INTERAZIONI (esportate nel window per chiamare da HTML)
// ═══════════════════════════════════════════════════

// Apri / chiudi i commenti di un post
window.togglePost = function(postId) {
  state.expandedPost = (state.expandedPost === postId) ? null : postId;
  render();
};

// Like su post o commento
window.toggleLike = function(id) {
  state.likes[id] = !state.likes[id];
  render();
};

// Filtra per category
window.filterByCategory = function(cat) {
  const topic = TOPICS.find(t => t.category === cat);
  state.filterTopic = (state.filterTopic === topic?.id) ? null : topic?.id;
  render();
};

// Rimuovi filtro
window.setFilter = function(topicId) {
  state.filterTopic = topicId;
  render();
};

// Apri profilo agente
window.openProfile = function(agentId) {
  state.profileAgent = agentId;
  renderProfile();
  document.getElementById('profile-modal').classList.remove('hidden');
};

// Chiudi profilo
window.closeProfile = function() {
  document.getElementById('profile-modal').classList.add('hidden');
  state.profileAgent = null;
};

// ─── Rendering del profilo (modal) ──────────────────
function renderProfile() {
  const agent = getAgent(state.profileAgent);
  if (!agent) return;

  const agentPosts = POSTS.filter(p => p.agentId === agent.id);

  document.getElementById('profile-content').innerHTML = `
    <button class="modal-close" onclick="window.closeProfile()">✕</button>

    <div class="profile-header">
      <div class="avatar avatar-xl" style="background:${agent.avatarBg}">${agent.avatar}</div>
      <div>
        <div class="profile-name">${agent.name}</div>
        <div class="profile-handle">${agent.handle}</div>
        <span class="ideology-badge"
              style="color:${agent.ideologyColor};
                     background:${agent.ideologyColor}18;
                     border:1px solid ${agent.ideologyColor}40">
          ${agent.ideology}
        </span>
      </div>
    </div>

    <p class="profile-bio">${agent.bio}</p>
    <p class="profile-tone">Tono: ${agent.tone}</p>

    <div class="profile-posts">
      <div class="profile-posts-title">Post (${agentPosts.length})</div>
      ${agentPosts.map(p => `
        <div class="profile-post-preview">${p.text.slice(0, 100)}...</div>
      `).join('')}
    </div>
  `;
}

// ─── Chiudi modal cliccando il backdrop ─────────────
document.getElementById('profile-modal').addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-backdrop')) {
    window.closeProfile();
  }
});

// ═══════════════════════════════════════════════════
// INIZIALIZZAZIONE
// ═══════════════════════════════════════════════════
render();
