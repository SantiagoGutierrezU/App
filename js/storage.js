const SUPABASE_URL = 'https://qnavcxoorrfquqfvcdyh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuYXZjeG9vcnJmcXVxZnZjZHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4ODMzNzEsImV4cCI6MjA5NjQ1OTM3MX0.mdJy8jdfmfVh6hOfTA_b4OXMnv0bI6E9S_rWvvnwOW4';

const Storage = {
  KEYS: {
    PROFILE:  'mathapp_profile',
    PROGRESS: 'mathapp_progress',
    STREAK:   'mathapp_streak',
    BADGES:   'mathapp_badges',
  },

  // ── Supabase client ──────────────────────────────────────────────────────
  _sb: null,

  async initSupabase() {
    try {
      this._sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

      // Sign in anonymously if no session exists
      const { data: { session } } = await this._sb.auth.getSession();
      if (!session) {
        await this._sb.auth.signInAnonymously();
      }

      // Pull cloud data into localStorage (cloud wins on first load)
      await this._syncFromCloud();
    } catch (e) {
      console.warn('[Supabase] init error:', e.message);
    }
  },

  async _syncFromCloud() {
    if (!this._sb) return;
    try {
      const { data } = await this._sb.from('user_data').select('*').maybeSingle();
      if (data) {
        if (data.profile)  localStorage.setItem(this.KEYS.PROFILE,  JSON.stringify(data.profile));
        if (data.progress) localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(data.progress));
        if (data.streak)   localStorage.setItem(this.KEYS.STREAK,   JSON.stringify(data.streak));
        if (data.badges)   localStorage.setItem(this.KEYS.BADGES,   JSON.stringify(data.badges));
      }
    } catch (e) {
      console.warn('[Supabase] syncFromCloud error:', e.message);
    }
  },

  // Fire-and-forget — never blocks the UI
  _syncToCloud() {
    if (!this._sb) return;
    this._sb.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;
      this._sb.from('user_data').upsert({
        user_id:    session.user.id,
        profile:    this.getProfile(),
        progress:   this.getProgress(),
        streak:     this.getStreak(),
        badges:     this.getBadges(),
        updated_at: new Date().toISOString(),
      }).then(({ error }) => {
        if (error) console.warn('[Supabase] syncToCloud error:', error.message);
      });
    });
  },

  // ── localStorage API (unchanged interface) ───────────────────────────────
  getProfile() {
    try { return JSON.parse(localStorage.getItem(this.KEYS.PROFILE)); }
    catch { return null; }
  },

  saveProfile(profile) {
    localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(profile));
    this._syncToCloud();
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
    this._syncToCloud();
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
    this._syncToCloud();
    return updated;
  },

  addXP(amount) {
    const profile = this.getProfile();
    if (!profile) return null;
    profile.xp = (profile.xp || 0) + amount;
    profile.level = Math.floor(profile.xp / 100) + 1;
    this.saveProfile(profile); // saveProfile already calls _syncToCloud
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
      this._syncToCloud();
      return true;
    }
    return false;
  },
};
