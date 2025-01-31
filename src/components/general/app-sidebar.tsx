import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { MenuAvatar } from '@/components/menu/menu-avatar/menu-avatar';
import { MenuItems } from '@/components/menu/menu-items/menu-items';
import { useTranslations } from 'next-intl';
import { SocialItems } from '@/components/social/social-items';

export const AppSidebar = () => {
  const t = useTranslations('Sidebar');

  return (
    <Sidebar collapsible="icon" variant="floating" role="navigation" tabIndex={0}>
      <SidebarHeader>
        <div className="flex flex-col place-items-center gap-y-2">
          <MenuAvatar role={t('role')} />
          <SocialItems size="sm" />
        </div>
      </SidebarHeader>
      <SidebarContent className="justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>{t('professional.title')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItems items={t.raw('professional.links')} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
