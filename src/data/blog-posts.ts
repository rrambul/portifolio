import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: {
      en: "A Brief Introduction",
      pt: "Uma Breve Apresentação"
    },
    excerpt: {
      en: "In this first post, I want to briefly introduce myself and share my goals for this blog. I'm someone who loves coding, learning, computers, reading, video games, and going to the gym.",
      pt: "Neste primeiro post do blog, quero fazer uma breve apresentação sobre mim e compartilhar meus objetivos com este espaço. Sou alguém que ama programar, aprender, lidar com computadores, ler, jogar videogames e ir à academia."
    },
    content: {
      en: `
# A Brief Introduction

In this first post, I want to briefly introduce myself and share my goals for this blog.

I'm someone who loves coding, learning, computers, reading, video games, and going to the gym. The main purpose of this blog is to share my thoughts, insights, and lessons learned about software engineering, productivity, and related topics.

Right now, I'm focusing my studies on software design and architecture. I've been diving into Domain-Driven Design and Clean Architecture to deepen my understanding.

Professionally, I'm currently working at Translational Analytics, where I help build a great product—mainly working on the frontend side.

I enjoy reading, although I have a habit of starting many books in parallel and finishing almost none of them 😅. At the moment, I'm reading *The Mythical Man-Month* and *The Pragmatic Programmer*.

I also like to listen to audiobooks while doing daily tasks like washing the dishes or doing cardio. I'm into philosophy, economics, financial management, and similar subjects. Recently, I finished *Fooled by Randomness* by Nassim Nicholas Taleb, and now I'm listening to *The Black Swan*.

I'm an open source enthusiast. I'm always looking for opportunities to contribute to open source projects. I believe it's one of the best ways to grow as a developer while giving back to the community.

As a software engineer, my main experience is in the JavaScript ecosystem and building web applications, but I'm always eager to explore new languages and paradigms like Elixir, Rust, or Java.
      `,
      pt: `
# Uma Breve Apresentação

Neste primeiro post do blog, quero fazer uma breve apresentação sobre mim e compartilhar meus objetivos com este espaço.

Sou alguém que ama programar, aprender, lidar com computadores, ler, jogar videogames e ir à academia. O principal objetivo deste blog é compartilhar reflexões, aprendizados e ideias sobre engenharia de software, produtividade e temas relacionados.

Atualmente, estou focado em estudar mais sobre design e arquitetura de software. Tenho me aprofundado em *Domain-Driven Design* e *Clean Architecture*.

Profissionalmente, trabalho atualmente na Translational Analytics, ajudando a construir um ótimo produto, principalmente atuando no lado do frontend.

Gosto muito de ler, embora tenha o hábito de começar vários livros ao mesmo tempo e raramente terminar algum 😅. No momento, estou lendo *The Mythical Man-Month* e *The Pragmatic Programmer*.

Também costumo ouvir audiolivros enquanto faço tarefas do dia a dia ou faço cardio. Me interesso por filosofia, economia, gestão financeira e assuntos similares. Recentemente terminei *Iludidos pelo Acaso*, do Nassim Nicholas Taleb, e agora estou ouvindo *A Lógica do Cisne Negro*.

Sou entusiasta de código aberto. Estou sempre procurando oportunidades para contribuir com projetos open source. Acredito que é uma excelente forma de evoluir como desenvolvedor enquanto colaboro com a comunidade de software.

Como engenheiro de software, minha principal experiência está no ecossistema JavaScript e na construção de aplicações web. Mas estou sempre buscando aprender novas linguagens e paradigmas como Elixir, Rust ou Java.
      `
    },
    date: "2025-06-14",
    banner: "/blog/briefintroduction.png",
    slug: "a-brief-introduction",
    tags: ["Introduction", "Personal", "Software Engineering", "Goals"],
    readTime: 3,
    author: {
      name: "Renan Rambul",
      avatar: "/profile-picture.jpg"
    }
  },
  {
    id: "2",
    title: {
      en: "Bullet Journal. Managing your life like a project",
      pt: "Bullet Journal. Gerenciando sua vida como um projeto"
    },
    excerpt: {
      en: "The Bullet Journal method is a journaling system designed to help organize goals and tasks over time. I've been using this method to manage my life for the past eight months, and it has been a real game changer for me.",
      pt: "O método Bullet Journal é uma forma de fazer anotações e organizar tarefas e metas ao longo do tempo. Tenho usado esse método para gerenciar minha vida nos últimos 8 meses e tem sido um divisor de águas."
    },
    content: {
      en: `
# Bullet Journal. Managing your life like a project

The Bullet Journal method is a journaling system designed to help organize goals and tasks over time. It was created by a software engineer, which is why it shares many similarities with agile project management — including planning, execution, and retrospectives.

The method is structured to allow flexible time management. You start with long-term planning and gradually break it down into months, weeks, and daily tasks. It embraces change and chaos — meaning you can adjust your goals as your circumstances evolve.

I've been using this method to manage my life for the past eight months, and it has been a real game changer for me. It helps bring awareness to your progress, achievements, and areas for improvement.

The Bullet Journal has its own "rules" and specific methods for journaling. However, my goal with this article is not to explain how to follow it step by step. Instead, I want to share how I adapted it to fit my own needs and how I use it in my daily life. If you're interested in learning the original method, check out the [Bullet Journal book](https://www.amazon.com.br/m%C3%A9todo-Bullet-Journal-Registre-organize/dp/8584391304) or visit [the official Bullet Journal blog](https://bulletjournal.com/).

&nbsp;

---

&nbsp;

## Why Use a Physical Journal Instead of Online Tools?

Writing by hand requires more focus and intentionality. The brain engages differently when using a pen versus typing or clicking on digital checkboxes.

With a physical journal, everything is centralized in one place — offline and distraction-free. The flexibility of a blank page lets you design it however you like. Want to draw something during your daily reflection? Go for it. Want to doodle or change the structure on a whim? You can.

Another benefit is screen-free time. While journaling or managing your life, you can stay away from digital distractions.

&nbsp;

---

&nbsp;

## The First Page – Index

The first page of your journal should be a summary or index. Here, you'll list the titles and page numbers of important sections so you can easily find them later.

&nbsp;

---

&nbsp;

## Long-Term Thinking

Next is your long-term planning section. Write down your goals for the next 5 to 10 years across various areas of life — career, health, learning, finances, etc.

The main goal here is direction, not perfection. These aren't goals you must achieve no matter what. Instead, they serve as a compass. If you accomplish them, great. If you accomplish different goals along the way, that's fine too. It's about having a guiding star.

&nbsp;

---

&nbsp;

## Yearly Planning

Break down your long-term goals into smaller, yearly objectives. Think about the progress you want to make this year. Keep in mind: these goals are also flexible. They serve as a guide — not strict rules.

&nbsp;

---

&nbsp;

## Monthly Planning

At the beginning of each month, review your yearly goals and define what you can achieve within that month. Also, write down important dates, deadlines, holidays, or events. You can track habits, routines, and mini-goals — like going to the gym 12 times, reading 200 pages, or finishing a specific part of a course.

&nbsp;

---

&nbsp;

## Weekly Planning

Each week, break down your monthly goals into even smaller tasks. For example: go to the gym 5 times, finish 2 course lessons, submit 3 pull requests, contribute to an open-source project, or read 50 pages.

&nbsp;

---

&nbsp;

## Daily Planning

Start every day by writing the date at the top of a new page, followed by a list of all tasks — no matter how small. Write everything down: "Receive a package," "Send email," "Buy groceries." This frees up mental space and reduces stress.

Personally, I even include meals like "breakfast," "lunch," and "dinner" to keep track of my entire day.

&nbsp;

---

&nbsp;

## Retrospective

At the end of each cycle (day, week, month, or year), take a moment to reflect.

- What did you accomplish?
- What didn't work?
- What could be improved?
- Did you overestimate or underestimate something?
- Were you lacking rest, sleep, or focus?

Write down improvements and highlights. This process helps you continuously improve your routine and stay aligned with your long-term goals.

&nbsp;

![Bullet Journal Example 2](/blog/bullet2.png)

---

&nbsp;

## Task Migration & Cancellation

At the end of each cycle, you'll find some tasks that were not completed. Migrate them to the next period if they still matter, or cancel them if they're no longer relevant.

&nbsp;

---

&nbsp;

## Page Design & Symbols

The Bullet Journal method uses specific symbols and structures to quickly manage tasks and notes. You can read more about them in this [official article](https://bulletjournal.com/blogs/faq/what-is-rapid-logging-understand-rapid-logging-bullets-and-signifiers?srsltid=AfmBOooZt0yVvMfmXqdV5AlYI3RpZtmC8fVGf90kNc-PzWP_fU8AfZKu).

&nbsp;

---

&nbsp;

## Continuous Improvement

The core idea is **continuous improvement** — just like in agile methodologies or the scientific method. You're always learning, adapting, and iterating. That's how I use the Bullet Journal to improve my life, habits, productivity, and goals.

It's been working incredibly well for me, and I have no plans to stop.

&nbsp;

![Bullet Journal Example 1](/blog/bullet1.png)


      `,
      pt: `
# Bullet Journal. Gerenciando sua vida como um projeto

O método Bullet Journal é uma forma de fazer anotações e organizar tarefas e metas ao longo do tempo. Ele foi criado por um engenheiro de software, e por isso tem muitas semelhanças com metodologias ágeis de gerenciamento de projetos — como planejamento, execução e retrospectiva.

Esse método é estruturado de forma a permitir uma gestão flexível do tempo. Você começa com um planejamento de longo prazo e vai quebrando em etapas menores: meses, semanas e tarefas diárias. Ele também abraça a mudança e o caos — ou seja, você pode ajustar suas metas conforme a vida muda.

Tenho usado esse método para gerenciar minha vida nos últimos 8 meses e tem sido um divisor de águas. Ele me ajuda a ter mais consciência sobre meus avanços, conquistas e pontos de melhoria.

O Bullet Journal tem suas próprias "regras" e métodos específicos. Mas meu objetivo aqui **não é ensinar o método oficial passo a passo**, e sim mostrar **como eu adaptei para o meu dia a dia e minhas necessidades**. Se quiser conhecer o método original, recomendo o [livro do Bullet Journal](https://www.amazon.com.br/m%C3%A9todo-Bullet-Journal-Registre-organize/dp/8584391304) ou o [blog oficial do Bullet Journal](https://bulletjournal.com/).

&nbsp;

---

&nbsp;

## Por que usar um caderno físico ao invés de ferramentas digitais?

Escrever à mão exige mais foco e intenção. O cérebro trabalha de maneira diferente quando você escreve com uma caneta, em vez de apenas digitar ou clicar para marcar tarefas.

Com um caderno físico, você centraliza toda a gestão da sua vida em um único lugar — offline e sem distrações. O papel em branco te dá liberdade para criar o que quiser. Se quiser desenhar algo na retrospectiva do dia, você pode. Quer personalizar do seu jeito? Sem limites.

Outro benefício é passar um tempo **sem tela**, longe de notificações ou distrações, enquanto você planeja e organiza sua vida.

&nbsp;

---

&nbsp;

## Primeira página – Sumário

A primeira página do seu journal deve ser o sumário. Nela você lista as páginas importantes com seus títulos e números, para localizar facilmente quando precisar.

&nbsp;

---

&nbsp;

## Pensamento de longo prazo

A próxima página é para o seu planejamento de longo prazo. Escreva suas metas para os próximos 5 ou 10 anos, nas mais diversas áreas da sua vida: carreira, saúde, estudos, finanças, etc.

O objetivo aqui é **ter uma direção**, não metas rígidas. Não é sobre atingir 100% do que você planejou ou se sentir mal se não conseguir. É ter um **norte**, um guia para suas decisões. Se você alcançar essas metas, ótimo. Se conquistar outras metas diferentes, também é ótimo.

&nbsp;

---

&nbsp;

## Planejamento Anual

Agora você transforma suas metas de longo prazo em objetivos para o ano. Crie metas menores e mais alcançáveis dentro de um período de 12 meses. Mas mantenha a mesma filosofia: são **metas flexíveis**, que servem como orientação e não como obrigação.

&nbsp;

---

&nbsp;

## Planejamento Mensal

Todo começo de mês, revise suas metas do ano e defina o que pode ser feito naquele mês. Anote também feriados, eventos importantes e datas especiais. Você pode monitorar hábitos e metas mensais — como ir à academia 12 vezes, ler 200 páginas ou completar um módulo de um curso.

&nbsp;

---

&nbsp;

## Planejamento Semanal

No início da semana, repita o processo de planejamento — agora focado nos objetivos da semana. Exemplos: ir à academia 5 vezes, assistir 2 aulas de um curso, entregar 3 pull requests, contribuir com um projeto open-source, ler 50 páginas de um livro.

&nbsp;

---

&nbsp;

## Planejamento Diário

Todo dia, comece anotando a data no topo da página. Abaixo, escreva todas as tarefas do dia — mesmo as pequenas. Exemplo: "Receber encomenda", "Enviar e-mail", "Comprar frutas".

Isso libera espaço na memória da sua mente para se concentrar em coisas mais importantes. Eu, pessoalmente, anoto até as refeições: café da manhã, almoço, jantar… tudo.

&nbsp;

---

&nbsp;

## Retrospectiva

No final de cada ciclo (dia, semana, mês, ano), pare e reflita:

- O que você conseguiu realizar?
- O que não deu certo?
- O que pode melhorar?
- Subestimou ou superestimou alguma meta?
- Dormiu mal? Descansou pouco?

Anote os pontos de melhoria e também os pontos positivos. Esse é o segredo para melhorar sua vida, sua rotina e alcançar suas metas de longo prazo de forma contínua.

&nbsp;

![Exemplo de Bullet Journal 2](/blog/bullet2.png)

---

&nbsp;

## Migração e cancelamento de tarefas

No fim de cada ciclo, sempre existirão tarefas que você não completou. Algumas devem ser migradas para o próximo período, outras podem ser canceladas se não fizerem mais sentido.

&nbsp;

---

&nbsp;

## Sinais e design das páginas

O método Bullet Journal tem símbolos e estruturas específicos para gerenciar tarefas e notas. Você pode ver mais detalhes nesse [artigo oficial](https://bulletjournal.com/blogs/faq/what-is-rapid-logging-understand-rapid-logging-bullets-and-signifiers?srsltid=AfmBOooZt0yVvMfmXqdV5AlYI3RpZtmC8fVGf90kNc-PzWP_fU8AfZKu).

&nbsp;

---

&nbsp;

## Melhoria contínua

O ponto-chave aqui é a **melhoria contínua** — assim como nas metodologias ágeis ou no método científico. Você está sempre aprendendo, adaptando e evoluindo. É assim que uso o Bullet Journal para melhorar minha vida, hábitos, produtividade e metas.

Está funcionando muito bem pra mim e não pretendo parar.

&nbsp;

![Exemplo de Bullet Journal 1](/blog/bullet1.png)


      `
    },
    date: "2025-06-15",
    banner: "/blog/bulletjournal.png",
    slug: "bullet-journal-method-my-adaptation",
    tags: ["Productivity", "Organization", "Personal Development", "Bullet Journal"],
    readTime: 8,
    author: {
      name: "Renan Rambul",
      avatar: "/profile-picture.jpg"
    }
  }
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
} 