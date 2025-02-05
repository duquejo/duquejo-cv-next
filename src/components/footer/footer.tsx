import { SocialItems } from '@/components/social/social-items';

export const Footer = () => {
  const currentDate = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center gap-x-5 py-3 fixed bottom-0 w-full bg-sidebar sm:bg-transparent sm:relative">
      <SocialItems />
      <span className="border-l pl-5 font-semibold text-xs">© {currentDate} José Duque</span>
    </footer>
  );
};
