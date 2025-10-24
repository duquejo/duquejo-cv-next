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
import { SidebarKeyboard } from './sidebar-keyboard';

export const MainSidebar = () => {
  const t = useTranslations('Sidebar');

  return (
    <Sidebar collapsible="icon" variant="floating" role="navigation" tabIndex={0}>
      {/* Top Avatar & Contact */}
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

      {/* Middle links */}
      <SidebarContent className="justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold tracking-wider text-foreground">
            {t('professional.title')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <MenuItems items={t.raw('professional.links')} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarSeparator className="my-2 group-data-[collapsible=icon]:hidden" />
          <SidebarGroupLabel className="font-semibold tracking-wider text-foreground group-data-[collapsible=icon]:hidden">
            {t('other.title')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <MenuItems items={t.raw('other.links')} />
            <SidebarSeparator className="sm:flex my-2 group-data-[collapsible=icon]:hidden hidden" />
            <SidebarKeyboard className="sm:flex group-data-[collapsible=icon]:hidden hidden" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Mobile */}
      <SidebarFooter className="sm:hidden">
        <SidebarGroup>
          <SidebarSeparator className="mx-0 mb-2" />
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
