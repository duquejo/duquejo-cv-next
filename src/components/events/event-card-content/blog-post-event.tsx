import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { BlogEventPayload, EventRepo } from '@/interfaces';

interface BlogPostProps {
  payload: BlogEventPayload;
  repo: EventRepo;
}

export const BlogPostEvent = ({ payload, repo }: BlogPostProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Link href={repo.url} className="font-bold hover:underline underline-offset-2">
        {payload.blog_title}
      </Link>

      {payload.description && (
        <p className="text-xs text-muted-foreground line-clamp-3">{payload.description}</p>
      )}

      <div className="flex flex-wrap gap-1 items-center">
        {payload.blog_category && (
          <Badge variant="outline" className="text-xs">
            {payload.blog_category}
          </Badge>
        )}
      </div>
    </div>
  );
};
