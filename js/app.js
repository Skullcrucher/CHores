/* ============================================
   CHORES - Application familiale v2
   ============================================ */

const STORAGE_KEY = 'chores_v2';
const BACKUP_KEY = 'chores_backups_v2';
const RATE_DEFAULT = 0.10;
const MAX_AUTO_BACKUPS = 5;
const APP_VERSION = '2.0.0';

const AVATARS = [
  { id: 'boy1', emoji: '👦', color: '#60A5FA' },
  { id: 'girl1', emoji: '👧', color: '#F472B6' },
  { id: 'man1', emoji: '👨', color: '#34D399' },
  { id: 'woman1', emoji: '👩', color: '#A78BFA' },
  { id: 'boy2', emoji: '🧒', color: '#FBBF24' },
  { id: 'girl2', emoji: '👱‍♀️', color: '#FB7185' },
  { id: 'man2', emoji: '🧔', color: '#2DD4BF' },
  { id: 'woman2', emoji: '👩‍🦰', color: '#F97316' },
  { id: 'kid1', emoji: '👶', color: '#818CF8' },
  { id: 'cat', emoji: '🐱', color: '#F59E0B' },
  { id: 'dog', emoji: '🐶', color: '#EF4444' },
  { id: 'fox', emoji: '🦊', color: '#F97316' },
  { id: 'panda', emoji: '🐼', color: '#64748B' },
  { id: 'unicorn', emoji: '🦄', color: '#C084FC' },
  { id: 'robot', emoji: '🤖', color: '#94A3B8' },
];

const TITLES = [
  { level: 1,  name: 'Débutant',         emoji: '🌱' },
  { level: 3,  name: 'Apprenti',          emoji: '📘' },
  { level: 5,  name: 'Aide à domicile',   emoji: '🧹' },
  { level: 8,  name: 'Pro du ménage',     emoji: '✨' },
  { level: 12, name: 'Champion familial', emoji: '🏆' },
  { level: 16, name: 'Maître des tâches', emoji: '👑' },
  { level: 20, name: 'Légende du foyer',  emoji: '🌟' },
  { level: 25, name: 'Super Héros',       emoji: '🦸' },
  { level: 30, name: 'Dieu du ménage',    emoji: '⚡' },
];

const CATEGORY_LABELS = {
  cuisine: '🍳 Cuisine',
  menage: '🧹 Ménage',
  linge: '👕 Linge',
  exterieur: '🌳 Extérieur',
  animaux: '🐾 Animaux',
  autre: '📦 Autre',
};

const FELT_LABELS = {
  1: 'Facile',
  2: 'Normale',
  3: 'Difficile',
  4: 'Très dure',
};

/** Catalogue de tâches prédéfinies */
const DEFAULT_TEMPLATES = [
  // Cuisine
  { name: 'Mettre la table', category: 'cuisine', points: 5, difficulty: 'facile' },
  { name: 'Débarrasser la table', category: 'cuisine', points: 5, difficulty: 'facile' },
  { name: 'Vider le lave-vaisselle', category: 'cuisine', points: 10, difficulty: 'facile' },
  { name: 'Remplir le lave-vaisselle', category: 'cuisine', points: 10, difficulty: 'facile' },
  { name: 'Faire la vaisselle à la main', category: 'cuisine', points: 20, difficulty: 'moyen' },
  { name: 'Nettoyer le plan de travail', category: 'cuisine', points: 10, difficulty: 'facile' },
  { name: 'Nettoyer la table', category: 'cuisine', points: 5, difficulty: 'facile' },
  { name: 'Sortir les poubelles', category: 'cuisine', points: 10, difficulty: 'facile' },
  { name: 'Trier le recyclage', category: 'cuisine', points: 10, difficulty: 'facile' },
  { name: 'Aider à préparer le repas', category: 'cuisine', points: 25, difficulty: 'moyen' },
  { name: 'Préparer un repas simple', category: 'cuisine', points: 40, difficulty: 'difficile' },
  { name: 'Nettoyer le micro-ondes', category: 'cuisine', points: 15, difficulty: 'moyen' },
  { name: 'Nettoyer le four', category: 'cuisine', points: 30, difficulty: 'difficile' },
  { name: 'Faire les courses (aide)', category: 'cuisine', points: 20, difficulty: 'moyen' },
  // Ménage
  { name: 'Passer l\'aspirateur (1 pièce)', category: 'menage', points: 15, difficulty: 'moyen' },
  { name: 'Passer l\'aspirateur (tout)', category: 'menage', points: 30, difficulty: 'difficile' },
  { name: 'Balayer le sol', category: 'menage', points: 10, difficulty: 'facile' },
  { name: 'Passer la serpillière', category: 'menage', points: 20, difficulty: 'moyen' },
  { name: 'Faire son lit', category: 'menage', points: 5, difficulty: 'facile' },
  { name: 'Ranger sa chambre', category: 'menage', points: 15, difficulty: 'moyen' },
  { name: 'Ranger le salon', category: 'menage', points: 15, difficulty: 'moyen' },
  { name: 'Dépoussiérer les meubles', category: 'menage', points: 15, difficulty: 'moyen' },
  { name: 'Nettoyer les vitres (1 pièce)', category: 'menage', points: 20, difficulty: 'moyen' },
  { name: 'Nettoyer la salle de bain', category: 'menage', points: 30, difficulty: 'difficile' },
  { name: 'Nettoyer les toilettes', category: 'menage', points: 20, difficulty: 'moyen' },
  { name: 'Changer les draps', category: 'menage', points: 15, difficulty: 'moyen' },
  { name: 'Vider les corbeilles', category: 'menage', points: 5, difficulty: 'facile' },
  // Linge
  { name: 'Mettre une machine', category: 'linge', points: 10, difficulty: 'facile' },
  { name: 'Étendre le linge', category: 'linge', points: 15, difficulty: 'moyen' },
  { name: 'Plier le linge', category: 'linge', points: 15, difficulty: 'moyen' },
  { name: 'Ranger le linge dans les armoires', category: 'linge', points: 10, difficulty: 'facile' },
  { name: 'Repasser (petit lot)', category: 'linge', points: 25, difficulty: 'difficile' },
  // Extérieur
  { name: 'Arroser les plantes', category: 'exterieur', points: 10, difficulty: 'facile' },
  { name: 'Tondre la pelouse', category: 'exterieur', points: 40, difficulty: 'difficile' },
  { name: 'Ramasser les feuilles', category: 'exterieur', points: 20, difficulty: 'moyen' },
  { name: 'Nettoyer le jardin / terrasse', category: 'exterieur', points: 25, difficulty: 'moyen' },
  { name: 'Laver la voiture', category: 'exterieur', points: 40, difficulty: 'difficile' },
  { name: 'Sortir les poubelles de jardin', category: 'exterieur', points: 10, difficulty: 'facile' },
  // Animaux
  { name: 'Nourrir les animaux', category: 'animaux', points: 5, difficulty: 'facile' },
  { name: 'Promener le chien', category: 'animaux', points: 20, difficulty: 'moyen' },
  { name: 'Nettoyer la litière', category: 'animaux', points: 15, difficulty: 'moyen' },
  { name: 'Brosser l\'animal', category: 'animaux', points: 10, difficulty: 'facile' },
  // Autre
  { name: 'Aider un frère / une sœur', category: 'autre', points: 15, difficulty: 'moyen' },
  { name: 'Ranger les jouets / affaires', category: 'autre', points: 10, difficulty: 'facile' },
  { name: 'Préparer son cartable', category: 'autre', points: 5, difficulty: 'facile' },
  { name: 'Aider aux devoirs (frère/sœur)', category: 'autre', points: 20, difficulty: 'moyen' },
];

function xpForLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.5));
}

// ---------- STATE ----------
let state = {
  profiles: [],
  templates: [],
  tasks: [],
  currentProfileId: null,
  settings: { rate: RATE_DEFAULT, theme: 'default' },
  lastMonthCheck: null,
};

let editingProfileId = null;
let selectedAvatar = 'boy1';
let selectedProfileType = 'child';
let selectedTemplatePoints = 15;
let pendingCompleteTaskId = null;
let selectedFelt = 2;
let pendingPasswordProfileId = null;
let editingTemplateId = null;

// ---------- PERSISTENCE ----------
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
    }
  } catch (e) {
    console.warn('Erreur chargement', e);
    const backups = getAutoBackups();
    if (backups.length > 0) {
      try { state = { ...state, ...backups[0].data }; } catch (_) {}
    }
  }
  if (!state.templates || state.templates.length === 0) {
    seedTemplates();
  }
}

function seedTemplates() {
  state.templates = DEFAULT_TEMPLATES.map((t, i) => ({
    id: 'tpl_' + (i + 1),
    name: t.name,
    category: t.category,
    points: t.points,
    difficulty: t.difficulty,
    active: true,
  }));
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    createAutoBackup();
  } catch (e) {
    console.error('Erreur sauvegarde', e);
    showToast('⚠️ Espace de stockage insuffisant');
  }
}

