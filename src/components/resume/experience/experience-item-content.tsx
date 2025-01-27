import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ExperienceType } from '@/interfaces';
import Link from 'next/link';
import Image from 'next/image';

interface Props extends Partial<ExperienceType> {
  contentTitle: string;
  button: string;
}

export const ExperienceItemContent = ({
  project = 'Image',
  resume,
  button,
  screenshot,
  url,
  contentTitle,
}: Props) => {
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
            <span className="font-semibold text-base">{contentTitle}</span>
            {resume.length > 1 ? (
              <ol className="list-disc ml-4 text-justify marker:text-secondary">
                {resume.map((r, i) => (
                  <li key={`resume-${i}`} className="my-1 text-xs text-justify leading-normal">
                    {r}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="my-1 text-justify text-xs leading-normal">{resume}</p>
            )}
          </div>
          {url && (
            <Button
              size="sm"
              className="mt-5 lg:flex-shrink lg:w-auto w-full"
              variant="secondary"
              asChild
            >
              <Link href={url} target="_blank" rel="noopener noreferrer nofollow">
                {button}
              </Link>
            </Button>
          )}
        </div>
      )}
      {screenshot && (
        <picture className="order-1 lg:order-2 flex flex-grow flex-col items-center px-0 mb-5 pt-0 lg:px-4 lg:pt-8 lg:mb-0">
          <Image
            src={screenshot}
            width="300"
            height="150"
            loading="lazy"
            alt={project}
            className="rounded object-cover shadow-lg w-auto lg:max-w-xs"
          />
        </picture>
      )}
    </div>
  );
};
