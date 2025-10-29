import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { createMetadata } from '@/lib';
import { ArrowLeft } from 'lucide-react';
import { BlogAuthor } from '@/components/blog/blog-author';
import { getBlogPostBySlug } from '@/actions/blog';

export async function generateMetadata() {
  return createMetadata('Blog');
}

export function generateStaticParams() {
  return [{ slug: 'welcome' }, { slug: 'building-modern-web-apps-nextjs-15' }];
}

export const dynamicParams = false;

export default async function BlogPostPage({ params }: PageProps<'/[lang]/blog/[slug]'>) {
  const { slug } = await params;

  const { Post, metadata } = await getBlogPostBySlug(slug);

  return (
    <article className="px-5 pt-5 pb-20 sm:pb-5 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link href="/blog">
        <Button
          variant="ghost"
          size="sm"
          className="pl-0 mb-2 md:mb-4 cursor-pointer mt-10 md:mt-0"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Blog
        </Button>
      </Link>

      {/* Category Badge */}
      <div className="flex animate-entrance duration-100">
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
      <div className="max-w-none animate-entrance duration-500">
        <p className="mb-4 text-base leading-relaxed">{metadata.excerpt}</p>

        <Post />
      </div>
    </article>
  );
}
