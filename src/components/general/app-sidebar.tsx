import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Calendar, Inbox, Projector, Send } from 'lucide-react';
import { MenuAvatar } from '@/components/resume/menu-avatar/MenuAvatar';
import type { MenuItem } from '@/interfaces';
import { MenuItems } from '@/components/resume/menu-items/MenuItems';

// Menu items.
const aboutMeItems: MenuItem[] = [
  {
    title: 'Resume',
    url: '/',
    icon: <Inbox />,
  },
];

const serviceItems: MenuItem[] = [
  {
    title: 'Services',
    url: '/services',
    icon: <Calendar />,
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: <Projector />,
  },
];

const lastItems: MenuItem[] = [
  {
    title: 'Contact',
    url: '/contact',
    icon: <Send />,
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-col place-items-center gap-y-2">
          <MenuAvatar />
        </div>
      </SidebarHeader>
      <SidebarSeparator orientation="horizontal" />
      <SidebarContent className="justify-between">
        <div>
          <SidebarGroup>
            <SidebarGroupLabel>About me</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <MenuItems items={aboutMeItems} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator orientation="horizontal" />

          <SidebarGroup>
            <SidebarGroupLabel>Projects & Services</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <MenuItems items={serviceItems} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <SidebarSeparator orientation="horizontal" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItems items={lastItems} size="sm" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator orientation="horizontal" />
      <SidebarFooter>asd</SidebarFooter>
    </Sidebar>
  );
};
