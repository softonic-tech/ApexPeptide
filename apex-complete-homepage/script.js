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
