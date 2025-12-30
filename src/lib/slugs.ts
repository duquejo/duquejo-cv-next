import type { Locale } from 'next-intl';
import type { BlogPost } from '@/interfaces';

/**
 * Get the localized slug for a blog post based on locale
 * Falls back to canonical slug if locale-specific slug is not defined
 */
export function getSlugByLocale(post: BlogPost, locale: Locale): string {
  if (locale === 'es' && post.slugEs) {
    return post.slugEs;
  }

  if (locale === 'en' && post.slugEn) {
    return post.slugEn;
  }

  // Fallback
  return post.slug;
}

/**
 * Get all slug variants for a blog post
 * Returns an object with slugs for each locale
 */
export function getAllSlugVariants(post: BlogPost): Record<Locale, string> {
  return {
    en: post.slugEn || post.slug,
    es: post.slugEs || post.slug,
  };
}
