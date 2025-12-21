// theme-switch.js
(function() {
  const themeIconId = 'theme-icon';

  function getPreferredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    const themeIcon = document.getElementById(themeIconId);
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
    localStorage.setItem('theme', theme);
  }

  // Initialize
  setTheme(getPreferredTheme());

  // Event Listener with Delegation
  document.addEventListener('click', (event) => {
    const toggleBtn = event.target.closest('#theme-toggle-btn');
    if (toggleBtn) {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }
  });
})();
