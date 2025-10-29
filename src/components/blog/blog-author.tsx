import { Calendar, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface BlogAuthorProps {
  readingTime: string;
  publishDate: string;
}

export const BlogAuthor = ({ readingTime, publishDate }: BlogAuthorProps) => {
  return (
    <div className="flex items-center gap-3 mb-6 animate-entrance duration-100">
      <Avatar className="h-12 w-12">
        <AvatarImage src="/static/img/avatar-small.webp" alt="José" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-sm">José Duque</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{publishDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{readingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
