import { SquareCheck } from 'lucide-react';

export const ExperienceItemContent = ({
  resume,
  contentTitle,
}: {
  contentTitle?: string;
  resume?: string[];
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-x-4">
      {resume && (
        <div className="flex flex-col order-2 lg:order-1 justify-between items-baseline">
          <div className="flex-auto">
            {contentTitle && <ExperienceItemContentTitle title={contentTitle} />}
            <ExperienceItemContentList resume={resume} />
          </div>
        </div>
      )}
    </div>
  );
};

const ExperienceItemContentTitle = ({ title }: { title: string }) => {
  return (
    <span className="font-semibold transition-colors flex items-center gap-x-2">
      <SquareCheck size={16} className="hidden md:block" /> {title}
    </span>
  );
};

const ExperienceItemContentList = ({ resume }: { resume: string[] }) => {
  return (
    <ol className="md:list-disc md:ml-5 text-justify group-hover:marker:text-primary">
      {resume.map((r, i) => (
        <li key={`resume-${i}`} className="my-3 md:my-0 text-justify text-sm leading-relaxed">
          {r}
        </li>
      ))}
    </ol>
  );
};
