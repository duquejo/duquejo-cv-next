import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { createMetadata } from '@/lib';
import { ArrowLeft } from 'lucide-react';
import { BlogAuthor } from '@/components/blog/blog-author';
import { getBlogPostBySlug, getBlogPostsFilenames } from '@/actions/blog';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

export const dynamicParams = false;

export async function generateMetadata() {
  return createMetadata('Blog');
}

export async function generateStaticParams() {
  const locales = routing.locales;

  const fileNames = await Promise.all(
    locales.map(async (locale) => {
      const fileNames = await getBlogPostsFilenames(locale);
      return fileNames.map((slug) => ({ slug, lang: locale }));
    }),
  );

  return fileNames.flat();
}

export default async function BlogPostPage({ params }: PageProps<'/[lang]/blog/[slug]'>) {
  const t = await getTranslations('Blog');
  const { slug, lang } = await params;

  const result = await getBlogPostBySlug(slug, lang);

  if (!result) {
    return redirect('/blog');
  }

  const { Post, metadata } = result;

  return (
    <article className="px-5 pt-5 pb-20 sm:pb-5 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link href="/blog">
        <Button variant="ghost" size="sm" className="mb-2 md:mb-4 cursor-pointer mt-10 md:mt-0">
          <ArrowLeft size={16} />
          {t('back_to_blog')}
        </Button>
      </Link>

      {/* Category Badge */}
      <div className="flex animate-entrance duration-100 mt-5">
        <Badge variant="default" className="mb-4 block mr-2">
          {metadata.category}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight animate-entrance">
        {metadata.title}
      </h1>

      {/* Author Info with Avatar */}
      <BlogAuthor readingTime={metadata.readingTime} publishDate={metadata.publishDate} />

      {/* Tags */}
      {metadata.tags && (
        <div className="flex gap-2 flex-wrap mb-8">
          {metadata.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="animate-entrance duration-200">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Content */}
      <section className="max-w-none animate-entrance duration-500">
        <p className="text-base leading-relaxed">{metadata.excerpt}</p>
        <Separator className="my-5" />
        <Post />
      </section>
    </article>
  );
}
