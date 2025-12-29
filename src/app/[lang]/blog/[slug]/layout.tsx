import { ArrowLeft } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { BlogProgress } from '@/components/blog/blog-progress';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export default async function BlogPostLayout({ children }: LayoutProps<'/[lang]/blog/[slug]'>) {
  const t = await getTranslations('Blog');
  return (
    <>
      <BlogProgress />
      <article className="px-5 md:px-0 pt-5 pb-20 sm:pb-5 max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-2 md:mb-0 cursor-pointer mt-10 md:mt-0"
          asChild
        >
          <Link href="/blog">
            <ArrowLeft size={16} />
            {t('back_to_blog')}
          </Link>
        </Button>

        {/* Post content */}
        {children}
      </article>
    </>
  );
}
