'use client';

import Link from 'next/link';

const social = [
  {
    name: 'GitHub',
    link: 'https://github.com/duquejo',
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/duquejo/',
  },
];

export const AppFooter = () => {
  return (
    <footer className="flex-1 mt-5 lg:mt-0 fixed bottom-0 left-0 right-0 bg-white flex items-center justify-between gap-x-2">
      <ul className="flex gap-x-4">
        {social.map((s) => (
          <li key={s.name} className="icon">
            <Link href={s.link} target="_blank" title={s.name} aria-label={s.name}>
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
      <span className="text-gray-800 text-sm">©️ {new Date().getFullYear()} José Duque</span>
    </footer>
  );
};
