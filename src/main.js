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
    'about.role': '// DESIGNER INSTRUCIONAL',
    'about.desc': 'Sou um profissional com mais de 12 anos de experiência no terceiro setor e 8 anos dedicados ao design e à gestão educacional. Meu trabalho combina metodologias pedagógicas consolidadas (ADDIE, Taxonomia de Bloom) com soluções tecnológicas inovadoras para criar trilhas de aprendizagem imersivas e interativas focadas na retenção de conhecimento para jovens e adultos.',
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
    'about.role': '// INSTRUCTIONAL DESIGNER',
    'about.desc': 'I am a professional with over 12 years of experience in the nonprofit sector and 8 years dedicated to design and educational management. My work combines established pedagogical methodologies (ADDIE, Bloom\'s Taxonomy) with innovative technological solutions to create immersive, interactive learning paths focused on knowledge retention for young people and adults.',
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

/* ---------- gallery ---------- */
const gallery = document.getElementById('gallery');

projects.forEach((p) => {
  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'tile';
  tile.setAttribute('aria-haspopup', 'dialog');
  const cover = p.cover
    ? `<img class="tile-cover" src="${p.cover}" alt="" loading="lazy" decoding="async" />`
    : '';
  tile.innerHTML = `
    ${cover}
    <span class="tile-id">[${p.id}]</span>
    <span class="tile-arrow" aria-hidden="true">↗</span>
    <div class="tile-sweep" aria-hidden="true"></div>
    <span class="tile-title">${p.title}</span>
    <span class="tile-year">${p.year}</span>
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
const elDesc = document.getElementById('modal-desc');
const elLink = document.getElementById('modal-link');
let lastFocus = null;

function openModal(p) {
  const t = translations[currentLang];
  lastFocus = document.activeElement;
  elId.textContent = `[${p.id}]`;
  elTitle.textContent = p.title;
  elYear.textContent = `${t['modal.year']} ${p.year}`;
  elRole.textContent = `${t['modal.role']} ${p.role}`;
  elDesc.textContent = p.desc;
  elLink.href = p.link;
  elTags.innerHTML = '';
  p.tags.forEach((tag) => {
    const li = document.createElement('li');
    li.textContent = tag;
    elTags.appendChild(li);
  });
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

/* ---------- misc ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