function getAutoBackups() {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function createAutoBackup() {
  try {
    let backups = getAutoBackups();
    const snapshot = {
      id: 'bak_' + Date.now(),
      date: new Date().toISOString(),
      version: APP_VERSION,
      profilesCount: state.profiles.length,
      tasksCount: state.tasks.filter(t => !t.archived && !t.done).length,
      data: JSON.parse(JSON.stringify(state)),
    };
    if (backups.length > 0) {
      const last = new Date(backups[0].date).getTime();
      if (Date.now() - last < 30000) backups[0] = snapshot;
      else backups.unshift(snapshot);
    } else {
      backups.unshift(snapshot);
    }
    backups = backups.slice(0, MAX_AUTO_BACKUPS);
    localStorage.setItem(BACKUP_KEY, JSON.stringify(backups));
  } catch (e) { console.warn('Auto-backup échoué', e); }
}

function restoreAutoBackup(backupId) {
  const bak = getAutoBackups().find(b => b.id === backupId);
  if (!bak) { showToast('Sauvegarde introuvable'); return; }
  if (!confirm(`Restaurer la sauvegarde du ${formatDateTime(bak.date)} ?\n\nLes données actuelles seront remplacées.`)) return;
  state = JSON.parse(JSON.stringify(bak.data));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  showToast('Sauvegarde restaurée ✔');
  setTimeout(() => location.reload(), 600);
}

function formatDateTime(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
}

function formatMoney(n) {
  return (n || 0).toFixed(2).replace('.', ',') + ' €';
}

function renderAutoBackups() {
  const list = document.getElementById('auto-backups-list');
  if (!list) return;
  const backups = getAutoBackups();
  if (backups.length === 0) {
    list.innerHTML = '<div class="backups-empty">Aucune sauvegarde automatique</div>';
    return;
  }
  list.innerHTML = backups.map(b => `
    <div class="backup-item">
      <div class="backup-info">
        <div class="backup-date">${formatDateTime(b.date)}</div>
        <div class="backup-meta">${b.profilesCount} membre(s) · ${b.tasksCount} tâche(s)</div>
      </div>
      <button class="btn-restore" data-id="${b.id}">Restaurer</button>
    </div>
  `).join('');
  list.querySelectorAll('.btn-restore').forEach(btn => {
    btn.addEventListener('click', () => restoreAutoBackup(btn.dataset.id));
  });
}

// ---------- MONTHLY ----------
function checkMonthlyReset() {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  if (state.lastMonthCheck === currentMonth) return;

  state.profiles.forEach(p => {
    if (p.type === 'child' && (p.investedPoints || 0) > 0) {
      const interest = Math.floor(p.investedPoints * 0.10);
      if (interest > 0) {
        p.points = (p.points || 0) + interest;
        p.pointsTotal = (p.pointsTotal || 0) + interest;
        p.investHistory = p.investHistory || [];
        p.investHistory.unshift({ date: new Date().toISOString(), amount: interest, type: 'interest' });
      }
    }
    p.convertedThisMonth = 0;
  });
  state.lastMonthCheck = currentMonth;
  saveState();
}

// ---------- HELPERS ----------
function getCurrentProfile() {
  return state.profiles.find(p => p.id === state.currentProfileId);
}

function getTitleForLevel(level) {
  let title = TITLES[0];
  for (const t of TITLES) if (level >= t.level) title = t;
  return title;
}

function showToast(msg, duration = 2500) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function avatarSVG(avatarId, size = 80) {
  const a = AVATARS.find(x => x.id === avatarId) || AVATARS[0];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="${a.color}"/>
    <text x="50" y="62" font-size="48" text-anchor="middle" dominant-baseline="middle">${a.emoji}</text>
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

/** Hash simple pour mot de passe (pas crypto fort, mais suffisant hors-ligne) */
async function hashPassword(pwd) {
  const enc = new TextEncoder().encode('chores_salt_' + pwd);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ---------- PROFILES UI ----------
function renderProfiles() {
  const grid = document.getElementById('profiles-grid');
  if (state.profiles.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="emoji">👨‍👩‍👧‍👦</div>
        <p>Aucun membre.<br>Ajoute un parent ou un enfant !</p>
      </div>`;
    return;
  }
  grid.innerHTML = state.profiles.map(p => {
    const isParent = p.type === 'parent';
    const title = getTitleForLevel(p.level || 1);
    return `
      <div class="profile-card ${isParent ? 'parent-card' : ''}" data-id="${p.id}">
        <img class="avatar" src="${avatarSVG(p.avatar)}" alt="${p.name}">
        <div class="name">${p.name}</div>
        ${isParent
          ? '<div class="badge-parent">🔑 Parent</div>'
          : `<div class="level-mini">Niv. ${p.level || 1} · ${title.emoji}</div>`}
      </div>`;
  }).join('');

  grid.querySelectorAll('.profile-card').forEach(card => {
    card.addEventListener('click', () => onProfileClick(card.dataset.id));
  });
}

function onProfileClick(profileId) {
  const p = state.profiles.find(x => x.id === profileId);
  if (!p) return;
  if (p.type === 'parent') {
    pendingPasswordProfileId = profileId;
    document.getElementById('password-input').value = '';
    document.getElementById('password-hint').textContent = `Mot de passe de ${p.name}`;
    openModal('modal-password');
  } else {
    state.currentProfileId = profileId;
    saveState();
    showMainChild();
  }
}

async function checkPassword() {
  const pwd = document.getElementById('password-input').value;
  const p = state.profiles.find(x => x.id === pendingPasswordProfileId);
  if (!p) return;
  const hash = await hashPassword(pwd);
  if (hash !== p.passwordHash) {
    showToast('Mot de passe incorrect');
    return;
  }
  closeModal('modal-password');
  state.currentProfileId = p.id;
  saveState();
  showMainAdmin();
}

function showMainChild() {
  const p = getCurrentProfile();
  if (!p || p.type !== 'child') return;
  document.getElementById('profile-select').classList.remove('active');
  document.getElementById('main-admin').classList.remove('active');
  document.getElementById('main').classList.add('active');

  document.getElementById('current-avatar').src = avatarSVG(p.avatar, 42);
  document.getElementById('current-name').textContent = p.name;
  const title = getTitleForLevel(p.level || 1);
  document.getElementById('current-title').textContent = `${title.emoji} ${title.name}`;

  updateStatsBar();
  renderChildTasks();
  renderWallet();
  renderInvest();
  renderProgress();
}

function showMainAdmin() {
  const p = getCurrentProfile();
  if (!p || p.type !== 'parent') return;
  document.getElementById('profile-select').classList.remove('active');
  document.getElementById('main').classList.remove('active');
  document.getElementById('main-admin').classList.add('active');

  document.getElementById('admin-avatar').src = avatarSVG(p.avatar, 42);
  document.getElementById('admin-name').textContent = p.name;

  renderAdminTasks();
  renderAdminCatalog();
  renderAssignForm();
  renderAdminFamily();
}

function updateStatsBar() {
  const p = getCurrentProfile();
  if (!p) return;
  document.getElementById('stat-points').textContent = p.points || 0;
  document.getElementById('stat-wallet').textContent = formatMoney(p.wallet || 0);
  document.getElementById('stat-level').textContent = p.level || 1;
  document.getElementById('stat-invest').textContent = p.investedPoints || 0;
}

function backToProfiles() {
  document.getElementById('main').classList.remove('active');
  document.getElementById('main-admin').classList.remove('active');
  document.getElementById('profile-select').classList.add('active');
  state.currentProfileId = null;
  renderProfiles();
}

// ---------- CHILD TASKS ----------
function renderChildTasks() {
  const p = getCurrentProfile();
  const myTasks = state.tasks.filter(t => t.assigneeId === p.id && !t.archived && !t.done);
  const list = document.getElementById('tasks-list');

  if (myTasks.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="emoji">📋</div><p>Aucune tâche pour le moment.<br>Un parent peut t’en attribuer.</p></div>`;
  } else {
    list.innerHTML = myTasks.map(t => `
      <div class="task-card">
        <button class="task-check" data-id="${t.id}"></button>
        <div class="task-info">
          <div class="task-name">${t.name}</div>
          <div class="task-meta">
            <span class="task-points">${t.points} pts</span>
            <span class="task-cat">${CATEGORY_LABELS[t.category] || t.category || ''}</span>
            ${t.recurrence !== 'once' ? `<span>🔁 ${t.recurrence === 'daily' ? 'Quotidien' : 'Hebdo'}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  }

  list.querySelectorAll('.task-check').forEach(btn => {
    btn.addEventListener('click', () => openDifficultyModal(btn.dataset.id));
  });

  // Catalogue (lecture seule pour l'enfant)
  const catList = document.getElementById('catalog-list');
  const templates = state.templates.filter(t => t.active !== false);
  if (templates.length === 0) {
    catList.innerHTML = `<div class="empty-state"><div class="emoji">📚</div><p>Catalogue vide.</p></div>`;
  } else {
    const byCat = {};
    templates.forEach(t => {
      if (!byCat[t.category]) byCat[t.category] = [];
      byCat[t.category].push(t);
    });
    catList.innerHTML = Object.entries(byCat).map(([cat, items]) => `
      <div style="margin-bottom:0.8rem">
        <div style="font-weight:700;font-size:0.9rem;margin-bottom:0.4rem;color:var(--text-muted)">${CATEGORY_LABELS[cat] || cat}</div>
        ${items.map(t => `
          <div class="catalog-card" style="margin-bottom:0.5rem">
            <div class="task-name">${t.name}</div>
            <div class="task-meta">
              <span class="task-points">${t.points} pts</span>
              <span>${t.difficulty}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('');
  }
}

function openDifficultyModal(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task || task.done) return;
  pendingCompleteTaskId = taskId;
  selectedFelt = 2;
  document.getElementById('diff-task-name').textContent = task.name;
  document.getElementById('diff-points').textContent = task.points;
  document.querySelectorAll('.felt-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.felt) === 2);
  });
  openModal('modal-difficulty');
}

function confirmComplete() {
  const task = state.tasks.find(t => t.id === pendingCompleteTaskId);
  if (!task || task.done) return;
  const profile = state.profiles.find(p => p.id === task.assigneeId);
  if (!profile || profile.type !== 'child') return;

  task.done = true;
  task.completedAt = new Date().toISOString();
  task.feltDifficulty = selectedFelt;

  profile.points = (profile.points || 0) + task.points;
  profile.pointsTotal = (profile.pointsTotal || 0) + task.points;
  profile.tasksDone = (profile.tasksDone || 0) + 1;
  profile.xp = (profile.xp || 0) + task.points;

  let leveled = false;
  while (profile.xp >= xpForLevel((profile.level || 1) + 1)) {
    profile.level = (profile.level || 1) + 1;
    leveled = true;
  }

  if (task.recurrence === 'daily' || task.recurrence === 'weekly') {
    task.archived = true;
    state.tasks.push({
      ...task,
      id: 't_' + Date.now() + Math.random().toString(36).slice(2, 6),
      done: false,
      completedAt: null,
      feltDifficulty: null,
      archived: false,
      createdAt: new Date().toISOString(),
    });
  }

  saveState();
  closeModal('modal-difficulty');
  renderChildTasks();
  updateStatsBar();
  renderProgress();

  showToast(`+${task.points} points ! 🎉`);
  if (leveled) {
    setTimeout(() => {
      const title = getTitleForLevel(profile.level);
      showToast(`Niveau ${profile.level} ! ${title.emoji} ${title.name}`, 3500);
    }, 800);
  }
}

// ---------- WALLET / INVEST / PROGRESS (child only) ----------
function renderWallet() {
  const p = getCurrentProfile();
  if (!p) return;
  document.getElementById('wallet-amount').textContent = formatMoney(p.wallet || 0);
  document.getElementById('wallet-ceiling').textContent = p.ceiling || 20;
  document.getElementById('wallet-converted').textContent = (p.convertedThisMonth || 0).toFixed(2);
  document.getElementById('rate-display').textContent = state.settings.rate.toFixed(2).replace('.', ',');

  const remaining = (p.ceiling || 20) - (p.convertedThisMonth || 0);
  const hint = document.getElementById('convert-hint');
  if (remaining <= 0) {
    hint.textContent = '⚠️ Plafond mensuel atteint.';
    hint.style.color = 'var(--danger)';
  } else {
    hint.textContent = `Il te reste ${remaining.toFixed(2)} € de plafond ce mois-ci.`;
    hint.style.color = 'var(--text-muted)';
  }

  const hist = document.getElementById('wallet-history');
  const history = (p.walletHistory || []).slice(0, 15);
  hist.innerHTML = history.length === 0
    ? '<p class="hint">Aucune conversion ce mois-ci.</p>'
    : history.map(h => `
      <div class="history-item">
        <div>
          <div>${h.points} points → ${formatMoney(h.amount)}</div>
          <div class="date">${formatDate(h.date)}</div>
        </div>
        <div class="amount">+${formatMoney(h.amount)}</div>
      </div>`).join('');
}

function updateConvertPreview() {
  const pts = parseInt(document.getElementById('convert-points').value) || 0;
  document.getElementById('convert-result').textContent = '= ' + formatMoney(pts * state.settings.rate);
}

function convertPoints() {
  const p = getCurrentProfile();
  if (!p || p.type !== 'child') return;
  const pts = parseInt(document.getElementById('convert-points').value) || 0;
  if (pts <= 0) { showToast('Entre un nombre de points valide'); return; }
  if (pts > (p.points || 0)) { showToast('Pas assez de points !'); return; }

  const amount = pts * state.settings.rate;
  const remainingCeiling = (p.ceiling || 20) - (p.convertedThisMonth || 0);
  if (amount > remainingCeiling + 0.001) {
    showToast(`Plafond atteint. Max : ${remainingCeiling.toFixed(2)} €`);
    return;
  }

  p.points -= pts;
  p.wallet = (p.wallet || 0) + amount;
  p.convertedThisMonth = (p.convertedThisMonth || 0) + amount;
  p.moneyTotal = (p.moneyTotal || 0) + amount;
  p.walletHistory = p.walletHistory || [];
  p.walletHistory.unshift({ date: new Date().toISOString(), points: pts, amount });

  saveState();
  document.getElementById('convert-points').value = '';
  updateConvertPreview();
  updateStatsBar();
  renderWallet();
  showToast(`+${formatMoney(amount)} 💰`);
}

function renderInvest() {
  const p = getCurrentProfile();
  if (!p) return;
  const invested = p.investedPoints || 0;
  document.getElementById('invest-total').textContent = invested;
  document.getElementById('invest-monthly').textContent = Math.floor(invested * 0.10);

  const hist = document.getElementById('invest-history-list');
  const history = (p.investHistory || []).slice(0, 10);
  hist.innerHTML = history.length === 0
    ? '<p class="hint">Aucun revenu pour le moment.</p>'
    : history.map(h => `
      <div class="history-item">
        <div>
          <div>${h.type === 'interest' ? '📈 Intérêts mensuels' : '💼 Investissement'}</div>
          <div class="date">${formatDate(h.date)}</div>
        </div>
        <div class="amount">${h.type === 'interest' ? '+' : ''}${h.amount} pts</div>
      </div>`).join('');
}

function investPoints() {
  const p = getCurrentProfile();
  if (!p || p.type !== 'child') return;
  const pts = parseInt(document.getElementById('invest-points').value) || 0;
  if (pts <= 0) { showToast('Entre un nombre valide'); return; }
  if (pts > (p.points || 0)) { showToast('Pas assez de points !'); return; }

  p.points -= pts;
  p.investedPoints = (p.investedPoints || 0) + pts;
  p.investHistory = p.investHistory || [];
  p.investHistory.unshift({ date: new Date().toISOString(), amount: pts, type: 'invest' });

  saveState();
  document.getElementById('invest-points').value = '';
  updateStatsBar();
  renderInvest();
  showToast(`${pts} points investis 🏢`);
}

function renderProgress() {
  const p = getCurrentProfile();
  if (!p) return;
  const level = p.level || 1;
  const xp = p.xp || 0;
  const nextXp = xpForLevel(level + 1);
  const prevXp = xpForLevel(level);
  const progress = Math.min(100, ((xp - prevXp) / (nextXp - prevXp)) * 100);

  document.getElementById('level-number').textContent = level;
  const title = getTitleForLevel(level);
  document.getElementById('level-title').textContent = `${title.emoji} ${title.name}`;
  document.getElementById('xp-fill').style.width = progress + '%';
  document.getElementById('xp-text').textContent = `${xp} / ${nextXp} XP`;

  document.getElementById('titles-list').innerHTML = TITLES.map(t => {
    const unlocked = level >= t.level;
    return `
      <div class="title-item ${unlocked ? 'unlocked' : 'locked'}">
        <div class="emoji">${unlocked ? t.emoji : '🔒'}</div>
        <div class="name">${t.name}</div>
        <div style="font-size:0.7rem;color:var(--text-muted)">Niv. ${t.level}</div>
      </div>`;
  }).join('');

  document.getElementById('stat-tasks-done').textContent = p.tasksDone || 0;
  document.getElementById('stat-points-total').textContent = p.pointsTotal || 0;
  document.getElementById('stat-money-total').textContent = formatMoney(p.moneyTotal || 0);
}

// ---------- ADMIN ----------
function renderAdminTasks() {
  const list = document.getElementById('admin-tasks-list');
  const active = state.tasks.filter(t => !t.archived && !t.done);
  const done = state.tasks.filter(t => t.done && !t.archived).slice(0, 20);

  if (active.length === 0 && done.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="emoji">📋</div><p>Aucune tâche en cours.<br>Attribue-en depuis l’onglet Attribuer.</p></div>`;
    return;
  }

  let html = '';
  if (active.length) {
    html += `<div style="font-weight:700;margin-bottom:0.5rem;color:var(--text-muted)">En attente (${active.length})</div>`;
    html += active.map(t => {
      const child = state.profiles.find(p => p.id === t.assigneeId);
      return `
        <div class="task-card">
          <div class="task-info">
            <div class="task-name">${t.name}</div>
            <div class="task-meta">
              <span class="task-points">${t.points} pts</span>
              <span>👤 ${child ? child.name : '?'}</span>
              ${t.recurrence !== 'once' ? `<span>🔁</span>` : ''}
            </div>
          </div>
          <div class="task-actions">
            <button class="task-delete" data-id="${t.id}" title="Supprimer">🗑️</button>
          </div>
        </div>`;
    }).join('');
  }
  if (done.length) {
    html += `<div style="font-weight:700;margin:1rem 0 0.5rem;color:var(--text-muted)">Terminées récemment</div>`;
    html += done.map(t => {
      const child = state.profiles.find(p => p.id === t.assigneeId);
      const felt = t.feltDifficulty ? FELT_LABELS[t.feltDifficulty] : '—';
      return `
        <div class="task-card done">
          <div class="task-info">
            <div class="task-name">${t.name}</div>
            <div class="task-meta">
              <span class="task-points">${t.points} pts</span>
              <span>👤 ${child ? child.name : '?'}</span>
              <span>Ressenti : ${felt}</span>
            </div>
          </div>
        </div>`;
    }).join('');
  }
  list.innerHTML = html;
  list.querySelectorAll('.task-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Supprimer cette tâche ?')) {
        state.tasks = state.tasks.filter(t => t.id !== btn.dataset.id);
        saveState();
        renderAdminTasks();
        showToast('Tâche supprimée');
      }
    });
  });
}

function renderAdminCatalog() {
  const list = document.getElementById('admin-catalog-list');
  const templates = state.templates || [];
  if (templates.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="emoji">📚</div><p>Catalogue vide.</p></div>`;
    return;
  }
  const byCat = {};
  templates.forEach(t => {
    if (!byCat[t.category]) byCat[t.category] = [];
    byCat[t.category].push(t);
  });
  list.innerHTML = Object.entries(byCat).map(([cat, items]) => `
    <div style="margin-bottom:1rem">
      <div style="font-weight:700;font-size:0.9rem;margin-bottom:0.5rem;color:var(--text-muted)">${CATEGORY_LABELS[cat] || cat}</div>
      ${items.map(t => `
        <div class="task-card" style="margin-bottom:0.5rem;opacity:${t.active === false ? 0.5 : 1}">
          <div class="task-info">
            <div class="task-name">${t.name}</div>
            <div class="task-meta">
              <span class="task-points">${t.points} pts</span>
              <span>${t.difficulty}</span>
            </div>
          </div>
          <div class="task-actions">
            <button class="tpl-edit" data-id="${t.id}" title="Modifier">✏️</button>
            <button class="tpl-delete" data-id="${t.id}" title="Supprimer">🗑️</button>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');

  list.querySelectorAll('.tpl-edit').forEach(btn => {
    btn.addEventListener('click', () => openTemplateModal(btn.dataset.id));
  });
  list.querySelectorAll('.tpl-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Supprimer cette tâche du catalogue ?')) {
        state.templates = state.templates.filter(t => t.id !== btn.dataset.id);
        saveState();
        renderAdminCatalog();
        renderAssignForm();
        showToast('Tâche retirée du catalogue');
      }
    });
  });
}

