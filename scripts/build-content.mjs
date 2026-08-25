import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PROJECTS_DIR = resolve(ROOT, 'src/content/projects');
const DATA_DIR = resolve(ROOT, 'src/data');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { meta: {}, body: raw.trim() };

  const fm = match[1];
  const body = raw.slice(match[0].length).trim();
  const meta = {};
  let currentKey = null;

  for (const line of fm.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const kvMatch = trimmed.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kvMatch) {
      const [, key, val] = kvMatch;
      if (val === '' || val === '[]') {
        currentKey = key;
        meta[key] = [];
      } else {
        meta[key] = val.replace(/^["']|["']$/g, '');
        currentKey = null;
      }
    } else if (currentKey && trimmed.startsWith('-')) {
      const item = trimmed.replace(/^-\s*/, '').replace(/^["']|["']$/g, '');
      meta[currentKey].push(item);
    }
  }

  return { meta, body };
}

mkdirSync(DATA_DIR, { recursive: true });

const files = readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.md'));
const projects = files.map(file => {
  const raw = readFileSync(resolve(PROJECTS_DIR, file), 'utf-8');
  const { meta, body } = parseFrontmatter(raw);
  const slug = basename(file, '.md');

  return {
    id: meta.id || slug,
    title: meta.title || slug.toUpperCase(),
    year: meta.year || '2024',
    role: meta.role || 'DEVELOPER',
    tags: meta.tags || [],
    cover: meta.cover ? meta.cover.replace(/^\.\/assets\//, '/content-assets/') : null,
    link: meta.link || '#',
    video: meta.video || null,
    desc: body.replace(/\(\.\/assets\//g, '(/content-assets/'),
    slug
  };
});

projects.sort((a, b) => String(a.id).localeCompare(String(b.id), undefined, { numeric: true }));

writeFileSync(resolve(DATA_DIR, 'projects.json'), JSON.stringify(projects, null, 2));
console.log(`Gerado: ${projects.length} projetos em data/projects.json`);
