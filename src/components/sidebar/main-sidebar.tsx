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
import { MenuItems } from '@/components/menu/menu-items/menu-items';
import { ComplementarySidebar } from '@/components/sidebar/complementary-sidebar';
import { SocialItemsHorizontal } from '@/components/social/social-items-horizontal';

export const MainSidebar = () => {
  const t = useTranslations('Sidebar');

  return (
    <Sidebar collapsible="icon" variant="floating" role="navigation" tabIndex={0}>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarMenu className="gap-y-3">
            <SidebarMenuItem className="flex flex-col place-items-center gap-y-2">
              <MenuAvatar role={t('role')} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="font-semibold tracking-wider text-foreground">
            {t('contact.title')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SocialItemsHorizontal />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent className="justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold tracking-wider text-foreground">
            {t('professional.title')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <MenuItems items={t.raw('professional.links')} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup className="sm:hidden">
          <SidebarSeparator className="mx-0" />
          <SidebarGroupLabel className="px-0 font-semibold tracking-wider text-foreground">
            {t('footer.mobile.title')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <ComplementarySidebar innerClassName="flex flex-row gap-x-2" />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};
