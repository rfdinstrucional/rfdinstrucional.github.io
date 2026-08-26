# TERMINAL/GRID — Design System

> Sistema de design baseado no estilo desenvolvido para o site **rfdinstrucional.github.io**.
> Estética de terminal minimalista: fundo preto absoluto, linhas de 1px brancas, tipografia
> monospace fina, zero bordas arredondadas e gradientes brancos transparentes.
> Use este documento como fonte da verdade para qualquer novo projeto.

---

## 1. Filosofia

| Princípio | Aplicação |
|---|---|
| **Canvas preto, luz branca** | O fundo é vazio absoluto (`#000`). Todo elemento é luz sobre ele: texto, linha ou gradiente. |
| **Precisão de 1px** | Todas as bordas, separadores e contornos têm exatamente `1px`. Nada de espessuras variadas. |
| **Zero raio** | Nunca usar `border-radius`. Cantos são sempre vivos (90°). |
| **Monospace sempre** | Uma única família tipográfica em todo o produto. Hierarquia vem de peso, tamanho e espaçamento — não de famílias diferentes. |
| **Conteúdo é terminal** | Elementos de UI citam sintaxe de terminal/código: `[001]`, `$`, `//`, `→`, `_`, `▌`. |
| **Movimento contido** | Animações curtas, discretas e funcionais. Nada saltita. |
| **Uma cor de destaque** | Toda a paleta é preto/branco. Apenas indicadores de estado usam uma cor (verde). |

---

## 2. Tokens

Copie o bloco abaixo como base de qualquer projeto:

```css
:root {
  /* ---- cor ---- */
  --bg: #000000;                          /* fundo absoluto */
  --fg: #ffffff;                          /* texto principal */
  --dim: rgba(255, 255, 255, 0.55);       /* texto secundário */
  --faint: rgba(255, 255, 255, 0.28);     /* texto terciário/metadados */
  --line: rgba(255, 255, 255, 0.22);      /* linhas e bordas padrão */
  --line-strong: rgba(255, 255, 255, 0.6);/* bordas em hover/destaque */
  --status-ok: #8ddca4;                   /* única cor de estado permitida */

  /* ---- gradiente assinatura (branco transparente) ---- */
  --grad-h: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0) 100%);
  --grad-v: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0));

  /* ---- superfície com blur (cards, footer, header) ---- */
  --surface: rgba(0, 0, 0, 0.45);
  --surface-blur: blur(10px);

  /* ---- tipografia ---- */
  --font: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  /* ---- movimento ---- */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --t-fast: 0.25s;
  --t-med: 0.3s;
}
```

---

## 3. Cor

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#000000` | Fundo da página e do shader |
| `--fg` | `#ffffff` | Texto principal, títulos |
| `--dim` | `rgba(255,255,255,.55)` | Parágrafos de apoio, labels secundários |
| `--faint` | `rgba(255,255,255,.28)` | Metadados, índices `[01]`, rodapé |
| `--line` | `rgba(255,255,255,.22)` | Bordas padrão de cards, grids, divisores |
| `--line-strong` | `rgba(255,255,255,.6)` | Hover de bordas, modal, botão primário |
| `--status-ok` | `#8ddca4` | Indicadores de status (online/disponível). Única cor saturada do sistema |

**Regras:**
- Proibido introduzir outras cores matizadas. Se precisar de erro/aviso, resolva com texto (`[ERRO]`, `[WARN]`) antes de cor.
- Seleção de texto é sempre invertida: fundo branco, texto preto.
  ```css
  ::selection { background: #fff; color: #000; }
  ```
- Brilho/glow só é permitido em indicador de status:
  ```css
  box-shadow: 0 0 6px rgba(141, 220, 164, 0.6);
  ```

---

## 4. Tipografia

**Fonte única:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — pesos `100 200 300 400 500`.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500&display=swap" rel="stylesheet" />
```

### Escala

| Elemento | Peso | Tamanho | Letter-spacing | Observações |
|---|---|---|---|---|
| H1 (nome/título hero) | 200 | `clamp(1.4rem, 3.5vw, 2.1rem)` | `.06em` | Sempre seguido de cursor `▌` piscando |
| H2 (section head) | 400 | `13px` | `.3em` | Uppercase |
| H3 (modal/título card) | 300 | `20px` | `.1em` | |
| Body | 300 | `15px` (desktop) / `14px` (mobile) | `.02em` | `line-height: 1.65` |
| Label/nav/tag | 300–400 | `10–12px` | `.14em – .2em` | Sempre uppercase |
| Metadado/índice | 300 | `10px` | `.14em` | Cor `--faint` |

### Convenções de escrita visual
- Labels de navegação e ações: `UPPERCASE`.
- Prefixos de contexto: índice entre colchetes `[01]`, comentário `//`, comando `$`.
- Cursor de digitação: caractere `▌` ou `_` com blink (ver §9).

