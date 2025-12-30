'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link, usePathname } from '@/i18n/routing';
import type { MenuItem } from '@/interfaces';

interface Props {
  items: MenuItem[];
  size?: 'default' | 'sm' | 'lg';
}

export const MenuItems = ({ items, size = 'default' }: Props) => {
  const pathName = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={pathName === item.url}
            size={size}
            className="focus-visible:ring-primary focus-visible:ring-1"
          >
            <Link
              href={item.url as Parameters<typeof Link>['0']['href']}
              onClick={() => setOpenMobile(false)}
            >
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
