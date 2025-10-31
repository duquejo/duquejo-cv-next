import { ReactNode } from 'react';

export type BlogCategory = 'Coding' | 'Lifestyle' | 'Music' | 'Gaming' | 'General';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  publishDate: string;
  readingTime: string;
  coverImage?: string;
}

export interface BlogPostResult {
  Post: () => ReactNode;
  metadata: BlogPost;
}
