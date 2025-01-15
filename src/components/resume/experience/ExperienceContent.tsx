import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ExperienceType } from '@/interfaces';

export const ExperienceContent = ({ resume, screenshot, url }: Partial<ExperienceType>) => {
  return (
    <div className="flex flex-col lg:flex-row">
      {resume && (
        <div
          className={cn(
            'flex flex-col order-2 lg:order-1 justify-between items-baseline',
            screenshot && 'basis-6/12',
          )}
        >
          <div className="flex-auto">
            <span className="font-semibold text-base">Responsibilities</span>
            {resume.length > 1 ? (
              <ol className="list-disc ml-4 text-justify marker:text-secondary">
                {resume.map((r, i) => (
                  <li key={`resume-${i}`} className="my-1 text-sm text-justify">
                    {r}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="my-1 text-justify text-sm">{resume}</p>
            )}
          </div>
          {url && (
            <Button className="mt-5 lg:flex-shrink lg:w-auto w-full" variant="secondary">
              Project&#39;s link
            </Button>
          )}
        </div>
      )}
      {screenshot && (
        <picture className="order-1 lg:order-2 flex flex-grow flex-col px-0 lg:px-4 pt-0 mb-5 lg:mb-0">
          <div className="aspect-video rounded-xl bg-muted/50" />
        </picture>
      )}
    </div>
  );
};
