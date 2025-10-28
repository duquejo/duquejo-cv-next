import { createMetadata } from '@/lib';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export async function generateMetadata() {
  return await createMetadata('Blog');
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'Coding' | 'Lifestyle' | 'Music' | 'Gaming';
  tags: string[];
  publishDate: string;
  readingTime: string;
  featured: boolean;
}

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Modern Web Apps with Next.js 15',
    excerpt:
      'Discover the latest features in Next.js 15, including improved performance, better developer experience, and new App Router capabilities that make building modern web applications easier than ever.',
    category: 'Coding',
    tags: ['NextJS', 'React', 'TypeScript'],
    publishDate: 'January 15, 2025',
    readingTime: '5 min',
    featured: true,
  },
  {
    id: '2',
    title: 'Work-Life Balance as a Developer',
    excerpt:
      'Tips and strategies for maintaining healthy boundaries between work and personal life while staying productive and avoiding burnout in the tech industry.',
    category: 'Lifestyle',
    tags: ['Productivity', 'Health', 'Career'],
    publishDate: 'January 10, 2025',
    readingTime: '4 min',
    featured: false,
  },
  {
    id: '3',
    title: 'Music Production for Developers',
    excerpt:
      'How learning music production can improve your coding skills. Exploring the parallels between composing music and writing clean, maintainable code.',
    category: 'Music',
    tags: ['Music', 'Creativity', 'Hobbies'],
    publishDate: 'January 5, 2025',
    readingTime: '6 min',
    featured: false,
  },
  {
    id: '4',
    title: 'The Best Indie Games of 2024',
    excerpt:
      'A curated list of indie games that pushed creative boundaries and delivered unforgettable experiences. From puzzle platformers to narrative adventures.',
    category: 'Gaming',
    tags: ['Gaming', 'Reviews', 'Entertainment'],
    publishDate: 'December 28, 2024',
    readingTime: '7 min',
    featured: false,
  },
  {
    id: '5',
    title: 'TypeScript Best Practices in 2025',
    excerpt:
      'Essential TypeScript patterns and practices for writing type-safe, maintainable code. Learn how to leverage advanced types and avoid common pitfalls.',
    category: 'Coding',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    publishDate: 'December 20, 2024',
    readingTime: '8 min',
    featured: false,
  },
  {
    id: '6',
    title: 'Minimalist Living in the Digital Age',
    excerpt:
      'Embracing simplicity and intentionality in a world of constant notifications and information overload. Practical steps to declutter your digital life.',
    category: 'Lifestyle',
    tags: ['Minimalism', 'Wellness', 'Digital Detox'],
    publishDate: 'December 15, 2024',
    readingTime: '5 min',
    featured: false,
  },
];

const getCategoryVariant = (category: BlogPost['category']) => {
  switch (category) {
    case 'Coding':
      return 'default';
    case 'Lifestyle':
      return 'secondary';
    case 'Music':
      return 'outline';
    case 'Gaming':
      return 'outline';
    default:
      return 'outline';
  }
};

export default function BlogPage() {
  const t = useTranslations('Blog');
  const featuredPost = mockPosts.find((post) => post.featured);
  const regularPosts = mockPosts.filter((post) => !post.featured);

  return (
    <article className="px-5 pt-5 pb-20 sm:pb-5">
      <h1 className="main-title">{t('title')}</h1>

      {/* Featured Post */}
      {featuredPost && (
        <Link
          href={{
            pathname: '/blog/[slug]',
            params: { slug: 'building-modern-web-apps-nextjs-15' },
          }}
          className="block"
        >
          <Card className="mb-10 bg-sidebar/30 border-2 border-primary overflow-hidden animate-entrance hover:shadow-lg transition-shadow cursor-pointer">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Mock Image Area */}
              <div className="md:col-span-2 bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center min-h-[250px] md:min-h-full">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                  <Badge variant={getCategoryVariant(featuredPost.category)} className="text-xs">
                    {t('featured')}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-6 flex flex-col justify-center">
                <Badge variant={getCategoryVariant(featuredPost.category)} className="w-fit mb-3">
                  {featuredPost.category}
                </Badge>
                <CardTitle className="text-2xl lg:text-3xl mb-3 leading-tight">
                  {featuredPost.title}
                </CardTitle>
                <CardDescription className="text-base mb-4 leading-relaxed">
                  {featuredPost.excerpt}
                </CardDescription>

                {/* Metadata */}
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{featuredPost.publishDate}</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{t('readingTime', { time: featuredPost.readingTime })}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {featuredPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="default" size="sm" className="w-fit cursor-pointer">
                  {t('readMore')}
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          </Card>
        </Link>
      )}

      {/* Regular Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularPosts.map((post, index) => (
          <Link
            key={post.id}
            href={{
              pathname: '/blog/[slug]',
              params: { slug: 'building-modern-web-apps-nextjs-15' },
            }}
            className="block"
          >
            <Card
              className="group hover:border-primary transition-colors border-dashed overflow-hidden flex flex-col h-full animate-entrance relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="text-9xl opacity-20">
                  {post.category === 'Coding' && '💻'}
                  {post.category === 'Lifestyle' && '🌿'}
                  {post.category === 'Music' && '🎵'}
                  {post.category === 'Gaming' && '🎮'}
                </div>
              </div>

              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/80 to-background/95" />

              {/* Content Container */}
              <div className="relative z-10 flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-end mb-2">
                    <Badge variant={getCategoryVariant(post.category)} className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col pt-0">
                  <CardDescription className="line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </CardDescription>

                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    <span>{post.publishDate}</span>
                    <Separator orientation="vertical" className="h-3" />
                    <Clock size={12} />
                    <span>{t('readingTime', { time: post.readingTime })}</span>
                  </div>
                </CardContent>

                <CardFooter className="flex-col items-start gap-3 pt-0">
                  {/* Tags */}
                  <div className="flex gap-1 flex-wrap">
                    {post.tags.slice(0, 3).map((tag) => (
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
                    {t('readMore')}
                    <ArrowRight className="ml-2" size={14} />
                  </Button>
                </CardFooter>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </article>
  );
}
