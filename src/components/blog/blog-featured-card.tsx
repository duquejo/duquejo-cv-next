import { Link } from '@/i18n/routing';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { getCategoryVariant, getSlugByLocale } from '@/lib';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import type { BlogPostResult } from '@/interfaces';
import { Badge } from '@/components/ui/badge';
import { BlogMetadata } from './blog-metadata';

interface BlogFeaturedCardProps {
  metadata: BlogPostResult['metadata'];
}

export const BlogFeaturedCard = ({ metadata }: BlogFeaturedCardProps) => {
  const t = useTranslations('Blog');
  const locale = useLocale();

  const localizedSlug = getSlugByLocale(metadata, locale);

  return (
    <section>
      <Link
        href={{
          pathname: '/blog/[slug]',
          params: { slug: localizedSlug },
        }}
        className="block"
      >
        <Card className="mb-10 bg-sidebar/30 border-2 border-primary overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Image Area */}
            <div className="md:col-span-2 bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center min-h-[250px] md:min-h-full">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
                <Badge variant={getCategoryVariant(metadata.category)} className="text-xs">
                  {t('featured')}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3 p-6 flex flex-col justify-center">
              <Badge variant={getCategoryVariant(metadata.category)} className="w-fit mb-3">
                {metadata.category}
              </Badge>
              <CardTitle className="text-2xl lg:text-3xl mb-3 leading-tight">
                {metadata.title}
              </CardTitle>
              <CardDescription className="text-base mb-4 leading-relaxed">
                {metadata.excerpt}
              </CardDescription>

              {/* Metadata */}
              <BlogMetadata
                publishDate={metadata.publishDate}
                readingTime={metadata.readingTime}
                className="mb-4"
              />

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                {metadata.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button variant="default" size="sm" className="w-fit cursor-pointer">
                {t('read_more')}
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </section>
  );
};
