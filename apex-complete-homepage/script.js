// Mobile hero navigation. The panel is CSS-hidden above the mobile breakpoint.
const mobileNav = document.querySelector('.mh-nav');
const mobileNavToggle = document.querySelector('.mh-menu');

if (mobileNav && mobileNavToggle) {
  const setMobileNav = (open) => {
    mobileNav.classList.toggle('open', open);
    mobileNavToggle.setAttribute('aria-expanded', String(open));
    mobileNavToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  mobileNavToggle.addEventListener('click', () => {
    setMobileNav(!mobileNav.classList.contains('open'));
  });

  mobileNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMobileNav(false);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.mh-bar')) setMobileNav(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileNav.classList.contains('open')) {
      setMobileNav(false);
      mobileNavToggle.focus();
    }
  });
}

// Demo-only cart interaction. Replace this with your store's cart API.
document.querySelectorAll('.cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    button.textContent = 'Added to cart ✓';
    button.setAttribute('aria-label', `${name} added to cart (visual demo)`);
    window.setTimeout(() => {
      button.innerHTML = 'Add to Cart <span aria-hidden="true">→</span>';
      button.setAttribute('aria-label', `Add ${name} to cart`);
    }, 1600);
  });
});
