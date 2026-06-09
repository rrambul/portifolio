# Introdução aos Web Components: Estado Atual e Por Que Você Deve se Importar

Este é o primeiro post de uma série que irei escrever sobre Web Components. O objetivo deste artigo é dar uma introdução ao assunto e apresentar o estado atual dessa tecnologia, explicando suas vantagens e os problemas que ela resolve.

&nbsp;

## O que são Web Components?

Web Components são um conjunto de padrões da Web que permitem criar componentes reutilizáveis e nativos do HTML, independentes de qualquer framework. Em outras palavras, você pode construir elementos personalizados que funcionam em qualquer projeto, seja ele feito com React, Vue, Angular ou apenas HTML e JavaScript puro.

&nbsp;

## Por que usar Web Components?

Com Web Components, você pode construir um Design System usando apenas APIs nativas da Web, sem depender de bibliotecas externas. Isso traz benefícios como:

&nbsp;

* **Longevidade:** Seu Design System não ficará preso a um framework que pode se tornar obsoleto.

* **Compatibilidade:** Todos os navegadores modernos suportam Web Components (desde janeiro de 2020).

* **Performance:** Por não depender de grandes frameworks, você evita pacotes gigantescos e reduz a quantidade de JavaScript no navegador.

&nbsp;

## Principais Tecnologias dos Web Components

Os Web Components são baseados em três principais tecnologias:

&nbsp;

* **Custom Elements:** Permite criar e registrar novos elementos HTML personalizados.

* **Shadow DOM:** Proporciona encapsulamento para que HTML e CSS sejam isolados do restante da página.

* **HTML Templates:** Permite definir blocos de HTML reutilizáveis que podem ser clonados sem renderização imediata.

&nbsp;

## Principais Vantagens

&nbsp;

### Interoperabilidade

Defina custom elements para criar novos elementos HTML que funcionam com qualquer biblioteca ou framework.

&nbsp;

### Encapsulamento

Utilize Shadow DOM para isolar estilos e renderização de HTML.

&nbsp;

### Composição

Use slots para compor elementos de forma nativa e criar árvores de renderização dinâmicas.

&nbsp;

### Semântica vs. Renderização

Separe o HTML semântico do HTML de renderização com Shadow DOM.

&nbsp;

### Estilização Inteligente

Declare CSS Parts para ensinar ao navegador como o modelo de estilos do seu componente funciona.

&nbsp;

## Ferramentas para Trabalhar com Web Components

Se você deseja começar a usar Web Components de forma prática, aqui estão algumas ferramentas populares:

&nbsp;

* **Lit:** Uma biblioteca leve para criar Web Components de forma declarativa.

* **Stencil:** Voltada para criação de Design Systems e componentes reutilizáveis.

* **Shoelace:** Um conjunto de componentes prontos baseados em Web Components.

&nbsp;

## Adoção pela Indústria

Os padrões de Web Components foram implementados por todos os navegadores modernos desde janeiro de 2020. Aqui estão alguns números:

&nbsp;

* Mais de 18% das páginas renderizadas no Chrome usam Web Components.

* O número de padrões implementados dobrou desde 2020.

&nbsp;

Além disso, grandes empresas e produtos já utilizam essa tecnologia, como:

YouTube, MSN, Photoshop, Salesforce, SpaceX Dashboard

&nbsp;

## O que vem a seguir?

No próximo post desta série, vamos criar um Web Component do zero, passo a passo, e entender como usar essas tecnologias na prática.
