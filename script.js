/* ============================================================
   AZZI PORTFOLIO — Script
   Typewriter + project filter + scroll reveal + nav highlight
   ============================================================ */

  /* ───── TYPEWRITER ───── */
  (function() {
    var el = document.getElementById('rotating-text');
    if (!el) return;

    var phrases = [
      'harden network defences.',
      'find and patch vulnerabilities.',
      'design secure cloud architectures.',
      'analyse digital evidence.',
      'build intrusion detection systems.',
      'write exploit-proof code.',
      'respond to security incidents.',
      'architect zero-trust networks.'
    ];

    var i = 0;        // phrase index
    var j = 0;        // char index
    var deleting = false;
    var speed = 60;   // ms per char

    function tick() {
      var phrase = phrases[i];

      if (!deleting) {
        // Typing forward
        el.textContent = phrase.substring(0, j + 1);
        j++;

        if (j === phrase.length) {
          // Finished typing — pause then delete
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        // Deleting
        el.textContent = phrase.substring(0, j - 1);
        j--;

        if (j === 0) {
          // Finished deleting — move to next phrase
          deleting = false;
          i = (i + 1) % phrases.length;
          setTimeout(tick, 300);
          return;
        }

        speed = 30; // delete faster
      }

      speed = deleting ? 30 : 60;
      setTimeout(tick, speed + Math.random() * 30);
    }

    tick();
  })();

document.addEventListener('DOMContentLoaded', () => {

  /* ───── PROJECT FILTER ───── */
  const filterBar = document.getElementById('filter-bar');
  const projectGrid = document.getElementById('project-grid');

  if (filterBar && projectGrid) {
    const pills = filterBar.querySelectorAll('.filter-pill');
    const cards = projectGrid.querySelectorAll('.project-card');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const filter = pill.getAttribute('data-filter');

        // Update active pill
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        // Show/hide cards (instant — no animation)
        cards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ───── SCROLL REVEAL ───── */
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!motionQuery.matches) {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0,
      rootMargin: '0px 0px 0px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Show everything immediately if user prefers reduced motion
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ───── ACTIVE NAV HIGHLIGHT ───── */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });

          // If hero is in view (no id match), deactivate all
          if (!id) {
            navLinks.forEach(link => link.classList.remove('active'));
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-56px 0px 0px 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  /* ───── SCROLL-TO-TOP ───── */
  const scrollTopBtn = document.getElementById('scroll-top');

  if (scrollTopBtn) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
          } else {
            scrollTopBtn.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
