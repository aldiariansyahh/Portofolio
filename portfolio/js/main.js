/* ============================================
   PORTFOLIO – main.js
   Muhamad Rifaldi Aryansyah
   ============================================ */

// ── Load data.json ──────────────────────────
async function loadData() {
  try {
    const res = await fetch('data.json');
    return await res.json();
  } catch (e) {
    console.error('Gagal memuat data.json:', e);
    return null;
  }
}

// ── Render Skill Bars ───────────────────────
function renderSkills(keahlian) {
  const map = {
    'skills-hardware': keahlian.hardware,
    'skills-software': keahlian.software,
    'skills-lainnya':  keahlian.lainnya,
  };
  Object.entries(map).forEach(([id, items]) => {
    const el = document.getElementById(id);
    if (!el || !items) return;
    el.innerHTML = items.map(s => `
      <div class="skill-item">
        <div class="skill-info">
          <span class="skill-name">${s.nama}</span>
          <span class="skill-pct">${s.level}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-fill" data-width="${s.level}"></div>
        </div>
      </div>`).join('');
  });
}

function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 100);
  });
}

// ── Render Projects ─────────────────────────
function renderProjects(proyek, filter = 'Semua') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const list = filter === 'Semua' ? proyek : proyek.filter(p => p.kategori === filter);

  grid.innerHTML = list.map(p => `
    <div class="project-card reveal" data-kategori="${p.kategori}">
      <div class="project-card__img-wrap">
        <img src="${p.gambar}" alt="${p.judul}"
          onerror="this.parentElement.innerHTML='<div class=\\'project-placeholder-icon\\'><svg viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'1.5\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\'/><path d=\\'m21 15-5-5L5 21\\'/></svg><span>Gambar Proyek</span></div>'"/>
      </div>
      <div class="project-card__body">
        <div class="project-card__meta">
          <span class="tag">${p.kategori}</span>
          <span class="project-card__year">${p.tahun}</span>
        </div>
        <h3 class="project-card__title">${p.judul}</h3>
        <p class="project-card__desc">${p.deskripsi}</p>
        <div class="project-card__tech">
          ${p.teknologi.map(t => `<span class="tech-badge">${t}</span>`).join('')}
        </div>
        ${p.link_github
          ? `<a href="${p.link_github}" target="_blank" rel="noopener" class="project-card__link">
               Lihat di GitHub
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
             </a>`
          : `<span style="font-size:0.8rem;color:var(--gray-500);">Proyek Akademik</span>`
        }
      </div>
    </div>`).join('');

  observeReveal();
}

function buildFilters(proyek) {
  const wrap = document.getElementById('projects-filter');
  if (!wrap) return;
  const cats = ['Semua', ...new Set(proyek.map(p => p.kategori))];
  wrap.innerHTML = cats.map((c, i) =>
    `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${c}">${c}</button>`
  ).join('');

  wrap.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(window._proyek, btn.dataset.filter);
    });
  });
}

// ── CV Download ─────────────────────────────
function setupCV() {
  const btn = document.getElementById('cv-download');
  if (!btn) return;
  btn.addEventListener('click', () => {
    fetch('assets/CV_Rifaldi.pdf', { method: 'HEAD' })
      .then(r => {
        if (r.ok) {
          const a = document.createElement('a');
          a.href = 'assets/CV_Rifaldi.pdf';
          a.download = 'CV_Muhamad_Rifaldi_Aryansyah.pdf';
          document.body.appendChild(a); a.click(); a.remove();
        } else {
          alert('Salin file CV kamu ke folder assets/ dengan nama CV_Rifaldi.pdf');
        }
      })
      .catch(() => alert('Salin file CV kamu ke folder assets/ dengan nama CV_Rifaldi.pdf'));
  });
}

// ── Scroll Reveal ────────────────────────────
let ro;
function observeReveal() {
  if (!ro) {
    ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
    }, { threshold: 0.1 });
  }
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => ro.observe(el));
}

// ── Skill bar on section enter ───────────────
function observeSkills() {
  const sec = document.getElementById('keahlian');
  if (!sec) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateSkillBars(); obs.disconnect(); }
  }, { threshold: 0.2 });
  obs.observe(sec);
}

// ── Active nav ───────────────────────────────
function setupNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${cur}`));
  }, { passive: true });

  // Mobile hamburger
  const ham   = document.querySelector('.nav__hamburger');
  const nlist = document.querySelector('.nav__links');
  if (ham && nlist) {
    ham.addEventListener('click', () => nlist.classList.toggle('open'));
    nlist.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nlist.classList.remove('open')));
  }
}

// ── Footer year ──────────────────────────────
function setYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ── Hide loader ──────────────────────────────
function hideLoader() {
  const l = document.getElementById('loading-screen');
  if (!l) return;
  l.style.opacity = '0';
  setTimeout(() => l.remove(), 500);
}

// ── INIT ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData();
  if (data) {
    window._proyek = data.proyek;
    renderSkills(data.keahlian);
    buildFilters(data.proyek);
    renderProjects(data.proyek);
  }
  setupNav();
  setupCV();
  setYear();
  observeReveal();
  observeSkills();
  hideLoader();
});
