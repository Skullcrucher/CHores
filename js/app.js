/* ============================================
   CHORES - Application familiale v2
   ============================================ */

const STORAGE_KEY = 'chores_v3';
const BACKUP_KEY = 'chores_backups_v3';
const RATE_DEFAULT = 0.10;
const MAX_AUTO_BACKUPS = 5;
const APP_VERSION = '3.4.0';

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
  } catch (e) { return []; }
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
const ACTIVITY_TARGET_DAYS = 20;   // jours travaillés / mois pour toucher 100 % des intérêts
const INTEREST_WORK_CAP = 0.5;     // intérêts plafonnés à 50 % des points gagnés en tâches dans le mois
const EFFICIENCY_WINDOW_DAYS = 14; // efficacité = régularité sur les 14 derniers jours…
const EFFICIENCY_TARGET_DAYS = 12; // …12 jours actifs sur 14 = 100 % des bonus
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
  { level: 2, value: 600,   name: 'Start-up',          emoji: '🚀', maxStake: 200 },
  { level: 3, value: 2500,  name: 'PME',               emoji: '🏢', maxStake: 350 },
  { level: 4, value: 8000,  name: 'Grand groupe',      emoji: '🏛️', maxStake: 600 },
  { level: 5, value: 20000, name: 'Multinationale',    emoji: '🌍', maxStake: 900 },
  { level: 6, value: 45000, name: 'Empire',            emoji: '👑', maxStake: 1300 },
];

/**
 * Exigences communes à chaque niveau de branche. Un chantier n'avance que
 * les jours où l'enfant travaille (au moins une tâche validée) :
 * `days` = jours de travail réels. Le niveau 5 demande plus de 5 mois.
 */
const BRANCH_LEVELS = [
  { days: 20,  tasks: 30,  cost: 300 },
  { days: 40,  tasks: 60,  cost: 600 },
  { days: 70,  tasks: 105, cost: 1000 },
  { days: 110, tasks: 165, cost: 1600 },
  { days: 160, tasks: 240, cost: 2500 },
];
const MAX_BRANCH_LEVEL = BRANCH_LEVELS.length;
const BASE_SITE_SLOTS = 2;
const MAX_SPEED_BONUS = 30;

const catLevels = () => BRANCH_LEVELS.map(() => ({ boostCat: 5 }));

/** Branches de l'entreprise : chacune a sa propre spécialité d'évolution. */
const BRANCHES = [
  { id: 'industrie', name: 'Industrie', emoji: '🏭', spec: 'Rendement de la trésorerie',
    levels: [{ rate: 1 }, { rate: 1 }, { rate: 1 }, { rate: 1 }, { rate: 1 }] },
  { id: 'commerce', name: 'Commerce', emoji: '🏪', spec: 'Bonus sur toutes les tâches',
    levels: [{ boost: 3 }, { boost: 4 }, { boost: 5 }, { boost: 6 }, { boost: 7 }] },
  { id: 'finance', name: 'Finance', emoji: '🏦', spec: 'Trésorerie et contrats',
    levels: [{ cap: 1000 }, { cap: 2000, contracts: 1 }, { cap: 3000 }, { cap: 5000, contracts: 1 }, { cap: 8000 }] },
  { id: 'recherche', name: 'Recherche', emoji: '🔬', spec: 'Chantiers en parallèle et plus rapides',
    levels: [{ sites: 1 }, { speed: 10 }, { sites: 1 }, { speed: 10 }, { speed: 10 }] },
  { id: 'restauration', name: 'Restauration', emoji: '🍳', cat: 'cuisine', spec: 'Bonus tâches Cuisine', levels: catLevels() },
  { id: 'nettoyage', name: 'Nettoyage', emoji: '🧽', cat: 'menage', spec: 'Bonus tâches Ménage', levels: catLevels() },
  { id: 'pressing', name: 'Pressing', emoji: '🧺', cat: 'linge', spec: 'Bonus tâches Linge', levels: catLevels() },
  { id: 'paysagiste', name: 'Paysagiste', emoji: '🌻', cat: 'exterieur', spec: 'Bonus tâches Extérieur', levels: catLevels() },
  { id: 'animalerie', name: 'Animalerie', emoji: '🐾', cat: 'animaux', spec: 'Bonus tâches Animaux', levels: catLevels() },
];

/**
 * Branche spéciale : demande d'augmentation de l'argent de poche (plafond mensuel),
 * soumise à l'accord d'un parent. Environ 3 mois de travail quotidien dans les deux modes.
 */
const RAISE_MODES = {
  progressive: {
    label: 'Petit à petit (+1 € × 5)',
    reqs: BRANCH_LEVELS.map(() => ({ days: 18, tasks: 50, cost: 500 })),
    levels: BRANCH_LEVELS.map(() => ({ raise: 1 })),
  },
  lump: {
    label: 'En une fois (+5 €)',
    reqs: [{ days: 90, tasks: 250, cost: 2500 }],
    levels: [{ raise: 5 }],
  },
};

function raiseBranch(p) {
  const mode = RAISE_MODES[(p && p.company && p.company.raiseMode) || state.settings.raiseMode] || RAISE_MODES.progressive;
  return {
    id: 'salaire', name: 'Direction des salaires', emoji: '🤝', special: true, noSpeed: true,
    spec: 'Augmenter ton argent de poche (accord parent)', reqs: mode.reqs, levels: mode.levels,
  };
}

function allBranches(p) {
  return [raiseBranch(p), ...BRANCHES];
}

function levelReqs(b) {
  return b.reqs || BRANCH_LEVELS;
}

function maxLevel(b) {
  return b.levels.length;
}

/** Correspondance avec l'ancien modèle à bâtiments uniques. */
const LEGACY_BUILDING_BRANCH = {
  atelier: 'industrie', usine: 'industrie', centrale: 'industrie', siege: 'industrie',
  boutique: 'commerce', entrepot: 'finance', banque: 'finance', labo: 'recherche',
  cuisine_centrale: 'restauration', agence_nettoyage: 'nettoyage', blanchisserie: 'pressing',
  jardinerie: 'paysagiste', clinique_veto: 'animalerie',
};

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
  raise_request:  { label: '🤝 Demande d’augmentation',     sign: '' },
  raise_accepted: { label: '🎉 Augmentation accordée',       sign: '' },
  raise_refused:  { label: '🙅 Augmentation refusée',        sign: '+' },
};

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

