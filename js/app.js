/* ============================================
   CHORES - Application familiale
   ============================================ */

const STORAGE_KEY = 'chores_v1';
const RATE_DEFAULT = 0.10; // 1 point = 0.10 €

// ---------- AVATARS (SVG data URIs) ----------
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
  { id: 'kid2', emoji: '👶', color: '#34D399' },
  { id: 'cat', emoji: '🐱', color: '#F59E0B' },
  { id: 'dog', emoji: '🐶', color: '#EF4444' },
  { id: 'fox', emoji: '🦊', color: '#F97316' },
  { id: 'panda', emoji: '🐼', color: '#64748B' },
  { id: 'unicorn', emoji: '🦄', color: '#C084FC' },
];

// ---------- TITLES (by level) ----------
const TITLES = [
  { level: 1,  name: 'Débutant',        emoji: '🌱' },
  { level: 3,  name: 'Apprenti',         emoji: '📘' },
  { level: 5,  name: 'Aide à domicile',  emoji: '🧹' },
  { level: 8,  name: 'Pro du ménage',    emoji: '✨' },
  { level: 12, name: 'Champion familial',emoji: '🏆' },
  { level: 16, name: 'Maître des tâches',emoji: '👑' },
  { level: 20, name: 'Légende du foyer', emoji: '🌟' },
  { level: 25, name: 'Super Héros',      emoji: '🦸' },
  { level: 30, name: 'Dieu du ménage',   emoji: '⚡' },
];

// XP needed per level (cumulative)
function xpForLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.5));
}

// ---------- STATE ----------
let state = {
  profiles: [],
  tasks: [],
  currentProfileId: null,
  settings: {
    rate: RATE_DEFAULT,
    theme: 'default',
  },
  lastMonthCheck: null, // YYYY-MM for monthly reset
};

