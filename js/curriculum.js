const CURRICULUM = {
  worlds: [
    {
      id: 1,
      name: 'Reino de Aldegor',
      lore: 'Los monstruos han sembrado el caos en las sumas',
      emoji: '🍎',
      color: '#FF6B6B',
      darkColor: '#E85555',
      lightColor: '#FFF0F0',
      xpRequired: 0,
      levels: [
        { id: 1, name: 'Primeras batallas',     type: 'addition', max: 5,  visual: true },
        { id: 2, name: 'Defensa del castillo',  type: 'addition', max: 10, visual: true },
        { id: 3, name: 'El contraataque',       type: 'addition', max: 15, visual: false },
        { id: 4, name: 'El código secreto',     type: 'addition_fill', max: 10 },
        { id: 5, name: '¡Héroe de Aldegor!',    type: 'addition', max: 20, visual: false },
      ]
    },
    {
      id: 2,
      name: 'Páramo de Vortek',
      lore: 'Vortek el oscuro reduce todo a la nada',
      emoji: '🎈',
      color: '#4ECDC4',
      darkColor: '#3AB5AC',
      lightColor: '#F0FFFE',
      xpRequired: 50,
      levels: [
        { id: 1, name: 'Tierras malditas',      type: 'subtraction', max: 5,  visual: true },
        { id: 2, name: 'Batalla en el páramo',  type: 'subtraction', max: 10, visual: true },
        { id: 3, name: 'El ejército mengua',    type: 'subtraction', max: 15, visual: false },
        { id: 4, name: 'El portal oscuro',      type: 'subtraction_fill', max: 10 },
        { id: 5, name: '¡Vencedor de Vortek!',  type: 'subtraction', max: 20, visual: false },
      ]
    },
    {
      id: 3,
      name: 'Torre de Kryptus',
      lore: 'Kryptus multiplica sus ejércitos sin parar',
      emoji: '⭐',
      color: '#FFB347',
      darkColor: '#E89020',
      lightColor: '#FFFDE7',
      xpRequired: 150,
      levels: [
        { id: 1, name: 'El doble de poder',     type: 'multiplication', table: 2 },
        { id: 2, name: 'Triple amenaza',         type: 'multiplication', table: 3 },
        { id: 3, name: 'Cuatro ejércitos',       type: 'multiplication', table: 4 },
        { id: 4, name: 'Los cinco elementos',   type: 'multiplication', table: 5 },
        { id: 5, name: '¡Destructor de torres!', type: 'multiplication', table: null, mixed: [2, 3, 4, 5] },
      ]
    },
    {
      id: 4,
      name: 'Cavernas de Divora',
      lore: 'Divora divide y debilita a los aliados',
      emoji: '➗',
      color: '#06D6A0',
      darkColor: '#05A87D',
      lightColor: '#F0FFF8',
      xpRequired: 200,
      levels: [
        { id: 1, name: 'Divide y vencerás',     type: 'division',      divisor: 2 },
        { id: 2, name: 'Las cavernas profundas', type: 'division',      divisors: [3, 4] },
        { id: 3, name: 'El tesoro dividido',    type: 'division',      divisors: [5, 10] },
        { id: 4, name: 'Enigma de la cripta',   type: 'division_fill', maxDivisor: 5 },
        { id: 5, name: '¡Conquistador de Divora!', type: 'division',   mixed: true },
      ]
    },
    {
      id: 5,
      name: 'Laberinto de Nexus',
      lore: 'Nexus rompe el orden de los números',
      emoji: '🔢',
      color: '#C77DFF',
      darkColor: '#A855E8',
      lightColor: '#F8F0FF',
      xpRequired: 300,
      levels: [
        { id: 1, name: 'El camino de baldosas', type: 'sequence', step: 1, max: 20 },
        { id: 2, name: 'Pasos dobles',           type: 'sequence', step: 2, max: 20 },
        { id: 3, name: 'El salto del guerrero',  type: 'sequence', step: 5, max: 50 },
        { id: 4, name: 'El orden del laberinto', type: 'ordering', max: 20 },
        { id: 5, name: '¡Maestro del laberinto!', type: 'sequence', mixed: true, max: 50 },
      ]
    }
  ],

  getWorld(id) {
    return this.worlds.find(w => w.id === id);
  },

  getLevel(worldId, levelId) {
    const world = this.getWorld(worldId);
    return world ? world.levels.find(l => l.id === levelId) : null;
  }
};
