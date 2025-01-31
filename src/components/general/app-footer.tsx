'use client';

import { SocialItems } from '../social/social-items';

export const AppFooter = () => {
  return (
    <footer className="flex items-center justify-center gap-x-5 py-3">
      <SocialItems />
      <span className="border-l pl-5 font-semibold text-xs">
        © {new Date().getFullYear()} José Duque
      </span>
    </footer>
  );
};
