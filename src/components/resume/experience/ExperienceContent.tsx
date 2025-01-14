import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ExperienceType } from '@/interfaces';

export const ExperienceContent = ({ resume, screenshot, url }: Partial<ExperienceType>) => {
  return (
    <div className="flex">
      {resume && (
        <div
          className={cn('flex flex-col justify-between items-baseline', screenshot && 'basis-6/12')}
        >
          <div className="flex-auto">
            <span className="font-semibold text-base">Responsibilities</span>
            {resume.length > 1 ? (
              <ol className="list-disc ml-4 text-justify marker:text-primary-foreground">
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
            <Button className="mt-5 flex-shrink" variant="secondary">
              Project&#39;s link
            </Button>
          )}
        </div>
      )}
      {screenshot && (
        <picture className="flex flex-grow flex-col px-4 pt-0">
          <div className="aspect-video rounded-xl bg-muted/50" />
        </picture>
      )}
    </div>
  );
};
