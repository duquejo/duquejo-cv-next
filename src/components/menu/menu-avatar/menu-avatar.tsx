'use client';

import Image from 'next/image';
import { NameTag } from '@/components/menu/name-tag/name-tag';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib';

interface Props {
  role: string;
}

export const MenuAvatar = ({ role }: Props) => {
  const { state } = useSidebar();

  return (
    <>
      <picture
        className={cn(
          'mt-10 max-w-32 lg:w-auto border-border border-dashed border-2 rounded',
          state === 'collapsed' && 'border-none mt-0',
        )}
      >
        <Image
          className={cn('object-cover mt-2 ml-2 mb-2', state === 'collapsed' && 'm-0')}
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
          <div className="text-xl font-bold">José Duque</div>
          <div className="font-light text-sm">{role}</div>
        </div>
      )}
    </>
  );
};
