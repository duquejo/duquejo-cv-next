import type { ExperienceWithItemsProps } from '@/interfaces';
import { Code } from 'lucide-react';
import { memo } from 'react';

export const ExperienceItemRole = memo(({ withIcons, title }: ExperienceWithItemsProps) => {
  return (
    <div>
      {withIcons && <Code size={16} className="mr-2 hidden md:inline" />}
      {title}
    </div>
  );
});

ExperienceItemRole.displayName = 'ExperienceItemRole';
