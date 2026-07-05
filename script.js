document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Sticky navbar solid/gradient toggle ---------- */
  const nav = document.getElementById('navbar');
  const hero = document.getElementById('hero-video');

  function handleNavScroll() {
    if (nav) {
        // If there's no hero-video, keep the navbar solid.
        if (!hero) {
            nav.classList.remove('nav-gradient');
            nav.classList.add('nav-solid');
        } else {
            function handleNavScroll() {
            const threshold = Math.max(hero.offsetHeight - 120, 80);

            if (window.scrollY > threshold) {
                nav.classList.remove('nav-gradient');
                nav.classList.add('nav-solid');
            } else {
                nav.classList.add('nav-gradient');
                nav.classList.remove('nav-solid');
            }
            }

            window.addEventListener('scroll', handleNavScroll, { passive: true });
            handleNavScroll();
        }
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.dataset.counter;
        const target = parseFloat(raw);
        const isDecimal = raw.includes('.');
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const startTime = performance.now();

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = isDecimal ? (target * eased).toFixed(1) : Math.floor(target * eased);
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  }
});

/* ---------- Horizontal gallery scroller ---------- */
function scrollGallery(id, dir) {
  const el = document.getElementById(id);
  if (!el) return;
  const amount = el.clientWidth * 0.85;
  el.scrollBy({ left: dir * amount, behavior: 'smooth' });
}