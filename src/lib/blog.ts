import type { BlogPost } from '@/interfaces';
import type { Locale } from 'next-intl';

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

/**
 * Get the canonical slug from a localized slug
 * Used for reverse lookup when accessing a post by its localized URL
 */
export function getCanonicalSlug(localizedSlug: string, posts: BlogPost[]): string | null {
  const post = posts.find(
    (p) => p.slug === localizedSlug || p.slugEn === localizedSlug || p.slugEs === localizedSlug,
  );
  return post ? post.slug : null;
}

/**
 * Build a comprehensive slug map for quick lookups
 * Maps localized slugs to canonical slugs and vice versa
 */
export function buildSlugMap(posts: BlogPost[]): {
  localizedToCanonical: Map<string, string>;
  canonicalToLocalized: Map<string, Record<Locale, string>>;
} {
  const localizedToCanonical = new Map<string, string>();
  const canonicalToLocalized = new Map<string, Record<Locale, string>>();

  posts.forEach((post) => {
    const variants = getAllSlugVariants(post);

    // Map localized slugs to canonical
    Object.entries(variants).forEach(([_, slug]) => {
      localizedToCanonical.set(slug, post.slug);
    });

    // Map canonical to all localized variants
    canonicalToLocalized.set(post.slug, variants);
  });

  return { localizedToCanonical, canonicalToLocalized };
}

/**
 * Get the folder name for a blog post based on locale
 * This matches the new file structure: folder-name/index.locale.mdx
 */
export function getFolderByLocale(post: BlogPost, locale: Locale): string {
  return getSlugByLocale(post, locale);
}
