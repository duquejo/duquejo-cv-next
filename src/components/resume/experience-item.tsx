import { cn } from '@/lib';
import type { ExperienceType } from '@/interfaces';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExperienceItemContent } from '@/components/resume/experience-item-content';

interface Props extends ExperienceType {
  className?: string;
  experienceItemTitle?: string;
  experienceItemButtonLabel?: string;
  experienceFooterText?: string;
}

export const ExperienceItem = ({
  className,
  start_date,
  end_date,
  enterprise,
  isRecent,
  project,
  role,
  resume,
  additional_info,
  screenshot,
  experienceItemTitle,
  experienceItemButtonLabel,
  experienceFooterText,
  url,
}: Props) => {
  return (
    <li
      className={cn(
        'first-of-type:pt-0 pt-5 relative border-s border-gray-200 list-none',
        className,
      )}
    >
      <span
        data-testid="detail"
        className="absolute w-2 h-2 rounded-full mt-1.5 -start-1 bg-primary"
      />
      <span className="pb-2 ms-4 flex items-center justify-between lg:justify-normal">
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
      </span>
      <Card className="ms-4 bg-sidebar/30 border-dashed">
        <CardHeader>
          <CardTitle>
            <h2>{project}</h2>
          </CardTitle>
          <CardDescription>{role}</CardDescription>
        </CardHeader>
        <CardContent className="py-0">
          <ExperienceItemContent
            contentTitle={experienceItemTitle}
            button={experienceItemButtonLabel}
            project={project}
            resume={resume}
            screenshot={screenshot}
            url={url}
          />
        </CardContent>
        {additional_info && (
          <CardFooter className="flex flex-col items-start gap-y-2 pt-5">
            <span className="font-semibold text-base">{experienceFooterText}</span>
            <div className="flex lg:gap-1 gap-2 flex-wrap lg:justify-normal justify-around">
              {additional_info.map((info) => (
                <Badge variant="secondary" className="cursor-pointer" key={info}>
                  {info}
                </Badge>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </li>
  );
};
