import { Marquee } from '@/components/ui/marquee';
import { STACK_DATA as stack } from '@/lib';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export const TechMarquee = () => {
  return (
    <Marquee className="[--duration:30s]">
      {stack.map((s) => (
        <Badge
          key={s.title}
          variant="secondary"
          className="flex gap-x-2 px-1.5 py-1 lg:p-1.5 rounded-xl"
        >
          <Image src={s.icon} alt={s.title} width={20} height={20} className="max-w-none" />
          {s.title}
        </Badge>
      ))}
    </Marquee>
  );
};
