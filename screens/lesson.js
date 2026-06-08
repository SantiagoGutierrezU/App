const LessonScreen = {
  PHRASES_CORRECT: [
    '¡Muy bien! 🎉',
    '¡Excelente! 🌟',
    '¡Correcto! ¡Genial!',
    '¡Eso es! 🔥',
    '¡Súper! 💪',
    '¡Increíble! ⭐',
    '¡Lo sabías! 😄',
    '¡Brillante! ✨',
  ],
  PHRASES_WRONG: [
    '¡Tú puedes! 💪',
    '¡Casi! Sigue intentando',
    '¡No te rindas! 🚀',
    '¡Vamos, tú puedes!',
    '¡La próxima la tienes!',
    '¡Sigue practicando! 📚',
    '¡Tranquilo, aprenderás!',
    '¡Ánimo, campeón! 🏆',
  ],
  PHRASES_THINKING: [
    '¿Sabes la respuesta?',
    '¡Piensa bien! 🤔',
    '¡Tómate tu tiempo!',
    '¡Tú puedes hacerlo!',
    '¡Concéntrate! 🎯',
    '¡Eres muy listo/a!',
  ],

  state: {
    worldId: null,
    levelId: null,
    questions: [],
    current: 0,
    errors: 0,
    filled: '',
    phase: 'question',
  },

  pencilSVG(mood) {
    const mouths = {
      happy:   'M 22 88 Q 30 96 38 88',
      excited: 'M 20 86 Q 30 98 40 86',
      sad:     'M 22 94 Q 30 86 38 94',
      thinking:'M 23 90 Q 30 92 37 90',
      crying:  'M 22 94 Q 30 86 38 94',
    };
    const cryingExtras = mood === 'crying' ? `
      <ellipse cx="25" cy="75" rx="3" ry="4.5" fill="#333"/>
      <ellipse cx="37" cy="75" rx="3" ry="4.5" fill="#333"/>
      <ellipse cx="25" cy="82" rx="2.5" ry="4"   fill="#74C8FF" opacity="0.85"/>
      <ellipse cx="37" cy="82" rx="2.5" ry="4"   fill="#74C8FF" opacity="0.85"/>
      <ellipse cx="25" cy="87" rx="1.8" ry="2.8" fill="#4EB3FF" opacity="0.7"/>
      <ellipse cx="37" cy="87" rx="1.8" ry="2.8" fill="#4EB3FF" opacity="0.7"/>
    ` : `
      <circle cx="25" cy="73" r="4.5" fill="#333"/>
      <circle cx="37" cy="73" r="4.5" fill="#333"/>
      <circle cx="27" cy="71" r="1.8" fill="white"/>
      <circle cx="39" cy="71" r="1.8" fill="white"/>
    `;
    return `
      <svg class="pencil-svg pencil-sm" viewBox="0 0 60 170" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="0" width="24" height="20" rx="10" fill="#FF9EB5"/>
        <rect x="16" y="18" width="28" height="10" rx="2" fill="#BDBDBD"/>
        <rect x="16" y="24" width="28" height="112" rx="4" fill="#FFD93D"/>
        <rect x="16" y="24" width="9" height="112" rx="4" fill="#FFE566"/>
        <polygon points="30,136 16,158 44,158" fill="#F4A460"/>
        <polygon points="30,158 26,168 34,168" fill="#555"/>
        <circle cx="24" cy="72" r="8" fill="white"/>
        <circle cx="36" cy="72" r="8" fill="white"/>
        ${cryingExtras}
        <circle cx="19" cy="84" r="5" fill="#FFB3C6" opacity="0.65"/>
        <circle cx="41" cy="84" r="5" fill="#FFB3C6" opacity="0.65"/>
        <path d="${mouths[mood] || mouths.happy}" stroke="#333" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      </svg>`;
  },

  render() {
    const world = CURRICULUM.getWorld(App.state.currentWorld);
    return `
      <div class="screen lesson-screen" style="--wc:${world ? world.color : '#58CC02'}">
        <div class="lesson-header">
          <button class="btn-close" id="close-btn">✕</button>
          <div class="progress-track">
            <div class="progress-fill" id="progress-fill" style="width:0%"></div>
          </div>
          <div class="hearts-display" id="hearts-display">❤️❤️❤️</div>
        </div>
        <div class="lesson-body">
          <div class="mascot-corner" id="mascot-area">
            <div class="speech-bubble" id="speech-bubble"></div>
            <div class="mascot-figure" id="mascot">${this.pencilSVG('thinking')}</div>
          </div>
          <div class="question-area" id="question-area"></div>
        </div>
        <div class="lesson-footer" id="lesson-footer"></div>
        <div class="feedback-bar" id="feedback-bar"></div>
      </div>`;
  },

  init() {
    this.state.worldId = App.state.currentWorld;
    this.state.levelId = App.state.currentLevel;
    this.state.questions = Engine.generateLesson(this.state.worldId, this.state.levelId);
    this.state.current = 0;
    this.state.errors = 0;
    this.state.filled = '';
    this.state.phase = 'question';
    this.state.mascotSide = 'right';

    document.getElementById('close-btn').addEventListener('click', () => {
      this.showExitModal();
    });

    this.renderQuestion();
  },

  updateProgress() {
    const pct = (this.state.current / this.state.questions.length) * 100;
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = pct + '%';
    const hearts = document.getElementById('hearts-display');
    if (hearts) {
      const remaining = Math.max(0, 3 - this.state.errors);
      hearts.textContent = '❤️'.repeat(remaining) + '🖤'.repeat(3 - remaining);
    }
  },

  renderQuestion() {
    if (this.state.current >= this.state.questions.length) {
      this.finishLesson();
      return;
    }
    this.state.phase = 'question';
    this.state.filled = '';
    this.updateProgress();

    // Toggle mascot side on every new question
    this.state.mascotSide = this.state.mascotSide === 'right' ? 'left' : 'right';

    const q = this.state.questions[this.state.current];
    const area = document.getElementById('question-area');
    const footer = document.getElementById('lesson-footer');
    const feedback = document.getElementById('feedback-bar');
    if (feedback) { feedback.className = 'feedback-bar'; feedback.innerHTML = ''; }

    area.innerHTML = this.buildQuestionHTML(q);
    footer.innerHTML = '';

    const isNumpad = q.type === 'fill_blank';
    if (isNumpad) {
      this.setupNumpad(footer, q);
    } else {
      this.setupOptions(footer, q);
    }

    this.setupVisualAnimation(q);
    area.classList.remove('slide-in');
    requestAnimationFrame(() => area.classList.add('slide-in'));

    // Apply mascot side + numpad offset, then set mood (triggers bubble)
    this.applyMascotSide(isNumpad);
    this.setMascotMood('thinking');
  },

  applyMascotSide(isNumpad) {
    const area = document.getElementById('mascot-area');
    if (!area) return;
    const side = this.state.mascotSide;
    area.className = `mascot-corner side-${side}${isNumpad ? ' numpad-mode' : ''}`;
  },

  buildQuestionHTML(q) {
    let visualHTML = '';
    if (q.type === 'visual_add' || q.type === 'visual_sub' || q.type === 'visual_mul') {
      visualHTML = `<div class="visual-area" id="visual-area"></div>`;
    }
    const questionText = q.question.replace(/\n/g, '<br>');
    const subtext = q.subtext ? `<div class="question-subtext">${q.subtext}</div>` : '';
    return `
      ${visualHTML}
      <div class="question-bubble">
        <p class="question-text">${questionText}</p>
        ${subtext}
      </div>`;
  },

  setupVisualAnimation(q) {
    const va = document.getElementById('visual-area');
    if (!va) return;
    if (q.type === 'visual_add') Animations.renderVisualAdd(va, q.emoji, q.a, q.b);
    else if (q.type === 'visual_sub') Animations.renderVisualSub(va, q.emoji, q.total, q.remove);
    else if (q.type === 'visual_mul') Animations.renderVisualMul(va, q.emoji, q.groups, q.perGroup);
  },

  setupOptions(footer, q) {
    footer.innerHTML = `
      <div class="options-grid">
        ${q.options.map(opt => `
          <button class="option-btn" data-value="${opt}">${opt}</button>
        `).join('')}
      </div>`;
    footer.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.state.phase !== 'question') return;
        this.handleAnswer(parseInt(btn.dataset.value), btn);
      });
    });
  },

  setupNumpad(footer, q) {
    footer.innerHTML = `
      <div class="numpad-section">
        <div class="filled-display" id="filled-display">
          <span class="filled-text" id="filled-text">___</span>
        </div>
        <div class="numpad-grid">
          ${[1,2,3,4,5,6,7,8,9,'⌫',0,'✓'].map(k => `
            <button class="numpad-btn ${k === '✓' ? 'numpad-confirm' : ''} ${k === '⌫' ? 'numpad-del' : ''}"
                    data-key="${k}">${k}</button>
          `).join('')}
        </div>
      </div>`;

    footer.querySelectorAll('.numpad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.state.phase !== 'question') return;
        const key = btn.dataset.key;
        if (key === '⌫') {
          this.state.filled = this.state.filled.slice(0, -1);
        } else if (key === '✓') {
          if (this.state.filled !== '') {
            this.handleAnswer(parseInt(this.state.filled), null);
          }
        } else {
          if (this.state.filled.length < 3) this.state.filled += key;
        }
        const display = document.getElementById('filled-text');
        if (display) display.textContent = this.state.filled || '___';
      });
    });
  },

  handleAnswer(answer, btnEl) {
    if (this.state.phase !== 'question') return;
    const q = this.state.questions[this.state.current];
    const correct = answer === q.answer;

    this.state.phase = correct ? 'correct' : 'wrong';
    if (!correct) this.state.errors++;

    if (btnEl) {
      btnEl.classList.add(correct ? 'option-correct' : 'option-wrong');
      if (!correct) {
        document.querySelectorAll('.option-btn').forEach(b => {
          if (parseInt(b.dataset.value) === q.answer) b.classList.add('option-correct');
        });
      }
      document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    }

    this.showFeedback(correct, q);
    this.setMascotMood(correct ? 'excited' : 'sad');
    setTimeout(() => this.nextQuestion(), 1600);
  },

  showFeedback(correct, q) {
    const bar = document.getElementById('feedback-bar');
    if (!bar) return;
    if (correct) {
      bar.className = 'feedback-bar feedback-correct';
      bar.innerHTML = `<span class="feedback-icon">✓</span><span class="feedback-text">¡Correcto! 🎉</span>`;
    } else {
      bar.className = 'feedback-bar feedback-wrong';
      bar.innerHTML = `<span class="feedback-icon">✗</span><span class="feedback-text">La respuesta es <strong>${q.answer}</strong></span>`;
    }
    bar.classList.add('feedback-slide-in');
  },

  randomPhrase(list) {
    return list[Math.floor(Math.random() * list.length)];
  },

  showSpeechBubble(text, type) {
    const bubble = document.getElementById('speech-bubble');
    if (!bubble) return;
    bubble.textContent = text;
    const side = this.state.mascotSide || 'right';
    bubble.className = `speech-bubble speech-bubble-${type} speech-bubble-${side} speech-bubble-show`;
    clearTimeout(this._bubbleTimer);
    if (type === 'thinking') {
      // Keep thinking bubble visible until answered
    } else {
      this._bubbleTimer = setTimeout(() => {
        bubble.classList.remove('speech-bubble-show');
      }, 1400);
    }
  },

  setMascotMood(mood) {
    const m = document.getElementById('mascot');
    if (m) {
      m.innerHTML = this.pencilSVG(mood);
      m.className = `mascot-figure mascot-${mood}`;
    }
    if (mood === 'excited') {
      this.showSpeechBubble(this.randomPhrase(this.PHRASES_CORRECT), 'correct');
    } else if (mood === 'sad') {
      this.showSpeechBubble(this.randomPhrase(this.PHRASES_WRONG), 'wrong');
    } else if (mood === 'thinking') {
      this.showSpeechBubble(this.randomPhrase(this.PHRASES_THINKING), 'thinking');
    }
  },

  nextQuestion() {
    this.state.current++;
    this.state.phase = 'question';
    if (this.state.current >= this.state.questions.length) {
      this.finishLesson();
    } else {
      this.renderQuestion();
    }
  },

  showExitModal() {
    // Remove any existing modal
    document.getElementById('exit-modal-overlay')?.remove();

    const overlay = document.createElement('div');
    overlay.className = 'exit-modal-overlay';
    overlay.id = 'exit-modal-overlay';
    overlay.innerHTML = `
      <div class="exit-modal">
        <div class="exit-modal-pencil">${this.pencilSVG('crying')}</div>
        <div class="exit-modal-title">¿Abandonar la lección?</div>
        <div class="exit-modal-sub">¡Tu progreso en esta lección se perderá! 😢</div>
        <div class="exit-modal-btns">
          <button class="exit-btn-stay" id="exit-stay">¡Me quedo!</button>
          <button class="exit-btn-leave" id="exit-leave">Salir</button>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    document.getElementById('exit-stay').addEventListener('click', () => overlay.remove());
    document.getElementById('exit-leave').addEventListener('click', () => {
      overlay.remove();
      App.navigate('map');
    });
    // Tap outside to cancel
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  },

  finishLesson() {
    const errors = this.state.errors;
    const stars = errors === 0 ? 3 : errors <= 2 ? 2 : 1;
    const xpMap = { 3: 30, 2: 20, 1: 10 };
    const xp = xpMap[stars];
    Storage.saveLevelProgress(this.state.worldId, this.state.levelId, stars);
    Storage.addXP(xp);
    Storage.updateStreak();
    if (this.state.worldId === 1 && this.state.levelId === 1) Storage.awardBadge('first_lesson');
    const streak = Storage.getStreak();
    if (streak.count >= 3) Storage.awardBadge('streak_3');
    const world = CURRICULUM.getWorld(this.state.worldId);
    const allDone = world && world.levels.every(l => Storage.getLevelProgress(this.state.worldId, l.id).completed);
    if (allDone) Storage.awardBadge(`world_${this.state.worldId}`);

    App.navigate('results', {
      lessonResult: { worldId: this.state.worldId, levelId: this.state.levelId, stars, xp, errors }
    });
  }
};