function renderAssignForm() {
  const tplSelect = document.getElementById('assign-template');
  const childSelect = document.getElementById('assign-child');
  const templates = (state.templates || []).filter(t => t.active !== false);
  const children = state.profiles.filter(p => p.type === 'child');

  tplSelect.innerHTML = templates.length
    ? templates.map(t => `<option value="${t.id}">${t.name} (${t.points} pts)</option>`).join('')
    : '<option value="">— Aucune tâche —</option>';

  childSelect.innerHTML = children.length
    ? children.map(c => `<option value="${c.id}">${c.name}</option>`).join('')
    : '<option value="">— Aucun enfant —</option>';
}

function doAssign() {
  const tplId = document.getElementById('assign-template').value;
  const childId = document.getElementById('assign-child').value;
  const recurrence = document.getElementById('assign-recurrence').value;
  const tpl = state.templates.find(t => t.id === tplId);
  const child = state.profiles.find(p => p.id === childId);

  if (!tpl || !child) {
    showToast('Choisis une tâche et un enfant');
    return;
  }

  state.tasks.push({
    id: 't_' + Date.now() + Math.random().toString(36).slice(2, 6),
    templateId: tpl.id,
    name: tpl.name,
    category: tpl.category,
    points: tpl.points,
    difficulty: tpl.difficulty,
    assigneeId: child.id,
    recurrence,
    done: false,
    archived: false,
    feltDifficulty: null,
    createdAt: new Date().toISOString(),
    completedAt: null,
  });

  saveState();
  renderAdminTasks();
  showToast(`Tâche attribuée à ${child.name} ✔`);
}

