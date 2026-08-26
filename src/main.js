import './style.css';
import { initBackground } from './shader.js';
import { projects } from './data/projects.js';

initBackground();

/* ---------- translations ---------- */
const translations = {
  pt: {
    'nav.about': 'SOBRE',
    'nav.portfolio': 'PORTFOLIO',
    'nav.contact': 'CONTATO',
    'lang.aria': 'Mudar para inglês',
    'about.title': 'SOBRE',
    'about.role': '// DESIGNER INSTRUCIONAL TÉCNICO',
    'about.desc': 'Designer Instrucional técnico com 9 anos transformando conhecimento em experiências educacionais imersivas e 12 anos no terceiro setor. Especialista em arquitetura de aprendizagem (ADDIE, SAM, Taxonomia de Bloom) e desenvolvimento web full-stack. Domina o ciclo completo: da análise instrucional à implementação em plataformas LMS (Moodle, Articulate Storyline/Rise), passando por prototipagem interativa, gamificação, automação com IA generativa e experiências em Realidade Virtual (Meta Quest, WebXR, ShapesXR, Gravity Sketch). Fluente em HTML/CSS/JS, React, Next.js, Node.js, Three.js e WebGL — sempre conectado às tecnologias que definem o futuro do aprendizado digital.',
    'about.edu.title': '// FORMAÇÃO & ESPECIALIZAÇÕES',
    'about.edu.1.degree': 'PÓS-GRADUAÇÃO // DESIGN INSTRUCIONAL',
    'about.edu.2.degree': 'PÓS-GRADUAÇÃO // INOVAÇÃO WEB',
    'about.edu.3.degree': 'BACHARELADO // DESENVOLVIMENTO DE GAMES DIGITAIS',
    'about.status': 'STATUS: ABERTO PARA OPORTUNIDADES',
    'portfolio.title': 'PORTFOLIO',
    'contact.title': 'CONTATO',
    'contact.email': 'EMAIL',
    'modal.view': 'VER_PROJETO →',
    'modal.year': 'ANO:',
    'modal.role': 'CARGO:',
    'title': 'Rafael Fernando | Designer Instrucional',
    'description': 'Rafael Fernando — Designer Instrucional',
    'langButton': 'EN',
    'langAria': 'Mudar para inglês'
  },
  en: {
    'nav.about': 'ABOUT',
    'nav.portfolio': 'PORTFOLIO',
    'nav.contact': 'CONTACT',
    'lang.aria': 'Switch to Portuguese',
    'about.title': 'ABOUT',
    'about.role': '// TECHNICAL INSTRUCTIONAL DESIGNER',
    'about.desc': 'Technical Instructional Designer with 9 years transforming knowledge into immersive educational experiences and 12 years in the nonprofit sector. Expert in learning architecture (ADDIE, SAM, Bloom\'s Taxonomy) and full-stack web development. Mastering the complete cycle: from instructional analysis to LMS implementation (Moodle, Articulate Storyline/Rise), through interactive prototyping, gamification, generative AI automation, and Virtual Reality experiences (Meta Quest, WebXR, ShapesXR, Gravity Sketch). Fluent in HTML/CSS/JS, React, Next.js, Node.js, Three.js, and WebGL — always connected to the technologies shaping the future of digital learning.',
    'about.edu.title': '// EDUCATION & SPECIALIZATIONS',
    'about.edu.1.degree': 'POSTGRADUATE // INSTRUCTIONAL DESIGN',
    'about.edu.2.degree': 'POSTGRADUATE // WEB INNOVATIONS',
    'about.edu.3.degree': 'BACHELOR\'S // DIGITAL GAME DEVELOPMENT',
    'about.status': 'STATUS: OPEN TO WORK',
    'portfolio.title': 'PORTFOLIO',
    'contact.title': 'CONTACT',
    'contact.email': 'EMAIL',
    'modal.view': 'VIEW_PROJECT →',
    'modal.year': 'YEAR:',
    'modal.role': 'ROLE:',
    'title': 'Rafael Fernando | Instructional Designer',
    'description': 'Rafael Fernando — Instructional Designer',
    'langButton': 'PT',
    'langAria': 'Switch to Portuguese'
  }
};

let currentLang = localStorage.getItem('lang') || 'pt';

function applyTranslations() {
  const t = translations[currentLang];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (t[key]) el.setAttribute('aria-label', t[key]);
  });

  document.title = t.title;
  document.querySelector('meta[name="description"]').content = t.description;
  document.documentElement.lang = currentLang;

  const langBtn = document.querySelector('.lang-toggle');
  if (langBtn) {
    langBtn.textContent = t.langButton;
    langBtn.setAttribute('aria-label', t.langAria);
  }
}

const langToggle = document.querySelector('.lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('lang', currentLang);
    applyTranslations();
  });
}

applyTranslations();

