/* ============================================
   EDUTEACH — MAIN JAVASCRIPT
   ============================================ */

'use strict';

// --- CUSTOM CURSOR ---
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  if (!cursor || !dot) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }

  animateCursor();
})();


// --- NAV SCROLL EFFECT ---
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();


// --- MOBILE MENU ---
(function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  let isOpen = false;

  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    menu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      isOpen = false;
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();


// --- SCROLL REVEAL ---
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();


// --- COUNTER ANIMATION ---
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('id-ID');
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
})();


// --- DASHBOARD CHART ANIMATION ---
(function initChartAnimation() {
  const bars = document.querySelectorAll('.dm-chart-bar');
  if (!bars.length) return;

  let animated = false;

  function animateBars() {
    if (animated) return;
    animated = true;
    bars.forEach((bar, i) => {
      const originalHeight = bar.style.height;
      bar.style.height = '0%';
      bar.style.transition = `height 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.08}s`;
      setTimeout(() => {
        bar.style.height = originalHeight;
      }, 100);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateBars();
    });
  }, { threshold: 0.3 });

  const mockup = document.querySelector('.dashboard-mockup');
  if (mockup) observer.observe(mockup);
})();


// --- CTA FORM SUBMIT ---
(function initForm() {
  const form = document.getElementById('ctaForm');
  const toast = document.getElementById('toast');
  if (!form || !toast) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.cta-input');
    const email = input.value.trim();
    if (!email) return;

    // Show toast
    toast.classList.add('show');
    input.value = '';

    // Animate button feedback
    const btn = form.querySelector('.btn-primary');
    btn.style.background = '#10b981';
    btn.querySelector('span').textContent = 'Terkirim!';

    setTimeout(() => {
      toast.classList.remove('show');
      btn.style.background = '';
      btn.querySelector('span').textContent = 'Daftar Gratis';
    }, 4000);
  });
})();


// --- SMOOTH ANCHOR SCROLL ---
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


// --- PARALLAX ORBS ---
(function initParallax() {
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (!orb1 || !orb2) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      orb1.style.transform = `translateY(${y * 0.15}px)`;
      orb2.style.transform = `translateY(${-y * 0.1}px)`;
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();


// --- FITUR CARD MOUSE GLOW EFFECT ---
(function initCardGlow() {
  const cards = document.querySelectorAll('.fitur-card, .testi-card, .harga-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });
})();


// --- ACTIVE NAV LINK ON SCROLL ---
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
})();


// --- INIT LOG ---
console.log('%c EduTeach 🎓 ', 'background:#4f7cff;color:#fff;padding:6px 14px;border-radius:6px;font-size:14px;font-weight:bold;');
console.log('%c Platform Digital untuk Guru Indonesia ', 'color:#9aa3b8;font-size:12px;');