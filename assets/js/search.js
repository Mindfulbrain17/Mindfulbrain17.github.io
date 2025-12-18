// search.js
(function() {
  const searchToggleBtn = document.getElementById('search-toggle-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchCloseBtn = document.getElementById('search-overlay-close');
  const searchInput = document.getElementById('search-overlay-input');
  const searchResultsList = document.getElementById('search-overlay-results-list');
  let idx = null;
  let store = null;

  // Open Search
  if (searchToggleBtn) {
    searchToggleBtn.addEventListener('click', function() {
      searchOverlay.classList.add('is-active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      searchInput.focus();

      // Load Lunr and Index if not already loaded
      if (!idx) {
        loadSearch();
      }
    });
  }

  // Close Search
  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', closeSearch);
  }

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay.classList.contains('is-active')) {
      closeSearch();
    }
  });

  function closeSearch() {
    searchOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
    searchInput.value = '';
    searchResultsList.innerHTML = '';
  }

  function loadSearch() {
    // We need to fetch the JSON data first
    // Assuming search-data.json is at /assets/js/search-data.json
    // We can't use fetch easily in static sites without knowing baseurl perfectly,
    // but we can rely on the fact that we loaded it via script tag in the previous implementation.
    // However, to make this robust, let's fetch it.

    // Actually, in the previous step, I included search-data.json as a script which sets window.store.
    // Let's check if we can reuse that pattern or just fetch.
    // The previous implementation used <script src="search-data.json"></script> which is weird because it's JSON.
    // It should be fetched.

    // Let's try to fetch it.
    fetch('/assets/js/search-data.json')
      .then(response => response.json())
      .then(data => {
        store = {};
        // transform array to object map for display
        data.forEach((item, index) => {
          item.id = index;
          store[index] = item;
        });

        idx = lunr(function () {
          this.field('id');
          this.field('title', { boost: 10 });
          this.field('category');
          this.field('content');

          for (let key in store) {
            this.add({
              'id': store[key].id,
              'title': store[key].title,
              'category': store[key].category,
              'content': store[key].content
            });
          }
        });
      })
      .catch(err => console.error('Error loading search data:', err));
  }

  // Perform Search
  if (searchInput) {
    searchInput.addEventListener('keyup', function() {
      const query = this.value;
      if (!query || !idx) {
        searchResultsList.innerHTML = '';
        return;
      }

      const results = idx.search(query);
      displayResults(results);
    });
  }

  function displayResults(results) {
    if (results.length) {
      let html = '';
      results.forEach(result => {
        const item = store[result.ref];
        html += `
          <li>
            <a href="${item.url}">
              <h3>${item.title}</h3>
              <p>${item.content.substring(0, 100)}...</p>
            </a>
          </li>
        `;
      });
      searchResultsList.innerHTML = html;
    } else {
      searchResultsList.innerHTML = '<li class="no-results">No results found</li>';
    }
  }
})();
