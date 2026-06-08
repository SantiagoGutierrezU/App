const DEV_UNLOCK_ALL = false;

const MapScreen = {
  render() {
    const profile = Storage.getProfile();
    const xp = DEV_UNLOCK_ALL ? 99999 : (profile ? (profile.xp || 0) : 0);

    return `
      <div class="screen map-screen">
        <div class="map-header">
          <button class="btn-back" id="back-btn">←</button>
          <span class="map-title">⚔️ Reinos</span>
          <div class="map-xp">⚡ ${xp} Poder</div>
        </div>
        <div class="worlds-container">
          ${CURRICULUM.worlds.map(world => this.renderWorld(world, xp)).join('')}
        </div>
      </div>`;
  },

  renderWorld(world, userXP) {
    const locked = userXP < world.xpRequired;
    return `
      <div class="world-card ${locked ? 'world-locked' : ''}" style="--wc:${world.color};--wl:${world.lightColor}">
        <div class="world-header">
          <span class="world-emoji">${world.emoji}</span>
          <div class="world-info">
            <h3 class="world-name">${world.name}</h3>
            ${locked ? `<span class="world-lock-msg">🔒 Necesitas ${world.xpRequired} de poder</span>` : ''}
            ${!locked && world.lore ? `<span class="world-lore">${world.lore}</span>` : ''}
          </div>
          ${locked ? '<span class="lock-icon">🔒</span>' : ''}
        </div>
        ${!locked ? `
          <div class="levels-path">
            ${world.levels.map((level, idx) => this.renderLevelNode(world, level, idx, userXP)).join('')}
          </div>
        ` : ''}
      </div>`;
  },

  renderLevelNode(world, level, idx, userXP) {
    const prog = Storage.getLevelProgress(world.id, level.id);
    const prevCompleted = idx === 0 || Storage.getLevelProgress(world.id, world.levels[idx - 1].id).completed;
    const isLocked = DEV_UNLOCK_ALL ? false : (!prevCompleted && idx !== 0);
    const isCompleted = prog.completed;
    const isAvailable = !isLocked;

    let stateClass = 'level-locked';
    let icon = '🔒';
    if (isCompleted) { stateClass = 'level-done'; icon = '✓'; }
    else if (isAvailable) { stateClass = 'level-available'; icon = `${idx + 1}`; }

    const stars = isCompleted ? '⭐'.repeat(prog.stars) : '';

    return `
      <div class="level-node ${stateClass}"
           data-world="${world.id}" data-level="${level.id}"
           ${isAvailable ? 'role="button" tabindex="0"' : ''}>
        <div class="level-circle" style="${isAvailable ? `--nc:${world.color}` : ''}">
          ${icon}
        </div>
        <div class="level-info">
          <span class="level-name">${level.name}</span>
          ${stars ? `<span class="level-stars">${stars}</span>` : ''}
        </div>
      </div>`;
  },

  init() {
    document.getElementById('back-btn').addEventListener('click', () => App.navigate('home'));

    document.querySelectorAll('.level-node.level-available, .level-node.level-done').forEach(node => {
      const activate = () => {
        const worldId = parseInt(node.dataset.world);
        const levelId = parseInt(node.dataset.level);
        node.classList.add('level-tap');
        setTimeout(() => App.navigate('lesson', { currentWorld: worldId, currentLevel: levelId }), 150);
      };
      node.addEventListener('click', activate);
      node.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activate(); });
    });
  }
};
