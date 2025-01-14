'use client';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MenuItem } from '@/interfaces';

interface Props {
  items: MenuItem[];
}

export const MenuItems = ({ items }: Props) => {
  const pathName = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={pathName === item.url}>
            <Link
              href={item.url}
              className="data-[active=true]:decoration-primary data-[active=true]:underline data-[active=true]:underline-offset-4"
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
