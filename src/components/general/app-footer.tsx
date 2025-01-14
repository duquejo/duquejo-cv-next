'use client';

import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { Social } from '@/interfaces';

const social: Social[] = [
  {
    name: 'GitHub',
    link: 'https://github.com/duquejo',
    icon: <Github className="icon" />,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/duquejo/',
    icon: <Linkedin className="icon" />,
  },
];

export const AppFooter = () => {
  return (
    <footer className="border-t flex p-3 items-center justify-center gap-x-8">
      {social.map((s) => (
        <Link href={s.link} key={s.name} target="_blank" title={s.name} aria-label={s.name}>
          {s.icon}
        </Link>
      ))}
      <span className="font-semibold text-sm">© {new Date().getFullYear()} José Duque</span>
    </footer>
  );
};
