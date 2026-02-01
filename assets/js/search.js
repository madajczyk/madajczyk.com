document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('search-modal');
  const openBtn = document.getElementById('search-trigger');
  if (!modal || !openBtn) return;

  const closeBtn = modal.querySelector('.modal-close');
  const closeTrigger = modal.querySelector('.modal-close-trigger');
  const bg = modal.querySelector('.modal-background');
  const input = document.getElementById('search-input');
  const resultsDiv = document.getElementById('search-results');
  let fuse;
  let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

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

  const toggleModal = () => {
    modal.classList.toggle('is-active');
    if (modal.classList.contains('is-active')) {
      input.value = '';
      resultsDiv.innerHTML = '';
      updateRecentSearchesUI();
      input.focus();
      if (!fuse) loadSearch();
    }
  };

  const saveSearch = (term) => {
    if (!term || term.length < 3) return;
    recentSearches = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  };

  openBtn.addEventListener('click', toggleModal);
  if (closeBtn) closeBtn.addEventListener('click', toggleModal);
  if (closeTrigger) closeTrigger.addEventListener('click', toggleModal);
  if (bg) bg.addEventListener('click', toggleModal);
  
  // Close on Escape
  document.addEventListener('keydown', (e) => {
      if(e.key === "Escape" && modal.classList.contains('is-active')) {
          toggleModal();
      }
  });

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
            threshold: 0.4,
            ignoreLocation: true,
            minMatchCharLength: 3
        };
        // Ensure Fuse is defined (loaded via CDN)
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

            // Save search term on enter or when a result is clicked
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
    
    const html = results.slice(0, 10).map(result => {
        const item = result.item;
        return `
            <a href="${item.permalink}" class="search-result-item box is-shadowless mb-2 p-3" onclick="saveSearch('${input.value.replace(/'/g, "\\'")}');">
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
  }
});
