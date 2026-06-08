const CURRICULUM = {
  worlds: [
    {
      id: 1,
      name: 'Sumas',
      emoji: '🍎',
      color: '#FF6B6B',
      darkColor: '#E85555',
      lightColor: '#FFF0F0',
      xpRequired: 0,
      levels: [
        { id: 1, name: 'Sumas pequeñas', type: 'addition', max: 5, visual: true },
        { id: 2, name: 'Sumas hasta 10', type: 'addition', max: 10, visual: true },
        { id: 3, name: 'Más y más sumas', type: 'addition', max: 15, visual: false },
        { id: 4, name: 'Completa la suma', type: 'addition_fill', max: 10 },
        { id: 5, name: '¡Maestro sumador!', type: 'addition', max: 20, visual: false },
      ]
    },
    {
      id: 2,
      name: 'Restas',
      emoji: '🎈',
      color: '#4ECDC4',
      darkColor: '#3AB5AC',
      lightColor: '#F0FFFE',
      xpRequired: 50,
      levels: [
        { id: 1, name: 'Restas pequeñas', type: 'subtraction', max: 5, visual: true },
        { id: 2, name: 'Restas hasta 10', type: 'subtraction', max: 10, visual: true },
        { id: 3, name: 'Más restas', type: 'subtraction', max: 15, visual: false },
        { id: 4, name: 'Completa la resta', type: 'subtraction_fill', max: 10 },
        { id: 5, name: '¡Maestro restador!', type: 'subtraction', max: 20, visual: false },
      ]
    },
    {
      id: 3,
      name: 'Multiplicación',
      emoji: '⭐',
      color: '#FFB347',
      darkColor: '#E89020',
      lightColor: '#FFFDE7',
      xpRequired: 150,
      levels: [
        { id: 1, name: 'Tabla del 2', type: 'multiplication', table: 2 },
        { id: 2, name: 'Tabla del 3', type: 'multiplication', table: 3 },
        { id: 3, name: 'Tabla del 4', type: 'multiplication', table: 4 },
        { id: 4, name: 'Tabla del 5', type: 'multiplication', table: 5 },
        { id: 5, name: '¡Maestro ×!', type: 'multiplication', table: null, mixed: [2, 3, 4, 5] },
      ]
    },
    {
      id: 4,
      name: 'Divisiones',
      emoji: '➗',
      color: '#06D6A0',
      darkColor: '#05A87D',
      lightColor: '#F0FFF8',
      xpRequired: 200,
      levels: [
        { id: 1, name: 'Dividir entre 2',       type: 'division',      divisor: 2 },
        { id: 2, name: 'Dividir entre 3 y 4',   type: 'division',      divisors: [3, 4] },
        { id: 3, name: 'Dividir entre 5 y 10',  type: 'division',      divisors: [5, 10] },
        { id: 4, name: 'Completa la división',  type: 'division_fill', maxDivisor: 5 },
        { id: 5, name: '¡Maestro divisor!',     type: 'division',      mixed: true },
      ]
    },
    {
      id: 5,
      name: 'Secuencias',
      emoji: '🔢',
      color: '#C77DFF',
      darkColor: '#A855E8',
      lightColor: '#F8F0FF',
      xpRequired: 300,
      levels: [
        { id: 1, name: 'Cuenta de 1 en 1', type: 'sequence', step: 1, max: 20 },
        { id: 2, name: 'Cuenta de 2 en 2', type: 'sequence', step: 2, max: 20 },
        { id: 3, name: 'Cuenta de 5 en 5', type: 'sequence', step: 5, max: 50 },
        { id: 4, name: 'Ordena los números', type: 'ordering', max: 20 },
        { id: 5, name: '¡Maestro de series!', type: 'sequence', mixed: true, max: 50 },
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