---

## 5. Layout & Grid

```css
main {
  max-width: 1080px;
  margin: 0 auto;
  padding: calc(56px + 4rem) clamp(1rem, 4vw, 3rem) 4rem;
}
.section { margin-bottom: clamp(4rem, 9vw, 7rem); }
```

- Largura de conteúdo: **1080px máx**, centralizado.
- Padding lateral fluido: `clamp(1rem, 4vw, 3rem)`.
- Header fixo com altura `56px`; conteúdo começa com offset equivalente.
- Âncoras precisam de `scroll-margin-top: calc(56px + 1rem)` por causa do header fixo.
- Breakpoint único de transformação estrutural: **720px** (nav compacta, cards empilham).

### Cabeçalho de seção (padrão obrigatório)

Toda seção abre com: índice + título + linha gradiente.

```html
<div class="section-head">
  <span class="section-index">[01]</span>
  <h2>ABOUT</h2>
  <span class="section-line"></span>
</div>
```

```css
.section-head { display: flex; align-items: baseline; gap: .75rem; margin-bottom: 1.5rem; }
.section-index { font-size: 11px; color: var(--faint); }
.section-head h2 { font-size: 13px; font-weight: 400; letter-spacing: .3em; }
.section-line { flex: 1; height: 1px; background: var(--grad-h); }
```

---

## 6. Linhas, Bordas & Superfícies

- **Borda universal:** `1px solid var(--line)` → hover: `var(--line-strong)`.
- **Raio:** sempre `0`. Jamais arredondar.
- **Superfície elevada (card):** borda + tinta translúcida + backdrop blur — o fundo aparece desfocado atrás.

```css
.card {
  border: 1px solid var(--line);
  background: var(--grad-v), var(--surface);
  backdrop-filter: var(--surface-blur);
  -webkit-backdrop-filter: var(--surface-blur);
  transition: border-color var(--t-fast) ease;
}
.card:hover { border-color: var(--line-strong); }
```

