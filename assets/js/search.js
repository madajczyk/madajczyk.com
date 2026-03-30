document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('search-modal');
  const openBtn = document.getElementById('search-trigger');
  if (!modal || !openBtn || typeof modal.showModal !== 'function') return;

  const closeTrigger = modal.querySelector('.modal-close-trigger');
  const input = document.getElementById('search-input');
  const resultsDiv = document.getElementById('search-results');
  const resultLimit = Number.parseInt(modal.dataset.searchResultLimit || '10', 10);
  const searchThreshold = Number.parseFloat(modal.dataset.searchThreshold || '0.4');
  let lastFocusedElement = null;
  let fuse;
  let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

  const getFocusableElements = () => Array.from(
    modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
  ).filter((element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'));

  const updateRecentSearchesUI = () => {
    if (recentSearches.length === 0) return;
    const tagsHtml = recentSearches.map(term => `
      <span class="tag is-info is-light is-clickable recent-search-tag mr-2 mb-2" data-term="${term}">${term}</span>
    `).join('');
    
    resultsDiv.innerHTML = `
      <div class="mb-4">
        <p class="is-size-7 has-text-grey mb-2">Recent Searches:</p>
        <div class="tags">${tagsHtml}</div>
      </div>
    `;

    resultsDiv.querySelectorAll('.recent-search-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        input.value = tag.dataset.term;
        input.dispatchEvent(new Event('input'));
      });
    });
  };

  const openModal = () => {
    lastFocusedElement = document.activeElement;
    if (!modal.open) {
      modal.showModal();
    }

    modal.classList.add('is-active');
    openBtn.setAttribute('aria-expanded', 'true');
    input.value = '';
    resultsDiv.innerHTML = '';
    updateRecentSearchesUI();
    input.focus();
    if (!fuse) loadSearch();
  };

  const closeModal = () => {
    if (!modal.open) return;

    modal.classList.remove('is-active');
    modal.close();
    openBtn.setAttribute('aria-expanded', 'false');
    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    } else {
      openBtn.focus();
    }
  };

  const handleTrapFocus = (event) => {
    if (event.key !== 'Tab' || !modal.open) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  modal.addEventListener('keydown', handleTrapFocus);

  modal.addEventListener('close', () => {
    modal.classList.remove('is-active');
    openBtn.setAttribute('aria-expanded', 'false');
  });

  openBtn.addEventListener('click', openModal);
  if (closeTrigger) closeTrigger.addEventListener('click', closeModal);
  
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.open) {
          e.preventDefault();
          closeModal();
      }
  });

  if (modal.open) {
      modal.classList.add('is-active');
      openBtn.setAttribute('aria-expanded', 'true');
      if (!fuse) loadSearch();
  }

  const saveSearch = (term) => {
    if (!term || term.length < 3) return;
    recentSearches = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  };

  async function loadSearch() {
    try {
        const response = await fetch('/search.json');
        const data = await response.json();
        
        const options = {
            keys: [
                { name: 'title', weight: 0.7 },
                { name: 'tags', weight: 0.6 },
                { name: 'content', weight: 0.3 }
            ],
            threshold: searchThreshold,
            ignoreLocation: true,
            minMatchCharLength: 3
        };
        if (typeof Fuse !== 'undefined') {
            fuse = new Fuse(data, options);
            
            input.addEventListener('input', (e) => {
                const query = e.target.value;
                if (query.length < 2) {
                    updateRecentSearchesUI();
                    return;
                }
                const results = fuse.search(query);
                displayResults(results);
            });

            input.addEventListener('keydown', (e) => {
              if (e.key === 'Enter') saveSearch(input.value);
            });
        }
    } catch (err) {
        console.error("Failed to load search index", err);
        resultsDiv.innerHTML = '<p class="has-text-danger">Failed to load search. Please try again later.</p>';
    }
  }

  function displayResults(results) {
    if (results.length === 0) {
        resultsDiv.innerHTML = '<div class="notification is-light">No results found.</div>';
        return;
    }
    
    const html = results.slice(0, resultLimit).map(result => {
        const item = result.item;
        return `
            <a href="${item.permalink}" class="search-result-item box is-shadowless mb-2 p-3">
                <div class="columns is-mobile is-vcentered is-gapless mb-1">
                    <div class="column">
                        <h4 class="title is-6 has-text-weight-bold mb-0">${item.title}</h4>
                    </div>
                    <div class="column is-narrow">
                        <span class="tag is-light is-rounded">${item.date ? new Date(item.date).getFullYear() : ''}</span>
                    </div>
                </div>
                <p class="is-size-7 is-italic mb-2 has-text-grey">${item.summary ? item.summary.substring(0, 100) + '...' : ''}</p>
            </a>
        `;
    }).join('');
    
    resultsDiv.innerHTML = html;
    resultsDiv.querySelectorAll('.search-result-item').forEach((item) => {
      item.addEventListener('click', () => {
        saveSearch(input.value);
      });
    });
  }
});