let editingProfileId = null;
let selectedAvatar = 'boy1';
let selectedDifficulty = 15;

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
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ---------- MONTHLY RESET & INTEREST ----------
function checkMonthlyReset() {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  if (state.lastMonthCheck === currentMonth) return;

  // Apply interest on investments (10%)
  state.profiles.forEach(p => {
    if (p.investedPoints > 0) {
      const interest = Math.floor(p.investedPoints * 0.10);
      if (interest > 0) {
        p.points += interest;
        p.pointsTotal = (p.pointsTotal || 0) + interest;
        p.investHistory = p.investHistory || [];
        p.investHistory.unshift({
          date: new Date().toISOString(),
          amount: interest,
          type: 'interest'
        });
      }
    }
    // Reset monthly conversion tracking
    p.convertedThisMonth = 0;
    // Reset remaining points? User said: points remaining after ceiling can be invested.
    // Points that couldn't be converted stay, but we reset the conversion counter.
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
  for (const t of TITLES) {
    if (level >= t.level) title = t;
  }
  return title;
}

function showToast(msg, duration = 2500) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

function openModal(id) {
  document.getElementById(id).classList.add('active');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

function formatMoney(n) {
  return n.toFixed(2).replace('.', ',') + ' €';
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
}

// ---------- AVATAR RENDER ----------
function avatarSVG(avatarId, size = 80) {
  const a = AVATARS.find(x => x.id === avatarId) || AVATARS[0];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="${a.color}"/>
      <text x="50" y="62" font-size="48" text-anchor="middle" dominant-baseline="middle">${a.emoji}</text>
    </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

// ---------- RENDER PROFILES ----------
function renderProfiles() {
  const grid = document.getElementById('profiles-grid');
  if (state.profiles.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="emoji">👨‍👩‍👧‍👦</div>
        <p>Aucun membre pour le moment.<br>Ajoute le premier membre de la famille !</p>
      </div>`;
    return;
  }
  grid.innerHTML = state.profiles.map(p => {
    const title = getTitleForLevel(p.level || 1);
    return `
      <div class="profile-card" data-id="${p.id}">
        <img class="avatar" src="${avatarSVG(p.avatar)}" alt="${p.name}">
        <div class="name">${p.name}</div>
        <div class="level-mini">Niv. ${p.level || 1} · ${title.emoji}</div>
      </div>`;
  }).join('');

  grid.querySelectorAll('.profile-card').forEach(card => {
    card.addEventListener('click', () => {
      state.currentProfileId = card.dataset.id;
      saveState();
      showMain();
    });
  });
}

// ---------- RENDER MAIN ----------
function showMain() {
  const p = getCurrentProfile();
  if (!p) return;

  document.getElementById('profile-select').classList.remove('active');
  document.getElementById('main').classList.add('active');

  document.getElementById('current-avatar').src = avatarSVG(p.avatar, 42);
  document.getElementById('current-name').textContent = p.name;
  const title = getTitleForLevel(p.level || 1);
  document.getElementById('current-title').textContent = `${title.emoji} ${title.name}`;

  updateStatsBar();
  renderTasks();
  renderWallet();
  renderInvest();
  renderProgress();
}

function updateStatsBar() {
  const p = getCurrentProfile();
  if (!p) return;
  document.getElementById('stat-points').textContent = p.points || 0;
  document.getElementById('stat-wallet').textContent = formatMoney(p.wallet || 0);
  document.getElementById('stat-level').textContent = p.level || 1;
  document.getElementById('stat-invest').textContent = p.investedPoints || 0;
}

// ---------- TASKS ----------
function renderTasks() {
  const p = getCurrentProfile();
  const myTasks = state.tasks.filter(t => t.assigneeId === p.id && !t.archived);
  const familyTasks = state.tasks.filter(t => t.assigneeId !== p.id && !t.archived);

  const list = document.getElementById('tasks-list');
  const famList = document.getElementById('family-tasks-list');

  if (myTasks.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="emoji">📋</div><p>Aucune tâche pour toi.<br>Crée-en une ou attends qu'on t'en attribue !</p></div>`;
  } else {
    list.innerHTML = myTasks.map(t => taskHTML(t, true)).join('');
  }

  if (familyTasks.length === 0) {
    famList.innerHTML = `<div class="empty-state"><div class="emoji">🏠</div><p>Pas d'autres tâches en cours.</p></div>`;
  } else {
    famList.innerHTML = familyTasks.map(t => taskHTML(t, false)).join('');
  }

  // Bind events
  document.querySelectorAll('.task-check').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      completeTask(btn.dataset.id);
    });
  });
  document.querySelectorAll('.task-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Supprimer cette tâche ?')) {
        deleteTask(btn.dataset.id);
      }
    });
  });
}

function taskHTML(t, isMine) {
  const assignee = state.profiles.find(p => p.id === t.assigneeId);
  const doneClass = t.done ? 'done' : '';
  const checkIcon = t.done ? '✓' : '';
  return `
    <div class="task-card ${doneClass}">
      <button class="task-check" data-id="${t.id}">${checkIcon}</button>
      <div class="task-info">
        <div class="task-name">${t.name}</div>
        <div class="task-meta">
          <span class="task-points">${t.points} pts</span>
          ${!isMine && assignee ? `<span>👤 ${assignee.name}</span>` : ''}
          ${t.recurrence !== 'once' ? `<span>🔁 ${t.recurrence === 'daily' ? 'Quotidien' : 'Hebdo'}</span>` : ''}
        </div>
      </div>
      <div class="task-actions">
        <button class="task-delete" data-id="${t.id}" title="Supprimer">🗑️</button>
      </div>
    </div>`;
}

