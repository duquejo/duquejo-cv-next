'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
          <SidebarMenuButton asChild isActive={pathName === item.url} size={size}>
            <Link href={item.url} onClick={() => setOpenMobile(false)}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
