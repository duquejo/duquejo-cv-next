import Link from 'next/link';
import type { Social } from '@/interfaces';
import { Github, Linkedin } from 'lucide-react';

export const SOCIAL_DATA: Social[] = [
  {
    name: 'GitHub',
    link: 'https://github.com/duquejo',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/duquejo/',
    icon: Linkedin,
  },
];

interface Props {
  size?: 'sm' | 'md';
}

export const SocialItems = ({ size = 'md' }: Props) => {
  return (
    <div className="flex items-center justify-center gap-x-5">
      {SOCIAL_DATA.map((social) => (
        <Link
          href={social.link}
          key={social.name}
          target="_blank"
          title={social.name}
          aria-label={social.name}
          className="focus-visible:ring-1 hover:text-primary"
        >
          <social.icon size={size === 'sm' ? 18 : 23} />
        </Link>
      ))}
    </div>
  );
};
