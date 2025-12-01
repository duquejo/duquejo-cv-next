import { PocketKnife } from 'lucide-react';
import { memo } from 'react';
import { Badge } from '../ui/badge';

export const ExperienceAdditionalInfo = memo(
  ({ title, additionalInfo }: { title?: string; additionalInfo: string[] }) => {
    return (
      <>
        {title && (
          <span className="font-semibold text-based flex items-center gap-x-2">
            <PocketKnife size={16} className="hidden md:block" /> {title}
          </span>
        )}
        <div className="flex lg:gap-1 gap-2 flex-wrap lg:justify-normal justify-center">
          {additionalInfo.map((info) => (
            <Badge key={info} variant="secondary" className="cursor-default">
              {info}
            </Badge>
          ))}
        </div>
      </>
    );
  },
);

ExperienceAdditionalInfo.displayName = 'ExperienceAdditionalInfo';
