import { createMetadata } from '@/lib';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { CodeBlock } from '@/components/general/code-block';

export async function generateMetadata() {
  return await createMetadata('Blog');
}

// Mock blog post data
const mockPost = {
  slug: 'building-modern-web-apps-nextjs-15',
  title: 'Building Modern Web Apps with Next.js 15',
  excerpt:
    'Discover the latest features in Next.js 15, including improved performance, better developer experience, and new App Router capabilities that make building modern web applications easier than ever.',
  category: 'Coding',
  tags: ['NextJS', 'React', 'TypeScript'],
  publishDate: 'January 15, 2025',
  readingTime: '5 min',
  content: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    
    Duis aute irure dolor in reprehenderit in voluptate velit esse <b>cillum dolore eu fugiat</b> nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    
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

  const codeString = `// Example: Server Component with Next.js 15
import { Suspense } from 'react';

export default async function Page() {
  const data = await fetchData();
  
  return (
    <div>
      <h1>{data.title}</h1>
      <Suspense fallback={<Loading />}>
        <DynamicContent />
      </Suspense>
    </div>
  );
}`;

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
        <Badge variant={getCategoryVariant(mockPost.category)} className="mb-4 block">
          {mockPost.category}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight animate-entrance">
        {mockPost.title}
      </h1>

      {/* Author Info with Avatar */}
      <div className="flex items-center gap-3 mb-6 animate-entrance duration-100">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/static/img/avatar-small.webp" alt="José Duque" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">José Duque</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{mockPost.publishDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{t('readingTime', { time: mockPost.readingTime })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-8">
        {mockPost.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="animate-entrance duration-200">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Hero Image */}
      <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden bg-linear-to-br from-primary/20 to-primary/5 animate-entrance duration-300">
        <Image
          src="/static/img/showcase/mentu.webp"
          alt={mockPost.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="max-w-none animate-entrance duration-500">
        {mockPost.content.split('\n').map((paragraph, index) => {
          if (paragraph.trim()) {
            return (
              <p
                key={index}
                className="mb-4 text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: paragraph.trim() }}
              />
            );
          }
          return null;
        })}

        {/* Code Snippet */}
        <div className="my-8 rounded-lg bg-sidebar/50 border border-border overflow-hidden">
          <div className="bg-sidebar/80 px-4 py-2 border-b border-border">
            <span className="text-xs text-right font-mono text-muted-foreground">TypeScript</span>
          </div>
          <CodeBlock code={codeString} />
        </div>

        <p className="mb-4 text-base leading-relaxed">
          Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
          ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
          tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
          perferendis doloribus asperiores repellat.
        </p>
      </div>
    </article>
  );
}
