# E-commerce & Gestão de Pedidos para Petshop e Agro — MVP Demonstrativo

Protótipo funcional desenvolvido para demonstrar como um negócio de varejo pet e agropecuário pode estruturar vendas online e acompanhamento de pedidos e estoque em um único fluxo.

* **Demo Online (Loja):** https://depaula-casa-do-criador-demo.paulosup-dez.workers.dev/
* **Demo Online (Painel Admin):** https://depaula-casa-do-criador-demo.paulosup-dez.workers.dev/admin

---

## Oportunidade & Proposta da Demonstração

A ideia deste projeto surgiu da proposta de levar uma experiência digital estruturada para lojas do segmento pet e agropecuário, onde é comum que o atendimento, a consulta de itens e o controle de retirada ou entrega aconteçam de forma manual.

O protótipo simula como o cliente pode buscar produtos, montar o carrinho e acompanhar pedidos, enquanto a gestão visualiza indicadores, atualiza etapas do pedido e ajusta quantidades em estoque.

---

## Fluxo Demonstrado na Aplicação

### 1. Visão do Cliente (`/`)
* **Busca e Categorias:** Navegação por categorias (*Rações, Cães, Gatos, Pássaros, Coelhos, Higiene e Saúde* e *Promoções*) e busca de itens.
* **Jornada de Compra:** Vitrine com preços e estoque ilustrativo, acesso a `Meus Pedidos` e `Meu Carrinho`, além de cenários de *Retirada na loja*, *Pedido direto pelo site* e *Entrega para a região*.

### 2. Visão Administrativa (`/admin`)
* **Painel de Acompanhamento:** Indicadores de vendas registradas, pedidos, ticket médio e estoque crítico, gráfico de desempenho recente e resumo operacional.
* **Fluxo de Pedidos:** Visualização de pedidos e avanço de status operacional (como *Separando* e *Pronto*).
* **Estoque e Movimentações:** Ajuste rápido de quantidades (`-` e `+`), destaque para itens com estoque baixo, lista de mais vendidos e registro de movimentações.

---

## Stack e Estrutura

* **Frontend:** JavaScript, HTML5 e CSS3 com **Vite**.
* **Deploy:** Build e publicação de ativos estáticos via **Cloudflare Workers** (`wrangler.jsonc`).

```text
├── public/           # Ativos estáticos e imagens da demonstração
├── src/              # Telas da loja, modais de pedido e painel administrativo
├── index.html        # Entrypoint da aplicação
├── package.json      # Scripts e dependências
├── vite.config.js    # Configuração do Vite
└── wrangler.jsonc    # Configuração de deploy na Cloudflare
