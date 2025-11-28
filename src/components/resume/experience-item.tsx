import { ExperienceItemContent } from '@/components/resume/experience-item-content';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ExperienceType } from '@/interfaces';
import { cn } from '@/lib';
import { Building, Code, PocketKnife, SquareArrowOutUpRight, Target } from 'lucide-react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface Props extends ExperienceType {
  className?: string;
  experienceItemTitle?: string;
  experienceItemButtonLabel?: string;
  experienceFooterText?: string;
  withIcons?: boolean;
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
  experienceItemTitle,
  experienceItemButtonLabel,
  experienceFooterText,
  url,
  withIcons = true,
}: Props) => {
  return (
    <li
      className={cn(
        'first-of-type:pt-0 pt-5 relative border-s border-gray-160 list-none',
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
            'lg:inline-flex items-center border rounded px-2 py-1 font-semibold text-xs text-center',
            isRecent ? 'border-primary' : 'border-secondary',
          )}
        >
          <time className="block">{start_date}</time>
          {end_date && (
            <time className="block lg:before:content-['-'] lg:before:mx-1">{end_date}</time>
          )}
        </span>
      </span>
      <Card className="group hover:border-primary ms-4 bg-sidebar/30 border-dashed hover:ml-6 transition-all">
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            <CardTitle>
              {enterprise && (
                <div className="text-xs font-light mb-4 inline-flex items-center">
                  {withIcons && <Building size={16} className="mr-2" />}
                  {enterprise}
                </div>
              )}
              <h2 className=" transition-colors flex items-center gap-x-2">
                {withIcons && <Target size={16} />}
                {project}
              </h2>
            </CardTitle>
            <CardDescription className="mt-2">
              {withIcons && <Code size={16} className="inline mr-2" />}
              {role}
            </CardDescription>
          </div>
          {url && experienceItemButtonLabel && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className=" transition-colors group-hover:text-primary "
                >
                  <SquareArrowOutUpRight size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent align="center" className="bg-sidebar text-foreground">
                {experienceItemButtonLabel}
              </TooltipContent>
            </Tooltip>
          )}
        </CardHeader>
        <CardContent className="py-0">
          <ExperienceItemContent
            contentTitle={experienceItemTitle}
            project={project}
            resume={resume}
          />
        </CardContent>
        {additional_info && (
          <CardFooter className="flex flex-col items-start gap-y-2 pt-5">
            <span className="font-semibold text-base  flex items-center gap-x-2">
              <PocketKnife size={16} /> {experienceFooterText}
            </span>
            <div className="flex lg:gap-1 gap-2 flex-wrap lg:justify-normal justify-around">
              {additional_info.map((info) => (
                <Badge key={info} variant="secondary" className="cursor-default">
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
