import { cn, SOCIAL_DATA as socials } from '@/lib';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const SocialItems = ({ className }: Props) => {
  return (
    <div className={cn('flex items-center justify-center gap-x-5', className)}>
      {socials.map(
        (social) =>
          social.isVisibleInFooter && (
            <Link
              href={social.link}
              key={social.name}
              target="_blank"
              title={social.name}
              aria-label={social.name}
              className="focus-visible:ring-1 hover:text-primary"
            >
              <social.icon size={23} />
            </Link>
          ),
      )}
    </div>
  );
};
