import { Link } from '@/i18n/routing';
import { BlogPostResult } from '@/interfaces';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { getCategoryVariant } from '@/lib';
import { Badge } from '../ui/badge';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

interface BlogCardProps extends BlogPostResult {}

export const BlogCard = ({ metadata }: BlogCardProps) => {
  const t = useTranslations('Blog');

  return (
    <Link
      key={metadata.slug}
      href={{
        pathname: '/blog/[slug]',
        params: { slug: metadata.slug },
      }}
      className="block"
    >
      <Card className="group hover:border-primary transition-colors border-dashed overflow-hidden flex flex-col h-full animate-entrance relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <div className="text-9xl opacity-40">
            {metadata.category === 'Coding' && '💻'}
            {metadata.category === 'Lifestyle' && '🌿'}
            {metadata.category === 'Music' && '🎵'}
            {metadata.category === 'Gaming' && '🎮'}
            {metadata.category === 'General' && '📝'}
          </div>
        </div>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/80 to-background/95" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          <CardHeader className="pb-3">
            <div className="flex justify-end mb-2">
              <Badge variant={getCategoryVariant(metadata.category)} className="text-xs">
                {metadata.category}
              </Badge>
            </div>
            <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
              {metadata.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col pt-0">
            <CardDescription className="line-clamp-3 mb-4 flex-1">
              {metadata.excerpt}
            </CardDescription>

            {/* Metadata */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar size={12} />
              <span>{metadata.publishDate}</span>
              <Separator orientation="vertical" className="h-3" />
              <Clock size={12} />
              <span>{t('reading_time', { time: metadata.readingTime })}</span>
            </div>
          </CardContent>

          <CardFooter className="flex-col items-start gap-3 pt-0">
            {/* Tags */}
            <div className="flex gap-1 flex-wrap">
              {metadata.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="justify-end w-full transition-colors group-hover:text-primary hover:text-primary cursor-pointer hover:bg-transparent"
            >
              {t('read_more')}
              <ArrowRight className="ml-2" size={14} />
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};
