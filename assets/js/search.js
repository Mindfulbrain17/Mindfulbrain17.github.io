// search.js
(function() {
  const searchOverlayId = 'search-overlay';
  const searchInputId = 'search-overlay-input';
  const searchResultsListId = 'search-overlay-results-list';
  let idx = null;
  let store = null;
  let isLoading = false;

  function openSearch() {
    const searchOverlay = document.getElementById(searchOverlayId);
    const searchInput = document.getElementById(searchInputId);
    if (!searchOverlay) return;

    searchOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    if (searchInput) searchInput.focus();

    // Load Lunr and Index if not already loaded
    if (!idx && !isLoading) {
      loadSearch();
    }
  }

  function closeSearch() {
    const searchOverlay = document.getElementById(searchOverlayId);
    const searchInput = document.getElementById(searchInputId);
    const searchResultsList = document.getElementById(searchResultsListId);

    if (searchOverlay) searchOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (searchResultsList) searchResultsList.innerHTML = '';
  }

  function loadSearch() {
    isLoading = true;
    // Fetch using the global baseurl variable
    const base = window.baseurl || '';
    fetch(base + '/assets/js/search-data.json')
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
        isLoading = false;
      })
      .catch(err => {
        console.error('Error loading search data:', err);
        isLoading = false;
      });
  }

  function performSearch(query) {
    const searchResultsList = document.getElementById(searchResultsListId);
    if (!searchResultsList) return;

    if (!query || !idx) {
      searchResultsList.innerHTML = '';
      return;
    }

    const results = idx.search(query);
    displayResults(results);
  }

  function displayResults(results) {
    const searchResultsList = document.getElementById(searchResultsListId);
    if (!searchResultsList) return;

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

  // Event Delegation
  document.addEventListener('click', (event) => {
    // Open Search
    if (event.target.closest('#search-toggle-btn')) {
      openSearch();
    }
    // Close Search
    if (event.target.closest('#search-overlay-close')) {
      closeSearch();
    }
  });

  // Keydown events
  document.addEventListener('keydown', (e) => {
    const searchOverlay = document.getElementById(searchOverlayId);
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('is-active')) {
      closeSearch();
    }
  });

  // Input event (delegated or direct, direct is better for input)
  // Since the input is always in the DOM (in the overlay), we can try to attach it directly,
  // but if the overlay is dynamically inserted (it's not, it's in default.html), direct is fine.
  // However, to be safe against any weird loading order, let's use delegation for input too if possible,
  // but 'keyup' on document for a specific ID is fine.

  document.addEventListener('keyup', (event) => {
    if (event.target && event.target.id === searchInputId) {
       performSearch(event.target.value);
    }
  });

})();