function renderAdminFamily() {
  const list = document.getElementById('admin-family-list');
  if (state.profiles.length === 0) {
    list.innerHTML = `<div class="empty-state"><p>Aucun membre.</p></div>`;
    return;
  }
  list.innerHTML = state.profiles.map(p => {
    const isParent = p.type === 'parent';
    return `
      <div class="family-card">
        <img src="${avatarSVG(p.avatar, 48)}" alt="">
        <div class="info">
          <div class="fname">${p.name} ${isParent ? '🔑' : ''}</div>
          <div class="fmeta">
            ${isParent
              ? 'Parent · Admin'
              : `Niv. ${p.level || 1} · ${p.points || 0} pts · ${formatMoney(p.wallet || 0)} · ${p.tasksDone || 0} tâches`}
          </div>
        </div>
      </div>`;
  }).join('');
}

// ---------- TEMPLATE MODAL ----------
function openTemplateModal(editId = null) {
  editingTemplateId = editId;
  selectedTemplatePoints = 15;
  document.getElementById('modal-template-title').textContent = editId ? 'Modifier la tâche' : 'Nouvelle tâche du catalogue';
  document.getElementById('template-name').value = '';
  document.getElementById('template-category').value = 'menage';
  document.getElementById('template-difficulty').value = 'moyen';
  document.getElementById('template-points-custom').value = '';

  if (editId) {
    const t = state.templates.find(x => x.id === editId);
    if (t) {
      document.getElementById('template-name').value = t.name;
      document.getElementById('template-category').value = t.category;
      document.getElementById('template-difficulty').value = t.difficulty;
      selectedTemplatePoints = t.points;
      document.getElementById('template-points-custom').value = t.points;
    }
  }

  document.querySelectorAll('#template-points-selector .diff-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.points) === selectedTemplatePoints);
  });
  openModal('modal-template');
}

