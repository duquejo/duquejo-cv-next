import { generateMetadata as generateMeta } from '@/lib';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export async function generateMetadata() {
  return generateMeta('Blog');
}

// Mock blog post data
const mockPost = {
  slug: 'building-modern-web-apps-nextjs-15',
  title: 'Building Modern Web Apps with Next.js 15',
  excerpt:
    'Discover the latest features in Next.js 15, including improved performance, better developer experience, and new App Router capabilities that make building modern web applications easier than ever.',
  category: 'Coding' as const,
  tags: ['NextJS', 'React', 'TypeScript'],
  publishDate: 'January 15, 2025',
  readingTime: '5 min',
  content: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    
    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
    
    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
    
    Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
  `,
};

const getCategoryVariant = (category: string) => {
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

export default function BlogPostPage() {
  const t = useTranslations('Blog');

  return (
    <article className="px-5 pt-5 pb-20 sm:pb-5 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link href="/blog">
        <Button variant="ghost" size="sm" className="mb-3 md:mb-4 cursor-pointer mt-10 md:mt-0">
          <ArrowLeft className="mr-2" size={16} />
          Back to Blog
        </Button>
      </Link>

      {/* Category Badge */}
      <div className="flex">
        <Badge variant={getCategoryVariant(mockPost.category)} className="mb-4 block">
          {mockPost.category}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">{mockPost.title}</h1>

      {/* Metadata */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{mockPost.publishDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{t('readingTime', { time: mockPost.readingTime })}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-8">
        {mockPost.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {mockPost.content.split('\n').map((paragraph, index) => {
          if (paragraph.trim()) {
            return (
              <p key={index} className="mb-4 text-base leading-relaxed">
                {paragraph.trim()}
              </p>
            );
          }
          return null;
        })}
      </div>
    </article>
  );
}
