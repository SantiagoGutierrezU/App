const HomeScreen = {
  AVATARS: ['cat', 'dog', 'fox', 'frog', 'penguin', 'lion'],

  // ── Avatar SVGs (same style as pencil: white eyes, rosy cheeks, curved mouth) ──
  avatarSVG(id, size = 64) {
    const svgs = {
      cat: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <polygon points="18,32 8,6  30,20"  fill="#FFAA44"/>
        <polygon points="62,32 72,6 50,20"  fill="#FFAA44"/>
        <polygon points="20,30 12,10 28,21" fill="#FFB3C6"/>
        <polygon points="60,30 68,10 52,21" fill="#FFB3C6"/>
        <circle cx="40" cy="46" r="30" fill="#FFAA44"/>
        <circle cx="28" cy="40" r="9"  fill="white"/>
        <circle cx="52" cy="40" r="9"  fill="white"/>
        <circle cx="29" cy="41" r="5"  fill="#333"/>
        <circle cx="53" cy="41" r="5"  fill="#333"/>
        <circle cx="31" cy="39" r="2"  fill="white"/>
        <circle cx="55" cy="39" r="2"  fill="white"/>
        <circle cx="18" cy="52" r="7"  fill="#FFB3C6" opacity="0.65"/>
        <circle cx="62" cy="52" r="7"  fill="#FFB3C6" opacity="0.65"/>
        <ellipse cx="40" cy="52" rx="3"  ry="2.2" fill="#FF9EB5"/>
        <line x1="10" y1="51" x2="29" y2="53" stroke="#AAA" stroke-width="1.3" opacity="0.6"/>
        <line x1="10" y1="55" x2="29" y2="55" stroke="#AAA" stroke-width="1.3" opacity="0.6"/>
        <line x1="51" y1="53" x2="70" y2="51" stroke="#AAA" stroke-width="1.3" opacity="0.6"/>
        <line x1="51" y1="55" x2="70" y2="55" stroke="#AAA" stroke-width="1.3" opacity="0.6"/>
        <path d="M 34 57 Q 40 64 46 57" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </svg>`,

      dog: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="14" cy="46" rx="11" ry="20" fill="#C68B42"/>
        <ellipse cx="66" cy="46" rx="11" ry="20" fill="#C68B42"/>
        <circle cx="40" cy="40" r="28" fill="#E8A857"/>
        <ellipse cx="40" cy="55" rx="14" ry="10" fill="#D4924A"/>
        <circle cx="28" cy="36" r="9"  fill="white"/>
        <circle cx="52" cy="36" r="9"  fill="white"/>
        <circle cx="29" cy="37" r="5"  fill="#333"/>
        <circle cx="53" cy="37" r="5"  fill="#333"/>
        <circle cx="31" cy="35" r="2"  fill="white"/>
        <circle cx="55" cy="35" r="2"  fill="white"/>
        <circle cx="18" cy="48" r="7"  fill="#FFB3C6" opacity="0.65"/>
        <circle cx="62" cy="48" r="7"  fill="#FFB3C6" opacity="0.65"/>
        <ellipse cx="40" cy="52" rx="5" ry="3.5" fill="#333"/>
        <path d="M 33 58 Q 40 66 47 58" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </svg>`,

      fox: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <polygon points="16,30 6,4   32,18"  fill="#FF6B35"/>
        <polygon points="64,30 74,4  48,18"  fill="#FF6B35"/>
        <polygon points="18,28 11,8  30,18"  fill="#FFEEDD"/>
        <polygon points="62,28 69,8  50,18"  fill="#FFEEDD"/>
        <circle cx="40" cy="44" r="28" fill="#FF6B35"/>
        <ellipse cx="40" cy="56" rx="19" ry="13" fill="#FFEEDD"/>
        <circle cx="28" cy="40" r="9"  fill="white"/>
        <circle cx="52" cy="40" r="9"  fill="white"/>
        <circle cx="29" cy="41" r="5"  fill="#333"/>
        <circle cx="53" cy="41" r="5"  fill="#333"/>
        <circle cx="31" cy="39" r="2"  fill="white"/>
        <circle cx="55" cy="39" r="2"  fill="white"/>
        <circle cx="18" cy="50" r="7"  fill="#FFB3C6" opacity="0.65"/>
        <circle cx="62" cy="50" r="7"  fill="#FFB3C6" opacity="0.65"/>
        <ellipse cx="40" cy="53" rx="4" ry="3" fill="#333"/>
        <path d="M 34 59 Q 40 66 46 59" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </svg>`,

      frog: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="22" r="13" fill="#5CBF5C"/>
        <circle cx="56" cy="22" r="13" fill="#5CBF5C"/>
        <circle cx="40" cy="48" r="28" fill="#5CBF5C"/>
        <ellipse cx="40" cy="56" rx="20" ry="13" fill="#7DE07D" opacity="0.55"/>
        <circle cx="24" cy="20" r="8.5" fill="white"/>
        <circle cx="56" cy="20" r="8.5" fill="white"/>
        <circle cx="25" cy="21" r="5"   fill="#333"/>
        <circle cx="57" cy="21" r="5"   fill="#333"/>
        <circle cx="27" cy="19" r="2"   fill="white"/>
        <circle cx="59" cy="19" r="2"   fill="white"/>
        <circle cx="20" cy="52" r="7"   fill="#FFB3C6" opacity="0.65"/>
        <circle cx="60" cy="52" r="7"   fill="#FFB3C6" opacity="0.65"/>
        <circle cx="36" cy="46" r="2.2" fill="#4AA84A"/>
        <circle cx="44" cy="46" r="2.2" fill="#4AA84A"/>
        <path d="M 24 60 Q 40 72 56 60" stroke="#333" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      </svg>`,

      penguin: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="13" cy="54" rx="9" ry="16" fill="#2C3E50" transform="rotate(-12 13 54)"/>
        <ellipse cx="67" cy="54" rx="9" ry="16" fill="#2C3E50" transform="rotate(12 67 54)"/>
        <circle  cx="40" cy="30" r="22" fill="#2C3E50"/>
        <ellipse cx="40" cy="58" rx="22" ry="20" fill="#2C3E50"/>
        <ellipse cx="40" cy="58" rx="14" ry="17" fill="#F0F0F0"/>
        <circle  cx="28" cy="26" r="9"  fill="white"/>
        <circle  cx="52" cy="26" r="9"  fill="white"/>
        <circle  cx="29" cy="27" r="5"  fill="#333"/>
        <circle  cx="53" cy="27" r="5"  fill="#333"/>
        <circle  cx="31" cy="25" r="2"  fill="white"/>
        <circle  cx="55" cy="25" r="2"  fill="white"/>
        <circle  cx="18" cy="36" r="7"  fill="#FFB3C6" opacity="0.65"/>
        <circle  cx="62" cy="36" r="7"  fill="#FFB3C6" opacity="0.65"/>
        <polygon points="40,36 34,44 46,44" fill="#FF9600"/>
        <path d="M 33 50 Q 40 57 47 50" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </svg>`,

      lion: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="36" fill="#D4841A"/>
        <circle cx="40" cy="10" r="7"  fill="#C07010"/>
        <circle cx="57" cy="15" r="7"  fill="#C07010"/>
        <circle cx="68" cy="30" r="7"  fill="#C07010"/>
        <circle cx="70" cy="48" r="7"  fill="#C07010"/>
        <circle cx="60" cy="63" r="6"  fill="#C07010"/>
        <circle cx="20" cy="63" r="6"  fill="#C07010"/>
        <circle cx="10" cy="48" r="7"  fill="#C07010"/>
        <circle cx="12" cy="30" r="7"  fill="#C07010"/>
        <circle cx="23" cy="15" r="7"  fill="#C07010"/>
        <circle cx="40" cy="40" r="24" fill="#FFB300"/>
        <circle cx="20" cy="20" r="8"  fill="#FFB300"/>
        <circle cx="60" cy="20" r="8"  fill="#FFB300"/>
        <circle cx="20" cy="20" r="5"  fill="#D4841A"/>
        <circle cx="60" cy="20" r="5"  fill="#D4841A"/>
        <circle cx="28" cy="36" r="9"  fill="white"/>
        <circle cx="52" cy="36" r="9"  fill="white"/>
        <circle cx="29" cy="37" r="5"  fill="#333"/>
        <circle cx="53" cy="37" r="5"  fill="#333"/>
        <circle cx="31" cy="35" r="2"  fill="white"/>
        <circle cx="55" cy="35" r="2"  fill="white"/>
        <circle cx="19" cy="46" r="7"  fill="#FFB3C6" opacity="0.65"/>
        <circle cx="61" cy="46" r="7"  fill="#FFB3C6" opacity="0.65"/>
        <ellipse cx="40" cy="50" rx="10" ry="7" fill="#D4841A"/>
        <ellipse cx="40" cy="47" rx="3.5" ry="2.5" fill="#333"/>
        <path d="M 34 54 Q 40 61 46 54" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </svg>`,
    };
    return svgs[id] || svgs.cat;
  },

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
            ${this.AVATARS.map((id) => `
              <button class="avatar-btn" data-avatar="${id}">
                <span class="avatar-svg-wrap">${this.avatarSVG(id)}</span>
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
          <div class="avatar-bubble">${this.avatarSVG(profile.avatar)}</div>
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
    const startBtn  = document.getElementById('start-btn');
    let selectedAvatar = null;

    const checkReady = () => {
      startBtn.disabled = !(nameInput.value.trim().length >= 2 && selectedAvatar);
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