- **Grades de itens:** construir com bordas compartilhadas (sem gap), criando malha de 1px:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  background: var(--surface);
  backdrop-filter: var(--surface-blur);
}
.grid > * {
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
```

---

## 7. Componentes

### 7.1 Header fixo

Barra fixa full-width, borda inferior 1px, fundo gradiente escuro + blur leve.

```css
.site-header {
  position: fixed; inset: 0 0 auto 0; height: 56px;
  display: flex; align-items: center; justify-content: center;
  padding: 0 clamp(1rem, 4vw, 3rem);
  border-bottom: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(0,0,0,.85), rgba(0,0,0,.35));
  backdrop-filter: blur(6px);
}
```
- Nav centralizada no header (sem logo).
- Em telas ≤720px: header ganha altura automática, nav pode quebrar em 2 linhas centralizada.

### 7.2 Navegação

Links uppercase, tracking largo, sublinhado animado da esquerda para a direita.

```css
.nav a {
  position: relative;
  color: var(--dim);
  text-decoration: none;
  font-size: 11px; letter-spacing: .18em;
  padding: 4px 0;
  transition: color var(--t-fast) ease;
}
.nav a::after {
  content: ''; position: absolute; left: 0; bottom: 0;
  width: 100%; height: 1px; background: var(--fg);
  transform: scaleX(0); transform-origin: left;
  transition: transform var(--t-med) var(--ease-out);
}
.nav a:hover, .nav a.active { color: var(--fg); }
.nav a:hover::after, .nav a.active::after { transform: scaleX(1); }
```
- Estado ativo por scroll: `IntersectionObserver` com `rootMargin: '-40% 0px -55% 0px'`.

### 7.3 Card

Ver §6. Conteúdo interno com padding `clamp(1.25rem, 3vw, 2.5rem)`.
Card split (foto/texto) usa `grid-template-columns: minmax(220px,340px) 1fr` com divisor vertical de 1px; empilha em ≤720px com divisor virando horizontal.

### 7.4 Botão

Retangular, borda forte, fundo gradiente sutil. Hover: inverte para branco sólido.

```css
.btn {
  display: inline-block;
  border: 1px solid var(--line-strong);
  color: var(--fg); text-decoration: none;
  font-size: 11px; letter-spacing: .2em;
  padding: 10px 18px;
  background: var(--grad-v);
  transition: background var(--t-fast) ease;
}
.btn:hover { background: rgba(255,255,255,.92); color: #000; }
```

### 7.5 Tag / Chip

```css
.tag {
  border: 1px solid var(--line);
  padding: 3px 10px;
  font-size: 10px; letter-spacing: .14em;
  color: var(--dim);
  background: var(--grad-v);
}
.tag:hover { color: var(--fg); border-color: var(--line-strong); }
```
Lista de tags: `display:flex; flex-wrap:wrap; gap:.5rem; list-style:none`.

### 7.6 Indicador de status

Quadrado 6px (não círculo!) na cor `--status-ok`, com glow e pulso lento.

```css
.status-dot {
  width: 6px; height: 6px;
  background: var(--status-ok);
  box-shadow: 0 0 6px rgba(141,220,164,.6);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 50% { opacity: .25; } }
```
Label acompanhante em uppercase tracking `.2em`: `STATUS: OPEN TO WORK`.

### 7.7 Tile de galeria

Botão quadrado (aspect-ratio 4/3) dentro de `.grid`. Conteúdo: índice topo-esquerda,
seta `↗` topo-direita (só no hover), título e ano na base.

Estados:
- **Hover:** radial-gradient branco transparente surge no tile (`opacity 0 → 1`), índice clareia, seta desliza de `translate(-4px,4px)` para `(0,0)`, borda interna vira `--line-strong`.
- **Focus-visible:** mesmos estados do hover.

### 7.8 Modal

```html
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
  <div class="modal-backdrop" data-close></div>
  <article class="modal-window"> ... </article>
</div>
```

- Backdrop: `rgba(0,0,0,.82)` + `blur(4px)`; clique fecha.
- Window: largura `min(640px, 100%)`, `max-height: 85vh`, scrollável, borda `--line-strong`,
  fundo quase opaco, faixa superior de gradiente branco (`rgba(255,255,255,.07) → 0`) como "glow".
- Entrada: `translateY(12px) → 0` + fade em `.25s var(--ease-out)`.
- Fechar: botão textual `[ X ]` com borda; também `Esc`.
- Ao abrir: travar scroll do body (`overflow:hidden`), devolver foco ao fechar.
- Estrutura interna: cabeçalho `[ID] + título`, meta (`YEAR:` / `ROLE:`), tags, descrição, ações (btn).

### 7.9 Lista de links (contato)

Grade de links full-width divididos por linha inferior 1px. Hover: texto clareia e link desliza
(`padding-left: 4px → 10px`).

```css
.contact-links { display:grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); }
.contact-links a {
  display:flex; justify-content:center; align-items:center;
  padding: 14px 4px;
  color: var(--dim); text-decoration:none;
  font-size:12px; letter-spacing:.2em;
  border-bottom: 1px solid var(--line);
  transition: color var(--t-fast) ease, padding-left var(--t-fast) ease;
}
.contact-links a:hover { color: var(--fg); padding-left: 10px; }
```

### 7.10 Rodapé

Full-width (mesma largura do header, sem max-width), borda superior 1px,
superfície blurred igual aos cards, conteúdo centralizado, texto pequeno em `rgba(255,255,255,.7)`.

---

## 8. Fundo assinatura — Dot Grid Shader

O fundo de todos os projetos é um canvas WebGL fixed cobrindo a viewport (`z-index: 0`,
`pointer-events: none`), renderizando uma grade de pontinhos estilo "canvas infinito"
que ilumina onde o mouse passa. Implementação de referência: `src/shader.js` do projeto
portfolio (copiável sem alterações).

Especificação visual:

| Parâmetro | Valor | Descrição |
|---|---|---|
| Espaçamento da grade | `26px * dpr` | Distância entre pontos |
| Raio do ponto | `1.15px * dpr` | Antialiasing de ±0.9px |
| Brilho base | `0.05` | Pontos visíveis mas discretos, com shimmer individual |
| Glow do mouse | gaussiana, `σ = 140px * dpr` | Ponto chega a ~10x o brilho base perto do cursor |
| Halo secundário | gaussiana, `σ = 300px * dpr` | Luz ambiente larga muito fraca (`0.05`) |
| Suavização do cursor | lerp `0.12` por frame | O ponto de luz segue o mouse com leve atraso |
| DPR máximo | `2` | Performance em telas retina |

Requisitos comportamentais:
- Antes da primeira interação, o ponto de luz flutua automaticamente (drift senoidal).
- `prefers-reduced-motion`: renderizar frame estático apenas em resize/mousemove, sem loop.
- Pausar o loop com aba oculta (`visibilitychange`).
- Fallback: sem WebGL, esconder o canvas — o fundo preto puro continua válido.

---

## 9. Movimento

| Nome | Spec | Uso |
|---|---|---|
| Blink | `1.1s steps(1) infinite`, opacity `1 → 0` | Cursores `▌` e `_` |
| Pulse | `2s ease-in-out infinite`, opacity `1 → .25` | Status dot |
| Underline nav | `scaleX 0→1`, `.3s var(--ease-out)`, origin left | Hover/active |
| Fade-slide | `opacity 0→1` + `translateY(12px→0)`, `.25s var(--ease-out)` | Modal |
| Sweep | opacity `0→1`, `.4s ease` | Tile hover |
| Slide lateral | `padding-left` ou `translateX(4px)`, `.25s` | Links de contato |

- Easing padrão: `cubic-bezier(0.23, 1, 0.32, 1)`.
- Durações: `.25s–.4s`. Nada acima de `.5s`.
- Kill switch obrigatório:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
```

