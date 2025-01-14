import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Calendar,
  Folder,
  Forward,
  Inbox,
  LifeBuoy,
  MoreHorizontal,
  Projector,
  Send,
  Trash2,
} from 'lucide-react';
import { MenuAvatar } from '@/components/resume/menu-avatar/MenuAvatar';
import type { MenuItem } from '@/interfaces';
import { MenuItems } from '@/components/resume/menu-items/MenuItems';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-col place-items-center gap-y-2">
          <MenuAvatar />
        </div>
      </SidebarHeader>
      <SidebarSeparator orientation="horizontal" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>About me</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItems items={aboutMeItems} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Projects & Services</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItems items={serviceItems} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <LifeBuoy />
                  <span>Item</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 rounded-lg">
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <MoreHorizontal className="text-sidebar-foreground/70" />
                <span>More</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="sm">
                  <a href="#">
                    <LifeBuoy />
                    <span>Support</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="sm">
                  <a href="#">
                    <Send />
                    <span>Feedback</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator orientation="horizontal" />
      <SidebarFooter>asd</SidebarFooter>
    </Sidebar>
  );
};
