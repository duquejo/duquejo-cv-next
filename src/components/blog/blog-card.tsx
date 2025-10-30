import { Link } from '@/i18n/routing';
import { BlogPostResult } from '@/interfaces';
import { getCategoryVariant } from '@/lib';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BlogCategoryIcon } from './blog-category-icon';
import { BlogMetadata } from './blog-metadata';
import { BlogTags } from './blog-tags';

interface BlogCardProps {
  metadata: BlogPostResult['metadata'];
}

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
          <BlogCategoryIcon category={metadata.category} />
        </div>

        {/* Overlay gradient */}
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
            <BlogMetadata publishDate={metadata.publishDate} readingTime={metadata.readingTime} />
          </CardContent>

          <CardFooter className="flex-col items-start gap-3 pt-0">
            {/* Tags */}
            <BlogTags tags={metadata.tags} maxTags={3} />

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
