import { BlogPostMetadata } from "@/types/blog";

export const blogPosts: BlogPostMetadata[] = [
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
    date: "2025-06-14",
    banner: "/blog/briefintroduction.jpg",
    slug: "a-brief-introduction",
    tags: ["Introduction", "Personal", "Software Engineering", "Goals"],
    readTime: 3,
    author: {
      name: "Renan Rambul"
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
    date: "2025-06-15",
    banner: "/blog/bulletjournal.jpg",
    slug: "bullet-journal-method-my-adaptation",
    tags: ["Productivity", "Organization", "Personal Development", "Bullet Journal"],
    readTime: 8,
    author: {
      name: "Renan Rambul"
    }
  },
  {
    id: "3",
    title: {
      en: "Introduction to Web Components: Current State and Why You Should Care",
      pt: "Introdução aos Web Components: Estado Atual e Por Que Você Deve se Importar"
    },
    excerpt: {
      en: "Web Components are a set of web standards that allow you to create reusable, native HTML components that are framework-agnostic. Learn about their current state and why they matter.",
      pt: "Web Components são um conjunto de padrões da Web que permitem criar componentes reutilizáveis e nativos do HTML, independentes de qualquer framework. Entenda seu estado atual e por que são importantes."
    },
    date: "2025-06-16",
    banner: "/blog/webcomponents.svg",
    slug: "introduction-to-web-components",
    tags: ["Web Components", "Frontend", "JavaScript", "Web Development", "Design Systems"],
    readTime: 5,
    author: {
      name: "Renan Rambul"
    }
  }
];

export function getBlogPosts(): BlogPostMetadata[] {
  // Copy before sorting so we don't mutate the shared module-level array.
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPost(slug: string): BlogPostMetadata | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByTag(tag: string): BlogPostMetadata[] {
  return blogPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
} 