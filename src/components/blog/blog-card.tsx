import { BlogCategoryIcon, BlogMetadata, BlogTags } from '@/components/blog';
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
import { Link } from '@/i18n/routing';
import { BlogPostResult } from '@/interfaces';
import { getCategoryVariant } from '@/lib';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  slug: string;
  category: BlogPostResult['metadata']['category'];
  title: BlogPostResult['metadata']['title'];
  excerpt: BlogPostResult['metadata']['excerpt'];
  publishDate: BlogPostResult['metadata']['publishDate'];
  tags: BlogPostResult['metadata']['tags'];
  readMoreText?: string;
  readingTime?: string;
}

export const BlogCard = ({
  slug,
  category,
  title,
  excerpt,
  publishDate,
  tags,
  readMoreText,
  readingTime,
}: BlogCardProps) => {
  return (
    <Link
      href={{
        pathname: '/blog/[slug]',
        params: { slug },
      }}
      className="block"
    >
      <Card className="group hover:border-primary transition-colors border-dashed overflow-hidden flex flex-col h-full animate-entrance relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <BlogCategoryIcon category={category} />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/80 to-background/95" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          <CardHeader className="pb-3">
            <div className="flex justify-end mb-2">
              <Badge variant={getCategoryVariant(category)} className="text-xs">
                {category}
              </Badge>
            </div>
            <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col pt-0">
            <CardDescription className="line-clamp-3 mb-4 flex-1">{excerpt}</CardDescription>

            {/* Metadata */}
            <BlogMetadata publishDate={publishDate} readingTime={readingTime} />
          </CardContent>

          <CardFooter className="flex-col items-start gap-3 pt-0">
            {/* Tags */}
            {tags && tags.length > 0 && <BlogTags maxTags={3} tags={tags} />}

            <Button
              variant="ghost"
              size="sm"
              className="justify-end w-full transition-colors group-hover:text-primary hover:text-primary cursor-pointer hover:bg-transparent"
            >
              {readMoreText}
              <ArrowRight className="ml-2" size={14} />
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};
