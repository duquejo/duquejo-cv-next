import type { BlogCategory, BlogPostResult } from '@/interfaces';

/**
 * Builder class for creating mock BlogPostResult objects in tests.
 * Provides a fluent API for test data construction with sensible defaults.
 *
 * @example
 * const post = new MockBlogPostBuilder()
 *   .withSlug('hello-world')
 *   .withTitle('Hello World')
 *   .withCategory('Coding')
 *   .build();
 *
 * @example
 * const postWithoutSlugEn = new MockBlogPostBuilder()
 *   .withSlugs('test', undefined, 'prueba')
 *   .withoutSlugEn()
 *   .build();
 */
export class MockBlogPostBuilder {
  private post: BlogPostResult = {
    Post: () => 'Mock content',
    metadata: {
      slug: 'test-post',
      slugEn: 'test-post',
      slugEs: 'test-post',
      title: 'Test Post',
      excerpt: 'Test excerpt',
      category: 'General',
      tags: ['test'],
      publishDate: '2024-01-01',
      readingTime: '5 min',
    },
  };

  /**
   * Sets the canonical slug for the post.
   */
  withSlug(slug: string): this {
    this.post.metadata.slug = slug;
    return this;
  }

  /**
   * Sets the English slug variant.
   */
  withSlugEn(slugEn: string | undefined): this {
    this.post.metadata.slugEn = slugEn;
    return this;
  }

  /**
   * Sets the Spanish slug variant.
   */
  withSlugEs(slugEs: string | undefined): this {
    this.post.metadata.slugEs = slugEs;
    return this;
  }

  /**
   * Sets all three slug variants at once.
   */
  withSlugs(slug: string, slugEn: string | undefined, slugEs: string | undefined): this {
    this.post.metadata.slug = slug;
    this.post.metadata.slugEn = slugEn;
    this.post.metadata.slugEs = slugEs;
    return this;
  }

  /**
   * Sets the post title.
   */
  withTitle(title: string): this {
    this.post.metadata.title = title;
    return this;
  }

  /**
   * Sets the post excerpt.
   */
  withExcerpt(excerpt: string): this {
    this.post.metadata.excerpt = excerpt;
    return this;
  }

  /**
   * Sets the post category.
   */
  withCategory(category: BlogCategory): this {
    this.post.metadata.category = category;
    return this;
  }

  /**
   * Sets the post tags.
   */
  withTags(...tags: string[]): this {
    this.post.metadata.tags = tags;
    return this;
  }

  /**
   * Sets the publish date.
   */
  withPublishDate(date: string): this {
    this.post.metadata.publishDate = date;
    return this;
  }

  /**
   * Sets the reading time.
   */
  withReadingTime(time: string): this {
    this.post.metadata.readingTime = time;
    return this;
  }

  /**
   * Sets the Post component function.
   */
  withPostComponent(component: () => string): this {
    this.post.Post = component;
    return this;
  }

  /**
   * Sets the cover image (optional field).
   */
  withCoverImage(coverImage: string): this {
    this.post.metadata.coverImage = coverImage;
    return this;
  }

  /**
   * Removes the slugEn property (sets to undefined).
   */
  withoutSlugEn(): this {
    this.post.metadata.slugEn = undefined;
    return this;
  }

  /**
   * Removes the slugEs property (sets to undefined).
   */
  withoutSlugEs(): this {
    this.post.metadata.slugEs = undefined;
    return this;
  }

  /**
   * Returns the built BlogPostResult.
   */
  build(): BlogPostResult {
    return this.post;
  }
}
