/* ==========================================================================
   Techbase STEM Academy — JavaScript course
   Shared lesson interactivity script — used by every file in /lessons.

   Each lesson page supplies its two unique values via data attributes on
   <body>:
     data-total  -> number of phases in that lesson
     data-key    -> localStorage key used to remember progress for that lesson
   ========================================================================== */
(function () {
  const TOTAL = parseInt(document.body.dataset.total, 10);
  const KEY = document.body.dataset.key;
  let cur = parseInt(localStorage.getItem(KEY) || '1', 10);

  function init() {
    for (let i = 2; i <= cur; i++) unlock(i, false);
    bar();
  }

  window.unlockNext = function (n) {
    const c = document.getElementById('chk' + n);
    if (c) { c.classList.add('done'); c.textContent = '✓'; }
    localStorage.setItem(KEY, n + 1);
    cur = n + 1;
    if (n === TOTAL) {
      document.getElementById('build-it').classList.add('visible');
      bar(100);
      toast('Building time! 🏗️');
      setTimeout(() => document.getElementById('build-it').scrollIntoView({ behavior: 'smooth' }), 200);
      setTimeout(confetti, 600);
    } else {
      unlock(n + 1, true);
      bar();
      toast(['Phase complete! ✅', 'Keep going! 🎯', 'Nice work! 💡', 'Nailed it! 🚀'][n % 4]);
    }
  };

  function unlock(n, scroll) {
    const el = document.getElementById('phase' + n);
    if (!el) return;
    el.classList.remove('locked');
    if (scroll) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 180);
  }

  function bar(p) {
    document.getElementById('pbar').style.width = (p !== undefined ? p : Math.round((cur - 1) / TOTAL * 95)) + '%';
  }

  window.toggleReveal = function (btn) {
    const w = btn.nextElementSibling;
    const o = w.classList.toggle('open');
    btn.textContent = o ? 'Hide Answer 🙈' : 'Reveal Answer 👁️';
  };

  window.toggleCode = function (btn) {
    const w = btn.nextElementSibling;
    const o = w.classList.toggle('open');
    btn.textContent = o ? 'Hide Starter Code 🙈' : 'Reveal Starter Code 💻';
  };

  window.copyCode = function (btn) {
    const code = btn.closest('.v2-code-wrap').querySelector('code').innerText;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = 'Copied! ✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.innerHTML = '&#10064; Copy'; btn.classList.remove('copied'); }, 1800);
    }).catch(() => {});
  };

  const tEl = document.getElementById('toast');
  let tT;
  function toast(msg) {
    tEl.innerHTML = msg;
    tEl.classList.add('show');
    clearTimeout(tT);
    tT = setTimeout(() => tEl.classList.remove('show'), 2400);
  }

  const gEl = document.getElementById('go-top');
  window.addEventListener('scroll', () => gEl.classList.toggle('visible', scrollY > 320), { passive: true });
  gEl.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.toggleGh = function (el) {
    el.nextElementSibling.classList.toggle('open');
  };

  window.showGithub = function () {
    const g = document.getElementById('gh-steps');
    if (g) { g.style.display = 'block'; setTimeout(() => g.scrollIntoView({ behavior: 'smooth' }), 150); }
  };

  window.showEnd = function () {
    const e = document.getElementById('session-end');
    if (e) { e.classList.add('visible'); setTimeout(() => e.scrollIntoView({ behavior: 'smooth' }), 150); }
  };

  window.downloadStarter = function (code) {
    const ext = 'html';
    const a = document.createElement('a');
    a.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(code);
    a.download = 'starter.' + ext;
    a.click();
  };

  window.confetti = function confetti() {
    const cv = document.getElementById('cc');
    cv.style.display = 'block';
    const ctx = cv.getContext('2d');
    cv.width = innerWidth;
    cv.height = innerHeight;
    const ps = Array.from({ length: 140 }, () => {
      return {
        x: Math.random() * cv.width,
        y: -10 - Math.random() * 120,
        r: 4 + Math.random() * 6,
        d: 2 + Math.random() * 3,
        c: ['#e34c26', '#0284c7', '#d97706', '#059669', '#7c3aed', '#ec4899'][Math.floor(Math.random() * 6)],
        ta: 0
      };
    });
    let f = 0;
    function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ps.forEach(p => {
        p.ta += .1; p.y += p.d; p.x += Math.sin(f / 20);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.c; ctx.fill();
      });
      f++;
      if (f < 210) requestAnimationFrame(draw);
      else { ctx.clearRect(0, 0, cv.width, cv.height); cv.style.display = 'none'; }
    }
    draw();
    toast('All phases done! 🎉');
  };

  init();
})();
