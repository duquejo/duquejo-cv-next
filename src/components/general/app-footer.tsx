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
    <footer className="border-t flex p-3 items-center justify-center gap-x-8">
      {SOCIAL_DATA.map((social) => (
        <Link
          href={social.link}
          key={social.name}
          target="_blank"
          title={social.name}
          aria-label={social.name}
        >
          {social.icon}
        </Link>
      ))}
      <span className="font-semibold text-sm">© {new Date().getFullYear()} José Duque</span>
    </footer>
  );
};
