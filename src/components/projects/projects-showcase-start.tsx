import { Rocket } from 'lucide-react';
import { Separator } from '../ui/separator';

export const ProjectsShowcaseStart = ({ text }: { text?: string }) => {
  return (
    <div className="my-4 flex flex-col w-full items-center text-sm text-foreground">
      <Separator orientation="vertical" className="h-8 md:h-15" />
      <p className="my-2 md:my-4 animate-wiggle text-center flex flex-col items-center gap-y-2 md:w-40">
        <Rocket size={20} />
        {text}
      </p>
      <Separator orientation="vertical" className="h-3 md:h-5" />.
    </div>
  );
};
