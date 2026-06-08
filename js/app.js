const App = {
  state: {
    screen: 'home',
    currentWorld: null,
    currentLevel: null,
    lessonResult: null,
  },

  navigate(screen, data = {}) {
    Object.assign(this.state, data, { screen });
    this.render();
    window.scrollTo(0, 0);
  },

  render() {
    const app = document.getElementById('app');
    app.classList.remove('screen-visible');

    const screens = {
      home:    { render: () => HomeScreen.render(),    init: () => HomeScreen.init() },
      map:     { render: () => MapScreen.render(),     init: () => MapScreen.init() },
      lesson:  { render: () => LessonScreen.render(),  init: () => LessonScreen.init() },
      results: { render: () => ResultsScreen.render(), init: () => ResultsScreen.init() },
    };

    const s = screens[this.state.screen];
    if (!s) return;

    app.innerHTML = s.render();
    requestAnimationFrame(() => {
      app.classList.add('screen-visible');
      s.init();
    });
  },

  init() {
    this.render();
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await Storage.initSupabase();
  App.init();
});
