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
import { Calendar, Gamepad, Inbox, Music, Pencil, Projector, Send } from 'lucide-react';
import { MenuAvatar } from '@/components/resume/menu-avatar/MenuAvatar';
import type { MenuItem } from '@/interfaces';
import { MenuItems } from '@/components/resume/menu-items/MenuItems';

// Menu items.
const aboutMeItems: MenuItem[] = [
  {
    title: 'Resumeé',
    url: '/',
    icon: <Inbox />,
  },
];

const serviceItems: MenuItem[] = [
  {
    title: 'Services',
    url: '/career/services',
    icon: <Calendar />,
  },
  {
    title: 'Projects',
    url: '/career/projects',
    icon: <Projector />,
  },
];

const lastItems: MenuItem[] = [
  {
    title: 'My blog',
    url: '/blog',
    icon: <Pencil />,
  },
  {
    title: 'Contact',
    url: '/contact',
    icon: <Send />,
  },
];

const hobbiesItems: MenuItem[] = [
  {
    title: 'Music production',
    url: '/hobbies/music-production',
    icon: <Music />,
  },
  {
    title: 'Game development',
    url: '/hobbies/game-development',
    icon: <Gamepad />,
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
            <SidebarGroupLabel>Professional career</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <MenuItems items={serviceItems} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator orientation="horizontal" />

          <SidebarGroup>
            <SidebarGroupLabel>Hobbies</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <MenuItems items={hobbiesItems} />
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
    </Sidebar>
  );
};
