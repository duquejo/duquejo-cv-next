import type { ExperienceType } from '@/interfaces';
import { cn } from '@/lib';
import { SquareCheck } from 'lucide-react';

interface Props extends Partial<ExperienceType> {
  contentTitle?: string;
}

export const ExperienceItemContent = ({ project = 'Image', resume, contentTitle }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-x-4">
      {resume && (
        <div className={cn('flex flex-col order-2 lg:order-1 justify-between items-baseline')}>
          <div className="flex-auto">
            {contentTitle && (
              <span className="font-semibold transition-colors flex items-center gap-x-2">
                <SquareCheck size={16} /> {contentTitle}
              </span>
            )}
            {resume.length > 1 ? (
              <ol className="list-disc ml-4 text-justify">
                {resume.map((r, i) => (
                  <li key={`resume-${i}`} className="my-1 text-justify text-sm leading-relaxed">
                    {r}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="my-1 text-justify text-sm leading-relaxed">{resume}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
