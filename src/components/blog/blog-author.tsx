import { Calendar, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toLocaleDateString } from '@/lib/utilities';

interface BlogAuthorProps {
  readingTime: string;
  publishDate: string;
  author?: {
    name: string;
    avatar: string;
    initials: string;
  };
}

export const BlogAuthor = ({
  readingTime,
  publishDate,
  author = {
    name: 'José Duque',
    avatar: '/static/img/avatar-small.webp',
    initials: 'JD',
  },
}: BlogAuthorProps) => {
  return (
    <div className="flex items-center gap-3 mb-6 animate-entrance duration-100 justify-center md:justify-start">
      <Avatar className="h-12 w-12">
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback>{author.initials}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-semibold text-sm">{author.name}</div>
        <div className="flex-none md:flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{toLocaleDateString(publishDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <time>{readingTime}</time>
          </div>
        </div>
      </div>
    </div>
  );
};
