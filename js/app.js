/* ============================================
   CHORES - Application familiale v2
   ============================================ */

const STORAGE_KEY = 'chores_v3';
const BACKUP_KEY = 'chores_backups_v3';
const RATE_DEFAULT = 0.10;
const MAX_AUTO_BACKUPS = 5;
const APP_VERSION = '3.1.0';

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
  settings: { rate: RATE_DEFAULT, theme: 'default', dailyTaskLimit: 3 },
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
let catalogSearch = '';
let catalogCategory = 'all';

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

// ---------- ENTREPRISE : RÈGLES ----------
const ACTIVITY_TARGET_DAYS = 10;   // jours travaillés / mois pour toucher 100 % des intérêts
const MAX_YIELD_RATE = 5;          // % / mois sur la trésorerie
const MAX_TASK_BOOST = 25;         // % bonus global max sur les tâches
const BASE_TREASURY_CAP = 1500;
const CONTRACT_MIN_STAKE = 20;
const CONTRACT_FAIL_REFUND = 0.75;
const SITE_ABANDON_REFUND = 0.5;
const SITE_STALL_DAYS = 3;
const MAX_INVEST_HISTORY = 200;

const COMPANY_LEVELS = [
  { level: 1, value: 0,     name: 'Auto-entrepreneur', emoji: '🛖', maxStake: 100 },
  { level: 2, value: 500,   name: 'Start-up',          emoji: '🚀', maxStake: 200 },
  { level: 3, value: 2000,  name: 'PME',               emoji: '🏢', maxStake: 350 },
  { level: 4, value: 6000,  name: 'Grand groupe',      emoji: '🏛️', maxStake: 600 },
  { level: 5, value: 15000, name: 'Multinationale',    emoji: '🌍', maxStake: 900 },
  { level: 6, value: 30000, name: 'Empire',            emoji: '👑', maxStake: 1300 },
];

/**
 * Bâtiments durables. Un chantier n'avance que les jours où l'enfant
 * travaille (au moins une tâche validée) : `days` = jours de travail réels.
 */
const BUILDINGS = [
  { id: 'atelier', name: 'Atelier', emoji: '🔧', days: 20, tasks: 30, cost: 300, requires: [],
    effects: { rate: 0.5 }, desc: 'Ton premier local. Les fondations de ton entreprise.' },
  { id: 'boutique', name: 'Boutique', emoji: '🏪', days: 30, tasks: 45, cost: 500, requires: ['atelier'],
    effects: { boost: 5 }, desc: 'Une vitrine sur la rue : chaque tâche rapporte plus.' },
  { id: 'entrepot', name: 'Entrepôt', emoji: '📦', days: 45, tasks: 65, cost: 700, requires: ['atelier'],
    effects: { rate: 0.5, cap: 2000, contracts: 1 }, desc: 'De la place pour stocker et prendre plus de commandes.' },
  { id: 'cuisine_centrale', name: 'Cuisine centrale', emoji: '🍳', days: 30, tasks: 45, cat: 'cuisine', catTasks: 20, cost: 450,
    requires: ['boutique'], effects: { boostCat: 15 }, desc: 'Spécialise-toi dans la cuisine.' },
  { id: 'agence_nettoyage', name: 'Agence de nettoyage', emoji: '🧽', days: 30, tasks: 45, cat: 'menage', catTasks: 20, cost: 450,
    requires: ['boutique'], effects: { boostCat: 15 }, desc: 'Spécialise-toi dans le ménage.' },
  { id: 'blanchisserie', name: 'Blanchisserie', emoji: '🧺', days: 30, tasks: 45, cat: 'linge', catTasks: 20, cost: 450,
    requires: ['boutique'], effects: { boostCat: 15 }, desc: 'Spécialise-toi dans le linge.' },
  { id: 'jardinerie', name: 'Jardinerie', emoji: '🌻', days: 30, tasks: 45, cat: 'exterieur', catTasks: 15, cost: 450,
    requires: ['boutique'], effects: { boostCat: 15 }, desc: 'Spécialise-toi dans l’extérieur.' },
  { id: 'clinique_veto', name: 'Clinique vétérinaire', emoji: '🐾', days: 30, tasks: 45, cat: 'animaux', catTasks: 15, cost: 450,
    requires: ['boutique'], effects: { boostCat: 15 }, desc: 'Spécialise-toi dans les animaux.' },
  { id: 'usine', name: 'Usine', emoji: '🏭', days: 75, tasks: 110, cost: 1200, requires: ['boutique', 'entrepot'],
    effects: { rate: 1 }, desc: 'La production à grande échelle. Un vrai cap.' },
  { id: 'banque', name: 'Banque', emoji: '🏦', days: 100, tasks: 150, cost: 1800, requires: ['usine'],
    effects: { rate: 1, cap: 5000, contracts: 1 }, desc: 'Ta propre banque : plus de trésorerie, plus de contrats.' },
  { id: 'labo', name: 'Centre de R&D', emoji: '🔬', days: 120, tasks: 180, cost: 2000, requires: ['usine'],
    effects: { boost: 5, sites: 1 }, desc: 'L’innovation permet de mener un chantier de plus en parallèle.' },
  { id: 'centrale', name: 'Centrale solaire', emoji: '☀️', days: 150, tasks: 220, cost: 2500, requires: ['banque'],
    effects: { rate: 1, boost: 5 }, desc: 'Une énergie propre et durable pour tout ton empire.' },
  { id: 'siege', name: 'Siège social', emoji: '🏙️', days: 240, tasks: 360, cost: 4000, requires: ['centrale', 'labo'],
    effects: { rate: 1, boost: 10, cap: 10000 }, desc: 'Le gratte-ciel légendaire. Environ un an de travail acharné.' },
];

const CONTRACT_TIERS = [
  { name: 'Facile',    emoji: '🟢', pct: 10 },
  { name: 'Ambitieux', emoji: '🟠', pct: 20 },
  { name: 'Défi',      emoji: '🔴', pct: 35 },
];

const CONTRACT_TYPES = {
  tasks:    { goals: [12, 25, 40],    label: (n) => `Réaliser ${n} tâches` },
  days:     { goals: [6, 12, 18],     label: (n) => `Travailler ${n} jours différents` },
  points:   { goals: [150, 350, 600], label: (n) => `Gagner ${n} points en tâches` },
  category: { goals: [5, 10, 18],     label: (n, cat) => `Réaliser ${n} tâches ${CATEGORY_LABELS[cat] || cat}` },
};

