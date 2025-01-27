import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { MenuAvatar } from '@/components/menu/menu-avatar/menu-avatar';
import { MenuItems } from '@/components/menu/menu-items/menu-items';
import { useTranslations } from 'next-intl';

export const AppSidebar = () => {
  const t = useTranslations('Sidebar');

  return (
    <Sidebar collapsible="icon" variant="floating" role="navigation" tabIndex={0}>
      <SidebarHeader>
        <div className="flex flex-col place-items-center gap-y-2">
          <MenuAvatar role={t('role')} />
        </div>
      </SidebarHeader>
      <SidebarContent className="justify-between">
        <div>
          <SidebarGroup>
            <SidebarGroupLabel>{t('professional.title')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <MenuItems items={t.raw('professional.links')} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>{t('hobbies.title')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <MenuItems items={t.raw('hobbies.links')} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        <div>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <MenuItems size="sm" items={t.raw('footer.links')} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
