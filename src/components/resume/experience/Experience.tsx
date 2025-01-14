import { cn } from '@/lib/utils';
import type { ExperienceType } from '@/interfaces/experience';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const Experience = ({
  start_date,
  end_date,
  enterprise,
  isRecent,
  project,
  role,
  resume,
  additional_info,
}: ExperienceType) => {
  return (
    <ol className="first-of-type:pt-0 pt-5 relative border-s border-gray-200">
      <div
        data-test="detail"
        className={cn(
          'absolute w-2 h-2 rounded-full mt-1.5 -start-1 bg-gray-400',
          isRecent ? 'bg-primary' : 'bg-secondary',
        )}
      />

      {/*Aligned content*/}
      <div className="pb-2 ms-4 flex items-center justify-between lg:justify-normal">
        <span
          data-test="time"
          className={cn(
            'lg:inline-flex border-2 rounded px-2 py-1 font-semibold text-xs text-center',
            isRecent ? 'border-yellow-400' : 'border-secondary',
          )}
        >
          <time className="block">{start_date}</time>
          <time className="block mt-1 lg:mt-0 lg:before:content-['-'] lg:before:mx-1">
            {end_date}
          </time>
        </span>
        <span className="text-xs font-normal ml-2 text-right lg:text-left">{enterprise}</span>
      </div>
      <Card className="ms-4">
        <CardHeader>
          <CardTitle>{project}</CardTitle>
          <CardDescription>{role}</CardDescription>
        </CardHeader>
        {resume && (
          <CardContent>
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
          </CardContent>
        )}
        {additional_info && (
          <CardFooter>
            <small className="block font-semibold text-justify">{additional_info}</small>
          </CardFooter>
        )}
      </Card>
    </ol>
  );
};
