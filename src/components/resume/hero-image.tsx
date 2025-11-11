import { cn } from '@/lib';
import Image from 'next/image';
import avatarPicture from '../../../public/static/img/avatar_410.png';

interface Props {
  className?: string;
}

export const HeroImage = ({ className }: Props) => {
  return (
    <div data-testid="hero-image" className={cn('overflow-hidden relative', className)}>
      <picture className="relative">
        <Image
          className="rounded-full backdrop-blur-xs bg-primary/10 shadow-inner"
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
