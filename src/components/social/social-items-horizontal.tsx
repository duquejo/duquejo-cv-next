import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SOCIAL_DATA as socials } from '@/lib';
import Link from 'next/link';

export const SocialItemsHorizontal = () => {
  return (
    <SidebarMenu>
      {socials.map((social) => {
        const commonProps = {
          className: 'transition-colors hover:text-primary inline-flex cursor-pointer',
          title: social.name,
          ['aria-label']: social.name,
        };

        return (
          <SidebarMenuItem key={social.name}>
            <SidebarMenuButton
              asChild
              className="focus-visible:ring-primary focus-visible:ring-1"
              size="sm"
            >
              {social.isVisibleInFooter ? (
                <Link
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  {...commonProps}
                  prefetch={false}
                >
                  <social.icon size={15} />
                  <span className="peer-data-[active=true]/menu-item:hidden">
                    {social.fullName}
                  </span>
                </Link>
              ) : (
                <button type="button" tabIndex={0} key={social.name} {...commonProps}>
                  <social.icon size={15} />
                  <span className="peer-data-[active=true]/menu-item:hidden">
                    {social.fullName}
                  </span>
                </button>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};
