import { getLocale, getTranslations } from 'next-intl/server';
import { getBlogPostsByLocale } from '@/actions/blog';
import { BlogCard, BlogFeaturedCard, BlogNotFound } from '@/components/blog';
import { Separator } from '@/components/ui/separator';
import { createMetadata, getSlugByLocale, sortByDateString } from '@/lib';

export async function generateMetadata() {
  return createMetadata('Blog');
}

export default async function BlogPage() {
  const t = await getTranslations('Blog');
  const locale = await getLocale();
  const posts = await getBlogPostsByLocale(-1, locale); // If wanted, limit can be adjusted here.

  if (posts.length === 0) {
    return (
      <BlogNotFound title={t('title')} content={t('content')} no_articles={t('no_articles')} />
    );
  }

  const [featuredPost, ...regularPosts] = posts.sort((a, b) =>
    sortByDateString(a.metadata.publishDate, b.metadata.publishDate),
  );

  return (
    <article className="px-5 pt-5 pb-20 sm:pb-5">
      <h1 className="main-title">{t('title')}</h1>
      <p className="md:max-w-4xl max-w-full m-auto mb-5">{t('content')}</p>

      {/* Featured Post */}
      {featuredPost && (
        <section role="contentinfo" className="flex flex-col">
          <BlogFeaturedCard
            title={featuredPost.metadata.title}
            category={featuredPost.metadata.category}
            slug={getSlugByLocale(featuredPost.metadata, locale)}
            excerpt={featuredPost.metadata.excerpt}
            publishDate={featuredPost.metadata.publishDate}
            tags={featuredPost.metadata.tags}
            readingTime={t('reading_time', { time: featuredPost.metadata.readingTime })}
            readMoreText={t('read_more')}
          />
        </section>
      )}

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 && (
        <>
          <Separator className="my-2" />

          <section role="contentinfo" className="flex flex-col">
            <h2 className="main-subtitle">{t('subtitle')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <BlogCard
                  key={post.metadata.slug}
                  slug={getSlugByLocale(post.metadata, locale)}
                  category={post.metadata.category}
                  title={post.metadata.title}
                  excerpt={post.metadata.excerpt}
                  publishDate={post.metadata.publishDate}
                  tags={post.metadata.tags}
                  readingTime={t('reading_time', { time: post.metadata.readingTime })}
                  readMoreText={t('read_more')}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </article>
  );
}
