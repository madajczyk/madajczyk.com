document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.querySelector('.navbar-menu');
  
  if (burger && menu) {
    const setMenuOpen = (isOpen) => {
      burger.classList.toggle('is-active', isOpen);
      menu.classList.toggle('is-active', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    };

    burger.addEventListener('click', () => {
      const isOpen = !menu.classList.contains('is-active');
      setMenuOpen(isOpen);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-active')) {
        setMenuOpen(false);
        burger.focus();
      }
    });
  }
});
