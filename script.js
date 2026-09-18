/* ============================================================
   MAMIDI BRAHMANI PORTFOLIO — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Custom cursor ──────────────────────────────────────────
  const dot   = document.getElementById('cursorDot');
  const ring  = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    });

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .skill-group, .project-card, .cert-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  // ── Nav scroll effect ──────────────────────────────────────
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('[data-nav]');

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  const ioNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => ioNav.observe(s));

  // ── Mobile menu ────────────────────────────────────────────
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    document.body.style.overflow = open ? 'hidden' : '';
    const spans = menuBtn.querySelectorAll('span');
    if (open) {
      spans[0].style.cssText = 'transform: rotate(45deg) translate(5px,5px)';
      spans[1].style.cssText = 'opacity: 0';
      spans[2].style.cssText = 'transform: rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      menuBtn.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });

  // ── Typing effect ──────────────────────────────────────────
  const roles = [
    'Cybersecurity Student',
    'Frontend Developer',
    'React.js Builder',
    'CTF Enthusiast',
    'Problem Solver',
  ];
  let rIdx = 0, cIdx = 0, deleting = false;
  const roleEl = document.getElementById('roleText');

  function type() {
    if (!roleEl) return;
    const word = roles[rIdx];
    if (!deleting) {
      roleEl.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) { deleting = true; return setTimeout(type, 1800); }
      setTimeout(type, 80);
    } else {
      roleEl.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
      setTimeout(type, 45);
    }
  }
  setTimeout(type, 1400);

  // ── Scroll reveal ──────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const ioReveal = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
        ioReveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => ioReveal.observe(el));

  // ── Skill bars ─────────────────────────────────────────────
  const skillGroups = document.querySelectorAll('.skill-group');
  const ioSkills = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.sb-fill').forEach(fill => {
          fill.classList.add('animated');
        });
        ioSkills.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillGroups.forEach(g => ioSkills.observe(g));

  // ── Soft skill bars ────────────────────────────────────────
  const sspPanel = document.querySelector('.soft-skills-panel');
  if (sspPanel) {
    const ioSsp = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        sspPanel.querySelectorAll('.ssp-fill').forEach(fill => {
          fill.style.width = fill.dataset.pct + '%';
        });
        ioSsp.unobserve(sspPanel);
      }
    }, { threshold: 0.3 });
    ioSsp.observe(sspPanel);
  }

  // ── Smooth anchor scroll ───────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = document.getElementById('nav').offsetHeight;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

});
