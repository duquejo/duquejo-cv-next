import { cn } from '@/lib';
import Image from 'next/image';
import avatarPicture from '../../../public/static/img/avatar_410.png';

interface Props {
  className?: string;
}

export const HeroImage = ({ className }: Props) => {
  return (
    <div data-testid="hero-image" className={cn('overflow-hidden relative', className)}>
      <picture className="relative group">
        <span className="z-0 absolute top-5 left-5 right-5 bottom-5 rounded-full bg-primary/10 group-hover:translate-y-2 transition-transform duration-500"></span>
        <span className="z-10 absolute top-14 left-14 right-14 bottom-14 rounded-full bg-primary/10 group-hover:translate-y-2 transition-transform duration-500"></span>
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
