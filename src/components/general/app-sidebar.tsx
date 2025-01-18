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
import { MenuItem } from '@/interfaces';
import { Calendar, Gamepad, Inbox, Music, Pencil, Projector, Send } from 'lucide-react';
import { MenuAvatar } from '@/components/resume/menu-avatar/MenuAvatar';
import { MenuItems } from '@/components/resume/menu-items/MenuItems';

// Menu items.
export const professionalItems: MenuItem[] = [
  {
    title: 'Resumeé',
    url: '/',
    icon: <Inbox />,
  },
  {
    title: 'Services',
    url: '/career/services',
    icon: <Calendar />,
  },
  {
    title: 'Latest projects',
    url: '/career/projects',
    icon: <Projector />,
  },
];

export const lastItems: MenuItem[] = [
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

export const hobbiesItems: MenuItem[] = [
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
    <Sidebar collapsible="icon" variant="floating" role="navigation" tabIndex={0}>
      <SidebarHeader>
        <div className="flex flex-col place-items-center gap-y-2">
          <MenuAvatar />
        </div>
      </SidebarHeader>
      <SidebarContent className="justify-between">
        <div>
          <SidebarGroup>
            <SidebarGroupLabel>Professional career</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <MenuItems items={professionalItems} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Hobbies</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <MenuItems items={hobbiesItems} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        <div>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <MenuItems size="sm" items={lastItems} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
