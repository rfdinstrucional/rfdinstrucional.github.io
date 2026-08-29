import './style.css';
import { initBackground } from './shader.js';
import { projects } from './data/projects.js';
import { initAnimations, animateModalOpen, animateModalClose } from './animations.js';

initBackground();

/* ---------- translations ---------- */
const translations = {
  pt: {
    'nav.about': 'SOBRE',
    'nav.services': 'SERVIÇOS',
    'nav.portfolio': 'PORTFOLIO',
    'nav.clients': 'CLIENTES',
    'nav.contact': 'CONTATO',
    'lang.aria': 'Mudar para inglês',
    'about.title': 'SOBRE',
    'about.role': '// DESIGNER INSTRUCIONAL TÉCNICO',
    'about.desc': 'Designer Instrucional técnico com 9 anos transformando conhecimento em experiências educacionais imersivas e 12 anos no terceiro setor. Especialista em arquitetura de aprendizagem (ADDIE, SAM, Taxonomia de Bloom) e desenvolvimento web full-stack. Domina o ciclo completo: da análise instrucional à implementação em plataformas LMS (Moodle, Articulate Storyline/Rise), passando por prototipagem interativa, gamificação, automação com IA generativa e experiências em Realidade Virtual (Meta Quest, WebXR, ShapesXR, Gravity Sketch). Fluente em HTML/CSS/JS, React, Next.js, Node.js, Three.js e WebGL — sempre conectado às tecnologias que definem o futuro do aprendizado digital.',
    'about.tools': [
      'HTML, CSS, JS, NODE, VITE, GITHUB',
      'REACT, NEXTJS, THREEJS, R3F, WEBGL',
      'META QUEST, WEBXR SDK, SHAPESXR, GRAVITY SKETCH',
      'FIGMA, RIVE, BLENDER, KRITA',
      'STORYLINE, RISE, MOODLE, CANVAS LMS',
      'AI STUDIO, OPENCODE, ANTIGRAVITY',
      'HYPERFRAMES, STITCH, FLOW'
    ],
    'about.edu.title': '// FORMAÇÃO & ESPECIALIZAÇÕES',
    'about.edu.1.degree': 'PÓS-GRADUAÇÃO // DESIGN INSTRUCIONAL',
    'about.edu.2.degree': 'PÓS-GRADUAÇÃO // INOVAÇÃO WEB',
    'about.edu.3.degree': 'BACHARELADO // DESENVOLVIMENTO DE GAMES DIGITAIS',
    'about.status': 'Status: Aberto para Oportunidades - Vamos iniciar um projeto!',
    'services.title': 'SERVIÇOS',
    'services.s1.role': '// ARQUITETURA PEDAGÓGICA',
    'services.s1.title': 'DESIGN INSTRUCIONAL',
    'services.s1.desc': 'Estruturação completa de experiências educacionais fundamentadas em ADDIE, SAM e Taxonomia de Bloom. Roteirização técnica para EAD, treinamentos corporativos, microlearning e produção de materiais interativos focados em retenção real.',
    'services.s2.role': '// IMERSÃO & INTERATIVIDADE',
    'services.s2.title': 'EXPERIÊNCIAS (LXD)',
    'services.s2.desc': 'Design centrado no aprendiz com foco em engajamento ativo. Criação de ambientes imersivos em Realidade Virtual (Meta Quest, WebXR), gamificação estratégica, prototipagem ágil e interfaces interativas que conectam emoção e aprendizado.',
    'services.s3.role': '// ESTRATÉGIA & EDTECH',
    'services.s3.title': 'CONSULTORIA',
    'services.s3.desc': 'Diagnóstico e evolução de ecossistemas educacionais. Implantação e customização de plataformas LMS (Moodle, Rise, Canvas), integração de fluxos com IA generativa para automação de processos instrucionais e auditoria de qualidade pedagógica.',
    'portfolio.title': 'PORTFOLIO',
    'clients.title': 'CLIENTES',
    'clients.c1.tag': '// EDTECH & MICROSOFT',
    'clients.c1.seg': 'Educação, Tecnologia & Inovação',
    'clients.c1.desc': 'Trilhas de capacitação tecnológica, design instrucional de soluções educacionais e materiais interativos.',
    'clients.c2.tag': '// DESENVOLVIMENTO SOCIAL',
    'clients.c2.seg': 'Terceiro Setor & Qualificação Profissional',
    'clients.c2.desc': 'Estruturação de cursos profissionalizantes, arquitetura pedagógica para capacitação e materiais didáticos.',
    'clients.c3.tag': '// CONSULTORIA EMPRESARIAL',
    'clients.c3.seg': 'Consultoria & Soluções Corporativas',
    'clients.c3.desc': 'Treinamentos técnicos operacionais, padronização de procedimentos e módulos de aprendizagem corporativa.',
    'clients.c4.tag': '// ENGENHARIA & TECH',
    'clients.c4.seg': 'Engenharia & Inovação Tecnológica',
    'clients.c4.desc': 'Conteúdos instrucionais para engenharia aplicada, simulações técnicas interativas e capacitação técnica.',
    'clients.c5.tag': '// PROJETOS & INFRA',
    'clients.c5.seg': 'Engenharia Civil, Projetos & Infraestrutura',
    'clients.c5.desc': 'Roteirização e desenvolvimento de programas de capacitação em segurança, normas técnicas e processos.',
    'clients.c6.tag': '// INDÚSTRIA ALIMENTÍCIA',
    'clients.c6.seg': 'Indústria de Alimentos & Gastronomia',
    'clients.c6.desc': 'Treinamentos operacionais para boas práticas de fabricação, padronização de qualidade e onboarding.',
    'contact.title': 'CONTATO',
    'cta.title': 'PRONTO PARA TRANSFORMAR SEU CONTEÚDO EM UMA EXPERIÊNCIA EDUCACIONAL DE ALTO IMPACTO?',
    'cta.desc': 'Seja para desenvolver cursos completos, arquitetar treinamentos imersivos com Realidade Virtual, estruturar plataformas LMS ou integrar inteligência artificial no seu processo pedagógico — vamos transformar suas ideias em projetos memoráveis.',
    'contact.email': 'EMAIL',
    'modal.view': 'VER_PROJETO →',
    'modal.year': 'ANO:',
    'modal.role': 'CARGO:',
    'title': 'Designer Instrucional Técnico | Rafael Fernando — Cursos EAD, LMS, VR & IA',
    'description': 'Rafael Fernando — Designer Instrucional',
    'langAria': 'Mudar para inglês'
  },
  en: {
    'nav.about': 'ABOUT',
    'nav.services': 'SERVICES',
    'nav.portfolio': 'PORTFOLIO',
    'nav.clients': 'CLIENTS',
    'nav.contact': 'CONTACT',
    'lang.aria': 'Switch to Portuguese',
    'about.title': 'ABOUT',
    'about.role': '// TECHNICAL INSTRUCTIONAL DESIGNER',
    'about.desc': 'Technical Instructional Designer with 9 years transforming knowledge into immersive educational experiences and 12 years in the nonprofit sector. Expert in learning architecture (ADDIE, SAM, Bloom\'s Taxonomy) and full-stack web development. Mastering the complete cycle: from instructional analysis to LMS implementation (Moodle, Articulate Storyline/Rise), through interactive prototyping, gamification, generative AI automation, and Virtual Reality experiences (Meta Quest, WebXR, ShapesXR, Gravity Sketch). Fluent in HTML/CSS/JS, React, Next.js, Node.js, Three.js, and WebGL — always connected to the technologies shaping the future of digital learning.',
    'about.tools': [
      'HTML, CSS, JS, NODE, VITE, GITHUB',
      'REACT, NEXTJS, THREEJS, R3F, WEBGL',
      'META QUEST, WEBXR SDK, SHAPESXR, GRAVITY SKETCH',
      'FIGMA, RIVE, BLENDER, KRITA',
      'STORYLINE, RISE, MOODLE, CANVAS LMS',
      'AI STUDIO, OPENCODE, ANTIGRAVITY',
      'HYPERFRAMES, STITCH, FLOW'
    ],
    'about.edu.title': '// EDUCATION & SPECIALIZATIONS',
    'about.edu.1.degree': 'POSTGRADUATE // INSTRUCTIONAL DESIGN',
    'about.edu.2.degree': 'POSTGRADUATE // WEB INNOVATIONS',
    'about.edu.3.degree': 'BACHELOR\'S // DIGITAL GAME DEVELOPMENT',
    'about.status': "Status: Open to Work - Let's start a project!",
    'services.title': 'SERVICES',
    'services.s1.role': '// PEDAGOGICAL ARCHITECTURE',
    'services.s1.title': 'INSTRUCTIONAL DESIGN',
    'services.s1.desc': 'Complete structuring of educational experiences based on ADDIE, SAM, and Bloom\'s Taxonomy. Technical scriptwriting for e-learning, corporate training, microlearning, and interactive materials focused on genuine retention.',
    'services.s2.role': '// IMMERSION & INTERACTIVITY',
    'services.s2.title': 'EXPERIENCES (LXD)',
    'services.s2.desc': 'Learner-centered design focused on active engagement. Creating immersive Virtual Reality environments (Meta Quest, WebXR), applied gamification, agile prototyping, and interactive interfaces connecting emotion and learning.',
    'services.s3.role': '// STRATEGY & EDTECH',
    'services.s3.title': 'CONSULTING',
    'services.s3.desc': 'Diagnosis and evolution of educational ecosystems. LMS implementation and customization (Moodle, Rise, Canvas), generative AI integration for instructional process automation, and pedagogical quality audits.',
    'portfolio.title': 'PORTFOLIO',
    'clients.title': 'CLIENTS',
    'clients.c1.tag': '// EDTECH & MICROSOFT',
    'clients.c1.seg': 'Education, Technology & Innovation',
    'clients.c1.desc': 'Tech learning paths, instructional design for educational solutions, and interactive learning media.',
    'clients.c2.tag': '// SOCIAL DEVELOPMENT',
    'clients.c2.seg': 'Nonprofit & Professional Qualification',
    'clients.c2.desc': 'Structuring vocational courses, pedagogical architecture for training, and instructional material design.',
    'clients.c3.tag': '// BUSINESS CONSULTING',
    'clients.c3.seg': 'Corporate Consulting & Solutions',
    'clients.c3.desc': 'Technical operational training, instructional standard operating procedures, and corporate learning modules.',
    'clients.c4.tag': '// ENGINEERING & TECH',
    'clients.c4.seg': 'Engineering & Tech Innovation',
    'clients.c4.desc': 'Instructional content for applied engineering, interactive technical simulations, and specialized training.',
    'clients.c5.tag': '// PROJECTS & INFRA',
    'clients.c5.seg': 'Civil Engineering & Infrastructure',
    'clients.c5.desc': 'Scriptwriting and development of training programs in safety, technical standards, and engineering workflows.',
    'clients.c6.tag': '// FOOD INDUSTRY',
    'clients.c6.seg': 'Food Industry & Manufacturing',
    'clients.c6.desc': 'Operational training for good manufacturing practices (GMP), quality standards, and industrial onboarding.',
    'contact.title': 'CONTACT',
    'cta.title': 'READY TO TRANSFORM YOUR CONTENT INTO A HIGH-IMPACT LEARNING EXPERIENCE?',
    'cta.desc': 'Whether developing complete courses, architecting immersive Virtual Reality training, configuring LMS platforms, or integrating generative AI into your learning workflow — let\'s turn your ideas into memorable projects.',
    'contact.email': 'EMAIL',
    'modal.view': 'VIEW_PROJECT →',
    'modal.year': 'YEAR:',
    'modal.role': 'ROLE:',
    'title': 'Instructional Designer | Rafael Fernando — E-learning, LMS, VR & AI',
    'description': 'Rafael Fernando — Instructional Designer',
    'langAria': 'Switch to Portuguese'
  }
};

