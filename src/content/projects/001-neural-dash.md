---
id: "001"
title: NEURAL_DASH
year: "2025"
role: FULL-STACK
tags:
  - REACT
  - D3
  - WEBSOCKET
cover: ./assets/cover-1.svg
link: https://example.com/neural-dash
video: https://www.youtube.com/watch?v=VIDEO_ID_1
---

## Sobre o Projeto

O Neural Dash é um dashboard de analytics em tempo real construído para visualizar dados de streaming com latência mínima. O sistema processa milhares de eventos por segundo e os apresenta em gráficos interativos atualizados via WebSocket.

## Desafio

O principal desafio era lidar com o volume alto de dados sem comprometer a performance da interface. A solução envolveu virtualização de lista, debounce nos renders e uma arquitetura de pub/sub no frontend para separar captação de dados da camada de apresentação.

## Solução

Desenvolvido com React e D3.js, o dashboard utiliza WebSocket para manter uma conexão persistente com o backend. Os dados são processados em worker threads e renderizados em componentes otimizados com `React.memo` e `useMemo`.

## Resultado

Redução de 80% no tempo de carregamento comparado ao dashboard anterior. Os usuários passaram a acompanhar métricas em tempo real com menos de 100ms de latência entre o evento e a visualização.

![Screenshot do projeto](./assets/content-1.svg)