function getBranch(id, p) {
  return allBranches(p).find(b => b.id === id);
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
      branches: {},
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
  if (!p.company.branches) {
    // Migration bâtiments uniques → branches : chaque bâtiment devient un niveau,
    // les chantiers en cours sont remboursés.
    const branches = {};
    (p.company.buildings || []).forEach(x => {
      const id = LEGACY_BUILDING_BRANCH[x.id];
      if (id) branches[id] = Math.min(MAX_BRANCH_LEVEL, (branches[id] || 0) + 1);
    });
    (p.company.sites || []).forEach(s => {
      if (s.funded > 0) {
        p.points = (p.points || 0) + s.funded;
        logCompany(p, { type: 'site_abandon', amount: s.funded, detail: 'Chantier remboursé (nouvelle version)' });
      }
    });
    p.company.branches = branches;
    p.company.sites = [];
    delete p.company.buildings;
  }
}

function logCompany(p, entry) {
  p.investHistory.unshift({ date: new Date().toISOString(), ...entry });
  p.investHistory = p.investHistory.slice(0, MAX_INVEST_HISTORY);
}

function branchLevel(p, id) {
  return p.company.branches[id] || 0;
}

/** Effets cumulés d'une branche jusqu'à un niveau donné. */
function branchEffects(b, level) {
  const total = {};
  b.levels.slice(0, level).forEach(l => {
    Object.entries(l).forEach(([k, v]) => { total[k] = (total[k] || 0) + v; });
  });
  return total;
}

function sumEffect(p, key, filter = () => true) {
  return allBranches(p).filter(filter).reduce((s, b) => s + (branchEffects(b, branchLevel(p, b.id))[key] || 0), 0);
}

function companyRate(p) {
  return Math.min(MAX_YIELD_RATE, (p.company.legacyRate || 0) + sumEffect(p, 'rate'));
}

function companyRateSources(p) {
  const sources = BRANCHES
    .filter(b => branchEffects(b, branchLevel(p, b.id)).rate)
    .map(b => ({ label: `${b.emoji} ${b.name} niv. ${branchLevel(p, b.id)}`, rate: branchEffects(b, branchLevel(p, b.id)).rate }));
  if (p.company.legacyRate) sources.unshift({ label: '🏚️ Anciennes infras', rate: p.company.legacyRate });
  return sources;
}

function globalTaskBoost(p) {
  return Math.min(MAX_TASK_BOOST, sumEffect(p, 'boost'));
}

/**
 * Régularité sur les 14 derniers jours. Les bonus de l'entreprise sont multipliés
 * par cette efficacité : une tâche par semaine ne rapporte presque rien de plus.
 */
function efficiency(p, countToday = false) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (EFFICIENCY_WINDOW_DAYS - 1));
  const days = new Set(state.tasks
    .filter(t => t.assigneeId === p.id && t.done && t.completedAt && new Date(t.completedAt) >= start)
    .map(t => localDayKey(t.completedAt)));
  if (countToday) days.add(localDayKey(new Date()));
  return Math.min(1, days.size / EFFICIENCY_TARGET_DAYS);
}

function taskBoost(p, category, countToday = false) {
  const nominal = globalTaskBoost(p) + sumEffect(p, 'boostCat', b => b.cat === category);
  return Math.round(nominal * efficiency(p, countToday));
}

function treasuryCap(p) {
  return Math.max(BASE_TREASURY_CAP, p.company.legacyCap || 0) + sumEffect(p, 'cap');
}

function contractSlots(p) {
  return 1 + sumEffect(p, 'contracts');
}

function siteSlots(p) {
  return BASE_SITE_SLOTS + sumEffect(p, 'sites');
}

function speedBonus(p) {
  return Math.min(MAX_SPEED_BONUS, sumEffect(p, 'speed'));
}

/** Exigences du niveau `level` (1..5) d'une branche, réduction Recherche incluse. */
function levelRequirements(p, b, level) {
  const base = levelReqs(b)[level - 1];
  return {
    days: b.noSpeed ? base.days : Math.ceil(base.days * (1 - speedBonus(p) / 100)),
    tasks: base.tasks,
    catTasks: b.cat ? Math.ceil(base.tasks / 2) : 0,
    cost: base.cost,
  };
}