const CONTRACT_CLIENTS = [
  'Mme Dupont', 'La boulangerie du coin', 'La mairie', 'Société Durand', 'Le club de foot',
  'M. Martin', 'L’hôtel des Lilas', 'La crèche', 'Le garage Moreau', 'La pharmacie',
];

const JOURNAL_TYPES = {
  interest:       { label: '📈 Intérêts mensuels',          sign: '+' },
  temp_return:    { label: '↩️ Capital temporaire rendu',   sign: '+' },
  upgrade:        { label: '⬆️ Amélioration infra',         sign: '-' },
  invest_sustain: { label: '🏦 Placement en trésorerie',    sign: '-' },
  invest_temp:    { label: '⚡ Placement temporaire',        sign: '-' },
  site_start:     { label: '🏗️ Chantier lancé',             sign: '' },
  site_fund:      { label: '💰 Financement chantier',       sign: '-' },
  site_abandon:   { label: '🚧 Chantier abandonné',         sign: '+' },
  inaugurate:     { label: '🎉 Inauguration',               sign: '' },
  contract_sign:  { label: '✍️ Contrat signé',              sign: '-' },
  contract_won:   { label: '🏆 Contrat réussi',             sign: '+' },
  contract_lost:  { label: '📉 Contrat échoué',             sign: '+' },
};

let companyView = 'sites';

// ---------- ENTREPRISE : DONNÉES ----------
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fmt(n) {
  return Math.floor(n || 0).toLocaleString('fr-FR');
}

function fmtRate(r) {
  return (Math.round(r * 100) / 100).toLocaleString('fr-FR', { maximumFractionDigits: 2 });
}

function localDayKey(d) {
  const x = new Date(d);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
}

function monthKeyOf(d) {
  return localDayKey(d).slice(0, 7);
}

function monthLabel(month) {
  const [y, m] = month.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
}

function daysLeftInMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate() + 1;
}

function getBuilding(id) {
  return BUILDINGS.find(b => b.id === id);
}

function ensureInvestFields(p) {
  if (p.capitalSustain == null) p.capitalSustain = 0;
  if (!p.investHistory) p.investHistory = [];
  // Migration ancienne version
  if (p.investedPoints && !p.capitalSustain) {
    p.capitalSustain = p.investedPoints;
    p.investedPoints = 0;
  }
  if (!p.company) {
    // Migration v3.0 : les niveaux d'infra durable deviennent un rendement acquis,
    // le capital temporaire est rendu.
    p.company = {
      name: `Entreprise de ${p.name}`,
      buildings: [],
      sites: [],
      contracts: [],
      legacyRate: Math.min(MAX_YIELD_RATE, (p.infraSustain || 0) * 0.2),
      legacyCap: p.capitalSustain || 0,
    };
    if (p.capitalTemp > 0) {
      p.points = (p.points || 0) + p.capitalTemp;
      logCompany(p, { type: 'temp_return', amount: p.capitalTemp, detail: 'Nouvelle version de l’entreprise' });
    }
    delete p.capitalTemp;
    delete p.infraTemp;
    delete p.infraSustain;
  }
}

function logCompany(p, entry) {
  p.investHistory.unshift({ date: new Date().toISOString(), ...entry });
  p.investHistory = p.investHistory.slice(0, MAX_INVEST_HISTORY);
}

function builtIds(p) {
  return new Set(p.company.buildings.map(b => b.id));
}

function builtBuildings(p) {
  return p.company.buildings.map(b => getBuilding(b.id)).filter(Boolean);
}

function sumEffect(p, key) {
  return builtBuildings(p).reduce((s, b) => s + (b.effects[key] || 0), 0);
}

function companyRate(p) {
  return Math.min(MAX_YIELD_RATE, (p.company.legacyRate || 0) + sumEffect(p, 'rate'));
}

function companyRateSources(p) {
  const sources = builtBuildings(p)
    .filter(b => b.effects.rate)
    .map(b => ({ label: `${b.emoji} ${b.name}`, rate: b.effects.rate }));
  if (p.company.legacyRate) sources.unshift({ label: '🏚️ Anciennes infrastructures', rate: p.company.legacyRate });
  return sources;
}

function globalTaskBoost(p) {
  return Math.min(MAX_TASK_BOOST, sumEffect(p, 'boost'));
}

function taskBoost(p, category) {
  const cat = builtBuildings(p)
    .filter(b => b.cat === category && b.effects.boostCat)
    .reduce((s, b) => s + b.effects.boostCat, 0);
  return globalTaskBoost(p) + cat;
}

function treasuryCap(p) {
  return Math.max(BASE_TREASURY_CAP, p.company.legacyCap || 0) + sumEffect(p, 'cap');
}

function contractSlots(p) {
  return 1 + sumEffect(p, 'contracts');
}

function siteSlots(p) {
  return 1 + (companyLevel(p).level >= 3 ? 1 : 0) + sumEffect(p, 'sites');
}

function companyValue(p) {
  const built = builtBuildings(p).reduce((s, b) => s + b.cost, 0);
  const funded = p.company.sites.reduce((s, x) => s + (x.funded || 0), 0);
  return (p.capitalSustain || 0) + built + funded;
}

function companyLevel(p) {
  const value = companyValue(p);
  let lvl = COMPANY_LEVELS[0];
  for (const l of COMPANY_LEVELS) if (value >= l.value) lvl = l;
  return lvl;
}

function completedTasksSince(profileId, sinceIso) {
  const since = new Date(sinceIso).getTime();
  return state.tasks.filter(t =>
    t.assigneeId === profileId && t.done && t.completedAt && new Date(t.completedAt).getTime() >= since
  );
}

function workedDaysInMonth(p, month) {
  const days = new Set(
    state.tasks
      .filter(t => t.assigneeId === p.id && t.done && t.completedAt && monthKeyOf(t.completedAt) === month)
      .map(t => localDayKey(t.completedAt))
  );
  return days.size;
}

function activityFactor(workedDays) {
  return Math.min(1, workedDays / ACTIVITY_TARGET_DAYS);
}

function monthlyInterest(p, month) {
  const base = Math.min(p.capitalSustain || 0, treasuryCap(p));
  return Math.floor(base * companyRate(p) / 100 * activityFactor(workedDaysInMonth(p, month)));
}

function siteProgress(p, site) {
  const b = getBuilding(site.id);
  const done = completedTasksSince(p.id, site.startedAt);
  const days = new Set(done.map(t => localDayKey(t.completedAt))).size;
  const catTasks = b.cat ? done.filter(t => t.category === b.cat).length : 0;
  const lastWork = done.reduce((m, t) => Math.max(m, new Date(t.completedAt).getTime()), new Date(site.startedAt).getTime());
  const idleDays = Math.floor((Date.now() - lastWork) / 86400000);
  const complete = days >= b.days && done.length >= b.tasks
    && (!b.cat || catTasks >= b.catTasks) && (site.funded || 0) >= b.cost;
  return { days, tasks: done.length, catTasks, idleDays, complete };
}

