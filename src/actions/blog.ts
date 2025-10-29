'use server';

import type { BlogPost, BlogPostResult } from '@/interfaces';
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

export async function getBlogPostsByLocale(): Promise<(BlogPostResult | null)[]> {
  const currentLocale = await getLocale();
  const files = await fs.readdir(BLOG_CONTENT_DIR);

  const localeFileSuffix = `.${currentLocale}.mdx`;

  const localizedFiles = files
    .filter((file) => file && file.endsWith(localeFileSuffix))
    .map((file) => file.replace(localeFileSuffix, ''));

  return Promise.all(localizedFiles.map((fileName) => getBlogPostBySlug(fileName)));
}
