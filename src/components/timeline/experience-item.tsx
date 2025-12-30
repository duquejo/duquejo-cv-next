import { memo } from 'react';
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
import { ExperienceAdditionalInfo } from './experience-additional-info';
import { ExperienceHeaderTime } from './experience-header-time';
import { ExperienceItemContent } from './experience-item-content';
import { ExperienceItemEnterprise } from './experience-item-enterprise';
import { ExperienceItemExternalUrl } from './experience-item-external';
import { ExperienceItemProject } from './experience-item-project';
import { ExperienceItemRole } from './experience-item-role';

interface Props extends ExperienceType {
  className?: string;
  experienceItemTitle?: string;
  experienceItemButtonLabel?: string;
  experienceFooterText?: string;
  withIcons?: boolean;
}

export const ExperienceItem = memo(
  ({
    className,
    start_date,
    end_date,
    enterprise,
    isRecent,
    project,
    role,
    resume,
    additional_info: additionalInfo,
    screenshot,
    experienceItemTitle,
    experienceItemButtonLabel,
    experienceFooterText,
    url,
    withIcons = true,
  }: Props) => {
    return (
      <li
        className={cn(
          'group first-of-type:pt-0 pt-5 relative border-s border-gray-160 list-none',
          className,
        )}
      >
        <ExperienceHeaderTime isRecent={isRecent} start_date={start_date} end_date={end_date} />
        <Card className="group-hover:border-primary group-hover:ml-6 ms-4 bg-sidebar/30 border-dashed transition-all">
          <CardHeader className="flex flex-row justify-between items-start">
            <div className="flex flex-col">
              <CardTitle>
                {enterprise && (
                  <ExperienceItemEnterprise withIcons={withIcons} title={enterprise} />
                )}
                {project && <ExperienceItemProject withIcons={withIcons} title={project} />}
              </CardTitle>
              <CardDescription>
                <ExperienceItemRole withIcons={withIcons} title={role} />
              </CardDescription>
            </div>
            {url && experienceItemButtonLabel && (
              <ExperienceItemExternalUrl
                url={url}
                screenshot={screenshot}
                label={experienceItemButtonLabel}
              />
            )}
          </CardHeader>
          <CardContent className="py-0">
            {resume && <ExperienceItemContent contentTitle={experienceItemTitle} resume={resume} />}
          </CardContent>
          {additionalInfo && (
            <CardFooter className="flex flex-col items-start gap-y-2 pt-5">
              <ExperienceAdditionalInfo
                title={experienceFooterText}
                additionalInfo={additionalInfo}
              />
            </CardFooter>
          )}
        </Card>
      </li>
    );
  },
);

ExperienceItem.displayName = 'ExperienceItem';
