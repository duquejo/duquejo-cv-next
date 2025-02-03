'use client';

import { NameTag } from '@/components/menu/name-tag/name-tag';
import { Menu, X } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export const AppMobileHeader = () => {
  const { openMobile, toggleSidebar } = useSidebar();
  const t = useTranslations('Sidebar.complementary.sidebar');

  const onToggleClick = () => {
    toggleSidebar();
  };

  const MenuIcon = () => {
    const commonProps = {
      size: 20,
    };
    return !openMobile ? <Menu {...commonProps} /> : <X {...commonProps} />;
  };

  return (
    <div className="fixed top-0 z-20 lg:relative flex justify-between w-full py-2 px-4 md:hidden items-center transition-all bg-sidebar">
      <span className="p-4" />
      <NameTag />
      <Button title={t('title')} variant="ghost" onClick={() => onToggleClick()}>
        <MenuIcon />
        <span className="sr-only">{t('title')}</span>
      </Button>
    </div>
  );
};
