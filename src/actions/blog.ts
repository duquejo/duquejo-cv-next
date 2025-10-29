'use server';

import { ReactNode } from 'react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishDate: string;
  readingTime: string;
  coverImage: string;
}

interface BlogPostResult {
  Post: () => ReactNode;
  metadata: BlogPost;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostResult> {
  const { default: Post, frontmatter: metadata } = await import(`@/blog/${slug}.mdx`);

  console.log(Post, metadata);

  return {
    Post,
    metadata: metadata satisfies BlogPost,
  };
}
