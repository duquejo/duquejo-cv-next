'use client';

import { NameTag } from '@/components/menu/name-tag';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib';
import Image from 'next/image';

interface Props {
  role: string;
}

export const MenuAvatar = ({ role }: Props) => {
  const { state } = useSidebar();

  return (
    <>
      <picture
        className={cn(
          'lg:mt-10 max-w-40 lg:w-auto border-border border-dashed border-2 rounded p-2 hover:border-primary/40 transition-colors duration-500',
          state === 'collapsed' && 'border-none mt-0',
        )}
      >
        <Image
          className={cn('object-cover', state === 'collapsed' && 'm-0')}
          src="/static/img/avatar-small.webp"
          width="160"
          height="146"
          priority={true}
          alt="José Miguel Duque"
        />
      </picture>
      {state === 'expanded' && (
        <div className="text-center">
          <NameTag />
          <div className="text-xl font-bold text-foreground">José Duque</div>
          <div className="font-light text-sm">{role}</div>
        </div>
      )}
    </>
  );
};
