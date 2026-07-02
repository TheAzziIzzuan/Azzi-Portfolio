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

/* ───── PROJECT FILTER ───── */
(function() {
  var filterBar = document.getElementById('filter-bar');
  var projectGrid = document.getElementById('project-grid');
  var filterEmpty = document.getElementById('filter-empty');

  if (!filterBar || !projectGrid) return;

  var pills = filterBar.querySelectorAll('.filter-pill');
  var cards = projectGrid.querySelectorAll('.project-card');

  pills.forEach(function(pill) {
    pill.addEventListener('click', function() {
      var filter = pill.getAttribute('data-filter');

      pills.forEach(function(p) { p.classList.remove('active'); });
      pill.classList.add('active');

      var visible = 0;
      cards.forEach(function(card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (filterEmpty) {
        filterEmpty.hidden = visible > 0;
      }
    });
  });
})();

/* ───── ACTIVE NAV HIGHLIGHT ───── */
(function() {
  var sections = document.querySelectorAll('section[id], footer[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function(link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
        if (!id) {
          navLinks.forEach(function(link) { link.classList.remove('active'); });
        }
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-56px 0px 0px 0px'
  });

  sections.forEach(function(section) { observer.observe(section); });
})();

/* ───── SCROLL-TO-TOP ───── */
(function() {
  var btn = document.getElementById('scroll-top');
  if (!btn) return;

  var ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        btn.classList.toggle('visible', window.scrollY > 300);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
