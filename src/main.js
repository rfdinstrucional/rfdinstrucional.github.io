import './style.css';
import { initBackground } from './shader.js';
import { projects } from './data/projects.js';

initBackground();

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
  lastFocus = document.activeElement;
  elId.textContent = `[${p.id}]`;
  elTitle.textContent = p.title;
  elYear.textContent = `YEAR: ${p.year}`;
  elRole.textContent = `ROLE: ${p.role}`;
  elDesc.textContent = p.desc;
  elLink.href = p.link;
  elTags.innerHTML = '';
  p.tags.forEach((t) => {
    const li = document.createElement('li');
    li.textContent = t;
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
