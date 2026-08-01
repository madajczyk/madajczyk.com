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

  // Build detached nodes and assign text via textContent so untrusted values
  // are never parsed as HTML.
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  // Only same-scheme http(s) links are allowed through; blocks javascript:/data: URLs.
  const safeHref = (value) => {
    if (typeof value !== 'string') return '#';
    try {
      const parsed = new URL(value, window.location.origin);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.href : '#';
    } catch {
      return '#';
    }
  };

  // localStorage is untrusted input: malformed JSON here used to throw and break search entirely.
  const loadRecentSearches = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((term) => typeof term === 'string').slice(0, 5);
    } catch (err) {
      console.warn('Discarding malformed recentSearches from localStorage', err);
      return [];
    }
  };

  let recentSearches = loadRecentSearches();

  const getFocusableElements = () => Array.from(
    modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
  ).filter((element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'));

  const updateRecentSearchesUI = () => {
    if (recentSearches.length === 0) return;

    const wrapper = el('div', 'mb-4');
    wrapper.append(el('p', 'is-size-7 has-text-grey mb-2', 'Recent Searches:'));

    const tags = el('div', 'tags');
    recentSearches.forEach((term) => {
      const tag = el('span', 'tag is-info is-light is-clickable recent-search-tag mr-2 mb-2', term);
      tag.dataset.term = term;
      tag.addEventListener('click', () => {
        input.value = term;
        input.dispatchEvent(new Event('input'));
      });
      tags.append(tag);
    });

    wrapper.append(tags);
    resultsDiv.replaceChildren(wrapper);
  };

  const openModal = () => {
    lastFocusedElement = document.activeElement;
    if (!modal.open) {
      modal.showModal();
    }

    modal.classList.add('is-active');
    openBtn.setAttribute('aria-expanded', 'true');
    input.value = '';
    resultsDiv.replaceChildren();
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
        resultsDiv.replaceChildren(
          el('p', 'has-text-danger', 'Failed to load search. Please try again later.')
        );
    }
  }

  const formatYear = (date) => {
    if (!date) return '';
    const year = new Date(date).getFullYear();
    return Number.isFinite(year) ? String(year) : '';
  };

  const buildResultItem = (item) => {
    const link = el('a', 'search-result-item box is-shadowless mb-2 p-3');
    link.href = safeHref(item.permalink);

    const columns = el('div', 'columns is-mobile is-vcentered is-gapless mb-1');
    const titleColumn = el('div', 'column');
    titleColumn.append(el('h4', 'title is-6 has-text-weight-bold mb-0', item.title ?? ''));
    const yearColumn = el('div', 'column is-narrow');
    yearColumn.append(el('span', 'tag is-light is-rounded', formatYear(item.date)));
    columns.append(titleColumn, yearColumn);

    const summary = item.summary ? `${String(item.summary).substring(0, 100)}...` : '';
    link.append(columns, el('p', 'is-size-7 is-italic mb-2 has-text-grey', summary));

    link.addEventListener('click', () => saveSearch(input.value));
    return link;
  };

  function displayResults(results) {
    if (results.length === 0) {
        resultsDiv.replaceChildren(el('div', 'notification is-light', 'No results found.'));
        return;
    }

    resultsDiv.replaceChildren(
      ...results.slice(0, resultLimit).map((result) => buildResultItem(result.item))
    );
  }
});
