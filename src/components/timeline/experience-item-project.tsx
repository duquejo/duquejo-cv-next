import { Target } from 'lucide-react';
import { memo } from 'react';
import type { ExperienceWithItemsProps } from '@/interfaces';

export const ExperienceItemProject = memo(({ withIcons, title }: ExperienceWithItemsProps) => {
  return (
    <h2 className="flex items-center gap-x-2 text-lg">
      {withIcons && <Target size={16} className="hidden md:block" />}
      {title}
    </h2>
  );
});

ExperienceItemProject.displayName = 'ExperienceItemProject';