function companyValue(p) {
  const built = allBranches(p).reduce((s, b) =>
    s + levelReqs(b).slice(0, branchLevel(p, b.id)).reduce((x, l) => x + l.cost, 0), 0);
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

function taskPointsInMonth(p, month) {
  return state.tasks
    .filter(t => t.assigneeId === p.id && t.done && t.completedAt && monthKeyOf(t.completedAt) === month)
    .reduce((s, t) => s + (t.earnedPoints != null ? t.earnedPoints : t.points), 0);
}

/** Les intérêts dépendent de l'activité et ne dépassent jamais la moitié des points gagnés en travaillant. */
function monthlyInterest(p, month) {
  const base = Math.min(p.capitalSustain || 0, treasuryCap(p));
  const raw = Math.floor(base * companyRate(p) / 100 * activityFactor(workedDaysInMonth(p, month)));
  return Math.min(raw, Math.floor(taskPointsInMonth(p, month) * INTEREST_WORK_CAP));
}

function pendingRaise(p) {
  return (p.company.raiseRequests || []).find(r => r.status === 'pending');
}

function siteProgress(p, site) {
  const b = getBranch(site.branch, p);
  const req = levelRequirements(p, b, site.level);
  const done = completedTasksSince(p.id, site.startedAt);
  const days = new Set(done.map(t => localDayKey(t.completedAt))).size;
  const catTasks = b.cat ? done.filter(t => t.category === b.cat).length : 0;
  const lastWork = done.reduce((m, t) => Math.max(m, new Date(t.completedAt).getTime()), new Date(site.startedAt).getTime());
  const idleDays = Math.floor((Date.now() - lastWork) / 86400000);
  const complete = days >= req.days && done.length >= req.tasks
    && catTasks >= req.catTasks && (site.funded || 0) >= req.cost;
  return { req, days, tasks: done.length, catTasks, idleDays, complete };
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
  if (c.type === 'points') return done.reduce((s, t) => s + (t.earnedPoints != null ? t.earnedPoints : t.points), 0);
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

/** Tâches « au choix » validées aujourd'hui (les routines des parents ne comptent pas dans la limite). */
function tasksDoneToday(profileId) {
  const key = todayKey();
  return state.tasks.filter(t =>
    t.assigneeId === profileId && t.done && !t.routineId && t.completedAt && localDayKey(t.completedAt) === key
  ).length;
}

// ---------- ROUTINES & CALENDRIER ----------
// Une routine = une tâche planifiée par un parent certains jours de la semaine.
// Chaque jour, une tâche du jour est créée ; si elle n'est pas faite, elle est
// marquée « manquée » le lendemain et une nouvelle apparaît. Les jours utilisent
// Date#getDay() : 0 = dimanche … 6 = samedi.
const WEEKDAY_SHORT = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];
const RECURRENCE_PRESETS = {
  daily: [0, 1, 2, 3, 4, 5, 6],
  weekdays: [1, 2, 3, 4, 5],
  weekend: [0, 6],
};

let planningWeekOffset = 0;
let assignCustomDays = [];

function newId(prefix) {
  return prefix + Date.now() + Math.random().toString(36).slice(2, 6);
}

function routineDaysLabel(days) {
  const set = [...days].sort().join(',');
  if (set === RECURRENCE_PRESETS.daily.join(',')) return 'Tous les jours';
  if (set === RECURRENCE_PRESETS.weekdays.join(',')) return 'Lun–Ven';
  if (set === RECURRENCE_PRESETS.weekend.join(',')) return 'Week-end';
  return WEEK_ORDER.filter(d => days.includes(d)).map(d => WEEKDAY_SHORT[d]).join(' ');
}

function routineActiveOn(r, dateKey) {
  const dow = new Date(dateKey + 'T12:00:00').getDay();
  return r.days.includes(dow)
    && localDayKey(r.createdAt) <= dateKey
    && (!r.endedAt || localDayKey(r.endedAt) > dateKey);
}

/** Convertit les anciennes tâches « quotidien / hebdo » en routines. */
function migrateRecurring() {
  if (!state.routines) state.routines = [];
  const old = state.tasks.filter(t =>
    !t.routineId && !t.done && !t.archived && (t.recurrence === 'daily' || t.recurrence === 'weekly'));
  const today = localDayKey(new Date());
  old.forEach(t => {
    const r = {
      id: newId('rt_'), templateId: t.templateId, name: t.name, category: t.category,
      points: t.points, difficulty: t.difficulty, assigneeId: t.assigneeId,
      days: t.recurrence === 'daily' ? RECURRENCE_PRESETS.daily.slice() : [new Date(t.createdAt || Date.now()).getDay()],
      createdAt: new Date().toISOString(),
    };
    state.routines.push(r);
    // Déjà faite aujourd'hui avec l'ancienne version : on la rattache à la routine
    // pour qu'elle ne réapparaisse pas (pas de points en double).
    const doneToday = state.tasks.filter(x =>
      x.done && !x.routineId && x.assigneeId === t.assigneeId && x.completedAt
      && localDayKey(x.completedAt) === today && (x.templateId ? x.templateId === t.templateId : x.name === t.name));
    if (doneToday.length && r.days.includes(new Date().getDay())) {
      const last = doneToday[doneToday.length - 1];
      last.routineId = r.id;
      last.dueDate = today;
    }
  });
  if (old.length) state.tasks = state.tasks.filter(t => old.indexOf(t) === -1);
}

/** Crée les tâches du jour et clôture celles des jours passés. */
function materializeRoutines() {
  if (!state.routines) state.routines = [];
  const today = localDayKey(new Date());
  state.tasks.forEach(t => {
    if (t.routineId && !t.done && !t.archived && t.dueDate < today) {
      t.archived = true;
      t.missed = true;
    }
  });
  state.routines.forEach(r => {
    if (!routineActiveOn(r, today)) return;
    if (!state.profiles.some(p => p.id === r.assigneeId)) return;
    if (state.tasks.some(t => t.routineId === r.id && t.dueDate === today)) return;
    state.tasks.push({
      id: newId('t_'), templateId: r.templateId, routineId: r.id, dueDate: today,
      name: r.name, category: r.category, points: r.points, difficulty: r.difficulty,
      assigneeId: r.assigneeId, recurrence: 'routine', done: false, archived: false,
      feltDifficulty: null, createdAt: new Date().toISOString(), completedAt: null,
    });
  });
  state.lastRoutineDay = today;
}

/** Lundi → dimanche de la semaine courante (+ décalage en semaines). */
function weekDateKeys(offset = 0) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    return localDayKey(x);
  });
}

/** Bilan d'une journée pour un enfant : routines prévues / faites, tâches au choix. */
function dayReport(profileId, dateKey) {
  const today = localDayKey(new Date());
  const doneThatDay = state.tasks.filter(t =>
    t.assigneeId === profileId && t.done && t.completedAt && localDayKey(t.completedAt) === dateKey);
  const routines = (state.routines || [])
    .filter(r => r.assigneeId === profileId && routineActiveOn(r, dateKey))
    .map(r => {
      const done = doneThatDay.some(t => t.routineId === r.id);
      const status = done ? 'done' : dateKey < today ? 'missed' : dateKey === today ? 'todo' : 'future';
      return { routine: r, status };
    });
  const extras = doneThatDay.filter(t => !t.routineId).length;
  return { routines, extras, isToday: dateKey === today, isPast: dateKey < today };
}

function dayClass(rep) {
  if (!rep.routines.length) return rep.extras ? 'full' : rep.isPast ? 'empty' : '';
  const done = rep.routines.filter(x => x.status === 'done').length;
  if (done === rep.routines.length) return 'full';
  if (!rep.isPast && !rep.isToday) return '';
  if (rep.isToday) return done ? 'partial' : '';
  return done ? 'partial' : 'missed';
}

function dayHeader(dateKey) {
  const d = new Date(dateKey + 'T12:00:00');
  return `${WEEKDAY_SHORT[d.getDay()]} ${d.getDate()}`;
}

function renderChildWeek(p) {
  const el = document.getElementById('child-week');
  if (!el) return;
  el.innerHTML = weekDateKeys().map(k => {
    const rep = dayReport(p.id, k);
    const done = rep.routines.filter(x => x.status === 'done').length;
    return `
      <div class="week-day ${dayClass(rep)} ${rep.isToday ? 'today' : ''}">
        <span class="wd-name">${dayHeader(k)}</span>
        <span class="wd-count">${rep.routines.length ? `${done}/${rep.routines.length}` : '–'}</span>
        <span class="wd-extra">${rep.extras ? `+${rep.extras} au choix` : '&nbsp;'}</span>
      </div>`;
  }).join('');
}