function completeTask(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task || task.done) return;

  const profile = state.profiles.find(p => p.id === task.assigneeId);
  if (!profile) return;

  task.done = true;
  task.completedAt = new Date().toISOString();

  // Award points
  profile.points = (profile.points || 0) + task.points;
  profile.pointsTotal = (profile.pointsTotal || 0) + task.points;
  profile.tasksDone = (profile.tasksDone || 0) + 1;

  // XP & Level
  profile.xp = (profile.xp || 0) + task.points;
  let leveled = false;
  while (profile.xp >= xpForLevel((profile.level || 1) + 1)) {
    profile.level = (profile.level || 1) + 1;
    leveled = true;
  }

  // Recurrence: create new instance
  if (task.recurrence === 'daily' || task.recurrence === 'weekly') {
    const newTask = {
      ...task,
      id: 't_' + Date.now() + Math.random().toString(36).slice(2, 6),
      done: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
    };
    // Archive the completed one after a delay conceptually, but keep for history
    task.archived = true;
    state.tasks.push(newTask);
  }

  saveState();
  renderTasks();
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

function deleteTask(taskId) {
  state.tasks = state.tasks.filter(t => t.id !== taskId);
  saveState();
  renderTasks();
  showToast('Tâche supprimée');
}

// ---------- WALLET ----------
function renderWallet() {
  const p = getCurrentProfile();
  if (!p) return;

  document.getElementById('wallet-amount').textContent = formatMoney(p.wallet || 0);
  document.getElementById('wallet-ceiling').textContent = p.ceiling || 20;
  document.getElementById('wallet-converted').textContent = (p.convertedThisMonth || 0).toFixed(2);

  const remaining = (p.ceiling || 20) - (p.convertedThisMonth || 0);
  const hint = document.getElementById('convert-hint');
  if (remaining <= 0) {
    hint.textContent = '⚠️ Plafond mensuel atteint. Plus de conversion possible ce mois-ci.';
    hint.style.color = 'var(--danger)';
  } else {
    hint.textContent = `Il te reste ${remaining.toFixed(2)} € de plafond ce mois-ci.`;
    hint.style.color = 'var(--text-muted)';
  }

  // History
  const hist = document.getElementById('wallet-history');
  const history = (p.walletHistory || []).slice(0, 15);
  if (history.length === 0) {
    hist.innerHTML = '<p class="hint">Aucune conversion ce mois-ci.</p>';
  } else {
    hist.innerHTML = history.map(h => `
      <div class="history-item">
        <div>
          <div>${h.points} points → ${formatMoney(h.amount)}</div>
          <div class="date">${formatDate(h.date)}</div>
        </div>
        <div class="amount">+${formatMoney(h.amount)}</div>
      </div>`).join('');
  }
}

function updateConvertPreview() {
  const input = document.getElementById('convert-points');
  const pts = parseInt(input.value) || 0;
  const amount = pts * state.settings.rate;
  document.getElementById('convert-result').textContent = '= ' + formatMoney(amount);
}

function convertPoints() {
  const p = getCurrentProfile();
  if (!p) return;

  const pts = parseInt(document.getElementById('convert-points').value) || 0;
  if (pts <= 0) {
    showToast('Entre un nombre de points valide');
    return;
  }
  if (pts > (p.points || 0)) {
    showToast('Pas assez de points !');
    return;
  }

  const amount = pts * state.settings.rate;
  const remainingCeiling = (p.ceiling || 20) - (p.convertedThisMonth || 0);

  if (amount > remainingCeiling + 0.001) {
    showToast(`Plafond atteint. Maximum convertible : ${remainingCeiling.toFixed(2)} €`);
    return;
  }

  p.points -= pts;
  p.wallet = (p.wallet || 0) + amount;
  p.convertedThisMonth = (p.convertedThisMonth || 0) + amount;
  p.moneyTotal = (p.moneyTotal || 0) + amount;
  p.walletHistory = p.walletHistory || [];
  p.walletHistory.unshift({
    date: new Date().toISOString(),
    points: pts,
    amount: amount
  });

  saveState();
  document.getElementById('convert-points').value = '';
  updateConvertPreview();
  updateStatsBar();
  renderWallet();
  showToast(`+${formatMoney(amount)} dans ton porte-monnaie ! 💰`);
}