/** PRNG déterministe : mêmes offres pour un enfant donné pendant tout le mois. */
function seededRandom(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function monthlyOffers(p, month) {
  const rand = seededRandom(p.id + '|' + month);
  const cats = [...new Set((state.templates || []).filter(t => t.active !== false).map(t => t.category))];
  const types = Object.keys(CONTRACT_TYPES).filter(k => k !== 'category' || cats.length);
  return CONTRACT_TIERS.map((tier, i) => {
    const type = types[Math.floor(rand() * types.length)];
    const cat = type === 'category' ? cats[Math.floor(rand() * cats.length)] : null;
    const client = CONTRACT_CLIENTS[Math.floor(rand() * CONTRACT_CLIENTS.length)];
    return { offerId: `${month}_${i}`, month, tier: i, type, cat, goal: CONTRACT_TYPES[type].goals[i], pct: tier.pct, client };
  });
}

function contractLabel(c) {
  return CONTRACT_TYPES[c.type].label(c.goal, c.cat);
}

function contractProgress(p, c) {
  const done = completedTasksSince(p.id, c.signedAt).filter(t => monthKeyOf(t.completedAt) === c.month);
  if (c.type === 'days') return new Set(done.map(t => localDayKey(t.completedAt))).size;
  if (c.type === 'points') return done.reduce((s, t) => s + (t.earnedPoints ?? t.points), 0);
  if (c.type === 'category') return done.filter(t => t.category === c.cat).length;
  return done.length;
}

function contractReward(c) {
  return Math.floor(c.stake * c.pct / 100);
}

function contractsThisMonth(p) {
  const month = monthKeyOf(new Date());
  return p.company.contracts.filter(c => c.month === month);
}

function payContract(p, c) {
  const reward = contractReward(c);
  c.status = 'won';
  p.points = (p.points || 0) + c.stake + reward;
  p.pointsTotal = (p.pointsTotal || 0) + reward;
  logCompany(p, { type: 'contract_won', amount: c.stake + reward, detail: `${c.client} · prime +${reward}` });
}

/** Clôture les contrats des mois précédents. */
function settleContracts(p, currentMonth) {
  p.company.contracts.forEach(c => {
    if (c.status !== 'active' || c.month >= currentMonth) return;
    if (contractProgress(p, c) >= c.goal) {
      payContract(p, c);
    } else {
      const refund = Math.floor(c.stake * CONTRACT_FAIL_REFUND);
      c.status = 'lost';
      p.points = (p.points || 0) + refund;
      logCompany(p, { type: 'contract_lost', amount: refund, detail: `${c.client} · ${Math.round(CONTRACT_FAIL_REFUND * 100)} % de la mise rendue` });
    }
  });
  // On ne garde que l'historique récent
  p.company.contracts = p.company.contracts.filter(c => c.status === 'active' || c.month >= currentMonth).slice(-30);
}

function payMonthlyInterest(p, month) {
  const worked = workedDaysInMonth(p, month);
  const interest = monthlyInterest(p, month);
  if (interest <= 0) return;
  p.points = (p.points || 0) + interest;
  p.pointsTotal = (p.pointsTotal || 0) + interest;
  logCompany(p, {
    type: 'interest', amount: interest,
    detail: `${fmtRate(companyRate(p))} % · activité ${Math.min(worked, ACTIVITY_TARGET_DAYS)}/${ACTIVITY_TARGET_DAYS} j`
  });
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function tasksDoneToday(profileId) {
  const key = todayKey();
  return state.tasks.filter(t =>
    t.assigneeId === profileId && t.done && t.completedAt && t.completedAt.slice(0, 10) === key
  ).length;
}

function migrateProfiles() {
  const before = JSON.stringify(state.profiles);
  state.profiles.filter(p => p.type === 'child').forEach(ensureInvestFields);
  if (JSON.stringify(state.profiles) !== before) saveState();
}

// ---------- MONTHLY ----------
function checkMonthlyReset() {
  const currentMonth = monthKeyOf(new Date());
  if (state.lastMonthCheck === currentMonth) return;
  const previousMonth = state.lastMonthCheck;

  state.profiles.forEach(p => {
    if (p.type !== 'child') {
      p.convertedThisMonth = 0;
      return;
    }
    ensureInvestFields(p);
    settleContracts(p, currentMonth);
    if (previousMonth) payMonthlyInterest(p, previousMonth);
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
  renderCompany();
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
  ensureInvestFields(p);
  document.getElementById('stat-points').textContent = p.points || 0;
  document.getElementById('stat-wallet').textContent = formatMoney(p.wallet || 0);
  document.getElementById('stat-level').textContent = p.level || 1;
  document.getElementById('stat-invest').textContent = p.type === 'child' ? fmt(investedTotal(p)) : 0;
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
  if (!p) return;

  const limit = state.settings.dailyTaskLimit || 3;
  const doneToday = tasksDoneToday(p.id);
  const limitLabel = document.getElementById('daily-limit-label');
  if (limitLabel) {
    limitLabel.textContent = `${doneToday} / ${limit} aujourd'hui`;
    limitLabel.style.color = doneToday >= limit ? 'var(--danger)' : 'var(--text-muted)';
  }

  const myTasks = state.tasks.filter(t => t.assigneeId === p.id && !t.archived && !t.done);
  const list = document.getElementById('tasks-list');

  if (myTasks.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="emoji">📋</div><p>Aucune tâche en cours.<br>Choisis-en une dans le catalogue ci-dessous !</p></div>`;
  } else {
    list.innerHTML = myTasks.map(t => `
      <div class="task-card">
        <button class="task-check" data-id="${t.id}" title="Marquer comme faite"></button>
        <div class="task-info">
          <div class="task-name">${t.name}</div>
          <div class="task-meta">
            <span class="task-points">${t.points} pts</span>
            <span class="task-cat">${CATEGORY_LABELS[t.category] || ''}</span>
            ${t.recurrence !== 'once' ? `<span>🔁 ${t.recurrence === 'daily' ? 'Quotidien' : 'Hebdo'}</span>` : ''}
          </div>
        </div>
        <div class="task-actions">
          <button class="task-cancel" data-id="${t.id}" title="Annuler">✖️</button>
        </div>
      </div>
    `).join('');
  }

  list.querySelectorAll('.task-check').forEach(btn => {
    btn.addEventListener('click', () => openDifficultyModal(btn.dataset.id));
  });
  list.querySelectorAll('.task-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Retirer cette tâche de ta liste ?')) {
        state.tasks = state.tasks.filter(t => t.id !== btn.dataset.id);
        saveState();
        renderChildTasks();
        showToast('Tâche retirée');
      }
    });
  });

  renderCatalogFilters();
  renderCatalogList();
}

function renderCatalogFilters() {
  const el = document.getElementById('category-filters');
  if (!el) return;
  const cats = ['all', ...Object.keys(CATEGORY_LABELS)];
  el.innerHTML = cats.map(c => `
    <button class="cat-filter ${catalogCategory === c ? 'active' : ''}" data-cat="${c}">
      ${c === 'all' ? 'Toutes' : CATEGORY_LABELS[c]}
    </button>
  `).join('');
  el.querySelectorAll('.cat-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      catalogCategory = btn.dataset.cat;
      renderCatalogFilters();
      renderCatalogList();
    });
  });
}

function renderCatalogList() {
  const catList = document.getElementById('catalog-list');
  if (!catList) return;
  const p = getCurrentProfile();
  const limit = state.settings.dailyTaskLimit || 3;
  const doneToday = p ? tasksDoneToday(p.id) : 0;
  const atLimit = doneToday >= limit;
  const myActiveIds = new Set(
    state.tasks.filter(t => t.assigneeId === p?.id && !t.done && !t.archived).map(t => t.templateId)
  );

  let templates = (state.templates || []).filter(t => t.active !== false);
  if (catalogCategory !== 'all') {
    templates = templates.filter(t => t.category === catalogCategory);
  }
  if (catalogSearch.trim()) {
    const q = catalogSearch.trim().toLowerCase();
    templates = templates.filter(t => t.name.toLowerCase().includes(q));
  }

  if (templates.length === 0) {
    catList.innerHTML = `<div class="empty-state"><div class="emoji">🔍</div><p>Aucune tâche trouvée.</p></div>`;
    return;
  }

  catList.innerHTML = templates.map(t => {
    const already = myActiveIds.has(t.id);
    const disabled = atLimit || already;
    let btnLabel = 'Je la fais';
    if (already) btnLabel = 'Déjà prise';
    else if (atLimit) btnLabel = 'Limite atteinte';
    return `
      <div class="catalog-card" style="margin-bottom:0.5rem">
        <div class="task-info">
          <div class="task-name">${t.name}</div>
          <div class="task-meta">
            <span class="task-points">${t.points} pts</span>
            <span class="task-cat">${CATEGORY_LABELS[t.category] || ''}</span>
            <span>${t.difficulty}</span>
          </div>
        </div>
        <button class="btn-claim" data-id="${t.id}" ${disabled ? 'disabled' : ''}>${btnLabel}</button>
      </div>`;
  }).join('');

  catList.querySelectorAll('.btn-claim:not(:disabled)').forEach(btn => {
    btn.addEventListener('click', () => claimTask(btn.dataset.id));
  });
}

function claimTask(templateId) {
  const p = getCurrentProfile();
  if (!p || p.type !== 'child') return;
  const limit = state.settings.dailyTaskLimit || 3;
  if (tasksDoneToday(p.id) >= limit) {
    showToast(`Limite de ${limit} tâches / jour atteinte`);
    return;
  }
  const tpl = state.templates.find(t => t.id === templateId);
  if (!tpl) return;

  // Évite les doublons actifs
  const already = state.tasks.some(t => t.assigneeId === p.id && t.templateId === tpl.id && !t.done && !t.archived);
  if (already) {
    showToast('Tu as déjà cette tâche');
    return;
  }

  state.tasks.push({
    id: 't_' + Date.now() + Math.random().toString(36).slice(2, 6),
    templateId: tpl.id,
    name: tpl.name,
    category: tpl.category,
    points: tpl.points,
    difficulty: tpl.difficulty,
    assigneeId: p.id,
    recurrence: 'once',
    done: false,
    archived: false,
    feltDifficulty: null,
    selfClaimed: true,
    createdAt: new Date().toISOString(),
    completedAt: null,
  });

  saveState();
  renderChildTasks();
  showToast(`« ${tpl.name} » ajoutée ! 📋`);
}

function openDifficultyModal(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task || task.done) return;
  const p = getCurrentProfile();
  const limit = state.settings.dailyTaskLimit || 3;
  if (p && tasksDoneToday(p.id) >= limit) {
    showToast(`Limite de ${limit} tâches / jour atteinte`);
    return;
  }
  pendingCompleteTaskId = taskId;
  selectedFelt = 2;
  document.getElementById('diff-task-name').textContent = task.name;
  let bonus = 0;
  if (p) {
    ensureInvestFields(p);
    bonus = Math.round(task.points * taskBoost(p, task.category) / 100);
  }
  document.getElementById('diff-points').textContent = bonus ? `${task.points} + ${bonus} bonus entreprise` : task.points;
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

  const limit = state.settings.dailyTaskLimit || 3;
  if (tasksDoneToday(profile.id) >= limit) {
    showToast(`Limite de ${limit} tâches / jour atteinte`);
    closeModal('modal-difficulty');
    return;
  }

  ensureInvestFields(profile);
  const bonus = Math.round(task.points * taskBoost(profile, task.category) / 100);
  const earned = task.points + bonus;

  task.done = true;
  task.completedAt = new Date().toISOString();
  task.feltDifficulty = selectedFelt;
  task.bonusPoints = bonus;
  task.earnedPoints = earned;

  profile.points = (profile.points || 0) + earned;
  profile.pointsTotal = (profile.pointsTotal || 0) + earned;
  profile.tasksDone = (profile.tasksDone || 0) + 1;
  profile.xp = (profile.xp || 0) + earned;

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
      bonusPoints: null,
      earnedPoints: null,
      archived: false,
      createdAt: new Date().toISOString(),
    });
  }

  saveState();
  closeModal('modal-difficulty');
  renderChildTasks();
  updateStatsBar();
  renderProgress();

  showToast(bonus ? `+${earned} points (dont 🏢 +${bonus}) ! 🎉` : `+${earned} points ! 🎉`);
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

// ---------- ENTREPRISE : UI ----------
function effectText(b) {
  const e = b.effects;
  const parts = [];
  if (e.rate) parts.push(`📈 +${fmtRate(e.rate)} % rendement`);
  if (e.boost) parts.push(`🚀 +${e.boost} % points sur toutes les tâches`);
  if (e.boostCat) parts.push(`🎯 +${e.boostCat} % points ${CATEGORY_LABELS[b.cat] || ''}`);
  if (e.cap) parts.push(`🏦 +${fmt(e.cap)} trésorerie max`);
  if (e.contracts) parts.push(`📜 +${e.contracts} contrat / mois`);
  if (e.sites) parts.push(`🏗️ +${e.sites} chantier en parallèle`);
  return parts.join(' · ');
}

function progressRow(icon, label, value, goal, unit = '') {
  const pct = Math.min(100, goal ? (value / goal) * 100 : 100);
  const ok = value >= goal;
  return `
    <div class="prog-row ${ok ? 'ok' : ''}">
      <div class="prog-head"><span>${icon} ${label}</span><span>${fmt(Math.min(value, goal))} / ${fmt(goal)}${unit} ${ok ? '✔' : ''}</span></div>
      <div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div>
    </div>`;
}

function renderCompany() {
  const p = getCurrentProfile();
  if (!p || p.type !== 'child') return;
  ensureInvestFields(p);

  renderCompanyHero(p);
  renderCompanyKpis(p);
  document.querySelectorAll('#company-views .seg-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.id === companyView);
  });
  const view = document.getElementById('company-view');
  if (companyView === 'contracts') view.innerHTML = companyContractsHtml(p);
  else if (companyView === 'treasury') view.innerHTML = companyTreasuryHtml(p);
  else if (companyView === 'journal') view.innerHTML = companyJournalHtml(p);
  else view.innerHTML = companySitesHtml(p);

  const invEl = document.getElementById('stat-invest');
  if (invEl) invEl.textContent = fmt(investedTotal(p));
}

function investedTotal(p) {
  return (p.capitalSustain || 0) + p.company.sites.reduce((s, x) => s + (x.funded || 0), 0);
}

function renderCompanyHero(p) {
  const value = companyValue(p);
  const lvl = companyLevel(p);
  const next = COMPANY_LEVELS.find(l => l.value > value);
  const pct = next ? ((value - lvl.value) / (next.value - lvl.value)) * 100 : 100;
  const built = builtBuildings(p);
  const sites = p.company.sites.map(s => getBuilding(s.id)).filter(Boolean);
  const skyline = built.length || sites.length
    ? built.map(b => `<span title="${b.name}">${b.emoji}</span>`).join('')
      + sites.map(b => `<span class="ghost" title="${b.name} (en chantier)">🏗️</span>`).join('')
    : '<em>Terrain vide… lance ton premier chantier !</em>';

  document.getElementById('company-hero').innerHTML = `
    <img class="hero-img" src="assets/img/enterprise.svg" alt="">
    <div class="hero-top">
      <div class="hero-emoji">${lvl.emoji}</div>
      <div class="hero-id">
        <div class="hero-name">${escapeHtml(p.company.name)}
          <button class="link-btn" data-action="rename" title="Renommer">✏️</button></div>
        <div class="hero-level">Niv. ${lvl.level} · ${lvl.name}</div>
      </div>
    </div>
    <div class="hero-value"><span>Valeur de l’entreprise</span><strong>${fmt(value)} pts</strong></div>
    <div class="hero-bar"><div class="hero-fill" style="width:${pct}%"></div></div>
    <div class="hero-next">${next
      ? `Prochain statut : ${next.emoji} ${next.name} à ${fmt(next.value)} pts`
      : 'Statut maximal atteint ! 👑'}</div>
    <div class="hero-skyline">${skyline}</div>`;
}

function renderCompanyKpis(p) {
  const month = monthKeyOf(new Date());
  const worked = workedDaysInMonth(p, month);
  const boost = globalTaskBoost(p);
  document.getElementById('company-kpis').innerHTML = `
    <div class="kpi"><strong>${fmtRate(companyRate(p))} %</strong><span>Rendement / mois</span><small>max ${MAX_YIELD_RATE} %</small></div>
    <div class="kpi"><strong>+${boost} %</strong><span>Bonus tâches</span><small>max ${MAX_TASK_BOOST} %</small></div>
    <div class="kpi"><strong>${fmt(monthlyInterest(p, month))}</strong><span>Intérêts prévus</span><small>pts le 1er du mois</small></div>
    <div class="kpi ${worked >= ACTIVITY_TARGET_DAYS ? 'good' : ''}"><strong>${Math.min(worked, ACTIVITY_TARGET_DAYS)}/${ACTIVITY_TARGET_DAYS}</strong><span>Jours actifs</span><small>ce mois-ci</small></div>`;
}

function companySitesHtml(p) {
  const c = p.company;
  const slots = siteSlots(p);
  const limit = state.settings.dailyTaskLimit || 3;
  let html = `<img class="company-banner" src="assets/img/sustainable.svg" alt="Infrastructures durables">
    <div class="section-header"><h2>🏗️ Chantiers en cours</h2><span class="hint">${c.sites.length} / ${slots}</span></div>`;

  if (c.sites.length === 0) {
    html += `<div class="company-card empty-hint">Aucun chantier. Choisis un plan ci-dessous pour commencer à bâtir !</div>`;
  }

  html += c.sites.map(site => {
    const b = getBuilding(site.id);
    if (!b) return '';
    const pr = siteProgress(p, site);
    const missingFunds = b.cost - (site.funded || 0);
    const remainingDays = Math.max(b.days - pr.days, Math.ceil(Math.max(0, b.tasks - pr.tasks) / limit));
    let status;
    if (pr.complete) status = '<div class="site-status ready">🎉 Travaux terminés ! Tu peux inaugurer.</div>';
    else if (pr.idleDays >= SITE_STALL_DAYS) status = `<div class="site-status stall">⚠️ Chantier à l’arrêt depuis ${pr.idleDays} jours. Fais une tâche pour relancer les travaux !</div>`;
    else if (remainingDays > 0) status = `<div class="site-status">⏳ Encore au moins ${remainingDays} jour(s) de travail</div>`;
    else status = '<div class="site-status">💰 Il ne manque plus que le financement !</div>';

    return `
      <div class="company-card site-card">
        <div class="site-head">
          <div class="site-emoji">${b.emoji}</div>
          <div class="site-title">
            <div class="site-name">${b.name}</div>
            <div class="hint">Lancé le ${formatDate(site.startedAt)} · ${effectText(b)}</div>
          </div>
        </div>
        ${progressRow('📅', 'Jours de travail', pr.days, b.days, ' j')}
        ${progressRow('✅', 'Tâches réalisées', pr.tasks, b.tasks)}
        ${b.cat ? progressRow('🎯', `Dont ${CATEGORY_LABELS[b.cat]}`, pr.catTasks, b.catTasks) : ''}
        ${progressRow('💰', 'Financement', site.funded || 0, b.cost, ' pts')}
        ${status}
        ${pr.complete
          ? `<button class="btn-primary btn-large" data-action="inaugurate" data-id="${b.id}">🎉 Inaugurer ${b.name}</button>`
          : missingFunds > 0 ? `
            <div class="convert-row">
              <input type="number" id="fund-${b.id}" min="1" max="${missingFunds}" placeholder="Points">
              <button class="btn-secondary" data-action="fund-max" data-id="${b.id}">Max</button>
              <button class="btn-primary" data-action="fund-site" data-id="${b.id}">Financer</button>
            </div>` : ''}
        <button class="link-btn danger" data-action="abandon" data-id="${b.id}">Abandonner le chantier</button>
      </div>`;
  }).join('');

  const built = builtIds(p);
  const inProgress = new Set(c.sites.map(s => s.id));

  if (c.buildings.length) {
    html += `<div class="section-header" style="margin-top:1.2rem"><h2>🏙️ Mes bâtiments</h2><span class="hint">${c.buildings.length} / ${BUILDINGS.length}</span></div>
      <div class="buildings-grid">${c.buildings.map(x => {
        const b = getBuilding(x.id);
        if (!b) return '';
        return `<div class="building-tile"><div class="emoji">${b.emoji}</div><div class="name">${b.name}</div>
          <div class="effects">${effectText(b)}</div><div class="hint">Depuis le ${formatDate(x.builtAt)}</div></div>`;
      }).join('')}</div>`;
  }

  const plans = BUILDINGS.filter(b => !built.has(b.id) && !inProgress.has(b.id));
  if (plans.length) {
    const slotsFull = c.sites.length >= slots;
    html += `<div class="section-header" style="margin-top:1.2rem"><h2>📐 Plans de construction</h2></div>`;
    if (slotsFull) html += `<p class="hint" style="margin-bottom:0.6rem">Tous tes emplacements de chantier sont occupés. Termine un chantier pour en lancer un autre.</p>`;
    html += plans.map(b => {
      const missing = b.requires.filter(r => !built.has(r));
      const locked = missing.length > 0;
      return `
        <div class="company-card plan-card ${locked ? 'locked' : ''}">
          <div class="site-head">
            <div class="site-emoji">${locked ? '🔒' : b.emoji}</div>
            <div class="site-title">
              <div class="site-name">${b.name}</div>
              <div class="hint">${b.desc}</div>
            </div>
          </div>
          <div class="plan-reqs">
            <span>📅 ${b.days} jours de travail</span>
            <span>✅ ${b.tasks} tâches${b.cat ? ` (dont ${b.catTasks} ${CATEGORY_LABELS[b.cat]})` : ''}</span>
            <span>💰 ${fmt(b.cost)} pts</span>
          </div>
          <div class="plan-effects">${effectText(b)}</div>
          ${locked
            ? `<div class="hint">Nécessite : ${missing.map(r => { const x = getBuilding(r); return `${x.emoji} ${x.name}`; }).join(', ')}</div>`
            : `<button class="btn-primary btn-block" data-action="start-site" data-id="${b.id}" ${slotsFull ? 'disabled' : ''}>🏗️ Lancer le chantier</button>`}
        </div>`;
    }).join('');
  } else if (!c.sites.length) {
    html += `<div class="company-card empty-hint">👑 Tu as tout construit. Ton empire est complet !</div>`;
  }

  html += `<p class="hint" style="margin-top:0.8rem">Un chantier n’avance que les jours où tu fais au moins une tâche. Pas de travail, pas de bâtiment !</p>`;
  return html;
}

function companyContractsHtml(p) {
  const month = monthKeyOf(new Date());
  const mine = contractsThisMonth(p);
  const slots = contractSlots(p);
  const signedIds = new Set(mine.map(c => c.offerId));
  const maxStake = companyLevel(p).maxStake;
  const slotsFull = mine.length >= slots;

  let html = `
    <img class="company-banner" src="assets/img/temporary.svg" alt="Contrats du mois">
    <div class="company-card">
      <h3>📜 Contrats de ${monthLabel(month)}</h3>
      <p class="hint">Mise des points sur un objectif. Réussis avant la fin du mois : tu récupères ta mise <strong>+ une prime</strong>.
      En cas d’échec, tu ne récupères que ${Math.round(CONTRACT_FAIL_REFUND * 100)} % de ta mise.
      Seules les tâches faites <strong>après la signature</strong> comptent.</p>
      <div class="stat-row"><span>Contrats signés ce mois</span><span>${mine.length} / ${slots}</span></div>
      <div class="stat-row"><span>Mise maximum (${companyLevel(p).name})</span><span>${fmt(maxStake)} pts</span></div>
      <div class="stat-row"><span>Fin du mois</span><span>dans ${daysLeftInMonth()} jour(s)</span></div>
    </div>`;

  if (mine.length) {
    html += `<div class="section-header"><h2>Mes contrats</h2></div>`;
    html += mine.map(c => {
      const tier = CONTRACT_TIERS[c.tier];
      const prog = contractProgress(p, c);
      const reward = contractReward(c);
      const reached = prog >= c.goal;
      return `
        <div class="company-card contract-card tier-${c.tier} ${c.status}">
          <div class="contract-head"><span class="tier-badge">${tier.emoji} ${tier.name}</span><span class="hint">${escapeHtml(c.client)}</span></div>
          <div class="contract-goal">${contractLabel(c)}</div>
          ${progressRow('📊', 'Progression', prog, c.goal)}
          <div class="contract-deal">Mise ${fmt(c.stake)} pts → <strong>${fmt(c.stake + reward)} pts</strong> (+${c.pct} %)</div>
          ${c.status === 'won'
            ? '<div class="site-status ready">🏆 Contrat réussi et encaissé !</div>'
            : reached
              ? `<button class="btn-primary btn-block" data-action="claim-contract" data-id="${c.offerId}">💰 Encaisser ${fmt(c.stake + reward)} pts</button>`
              : ''}
        </div>`;
    }).join('');
  }

  const offers = monthlyOffers(p, month).filter(o => !signedIds.has(o.offerId));
  if (offers.length) {
    html += `<div class="section-header"><h2>Offres des clients</h2></div>`;
    if (slotsFull) html += `<p class="hint" style="margin-bottom:0.6rem">Tu as signé le maximum de contrats ce mois-ci. Construis un 📦 Entrepôt ou une 🏦 Banque pour en signer plus.</p>`;
    html += offers.map(o => {
      const tier = CONTRACT_TIERS[o.tier];
      return `
        <div class="company-card contract-card tier-${o.tier}">
          <div class="contract-head"><span class="tier-badge">${tier.emoji} ${tier.name}</span><span class="hint">${escapeHtml(o.client)}</span></div>
          <div class="contract-goal">${contractLabel(o)}</div>
          <div class="contract-deal">Prime : <strong>+${o.pct} %</strong> de ta mise</div>
          <div class="convert-row">
            <input type="number" id="stake-${o.offerId}" min="${CONTRACT_MIN_STAKE}" max="${maxStake}" placeholder="Mise" ${slotsFull ? 'disabled' : ''}>
            <button class="btn-secondary" data-action="stake-max" data-id="${o.offerId}" ${slotsFull ? 'disabled' : ''}>Max</button>
            <button class="btn-primary" data-action="sign-contract" data-id="${o.offerId}" ${slotsFull ? 'disabled' : ''}>Signer</button>
          </div>
        </div>`;
    }).join('');
  }
  return html;
}

function companyTreasuryHtml(p) {
  const month = monthKeyOf(new Date());
  const cap = treasuryCap(p);
  const capital = p.capitalSustain || 0;
  const worked = workedDaysInMonth(p, month);
  const factor = activityFactor(worked);
  const sources = companyRateSources(p);
  const now = new Date();
  const nextPay = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return `
    <div class="company-card">
      <h3>🏦 Trésorerie</h3>
      <p class="hint">Les points placés ici sont bloqués et rapportent des intérêts chaque 1er du mois, selon ton rendement et ton activité.</p>
      ${progressRow('💼', 'Capital placé', capital, cap, ' pts')}
      ${capital >= cap
        ? '<p class="hint">Trésorerie pleine ! Construis un 📦 Entrepôt, une 🏦 Banque ou le 🏙️ Siège social pour l’agrandir.</p>'
        : `<div class="convert-row">
            <input type="number" id="deposit-pts" min="1" placeholder="Points">
            <button class="btn-secondary" data-action="deposit-max">Max</button>
            <button class="btn-primary" data-action="deposit">Placer</button>
          </div>`}
    </div>

    <div class="company-card">
      <h3>📈 Rendement : ${fmtRate(companyRate(p))} % / mois</h3>
      ${sources.length
        ? sources.map(s => `<div class="stat-row"><span>${s.label}</span><span>+${fmtRate(s.rate)} %</span></div>`).join('')
        : '<p class="hint">Aucun rendement pour l’instant. Construis un 🔧 Atelier pour commencer à gagner des intérêts.</p>'}
      <p class="hint">Plafond : ${MAX_YIELD_RATE} % par mois.</p>
    </div>

    <div class="company-card">
      <h3>⚙️ Activité de ${monthLabel(month)}</h3>
      ${progressRow('📅', 'Jours travaillés', worked, ACTIVITY_TARGET_DAYS, ' j')}
      <p class="hint">Une entreprise sans travail ne rapporte rien ! Il faut ${ACTIVITY_TARGET_DAYS} jours actifs dans le mois
        pour toucher 100 % des intérêts. Actuellement : <strong>${Math.round(factor * 100)} %</strong>.</p>
      <div class="stat-row"><span>Intérêts prévus</span><span>${fmt(monthlyInterest(p, month))} pts</span></div>
      <div class="stat-row"><span>Prochain versement</span><span>${nextPay.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span></div>
    </div>`;
}

function companyJournalHtml(p) {
  const history = (p.investHistory || []).slice(0, 40);
  return `
    <div class="company-card">
      <h3>📊 Journal de l’entreprise</h3>
      ${history.length === 0
        ? '<p class="hint">Aucun mouvement pour le moment.</p>'
        : history.map(h => {
          const t = JOURNAL_TYPES[h.type] || { label: '💼 Mouvement', sign: '' };
          return `
            <div class="history-item">
              <div>
                <div>${t.label}${h.detail ? ' · ' + escapeHtml(h.detail) : ''}</div>
                <div class="date">${formatDate(h.date)}</div>
              </div>
              ${t.sign && h.amount ? `<div class="amount ${t.sign === '-' ? 'neg' : ''}">${t.sign}${fmt(h.amount)} pts</div>` : ''}
            </div>`;
        }).join('')}
    </div>`;
}

// ---------- ENTREPRISE : ACTIONS ----------
function readPoints(inputId) {
  const el = document.getElementById(inputId);
  return el ? parseInt(el.value) || 0 : 0;
}

function setInput(inputId, value) {
  const el = document.getElementById(inputId);
  if (el) el.value = Math.max(0, Math.floor(value));
}

function commitCompany(msg) {
  saveState();
  updateStatsBar();
  renderCompany();
  if (msg) showToast(msg);
}

function onCompanyClick(e) {
  const el = e.target.closest('[data-action]');
  if (!el || el.disabled) return;
  const p = getCurrentProfile();
  if (!p || p.type !== 'child') return;
  ensureInvestFields(p);
  const id = el.dataset.id;

  switch (el.dataset.action) {
    case 'view': companyView = id; renderCompany(); break;
    case 'rename': renameCompany(p); break;
    case 'start-site': startSite(p, id); break;
    case 'fund-site': fundSite(p, id, readPoints(`fund-${id}`)); break;
    case 'fund-max': {
      const site = p.company.sites.find(s => s.id === id);
      if (site) setInput(`fund-${id}`, Math.min(p.points || 0, getBuilding(id).cost - (site.funded || 0)));
      break;
    }
    case 'inaugurate': inaugurate(p, id); break;
    case 'abandon': abandonSite(p, id); break;
    case 'stake-max': setInput(`stake-${id}`, Math.min(p.points || 0, companyLevel(p).maxStake)); break;
    case 'sign-contract': signContract(p, id, readPoints(`stake-${id}`)); break;
    case 'claim-contract': claimContract(p, id); break;
    case 'deposit-max': setInput('deposit-pts', Math.min(p.points || 0, treasuryCap(p) - (p.capitalSustain || 0))); break;
    case 'deposit': deposit(p, readPoints('deposit-pts')); break;
  }
}

function renameCompany(p) {
  const name = prompt('Nom de ton entreprise :', p.company.name);
  if (name == null) return;
  const clean = name.trim().slice(0, 30);
  if (!clean) return;
  p.company.name = clean;
  commitCompany('Entreprise renommée ✔');
}

function startSite(p, id) {
  const b = getBuilding(id);
  if (!b) return;
  const built = builtIds(p);
  if (built.has(id) || p.company.sites.some(s => s.id === id)) return;
  if (b.requires.some(r => !built.has(r))) { showToast('Il manque des bâtiments requis'); return; }
  if (p.company.sites.length >= siteSlots(p)) { showToast('Plus d’emplacement de chantier libre'); return; }
  p.company.sites.push({ id, startedAt: new Date().toISOString(), funded: 0 });
  logCompany(p, { type: 'site_start', amount: 0, detail: `${b.emoji} ${b.name}` });
  commitCompany(`Chantier ${b.name} lancé ! 🏗️`);
}

function fundSite(p, id, pts) {
  const site = p.company.sites.find(s => s.id === id);
  const b = getBuilding(id);
  if (!site || !b) return;
  const amount = Math.min(pts, b.cost - (site.funded || 0));
  if (amount <= 0) { showToast('Entre un nombre de points valide'); return; }
  if (amount > (p.points || 0)) { showToast('Pas assez de points !'); return; }
  p.points -= amount;
  site.funded = (site.funded || 0) + amount;
  logCompany(p, { type: 'site_fund', amount, detail: `${b.emoji} ${b.name}` });
  commitCompany(`${amount} pts investis dans ${b.name} 💰`);
}

function inaugurate(p, id) {
  const site = p.company.sites.find(s => s.id === id);
  const b = getBuilding(id);
  if (!site || !b || !siteProgress(p, site).complete) return;
  const before = companyLevel(p);
  p.company.sites = p.company.sites.filter(s => s.id !== id);
  p.company.buildings.push({ id, builtAt: new Date().toISOString() });
  logCompany(p, { type: 'inaugurate', amount: 0, detail: `${b.emoji} ${b.name}` });
  commitCompany();
  showToast(`🎉 ${b.name} inauguré !`, 3500);
  const after = companyLevel(p);
  if (after.level > before.level) {
    setTimeout(() => showToast(`${after.emoji} Ton entreprise devient : ${after.name} !`, 3500), 3000);
  }
}

function abandonSite(p, id) {
  const site = p.company.sites.find(s => s.id === id);
  const b = getBuilding(id);
  if (!site || !b) return;
  const refund = Math.floor((site.funded || 0) * SITE_ABANDON_REFUND);
  if (!confirm(`Abandonner le chantier ${b.name} ?\n\nToute la progression sera perdue et tu ne récupères que ${refund} pts (${Math.round(SITE_ABANDON_REFUND * 100)} % du financement).`)) return;
  p.company.sites = p.company.sites.filter(s => s.id !== id);
  p.points = (p.points || 0) + refund;
  logCompany(p, { type: 'site_abandon', amount: refund, detail: `${b.emoji} ${b.name}` });
  commitCompany('Chantier abandonné 🚧');
}

function signContract(p, offerId, stake) {
  const month = monthKeyOf(new Date());
  const offer = monthlyOffers(p, month).find(o => o.offerId === offerId);
  if (!offer) return;
  if (contractsThisMonth(p).some(c => c.offerId === offerId)) return;
  if (contractsThisMonth(p).length >= contractSlots(p)) { showToast('Maximum de contrats atteint ce mois-ci'); return; }
  const maxStake = companyLevel(p).maxStake;
  if (stake < CONTRACT_MIN_STAKE || stake > maxStake) { showToast(`Mise entre ${CONTRACT_MIN_STAKE} et ${maxStake} pts`); return; }
  if (stake > (p.points || 0)) { showToast('Pas assez de points !'); return; }
  p.points -= stake;
  p.company.contracts.push({ ...offer, stake, signedAt: new Date().toISOString(), status: 'active' });
  logCompany(p, { type: 'contract_sign', amount: stake, detail: offer.client });
  commitCompany('Contrat signé ✍️ Au travail !');
}

function claimContract(p, offerId) {
  const c = contractsThisMonth(p).find(x => x.offerId === offerId && x.status === 'active');
  if (!c || contractProgress(p, c) < c.goal) return;
  payContract(p, c);
  commitCompany(`🏆 +${fmt(c.stake + contractReward(c))} pts encaissés !`);
}

function deposit(p, pts) {
  const room = treasuryCap(p) - (p.capitalSustain || 0);
  if (pts <= 0) { showToast('Entre un nombre valide'); return; }
  if (pts > (p.points || 0)) { showToast('Pas assez de points !'); return; }
  if (room <= 0) { showToast('Trésorerie pleine'); return; }
  const amount = Math.min(pts, room);
  p.points -= amount;
  p.capitalSustain += amount;
  logCompany(p, { type: 'invest_sustain', amount });
  commitCompany(`${amount} pts placés en trésorerie 🏦`);
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
    if (!isParent) ensureInvestFields(p);
    return `
      <div class="family-card">
        <img src="${avatarSVG(p.avatar, 48)}" alt="">
        <div class="info">
          <div class="fname">${p.name} ${isParent ? '🔑' : ''}</div>
          <div class="fmeta">
            ${isParent
              ? 'Parent · Admin'
              : `Niv. ${p.level || 1} · ${p.points || 0} pts · ${formatMoney(p.wallet || 0)} · ${p.tasksDone || 0} tâches · ${companyLevel(p).emoji} ${companyLevel(p).name} (${builtBuildings(p).length} bât.)`}
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
      capitalSustain: 0,
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
  const dailyInput = document.getElementById('daily-limit-input');
  if (dailyInput) dailyInput.value = state.settings.dailyTaskLimit || 3;
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
  if (tabId === 'invest') renderCompany();
  if (tabId === 'progress') renderProgress();
  if (tabId === 'admin-tasks') renderAdminTasks();
  if (tabId === 'admin-catalog') renderAdminCatalog();
  if (tabId === 'admin-assign') renderAssignForm();
  if (tabId === 'admin-family') renderAdminFamily();
}

// ---------- INIT ----------
function init() {
  loadState();
  migrateProfiles();
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
  document.getElementById('convert-points').addEventListener('input', updateConvertPreview);
  document.getElementById('btn-confirm-complete').addEventListener('click', confirmComplete);

  document.getElementById('tab-invest').addEventListener('click', onCompanyClick);

  const searchInput = document.getElementById('catalog-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      catalogSearch = searchInput.value;
      renderCatalogList();
    });
  }

  const dailyLimitInput = document.getElementById('daily-limit-input');
  if (dailyLimitInput) {
    dailyLimitInput.addEventListener('change', e => {
      state.settings.dailyTaskLimit = Math.max(1, parseInt(e.target.value) || 3);
      saveState();
      showToast('Limite journalière mise à jour');
    });
  }

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
