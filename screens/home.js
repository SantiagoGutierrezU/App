const HomeScreen = {
  AVATARS: ['🐱', '🐶', '🦊', '🐸', '🐧', '🦁'],

  pencilSVG(mood) {
    const mouths = {
      happy:   'M 22 88 Q 30 96 38 88',
      excited: 'M 20 86 Q 30 98 40 86',
      sad:     'M 22 94 Q 30 86 38 94',
    };
    const mouth = mouths[mood] || mouths.happy;
    return `
      <svg class="pencil-svg" viewBox="0 0 60 170" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="0" width="24" height="20" rx="10" fill="#FF9EB5"/>
        <rect x="16" y="18" width="28" height="10" rx="2" fill="#BDBDBD"/>
        <rect x="16" y="24" width="28" height="112" rx="4" fill="#FFD93D"/>
        <rect x="16" y="24" width="9" height="112" rx="4" fill="#FFE566"/>
        <polygon points="30,136 16,158 44,158" fill="#F4A460"/>
        <polygon points="30,158 26,168 34,168" fill="#555"/>
        <circle cx="24" cy="72" r="8" fill="white"/>
        <circle cx="36" cy="72" r="8" fill="white"/>
        <circle class="pupil-l" cx="25" cy="73" r="4.5" fill="#333"/>
        <circle class="pupil-r" cx="37" cy="73" r="4.5" fill="#333"/>
        <circle cx="27" cy="71" r="1.8" fill="white"/>
        <circle cx="39" cy="71" r="1.8" fill="white"/>
        <circle cx="19" cy="84" r="5" fill="#FFB3C6" opacity="0.65"/>
        <circle cx="41" cy="84" r="5" fill="#FFB3C6" opacity="0.65"/>
        <path d="${mouth}" stroke="#333" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      </svg>`;
  },

  render() {
    const profile = Storage.getProfile();
    return profile ? this.renderDashboard(profile) : this.renderOnboarding();
  },

  renderOnboarding() {
    return `
      <div class="screen home-screen">
        <div class="onboarding-top">
          <div class="mascot-wrap mascot-happy" id="mascot">${this.pencilSVG('happy')}</div>
          <h1 class="app-title">MathKids</h1>
          <p class="app-subtitle">¡Aprende matemáticas jugando!</p>
        </div>
        <div class="onboarding-card">
          <h2 class="card-title">¿Cómo te llamas?</h2>
          <input type="text" id="name-input" class="name-input" placeholder="Escribe tu nombre..." maxlength="15" autocomplete="off"/>
          <h3 class="card-subtitle">Elige tu avatar:</h3>
          <div class="avatar-grid">
            ${this.AVATARS.map((av, i) => `
              <button class="avatar-btn" data-avatar="${av}" data-idx="${i}">
                <span class="avatar-emoji">${av}</span>
              </button>
            `).join('')}
          </div>
          <button class="btn-primary btn-big" id="start-btn" disabled>
            ¡Empezar! 🚀
          </button>
        </div>
      </div>`;
  },

  renderDashboard(profile) {
    const streak = Storage.getStreak();
    const xp = profile.xp || 0;
    const level = profile.level || 1;
    const xpInLevel = xp % 100;
    const badges = Storage.getBadges();
    const allBadges = [
      { id: 'first_lesson', emoji: '🎖️', label: '1ª lección' },
      { id: 'streak_3',    emoji: '🔥',  label: 'Racha ×3' },
      { id: 'world_1',     emoji: '🏆',  label: 'Mundo 1' },
      { id: 'world_2',     emoji: '🥇',  label: 'Mundo 2' },
    ];

    return `
      <div class="screen home-screen">
        <div class="home-topbar">
          <div class="streak-chip ${streak.count > 0 ? 'streak-active' : ''}">🔥 ${streak.count}</div>
          <div class="level-chip">Nv.${level}</div>
          <div class="xp-chip">⭐ ${xp} XP</div>
        </div>
        <div class="welcome-hero">
          <div class="mascot-wrap mascot-happy" id="mascot">${this.pencilSVG('happy')}</div>
          <div class="avatar-bubble">${profile.avatar}</div>
          <h2 class="welcome-name">¡Hola, ${profile.name}!</h2>
        </div>
        <div class="xp-section">
          <div class="xp-label-row">
            <span>Nivel ${level}</span>
            <span>${xpInLevel}/100 XP</span>
          </div>
          <div class="xp-bar-track">
            <div class="xp-bar-fill" style="width:${xpInLevel}%"></div>
          </div>
        </div>
        <button class="btn-primary btn-big btn-pulse" id="play-btn">
          ¡A jugar! 🎯
        </button>
        <div class="badges-row">
          ${allBadges.map(b => `
            <div class="badge-chip ${badges.includes(b.id) ? 'badge-earned' : 'badge-locked'}" title="${b.label}">
              ${b.emoji}
            </div>
          `).join('')}
        </div>
      </div>`;
  },

  init() {
    const profile = Storage.getProfile();
    if (profile) {
      this.initDashboard();
    } else {
      this.initOnboarding();
    }
    Storage.updateStreak();
  },

  initOnboarding() {
    const nameInput = document.getElementById('name-input');
    const startBtn = document.getElementById('start-btn');
    let selectedAvatar = null;

    const checkReady = () => {
      const name = nameInput.value.trim();
      startBtn.disabled = !(name.length >= 2 && selectedAvatar);
    };

    nameInput.addEventListener('input', checkReady);

    document.querySelectorAll('.avatar-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.avatar-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedAvatar = btn.dataset.avatar;
        checkReady();
      });
    });

    startBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (name.length >= 2 && selectedAvatar) {
        Storage.saveProfile({ name, avatar: selectedAvatar, xp: 0, level: 1 });
        Storage.awardBadge('first_visit');
        App.navigate('map');
      }
    });

    nameInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !startBtn.disabled) startBtn.click();
    });
  },

  initDashboard() {
    document.getElementById('play-btn').addEventListener('click', () => App.navigate('map'));
    setTimeout(() => {
      const m = document.getElementById('mascot');
      if (m) m.classList.add('mascot-bounce');
    }, 300);
  }
};
