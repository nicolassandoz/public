/**
 * Nicolas Sandoz — Portfolio
 * script.js — Vanilla JS, no dependencies
 */

/* ============================================================
   1. Theme Toggle
   ============================================================ */
(function initTheme() {
  const html       = document.documentElement;
  const toggle     = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'ns-theme';

  /**
   * Apply a theme ('dark' | 'light') to the root element
   * and persist it in localStorage.
   */
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    const label = theme === 'dark'
      ? 'Basculer vers le thème clair'
      : 'Basculer vers le thème sombre';
    toggle.setAttribute('aria-label', label);
  }

  // Determine initial theme: persisted preference → OS preference → dark fallback
  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(stored ?? (prefersDark ? 'dark' : 'light'));

  // Toggle on click
  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Follow OS changes unless the user already made an explicit choice
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

/* ============================================================
   2. Mobile Navigation Toggle
   ============================================================ */
(function initMobileNav() {
  const burger    = document.getElementById('nav-burger');
  const navLinks  = document.querySelector('.nav-links');

  if (!burger || !navLinks) return;

  function setOpen(open) {
    navLinks.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  }

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  // Close when a nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
      setOpen(false);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();

/* ============================================================
   3. Header — shadow on scroll
   ============================================================ */
(function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
    { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
  );

  // Observe the hero section
  const hero = document.getElementById('hero');
  if (hero) observer.observe(hero);
})();

/* ============================================================
   4. Smooth Scroll for internal anchors
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ============================================================
   5. Active Nav Link on Scroll (Intersection Observer)
   ============================================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  /**
   * Map section id → nav link element for O(1) lookup.
   */
  const linkMap = new Map();
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap.set(href.slice(1), link);
    }
  });

  function setActive(id) {
    navLinks.forEach((l) => l.classList.remove('active'));
    const link = linkMap.get(id);
    if (link) link.classList.add('active');
  }

  // Use a 60 % middle band so the "active" section is clearly in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '-30% 0px -60% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
})();

/* ============================================================
   6. Reveal on Scroll (fade-in animations)
   ============================================================ */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // If the browser doesn't support IntersectionObserver, show everything
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve once revealed to free up resources
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ============================================================
   7. Staggered reveal for grid siblings
   ============================================================ */
(function initGridStagger() {
  /**
   * For each grid container, assign a CSS custom property
   * --stagger-index to each .reveal child so the CSS can apply
   * individual transition-delay values without hardcoding nth-child.
   */
  const grids = document.querySelectorAll(
    '.skills-grid, .projects-grid, .contact-cards, .about-grid'
  );

  grids.forEach((grid) => {
    const children = grid.querySelectorAll('.reveal');
    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.08}s`;
    });
  });
})();
