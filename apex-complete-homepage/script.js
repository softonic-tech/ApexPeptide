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

const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (motionOk) {
try {
  const mark = (selector, type, delayStep) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add('reveal', `reveal-${type}`);
      el.style.setProperty('--reveal-delay', `${index * (delayStep || 0)}ms`);
    });
  };

  const splitWords = (selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      const process = (parent) => {
        [...parent.childNodes].forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const parts = node.textContent.split(/(\s+)/);
            if (parts.length === 1 && !parts[0].trim()) return;
            const frag = document.createDocumentFragment();
            parts.forEach((part) => {
              if (!part) return;
              if (!part.trim()) {
                frag.appendChild(document.createTextNode(part));
                return;
              }
              const span = document.createElement('span');
              span.className = 'word';
              span.textContent = part;
              frag.appendChild(span);
            });
            parent.replaceChild(frag, node);
          } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
            if (node.classList.contains('period')) node.classList.add('word');
            else process(node);
          }
        });
      };
      process(el);
      el.querySelectorAll('.word').forEach((word, index) => {
        word.style.setProperty('--word-delay', `${index * 58}ms`);
      });
      el.classList.add('reveal', 'word-split');
    });
  };

  mark('.apex-products .section-copy .eyebrow, .apex-products .section-copy .intro', 'mask', 140);
  splitWords('.apex-products .section-copy h1');
  mark('.apex-products .view-all', 'left');
  mark('.apex-products .product-card', 'card', 150);
  mark('.apex-standards .showcase-copy .eyebrow, .apex-standards .showcase-copy .lead', 'mask', 120);
  splitWords('.apex-standards .showcase-copy h1');
  mark('.apex-standards .showcase-copy .text-link', 'up');
  mark('.apex-standards .principle', 'up', 170);
  mark('.apex-standards .service-strip a', 'up', 110);
  mark('.apex-ending .cta-copy .eyebrow, .apex-ending .cta-copy > p:not(.eyebrow)', 'mask', 120);
  splitWords('.apex-ending .cta-copy h1');
  mark('.apex-ending .cta-copy .primary-button', 'up');
  mark('.apex-ending .notice', 'soft');
  mark('.apex-ending .contact .section-label, .apex-ending .contact-lead', 'mask', 100);
  splitWords('.apex-ending .contact h2');
  mark('.apex-ending .contact-item', 'up', 140);
  mark('.apex-ending .footer-grid > *', 'up', 100);
  mark('.apex-ending .footer-bottom', 'soft');

  document.querySelectorAll('.apex-standards .showcase-visual, .apex-ending .cta-visual').forEach((el) => {
    el.classList.add('reveal', 'reveal-fade');
  });

  const revealItems = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('in'));
  } else {
    const reveal = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach((el) => reveal.observe(el));
  }

  const driftItems = [
    { el: document.querySelector('.apex-standards .showcase-visual'), speed: 0.12 },
    { el: document.querySelector('.apex-ending .cta-visual'), speed: 0.1 }
  ].filter((item) => item.el);

  if (driftItems.length) {
    const tick = () => {
      driftItems.forEach(({ el, speed }) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
        const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${mid * -speed}px, 0)`;
      });
      window.requestAnimationFrame(tick);
    };
    tick();
  }
} catch (err) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
}
}
