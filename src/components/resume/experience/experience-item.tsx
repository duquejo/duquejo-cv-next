import { cn } from '@/lib/utils';
import type { ExperienceType } from '@/interfaces/experience.interface';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExperienceItemContent } from '@/components/resume/experience/experience-item-content';

export const ExperienceItem = ({
  start_date,
  end_date,
  enterprise,
  isRecent,
  project,
  role,
  resume,
  additional_info,
  screenshot,
  url,
}: ExperienceType) => {
  return (
    <ol className="first-of-type:pt-0 pt-5 relative border-s border-gray-200">
      <div
        data-testid="detail"
        className={cn(
          'absolute w-2 h-2 rounded-full mt-1.5 -start-1 bg-gray-400',
          isRecent ? 'bg-primary' : 'bg-secondary',
        )}
      />

      {/*Aligned content*/}
      <div className="pb-2 ms-4 flex items-center justify-between lg:justify-normal">
        <span
          data-testid="time"
          className={cn(
            'lg:inline-flex items-center border-2 rounded px-2 py-1 font-semibold text-xs text-center',
            isRecent ? 'border-primary' : 'border-secondary',
          )}
        >
          <time className="block">{start_date}</time>
          {end_date && (
            <time className="block lg:before:content-['-'] lg:before:mx-1">{end_date}</time>
          )}
        </span>
        {enterprise && (
          <span className="text-xs font-normal ml-2 text-right lg:text-left">{enterprise}</span>
        )}
      </div>
      <Card className="ms-4">
        <CardHeader>
          <CardTitle>{project}</CardTitle>
          <CardDescription>{role}</CardDescription>
        </CardHeader>
        <CardContent className="py-0">
          <ExperienceItemContent
            project={project}
            resume={resume}
            screenshot={screenshot}
            url={url}
          />
        </CardContent>
        {additional_info && (
          <CardFooter className="flex flex-col items-start gap-y-2 pt-5">
            <div className="font-semibold text-base">Skills</div>
            <div className="flex lg:gap-1 gap-2 flex-wrap lg:justify-normal justify-around">
              {additional_info.map((info) => (
                <Badge variant="secondary" key={info}>
                  {info}
                </Badge>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </ol>
  );
};