function saveTemplate() {
  const name = document.getElementById('template-name').value.trim();
  if (!name) { showToast('Le nom est obligatoire'); return; }

  const custom = parseInt(document.getElementById('template-points-custom').value);
  const points = (!isNaN(custom) && custom > 0) ? custom : selectedTemplatePoints;
  const category = document.getElementById('template-category').value;
  const difficulty = document.getElementById('template-difficulty').value;

  if (editingTemplateId) {
    const t = state.templates.find(x => x.id === editingTemplateId);
    if (t) {
      t.name = name;
      t.points = points;
      t.category = category;
      t.difficulty = difficulty;
    }
  } else {
    state.templates.push({
      id: 'tpl_' + Date.now(),
      name, points, category, difficulty, active: true,
    });
  }
  saveState();
  closeModal('modal-template');
  renderAdminCatalog();
  renderAssignForm();
  showToast(editingTemplateId ? 'Tâche modifiée' : 'Tâche ajoutée au catalogue ✔');
}

// ---------- PROFILE MODAL ----------
function openProfileModal() {
  editingProfileId = null;
  selectedAvatar = 'boy1';
  selectedProfileType = 'child';
  document.getElementById('modal-profile-title').textContent = 'Nouveau membre';
  document.getElementById('profile-name').value = '';
  document.getElementById('profile-password').value = '';
  document.getElementById('profile-ceiling').value = 20;
  document.getElementById('group-password').style.display = 'none';
  document.getElementById('group-ceiling').style.display = 'block';
  document.querySelectorAll('.type-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.type === 'child');
  });

  const grid = document.getElementById('avatars-grid');
  grid.innerHTML = AVATARS.map(a => `
    <img class="avatar-option ${a.id === selectedAvatar ? 'selected' : ''}"
         src="${avatarSVG(a.id, 64)}" data-id="${a.id}" alt="">
  `).join('');
  grid.querySelectorAll('.avatar-option').forEach(img => {
    img.addEventListener('click', () => {
      selectedAvatar = img.dataset.id;
      grid.querySelectorAll('.avatar-option').forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
    });
  });
  openModal('modal-profile');
}

