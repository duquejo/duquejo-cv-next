import { ReactNode } from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishDate: string;
  readingTime: string;
  coverImage: string;
}

export interface BlogPostResult {
  Post: () => ReactNode;
  metadata: BlogPost;
}
