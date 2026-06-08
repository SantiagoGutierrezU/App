const Storage = {
  KEYS: {
    PROFILE: 'mathapp_profile',
    PROGRESS: 'mathapp_progress',
    STREAK: 'mathapp_streak',
    BADGES: 'mathapp_badges',
  },

  getProfile() {
    try { return JSON.parse(localStorage.getItem(this.KEYS.PROFILE)); }
    catch { return null; }
  },

  saveProfile(profile) {
    localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(profile));
  },

  getProgress() {
    try { return JSON.parse(localStorage.getItem(this.KEYS.PROGRESS)) || {}; }
    catch { return {}; }
  },

  getLevelProgress(worldId, levelId) {
    const p = this.getProgress();
    return p[`w${worldId}l${levelId}`] || { stars: 0, completed: false };
  },

  saveLevelProgress(worldId, levelId, stars) {
    const p = this.getProgress();
    const key = `w${worldId}l${levelId}`;
    const existing = p[key] || { stars: 0, completed: false };
    p[key] = { stars: Math.max(existing.stars, stars), completed: true };
    localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(p));
  },

  getStreak() {
    try { return JSON.parse(localStorage.getItem(this.KEYS.STREAK)) || { count: 0, lastDate: null }; }
    catch { return { count: 0, lastDate: null }; }
  },

  updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const s = this.getStreak();
    if (s.lastDate === today) return s;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const newCount = s.lastDate === yesterday ? s.count + 1 : 1;
    const updated = { count: newCount, lastDate: today };
    localStorage.setItem(this.KEYS.STREAK, JSON.stringify(updated));
    return updated;
  },

  addXP(amount) {
    const profile = this.getProfile();
    if (!profile) return null;
    profile.xp = (profile.xp || 0) + amount;
    profile.level = Math.floor(profile.xp / 100) + 1;
    this.saveProfile(profile);
    return profile;
  },

  getBadges() {
    try { return JSON.parse(localStorage.getItem(this.KEYS.BADGES)) || []; }
    catch { return []; }
  },

  awardBadge(id) {
    const badges = this.getBadges();
    if (!badges.includes(id)) {
      badges.push(id);
      localStorage.setItem(this.KEYS.BADGES, JSON.stringify(badges));
      return true;
    }
    return false;
  }
};