---

## 10. Ícones & Glifos

Sem biblioteca de ícones. Usar apenas glifos tipográficos:

| Glifo | Significado |
|---|---|
| `↗` | Abrir externo |
| `→` | Avançar / ação primária |
| `[ X ]` | Fechar modal |
| `▌` / `_` | Cursor vivo |
| `[001]` | Índice/ordenação |
| `//` | Comentário/subtítulo |
| `$` | Comando/terminal |

---

## 11. Acessibilidade

- `focus-visible` global: `outline: 1px solid var(--fg); outline-offset: 3px;`
- Contraste: texto principal `#fff` sobre `#000` (21:1); `--dim` (~55%) reservado para apoio; nunca usar `--faint` para informação essencial.
- Modal: `role="dialog"`, `aria-modal`, foco movido ao fechar ao abrir, devolvido ao elemento originário no fechamento, `Esc` fecha.
- Imagens decorativas do shader: `aria-hidden="true"` + `pointer-events:none`.
- Navegação com âncoras precisa de `scroll-margin-top` compensando o header fixo.
- `lang` correto no `<html>`.

---

## 12. Checklist para novo projeto

- [ ] Copiar bloco de tokens (§2) para o CSS base
- [ ] Incluir JetBrains Mono pesos `100–500` (§4)
- [ ] Reset: `* { box-sizing: border-box; margin: 0; padding: 0; }`
- [ ] `body`: fundo `--bg`, fonte `--font`, peso 300, `line-height 1.65`, `-webkit-font-smoothing: antialiased`
- [ ] `::selection` invertido
- [ ] Header fixo + nav com sublinhado animado (§7.1–7.2)
- [ ] Section heads com `[index] + título + linha gradiente` (§5)
- [ ] Cards/superfícies com blur (§6)
- [ ] Copiar `shader.js` e o `<canvas id="bg-shader">` (§8)
- [ ] Kill switch de reduced motion (§9)
- [ ] Conferir: nenhum `border-radius`, nenhuma cor fora da paleta, nenhuma borda ≠ 1px

## 13. Anti-padrões (proibido)

- ❌ `border-radius` em qualquer elemento
- ❌ Sombras difusas escuras (`box-shadow` preto) — profundidade vem de blur/borda, não de sombra
- ❌ Segunda família tipográfica
- ❌ Cores saturadas fora de `--status-ok`
- ❌ Bordas de 2px+ ou dupla borda
- ❌ Gradientes coloridos — gradiente é sempre branco transparente
- ❌ Animações > 500ms ou com bounce/elástico
- ❌ Emoji como ícone de interface
