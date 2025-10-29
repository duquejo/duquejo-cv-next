import { getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib';
import { getBlogPostsByLocale } from '@/actions/blog';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogNotFound } from '@/components/blog/blog-not-found';
import { BlogFeaturedCard } from '@/components/blog/blog-featured-card';

export async function generateMetadata() {
  return createMetadata('Blog');
}

export default async function BlogPage() {
  const t = await getTranslations('Blog');
  const posts = await getBlogPostsByLocale();

  if (posts.length === 0) {
    return <BlogNotFound />;
  }

  const [featuredPost, ...regularPosts] = posts
    .filter((post) => post !== null)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishDate).getTime() - new Date(a.metadata.publishDate).getTime(),
    );

  return (
    <article className="px-5 pt-5 pb-20 sm:pb-5">
      <h1 className="main-title">{t('title')}</h1>

      {/* Featured Post */}
      {featuredPost && <BlogFeaturedCard metadata={featuredPost.metadata} />}

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <BlogCard key={post.metadata.slug} metadata={post.metadata} />
          ))}
        </div>
      )}
    </article>
  );
}