// ---------- INVEST ----------
function renderInvest() {
  const p = getCurrentProfile();
  if (!p) return;

  const invested = p.investedPoints || 0;
  document.getElementById('invest-total').textContent = invested;
  document.getElementById('invest-monthly').textContent = Math.floor(invested * 0.10);

  const hist = document.getElementById('invest-history-list');
  const history = (p.investHistory || []).slice(0, 10);
  if (history.length === 0) {
    hist.innerHTML = '<p class="hint">Aucun revenu généré pour le moment.</p>';
  } else {
    hist.innerHTML = history.map(h => `
      <div class="history-item">
        <div>
          <div>${h.type === 'interest' ? '📈 Intérêts mensuels' : '💼 Investissement'}</div>
          <div class="date">${formatDate(h.date)}</div>
        </div>
        <div class="amount">${h.type === 'interest' ? '+' : ''}${h.amount} pts</div>
      </div>`).join('');
  }
}

function investPoints() {
  const p = getCurrentProfile();
  if (!p) return;

  const pts = parseInt(document.getElementById('invest-points').value) || 0;
  if (pts <= 0) {
    showToast('Entre un nombre de points valide');
    return;
  }
  if (pts > (p.points || 0)) {
    showToast('Pas assez de points !');
    return;
  }

  p.points -= pts;
  p.investedPoints = (p.investedPoints || 0) + pts;
  p.investHistory = p.investHistory || [];
  p.investHistory.unshift({
    date: new Date().toISOString(),
    amount: pts,
    type: 'invest'
  });

  saveState();
  document.getElementById('invest-points').value = '';
  updateStatsBar();
  renderInvest();
  showToast(`${pts} points investis dans ton entreprise ! 🏢`);
}

// ---------- PROGRESS ----------
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

  // Titles grid
  const titlesList = document.getElementById('titles-list');
  titlesList.innerHTML = TITLES.map(t => {
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

// ---------- PROFILE MODAL ----------
function openProfileModal(editId = null) {
  editingProfileId = editId;
  selectedAvatar = 'boy1';
  document.getElementById('modal-profile-title').textContent = editId ? 'Modifier le profil' : 'Nouveau membre';
  document.getElementById('profile-name').value = '';
  document.getElementById('profile-ceiling').value = 20;

  if (editId) {
    const p = state.profiles.find(x => x.id === editId);
    if (p) {
      document.getElementById('profile-name').value = p.name;
      document.getElementById('profile-ceiling').value = p.ceiling || 20;
      selectedAvatar = p.avatar;
    }
  }

  // Render avatars
  const grid = document.getElementById('avatars-grid');
  grid.innerHTML = AVATARS.map(a => `
    <img class="avatar-option ${a.id === selectedAvatar ? 'selected' : ''}"
         src="${avatarSVG(a.id, 64)}"
         data-id="${a.id}"
         alt="${a.emoji}">
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

function saveProfile() {
  const name = document.getElementById('profile-name').value.trim();
  if (!name) {
    showToast('Le prénom est obligatoire');
    return;
  }
  const ceiling = parseFloat(document.getElementById('profile-ceiling').value) || 20;

  if (editingProfileId) {
    const p = state.profiles.find(x => x.id === editingProfileId);
    if (p) {
      p.name = name;
      p.avatar = selectedAvatar;
      p.ceiling = ceiling;
    }
  } else {
    state.profiles.push({
      id: 'p_' + Date.now(),
      name,
      avatar: selectedAvatar,
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
  showToast(editingProfileId ? 'Profil modifié' : `${name} a rejoint la famille ! 🎉`);
}

// ---------- TASK MODAL ----------
function openTaskModal() {
  document.getElementById('task-name').value = '';
  selectedDifficulty = 15;
  document.querySelectorAll('.diff-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.points) === 15);
  });

  // Fill assignees
  const select = document.getElementById('task-assignee');
  select.innerHTML = state.profiles.map(p =>
    `<option value="${p.id}" ${p.id === state.currentProfileId ? 'selected' : ''}>${p.name}</option>`
  ).join('');

  openModal('modal-task');
}

function saveTask() {
  const name = document.getElementById('task-name').value.trim();
  if (!name) {
    showToast('Le nom de la tâche est obligatoire');
    return;
  }
  const assigneeId = document.getElementById('task-assignee').value;
  const recurrence = document.getElementById('task-recurrence').value;

  state.tasks.push({
    id: 't_' + Date.now() + Math.random().toString(36).slice(2, 6),
    name,
    points: selectedDifficulty,
    assigneeId,
    recurrence,
    done: false,
    archived: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  });

  saveState();
  closeModal('modal-task');
  renderTasks();
  showToast('Tâche créée ! 📋');
}

// ---------- THEMES ----------
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
    <button class="theme-btn ${state.settings.theme === t.id ? 'selected' : ''}" data-theme="${t.id}">
      ${t.label}
    </button>
  `).join('');

  grid.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.theme);
      renderThemes();
      showToast('Thème appliqué 🎨');
    });
  });
}

