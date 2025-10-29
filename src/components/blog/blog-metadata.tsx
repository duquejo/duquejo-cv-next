import { Calendar, Clock } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib';

interface BlogMetadataProps {
  publishDate: string;
  readingTime: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const BlogMetadata = ({
  publishDate,
  readingTime,
  size = 'sm',
  className,
}: BlogMetadataProps) => {
  const t = useTranslations('Blog');
  const iconSize = size === 'sm' ? 12 : 14;
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className={cn('flex items-center gap-3 text-muted-foreground', textSize, className)}>
      <div className="flex items-center gap-1">
        <Calendar size={iconSize} />
        <span>{publishDate}</span>
      </div>
      <Separator orientation="vertical" className="h-3" />
      <div className="flex items-center gap-1">
        <Clock size={iconSize} />
        <span>{t('reading_time', { time: readingTime })}</span>
      </div>
    </div>
  );
};
