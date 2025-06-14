export interface BlogPost {
  id: string;
  title: {
    en: string;
    pt: string;
  };
  excerpt: {
    en: string;
    pt: string;
  };
  content: {
    en: string;
    pt: string;
  };
  date: string;
  banner: string;
  slug: string;
  tags: string[];
  readTime: number; // in minutes
  author: {
    name: string;
    avatar?: string;
  };
}

export interface BlogPostMetadata {
  id: string;
  title: {
    en: string;
    pt: string;
  };
  excerpt: {
    en: string;
    pt: string;
  };
  date: string;
  banner: string;
  slug: string;
  tags: string[];
  readTime: number;
  author: {
    name: string;
    avatar?: string;
  };
} 