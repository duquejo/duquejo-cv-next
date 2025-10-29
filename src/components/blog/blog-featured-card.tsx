import { Link } from '@/i18n/routing';
import { Card, CardDescription, CardTitle } from '../ui/card';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getCategoryVariant } from '@/lib';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
import type { BlogPostResult } from '@/interfaces';
import { Badge } from '../ui/badge';

interface BlogFeaturedCardProps extends BlogPostResult {}

export const BlogFeaturedCard = ({ metadata }: BlogFeaturedCardProps) => {
  const t = useTranslations('Blog');

  return (
    <Link
      href={{
        pathname: '/blog/[slug]',
        params: { slug: metadata.slug },
      }}
      className="block"
    >
      <Card className="mb-10 bg-sidebar/30 border-2 border-primary overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="grid md:grid-cols-5 gap-0">
          {/* Mock Image Area */}
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
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{metadata.publishDate}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{t('reading_time', { time: metadata.readingTime })}</span>
              </div>
            </div>

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
  );
};