/* ---------- security ---------- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeUrl(url) {
  if (!url) return '#';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('#')) return trimmed;
  if (trimmed.startsWith('/')) return trimmed;
  return '#';
}

function safeYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/^https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return match ? match[1] : null;
}

/* ---------- markdown renderer ---------- */
function renderMarkdown(md) {
  const lines = md.split('\n');
  const html = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      if (inList) { html.push('</ul>'); inList = false; }
      continue;
    }

    const h2 = trimmed.match(/^## (.+)$/);
    if (h2) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h4 class="modal-section-title">${escapeHtml(h2[1])}</h4>`);
      continue;
    }

    const h3 = trimmed.match(/^### (.+)$/);
    if (h3) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h5 class="modal-section-sub">${escapeHtml(h3[1])}</h5>`);
      continue;
    }

    const img = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<figure class="modal-figure"><img src="${escapeHtml(safeUrl(img[2]))}" alt="${escapeHtml(img[1])}" loading="lazy" decoding="async" /></figure>`);
      continue;
    }

    const list = trimmed.match(/^- (.+)$/);
    if (list) {
      if (!inList) { html.push('<ul class="modal-list">'); inList = true; }
      html.push(`<li>${escapeHtml(list[1])}</li>`);
      continue;
    }

    if (inList) { html.push('</ul>'); inList = false; }

    const escaped = escapeHtml(trimmed);
    const p = escaped
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code>$1</code>');
    html.push(`<p>${p}</p>`);
  }

  if (inList) html.push('</ul>');
  return html.join('\n');
}

/* ---------- gallery ---------- */
const gallery = document.getElementById('gallery');

projects.forEach((p) => {
  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'tile';
  tile.setAttribute('aria-haspopup', 'dialog');
  const cover = p.cover
    ? `<img class="tile-cover" src="${escapeHtml(safeUrl(p.cover))}" alt="" loading="lazy" decoding="async" />`
    : '';
  tile.innerHTML = `
    ${cover}
    <span class="tile-id">[${escapeHtml(p.id)}]</span>
    <div class="tile-sweep" aria-hidden="true"></div>
    <span class="tile-title">${escapeHtml(p.title)}</span>
    <span class="tile-year">${escapeHtml(p.year)}</span>
    <span class="tile-cta" aria-hidden="true">VER_PROJETO_COMPLETO →</span>
  `;
  tile.addEventListener('click', () => openModal(p));
  gallery.appendChild(tile);
});

/* ---------- modal ---------- */
const modal = document.getElementById('modal');
const elId = document.getElementById('modal-id');
const elTitle = document.getElementById('modal-title');
const elYear = document.getElementById('modal-year');
const elRole = document.getElementById('modal-role');
const elTags = document.getElementById('modal-tags');
const elGallery = document.getElementById('modal-gallery');
const elVideo = document.getElementById('modal-video');
const elDesc = document.getElementById('modal-desc');
const elActions = document.getElementById('modal-actions');
const elLink = document.getElementById('modal-link');
let lastFocus = null;

function openModal(p) {
  const t = translations[currentLang];
  lastFocus = document.activeElement;
  elId.textContent = `[${p.id}]`;
  elTitle.textContent = p.title;
  elYear.textContent = `${t['modal.year']} ${p.year}`;
  elRole.textContent = `${t['modal.role']} ${p.role}`;

  elTags.innerHTML = '';
  p.tags.forEach((tag) => {
    const li = document.createElement('li');
    li.textContent = tag;
    elTags.appendChild(li);
  });

  elDesc.innerHTML = renderMarkdown(p.desc);

  elGallery.innerHTML = '';
  elDesc.querySelectorAll('.modal-figure').forEach((fig) => {
    elGallery.appendChild(fig);
  });

  elVideo.innerHTML = '';
  const ytId = safeYouTubeId(p.video);
  if (ytId) {
    elVideo.innerHTML = `<div class="modal-video-wrap"><iframe src="https://www.youtube.com/embed/${ytId}" title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  }

  if (p.link && p.link !== '#' && /^https?:\/\//i.test(p.link)) {
    elLink.href = p.link;
    elActions.hidden = false;
  } else {
    elActions.hidden = true;
  }

  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  if (lastFocus) lastFocus.focus();
}

modal.addEventListener('click', (e) => {
  if (e.target.closest('[data-close]')) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});

/* ---------- nav active state ---------- */
const navLinks = [...document.querySelectorAll('.nav a')];

navLinks.forEach((a) => {
  a.addEventListener('click', () => {
    navLinks.forEach((link) => link.classList.toggle('active', link === a));
  });
});

/* ---------- about photo 3d tilt ---------- */
const aboutPhoto = document.querySelector('.about-photo');
if (aboutPhoto) {
  const img = aboutPhoto.querySelector('img');
  const MAX_TILT = 8;

  aboutPhoto.addEventListener('mousemove', (e) => {
    const rect = aboutPhoto.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * MAX_TILT * 2;
    const rotateX = (0.5 - y) * MAX_TILT * 2;
    img.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  aboutPhoto.addEventListener('mouseleave', () => {
    img.style.transform = '';
  });
}

/* ---------- misc ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
