import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib';

interface BlogTagsProps {
  tags: string[];
  className?: string;
  maxTags?: number;
}

export const BlogTags = ({ tags, maxTags, className }: BlogTagsProps) => {
  const limitedTags = maxTags ? tags.slice(0, maxTags) : tags;

  return (
    <div className={cn('flex gap-2 flex-wrap', className)}>
      {limitedTags.map((tag) => (
        <Badge key={tag} title={tag} variant="secondary" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  );
};
