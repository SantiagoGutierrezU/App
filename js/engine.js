const Engine = {
  EMOJIS: {
    1: ['🍎', '🍊', '🍋', '🍇', '🍓', '🫐'],
    2: ['🎈', '🏀', '⚽', '🌟', '🦋', '🐠'],
    3: ['⭐', '💎', '🌸', '🍭', '🎯', '🪄'],
    4: ['🔵', '🟡', '🔴', '🟢', '🟣', '🟠'],
  },

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  getEmoji(worldId) {
    const list = this.EMOJIS[worldId] || this.EMOJIS[1];
    return list[this.rand(0, list.length - 1)];
  },

  makeWrongOptions(correct, count, min, max) {
    const options = new Set([correct]);
    const deltas = this.shuffle([-4, -3, -2, -1, 1, 2, 3, 4, 5, -5]);
    for (const d of deltas) {
      if (options.size >= count + 1) break;
      const v = correct + d;
      if (v >= min && v <= max) options.add(v);
    }
    let fallback = min;
    while (options.size < count + 1 && fallback <= max + 10) {
      if (!options.has(fallback)) options.add(fallback);
      fallback++;
    }
    return this.shuffle([...options]).slice(0, count + 1);
  },

  makeAddition(config, emoji) {
    const max = config.max || 10;
    const a = this.rand(0, Math.floor(max * 0.6));
    const b = this.rand(0, max - a);
    const answer = a + b;
    const useVisual = config.visual && a <= 7 && b <= 7 && Math.random() < 0.55;

    if (useVisual) {
      return {
        type: 'visual_add',
        emoji, a, b,
        question: `¿Cuántos ${emoji} hay en total?`,
        answer,
        options: this.makeWrongOptions(answer, 3, 0, max + 5)
      };
    }
    return {
      type: 'multiple_choice',
      question: `${a} + ${b} = ?`,
      answer,
      options: this.makeWrongOptions(answer, 3, 0, max + 5)
    };
  },

  makeAdditionFill(config) {
    const max = config.max || 10;
    const answer = this.rand(2, max);
    const a = this.rand(0, answer - 1);
    const b = answer - a;
    if (Math.random() < 0.5) {
      return { type: 'fill_blank', question: `${a} + ___ = ${answer}`, answer: b, hint: `${a} + ${b} = ${answer}` };
    }
    return { type: 'fill_blank', question: `${a} + ${b} = ___`, answer, hint: `${a} + ${b} = ${answer}` };
  },

  makeSubtraction(config, emoji) {
    const max = config.max || 10;
    const a = this.rand(1, max);
    const b = this.rand(0, a);
    const answer = a - b;
    const useVisual = config.visual && a <= 8 && Math.random() < 0.55;

    if (useVisual) {
      return {
        type: 'visual_sub',
        emoji, total: a, remove: b,
        question: `Hay ${a} ${emoji}. Se van ${b}. ¿Cuántos quedan?`,
        answer,
        options: this.makeWrongOptions(answer, 3, 0, max)
      };
    }
    return {
      type: 'multiple_choice',
      question: `${a} − ${b} = ?`,
      answer,
      options: this.makeWrongOptions(answer, 3, 0, max)
    };
  },

  makeSubtractionFill(config) {
    const max = config.max || 10;
    const a = this.rand(2, max);
    const b = this.rand(1, a - 1);
    const answer = a - b;
    if (Math.random() < 0.5) {
      return { type: 'fill_blank', question: `${a} − ___ = ${answer}`, answer: b, hint: `${a} − ${b} = ${answer}` };
    }
    return { type: 'fill_blank', question: `${a} − ${b} = ___`, answer, hint: `${a} − ${b} = ${answer}` };
  },

  makeMultiplication(config, emoji) {
    const tables = config.mixed || [config.table];
    const table = tables[this.rand(0, tables.length - 1)];
    const b = this.rand(1, 10);
    const answer = table * b;
    const useVisual = b <= 5 && table <= 5 && Math.random() < 0.4;

    if (useVisual) {
      return {
        type: 'visual_mul',
        emoji, groups: table, perGroup: b,
        question: `${table} grupos de ${b} ${emoji} = ?`,
        answer,
        options: this.makeWrongOptions(answer, 3, 0, 60)
      };
    }
    return {
      type: 'multiple_choice',
      question: `${table} × ${b} = ?`,
      answer,
      options: this.makeWrongOptions(answer, 3, 0, 60)
    };
  },

  makeSequence(config) {
    let step;
    if (config.mixed) {
      step = [1, 2, 5, 10][this.rand(0, 3)];
    } else {
      step = config.step || 1;
    }
    const start = this.rand(0, 5) * step;
    const seq = [start, start + step, start + 2 * step, start + 3 * step, start + 4 * step];
    const missingIdx = this.rand(1, 4);
    const answer = seq[missingIdx];
    const displayed = seq.map((v, i) => i === missingIdx ? '?' : v);
    return {
      type: 'multiple_choice',
      question: `Completa la serie:\n${displayed.slice(0, 4).join(' → ')}`,
      answer,
      options: this.makeWrongOptions(answer, 3, 0, config.max || 50)
    };
  },

  makeOrdering(config) {
    const max = config.max || 20;
    const base = this.rand(1, max - 12);
    const nums = this.shuffle([base, base + this.rand(1, 3), base + this.rand(4, 7), base + this.rand(8, 12)]);
    const answer = Math.min(...nums);
    return {
      type: 'multiple_choice',
      question: `¿Cuál es el número más pequeño?`,
      subtext: nums.join('   '),
      answer,
      options: this.shuffle(nums)
    };
  },

  generateQuestion(levelConfig, worldId) {
    const emoji = this.getEmoji(worldId);
    switch (levelConfig.type) {
      case 'addition': return this.makeAddition(levelConfig, emoji);
      case 'addition_fill': return this.makeAdditionFill(levelConfig);
      case 'subtraction': return this.makeSubtraction(levelConfig, emoji);
      case 'subtraction_fill': return this.makeSubtractionFill(levelConfig);
      case 'multiplication': return this.makeMultiplication(levelConfig, emoji);
      case 'sequence': return this.makeSequence(levelConfig);
      case 'ordering': return this.makeOrdering(levelConfig);
      default: return this.makeAddition(levelConfig, emoji);
    }
  },

  generateLesson(worldId, levelId) {
    const level = CURRICULUM.getLevel(worldId, levelId);
    if (!level) return [];
    return Array.from({ length: 8 }, () => this.generateQuestion(level, worldId));
  }
};
