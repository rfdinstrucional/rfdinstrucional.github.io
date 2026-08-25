---
id: "004"
title: SIGNAL_CLI
year: "2024"
role: BACKEND
tags:
  - NODE
  - CLI
  - SQLITE
cover: ./assets/cover-4.svg
link: https://example.com/signal-cli
---

## Sobre o Projeto

O Signal CLI é uma ferramenta de linha de comandos para pipelines de processamento de sinais. Ele permite aplicar filtros, transformações e análises em séries temporais de forma rápida e reproduzível.

## Desafio

Processar grandes volumes de dados de sinal com memória limitada, garantindo que cada etapa do pipeline pudesse ser encadeada de forma fluida sem carregar o dataset completo na RAM.

## Solução

Construído com Node.js e SQLite para persistência, o CLI utiliza streams para processamento lazy de dados. Cada comando é uma transformação pipeline que opera sobre o stream anterior, mantendo uso de memória constante.

## Resultado

Capaz de processar arquivos de sinal de até 10GB com menos de 100MB de RAM. A interface CLI permite criação de scripts reproducíveis para análise de dados científicos e engenharia de sinais.

![Screenshot do projeto](./assets/content-4.svg)
