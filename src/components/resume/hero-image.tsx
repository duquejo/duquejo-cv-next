import Image from 'next/image';
import { cn } from '@/lib';
import avatarPicture from '../../../public/static/img/avatar_410.png';

interface Props {
  className?: string;
  message?: string;
}

const SpeechBubble = ({ message = '' }) => (
  <span className="z-15 absolute top-15 right-4 p-3 bg-secondary text-xs font-light h-fit rounded-t-xl rounded-e-xl opacity-0 group-hover:opacity-100 group-hover:rotate-6 group-hover:translate-2 transition-all duration-500">
    {message}
  </span>
);

export const HeroImage = ({ className, message = '' }: Props) => {
  return (
    <div data-testid="hero-image" className={cn('overflow-hidden relative', className)}>
      <picture className="relative group">
        <span className="z-0 absolute top-5 left-5 right-5 bottom-5 rounded-full bg-primary/10 group-hover:translate-y-2 transition-transform duration-500"></span>
        <span className="z-10 absolute top-14 left-14 right-14 bottom-14 rounded-full bg-primary/10 group-hover:translate-y-2 transition-transform duration-500"></span>
        {message && <SpeechBubble message={message} />}
        <Image
          className="z-20 relative group-hover:scale-[1.02] group-hover:-translate-x-5 duration-500 transition-transform"
          alt="José Miguel Duque"
          height={410}
          width={410}
          priority={true}
          src={avatarPicture}
          unoptimized
        />
      </picture>
    </div>
  );
};
