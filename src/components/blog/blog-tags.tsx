import { Badge } from '../ui/badge';

interface BlogTagsProps {
  tags: string[];
  maxTags?: number;
}

export const BlogTags = ({ tags, maxTags }: BlogTagsProps) => {
  const displayTags = maxTags ? tags.slice(0, maxTags) : tags;

  return (
    <div className="flex gap-2 flex-wrap">
      {displayTags.map((tag) => (
        <Badge key={tag} variant="secondary" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  );
};
