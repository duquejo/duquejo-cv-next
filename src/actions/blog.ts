'use server';

import type { BlogPost, BlogPostResult } from '@/interfaces';
import { getLocale } from 'next-intl/server';
import { promises as fs } from 'node:fs';

const BLOG_CONTENT_DIR = 'content/blog';

const getLocaleSuffix = (path: string): string => `.${path}.mdx`;

/**
 * getBlogPostsFilenames retrieves the filenames of blog posts for a given locale.
 * @param locale locale of the blog posts
 */
export async function getBlogPostsFilenames(locale?: string): Promise<string[]> {
  const currentLocale = locale || (await getLocale());
  const files = await fs.readdir(BLOG_CONTENT_DIR);

  const localeFileSuffix = getLocaleSuffix(currentLocale);

  return files
    .filter((file) => file && file.endsWith(localeFileSuffix))
    .map((file) => file.replace(localeFileSuffix, ''));
}

/**
 * getBlogPostsByLocale retrieves a list of blog posts for a given locale.
 * It limits the number of posts returned based on the provided limit.
 *
 * @param limit maximum number of blog posts to retrieve
 * @param locale locale of the blog posts
 */
export async function getBlogPostsByLocale(
  limit: number = -1,
  locale?: string,
): Promise<BlogPostResult[]> {
  const fileNames = await getBlogPostsFilenames(locale);

  if (limit > 0) {
    fileNames.splice(limit);
  }

  const blogPosts = await Promise.all(fileNames.map((fileName) => getBlogPostBySlug(fileName)));

  return blogPosts.filter((post) => post !== null);
}

/**
 * getBlogPostBySlug retrieves a blog post by its slug and locale.
 * It dynamically imports the corresponding MDX file and extracts its content and metadata.
 *
 * @param slug slug of the blog post
 * @param locale locale of the blog post
 */
export async function getBlogPostBySlug(
  slug: string,
  locale?: string,
): Promise<BlogPostResult | null> {
  const currentLocale = locale || (await getLocale());

  const localeFileSuffix = getLocaleSuffix(currentLocale);

  try {
    const { default: Post, frontmatter: metadata } = await import(
      `@/blog/${slug}${localeFileSuffix}`
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
