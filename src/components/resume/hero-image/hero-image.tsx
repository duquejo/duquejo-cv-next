import Image from 'next/image';
import { cn } from '@/lib';
import { Circle, Gamepad, LoaderCircle, Music, Send } from 'lucide-react';

interface Props {
  className?: string;
}

export const HeroImage = ({ className }: Props) => {
  return (
    <div data-testid="hero-image" className={cn('overflow-hidden relative', className)}>
      <Music
        className="absolute top-0 text-primary/50 animate-bounce-subtle repeat-infinite z-10"
        strokeWidth="3"
        size={64}
      />
      <Gamepad
        className="absolute bottom-0 left-7 text-primary/50 animate-wiggle z-10"
        strokeWidth="3"
        size={70}
      />
      <LoaderCircle
        className="absolute right-10 text-primary animate-spin duration-slow repeat-infinite z-10"
        strokeWidth="5"
        size={64}
      />
      <Send
        className="absolute right-8 bottom-5 text-primary animate-bounce-subtle repeat-infinite z-10"
        strokeWidth="3"
        size={50}
      />

      {/*Right*/}
      <Circle
        className="absolute right-36 top-10 text-primary/50 animate-pulse duration-slow"
        strokeWidth="5"
        size={40}
      />
      {/*Left*/}
      <Circle
        className="absolute left-20 bottom-24 text-primary/50 animate-pulse duration-slow delay-150"
        strokeWidth="5"
        size={20}
      />
      <picture className="object-cover">
        <Image
          className="rounded-full backdrop-blur-sm bg-primary/10 shadow-inner"
          alt="José Miguel Duque"
          width="950"
          height="950"
          priority
          src="/static/img/avatar_cropped_950.png"
        />
      </picture>
    </div>
  );
};