function renderAdminPlanning() {
  const el = document.getElementById('admin-planning');
  if (!el) return;
  const keys = weekDateKeys(planningWeekOffset);
  const children = state.profiles.filter(p => p.type === 'child');
  const first = new Date(keys[0] + 'T12:00:00');
  const last = new Date(keys[6] + 'T12:00:00');
  const fmtD = d => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

  if (!children.length) {
    el.innerHTML = '<div class="empty-state"><p>Aucun enfant.</p></div>';
    return;
  }

  const grid = `
    <div class="planning-grid" style="grid-template-columns: 110px repeat(7, minmax(0, 1fr))">
      <div class="pg-head"></div>
      ${keys.map(k => `<div class="pg-head ${k === localDayKey(new Date()) ? 'today' : ''}">${dayHeader(k)}</div>`).join('')}
      ${children.map(c => `
        <div class="pg-child"><img src="${avatarSVG(c.avatar, 28)}" alt=""> ${escapeHtml(c.name)}</div>
        ${keys.map(k => {
          const rep = dayReport(c.id, k);
          return `<div class="pg-cell ${dayClass(rep)} ${rep.isToday ? 'today' : ''}">
            ${rep.routines.map(x => `<div class="pg-item ${x.status}">${{ done: '✔', missed: '✖', todo: '•', future: '·' }[x.status]} ${escapeHtml(x.routine.name)}</div>`).join('')}
            ${rep.extras ? `<div class="pg-extra">+${rep.extras} au choix</div>` : ''}
          </div>`;
        }).join('')}
      `).join('')}
    </div>`;

  const routines = (state.routines || []).filter(r => !r.endedAt);
  const list = routines.length
    ? routines.map(r => {
      const child = state.profiles.find(p => p.id === r.assigneeId);
      return `
        <div class="task-card">
          <div class="task-info">
            <div class="task-name">${escapeHtml(r.name)}</div>
            <div class="task-meta">
              <span class="task-points">${r.points} pts</span>
              <span>👤 ${child ? escapeHtml(child.name) : '?'}</span>
              <span>🔁 ${routineDaysLabel(r.days)}</span>
            </div>
          </div>
          <div class="task-actions"><button class="routine-delete" data-id="${r.id}" title="Arrêter la routine">🗑️</button></div>
        </div>`;
    }).join('')
    : '<p class="hint">Aucune routine. Crée-en depuis l’onglet Attribuer (récurrence).</p>';

  el.innerHTML = `
    <div class="section-header">
      <h2>📅 Semaine du ${fmtD(first)} au ${fmtD(last)}</h2>
      <div class="chips">
        <button class="chip" data-week="-1">◀</button>
        <button class="chip ${planningWeekOffset === 0 ? 'strong' : ''}" data-week="0">Cette semaine</button>
        <button class="chip" data-week="1">▶</button>
      </div>
    </div>
    <div class="planning-scroll">${grid}</div>
    <p class="hint">✔ faite · ✖ manquée · • à faire aujourd’hui · « au choix » = tâches prises dans le catalogue</p>
    <div class="section-header" style="margin-top:1rem"><h2>🔁 Routines</h2></div>
    <div class="tasks-list">${list}</div>`;
}

function stopRoutine(id) {
  const r = (state.routines || []).find(x => x.id === id);
  if (!r || !confirm(`Arrêter la routine « ${r.name} » ?\nL’historique est conservé.`)) return;
  r.endedAt = new Date().toISOString();
  const today = localDayKey(new Date());
  state.tasks = state.tasks.filter(t => !(t.routineId === id && t.dueDate === today && !t.done));
  saveState();
  renderAdminPlanning();
  renderAdminTasks();
  showToast('Routine arrêtée');
}

function selectedAssignDays() {
  const v = document.getElementById('assign-recurrence').value;
  if (v === 'custom') return assignCustomDays.slice();
  return RECURRENCE_PRESETS[v] ? RECURRENCE_PRESETS[v].slice() : null;
}

function renderAssignDays() {
  const wrap = document.getElementById('assign-days');
  if (!wrap) return;
  const custom = document.getElementById('assign-recurrence').value === 'custom';
  wrap.style.display = custom ? 'flex' : 'none';
  wrap.innerHTML = WEEK_ORDER.map(d =>
    `<button type="button" class="chip ${assignCustomDays.includes(d) ? 'strong' : ''}" data-day="${d}">${WEEKDAY_SHORT[d]}</button>`).join('');
}

