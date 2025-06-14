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