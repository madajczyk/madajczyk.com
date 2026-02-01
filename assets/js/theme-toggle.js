document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    if (!toggleButton) return;

    const storageKey = 'theme';

    function setTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
        updateIcon(isDark);
    }

    function updateIcon(isDark) {
        if (!toggleButton) return;
        const sunIcon = toggleButton.querySelector('.icon-sun');
        const moonIcon = toggleButton.querySelector('.icon-moon');
        if (isDark) {
            sunIcon.style.display = 'inline-flex';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-flex';
        }
    }

    // Initialize icon state
    const currentTheme = document.documentElement.getAttribute('data-theme');
    updateIcon(currentTheme === 'dark');

    toggleButton.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(!isDark);
    });
});
