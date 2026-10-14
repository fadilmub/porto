/* =========================================================
   Fadil Mubarok — Portfolio
   script.js
   Fitur:
   - Mobile nav toggle
   - Smooth anchor scroll + close menu on click
   - Auto year di footer
   - Tombol "kembali ke atas" melayang
   - Reveal on scroll (IntersectionObserver)
   - Header shadow saat scroll
   ========================================================= */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    });

    // Tutup menu saat link diklik (mobile)
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-open')) {
          navMenu.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Buka menu navigasi');
        }
      });
    });

    // Tutup menu saat klik di luar
    document.addEventListener('click', (e) => {
      if (!navMenu.classList.contains('is-open')) return;
      if (navMenu.contains(e.target) || navToggle.contains(e.target)) return;
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });

    // Tutup menu saat Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ---------- 2. Smooth scroll untuk anchor ---------- */
  // Catatan: html sudah pakai scroll-behavior: smooth di CSS.
  // Kode ini hanya sebagai fallback jika ada browser yang mengabaikannya.
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 72;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });

  /* ---------- 3. Auto year di footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- 4. Tombol "kembali ke atas" melayang ---------- */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    const toggleToTop = () => {
      if (window.scrollY > 500) toTop.classList.add('is-visible');
      else toTop.classList.remove('is-visible');
    };
    window.addEventListener('scroll', toggleToTop, { passive: true });
    toggleToTop();

    toTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* ---------- 5. Header shadow saat scroll ---------- */
  const header = document.getElementById('siteHeader');
  if (header) {
    const toggleHeader = () => {
      if (window.scrollY > 8) header.style.boxShadow = '0 8px 24px -18px rgba(15,23,42,.35)';
      else header.style.boxShadow = 'none';
    };
    window.addEventListener('scroll', toggleHeader, { passive: true });
    toggleHeader();
  }

  /* ---------- 6. Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- 7. Placeholder link guard ---------- */
  // Cegah klik pada tautan yang belum tersedia (aria-disabled)
  document.querySelectorAll('a[aria-disabled="true"]').forEach((a) => {
    a.addEventListener('click', (e) => e.preventDefault());
  });

})();