---
id: "007"
title: NEXUS
year: "2023"
role: DESIGNER INSTRUCIONAL
tags:
  - MICROLEARNING
  - MOBILE
  - OFFLINE
cover: null
link: "#"
video: null
---

## Sobre o Projeto

Nexus é um sistema de performance support mobile para equipes de campo de uma ONG de educação. Técnicos que visitam escolas remotas precisam de acesso rápido a protocolos, checklists e guias de resolução de problemas — sem depender de conexão estável de internet.

## Metodologia

O projeto utilizou Análise de Tarefas (Task Analysis) para mapear os 23 procedimentos mais executados em campo. Cada tarefa foi decomposta em passos com happy path e branchings para exceções. O conteúdo foi fragmentado em microlearning de 2-3 minutos, otimizado para consulta sob demanda — não para estudo sequencial.

## Conhecimentos Envolvidos

- Análise de tarefas e fluxos de trabalho
- Design para offline-first
- Microlearning aplicado a suporte de desempenho
- Checklists interativas e guias visuais

## Solução Técnica

Progressive Web App em React com service workers para cache completo dos módulos. Dados sincronizados via background sync quando há conectividade. Interface optimizada para uso com uma mão (thumb zone). Contém 47 micro-módulos com vídeos curtos, checklists interativas e glossário contextual.

## Resultado

Implementado em 32 equipes de campo (128 técnicos). O tempo médio de resolução de problemas em campo reduziu de forma significativa. A dependência de chamadas ao suporte central caiu drasticamente. Disponível offline 100% do tempo, mesmo nas regiões mais remotas.

![Screenshot do projeto](./assets/circuits.jpeg)
