'use client';

import Link from 'next/link';
import { Social } from '@/interfaces';
import { Github, Linkedin } from 'lucide-react';

export const SOCIAL_DATA: Social[] = [
  {
    name: 'GitHub',
    link: 'https://github.com/duquejo',
    icon: <Github />,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/duquejo/',
    icon: <Linkedin />,
  },
];

export const AppFooter = () => {
  return (
    <footer className="flex items-center justify-center gap-x-5 py-3">
      {SOCIAL_DATA.map((social) => (
        <Link
          href={social.link}
          key={social.name}
          target="_blank"
          title={social.name}
          aria-label={social.name}
          className="focus-visible:ring-1 hover:text-primary"
        >
          {social.icon}
        </Link>
      ))}
      <span className="border-l pl-5 font-semibold text-xs">
        © {new Date().getFullYear()} José Duque
      </span>
    </footer>
  );
};
