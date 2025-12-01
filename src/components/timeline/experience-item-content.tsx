import { SquareCheck } from 'lucide-react';
import { memo } from 'react';

interface Props {
  resume: string[];
  contentTitle?: string;
}

export const ExperienceItemContent = memo(({ resume, contentTitle }: Props) => {
  return (
    <div className="flex flex-col gap-x-4">
      {contentTitle && (
        <span className="font-semibold transition-colors flex items-center gap-x-2">
          <SquareCheck size={16} className="hidden md:block" /> {contentTitle}
        </span>
      )}
      <ol className="md:list-disc md:ml-5 text-justify group-hover:marker:text-primary">
        {resume.map((r, i) => (
          <li key={`resume-${i}`} className="my-3 md:my-0 text-justify text-sm leading-relaxed">
            {r}
          </li>
        ))}
      </ol>
    </div>
  );
});

ExperienceItemContent.displayName = 'ExperienceItemContent';