let currentLang = 'pt';
try {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  const saved = localStorage.getItem('lang');
  if (urlLang === 'en' || urlLang === 'pt') {
    currentLang = urlLang;
  } else if (saved === 'en' || saved === 'pt') {
    currentLang = saved;
  }
} catch (e) {
  currentLang = 'pt';
}

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

  document.querySelectorAll('[data-i18n-list]').forEach((el) => {
    const key = el.getAttribute('data-i18n-list');
    const items = t[key];
    if (!Array.isArray(items)) return;
    el.querySelectorAll('li').forEach((li, i) => {
      if (items[i]) li.textContent = items[i];
    });
  });

  document.title = t.title;
  document.querySelector('meta[name="description"]').content = t.description;
  document.documentElement.lang = currentLang;

  const langBtn = document.querySelector('.lang-toggle');
  if (langBtn) {
    const img = langBtn.querySelector('img');
    if (img) {
      img.src = currentLang === 'pt' ? '/flag-us.svg' : '/flag-br.svg';
      img.alt = currentLang === 'pt' ? 'US' : 'BR';
    }
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
      const text = h2[1].trim();
      const title = text.startsWith('//') ? text : `// ${text}`;
      html.push(`<h4 class="modal-section-title">${escapeHtml(title)}</h4>`);
      continue;
    }

    const h3 = trimmed.match(/^### (.+)$/);
    if (h3) {
      if (inList) { html.push('</ul>'); inList = false; }
      const text = h3[1].trim();
      const title = text.startsWith('//') ? text : `// ${text}`;
      html.push(`<h5 class="modal-section-sub">${escapeHtml(title)}</h5>`);
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
    <div class="tile-cover-wrap">${cover}</div>
    <div class="tile-sweep" aria-hidden="true"></div>
    <div class="tile-bottom">
      <span class="tile-title">${escapeHtml(p.title)}</span>
      <span class="tile-cta" aria-label="View project">View →</span>
    </div>
  `;
  tile.addEventListener('click', () => openModal(p));
  gallery.appendChild(tile);
});

/* ---------- modal ---------- */
const modal = document.getElementById('modal');
const elTitle = document.getElementById('modal-title');
const elYear = document.getElementById('modal-year');
const elRole = document.getElementById('modal-role');
const elGallery = document.getElementById('modal-gallery');
const elVideo = document.getElementById('modal-video');

const elDesc = document.getElementById('modal-desc');
const elActions = document.getElementById('modal-actions');
const elLink = document.getElementById('modal-link');
const elLang = document.getElementById('modal-lang');
let lastFocus = null;
let modalProject = null;
let modalLang = 'pt';

function renderModalDesc() {
  if (!modalProject) return;
  const md = modalLang === 'en' && modalProject.desc_en ? modalProject.desc_en : modalProject.desc;
  elDesc.innerHTML = renderMarkdown(md);
  elGallery.innerHTML = '';
  elDesc.querySelectorAll('.modal-figure').forEach((fig) => {
    elGallery.appendChild(fig);
  });
}

function openModal(p) {
  const t = translations[currentLang];
  lastFocus = document.activeElement;
  modalProject = p;
  modalLang = currentLang;

  elTitle.textContent = p.title;
  elYear.textContent = `${t['modal.year']} ${p.year}`;
  elRole.textContent = `${t['modal.role']} ${p.role}`;

  elLang.querySelector('img').src = modalLang === 'pt' ? '/flag-us.svg' : '/flag-br.svg';
  elLang.querySelector('img').alt = modalLang === 'pt' ? 'US' : 'BR';

  renderModalDesc();

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
  animateModalOpen(modal, () => {
    modal.querySelector('.modal-close').focus();
  });
}

elLang.addEventListener('click', () => {
  modalLang = modalLang === 'pt' ? 'en' : 'pt';
  elLang.querySelector('img').src = modalLang === 'pt' ? '/flag-us.svg' : '/flag-br.svg';
  elLang.querySelector('img').alt = modalLang === 'pt' ? 'US' : 'BR';
  renderModalDesc();
});

function closeModal() {
  animateModalClose(modal, () => {
    modal.hidden = true;
    modalProject = null;
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
  });
}

modal.addEventListener('click', (e) => {
  if (e.target.closest('[data-close]')) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});

/* ---------- nav active state ---------- */
const navLinks = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('section[id]')];

function updateActiveNav(activeId) {
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${activeId}`);
  });
}

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveNav(entry.target.id);
        }
      });
    },
    { rootMargin: '-30% 0px -55% 0px' }
  );

  sections.forEach((sec) => navObserver.observe(sec));
}

navLinks.forEach((a) => {
  a.addEventListener('click', () => {
    const targetId = a.getAttribute('href')?.replace('#', '');
    if (targetId) updateActiveNav(targetId);
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

/* ---------- GSAP Animations Initialization ---------- */
initAnimations();
