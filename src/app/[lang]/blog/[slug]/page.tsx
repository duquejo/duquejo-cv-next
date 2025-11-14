import { generateStaticPosts } from '@/actions/blog';
import { resolveBlogPostSlug } from '@/actions/blog-post-resolver';
import { getUrl } from '@/app/sitemap';
import { BlogAuthor, BlogSocialShare } from '@/components/blog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { type Href } from '@/i18n/routing';
import { createBlogPostMetadata } from '@/lib';

export async function generateMetadata({ params }: PageProps<'/[lang]/blog/[slug]'>) {
  const { slug, lang } = await params;
  return createBlogPostMetadata(slug, lang);
}

export async function generateStaticParams() {
  return generateStaticPosts();
}

export default async function BlogPostPage({ params }: PageProps<'/[lang]/blog/[slug]'>) {
  const { slug, lang } = await params;

  const result = await resolveBlogPostSlug(slug, lang);

  const { Post, metadata } = result;

  return (
    <>
      {/* Category Badge */}
      <div className="flex animate-entrance duration-100 mt-5">
        <Badge variant="default" className="mb-4 block md:mx-0 mx-auto">
          {metadata.category}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-left text-center lg:text-5xl font-bold mb-4 leading-tight animate-entrance">
        {metadata.title}
      </h1>

      {/* Author Info with Avatar */}
      <BlogAuthor readingTime={metadata.readingTime} publishDate={metadata.publishDate} />

      {/* Tags */}
      {metadata.tags && (
        <div className="md:flex-row flex flex-col justify-center md:justify-between my-2">
          <div className="flex flex-wrap gap-2 md:max-w-10/12 justify-center md:justify-start">
            {metadata.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="animate-entrance duration-200 shrink-0"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0 justify-center">
            <BlogSocialShare url={getUrl(`/blog/${slug}` as Href, lang)} />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="max-w-none animate-entrance duration-500">
        <Separator className="my-5" />
        <Post />
      </section>
    </>
  );
}
