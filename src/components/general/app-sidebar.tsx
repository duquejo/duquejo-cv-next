import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { MenuAvatar } from '@/components/menu/menu-avatar/menu-avatar';
import { useTranslations } from 'next-intl';
import { SocialItems } from '@/components/social/social-items';
import { MenuItems } from '@/components/menu/menu-items/menu-items';
import { AppOptionsSidebar } from '@/components/general/app-options-sidebar';

export const AppSidebar = () => {
  const t = useTranslations('Sidebar');

  return (
    <Sidebar collapsible="icon" variant="floating" role="navigation" tabIndex={0}>
      <SidebarHeader>
        <div className="flex flex-col place-items-center gap-y-2">
          <MenuAvatar role={t('role')} />
          <SocialItems size="sm" className="group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent className="justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold">{t('professional.title')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <MenuItems items={t.raw('professional.links')} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="sm:hidden">
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold">
            {t('footer.mobile.title')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <AppOptionsSidebar innerClassName="flex flex-row gap-x-2" />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};
