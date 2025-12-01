import { cn } from '@/lib';
import { memo } from 'react';

interface Props {
  isRecent: boolean;
  start_date: string;
  end_date?: string;
}

export const ExperienceHeaderTime = memo(({ isRecent, start_date, end_date }: Props) => {
  return (
    <>
      <span
        data-testid="detail"
        className="absolute w-2 h-2 rounded-full mt-1.5 -start-1 bg-primary"
      />
      <div className="pb-2 ml-4 flex items-center justify-between lg:justify-normal group-hover:text-foreground group-hover:ml-6 transition-all">
        <span
          data-testid="time"
          className={cn(
            'lg:inline-flex items-center border rounded px-2 py-1 font-semibold text-xs text-center group-hover:border-primary transition-all',
            isRecent ? 'border-primary' : 'border-secondary',
          )}
        >
          <time className="block">{start_date}</time>
          {end_date && (
            <time className="block lg:before:content-['-'] lg:before:mx-1">{end_date}</time>
          )}
        </span>
      </div>
    </>
  );
});

ExperienceHeaderTime.displayName = 'ExperienceHeaderTime';
