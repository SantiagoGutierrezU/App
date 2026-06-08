const Animations = {
  renderFruits(container, emoji, count, opts = {}) {
    const { delay = 0, className = '' } = opts;
    container.innerHTML = Array.from({ length: count }, (_, i) =>
      `<span class="fruit-item ${className}" style="--i:${i + delay}">${emoji}</span>`
    ).join('');
  },

  renderVisualAdd(container, emoji, a, b) {
    container.innerHTML = `
      <div class="visual-add-wrap">
        <div class="fruit-group group-a">
          ${Array.from({ length: a }, (_, i) =>
            `<span class="fruit-item" style="--i:${i}">${emoji}</span>`
          ).join('')}
        </div>
        <div class="plus-sign">+</div>
        <div class="fruit-group group-b">
          ${Array.from({ length: b }, (_, i) =>
            `<span class="fruit-item" style="--i:${a + i}">${emoji}</span>`
          ).join('')}
        </div>
      </div>
    `;
  },

  renderVisualSub(container, emoji, total, remove) {
    const keep = total - remove;
    container.innerHTML = `
      <div class="visual-sub-wrap">
        <div class="visual-sub-group">
          <div class="fruit-group-row">
            ${Array.from({ length: total }, (_, i) =>
              `<span class="fruit-item" style="--i:${i}">${emoji}</span>`
            ).join('')}
          </div>
          <div class="sub-label">${total}</div>
        </div>
        <div class="minus-sign">−</div>
        <div class="visual-sub-group">
          <div class="fruit-group-row">
            ${Array.from({ length: remove }, (_, i) =>
              `<span class="fruit-item fruit-sub-remove" style="--i:${i}">${emoji}</span>`
            ).join('')}
          </div>
          <div class="sub-label">${remove}</div>
        </div>
        <div class="minus-sign">=</div>
        <div class="visual-sub-group visual-sub-result">
          <div class="sub-label sub-label-result">?</div>
        </div>
      </div>
    `;
  },

  renderVisualMul(container, emoji, groups, perGroup) {
    container.innerHTML = `
      <div class="mul-groups">
        ${Array.from({ length: groups }, (_, g) => `
          <div class="mul-group" style="--g:${g}">
            ${Array.from({ length: perGroup }, (_, i) =>
              `<span class="fruit-item" style="--i:${g * perGroup + i}">${emoji}</span>`
            ).join('')}
          </div>
        `).join('')}
      </div>
    `;
  },

  spawnConfetti(container) {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#C77DFF', '#58CC02', '#FF9600'];
    const shapes = ['●', '■', '▲', '★', '♦'];
    container.innerHTML = '';
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      piece.style.cssText = `
        left: ${Math.random() * 100}%;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-delay: ${Math.random() * 0.5}s;
        animation-duration: ${0.8 + Math.random() * 0.8}s;
        font-size: ${10 + Math.random() * 14}px;
      `;
      container.appendChild(piece);
    }
  },

  playCorrect(el) {
    el.classList.remove('anim-wrong');
    el.classList.add('anim-correct');
    setTimeout(() => el.classList.remove('anim-correct'), 600);
  },

  playWrong(el) {
    el.classList.remove('anim-correct');
    el.classList.add('anim-wrong');
    setTimeout(() => el.classList.remove('anim-wrong'), 600);
  },

  mascotMood(mood) {
    const mascot = document.getElementById('mascot');
    if (!mascot) return;
    mascot.className = `mascot-wrap mascot-${mood}`;
  },

  animateXP(el, from, to, duration = 1000) {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * ease);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }
};
