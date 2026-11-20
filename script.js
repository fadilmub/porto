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
   - Scroll progress bar
   - Stagger reveal (kartu muncul bergantian)
   - Dark mode toggle (tersimpan)
   - Scrollspy nav aktif
   - Canvas jaringan bergerak di hero
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

  /* ---------- 8. Scroll progress bar ---------- */
  const progress = document.getElementById('scrollProgress');
  if (progress) {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------- 9. Stagger reveal: kartu muncul bergantian ---------- */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.skills, .projects, .contact-grid').forEach((group) => {
      group.querySelectorAll(':scope > .reveal').forEach((el, i) => {
        el.style.transitionDelay = (i * 90) + 'ms';
      });
    });
    document.querySelectorAll('.timeline').forEach((group) => {
      group.querySelectorAll(':scope > .timeline__item.reveal').forEach((el, i) => {
        el.style.transitionDelay = (i * 110) + 'ms';
      });
    });
  }


  /* ---------- 10. Dark mode toggle ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = (() => {
    try { return localStorage.getItem('porto-theme'); } catch (e) { return null; }
  })();
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.setAttribute('data-theme', 'dark');
  }
  const syncThemeToggle = () => {
    if (!themeToggle) return;
    const isDark = root.getAttribute('data-theme') === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
  };
  syncThemeToggle();
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('porto-theme', isDark ? 'light' : 'dark'); } catch (e) { /* abaikan */ }
      syncThemeToggle();
    });
  }

  /* ---------- 11. Scrollspy: nav aktif ikut section ---------- */
  const spyLinks = Array.from(document.querySelectorAll('.nav__menu .nav__link[href^="#"]'));
  const spySections = spyLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window && spySections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          spyLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
          });
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    spySections.forEach((section) => spy.observe(section));
  }

  /* ---------- 12. Canvas jaringan bergerak di hero ---------- */
  const canvas = document.getElementById('netCanvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const hero = canvas.closest('.hero');
    let points = [];
    let raf = null;

    const buildPoints = () => {
      const rect = hero.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(60, Math.floor((rect.width * rect.height) / 22000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1.4 + Math.random() * 1.6
      }));
    };

    const drawOnce = () => {
      const rect = hero.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      points.forEach((pt) => {
        ctx.fillStyle = 'rgba(37, 99, 235, 0.55)';
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2); ctx.fill();
      });
    };

    const draw = () => {
      const rect = hero.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        pt.x += pt.vx; pt.y += pt.vy;
        if (pt.x < 0 || pt.x > rect.width) pt.vx *= -1;
        if (pt.y < 0 || pt.y > rect.height) pt.vy *= -1;
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = pt.x - q.x, dy = pt.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.strokeStyle = 'rgba(37, 99, 235,' + (0.14 * (1 - dist / 130)).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(pt.x, pt.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = 'rgba(37, 99, 235, 0.55)';
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    buildPoints();
    if (prefersReducedMotion) {
      drawOnce();
    } else {
      raf = requestAnimationFrame(draw);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null; }
        else if (!raf) raf = requestAnimationFrame(draw);
      });
    }
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { buildPoints(); if (prefersReducedMotion) drawOnce(); }, 200);
    });
    window.addEventListener('load', () => { buildPoints(); if (prefersReducedMotion) drawOnce(); });
  }

  /* ---------- 7. Placeholder link guard ---------- */
  // Cegah klik pada tautan yang belum tersedia (aria-disabled)
  document.querySelectorAll('a[aria-disabled="true"]').forEach((a) => {
    a.addEventListener('click', (e) => e.preventDefault());
  });

})();