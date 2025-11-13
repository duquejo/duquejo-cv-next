'use client';

import { NameTag } from '@/components/menu/name-tag';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

const commonProps = {
  size: 20,
};

const MenuIcon = ({ openMobile }: { openMobile: boolean }) => {
  return !openMobile ? (
    <Menu aria-label="open" {...commonProps} />
  ) : (
    <X aria-label="close" {...commonProps} />
  );
};

export const MobileHeader = () => {
  const { openMobile, toggleSidebar } = useSidebar();
  const t = useTranslations('Sidebar.complementary.sidebar');

  const onToggleClick = () => toggleSidebar();

  return (
    <header className="fixed top-0 z-20 lg:relative flex justify-between w-full py-2 px-4 md:hidden items-center transition-all bg-sidebar">
      <span className="p-4" />
      <NameTag />
      <Button title={t('title')} variant="ghost" onClick={() => onToggleClick()}>
        <MenuIcon openMobile={openMobile} />
        <span className="sr-only">{t('title')}</span>
      </Button>
    </header>
  );
};
