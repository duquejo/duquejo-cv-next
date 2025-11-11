import { BlogCategoryIcon, BlogMetadata, BlogTags } from '@/components/blog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';
import type { BlogPostResult } from '@/interfaces';
import { getCategoryVariant } from '@/lib';
import { ArrowRight } from 'lucide-react';

interface BlogFeaturedCardProps {
  category: BlogPostResult['metadata']['category'];
  title: BlogPostResult['metadata']['title'];
  slug: BlogPostResult['metadata']['slug'];
  excerpt: BlogPostResult['metadata']['excerpt'];
  publishDate: BlogPostResult['metadata']['publishDate'];
  tags: BlogPostResult['metadata']['tags'];
  readingTime?: string;
  readMoreText?: string;
}

export const BlogFeaturedCard = ({
  category,
  slug,
  title,
  excerpt,
  readingTime,
  publishDate,
  tags,
  readMoreText,
}: BlogFeaturedCardProps) => {
  return (
    <Link
      href={{
        pathname: '/blog/[slug]',
        params: { slug },
      }}
      className="block"
    >
      <Card className="mb-10 bg-sidebar/30 border-2 border-primary overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="grid md:grid-cols-5 gap-0">
          {/* Image Area */}
          <div className="md:col-span-2 bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center min-h-[250px] md:min-h-full">
            <div className="text-center p-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center animate-wiggle">
                <BlogCategoryIcon category={category} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3 p-6 flex flex-col justify-center">
            <Badge variant={getCategoryVariant(category)} className="w-fit mb-3">
              {category}
            </Badge>
            <CardTitle className="text-2xl lg:text-3xl mb-3 leading-tight">{title}</CardTitle>
            <CardDescription className="text-base mb-4 leading-relaxed">{excerpt}</CardDescription>

            {/* Metadata */}
            <BlogMetadata publishDate={publishDate} readingTime={readingTime} className="mb-4" />

            {/* Tags */}
            {tags && tags.length > 0 && <BlogTags tags={tags} className="mb-4" />}

            <Button variant="default" size="sm" className="w-fit cursor-pointer">
              {readMoreText}
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};