async function saveProfile() {
  const name = document.getElementById('profile-name').value.trim();
  if (!name) { showToast('Le prénom est obligatoire'); return; }

  if (selectedProfileType === 'parent') {
    const pwd = document.getElementById('profile-password').value;
    if (!pwd || pwd.length < 3) {
      showToast('Mot de passe parent requis (min. 3 caractères)');
      return;
    }
    const passwordHash = await hashPassword(pwd);
    state.profiles.push({
      id: 'p_' + Date.now(),
      name,
      avatar: selectedAvatar,
      type: 'parent',
      passwordHash,
    });
  } else {
    const ceiling = parseFloat(document.getElementById('profile-ceiling').value) || 20;
    state.profiles.push({
      id: 'p_' + Date.now(),
      name,
      avatar: selectedAvatar,
      type: 'child',
      ceiling,
      points: 0,
      wallet: 0,
      investedPoints: 0,
      level: 1,
      xp: 0,
      tasksDone: 0,
      pointsTotal: 0,
      moneyTotal: 0,
      convertedThisMonth: 0,
      walletHistory: [],
      investHistory: [],
    });
  }

  saveState();
  closeModal('modal-profile');
  renderProfiles();
  showToast(`${name} a rejoint la famille ! 🎉`);
}

// ---------- THEMES / SETTINGS ----------
function applyTheme(theme) {
  document.body.className = theme === 'default' ? '' : `theme-${theme}`;
  state.settings.theme = theme;
  saveState();
}

function renderThemes() {
  const grid = document.getElementById('themes-grid');
  const themes = [
    { id: 'default', label: 'Indigo' },
    { id: 'ocean', label: 'Océan' },
    { id: 'forest', label: 'Forêt' },
    { id: 'sunset', label: 'Coucher' },
    { id: 'berry', label: 'Baie' },
    { id: 'dark', label: 'Sombre' },
  ];
  grid.innerHTML = themes.map(t => `
    <button class="theme-btn ${state.settings.theme === t.id ? 'selected' : ''}" data-theme="${t.id}">${t.label}</button>
  `).join('');
  grid.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.theme);
      renderThemes();
      showToast('Thème appliqué 🎨');
    });
  });
}

