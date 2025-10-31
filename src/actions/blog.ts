'use server';

import type { BlogPost, BlogPostResult, Event } from '@/interfaces';
import { getLocale } from 'next-intl/server';
import { promises as fs } from 'node:fs';

const BLOG_CONTENT_DIR = 'content/blog';

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

export async function getBlogPostsByLocale(limit: number = -1): Promise<BlogPostResult[]> {
  const currentLocale = await getLocale();
  const files = await fs.readdir(BLOG_CONTENT_DIR);

  const localeFileSuffix = `.${currentLocale}.mdx`;

  const localizedFiles = files
    .filter((file) => file && file.endsWith(localeFileSuffix))
    .map((file) => file.replace(localeFileSuffix, ''));

  if (limit > 0) {
    localizedFiles.splice(limit);
  }

  const blogPosts = await Promise.all(
    localizedFiles.map((fileName) => getBlogPostBySlug(fileName)),
  );

  return blogPosts.filter((post) => post !== null);
}
