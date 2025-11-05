'use server';

import type { BlogPost, BlogPostResult } from '@/interfaces';
import { getSlugByLocale } from '@/lib';
import { getLocale } from 'next-intl/server';
import { notFound, redirect, RedirectType } from 'next/navigation';
import { promises as fs } from 'node:fs';

const BLOG_CONTENT_DIR = 'content/blog';

const getLocaleSuffix = (locale: string): string => `.${locale}.mdx`;

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
    console.warn(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

export async function resolveBlogPostSlug(
  localizedSlug: string,
  locale?: string,
): Promise<BlogPostResult> {
  const currentLocale = locale || (await getLocale());

  const directMatch = await getBlogPostBySlug(localizedSlug, currentLocale);

  if (directMatch) {
    return directMatch;
  }

  // If not found, it might be a slug from frontmatter that doesn't match filename
  // We need to search, but we can optimize by only loading filenames first
  const fileNames = await getBlogPostsFilenames(currentLocale);

  for (const fileName of fileNames) {
    const postResult = await getBlogPostBySlug(fileName, currentLocale);

    if (!postResult) continue;

    const post = postResult.metadata;

    // Check if the localized slug matches this post's slug variants
    if (
      post.slug === localizedSlug ||
      post.slugEn === localizedSlug ||
      post.slugEs === localizedSlug
    ) {
      // Found it! Redirect to the correct filename-based URL
      const correctSlug = getSlugByLocale(post, currentLocale);

      // If the requested slug is different from the correct one, redirect
      if (localizedSlug !== correctSlug) {
        redirect(`/blog/${correctSlug}`, RedirectType.replace);
      }

      return postResult;
    }
  }

  // Not found in any variant
  return notFound();
}
