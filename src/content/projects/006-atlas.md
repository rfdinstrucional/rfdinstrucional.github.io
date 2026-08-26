---
id: "006"
title: ATLAS
year: "2024"
role: DESIGNER INSTRUCIONAL + DEV
tags:
  - GEOGRAFIA
  - THREEJS
  - EXPLORAÇÃO
cover: ./assets/worldtour.jpeg
link: "#"
video: null
---

## Sobre o Projeto

Atlas é um app de descoberta do planeta onde o aluno explora um globo 3D em tempo real. Cada país revela camadas de informação — capitais, cultura, gastronomia, fauna e flora, história e pontos turísticos — transformando geografia em experiência de exploração vivida. Não é um mapa: é uma expedição.

## Metodologia

Aplicou-se o modelo de Exploration-Based Learning, onde o aprendiz conduz o próprio caminho de descoberta. Cada país foi estruturado com camadas de profundidade (básico → intermediário → avançado), permitindo que o aluno navegue no seu ritmo. A curadoria de conteúdo seguiu taxonomia de Bloom com foco em compreender e aplicar.

## Conhecimentos Envolvidos

- Geografia política e física
- Cultura e diversidade cultural
- História mundial e fatos relevantes
- Fauna, flora e biomas

## Solução Técnica

Globo 3D renderizado em Three.js com texturas de satélite de alta resolução. Interface em React com sistema de camadas (layers) que permite ao aluno filtrar tipos de informação. Busca por texto e filtros por continente/região. Mobile-first com suporte a touch gestures para rotacionar e dar zoom. Dados via API com cache offline.

## Resultado

Protótipo funcional com 50 países mapeados e 6 camadas de informação por nação. Testado com 40 alunos do ensino fundamental II. A retenção de informações geográficas aumentou de forma significativa comparada ao uso de mapa plano. 96% dos alunos preferiram o globo 3D ao atlas impresso.

![Screenshot do projeto](./assets/worldtour.jpeg)
