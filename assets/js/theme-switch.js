// theme-switch.js
(function() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // 1. Check local storage
  // 2. Check system preference
  // 3. Default to dark (since we just made a black theme) or light

  function getPreferredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun'); // Show sun icon when in dark mode (to switch to light)
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon'); // Show moon icon when in light mode
      }
    }
    localStorage.setItem('theme', theme);
  }

  // Initialize
  setTheme(getPreferredTheme());

  // Event Listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }
})();
