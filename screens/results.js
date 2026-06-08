const ResultsScreen = {
  pencilSVG() {
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
        <circle cx="25" cy="73" r="4.5" fill="#333"/>
        <circle cx="37" cy="73" r="4.5" fill="#333"/>
        <circle cx="27" cy="71" r="1.8" fill="white"/>
        <circle cx="39" cy="71" r="1.8" fill="white"/>
        <circle cx="19" cy="84" r="5" fill="#FFB3C6" opacity="0.65"/>
        <circle cx="41" cy="84" r="5" fill="#FFB3C6" opacity="0.65"/>
        <path d="M 20 86 Q 30 98 40 86" stroke="#333" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      </svg>`;
  },

  render() {
    const r = App.state.lessonResult || { stars: 1, xp: 10, errors: 0 };
    const world = CURRICULUM.getWorld(r.worldId);
    const level = CURRICULUM.getLevel(r.worldId, r.levelId);
    const messages = {
      3: ['¡Perfecto! 🎉', '¡Increíble! 🌟', '¡Eres una estrella! ⭐'],
      2: ['¡Muy bien! 💪', '¡Buen trabajo! 👍', '¡Casi perfecto! 🎯'],
      1: ['¡Lo lograste! 🙌', '¡Sigue practicando! 📚', '¡Vas mejorando! 🚀'],
    };
    const msgList = messages[r.stars] || messages[1];
    const msg = msgList[Math.floor(Math.random() * msgList.length)];
    const profile = Storage.getProfile();
    const totalXP = profile ? (profile.xp || 0) : r.xp;

    return `
      <div class="screen results-screen">
        <div class="confetti-layer" id="confetti-layer"></div>
        <div class="results-content">
          <div class="mascot-wrap mascot-excited result-mascot" id="mascot">
            ${this.pencilSVG()}
          </div>
          <h2 class="result-msg">${msg}</h2>
          ${world && level ? `<p class="result-sublabel">${world.emoji} ${world.name} · ${level.name}</p>` : ''}
          <div class="stars-row" id="stars-row">
            <span class="star-item" style="--si:0">⭐</span>
            <span class="star-item ${r.stars < 2 ? 'star-empty' : ''}" style="--si:1">⭐</span>
            <span class="star-item ${r.stars < 3 ? 'star-empty' : ''}" style="--si:2">⭐</span>
          </div>
          <div class="xp-earned-card">
            <span class="xp-earned-label">XP ganados</span>
            <span class="xp-earned-num" id="xp-counter">0</span>
          </div>
          <div class="result-stats">
            <div class="stat-chip">
              <span class="stat-icon">✓</span>
              <span class="stat-val">${8 - r.errors}</span>
              <span class="stat-label">correctas</span>
            </div>
            <div class="stat-chip">
              <span class="stat-icon">✗</span>
              <span class="stat-val">${r.errors}</span>
              <span class="stat-label">errores</span>
            </div>
            <div class="stat-chip">
              <span class="stat-icon">⭐</span>
              <span class="stat-val">${totalXP}</span>
              <span class="stat-label">XP total</span>
            </div>
          </div>
          <div class="result-actions">
            <button class="btn-secondary" id="retry-btn">🔄 Repetir</button>
            <button class="btn-primary btn-big" id="continue-btn">Continuar →</button>
          </div>
        </div>
      </div>`;
  },

  init() {
    const r = App.state.lessonResult || { stars: 1, xp: 10, errors: 0 };

    if (r.stars === 3) {
      setTimeout(() => {
        const layer = document.getElementById('confetti-layer');
        if (layer) Animations.spawnConfetti(layer);
      }, 400);
    }

    setTimeout(() => {
      const counter = document.getElementById('xp-counter');
      if (counter) Animations.animateXP(counter, 0, r.xp, 800);
    }, 600);

    document.querySelectorAll('.star-item:not(.star-empty)').forEach((el, i) => {
      el.style.animationDelay = (0.3 + i * 0.2) + 's';
      el.classList.add('star-pop');
    });

    document.getElementById('continue-btn').addEventListener('click', () => {
      App.navigate('map');
    });

    document.getElementById('retry-btn').addEventListener('click', () => {
      App.navigate('lesson', {
        currentWorld: r.worldId,
        currentLevel: r.levelId
      });
    });

    setTimeout(() => {
      const m = document.getElementById('mascot');
      if (m) m.classList.add('mascot-bounce');
    }, 200);
  }
};
