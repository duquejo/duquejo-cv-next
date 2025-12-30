'use server';

import { notFound, RedirectType } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { getBlogPostBySlug, getBlogPostsFilenames } from '@/actions/blog';
import { type Href, redirect } from '@/i18n/routing';
import type { BlogPost, BlogPostResult } from '@/interfaces';
import { getSlugByLocale } from '@/lib';

const BLOG_BASE_PATH = '/blog';

/**
 * Constructs the blog path for a given post metadata and locale.
 */
const getBlogPath = (metadata: BlogPost, currentLocale: string): Href =>
  `${BLOG_BASE_PATH}/${getSlugByLocale(metadata, currentLocale)}` as Href;

/**
 * Checks if a slug matches any of the post's slug variants.
 */
function isSlugMatch(post: BlogPostResult['metadata'], targetSlug: string): boolean {
  return post.slug === targetSlug || post.slugEn === targetSlug || post.slugEs === targetSlug;
}

/**
 * Attempts to find a blog post by iterating through all available posts.
 * Returns the post if found with correct slug, or the correct slug for redirect.
 *
 * @param localizedSlug The slug to search for
 * @param currentLocale The current locale
 * @returns Object with found post or redirect slug, or null if not found
 */
async function findPostBySlug(
  localizedSlug: string,
  currentLocale: string,
): Promise<{ post: BlogPostResult; needsRedirect: boolean } | null> {
  const fileNames = await getBlogPostsFilenames(currentLocale);

  for (const fileName of fileNames) {
    const postResult = await getBlogPostBySlug(fileName, currentLocale);

    if (!postResult) continue;

    const { metadata } = postResult;

    if (isSlugMatch(metadata, localizedSlug)) {
      const correctSlug = getSlugByLocale(metadata, currentLocale);
      return {
        post: postResult,
        needsRedirect: localizedSlug !== correctSlug,
      };
    }
  }

  return null;
}

/**
 * Resolves a blog post slug to its canonical form.
 * If the provided slug does not match the canonical slug for the current locale,
 * it redirects to the correct URL.
 *
 * @param localizedSlug The localized slug to resolve.
 * @param locale The locale of the blog post.
 * @returns The resolved blog post result.
 */
export async function resolveBlogPostSlug(
  localizedSlug: string,
  locale?: string,
): Promise<BlogPostResult> {
  const currentLocale = locale || (await getLocale());

  const match = await getBlogPostBySlug(localizedSlug, currentLocale);

  // Try direct match.
  if (match) return match;

  // Fall back to exhaustive search (O(n) lookup)
  const result = await findPostBySlug(localizedSlug, currentLocale);

  if (!result) {
    notFound();
  }

  const { post, needsRedirect } = result;

  if (needsRedirect) {
    redirect(
      {
        href: getBlogPath(post.metadata, currentLocale),
        locale: currentLocale,
      },
      RedirectType.replace,
    );
  }

  return post;
}
