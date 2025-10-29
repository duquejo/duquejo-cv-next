'use server';

import type { BlogPost, BlogPostResult } from '@/interfaces';
import { getLocale } from 'next-intl/server';
import { promises as fs } from 'node:fs';

export async function getBlogPostBySlug(slug: string): Promise<BlogPostResult | null> {
  const currentLocale = await getLocale();

  try {
    const { default: Post, frontmatter: metadata } = await import(
      `@/blog/${slug}.${currentLocale}.mdx`
    );
    return {
      Post,
      metadata: metadata satisfies BlogPost,
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

export async function getBlogPostsByLocale(): Promise<(BlogPostResult | null)[]> {
  const currentLocale = await getLocale();
  const files = await fs.readdir('content/blog');

  const localeFilePattern = `.${currentLocale}.mdx`;

  const localizedFiles = files
    .filter((file) => file && file.endsWith(localeFilePattern))
    .map((file) => file.replace(localeFilePattern, ''));

  return Promise.all(localizedFiles.map((fileName) => getBlogPostBySlug(fileName)));
}