/** Si l'app reste ouverte (iPad en cuisine), on bascule au jour suivant automatiquement. */
function checkDayChange() {
  if (localDayKey(new Date()) === state.lastRoutineDay) return;
  checkMonthlyReset();
  materializeRoutines();
  saveState();
  if (document.getElementById('main').classList.contains('active')) showMainChild();
  if (document.getElementById('main-admin').classList.contains('active')) {
    renderAdminTasks();
    renderAdminPlanning();
  }
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
  renderAdminPlanning();

  const pending = state.profiles.filter(c => c.type === 'child' && c.company && pendingRaise(c));
  if (pending.length) {
    setTimeout(() => showToast(`🤝 ${pending.map(c => c.name).join(', ')} : demande d’augmentation (onglet Famille)`, 4000), 500);
  }
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
    limitLabel.textContent = `Au choix : ${doneToday} / ${limit} aujourd'hui`;
    limitLabel.style.color = doneToday >= limit ? 'var(--danger)' : 'var(--text-muted)';
  }

  renderChildWeek(p);
  const today = localDayKey(new Date());
  const myTasks = state.tasks.filter(t => t.assigneeId === p.id && !t.archived && !t.done)
    .sort((a, b) => (b.routineId ? 1 : 0) - (a.routineId ? 1 : 0));
  const doneRoutines = state.tasks.filter(t => t.assigneeId === p.id && t.routineId && t.done && t.dueDate === today);
  const list = document.getElementById('tasks-list');
  const routineLabel = t => {
    const r = (state.routines || []).find(x => x.id === t.routineId);
    return r ? `<span>🔁 ${routineDaysLabel(r.days)}</span>` : '';
  };

  if (myTasks.length === 0 && doneRoutines.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="emoji">📋</div><p>Aucune tâche en cours.<br>Choisis-en une dans le catalogue !</p></div>`;
  } else {
    list.innerHTML = myTasks.map(t => `
      <div class="task-card ${t.routineId ? 'routine' : ''}">
        <button class="task-check" data-id="${t.id}" title="Marquer comme faite"></button>
        <div class="task-info">
          <div class="task-name">${t.name}</div>
          <div class="task-meta">
            <span class="task-points">${t.points} pts</span>
            <span class="task-cat">${CATEGORY_LABELS[t.category] || ''}</span>
            ${t.routineId ? routineLabel(t) + '<span>📅 aujourd’hui</span>' : ''}
          </div>
        </div>
        ${t.routineId ? '' : `<div class="task-actions">
          <button class="task-cancel" data-id="${t.id}" title="Annuler">✖️</button>
        </div>`}
      </div>
    `).join('') + doneRoutines.map(t => `
      <div class="task-card done routine">
        <div class="task-check">✔</div>
        <div class="task-info">
          <div class="task-name">${t.name}</div>
          <div class="task-meta"><span class="task-points">+${t.earnedPoints != null ? t.earnedPoints : t.points} pts</span>${routineLabel(t)}<span>✔ Faite aujourd’hui</span></div>
        </div>
      </div>`).join('');
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
    state.tasks.filter(t => t.assigneeId === (p && p.id) && !t.done && !t.archived).map(t => t.templateId)
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
  if (p && !task.routineId && tasksDoneToday(p.id) >= limit) {
    showToast(`Limite de ${limit} tâches au choix / jour atteinte`);
    return;
  }
  pendingCompleteTaskId = taskId;
  selectedFelt = 2;
  document.getElementById('diff-task-name').textContent = task.name;
  let bonus = 0;
  if (p) {
    ensureInvestFields(p);
    bonus = Math.round(task.points * taskBoost(p, task.category, true) / 100);
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
  if (!task.routineId && tasksDoneToday(profile.id) >= limit) {
    showToast(`Limite de ${limit} tâches au choix / jour atteinte`);
    closeModal('modal-difficulty');
    return;
  }

  ensureInvestFields(profile);
  const bonus = Math.round(task.points * taskBoost(profile, task.category, true) / 100);
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
function effectsText(e, b) {
  const parts = [];
  if (e.rate) parts.push(`+${fmtRate(e.rate)} % rendement`);
  if (e.boost) parts.push(`+${e.boost} % toutes tâches`);
  if (e.boostCat) parts.push(`+${e.boostCat} % ${CATEGORY_LABELS[b.cat] || ''}`);
  if (e.cap) parts.push(`+${fmt(e.cap)} trésorerie`);
  if (e.contracts) parts.push(`+${e.contracts} contrat/mois`);
  if (e.sites) parts.push(`+${e.sites} chantier`);
  if (e.speed) parts.push(`−${e.speed} % durée chantiers`);
  if (e.raise) parts.push(`+${e.raise} € d’argent de poche / mois`);
  return parts.join(' · ');
}

function miniBar(icon, value, goal, unit = '') {
  const pct = Math.min(100, goal ? (value / goal) * 100 : 100);
  const ok = value >= goal;
  return `
    <div class="mini-bar ${ok ? 'ok' : ''}">
      <span class="mb-icon">${icon}</span>
      <div class="mb-track"><div class="mb-fill" style="width:${pct}%"></div></div>
      <span class="mb-val">${fmt(Math.min(value, goal))}/${fmt(goal)}${unit}</span>
    </div>`;
}

/** Boutons de montant rapides (pas de clavier sur iPad). */
function amountChips(action, id, room, points, values = [50, 200]) {
  const max = Math.min(room, points || 0);
  return `<div class="chips">
    ${values.filter(v => v < room).map(v =>
      `<button class="chip" data-action="${action}" data-id="${id}" data-amount="${v}" ${(points || 0) < v ? 'disabled' : ''}>+${v}</button>`).join('')}
    <button class="chip strong" data-action="${action}" data-id="${id}" data-amount="${max}" ${max <= 0 ? 'disabled' : ''}>Max${max > 0 ? ' ' + fmt(max) : ''}</button>
  </div>`;
}

function investedTotal(p) {
  return (p.capitalSustain || 0) + p.company.sites.reduce((s, x) => s + (x.funded || 0), 0);
}

function renderCompany() {
  const p = getCurrentProfile();
  if (!p || p.type !== 'child') return;
  ensureInvestFields(p);
  document.getElementById('company-bar').innerHTML = companyBarHtml(p);
  document.getElementById('company-branches').innerHTML = companyBranchesHtml(p);
  document.getElementById('company-side').innerHTML =
    companyContractsHtml(p) + companyTreasuryHtml(p) + companyJournalHtml(p);
  const invEl = document.getElementById('stat-invest');
  if (invEl) invEl.textContent = fmt(investedTotal(p));
}

function companyBarHtml(p) {
  const value = companyValue(p);
  const lvl = companyLevel(p);
  const next = COMPANY_LEVELS.find(l => l.value > value);
  const pct = next ? ((value - lvl.value) / (next.value - lvl.value)) * 100 : 100;
  const month = monthKeyOf(new Date());
  const eff = Math.round(efficiency(p) * 100);
  return `
    <img class="bar-thumb" src="assets/img/enterprise.svg" alt="">
    <div class="bar-id">
      <div class="bar-name">${lvl.emoji} ${escapeHtml(p.company.name)}
        <button class="link-btn" data-action="rename" title="Renommer">✏️</button></div>
      <div class="bar-level">${lvl.name} · <strong>${fmt(value)} pts</strong>${next ? ` → ${next.emoji} ${fmt(next.value)}` : ' · max'}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
    </div>
    <div class="bar-kpis">
      <div class="kpi"><strong>${fmtRate(companyRate(p))} %</strong><span>Rendement</span></div>
      <div class="kpi"><strong>+${Math.round(globalTaskBoost(p) * efficiency(p))} %</strong><span>Bonus tâches</span></div>
      <div class="kpi"><strong>${fmt(monthlyInterest(p, month))}</strong><span>Intérêts prévus</span></div>
      <div class="kpi ${eff >= 100 ? 'good' : eff < 50 ? 'bad' : ''}"><strong>${eff} %</strong><span>Efficacité</span></div>
    </div>`;
}

function companyBranchesHtml(p) {
  const slots = siteSlots(p);
  const slotsFull = p.company.sites.length >= slots;
  const speed = speedBonus(p);
  return `
    <div class="section-mini">
      <span>🏗️ Branches</span>
      <span class="hint">Chantiers ${p.company.sites.length}/${slots}${speed ? ` · −${speed} % durée` : ''} · n’avancent que les jours où tu travailles</span>
    </div>
    ${efficiencyHtml(p)}
    <div class="branches-grid">${allBranches(p).map(b => branchCardHtml(p, b, slotsFull)).join('')}</div>`;
}

function efficiencyHtml(p) {
  const eff = efficiency(p);
  const days = Math.round(eff * EFFICIENCY_TARGET_DAYS);
  const msg = eff >= 1
    ? '🔥 Régularité parfaite : tous tes bonus s’appliquent à 100 % !'
    : `Fais au moins une tâche par jour : ${days}/${EFFICIENCY_TARGET_DAYS} jours actifs sur les ${EFFICIENCY_WINDOW_DAYS} derniers. Tes bonus ne s’appliquent qu’à ${Math.round(eff * 100)} %.`;
  return `
    <div class="efficiency ${eff >= 1 ? 'full' : eff < 0.5 ? 'low' : ''}">
      <strong>⚙️ Efficacité ${Math.round(eff * 100)} %</strong>
      <div class="mb-track"><div class="mb-fill" style="width:${eff * 100}%"></div></div>
      <span>${msg}</span>
    </div>`;
}

function branchCardHtml(p, b, slotsFull) {
  const lvl = branchLevel(p, b.id);
  const site = p.company.sites.find(s => s.branch === b.id);
  const pr = site ? siteProgress(p, site) : null;
  const max = maxLevel(b);
  const pending = b.special && pendingRaise(p);
  const pips = levelReqs(b).map((_, i) =>
    `<i class="${i < lvl ? 'on' : site && i === lvl ? 'wip' : ''}"></i>`).join('');

  let body;
  if (site) {
    const missing = pr.req.cost - (site.funded || 0);
    body = `
      <div class="mini-bars">
        ${miniBar('📅', pr.days, pr.req.days, ' j')}
        ${miniBar('✅', pr.tasks, pr.req.tasks)}
        ${b.cat ? miniBar('🎯', pr.catTasks, pr.req.catTasks) : ''}
        ${miniBar('💰', site.funded || 0, pr.req.cost)}
      </div>
      ${pr.complete
        ? `<button class="btn-primary btn-block btn-compact" data-action="inaugurate" data-id="${b.id}">🎉 Inaugurer le niv. ${site.level}</button>`
        : `${pr.idleDays >= SITE_STALL_DAYS ? `<div class="mini-note warn">⚠️ À l’arrêt depuis ${pr.idleDays} j</div>` : ''}
           ${missing > 0 ? amountChips('fund', b.id, missing, p.points) : '<div class="mini-note ok">💰 Financé · continue tes tâches !</div>'}`}`;
  } else if (pending) {
    body = `<div class="mini-note warn">⏳ Demande de +${pending.amount} € envoyée : en attente de l’accord d’un parent</div>`;
  } else if (lvl < max) {
    const req = levelRequirements(p, b, lvl + 1);
    body = `
      <div class="next-line">Niv. ${lvl + 1} : <strong>${effectsText(b.levels[lvl], b)}</strong></div>
      <div class="req-line">📅 ${req.days} j · ✅ ${req.tasks}${b.cat ? ` (🎯 ${req.catTasks})` : ''} · 💰 ${fmt(req.cost)}</div>
      <button class="btn-secondary btn-block btn-compact" data-action="start-site" data-id="${b.id}" ${slotsFull ? 'disabled' : ''}>
        ${slotsFull ? 'Chantiers complets' : `🏗️ Lancer le niv. ${lvl + 1}`}</button>`;
  } else {
    body = '<div class="mini-note ok">👑 Branche au maximum</div>';
  }

  return `
    <div class="branch-card ${site ? 'building' : ''} ${lvl === max ? 'maxed' : ''} ${b.special ? 'special' : ''}">
      <div class="branch-head">
        <span class="branch-emoji">${b.emoji}</span>
        <div class="branch-title"><strong>${b.name}</strong><small>${b.spec}</small></div>
        ${site && !pr.complete ? `<button class="icon-x" data-action="abandon" data-id="${b.id}" title="Abandonner le chantier">✕</button>` : ''}
      </div>
      <div class="pips">${pips}<span>${lvl}/${max}</span></div>
      <div class="branch-current">${lvl ? effectsText(branchEffects(b, lvl), b) : 'Pas encore développée'}</div>
      ${body}
    </div>`;
}

function companyContractsHtml(p) {
  const month = monthKeyOf(new Date());
  const mine = contractsThisMonth(p);
  const slots = contractSlots(p);
  const signedIds = new Set(mine.map(c => c.offerId));
  const maxStake = companyLevel(p).maxStake;
  const slotsFull = mine.length >= slots;
  const stakes = [...new Set([Math.round(maxStake / 4), Math.round(maxStake / 2), maxStake])]
    .filter(s => s >= CONTRACT_MIN_STAKE);

  const signed = mine.map(c => {
    const tier = CONTRACT_TIERS[c.tier];
    const prog = contractProgress(p, c);
    const total = c.stake + contractReward(c);
    return `
      <div class="contract-row ${c.status}">
        <div class="cr-label">${tier.emoji} ${contractLabel(c)}</div>
        ${miniBar('📊', prog, c.goal)}
        <div class="cr-deal">Mise ${fmt(c.stake)} → <strong>${fmt(total)} pts</strong>
          ${c.status === 'won' ? ' · 🏆 encaissé'
            : prog >= c.goal ? `<button class="chip strong" data-action="claim-contract" data-id="${c.offerId}">💰 Encaisser</button>` : ''}</div>
      </div>`;
  }).join('');

  const offers = monthlyOffers(p, month).filter(o => !signedIds.has(o.offerId)).map(o => {
    const tier = CONTRACT_TIERS[o.tier];
    return `
      <div class="contract-row offer">
        <div class="cr-label">${tier.emoji} ${contractLabel(o)} <span class="cr-pct">+${o.pct} %</span></div>
        <div class="chips">
          <span class="hint">Miser</span>
          ${stakes.map(s => `<button class="chip" data-action="sign-contract" data-id="${o.offerId}" data-amount="${s}"
            ${slotsFull || (p.points || 0) < s ? 'disabled' : ''}>${s}</button>`).join('')}
        </div>
      </div>`;
  }).join('');

  return `
    <div class="side-card">
      <div class="side-title"><span>📜 Contrats du mois</span><span class="hint">${mine.length}/${slots} · fin dans ${daysLeftInMonth()} j</span></div>
      ${signed}${offers}
      <div class="hint">Réussi : mise + prime. Échec : ${Math.round(CONTRACT_FAIL_REFUND * 100)} % rendus. Seules les tâches après signature comptent.</div>
    </div>`;
}

function companyTreasuryHtml(p) {
  const month = monthKeyOf(new Date());
  const cap = treasuryCap(p);
  const capital = p.capitalSustain || 0;
  const worked = workedDaysInMonth(p, month);
  const sources = companyRateSources(p);
  return `
    <div class="side-card">
      <div class="side-title"><span>🏦 Trésorerie</span><span class="hint">${fmtRate(companyRate(p))} % / mois · max ${MAX_YIELD_RATE} %</span></div>
      ${miniBar('💼', capital, cap)}
      ${miniBar('📅', worked, ACTIVITY_TARGET_DAYS, ' j')}
      <div class="cr-deal">Intérêts le 1er du mois : <strong>${fmt(monthlyInterest(p, month))} pts</strong>
        (activité ${Math.round(activityFactor(worked) * 100)} %)</div>
      <div class="hint">Les intérêts ne dépassent jamais ${Math.round(INTEREST_WORK_CAP * 100)} % des points gagnés en tâches ce mois-ci
        (${fmt(taskPointsInMonth(p, month))} pts → max ${fmt(taskPointsInMonth(p, month) * INTEREST_WORK_CAP)}).</div>
      ${capital < cap ? amountChips('deposit', '', cap - capital, p.points) : '<div class="mini-note">Trésorerie pleine : développe la 🏦 Finance.</div>'}
      <div class="hint">${sources.length ? sources.map(s => `${s.label} +${fmtRate(s.rate)} %`).join(' · ') : 'Développe l’🏭 Industrie pour gagner du rendement.'}</div>
    </div>`;
}

function companyJournalHtml(p) {
  const history = (p.investHistory || []).slice(0, 8);
  return `
    <div class="side-card">
      <div class="side-title"><span>📊 Journal</span></div>
      ${history.length === 0
        ? '<div class="hint">Aucun mouvement pour le moment.</div>'
        : history.map(h => {
          const t = JOURNAL_TYPES[h.type] || { label: '💼 Mouvement', sign: '' };
          return `
            <div class="journal-row">
              <span class="date">${formatDate(h.date)}</span>
              <span class="jr-label">${t.label}${h.detail ? ' · ' + escapeHtml(h.detail) : ''}</span>
              ${t.sign && h.amount ? `<span class="amount ${t.sign === '-' ? 'neg' : ''}">${t.sign}${fmt(h.amount)}</span>` : ''}
            </div>`;
        }).join('')}
    </div>`;
}

// ---------- ENTREPRISE : ACTIONS ----------
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
  const amount = parseInt(el.dataset.amount) || 0;

  switch (el.dataset.action) {
    case 'rename': renameCompany(p); break;
    case 'start-site': startSite(p, id); break;
    case 'fund': fundSite(p, id, amount); break;
    case 'inaugurate': inaugurate(p, id); break;
    case 'abandon': abandonSite(p, id); break;
    case 'sign-contract': signContract(p, id, amount); break;
    case 'claim-contract': claimContract(p, id); break;
    case 'deposit': deposit(p, amount); break;
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
  const b = getBranch(id, p);
  if (!b) return;
  const level = branchLevel(p, id) + 1;
  if (level > maxLevel(b) || p.company.sites.some(s => s.branch === id)) return;
  if (b.special && pendingRaise(p)) { showToast('Attends la réponse des parents'); return; }
  if (b.special && !p.company.raiseMode) p.company.raiseMode = state.settings.raiseMode || 'progressive';
  if (p.company.sites.length >= siteSlots(p)) { showToast('Plus d’emplacement de chantier libre'); return; }
  p.company.sites.push({ branch: id, level, startedAt: new Date().toISOString(), funded: 0 });
  logCompany(p, { type: 'site_start', amount: 0, detail: `${b.emoji} ${b.name} niv. ${level}` });
  commitCompany(`Chantier ${b.name} niv. ${level} lancé ! 🏗️`);
}

function fundSite(p, id, pts) {
  const site = p.company.sites.find(s => s.branch === id);
  const b = getBranch(id, p);
  if (!site || !b) return;
  const amount = Math.min(pts, levelRequirements(p, b, site.level).cost - (site.funded || 0), p.points || 0);
  if (amount <= 0) { showToast('Pas assez de points !'); return; }
  p.points -= amount;
  site.funded = (site.funded || 0) + amount;
  logCompany(p, { type: 'site_fund', amount, detail: `${b.emoji} ${b.name} niv. ${site.level}` });
  commitCompany(`${amount} pts investis dans ${b.name} 💰`);
}

function inaugurate(p, id) {
  const site = p.company.sites.find(s => s.branch === id);
  const b = getBranch(id, p);
  if (!site || !b || !siteProgress(p, site).complete) return;
  const before = companyLevel(p);
  p.company.sites = p.company.sites.filter(s => s !== site);
  p.company.branches[id] = site.level;
  logCompany(p, { type: 'inaugurate', amount: 0, detail: `${b.emoji} ${b.name} niv. ${site.level}` });
  if (b.special) {
    const amount = b.levels[site.level - 1].raise;
    p.company.raiseRequests = p.company.raiseRequests || [];
    p.company.raiseRequests.push({ id: 'r_' + Date.now(), level: site.level, amount, cost: site.funded || 0, date: new Date().toISOString(), status: 'pending' });
    logCompany(p, { type: 'raise_request', amount: 0, detail: `+${amount} € / mois` });
  }
  commitCompany();
  showToast(b.special ? `🤝 Demande d’augmentation envoyée aux parents !` : `🎉 ${b.name} passe au niveau ${site.level} !`, 3500);
  const after = companyLevel(p);
  if (after.level > before.level) {
    setTimeout(() => showToast(`${after.emoji} Ton entreprise devient : ${after.name} !`, 3500), 3000);
  }
}

function abandonSite(p, id) {
  const site = p.company.sites.find(s => s.branch === id);
  const b = getBranch(id, p);
  if (!site || !b) return;
  const refund = Math.floor((site.funded || 0) * SITE_ABANDON_REFUND);
  if (!confirm(`Abandonner le chantier ${b.name} niv. ${site.level} ?\n\nToute la progression sera perdue et tu ne récupères que ${refund} pts (${Math.round(SITE_ABANDON_REFUND * 100)} % du financement).`)) return;
  p.company.sites = p.company.sites.filter(s => s !== site);
  p.points = (p.points || 0) + refund;
  logCompany(p, { type: 'site_abandon', amount: refund, detail: `${b.emoji} ${b.name} niv. ${site.level}` });
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
  const amount = Math.min(pts, treasuryCap(p) - (p.capitalSustain || 0), p.points || 0);
  if (amount <= 0) { showToast('Pas assez de points !'); return; }
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
  const done = state.tasks.filter(t => t.done && !t.archived)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)).slice(0, 20);

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
              ${t.routineId ? `<span>🔁 routine du jour</span>` : ''}
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
  const days = selectedAssignDays();
  const tpl = state.templates.find(t => t.id === tplId);
  const child = state.profiles.find(p => p.id === childId);

  if (!tpl || !child) {
    showToast('Choisis une tâche et un enfant');
    return;
  }

  if (days) {
    if (!days.length) { showToast('Choisis au moins un jour'); return; }
    state.routines.push({
      id: newId('rt_'), templateId: tpl.id, name: tpl.name, category: tpl.category,
      points: tpl.points, difficulty: tpl.difficulty, assigneeId: child.id, days,
      createdAt: new Date().toISOString(),
    });
    materializeRoutines();
    saveState();
    renderAdminTasks();
    showToast(`Routine « ${tpl.name} » (${routineDaysLabel(days)}) pour ${child.name} ✔`);
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
    recurrence: 'once',
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
    const req = !isParent && pendingRaise(p);
    const raiseHtml = req ? `
      <div class="raise-request">
        <span>🤝 <strong>${p.name}</strong> demande <strong>+${req.amount} €</strong> d’argent de poche / mois
          (plafond ${p.ceiling || 20} € → ${(p.ceiling || 20) + req.amount} €)</span>
        <div class="chips">
          <button class="chip strong" data-raise="accept" data-child="${p.id}">Accepter</button>
          <button class="chip" data-raise="refuse" data-child="${p.id}">Refuser (points rendus)</button>
        </div>
      </div>` : '';
    return `${raiseHtml}
      <div class="family-card">
        <img src="${avatarSVG(p.avatar, 48)}" alt="">
        <div class="info">
          <div class="fname">${p.name} ${isParent ? '🔑' : ''}</div>
          <div class="fmeta">
            ${isParent
              ? 'Parent · Admin'
              : `Niv. ${p.level || 1} · ${p.points || 0} pts · ${formatMoney(p.wallet || 0)} (plafond ${p.ceiling || 20} €) · ${p.tasksDone || 0} tâches · ${companyLevel(p).emoji} ${companyLevel(p).name} · ⚙️ ${Math.round(efficiency(p) * 100)} %`}
          </div>
        </div>
      </div>`;
  }).join('');
}

function answerRaise(childId, accept) {
  const p = state.profiles.find(x => x.id === childId);
  if (!p) return;
  ensureInvestFields(p);
  const req = pendingRaise(p);
  if (!req) return;
  if (accept) {
    req.status = 'accepted';
    p.ceiling = (p.ceiling || 20) + req.amount;
    logCompany(p, { type: 'raise_accepted', amount: 0, detail: `Plafond ${p.ceiling} € / mois` });
    showToast(`Augmentation accordée à ${p.name} 🎉`);
  } else {
    req.status = 'refused';
    p.company.branches.salaire = Math.max(0, branchLevel(p, 'salaire') - 1);
    p.points = (p.points || 0) + (req.cost || 0);
    logCompany(p, { type: 'raise_refused', amount: req.cost || 0, detail: 'Points rendus' });
    showToast(`Demande de ${p.name} refusée, points rendus`);
  }
  saveState();
  renderAdminFamily();
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
  document.getElementById('raise-mode-input').value = state.settings.raiseMode || 'progressive';
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
      } catch (e) {
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
  if (tabId === 'admin-planning') renderAdminPlanning();
}

// ---------- INIT ----------
/** Affiche une erreur sur l'écran de démarrage au lieu de rester bloqué sur le chargement. */
function showStartupError(err) {
  const splash = document.querySelector('#splash .splash-content');
  if (!splash || document.getElementById('startup-error')) return;
  const box = document.createElement('div');
  box.id = 'startup-error';
  box.className = 'startup-error';
  box.innerHTML = `<p>⚠️ Un problème est survenu au démarrage.</p>
    <code>${escapeHtml((err && (err.message || err)) || 'Erreur inconnue')}</code>
    <button class="btn-secondary" onclick="location.reload()">Réessayer</button>`;
  splash.appendChild(box);
  const loader = splash.querySelector('.loader');
  if (loader) loader.style.display = 'none';
}

function startupStep(fn) {
  try { fn(); } catch (e) { console.error(e); showStartupError(e); }
}

/** Safari < 14.5 ignore « gap » en flexbox : on le détecte pour activer des marges de repli. */
function detectFlexGap() {
  const el = document.createElement('div');
  el.style.cssText = 'display:flex;flex-direction:column;row-gap:1px;position:absolute';
  el.appendChild(document.createElement('div'));
  el.appendChild(document.createElement('div'));
  document.body.appendChild(el);
  const ok = el.scrollHeight === 1;
  el.remove();
  if (!ok) document.documentElement.classList.add('no-flex-gap');
}

function init() {
  startupStep(detectFlexGap);
  startupStep(loadState);
  startupStep(migrateProfiles);
  startupStep(checkMonthlyReset);
  startupStep(() => { migrateRecurring(); materializeRoutines(); saveState(); });
  startupStep(() => applyTheme(state.settings.theme || 'default'));

  setTimeout(() => {
    if (document.getElementById('startup-error')) return;
    document.getElementById('splash').classList.remove('active');
    document.getElementById('profile-select').classList.add('active');
    startupStep(renderProfiles);
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

  document.getElementById('raise-mode-input').addEventListener('change', e => {
    state.settings.raiseMode = e.target.value;
    saveState();
    showToast('Mode d’augmentation mis à jour');
  });
  document.getElementById('admin-family-list').addEventListener('click', e => {
    const btn = e.target.closest('[data-raise]');
    if (btn) answerRaise(btn.dataset.child, btn.dataset.raise === 'accept');
  });

  document.getElementById('btn-add-template').addEventListener('click', () => openTemplateModal());
  document.getElementById('btn-save-template').addEventListener('click', saveTemplate);
  document.getElementById('btn-do-assign').addEventListener('click', doAssign);
  document.getElementById('assign-recurrence').addEventListener('change', renderAssignDays);
  document.getElementById('assign-days').addEventListener('click', e => {
    const btn = e.target.closest('[data-day]');
    if (!btn) return;
    const d = parseInt(btn.dataset.day);
    assignCustomDays = assignCustomDays.includes(d) ? assignCustomDays.filter(x => x !== d) : assignCustomDays.concat(d);
    renderAssignDays();
  });
  document.getElementById('admin-planning').addEventListener('click', e => {
    const week = e.target.closest('[data-week]');
    if (week) {
      const v = parseInt(week.dataset.week);
      planningWeekOffset = v === 0 ? 0 : planningWeekOffset + v;
      renderAdminPlanning();
    }
    const del = e.target.closest('.routine-delete');
    if (del) stopRoutine(del.dataset.id);
  });
  setInterval(() => startupStep(checkDayChange), 60000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) startupStep(checkDayChange);
  });

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
