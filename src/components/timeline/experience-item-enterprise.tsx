import { Building } from 'lucide-react';
import { memo } from 'react';
import type { ExperienceWithItemsProps } from '@/interfaces';

export const ExperienceItemEnterprise = memo(({ withIcons, title }: ExperienceWithItemsProps) => {
  return (
    <div className="text-xs font-light mb-4 inline-flex items-center">
      {withIcons && <Building size={16} className="hidden md:block mr-2" />}
      {title}
    </div>
  );
});

ExperienceItemEnterprise.displayName = 'ExperienceItemEnterprise';