// ---------- SETTINGS ----------
function openSettings() {
  document.getElementById('rate-input').value = state.settings.rate;
  renderThemes();
  openModal('modal-settings');
}

// ---------- EXPORT / IMPORT / RESET ----------
function exportData() {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chores-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Données exportées');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.profiles && Array.isArray(parsed.profiles)) {
          state = { ...state, ...parsed };
          saveState();
          location.reload();
        } else {
          showToast('Fichier invalide');
        }
      } catch {
        showToast('Erreur de lecture du fichier');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function resetApp() {
  if (confirm('⚠️ Tout sera effacé (profils, tâches, points…). Continuer ?')) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}

// ---------- TABS ----------
function switchTab(tabId) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.nav-btn[data-tab="${tabId}"]`).classList.add('active');
  document.getElementById(`tab-${tabId}`).classList.add('active');

  if (tabId === 'wallet') renderWallet();
  if (tabId === 'invest') renderInvest();
  if (tabId === 'progress') renderProgress();
}

// ---------- INIT ----------
function init() {
  loadState();
  checkMonthlyReset();
  applyTheme(state.settings.theme || 'default');

  // Splash
  setTimeout(() => {
    document.getElementById('splash').classList.remove('active');
    document.getElementById('profile-select').classList.add('active');
    renderProfiles();
  }, 1200);

  // Events
  document.getElementById('btn-add-profile').addEventListener('click', () => openProfileModal());
  document.getElementById('btn-save-profile').addEventListener('click', saveProfile);
  document.getElementById('btn-add-task').addEventListener('click', openTaskModal);
  document.getElementById('btn-save-task').addEventListener('click', saveTask);
  document.getElementById('btn-back-profiles').addEventListener('click', () => {
    document.getElementById('main').classList.remove('active');
    document.getElementById('profile-select').classList.add('active');
    renderProfiles();
  });
  document.getElementById('btn-settings').addEventListener('click', openSettings);
  document.getElementById('btn-theme').addEventListener('click', openSettings);
  document.getElementById('btn-convert').addEventListener('click', convertPoints);
  document.getElementById('btn-invest').addEventListener('click', investPoints);
  document.getElementById('convert-points').addEventListener('input', updateConvertPreview);
  document.getElementById('btn-export').addEventListener('click', exportData);
  document.getElementById('btn-import').addEventListener('click', importData);
  document.getElementById('btn-reset').addEventListener('click', resetApp);

  document.getElementById('rate-input').addEventListener('change', (e) => {
    state.settings.rate = parseFloat(e.target.value) || 0.10;
    saveState();
  });

  // Difficulty buttons
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedDifficulty = parseInt(btn.dataset.points);
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Nav tabs
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Close modals on backdrop click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal.id);
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
