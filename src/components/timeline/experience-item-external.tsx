import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const ExperienceItemExternalUrl = memo(
  ({ url, label, screenshot }: { url: string; label: string; screenshot?: string }) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            title={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="relative transition-all group-hover:text-primary group-hover:animate-wiggle"
          >
            <SquareArrowOutUpRight size={20} />
          </Link>
        </TooltipTrigger>
        <TooltipContent align="center" className="bg-sidebar text-foreground hidden md:block">
          {screenshot ? (
            <ExperienceItemExternalTooltip screenshot={screenshot} label={label} />
          ) : (
            label
          )}
        </TooltipContent>
      </Tooltip>
    );
  },
);

const ExperienceItemExternalTooltip = ({
  screenshot,
  label,
}: {
  screenshot: string;
  label: string;
}) => {
  return (
    <picture className="flex flex-col gap-y-2 mt-2 text-center lg:max-h-60 lg:max-w-xs overflow-hidden">
      <Image
        src={screenshot}
        width="200"
        height="150"
        loading="lazy"
        alt={label}
        className="rounded object-cover shadow-lg w-auto"
      />
      {label}
    </picture>
  );
};

ExperienceItemExternalUrl.displayName = 'ExperienceItemExternalUrl';