function openSettings() {
  document.getElementById('rate-input').value = state.settings.rate;
  renderThemes();
  renderAutoBackups();
  openModal('modal-settings');
}

function simpleChecksum(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return (h >>> 0).toString(16);
}

function exportData() {
  createAutoBackup();
  const payload = {
    app: 'Chores',
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    data: state,
  };
  payload.checksum = simpleChecksum(JSON.stringify(payload.data));
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chores-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Sauvegarde exportée ✔');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        let data = null;
        if (parsed.data && parsed.data.profiles) {
          if (parsed.checksum) {
            const expected = simpleChecksum(JSON.stringify(parsed.data));
            if (expected !== parsed.checksum) {
              if (!confirm('⚠️ Checksum incorrect. Restaurer quand même ?')) return;
            }
          }
          data = parsed.data;
        } else if (parsed.profiles) {
          data = parsed;
        }
        if (!data || !Array.isArray(data.profiles)) {
          showToast('Fichier invalide');
          return;
        }
        if (!confirm('Restaurer cette sauvegarde ?\nLes données actuelles seront remplacées.')) return;
        createAutoBackup();
        state = { ...state, ...data };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        showToast('Sauvegarde restaurée ✔');
        setTimeout(() => location.reload(), 600);
      } catch {
        showToast('Erreur de lecture du fichier');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function resetApp() {
  if (!confirm('⚠️ Tout sera effacé.\nUne dernière sauvegarde auto sera conservée.')) return;
  createAutoBackup();
  localStorage.removeItem(STORAGE_KEY);
  showToast('Application réinitialisée');
  setTimeout(() => location.reload(), 600);
}

// ---------- TABS ----------
function switchTab(tabId, navRoot) {
  const root = navRoot || document;
  root.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  // Find parent screen
  const screen = document.querySelector('.screen.active');
  if (!screen) return;
  screen.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  screen.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  const btn = screen.querySelector(`.nav-btn[data-tab="${tabId}"]`);
  if (btn) btn.classList.add('active');
  const tab = document.getElementById(`tab-${tabId}`);
  if (tab) tab.classList.add('active');

  if (tabId === 'wallet') renderWallet();
  if (tabId === 'invest') renderInvest();
  if (tabId === 'progress') renderProgress();
  if (tabId === 'admin-tasks') renderAdminTasks();
  if (tabId === 'admin-catalog') renderAdminCatalog();
  if (tabId === 'admin-assign') renderAssignForm();
  if (tabId === 'admin-family') renderAdminFamily();
}

// ---------- INIT ----------
function init() {
  loadState();
  checkMonthlyReset();
  applyTheme(state.settings.theme || 'default');

  setTimeout(() => {
    document.getElementById('splash').classList.remove('active');
    document.getElementById('profile-select').classList.add('active');
    renderProfiles();
  }, 1000);

  document.getElementById('btn-add-profile').addEventListener('click', openProfileModal);
  document.getElementById('btn-save-profile').addEventListener('click', saveProfile);
  document.getElementById('btn-check-password').addEventListener('click', checkPassword);
  document.getElementById('password-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') checkPassword();
  });

  document.getElementById('btn-back-profiles').addEventListener('click', backToProfiles);
  document.getElementById('btn-back-profiles-admin').addEventListener('click', backToProfiles);
  document.getElementById('btn-settings').addEventListener('click', openSettings);
  document.getElementById('btn-theme').addEventListener('click', openSettings);
  document.getElementById('btn-theme-admin').addEventListener('click', openSettings);

  document.getElementById('btn-convert').addEventListener('click', convertPoints);
  document.getElementById('btn-invest').addEventListener('click', investPoints);
  document.getElementById('convert-points').addEventListener('input', updateConvertPreview);
  document.getElementById('btn-confirm-complete').addEventListener('click', confirmComplete);

  document.getElementById('btn-add-template').addEventListener('click', () => openTemplateModal());
  document.getElementById('btn-save-template').addEventListener('click', saveTemplate);
  document.getElementById('btn-do-assign').addEventListener('click', doAssign);

  document.getElementById('btn-export').addEventListener('click', exportData);
  document.getElementById('btn-import').addEventListener('click', importData);
  document.getElementById('btn-reset').addEventListener('click', resetApp);

  document.getElementById('rate-input').addEventListener('change', e => {
    state.settings.rate = parseFloat(e.target.value) || 0.10;
    saveState();
  });

  // Type selector
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedProfileType = btn.dataset.type;
      document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('group-password').style.display = selectedProfileType === 'parent' ? 'block' : 'none';
      document.getElementById('group-ceiling').style.display = selectedProfileType === 'child' ? 'block' : 'none';
    });
  });

  // Felt difficulty
  document.querySelectorAll('.felt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedFelt = parseInt(btn.dataset.felt);
      document.querySelectorAll('.felt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Template points
  document.querySelectorAll('#template-points-selector .diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedTemplatePoints = parseInt(btn.dataset.points);
      document.querySelectorAll('#template-points-selector .diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('template-points-custom').value = '';
    });
  });

  // Nav tabs (both screens)
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal(modal.id);
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
