# rfdinstrucional.github.io

Portfolio pessoal. Site single-page construído com [Vite](https://vite.dev) + **JavaScript Obfuscator**:
o build gera um bundle minificado e ofuscado (nomes `_0x...`, strings em base64, control flow
flattening, dead code injection) — o código publicado no navegador não é legível nem interpretável.
O `npm run dev` permanece normal para desenvolvimento; a ofuscação só entra no `npm run build`.

## Rodar localmente

```bash
npm install
npm run dev        # dev server em http://localhost:3000

npm run build      # gera dist/ (versão de produção)
npm run preview    # serve dist/ para testar o build final
```

### Docker

O Vite está configurado com `host: true` (escuta em `0.0.0.0`) e porta fixa **3000**,
compatível com o mapeamento `3000:3000` do `docker-compose.yml`. Suba o container e
acesse de fora dele em `http://localhost:3000`. O `usePolling` já está ativo para o
HMR funcionar com volume montado.

## Deploy no GitHub Pages

O repo se chama `rfdinstrucional.github.io`, então é um **user site**:
a URL final é `https://rfdinstrucional.github.io/` e o `base` do Vite já está como `'/'`.

1. No GitHub: **Settings → Pages → Build and deployment → Source** → selecione **GitHub Actions**
2. Faça push na branch `main` — o workflow `.github/workflows/deploy.yml`
   faz build e deploy automaticamente.

> **Atenção:** repositórios privados só publicam GitHub Pages em planos pagos (Pro/Team).
> Na conta gratuita, torne o repositório público para o site funcionar.
> (O código-fonte pode ficar público sem problema — o que vai pro ar é só o bundle minificado.)

## Editar conteúdo

- **Foto:** substitua `public/avatar.svg` pela sua foto (ex.: `avatar.jpg`) e ajuste
  `<img src="/avatar.svg">` em `index.html`.
- **Sobre você:** edite o bloco `#about` em `index.html` (nome, cargo, ferramentas).
- **Projetos:** edite `src/data/projects.js` (título, ano, role, tags, descrição, link).
  A galeria e os modais são gerados automaticamente a partir desse array.
- **Contatos:** edite a seção `#contact` em `index.html`.

## Estrutura

```
├── index.html                  # markup da página única
├── src/
│   ├── main.js                 # galeria, modal, nav ativa
│   ├── style.css               # tema preto / linhas 1px / monospace
│   ├── shader.js               # fundo WebGL (dot grid + luz do mouse)
│   └── data/projects.js        # conteúdo dos projetos
├── public/
│   ├── avatar.svg              # foto placeholder
│   └── favicon.svg
└── .github/workflows/deploy.yml
```
